$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backend = Join-Path $root "backend"
$frontend = Join-Path $root "frontend"
$backendPython = Join-Path $backend "venv\Scripts\python.exe"

if (-not (Test-Path $backendPython)) {
  Write-Error "Backend virtualenv python was not found at: $backendPython"
}

if (-not (Test-Path (Join-Path $frontend "node_modules"))) {
  Write-Host "Installing frontend dependencies..."
  npm install --prefix $frontend
}

Write-Host "Starting backend on http://127.0.0.1:8000 ..."
Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-Command",
  "cd '$backend'; .\venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000"
)

Write-Host "Starting frontend on http://127.0.0.1:5173 ..."
Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-Command",
  "cd '$frontend'; npm run dev -- --host 127.0.0.1 --port 5173"
)

Write-Host ""
Write-Host "Both apps were launched in new terminal windows."
Write-Host "Backend:  http://127.0.0.1:8000"
Write-Host "Frontend: http://127.0.0.1:5173"
