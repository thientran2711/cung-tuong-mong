# PROGRESS review/game-feel (worker after reviewer R6 FAIL, 15/11)

Base: review/game-feel-r6 @ 5a04b3b21 (reviewer fixes: one box per giver, garment/veil pictures, stage tap rectangle off, test reward-box.js)
+ merged origin/main 207824297, then origin/main f500d0464 (tabs-kit r7, close-bugs). Assemble: ... jkitpage, **jkrev, jfx**, j84, jimg.

## R6 FAIL list → done
1. **kitLose** (owner 08:20Z) — KIT §54.2, `dev/build/jkrev.js`; wired ONCE in jfx `kmDiff` (`kfLoss`): every entry that leaves S.inv
   (not worn/veiled/pawned) + every drop of S.bac. sell → item flies away from the Tư trang tab, silver flies into Bạc; give → item flies
   away; lose (confiscated / robbed / stolen / bullied / searched) → kit notice card with the item(s) fading and falling + the story line;
   no story → item fades and falls, no card; use/wear → nothing; purchase → kitGain reveal + coins out. Reason = tag from the removing call
   (sellItem, wkSell, wdSell, wdPawn, giveTo, wkGive, plantItem, useItem, wdWear, vlWear, wkPoison, takeItem, taintItem, inspect, search)
   else the new log / queued card / result-card sentence naming the item. Entries ever seen never re-reveal (garment taken off = no kitGain).
2. **Slow reveal** (owner 17:02Z) — j93 `kitReward` rewritten: tap → shake → open → pause → each item rises into the spotlight one by one,
   holds 1.3 s, settles on a shelf; silver last; then the list. Timings `BAL.reveal` (jbal2). kitGain uses the same piece, not tappable away
   before 0.9 s. New box kind `pouch` (mo-pouch art, entries `from:"find"`). Ribbon grade = REAL grade (`kitItemInfo` = the bag) everywhere;
   j93's price-guess tiers (KM_TIER/kmTierOf by price: 46 of 107 ids wrong) removed. Picture sweep (item-pics.js): 151 ids, 0 missing on the
   CDN _index; veils (37 ids) had NO picture and grade Thường in the Tư trang bag → fixed in jinv (same group).
3. **Kit rule** — private .kfg/.kfgn/.kfgg/.kmit/.kmtier gone; reveal = kitItem (new size xl 150 px, jk2b) + new kit part `kitGradeChip`;
   documented KIT.md §54 (registry number for game-feel parts) + KIT_REQUESTS.md row + kit page samples §54.1/§54.2.

## Tests (dev/test, server: node dev/test/sw-serve.js 8961 <wt>)
item-lose.js (new) PASS · item-pics.js (new) PASS (151 ids, 0 missing, grade == bag) · reveal-shots.js (new) PASS at 755x1000, 1000x755,
1180x820, 1366x1024, 844x390 (reveal, list, kitGain, loss card inside the screen, 0 errors) · reward-box.js PASS · item-gain.js PASS ·
kit-page.js ok at every size (0 errors) · view-scale.js: taps right at every size, 390x844 rotated (s .4756, same layout when turned), 0 errors;
sameLandscapeLayout false only for fold-land = tab row 24 px lower while jload's bottom picture-download bar ("Thỉnh tranh nhân vật") was showing (timing, not this branch).

## Resume notes
- KIT §54 is "awaiting kit review". If the coordinator renumbers, update jkrev.js header + KIT.md §54 + KIT_REQUESTS row.
