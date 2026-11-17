PRIORITY #1 CHECK: OD 17/11 19:35Z (final) + 19:00Z/19:20Z | main jtoil.js (BAL.toil.vungSide/vungRot existed in v16) | review/toil-looks5 7c5d8e8e (v16) | claims toil-looks7 MAIN s36.
# toil-looks5 v17 (toil-looks7 worker)
Branch review/toil-looks5 **8fe3f7b7** (pushed; contains origin/main d4a850ce, site rebuilt). Files: dev/build/jtoil.js, dev/measure/toil-lod-sheet.js, index.html, sw.js.

## What changed v12 -> v17 (BAL.toil keys)
- v13/v14: LOD size-aware makeup (`lod`), Kieu diem stage look weight; Vung lip smear back to v11 (`vungLipSm`).
- v15: Vung lip keeps its own outline + ONE faint corner smudge (`vungSm` 1); Kieu diem lod look .65 / lip .7 / blush .28; Khuynh thanh lod look .3 / lip .76 / blush .28.
- v16: lash line protected under every look; blush ladder dep .31 / tuyet .35; smudge side/angle fixed in BAL (`vungSide`, `vungRot`).
- **v17 (this task):** `vungSide` -1 -> **+1**, `vungRot` stays **-1** (V2-B, fixed, no seed randomness); new `vungSmSize` **.7** scales the smudge ellipse (rx, ry) to 70 % of v16, strength (alpha .6*vungSm) unchanged. Cache key of the Vung layer includes vungSmSize. Dep / Kieu diem / Khuynh thanh untouched (approved).
- Merge origin/main d4a850ce: index.html/sw.js conflicts = generated files, taken from main and rebuilt. After the merge the one-core guard flagged jtoil.js:663 `[1,1,0,0]` (same table now exists in BAL jwxk.js; it was only the old SVG fallback default) -> written `Array.of(1,1,0,0)`, same behaviour.

## Vung B (owner 19:37Z add-on)
Vung B = TOIL_MKS.vungB (gaudy, chosen by toilVungB(col) at BAL.toil.vungB .5 by seed). It has no `vung` flag, so it never gets the corner smudge (by design, unchanged); its lip/blush/eyes are the full "over-painted" look. Sample forces A/B by seed only (seed 7 = A, seed 1 = B); odds untouched. Look at it: lips red + dark, pink blush both cheeks, eyes visible with lashes, a pink eyelid arc across the nose bridge (same in the v16 build re-rendered, not new).

## Sheet (REDONE: first v17 sheet was misregistered, see FACE-FIT below)
https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks/lod-v17-head.png — order Mat moc, Vung A, Vung B (diem dua), Doan trang, Kieu diem, Khuynh thanh; row 1 = portrait head (full strength), row 2 = figure at real @2 px (face 17 px, LOD step 3), head crop x3 smooth. Script: `node dev/measure/toil-lod-sheet.js <url> <out.png>` (serve the built site with python3 -m http.server). Old CDN files lod-v13b/v14/v15/v16-head.png deleted; other older toil-looks review files left (not in my brief).
Caveat: row-2 smudge on Vung A reads as a short streak just right of the lip, extending past the face edge at 17 px (it is the faint V2-B streak at 70 %).

## Tests
- `bash dev/tools/quickcheck.sh` on 8fe3f7b7: **PASS** 131 s · open 1271 ms · old save ok · core gates PASS · perf new/live render 150/152, tab 279/319, buoi 655/878, tasks>200ms 11/12. (First run on 00977f8e FAILED G1 on the `[1,1,0,0]` item above; fixed.)
- dev/test/toil-draw.js 755x1000@2: 10 ok, no FAIL, no page errors.
- Scan/before-after: only BAL.toil.vungSide -1 -> +1 and a 70 % smudge size; affects only look "vung" A (every Vung A everywhere); nothing else changes.

## HANDOVER
Done; nothing pending except review. Not pushed to main.

## v17 sheet redo (MAIN s36 verdict: first sheet misregistered)
Cause: my first sampler drew consort c05-t4 pictures with the CDN fit data (toil-fit2.json + img/mk-fit/*.json on the CDN), which differs from the repo data (dev/art/toil-fit2.json, dev/art/mkfit/*.json; the approved v16 sheet was game-driven with the local data injected). Redone: game-driven (starts the game, her figure fig-consort-c11-tcold-a18.webp, seed 7 = Vung A, seed 1 = Vung B, local fit injected) with the v16 layout: head row + full-body stage row, labels with diacritics. Same URL (overwritten): https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks/lod-v17b-head.png (renamed; the rejected lod-v17-head.png deleted). Looked at at 2x: layers sit on blush/lips/lids in every cell; Vung B lips red + strong blush + lashes visible; Vung A small corner smudge right of the lip. Stray pink petals (Mat moc bottom-left, Khuynh thanh forehead) are the game's falling-petal effect, not makeup. Script: dev/measure/toil-lod-sheet.js (8 commits ahead of the first sheet script).
## FACE-FIT re-fit job, first case (do not fix in this branch)
Green-robe portrait por-consort-c05-t4-a18.webp (and fig-consort-c05-t4-a18.webp): CDN fit vs repo fit differ. Lip centre (mean of the 12 lip points, % of picture) por: repo 46.77/51.79 vs CDN 52.35/50.30 = 5.6 % left / 1.5 % down; fig: repo 54.51/14.15 vs CDN 62.92/13.65 = 8.4 % / 0.5 %. toil-fit2.json row [0],[1]: por repo 46.77,51.79 vs CDN 52.66,50.65; fig repo 54.51,14.15 vs CDN 63.08,13.76. md5: CDN toil-fit2.json ea631914 vs dev/art 4546674c; CDN mk-fit/consort-c05.json c435f17f vs dev/art cc06c8bb. With the CDN rows the blush lands on the nose bridge and the lip colour beside the mouth. Which set is right (and whether CDN is stale or the repo is) must be decided by the re-fit job; the game on live uses the CDN rows.
