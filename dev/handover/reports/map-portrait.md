PRIORITY #1 CHECK ('map-portrait|kshR|fit-all|data-sky'): OD 13:12Z (verbatim read) + 12:12Z/12:25Z/12:35Z | reports/map-me-mark.md §3-§5 + review-map-me-mark-r1 (PASS a86ea58c) | git grep origin/main + review/*: kshR layout only in jk3/jmapc/jplfs/j59 (j59ph phone variant is switched OFF, `ph=false`), no sky art on the CDN index (only mo-wx-* icons, fx/*) | claims: review/map-portrait only.

# map-portrait — worker session_01UV1SzgdgEdCimFsVYDscwL — SẴN SÀNG KIỂM `c34e99e3` on `review/map-portrait` (base review/map-me-mark-r1 a86ea58c, no force-push)

## What (KIT §85.8, kit parts only; nothing private; landscape iPad unchanged)
Files: `dev/build/jmapc.js` (CSS + sky + kit-page sample), `dev/build/j38.js` (mapFit), `dev/kit/KIT.md` §85.8, new test `dev/test/map-portrait.js`, generated index.html/assets.json/sw.js.
1. **Card rows (html.kv1 = every portrait size).** `#kshR` on the overview map is ONE grid over the leather (pointer-events none). Row above (right of the rail, under the tools row) = the 4 people cards `.k3cs>.k3c`, 4 equal columns, same height. Row below = Ân sủng `.kas` (its 6 rows in 2 columns) + Nguy hiểm chung `.k3py`, same height. Same kit cards, no new DOM. Compact form when `#kshR` < 620 px (container query, not a media query; media-check 0): avatar hidden, type .66/.64 rem; Fold keeps the avatars.
2. **Map zoomed.** mapFit reads the REAL row heights (re-checks next frame, redo ≤3x), `fit = max(1, freeH*aspect/pageW)`: full width between the rows, pan sideways. Open view centred on her place; if her place + every visible "!" place fit in the page width, centred on that span. Labels `KMAP_MLS_ONE=[1,1.12]`: kit size or bigger, no shrink below 1; colliding low-priority labels hide (.sm first).
3. **Sky.** `data-sky` on `.mapv` (kmSkyKey: S.wx.k → KIT_SKY, + `night` in buổi tối) → one CSS gradient per weather kind painted on `.mapsc` (zenith/middle/horizon + light clouds + night veil), `KMSKYBG` = one value shared with the kit page swatches (`.kmsky`, KIT_SAMPLES "§85.8 trời Dư đồ"). Weather particles unchanged (kfStageRect = .mapsc rect = whole page area under the rows).
4. Cartouche "Dư đồ" 76 px on kv1 (the tools row wrapped at 390).

## Before / after (host build, file://, LOOKED at every shot)
| size | before: map w / zoom / labels shown | after | rows |
|---|---|---|---|
| Fold 755x1000 | 689 px, z .92, 15 of 29 @ 11 px | 1029 px, z 1.38, **20 of 29 @ 13 px**, her place + '!' in view | cards 4 above / 2 blocks below, map 574 px tall |
| 412x1058 | 346 px, z .86 | 1133 px, z 2.8 | avatars hidden, 4 cards one row |
| 390x844 | 324 px, z .85 | 749 px, z 1.97, 8 labels @ 13 px (tiny screen: more zoom would fit more, owner call) | same |
| iPad port 1024x1366 | (not measured before) | map full width, her place centred | rows as Fold, avatars kept |
| iPad 1180x820 | map 959x535, column 139 px | **identical** (959x535, column 139 px, margin 56; 24 labels) | unchanged |
| 1366x1024 | | unchanged (test PASS, kv2) | unchanged |
Weather skies LOOKED at on Fold: rain (grey), sun (blue), snow (pale grey), mist (default build), clear + buổi tối (night veil).
Shots (CDN `img/_review/map-portrait/`, base https://ctm-img.victoria-tntt.workers.dev/): before-{755x1000,412x1058,390x844,1180x820}.jpg, after-{755x1000,412x1058,390x844,1180x820,1024x1366,1366x1024}.jpg, after-755x1000-{rain,sun,snow,night}.jpg. NOTE 412/390 phone portrait normally shows the "Xoay ngang" prompt; I hid only that toast in the harness.

## Gates (host build, file://; quickcheck needs a local server = denied here, not run)
| check | result |
|---|---|
| map-portrait.js (new): kv1 cards one row/same size above, blocks one row/same height below, nothing over the map, map full width, fits free height, her place in view, 0 overlaps, sky per weather incl. night; kv2 column unchanged | PASS 755x1000, 412x1058, 390x844, 1024x1366, 1180x820, 1366x1024 |
| map-frame-kit.js (not changed, still valid: 0 overlaps def/+1/+2, slip, tools above, courtyard) | PASS 755x1000, 1180x820, 1366x1024 |
| map-full.js (map box = 100 % page w/h, tools + columns inside) | PASS 5 sizes (no edit needed: it measures the `.mapsc` box, still 100 %) |
| stage-side.js (Hành sự stage columns) | 20 FAIL on this build AND 20 FAIL on the untouched a86ea58c index.html (same file:// harness) = pre-existing, not from this change |
| place-fs.js 755x1000 | ran, no error |
| media-check / img-allowlist (build_site) | OK, 0 breakpoints |
| page errors | 0 in all runs |

## Notes for main / owner
- **Not changed:** the courtyard level (`.kpmv`, the palace detail map) and the place-view stage keep the old narrow right column (its bottom `.kpm-list` conflicts with a bottom row). Say if she wants the same rows there.
- Sky is visible only in the bands between the rows and the faded map edges (on Fold the map fills most of the area, as asked: zoomed in). It reads at the top band behind the tools row.
- 390x844: only 8 labels at 13 px (tiny height). If wanted, a lower portrait floor (e.g. .9) shows ~14.
- Rail buttons stay left of the top card row (row starts 50 px in).

## ART REQUEST → Foreman C (painted weather skies for the portrait Dư đồ)
Need 12 painted skies to replace the CSS gradients (same keys as `KIT_SKY` in jmapc.js: sun, dust (clear), petal, leaf, wind, mist, rain, storm, snow, snowh, frost, snowp) + a night variant of each (or one night veil). Format: 755x1000 portrait-friendly, seamless left/right, horizon at the bottom 15 %, soft painted clouds, Magnific gpt-2-6, style anchor STYLE_ANCHOR.md; name `img/kit/mo-sky-<key>[-night].webp`. Until they exist the gradients are the sky; swapping = change `KMSKYBG` to an image layer, nothing else.
