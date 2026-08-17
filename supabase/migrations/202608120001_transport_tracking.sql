create extension if not exists pgcrypto;

create table if not exists public.schoolix_transport_drivers (
  id text primary key default gen_random_uuid()::text,
  school_id text not null references public.schoolix_schools(id) on delete cascade,
  auth_uid uuid references auth.users(id) on delete set null,
  name text not null,
  phone text,
  email text,
  assigned_vehicle_id text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schoolix_transport_vehicles (
  id text primary key,
  school_id text not null references public.schoolix_schools(id) on delete cascade,
  vehicle_number text not null,
  vehicle_type text not null default 'Bus',
  driver_id text references public.schoolix_transport_drivers(id) on delete set null,
  route_id text,
  status text not null default 'active' check (status in ('active', 'inactive', 'maintenance')),
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, vehicle_number)
);

alter table public.schoolix_transport_drivers
  add constraint schoolix_transport_drivers_vehicle_fk
  foreign key (assigned_vehicle_id)
  references public.schoolix_transport_vehicles(id)
  on delete set null
  deferrable initially deferred;

create table if not exists public.schoolix_transport_trips (
  id text primary key default gen_random_uuid()::text,
  school_id text not null references public.schoolix_schools(id) on delete cascade,
  vehicle_id text not null references public.schoolix_transport_vehicles(id) on delete cascade,
  driver_id text references public.schoolix_transport_drivers(id) on delete set null,
  route_id text,
  status text not null default 'scheduled' check (status in ('scheduled', 'active', 'completed', 'cancelled')),
  started_at timestamptz,
  ended_at timestamptz,
  started_by text,
  ended_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists schoolix_one_active_trip_per_vehicle_idx
  on public.schoolix_transport_trips (vehicle_id)
  where status = 'active';

create table if not exists public.schoolix_vehicle_live_locations (
  vehicle_id text primary key references public.schoolix_transport_vehicles(id) on delete cascade,
  school_id text not null references public.schoolix_schools(id) on delete cascade,
  trip_id text not null references public.schoolix_transport_trips(id) on delete cascade,
  latitude double precision not null,
  longitude double precision not null,
  speed double precision,
  heading double precision,
  accuracy double precision,
  updated_at timestamptz not null default now()
);

create table if not exists public.schoolix_student_transport (
  id text primary key default gen_random_uuid()::text,
  school_id text not null references public.schoolix_schools(id) on delete cascade,
  student_id text not null,
  vehicle_id text not null references public.schoolix_transport_vehicles(id) on delete cascade,
  route_id text,
  stop_id text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, student_id, vehicle_id)
);

create table if not exists public.schoolix_tracking_events (
  id text primary key default gen_random_uuid()::text,
  school_id text not null references public.schoolix_schools(id) on delete cascade,
  vehicle_id text references public.schoolix_transport_vehicles(id) on delete set null,
  trip_id text references public.schoolix_transport_trips(id) on delete set null,
  action text not null check (action in ('TRIP_STARTED', 'TRIP_STOPPED', 'DRIVER_ASSIGNED', 'DRIVER_UNASSIGNED')),
  performed_by text,
  performed_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists schoolix_transport_drivers_school_idx on public.schoolix_transport_drivers (school_id, status);
create index if not exists schoolix_transport_drivers_auth_idx on public.schoolix_transport_drivers (auth_uid);
create index if not exists schoolix_transport_vehicles_school_idx on public.schoolix_transport_vehicles (school_id, status);
create index if not exists schoolix_transport_vehicles_driver_idx on public.schoolix_transport_vehicles (driver_id);
create index if not exists schoolix_transport_trips_vehicle_status_idx on public.schoolix_transport_trips (vehicle_id, status);
create index if not exists schoolix_transport_trips_driver_status_idx on public.schoolix_transport_trips (driver_id, status);
create index if not exists schoolix_vehicle_live_locations_trip_idx on public.schoolix_vehicle_live_locations (trip_id);
create index if not exists schoolix_student_transport_student_idx on public.schoolix_student_transport (school_id, student_id, active);
create index if not exists schoolix_student_transport_vehicle_idx on public.schoolix_student_transport (vehicle_id, active);
create index if not exists schoolix_tracking_events_vehicle_idx on public.schoolix_tracking_events (vehicle_id, performed_at desc);

create or replace function public.schoolix_transport_role()
returns text
language sql
stable
as $$
  select lower(coalesce(public.schoolix_profile()->>'role', ''));
$$;

create or replace function public.schoolix_transport_driver_id()
returns text
language sql
stable
as $$
  select d.id
  from public.schoolix_transport_drivers d
  where d.auth_uid = auth.uid()
  limit 1;
$$;

create or replace function public.schoolix_transport_parent_can_view_vehicle(target_vehicle_id text)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.schoolix_student_transport st
    join public.firestore_documents fd
      on fd.school_id = st.school_id
     and fd.collection_name = 'students'
     and (
       fd.data->>'studentId' = st.student_id
       or fd.document_id = st.student_id
       or fd.data->>'authUid' = auth.uid()::text
     )
    where st.vehicle_id = target_vehicle_id
      and st.active = true
      and (
        fd.data->>'authUid' = auth.uid()::text
        or lower(fd.data->>'parentEmail') = lower(coalesce(auth.jwt()->>'email', ''))
        or lower(fd.data->>'fatherEmail') = lower(coalesce(auth.jwt()->>'email', ''))
        or lower(fd.data->>'motherEmail') = lower(coalesce(auth.jwt()->>'email', ''))
        or lower(fd.data->>'guardianEmail') = lower(coalesce(auth.jwt()->>'email', ''))
      )
  );
$$;

create or replace function public.schoolix_start_transport_trip(target_vehicle_id text)
returns public.schoolix_transport_trips
language plpgsql
security definer
set search_path = public
as $$
declare
  vehicle_row public.schoolix_transport_vehicles%rowtype;
  trip_row public.schoolix_transport_trips%rowtype;
begin
  select * into vehicle_row
  from public.schoolix_transport_vehicles
  where id = target_vehicle_id
  for update;

  if not found then
    raise exception 'Vehicle not found';
  end if;

  if not public.schoolix_can_access_school(vehicle_row.school_id) then
    raise exception 'Access denied';
  end if;

  if exists (
    select 1 from public.schoolix_transport_trips
    where vehicle_id = target_vehicle_id and status = 'active'
  ) then
    raise exception 'An active trip already exists for this vehicle';
  end if;

  insert into public.schoolix_transport_trips (
    school_id, vehicle_id, driver_id, route_id, status, started_at, started_by
  ) values (
    vehicle_row.school_id,
    vehicle_row.id,
    vehicle_row.driver_id,
    vehicle_row.route_id,
    'active',
    now(),
    auth.uid()::text
  )
  returning * into trip_row;

  insert into public.schoolix_tracking_events (school_id, vehicle_id, trip_id, action, performed_by)
  values (vehicle_row.school_id, vehicle_row.id, trip_row.id, 'TRIP_STARTED', auth.uid()::text);

  return trip_row;
end;
$$;

create or replace function public.schoolix_stop_transport_trip(target_vehicle_id text)
returns public.schoolix_transport_trips
language plpgsql
security definer
set search_path = public
as $$
declare
  vehicle_row public.schoolix_transport_vehicles%rowtype;
  trip_row public.schoolix_transport_trips%rowtype;
begin
  select * into vehicle_row
  from public.schoolix_transport_vehicles
  where id = target_vehicle_id
  for update;

  if not found then
    raise exception 'Vehicle not found';
  end if;

  if not public.schoolix_can_access_school(vehicle_row.school_id) then
    raise exception 'Access denied';
  end if;

  select * into trip_row
  from public.schoolix_transport_trips
  where vehicle_id = target_vehicle_id and status = 'active'
  order by started_at desc
  limit 1
  for update;

  if not found then
    raise exception 'No active trip exists for this vehicle';
  end if;

  update public.schoolix_transport_trips
  set status = 'completed',
      ended_at = now(),
      ended_by = auth.uid()::text,
      updated_at = now()
  where id = trip_row.id
  returning * into trip_row;

  delete from public.schoolix_vehicle_live_locations
  where vehicle_id = target_vehicle_id and trip_id = trip_row.id;

  insert into public.schoolix_tracking_events (school_id, vehicle_id, trip_id, action, performed_by)
  values (vehicle_row.school_id, vehicle_row.id, trip_row.id, 'TRIP_STOPPED', auth.uid()::text);

  return trip_row;
end;
$$;

alter table public.schoolix_transport_drivers enable row level security;
alter table public.schoolix_transport_vehicles enable row level security;
alter table public.schoolix_transport_trips enable row level security;
alter table public.schoolix_vehicle_live_locations enable row level security;
alter table public.schoolix_student_transport enable row level security;
alter table public.schoolix_tracking_events enable row level security;

drop policy if exists "transport_drivers_read" on public.schoolix_transport_drivers;
create policy "transport_drivers_read" on public.schoolix_transport_drivers for select
using (
  public.schoolix_can_access_school(school_id)
  or auth_uid = auth.uid()
);

drop policy if exists "transport_drivers_admin_write" on public.schoolix_transport_drivers;
create policy "transport_drivers_admin_write" on public.schoolix_transport_drivers for all
using (public.schoolix_can_access_school(school_id))
with check (public.schoolix_can_access_school(school_id));

drop policy if exists "transport_vehicles_read" on public.schoolix_transport_vehicles;
create policy "transport_vehicles_read" on public.schoolix_transport_vehicles for select
using (
  public.schoolix_can_access_school(school_id)
  or driver_id = public.schoolix_transport_driver_id()
  or public.schoolix_transport_parent_can_view_vehicle(id)
);

drop policy if exists "transport_vehicles_admin_write" on public.schoolix_transport_vehicles;
create policy "transport_vehicles_admin_write" on public.schoolix_transport_vehicles for all
using (public.schoolix_can_access_school(school_id))
with check (public.schoolix_can_access_school(school_id));

drop policy if exists "transport_trips_read" on public.schoolix_transport_trips;
create policy "transport_trips_read" on public.schoolix_transport_trips for select
using (
  public.schoolix_can_access_school(school_id)
  or driver_id = public.schoolix_transport_driver_id()
  or (status = 'active' and public.schoolix_transport_parent_can_view_vehicle(vehicle_id))
);

drop policy if exists "transport_trips_admin_write" on public.schoolix_transport_trips;
create policy "transport_trips_admin_write" on public.schoolix_transport_trips for all
using (public.schoolix_can_access_school(school_id))
with check (public.schoolix_can_access_school(school_id));

drop policy if exists "transport_locations_read" on public.schoolix_vehicle_live_locations;
create policy "transport_locations_read" on public.schoolix_vehicle_live_locations for select
using (
  public.schoolix_can_access_school(school_id)
  or exists (
    select 1 from public.schoolix_transport_trips t
    where t.id = trip_id
      and t.status = 'active'
      and t.driver_id = public.schoolix_transport_driver_id()
  )
  or exists (
    select 1 from public.schoolix_transport_trips t
    where t.id = trip_id
      and t.status = 'active'
      and public.schoolix_transport_parent_can_view_vehicle(vehicle_id)
  )
);

drop policy if exists "transport_locations_driver_upsert" on public.schoolix_vehicle_live_locations;
create policy "transport_locations_driver_upsert" on public.schoolix_vehicle_live_locations for all
using (
  exists (
    select 1 from public.schoolix_transport_trips t
    where t.id = trip_id
      and t.vehicle_id = schoolix_vehicle_live_locations.vehicle_id
      and t.status = 'active'
      and t.driver_id = public.schoolix_transport_driver_id()
  )
)
with check (
  exists (
    select 1 from public.schoolix_transport_trips t
    where t.id = trip_id
      and t.vehicle_id = schoolix_vehicle_live_locations.vehicle_id
      and t.status = 'active'
      and t.driver_id = public.schoolix_transport_driver_id()
  )
);

drop policy if exists "student_transport_read" on public.schoolix_student_transport;
create policy "student_transport_read" on public.schoolix_student_transport for select
using (
  public.schoolix_can_access_school(school_id)
  or public.schoolix_transport_parent_can_view_vehicle(vehicle_id)
);

drop policy if exists "student_transport_admin_write" on public.schoolix_student_transport;
create policy "student_transport_admin_write" on public.schoolix_student_transport for all
using (public.schoolix_can_access_school(school_id))
with check (public.schoolix_can_access_school(school_id));

drop policy if exists "tracking_events_read" on public.schoolix_tracking_events;
create policy "tracking_events_read" on public.schoolix_tracking_events for select
using (public.schoolix_can_access_school(school_id));

drop policy if exists "tracking_events_admin_write" on public.schoolix_tracking_events;
create policy "tracking_events_admin_write" on public.schoolix_tracking_events for all
using (public.schoolix_can_access_school(school_id))
with check (public.schoolix_can_access_school(school_id));
