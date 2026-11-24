# F-MGSKIN-D report (worker sonnet, kinds: hat tho doi doden mua chai hoadien) - 11/24/2026
PRIORITY #1 CHECK: OD 2 | ledger 0 | claims 8 | main 15 (kit-mgskin j82 kitMgSkinAdd/kg82SkinSrc, j79 kitBoardBg reused) | review/* 2 | archive 0. Batch 1 files existed in img/mg/ (ban banh co dan dauho hoa huong kim theu ve); none of mine did.
START_CTX ~6 % (own estimate); finished well under +25 %. No handover needed.

## Method
- Board per skin = gpt-2-6 EDIT of default `img/kit/mg-<kind>-bg.webp` (default passed as reference), 1024x1024, same layout; WebP q78-82, all <= 240 KB. Layout check (low-pass correlation with default on lower 60 %): hat .86-.95, tho .98-1.0, doi .91-.97, doden .76-.94 (floor only changes light), mua .95-.98 (red carpet identical in place), chai .97-.98 (mirror, table, boxes, combs identical). Looked at every board side by side and as Fold-aspect + iPad-aspect cover crops (sheets).
- INHERITANCE: hoadien draws chai-bg (KG82_SPR.hoadien=["chai-bg"]) -> hoadien inherits chai skins, paint nothing. Boards painted once: hat tho doi doden mua chai (6 x 4 = 24).
- `-bg-hoc` exists for tho and mua; it is a DIFFERENT default painting (tho: study desk, mua: pavilion hall). As in batch 1, each skin is built from `-bg` and also serves `-bg-hoc`; engines draw their own surfaces over it.
- Sprites skinned: doden-lantern (body colour + painted motif, cartouche kept), mua-fan (silk painting + tassel). Cut with images_remove_background, bbox-cropped, fitted to default pixel size (384x560, 244x360), checked on dark + cream. NOT skinned on purpose (carry game meaning or are shared text tiles): hat-lotus (target flower), tho-slip / doi-slip (text tiles shared by banh/nwp), mua-mat (stepping spots), mua-bell and doden-panel (no engine use), chai-brow/puff/rouge (tools).
- NOTE for wiring: doden-lantern skins carry a painted motif in the cartouche (default cartouche is blank). If an engine writes text/numbers in the cartouche, wire the default lantern for that use or tell Foreman F and I repaint a blank-cartouche version.
- NOTE for Foreman F: jts.js (du ho / tha den) draws hat-bg and doden-lantern; kind duho (batch 2 worker G) inherits hat skins, and any kind drawing doden-bg/doden-lantern or mua-fan inherits these.
- Magnific: model gpt-2-6, folder ba4aecfe… not visible on this account -> results in Personal. Refs uploaded: hat-bg Doyybuwpcl, tho-bg jU88A3qLD0, doi-bg KLeei9Hkqp, doden-bg jU88A2lLD0, mua-bg ksdd3iC16B, chai-bg lJmmnntgv9, doden-lantern xSoo2AhjfW, mua-fan dt99krYXSL.
- Gens: 24 boards + 8 sprites + 8 background removals = 40, zero redos.
- Real-frame shots via KG82.preSkin NOT made (needs the full assemble tree); sheets = cover-fit crops at Fold 755x1000 and iPad 1180x820 aspect. THIN P1 / reviewer shoot the first wired skin full screen on both devices.
- Sheets (default first, then 4 boards; row 2 Fold crops, row 3 iPad crops of xuan/ha/thu, sprites row for doden/mua): wipe with the verdict `python3 dev/site/cdn_sync.py --wipe-review f-mgskin`.

## FOR MAIN MGSKIN hat keys
kind=hat skins: xuan(dao, «Xuân trì»), ha(ngoc, «Hạ liên các»), thu(kim, «Thu các»), dong(mac, «Đông điện») | boards: img/mg/hat-xuan.webp, hat-ha.webp, hat-thu.webp, hat-dong.webp | sprites: none (hat-lotus is the game target) | sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/f-mgskin/hat-sheet.jpg | gens: boards xuan 6A55BfKiJO, ha 3zkk81QREY, thu CqYY7XWEEy, dong ksdd3kW16B

## FOR MAIN MGSKIN tho keys
kind=tho skins: xuan(dao, «Xuân đình»), ha(ngoc, «Hạ viện»), thu(kim, «Thu viện»), dong(mac, «Đông điện») | boards: img/mg/tho-xuan.webp, tho-ha.webp, tho-thu.webp, tho-dong.webp (serve tho-bg and tho-bg-hoc) | sprites: none (tho-slip is a shared text tile) | sheet: .../img/_review/f-mgskin/tho-sheet.jpg | gens: boards xuan 9ZqqdfuNYZ, ha ksdd3oL16B, thu Doyybzmpcl, dong Syvvc7ZUb8 (xuan is close to the default: it is already a spring scene)

## FOR MAIN MGSKIN doi keys
kind=doi skins: xuan(dao, «Xuân sảnh»), ha(ngoc, «Hạ sảnh»), thu(kim, «Thu sảnh»), dong(mac, «Đông sảnh») | boards: img/mg/doi-xuan.webp, doi-ha.webp, doi-thu.webp, doi-dong.webp | sprites: none (doi-slip is a text tile) | sheet: .../doi-sheet.jpg | gens: boards xuan Bh66rO6oQR, ha nVllfUzYQD, thu 6A55BJRiJO, dong gOhhW7CSXO (changes are mostly light/edge decoration: the central panel is kept untouched)

## FOR MAIN MGSKIN doden keys
kind=doden skins: xuan(dao, «Xuân dạ viên»), ha(ngoc, «Hạ dạ trì»), thu(kim, «Thu dạ viện»), dong(mac, «Đông dạ điện») | boards: img/mg/doden-xuan.webp, doden-ha.webp, doden-thu.webp, doden-dong.webp | sprites: img/mg/doden-lantern-xuan.webp, -ha, -thu, -dong (body colour + painted motif; 384x560) | sheet: .../doden-sheet.jpg | gens: boards xuan 79CCThzJAL, ha p8PP5igehw, thu rgBBZqAxtc, dong p8PPKonehw; lanterns xuan N2bbBc06D9, ha 9ZqqX0VNYZ, thu IfRRsKGtvE, dong eI44kH6dqL (cuts iGKKmX63uK, 6A55tXmiJO, rgBBzZgxtc, O6uudMEynm)

## FOR MAIN MGSKIN mua keys
kind=mua skins: xuan(dao, «Xuân đình»), ha(ngoc, «Hạ liên đình»), thu(kim, «Thu đình»), dong(mac, «Đông đình»), | boards: img/mg/mua-xuan.webp, mua-ha.webp, mua-thu.webp, mua-dong.webp (serve mua-bg and mua-bg-hoc) | sprites: img/mg/mua-fan-xuan.webp, -ha, -thu, -dong (silk painting + tassel; 244x360) | sheet: .../mua-sheet.jpg | gens: boards xuan huAAgRpvqL, ha nVllfOcYQD, thu N2bbXOP6D9, dong WDSSuppcXe; fans xuan gOhhWzsSXO, ha oviijxe829, thu nVllCEgYQD, dong fHnn7yNCDY (cuts 9Zqq8XdNYZ, Td775HRVNR, 6A55t8aiJO, rgBBzGwxtc)

## FOR MAIN MGSKIN chai keys
kind=chai skins: xuan(dao, «Xuân trang các»), ha(ngoc, «Hạ trang các»), thu(kim, «Thu trang các»), dong(mac, «Đông trang các») | boards: img/mg/chai-xuan.webp, chai-ha.webp, chai-thu.webp, chai-dong.webp | sprites: none (brow/puff/rouge are the tools) | sheet: .../chai-sheet.jpg | gens: boards xuan O6uuMCwynm, ha IfRRLW5tvE, thu lJmmnxlgv9, dong LwIIzJDswO

## hoadien: inherits chai skins (same board chai-bg). Register the same 4 ids with the chai names.
