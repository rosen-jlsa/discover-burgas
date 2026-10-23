create extension if not exists pgcrypto;

create type public.publication_status as enum ('DRAFT', 'PUBLISHED', 'ARCHIVED');
create type public.transport_mode as enum ('WALKING', 'DRIVING', 'BOAT', 'MIXED');
create type public.report_status as enum ('new', 'reviewing', 'resolved');

create table public.categories (
  slug text primary key check (slug ~ '^[a-z0-9-]+$'),
  labels jsonb not null check (jsonb_typeof(labels) = 'object'),
  sort_order integer not null default 0
);

create table public.landmarks (
  id text primary key,
  slug text unique not null check (slug ~ '^[a-z0-9-]+$'),
  category text not null references public.categories(slug),
  municipality text not null,
  area text not null,
  address text,
  latitude double precision check (latitude is null or latitude between -90 and 90),
  longitude double precision check (longitude is null or longitude between -180 and 180),
  official_url text,
  accessibility text,
  opening_hours text,
  entry_fees text,
  last_verified_at date not null,
  status public.publication_status not null default 'DRAFT',
  featured boolean not null default false,
  translations jsonb not null check (jsonb_typeof(translations) = 'object'),
  images jsonb not null default '[]'::jsonb check (jsonb_typeof(images) = 'array'),
  sources jsonb not null default '[]'::jsonb check (jsonb_typeof(sources) = 'array'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cultural_routes (
  id text primary key,
  slug text unique not null check (slug ~ '^[a-z0-9-]+$'),
  transport_mode public.transport_mode not null,
  translations jsonb not null check (jsonb_typeof(translations) = 'object'),
  stops jsonb not null check (jsonb_typeof(stops) = 'array' and jsonb_array_length(stops) >= 2),
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.issue_reports (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('map', 'api', 'content', 'accessibility', 'other')),
  page text not null default '',
  message text not null check (char_length(message) between 10 and 2000),
  contact text,
  status public.report_status not null default 'new',
  created_at timestamptz not null default now()
);

create table public.verification_runs (
  id uuid primary key default gen_random_uuid(),
  checker text not null,
  outcome text not null check (outcome in ('passed', 'failed')),
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index landmarks_public_search_idx on public.landmarks (status, category, area);
create index issue_reports_created_idx on public.issue_reports (created_at desc);

alter table public.categories enable row level security;
alter table public.landmarks enable row level security;
alter table public.cultural_routes enable row level security;
alter table public.issue_reports enable row level security;
alter table public.verification_runs enable row level security;

revoke all on table public.categories, public.landmarks, public.cultural_routes, public.issue_reports, public.verification_runs from anon, authenticated;
grant select on table public.categories, public.landmarks, public.cultural_routes to anon, authenticated;

create policy "public categories are readable" on public.categories for select to anon, authenticated using (true);
create policy "published landmarks are readable" on public.landmarks for select to anon, authenticated using (status = 'PUBLISHED');
create policy "published routes are readable" on public.cultural_routes for select to anon, authenticated using (published = true);

comment on table public.issue_reports is 'Private visitor issue inbox. Writes and reads go through trusted server code only.';
comment on table public.verification_runs is 'Private audit log populated by backend verification jobs.';
