
## REVIEW m-fix-2 (BIG REVIEWER #2 session_01UV1SzhBrzCVc4CVbM2dCsJ, 11/25/2026) — PASS 240f549a (review/m-fix-2-r = LIVE 9f72524b + button-crawl-fix-2-r 3b7e15cb + m-fix-1-r f92d8be2 + m-fix-2 5f2994ad + 2 reviewer fixes; index.html/sw.js rebuilt)
PRIORITY #1 CHECK: OD:L1352 «no "Đã hiểu" on info frames; close = tap outside / ✕» | KIT 32.10 kitOvSync | main: kitOvSync hid every result button; jallot/jration one note line per entry | claims Foreman F #8/#9.
Reviewer fixes (small, on -r):
1. BUILD WAS RED: j79 `.kpop max-height:calc(50dvh - 16px)` → dev/measure/media-check.js (KIT §0) rejects a raw dvh; changed to `calc(50*var(--kvh,1dvh) - 16px)` (+ KIT.md line). The branch never rebuilt index.html, so the worker never hit the gate.
2. mfix2-resbtn.js / mfix2-usenote.js walked the title by labels (fixed 3 s wait; m-fix-1 renames the roulette button) — on the stack every tap missed (cover #title) and both still exited 0 (no assertions). Now: setup by state (like mk-e2e), every row asserted, exit 1 on any FAIL.
| check | Fold 755x1000 | iPad 1180x820 |
|---|---|---|
| family scan (every id kg82ok/kg92ok/mgok in dev/build) | 13 sites: 11 «Đã hiểu»/«Xong» stay hidden; only jexam «Môn kế tiếp»/«Xem kết quả» + jmgcal «Thử môn khác»/«Dừng ở đây» now shown | |
| mfix2-resbtn (fixed) real taps | PASS: plain words hidden, 4 step labels shown + real tap moves on, ✕ moves on for all 6 | PASS |
| mfix2-usenote (fixed) real taps | PASS 5/5: 40 same bottles 1 line (12 % screen), mixed 4, one 1, 40 boxes 5 lines (19 %), «!» tap / tap-away / card ✕ all land | PASS |
| shots looked at | step button = kit button under the kit ✕; «Ghi chú» pop grouped per colour, «và 7 hộp khác» | same |
| quickcheck 240f549a vs LIVE | PASS (core gates, hooks 9, old save ok, perf in noise) | |
Laws: one note builder (kitUseNote) + one BAL key (law 11); kit pop-up / kit button only (law 9); VANPHONG words, no %. Pre-existing LIVE fails noted by the worker (monthly-ration borrowGot, kit-popup-layer art-rule) not re-run.
