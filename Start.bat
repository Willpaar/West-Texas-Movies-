@echo off
cd /d "%~dp0backend"
start cmd /k python server.py
cd /d "%~dp0frontend"
start cmd /k "npm run dev"
