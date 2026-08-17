create or replace function public.schoolix_bootstrap_super_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if lower(coalesce(new.email, '')) = 'anshbajpai4@gmail.com' then
    insert into public.firestore_documents (
      path,
      path_depth,
      collection_name,
      document_id,
      school_id,
      data,
      updated_at
    )
    values (
      'users/' || new.id::text,
      2,
      'users',
      new.id::text,
      new.id::text,
      jsonb_build_object(
        'uid', new.id::text,
        'name', 'Ansh Bajpai',
        'email', 'anshbajpai4@gmail.com',
        'role', 'superAdmin',
        'superAdmin', true,
        'access', true,
        'updatedAt', now()
      ),
      now()
    )
    on conflict (path) do update set
      data = public.firestore_documents.data || excluded.data,
      school_id = excluded.school_id,
      updated_at = now();

    insert into public.schoolix_users (
      id,
      auth_uid,
      school_id,
      admin_id,
      email,
      role,
      name,
      access,
      data,
      updated_at
    )
    values (
      new.id::text,
      new.id,
      null,
      null,
      'anshbajpai4@gmail.com',
      'superAdmin',
      'Ansh Bajpai',
      true,
      jsonb_build_object(
        'uid', new.id::text,
        'email', 'anshbajpai4@gmail.com',
        'role', 'superAdmin',
        'superAdmin', true,
        'access', true
      ),
      now()
    )
    on conflict (id) do update set
      auth_uid = excluded.auth_uid,
      email = excluded.email,
      role = excluded.role,
      name = excluded.name,
      access = true,
      data = public.schoolix_users.data || excluded.data,
      updated_at = now();
  end if;

  return new;
end;
$$;

drop trigger if exists schoolix_bootstrap_super_admin_trigger on auth.users;

create trigger schoolix_bootstrap_super_admin_trigger
after insert or update of email on auth.users
for each row
execute function public.schoolix_bootstrap_super_admin();

do $$
declare
  super_admin auth.users%rowtype;
begin
  for super_admin in
    select * from auth.users where lower(coalesce(email, '')) = 'anshbajpai4@gmail.com'
  loop
    insert into public.firestore_documents (
      path,
      path_depth,
      collection_name,
      document_id,
      school_id,
      data,
      updated_at
    )
    values (
      'users/' || super_admin.id::text,
      2,
      'users',
      super_admin.id::text,
      super_admin.id::text,
      jsonb_build_object(
        'uid', super_admin.id::text,
        'name', 'Ansh Bajpai',
        'email', 'anshbajpai4@gmail.com',
        'role', 'superAdmin',
        'superAdmin', true,
        'access', true,
        'updatedAt', now()
      ),
      now()
    )
    on conflict (path) do update set
      data = public.firestore_documents.data || excluded.data,
      school_id = excluded.school_id,
      updated_at = now();

    insert into public.schoolix_users (
      id,
      auth_uid,
      school_id,
      admin_id,
      email,
      role,
      name,
      access,
      data,
      updated_at
    )
    values (
      super_admin.id::text,
      super_admin.id,
      null,
      null,
      'anshbajpai4@gmail.com',
      'superAdmin',
      'Ansh Bajpai',
      true,
      jsonb_build_object(
        'uid', super_admin.id::text,
        'email', 'anshbajpai4@gmail.com',
        'role', 'superAdmin',
        'superAdmin', true,
        'access', true
      ),
      now()
    )
    on conflict (id) do update set
      auth_uid = excluded.auth_uid,
      email = excluded.email,
      role = excluded.role,
      name = excluded.name,
      access = true,
      data = public.schoolix_users.data || excluded.data,
      updated_at = now();
  end loop;
end;
$$;
