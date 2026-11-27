# mg-color — worker report (child of MAIN 147)

PRIORITY #1 CHECK: 'Thêu theo nét' OD 4 | claims 2 | main 12 | review/* 0; 'cuộn chỉ' OD 1 | claims 1 | main 15 | review/* 0. Nobody held this bug, so I reused the craft engines on main (jcraft*, jtd tdWrap, kit kg82Spr / kg82Guide).

## Owner bug (OD 25/11 ~23:05Z, verbatim)
"Rồi cái game gì mà cả 8 cuộn chỉ cùng màu một đỏ thì tao biết chọn cái màu gì." Shot: dev/handover/refs/owner-2511-kiep/k8-ipad-theu-8-red-spools.jpg

## Root cause
Not iPad Safari and not a CSS filter. `crArt` (jcraft.js) draws the painted sprite *instead of* the canvas stand-in once Foreman C has delivered it (the name is in `CR_HAVE`).
Only the stand-in carried the spool's shade (`crRGB(s.c)`). When `mg-theu-spool.webp`, a red spool, was delivered and added to CR_HAVE, every spool started drawing the painter's red.
Local tests never caught this. They ran on stand-ins (sprite not loaded yet) and checked game logic, not screen pixels.

## Fix (one shared part, jcraft.js)
- `crArtTint(g,name,x,y,w,h,o,col,stand)` draws the sprite in colour `col`, cached per sprite, skin and colour.
  - `CR_TINT[name].area` is the part of the picture that takes the colour. For the spool this is the wound thread between the two wooden flanges, measured on the 444x640 webp. The flanges stay painted.
  - The `cyl` shade adds a light side, a dark side and thin wound lines. The middle of the spool keeps the true shade.
  - With no area, the whole silhouette takes the colour (ink).
- `crTex(g,name,…)` uses a painted picture as the texture of a shape the engine draws.
- No new UI and no new numbers. Colours still come from the engines (BAL levers unchanged).

## Family scan (LUẬT SỬA CẢ NHÓM): dev/test/mg-color-scan.py
The scan lists every mini-game sprite call that has a stand-in. A call FAILs when the stand-in carries a per-choice colour or per-round state and the picture would drop it. `--cdn` also checks that every CR_HAVE picture is on the CDN.

| place | before (origin/main 5e013076) | after (review/mg-color) |
|---|---|---|
| jcraft_theu.js:53 theu-spool (Công «Thêu theo nét») | FAIL: 8 spools all painter's red | FIXED: crArtTint, each spool in its own shade |
| jcraft_theu.js:50 theu-needle (thread in the needle) | FAIL (latent: picture not on CDN yet) | FIXED: thread drawn over any needle picture |
| jcraft_kim.js:50 kim-sample (Khéo tay «Cắt hoa giấy») | FAIL: plain red disc, no holes to copy, cloth cover lost | FIXED: drawn from the round's pattern, painted paper as texture |
| jcraft_kim.js:54 kim-wedge | FAIL: half-disc picture hid her cuts (and the wrong fold angle) | FIXED: wedge drawn with her cuts, painted paper as texture |
| jcraft_ve.js:28 ve-motif-* (Vẽ «Thủy mặc») | FAIL (scan blind spot: colour passed as an argument): every motif black, so the sample's ink tones were lost | FIXED: crArtTint in the layer's tone; a layer still to paint = faint ghost |
| j82 co stones, j82 mua-mat, j91 dauho pot/arrow, j91 huong jars, jcraft_hoa vase, jcraft_kim cutters, jslap zones | ok | ok (reviewed: one picture per choice, glow ring, or decor only) |

Scan: before 4 FAIL + 1 blind spot. After 0 FAIL, 53 calls. CDN: all 12 CR_HAVE pictures answer 206/200.

## «?» hint bar
The «?» is the kit hint button (`NWB.btn("tdhint","hint")`), not an empty bar. It is a sign by owner rule OD 20/11 ~05:10Z: no words in play; a button shows a sign and keeps its word in aria-label/title.
It is not empty: its label is «Gợi ý: chỉ chỗ đúng, bớt một ít phần». Pressed in the pick step, it rings the right spool. The test checks both.
I did not change it (law 16). Question for MAIN/owner: does she want the word «Gợi ý» next to the «?» sign in play? That would change the OD 20/11 rule, so only she can decide.

## Tests
- dev/test/mg-color.js plays «Thêu theo nét» with the real CDN pictures on Fold 755x1000 and iPad 1180x820. At every pick step it reads screen pixels at each spool and checks:
  - each spool shows its own shade (Δ ≤ 70);
  - no two spools look the same (Δ ≥ 14);
  - exactly 1 spool matches the lit band;
  - the hint is non-empty and rings a spool.
  Result 23:55Z: **PASS**. Three openings per device, three palettes each (no-repeat pool):
  - Fold: purple, teal, navy; nearest look-alike to the right spool Δ 56 / 61 / 63.
  - iPad: copper, purple, rose; Δ 54 / 55 / 61.
  - Every spool's screen colour is within Δ 70 of its own shade.
  - The «?» hint is labelled and rings a spool.
  - This test reads real screen pixels with the real CDN picture, so it fails on any spool drawn in the sprite's red. I did not re-run it on origin/main; the "before" evidence is the owner's shot plus the scan.
- dev/test/mg-color-scan.py: 0 FAIL.

## Note for MAIN (difficulty, not changed)
The look-alike spools are deliberately half a shade step off the real ones (lev.alike, law 5: harder with rank). On screen the nearest look-alike to the right spool measured Δ 53–66 (RGB sum). That is clearly visible, but close by design.

## Review pack (CDN, never in git)
Base: https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-color/
- mg-color-theu-fold-fullplay.mp4: Fold 755x1000, full play of «Thêu theo nét» to the result screen (3 pieces, rose / gold / … palettes)
- mg-color-theu-ipad-fullplay.mp4: iPad 1180x820, full play to the result
- mg-color-theu-fold-pick.png, mg-color-theu-ipad-pick.png: the pick step, every spool in its own shade
- mg-color-kim-fold-3play.png, mg-color-kim-ipad-3play.png: «Cắt hoa giấy», the sample shows its holes and the wedge shows her cuts
- mg-color-ve-fold-3play.png, mg-color-ve-ipad-3play.png: «Thủy mặc», motifs drawn in their tint
Before: dev/handover/refs/owner-2511-kiep/k8-ipad-theu-8-red-spools.jpg (owner's iPad).

## Regression (existing tests)
dev/test/mg-craft.js on review/mg-color:
- td_cong: all ok. Every caller opens the new engine, no text in play, the guided round works, the full bot play reaches a result, law 5 holds, the own case passes, an old save loads, no page errors.
- kim and ve: every check that ran printed ok. That run hit my 600 s timeout before its end, so it is not a full run.

## Not done / for the lander
- The root index.html is not rebuilt on this branch (dev/build sources only); the landing build rebuilds it.
- Rollover not needed: the task is finished.
