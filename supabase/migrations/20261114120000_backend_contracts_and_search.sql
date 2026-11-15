-- Production data contracts, indexed multilingual search and idempotent reports.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists landmarks_set_updated_at on public.landmarks;
create trigger landmarks_set_updated_at before update on public.landmarks
for each row execute function public.set_updated_at();

drop trigger if exists cultural_routes_set_updated_at on public.cultural_routes;
create trigger cultural_routes_set_updated_at before update on public.cultural_routes
for each row execute function public.set_updated_at();

alter table public.landmarks
  add constraint landmarks_required_locales_check
    check (translations ? 'bg' and translations ? 'en'),
  add constraint landmarks_coordinates_pair_check
    check ((latitude is null) = (longitude is null)),
  add constraint landmarks_published_sources_check
    check (status <> 'PUBLISHED' or jsonb_array_length(sources) > 0);

alter table public.cultural_routes
  add constraint cultural_routes_required_locales_check
    check (translations ? 'bg' and translations ? 'en');

alter table public.landmarks
  add column name_bg text generated always as (translations #>> '{bg,name}') stored,
  add column name_en text generated always as (translations #>> '{en,name}') stored,
  add column search_document tsvector generated always as (
    to_tsvector(
      'simple'::regconfig,
      coalesce(translations::text, '') || ' ' || coalesce(area, '') || ' ' || coalesce(municipality, '')
    )
  ) stored;

create index landmarks_search_document_idx on public.landmarks using gin (search_document);
create index landmarks_name_bg_idx on public.landmarks (name_bg) where status = 'PUBLISHED';
create index landmarks_name_en_idx on public.landmarks (name_en) where status = 'PUBLISHED';
create index landmarks_status_category_idx on public.landmarks (status, category);
create index landmarks_status_municipality_idx on public.landmarks (status, municipality);
create index landmarks_status_area_idx on public.landmarks (status, area);
create index landmarks_verified_idx on public.landmarks (last_verified_at desc) where status = 'PUBLISHED';

alter table public.issue_reports
  add column idempotency_key uuid,
  add column request_hash text,
  add constraint issue_reports_request_hash_check
    check (request_hash is null or request_hash ~ '^[a-f0-9]{64}$'),
  add constraint issue_reports_idempotency_pair_check
    check ((idempotency_key is null) = (request_hash is null));

create unique index issue_reports_idempotency_key_idx
  on public.issue_reports (idempotency_key)
  where idempotency_key is not null;

revoke execute on function public.set_updated_at() from public, anon, authenticated;
grant execute on function public.set_updated_at() to service_role;

comment on column public.landmarks.search_document is
  'Generated multilingual full-text document for public landmark discovery.';
comment on column public.issue_reports.idempotency_key is
  'Client-generated UUID preventing duplicate issue reports; never exposed publicly.';
