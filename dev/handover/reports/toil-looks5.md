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

## v18 (owner 17/11 19:55Z on v17): Vung B blush smaller + blurred edge
Branch review/toil-looks5 **6a3c1ef9**. TOIL_MKS.vungB: `r` .23 -> **.18** (blush radius = x face width; Doan trang .165, Kieu diem .2, Khuynh thanh .21), new `bp:"soft"` = new profile BLP.soft [[0,.82],[.25,.6],[.5,.3],[.75,.09],[1,0]] (longer blurred outer edge; wide was [[0,.8],[.3,.62],[.62,.27],[1,0]]); `bl` .78 colour strength unchanged. Vung A and the other looks untouched. Code: jtoil.js (TOIL_MKS.vungB, BLP, one `T.bp?` branch in the blush call).
Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks/lod-v18-head.png (same layout as v17b). CAVEAT: her face is not the v17 one (c11); the game picks her face per run and I could not pin it (this sheet is consort c01 tcold, same file for all six cells, so the comparison inside the sheet is fair).
Measured on the sheet crops (pixel delta of R-G vs Mat moc at the cheek centres, 160 px crop at @2): redness Doan trang 21.7 -> Kieu diem 27.9 (+29 %) -> Khuynh thanh 31.4 (+13 % over Kieu diem, +45 % over Doan trang); Vung B 45.9 (colour strength kept, owner). Blush half-width at 50 % of peak: Vung B 7.5 px, Doan trang 7.8, Kieu diem 9.5, Khuynh thanh 9.8 (before: B was r .23 = 1.4x Doan trang). Tests: quickcheck PASS 154 s, core gates PASS, old save ok.
Old CDN sheets still there: lod-v17b-head.png, lod-v18-head.png (delete after verdict).

---

# v19 (blush final, s38 worker) — 17/11 ~22:20Z
PRIORITY #1 CHECK ('toil blush bl'): OD L1721 (owner pick row 3) | ledger 0 | claims toil-looks9 (archived) | main 0 | review/toil-looks5 v18 6a3c1ef9, review/toil-looks9 e227451c (sampler)

Branch review/toil-looks5, head **2712920c** (on origin). Based on origin/main 99f3978d (merged, not rebased).

## What
- Merged origin/main 99f3978d into v18. One real conflict, dev/build/jtoil.js (kept both sides: main's TOIL_PLATE + porG, branch's toilMkReady/mkWait); index.html / sw.js / assets.json regenerated by build_site.sh.
- Blush ladder (owner OD L1721, row 3 "Rat nhe"): new BAL.toil.blush = {dep:.2304, tuyet:.2428}; TOIL_MKS.dep.bl / tuyet.bl read it. No other place hard-codes these values (grep). NOTE: BAL.toil lives in dev/build/jtoil.js (not jbal*.js); the key sits there with the other toil numbers. No face-fit / makeup-point file touched.
- Sampler dev/measure/toil-blush-room.js (from review/toil-looks9 e227451c) re-render: today row = Doan 16.6 / Kieu 17.0 (+2 %) / Khuynh 17.5 (+3 %) R-G; row 3 "Rat nhe" 16.6 / 17.0 / 17.4 -> matches. Looked at the sheet: ladder reads as row 3.

## Tests
- QUICKCHECK PASS at 2712920c: open 1491 ms, old save ok, core gates PASS (one-core-guard PASS, rules-one-source, kit-conform), perf new/live render 228/209, tab 393/364, buoi 833/827 (median of 1); earlier runs of 3: render 174/180, tab 367/368, buoi 901/901.
- Shots (looked at): Fold 755x1000@2 and iPad 1180x820@2 of her room, no errors, blush soft, nothing clipped.
  - https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks5/room-fold-755x1000.png , https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks5/room-ipad-1180x820.png , https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks5/room-ladder-check.png (sampler sheet)
  - (CDN review folder img/_review/toil-looks5/ — wipe after the verdict: python3 dev/site/cdn_sync.py --wipe-review toil-looks5)

## Extra owner sheets asked by MAIN s38 (nothing shipped changed)
- Doan trang steps: https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks5/doan-trang-steps.png; vua bl per row: 100 % .2100 (R-G 16.9) | 80 % .1730 (13.6) | 60 % .1373 (10.2) | 40 % .1019 (6.9) | 20 % .0649 (3.5). Scripts dev/measure/toil-doan-steps.js. BAL vua untouched until she picks.
- Blush hue: https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks5/blush-hue.png. Root cause (measured on cheek centres): bare cheek 237,196,177 (hue 19, sat 25); pink blush 238,128,144 at low alpha renders 238,180,171 (hue 8, sat 28) = peach. Pipeline does not push toward orange; blush is weak + pale pink on yellow skin. Cooler probe magenta 226,120,160 renders hue 0. Rows: today 8.3 deg | cam anh hong 242,118,122 10.1 | cam anh do 236,96,86 11.9 | between 240,107,104 11.0. Scripts toil-hue-probe.js, toil-hue-sheet.js. Awaiting her pick / direction (more pink vs more red).
- Wrapper used to render (no separate server): node script starting an in-process http server over the worktree, then spawning the sampler (not committed; trivial).

## Scan table (blush values)
| place | before | after |
|---|---|---|
| TOIL_MKS.dep.bl | .31 (typed) | BAL.toil.blush.dep .2304 |
| TOIL_MKS.tuyet.bl | .35 (typed) | BAL.toil.blush.tuyet .2428 |
| other hard-coded copies | none found | — |

## Handover
None needed (context low use). Owner pending: Doan trang level pick, blush hue direction.
