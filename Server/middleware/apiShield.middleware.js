/**
 * Direct Browser Navigation Blocker / API Shield Middleware
 *
 * Blocks any direct browser address-bar access to backend endpoints.
 * Allows all programmatic API calls (Axios, fetch, Postman, mobile clients, frontend apps).
 */

const FORBIDDEN_PAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>403 Forbidden - Direct Access Not Allowed</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 40px 32px;
      max-width: 520px;
      width: 100%;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
      text-align: center;
    }
    .badge {
      display: inline-block;
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 12px;
    }
    p {
      color: #94a3b8;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .notice {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 12px;
      color: #64748b;
      font-family: monospace;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Security Shield</div>
    <h1>403 Forbidden</h1>
    <p>Direct browser address-bar access to the backend API is restricted. Please use the authorized student or admin application portals to interact with this service.</p>
    <div class="notice">HTTP 403 Forbidden · Direct Navigation Blocked</div>
  </div>
</body>
</html>`;

export const apiShield = (req, res, next) => {
  // Allow non-GET methods or CORS preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return next();
  }

  const secFetchMode = req.headers["sec-fetch-mode"];
  const secFetchDest = req.headers["sec-fetch-dest"];
  const acceptHeader = req.headers["accept"] || "";

  // Check if request is direct browser navigation
  const isDirectBrowserNav =
    (secFetchMode === "navigate" || secFetchDest === "document") ||
    (acceptHeader.includes("text/html") && !req.headers["x-requested-with"] && !req.headers["x-app-client"]);

  if (isDirectBrowserNav) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    return res.status(403).send(FORBIDDEN_PAGE_HTML);
  }

  next();
};

export default apiShield;
