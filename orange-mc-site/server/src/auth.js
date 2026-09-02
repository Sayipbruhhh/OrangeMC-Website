import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "12h";

if (!JWT_SECRET) {
  // Fail loudly at boot rather than silently signing tokens with an empty secret.
  throw new Error(
    "JWT_SECRET is not set. Copy server/.env.example to server/.env and set a real secret."
  );
}

// The admin password is stored as a bcrypt hash derived from ADMIN_PASSWORD at
// boot time. The plaintext env var never touches the filesystem or a response body.
let cachedHash = null;
function getAdminPasswordHash() {
  if (!cachedHash) {
    const plain = process.env.ADMIN_PASSWORD;
    if (!plain) {
      throw new Error("ADMIN_PASSWORD is not set in the server environment.");
    }
    cachedHash = bcrypt.hashSync(plain, 10);
  }
  return cachedHash;
}

export function verifyAdminCredentials(username, password) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  if (!expectedUsername || !password || username !== expectedUsername) {
    return false;
  }
  return bcrypt.compareSync(password, getAdminPasswordHash());
}

export function issueAdminToken(username) {
  return jwt.sign({ role: "admin", username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}

// Express middleware: rejects any request without a valid admin JWT.
// This is the real access control — the frontend hiding admin UI is only
// a convenience, never the security boundary.
export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing admin token." });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== "admin") {
      return res.status(403).json({ error: "Not authorized." });
    }
    req.admin = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired session." });
  }
}
