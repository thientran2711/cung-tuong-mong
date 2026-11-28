#!/bin/bash
# rt-board-table.sh <out dir> <robot-rt.js path> <kinds k1,k2,…> <fold|ipad> <seed> [port 8918] — FIXER #18 job 3 table runner:
# one life, RT_TEST_BOARD=<kinds> plays each board in turn; stops at «RT_TEST_BOARD_ALL» (one kind: at its «RT_TEST_BOARD» row). Serve the site first:
#   bash dev/test/rt-serve-build.sh <sha> <port>. Control = an older robot-rt.js copy (keep its realtap.js / rt-offer.js beside it).
out=$1; S=$2; kind=$3; dev=$4; seed=$5; port=${6:-8918}; rm -rf "$out"; mkdir -p "$out"
env RT_PIN=0 RT_NOSHOT=1 RT_TEST_BOARD="$kind" timeout 5400 node "$S" http://127.0.0.1:$port/ "$out" life=1 dev=$dev origin=pf road=pt_su bot=sens seed=$seed slice=999 > "$out/log.txt" 2>&1 &
pid=$!; pat='^RT_TEST_BOARD '; [[ $kind == *,* ]] && pat='^RT_TEST_BOARD_ALL '
until grep -q "$pat" "$out/log.txt" || ! kill -0 $pid 2>/dev/null; do sleep 3; done; sleep 2; pkill -P $pid; kill $pid 2>/dev/null; wait $pid 2>/dev/null
grep -E '^(BOARD|RT_TEST_BOARD|LIFE)' "$out/log.txt"
