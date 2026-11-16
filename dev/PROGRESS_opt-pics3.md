# PROGRESS review/opt-pics3 (D53b, art worker) - material-choice dialogs per art / Tứ đức kind + new placeholders
Base: origin/main eba64ead4 + origin/review/placeholder-pics3-r1 (696127b32) + origin/review/tuduc-sub-r1 (adeb7de66), neither was on main. Generated index.html / sw.js / assets.json: conflicts resolved with main's copy, then rebuilt (build_site.sh).
Art: Magnific gpt-2-6 only, folderReference ba4aecfe..., style refs day If6wqwdtvE / night fHA471qCDY (cards), cplQijT0eP (banners); every image looked at (contact sheets). Ids: dev/art/pp4/ids.txt, prompts: dev/art/pp4/scenes.py (+ pp3 scenes.py for the 4 extras). All on the CDN (cdn_sync.py).

## 1. Material-choice dialogs ("<recipe>: dùng vật liệu gì?")
Found: jwkr.js wkrMat (arts) and jtds.js (Tứ đức) push a Q dialog; banner came from jevfit KIT_EVFIT "contest-art" (img/ev-tai-nghe), the 3 material cards from kitOptPic = placeholder.
NO kit change needed: existing mechanisms only, in the new data file dev/build/jwkpics.js (assemble.py: after jtds.js):
- banner: KIT_EVFIT function row "wk-material" spliced before "contest-art" (recipe name from the dialog title -> kind -> key); falls back to the old banner when the picture is not on the CDN.
- option cards: one KIT_OPT_RULES row per key, regex of all recipe names of WKR (+ the old j83 "<work> ·" form), built at load so new recipes map by themselves. Kind "kinh" keeps chep-kinh-h on its cards (banner = Thi).
Pictures (12 banners ev-wk-<key>.webp 640x480 + 12 cards act-opt-wk-<key>.webp 384x506), key = art key (WK[kind].a) or the Tứ đức kind:
cam, ky, thi, hoa, vu, y (Y thuật/hương), theu, nau, kimchi (Cong), phanson (Dung), thuchuc (Ngon), phucthien (Hanh). hoa also covers tranh + cắm hoa; theu covers áo múa when the art Thêu exists (getter), mon -> nau.
Faces: banners show one serene lady (house style); the option cards are hands only.

## 2. missing_pics.js, 2 fresh lives (merged build)
| | life 1 before -> after | life 2 before -> after |
|---|---|---|
| events on placeholder | 1 (q72:fam_thd) -> 0 | 0 -> 0 |
| acts on placeholder | 3 -> 0 | 3 -> 0 |
| option cards on placeholder | 15 -> 15 | 17 -> 14 |
All remaining option cards are person names (Hoàng hậu/Phi/Quý phi/Quý nhân/Tần/Thường tại X or ???, cung nữ, thái giám) = portrait fallback by design. (The material cards were not in this count: the tool does not open those dialogs.)
New pictures: ev-q72-fam-thd (KIT_DLGMAP q72:fam_thd in jevban.js), acts "Các lối, sách phổ" -> cac-loi-sach-pho-h, "Sai cung nữ thân tín lấy đồ" -> sai-cung-nu-lay-do-h, "Sai người lấy trộm đồ" (night) -> sai-nguoi-trom-do-h (img/ACTS.json on the CDN: pulled, 3 keys added, no key lost, JSON valid).

## Checks
- dev/art/pp4/all_recipes.js: all 150 recipes of all 13 kinds open the dialog: banner = ev-wk-<key>, 3 cards = opt-wk-<key> (kinh: chep-kinh-h). 0 bad, 0 page errors.
- Rule-steal scan (dev/art/pp4/scan.js: 14404 string literals of dev/build/j*.js + every recipe x material title, old vs new rules): only the material titles change (462 = 3 cards x 154 names). Before: placeholder for most; a few stole an incidental group (chep-kinh-h on Tranh cá chép / Nữ giới chép tay, giup-do-nang-h on Túi hương ngải cứu, cung-duong-dau-den-h on Vật cầu phúc / Mâm quả, khuyen-giu-long-the-h on Bài khuyên can, bieu-qua-h on Quạt đề lời tặng, opt-banh-la on Bánh bột hấp lá chuối, an item picture on Trâm hoa lụa); now one picture per dialog family. No non-dialog title changed.
- 755x1000 screenshots of Cầm and Hạnh dialogs looked at: banner with chip, three cards with the picture left.
KIT REQUEST: none.
Resume: bash dev/site/build_site.sh; node dev/art/pp4/all_recipes.js <url>; node dev/tools/missing_pics.js <url> out.json.
