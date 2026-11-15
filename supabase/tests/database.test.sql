begin;
select plan(10);

select has_table('public', 'landmarks', 'landmarks table exists');
select has_table('public', 'cultural_routes', 'routes table exists');
select has_table('public', 'issue_reports', 'private reports table exists');
select has_column('public', 'landmarks', 'search_document', 'search document exists');
select has_index('public', 'landmarks', 'landmarks_search_document_idx', 'search document is indexed');
select has_index('public', 'issue_reports', 'issue_reports_idempotency_key_idx', 'idempotency key is unique');
select col_is_null('public', 'issue_reports', 'idempotency_key', 'legacy reports may omit idempotency metadata');
select policies_are('public', 'landmarks', array['published landmarks are readable'], 'landmark RLS policy is explicit');
select policies_are('public', 'issue_reports', array['private reports deny client access'], 'reports deny public client access');
select function_privs_are('public', 'consume_request_rate_limit', array['text','text','integer','integer'], 'service_role', array['EXECUTE'], 'rate limiter is service-only');

select * from finish();
rollback;
