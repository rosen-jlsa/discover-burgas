-- Production security hardening for public reports and administrative access.

revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
revoke execute on function public.submit_issue_report(text, text, text, text) from public, anon, authenticated;
grant execute on function public.submit_issue_report(text, text, text, text) to service_role;

create policy "private reports deny client access"
  on public.issue_reports
  as restrictive
  for all
  to anon, authenticated
  using (false)
  with check (false);

create policy "private verification runs deny client access"
  on public.verification_runs
  as restrictive
  for all
  to anon, authenticated
  using (false)
  with check (false);

create index if not exists landmarks_category_idx on public.landmarks (category);

create table if not exists public.request_rate_limits (
  action text not null check (action in ('admin_login', 'issue_report')),
  fingerprint text not null check (char_length(fingerprint) = 64),
  window_started_at timestamptz not null default now(),
  request_count integer not null default 1 check (request_count > 0),
  primary key (action, fingerprint)
);

alter table public.request_rate_limits enable row level security;
revoke all on table public.request_rate_limits from public, anon, authenticated;
grant select, insert, update, delete on table public.request_rate_limits to service_role;

create policy "private rate limits deny client access"
  on public.request_rate_limits
  as restrictive
  for all
  to anon, authenticated
  using (false)
  with check (false);

create or replace function public.consume_request_rate_limit(
  p_action text,
  p_fingerprint text,
  p_limit integer,
  p_window_seconds integer
) returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  current_count integer;
begin
  if p_action not in ('admin_login', 'issue_report') then
    raise exception 'invalid rate-limit action';
  end if;
  if char_length(p_fingerprint) <> 64 or p_limit < 1 or p_window_seconds < 1 then
    raise exception 'invalid rate-limit parameters';
  end if;

  insert into public.request_rate_limits(action, fingerprint, window_started_at, request_count)
  values (p_action, p_fingerprint, now(), 1)
  on conflict (action, fingerprint) do update
  set
    window_started_at = case
      when public.request_rate_limits.window_started_at <= now() - make_interval(secs => p_window_seconds)
      then now()
      else public.request_rate_limits.window_started_at
    end,
    request_count = case
      when public.request_rate_limits.window_started_at <= now() - make_interval(secs => p_window_seconds)
      then 1
      else public.request_rate_limits.request_count + 1
    end
  returning request_count into current_count;

  delete from public.request_rate_limits
  where window_started_at < now() - interval '24 hours';

  return current_count <= p_limit;
end;
$$;

revoke all on function public.consume_request_rate_limit(text, text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_request_rate_limit(text, text, integer, integer) to service_role;

comment on table public.request_rate_limits is
  'Short-lived, one-way request fingerprints used only for abuse prevention.';
