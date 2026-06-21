@echo off
title Chaitanya Hospital - PHP Local Server
color 0A

echo =========================================
echo   Chaitanya Multi Speciality Hospital
echo   Local PHP Development Server
echo =========================================
echo.

:: Check Desktop XAMPP PHP path
if exist "C:\Users\tanvi\OneDrive\Desktop\xampp\php\php.exe" (
    echo [OK] Desktop XAMPP PHP found! Starting PHP server...
    echo.
    echo Server starting at: http://localhost:8000
    echo Dashboard at:       http://localhost:8000/dashboard.html
    echo.
    echo Browser: http://localhost:8000/dashboard.html
    echo.
    start "" "http://localhost:8000/dashboard.html"
    "C:\Users\tanvi\OneDrive\Desktop\xampp\php\php.exe" -S localhost:8000
    goto END
)

:: Check C:\xampp PHP path
if exist "C:\xampp\php\php.exe" (
    echo [OK] XAMPP PHP found! Starting PHP server...
    echo.
    echo Server starting at: http://localhost:8000
    echo Dashboard at:       http://localhost:8000/dashboard.html
    echo.
    echo Browser: http://localhost:8000/dashboard.html
    echo.
    start "" "http://localhost:8000/dashboard.html"
    "C:\xampp\php\php.exe" -S localhost:8000
    goto END
)

:: Check if php command is available in PATH
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] PHP found in PATH! Starting PHP server...
    echo.
    echo Server starting at: http://localhost:8000
    echo Dashboard at:       http://localhost:8000/dashboard.html
    echo.
    echo Browser: http://localhost:8000/dashboard.html
    echo.
    start "" "http://localhost:8000/dashboard.html"
    php -S localhost:8000
    goto END
)

:: Nothing found
echo [ERROR] PHP interpreter find nahi jhala!
echo Please make sure XAMPP or PHP is installed.
echo.
pause

:END
pause

