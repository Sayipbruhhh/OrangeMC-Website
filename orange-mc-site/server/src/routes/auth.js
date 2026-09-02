import { Router } from "express";
import { verifyAdminCredentials, issueAdminToken, requireAdmin } from "../auth.js";

const router = Router();

// POST /api/auth/login  { username, password } -> { token }
router.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const ok = verifyAdminCredentials(username, password);
  if (!ok) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = issueAdminToken(username);
  res.json({ token });
});

// GET /api/auth/me — used by the admin app to check an existing token is still valid.
router.get("/me", requireAdmin, (req, res) => {
  res.json({ username: req.admin.username, role: req.admin.role });
});

export default router;
