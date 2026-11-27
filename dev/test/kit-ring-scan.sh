#!/bin/sh
# RING-BUILD-2 family scan (law 11): face strips (pager) on vòng người = every item carries its person (p:); the rest still draw the old strip.
cd "$(dirname "$0")/../build" || exit 1
echo "pager call sites (face strips):"
grep -n 'pager("[a-z0-9]*",\|pager(key,\|pager("ks"' j*.js | grep -v 'function pager' | while IFS= read -r l; do
  f=${l%%:*}; n=$(echo "$l" | cut -d: -f2); if echo "$l" | grep -q '({p:\|p:x\.p\|p:{kind'; then s=RING; else s=OLD; fi; echo "  $s $f:$n"; done | sort
echo "picker frames: generic (#modal list, every card a person, ≤1 aside card) → vòng người via jkring.js modalRing()"
echo "stage tokens: dfOpen → kitRing.stageRing()"
