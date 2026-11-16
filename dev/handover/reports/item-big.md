# Report: item-big (D3, OD:L686, OWNER_LEDGER #199)
Branch: review/item-big, sha adda3201eb4e070cb98d7e2c445c0cc43707fc63 (scan script + PROGRESS only; no game code changed).

## Result: PARTIAL, blocked on KIT REQUEST. NOT "SẴN SÀNG KIỂM".

## Scan (dev/test/item-big-scan.py), before = after (no code change)
Every big item display already goes through ONE path: kitItem({size:"lg"|"xl"}) -> .kitem > .kitb (grade border + radial ground), via kitModal itemPic / kpsubj (jinv.js:129-135), kitLose/reveal (jkrev), reward, gift, pet, veil, mark, econ, recipe.
29 big calls in 14 files: jecon 114; jgift 66,116; jinv 114,127,299,302,309; jitd 74; jkrev 34(xl),67,110; jmark 97; jpet 177,276; jpetcare 49; jrcp 198; jveil 135,163,200; jwdinv 96,103,132; (+jlost 43, jpet 216 var size).
Only 9 pass src512; 20 pass the small src (blurry when big): jgift116, jinv299/302/309, jkrev110, jmark97, jpet177/276, jpetcare49, jveil x3, jwdinv96/132, jlost43.
Tư trang grid (size "slot") keeps its frame: unchanged, correct.

## KIT REQUEST (frame change; I did not touch it)
1. Frameless big mode in kitItem: for size lg/xl (or new size "big"), `.kitb` has NO border, NO background, NO box-shadow, NO overflow clip; image transparent, contain, max size (xl ~ 240-300 px centre), soft drop-shadow only; qty/lux/Ngự badges kept as floating chips; grade shown only by the name/grade line. Slot/sm/md stay framed (Tư trang, lists).
2. Kit helper kitItemBigSrc(k|obj): returns src512 (wd512 for wardrobe, future 1024) with fallback to src, so the 20 call sites above switch to it (I will do the call-site switch after the kit part exists).
3. Pets/veil/mark/econ pictures use their own src functions: kit keeper to decide the same big-src mapping.

## ART REQUEST (art paused tonight; nothing drawn)
- Largest item art on the CDN is 512 px (item512: 751 files, wd512: 138). No 1024 masters exist yet (item-art branch owns 1024 masters).
- 22 items have NO item512 (only the small img/item-*.webp): a-giao, bo-dieu, bot-ngua, dan-co, gam-to-chau, hac-dinh-hong, hinh-nhan, huong-tram, lua-hang-chau, nghien-muc, ngoc-boi-ban, nhan-sam, phan-son, thu-nha, thuoc-an-thai, thuoc-giai, tram-phuong, tranh-co, tui-thom, vong-ngoc, xa-huong, yen-sao.
- Pet stage pictures and veil pictures: size not measured; list them when 1024 masters are decided.

## Tests
Screenshots/viewport tests not run: no visual change was made. To run after the kit part lands: 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844, no page errors, no overflow, old save loads.

## Owner questions
None.
