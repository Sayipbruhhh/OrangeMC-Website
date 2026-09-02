#!/usr/bin/env bash
# Orange MC - Setup and Run (Linux/macOS)
#
# This runs Orange MC as a SINGLE server: one Node/Express process serves
# both the built website and the /api/... backend from one port.
#
# Usage:
#   ./start-linux.sh
#
# What it does:
#   1. Creates server/.env and client/.env from their .env.example files
#      if they don't already exist (won't overwrite existing config).
#   2. Installs backend and frontend dependencies (npm install).
#   3. Builds the React site (client/dist).
#   4. Starts the single server in the FOREGROUND on http://localhost:4000
#      (or whatever PORT you set in server/.env).
#
# Press Ctrl+C to stop it. Since this is one process on one port, there's
# nothing else to stop or clean up.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "================================"
echo "  Orange MC - Setup and Run"
echo "================================"
echo

# --- Sanity checks ---
if ! command -v node >/dev/null 2>&1; then
    echo "Error: Node.js is not installed or not on your PATH."
    echo "Install Node.js 18+ first: https://nodejs.org/en/download"
    exit 1
fi

NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$NODE_MAJOR" -lt 18 ]; then
    echo "Error: Node.js 18+ is required (found $(node -v))."
    exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "Error: npm is not installed or not on your PATH."
    exit 1
fi

# --- Create server/.env if missing ---
if [ ! -f "$ROOT/server/.env" ]; then
    echo "Creating server/.env from server/.env.example ..."
    cp "$ROOT/server/.env.example" "$ROOT/server/.env"
else
    echo "server/.env already exists, leaving it as is."
fi

# --- Create client/.env if missing ---
if [ ! -f "$ROOT/client/.env" ]; then
    echo "Creating client/.env from client/.env.example ..."
    cp "$ROOT/client/.env.example" "$ROOT/client/.env"
else
    echo "client/.env already exists, leaving it as is."
fi

echo
echo "Installing backend dependencies (this can take a minute)..."
( cd "$ROOT/server" && npm install )

echo
echo "Installing frontend dependencies (this can take a minute)..."
( cd "$ROOT/client" && npm install )

echo
echo "Building the site (client/dist)..."
( cd "$ROOT/client" && npm run build )

PORT_TO_SHOW="$(grep -E '^PORT=' "$ROOT/server/.env" 2>/dev/null | cut -d= -f2)"
PORT_TO_SHOW="${PORT_TO_SHOW:-4000}"

echo
echo "================================"
echo "Starting Orange MC on http://localhost:$PORT_TO_SHOW"
echo
echo "Public site:  http://localhost:$PORT_TO_SHOW"
echo "Admin panel:  http://localhost:$PORT_TO_SHOW/admin"
echo "  (login is ADMIN_USERNAME / ADMIN_PASSWORD from server/.env,"
echo "   which default to admin / change-this-password unless you edit it)"
echo
echo "Press Ctrl+C to stop."
echo "================================"
echo

cd "$ROOT/server"
exec npm start
