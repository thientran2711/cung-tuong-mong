# facfound-parity — «Lập phe» rows red in role-parity-drift2-play (law 1 TWO-WAY, law 6b, law 11)

PRIORITY #1 CHECK ('facFound|Lập phe|drift2-play|facAct'): OD 0 | ledger 0 | claims 8 | main 15 | review/* 0 | archive 3 — reused j10 facAct/facHTML, jagacts3 par3fac/AGRUN cx3:fac*, jrcv RCVK.facFound/facJoin/facInvite + PEND.rcvAsk (her 4-answer card), and the drift2-play method. No other worker on it.

Branch `review/facfound-parity` = origin/main fd682a8d + merge review/role-parity-drift-kyngo 9a6eaa38 (PASS) + 1 commit. **SẴN SÀNG KIỂM 5f46f023d0fd94bcd261e5fa81f10da6729fff70.**
**GAME CHANGE (small) + probe fix.** Diff: dev/build/jagacts3.js (2 filters + comment), dev/build/j10.js (1 filter), dev/test/role-parity-drift2-play.js (A rows), new dev/test/fac-parity-play.js, index.html/sw.js rebuilt. No BAL change, no new player text, open/exempt/OPEN_MAX untouched.

## 1. The 2 drift2-play FAILs = PROBE (flaky), no landing broke founding
- Founding is a REQUEST: facAct "lap" → rcvAsk("facFound") → the receiver picks one of 4 answers (jrcv rcvPick: Nhận lời / Hẹn để sau / từ chối / mách lẻo) — a real choice (law 6b). The A rows assumed «yes».
- The seed was set in one page.evaluate, the act ran in a second one; timers in between ate a run-dependent number of draws → the answer flipped run to run. Same build, same file: FAIL / PASS alternating.
- Flake rate per LIVE build (4 runs each, dev/index.html): 69bd0766 (first main with the test) 3/3 PASS · 5c53cb14 4/4 · 61b9cbdd (377d5ce3) 4/4 · 6d22c619 (892e5bb0) 3/4 · df44bc3e (30e8714e) 4/4 · f6e84391 (90d57324) 4/4 · fd682a8d (66bd36cd) 4/4 here, 2 FAIL / 1 FAIL seen in other runs; b2fe6908 / 72f7c0c5 also red (1 FAIL). It flips with how many draws each build makes; no single landing.
- Fix (probe, honest): re-seed inside the act evaluate; wrap rcvPick to read THIS receiver's answer; row = one of the 4 answers AND faction exists exactly on «full»; then play «Nhận lời lập phe» (RCVK opts[0].go) and check the faction. Her side and the NPC side the same. 4/4 PASS (answers seen: full, no, half — all handled).

## 2. Whole family both ways (law 11) — found 2 REAL law-1 gaps, fixed
| act | she → NPC | NPC → her | NPC → NPC | before | after |
|---|---|---|---|---|---|
| Lập phe cùng | facAct lap → rcvAsk | **never sent**: p3FacFr `x!==S`, j10 loop `fr.filter(y=>y!==S)` (her card PEND.rcvAsk facFound existed, no caller) | cx3:facFound | **GAP** | p3FacFr keeps S; j10 loop keeps S → her 4-answer card |
| Xin vào phe | facAct xin → leader answers | **never sent** to a faction she leads: p3FacJoin `l!==S` | cx3:facJoin | **GAP** | p3FacJoin keeps her faction (`l!==v`) → her card PEND.rcvAsk facJoin |
| Mời vào phe | facAct moi | j10 rcvAsk facInvite(l,S) | — (not her parity) | ok | ok |
| Rời phe | facAct roi | cx3:facLeave | — | ok | ok |
| Bán đứng | facAct ban | cx3:facSell | — | ok | ok |
| Ly gián | facAct ly | cx3:facDiv on HER faction | — | ok | ok |
role-parity scan did not see the 2 gaps (it compares the act sets per role, not the target "to her").
dev/test/fac-parity-play.js on plain LIVE fd682a8d: **2 FAIL** (rows 3, 5: opt false, sent false); on this branch **ALL PASS** (17 rows).

## 3. Gates (5f46f023)
| gate | result |
|---|---|
| role-parity.test ×2 | ALL PASS, byte-identical (md5 b2957fcc… = same as E23 on kyngo); open 18 ≤ OPEN_MAX 18 |
| role-parity-drift2-play | ALL PASS ×4 (dev/index.html) |
| fac-parity-play (new) | ALL PASS; LIVE 2 FAIL |
| one-core-guard | PASS (fails 0) |
| quickcheck (alone) | PASS · old save ok · render 211/242 · tab 548/516 · buổi 1355/1510 · core gates PASS |
No UI/kit change (same card, same buttons) → no device shots.

## 4. Notes
- Even re-seeded, the act evaluate is not fully deterministic across runs (state touched by timers between evaluates; j10 found() ids use Date.now). Rows no longer depend on it.
- `maid:P-ONLY:maid:errand` still reads closed (note from E23, owned by E22e).
