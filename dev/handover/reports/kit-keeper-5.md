# KIT KEEPER #5 (session_01Rc5AsJexZYYx4jcgUw6Uu1) — report
Coordinator: MAIN CHÍNH 97 session_01Rc5AsLuG71zn8SX9tkLTWk · kit reviewer: rv MSxp session_01Rc5AsMSxpxbsAMRSE5oWrq · predecessor keeper #4 (reports/kit-keeper-4.md HANDOVER).
Start: 21/11 ~16:35Z · depth 8 (limit 8: cannot open children) · START_CTX ≈ 4 % of the window (context_usage read 0; own estimate).

## 1. kit-ef-unit r3 — SẴN SÀNG KIỂM `review/kit-ef-unit-r3` @ a42ca838
PRIORITY #1 CHECK: rv-kit-ef-unit.md round 2 PASS (bb00fc02 → rv2 d46ad6de) | LAND CHAIN 2 QC FAIL (perf only: longTaskMaxMs 5349 > ceiling 5000; buổi 2182/1701; render 308/271) | main c9ae030e | review/kit-ef-unit-rv2 reused | claims #4 → #5.
- Branch = review/kit-ef-unit-rv2 d46ad6de + LIVE c9ae030e (conflicts: index/sw rebuilt; KIT.md §6.2b heading = LIVE's «Tốn / Được / Mất rows» + the ef-unit «ITEM = ONE UNIT» line kept).
- Perf cause hunt: probe (kaUnit / kaRowH / kitRows wrapped with timers, iPad, CPU x4, new life + every tab ×3 + 3 buổi + 12 render()): kaUnit 5807 calls = 86 ms (its 3 unicode regexes on every stat item every render). Fix: kaUnit caches its answer per item text (Map on the function, cleared at 3000) → 3826 calls 29 ms incl. timer overhead. Nothing else of ef-unit is per-render (kaEfTag is a cheap prefix test; the CSS rule is keyed on .kef1).
- The QC FAIL itself was box noise: on an idle box the SAME merge without the cache already passed with new ≤ live (run 1). longTaskMaxMs 2.7–3.1 s on both builds (5349 was a busy-box run).
- quickcheck ×3, alone on the machine (new/live): run 1 (pre-cache) render 272/315, tab 522/660, buổi 1630/2772, longMax 2769/2741 · run 2 render 327/270, tab 633/649, buổi 1632/1583, longMax 2744/3402 · run 3 render 284/307, tab 603/542, buổi 1449/1943, longMax 3122/3052. Medians new/live: render 284/307, tab 603/649, buổi 1630/1943, longMax 2769/3052 — all ≤ LIVE. Core gates PASS, old save ok, every run.
- kit-ef-unit.js Fold PASS + iPad PASS (real option dialog widths auto..280, act tab, pop-maid, staff, rv: bad=0) · coop-e2e 124/124.
- kit-win-pay 203cd559 sits on top of ef-unit: re-merge it on r3 when it goes to land (no file overlap with the cache line in j63).
