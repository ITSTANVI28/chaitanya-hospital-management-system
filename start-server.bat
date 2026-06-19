@echo off
title Chaitanya Hospital - Local Server
color 0A

echo =========================================
echo   Chaitanya Multi Speciality Hospital
echo   Local Development Server
echo =========================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python found! Starting server...
    echo.
    echo Server starting at: http://localhost:8000
    echo Dashboard at:       http://localhost:8000/dashboard.html
    echo.
    echo Browser मध्ये हे address उघडा:
    echo ---> http://localhost:8000/dashboard.html
    echo.
    echo Server बंद करायचे असेल तर Ctrl+C दाबा.
    echo.
    start "" "http://localhost:8000/dashboard.html"
    python -m http.server 8000
    goto END
)

:: Check Python3
python3 --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python3 found! Starting server...
    echo.
    start "" "http://localhost:8000/dashboard.html"
    python3 -m http.server 8000
    goto END
)

:: Check Node.js / npx
npx --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Node.js found! Starting server...
    echo.
    echo Server starting at: http://localhost:3000
    echo.
    start "" "http://localhost:3000/dashboard.html"
    npx serve . -p 3000
    goto END
)

:: Nothing found
echo [ERROR] Python किंवा Node.js install नाही!
echo.
echo खालीलपैकी एक install करा:
echo   Python: https://www.python.org/downloads/
echo   Node.js: https://nodejs.org/
echo.
echo Install केल्यानंतर हे file परत run करा.
pause

:END
pause
