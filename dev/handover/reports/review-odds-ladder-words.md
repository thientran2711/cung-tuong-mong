# review/odds-ladder-words — report (worker session_01964izG87jYFUEWkiatPXTX, sonnet)
PRIORITY #1 CHECK ('khả năng vừa|cao|thấp', chanceW, 'two scales'): OD:L221 (03:05Z "Liều…Nắm chắc ladder is only for the act's own success/failure; side chances use Rất thấp…Rất cao") + OD:L228 | VANPHONG.md l.66-67 | main j1.js:96-102 (word / chanceLvl / chanceW, comment "TWO scales, never mixed") | review/* none | claims odds-ladder-words only.

## Finding that contradicts the order (needs Foreman D / MAIN to confirm — law 16/17)
The robot's «khả năng vừa/cao/thấp» is NOT off the ladder. Canon has TWO scales (OD:L221, VANPHONG l.66–67, j1.js comment): the 7-step ladder (Liều…Nắm chắc) is ONLY the act's own success odds; every side chance ("kèm": có thai, ban thưởng, lật thẻ, bị lộ, bị phạt, khỏi bệnh…) reads "khả năng rất thấp/thấp/vừa/cao/rất cao" via the one helper `chanceW` (j1.js:102). Rewriting those ~40 strings to the act ladder would be the exact thing the owner rejected on OD:L221 and would undo a working rule (law 16). I did NOT do that.

## What I fixed (the real group fault: a rider on the act ladder)
Scan `node dev/test/odds-scales-scan.js` (all j*.js): rider label followed by `word(...)` / ladder; also checked digit-% in player text (none; hits were CSS only), "Chắc chắn" (only confirm-dialog buttons, not odds).
| place | before | after |
|---|---|---|
| jroute.js:96 (đêm trốn / tryst card) | có thai: ${word(trystCh(S))} → «có thai: Liều/Khó…» | có thai: ${chanceW(trystCh(S))} → «có thai: khả năng …» (same number, helper chanceW, no new value) |
Every other chanceW/word use passes the scan (jthaiy.js:96 "thấy mưu hại ngầm: word(findO)" is the act's own find-odds = correct). No kit odds-row component/CSS touched (words only).

## Gates
assemble/build OK · one-core-guard PASS · odds-scales-scan 1→0 FAIL · quickcheck: see below.
Shots (755x1000 + 1180x820): not taken — no robot/GUI route to a tryst card within this worker's budget; one-string change, same helper as 40 sibling cards.

## Gate results (quickcheck on 225c5c08 + this change)
CORE GATES PASS (one-core-guard, rules-one-source, kit-conform, hooks) · TIME-SPILL PASS · open 2060 ms 0 errors · old save loads, 0 errors · odds-cap PASS. odds-no-unknown.js needs a URL arg (not run).
