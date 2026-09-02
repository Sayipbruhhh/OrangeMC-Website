# Orange MC

A full-stack Minecraft server network website with a real, working admin CMS,
served as a **single server** — one Node/Express process serves both the
built site and the API on one port.

**Linux/macOS and just want to view the site?** See `LINUX-QUICKSTART.md` —
run `./start-linux.sh` and it sets everything up for you.

**Windows and just want to view the site?** See `WINDOWS-QUICKSTART.md` —
double-click `start-windows.bat` and it sets everything up for you.

- **`client/`** — React (Vite) frontend: public website + `/admin` dashboard.
  Built to static files (`client/dist/`) that the server serves directly.
- **`server/`** — Node/Express backend: serves the built site, plus
  authentication, content storage, and image uploads under `/api/...`.

Everything an admin can edit lives in one JSON content object on the backend
(`server/data/db.json`, created on first run). No editable text is hard-coded
into the React components — every component reads from this content and
re-renders when the admin saves changes.

---

## 1. Quick start (local development)

You need Node.js 18+ installed.

```bash
# Backend config
cd server
cp .env.example .env
```

Open `server/.env` and set real values:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=pick-a-strong-password
JWT_SECRET=          # generate with: openssl rand -hex 32
```

Then install and build the frontend, and start the server:

```bash
cd ../client
cp .env.example .env
npm install
npm run build      # outputs client/dist/

cd ../server
npm install
npm start
```

Everything is now served from **one port**: `http://localhost:4000`.

- Public site: `http://localhost:4000/`
- Admin CMS: `http://localhost:4000/admin`

Log in with the `ADMIN_USERNAME` / `ADMIN_PASSWORD` you set in `server/.env`.

### Editing the frontend during development

`npm start` in `server/` serves whatever is currently built into
`client/dist/`. If you're actively editing React components, rebuild after
each change:

```bash
cd client && npm run build
```

Then just refresh the browser — the running server picks up the new
`client/dist/` files automatically (no restart needed, since it reads them
from disk on every request). If you'd rather have instant hot-reload while
developing, you can still run Vite's dev server separately for that
(`npm run dev` in `client/`, on its own port) and point it at the API with
`VITE_API_URL=http://localhost:4000` in `client/.env` — but for normal usage
and for anyone just running the site, the single `npm start` above is all
you need.

---

## 2. How the CMS works

- The backend stores one JSON object with a key per section (`hero`,
  `server`, `servers`, `features`, `arena`, `economy`, `events`, `community`,
  `founders`, `staff`, `rules`, `faq`, `footer`, `branding`, `siteSettings`).
- `GET /api/content` is public — every visitor's browser calls this to
  render the site.
- `PUT /api/content/:section` is admin-only (requires a valid JWT) and
  replaces that whole section with the admin's edited version.
- The admin dashboard (`client/src/admin`) is **schema-driven**: every
  section's editable fields are declared once in
  `client/src/admin/schemas.js` (text, textarea, number, boolean, select,
  image, repeatable lists, and plain string lists). Add or change a field
  there and the corresponding form updates automatically — you don't need
  to hand-build a new form component per section.
- Images are uploaded via `POST /api/upload` (multipart, admin-only),
  stored on the backend's disk under `server/uploads/`, and served at
  `/uploads/<filename>`. The admin can replace or remove any image from the
  same field the text is edited in.
- Content persists in `server/data/db.json` and survives refreshes,
  restarts, and multiple admin sessions (it's just a file on disk — swap in
  a real database later by replacing `server/src/db.js` if you outgrow it).

## 3. Security notes

- `ADMIN_USERNAME` / `ADMIN_PASSWORD` live only in `server/.env` and are
  never sent to the browser. The password is hashed in memory with bcrypt
  before being compared — the plaintext is never written to disk.
- Admin sessions are signed JWTs (`JWT_SECRET`, expires per
  `JWT_EXPIRES_IN`). The frontend stores the token in `localStorage` purely
  as a convenience; **the real access control is server-side** —
  `requireAdmin` middleware rejects any write or `/api/auth/me` call
  without a valid token, regardless of what the frontend does or hides.
- `/admin` is a client-side route, so the backend — not the frontend UI —
  is what actually stops unauthorized people from editing content. Even if
  someone loads the admin dashboard's JavaScript, every write request is
  independently checked and rejected without a valid session.
- The login endpoint is rate-limited (20 attempts / 15 minutes / IP) to
  slow down credential guessing.

## 4. Server status data

`GET /api/server-status` returns the values the admin entered in the CMS
(`server` section) by default. If you have a real Minecraft server and want
live player counts, set in `server/.env`:

```env
MC_SERVER_HOST=play.yourdomain.com
MC_SERVER_PORT=25565
```

...and turn on **"Pull live status from a real server API"** in the admin's
Server Info tab. The backend then queries the public
[mcsrvstat.us](https://mcsrvstat.us) API for real online/offline status,
player counts, and version, falling back to the admin's manual values if
that lookup fails. Nothing is ever presented as "live" unless it is.

## 5. Deploying

### Single server (recommended, matches local dev)

Deploy `server/` (with `client/` alongside it, as in this repo) to anywhere
that runs Node — a VPS, Render, Railway, Fly.io, etc.:

```bash
cd client && npm install && npm run build
cd ../server && npm install && npm start
```

Set the environment variables from `server/.env.example` in your host's
config/dashboard. Leave `CORS_ORIGIN` blank — it isn't needed, since the
site and API share one origin. Make sure `server/data/` and
`server/uploads/` sit on persistent storage — on platforms with ephemeral
filesystems (e.g. most serverless hosts), attach a persistent volume or
swap `db.js` for a real database and uploads for object storage (S3, R2,
etc.). `/admin` and every other client-side route already work correctly
because the server's SPA fallback (in `server/src/index.js`) serves
`index.html` for any non-`/api`, non-`/uploads` path.

### Split deployment (optional)

If you'd rather host the static site and the API separately (e.g. the site
on Vercel/Netlify/Cloudflare Pages and the API on a VPS), that still works:

- **Frontend** (`client/`) — build with `npm run build` and deploy
  `client/dist/` as static files. Set `VITE_API_URL` at build time to your
  deployed backend's URL (see `client/.env.example`).
- **Backend** (`server/`) — deploy as above, and set `CORS_ORIGIN` in its
  `.env` to your deployed frontend's URL.
- Because the site is a single-page app, your static host needs to fall
  back to `index.html` for unknown paths so `/admin` works directly:
  - **Vercel / Netlify**: add a rewrite rule `/* → /index.html`.
  - **nginx**: `try_files $uri /index.html;`

## 6. Project structure

```
orange-mc/
  server/
    src/
      index.js            Express app entry point — serves client/dist/
                           AND /api/... from this one process/port
      auth.js             JWT + bcrypt admin auth
      db.js               lowdb persistence layer
      defaultContent.js   Seed content (first-run defaults only)
      routes/
        auth.js            /api/auth/login, /api/auth/me
        content.js         /api/content (public GET, admin PUT)
        upload.js          /api/upload (admin image upload/delete)
        serverStatus.js    /api/server-status
    data/                 db.json created here at runtime
    uploads/              uploaded images served statically

  client/
    src/
      components/         Public site components (Hero, Features, ...)
      pages/HomePage.jsx  Assembles the public site
      context/            ContentContext (fetches & provides site content)
      admin/
        AdminApp.jsx       Verifies session, renders login or dashboard
        AdminLogin.jsx
        AdminDashboard.jsx Sidebar + active section editor
        schemas.js          Declarative field schemas for every section
        components/        Generic field renderer, image uploader, etc.
      App.jsx              Routes "/" vs "/admin"
      main.jsx
    dist/                Built by `npm run build` — served by server/src/index.js
```

## 7. Testing checklist

- [ ] Public site loads at `/`
- [ ] Loading screen appears briefly, then transitions to the site
- [ ] MagicRings background renders across the site and reacts to mouse/click
- [ ] Cards show the orange (`#643515`) spotlight hover effect
- [ ] Layout is responsive at desktop/tablet/mobile widths
- [ ] `/admin` works with no query string or extra config, on any host
- [ ] Wrong username/password is rejected with an error
- [ ] Correct login opens the dashboard
- [ ] Loading `/admin` without a token shows the login screen, not the dashboard
- [ ] Editing text in the dashboard and saving updates the public site after refresh
- [ ] Uploading/replacing/removing an image works and shows on the public site
- [ ] Changes survive a full server restart (stored in `server/data/db.json`)
- [ ] Founder section shows the three founders in a normal horizontal layout
- [ ] Staff & Developer Team shows five editable member slots
- [ ] No admin credentials or secrets appear in browser dev tools, page source, or API responses
