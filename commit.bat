@echo off
"C:\Program Files\Git\cmd\git.exe" add -A
"C:\Program Files\Git\cmd\git.exe" commit -m "Fix server for Vercel deployment"
"C:\Program Files\Git\cmd\git.exe" push origin main