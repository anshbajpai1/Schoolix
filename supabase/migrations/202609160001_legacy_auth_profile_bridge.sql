-- Legacy Firebase accounts receive a new Supabase auth UUID during their first
-- password login.  Their existing user document is still keyed by the Firebase
-- UID, so transport RLS could not resolve the admin profile and rejected valid
-- admins.  Resolve that bridge by trusted app metadata first, then by the
-- authenticated account's verified email.
create or replace function public.schoolix_profile()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (
      select data
      from public.firestore_documents
      where path = 'users/' || auth.uid()::text
      limit 1
    ),
    (
      select data
      from public.firestore_documents
      where data->>'authUid' = auth.uid()::text
        and collection_name = 'users'
      limit 1
    ),
    (
      select data
      from public.firestore_documents
      where path = 'users/' || coalesce(auth.jwt()->'app_metadata'->>'firebaseUid', auth.jwt()->'app_metadata'->>'legacyUid', '')
      limit 1
    ),
    (
      select data
      from public.firestore_documents
      where collection_name = 'users'
        and lower(coalesce(data->>'email', data->>'authEmail', '')) = lower(coalesce(auth.jwt()->>'email', ''))
      limit 1
    ),
    '{}'::jsonb
  );
$$;
