SẴN SÀNG KIỂM 0aa7fdd9a7d87afba3285b05b25625c56888ac0c
# review/close-maid — D58 close maid by origin (owner APPROVED table v2), Foreman D
Branch review/close-maid @0aa7fdd9 (on review/servant-mline-r2 c3e1cacd). Code dev/build/jcmaid.js, numbers BAL.cmaid (jbal2.js).
Full table of sources / gains / losses / talents / secrets: dev/PROGRESS_review-close-maid.md on the branch.
PRIORITY RULE #1: nothing of this existed on origin/main or any origin/review/* (git grep).

## Built
- Per origin: source + gain + loss exactly per the owner's table (tt home, dtq martial home, ch Thái hậu's plant, muoi home, nc home-country,
  thd PICKS 1 of 3, td palace + old family servant, cn old roommate, cnv picks at her rise). General rule: home maids carry the family's dilemmas;
  picked / old servant: cannot be bought, trust lasts.
- Random per game: loyalty (range by source), ONE talent (thêu / thính tai / biết thuốc / kín miệng), ONE secret (đối thực / nợ / mẹ bệnh / từng nhận
  bạc), every consort's maid too (same rules, host-only in co-op). Every number in BAL.cmaid. No new road → no origin bot run (owner rule).
- Display: existing kit only (Nhập cung kitRows "Theo hầu" row, stage person info line, kit dilemma card). No new UI part, no KIT REQUEST.
- Old saves: the maid she has stays (loyalty kept) and gets source/talent/secret.

## Balance check of the maid effects (dev/measure/sim_cmaid.js; she does nothing but talks with her maid when loyalty < 55; dilemmas answered at random)
| origin | lives × months | close-maid bạc / year | Danh / yr | Sủng / yr | Thái hậu / yr | Sức / yr | proof / yr | dilemmas / yr | maid kept at end | special counters |
|---|---|---|---|---|---|---|---|---|---|---|
| tt | 3×96 | -8.4 | +0.5 | -0.2 | +0.0 | +1.0 | 0.58 | 0.5 | 1/3 | secTell 1, bought 7 |
| dtq | 3×96 | -3.0 | -0.1 | +0.0 | +0.0 | +6.4 | 0.00 | 0.4 | 1/3 | guard 1, bought 7 |
| muoi | 2×72 | +0.0 | +0.1 | +0.0 | +0.0 | +0.0 | 0.50 | 0.6 | 1/2 | secTell 1, bought 2 |
| nc | 2×72 | +55.9 | -0.2 | +0.0 | +0.2 | +0.0 | 0.00 | 0.4 | 2/2 | landBac 500, secTell 1 |
| ch | 2×72 | +0.0 | +0.0 | +0.0 | +5.7 | +1.2 | 0.08 | 0.0 | 2/2 | chKnow 2, chTh 68 |
| thd | 2×72 | +16.2 | +0.0 | +0.0 | +0.0 | +0.0 | 0.42 | 0.2 | 2/2 | picked 2 |
| td | 2×72 | -2.5 | -0.9 | +0.0 | -0.5 | +0.0 | 0.75 | 0.2 | 2/2 | tdTake 1, tdExpose 2 |
| cn | 2×72 | -7.5 | +0.0 | +0.0 | +0.0 | +3.2 | 1.33 | 0.0 | 2/2 |  |
After this table: nc gift 8 → 4 %, questioned 5 → 8 % (re-run 2×48: bạc +25/yr, Danh −0.8, Thái hậu −1.2, 0.6 dilemmas/yr);
ch good word 25 → 15 % (re-run: Thái hậu +3.0/yr; every wrong she does: −4 at 50 %, so a schemer loses it). Talent thêu 4 → 3 bạc.
Read: no source's net effect dominates (bạc −8…+25/yr against stipends 30–320/month); losses come as dilemmas (0.2–0.6/yr) or per wrong/bribe.
Seen (pre-existing, not changed): with no care her maid is bought away about once a year (j8 maidMonthP: loyalty −1/month, bought at < 45);
then the replacement (40) is bought again soon — tt/dtq ended with a Nội vụ phủ maid in 2 of 3 lives even with care. Coordinator may want a look.

## Tests
dev/test/cmaid-unit.js 755x1000@2 + 1180x820@2: 14 checks ok (pick card, pick, home loyalty, Nhập cung rows, old save, dtq guard, ch, muoi, td, land,
cn, cnv pick, secret cards), no overflow, 0 errors (one earlier run failed a random-dependent check, reruns ok). mline-oldsave (main save) ok 0 errors.
Pick card screenshot: kit dilemma card, 3 candidates with distinct talents; the event hint line hides start loyalty numbers (kit rule OD:L469).

## Handover (worker rollover)
Context near the worker limit; both tasks pushed. Nothing left open on my side except review findings.
