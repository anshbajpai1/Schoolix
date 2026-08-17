import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

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

app.get('/dist/Schoolix.apk', (req, res, next) => {
  res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  res.setHeader('Content-Disposition', 'attachment; filename="Schoolix.apk"');
  res.setHeader('Cache-Control', 'no-store');
  next();
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
