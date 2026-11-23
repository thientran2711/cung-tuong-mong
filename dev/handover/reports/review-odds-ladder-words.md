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

## REVIEW (reviewer session, vs base LIVE 225c5c08 = origin/main, still newest — no merge needed)
PRIORITY #1 CHECK ('khả năng vừa|cao|thấp', chanceW, odds scales): OD:L221 + VANPHONG l.66-67 (two scales) | j1.js:96-102 word/chanceLvl/chanceW | claims G87jYFUE | main 7 | review/odds-ladder-words only.
THE 18 LAWS touched: 4 (ONE CORE: same BAL number via trystCh, no new value) PASS · 7 (cổ trang, no digit-%) PASS · 9 (kit odds-row/CSS untouched) PASS · 11 (scan script + before/after table) PASS · 16/17 (worker did not undo owner's two-scale rule) PASS.
1. Canon claim CORRECT: «khả năng vừa/cao/thấp» = side-chance scale (OD:L221 "ladder only for the act's own odds; side chances Rất thấp…Rất cao"; VANPHONG l.67; j1 chanceW). Ladder = act's own odds only. Spot-read 5 chanceW hits (j22:51 phá thai băng huyết, j79:795, j4:18 biên ải, j13 khỏi bệnh, j20 bổng lộc) all side chances; 5 word() hits (j7:155 ân xá, j19 HUD, j7:149, j55, j8) all the act's own odds. HUD cells "Thai/Lật thẻ" start as word() in j19:86 but j64:6 overrides with chanceLvl at runtime; verified live: «Có thai: Rất thấp», «Lật thẻ: Thấp» (both devices). No mixing found. odds-scales-scan: OK. NOTE: scan regex only catches «label: ${word(…)}»; a call like c("con","Thai",word(..)) would slip past (j19:86 is hidden by the j64 override) — suggest follow-up, not blocking.
2. jroute.js:96 tryst «có thai» uses chanceW(trystCh(S)) — confirmed in diff and live: «có thai: khả năng thấp».
3. No digit-% in player text (grep: only CSS and dev comments); kit odds-row untouched (diff = jroute.js 1 string, scan script, report, rebuilt index.html/sw.js).
4. Gates: QUICKCHECK PASS (215 s, open 1977 ms, old save ok, perf new/live render 212/220, buổi 1332/2789) · core gates PASS · one-core-guard PASS (fails 0) · odds-cap PASS · LIVE main still 225c5c08 = base, no newer LIVE to merge.
Shots Fold 755x1000 + iPad 1180x820 (tryst card forced via console: rtMan/rtNight/rtSpot/watcher stubs, T.tt.st=3): card text «Sức +12 · tình ý +10 · có thai: khả năng thấp · Lời ra tiếng vào +18», 0 page errors, both layouts clean; looked at both. Files in reviewer scratchpad (not in git).
