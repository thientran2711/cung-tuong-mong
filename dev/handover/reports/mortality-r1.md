# mortality-r1 — review of review/mortality @14c3640 (orphan #7)

Reviewer: session_01UV1SzkBzFb19bZRxsyptRX (opus). Branch: `review/mortality-r1` @ **2d3428f8** (origin/main 5e5c4128 is an ancestor → fast-forwardable).
Verdict: **PASS 2d3428f8** (FAIL items found were fixed on the branch, list below).

## What was done
1. Merged origin/main twice (cdad7109, then 5e5c4128). Conflicts: assemble.py file list (kept jmort.js after jbal2.js + main's new files incl. jhouse),
   j3.js (main's Lãnh cung `over(...,true)` + branch's `mortEmpDue()` line, both kept), jbal2.js (BAL.mort + BAL.rg both kept); generated files rebuilt.
2. Rules check against the owner's words:
   - Lifespan hidden (OD:L1141): `life.show 0`, no UI shows it. PASS.
   - Curve: OD:L1151 (latest) mean 45 sd 15 clip 15–85 → BAL.mort.life.dice.adult = 45/15/15–85. Sim (40k): rolled at 18 → <30 12.9 % (≈16 % unconditioned),
     >70 4.9 %. Children before 10: 11.8 % + newborn 3 % ≈ 15 % (owner 12–18 %). PASS.
   - No floor (OD:L1168): floorMe/floorEmp/oldFloor 0. PASS.
   - careMax 3 hard ceiling (OD:L1143/L1168): new test runs 40 years with every care source + 40 omen cures → gained exactly +3, never more. PASS.
   - Birth (OD:L1164): stillbirth, newborn death, hard birth survived, "giữ mẹ hay giữ con" decided by the EMPEROR (favour, heir need, Thái y guess,
     Thái hậu, his traits), miscarriage ×0.62 (~20 %). PASS.
   - Kit: no new UI part; the birth card is a normal news item and the fates use the existing end card. PASS. VANPHONG: no %, cổ trang. PASS.
3. FAIL items found and FIXED on review/mortality-r1:
   - ONE CORE (OD:L1267): jmort.js had hard-coded rule numbers (cure odds 40/20, Sức +5 on refused cure, Bệnh già age 55, omen stage months,
     Danh +5 after the Thái hậu dies (text typed "Danh +5"), stillbirth Sức −20 (text typed), plot foil clip 20–90, rumour 50 / Tai mắt 2, plot omen months,
     dieAge base 25, replacement official ages, replacement maid Lòng 40, Y thuật 2 as care source, omen Sức loss 3). All moved into BAL.mort; texts print the constant.
   - Fate bug: the Thái phi → xuất gia / về quê / tuẫn táng / theo con re-route wrapped over() INSIDE later wrappers (j93 ink animation, jkiep, jkc,
     j99succ), so the death-ink animation said "Thái phi" over a "Xuất gia" card (seen in the 755x1000 / 1180x820 shots) and jkc logged the wrong end.
     Now installed at call time around the outermost over(); test asserts the ink title per fate (Xuất gia / Thái phi / Tuẫn táng all match).
   - "Giữ con" (she dies): returned the birth + promotion line after her death; now returns nothing (the end card tells it).
   - Stale header comment (old mean 55 sd 12.5) corrected.
4. Tests (after the last merge): `node dev/test/mortality.js 240 3` — 0 errors, 0 page errors, 0 people without a lifespan, all fate and birth branches,
   old save rolls once, care ceiling OK. `dev/test/mortality-ui.js` at 755x1000@2, 1180x820@2 (+ 1000x755, 1366x1024, 844x390 @1, 390x844 rotate) ALL PASS,
   shots looked at. `dev/test/coop-e2e.js` 59/59. `dev/test/boot-flash.js` 755x1000 and 1180x820: 0 skeleton frames. `dev/measure/mort-sim.js` numbers above.

## For main (not changed here)
- CANON OVERWRITE (OD:L1232): OD:L1141 still carries the OLD curve (mean ~55, sd ~11, 18–90) next to the newer L1151 (45/15/15–85). The old numbers
  should be deleted in place so nobody builds from them.
- Existing kit bug (already in FOREMAN_B_STATUS line 106): the sticky `.kpbar` act-filter strip (z-index 40) draws above #modal (z 30) on end cards
  at 755x1000 and 1180x820, also with `BAL.mort.on=0` and old endings → kit keeper.
- OD:L1164 "she can only plead beforehand": no plead act exists yet (her Sủng / Thái hậu already move the Emperor's odds). Possible follow-up act, not a blocker.
- PROGRESS findings kept: consorts in their 20s die of illness often (j13/jbal2, both models); Emperor dies within 20 years ≈52 % with the owner's curve
  (`life.dice.emp` can get its own curve if wanted); balance-after-truth rerun after this lands (orphan row 7).

~85% xong / ~80% chơi được (mortality feature)
