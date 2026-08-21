/**
 * Enterprise API Security Shield Middleware
 *
 * 1. Blocks raw browser address-bar direct navigation to API endpoints.
 * 2. Hides API endpoints behind a fake standard Nginx 403 Forbidden HTML error.
 * 3. Allows valid client AJAX/Fetch requests to pass through cleanly.
 */

const CLIENT_APP_SECRET = "saylani-lms-client-v1";

const FAKE_FORBIDDEN_HTML = `<!DOCTYPE html>
<html>
<head><title>403 Forbidden</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fff; color: #000; margin: 40px auto; max-width: 650px; padding: 0 20px;">
<h1 style="font-size: 28px; font-weight: 500; border-bottom: 1px solid #ccc; padding-bottom: 10px;">403 Forbidden</h1>
<p style="font-size: 14px; color: #333;">You don't have permission to access this resource.</p>
<hr style="border: 0; border-top: 1px solid #e0e0e0; margin-top: 20px;">
<p style="font-size: 12px; color: #777;">nginx</p>
</body>
</html>`;

export const apiShield = (req, res, next) => {
  // Allow preflight OPTIONS requests for CORS
  if (req.method === "OPTIONS") {
    return next();
  }

  const secFetchMode = req.headers["sec-fetch-mode"];
  const secFetchDest = req.headers["sec-fetch-dest"];
  const acceptHeader = req.headers["accept"] || "";
  const clientHeader = req.headers["x-app-client"];

  // 1. Detect Direct Browser Address Bar Navigation
  const isDirectBrowserNav =
    secFetchMode === "navigate" ||
    secFetchDest === "document" ||
    (req.method === "GET" && acceptHeader.includes("text/html") && !clientHeader);

  if (isDirectBrowserNav) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(403).send(FAKE_FORBIDDEN_HTML);
  }

  next();
};
