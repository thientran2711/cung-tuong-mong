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
<<<<<<< HEAD

## ROUND 2 (owner feedback ~14:15Z) — sha **aed1c258**
1. Icon REDRAWN as a GROUP of 3 (man, woman, child), Magnific gpt-2-6, flattened to the unknown-fig grey; `img/kit/unknown-ico-n.webp` 192 px tall x ~145 wide (overwritten on CDN; the old single-figure icon is gone).
2. Chip text is "+N" again: `[group] +2` (`j59chipIco`).
3. Chips at the TRUE bottom corners (6 px in). A side column / rail moves the chip beside it (flush, 2 px) ONLY if its height reaches the chip's y-range; on Fold and iPad the column stops above the bottom, so both chips sit in the real corners. The "step up over a name chip" fallback stays in code but fired 0 times in the scan (5 sizes x 30 places x 2 pages; scan counts it).
4. Place header: "Ngọc Thanh các [group] 5" via `j59hdrCount()` (same `j59ico()` as the chip). Longer stage lines keep their rest ("[icon] 5 · Càn Ninh cung: …"); "Không gặp ai." (0 people) stays text — decision for main if she wants "[icon] 0". Scan fails on any header still reading "Ở đây còn…".
Tests: `node dev/test/morechip-scan.js` → MORECHIP OK, step-ups 0, ON column 0 at all 5 sizes. KIT 33.9 updated.
Shots (CDN img/_review/morechip-sil/, old ones wiped): fold.jpg, ipadAir.jpg, ipadPro.jpg, iphone14.jpg, icon-group.png. Looked at Fold + iPad: header icon+number inline after the name, chips in true corners.

## ROUND 3 — sha **d51137ff**
Header count "Ngọc Thanh các [plaque: group icon + N]" now sits in the same light kit chip plaque (`.kchip.j59hchip`, background #fff8ee, 2 px border, shadow) as the corner chips, so it reads on dark scenes (every place header, via j59hdrCount). Scan MORECHIP OK at 5 sizes. Shots re-uploaded to img/_review/morechip-sil/ (fold.jpg, ipadAir.jpg, ipadPro.jpg, iphone14.jpg, curl 200).
=======
>>>>>>> 61f334cd (review kit-ico-rank-r2 report: PASS aaa1bec1)
