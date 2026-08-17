create extension if not exists pgcrypto;

create table if not exists public.firestore_documents (
  path text primary key,
  path_depth integer not null,
  collection_name text not null,
  document_id text not null,
  school_id text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schoolix_schools (
  id text primary key,
  name text,
  email text,
  phone text,
  address text,
  access boolean not null default true,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schoolix_users (
  id text primary key,
  auth_uid uuid references auth.users(id) on delete set null,
  school_id text references public.schoolix_schools(id) on delete cascade,
  admin_id text references public.schoolix_schools(id) on delete cascade,
  email text,
  role text not null,
  name text,
  access boolean not null default true,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schoolix_students (
  id text primary key,
  school_id text not null references public.schoolix_schools(id) on delete cascade,
  student_id text,
  auth_uid text,
  name text,
  class_name text,
  section text,
  roll_no text,
  parent_email text,
  status text not null default 'active',
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, student_id)
);

create table if not exists public.schoolix_staff (
  id text primary key,
  school_id text not null references public.schoolix_schools(id) on delete cascade,
  user_id text references public.schoolix_users(id) on delete set null,
  role text not null,
  name text,
  email text,
  phone text,
  status text not null default 'active',
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schoolix_fees (
  id text primary key,
  school_id text not null references public.schoolix_schools(id) on delete cascade,
  student_id text,
  session_id text,
  month text,
  amount numeric,
  paid_amount numeric,
  status text,
  date_paid timestamptz,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schoolix_attendance (
  id text primary key,
  school_id text not null references public.schoolix_schools(id) on delete cascade,
  subject_type text not null default 'student',
  subject_id text,
  attendance_date date,
  status text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schoolix_accounts (
  id text primary key,
  school_id text not null references public.schoolix_schools(id) on delete cascade,
  entry_type text not null check (entry_type in ('credit', 'debit')),
  amount numeric not null check (amount > 0),
  reason text not null,
  transaction_date date,
  category text,
  payment_mode text,
  created_by text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schoolix_report_cards (
  id text primary key,
  school_id text not null references public.schoolix_schools(id) on delete cascade,
  student_id text,
  session_id text,
  term_id text,
  percentage numeric,
  grade text,
  locked boolean not null default false,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schoolix_notices (
  id text primary key,
  school_id text not null references public.schoolix_schools(id) on delete cascade,
  title text,
  message text,
  created_by text,
  deleted boolean not null default false,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists firestore_documents_school_collection_idx on public.firestore_documents (school_id, collection_name);
create index if not exists firestore_documents_collection_idx on public.firestore_documents (collection_name);
create index if not exists firestore_documents_depth_idx on public.firestore_documents (path_depth);
create index if not exists firestore_documents_data_gin_idx on public.firestore_documents using gin (data);
create index if not exists schoolix_users_role_school_idx on public.schoolix_users (role, school_id, admin_id);
create index if not exists schoolix_students_school_class_idx on public.schoolix_students (school_id, class_name, section);
create index if not exists schoolix_fees_school_student_idx on public.schoolix_fees (school_id, student_id, session_id, month);
create index if not exists schoolix_attendance_school_date_idx on public.schoolix_attendance (school_id, attendance_date, subject_type);
create index if not exists schoolix_accounts_school_date_idx on public.schoolix_accounts (school_id, transaction_date);

create or replace function public.schoolix_profile()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select data from public.firestore_documents where path = 'users/' || auth.uid()::text),
    (select data from public.firestore_documents where data->>'authUid' = auth.uid()::text and collection_name = 'users' limit 1),
    '{}'::jsonb
  );
$$;

create or replace function public.schoolix_is_super_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt()->>'email', '') = 'anshbajpai4@gmail.com'
    or public.schoolix_profile()->>'role' = 'superAdmin'
    or coalesce((public.schoolix_profile()->>'superAdmin')::boolean, false);
$$;

create or replace function public.schoolix_can_access_school(target_school_id text)
returns boolean
language sql
stable
as $$
  select auth.uid() is not null and (
    public.schoolix_is_super_admin()
    or auth.uid()::text = target_school_id
    or public.schoolix_profile()->>'schoolId' = target_school_id
    or public.schoolix_profile()->>'adminId' = target_school_id
    or public.schoolix_profile()->>'adminUID' = target_school_id
    or public.schoolix_profile()->>'adminUid' = target_school_id
    or public.schoolix_profile()->>'schoolUID' = target_school_id
    or public.schoolix_profile()->>'schoolUid' = target_school_id
  );
$$;

alter table public.firestore_documents enable row level security;
alter table public.schoolix_schools enable row level security;
alter table public.schoolix_users enable row level security;
alter table public.schoolix_students enable row level security;
alter table public.schoolix_staff enable row level security;
alter table public.schoolix_fees enable row level security;
alter table public.schoolix_attendance enable row level security;
alter table public.schoolix_accounts enable row level security;
alter table public.schoolix_report_cards enable row level security;
alter table public.schoolix_notices enable row level security;

create policy "schoolix_firestore_read"
on public.firestore_documents for select
using (
  path = 'appUpdates/latest'
  or public.schoolix_is_super_admin()
  or path = 'users/' || auth.uid()::text
  or (school_id is not null and public.schoolix_can_access_school(school_id))
  or (collection_name = 'users' and (
    data->>'schoolId' = public.schoolix_profile()->>'schoolId'
    or data->>'adminId' = public.schoolix_profile()->>'adminId'
    or data->>'schoolId' = public.schoolix_profile()->>'adminId'
    or data->>'adminId' = public.schoolix_profile()->>'schoolId'
  ))
);

create policy "schoolix_firestore_write"
on public.firestore_documents for all
using (
  public.schoolix_is_super_admin()
  or path = 'users/' || auth.uid()::text
  or (school_id is not null and public.schoolix_can_access_school(school_id))
  or (collection_name = 'users' and (
    public.schoolix_can_access_school(data->>'schoolId')
    or public.schoolix_can_access_school(data->>'adminId')
    or public.schoolix_can_access_school(data->>'adminUID')
    or public.schoolix_can_access_school(data->>'adminUid')
  ))
)
with check (
  public.schoolix_is_super_admin()
  or path = 'users/' || auth.uid()::text
  or (school_id is not null and public.schoolix_can_access_school(school_id))
  or (collection_name = 'users' and (
    public.schoolix_can_access_school(data->>'schoolId')
    or public.schoolix_can_access_school(data->>'adminId')
    or public.schoolix_can_access_school(data->>'adminUID')
    or public.schoolix_can_access_school(data->>'adminUid')
  ))
);

create policy "schoolix_normalized_read"
on public.schoolix_schools for select
using (public.schoolix_is_super_admin() or public.schoolix_can_access_school(id));

create policy "schoolix_normalized_write"
on public.schoolix_schools for all
using (public.schoolix_is_super_admin() or public.schoolix_can_access_school(id))
with check (public.schoolix_is_super_admin() or public.schoolix_can_access_school(id));

create policy "schoolix_user_read"
on public.schoolix_users for select
using (public.schoolix_is_super_admin() or id = auth.uid()::text or public.schoolix_can_access_school(coalesce(school_id, admin_id)));

create policy "schoolix_user_write"
on public.schoolix_users for all
using (public.schoolix_is_super_admin() or id = auth.uid()::text or public.schoolix_can_access_school(coalesce(school_id, admin_id)))
with check (public.schoolix_is_super_admin() or id = auth.uid()::text or public.schoolix_can_access_school(coalesce(school_id, admin_id)));

create policy "schoolix_school_child_read"
on public.schoolix_students for select
using (public.schoolix_can_access_school(school_id));

create policy "schoolix_school_child_write"
on public.schoolix_students for all
using (public.schoolix_can_access_school(school_id))
with check (public.schoolix_can_access_school(school_id));

create policy "schoolix_staff_read" on public.schoolix_staff for select using (public.schoolix_can_access_school(school_id));
create policy "schoolix_staff_write" on public.schoolix_staff for all using (public.schoolix_can_access_school(school_id)) with check (public.schoolix_can_access_school(school_id));
create policy "schoolix_fees_read" on public.schoolix_fees for select using (public.schoolix_can_access_school(school_id));
create policy "schoolix_fees_write" on public.schoolix_fees for all using (public.schoolix_can_access_school(school_id)) with check (public.schoolix_can_access_school(school_id));
create policy "schoolix_attendance_read" on public.schoolix_attendance for select using (public.schoolix_can_access_school(school_id));
create policy "schoolix_attendance_write" on public.schoolix_attendance for all using (public.schoolix_can_access_school(school_id)) with check (public.schoolix_can_access_school(school_id));
create policy "schoolix_accounts_read" on public.schoolix_accounts for select using (public.schoolix_can_access_school(school_id));
create policy "schoolix_accounts_write" on public.schoolix_accounts for all using (public.schoolix_can_access_school(school_id)) with check (public.schoolix_can_access_school(school_id));
create policy "schoolix_report_cards_read" on public.schoolix_report_cards for select using (public.schoolix_can_access_school(school_id));
create policy "schoolix_report_cards_write" on public.schoolix_report_cards for all using (public.schoolix_can_access_school(school_id)) with check (public.schoolix_can_access_school(school_id));
create policy "schoolix_notices_read" on public.schoolix_notices for select using (public.schoolix_can_access_school(school_id));
create policy "schoolix_notices_write" on public.schoolix_notices for all using (public.schoolix_can_access_school(school_id)) with check (public.schoolix_can_access_school(school_id));
