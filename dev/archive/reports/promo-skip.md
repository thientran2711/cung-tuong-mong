# promo-skip — SẴN SÀNG KIỂM 7f655c55 (review/promo-skip, from main 0a311183; site rebuilt). Worker session_01UV1SzhzQSFQc43nUVdpwAi.
Owner rules applied: 16/11 06:20Z (long-road rewards = direct rank), 06:45Z (first prince only; seats apply), 07:15Z (every reward has a gain
and a loss; every winning faction side = direct rank), 07:20Z (no «Ân chỉ chờ phong»; full seat = large one-off compensation, then normal exam).
Full audit table (20 places) + gain/loss table: dev/PROGRESS_review_promo-skip.md on the branch.

## Audit summary
- One hook jexam `promoReward(p,src)` + switch `PROMO_SRC` {son1 direct, son grace, dau grace, emp/th/quyen direct}; `promoCost` = the loss;
  `promoFullSeat` = compensation; all numbers BAL.psk (jbal2.js).
- CHANGED: Hoàng thượng side win (was waived exam) → direct; Thái hậu / quyền thần side win (no rank) → direct; later princes (was direct) →
  waived exam; passed grace exams now wait for a free seat (they ignored seats); j67 servant-arc endings that promised «+1 bậc» but gave only
  Công lao → direct servant rank (e67srvUp).
- KEPT: ordinary promotion (monthly decree, NPC decree, seat fill, Tranh ghế) = exam; Hoàng hậu seat its own rules (direct never past Hoàng
  quý phi); princess = waived exam; servant merit / ma ma = exam; j97 servant story roads + «Hoàng thượng để mắt» = decrees; cold-palace release /
  pardon unchanged. Guards kept: BAL.rg.rankCap 6, Sủng floor on the Hoàng thượng side.
- Losses: first prince Hoàng hậu oán +15, other mothers +8 · emp Thái hậu −8, losing-side consorts oán +10 · th Sủng −6 + 2 Thái hậu errands ·
  quyen Danh −6 + one strike-back after 24 months (6 %/month: Sủng −10, Danh −6) · full seat: ghen +10 all consorts. Full seat gain: Bạc 4 ×
  next rank's stipend, Danh +6, 2 rare gifts, phong hiệu (or Bạc +120), house power +8 / father +5; rank unchanged.

## Tests
reign.js 755x1000 + 1180x820 PASS · promo-rules.js PASS (755x1000@2, 844x390@3) · promo-next-rank.js ok · new promo-skip.js 11/11 PASS ·
promo-exam.js PASS except «old save loads…», which fails identically on main (pre-existing). Not run: the full dev/test suite, co-op e2e.

## Balance (bots, quiet machine)
- reign.js 80 months: Hoàng thượng side n 40 before/after — winners' final rank 4.86 → 5.31, Hoàng hậu 20 % → 20 %, Thái hậu favour 81 → 74;
  Thái hậu / quyền thần n 20 each — within noise, no jump to Hoàng hậu. 0 page errors in 160 lives.
- run5b (original origin harness, 9 origins, HHSTOP, n 30 each): Hoàng hậu 43 % → 47 % (±17 band, one life = 3 points → no measurable change),
  early death 30 % → 30 %. NOTE: main itself is already at 43 % (above the 20–40 % band; BALANCE_REPORT final was 33 %) — base drift, not this
  branch. Proposal only (not applied): fix on base balance (BAL.hz/outQ); promo-skip caps if wanted: rankCap 6 → 5, or son1 direct only up to Phi.
