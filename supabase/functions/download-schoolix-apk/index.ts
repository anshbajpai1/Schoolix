const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
};

import { APK_BASE64_CHUNKS, APK_SIZE, APK_VERSION_CODE, APK_VERSION_NAME } from "./apk-data.ts";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function base64ToBytes(base64: string) {
  const binary = atob(base64.replace(/\s+/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const headers = {
      ...corsHeaders,
      "Content-Type": "application/vnd.android.package-archive",
      "Content-Disposition": `attachment; filename="Schoolix.apk"`,
      "Cache-Control": "no-store",
      "Content-Length": String(APK_SIZE),
      "X-Schoolix-Version-Code": String(APK_VERSION_CODE),
      "X-Schoolix-Version-Name": APK_VERSION_NAME,
    };

    if (req.method === "HEAD") {
      return new Response(null, { status: 200, headers });
    }

    const apk = base64ToBytes(APK_BASE64_CHUNKS.join(""));
    return new Response(apk, { status: 200, headers });
  } catch (error) {
    console.error("APK download proxy failed:", error);
    return jsonResponse({
      error: error instanceof Error ? error.message : "APK download failed",
    }, 500);
  }
});
