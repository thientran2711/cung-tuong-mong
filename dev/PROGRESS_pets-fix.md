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

## Results (dev/test/pets-fix.js; old save made by main 80be56be0's index.html with legacy linhquy/rua pets)
755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@3 (after the 2nd main merge 888463759 rerun at 755/844/1180): pets row + Đang mang
row spread 0 px; pet shop 11 tiles in 3 columns, every row 0 px (picture/name/use/price/stepper/button/height), all -non pictures loaded;
buy works (stage Non); card pictures -non/-tn/grown/-lt all load; care screen inside the screen, no event band, no private CSS, kit ✕ closes;
games: No 40→80, Sạch 40→80, Vui 40→76; growth 1→2→3 + "đã lớn" card; Ngự tứ rescuer only at Linh thú; neglect → "Thú nuôi biếng ăn" →
"Thú nuôi bỏ đi"; help (+rel) / steal (keeps stage) / NPC steals hers (+notice card); old save: linhquy→Kỳ lân, rua→Hạc; 0 page errors,
no overflow. dev/test/pets.js + mk-oldsave-pets.js (main build save): pass, rescue works. 390x844 (?khost=1): frame pre-rotated (landscape).

## Open / notes
- Co-op friend's pets (help/harm/steal through the room relay): `coopPetAct` hook exists, NOT wired (no `coopAct` relay in jcoop).
- Ngự tứ rescue = only at **Linh thú** (stage 4); the owner's words were "fully grown" — confirm with the owner if Trưởng thành was meant.
- Care label is "No" (fullness, higher = better), the owner wrote "Đói"; kept "No" so every bar reads the same way.

## Commands
- `python3 dev/build/assemble.py && bash dev/site/build_site.sh`
- `git show origin/main:index.html > main.html` (do not commit) then
  `node dev/test/pets-fix.js http://127.0.0.1:<port> 755x1000@2 <outdir> main.html` (local `python3 -m http.server` in the worktree root)

## Reviewer r6 (review/pets-fix-r6, 15/11 ~17:15–18:10Z)
- ts-b: origin/review/ts-b tip d29e3952c (incl. cfbffb955) is an ancestor of pets-fix c117502be → contained; reviewed with pets.
- Merged on origin/main 888463759 (already in) then ed7271deb (scene-light r9; only built files conflicted → rebuilt).
- Reviewer fixes: (1) pet card = ONE kit table (petRowsL; jpetcare adds Lớn/Đang có/Lớn tiếp/Chăm rows to the same kitRows — two stacked
  tables had value columns 6 px apart, KIT §51); (2) relation wording "thiện cảm ±N" in jtsb approach cards + jpetcare help (VANPHONG);
  (3) ts-b pid cards keep the speaker face after reload (deserQ sets who); (4) kitHint (jk2b, KIT.md): a "Chắc chắn" option's "Mất:" is a
  sure price ("nhưng …") — the Nhịn card in hint mode read "hỏng thì mất thể diện".
- Tests: pets-fix.js 5 sizes + old save, pets.js 5 sizes + mk-oldsave, tassel-scan + kit-table 1180 (their 2 findings identical on main),
  ts-b card check (Có người đến Nhịn/Đáp trả, Lần đầu gặp mặt who, reload), Trang điểm "Đang mặc" rows 0 px.
- Main-wide note (not this branch): ~38 card strings still say "nàng thân ±N" (j7, j71, j78, j24 …) — not rewritten to "thiện cảm" by j84.
