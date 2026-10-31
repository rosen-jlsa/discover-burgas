create or replace function public.submit_issue_report(
  p_category text,
  p_page text,
  p_message text,
  p_contact text default null
) returns public.issue_reports
language plpgsql
security definer
set search_path = ''
as $$
declare saved public.issue_reports;
begin
  if p_category not in ('map', 'api', 'content', 'accessibility', 'other') then raise exception 'invalid category'; end if;
  if char_length(trim(p_message)) not between 10 and 2000 then raise exception 'invalid message'; end if;
  if char_length(coalesce(p_page, '')) > 300 then raise exception 'invalid page'; end if;
  if char_length(coalesce(p_contact, '')) > 200 then raise exception 'invalid contact'; end if;
  insert into public.issue_reports(category,page,message,contact)
    values (p_category, coalesce(p_page,''), trim(p_message), nullif(trim(coalesce(p_contact,'')),''))
    returning * into saved;
  return saved;
end;
$$;

revoke all on function public.submit_issue_report(text,text,text,text) from public;
grant execute on function public.submit_issue_report(text,text,text,text) to anon, authenticated;
