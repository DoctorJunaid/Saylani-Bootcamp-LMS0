/**
 * Enterprise API Security Shield Middleware
 *
 * 1. Blocks direct browser address-bar direct navigation to API root.
 * 2. Never interferes with application API requests.
 */

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
  // Allow all preflight and non-GET requests (POST, PUT, PATCH, DELETE, OPTIONS)
  if (req.method !== "GET") {
    return next();
  }

  const secFetchMode = req.headers["sec-fetch-mode"];
  const secFetchDest = req.headers["sec-fetch-dest"];
  const acceptHeader = req.headers["accept"] || "";

  // Only intercept raw browser address bar HTML page navigation
  const isDirectBrowserNav =
    (secFetchMode === "navigate" || secFetchDest === "document") &&
    acceptHeader.includes("text/html");

  if (isDirectBrowserNav) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(403).send(FAKE_FORBIDDEN_HTML);
  }

  next();
};
