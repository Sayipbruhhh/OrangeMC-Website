# Windows Quickstart

Orange MC runs as a **single server**: one Node process serves both the
built website and the API, on one port (http://localhost:4000 by default).

The easiest way to view the site: double-click **`start-windows.bat`** in
this folder.

It will:
1. Create the `.env` config files automatically (using safe local defaults).
2. Install everything needed (`npm install` for both the server and the
   site).
3. Build the React site.
4. Start the single server in this window and open the website in your
   browser automatically.

That's it. After it finishes:

- **Website:** http://localhost:4000
- **Admin panel:** http://localhost:4000/admin
  - Username: `admin`
  - Password: `change-this-password`
  - (these are the defaults in `server/.env.example` — change them any time
    by editing `server/.env` and restarting)

## If double-clicking doesn't run it

Some systems block `.bat` files from Explorer by default. Instead:

1. Open Command Prompt.
2. `cd` into this folder, for example:
   ```
   cd "C:\Users\TEMP\Downloads\orange-mc\orange-mc-site"
   ```
3. Run:
   ```
   start-windows.bat
   ```

## To stop it

Close the Command Prompt window it opened, or press Ctrl+C inside it. It's
a single window running a single server — no other windows to close.

## Running it again later

You can just double-click `start-windows.bat` again — it won't re-create
`.env` files if they already exist, so any admin credentials you changed
are kept, and `npm install` will be near-instant the second time.

## Full manual setup / deployment instructions

See `README.md` in this same folder.
