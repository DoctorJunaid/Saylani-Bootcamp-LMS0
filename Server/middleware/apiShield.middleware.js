/**
 * Direct Browser Navigation Blocker / API Shield Middleware
 *
 * Blocks any direct browser address-bar access to backend endpoints.
 * Returns raw plain text only (no HTML UI).
 * Allows all programmatic API calls (Axios, fetch, Postman, mobile clients, frontend apps).
 */

const FORBIDDEN_PLAIN_TEXT = "403 Forbidden: Direct browser access to this API resource is prohibited.";

export const apiShield = (req, res, next) => {
  // Allow CORS preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return next();
  }

  const secFetchMode = req.headers["sec-fetch-mode"];
  const secFetchDest = req.headers["sec-fetch-dest"];
  const acceptHeader = req.headers["accept"] || "";

  // Check if request is direct browser navigation
  const isDirectBrowserNav =
    secFetchMode === "navigate" ||
    secFetchDest === "document" ||
    (acceptHeader.includes("text/html") &&
      !req.headers["x-requested-with"] &&
      !req.headers["x-app-client"]);

  if (isDirectBrowserNav) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    return res.status(403).send(FORBIDDEN_PLAIN_TEXT);
  }

  next();
};

export default apiShield;
