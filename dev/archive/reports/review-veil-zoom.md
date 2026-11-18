# review/veil-zoom — D25 (veil / scar box follows the portrait zoom)

**Branch:** `review/veil-zoom` @ `d37825352f422828b1dc0c2e0a1687d363b1e0f1` (from origin/main 02a0d3f1). Files: `dev/build/jkpor.js`, `jk2b.js`, `jface.js`, `dev/kit/KIT.md` §28.8, `dev/test/veil-zoom.js`, `dev/PROGRESS_veil-zoom.md`, site rebuilt (index.html, sw.js, assets.json). No save data touched (old saves load as before). No PR, main untouched.

## Cause (two faults, one family)
1. **Portrait frames** (header avatar, person card, dialog column, strips, small frames, Tuần lục avatars): jkpor gives every `img.kpor` its own zoom z (1.00–1.14), lift and shift, but the overlay box `.kfxc > .kfx` (veil, scar, slap, rash, makeup layers) was still the old fixed 1.14 cut. Every picture with z < 1.14 (consorts 1.078, maids 1.086, mamas 1.090 …) had its veil/scar off the face by up to 32 % of the layer width (size error up to 14 %).
2. **Stage figures:** her own `.kfxf` box (host `#stage`) copied the transform of the FIRST `img.kfxon` on the stage, i.e. an NPC token when one is on the stage → veil/scar/slap half a figure off (351 % of the layer width).

## What changed (one shared rule, no per-place variant)
- `jkpor.js` `kporFx(img,G)`: where jkpor writes the picture's z/lift/shift it also writes `--kxl/--kxt/--kxw/--kxh` (the picture box in window units) on the `.kfx` next to that picture + one CSS rule `html body .kfxc>.kfx.kfxz`. All layers inside follow because they are %-boxes of `.kfx`. face-* / silhouette pictures keep the old box.
- `jk2b.js` `put()`: `s.__fig=img`; `jface.js`: copies the transform of `s.__fig` (fallback `:scope>img.kfxon`).
- Already exact, left alone: kitFaceZoom + makeup reveal mirror, figure cut-ins (`kesfi`), Tuần lục figures.

## Scan (`dev/test/veil-zoom.js`, run `node dev/test/veil-zoom.js <url> <W>x<H>@dpr [outdir]` or `<url> - [outdir] --host <device>`)
Every person gets a veil + known scar + rash + slap and a real face. Opens: main (header avatar, strips, stage), person card, dialog person column, kitFaceZoom, makeup reveal, galleries (herself/consorts/elders tall + small frames; up to 8 por files per family across their zoom range, ~100 pictures × 2 frames), every Tuần lục page. Compares each layer's real box with the box the fit tables (`veil-fit.json`, `scar-fit.json`) give on the picture's DRAWN rectangle. Pass = offset ≤ 6 %, size ≤ 4 % of the layer width. Mid-flip book sheets (3D matrix) are counted, not measured (5–17 per scan).

## Before / after (layers · FAIL; worst offset)
| place (755x1000 direct) | layers | before | after |
|---|---|---|---|
| portrait frames (all `.kfxc>.kfx` places) | 750 | 750 FAIL · 31.9 % | 0 FAIL · 1.1 % |
| her stage figure with an NPC token | 33 | 18 FAIL · 351 % | 0 FAIL · 1.0 % |
| figure cut-ins / Tuần lục figures | 15 | 0 · 1.1 % | 0 · 0.8 % |
| kitFaceZoom / reveal mirror | 3 | 0 · 1.0 % | 0 · 1.0 % |

| viewport (whole scan) | before | after |
|---|---|---|
| 755x1000 direct | 812 · 768 FAIL | 812 · 0 |
| 1180x820 direct | 798 · 768 FAIL | 870 · 0 |
| host fold | 848 · 804 FAIL | 924 · 0 |
| host iphone14Land | 820 · 789 FAIL | 870 · 0 |
| host ipadPro | 798 · 753 FAIL | 798 · 0 |

Screenshots looked at (before/after, 6 portraits zoom 1.078–1.086, header avatar, person card, dialog, kitFaceZoom, Tuần lục): before the veil sat low over mouth/chin with the scar off the cheek; after it is centred between nose bridge and chin and the scar is on the cheek. Not covered: pictures without fit data (nothing is drawn, by design); real touch/iOS Safari.
Other tests: `dev/test/appearance-port.js` 1180x820 clean (no errors, no 404). The scan needs `dev/test/lib/device.js` (review/ua-test-r1) only for `--host`.

## KIT REQUEST: kit keeper please confirm
Minimal bug fix of the shared overlay alignment (KIT §28.8): the face-overlay box now takes the picture's own jkpor geometry (`kporFx`, `.kfx.kfxz`) and a stage box copies its own figure's transform. One mechanism for every place; documented in KIT.md §28.8. Please confirm.

**SẴN SÀNG KIỂM** (~100% xong cho D25 / chơi được: veil/scar đúng mặt ở mọi khung; chưa thử trên máy thật)
