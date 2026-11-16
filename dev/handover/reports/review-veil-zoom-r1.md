PASS 622dffcb7ea2dc7a338adf93d9125853c0126cdc

# Review D25 veil-zoom (r1)
Branch review/veil-zoom @ d3782535 merged onto current origin/main (5e5c4128) as review/veil-zoom-r1 @ 622dffcb7ea2dc7a338adf93d9125853c0126cdc (contains origin/main; main can fast-forward).

## Merge
- Main had refactored kitFigFx into the shared kitFxPut (podium). Conflicts in jk2b.js / jface.js resolved by taking main's code and re-adding the D25 line (`s.__fig=img` in kitFxPut; jface copies `s.__fig` transform). index.html / sw.js / assets.json regenerated with dev/site/build_site.sh (no markers left).

## Checks
- dev/test/veil-zoom.js on the merged build: 755x1000@2 963 layers 0 fail (final run after the second merge); earlier merge: 755x1000@2 848/0, 1000x755@2 903/0, 1366x1024@2 901/0, 1180x820@2 clean. Covers every .kfxc>.kfx place and #stage / tok>kfxf stage figures with NPC tokens (mama token + her own box both ok). 3D mid-flip sheets counted only (10-17).
- dev/test/appearance-port.js 1180x820@2 and 755x1000@2: errs [], bad [].
- Boot at 844x390 and 390x844 (rotate prompt shown): 0 page errors, no horizontal overflow.
- Old save: dev/test/chap-label-oldsave.js (save made on main, loaded in the branch build) loads v1/v2/v3, no errors.
- Screenshots looked at: main stage (veil + scar on her face next to the cung nu token), person card, dialog column, galleries (veil/scar on faces across zoom range), header avatar, rotate prompt. Veil/scar sit on the face.
- Kit: only the existing overlay box (KIT 28.8) was fixed; no new part, no private CSS/frames; one rule for every place. Scan covers all portrait frames, so no per-place variant. No player-visible text changed (VANPHONG n/a). No numbers touched (ONE CORE n/a). No art.

## KIT KEEPER NEEDED
Please confirm the KIT.md 28.8 "Zoom-follow" note and the jkpor kporFx / .kfxz change (a reviewer may not approve kit changes). It only fixes the existing overlay box alignment.

Not covered: real touch / iOS Safari; pictures without fit data (nothing drawn, by design).
