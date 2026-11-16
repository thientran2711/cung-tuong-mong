# PROGRESS review/gift-pick — item pickers as a picture grid + the painted gift moment
Base: origin/main f53bdade + **merged origin/review/fxkit 261c7c5f (KIT §68 painted-fx) for the animation part** — the coordinator lands
fxkit first; this branch then merges cleanly on top. Owner 15/11 (session 8): "Khung tặng quà tôi muốn hiện hình món đồ luôn, xếp theo như
kiểu ô tư trang á. Xếp hàng ngang để chọn rồi có animation khi tặng." (ref dev/handover/refs/owner-gift-picker.jpg on the docs branch);
OWNER_DECISIONS 22:45Z #4/#5 (painted gift animations), 22:35Z perf budget.

## Done
1. KIT 28.13i ITEM PICK GRID (`dev/build/jgpick.js`, last module; KIT.md §28.13i; kit page sample "§28.13i"). Any dialog whose options carry
   `ik` (S.inv index) shows its items as the 28.13e tile grid with the pick tile (`.kshc.kshpick`): kitItem "slot" picture in the grade frame
   (the Tư trang picture), name in grade colour, what it is, grade word; horizontal rows that wrap. Tap = select (31.13 glow); under the grid
   the option's own kit card (odds · Tốn · Được · Mất · Kèm or the reason) + one confirm button (Tặng / Dâng / Cài vào rương) which clicks
   the real option (chooseM + every wrapper unchanged). Doable first, first doable preselected, locked tiles greyed. Phone landscape:
   grid | detail side by side. Built only from existing kit parts (28.13e grid/tile, 31.13 selected, kitItem, kit option card, .kbtn).
2. Family (LUẬT SỬA CẢ NHÓM) — scan `node dev/test/gift-pick-scan.js [ref]`:
   | picker | file | before (origin/main) | after |
   |---|---|---|---|
   | giftpick (Hậu cung act "Tặng quà", person fixed) | j8.js | text list, max 8 items, line = item's own use | picture grid, all items, line = the gift card's real evaluation (jgift giftEval: odds · tốn · thành · kèm; "không nhận" reasons) |
   | giftto (Dâng quà Hoàng thượng / Thái hậu) | jgift.js | text list + small float picture | picture grid |
   | plantpick (Cài đồ vào rương) | j8.js | text list, max 8 | picture grid |
   Not item pickers (item already fixed, they pick a person / a method): taintpick, evpick, itarget, pgpick, giftDialog (Tư trang → Tặng),
   tsbBul (demanded item). The shop / recipes already use 28.13e.
3. Gift moment — KIT §68 `kitFxGiftCarry` (dev/build/jfxkit.js, additive): item picture drops into an open lacquer box (cloth → silk
   bundle), box closes, a maid's hands carry it to the person, ribbon untied on arrival; accepted → `kitFxGift("open")` light + sparkles;
   refused (taint found by her) → set down and carried back. Played after the state is applied (chooseM wrapper; giveTo by her decides
   accept/refuse), fire-and-forget, tap = skip (`.kfxk-catch`), Gọn / reduced motion / bots = nothing. Also on the Tư trang gift card
   (item → person, from the item picture to the chosen person's portrait). Receiving (#5): "Nhận" on giftin / pgin → box opens with light.
   New art (Magnific gpt-2-6, folder ba4aecfe, looked at every image): hands with ribboned lacquer box O6fk3CMynm (alt YMLPpsoWeC),
   untied box Bh4zaXUoQR, silk bundle iGqlYRY3uK → bg removed (8aNYEswIrU, SytH90jUb8, gOIF40FSXO) → atlas `img/fx/gift-hands.webp`
   (3 × 288 px, bottom 20 % faded so sleeves come from off-frame, 37.7 KB). UPLOADED to the CDN (cdn_sync).
   Bytes per gift scene (first play): gift-hands 37.7 KB + gift 22 KB (fxkit) + glowburst/spark atlases (fxkit) — loaded when a gift picker
   opens (on demand), cached by sw.js afterwards. Co-op: nothing sent (local effect only).

## Tests
- `node dev/test/gift-pick.js <url> <out> [sizes] [shots]` — every picker: grid present, tiles = items, name rows aligned (spread), no
  overflow / clipped text, tap → selected + detail + confirm in view, confirm gives the item and starts the moment, tap skip, Gọn = no fx.
- `node dev/test/gift-pick-board.js <url> <out> [WxH] [fxdir]` — storyboard of the moment (one shot per phase; the shared test box is far
  too loaded for a live video: performance.now advanced 7–17 s per 600 ms wait, CDN fx files took ~25 s).
- `node dev/test/gift-pick-video.js` — video of the live moment (for a faster machine).
- Results (local build, loaded shared box, 15/11): `gift-pick.js` PASS at 755x1000@2, 1000x755, 1180x820, 1366x1024, 844x390@2,
  390x844@2 (portrait plays, no rotate prompt): all three pickers show the grid (13 / 12 / 12 tiles, 5 per row on tablets, 3 on 390 wide,
  name rows spread 0 px), selected + detail + confirm in view, confirm gives the item (bag 13 → 12) and starts kitFxGiftCarry
  (log giftcarry:give → gift:open → glowburst + spark), tap skip leaves 0 fx nodes, Gọn = 0 fx nodes, 0 page errors, 0 overflow,
  0 clipped text, 0 HTTP errors. Fixes found by the run: grid inside the option box (it takes the options' place in the 32.7 person
  dialog — plantpick), full width across the kit 2-col option grid (inline grid-column), phone landscape grid | detail areas.
  Storyboard `gift-pick-board.js` 1180x820: item drops into the open box · closed box · hands carry it · arrival with ribbon slipping
  off · open box — all pictures read clean on the room (looked at each).
- Scan `gift-pick-scan.js`: before (origin/main) 3 item pickers as text lists → after 3/3 picture grid, exit 0.
- Known: on 390x844 the plantpick person dialog (32.7 layout, big figure) leaves the grid ~270 px tall; it scrolls inside the option box.

## Resume
`bash dev/site/build_site.sh`; serve the worktree (`python3 -m http.server <free port>`), run the tests above. When review/item-info
(KIT §70 item detail) lands: put its detail block above the option card in `kipDetail` (jgpick.js), coordinator note 15/11.

## Review r1 (session-8 reviewer, review/gift-pick-r1)
- Merged review/gift-pick 6158af34f onto origin/main d34b5116a. fxkit (§68) is already on main (fxkit-r1 f012058f3); the merge only adds
  `kitFxGiftCarry`, the `gift-hands` sprite row and `.kfxk-catch` to jfxkit.js (one definition each in the built index.html, no duplicate).
  assemble.py = main's list + `jgpick.js` last (after jph.js). Site rebuilt.
- Fix: tile "what it is" line used IT.d, which ends with the grade word ("Mặc: Sắc +2 · Thường") — the grade showed twice on the tile.
  Now the trailing grade word is dropped (grade stays on its own line).
- Test fix: gift-pick.js skip check counted `.kgpc` (old class, always 0); now counts `.kfxk,.kfxk-catch`.
- Results (local build, CDN images): gift-pick.js at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844@2: grid in all 3 pickers,
  spread 0, no overflow / cut text, confirm gives the item (inv −1) and logs giftcarry:give, Gọn 0 fx, 0 page errors, 0 HTTP errors.
  Probe: tap skip removes the catcher at once and every fx node within 1.5 s (dialog stays closed); natural end leaves 0 nodes;
  tainted gift with detection forced → giftcarry:refuse; "Nhận" on giftin → gift:open; plantpick confirm reachable (hit-test) at 1000x755
  and 844x390. 390x844 direct mode (tests only; the real host rotates the 1180x820 frame) clips the plantpick confirm under #mb.
- Re-merged origin/main 3ef079f6 + 2d038139e (item-info LIVE). KIT §70 wired: `kipDetail` puts `kitItemDetail({e},{cls:"kidet-strip kipdet",noLux:true})`
  above the option card. To keep the confirm in view: landscape (≥900 wide, >500 tall) = §70 strip | card + confirm side by side; the confirm
  is sticky at the bottom of the scrolling option box everywhere. KIT.md 28.13i updated.
- Final run (after restart, 2d038139e merge): gift-pick.js all 6 sizes: confirm in view at all sizes, inv −1 + giftcarry:give, tap skip removes
  the catcher at once (0 at 300 ms), Gọn 0 fx, 0 overflow / cut text, 0 page / HTTP errors. Skip check now waits 1.5 s for fades.
- Re-merged origin/main 6298d2f55 (jopic KIT §6.2 option pictures): the display copy of the option card drops its .kaart picture and
  kart/kopt classes (the title broke letter by letter beside the picture; the §70 strip already shows the item). Re-run 1180x820, 844x390,
  755x1000: all pass (confirm in view, give + giftcarry, skip, Gọn, 0 errors).
