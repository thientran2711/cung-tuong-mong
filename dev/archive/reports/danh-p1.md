# danh-p1 — review/danh-p1 @ 98d7acc4be946ed13e0ca0780094e4e98eb46f01. SẴN SÀNG KIỂM 98d7acc4be946ed13e0ca0780094e4e98eb46f01
Worker opus (Foreman D), START_CTX ≈ 4 % of 1M (own estimate; get_session read 0). Full write-up on the branch: dev/review/danh-p1.md.
Base = review/danh-balance-r1 @9a1133f0 (ONE-CORE fixes) + merge origin/main b85cdb1e (f8ebd5e7; jbal2 both blocks kept, generated files rebuilt).

## Done
1. P1 (owner APPROVED 12:55Z): BAL.charity bac 20→35, danh 1→5 (duc 3, khac 1, once a month) — jbal2.js only, every text prints BAL.
   Shared Hành sự door = act-dedupe's existing second-home card path (jact `ad`/`adRun`, like the maid cards): `adCharityCard` runs the same
   effect body `charityFx` as the Tài nghệ button; one lock S.charM (+ bạc). Kit act card; grey reasons "Tháng này đã làm" / "Thiếu bạc (cần 35)";
   CDN picture already exists for this exact name. No new kit part, no KIT REQUEST.
2. Reproducible runner dev/measure/run_rep.js + vclock.js (virtual clock for all timers/Date/performance, seeded crypto, re-seed at start,
   per-page quota, cached non-local requests). Proof: concurrent runs identical; a full arm (16 lives, cap 144) re-run 1 h later identical (md5 dee71e8a7bf5).
3. Tài-nghệ bot dev/measure/intn.js (studies the exam plan of her next rank through the real Tài nghệ buttons) + antn.py.
4. P2: REPORT only, BAL.ex.bar unchanged. P3 unchanged.

## P1 measured (3 seeds 501/777/913 × 16 lives per arm, cap 144 tuần; before = same main without P1)
| | hs before | hs P1 | mix before | mix P1 |
|---|---|---|---|---|
| Danh at tuần 144 | 38.8 ± 10.0 | 71.9 ± 8.8 | 19.5 ± 8.0 | 38.7 ± 10.1 |
| tuần held back by the Danh row | 51 % | 12 % | 72 % | 47 % |
| charity uses / life | 0 | 30.7 | 0 | 31.9 |
| max rank | 3.1 ± 0.4 | 3.1 ± 0.4 | 2.4 ± 0.3 | 2.9 ± 0.3 |
| Hoàng hậu within 144 tuần | 0 % | 0 % | 0 % | 0 % |
All 3 seeds move the same way. Danh is back; rank is not — the exam holds her.

## P2 (Tài-nghệ bot, P1 build, 48 lives per arm)
| | hs | hs + Tài nghệ | mix | mix + Tài nghệ |
|---|---|---|---|---|
| exams passed / sat | 57 % (52–62) | 100 % (99–100) | 50 % (45–55) | 100 % (99–100) |
| score / bar | 24.3 / 22.7 | 57.6 / 21.9 | 24.0 / 23.5 | 55.4 / 22.3 |
| max rank | 3.1 | 4.5 | 2.9 | 4.3 |
| Hoàng hậu within 144 tuần | 0 % | 4 % | 0 % | 0 % |
Cause 2 PROVEN: without Tài nghệ the Tứ đức + art score parts are 0. A studying player clears the bar ~2.5× → lowering BAL.ex.bar is NOT
supported (would only help a player who never studies). Open item for the foreman (design, not a number): a Hành-sự-only player is not told
that the exam scores Tứ đức/arts.

## Tests (one at a time)
dev/test/danh-p1.js 17 checks PASS at 755x1000 + 1180x820; act-dedupe-w1 PASS; act-dedupe-vp (5 priority viewports + 390x844) PASS; succession PASS; 0 page errors.

## Notes for the coordinator
- Pre-existing, not changed here: the Tài nghệ pbtn card texts say "Chắc chắn · …" (VANPHONG: sure acts carry no label); the kit shows them as
  Tốn/Được rows, so the word does not appear on screen in my checks — flag only.
- In every arm the rank at tuần 144 (≈1.5–1.9 without Tài nghệ) is well below max rank: many falls/demotions. Flag only.
- Worker is finished (only this report + message remain); no successor needed.
