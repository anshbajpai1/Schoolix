import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'node:fs/promises';
import { injectRuntimeEnv, loadRuntimeEnv } from './scripts/runtime-env.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const runtimeEnv = await loadRuntimeEnv(__dirname);

async function sendInjectedFile(res, filePath) {
  const content = await readFile(filePath, 'utf8');
  res.type(path.extname(filePath));
  res.send(injectRuntimeEnv(content, runtimeEnv));
}

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(self), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
  "Cross-Origin-Resource-Policy": "same-origin"
};

app.disable("x-powered-by");

app.use((req, res, next) => {
  Object.entries(securityHeaders).forEach(([key, value]) => res.setHeader(key, value));
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://www.googleapis.com https://apis.google.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://checkout.razorpay.com",
      "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com",
      "font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.googleapis.com https://*.gstatic.com https://*.firebaseio.com https://*.firebaseapp.com https://*.supabase.co wss://*.supabase.co https://api.cloudinary.com https://checkout.razorpay.com https://api.razorpay.com https://*.openstreetmap.org https://*.tile.openstreetmap.org https://cdn.jsdelivr.net",
      "worker-src 'self' blob:",
      "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com https://checkout.razorpay.com",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'"
    ].join("; ")
  );
  next();
});

app.use('/api/supabase', async (req, res) => {
  const supabaseUrl = String(runtimeEnv.SUPABASE_URL || 'https://ezkmeedcqetztkeppxil.supabase.co').replace(/\/$/, '');
  const anonKey = String(runtimeEnv.SUPABASE_ANON_KEY || runtimeEnv.SCHOOLIX_SUPABASE_ANON_KEY || '').trim();
  const upstreamPath = req.originalUrl.replace(/^\/api\/supabase\/?/, '');
  const allowed = ['auth/v1/', 'functions/v1/', 'rest/v1/', 'storage/v1/'].some((prefix) => upstreamPath.startsWith(prefix));
  if (!allowed) return res.status(404).json({ error: 'Unsupported upstream path' });
  if (!anonKey) return res.status(503).json({ error: 'Server configuration is incomplete' });

  const headers = { ...req.headers, apikey: anonKey };
  ['host', 'content-length', 'cookie', 'origin', 'referer', 'x-forwarded-for'].forEach((name) => delete headers[name]);
  if (!headers.authorization || /^Bearer\s*$/i.test(headers.authorization)) {
    headers.authorization = `Bearer ${anonKey}`;
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks);
    const upstream = await fetch(`${supabaseUrl}/${upstreamPath}`, {
      method: req.method,
      headers,
      body,
      redirect: 'manual'
    });
    res.status(upstream.status);
    upstream.headers.forEach((value, key) => {
      if (!['content-encoding', 'content-length', 'set-cookie'].includes(key.toLowerCase())) res.setHeader(key, value);
    });
    res.setHeader('Cache-Control', 'no-store');
    res.send(Buffer.from(await upstream.arrayBuffer()));
  } catch {
    res.status(502).json({ error: 'Upstream service is unavailable' });
  }
});

app.get('/dist/Schoolix.apk', (req, res, next) => {
  res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  res.setHeader('Content-Disposition', 'attachment; filename="Schoolix.apk"');
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.get('/', (req, res) => {
  sendInjectedFile(res, path.join(__dirname, 'index.html')).catch(() => res.sendStatus(500));
});

app.get(['/react', '/react/', '/react.html'], (_req, res) => {
  res.redirect(302, '/');
});

app.use(async (req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  if (!/\.(?:html|js|css|json|webmanifest)$/i.test(req.path)) return next();
  const filePath = path.resolve(__dirname, `.${decodeURIComponent(req.path)}`);
  if (!filePath.startsWith(`${__dirname}${path.sep}`)) return res.sendStatus(403);
  try {
    await sendInjectedFile(res, filePath);
  } catch (error) {
    if (error?.code === 'ENOENT') return next();
    next(error);
  }
});

app.use(express.static(__dirname, {
  dotfiles: "deny",
  fallthrough: false,
  setHeaders(res, filePath) {
    if (filePath.endsWith(".html") || filePath.endsWith("sw.js")) {
      res.setHeader("Cache-Control", "no-store");
    } else if (/\.(?:js|css|svg|webmanifest)$/i.test(filePath)) {
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    }
  }
}));

app.listen(port);
