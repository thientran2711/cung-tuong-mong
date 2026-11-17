# morechip-sil — report (worker, MAIN s32)

PRIORITY #1 CHECK: OD 35 | main j59/j60/j61 stranger silhouettes img/kit/unknown-fig-f|m|k.webp, KIT 33.9 | review/* morechip-corners-r1 a66f274c (base) | claims: row 775 (this worker); no other claim on this icon.

## What
- Branch `review/morechip-sil` = a66f274c + 1 commit **bd3bb284**.
- Icon: **painted** (not derived) with Magnific gpt-2-6 (folder ba4aecfe…): neutral long robe, hair knot, no hat/ornaments. Chosen over deriving from f/m because both existing silhouettes carry gender cues (hairpin/wide sleeves vs official's hat). Result flattened to grey rgb(148) (same tone as unknown-fig, mean 150-155), alpha mask with 1 px soft edge, cropped, 192 px tall → `img/kit/unknown-ico-n.webp` (2.7 KB) on CDN. ONE file, no srcset (srcset would bypass the jcdn CDN fallback that rewrites img.src). Look-checked at 96/192 px and at chip size on Fold/iPad: reads as a standing person; neutral.
- Kit: `j59chipIco(n)` (j59.js) = the only function building the chip's content (icon + bare number, no "+"); `j59chips` uses it for both corners, every place/size. aria-label/title unchanged ("N người ở bên trái/phải · vuốt…"); icon alt="". CSS: chip is flex, padding 3/13/3/10, icon 1.7rem tall. Chip size/placement unchanged (bottom corners, steps off column/name chips).
- KIT.md 33.9 updated (content, icon file, test line).
- Test `dev/test/morechip-scan.js`: now also fails on missing/unloaded/<18 px icon, non-bare-number text, missing aria-label; waits for icon decode. Last run: **MORECHIP OK** (5 sizes × 30 places × page 1/2).

## Scan table (whole family: only one chip place exists, j59chips)
| size | places | with chips | fails before→after |
|---|---|---|---|
| fold 755 | 30 | 27 | 0 |
| ipadAir 1180 | 30 | 28 | 0 |
| ipadPro 1366 | 30 | 28 | 0 |
| pixel 412 | 30 | 27 | 0 |
| iphone14 390 | 30 | 27 | 0 |
(k61SilChip in j61 is dead code returning "" — untouched.)

## Shots (CDN img/_review/morechip-sil/, wipe with the verdict)
fold.jpg, ipadAir.jpg, ipadPro.jpg, iphone14.jpg (crowded home stage; ipadAir shows chips on BOTH sides `[icon] 2`), icon-compare.png (f | m | new, plus chip-size renders). Phone portrait 412/390 shows the game's rotate-phone overlay (existing behaviour), chips verified by scan only there.

## Notes
- Image files not in git (allowlist); only on CDN: img/kit/unknown-ico-n.webp.
- Reviewer: check icon grey vs f/m (mine is flatter, slightly less texture; accepted as icon-size).
