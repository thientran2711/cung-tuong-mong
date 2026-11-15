# Review r7 of review/game-feel 5ffbf8b267 (reviewer, 15/11) — branch review/game-feel-r7

Merged onto origin/main aa9689da5, then again onto b8a58e873 (main moved during the review). Conflicts: assemble.py (main's list +
jkrev, jfx after jkitpage, before jtoil/j84), KIT.md (git duplicated §42–§47 on the branch side; kept main's newer §42/§47 text, §54 placed
between §53 and §55), KIT_REQUESTS.md (both rows), built index.html/sw.js/assets.json rebuilt with dev/site/build_site.sh.

## r6 FAIL items — all fixed
1. kitLose (KIT §54.2, jkrev.js, wired once in jfx kmDiff/kfLoss): item-lose.js PASS — buy = reveal + coins out 20; sell = item away +
   coins in 30; give = flies away; search / confiscated / robbed / bullied = kit notice card (kitPanel notice) with the falling kitItem and
   the story line; gone without a story = fade only; use / wear = nothing; spending silver = coins out; garment taken off = no reveal.
   Re-wear / pawn redeem: same entry object stays in kfSeen (worn + S.wdPawn entries count as present) → no replay.
2. Slow reveal (j93 kitReward rewrite, BAL.reveal): items shown one by one, 3-item box done at ~10.9 s, early tap does not close kitGain
   before 0.9 s. Real grades via kitItemInfo: item-pics.js 151 ids, 0 missing pictures, 0 grade ≠ bag (old price-tier was wrong for 46/107).
   reward-box.js PASS: Hoàng thượng → chest «Rương bảo vật» / tray after night / «Ngự tứ» royal; Thái hậu → tray; consort → Hộp gấm "<name>
   tặng"; Nội vụ phủ → chest; 3+ own items → one chest; 1–2 own → kitGain. Every item has a picture (no letters), veils included.
3. Kit-only: no private .kfg/.kmit/.kmtier left; reveal = kitItem size xl + kitGradeChip + kitRevealHTML, samples §54.1/§54.2 on #kit;
   kit-page.js ok at 5 sizes (13 samples, 0 errors, no overflow).

## Other checks
- view-scale.js (?khost=1): fold-land s .8475, ipad 1, ipad-pro 1.1576, phone-land .4756, fold-port 755x1000 s 1, 390x844 rotated
  (s .4756, turning drops rotation, same layout); taps right everywhere, 0 errors; sameLandscapeLayout TRUE (the r6 24 px fold-land
  difference is the loading-bar timing). Second run after the b8a58e873 merge: false again with the SAME cause: tab row 746 vs 770
  = the jload "Thỉnh tranh nhân vật" bar (24 px) showing on ipad/phone-land but already gone on fold-land/ipad-pro; every top-bar cell identical.
  Not this branch (test flake: view-scale should remove #kload/bar before the signature).
- header-danh: #hud-<key> ids unchanged; kfNumbers flying numbers hit hud-sung / hud-danh / hud-bac / hud-sac (probe at 1180/755/844).
- Old save (live build, slot 2, 4 chest items) loads with 0 errors, no spurious reveal / box / loss card.
- reveal-shots.js PASS at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (shots looked at: box, list, kitGain, loss card fit).

## Reviewer fix
- dev/test/item-gain.js: work-picture check accepted only item-tp-<kind>-b<N>; main's j83-variety (b8a58e873) now gives per-recipe
  pictures item-tp-<kind>-r<NN>-b<N> (on the CDN, 200). Regex widened; item-gain PASS.

## Result: PASS (all of item-lose, item-pics, reward-box, item-gain, reveal-shots ×5 sizes, kit-page ×5, view-scale ×6, old save) after the
second merge onto origin/main b8a58e873.

## Third merge: origin/main 618fa6db9 (econ-stipend jstip/jecon, kit-table)
assemble = main list + jkrev, jfx after jkitpage; site rebuilt. jstip's goodsGive / monthly stipend use kitReward and push their entries
into KMSNAP, so jfx kmDiff does not reveal them twice: probe → Thái hậu goods = one tray, story goods = one Hộp gấm, stipend = one chest
"Bổng lộc tháng ba · Nội vụ phủ phát", all with pictures + real grades, 0 errors. Re-run on this merge: item-lose, reward-box, item-gain PASS.
