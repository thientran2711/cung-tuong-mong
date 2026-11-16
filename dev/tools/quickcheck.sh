#!/bin/bash
# QUICK CHECK on a READY sha before it goes live (go-live kit, owner OD:L1370 (c)). Bounded: ~1–3 min on this box (budget 5–10 min).
# usage: bash dev/tools/quickcheck.sh [sha|ref] [--net] [--cpu N] [--runs N] [--inject-render-ms N (self-test)]     (default: HEAD of the current worktree)
#   1. the sha must hold its OWN build: dev/site/build_site.sh is run and index.html must come out the same (only the build line
#      window.CTM_BI may differ, it depends on what is live right now) -> else FAIL "not built"
#   2. node dev/tools/quickcheck.js: open (Fold) · old save from the LIVE build loads and plays a buổi (Fold) · perf smoke vs the live build (iPad)
# Live build = origin/main (env CTM_LIVE_REF). When the sha IS live main, the build before it is used (previous live/* tag, else the
# previous commit that changed index.html). Nothing is pushed or committed; generated files are put back as they were.
# The check scripts always come from the CURRENT worktree (an older sha may not have them); the build comes from the sha.
# Exit 0 = PASS, 1 = FAIL. Last line = one-line summary. Details: <worktree>/.quickcheck/quickcheck.json
set -o pipefail
T0=$(date +%s)
REF=HEAD; ARGS=()
for a in "$@"; do case "$a" in --*) ARGS+=("$a");; *) if [ "${#ARGS[@]}" -gt 0 ] && [[ "${ARGS[-1]}" =~ ^--(cpu|runs|inject-render-ms)$ ]]; then ARGS+=("$a"); else REF=$a; fi;; esac; done
TOP=$(git rev-parse --show-toplevel) || exit 1
KIT=$(cd "$(dirname "$0")/../.." && pwd)   # where the check scripts live (this go-live kit), may differ from the sha under test
SHA=$(git -C "$TOP" rev-parse --verify -q "$REF^{commit}") || { echo "QUICKCHECK FAIL · unknown sha $REF (fetch it first)"; exit 1; }
LIVE_REF=${CTM_LIVE_REF:-origin/main}
LIVE=$(git -C "$TOP" rev-parse --verify -q "$LIVE_REF^{commit}")
WT=$TOP; TMPWT=""
if [ "$SHA" != "$(git -C "$TOP" rev-parse HEAD)" ]; then   # test another sha in a throw-away sparse worktree
  TMPWT=/home/user/wt/qc-${SHA:0:8}-$$; git -C "$TOP" worktree add -q --no-checkout --detach "$TMPWT" "$SHA" || exit 1
  git -C "$TMPWT" sparse-checkout set --no-cone '/*' '!/dev/shots/' '!/dev/owner-shots/' '!/dev/figwork/' && git -C "$TMPWT" checkout -q --detach "$SHA" || exit 1
  WT=$TMPWT
fi
cleanup(){ [ -n "$TMPWT" ] && git -C "$TOP" worktree remove --force "$TMPWT" 2>/dev/null; rm -f "$OLDF"; }
trap cleanup EXIT
OUT=$WT/.quickcheck; mkdir -p "$OUT"; OLDF=$(mktemp --suffix=.html)
# the live build to compare with
OLDREF=$LIVE
if [ -n "$LIVE" ] && [ "$LIVE" = "$SHA" ]; then
  OLDREF=$(git -C "$WT" for-each-ref --sort=-creatordate --format='%(objectname)' 'refs/tags/live/*' | while read t; do c=$(git -C "$WT" rev-parse "$t^{commit}"); [ "$c" != "$SHA" ] && { echo $c; break; }; done)
  [ -z "$OLDREF" ] && OLDREF=$(git -C "$WT" log --first-parent -n1 --format=%H "$SHA^" -- index.html 2>/dev/null)
fi
if [ -z "$OLDREF" ] || ! git -C "$WT" show "$OLDREF:index.html" > "$OLDF" 2>/dev/null; then echo "WARN: no live build to compare with (old-save and perf-vs-live skipped)"; rm -f "$OLDF"; OLDF=/nonexistent; fi
echo "quickcheck ${SHA:0:8} vs live ${OLDREF:0:8}"
# 1. the sha holds its own build
DIRTY=$(git -C "$WT" status --porcelain -- index.html sw.js assets.json)
norm(){ grep -v '^window\.CTM_BI=' ; }
TB=$(date +%s)
if ! (cd "$WT" && bash dev/site/build_site.sh > "$OUT/build.log" 2>&1); then tail -5 "$OUT/build.log"; echo "QUICKCHECK FAIL · build failed ($OUT/build.log)"; exit 1; fi
BUILD_S=$(( $(date +%s)-TB ))
NOTBUILT=""
if ! cmp -s <(git -C "$WT" show "$SHA:index.html" | norm) <(norm < "$WT/index.html"); then NOTBUILT=1; fi
# 2. browser checks on the build
node "$KIT/dev/tools/quickcheck.js" "$WT" "$OLDF" --out "$OUT" "${ARGS[@]}" | tee "$OUT/run.log"; RC=${PIPESTATUS[0]}
# put the generated files back as committed (unless they had local edits before)
[ -z "$DIRTY" ] && git -C "$WT" checkout -q -- index.html sw.js assets.json 2>/dev/null
LINE=$(tail -1 "$OUT/run.log")
if [ -n "$NOTBUILT" ]; then RC=1; LINE="QUICKCHECK FAIL · NOT BUILT: index.html at ${SHA:0:8} differs from a fresh build (run bash dev/site/build_site.sh, commit) · ${LINE#QUICKCHECK * · }"; fi
echo "$LINE · build ${BUILD_S} s · total $(( $(date +%s)-T0 )) s"
exit $RC
