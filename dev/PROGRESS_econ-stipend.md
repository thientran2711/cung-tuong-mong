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

## Results (15/11)
- stipend.js at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (@2): chest shows 3 hàng-kém items + Bạc, event dialog shown in view,
  5 options, no horizontal scroll, tip restores goods (3 → 0 hàng kém), NPCs skimmed 9–10 with news, EV6 gift gives luahang, no page errors.
  Note: the j93 chest at 844x390 clips its title row (j93 layout; game-feel reworks kitReward — not touched here).
- stipend-oldsave.js: an old save from the live build loads; 4 months pass with skimming on, goods arrive, p.stip / S.stipW made lazily, 0 errors.
- goods-scan.py: origin/main 19 text-only gifts → 0 (table in the report).

## Review r6 (review/econ-stipend-r6, 15/11)
Merged 961cae455a (incl. review/econ d0c0c7308) onto origin/main e7148caf; assemble.py = main's list + jecon.js, jstip.js after jwdinv.js.
Reviewer fixes: skim event gets evId "j3:embezzle" (picture "Án tham ô"; before it fell back to the room/visit picture captioned
"Có người đến chơi"); maid / report hints and log say "bạc" only when silver was actually cut (khất bổng month: goods only);
jecon month card and jgift KM_EMPACT follow-up flagged ev:1 (both were opt-scan "??"; main already failed --fail on KM_EMPACT).
Results: stipend.js 5 sizes 0 page errors, event in view, no h-scroll, tip restores 3 → 0 hàng kém, NPC skim 10–11 with news;
children's fees j53/j54 still charged (tut 2 + princess art: −12 −6 in the line); stipend-oldsave.js (save from the live site) 0 errors;
goods-scan --fail 18 → 0; opt-scan --fail OK; 16 item pictures on the CDN checked by eye.
Bot base-vs-branch: NOT measured — load average 40–50 on this machine, one sensible life did not finish in 25 min (time cap).
