# PROGRESS review/poison-gift (worker fe78f2c07) → reviewer r6 merge review/poison-gift-r6

## Content (owner 15/11 12:25Z, 13:15Z, 14:05Z)
- "Bỏ độc vào…" when giving food / drink / sachets (handmade mon, huong; bought yến sào, nhân sâm, a giao) and she holds a poison.
  Odds: Tâm cơ, the target's trust (thiện cảm toward her), item grade, minus the target's guard (vigilance, thái y, silver needle, loyal maid).
  A failure may be traced back to her (caught(): target gets 2 evidence, Hoàng hậu +1). No Hoàng thượng / Thái hậu targets (default, OWNER_DECISIONS).
- NPCs can do it (ACT pgift, same function) and send her a poisoned dish; every food gift reaching her shows the same card
  (Nhận ngay · Thử bằng kim bạc · Nhờ cung nữ nếm · Trả lại), so a poisoned dish gives no tell.
- Chân tình: real cause (handmade, made for this person's taste, bond Ân tình ≥ 30 / Thái hậu ≥ 40 / consort ≥ 40, not within 2 weeks of a favour);
  each recipient row of the gift dialog shows "Chân tình: đủ — …" or "chưa đủ — cần …" in Ghi chú. Ân tình gloss (KIT_GLOSS, HX.an).
- Ân tình: kit person-card chip with its bar on the Emperor card (+ Sủng chip); stage "Ân sủng" panel already shows the number.
- 5 poisons: Hạc đỉnh hồng, Độc ngấm dần, Phấn hủy nhan, Xạ hương (pregnant only), Mê dược; + Kim bạc thử độc (shop). 4 new item pictures on CDN.

## Review r6 (reviewer)
Merged onto main b8a58e873, then again onto 618fa6db9 (econ-stipend: assemble = main's list + jpoison after jgift; built files rebuilt).
Branch was based on main ~218a591fd; main now has gift-ui's own dev/build/jgift.js (add/add conflict).
- Branch code moved to `dev/build/jpoison.js` (loaded after jgift) and rebuilt on main's kit gift dialog: one row `kgg:"all"` (every tab;
  jgift giftFilter learns "all"), j83's old Hạc đỉnh hồng rows removed. No private CSS (the branch's `.gfmeter` panel is gone; chân tình is
  in the kit Ghi chú row). Poison card PEND.pgpick in KIT_ACT_PIDS: real odds word (= roll), Tốn/Được/Mất/Kèm numbers, option.why() → kit
  "Vì sao" popover (jwhy: option.base instead of always BAL.spyBase). Incoming dish card PEND.pgin follows the event rule (own hints).
- Header: the branch added an "Ân tình" cell after Sủng. header-danh owns the groups (owner ≈17:50Z: left Sắc·Tài·Tâm cơ·Đức·Danh·Sủng,
  right Bạc·Sức) and there is no Ân tình icon for the < 600 px icon-only row → NOT added to the header. Ân tình shows on the Emperor card
  (kit chip + bar) and the Ân sủng panel. Ask the owner if she wants a 7th header cell (needs an icon).
- jgift pcard: "Gặp ngài ban ngày" is inserted before "Việc hôm nay" wherever it is (was: only when it was the first group).
- Food kinds widened to main's new goods (LUẬT SỬA CẢ NHÓM): pgFood = handmade mon/huong + túi thơm + every IT of kind Thuốc bổ / Trà /
  Điểm tâm / Rượu (jstip tea, snacks, wine) — not cloth, jewels.
- Art: item-docngam / phanhuy / meduoc / kimbac (256 + item512) gpt-2-6, cut, on CDN; j98 ITEM_ART_G entries from jpoison; ITEM_ART.md rows.

## Tests
`node dev/test/poison-gift.js <url> <WxH@dpr> <outdir> <tag> [oldsave.json]` (gift dialog, poison card odds = roll, Vì sao, choose,
Emperor chip, NPC dish + kim bạc, NPC→NPC runAct, old save). Header: `node dev/test/header-danh.js index.html <out> <sizes> <oldsave>`.
Old save: `node dev/test/mk-oldsave.js <url of an old root index.html> oldsave.json` (made from 218a591fd).

## Results (r6, on 618fa6db9)
poison-gift.js 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@3, 390x844@3 (+ old save from 218a591fd): no overflow, no cut text,
dialog inside the screen, "Bỏ độc vào…" in every tab, odds word = roll odds on all rows, no Hoàng thượng / Thái hậu target, poison card is an
act (full numbers), incoming card is an event (hints), Emperor Ân tình chip + bar, choose → items −2 / Đức −10, kim bạc finds the poison
(+2 evidence), NPC→NPC 21–30/30 tries ran, old save loads, 0 page errors. header-danh.js 5 sizes + old save: groups 6|2 unchanged, spread 0.
kit-page.js 5 sizes ok, gift-ui-shots 3 sizes ok, stipend.js ok. NPC mindMenu offers pgift at danger band 3; her pgin card arrives.
(390x844: the game has no rotate prompt on main; portrait plays, measured too.)
