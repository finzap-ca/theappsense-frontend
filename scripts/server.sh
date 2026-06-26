#!/usr/bin/env bash
#
# Local dev-server control for TheAppSense.
#
# Usage:  ./scripts/server.sh {start|stop|restart|status|logs} [port]
#
# Pins a modern Node (the machine's default `node` is too old for Next.js) and
# runs the server in the background with a PID file + log file, so it can be
# started and stopped from a shell alias.
#
set -euo pipefail

# --- resolve project root (this script lives in <root>/scripts) ---
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${2:-3000}"
PID_FILE="$ROOT/.dev-server.pid"
LOG_FILE="$ROOT/.dev-server.log"

# --- pick a Node >= 18; prefer a pinned modern one over an ancient default ---
pick_node_bin() {
  for c in "$HOME/.local/node20/bin" /tmp/node-v20.18.1-darwin-x64/bin; do
    if [ -x "$c/node" ]; then echo "$c"; return 0; fi
  done
  # fall back to PATH node only if it's new enough
  if command -v node >/dev/null 2>&1; then
    major="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
    if [ "${major:-0}" -ge 18 ]; then dirname "$(command -v node)"; return 0; fi
  fi
  echo "ERROR: no Node >= 18 found. Install one (e.g. ~/.local/node20)." >&2
  return 1
}

is_running() {
  [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null
}

start() {
  if is_running; then
    echo "Already running (pid $(cat "$PID_FILE")) on a previous port. Run 'stop' first."
    return 0
  fi
  NODE_BIN="$(pick_node_bin)"
  echo "Starting TheAppSense dev server on http://localhost:$PORT  (node: $("$NODE_BIN/node" -v))"
  cd "$ROOT"
  PATH="$NODE_BIN:$PATH" nohup "$NODE_BIN/node" node_modules/next/dist/bin/next dev -p "$PORT" \
    > "$LOG_FILE" 2>&1 &
  echo $! > "$PID_FILE"
  echo "Started (pid $!). Logs: $LOG_FILE"
}

stop() {
  if is_running; then
    PID="$(cat "$PID_FILE")"
    # kill the process group so the Next child also dies
    kill "$PID" 2>/dev/null || true
    sleep 1
    kill -9 "$PID" 2>/dev/null || true
  fi
  # belt-and-suspenders: kill anything still bound to the port
  lsof -ti "tcp:$PORT" 2>/dev/null | xargs kill -9 2>/dev/null || true
  rm -f "$PID_FILE"
  echo "Stopped."
}

status() {
  if is_running; then
    echo "running (pid $(cat "$PID_FILE"))"
  else
    echo "stopped"
  fi
}

case "${1:-}" in
  start)   start ;;
  stop)    stop ;;
  restart) stop; start ;;
  status)  status ;;
  logs)    tail -f "$LOG_FILE" ;;
  *) echo "Usage: $0 {start|stop|restart|status|logs} [port]"; exit 1 ;;
esac
