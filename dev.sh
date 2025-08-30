#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$SCRIPT_DIR"

BACKEND_DIR="$REPO_ROOT/backend"
FRONTEND_DIR="$REPO_ROOT/frontend"

BACKEND_PID=""
FRONTEND_PID=""

cleanup() {
  echo "\nShutting down..."
  if [[ -n "${FRONTEND_PID}" ]] && ps -p "${FRONTEND_PID}" > /dev/null 2>&1; then
    kill "${FRONTEND_PID}" 2>/dev/null || true
  fi
  if [[ -n "${BACKEND_PID}" ]] && ps -p "${BACKEND_PID}" > /dev/null 2>&1; then
    kill "${BACKEND_PID}" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

run_backend() {
  cd "$BACKEND_DIR"

  # Activate venv if present
  if [[ -d .venv ]]; then
    # shellcheck disable=SC1091
    source .venv/bin/activate
  fi

  # Prefer server.py, fallback to app.py, then main.py
  local entry=""
  for candidate in server.py app.py main.py; do
    if [[ -f "$candidate" ]]; then
      entry="$candidate"
      break
    fi
  done

  if [[ -z "$entry" ]]; then
    echo "No backend entry found (expected one of: server.py, app.py, main.py)." >&2
    exit 1
  fi

  echo "[backend] Starting: python $entry"
  python "$entry" &
  BACKEND_PID=$!
}

run_frontend() {
  cd "$FRONTEND_DIR"
  echo "[frontend] Starting: npm run dev"
  npm run dev &
  FRONTEND_PID=$!
}

run_backend
run_frontend

echo "\nBoth processes started."
echo "  Backend PID:  ${BACKEND_PID}"
echo "  Frontend PID: ${FRONTEND_PID}"
echo "\nPress Ctrl+C to stop both."

# Wait for either process to exit (portable alternative to wait -n)
while true; do
  sleep 1
  if ! ps -p "$BACKEND_PID" > /dev/null 2>&1; then
    break
  fi
  if ! ps -p "$FRONTEND_PID" > /dev/null 2>&1; then
    break
  fi
done


