import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";
import { requireAdmin } from "../auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "..", "..", "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${nanoid(12)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
      return cb(new Error("Unsupported image type."));
    }
    cb(null, true);
  }
});

const router = Router();

// POST /api/upload — admin only, multipart/form-data field "image".
// Returns a relative URL the frontend stores directly in content (e.g. in
// hero.backgroundImage or founders.members[i].image).
router.post("/", requireAdmin, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded." });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

// DELETE /api/upload/:filename — admin only. Removes a previously uploaded file.
router.delete("/:filename", requireAdmin, (req, res) => {
  const filename = path.basename(req.params.filename); // prevent path traversal
  const filePath = path.join(uploadsDir, filename);
  fs.unlink(filePath, (err) => {
    if (err && err.code !== "ENOENT") {
      return res.status(500).json({ error: "Could not delete file." });
    }
    res.json({ deleted: true });
  });
});

export default router;
