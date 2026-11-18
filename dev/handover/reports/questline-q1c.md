PRIORITY #1 CHECK: OD L644/L1072/L1243/L1252/L1601 | main dev/build/jnroad.js:94-103 nrOffer + 8 stock cards :134-183, jnroadm.js nrMenOffer :133 / nrVoiceM :147, BAL.nroad jbal2.js:347-363 | review/* questline-audit b42a7c70 (§4 Q1), questline-q1a 98cb395 (engine), questline-q1b | claims E7a/E7b/E7c (C490-492)

# Q1c — men help asks (jnrask_m.js) — NOT READY, HANDOVER (context rollover)
Branch **review/questline-q1c @ 6dc4222** (from main a95e8d4). Files: `dev/build/jnrask_m.js` (data only), `dev/build/assemble.py` (+`'jnrask_m.js'` right after `'jnroadm.js'`; on rebase over q1a put it after `'jnrask.js'`/`'jnrask_b.js'`), `dev/test/nrask-m-scan.js`, rebuilt index.html/sw.js.

## Done
- 102 asks = 17 men templates × help chapters 5–10, one ask each, in the Q1a engine shape `NRASK["<template>_<n>"]={k,c,h,o:[[label,loss],[label,loss]]}`, options in the stock option order of kind k (builder `ORD`; costs/odds/losses stay stock, ONE CORE). Voice via slots only ({me}/{call} → nrVoiceM thần / nô tài / bản vương). Kinds emp/th/hh/thu/do/y/che; no «bac»; money only as a cost.
- **hz_hoc / hz_le / hz_tran have no entry on purpose**: princes never ask (jnroadm nrMenL `a:null` → nrMenAsk/nrMenOffer false). Asked E7a (session_01DgYSWpyUqEzbbzMAtLMkNM) to exclude `hz` templates from the men coverage check in dev/test/nrask-scan.js.
- Tests: nrask-m-scan PASS (coverage, stock cost order, no shared sentence incl. stock cards, VANPHONG, slots); one-core gates G1 guard/text/bind/text-rule PASS; quickcheck on cf6c5c8: PASS except mk-layer-scan browser-closed flake (rerun alone: 12960 pictures, 0 bad). Local merge with q1a (worktree /home/user/wt/e7c-t, engine 98cb395 + my file + assemble line): builds.

## LEFT for the successor (Q1a's shared dev/test/nrask-scan.js must PASS on the q1a+q1c merge)
1. **≥2 asks per chapter** (scan rule, expert B9): write a SECOND ask for each of the 102 chapters — a different shape/kind from the first (questline-expert.md B2 men row + B4; no shared sentence/label/loss line). Engine takes a list: make the entry an array `[askA, askB]` (change `def` to push into `M[id]` as an array).
2. **«do» asks must name `{B}`** (the stock «do» option drops relation with {B}) — 27 asks: eun_len_6/7, gd_kho_5/6, gd_tinh_6/9, gd_tl_5/7, hs_hoa_6, ksp_so_6/8, ns_tho_9, off_dan_6/7/9, off_ghe_5, off_thong_7/9, st_uoc_6, tq_an_5, tq_que_9, ty_tra_5/8/9, vg_bien_5/7, vg_dat_6. Either put {B} in as the suspect/target (fallback «kẻ kia» must read well) or change the kind (thu/che) when the ask is not about a rival.
3. **No typed «mình» / «em»** in the ask h (8): hs_hoa_6, ksp_so_5, off_dan_10, off_ghe_9 (em gái), ty_thu_9, ty_tra_6, vg_bien_6, vg_dat_6 (em gái).
4. Then: run `node dev/test/nrask-scan.js` + `nrask-engine.js` + `nrask-shots.js` (Q1a's, on the merge), 2 men help cards Fold 755x1000@2 + iPad 1180x820@2 → CDN img/_review/questline-q1c/, quickcheck, finish this report, "SẴN SÀNG KIỂM questline-q1c <sha>" to Foreman E. Foreman E said: HOLD review until q1a lands on main; then rebase q1c on main.
Scratch: /home/user/wt/e7c (branch), /home/user/wt/e7c-t (q1a test merge, not pushed), /home/user/wt/e7c-work.
