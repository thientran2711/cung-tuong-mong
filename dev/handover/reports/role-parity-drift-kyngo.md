# role-parity-drift-kyngo — LIVE role-parity red after d74f86a5 (law 1 TWO-WAY, law 6a, law 11)

PRIORITY #1 CHECK ('role-parity|P-ONLY|N-ONLY|onlyRisen'): OD 1 | ledger 0 | claims 8 | main 15 | review/* 10 — reused dev/test/role-parity.test.js + role-parity-drift2-play.js and the drift-2 explicit-world method (review/role-parity-drift-2 6ffe38a4, LIVE). No other worker on this drift. depth 7.

Branch `review/role-parity-drift-kyngo` = 0de74d9e + 3 probe commits + merge of LIVE main 716be762. **SẴN SÀNG KIỂM 41d620a57af564acb97c8defb03343ce5f54ad84.**
Diff vs main: **dev/tools/role-parity-scan.js only** (no game code, no BAL, kyngo design untouched; open/exempt lists and OPEN_MAX unchanged).

## 1. Reproduce + cause
- origin/main 0de74d9e, ×2: same red rows as E22d (`up:P-ONLY:cx3:tell`, `up:N-ONLY:harm:accuse/banphe/uyhiep`, `up:PROMO-npc-onlyRisen:harm:uyhiep/banphe/accuse` + promoted-maid-clone FAIL). Deterministic.
- **Not kyngo**: the same build with jbalky.js + jky.js removed from assemble.py gives the identical red list. (A bisect over 6ffe38a4..0de74d9e was started but each step is ~10 min; stopped once the cause was found directly.)
- **Cause = PROBE state leak**: the «proof» world gives the doer 3 proofs on every target. For HER they sit on the target (`t.ev`), which `snapW/restoreW` restores; for an NPC doer they sit in her own `a.evm`, which was **never restored** → an NPC's proof leaked into every later world (men, malice, seen, wares, faction, disfavour, staff). Traced with an instrumented copy: the risen NPC maid got Uy hiếp / Bán cho phe khác / Tố giác only in those later worlds (consort.harm), never in «proof» itself. Which NPC rows the leak lit up depended on the draw (who has real wrongs, who is picked) → rows flipped with any draw shift.

## 2. Row table (all PROBE; no REAL one-way act found)
| # | row | why | fix (role-parity-scan.js) | before → after |
|---|---|---|---|---|
| 1–3 | up N-ONLY harm:uyhiep / banphe / accuse | NPC proof leaked into later worlds (above) | `snapW` also snapshots each NPC's `evm` (restored with the world) | N-ONLY → no row |
| 4–6 | up PROMO-npc-onlyRisen harm:uyhiep / banphe / accuse (+ clone-set FAIL) | same leak (the risen maid is probed before her clone) | same | FAIL → ok |
| 7 | hh P-ONLY cx3:tell, hh P-ONLY hh:judge (exposed by the fix) | held by the NPC Empress ONLY through the leak: an NPC tells / judges only from a motive (jagacts3 par3 tell: evG>0 and agSpite>0; jagacts AGHHG judge: evG ≥ BAL.ag.ev.judge and rel<0); no clean world had proof + grudge | new world **«proof-foe»**: proofs + the doer's own grudge (oán 60) + ill regard (−60) toward each target, raw j9 fields, doer→target only, all undone (UNDO), same for her and an NPC | P-ONLY → SAME |
| 8 | up P-ONLY cx3:tell | in the maid-life page nobody has a real wrong (jtruth `deedCap` 0) → no proof can exist for either doer; her side was credited only by the LOCKED card «Kể tội một phi tần · cần chứng cứ» | law 6a: «proof-foe» first records one real wrong per target (`deedAdd` «bày mưu», up to cap 3), undone after; then proof exists for both | P-ONLY → SAME |
| 9 | up PROMO-me-onlyRisen «Chuyện cũ» / «Hại nặng 11/18» (exposed by 8) | person-card act-group TAB buttons (`data-pct`, j15/j56/jpcf) were read as acts | whole group: `data-pct` added to SKIPA (navigation; every group's buttons are in the HTML anyway, j15 renders all `.pcg`) | label row → none |
A first try (proof-foe via oanAdd/relAdd, not undone) leaked into other doers and lit 13 new P-RANK/N-ONLY rows — rejected; the final world undoes every field it sets.

## 3. Whole group (law 11): every VAR world × state it sets × restored?
| world | sets | her side restored | NPC side restored |
|---|---|---|---|
| proof | evidence | yes (t.ev in snapW) | **no → FIXED (evm in snapW)** |
| proof-foe (new) | deed, evidence, oán, regard | yes (UNDO + snapW) | yes |
| liked, staff, social(k61 part) | regard / servants / acquaintance | UNDO | UNDO |
| body, chest, wares, rouge, rival-down, men, faction | preg/kids/inv/confined/menW/facs | snapW | snapW |
| social, malice, disfavour (oanAdd/affAdd/relAdd), seen (wear, dress memory) | grudge / regard / seen | **no** (both sides) | **no** (both sides) |
The last line is a symmetric pre-existing leak (same mutation for both doers, so no side is favoured); fixing it moves the world every later row is judged in → NOT changed here (would need its own re-baseline). Flagged for the foreman.

## 4. Gates (on 41d620a5 = merged LIVE 716be762)
| gate | result |
|---|---|
| role-parity.test ×2 | ALL PASS, outputs byte-identical (md5 b2957fcc…); open 18 ≤ OPEN_MAX 18 |
| role-parity.test on 0de74d9e (before merge) | ALL PASS |
| role-parity-drift2-play | ALL PASS |
| kyngo-eq | PASS (eqTol 1.25) |
| kyngo-unit (root index.html) | PASS |
| one-core-guard | PASS (fails 0) |
| quickcheck | PASS · old save ok · render 243/227 · tab 426/456 · buổi 1087/1134 · core gates PASS |
No game code changed → no device shots / coop-e2e.

## 5. Notes
- `maid:P-ONLY:maid:errand` now reads closed on LIVE (note only, not a FAIL). Not trimmed: E22e (review/person-minigame-acts-c) owns that row on their branch; trim when both land.
- E22e told the change (snapW evm + VAR «proof-foe» + SKIPA pct); they do not touch these parts.
