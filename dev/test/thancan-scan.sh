#!/bin/sh
# thancan-scan (law 11, review/thancan): every place that decides or names "the close maid" (q.close / kind mm as close / player-visible «thân cận»).
# usage: sh dev/test/thancan-scan.sh [ref]   (default: working tree) — prints file:line + the rule it follows
R=${1:-}
g(){ if [ -n "$R" ]; then git grep -n "$1" "$R" -- 'dev/build/j*.js'; else git grep -n "$1" -- 'dev/build/j*.js'; fi; }
echo "== decides who is close (q.close / close:) =="; g 'close:p.kind==="mm"\|close:j95sClose\|close:false,sv\|close:!!(S.thO' | cut -c1-160
echo "== reads q.close =="; g 'q\.close' | cut -c1-120
echo "== record label of a maid =="; g 'Cung nữ thân tín của\|Cung nữ thân cận của\|"Cung nữ thân cận"' | cut -c1-160
echo "== player-visible «thân cận» text =="; g 'thân cận' | grep -v '^\S*jtc.js' | cut -c1-140
