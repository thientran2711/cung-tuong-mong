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
# FIXER #15: the sparse set = EVERY local path LIVE serves (dev/site/pages_stage.sh whitelist: root files, audio/, icons/, dev/vendor/ — pixi loads dynamically from dev/vendor, no <script src>).
SPARSE=('/*.html' '/*.js' '/*.json' '/*.webmanifest' '/coop/' '/dev/vendor/' '/audio/' '/icons/')
if [ ! -e "$DIR/index.html" ]; then
  # FIXER #14 N7: no blanket fetch here any more — only the commit itself when it is not in the repo yet
  git -C "$REPO" cat-file -e "$SHA^{commit}" 2>/dev/null || ( flock /home/user/wt/fetch.lock git -C "$REPO" fetch -q --depth=1 origin "$SHA" )
  git -C "$REPO" worktree add -q --no-checkout --detach "$DIR" "$SHA"
  git -C "$DIR" sparse-checkout set --no-cone "${SPARSE[@]}"
  git -C "$DIR" checkout -q
elif ! ( SPF="$(git -C "$DIR" rev-parse --git-path info/sparse-checkout)"; for x in "${SPARSE[@]}"; do grep -qxF -- "$x" "$SPF" 2>/dev/null || exit 1; done ); then
  # FIXER #15 (3): a pin dir made before the fix (index.html there, dev/vendor missing): add the missing paths in place, no re-create
  # FIXER #16 (c): EVERY entry of the sparse set is checked (a dir with dev/vendor but no audio/ or icons/ is repaired too; s7b's hand-started old dir: 404 /audio/VOICES.json)
  git -C "$DIR" sparse-checkout set --no-cone "${SPARSE[@]}"
  git -C "$DIR" checkout -q
fi
flock -u 9
cd "$DIR"; echo "serving $(git log --oneline -1 | cut -c1-60) on http://127.0.0.1:$PORT/"
# FIXER #15 (1)(2): every same-origin path index.html / sw.js name (quoted «x.ext» strings) that exists in this build AND that LIVE serves (root file, audio/, icons/, dev/vendor/, coop/)
# is GET-ed on the served port once it is up; any non-200 → the missing path is named on stderr and this process (the server, after exec) is killed → exit non-zero (143).
# dev/vendor/pixi-*.min.js is always checked when the tree has it.
(
  set +e; PARENT=$$; P=""
  for f in index.html sw.js; do P="$P
$(grep -ohE "[\"'\`(](\./)?[A-Za-z0-9_][A-Za-z0-9_./-]*\.(js|json|png|mp3|html|webmanifest|css|webp|svg|ico|wasm|woff2?|txt)[\"'\`)]" "$f" 2>/dev/null | tr -d "\"'\`()" | grep -v '^http')"; done
  P="$P
$(git ls-files 'dev/vendor/*' 2>/dev/null)
$(git ls-files 'audio/*' 2>/dev/null)"  # FIXER #16 (c): the game builds audio names at run time (fetch audio/VOICES.json, AU_PRELOAD «sfx-…» + ".mp3", kmusUrl «bgm-<key>.mp3», vo-<key>-n.mp3),
  # never as quoted paths → every file of audio/ in this build is checked. Names NOT in git (KMUS_NEW bgm keys, IMG_BASE+audio/…) are CDN-only on LIVE too: not served here, skipped.
  P="$(printf '%s\n' "$P" | sed 's#^\./##' | grep -E '^([^/]+|(dev/vendor|audio|icons|coop)/.+)$' | sort -u)"
  for i in $(seq 1 100); do (exec 3<>/dev/tcp/127.0.0.1/$PORT) 2>/dev/null && break; sleep 0.1; done
  MISS=""; N=0
  while IFS= read -r x; do [ -n "$x" ] && [ -e "$x" ] || { [ -n "$x" ] && git ls-files --error-unmatch "$x" >/dev/null 2>&1 && MISS="$MISS $x(not checked out)"; continue; }
    N=$((N+1)); c="$(curl -s -o /dev/null -m 10 -w '%{http_code}' "http://127.0.0.1:$PORT/$x" 2>/dev/null)"; [ "$c" = 200 ] || MISS="$MISS $x(HTTP $c)"; done <<< "$P"
  if [ -n "$MISS" ]; then echo "rt-serve-build SELF-CHECK FAIL: the pinned build $SHA does not serve:$MISS" >&2; kill -TERM "$PARENT"; else echo "rt-serve-build self-check OK: $N local paths all 200 (incl. $(ls dev/vendor 2>/dev/null | tr '\n' ' '))" >&2; fi
) &
exec python3 -m http.server "$PORT" --bind 127.0.0.1
