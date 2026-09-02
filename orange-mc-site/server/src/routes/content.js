import { Router } from "express";
import { getContent, updateSection } from "../db.js";
import { requireAdmin } from "../auth.js";

const router = Router();

// GET /api/content — public. Every visitor's browser calls this to render the site.
router.get("/", async (req, res) => {
  const content = await getContent();
  res.json(content);
});

// PUT /api/content/:section — admin only. Body is the full replacement object
// for that section (e.g. the whole "hero" object, or the whole "founders" object).
router.put("/:section", requireAdmin, async (req, res) => {
  const { section } = req.params;
  try {
    const updated = await updateSection(section, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
