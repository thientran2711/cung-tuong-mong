#!/bin/sh
# button-crawl-fix-2 family scan: every kit card the queue can hold, by kind, and what a save does with it.
#   look-up panels (spec.look)  → never saved, ONE per title in the queue (kitPanel)
#   other kit cards (body in spec) → saved with their kit spec (j3 kqKit), back whole after a load
cd "$(dirname "$0")/../build" || exit 1
L=$(grep -o "look:1[^}]*title:[^,]*" j*.js | sed 's/,sub.*//')
echo "LOOK-UP PANELS (spec.look) — $(echo "$L" | grep -c .) kinds:"; echo "$L" | sed 's/^/  /'
N=$(grep -o "kitModal(\|kitPanel(" j*.js | grep -v "^j79.js:kitPanel(" | wc -l)
echo "KIT CARD CALL SITES (kitModal/kitPanel, outside the kit itself): $N"
echo "  before fix-2: a kit card in a save = {t,h:'',btn} → an EMPTY card after a load; look-up panels piled up (no dedupe)"
echo "  after  fix-2: look-up = not saved + one per title; every other kit card saved with spec (kit:…) and rebuilt"
