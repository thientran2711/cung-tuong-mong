# PROGRESS review/pets-fix — fix review/pets (+ ts-b) after the review FAIL (dev/review/pets.md on origin/review/kiem2-notes 7edeb353e)

Base: origin/review/pets-gop-thu ce255da65 → merged pet-care 3b3aaba5c (5c5787e26) and shop-fix 144f28bc4 (df3faee40), then
**origin/main 80be56be0** (fc0cbd14d; main already holds the reviewed shop-fix, so every shop-fix file took main's version; assemble.py =
main's list + `jtsb.js, jpet.js, jpetcare.js` after `jload.js`).

## Done (15/11, worker session 2)
- **Pet shop = kitShop** (jpet `petShop`/`petShopItems`/`petBuyOne`): the kit person dialog + tile grid, Non pictures, buy on the tile,
  seller + "???" naming exactly like kitShopNvp (stage `{__fig:"img/fig-eunuch-ndp-tray.webp", __cap, __role}`).
- **17 px misalignment** fixed at KIT level (LUẬT SỬA CẢ NHÓM): `kitEquipSlots` (jinv, KIT 28.13c) slots are 4 subgrid rows
  picture · name · chips · note (`keqMiniSplit` splits `mini` at its `.keql2`). Covers every user: Thú nuôi, Tư trang "Bên mình/Đang mang"
  (jinv/jwdinv), Trang điểm "Đang mặc" (jtoil). Before/after (755x1000): pets note line 17 px → 0; Đang mang name vs label 2–7 px → 0.
- **Care screen = kit parts only** (jpetcare `petcOpen/petcBody/petcDraw`): `kitModal({pick:true, stage:[pet as the person]})` = the KIT 32.7
  person dialog (pet big in the left column), `kitStatRow` of 4 `kitStatCell` bars (No/Sạch/Vui/Tình cảm), `kitRows`, the mini-game in
  `kitGameFrame` with `.kgbtn` pieces (feed = drag/tap the right food onto the pet; bath = 5 even strokes on the pet; play = tap the lit
  ball button, 3 rounds), act cards, closed by kit ✕. The private `.kpc*` CSS (#kpetcare-css) and the "Xong" button are gone.
  `petcPic` = kitItem lg. A growth during care closes the screen and shows the "đã lớn" card.
- KIT rule: a shop/pick person dialog never gets the event band picture (outermost `kitEvArt` wrapper in jpetcare; "Chăm mèo tuyết"
  matched the snow-day event by "tuyết"). KIT.md 28.13c (row alignment) + 28.13d (pick dialogs, care screen) updated.
- Pet card: "Chăm" act text = opens the care screen; Ghi chú no longer shows the old "khí lực"; first-time tip explains the 4 stages, the
  care numbers, neglect, and that Ngự tứ saves a life only as Linh thú.
- ts-b reviewer note: "Lần đầu gặp mặt" passes `who` (her face) — `tsbCard` forwards `d.who` via `pv()`.
- Tests: **dev/test/pets-fix.js** (new, full check at one size, see header); dev/test/pets.js + mk-oldsave-pets.js boot fixed
  (SW blocked, `__nlInner`, #kload/.krbox/#kroul hidden, proxy; pets.js buys through the kit shop; mk-oldsave works on main's index.html).

## Results
See the last commit message / report: 5 sizes with dev/test/pets-fix.js (old save made by main's index.html with legacy turtle keys).

## Open / notes
- Co-op friend's pets (help/harm/steal through the room relay): `coopPetAct` hook exists, NOT wired (no `coopAct` relay in jcoop).
- Ngự tứ rescue = only at **Linh thú** (stage 4); the owner's words were "fully grown" — confirm with the owner if Trưởng thành was meant.
- Care label is "No" (fullness, higher = better), the owner wrote "Đói"; kept "No" so every bar reads the same way.

## Commands
- `python3 dev/build/assemble.py && bash dev/site/build_site.sh`
- `git show origin/main:index.html > main.html` (do not commit) then
  `node dev/test/pets-fix.js http://127.0.0.1:<port> 755x1000@2 <outdir> main.html` (local `python3 -m http.server` in the worktree root)
