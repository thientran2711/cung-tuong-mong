#!/usr/bin/env bash
# rt-serve-build.sh --b <CTM_BI.b> [--t <CTM_BI.t>] <port> [dir]   (USE THIS: the exact build id of the life)
#   or rt-serve-build.sh <main commit sha> <port> [dir]  — NOT CTM_BI.s: «s» is the PARENT the build was made on (a page of 3af7896e says s 6b5d3d05+), so «sha = s» serves the wrong build.
# so a robot-rt life is resumed on the SAME build it started on (robot-rt.js BUILD PIN; F #20 10:47Z s7 mixed-build life).
# Sparse worktree of the site files only (root index.html / sw.js / assets.json / manifest + coop/), fetched --depth under the shared fetch lock.
set -euo pipefail
REPO="$(git rev-parse --show-toplevel)"
if [ "${1:-}" = "--b" ]; then # --b <build id> <port>: the main commit whose built index.html carries "b":"<build id>" (window.CTM_BI.b — the exact build of the life)
  BID="${2:?build id}"; shift 2; BT=""; if [ "${1:-}" = "--t" ]; then BT="${2:?build time}"; shift 2; fi
  # FIXER #14 N7 (BIG #14): every --b call re-fetched main --depth=60 (≈12k objects, 1–5 min) before the walk, so a pinned life start / resume waited that long.
  # Now: (1) the build cache /home/user/wt/rt-build-cache.txt («b t sha», checked against the commit's index.html), (2) a walk of what is ALREADY fetched
  # (origin/main + FETCH_HEAD, no network), (3) only then one fetch --depth=60 and a walk, (4) still none → one --deepen=300 (an older build of a resumed life).
  CACHE=/home/user/wt/rt-build-cache.txt
  has_b() { local f h; f="$(git -C "$REPO" show "$1:index.html" 2>/dev/null | grep -c "\"b\":\"$BID\"" || true)"; [ "${f:-0}" -gt 0 ] || return 1; [ -z "$BT" ] && return 0; h="$(git -C "$REPO" show "$1:index.html" 2>/dev/null | grep -o 'window.CTM_BI={"s":"[^"]*","t":"[^"]*"' | head -1 || true)"; [ "${h#*\"t\":\"$BT\"}" != "$h" ]; }
  walk() { local c; for c in $(git -C "$REPO" rev-list --topo-order -n "$2" $1 2>/dev/null); do if has_b "$c"; then echo "$c"; return 0; fi; done; return 1; }
  SHA=""
  if [ -f "$CACHE" ]; then c="$(awk -v b="$BID" -v t="${BT:--}" '$1==b && $2==t {print $3}' "$CACHE" | tail -1)"; if [ -n "$c" ] && git -C "$REPO" cat-file -e "$c^{commit}" 2>/dev/null && has_b "$c"; then SHA="$c"; echo "build cache: $BID → $c" >&2; fi; fi
  # FIXER #13 (BIG #13 N1): walk EVERY parent, not only the first: main can be a merge (03a8c17c renderer-mem) whose SECOND parent holds the build (LIVE f573dc94).
  # rev-list without --first-parent lists all commits reachable within the fetched depth, newest first (commit date); --topo-order keeps a merge before its parents.
  # STACK LAND merges rebuild the site: the walk reads index.html CONTENT (a path log skips them — BIG #9 FAIL cbeb334b).
  if [ -z "$SHA" ]; then L="$(git -C "$REPO" rev-parse -q --verify origin/main 2>/dev/null || true) $(git -C "$REPO" rev-parse -q --verify FETCH_HEAD 2>/dev/null || true)"; [ -n "${L// }" ] && SHA="$(walk "$L" 200 || true)"; fi
  if [ -z "$SHA" ]; then ( flock /home/user/wt/fetch.lock git -C "$REPO" fetch -q --depth=60 origin +refs/heads/main:refs/remotes/origin/main ) || true; SHA="$(walk "$(git -C "$REPO" rev-parse origin/main)" 200 || true)"; fi
  if [ -z "$SHA" ]; then ( flock /home/user/wt/fetch.lock git -C "$REPO" fetch -q --deepen=300 origin +refs/heads/main:refs/remotes/origin/main ) || true; SHA="$(walk "$(git -C "$REPO" rev-parse origin/main)" 600 || true)"; fi
  [ -n "$SHA" ] && { ( flock 8; grep -q "^$BID ${BT:--} $SHA$" "$CACHE" 2>/dev/null || echo "$BID ${BT:--} $SHA" >> "$CACHE" ) 8>"$CACHE.lock"; }
  [ -n "$SHA" ] || { echo "no main commit with build $BID ${BT:+t $BT} in the last 600 commits reachable from main, all parents (older: pass the sha)" >&2; exit 2; }
  DIR_SUFFIX="$BID"
  set -- "$SHA" "$@"
fi
SHA="${1:?sha}"; PORT="${2:?port}"; DIR="${3:-/home/user/wt/build-$SHA}"
# JOB 19 (FIXER #11): two lives of the same build started together raced on «git worktree add» (one exits 1 → that life ran unpinned on LIVE github.io,
# then a LIVE update hard-stopped it «BUILD MISMATCH at unstick reload»). The checkout is made under a per-directory lock; the loser finds it done.
exec 9>"$DIR.lock"; flock 9
if [ ! -e "$DIR/index.html" ]; then
  # FIXER #14 N7: no blanket fetch here any more — only the commit itself when it is not in the repo yet
  git -C "$REPO" cat-file -e "$SHA^{commit}" 2>/dev/null || ( flock /home/user/wt/fetch.lock git -C "$REPO" fetch -q --depth=1 origin "$SHA" )
  git -C "$REPO" worktree add -q --no-checkout --detach "$DIR" "$SHA"
  git -C "$DIR" sparse-checkout set --no-cone '/*.html' '/*.js' '/*.json' '/*.webmanifest' '/coop/'
  git -C "$DIR" checkout -q
fi
flock -u 9
cd "$DIR"; echo "serving $(git log --oneline -1 | cut -c1-60) on http://127.0.0.1:$PORT/"
exec python3 -m http.server "$PORT" --bind 127.0.0.1
