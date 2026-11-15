# PROGRESS review/econ-stipend (owner 15/11 17:30Z + 17:33Z)
Base: origin/main 31907911d + merge of review/econ d0c0c7308 (unreviewed; contains the approved monthly stipend card, NPC scheme knobs).
Code: dev/build/jstip.js (after jecon in assemble.py), hooks in jecon econStipend; data edits j67 (gi fields), j68e/j68g (text), j71 (prizes
via jstip table), j72 (favours give yensao), j97 (text matches its reward), j42 (bánh trái). Docs: dev/ECONOMY.md §6–§7, dev/art/ITEM_ART.md §3.

## Done
- (a) Stipend goods = real items (16 new item paintings, gpt-2-6, on CDN): table BAL.stip.goods / coal; uses (may áo, pha trà mời khách in
  EV6 visits, đốt sưởi seasonal, tặng, bán back to Nội vụ phủ at BAL.stip.resell %).
- (b) Payout opens the kitReward chest "Bổng lộc tháng …" (j93 API, KMSNAP marked so kmDiff does not re-show; game-feel keeps the same API).
- (c) goodsGive(p, keys, {from}) + scan dev/test/goods-scan.py (TEXT / REAL / TABLE / NOTGIFT): main 19 text-only → 0.
- (d) Wording "trả công N kẻ hầu: −W bạc" (line + card).
- Skimming: stipSkim / stipEvent / stipNpc (see ECONOMY §7). Not stacked on j20 payCuts.
- Fix: jecon reassigned `stipend`, dropping j53/j54 children's fee wrappers; now j20 stipend() → econStipend().

## Tests
- node dev/test/stipend.js <url> <outdir> [sizes]   (chest, event dialog, restore after tip, NPC skim + news, EV6 gift, resale price)
- node dev/test/stipend-oldsave.js <url> <oldsave.json>   (old save from mk-oldsave.js on the live build)
- python3 dev/test/goods-scan.py --fail
