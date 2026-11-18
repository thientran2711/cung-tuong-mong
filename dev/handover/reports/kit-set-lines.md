PRIORITY #1 CHECK: OD 17/11 ~20:47Z + ~21:20Z | main a95e8d4: shelfSetLines / shelfView.sets / items[i].set, jdisp setMap + .kdr-glow already there | review/* none | claims this row.

# kit-set-lines — SẴN SÀNG KIỂM 699bc1b (review/kit-set-lines, from main a95e8d4)
Worker session_01UV1SzjWm6MjjuvYcLJ4Nnr.

## What
- New kit part `kitSetLines(lines)` (jdisp.js, window.kitSetLines): one fact strip, one row per set (state dot + the jshelf line). Kinds on / wait / miss / bad (gold pulsing / faded gold / grey / red).
- Display room: flex footer under the cabinet (not tied to cabinet art; max 26 % / 5.6 rem then scrolls); her room only; hidden with no lines or in an NPC room.
- shelfOpen (interim dialog) uses the SAME part (whole list). Fallback to kitFacts if part absent.
- jshelf shelfSetLines: added field `k` (on/wait/bad/miss) to each line; text unchanged.
- Glow on every piece of a full set: already on main (§89.2c .kdr-glow, setMap from items[i].set.full); verified with real data (>=2 glowing pieces for a whole pair).
- KIT.md §89.6 + kit sample §89 (4 fixture lines); KIT_REQUESTS row (6) CLOSED.
- Fixture line has no typed number (one-core-guard caught "Đức +2" first run, fixed).

## Tests
- display-room.js (extended: strip rows/kinds/inside/below cabinet/calm; real data with BAL.shelf.ui forced in harness only: pair in shelf → strip = shelfView(S).sets text-for-text, glow pieces, shelfOpen modal rows = strip rows): fold PASS, ipadAir PASS.
- quickcheck --cpu 4 --runs 3 on 699bc1b: PASS, core gates PASS, perf new/live render 133/161, tab 311/317, buổi 761/631, tasks>200ms 11/12, old save ok.
- set-bonus-check PASS; shelf-check PASS x2 (one earlier FAIL "a rumour (tip) is not enough to accuse" = unrelated flake, not reproduced).
- Not run: ipadPro/foldLand of display-room (same layout code), coop-e2e (no change to coop).

## Shots (LOOKED at; CDN img/_review/kit-set-lines/ — verdict giver wipes)
disp-fold-real.jpg (Fold 755x1000@2, real data, 2 lines), disp-fold.jpg, disp-ipadAir.jpg (1180x820@2 fixture, 4 kinds), disp-ipadAir-real.jpg.
Note: cabinet picture still missing on CDN (stand-in "broken image" corner is the existing stub), not mine.

## Scan table (group: every place listing set lines)
| place | before | after |
|---|---|---|
| shelfOpen dialog | kitFacts(sets.t) | kitSetLines (same part) |
| display room | none | kitSetLines footer |
No other reader of shelfView().sets in game code.
