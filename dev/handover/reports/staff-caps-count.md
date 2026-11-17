# staff-caps-count — servant totals per table (MEASURE ONLY, BAL unchanged)
PRIORITY #1 CHECK ('staff caps' / 'BAL.promo.cap'): OD ~15:40Z (L1636) read verbatim | main e8b1906f BAL.promo.cap (jpromo.js:22) + capTh [4,2], j10 capOf/hhHas/fillStaff, j17 roomFor, FPOOL (j17 + j25 override) | reused dev/measure/staff-month.js loop | review/* none.
START_CTX ~10 %. Script: review/staff-caps-count b6166003 `dev/measure/staff-caps-count.js` (measure file only).

Average over bot lives (n = 16 at start / 14 at +2y / 9 at +5y; deaths drop lives). Maids include the personal maid. Live roster = her + NPC consorts alive: **11.0 / 10.1 / 9.0** (not 20; CAPC = 16). Thái hậu alive in 16/13/6 of those lives.

| table | moment | maids | eunuchs | ma ma | TOTAL | cut by faces (maid / eunuch) |
|---|---|---|---|---|---|---|
| A today (BAL.promo.cap, Th 4+2) | start | 27.6 | 10.4 | 0 | **38.0** | 1.6 / 0 |
| | +2y | 28.4 | 11.3 | 0 | **39.6** | 3.4 / 0.6 |
| | +5y | 26.7 | 12.3 | 0 | **39.0** | 3.1 / 1.3 |
| B1 owner, '?' = no eunuch (QP 3+0, HQP 3+0, Th 3 + 1 ma ma) | start | 23.4 | 4.1 | 1.0 | **28.5** | 0 / 0 |
| | +2y | 23.4 | 4.6 | 0.9 | **28.9** | 0.1 / 0 |
| | +5y | 22.9 | 5.0 | 0.7 | **28.6** | 0.4 / 0 |
| B2 owner, '?' = +1 eunuch (QP 3+1, HQP 3+1, Th 3 + 1 ma ma + 1) | start | 23.4 | 6.1 | 1.0 | **30.5** | 0 / 0 |
| | +2y | 23.4 | 6.4 | 0.9 | **30.7** | 0.1 / 0 |
| | +5y | 22.9 | 7.8 | 0.7 | **31.3** | 0.4 / 0 |
| C lower (ĐƯ/TT/QN 1+0, Tần 2+0, Phi 2+1, QP 2+1, HQP 3+1, HH 3+1, Th 2 + 1 ma ma, lãnh cung 1) | start | 19.1 | 3.0 | 1.0 | **23.1** | 0 / 0 |
| | +2y | 18.6 | 3.9 | 0.9 | **23.4** | 0 / 0 |
| | +5y | 18.9 | 4.9 | 0.7 | **24.4** | 0 / 0 |

Method: month loop (as staff-month.js: new game per life, 8 origins in turn, monthTick, dialogs dropped, no forced rank moves), rank mix snapshot at month 0 / 24 / 60; each table applied to every live household (cold palace = lãnh cung row, queen = row 7, Thái hậu if alive); face cuts per the live roomFor rule.
FACE POOL FACT (differs from s33/brief): the LIVE pools on main are smaller — j25.js:98 overrides j17 ("owner review 11/13: only serene faces"): young maid faces **15** (not 30), eunuch faces **15** (not 20), ma ma 6, middle-aged women 5. roomFor allows ≤ 14 staff maids (+ her own) and ≤ 11 non-maid staff (eunuch cnt + 3). NPC personal maids are counted but draw no face, so the maid cut = Σ(maids − 1) − 14.
Reading: her own table (B1/B2) already lands at ~29–31 with today's ~10 consorts — the "~30" she guessed; at a full 16-consort palace it would be ~40. C stays ~23–24 now (~32 at 16 consorts). Today's table A = ~38–40 and loses 2–4 servants to the face pool.
