# F-MGSKIN-B report (worker sonnet, kinds: ve theu dan co) - 11/24/2026
PRIORITY #1 CHECK: OD 2 | ledger 0 | claims 8 | main 15 (kit-mgskin j82 kitMgSkinAdd/kg82SkinSrc, j79 kitBoardBg reused) | review/* 2 | archive 0. No img/mg/* existed before this run.
START_CTX ~5 % (own estimate); finished well under +25 %. No handover needed.

## Method
- Board per skin = gpt-2-6 EDIT of the default `img/kit/mg-<kind>-bg.webp` (default passed as image reference), 1024x1024 like the default, same layout/anchors; WebP q82, all <= 225 KB.
- Layout check: low-pass correlation with the default on the lower 60 % (the play area): ve 0.96-1.00, theu 0.94-0.99, co 0.92-0.96, dan 0.70-0.95 (dan floor is an empty glossy plank floor, only the light colour changes). Looked at every board side by side and as Fold 755x1000 + iPad 1180x820 cover-fit crops (ay=1, as kg82Bg). Hoops, paper, marble table, stage floor, inkstone/brush/rest/scroll weights identical in place.
- Sprites: gpt-2-6 edit on white, images_remove_background, bbox-crop, fitted to the default pixel size; checked on dark and cream. Unchanged on purpose: brush, motif stamps, spools, butterfly/cloud/crane/peony, blossom, bridge, go stones/board (game meaning).
- Notes: (1) `-bg-hoc` and `-bg` are two DIFFERENT default paintings; each skin is built from `-bg` (the contest board) and also serves `-bg-hoc`. The engines draw their own surfaces over the backdrop (paper, hoop sprite, stage), so both uses read fine, but lesson rooms (zither room, bamboo window, thread shelf) show the skin's contest scene instead. (2) theu-hoop is 130-145 KB like its default (>40 KB sprite budget, default already was). (3) `dan-tassel` is not referenced by any engine on main (grep), uploaded anyway, wiring optional. (4) xuan boards are close to the default (default is already a spring scene): same garden with morning mist and softer light; the 3 other seasons differ strongly.
- Magnific: model gpt-2-6, folder ba4aecfe-efce-47e2-b53f-30d292091886 (visible, used). Default refs uploaded as creations: ve-bg 1lXXO5Lr4r, theu-bg 0ewwtWmTfW, dan-bg yiQQzO4PW9, co-bg xSooPxgjfW, theu-hoop jU88NdiLD0, ve-inkstone LwII6BGswO, dan-tassel u5cclnCQLD.
- Gens: 16 boards + 12 sprites (+12 background removals) = 28 gens, zero redos.

## FOR MAIN MGSKIN ve keys
kind=ve skins: xuan(dao, name «Xuân thư án»), ha(ngoc, «Hạ trì các»), thu(kim, «Thu các»), dong(mac, «Đông điện») | boards: img/mg/ve-xuan.webp, ve-ha.webp, ve-thu.webp, ve-dong.webp | sprites: img/mg/ve-inkstone-xuan.webp, -ha, -thu, -dong (relief motif follows the season) | sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/f-mgskin/ve-sheet.jpg | gens: 7 boards+inkstone 4+4 cuts. boards xuan jU889nNLD0, ha LwIINSHswO, thu p8PPCrbehw, dong eI44EjpdqL; inkstone xuan 1lXXPQQr4r, ha VXJJan8MMU, thu s7ttirnl8e, dong w4ffAga7EI (cuts 5jppOPvKxe, ksddPNF16B, XmNNHKzBfo, aFzzjULfSh)

## FOR MAIN MGSKIN theu keys
kind=theu skins: xuan(dao, «Xuân viên»), ha(ngoc, «Hạ trì»), thu(kim, «Thu các»), dong(mac, «Đông điện») | boards: img/mg/theu-xuan.webp, theu-ha.webp, theu-thu.webp, theu-dong.webp | sprites: img/mg/theu-hoop-xuan.webp, -ha, -thu, -dong (hoop identical, embroidered scene follows the season) | sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/f-mgskin/theu-sheet.jpg | gens: boards xuan rgBBPWGxtc, ha 0ewwm1PTfW, thu WDSSI1UcXe, dong u5ccs2vQLD; hoop xuan gOhhRQKSXO, ha xSoo9CNjfW, thu eI44unkdqL, dong w4ffAr87EI (cuts gOhhZRzSXO, gOhhZZnSXO, UPaaAGzwny, 79CCzYPJAL)

## FOR MAIN MGSKIN dan keys
kind=dan skins: xuan(dao, «Xuân đài»), ha(ngoc, «Hạ liên đài»), thu(kim, «Thu đài»), dong(mac, «Đông điện») | boards: img/mg/dan-xuan.webp, dan-ha.webp, dan-thu.webp, dan-dong.webp | sprites: img/mg/dan-tassel-xuan.webp, -ha, -thu, -dong (tassel colours; not used by any engine yet) | sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/f-mgskin/dan-sheet.jpg | gens: boards xuan vQGG13Pa47, ha ksddODl16B, thu CqYYjzAEEy, dong 0ewwmU2TfW; tassel xuan aFzzxh8fSh, ha WDSStWecXe, thu dt99FBOXSL, dong LwIIiguswO (cuts LwIIiz7swO, 6A55MobiJO, CqYYsOUEEy, MBOOCKpDCm)

## FOR MAIN MGSKIN co keys
kind=co skins: xuan(dao, «Xuân viên»), ha(ngoc, «Hạ trì»), thu(kim, «Thu đình»), dong(mac, «Đông đình») | boards: img/mg/co-xuan.webp, co-ha.webp, co-thu.webp, co-dong.webp | sprites: none (go stones and board grid carry game meaning; mg-co-board left default) | sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/f-mgskin/co-sheet.jpg | gens: boards xuan lJmmihwgv9, ha eI44ENEdqL, thu mE22KzihJQ, dong EbWWLVouuO

## Not done / for the reviewer
- Real-frame shots via KG82.preSkin (Law 12 full-screen both devices) NOT made: the build needs the full assemble tree; sheets are cover-fit crops of the boards at Fold and iPad aspect. THIN P1 / reviewer must shoot the first wired skin full screen on both devices.
- Sheets live at img/_review/f-mgskin/ (ve/theu/dan/co-sheet.jpg); whoever gives the verdict wipes: `python3 dev/site/cdn_sync.py --wipe-review f-mgskin` (other F-MGSKIN workers share that folder).
