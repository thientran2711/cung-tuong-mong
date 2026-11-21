# home-chapters-land3 — BIG review (E46r session_01DgYSWpgAJ7hHV2ztUjAusX, opus, depth 2), 21/11
PRIORITY #1 CHECK ('home-chapters|jkc3|buoiprof'): OD 11 | main 15 | review/* home-chapters-r1 5acae7c54 (E25r2 BIG PASS), home-chapters-land3 2692d309 (E46 SSK 18:13Z) | claims E46 session_01DgYSWpBikuAGcbynFSooho

Reviewed: E46 SSK 2692d309a497 (FF on LIVE c9ae030e). Final-merged by me on review/home-chapters-land3-r onto the NEWEST LIVE three times as main moved (9c5b6de3 → 0faf7a05 dresscode → b7041e67 ge-phutang/kit-win-pay/kit-ef-unit → dcff5884 kit-mark-fix); every merge: only built-file + assemble.py-list conflicts. Final sha: 8e452f066d6e5431841c7fe24e9aa77cd4a8fa62 (4th merge, parent LIVE dcff5884 kit-mark-fix). Newest LIVE at verdict f44060d4 (kit-relrows-ms1word, jkrel.js + KIT.md only): merge-tree = index.html/sw.js conflict only → rebuild at land.

## (a) Merge hunks beyond a both-sides union (5acae7c54..HEAD minus the LIVE side)
Files whose HEAD blob differs from BOTH 5acae7c54 and LIVE: assemble.py, jbal2.js, jkc.js, KIT_REQUESTS.md, index.html, sw.js.
| file | finding |
|---|---|
| dev/build/assemble.py | = LIVE list in LIVE order + only jbalkc3.js (after jbal2) and jkc3/jkc3a/jkc3b (after jkc2). Script check on each of my 3 merges: main-only [] · branch-only those 4 · common order identical. |
| dev/build/jbal2.js | clean union: 0 lines present in both parents dropped, 0 lines in neither (BAL.kc3 block from the branch + LIVE's newer BAL). |
| dev/build/jkc.js | clean union; the only line in neither parent = «Học lễ nghi cung đình» card = branch BAL.kc3.thay.leMax + LIVE BAL.odb.jkc.rlGo_2 (both one-core fixes kept). 0 lines dropped. |
| assets.json | = LIVE (blob identical) on every merge. |
| KIT_REQUESTS.md | union (branch KR «home-stat cost row» + LIVE entries). |
| index.html / sw.js | rebuilt by dev/site/build_site.sh on each merge (built-file conflicts only). |
No real code conflict on any merge. jdfv (LIVE focus-encounter) is untouched by the branch (HEAD blob = LIVE).

## (b) Perf — E46's finding «buổi metric bimodal on LIVE too; slow = 1st buổi ends on an NPC event card»: CONFIRMED
My own tool (scratch seedperf.js: iPad, CPU 4x, CDN aborted, quickcheck's NEWLIFE/SETTLE/BUOI + the titles of every card met in the buổi), LIVE 9c5b6de3 vs HEAD, 12 lives each, run alone:
| build | lives with no card in the 1st buổi (ms) | lives where «Có người đến» came |
|---|---|---|
| LIVE | 1751 1686 1719 1895 1295 1659 1445 1714 2223 1603 1327 (median 1686) | 1 life: 6272 |
| HEAD | 1776 2278 2615 1504 1604 1648 2422 1709 1464 1792 1395 (median 1709) | 1 life: 3314 |
Seeding Math.random does not give the same life on both builds (the branch draws more randoms at start: home roster), so per-seed pairs are not the same girl; the split by «card met» is the clean comparison: no-card HEAD ≈ LIVE (+23 ms median), and the slow mode exists on LIVE (worse there). Pre-existing, not a branch FAIL. Gate not weakened: quickcheck run unchanged, alone, on every sha:
| quickcheck (alone) | result |
|---|---|
| e6e6d605+ (on 9c5b6de3) | perf PASS buổi 1481/1174, render 271/268, tab 538/541 · old save ok · (G4 mk-layer/anchor = my sparse checkout lacked dev/art; rerun below) |
| a90a82c5 (on 0faf7a05) | QUICKCHECK PASS · core gates PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world, hooks 7) · old save ok · buổi 1430/1081, render 225/238, tab 523/461, tasks>200 21/20 |
| f75365ac (on b7041e67) | QUICKCHECK PASS · core gates PASS · old save ok · buổi 1147/1308, render 220/228, tab 452/422, tasks>200 18/20 |
| 8e452f06 FINAL (on dcff5884) | QUICKCHECK PASS · core gates PASS · old save ok · buổi 1250/1232, render 209/236, tab 452/555, tasks>200 20/22 |

## Gates (on a90a82c5 = branch + LIVE 0faf7a05 unless noted)
| gate | result |
|---|---|
| coop-e2e (LIVE Worker) | 124/124, no page errors fold/ipad/solo |
| home-chapters/coop-seats (both seats at home, host + guest) | 34/34 — first chapter opens on BOTH seats, synced weeks, both rosters have faces |
| kc-roads/coop-together | 29/29 |
| kc-roads scan (cnv,nc) / route cnv, nc, bd / direct | exit 0 · 0 FAIL each |
| self-word scan | static: 0 hand-typed · runtime PASS [] |
| rare-match | HEAD output == LIVE 0faf7a05 output (diff empty), errs [] |
| role-parity ×2 | ALL PASS both runs, outputs identical |
| home-chapters/faces.js (law 6b) | 24 lives, 0 face used twice, PASS every roster person has a face |
| home-chapters/laws.js (laws 2/3) | PASS home arcs laws 2/3, endings, seeds, BAL |
| coop re-check f75365ac and FINAL 8e452f06 | coop-e2e 124/124 + coop-seats 34/34 on each |
Known flake not branch-caused: quickcheck G4 80-dialog-fixed #54 (did not fire: dialog-fixed all pass).

## (c) Laws touched
4 ONE CORE: one-core-guard/text/bind/text-rule PASS; BAL.kc3 lives in jbalkc3.js/jbal2.js; kcR1Ok() single gate; the merged lễ nghi line reads BAL for both numbers. 6b REAL PEOPLE: faces.js + coop-seats roster faces (both seats). 7 CỔ TRANG: no «%» in jkc3*/jbalkc3; odds words via the shared odds path (laws.js). 9 KIT FIRST: jkc3* use kit cards/rows; the only classes are kit ones (g/r/past/pgwrap) + marker kc3pgw with no CSS anywhere (git grep); kit-conform G3 PASS. 1 TWO-WAY / co-op land gate (OD L594): home phase runs + syncs on both seats (coop-seats 34/34, coop-e2e 124/124).

## VERDICT: PASS 8e452f066d6e5431841c7fe24e9aa77cd4a8fa62 (base LIVE dcff5884) — LAND READY to MAIN CHÍNH 98. No fault found; perf line is pre-existing LIVE behaviour (NPC event card on the 1st buổi), not branch code.
Scratch shots/logs only in /tmp (none in git, none on the CDN).
