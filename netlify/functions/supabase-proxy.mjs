const ALLOWED_PREFIXES = ["auth/v1/", "functions/v1/", "rest/v1/", "storage/v1/"];

function responseHeaders(upstreamHeaders = new Headers()) {
  const headers = new Headers(upstreamHeaders);
  headers.delete("content-encoding");
  headers.delete("content-length");
  headers.delete("set-cookie");
  headers.set("Cache-Control", "no-store");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Headers", "authorization, content-type, prefer, range, x-client-info, x-firebase-token");
  headers.set("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
  return headers;
}

function upstreamPath(url) {
  const markers = ["/.netlify/functions/supabase-proxy/", "/api/supabase/"];
  const marker = markers.find((item) => url.pathname.includes(item));
  return marker ? decodeURIComponent(url.pathname.split(marker)[1] || "") : "";
}

export default async function handler(request) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: responseHeaders() });
  }

  const supabaseUrl = String(process.env.SUPABASE_URL || "").replace(/\/$/, "");
  const anonKey = String(process.env.SUPABASE_ANON_KEY || "").trim();
  if (!supabaseUrl || !anonKey) {
    return Response.json({ error: "Server configuration is incomplete" }, { status: 503, headers: responseHeaders() });
  }

  const requestUrl = new URL(request.url);
  const path = upstreamPath(requestUrl);
  if (!ALLOWED_PREFIXES.some((prefix) => path.startsWith(prefix))) {
    return Response.json({ error: "Unsupported upstream path" }, { status: 404, headers: responseHeaders() });
  }

  const headers = new Headers(request.headers);
  ["host", "content-length", "cookie", "origin", "referer", "x-forwarded-for", "x-nf-client-connection-ip"].forEach((name) => headers.delete(name));
  headers.set("apikey", anonKey);
  const authorization = headers.get("authorization") || "";
  if (!authorization || /^Bearer\s*$/i.test(authorization)) {
    headers.set("authorization", `Bearer ${anonKey}`);
  }

  const target = `${supabaseUrl}/${path}${requestUrl.search}`;
  const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer();

  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body,
      redirect: "manual"
    });
    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders(upstream.headers)
    });
  } catch {
    return Response.json({ error: "Upstream service is unavailable" }, { status: 502, headers: responseHeaders() });
  }
}
