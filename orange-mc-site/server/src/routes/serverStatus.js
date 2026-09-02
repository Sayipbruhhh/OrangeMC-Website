import { Router } from "express";
import { getContent } from "../db.js";

const router = Router();

// GET /api/server-status
//
// If MC_SERVER_HOST is configured in the environment, this queries a public
// Minecraft server-status API (api.mcsrvstat.us) for real player counts,
// version, and online/offline state — this is real data, not simulated.
//
// If MC_SERVER_HOST is not configured, it returns the values the admin has
// entered manually in the CMS (content.server), clearly sourced as "manual"
// so the frontend never presents admin-entered numbers as a live feed.
router.get("/", async (req, res) => {
  const content = await getContent();
  const manual = content.server;

  const host = process.env.MC_SERVER_HOST;
  if (!host || !manual.useLiveStatus) {
    return res.json({ source: "manual", ...manual });
  }

  try {
    const port = process.env.MC_SERVER_PORT || "25565";
    const apiUrl = `https://api.mcsrvstat.us/3/${encodeURIComponent(host)}:${port}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Status API returned ${response.status}`);
    const data = await response.json();

    res.json({
      source: "live",
      javaIp: manual.javaIp,
      bedrockIp: manual.bedrockIp,
      bedrockPort: manual.bedrockPort,
      status: data.online ? "online" : "offline",
      playersOnline: data.players?.online ?? 0,
      maxPlayers: data.players?.max ?? manual.maxPlayers,
      version: data.version || manual.version,
      pingMs: manual.pingMs,
      uptimePercent: manual.uptimePercent
    });
  } catch (err) {
    // If the live lookup fails, fall back to manual values rather than
    // showing an error state or fabricated numbers.
    res.json({ source: "manual-fallback", ...manual });
  }
});

export default router;
