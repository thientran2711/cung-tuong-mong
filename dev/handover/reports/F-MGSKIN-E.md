# F-MGSKIN-E — mini-game skins, batch 2 (co7, tc, xa, thq, td_dung, td_ngon, td_hanh) — 24/11
PRIORITY #1 CHECK: brief F-mgskin.md + BATCH 2 NOTES read | CDN index: img/mg/* has batch 1 only (ban banh co dan dauho hoa huong kim theu ve); no co7/doi/mua/tho skins | resolver kg82SkinSrc names the file after the BOARD (NWQ_BG in jnwq.js, TD_BG in jtd.js) → reuse, paint only new boards.
START_CTX ~4 % (own estimate); finished far below +25 %.

## Board map (inheritance, from origin/main)
- co7 → own board mg-co7-bg (DOM board, KG82_BOARDBG) → PAINTED (co7)
- tc → NWQ_BG banh → inherits banh skins (batch 1)
- xa → NWQ_BG doi → PAINTED (doi), 1024x1024
- thq → NWQ_BG mua → PAINTED (mua), shared with td_dung
- td_dung → TD_BG mua-bg-hoc → same file as mua skins (img/mg/mua-<id>.webp)
- td_ngon → TD_BG tho-bg-hoc → PAINTED (tho), 1024x1024 (tho-bg and tho-bg-hoc both → img/mg/tho-<id>.webp)
- td_hanh → TD_BG ve-bg-hoc → inherits ve skins (batch 1)
Not painted on purpose (game meaning): doi-slip, tho-slip, mua-fan, mua-bell (pieces); tc/xa sprites (ingredient, brush, thread...). Painted decorative sprite: mua-mat (the round cushion pad; colour follows the carpet).

## FOR MAIN MGSKIN co7 keys
kind=co7 skins: xuan(dao, «Xuân viên»), ha(ngoc, «Hạ trì»), thu(kim, «Thu các»), dong(mac, «Đông điện») | boards: img/mg/co7-xuan.webp co7-ha co7-thu co7-dong | sprites: none | sheet https://ctm-img.victoria-tntt.workers.dev/img/_review/f-mgskin/co7-sheet.jpg | gens: 4 (WDSSEXBcXe, SyvvW6nUb8, p8PP5aDehw, vQGGS1va47)
Note: DOM board (kitBoardBg key co7). Table, bowls, tea tray, shelves identical in place.
## FOR MAIN MGSKIN xa keys
kind=xa: inherits doi board. skins: xuan(dao, «Xuân bích»), ha(ngoc, «Hạ bích»), thu(kim, «Thu bích»), dong(mac, «Đông bích») | boards: img/mg/doi-xuan.webp doi-ha doi-thu doi-dong (register the skins under the board kind the resolver uses — check kitMgSkinAdd keys: the engine kind is xa, the file is doi-<id>) | sprites: none | sheet .../doi-sheet.jpg | gens: 4 (6A55BeviJO, p8PP5btehw, gOhhYYnSXO, ksdd3Rm16B)
Note: centre panel stays blank, pillars + scrolls in place.
## FOR MAIN MGSKIN thq + td_dung keys (one board, painted once)
kinds=thq, td_dung: skins: xuan(dao, «Xuân đình»), ha(ngoc, «Hạ liễu»), thu(kim, «Thu đình»), dong(mac, «Đông tuyết») | boards: img/mg/mua-xuan.webp mua-ha mua-thu mua-dong | sprites: img/mg/mua-mat-xuan.webp mua-mat-ha mua-mat-thu mua-mat-dong (474x480 RGBA, matches carpet tone; td_dung also draws mua-mat; banh-pot already skinned in batch 1) | sheet .../mua-sheet.jpg | gens: 9 (UPaacVYwny, IfRRLSptvE, IfRRs4ItvE [thu redo, muted], 3zkk8foREY; mat: u5ccyYIQLD, u5ccycmQLD, oviijRb829, 5jppiBsKxe; first thu yiQQDoDPW9 rejected: too orange)
Note: carpet ellipse + border pixel-same place; only tone changes.
## FOR MAIN MGSKIN td_ngon keys
kind=td_ngon: inherits tho board. skins: xuan(dao, «Xuân sân»), ha(ngoc, «Hạ sân»), thu(kim, «Thu sân»), dong(mac, «Đông sân») | boards: img/mg/tho-xuan.webp tho-ha tho-thu tho-dong | sprites: none | sheet .../tho-sheet.jpg | gens: 4 (IfRRLJBtvE, SyvvWXuUb8, LwIIGe4swO, s7ttzX2l8e)
Note: paper table + inkstone unchanged in place.
## Inheritance lines
tc: inherits banh skins. td_hanh: inherits ve skins.

## Facts
Model gpt-2-6 only, 1k, each a reference EDIT of the default; results in Personal (folder ba4aecfe not visible). All outputs same pixel size as default (co7 1024x768; others 1024x1024). Boards 96–249 KB (WebP q82). Uploaded to CDN; nothing in git.
Looked at every picture (side-by-side with default, 3 sheets re-read from the CDN). Layout compared by eye against default: anchors identical.
NOT DONE: full-screen Fold/iPad in-frame shots via KG82.preSkin (Law 12) — only contact sheets; mua-mat sprite larger than 40 KB (~50 KB; default is 87 KB). Wiring note: the skin lists are keyed by kind, files by board — THIN P1 must map xa→doi, thq/td_dung→mua, td_ngon→tho.
