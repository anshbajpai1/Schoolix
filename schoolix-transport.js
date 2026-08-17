import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase-config.js";

const AUTH_STORAGE_KEY = `sb-${new URL(SUPABASE_URL).hostname.split(".")[0]}-auth-token`;
const REALTIME_URL = `${SUPABASE_URL.replace(/^http/, "ws")}/realtime/v1/websocket`;
const CHANNELS = new Map();

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "null");
  } catch (_) {
    return null;
  }
}

export function accessToken() {
  return readSession()?.access_token || SUPABASE_ANON_KEY;
}

function headers(extra = {}) {
  const token = accessToken();
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...extra
  };
}

function url(path, params = {}) {
  const target = new URL(`${SUPABASE_URL}/rest/v1/${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") target.searchParams.set(key, value);
  });
  return target.toString();
}

async function jsonFetch(path, options = {}) {
  const response = await fetch(url(path, options.params), {
    method: options.method || "GET",
    headers: headers(options.headers),
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = data?.message || data?.hint || data?.details || response.statusText;
    const error = new Error(message || "Transport request failed");
    error.status = response.status;
    error.code = data?.code || "";
    error.path = path;
    if (response.status === 404 || /Could not find|schema cache|does not exist|function .* not found/i.test(message || "")) {
      error.transportSetupMissing = true;
    }
    if (response.status === 401 || response.status === 403 || /row-level security|permission denied|Access denied/i.test(message || "")) {
      error.transportAccessDenied = true;
    }
    throw error;
  }
  return data;
}

export function isTransportSetupMissing(error) {
  return Boolean(error?.transportSetupMissing || /Could not find|schema cache|does not exist|function .* not found/i.test(error?.message || ""));
}

export function isTransportAccessDenied(error) {
  return Boolean(error?.transportAccessDenied || /row-level security|permission denied|Access denied/i.test(error?.message || ""));
}

export function isTransportDriverReferenceMissing(error) {
  return Boolean(/schoolix_transport_vehicles_driver_id_fkey|foreign key constraint|violates foreign key constraint/i.test(error?.message || ""));
}

export async function listDrivers(schoolId) {
  return jsonFetch("schoolix_transport_drivers", {
    params: {
      school_id: `eq.${schoolId}`,
      order: "name.asc"
    }
  });
}

export async function upsertDriver(driver) {
  return jsonFetch("schoolix_transport_drivers", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: driver
  }).then((rows) => rows?.[0] || null);
}

export async function upsertVehicle(vehicle) {
  return jsonFetch("schoolix_transport_vehicles", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: vehicle
  }).then((rows) => rows?.[0] || null);
}

export async function assignDriver(driverId, vehicleId, schoolId) {
  await jsonFetch("schoolix_transport_drivers", {
    method: "PATCH",
    params: { id: `eq.${driverId}`, school_id: `eq.${schoolId}` },
    headers: { Prefer: "return=minimal" },
    body: { assigned_vehicle_id: vehicleId || null, updated_at: new Date().toISOString() }
  });
  if (vehicleId) {
    await jsonFetch("schoolix_transport_vehicles", {
      method: "PATCH",
      params: { id: `eq.${vehicleId}`, school_id: `eq.${schoolId}` },
      headers: { Prefer: "return=minimal" },
      body: { driver_id: driverId, updated_at: new Date().toISOString() }
    });
  }
}

export async function upsertStudentTransport(row) {
  return jsonFetch("schoolix_student_transport", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: row
  });
}

export async function deactivateStudentTransport(schoolId, studentId, vehicleId) {
  return jsonFetch("schoolix_student_transport", {
    method: "PATCH",
    params: {
      school_id: `eq.${schoolId}`,
      student_id: `eq.${studentId}`,
      vehicle_id: `eq.${vehicleId}`
    },
    headers: { Prefer: "return=minimal" },
    body: { active: false, updated_at: new Date().toISOString() }
  });
}

export async function activeTrips(vehicleIds = []) {
  if (!vehicleIds.length) return [];
  return jsonFetch("schoolix_transport_trips", {
    params: {
      vehicle_id: `in.(${vehicleIds.join(",")})`,
      status: "eq.active",
      order: "started_at.desc"
    }
  });
}

export async function startTrip(vehicleId) {
  return jsonFetch("rpc/schoolix_start_transport_trip", {
    method: "POST",
    body: { target_vehicle_id: vehicleId }
  });
}

export async function stopTrip(vehicleId) {
  return jsonFetch("rpc/schoolix_stop_transport_trip", {
    method: "POST",
    body: { target_vehicle_id: vehicleId }
  });
}

export async function liveLocations(vehicleIds = []) {
  if (!vehicleIds.length) return [];
  return jsonFetch("schoolix_vehicle_live_locations", {
    params: {
      vehicle_id: `in.(${vehicleIds.join(",")})`,
      order: "updated_at.desc"
    }
  });
}

export async function myDriverProfile() {
  const rows = await jsonFetch("schoolix_transport_drivers", {
    params: {
      select: "*,vehicle:schoolix_transport_vehicles(*)",
      auth_uid: `eq.${readSession()?.user?.id || ""}`,
      limit: "1"
    }
  });
  return rows?.[0] || null;
}

export async function parentVehicleForStudent(schoolId, studentId) {
  const rows = await jsonFetch("schoolix_student_transport", {
    params: {
      select: "*,vehicle:schoolix_transport_vehicles(*)",
      school_id: `eq.${schoolId}`,
      student_id: `eq.${studentId}`,
      active: "eq.true",
      limit: "1"
    }
  });
  return rows?.[0] || null;
}

export async function upsertLiveLocation(location) {
  return jsonFetch("rpc/schoolix_upsert_vehicle_live_location", {
    method: "POST",
    body: {
      target_vehicle_id: location.vehicle_id,
      target_trip_id: location.trip_id,
      target_latitude: location.latitude,
      target_longitude: location.longitude,
      target_speed: location.speed ?? null,
      target_heading: location.heading ?? null,
      target_accuracy: location.accuracy ?? null
    }
  });
}

function realtimeKey(table, filter) {
  return `${table}:${filter || ""}`;
}

export function subscribeTransport(table, filter, callback, fallbackLoader) {
  const key = realtimeKey(table, filter);
  unsubscribeTransport(key);
  let socket;
  const timers = [];

  const emitFallback = async () => {
    if (!fallbackLoader) return;
    try { callback(await fallbackLoader()); } catch (error) { console.warn("Transport fallback load failed", error); }
  };

  try {
    const socketUrl = new URL(REALTIME_URL);
    socketUrl.searchParams.set("apikey", SUPABASE_ANON_KEY);
    socketUrl.searchParams.set("vsn", "1.0.0");
    socket = new WebSocket(socketUrl);
    const topic = `realtime:public:${table}:${Math.random().toString(36).slice(2)}`;
    const joinRef = String(Date.now());
    socket.addEventListener("open", () => {
      socket.send(JSON.stringify({
        topic,
        event: "phx_join",
        payload: {
          config: {
            postgres_changes: [{ event: "*", schema: "public", table, filter }],
            broadcast: { self: false },
            presence: { key: "" }
          },
          access_token: accessToken()
        },
        ref: joinRef
      }));
      emitFallback();
    });
    socket.addEventListener("message", (event) => {
      let message;
      try { message = JSON.parse(event.data); } catch (_) { return; }
      if (message.event === "postgres_changes") callback(message.payload);
      if (message.event === "phx_error") emitFallback();
    });
    socket.addEventListener("close", () => {
      if (!CHANNELS.has(key)) return;
      timers.push(window.setTimeout(() => subscribeTransport(table, filter, callback, fallbackLoader), 3000));
    });
    timers.push(window.setInterval(() => {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ topic: "phoenix", event: "heartbeat", payload: {}, ref: String(Date.now()) }));
      }
    }, 25000));
  } catch (error) {
    console.warn("Realtime unavailable; using transport polling", error);
  }

  const fallbackIntervalMs = Number(window.SchoolixTransportLiveRefreshMs || 10000);
  timers.push(window.setInterval(emitFallback, Number.isFinite(fallbackIntervalMs) ? Math.max(2000, fallbackIntervalMs) : 10000));
  CHANNELS.set(key, () => {
    timers.forEach((timer) => {
      window.clearInterval(timer);
      window.clearTimeout(timer);
    });
    try { socket?.close(); } catch (_) {}
  });
  return () => unsubscribeTransport(key);
}

export function unsubscribeTransport(key) {
  const stop = CHANNELS.get(key);
  if (stop) stop();
  CHANNELS.delete(key);
}
