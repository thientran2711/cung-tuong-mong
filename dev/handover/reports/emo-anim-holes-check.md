# emo-anim holes check (ROOT-47 measure)

Source: CDN `img/_review/emo-anim-mass/<name>.webp`, 240 files (all present, no 404). 6-7 frames per clip sampled evenly incl. first + last.
Metric: largest opaque (alpha>=128) component, binary_fill_holes; holes% = transparent px enclosed by silhouette / filled area. Max over sampled frames. Flag > 1 %.
Visual check: m-muu / mo-muu = real key holes inside the purple disc (around hair/head). mo-hungkhoi-back f34 = see-through crescent between ring and disc (left side). act-hungkhoi f35 = mostly gaps between purple swirl ribbon and ring, some inside rim -> borderline.
A secondary circle-fit metric (transparent px inside fitted disc) was also run; its hits >1 % on other files (tutin, hothen-back, chuyentam-out, act-gian ...) were inspected and are circle-misfit slivers at the rim, not holes. Not used for flags.
Young-men ghen / hanghai (known 26 % / 37 % at key 0.28) measure ~0 % now -> CDN files are already the re-cut versions.

| group | file | max holes % | flagged | frame (of N) |
|---|---|---|---|---|
| women-existing | vui-out.webp | 0.00 | n | -1 / 48 |
| women-existing | vui.webp | 0.00 | n | 24 / 61 |
| women-existing | vui-back.webp | 0.01 | n | 0 / 52 |
| women-existing | binh-out.webp | 0.00 | n | -1 / 50 |
| women-existing | binh.webp | 0.00 | n | -1 / 61 |
| women-existing | binh-back.webp | 0.00 | n | -1 / 43 |
| women-existing | an-out.webp | 0.00 | n | -1 / 46 |
| women-existing | an.webp | 0.00 | n | -1 / 61 |
| women-existing | an-back.webp | 0.00 | n | -1 / 50 |
| women-existing | buon-out.webp | 0.00 | n | -1 / 46 |
| women-existing | buon.webp | 0.00 | n | -1 / 61 |
| women-existing | buon-back.webp | 0.00 | n | 14 / 35 |
| women-existing | dau-out.webp | 0.00 | n | -1 / 39 |
| women-existing | dau.webp | 0.00 | n | -1 / 61 |
| women-existing | dau-back.webp | 0.00 | n | 16 / 41 |
| women-existing | ghen-out.webp | 0.00 | n | -1 / 48 |
| women-existing | ghen.webp | 0.00 | n | -1 / 61 |
| women-existing | ghen-back.webp | 0.00 | n | -1 / 50 |
| women-existing | gian-out.webp | 0.00 | n | -1 / 25 |
| women-existing | gian.webp | 0.00 | n | -1 / 61 |
| women-existing | gian-back.webp | 0.00 | n | -1 / 40 |
| women-existing | lo-out.webp | 0.00 | n | -1 / 56 |
| women-existing | lo.webp | 0.00 | n | -1 / 61 |
| women-existing | lo-back.webp | 0.00 | n | -1 / 43 |
| women-existing | muu-out.webp | 0.00 | n | -1 / 54 |
| women-existing | muu.webp | 0.00 | n | -1 / 61 |
| women-existing | muu-back.webp | 0.00 | n | -1 / 56 |
| women-existing | so-out.webp | 0.00 | n | -1 / 43 |
| women-existing | so.webp | 0.00 | n | -1 / 61 |
| women-existing | so-back.webp | 0.00 | n | -1 / 47 |
| women-new | tutin-out.webp | 0.01 | n | 49 / 50 |
| women-new | tutin.webp | 0.12 | n | 12 / 60 |
| women-new | tutin-back.webp | 0.01 | n | 23 / 58 |
| women-new | hanghai-out.webp | 0.01 | n | 34 / 43 |
| women-new | hanghai.webp | 0.01 | n | 0 / 60 |
| women-new | hanghai-back.webp | 0.01 | n | 24 / 60 |
| women-new | tinhtu-out.webp | 0.12 | n | 23 / 58 |
| women-new | tinhtu.webp | 0.00 | n | -1 / 60 |
| women-new | tinhtu-back.webp | 0.00 | n | -1 / 55 |
| women-new | chuyentam-out.webp | 0.00 | n | -1 / 58 |
| women-new | chuyentam.webp | 0.00 | n | -1 / 60 |
| women-new | chuyentam-back.webp | 0.00 | n | -1 / 55 |
| women-new | hungkhoi-out.webp | 0.04 | n | 42 / 53 |
| women-new | hungkhoi.webp | 0.02 | n | 0 / 60 |
| women-new | hungkhoi-back.webp | 0.03 | n | 23 / 58 |
| women-new | tinhnghich-out.webp | 0.00 | n | 51 / 52 |
| women-new | tinhnghich.webp | 0.00 | n | 59 / 60 |
| women-new | tinhnghich-back.webp | 0.00 | n | -1 / 60 |
| women-new | hothen-out.webp | 0.00 | n | -1 / 57 |
| women-new | hothen.webp | 0.00 | n | -1 / 60 |
| women-new | hothen-back.webp | 0.00 | n | -1 / 54 |
| women-new | chan-out.webp | 0.00 | n | -1 / 50 |
| women-new | chan.webp | 0.00 | n | -1 / 60 |
| women-new | chan-back.webp | 0.00 | n | -1 / 48 |
| women-new | khochiu-out.webp | 0.00 | n | -1 / 58 |
| women-new | khochiu.webp | 0.00 | n | -1 / 60 |
| women-new | khochiu-back.webp | 0.00 | n | -1 / 55 |
| women-new | choang-out.webp | 0.00 | n | -1 / 58 |
| women-new | choang.webp | 0.00 | n | -1 / 60 |
| women-new | choang-back.webp | 0.00 | n | -1 / 58 |
| women-new | hon-out.webp | 0.00 | n | -1 / 57 |
| women-new | hon.webp | 0.04 | n | 24 / 60 |
| women-new | hon-back.webp | 0.00 | n | -1 / 58 |
| women-act | act-buon-out.webp | 0.00 | n | -1 / 57 |
| women-act | act-buon.webp | 0.00 | n | -1 / 60 |
| women-act | act-buon-back.webp | 0.00 | n | -1 / 60 |
| women-act | act-gian-out.webp | 0.36 | n | 24 / 41 |
| women-act | act-gian.webp | 0.17 | n | 59 / 60 |
| women-act | act-gian-back.webp | 0.27 | n | 12 / 60 |
| women-act | act-khochiu-out.webp | 0.00 | n | -1 / 60 |
| women-act | act-khochiu.webp | 0.00 | n | -1 / 60 |
| women-act | act-khochiu-back.webp | 0.00 | n | -1 / 58 |
| women-act | act-so-out.webp | 0.00 | n | -1 / 54 |
| women-act | act-so.webp | 0.01 | n | 35 / 60 |
| women-act | act-so-back.webp | 0.00 | n | -1 / 57 |
| women-act | act-hothen-out.webp | 0.01 | n | 46 / 58 |
| women-act | act-hothen.webp | 0.00 | n | -1 / 60 |
| women-act | act-hothen-back.webp | 0.00 | n | -1 / 57 |
| women-act | act-lo-out.webp | 0.00 | n | -1 / 55 |
| women-act | act-lo.webp | 0.00 | n | 47 / 60 |
| women-act | act-lo-back.webp | 0.00 | n | -1 / 58 |
| women-act | act-chan-out.webp | 0.00 | n | -1 / 54 |
| women-act | act-chan.webp | 0.00 | n | -1 / 60 |
| women-act | act-chan-back.webp | 0.00 | n | -1 / 54 |
| women-act | act-choang-out.webp | 0.00 | n | -1 / 39 |
| women-act | act-choang.webp | 0.01 | n | 24 / 60 |
| women-act | act-choang-back.webp | 0.01 | n | 0 / 37 |
| women-act | act-hon-out.webp | 0.00 | n | -1 / 60 |
| women-act | act-hon.webp | 0.06 | n | 24 / 60 |
| women-act | act-hon-back.webp | 0.00 | n | -1 / 57 |
| women-act | act-ghen-out.webp | 0.01 | n | 46 / 58 |
| women-act | act-ghen.webp | 0.01 | n | 47 / 60 |
| women-act | act-ghen-back.webp | 0.01 | n | 0 / 54 |
| women-act | act-vui-out.webp | 0.00 | n | -1 / 55 |
| women-act | act-vui.webp | 0.00 | n | -1 / 60 |
| women-act | act-vui-back.webp | 0.00 | n | 22 / 57 |
| women-act | act-tutin-out.webp | 0.00 | n | -1 / 55 |
| women-act | act-tutin.webp | 0.00 | n | -1 / 60 |
| women-act | act-tutin-back.webp | 0.00 | n | -1 / 58 |
| women-act | act-tinhtu-out.webp | 0.00 | n | -1 / 57 |
| women-act | act-tinhtu.webp | 0.00 | n | -1 / 60 |
| women-act | act-tinhtu-back.webp | 0.00 | n | -1 / 58 |
| women-act | act-tinhnghich-out.webp | 0.00 | n | -1 / 58 |
| women-act | act-tinhnghich.webp | 0.44 | n | 24 / 60 |
| women-act | act-tinhnghich-back.webp | 0.00 | n | -1 / 58 |
| women-act | act-hanghai-out.webp | 0.02 | n | 59 / 60 |
| women-act | act-hanghai.webp | 0.02 | n | 59 / 60 |
| women-act | act-hanghai-back.webp | 0.00 | n | -1 / 56 |
| women-act | act-chuyentam-out.webp | 0.00 | n | -1 / 58 |
| women-act | act-chuyentam.webp | 0.00 | n | 47 / 60 |
| women-act | act-chuyentam-back.webp | 0.00 | n | -1 / 58 |
| women-act | act-hungkhoi-out.webp | 0.00 | n | -1 / 57 |
| women-act | act-hungkhoi.webp | 3.60 | **Y** | 35 / 60 |
| women-act | act-hungkhoi-back.webp | 0.00 | n | -1 / 58 |
| mature-men | mo-vui-out.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-vui.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-vui-back.webp | 0.00 | n | -1 / 58 |
| mature-men | mo-binh-out.webp | 0.00 | n | -1 / 58 |
| mature-men | mo-binh.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-binh-back.webp | 0.00 | n | -1 / 57 |
| mature-men | mo-an-out.webp | 0.03 | n | 23 / 58 |
| mature-men | mo-an.webp | 0.00 | n | 24 / 60 |
| mature-men | mo-an-back.webp | 0.00 | n | 0 / 47 |
| mature-men | mo-buon-out.webp | 0.00 | n | 56 / 57 |
| mature-men | mo-buon.webp | 0.01 | n | 12 / 60 |
| mature-men | mo-buon-back.webp | 0.00 | n | 20 / 50 |
| mature-men | mo-dau-out.webp | 0.00 | n | -1 / 45 |
| mature-men | mo-dau.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-dau-back.webp | 0.00 | n | -1 / 58 |
| mature-men | mo-ghen-out.webp | 0.04 | n | 8 / 40 |
| mature-men | mo-ghen.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-ghen-back.webp | 0.00 | n | -1 / 48 |
| mature-men | mo-gian-out.webp | 0.00 | n | 22 / 37 |
| mature-men | mo-gian.webp | 0.00 | n | 35 / 60 |
| mature-men | mo-gian-back.webp | 0.00 | n | -1 / 58 |
| mature-men | mo-lo-out.webp | 0.00 | n | -1 / 58 |
| mature-men | mo-lo.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-lo-back.webp | 0.04 | n | 9 / 48 |
| mature-men | mo-muu-out.webp | 4.08 | **Y** | 57 / 58 |
| mature-men | mo-muu.webp | 3.93 | **Y** | 59 / 60 |
| mature-men | mo-muu-back.webp | 0.93 | n | 0 / 58 |
| mature-men | mo-so-out.webp | 0.07 | n | 46 / 58 |
| mature-men | mo-so.webp | 0.08 | n | 24 / 60 |
| mature-men | mo-so-back.webp | 0.07 | n | 11 / 58 |
| mature-men | mo-tutin-out.webp | 0.00 | n | -1 / 58 |
| mature-men | mo-tutin.webp | 0.11 | n | 35 / 60 |
| mature-men | mo-tutin-back.webp | 0.00 | n | -1 / 58 |
| mature-men | mo-hanghai-out.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-hanghai.webp | 0.04 | n | 12 / 60 |
| mature-men | mo-hanghai-back.webp | 0.04 | n | 46 / 58 |
| mature-men | mo-tinhtu-out.webp | 0.00 | n | 22 / 57 |
| mature-men | mo-tinhtu.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-tinhtu-back.webp | 0.00 | n | -1 / 53 |
| mature-men | mo-chuyentam-out.webp | 0.00 | n | -1 / 54 |
| mature-men | mo-chuyentam.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-chuyentam-back.webp | 0.00 | n | -1 / 55 |
| mature-men | mo-hungkhoi-out.webp | 0.01 | n | 30 / 38 |
| mature-men | mo-hungkhoi.webp | 0.05 | n | 35 / 60 |
| mature-men | mo-hungkhoi-back.webp | 4.19 | **Y** | 34 / 57 |
| mature-men | mo-tinhnghich-out.webp | 0.00 | n | -1 / 52 |
| mature-men | mo-tinhnghich.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-tinhnghich-back.webp | 0.00 | n | -1 / 58 |
| mature-men | mo-hothen-out.webp | 0.00 | n | -1 / 58 |
| mature-men | mo-hothen.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-hothen-back.webp | 0.00 | n | -1 / 53 |
| mature-men | mo-chan-out.webp | 0.00 | n | -1 / 58 |
| mature-men | mo-chan.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-chan-back.webp | 0.00 | n | -1 / 57 |
| mature-men | mo-khochiu-out.webp | 0.00 | n | -1 / 58 |
| mature-men | mo-khochiu.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-khochiu-back.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-choang-out.webp | 0.03 | n | 34 / 58 |
| mature-men | mo-choang.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-choang-back.webp | 0.00 | n | -1 / 55 |
| mature-men | mo-hon-out.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-hon.webp | 0.00 | n | -1 / 60 |
| mature-men | mo-hon-back.webp | 0.00 | n | -1 / 48 |
| young-men | m-vui-out.webp | 0.00 | n | -1 / 43 |
| young-men | m-vui.webp | 0.00 | n | 36 / 61 |
| young-men | m-vui-back.webp | 0.00 | n | -1 / 58 |
| young-men | m-binh-out.webp | 0.00 | n | 47 / 48 |
| young-men | m-binh.webp | 0.00 | n | 0 / 61 |
| young-men | m-binh-back.webp | 0.00 | n | 0 / 43 |
| young-men | m-an-out.webp | 0.00 | n | -1 / 50 |
| young-men | m-an.webp | 0.00 | n | -1 / 61 |
| young-men | m-an-back.webp | 0.00 | n | -1 / 41 |
| young-men | m-buon-out.webp | 0.01 | n | 45 / 46 |
| young-men | m-buon.webp | 0.02 | n | 0 / 61 |
| young-men | m-buon-back.webp | 0.02 | n | 17 / 43 |
| young-men | m-dau-out.webp | 0.00 | n | -1 / 33 |
| young-men | m-dau.webp | 0.01 | n | 12 / 61 |
| young-men | m-dau-back.webp | 0.00 | n | -1 / 58 |
| young-men | m-ghen-out.webp | 0.00 | n | -1 / 20 |
| young-men | m-ghen.webp | 0.00 | n | 0 / 61 |
| young-men | m-ghen-back.webp | 0.04 | n | 8 / 42 |
| young-men | m-gian-out.webp | 0.00 | n | -1 / 22 |
| young-men | m-gian.webp | 0.00 | n | -1 / 61 |
| young-men | m-gian-back.webp | 0.00 | n | -1 / 56 |
| young-men | m-lo-out.webp | 0.00 | n | -1 / 35 |
| young-men | m-lo.webp | 0.00 | n | 12 / 61 |
| young-men | m-lo-back.webp | 0.00 | n | -1 / 37 |
| young-men | m-muu-out.webp | 6.08 | **Y** | 30 / 31 |
| young-men | m-muu.webp | 6.62 | **Y** | 0 / 61 |
| young-men | m-muu-back.webp | 0.00 | n | 0 / 50 |
| young-men | m-so-out.webp | 0.13 | n | 8 / 41 |
| young-men | m-so.webp | 0.15 | n | 24 / 61 |
| young-men | m-so-back.webp | 0.48 | n | 0 / 41 |
| young-men | m-tutin-out.webp | 0.01 | n | 33 / 42 |
| young-men | m-tutin.webp | 0.00 | n | 47 / 60 |
| young-men | m-tutin-back.webp | 0.00 | n | -1 / 58 |
| young-men | m-hanghai-out.webp | 0.04 | n | 47 / 60 |
| young-men | m-hanghai.webp | 0.05 | n | 12 / 60 |
| young-men | m-hanghai-back.webp | 0.04 | n | 24 / 60 |
| young-men | m-tinhtu-out.webp | 0.01 | n | 23 / 58 |
| young-men | m-tinhtu.webp | 0.02 | n | 35 / 60 |
| young-men | m-tinhtu-back.webp | 0.00 | n | -1 / 57 |
| young-men | m-chuyentam-out.webp | 0.00 | n | -1 / 56 |
| young-men | m-chuyentam.webp | 0.01 | n | 12 / 60 |
| young-men | m-chuyentam-back.webp | 0.00 | n | -1 / 57 |
| young-men | m-hungkhoi-out.webp | 0.00 | n | -1 / 55 |
| young-men | m-hungkhoi.webp | 0.01 | n | 12 / 60 |
| young-men | m-hungkhoi-back.webp | 0.04 | n | 23 / 58 |
| young-men | m-tinhnghich-out.webp | 0.00 | n | -1 / 57 |
| young-men | m-tinhnghich.webp | 0.00 | n | 12 / 60 |
| young-men | m-tinhnghich-back.webp | 0.00 | n | -1 / 54 |
| young-men | m-hothen-out.webp | 0.00 | n | -1 / 56 |
| young-men | m-hothen.webp | 0.00 | n | -1 / 60 |
| young-men | m-hothen-back.webp | 0.00 | n | -1 / 57 |
| young-men | m-chan-out.webp | 0.00 | n | 57 / 58 |
| young-men | m-chan.webp | 0.00 | n | -1 / 60 |
| young-men | m-chan-back.webp | 0.02 | n | 22 / 57 |
| young-men | m-khochiu-out.webp | 0.00 | n | -1 / 52 |
| young-men | m-khochiu.webp | 0.00 | n | 47 / 60 |
| young-men | m-khochiu-back.webp | 0.00 | n | 35 / 60 |
| young-men | m-choang-out.webp | 0.00 | n | 46 / 58 |
| young-men | m-choang.webp | 0.02 | n | 24 / 60 |
| young-men | m-choang-back.webp | 0.02 | n | 0 / 60 |
| young-men | m-hon-out.webp | 0.00 | n | -1 / 57 |
| young-men | m-hon.webp | 0.00 | n | -1 / 60 |
| young-men | m-hon-back.webp | 0.00 | n | -1 / 60 |

## Re-cut 19/11 (ROOT-47 helper): muu / hungkhoi discs
Cause: ffmpeg chromakey 0.28 keyed the teal/slate muu disc to alpha ~120-170 (shows PURPLE on magenta) + holes. No new generation; same Seedance clips, same trims (frame-matched to the old CDN files), 288 px, 15 fps, edge-only despill, animated webp.
Key: RGB distance to the sampled background green, alpha ramp 60..100 (dev/art/emo-anim/recut-muu/recut.py `rgb 60,100`). mo-hungkhoi-back: the source clip itself shows a green crescent between rim and disc (rim off-centre), so enclosed gaps bordering the pink disc are filled with the disc colour (recut-muu/fillcres.py); a faint disc-edge seam stays visible in ~f30-40.

| file | clip id | trim (ss / frames) | holes % old -> new | disc-colour alpha mean old -> new (min frame) |
|---|---|---|---|---|
| m-muu-out | xSBy7TBjfW | 2.000 s / 31 | 6.08 -> 0.03 | 169 (123) -> 255 (255) |
| m-muu | s7I9yeIl8e | 0 / 61 | 6.62 -> 0.00 | 153 (118) -> 255 (255) |
| mo-muu-out | 9ZHY2ysNYZ | 0.133 s / 58 | 4.08 -> 0.01 | 175 (120) -> 255 (255) |
| mo-muu | cpS8eWY0eP | 0.067 s / 60 | 3.93 -> 0.00 | 147 (122) -> 255 (255) |
| mo-muu-back | Xm9EqafBfo (kept clip) | 0.133 s / 58 | 1.15 -> 0.77 | 224 (160) -> 254 (246) |
| mo-hungkhoi-back | 4RFn8PD9Aa | 0.267 s / 57 | 4.43 -> 0.76 | 255 -> 255 (crescent filled) |

Remaining 0.77 / 0.76 % = real background gap between sleeve and rim in the source (f8-11 mo-muu-back, f15 mo-hungkhoi-back), not a disc hole. Interior alpha (silhouette eroded 6 px) now >= 252.8 every frame; no green fringe (<= 0.1 % of edge band). Looked at mid + worst frames on magenta and #23232e: discs teal / pink, not purple.
Uploaded (same names) to img/_review/emo-anim-mass/; before/after sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-mass/sheet-recut-muu.jpg
Note: m-muu-back (not in this list) was cut the same old way; it measured 0 % holes but its disc-colour alpha is mean 201 (min frame 183), i.e. also semi-transparent - check / re-cut (clip in ledger line 834) if wanted.

## Disc alpha sweep + re-cut 2 (19/11, ROOT-47 helper)
Sweep: all 342 animated webps in img/_review/emo-anim-mass/ (the 240 above + m-act-* 51 + mo-act-* 51; emo-* stills skipped).
Metric (dev/art/emo-anim/recut-muu/discalpha.py): 5 frames per file evenly incl. first + last; RANSAC circle fit on the silhouette
boundary; annulus 80-92 % of the rim radius, upper half (angle -165..-15 deg); keep pixels with alpha>0 whose RGB is within 70 of the
annulus median colour and that are >3 px from fully transparent pixels (excludes the figure's cut-out edge); mean alpha of those.
Min over the 5 frames. Flag < 245. (Without the edge exclusion, mo-act-chuyentam / -out / -back measured 231-238, but that was hair/cap
edge at the frame top, not the disc; with it they measure 255. They were re-cut as a test, fine, but NOT uploaded.)

**13 flagged** (all teal/green discs: muu, ghen, binh). Near-misses 245-250 (green ghen/binh/hanghai discs, slightly see-through,
not re-cut): ghen-out 246.2, mo-ghen-back 246.2, m-ghen-back 246.5, mo-hanghai-out 246.7, act-ghen 247.6, mo-hanghai 247.6, binh 248.1, mo-binh 248.3, m-ghen-out 248.7, mo-binh-out 248.7, binh-out 248.9.

Re-cut: same Seedance clip, same recut.py `rgb 60,100` (288 px, 15 fps, edge-only despill), trim frame-matched to the old CDN file
(old frame 0 / last frame = source frame k / k+N-1 at 15 fps; RGB error at opaque px ~6 per frame). Uploaded (same names) to img/_review/emo-anim-mass/.

| file | clip id | ss / frames | min disc alpha old -> new | holes % new | last-frame mean alpha diff vs old |
|---|---|---|---|---|---|
| m-muu-back | iG50YHA3uK | 0.733 s / 50 | 190.2 -> 255 | 0.02 | 4.85 |
| act-ghen-back | bxMSRdR5Y2 | 0.467 s / 54 | 222.1 -> 255 | 0.01 | 5.08 |
| mo-ghen | rgXOgX9xtc | 0.067 s / 60 | 222.4 -> 255 | 0.00 | 4.94 |
| muu-out | ov6upSI829 | 0.467 s / 54 | 225.2 -> 255 | 0.01 | 4.07 |
| m-binh | VX7mD3RMMU | 0.000 s / 61 | 234.2 -> 255 | 0.03 | 3.42 |
| m-binh-out | N2qWijK6D9 | 0.867 s / 48 | 234.4 -> 255 | 0.00 | 3.41 |
| mo-ghen-out | N2qWcmW6D9 | 0.867 s / 40 | 236.2 -> 255 | 0.10 | 3.41 |
| muu-back | KLpUFWlkqp | 0.333 s / 56 | 236.4 -> 255 | 0.00 | 2.13 |
| ghen-back | u5WxhtkQLD | 0.733 s / 50 | 237.4 -> 255 | 0.00 | 3.16 |
| m-ghen | BhNuvKQoQR | 0.000 s / 61 | 241.4 -> 255 | 0.01 | 3.84 |
| act-ghen-out | KLpw2M8kqp | 0.200 s / 58 | 241.5 -> 255 | 0.09 | 4.29 |
| ghen | 6AbWOSNiJO | 0.000 s / 61 | 242.1 -> 255 | 0.00 | 4.66 |
| muu | dt4fVlTXSL | 0.000 s / 61 | 242.5 -> 255 | 0.02 | 4.02 |

Checked: disc alpha 255 in every 3rd frame of every re-cut file; holes <= 0.10 %; no green fringe visible (looked at the mid + last
frame of all 13 on magenta and #23232e: discs show their own teal / green, no purple tint, no green halo); last BACK frame matches the
old file (= the still seal; alpha diff ~2-5/255 mean = the softer rgb-key edge). mo-ghen-out: 3 frames (f4, f9, f14) pick the
neighbouring source frame vs the old cut (24->15 fps phase), motion the same.
Sheets (before | after on magenta, worst + mid frame):
https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-mass/sheet-recut-2.jpg
https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-mass/sheet-recut-3.jpg

### Sweep table (min disc alpha over 5 frames, old CDN files, ascending; bold = flagged, now re-cut to 255)

| file | min | file | min | file | min | file | min |
|---|---|---|---|---|---|---|---|
| m-muu-back | **190.2** | act-ghen-back | **222.1** | mo-ghen | **222.4** | muu-out | **225.2** |
| m-binh | **234.2** | m-binh-out | **234.4** | mo-ghen-out | **236.2** | muu-back | **236.4** |
| ghen-back | **237.4** | m-ghen | **241.4** | act-ghen-out | **241.5** | ghen | **242.1** |
| muu | **242.5** | ghen-out | 246.2 | mo-ghen-back | 246.2 | m-ghen-back | 246.5 |
| mo-hanghai-out | 246.7 | act-ghen | 247.6 | mo-hanghai | 247.6 | binh | 248.1 |
| mo-binh | 248.3 | m-ghen-out | 248.7 | mo-binh-out | 248.7 | binh-out | 248.9 |
| mo-hanghai-back | 250.6 | binh-back | 251.1 | m-binh-back | 252.0 | act-hanghai-back | 252.2 |
| buon | 252.6 | buon-out | 254.2 | mo-binh-back | 254.5 | m-act-hungkhoi-out | 254.8 |
| act-gian | 254.9 | act-gian-back | 254.9 | m-chuyentam-back | 254.9 | m-khochiu-out | 254.9 |
| mo-act-chuyentam | 254.9 | mo-act-chuyentam-out | 254.9 | act-buon | 255.0 | act-buon-back | 255.0 |
| act-buon-out | 255.0 | act-chan | 255.0 | act-chan-back | 255.0 | act-chan-out | 255.0 |
| act-choang | 255.0 | act-choang-back | 255.0 | act-choang-out | 255.0 | act-chuyentam | 255.0 |
| act-chuyentam-back | 255.0 | act-chuyentam-out | 255.0 | act-gian-out | 255.0 | act-hanghai | 255.0 |
| act-hanghai-out | 255.0 | act-hon | 255.0 | act-hon-back | 255.0 | act-hon-out | 255.0 |
| act-hothen | 255.0 | act-hothen-back | 255.0 | act-hothen-out | 255.0 | act-hungkhoi | 255.0 |
| act-hungkhoi-back | 255.0 | act-hungkhoi-out | 255.0 | act-khochiu | 255.0 | act-khochiu-back | 255.0 |
| act-khochiu-out | 255.0 | act-lo | 255.0 | act-lo-back | 255.0 | act-lo-out | 255.0 |
| act-so | 255.0 | act-so-back | 255.0 | act-so-out | 255.0 | act-tinhnghich | 255.0 |
| act-tinhnghich-back | 255.0 | act-tinhnghich-out | 255.0 | act-tinhtu | 255.0 | act-tinhtu-back | 255.0 |
| act-tinhtu-out | 255.0 | act-tutin | 255.0 | act-tutin-back | 255.0 | act-tutin-out | 255.0 |
| act-vui | 255.0 | act-vui-back | 255.0 | act-vui-out | 255.0 | an | 255.0 |
| an-back | 255.0 | an-out | 255.0 | buon-back | 255.0 | chan | 255.0 |
| chan-back | 255.0 | chan-out | 255.0 | choang | 255.0 | choang-back | 255.0 |
| choang-out | 255.0 | chuyentam | 255.0 | chuyentam-back | 255.0 | chuyentam-out | 255.0 |
| dau | 255.0 | dau-back | 255.0 | dau-out | 255.0 | gian | 255.0 |
| gian-back | 255.0 | gian-out | 255.0 | hanghai | 255.0 | hanghai-back | 255.0 |
| hanghai-out | 255.0 | hon | 255.0 | hon-back | 255.0 | hon-out | 255.0 |
| hothen | 255.0 | hothen-back | 255.0 | hothen-out | 255.0 | hungkhoi | 255.0 |
| hungkhoi-back | 255.0 | hungkhoi-out | 255.0 | khochiu | 255.0 | khochiu-back | 255.0 |
| khochiu-out | 255.0 | lo | 255.0 | lo-back | 255.0 | lo-out | 255.0 |
| m-act-buon | 255.0 | m-act-buon-back | 255.0 | m-act-buon-out | 255.0 | m-act-chan | 255.0 |
| m-act-chan-back | 255.0 | m-act-chan-out | 255.0 | m-act-choang | 255.0 | m-act-choang-back | 255.0 |
| m-act-choang-out | 255.0 | m-act-chuyentam | 255.0 | m-act-chuyentam-back | 255.0 | m-act-chuyentam-out | 255.0 |
| m-act-ghen | 255.0 | m-act-ghen-back | 255.0 | m-act-ghen-out | 255.0 | m-act-gian | 255.0 |
| m-act-gian-back | 255.0 | m-act-gian-out | 255.0 | m-act-hanghai | 255.0 | m-act-hanghai-back | 255.0 |
| m-act-hanghai-out | 255.0 | m-act-hon | 255.0 | m-act-hon-back | 255.0 | m-act-hon-out | 255.0 |
| m-act-hothen | 255.0 | m-act-hothen-back | 255.0 | m-act-hothen-out | 255.0 | m-act-hungkhoi | 255.0 |
| m-act-hungkhoi-back | 255.0 | m-act-khochiu | 255.0 | m-act-khochiu-back | 255.0 | m-act-khochiu-out | 255.0 |
| m-act-lo | 255.0 | m-act-lo-back | 255.0 | m-act-lo-out | 255.0 | m-act-so | 255.0 |
| m-act-so-back | 255.0 | m-act-so-out | 255.0 | m-act-tinhnghich | 255.0 | m-act-tinhnghich-back | 255.0 |
| m-act-tinhnghich-out | 255.0 | m-act-tinhtu | 255.0 | m-act-tinhtu-back | 255.0 | m-act-tinhtu-out | 255.0 |
| m-act-tutin | 255.0 | m-act-tutin-back | 255.0 | m-act-tutin-out | 255.0 | m-act-vui | 255.0 |
| m-act-vui-back | 255.0 | m-act-vui-out | 255.0 | m-an | 255.0 | m-an-back | 255.0 |
| m-an-out | 255.0 | m-buon | 255.0 | m-buon-back | 255.0 | m-buon-out | 255.0 |
| m-chan | 255.0 | m-chan-back | 255.0 | m-chan-out | 255.0 | m-choang | 255.0 |
| m-choang-back | 255.0 | m-choang-out | 255.0 | m-chuyentam | 255.0 | m-chuyentam-out | 255.0 |
| m-dau | 255.0 | m-dau-back | 255.0 | m-dau-out | 255.0 | m-gian | 255.0 |
| m-gian-back | 255.0 | m-gian-out | 255.0 | m-hanghai | 255.0 | m-hanghai-back | 255.0 |
| m-hanghai-out | 255.0 | m-hon | 255.0 | m-hon-back | 255.0 | m-hon-out | 255.0 |
| m-hothen | 255.0 | m-hothen-back | 255.0 | m-hothen-out | 255.0 | m-hungkhoi | 255.0 |
| m-hungkhoi-back | 255.0 | m-hungkhoi-out | 255.0 | m-khochiu | 255.0 | m-khochiu-back | 255.0 |
| m-lo | 255.0 | m-lo-back | 255.0 | m-lo-out | 255.0 | m-muu | 255.0 |
| m-muu-out | 255.0 | m-so | 255.0 | m-so-back | 255.0 | m-so-out | 255.0 |
| m-tinhnghich | 255.0 | m-tinhnghich-back | 255.0 | m-tinhnghich-out | 255.0 | m-tinhtu | 255.0 |
| m-tinhtu-back | 255.0 | m-tinhtu-out | 255.0 | m-tutin | 255.0 | m-tutin-back | 255.0 |
| m-tutin-out | 255.0 | m-vui | 255.0 | m-vui-back | 255.0 | m-vui-out | 255.0 |
| mo-act-buon | 255.0 | mo-act-buon-back | 255.0 | mo-act-buon-out | 255.0 | mo-act-chan | 255.0 |
| mo-act-chan-back | 255.0 | mo-act-chan-out | 255.0 | mo-act-choang | 255.0 | mo-act-choang-back | 255.0 |
| mo-act-choang-out | 255.0 | mo-act-chuyentam-back | 255.0 | mo-act-ghen | 255.0 | mo-act-ghen-back | 255.0 |
| mo-act-ghen-out | 255.0 | mo-act-gian | 255.0 | mo-act-gian-back | 255.0 | mo-act-gian-out | 255.0 |
| mo-act-hanghai | 255.0 | mo-act-hanghai-back | 255.0 | mo-act-hanghai-out | 255.0 | mo-act-hon | 255.0 |
| mo-act-hon-back | 255.0 | mo-act-hon-out | 255.0 | mo-act-hothen | 255.0 | mo-act-hothen-back | 255.0 |
| mo-act-hothen-out | 255.0 | mo-act-hungkhoi | 255.0 | mo-act-hungkhoi-back | 255.0 | mo-act-hungkhoi-out | 255.0 |
| mo-act-khochiu | 255.0 | mo-act-khochiu-back | 255.0 | mo-act-khochiu-out | 255.0 | mo-act-lo | 255.0 |
| mo-act-lo-back | 255.0 | mo-act-lo-out | 255.0 | mo-act-so | 255.0 | mo-act-so-back | 255.0 |
| mo-act-so-out | 255.0 | mo-act-tinhnghich | 255.0 | mo-act-tinhnghich-back | 255.0 | mo-act-tinhnghich-out | 255.0 |
| mo-act-tinhtu | 255.0 | mo-act-tinhtu-back | 255.0 | mo-act-tinhtu-out | 255.0 | mo-act-tutin | 255.0 |
| mo-act-tutin-back | 255.0 | mo-act-tutin-out | 255.0 | mo-act-vui | 255.0 | mo-act-vui-back | 255.0 |
| mo-act-vui-out | 255.0 | mo-an | 255.0 | mo-an-back | 255.0 | mo-an-out | 255.0 |
| mo-buon | 255.0 | mo-buon-back | 255.0 | mo-buon-out | 255.0 | mo-chan | 255.0 |
| mo-chan-back | 255.0 | mo-chan-out | 255.0 | mo-choang | 255.0 | mo-choang-back | 255.0 |
| mo-choang-out | 255.0 | mo-chuyentam | 255.0 | mo-chuyentam-back | 255.0 | mo-chuyentam-out | 255.0 |
| mo-dau | 255.0 | mo-dau-back | 255.0 | mo-dau-out | 255.0 | mo-gian | 255.0 |
| mo-gian-back | 255.0 | mo-gian-out | 255.0 | mo-hon | 255.0 | mo-hon-back | 255.0 |
| mo-hon-out | 255.0 | mo-hothen | 255.0 | mo-hothen-back | 255.0 | mo-hothen-out | 255.0 |
| mo-hungkhoi | 255.0 | mo-hungkhoi-back | 255.0 | mo-hungkhoi-out | 255.0 | mo-khochiu | 255.0 |
| mo-khochiu-back | 255.0 | mo-khochiu-out | 255.0 | mo-lo | 255.0 | mo-lo-back | 255.0 |
| mo-lo-out | 255.0 | mo-muu | 255.0 | mo-muu-back | 255.0 | mo-muu-out | 255.0 |
| mo-so | 255.0 | mo-so-back | 255.0 | mo-so-out | 255.0 | mo-tinhnghich | 255.0 |
| mo-tinhnghich-back | 255.0 | mo-tinhnghich-out | 255.0 | mo-tinhtu | 255.0 | mo-tinhtu-back | 255.0 |
| mo-tinhtu-out | 255.0 | mo-tutin | 255.0 | mo-tutin-back | 255.0 | mo-tutin-out | 255.0 |
| mo-vui | 255.0 | mo-vui-back | 255.0 | mo-vui-out | 255.0 | so | 255.0 |
| so-back | 255.0 | so-out | 255.0 | tinhnghich | 255.0 | tinhnghich-back | 255.0 |
| tinhnghich-out | 255.0 | tinhtu | 255.0 | tinhtu-back | 255.0 | tinhtu-out | 255.0 |
| tutin | 255.0 | tutin-back | 255.0 | tutin-out | 255.0 | vui | 255.0 |
| vui-back | 255.0 | vui-out | 255.0 |  |  |  |  |
