# PROGRESS — review/veil-zoom (item D25)

Task: every overlay drawn on a face (veil `kveil2`, scar `kscar`, slap `kslap`, rash, makeup layers `kmk*`) must follow the portrait's zoom/crop in EVERY
place that shows a face. Before: the veil/scar box sat off the face in the tall and small portrait frames.

## Cause (two faults, one family)
1. **Portrait frames (header avatar, person card, dialog column, strips, Tuần lục avatars, small frames):** jkpor sets a per-picture zoom z (1.00–1.14),
   lift L and shift D on `img.kpor`, but the overlay box `.kfxc > .kfx` was still the OLD fixed 1.14 cut (`left:-7% top:-5.7% w/h:114%` of the window).
   Whenever z < 1.14 (consorts 1.078, maids 1.086, mamas 1.090, … 5 744 pictures) the veil/scar/slap sat 3–12 % of the layer width off the face.
2. **Stage figures:** `.kfxf` (jk2b) is laid over the figure image; jface copies the figure's `translateX(-50%)` onto it with
   `parentElement.querySelector("img.kfxon")` — for HER box (host = `#stage`) that is the FIRST `.kfxon` figure on the stage, i.e. an NPC token when
   one stands there. Her veil/scar then sat half a figure to the right (box width 233 px, offset 109 px at 755x1000).

## Fix (shared positioning, no per-place variant)
- `dev/build/jkpor.js` `kporFx(img,G)`: where jkpor writes the picture's z/L/D, it also writes `--kxl/--kxt/--kxw/--kxh` (the picture box in window units)
  on the `.kfx` next to that picture and adds `.kfxz`; one CSS rule `html body .kfxc>.kfx.kfxz{left:var(--kxl)!important;…}`. Every layer inside
  (veil, scar, slap, rash, makeup) follows the picture because they are %-boxes of that `.kfx`. Pictures without jkpor data (face-*, unknown) keep the old box.
- `dev/build/jk2b.js` `put()`: `s.__fig=img` (the figure this `.kfxf` belongs to). `dev/build/jface.js`: copies the transform of `s.__fig` (fallback `:scope>img.kfxon`).
- KIT.md §28.8 documents it. Old saves: no save data touched.
- Not changed (already exact, measured): kitFaceZoom / makeup reveal (picture and layers share one box), figure cut-ins (`kesfi`), Tuần lục figures.

## Scan: `dev/test/veil-zoom.js`
Gives herself + every consort a veil, a known scar, a rash and a slap; makes every person "known" (no grey silhouette); then opens: main (header avatar, strips, stage),
person card, dialog person column, kitFaceZoom, makeup reveal (figure + mirror zoom), a gallery of herself/consorts/elders (tall `pcPort` + small `mdH` frames), a
gallery of up to 8 por files per family spread over their zoom range (~100 pictures, tall + small frame), and every page of the Tuần lục book.
For every overlay layer it takes the picture's DRAWN rectangle (object-fit/position/zoom as on screen), the fit % from the same tables the game uses
(`img/veil-fit.json`, `img/scar-fit.json`), and compares expected box with the real box (px, unrotated, sub-pixel). Pass: offset ≤ 6 % and size ≤ 4 % of the layer width.
Sheets caught mid-flip (3D matrix on an ancestor) are counted, not measured.
Usage: `node dev/test/veil-zoom.js <url> <W>x<H>@dpr [outdir]` or `… <url> - [outdir] --host <device>` (needs dev/test/lib/device.js of review/ua-test-r1).

## Before / after (layers measured · failing)
Direct mode 755x1000, one scan = ~800 layers (random consorts; gallery = ~100 pictures × tall + small frame). "err" = worst offset of a layer box from where the fit data says, in % of the layer width.

| place (box type) | layers | FAIL before | worst err before | FAIL after | worst err after |
|---|---|---|---|---|---|
| portrait frames: header avatar, person card, dialog column, strips, small frames, Tuần lục avatars, galleries (`.kfxc>.kfx`) | 750 | 750 | 31.9 % (size 14 %) | 0 | 1.1 % |
| stage figures, her own (`#stage>.kfxf`, NPC token on stage) | 33 | 18 | 351 % (half a figure) | 0 | 1.0 % |
| figure cut-ins / Tuần lục figures (`.kesfi>.kfxf`) | 15 | 0 | 1.1 % | 0 | 0.8 % |
| kitFaceZoom / makeup reveal mirror (`.kfzoom-i>.kfxf`) | 3 | 0 | 1.0 % | 0 | 1.0 % |

All devices, whole scan (layers · FAIL): 

| viewport | before | after |
|---|---|---|
| 755x1000 direct | 812 · 768 | 812 · 0 |
| 1180x820 direct | 798 · 768 | 870 · 0 |
| host fold (755x1000 design) | 848 · 804 | 924 · 0 |
| host iphone14Land (1180x820 design) | 820 · 789 | 870 · 0 |
| host ipadPro | 798 · 753 | 798 · 0 |

Other tests re-run after the change: dev/test/appearance-port.js 1180x820 (rash/ill/poison/slap/pen layers, weekly passes): no errors, no 404s.
Mid-flip book sheets (3D matrix) are not measured (5–17 layers per scan, counted in `skipped3d`).

## Screenshots (looked at)
`dev/handover/reports/` has no images (rule: images stay out of git). Looked at: 6 pictures zoom 1.078–1.086 before/after (veil lay over mouth/chin, below the nose
bridge; now centred between nose and chin with the cheek scar on the cheek), header avatar, person card, dialog, kitFaceZoom, Tuần lục.
