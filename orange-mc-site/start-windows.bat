@echo off
setlocal enabledelayedexpansion

REM Orange MC - Setup and Run (Windows)
REM
REM This runs Orange MC as a SINGLE server: one Node/Express process serves
REM both the built website and the /api/... backend from one port.

set ROOT=%~dp0

echo ================================
echo   Orange MC - Setup and Run
echo ================================
echo.

REM --- Create server .env if missing ---
if not exist "%ROOT%server\.env" (
    echo Creating server\.env from server\.env.example ...
    copy /y "%ROOT%server\.env.example" "%ROOT%server\.env" >nul
) else (
    echo server\.env already exists, leaving it as is.
)

REM --- Create client .env if missing ---
if not exist "%ROOT%client\.env" (
    echo Creating client\.env from client\.env.example ...
    copy /y "%ROOT%client\.env.example" "%ROOT%client\.env" >nul
) else (
    echo client\.env already exists, leaving it as is.
)

echo.
echo Installing backend dependencies (this can take a minute)...
pushd "%ROOT%server"
call npm install
if errorlevel 1 (
    echo.
    echo npm install FAILED in server folder. See errors above.
    pause
    exit /b 1
)
popd

echo.
echo Installing frontend dependencies (this can take a minute)...
pushd "%ROOT%client"
call npm install
if errorlevel 1 (
    echo.
    echo npm install FAILED in client folder. See errors above.
    pause
    exit /b 1
)
popd

echo.
echo Building the site (client\dist)...
pushd "%ROOT%client"
call npm run build
if errorlevel 1 (
    echo.
    echo Build FAILED in client folder. See errors above.
    pause
    exit /b 1
)
popd

echo.
echo ================================
echo Starting Orange MC on http://localhost:4000
echo.
echo Public site:  http://localhost:4000
echo Admin panel:  http://localhost:4000/admin
echo   (login is ADMIN_USERNAME / ADMIN_PASSWORD from server\.env,
echo    which default to admin / change-this-password unless you edit it)
echo.
echo Close this window (or press Ctrl+C) to stop the server.
echo ================================
echo.

start "" "http://localhost:4000"

pushd "%ROOT%server"
call npm start
popd
