#!/usr/bin/env bash
# rt-serve-build.sh <sha> <port> [dir]  |  rt-serve-build.sh --b <CTM_BI.b> [--t <CTM_BI.t>] <port> [dir] — serve the BUILT game of one main commit (the «s» of window.CTM_BI, without «+») on 127.0.0.1:<port>,
# so a robot-rt life is resumed on the SAME build it started on (robot-rt.js BUILD PIN; F #20 10:47Z s7 mixed-build life).
# Sparse worktree of the site files only (root index.html / sw.js / assets.json / manifest + coop/), fetched --depth under the shared fetch lock.
set -euo pipefail
REPO="$(git rev-parse --show-toplevel)"
if [ "${1:-}" = "--b" ]; then # --b <build id> <port>: the main commit whose built index.html carries "b":"<build id>" (window.CTM_BI.b — the exact build of the life)
  BID="${2:?build id}"; shift 2; BT=""; if [ "${1:-}" = "--t" ]; then BT="${2:?build time}"; shift 2; fi
  ( flock /home/user/wt/fetch.lock git -C "$REPO" fetch -q --depth=60 origin main ) || true
  SHA=""; for c in $(git -C "$REPO" log --format=%h FETCH_HEAD -- index.html); do # newest first: the main commit whose built index.html has this b (and this t)
    h="$(git -C "$REPO" show "$c:index.html" 2>/dev/null | grep -o 'window.CTM_BI={"s":"[^"]*","t":"[^"]*"' | head -1 || true)"; f="$(git -C "$REPO" show "$c:index.html" 2>/dev/null | grep -c "\"b\":\"$BID\"" || true)"
    if [ "${f:-0}" -gt 0 ]; then if [ -z "$BT" ] || [ "${h#*\"t\":\"$BT\"}" != "$h" ]; then SHA="$c"; break; fi; fi
  done
  [ -n "$SHA" ] || { echo "no main commit with build $BID ${BT:+t $BT} in the last 60 main commits (older: pass the sha)" >&2; exit 2; }
  DIR_SUFFIX="$BID"
  set -- "$SHA" "$@"
fi
SHA="${1:?sha}"; PORT="${2:?port}"; DIR="${3:-/home/user/wt/build-$SHA}"
if [ ! -e "$DIR/index.html" ]; then
  ( flock /home/user/wt/fetch.lock git -C "$REPO" fetch -q --depth=30 origin main ) || true
  git -C "$REPO" cat-file -e "$SHA^{commit}" 2>/dev/null || ( flock /home/user/wt/fetch.lock git -C "$REPO" fetch -q --depth=1 origin "$SHA" )
  git -C "$REPO" worktree add -q --no-checkout --detach "$DIR" "$SHA"
  git -C "$DIR" sparse-checkout set --no-cone '/*.html' '/*.js' '/*.json' '/*.webmanifest' '/coop/'
  git -C "$DIR" checkout -q
fi
cd "$DIR"; echo "serving $(git log --oneline -1 | cut -c1-60) on http://127.0.0.1:$PORT/"
exec python3 -m http.server "$PORT" --bind 127.0.0.1
