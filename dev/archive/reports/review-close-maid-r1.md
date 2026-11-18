PASS ebc85f78446186a4a990024b17c73091c700f218
# review/close-maid-r1 — independent review of review/close-maid @0aa7fdd9 (D58 close maid by origin, table v2), Foreman D
Reviewer (opus) session_01DgYSWpkGbZi35U4djYBBCe. START_CTX ~4 % of the window. Branch review/close-maid-r1 @ebc85f78 (current origin/main 9ddb3f6c is an ancestor).

## Merges
- origin/main 9ddb3f6c merged (conflicts only in generated index.html/sw.js + assemble.py list: main's list + jmline.js, jcmaid.js).
- review/servant-mline-r3 b82d3bf3 (READY, the successor of the r2 base close-maid was built on) merged: kept r3's BAL.mline fightLose/poisonW
  AND the cmGuard hook in mlFeud; BAL.cmaid block kept after BAL.mline. So fast-forwarding main to this sha also ships servant-mline-r3.

## Check against the owner's table (FOREMAN_D.md D58, verbatim) — all present
| origin | source | gain | loss | verdict |
|---|---|---|---|---|
| tt | home maid, loyalty 65–85 | trusted from day 1 | father presses through her (Thư nhà dilemma) | ok |
| dtq | home maid, martial | guards: 50 % of NPC harms on her household stopped (mlHit + mlFeud) | brawls dilemma | ok |
| ch | Thái hậu's plant | Thái hậu thiện cảm + | Thái hậu learns of every wrong (deedAdd hook) | ok |
| muoi | home maid | 40 % of bribe money back | scorned dilemma | ok |
| nc (bd mapped) | home-country maid | gift/letters from home, cannot be bought | questioned dilemma | ok |
| thd | she PICKS 1 of 3 | cannot be bought, decay halved, her maids merit +1/month | first months alone (low loyalty, talent after 3 months) | ok |
| td | palace-assigned + old family servant (once) | loyal to death, chứng cứ vụ án + | exposure: Danh, Thái hậu | ok |
| cn | old roommate | true facts (proof) | turned → Danh −8 | ok |
| cnv | picks at her rise | gossip net: true facts | "không ai chống lưng" scorned dilemma | ok |
General rule (comes with her = family ties / none → she chooses, trust lasts longer) and random loyalty + one talent + one secret per game: ok.
ONE CORE: all numbers in BAL.cmaid (3 leftovers fixed, below). Display: existing kit only (Nhập cung kitRows row, stage info line, kit dilemma card);
no private CSS (only the existing log class "r"). Choices follow OD:L469 (no Được/Mất on event choices; price + kit hint words), no % in player text.

## The worker's flag (maid bought ~yearly by j8 maidMonthP) — consistent, no rule change
- thd / cnv (pick), nc/bd (land), old servant: the jcmaid wrapper returns BEFORE j8's buy roll → never bought; pick decay is halved. Sim: thd kept 2/2 and 3/3, bought 0.
- Home/room/palace/Thái hậu maids decay normally and can be bought when loyalty < 45: that IS the owner's general rule ("comes with her = family ties";
  only "none → trust lasts longer"). With care (talk when < 55) tt kept 2/2 (r1 sim), bought 1 in 3 lives (earlier run). Left as is.

## Fixes made by the reviewer (ebc85f78)
1. BUG (blocking, found by coop-e2e): jcmaid stored its state in S.cm, which jcmood (Thái hậu / Hoàng hậu court mood) already owns.
   start() set S.cm={v:1} → cmSet crashed every month ("reading 'lv'"), and old saves would have had their court mood wiped. Renamed to S.cmaid
   (jcmaid, unit test). New unit check moodKey (court mood month runs after a new life, both keys live).
2. ONE CORE: cmReplace hard-coded loyalty 40, j8's replacement maid hard-coded 40 too, spy "Trả nàng ta về" Danh −1, old servant 100 →
   BAL.cmaid.newLoy / spyDanh / loy.old; j8 now prints "(thiện cảm N)" from the value (was "(lòng 40)", VANPHONG row 53).
3. Balance (whole family): "kín miệng" only stops buyers, so it was a dead talent for maids who cannot be bought (one of the 3 thd pick
   candidates was a dud). cmTals(src) excludes it for land / pick / old (cmInit, cmCands, cmAskPick, cmTdTake).
4. Co-op: the host ran j8 maidMonthP on the friend's copy (coop entry) and wrote NPC talent/secret into it; the wrapper now skips p.coop
   (her maid's month runs on her own device, as the worker's PROGRESS says).
5. Unit test cn check was random (a "kín miệng" roommate refused the forced buyer → the 1 failing run the worker saw); talent fixed in the check.

## Tests (one at a time, local server, after the fixes)
- cmaid-unit 755x1000@2: 15/15 ok, 0 errors, no overflow (2 runs). 1180x820@2: 15/15 ok, 0 errors.
- mline-guest 36 months: ok, guest changes no NPC-only state, 0 page errors.
- mline-oldsave (old = live site, new = this build, 24 months): ok, 0 errors.
- coop-e2e (live Worker): before fix 57/59 (page errors cmSet), after fix 59/59.
- sim_cmaid 2 lives × 60 months (care on): tt bạc +22/yr, keep 2/2; thd bạc −1.5/yr, Sức +, keep 2/2, bought 0; nc bạc +29/yr, Danh −0.8/yr,
  Thái hậu −0.3/yr; ch Thái hậu +2.4/yr, Danh −0.6/yr; 0 page errors. No source dominates.
- Screenshots looked at: pick card 755x1000@2 and 1180x820@2 (kit dilemma card, 3 candidates with distinct talents, body scrolls), stage card
  1180x820@2. Pictures were off in the test (blank frames are the test setting, not a bug).

## Not changed (outside this item, for the coordinator)
- "lòng N" is still shown in j10 servant tab, j70, j22 (pre-existing, VANPHONG row 53 says "thiện cảm"): a wording sweep item.
- j8 maidMonthP's own numbers (buy threshold 45, 15 %, bạc 30, Danh −10) are pre-existing hard-codes (ONE CORE audit item).
