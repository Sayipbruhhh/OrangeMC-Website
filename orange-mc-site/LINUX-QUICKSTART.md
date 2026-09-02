# Linux / macOS Quickstart

Orange MC runs as a **single server**: one Node process serves both the
built website and the API, on one port (http://localhost:4000 by default).

The easiest way to run it: from a terminal in this folder, run:

```bash
./start-linux.sh
```

(First time only, make it executable: `chmod +x start-linux.sh`)

It will:
1. Create the `server/.env` and `client/.env` config files automatically
   (using safe local defaults), if they don't already exist.
2. Install everything needed (`npm install` for both the server and the
   site).
3. Build the React site (`client/dist`).
4. Start the single server **in this terminal window** on
   http://localhost:4000.

That's it. Once it says "Starting Orange MC on http://localhost:4000":

- **Website:** http://localhost:4000
- **Admin panel:** http://localhost:4000/admin
  - Username: `admin`
  - Password: `change-this-password`
  - (these are the defaults in `server/.env.example` — change them any time
    by editing `server/.env` and restarting the server)

## Requirements

- Node.js 18 or newer, and npm. Check with:
  ```bash
  node -v
  npm -v
  ```
  If Node isn't installed, get it from https://nodejs.org/en/download,
  from your distro's package manager (e.g. `sudo apt install nodejs npm`
  on Debian/Ubuntu — check the version is 18+), or via
  [nvm](https://github.com/nvm-sh/nvm).

## To stop it

Press `Ctrl+C` in the terminal where it's running. It's a single foreground
process, so that's all there is to it — no other windows or background
processes to clean up.

## Running it again later

Just run `./start-linux.sh` again. It won't re-create `.env` files if they
already exist (so any admin credentials you changed are kept), and
`npm install` will be near-instant the second time since dependencies are
already downloaded. It will re-run the build step each time, so any edits
to the site's source code are picked up.

## Making an edit and re-running only the build

If you just changed something under `client/src` and don't need to
reinstall dependencies, you can rebuild and restart directly:

```bash
cd client && npm run build && cd ..
cd server && npm start
```

## Full manual setup / deployment instructions

See `README.md` in this same folder for the equivalent manual steps and for
production deployment notes.
