# MARKFIX — beauty-mark fix by code (0 credits, 0 gens)
Worker MARKFIX for Foreman C ROOT session_01D3E3NWtCdQC92tFLkd25H5. Owner: "sửa bằng code ... dò cho đúng vị trí".

## Truth used
- Approved face = FACE_MAP_L703 `cut` (background-removed). For s33/s36 the cut is a separate "markfix" version (differs from `gen` exactly at the mark), so the CUT is the truth for all 17.
- Face-picture side: s16, s17, s37 = mark under picture-LEFT eye; s18, s33, s34, s35, s36, s38, s43, s44, s45, s56, s58 = picture-RIGHT eye.
- **s57, s59, s60: the approved face picture has NO beauty mark at all** (checked at 5x + contrast; gen and cut identical). Side taken from the prompt words + group rule (picture-RIGHT, same as coordinator's s59 demo). FLAG for foreman/owner: if she prefers "no mark" for these 3, the fix is heal-only (1 minute, same script).
- Spot: measured on 8 approved faces (s33 s34 s36 s38 s43 s45 s56 s58): mark centre = inner eye corner (lower-left eyeliner tip of the picture-right eye) + (0.194, 0.018) x face width, i.e. straight below the outer corner, ~9 px below the lower lid at t7/t8 scale. Where a hair strand lay on that spot it was nudged ≤5 px sideways onto clear skin and kept ≥6 px below the lower lid (never on hair, never on the eye line). Every placement checked at 10x and 4x.

## Classification (34 pictures)
OK (26): s16 t7/t8, s17 t7/t8, s18 t8, s33 t7/t8, s34 t7/t8, s35 t7/t8, s36 t7/t8, s37 t7, s38 t7/t8, s43 t7/t8, s44 t7/t8, s45 t7/t8, s56 t7/t8, s58 t7/t8.
Fixed (8):

| id | t | status | old xy (removed) | new xy (placed) | mark pixels from |
|---|---|---|---|---|---|
| s18 | 7 | EXTRA (2nd mark picture-left) | 476,318 | — (right mark 602,299 kept) | — |
| s37 | 8 | EXTRA (faint speck picture-right) | 626,348 | — (left mark kept) | — |
| s57 | 7 | WRONG SIDE | 466,313 | 583,284 | her own mark (moved) |
| s59 | 7 | WRONG SIDE | 481,330 | 591,307 | her own mark (moved) |
| s57 | 8 | WRONG SIDE (faint left) | 457,366 | 572,336 | her own t7 mark |
| s59 | 8 | MISSING | — | 588,333 | her own t7 mark |
| s60 | 7 | MISSING | — | 582,334 | s58 t7 mark (s60 has none anywhere) |
| s60 | 8 | MISSING | — | 575,330 | s58 t8 mark |

Marks copied at native size (face-size ratios 0.93–1.03, no rescale needed); pasted multiplicatively so the dot takes the target skin tone. Removal = OpenCV Telea inpaint of the dark-pixel mask.

## Files
- Fixed pictures: dev/handover/review-sheets/rank8-t78/fixed/<id>_t<n>_a18.webp (originals untouched)
- Per-picture before/after: fixed/<id>_t<n>_markfix_before_after.jpg; overview: fixed/MARKFIX_sheet.jpg ("TRƯỚC | SAU")
- Log: fixed/markfix_log.json. Scripts: dev/art/beautymark/markfix_batch.py, markfix_sheets.py
- Cut-outs: none of the 17 people have files in dev/art/rank8-t78/cut/ → nothing to apply.

## Notes
- s57 t7 / s59 marks are her own painted dots, which are lighter than s58's; s60 uses s58's darker dot.
- s16 face cut also has a tiny forehead speck (not in scope, untouched).
- Gens used: 0. Gate: n/a (no prompt).
