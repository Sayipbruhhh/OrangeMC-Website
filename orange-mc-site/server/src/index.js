import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import uploadRoutes from "./routes/upload.js";
import serverStatusRoutes from "./routes/serverStatus.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

// This is one server: the built React site and the API are served from the
// same Express process on the same port, so there's nothing to CORS-protect
// against in the normal single-server setup. CORS_ORIGIN is only relevant if
// you deploy the client separately from this API (see README "Deploying").
const corsOrigin = (process.env.CORS_ORIGIN || "").trim();
if (corsOrigin) {
  const allowedOrigins = corsOrigin.split(",").map((s) => s.trim());
  app.use(cors({ origin: allowedOrigins, credentials: false }));
}
app.use(express.json({ limit: "2mb" }));

// Serve uploaded images statically.
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Rate-limit the login endpoint to slow down credential brute-forcing.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Try again later." }
});
app.use("/api/auth/login", loginLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/server-status", serverStatusRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

// --- Serve the built React site from this same process/port ---
// Run `npm run build` inside client/ first (start-linux.sh / start-windows.bat
// do this automatically). If client/dist doesn't exist yet (e.g. you're
// running the API alone during development), this is skipped gracefully.
const clientDist = path.join(__dirname, "..", "..", "client", "dist");
const clientBuilt = fs.existsSync(path.join(clientDist, "index.html"));

if (clientBuilt) {
  app.use(express.static(clientDist));

  // SPA fallback: any GET that isn't an API/upload route gets index.html,
  // so client-side routes like /admin work on refresh and direct links.
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/uploads")) {
      return next();
    }
    res.sendFile(path.join(clientDist, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res
      .status(200)
      .type("text/plain")
      .send(
        "Orange MC API is running, but the client hasn't been built yet.\n" +
          "Run: cd client && npm run build\n" +
          "Then restart this server to serve the site from this same port."
      );
  });
}

// Anything under /api that wasn't matched above is a real 404, not a page.
app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));

app.listen(PORT, () => {
  console.log(`Orange MC is listening on http://localhost:${PORT}`);
  console.log(
    clientBuilt
      ? "Serving the built site and the API from this single server."
      : "Serving the API only — build the client to serve the site here too."
  );
});
