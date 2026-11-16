# PROGRESS item-art (D2) — branch review/item-art-r2 (from origin/main a523531da)

Scope (owner 15/11 21:35Z, OD L681-688): poems as calligraphy, incense distinct colours, dresses without rack, 8 pets thiếu niên chubby, 1024 masters.

## Where the pictures live
Images are NOT in git. CDN (https://ctm-img.victoria-tntt.workers.dev): `img/<key>.webp` 256 display, `img/item512/<key>.webp` 512, `img/pet512/pet-<k>-tn.webp` 512, **`img/hi/<key>.webp` 1024 masters (new folder, for D3 item-big)**. Same keys as before, replaced in place (no code change needed). Source grids = Magnific creations listed below (folder ba4aecfe…, model gpt-2-6); build script `dev/art/item_art_build.py` (cut by connected component per 2x2 cell).

## Poems (item-tp-tho-rNN-b1..4 + generic item-tp-tho-b1..4) — 44 pictures
Real legible Vietnamese quốc ngữ brush calligraphy painted by gpt-2-6 (no Chinese characters, owner 05:40Z); no text overlay or new kit part needed. Per recipe: crumpled paper (b1) → clean sheet with seal (b2) → silk hanging scroll (b3) → gold brocade scroll with jade rods (b4); r07 = fans, r09 = handscroll, r10 = four slim scrolls Xuân/Hạ/Thu/Đông (b1/b2 pieces are small).

| key | poem | Magnific grid id | cut-out id | status |
|---|---|---|---|---|
| item-tp-tho-r01-b1..4 | Xuân nhật | xSdENn8jfW | YML9vjcWeC | DONE |
| item-tp-tho-r02-b1..4 | Thu dạ | xSdENYIjfW | VXURuS0MMU | DONE |
| item-tp-tho-r03-b1..4 | Vịnh mai | UPm5ApCwny | xSdE3dCjfW | DONE |
| item-tp-tho-r04-b1..4 | Vịnh liễu | Sytb2pjUb8 | aF2plAWfSh | DONE |
| item-tp-tho-r05-b1..4 | Vọng nguyệt | P3Ejcmp42C | w4hKYae7EI | DONE |
| item-tp-tho-r06-b1..4 | Tống biệt | ksDaPc616B | If60rRstvE | DONE |
| item-tp-tho-r07-b1..4 | Quạt đề thơ (fan) | Sytb2C3Ub8 | xSdE3v2jfW | DONE |
| item-tp-tho-r08-b1..4 | Hoa triêu | xSdENmkjfW | Bh4YKGvoQR | DONE |
| item-tp-tho-r09-b1..4 | Vọng giang | eIOGQRsdqL | p8JAHRAehw | DONE |
| item-tp-tho-r10-b1..4 | Tứ quý (4 slim scrolls) | Sytb2HRUb8 | gOIqGFfSXO | DONE |
| item-tp-tho-b1..4 (generic) | Thơ | bxTmJt45Y2 | ksDaNvT16B | DONE |

## Incense sachets (item-tp-huong-rNN-b1..4 + generic) — 44 pictures
One dominant colour per recipe across all 4 grades (b1 dyed cotton pouch → b2 satin → b3 brocade gourd/heart → b4 gold filigree ball + jade box). Old burlap b1s and the r04/r05 yellow clash, r02/r03 green clash are gone.

| key | colour | grid id | cut-out id | status |
|---|---|---|---|---|
| item-tp-huong-r01-b1..4 | ivory white | yiCxc4nPW9 | ksDaNaz16B | DONE |
| item-tp-huong-r02-b1..4 | leaf green | UPm5GJAwny | Sytbz5RUb8 | DONE |
| item-tp-huong-r03-b1..4 | silver-slate grey | YML9mTrWeC | 1lpf6CKr4r | DONE |
| item-tp-huong-r04-b1..4 | lemon-gold yellow | 5jVhyxhKxe | s7oF21Dl8e | DONE |
| item-tp-huong-r05-b1..4 | orange-coral | ov9W5vB829 | lJ8HAxRgv9 | DONE |
| item-tp-huong-r06-b1..4 | violet | s7oFROCl8e | yiCxT73PW9 | DONE |
| item-tp-huong-r07-b1..4 | crimson red | eIOGFHedqL | JNa1cUrOq4 | DONE |
| item-tp-huong-r08-b1..4 | rose pink | w4hKzW37EI | xSdE31ejfW | DONE |
| item-tp-huong-r09-b1..4 | dark brown | aF2pLSPfSh | Bh4YKX1oQR | DONE |
| item-tp-huong-r10-b1..4 | royal blue | UPm5GcIwny | yiCxTy2PW9 | DONE |
| item-tp-huong-b1..4 (generic) | turquoise | EbzXgOcuuO | gOIqGgxSXO | DONE |

## Equipment dresses without rack — 25 pictures (wd-y-* 21 + wd-nt-bachhoa/hocuu/longchon)
Redrawn from the old icons (used as references) as full garments floating/flowing as if worn, no mannequin/stand/rack/hanger, same colours and embroidery. A small standing collar stub remains on some (reads as collar, not a hanger). Replaces the 256 `img/wd-<key>.webp`; masters in img/hi/.

| grid (generate id, cut-out id) | keys | status |
|---|---|---|
| G1 5jVh31eKxe cut rgeCGO7xtc | wd-y-cungnu, luamoc, hoanho, saxanh | DONE |
| G2 yiCxe62PW9 cut 5jVhRUmKxe | wd-y-maimai, vanthuy, lan, tramnep | DONE |
| G3 Sytb0yVUb8 cut N2Fl8c86D9 | wd-y-haiduong, chimen, maudon, hac | DONE |
| G4 8aNcsfoIrU cut w4hKMZl7EI | wd-y-kimtuyen, vancam, trieutim, bachdieu | DONE |
| G5 gOIqcPsSXO cut xSdEz4vjfW | wd-y-minhhoang, phuongbao, chuongsu, mama | DONE |
| G6 ov9WLCp829 cut Bh4YLHwoQR | wd-y-nuquan, tang, wd-nt-bachhoa, wd-nt-hocuu | DONE |
| G7 O6frpz5ynm cut LwBQYiSswO | wd-nt-longchon | DONE |

## Pets thiếu niên (chubby) — 8 pictures
Redrawn with the adult art as style/identity reference: round plump body, short thick limbs, still cute. Replaces `img/pet-<k>-tn.webp` (256) and `img/pet512/pet-<k>-tn.webp`. Trưởng thành / Linh thú / Non untouched.

| key | pet | generate id | cut-out id | status |
|---|---|---|---|---|
| pet-meomuop-tn | Mèo mướp | YML9CaJWeC | eIOG1yCdqL | DONE |
| pet-cho-tn | Chó nhỏ lông xù | ksDa3iq16B | huRMU2fvqL | DONE |
| pet-tho-tn | Thỏ ngọc | P3EjpeZ42C | gOIqcmHSXO | DONE |
| pet-meo-tn | Mèo tuyết | 8aNcjskIrU | rgeCABXxtc | DONE |
| pet-sutu-tn | Chó sư tử lông vàng | huRMg4IvqL | LwBQnt6swO | DONE |
| pet-linhmieu-tn | Linh miêu mắt ngọc | w4hK08Y7EI | N2Flo5w6D9 | DONE |
| pet-cuuvi-tn | Cửu vĩ hồ | s7oFzdwl8e | vQZDwnAa47 | DONE |
| pet-ngoctho-tn | Ngọc thố | u5nBOGFQLD | jUXuzmcLD0 | DONE |

## Skipped / not done
- D3 item-big (hi-res centre display, transparent, no tile): separate item; masters are ready in `img/hi/`.
- LUẬT ƯU TIÊN SỐ 1: old origin/review/item-art (11/14) only holds the original 256/512 set — superseded; no `img/hi/` existed on CDN before.

## Notes
- Box CPU-starved (load ~40): webp encoding done with method=3 and 3 processes; one final browser smoke only.

## r4 (review/item-art-r4, D2 reviewer FAIL fix)
All sizes redone (256/512|pet512/hi 1024), Magnific gpt-2-6, folder ba4aecfe…; generate (picked) -> remove-bg cut-out -> `dev/art/item_art_r4_build.py` (fit to sibling framing). Text read at 1024.

| key | text read | generate id | cut-out id |
|---|---|---|---|
| item-tp-tho-r06-b4 | "Tống biệt / Chén rượu tiễn người đi / Sông dài mây cũng buồn" | MBwZPl0DCm (others xSdEIMfjfW, LwBQmeUswO) | 1lpf8zJr4r |
| item-tp-tho-r08-b1 | "Hoa triều / Sáng sớm hoa hé nụ / Sương mai đọng cành" | 1lpfodWr4r (others rgeC8X3xtc, cpl67SJ0eP) | 3zbUxaTREY |
| item-tp-tho-r01-b1 | "Xuân nhật / Nắng xuân ấm cửa sổ / Chim hót gọi hoa đào" | aF2pYnwfSh (others JNa1QuROq4, 9ZQs5bQNYZ) | jUXum0lLD0 |
| item-tp-tho-r03-b1 | "Vịnh mai / Mai nở trong tuyết / Hương thơm giữa trời đông" | lJ8Hvvbgv9 (others LwBQmmxswO, MBwZP4oDCm) | 1lpf8c3r4r |
| pet-cuuvi-tn | play-bow, tails fanned (adult: sitting) | Do729v5pcl (others tCiTGHtmZJ, 6AHg1cTiJO) | aF2pWzSfSh |
| pet-sutu-tn | play-bow, tail up (adult: standing) | lJ8Hai4gv9 (others xSdEt4LjfW, SytbCRzUb8) | ksDaodF16B |
| pet-linhmieu-tn | pounce, one paw raised (adult: sitting) | O6frHnBynm (others SytbCZ2Ub8, bxTmd795Y2) | rgeCI8jxtc |
Adult refs uploaded: cuuvi u5nBTpmQLD, sutu aF2pYV4fSh, linhmieu UPm5Cqtwny.

## r5 (review/item-art-r5, D2 poem re-audit)
All 44 poems re-read at 1024. Found "Hoa triêu" (circumflex only, missing grave) in r08-b2, r08-b3, r08-b4 (b1 was already "triều"); r02-b1 and r07-b1 had ambiguous scratchy ink (acute/crossbar unclear) -> redone clean. All redone with Magnific gpt-2-6 (folder ba4aecfe…), remove-bg cut-out, `dev/art/item_art_r4_build.py`, text re-read at 1024.

| key | text read | generate id (picked) | cut-out id |
|---|---|---|---|
| item-tp-tho-r08-b2 | "Hoa triều / Sáng sớm hoa hé nụ / Sương mai đọng cành" | 79vk1h7JAL | TdS3ZoqVNR |
| item-tp-tho-r08-b3 | same | iGqS7Ra3uK | tCiTDRrmZJ |
| item-tp-tho-r08-b4 | same | yiCxs9FPW9 | UPm51aGwny |
| item-tp-tho-r02-b1 | "Thu dạ / Đêm thu trăng lạnh / Lá rụng bên thềm" | ov9WTGt829 | vQZDXLTa47 |
| item-tp-tho-r07-b1 | "Quạt đề thơ / Quạt nhỏ đề thơ / Gió mát đầy tay" | dtyzW2VXSL | aF2pBlefSh |
