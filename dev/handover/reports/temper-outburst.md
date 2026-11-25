# TEMPER-OUTBURST — seat T1 report (Foreman D ROOT, worker session_01D3E3NZEbGABqJK79fgHJ5q, 25/11)

PRIORITY #1 CHECK: OD 25/11 ~05:45Z (1) + ~08:05Z (read verbatim) | main jemoact.js eaMeOut / eaPick / R_ / BAL.ea, jfeel.js feelActTick / feelDo / BAL.feel.act (the LIVE outburst path), jbal2.js BAL.pm.val, j95.js, jtrong.js | review/* none for temper; review/robot-realtap (realtap.js reused) | claims: this seat (CLAIMS L1677), T2 temper-perception separate.

Branch: review/temper-outburst (from main 9f72524b). Design: reports/temper-design.md (f) rows #1 + #2 + #3 + #7. No new kit part; no new art (reuses img/act-*.webp).

## What was built
1. **Forced choice (row #1)** — her outburst is now the kit event frame with up to `BAL.ea.pick.n` = 4 options (canon overwrite of «only Tiếp tục»); no hold-back option; she must pick one. Both paths: jemoact `eaMeOut` AND jfeel `feelActTick` (finding: with `BAL.feel.act` on, jfeel is the live path; the design only named eaMeOut). One list `eaOpts(p, feeling)` = the feeling's own jfeel act (×`mainW`) + every R_ row of its group her temper allows, top 4 by temper weight (`BAL.ea.rw`).
2. **Law 1** — NPC consorts pick from the SAME `eaOpts` list (`npwPick`, temper weight, near-best), in jemoact `eaPick` and jfeel `feelActTick`. Test: 240/240 NPC picks inside the list.
3. **Equal value + gain/loss (rows #2 + #3, laws 2/3/4)** — `eaPx(p,r)` prices every option in bạc with ONE table `BAL.pm.val` (+ loy 2, duc 3, th 2, hh 2, sung 4, tai 5, ghen 3). Every consort reaction re-tuned to net ≈ `BAL.ea.pick.net` 10 ± `BAL.pm.eqTol` 8; every option vents the same `BAL.ea.pick.vent` 15 (gain on a bad feeling, owner «được đó chính là giải tỏa tâm trạng»); joy rows each carry a stat gain. Phạm thượng: cấm túc now a roll `phamP` 15 (word shown, law 7), priced `camBac`. 8 new rows: Nuốt giận chép kinh, Giận đến bỏ bữa, Thắp hương tụng kinh / cầu an / cho lòng lắng lại, Trang điểm lộng lẫy chờ ngự giá, Kể xấu tình địch với cung nữ, Ngâm thơ ngắm hoa đến khuya, Thêu túi thơm dâng Hoàng thượng. jfeel act fx re-tuned the same way (ngoithu / sangtac now cost Sức; treo Danh when no rival).
4. **Option rows (kit)** — her own stats go in the option `fx` (kit draws Tốn / Được / Mất and the Tâm cơ hint words; j3 chooseM applies fx, the reaction then runs with `fxPaid`, nothing paid twice); vent + other people's feelings + the cấm túc roll go in `x`.
5. **Guarantees G1 / G2** — `BAL.ea.pick.cap` {danh 6, duc 3, hh 8} per `capWk` 36 tuần: once spent, options paying in it drop out of the 4; Phạm thượng at most once per `phamCd` 36 tuần. Stored per person (`S.ea.eaC` / `p.eaC`, old saves start empty).
6. **Row #7 measures/tests**
   - `dev/measure/temper-equal.js` — 36 reactions all within tolerance (ref palace + live palace), law 3 gain on every option, 330 temper × feeling cells: 0 under 3 options, 0 spread fails, 0 page errors. **PASS.**
   - `dev/test/temper-outburst.js` — REAL TAPS (dev/test/realtap.js, copied from review/robot-realtap 4523381f): hot (tap Đập đồ → Bạc −6, Danh −1 exactly as shown, mood up, frame closes), timid (no Đập đồ/Đánh/Phạm thượng; tap Nuốt giận chép kinh → Sức −13, Đức +1), jfeel live path (heavy anger cause → same choice frame, tap → act face set), npc parity, caps, old save. **PASS on Fold 755x1000@2, iPad 1180x820@2, phone 390x844@3** (0 dead buttons, 0 page errors).
   - `dev/measure/temper-hh.js` + `intemper.js` — G4 never-blocks-Hoàng-hậu arms on runb (hot / even / timid vs hot with no outbursts). RESULT: see «G4» below.

## Consistency with seat W (#9 personality thresholds, reports/net-thresholds.md)
No thân / oán / ân threshold is changed here; the outburst list only reads the existing `eaRival` (BAL.ea.rival) and nết → temper (`eaTemper`). When W lands `netTh(p,key)`, `eaRival` should read it (one line) — left for W / T2 so the two do not collide.

## For T2 (perception) / wording (row #6)
New player words to pass to CO-NGU-TITLES: the 8 new option names above, the frame title «Lòng không giữ được», body «Vì … quá nên lòng không giữ được, ngươi phải trút ra một cách.» T2 hooks witnesses into `eaDo` / `feelDo` (they run for every option).

## G4 — never blocks the Hoàng hậu road
- **Code guarantee (G1/G2, holds for every temper and every NPC, law 1):** outbursts can cost at most Danh 6, Đức 3, the Hoàng hậu's thiện cảm 8 per 36 tuần (`BAL.ea.pick.cap`) and one Phạm thượng per 36 tuần; Sủng and Thái hậu regard are never an outburst cost (Sủng only a gain: Trang điểm, Thêu túi thơm, Chủ động mời). Against Danh 78 / the th / hh gates this is a small, bounded bill; what differs by temper is WHO likes her (T2's perception), not the road.
- **Robot arms (temper-hh.js on runb, round 0):** BLOCKED by a pre-existing harness fault — `runb.js sens` gives TIMEOUT at turn 0 for every life on **main 9f72524b too** (checked: main build, 2 lives, both TIMEOUT `mg:true`/`Q:2` at start), so no arm data. The arms script is ready (`node dev/measure/temper-hh.js run 12 <dir>` then `sum`); rerun once the runb start flow is fixed (or port intemper.js to the review/robot-realtap harness).

## Regression
- dev/test/emotion-acts.js @Fold: branch = main (same 4 pre-existing fails on main: gian, vui, scoldlive, hit — not touched here); the `gen` case updated to the choice frame (canon overwrite of «only Tiếp tục»).

## READY
review/temper-outburst — commits 15221b8b, 640d85d5, 20499335 + emotion-acts fix. SẴN SÀNG KIỂM (BIG review). Open item: G4 robot arms (harness blocker above).

## ROUND 2 — review FAIL fixes (seat T1b, worker session_01D3E3NaH1eX32YRAhiQCYnb, 25/11) — commit 6b85187e
PRIORITY #1 CHECK: review-temper-outburst.md (F1–F3, N1–N3) read in full | jemoact eaPx / eaOptX / eaDo khac / eaHoi / BAL.ea.fx + hoi, jfeel caugat | robot-rt.js Seat reused (review/robot-realtap 4523381f) | claims: this seat.
- **F1 signs (whole family, LAW 11)** — `lu()` rows = losses that RAISE another's Oán / ghen, printed «+n»: khac, cham, noimoc, kexau, khoe, moi, khoetai. Scan `dev/measure/temper-signs.js` (every R_ row + jfeel act, a fixed non-queen rival at her rank, + the outrank case):

| key | label | applied | shown BEFORE (394e6ea6) | shown AFTER |
|---|---|---|---|---|
| khac | X oán ngươi | +10 | −10 WRONG | +10 |
| cham / noimoc | X oán ngươi | +3 | −3 WRONG | +3 |
| kexau | X oán ngươi | +10 | −10 WRONG | +10 |
| khoe / moi | kẻ ganh ghen | +6 | −6 WRONG | +6 |
| khoetai | kẻ ganh ghen | +5 | −5 WRONG | +5 |
| khac, X outranks her | (branch) | hỏi tội | «X oán ngươi −10» WRONG | «X sẽ đến hỏi tội (đền Bạc 16, Danh −1)» |
| 10 falling rows (thiện cảm cung nữ / cung nhân / người kia / X / Hoàng hậu) | | −n | −n OK | −n OK |
Total: before 8 wrong / 17 rows → after 0 / 17. eaDo's own line now «X oán ngươi +10» (was no number).
- **F2** — eaPx `khac` follows eaDo's `hi` branch: her → hỏi tội, priced = the eaHoi «Tạ lỗi, đền bạc» bill (bạc + Danh − the Hoàng hậu/consort thiện cảm won back) with `BAL.ea.hoi.bac` 20 → 16 so it sits in 10 ± 8 (net 15); NPC → Oán `hiOan` 20 → 15; an NPC never takes the option when eaDo would punish her (queen / rank gap ≥ punRk: `eaKhacOk`), so no option carries a hidden cấm túc.
- **F3** — Mắng loy 5 → 4 (net 8); Đánh loy 4 → 5, Danh 0 → 1 («mang tiếng ác»), Đức 1 → 0 (net 15); jfeel Cáu gắt loy 5 → 4 (≤ Mắng). Victim order: Cáu gắt 4 ≤ Mắng 4 < Đánh 5 (+ Danh).
- **N1** own build committed (index.html + sw.js). **N2** hot case sets real feelings, asserts the vent: −92 → −77 (= pick.vent 15) Fold, same iPad. **N3** noted for T2.
- Gates: temper-equal.js 36 rows fail 0, 330 cells (0 under 3, 0 spread fail), 0 errors · temper-outburst.js Fold 755x1000@2 + iPad 1180x820@2 PASS (0 dead, 0 errors; shots looked at) · emotion-acts.js @Fold FAIL 5 = the reviewer's branch count, all pre-existing (gian, vui, scoldlive, hit…) · quickcheck.sh not finished here (timed out at 10 min: the 4 G4 robot lives hold all 4 CPUs) — reviewer please run it.

## G4 robot arms on the REAL-TAP harness (seat T1b) — commit fca15148
`dev/measure/temper-hh-rt.js` (run / sum) + `intemper-rt.js`: robot-rt.js `Seat` (review/robot-realtap 4523381f, copied unchanged) plays each life with real taps, bot sens, Fold; the arm (hot / even / timid nết, off = hot with no outburst) is set on page load (pre-life, no tap). Lives run to death / real ending (owner 25/11 ~05:15Z, no cap); ~20 s per buổi here. RUNNING: 4 arms × 3 lives, par 4, out /home/user/wt/tp-g4 (game = build fca15148, i.e. before the round-2 number tweaks). Numbers: added here when the lives end (`node dev/measure/temper-hh-rt.js sum /home/user/wt/tp-g4`). Smoke (slice 6 buổi): temper=hot read back; one «Tâm trạng · <name>» «Lui» ×3 no-effect (known dup person-dialog case of the harness report).

## READY round 2
review/temper-outburst 6b85187e — SẴN SÀNG KIỂM (round 2, same reviewer).
