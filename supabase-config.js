// Browser traffic goes through the Schoolix gateway. Local static previews
// (for example VS Code on port 3002) use the Node gateway on port 3001.
const browserLocation = globalThis.location;
const isLocalPreview = ["localhost", "127.0.0.1"].includes(String(browserLocation?.hostname || "").toLowerCase());
const isLocalGateway = String(browserLocation?.hostname || "").toLowerCase() === "localhost" && browserLocation?.port === "3001";
const localGatewayOrigin = isLocalPreview && !isLocalGateway
  ? `${browserLocation.protocol}//localhost:3001`
  : "";
export const SUPABASE_URL = `${localGatewayOrigin}/api/supabase`;

export const MAPLIBRE_CDN_JS =
  "https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js";

export const MAPLIBRE_CDN_CSS =
  "https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css";

// Development/default raster tiles. For production, point this to a school-owned
// or paid OSM-compatible tile service to avoid overusing public OSM tile servers.
export const MAP_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

export const MAP_STYLE_URL = "";
