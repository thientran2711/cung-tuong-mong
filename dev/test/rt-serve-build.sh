#!/usr/bin/env bash
# rt-serve-build.sh --b <CTM_BI.b> [--t <CTM_BI.t>] <port> [dir]   (USE THIS: the exact build id of the life)
#   or rt-serve-build.sh <main commit sha> <port> [dir]  — NOT CTM_BI.s: «s» is the PARENT the build was made on (a page of 3af7896e says s 6b5d3d05+), so «sha = s» serves the wrong build.
# so a robot-rt life is resumed on the SAME build it started on (robot-rt.js BUILD PIN; F #20 10:47Z s7 mixed-build life).
# Sparse worktree of the site files only (root index.html / sw.js / assets.json / manifest + coop/), fetched --depth under the shared fetch lock.
set -euo pipefail
REPO="$(git rev-parse --show-toplevel)"
if [ "${1:-}" = "--b" ]; then # --b <build id> <port>: the main commit whose built index.html carries "b":"<build id>" (window.CTM_BI.b — the exact build of the life)
  BID="${2:?build id}"; shift 2; BT=""; if [ "${1:-}" = "--t" ]; then BT="${2:?build time}"; shift 2; fi
  ( flock /home/user/wt/fetch.lock git -C "$REPO" fetch -q --depth=60 origin main ) || true
  # FIXER #13 (BIG #13 N1): walk EVERY parent, not only the first: main can be a merge (03a8c17c renderer-mem) whose SECOND parent holds the build (LIVE f573dc94).
  # rev-list without --first-parent lists all commits reachable within the fetched depth, newest first (commit date); --topo-order keeps a merge before its parents.
  TIP="$(git -C "$REPO" rev-parse -q --verify FETCH_HEAD || git -C "$REPO" rev-parse origin/main)" # a twin fetching at the same moment can leave no FETCH_HEAD
  SHA=""; for c in $(git -C "$REPO" rev-list --topo-order -n 200 "$TIP"); do # newest first over all parents, by index.html CONTENT (STACK LAND merges rebuild the site: a path log skips them — BIG #9 FAIL cbeb334b)
    h="$(git -C "$REPO" show "$c:index.html" 2>/dev/null | grep -o 'window.CTM_BI={"s":"[^"]*","t":"[^"]*"' | head -1 || true)"; f="$(git -C "$REPO" show "$c:index.html" 2>/dev/null | grep -c "\"b\":\"$BID\"" || true)"
    if [ "${f:-0}" -gt 0 ]; then if [ -z "$BT" ] || [ "${h#*\"t\":\"$BT\"}" != "$h" ]; then SHA="$c"; break; fi; fi
  done
  [ -n "$SHA" ] || { echo "no main commit with build $BID ${BT:+t $BT} in the last 200 commits reachable from main, all parents (older: pass the sha)" >&2; exit 2; }
  DIR_SUFFIX="$BID"
  set -- "$SHA" "$@"
fi
SHA="${1:?sha}"; PORT="${2:?port}"; DIR="${3:-/home/user/wt/build-$SHA}"
# JOB 19 (FIXER #11): two lives of the same build started together raced on «git worktree add» (one exits 1 → that life ran unpinned on LIVE github.io,
# then a LIVE update hard-stopped it «BUILD MISMATCH at unstick reload»). The checkout is made under a per-directory lock; the loser finds it done.
exec 9>"$DIR.lock"; flock 9
if [ ! -e "$DIR/index.html" ]; then
  ( flock /home/user/wt/fetch.lock git -C "$REPO" fetch -q --depth=30 origin main ) || true
  git -C "$REPO" cat-file -e "$SHA^{commit}" 2>/dev/null || ( flock /home/user/wt/fetch.lock git -C "$REPO" fetch -q --depth=1 origin "$SHA" )
  git -C "$REPO" worktree add -q --no-checkout --detach "$DIR" "$SHA"
  git -C "$DIR" sparse-checkout set --no-cone '/*.html' '/*.js' '/*.json' '/*.webmanifest' '/coop/'
  git -C "$DIR" checkout -q
fi
flock -u 9
cd "$DIR"; echo "serving $(git log --oneline -1 | cut -c1-60) on http://127.0.0.1:$PORT/"
exec python3 -m http.server "$PORT" --bind 127.0.0.1
