create or replace function public.schoolix_upsert_vehicle_live_location(
  target_vehicle_id text,
  target_trip_id text,
  target_latitude double precision,
  target_longitude double precision,
  target_speed double precision default null,
  target_heading double precision default null,
  target_accuracy double precision default null
)
returns public.schoolix_vehicle_live_locations
language plpgsql
security definer
set search_path = public
as $$
declare
  trip_row public.schoolix_transport_trips%rowtype;
  location_row public.schoolix_vehicle_live_locations%rowtype;
  driver_id text;
begin
  select * into trip_row
  from public.schoolix_transport_trips
  where id = target_trip_id
    and vehicle_id = target_vehicle_id
    and status = 'active';

  if not found then
    raise exception 'Active trip not found';
  end if;

  driver_id := public.schoolix_transport_driver_id();

  if not (
    public.schoolix_can_access_school(trip_row.school_id)
    or (trip_row.driver_id is not null and trip_row.driver_id = driver_id)
    or exists (
      select 1
      from public.schoolix_transport_vehicles v
      where v.id = target_vehicle_id
        and v.driver_id = driver_id
    )
    or exists (
      select 1
      from public.firestore_documents fd
      where fd.collection_name = 'users'
        and (
          fd.document_id = auth.uid()::text
          or fd.data->>'authUid' = auth.uid()::text
          or lower(fd.data->>'email') = lower(coalesce(auth.jwt()->>'email', ''))
          or lower(fd.data->>'authEmail') = lower(coalesce(auth.jwt()->>'email', ''))
        )
        and lower(coalesce(fd.data->>'role', '')) = 'driver'
        and (
          fd.data->>'assignedVehicleId' = target_vehicle_id
          or fd.data->>'vehicleId' = target_vehicle_id
          or fd.data->>'transportVehicleId' = target_vehicle_id
        )
    )
  ) then
    raise exception 'Access denied';
  end if;

  insert into public.schoolix_vehicle_live_locations (
    vehicle_id,
    school_id,
    trip_id,
    latitude,
    longitude,
    speed,
    heading,
    accuracy,
    updated_at
  ) values (
    target_vehicle_id,
    trip_row.school_id,
    target_trip_id,
    target_latitude,
    target_longitude,
    target_speed,
    target_heading,
    target_accuracy,
    now()
  )
  on conflict (vehicle_id) do update set
    school_id = excluded.school_id,
    trip_id = excluded.trip_id,
    latitude = excluded.latitude,
    longitude = excluded.longitude,
    speed = excluded.speed,
    heading = excluded.heading,
    accuracy = excluded.accuracy,
    updated_at = excluded.updated_at
  returning * into location_row;

  return location_row;
end;
$$;
