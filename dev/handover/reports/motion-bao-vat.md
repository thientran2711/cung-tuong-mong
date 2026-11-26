depth 1 · START_CTX ~5 % (now ~23 %)
# MOTION-BUILD «Vòng bảo vật» — session_01Rc5AsJVzZz12K6GSxnNZM8, coordinator MAIN 162 (session_01Rc5AsM4J5C58YM4bW3tekV), kit owner KK44

PRIORITY #1 CHECK ('vòng bảo vật|motion-design-4|kitRing'): OD 26/11 ~18:50Z/~18:55Z/~19:00Z (look gate; ring = rotating, front bright, zoom-left, buttons right; ONE new animation kit replaces every old frame, lands as one set) | main f573dc94: no ring part | review/motion-design-4 7939838d mẫu 2 mock maths (reused) · review/kit-ring5 kitPick (not a ring) · RING-BUILD jkring.js kitRing NOT pushed (asked twice) | KK44 NEW-KIT FAMILY SCAN §5: 15 places, 0 moved.

## Branch
review/motion-bao-vat from LIVE f573dc94 — commits fe7a105d, 20515b52 (+ this report).
- dev/build/jkring-item.js — kit part `kitRingItem` (+ `KRI_MATH` ring maths, `KIT_RINGI` sizes) and its WIRING block. Added last in assemble.py (outermost wrappers).
- dev/test/kit-ring-item.js — `check` (gift + shop measures), `bag` (Tư trang), `gift` / `shop` = real-tap recordings.

## The kit part (API in the file header)
kitRingItem.open({title, sub, bg, tabs, tab, onTab, items:[]|fn, info(it), acts(it)→[{n, main, off, q:{max}, label(q), fn(it,q)→result|"close"|null}], empty, onClose})
- Ring: kitItem tiles on an ellipse, KIT_RINGI.seats=12 seat spacing (more items → a scrolling ring, only the seats near the front show), front bright (opacity 1, grade chip, name + grade + use label under the ring), rest dim by depth.
- Spin: swipe with inertia + snap, ‹ › buttons, arrow keys, tap a side item = turns it to the front.
- Tap the bright item: it zooms big to the LEFT (transform), warm glow, the ring folds down; the kit pane (dlg kpanel) drops on the RIGHT: kit info + the caller's buttons (+ −/+ quantity when an act has q.max>1) + «‹ Vòng».
- Act: runs the game's real path; result IN PLACE as kit result rows (THÀNH/BẠI/KẾT QUẢ seal, Được / Mất / Ghi chú, empty row = «không», kept). Generic diff helper kriDiffRows (her stats per j1 NAMES, person→ta thiện cảm, items in/out of Tư trang) + new log lines. If the act opens its own dialog the ring closes so the dialog shows.
- Motion = transform + opacity only; reduced motion / Gọn = no tweening; bots (`__bot`) keep the old UI.

## Wired (old → new)
| # | place | old part | now |
|---|---|---|---|
| 1 | jgpick giftpick / giftto / plantpick | kip tile grid in #modal | ring (dialog stays the engine, hidden; act = its own option → chooseM; carry-fx suppressed, result rows in place) |
| 2 | Tư trang bag (kitInvGrid tutrang) | inv grid + inline strip | tap a tile → ring on the same list/tab, focused on that item |
| 3 | jkinl strip (kinlPick) | inline strip | ring pane (info from kinlCapture spec, acts = its .kinvacts buttons replayed) |
| 5 | kitShop buy (nvp, pet shop, jact/jil/jtq14 wrappers) | kitShopTile grid | ring, Mua tab, quantity, kitShopBuy |
| 6 | kitShop sell | sell list | ring, Bán tab |
| 8 | works (kinvOpen → econWkOpen) | via bag | covered by #2/#3 |
| 9 | wardrobe acts (wdOpen/wdFabOpen) | via bag | covered by #2/#3 |
| 12 | Trưng bày (jshelf kinvOpen wrapper) | via bag | covered by #2/#3 (shelfOpen dialog itself has no caller) |
| 7 | j8 invHTML .cards | dead (cut by jinv.js:379) | nothing to move |
| 4 | toilette dress (#kg82 «Rương trang phục», kitInvGrid toil + kitEquipSlots toil) | chest grid + inline detail | tap a chest piece / worn slot → ring (tabs Tất cả/Trâm cài/Y phục/Trang sức) focused on it; act Cài/Mặc/Đeo or Tháo = toilAct (E95: worn at once, saved); #kg82 steps aside (kri-hide) and is redrawn on close; no false «Rương đồ» box after wear/take-off (KMSNAP refreshed) |
| 11 | titles (Danh hiệu panel, «Đeo «…»» / «Đổi phần thưởng «…»») | dhPick kitPanel option list | ring of earned titles, tile = kit title plate (kitTitlePlate via new `it.tile` html support, size only); acts = the title's own dhPick bonus options (their go), «Tháo danh hiệu» on the worn one; closing returns to the Danh hiệu panel |
| 13 | hoa điền (jhd hdStep, toilette makeup) | [data-hdk] button row | ring of owned hoa điền; «Dán» = the step's own button (→ drag board, ring closes), «Không dán» = its own; ✕ leaves the step buttons |
| 14 | face (new-game card, j86 fpHTML → kitPicker face) | portrait grid with pages | tap a face → item ring (MAIN ruling: a look, not a person), grade chip hidden; act «Chọn» = fpPick; close → card redrawn (fpRedraw) |
Also wired since: 10 veil chest (tap a veil → ring, acts = the veil strip's own buttons), 15 pets (tap a pet card → ring, acts = Chăm / Cho theo hầu / Gửi về).
TODO: none of the 15 places left (law-11 scan dev/test/kit-ring-oldleft.js, table below). Corrections to the KK44 table: j83 wkUseOpts (j83.js:220) is NPC-only (no UI); jhd hdPick is not a UI; jgift item→person dialog (giftpick with ix) is a PERSON pick → person ring (RING-BUILD), not this family.

## Videos (owner look gate) — CDN img/_review/motion-bao-vat/
4-baovat-gift-755x1000.mp4, 4-baovat-shop-755x1000.mp4, 4-baovat-gift-1180x820.mp4, 4-baovat-shop-1180x820.mp4 (sent to MAIN 162).

## Tests
kit-ring-item.js check Fold + iPad: ring open, 24 tiles, front opacity 1 / others ≤ .68, tiles in view, pane in view, act → result rows (gift 3 rows, shop 2), no overflow, 0 page errors. bag Fold: Tư trang tile → ring focused, act list from the item («Tháo trâm»).
KIT.md §104 + kit page sample «§104» (button opens a demo ring) — DONE.
PERF (kit-ring-item.js perf, CPU×4, headless software raster): LIVE idle stage 8 fps (env floor) · ring idle 11.6 fps · ring spin+focus 10.7 fps → the ring costs nothing above the page's own floor (transform/opacity only, one rAF loop, no filter animation); absolute 60 fps needs a real device (same limit as motion-design-3).
PENDING: merge with RING-BUILD core (KK44 decides).

## Law-11 family scan + overlap scan (MOTION-BUILD-2, 26/11)
`node dev/test/kit-ring-oldleft.js file://$PWD/index.html <out> <WxH> [before]` — 14 rows (15 places; 8/9/12 share the bag path): BEFORE (ring off) old left = 14/14 on Fold and iPad; AFTER old left = 0 on Fold 755x1000 and iPad 1180x820, 0 page errors.
Overlap scan (owner 20:30Z via MAIN 162; in kit-ring-item.js, every scene: ring / focus / result states; ring tiles + big item vs every reachable tap target — buttons, [role=button], arrows, tabs, ✕, pane, acts, name plaque, HUD, nav; targets the scene itself covers are skipped by hit test): Fold + iPad, scenes check(gift, shop, sell) · bag · toil · title · hd · face → intersections 0 everywhere, big item inside the stage everywhere. (An early 1-hit «tile × ‹» on the sell tab was the tab-switch bloom still moving; measured after it settles = 0.)
Test modes: kit-ring-item.js check|bag|perf|gift|shop|toil|title|hd|face (toil/title/hd/face also print JSON incl. ov counts; env KRI_OFF=1 = old UI).
Note: after a gift ring closes, the game's own result toast (#rtoast, KIT 32.10 tap catcher) may stay: the next tap only closes it (existing kit rule, not changed).

## Open points for MAIN / KK44
- Law 9: RING-BUILD kitRing (person/group) and kitRingItem must become ONE core. KRI_MATH is isolated for that; I will adapt to whichever API KK44 picks.
- kitFlyItem (LIVE, owner ok) still plays its box after a shop buy over the ring (as before).

## HANDOVER (rollover at ~28 % ctx; successor = next MOTION-BUILD, opened by MAIN)
State: review/motion-bao-vat (latest commit in git log). Worktree recipe: sparse worktree from origin/review/motion-bao-vat, `bash dev/site/build_site.sh`, test `node dev/test/kit-ring-item.js file://$PWD/index.html <out> check|bag|perf|gift|shop WxH`.
Remaining (adapter contracts from the place map):
1. (4) toilette dress — jtoil.js:350 toilDressUI → kitInvGrid({key:"toil", onPick:toilPick}) inside the #kg82 overlay (not inline). Hook: wrap toilPick or the toil tile tap → kriFromGrid-like ring over #kg82 (kitScene z 57 > modal; check #kg82 z), acts «Mặc» = toilPick(x) / «Tháo» = toilAct("off") (jtoil.js:379-385), then toilDressUI() redraw; #toilok stays.
2. (11) titles — jdh.js:195 dhPanel / :180 dhPick → kitPanel opts + chooseM; pictures via kitTitlePlate (not kitItem): needs a title-plate tile renderer in the ring (items with `html` instead of src → add `it.tile` html support in kriBuild/kriFocus) — ask KK44 (law 9) if a plate tile is ok; act = the option's chooseM (same pattern as the gift adapter).
3. (13) hoa điền — the real picker is jhd.js:178 hdStep(ctx) (called from jtoil.js:464) with [data-hdk] buttons → hdBoard drag game; «Không dán» → ctx.done(). Ring item = hdOwned(S) entries (WD_ITEMS[k] {n,g,icon}); act «Dán» = the [data-hdk] onclick.
4. (14) face (dung mạo) — j86.js:27 fpHTML → j79.js:1421 kitPicker (one caller, new-game card, portraits not items). Owner ruling needed whether a portrait picker joins the item ring or the PERSON ring (RING-BUILD) — ask MAIN.
5. Merge with RING-BUILD kitRing into ONE core (KRI_MATH isolated) — KK44 decides the API.
6. After owner video ok: re-run check/bag/perf on both devices, KK44 family scan old-left = 0.
