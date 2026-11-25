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
- **Robot arms (temper-hh.js on runb):** BLOCKED by a pre-existing harness fault — `runb.js sens` gives TIMEOUT at turn 0 for every life on **main 9f72524b too** (checked: main build, 2 lives, both TIMEOUT `mg:true`/`Q:2` at start), so no arm data. The arms script is ready (`node dev/measure/temper-hh.js run 12 <dir>` then `sum`); rerun once the runb start flow is fixed (or port intemper.js to the review/robot-realtap harness).

## Regression
- dev/test/emotion-acts.js @Fold: branch = main (same 4 pre-existing fails on main: gian, vui, scoldlive, hit — not touched here); the `gen` case updated to the choice frame (canon overwrite of «only Tiếp tục»).

## READY
review/temper-outburst — commits 15221b8b, 640d85d5, 20499335 + emotion-acts fix. SẴN SÀNG KIỂM (BIG review). Open item: G4 robot arms (harness blocker above).
