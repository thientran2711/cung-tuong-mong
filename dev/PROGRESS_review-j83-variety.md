# PROGRESS: review/j83-variety

## REVIEW r6 (15/11): merged onto origin/main 5e491704d as review/j83-variety-r6 — see dev/review/j83-variety.md
- Close / "Thôi": main's KIT 32.10 is the one implementation (a plain no-effect "Thôi" option is never drawn; kit ✕ + tap outside + Esc run it).
  The branch's `xc:1` / `KWK_XPID` ✕ wrapper was removed in the merge and the plain Thôi options restored (j83, jveil, jwkr material dialog).
- Teacher text now lives in jtabs.js ktArtSkills (main moved the Tài nghệ tab there).
- jwkr private style removed (kit `.kshl/.kshm` head); kit page sample "§28.13e" for the pick tile.

## STATE (latest session, 15/11 ~12Z) — read this first
- Option A is DONE in code and art for all 11 kinds (10 recipes × 4 tiers = 440 pictures + 18 new cooking ingredient icons):
  - `dev/build/jwkr.js` (appended after jwkg.js): `WKR` recipes per kind (`id r01..r10`, name, level to unlock `WKR_LV`, cooking steps, `like` = the j1 LIKES entry).
  - Flow: "Học/Tự luyện <art>: làm gì?" = kit tile grid (KIT 28.13e pick mode `.kshc.kshpick`, panel `kit:{pick:1}`, tabs per kind, ✕ kit-x) →
    "<recipe>: dùng vật liệu gì?" (3 j83 material cards) → the kind's game (jwkg) with the recipe name as title; cooking plays the recipe's ingredients + heat
    (`k91Cook` wrapper forces `K91_RC`), cắm hoa a one-flower recipe arranges that flower (`WKR_FL`) → the work = recipe name, `wk.r`, picture by tier.
  - `itemArt` wrapper: `img/item-tp-<kind>-<rid>-b<ti+1>.webp` (+ item512) when `WKR_ART[kind]`; old saves (no `wk.r`) keep the old tier picture.
  - NPC works and the deck card also get a recipe (deck: the emperor's liked dish / flower when known).
- Art: sheets are 2×2 (one recipe, 4 tiers) gpt-2-6 2k, ids in `dev/art/j83_recipe_sheets.txt`; Magnific cut-outs in `dev/art/j83_recipe_cuts.txt`
  (kind rid production-id hmac → URL `https://pikaso.cdnpk.net/private/production/<id>/render.png?token=exp=1794960000~hmac=<hmac>`).
  Split: components of the whole cut-out sheet go to the quadrant of their centre (no neighbour fragments), bbox square +4 % pad, 512 + 256 webp q90.
  Cooking (mon) art came from the earlier session ids (below); icons `img/kit/mg-banh-<key>.webp` 360×253.
- Paid tiers (owner 14:50Z group rule): `dev/review/paid-tiers.md` (before/after), `node dev/test/paid-tiers.js <url>` (0 FAIL), `python3 dev/test/paid-scan.py`.
- "Thôi": removed from every j83 dialog (gift, đồ cấm, recipe pick, material) and the 4 veil dialogs (✕ kit-x via `KWK_XPID` / `xc:1` in jwkg.js).
  The game-wide removal is review/kit-close (not merged yet) — not duplicated here.
- CDN: all 440 recipe pictures (img/item-tp-<kind>-r01..r10-b1..4.webp + item512/) and 18 icons (img/kit/mg-banh-*.webp) are UPLOADED (cdn_sync, 15449 objects);
  local copies deleted. Site rebuilt (index.html, sw.js, assets.json) on the CDN base.
- Test results (this session): wk-kind-game all 11 kinds OK at 755x1000 and 1180x820 (game = the kind's game, recipe played, product = recipe name +
  r-picture by tier, ✕ closes without spending, no Thôi, 0 page errors); mon/ao/khuc/tho OK at 1000x755, 1366x1024, 844x390; pick grid no
  horizontal overflow / no clipped names at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390; paid-tiers.js 0 FAIL; deck card sets the recipe.
- Open / for the reviewer: art cleanliness — 152 of 400 new 512 px cut-outs were defringed with itemcut clean; ~20 still score "dirty" on the
  audit's halo metric but look clean on dark / mid / light grounds (checked sheets). The Fold zoom spots, por re-crop and 5,177-figure re-export
  from the old list are separate tasks (ask the coordinator).
- Tests: `ONLY=<kinds> node dev/test/wk-kind-game.js <url> <WxH@dpr> <outdir>` (pick grid → material → game kind + recipe → product name/picture).


Base this branch on the latest `origin/main`. It was rebased onto main 6e6c2ae6d.

It is not merged and has no PR. The site files (index.html, sw.js, assets.json) are NOT rebuilt on this branch. Rebuild them with `bash dev/site/build_site.sh` after finishing, and never commit a `CTM_IMG_BASE=` test build.

## Done
The first commit is the proposal (dev/art/J83_VARIETY.md) and the sample sheet (dev/shots/j83-variety/sample-mon.jpg). The coordinator approved option A:
- 10 recipes per craft × 4 grades.
- Recipe-specific mini-game ingredients.
- Batch by craft, cooking first.

The WIP commit (this file) holds two owner bug fixes, which are coded but only partly tested:

1. **Each kind opens its own mini game.** New module `dev/build/jwkg.js`, appended last in assemble.py.
   - Kind → game map `WKGAME`:
     | kind | game |
     |---|---|
     | tranh | vẽ |
     | theu | thêu |
     | bhoa | cắm hoa |
     | tho | thơ |
     | kinh | chép kinh (new) |
     | khuc | đàn |
     | the | cờ |
     | mua | múa |
     | ao | may áo (new) |
     | mon | nấu |
     | huong | điều hương |
   - The two new games, kinh and may, run on the j91 trace engine with their own figures: abstract sutra strokes, and robe seams.
   - How it works: `playArt` and `openMG` are wrapped, and `kg82Kind` is forced to the game of the chosen kind (`S.mg.wk.kind`).
   - Also in jwkg.js: Q items with `xc:1` get a ✕ close button in the corner, styled with id `#mxc`.

2. **Materials are worth their silver** (in j83.js and jbal.js). `BAL.wk` holds the knobs:
   - `matQ [0,2,4]`: score bonus (was 0/1/2).
   - `cap [2,2,3]`: only a quý material reaches Tuyệt phẩm.
   - `val [0,1,2]`: gift value.
   - `sell [0,.5,.5]`: share of the material's silver paid back when sold.
   - `tinh [0,0,1]`: extra chân tình for a quý gift.

   Changes in j83.js:
   - `wkTierP(p,q,mat)` applies the cap.
   - `wkNeedRaw` gives the score needed for each tier.
   - `wkOddsTxt` now reads like "chơi 5 phần: Khá · Tinh xảo: cần chơi 7 phần · Tuyệt phẩm: chỉ vật liệu quý · quà giá trị +1 · bán thêm 3 bạc".
   - `wkEval` wraps `wkEval0` to add the material value. `wkSellVal` adds the silver paid back.
   - The "Thôi" option is removed from the "làm ra tác phẩm gì?" dialog, which uses `xc:1` instead.

   Verified at 755x1000@2 with `dev/test/wk-kind-game.js`:
   - tranh→ve, theu→theu, bhoa→hoa, tho→tho, kinh→kinh, khuc→dan all OK.
   - Material cards show different tiers and needed scores. ✕ is present and there is no Thôi.
   - 0 page errors.

## Left (exact, including every owner request)
1. **Finish the mini-game check for the remaining kinds.**
   - Not yet confirmed in a run: the→co, mua→mua, ao→may, mon→banh, huong→huong. The page crashed or reset to the "Luân hồi" screen in the long run (slow machine). Run them with `ONLY=`.
   - Check the ✕ close test, which still returned `had:false` (probably the same reset).
   - Check the bot path, the deck card (wkDeckCard → resumeMG) and practice (wkPractice) also open the kind's game.
2. **Owner rule: fix the WHOLE GROUP of paid tiers.**
   - Write a script that enumerates every "pay more for a better version" choice and computes value per silver for each tier. Cover:
     - the j83 material tiers for every art and kind: Cầm, Kỳ, Thi, Họa, Vũ, nấu, thêu, may, túi thơm, cắm hoa, chép kinh…
     - "Học với thầy" vs "Tự học" vs "Học cùng Thái hậu" (j23/j79/j85: cost 5+l*5 bạc)
     - ma ma lessons (j85 `lessonVir`, `virCost`)
     - the veil materials (jveil `VL.mat`, `vlGradeOdds`, which still prints the old "chơi được 5 phần" text)
     - gift wrapping, if any (look in j67/j97)
     - shop item quality tiers (`IT` pr/gv)
     - Danh sư (S.master)
   - Fix every tier that is not worth its silver.
   - Every card must show the concrete difference: the tier at 5 phần, the score needed for each tier, and the ceiling.
   - Write `dev/review/paid-tiers.md` with the before/after table. Use the BAL numbers and a quick value check, e.g. a `dev/test/wk-mat-value.js` (the jbal.js comment refers to it; it is not written yet).
3. **j83 option A, cooking batch (mon).**
   - All 40 recipe pictures (10 recipes × 4 grades) are generated and checked visually. They look good: no characters, clear grade progression.
   - Background-removed versions also exist.
   - The 3 ingredient icon sheets (3×2 each) are generated and background-removed.
   - Nothing has been saved to img/ yet. Download the cut-outs, then for each:
     - run `dev/figwork/itemcut.py` clean, crop to the bbox with 4% pad
     - save `img/item512/item-tp-mon-<rid>-b<1..4>.webp` (512) and `img/item-tp-mon-<rid>-b<1..4>.webp` (256), webp q90
     - for each icon: crop the sheet cells and save `img/kit/mg-banh-<key>.webp` at 360x253 RGBA
   - Magnific creation ids are below. Results are in folder ba4aecfe-efce-47e2-b53f-30d292091886. Use creations_wait on an id to get a fresh URL.
   - Then wire the code:
     - recipe data per kind (`WKR`: id, name, art level to unlock, steps `[[ingredient, heat]]`)
     - a recipe pick screen (kit cards with the b1 picture, locked by art level) before the session
     - force `K91_RC` to the chosen recipe in `k91Cook`
     - add the new names to `K91_ING` and the `KG82_SPR.banh` preload
     - a `wkMake` wrapper that sets `wk.r` and the recipe name
     - an `itemArt` wrapper that picks the recipe picture by `wk.ti+1`, with the old picture as fallback
   - Test, make a sheet, and send the cdn list.
   - Publish the image files on a separate art ref (e.g. review/j83-variety-art) and give a `cdn_sync.py --git` command, as was done for review/img-quality-art.
4. **Then the other crafts, batch by batch:** theu, tranh, bhoa, huong, tho, kinh, khuc, the, mua, ao.
   - Rules: gpt-2-6, folderReference, cut-out on the item tile, no Chinese characters, serene dancers.
5. **Separate later tasks; ask the coordinator first:**
   - the 9 Fold zoom spots
   - the por re-crop
   - the 5,177-figure re-export (needs approval for disk and credits)

### Cooking recipes
Each step is an ingredient with a heat level from 0 to 2.

| id | recipe | steps |
|---|---|---|
| r01 | Cháo trắng hành phi | Nước giếng 2, Gạo tám 1, Hành tím 0, Hành ngò 0 |
| r02 | Canh rau dền | Nước giếng 2, Tôm khô 1, Rau dền 1, Gừng 0 |
| r03 | Bánh bột hấp | Nước giếng 2, Bột gạo 1, Đường phèn 1, Lá chuối 0 |
| r04 | Gà hấp lá chanh | Nước giếng 2, Gà ta 2, Gừng 1, Lá chanh 0 |
| r05 | Canh sườn hạt sen | Sườn non 2, Hạt sen 1, Táo đỏ 1, Gừng 0 |
| r06 | Bánh hoa quế | Nước giếng 2, Bột sắn 1, Đường phèn 1, Hoa quế 0 |
| r07 | Gà tần sâm táo | Gà ta 2, Nhân sâm 1, Táo đỏ 1, Lá sen 0, Kỷ tử 0 |
| r08 | Chè dưỡng nhan | Nước giếng 2, Hạt sen 1, Nấm tuyết 1, Long nhãn 0, Đường phèn 0 |
| r09 | Cá quế sốt chua ngọt | Cá quế 2, Cà chua 1, Đường phèn 1, Hạt thông 0 |
| r10 | Yến sào hầm sâm | Nước dùng 2, Yến sào 1, Nhân sâm 1, Kỷ tử 0, Đường phèn 0 |

### Magnific ids: recipe pictures
Cut-out ids are what to download; the originals are listed for reference.

| recipe | original b1 | b2 | b3 | b4 | cut-out b1 | b2 | b3 | b4 |
|---|---|---|---|---|---|---|---|---|
| r01 | 3zbKLLpREY | jUXojDoLD0 | lJ8tlBigv9 | SythStiUb8 | gOIhJlASXO | gOIhJgGSXO | MBwOXMGDCm | w4hf4JL7EI |
| r02 | VXU79NsMMU | JNaCJffOq4 | 3zbK3KyREY | P3EF9BD42C | P3EF3NU42C | huRAuCZvqL | cplUpDL0eP | gOIhOOcSXO |
| r03 | 3zbKLgXREY | 0egwV5zTfW | lJ8tlfYgv9 | P3EF9Id42C | jUX8UUxLD0 | If6RfCptvE | LwBIwJHswO | YMLgMegWeC |
| r04 | lJ8tlu0gv9 | jUXovulLD0 | 4RuF4jN9Aa | iGq5iSP3uK | nVjlVeOYQD | Do7yov2pcl | xSdoS6VjfW | LwBIwR6swO |
| r05 | ov96o0c829 | EbzYMBiuuO | 9ZQH9UDNYZ | yiCuygAPW9 | 5jVpj41Kxe | O6fu6T7ynm | 0egweu9TfW | u5nc5OvQLD |
| r06 | ksDekFB16B | 1lpdtEYr4r | CqGnChkEEy | 79vf7UOJAL | Bh46hxzoQR | xSdoSGBjfW | vQZGQ74a47 | gOIhOTcSXO |
| r07 | SythQgKUb8 | 3zbKlZQREY | EbzYM8RuuO | cplS4VR0eP | P3EF3oT42C | If6RfwbtvE | EbzWbNpuuO | Do7yoLopcl |
| r08 | u5nWuEWQLD | rgeXrrFxtc | O6fuP4Kynm | huRAaCzvqL | 1lpXl0Ir4r | dty9t7bXSL | cplUpLV0eP | N2Fb2uJ6D9 |
| r09 | JNaEyN9Oq4 | UPma74Vwny | 0egUP2wTfW | 6AH53zKiJO | 0egwel0TfW | 79vC9vhJAL | JNaENftOq4 | dty9t4rXSL |
| r10 | TdS7M8DVNR | xSdoLO0jfW | tCiRneymZJ | WDsgO2LcXe | u5nc5cLQLD | O6fu6Q0ynm | EbzWb0CuuO | 0egweyXTfW |

### Magnific ids: ingredient icon sheets
Each sheet is 3×2, cells in reading order.

| sheet | original | cut-out | cells (icon keys) |
|---|---|---|---|
| s1 | tCiZvfgmZJ | s7ot7aEl8e | hanhtim, tomkho, rauden, gung, botgao, lachuoi |
| s2 | 8aN3mfuIrU | TdS7d4sVNR | gata, lachanh, suon, botsan, hoaque, sam |
| s3 | aF2zEqlfSh | XmPNm2LBfo | lasen, namtuyet, caque, cachua, hatthong, (spring onion, extra) |

## Known bugs / risks
- The long test run crashes or resets the page after about 6 games on this slow machine. Run kinds in groups with `ONLY=`.
- The cap means thường and tốt materials can no longer make a Tuyệt phẩm, though they could before (a design change asked for by the coordinator). Old works keep their stored tier.
- `vlGradeOdds` in jveil still uses the old wording and has no needed-score text. It is part of item 2 of Left.

## Test commands
```
CTM_IMG_BASE= bash dev/site/build_site.sh          # local build with relative image paths (do NOT commit index.html/sw.js/assets.json from this)
node <cdn-overlay-serve.js from origin/review/img-quality:dev/test/> 28743 . <empty list file> &
ONLY=tranh,theu,bhoa,tho node dev/test/wk-kind-game.js http://127.0.0.1:28743/ 755x1000@2 <outdir>
ONLY=kinh,khuc,the,mua node dev/test/wk-kind-game.js http://127.0.0.1:28743/ 755x1000@2 <outdir>
ONLY=ao,mon,huong node dev/test/wk-kind-game.js http://127.0.0.1:28743/ 1180x820@2 <outdir>
git checkout HEAD -- index.html sw.js assets.json   # after local tests
```
Playwright needs the proxy with `bypass:'127.0.0.1,localhost'`, which the test already sets.

## cdn_sync pending
- Nothing new for this branch yet; no j83 images have been saved.
- The 200 item fixes from review/img-quality-art were being uploaded by the coordinator. Their command, in case it is still needed:
  ```
  python3 dev/site/cdn_sync.py --git origin/review/img-quality-art $(git diff --name-only e659176f0 origin/review/img-quality-art -- img)
  ```
