// Browser traffic goes through the same-origin gateway. The gateway adds the
// Supabase anon key server-side; no Supabase credential is shipped in assets.
export const SUPABASE_URL = "/api/supabase";

export const MAPLIBRE_CDN_JS =
  "https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js";

export const MAPLIBRE_CDN_CSS =
  "https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css";

// Development/default raster tiles. For production, point this to a school-owned
// or paid OSM-compatible tile service to avoid overusing public OSM tile servers.
export const MAP_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

export const MAP_STYLE_URL = "";
