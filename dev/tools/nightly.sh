#!/bin/bash
# NIGHTLY FULL SUITE on the LIVE build (owner OD:L1370 (f)). Scheduling is the coordinator's call; this only runs the suites once.
# usage: bash dev/tools/nightly.sh [ref] [--quick]      (default ref origin/main, fetched first under /home/user/wt/fetch.lock)
#   Runs in a throw-away sparse worktree at that sha (detached), one suite after another (the box has ~4 CPUs: never in parallel),
#   each with its own time limit; a suite that times out counts as FAIL and the next one starts.
#   Report: $NIGHTLY_DIR/<yyyy-mm-dd>-<short sha>.md (default /home/user/wt/nightly/) = one table (suite · result · minutes · last line)
#   + the tail of every failed log; logs beside it in <date>-<sha>/. Exit 0 when all pass, 1 otherwise.
#   --quick: skips perf.js and coop-e2e (the two longest) — for a same-day re-run after a fix.
# Expected time on this box: ~1.5–3 h with perf.js (30+ min per device, 2 devices), ~40–60 min with --quick.
REF=origin/main; QUICK=""; for a in "$@"; do [ "$a" = "--quick" ] && QUICK=1 || REF=$a; done
LOCK=/home/user/wt/fetch.lock; touch $LOCK; TOP=$(git rev-parse --show-toplevel) || exit 1
[ "$REF" = "origin/main" ] && flock $LOCK git -C "$TOP" fetch -q --depth=30 origin main:refs/remotes/origin/main
SHA=$(git -C "$TOP" rev-parse --verify "$REF^{commit}") || exit 1
DAY=$(date -u +%Y-%m-%d); DIR=${NIGHTLY_DIR:-/home/user/wt/nightly}; mkdir -p "$DIR"; LOGS=$DIR/$DAY-${SHA:0:8}; mkdir -p "$LOGS"; REP=$DIR/$DAY-${SHA:0:8}.md
WT=/home/user/wt/nightly-${SHA:0:8}-$$
git -C "$TOP" worktree add -q --no-checkout --detach "$WT" "$SHA" && git -C "$WT" sparse-checkout set --no-cone '/*' '!/dev/shots/' '!/dev/owner-shots/' '!/dev/figwork/' && git -C "$WT" checkout -q --detach "$SHA" || exit 1
PIDS=(); cleanup(){ for p in "${PIDS[@]}"; do kill $p 2>/dev/null; done; git -C "$TOP" worktree remove --force "$WT" 2>/dev/null; }; trap cleanup EXIT
cd "$WT"; T0=$(date +%s)
bash dev/site/build_site.sh > "$LOGS/build.log" 2>&1; python3 dev/build/assemble.py >> "$LOGS/build.log" 2>&1
# the build before this one (old-save tests): previous live/* tag, else the previous commit that changed index.html
PREV=$(git -C "$TOP" for-each-ref --sort=-creatordate --format='%(objectname)' 'refs/tags/live/*' | while read t; do c=$(git -C "$TOP" rev-parse "$t^{commit}"); [ "$c" != "$SHA" ] && { echo $c; break; }; done)
[ -z "$PREV" ] && PREV=$(git log --first-parent -n1 --format=%H "$SHA^" -- index.html 2>/dev/null)
mkdir -p "$WT/.old"; [ -n "$PREV" ] && git show "$PREV:index.html" > "$WT/.old/index.html"
# local servers some suites expect (same as their usage lines)
node dev/test/sw-serve.js 8955 "$WT" main="$WT/.old" > "$LOGS/sw-serve-8955.log" 2>&1 & PIDS+=($!)
node dev/test/sw-serve.js 8971 "$WT" > "$LOGS/sw-serve-8971.log" 2>&1 & PIDS+=($!)
sleep 2
ROWS=(); FAILS=0
run(){ local name=$1 mins=$2; shift 2; local t=$(date +%s)
  timeout --kill-after=30 $((mins*60)) "$@" > "$LOGS/$name.log" 2>&1; local rc=$?
  local dt=$(( ($(date +%s)-t+30)/60 )) res=PASS; [ $rc -ne 0 ] && { res=FAIL; [ $rc -eq 124 ] && res="FAIL (timeout ${mins} min)"; FAILS=$((FAILS+1)); }
  local last=$(grep -v '^\s*$' "$LOGS/$name.log" | tail -1 | cut -c1-160 | tr '|' '/')
  ROWS+=("| $name | $res | $dt | $last |"); echo "$(date -u +%H:%M) $name: $res ($dt min)"; }
run quickcheck      15 bash "$TOP/dev/tools/quickcheck.sh" "$SHA"
run build-line      10 env CTM_ROOT="$WT" node "$TOP/dev/test/build-line.js" "$LOGS/build-line"
run shots           15 env CTM_ROOT="$WT" node "$TOP/dev/tools/shots.js" "$LOGS/shots"
run game-feel       45 node dev/test/game-feel.js http://localhost:8955/ "$LOGS/game-feel"
run kit-conform     45 node dev/test/kit-conform.js http://localhost:8971/ "$LOGS/kit-conform.json" 755x1000,1180x820
run tab-pairs       30 node dev/test/tab-pairs.js http://localhost:8971/
run phone-bars      20 node dev/test/phone-bars.js "$LOGS/phone-bars" 755x1000@2 1180x820@2
run save-slots      20 node dev/test/save-slots.js 755x1000 1180x820
run update-notes    15 node dev/test/update-notes.js 755x1000 1180x820
run cloud-save      20 node dev/test/cloud-save.js
if [ -z "$QUICK" ]; then
run coop-e2e        40 node dev/test/coop-e2e.js "$LOGS/coop-e2e"
run perf            90 node dev/test/perf.js --devices fold,ipadAir --out "$LOGS/perf.json"
fi
MIN=$(( ($(date +%s)-T0)/60 ))
{ echo "# Nightly full suite — $DAY — live ${SHA:0:8}"; echo
  echo "Build: $(git log -1 --format='%h %s' "$SHA") · previous build ${PREV:0:8} · total $MIN min · $FAILS failed · logs $LOGS"; echo
  echo "| suite | result | min | last line |"; echo "|---|---|---|---|"; printf '%s\n' "${ROWS[@]}"; echo
  for f in "$LOGS"/*.log; do n=$(basename "$f" .log); printf '%s\n' "${ROWS[@]}" | grep -q "^| $n | FAIL" || continue; echo "## $n (tail)"; echo '```'; tail -25 "$f"; echo '```'; done
} > "$REP"
echo "NIGHTLY $([ $FAILS -eq 0 ] && echo PASS || echo FAIL) · ${SHA:0:8} · $FAILS failed · $MIN min · report $REP"
[ $FAILS -eq 0 ]
