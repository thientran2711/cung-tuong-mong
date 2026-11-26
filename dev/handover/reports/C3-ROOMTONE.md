START_CTX ~10 % (own estimate) · worker C3-ROOMTONE (art, sonnet) of Foreman C ROOT 3-1 · credits: 1 755 (13 × 135 gpt-2-6 2k 3:2, folder ba4aecfe…) + 1 rate-limited retry 135 = 1 890 incl. pilot · Part 1 = 0 cr
PRIORITY #1 CHECK: OD 157 (26/11 tone pass YES, toilette redraw YES, law 11) | main rank_rooms_manifest.json (live 256 + new 64 keys) + jres.js resPick | review/* none | claims none | reused: C3-STYLE.md rows B2/C, C3-RANKROOM-r1.md, cdn_sync.py, dev/test/mirror-center.js. No game code changed, no branch review/c3-roomtone needed.

## IMPORTANT FINDING (read first)
The live key `khai-tuong-cung-dong-phoi-<mùa>-<buổi>` (the s16 ANCHOR room sếp likes) was overwritten by the C3-RANKROOM wiring: it now holds a DARK rank room (luma 126, R/G/B 150/121/107). The TRUE anchor survives only as the backup `img/_review/rankroom-backup/khai-tuong-cung-dong-phoi-ha-sang.webp` (luma 146, R/G/B 201/133/103). All fitting used that backup. The same wiring wrote 80 distinct pictures (64 new `*-ha-sang` + 16 old-base `ha-sang`) to 320 live keys (the 16 old bases are byte copies on all 16 mùa×buổi keys, so there is NO time-of-day difference to keep).

## PART 1 — TONE PASS (0 cr, GO from Foreman C 26/11 ~10:29Z, option (a))
Scope: 80 distinct pictures; 19 already light (luma ≥ 139 = the C3-STYLE gap rooms) left untouched; 61 dark pictures changed = 286 live keys (all copies). 
RECIPE (same for all): pooled luma CDF of the 61 dark rooms mapped to the anchor's luma CDF (strength 0.9, 9-tap smoothed LUT), chroma kept proportional (rank colours survive), saturation ×1.10, warm white balance R×1.05 / B×0.94, WebP q82. Layout and content untouched. Code: scratch tools tone2.py (kept in worker container; recipe above reproduces it).
Result: mean luma ~119-133 → ~134-144, floor honey instead of grey-purple. Known limit (told to foreman, taken to MAIN): the dark carved-wood WALLS stay darker than s16 — painted content, only a redraw changes it.
Backups: 286 files at CDN `img/_backup/c3-roomtone/<key>.webp`; REVERT MANIFEST `img/_backup/c3-roomtone/manifest.json` (key, old_md5, new_md5, recipe) → revert = cdn_sync push of the backup file to the same key `img/<key>.webp`. Live md5 of 4 sampled keys checked equal to local.
Pilot sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-roomtone/pilot-1-3rooms-old-new-anchor.jpg ; all 61 looked on two contact sheets, no artefacts.

## PART 2 — 14 TOILETTE ROOMS (gpt-2-6 only)
13 distinct pictures redrawn (toil-mirror-room.webp is a byte copy of c5-phi → same picture). Each = EDIT: image 1 = the old live picture, image 2 = s16 anchor; prompt keeps composition / mirror / screens / richness and demands: light warm cream-peach look, matte honey floor, NO gloss/reflections, NO window curtains (bare lattice), no growing plants (cut-flower vases kept), Chinese, no people. Pilot c5-phi creation LwtIHOgswO, Foreman C LOOKED PASS (top valance banner kept as decor).
Keys changed (live, 1200x800): toil-room-c1-dapung … c8-hoanghau (7 + c5-phi), toil-room-maid1-thosu … maid5-nuquan, toil-mirror-room.webp. Backups: `img/_backup/c3-roomtone/toil/<old name>.webp`. 
MIRROR AXIS: the raw redraws had their mirror axis at x≈602-614/1200 (old 630, game constant TOIL_PLATE.gx=630/1200). Each picture was therefore shifted right by 16-28 px (edge columns mirrored) so the measured axis = 630±0.5 again (table in `toil/axis-shift.json` on the CDN). dev/test/mirror-center.js on the LIVE pictures: Fold 755x1000 plateAxis 629.5, all dc ≤ 2.9 px, mean 1.6, bad 0; iPad 1180x820 dc ≤ 3.3, mean 1.9, bad 0; 0 page errors.
NOTE: code references only `toil-mirror-room.webp` (jtoil.js TOIL_PLATE); the 13 `toil-room-*` files are not referenced by any game code (only precache lists) — redrawn as ordered, no gameplay effect today.
One retry: c4-tan first call died on an OpenAI 429 rate limit (not delivered), re-run once.

## VIDEOS (real stage, 8 rank rooms day+night + 3 toilette reveals per device, 0 page errors)
https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-roomtone-video/ → rankrooms-fold.mp4, rankrooms-ipadAir.mp4 (last 40 s), toilette-fold.mp4, toilette-ipadAir.mp4 + still-*.jpg (?v=1). Fold 755x1000, iPad 1180x820, 1x.

## Status line
~100 % xong / ~85 % chơi được (live pictures swapped; wall darkness vs s16 = open point for MAIN). 
