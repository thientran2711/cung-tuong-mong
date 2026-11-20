# mg-fair-hands — worker report (opus, child of C-AG #25; MAIN ROOT-72 order) — HOLD (owner OD 20/11 ~01:42Z: lands only after her full calibration + ratio OK)
PRIORITY #1 CHECK: OD 20/11 ~01:10Z + ~01:18Z (thirds) + ~01:42Z (every split number a knob, HOLD) + ~01:50Z (upbringing replaces rank) — canon overwrite of OD 17/11 ~16:20Z (f) | main jmgt.js:87 mgHand skew, jmgcal.js mgCalBand up/dn, jbal2.js BAL.ag.mg2.hand {lo,hi,w,skew} + cal {up,dn,min,max} | review/* none on this topic | claims: this row only
START_CTX ≈ 6 % (1M window), depth 4. Branch `review/mg-fair-hands` from LIVE 72f7c0c5.
**Head b4b5999** (site build) on code **5bf7d64**, merged LIVE origin/main 7292287 (683ee9c). Earlier passes on the same branch (overwritten in place by the owner's updates): 78d5bee ±2.5 half/half → 3960cb1 thirds → 25b6fcf upbringing table + split knob → 5bf7d64 upbringing from the existing ORIGINS art (MAIN relay, no new table).

## What
1. **Thirds base** (OD ~01:18Z "1/3 ngang, 1/3 hơn, 1/3 kém"; jmgt `mgThird`, `mgBand` / jmgcal `mgCalBand`): centre = her calibrated base b + w/2 (an NPC's average play = hand − w/2; a kind she has not tested: the skilled human median `mgMedD(0)` = 7.5). A hashed draw puts each NPC in a third by `split` [worse, equal, better] (default 1:1:1): equal = centre ± eq (0.5); better = centre + eq … + far (2.5); worse = mirror; bell-shaped inside each third (mean of 2 hashed draws). Saved per person per kind (p.mgH); old saves re-roll (band sig now `t/lo/hi`).
2. **Art lift** (jmgt `mgHandEff`): + art (0.2) per art level of that kind above / below HER level — on top of the board ease the NPC's level already gives (≈ 0.8 / level; 0.5 was tried: ±2 levels → 96 % / 5 %, too steep).
3. **Upbringing** (OD ~01:50Z "tiểu thư khuê các … vào cung đã giỏi mà, chỉ có nhà nghèo mới yếu"; MAIN relay: read the EXISTING origin stats, no new table): a person's art level for the lift AND for her own board = max(her own level, her origin's start bậc for that kind from j1 ORIGINS / ORIGIN_BR `art:{…}` — tt cam 1, cn y 2, nc / bd vu 1, td / thd thi 1) (jmgt `mgOrgLv`). Her own arts already hold her start bậc, so the NPC now gets the same. Origin key `mgOrgOf`: S.origin; consort v.nr.o / v.ag.o / jagent agOrg (saved, host only); servant "srv" / unknown = none. **Rank gives no skill** (old rank knob deleted).
- Art / upbringing read live (not saved), measured against the seat-a player (`mgRefP`: S; co-op guest → the host's person) so both seats roll the same play. No player-visible text or UI change (contest odds words stay on the ladder via oddsCl) → no shots.

## Knob table (ONE CORE: `BAL.ag.mg2.hand` in dev/build/jbal2.js, one line — main retunes after her real-life rating)
| knob | default | meaning |
|---|---|---|
| split | [1,1,1] | weights of the thirds [worse, equal, better] (1:1:1 = 1/3 each; e.g. [1,2,1] = half about equal) |
| eq | 0.5 | half-width of the "about equal" third (hand points round her) |
| far | 2.5 | outer edge of the better / worse thirds (band = centre ± far) |
| w | 4 | how far under her ceiling a play falls (average play = hand − w/2) |
| art | 0.2 | hand points per art level above / below hers (board ease ≈ 0.8 / level comes on top) |
| (ORIGINS art) | j1.js / jorigins.js `art:{…}` per origin | upbringing start bậc (tuned there at the ratio step, per MAIN) |
| (cal.k) | dan b 8.3 | her calibrated base per kind (dev/tools/mgcal_apply.py) |
Deleted (law 14): hand lo / hi / skew, cal up / dn / min / max, first-pass sp, rank, the interim up table.

## Whole group (law 11) — every reader of the hand (`grep -n "mgHand\|mgCalBand\|mg2.hand" dev/build/*.js`)
| place | before | after |
|---|---|---|
| jmgt mgNpcRaw (every NPC mini-game play: j71 contests + odds, j82 rivals, jexam, jts summons/lanterns, j83 works, j85 lessons) | ceiling = skewed hand | ceiling = mgHandEff (thirds hand + art lift on max(own, origin start bậc)); board lv = the same max |
| jslap slapNpcDraw (tat) | heavy × (hand−lo)/(hi−lo): table = best hand, all others weaker | f = (eff − centre)/far ∈ −1…1, symmetric: middle hand = table |
| jhd hdNpc (hoa điền) | q mean = hand/10 (ceiling read as mean) | q mean = (eff − w/2)/10 = her average play |
| jmgcal mgCalBand | b+w/2+1 … b+w/2−4 (strong rare) | thirds round b + w/2 |

## Measure (dev/measure/mg-fair-hands.js; contest board occ hoi; her win share %)
**A — thirds, average untrained NPC set** (art 0 = hers, her origin, same rank; 1500 NPCs × 6 plays)
| kind | third | share of NPCs | her win |
|---|---|---|---|
| dan (b 8.3) | worse / equal / better | 34.6 / 32.2 / 33.2 % | 89.5 / 48.7 / 10.2 |
| co (untested → 7.5) | worse / equal / better | 33.9 / 32.1 / 34.0 % | 89.3 / 50.0 / 11.1 |
**B — upbringing × own art step** (her: thd, art 2; NPC own level = 2 + step, floored by her origin's start bậc; 600 NPCs × 8 plays per cell)
| kind · origin | art −2 | −1 | 0 | +1 | +2 |
|---|---|---|---|---|---|
| dan · tt (cam 1) | 72.6 | 72.9 | 50.3 | 29.6 | 14.6 |
| dan · cn / thd / cnv (no cam) | 89.1 | 72.7 | 49.7 | 29.6 | 14.5 |
| huong · cn (y 2) | 48.0 | 47.1 | 47.9 | 27.5 | 13.1 |
| huong · tt / thd / cnv (no y) | 88.1 | 70.8 | 48.3 | 27.4 | 12.9 |
| co · any (no origin gives ky) | 87.4 | 70.0 | 48.5 | 29.3 | 14.5 |
Reading: an untrained noble-born / maid-born NPC enters at her origin's start bậc in that art (tt strong at đàn, cn at hương), the poor-born start at 0 and rise only through palace levels. With today's ORIGINS values the upbringing shows only in the arts each origin lists (cam / y / vu / thi); e.g. dtq, ch, muoi give none — **MAIN: tune the bậc in ORIGINS at the ratio step** if the owner wants a wider "khuê các" edge.

**C — as she climbs** (her at rank r, art 2, origin thd, vs the consorts of rank r over 20 fresh courts)
| rank | consorts | their mean art (dan) | her average play on her board (dan) | her win dan / huong / co |
|---|---|---|---|---|
| 0 | 40 | 0.9 | 9.0 | 70.6 / 74.3 / 73.4 |
| 1 | 40 | 0.9 | 8.6 | 69.5 / 83.1 / 78.5 |
| 2 | 20 | 0.8 | 8.3 | 78.1 / 79.5 / 78.0 |
| 3 | 40 | 1.1 | 7.9 | 72.2 / 83.5 / 79.5 |
| 4 | 20 | 1.1 | 7.5 | 60.0 / 86.6 / 80.2 |
| 5 | 20 | 1.1 | 7.0 | 78.8 / 72.6 / 81.1 |
| 7 | 20 | 0.8 | 6.2 | 75.3 / 78.0 / 77.1 |
(her win > 50 % here only because she is art 2 against fresh courts of mean art ≈ 0.5–1.)
**Finding for MAIN (not changed here, outside the brief):** law 5 holds through HER board (her average play falls 9.0 → 6.2 as she climbs), but NOT through "who she meets": in fresh courts origins are spread evenly over ranks (tt×5 at rank 0, tt×4 at rank 7) and art levels do not rise with rank, so higher-rank consorts are not stronger. If the owner wants "high ranks mostly noble-born", the lever is the court generator / origin roads (BAL.nroad.org, BAL.ag.org by clan) or promotion weighting by arts — a separate order.

## Tests (on 25b6fcf / 2548e06)
- NEW dev/test/mg-fair-hands.js (15 checks): thirds 30–37 % each (dan + co), middle NPC = her ±0.3, symmetric, bell inside a third, split [1,2,1] → half equal (one knob), no old keys (skew/sp/rank/up/lo/hi), art lift = BAL.art, equal NPC wins ≈ 50 %, upbringing from ORIGINS art (tt cam 1 plays clearly above her thd on dan; cnv = her; own level above the start counts as is), rank alone = no lift, family reads mgHandEff, old-save re-roll, S never gets a hand, no page errors.
- ag-mgh 10/10, ag-mgcal 14/14 (skew asserts overwritten by fair-spread asserts; test persons equal to her in art / origin where a lift would blur the check; dan cal restored not deleted), mgcal-apply.test.sh all ok.
- ag-mg2 22 ok / 2 FAIL — both "summons" rows (calls 15/400; median 6 vs 5.8) = **the same 2 FAILs on LIVE 72f7c0c5** (stash run of main); summons calls are a jts issue outside this branch.
- mg-skip PASS (on b4b5999). slap-mg: "fails":["marks"] (screenshot-marks check) on b4b5999; the main-build comparison could not run here (the sparse main worktree lacked rank/worker/src/score.js for assemble) — reviewer please run `node dev/test/slap-mg.js <url> 755x1000@2 <dir> 0` on origin/main vs this head.
- **QUICKCHECK PASS on head b4b5999** (166 s, old save ok, core gates PASS).

## ITEM (O) origin-arts — NOT STARTED (HANDOVER)
Received from C-AG #26 at 01:53Z (brief item (O), handover 7c9b5160). Not started: this worker hit its rollover point (START_CTX 6 % + 25 % → context ≈ 30 % at 01:55Z). Successor plan:
1. Branch: continue on `review/mg-fair-hands` (head b4b5999; worktree pattern in START_WORKER PREAMBLE). Read brief item (O) verbatim.
2. Hook point already in place: jmgt `mgOrgLv(p, kind)` reads `originByKey(mgOrgOf(p)).art` (the max bậc over the kind's KG82 formula stats). When the per-identity table exists, make `mgOrgLv` read the identity row (origin × story branch) instead of `ORIGINS[k].art` — one function, no other mg change needed; her own start arts come from the same table at new game (j2 start: where `o.art` is applied to S.arts).
3. Data to survey: j1 ORIGINS (8) + ORIGINS.push cnv (j-file with `ORIGINS.push`) + ORIGIN_BR (jorigins bd + hòa thân branches) ; story branches per origin (grep "nhánh"/branch in j53, j67–j72, jorigins); arts list = KG82_STAT / kg82FormulaOf stats + S.arts keys (cam ky thi hoa vu y theu nau …).
4. Tests: extend dev/test/mg-fair-hands.js check 3 to the table; old saves keep their arts.
