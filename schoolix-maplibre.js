import {
  MAPLIBRE_CDN_CSS,
  MAPLIBRE_CDN_JS,
  MAP_STYLE_URL,
  MAP_TILE_URL
} from "./supabase-config.js";

let mapLibrePromise = null;

export function renderMapFallback(container, message = "Unable to load map. Please check your internet connection.") {
  if (!container) return;
  container.innerHTML = `
    <div class="sx-map-fallback">
      <strong>Map unavailable</strong>
      <span>${escapeHtml(message)}</span>
    </div>
  `;
}

export async function loadMapLibre() {
  if (window.maplibregl) return window.maplibregl;
  if (mapLibrePromise) return mapLibrePromise;

  mapLibrePromise = new Promise((resolve, reject) => {
    ensureStylesheet(MAPLIBRE_CDN_CSS);
    const script = document.createElement("script");
    script.src = MAPLIBRE_CDN_JS;
    script.async = true;
    script.defer = true;
    script.onload = () => window.maplibregl ? resolve(window.maplibregl) : reject(new Error("MapLibre did not initialize."));
    script.onerror = () => reject(new Error("Unable to load map. Please check your internet connection."));
    document.head.appendChild(script);
  });

  return mapLibrePromise;
}

export function mapStyle() {
  const styleUrl = String(MAP_STYLE_URL || "").trim();
  if (styleUrl) return styleUrl;
  return {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: [String(MAP_TILE_URL || "").trim()],
        tileSize: 256,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    },
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm"
      }
    ]
  };
}

export async function createVehicleMap(container, options = {}) {
  if (!container) return null;
  try {
    const maplibregl = await loadMapLibre();
    container.innerHTML = "";

    const map = new maplibregl.Map({
      container,
      style: mapStyle(),
      center: toLngLat(options.center) || [80.9462, 26.8467],
      zoom: options.zoom || 13,
      attributionControl: true
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: false }), "top-right");

    let follow = true;
    map.on("dragstart", () => { follow = false; });
    map.on("zoomstart", () => { follow = false; });

    const recenter = document.createElement("button");
    recenter.type = "button";
    recenter.className = "sx-map-recenter";
    recenter.textContent = options.recenterLabel || "Re-center";
    recenter.addEventListener("click", () => {
      follow = true;
      if (api.markers.size > 1) {
        api.fitAll();
        return;
      }
      const latest = [...api.markers.values()].at(-1);
      if (latest) map.easeTo({ center: latest.marker.getLngLat(), zoom: Math.max(map.getZoom(), 15), duration: 450 });
    });
    container.appendChild(recenter);

    const api = {
      maplibregl,
      map,
      markers: new Map(),
      clearMissing(vehicleIds = []) {
        const keep = new Set(vehicleIds.map((id) => String(id)));
        [...this.markers.keys()].forEach((id) => {
          if (!keep.has(String(id))) this.clearVehicle(id);
        });
      },
      setVehicle(vehicleId, location, label = "Vehicle", details = {}) {
        const lat = Number(location?.latitude);
        const lng = Number(location?.longitude);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
        const lngLat = [lng, lat];
        let entry = this.markers.get(vehicleId);
        if (!entry) {
          const element = vehicleMarkerElement(details.status || "live", label, details);
          const popup = new maplibregl.Popup({ offset: 18 }).setHTML(vehiclePopupHtml(label, location, details));
          const marker = new maplibregl.Marker({ element, anchor: "center" })
            .setLngLat(lngLat)
            .setPopup(popup)
            .addTo(map);
          entry = { marker, element, last: lngLat };
          this.markers.set(vehicleId, entry);
        } else {
          moveMarkerSmooth(entry.marker, entry.last, lngLat);
          entry.last = lngLat;
          entry.element.dataset.status = details.status || locationStatus(location.updated_at);
          updateVehicleMarkerElement(entry.element, label, details);
          entry.marker.setPopup(new maplibregl.Popup({ offset: 18 }).setHTML(vehiclePopupHtml(label, location, details)));
        }
        if (follow) map.easeTo({ center: lngLat, duration: 450 });
      },
      clearVehicle(vehicleId) {
        const entry = this.markers.get(vehicleId);
        entry?.marker?.remove();
        this.markers.delete(vehicleId);
      },
      fitAll() {
        const entries = [...this.markers.values()];
        if (!entries.length) return;
        const bounds = new maplibregl.LngLatBounds();
        entries.forEach((entry) => bounds.extend(entry.marker.getLngLat()));
        map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 450 });
      }
    };

    map.on("error", (event) => console.warn("MapLibre error:", event?.error || event));
    return api;
  } catch (error) {
    renderMapFallback(container, error.message);
    return null;
  }
}

export function locationStatus(updatedAt, staleAfterMs = 90000) {
  if (!updatedAt) return "stale";
  const age = Date.now() - new Date(updatedAt).getTime();
  return age > staleAfterMs ? "stale" : "live";
}

// Browser geolocation reports speed in m/s; persisted transport locations use km/h.
export function calibratedSpeedKmh(value, source = "kmh") {
  const raw = Number(value);
  if (!Number.isFinite(raw) || raw <= 0) return 0;
  const kmh = source === "mps" ? raw * 3.6 : raw;
  return Math.round(Math.min(180, kmh) * 10) / 10;
}

function ensureStylesheet(href) {
  if (!href || document.querySelector(`link[href="${cssEscape(href)}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function vehicleMarkerElement(status = "live", label = "Vehicle", details = {}) {
  const el = document.createElement("div");
  el.className = "sx-vehicle-marker";
  el.dataset.status = status;
  updateVehicleMarkerElement(el, label, details);
  return el;
}

function updateVehicleMarkerElement(el, label = "Vehicle", details = {}) {
  if (!el) return;
  const driver = String(details.driver || "").trim();
  const title = String(label || "Vehicle").trim();
  el.innerHTML = `
    <span class="sx-vehicle-marker-dot" aria-hidden="true">${vehicleAvatarSvg()}</span>
    <span class="sx-vehicle-marker-label">
      <strong>${escapeHtml(title)}</strong>
      ${driver ? `<small>${escapeHtml(driver)}</small>` : ""}
    </span>
  `;
}

function vehicleAvatarSvg() {
  return `
    <svg class="sx-vehicle-avatar" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle class="sx-vehicle-avatar-pulse" cx="24" cy="24" r="20"></circle>
      <path class="sx-vehicle-avatar-body" d="M11 25.5c0-1.7.4-3.3 1.2-4.7l3.1-5.8A6 6 0 0 1 20.6 12h6.8a6 6 0 0 1 5.3 3l3.1 5.8c.8 1.4 1.2 3 1.2 4.7V32a3 3 0 0 1-3 3h-1.1a4.7 4.7 0 0 1-9.2 0h-.4a4.7 4.7 0 0 1-9.2 0H14a3 3 0 0 1-3-3v-6.5Z"></path>
      <path class="sx-vehicle-avatar-window" d="M18 16.5h12l2.5 5H15.5l2.5-5Z"></path>
      <path class="sx-vehicle-avatar-light" d="M14.5 26.5h5M28.5 26.5h5"></path>
      <circle class="sx-vehicle-avatar-wheel" cx="18.8" cy="35" r="2.5"></circle>
      <circle class="sx-vehicle-avatar-wheel" cx="29.2" cy="35" r="2.5"></circle>
    </svg>
  `;
}

function moveMarkerSmooth(marker, from, to) {
  if (!from) {
    marker.setLngLat(to);
    return;
  }
  const start = performance.now();
  const duration = 650;
  const animate = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    marker.setLngLat([
      from[0] + (to[0] - from[0]) * eased,
      from[1] + (to[1] - from[1]) * eased
    ]);
    if (t < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

function vehiclePopupHtml(label, location = {}, details = {}) {
  const speed = calibratedSpeedKmh(location.speed);
  const updated = location.updated_at || location.timestamp || "";
  const status = String(details.status || locationStatus(updated)).toUpperCase();
  return `
    <div class="sx-map-popup">
      <strong>${escapeHtml(label)}</strong>
      <span>${escapeHtml(status)}</span>
      ${details.driver ? `<div>Driver: ${escapeHtml(details.driver)}</div>` : ""}
      ${details.route ? `<div>Route: ${escapeHtml(details.route)}</div>` : ""}
      <div>Speed: ${Math.round(speed)} km/h</div>
      <div>Updated: ${escapeHtml(relativeAge(updated))}</div>
      <div>${Number(location.latitude).toFixed(5)}, ${Number(location.longitude).toFixed(5)}</div>
    </div>
  `;
}

function relativeAge(value) {
  if (!value) return "-";
  const seconds = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.round(seconds / 60)}m ago`;
}

function toLngLat(center) {
  if (!center) return null;
  if (Array.isArray(center)) return center;
  const lat = Number(center.lat ?? center.latitude);
  const lng = Number(center.lng ?? center.longitude);
  return Number.isFinite(lat) && Number.isFinite(lng) ? [lng, lat] : null;
}

function cssEscape(value) {
  return String(value).replace(/"/g, '\\"');
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
