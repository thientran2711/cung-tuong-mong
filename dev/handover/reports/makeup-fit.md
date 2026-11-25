# MAKEUP-FIT report (worker for MAIN CHÍNH 131, 25/11)
PRIORITY #1 CHECK: OD 114 | ledger 9 | claims 7 (MAKEUP-FIT = this worker) | main dev/art/mkfit/{mkfit,verify,fixtoil,hdanchor}.py, dev/test/anchor-table.py | review/* toil-reveal-fix, mk-colour (older fit passes) — REUSED: mkfit.py MK_IDX/enc, the game painter toilMkDraw/toilRow for every sheet, anchor-table.py, hdanchor.py, cdn_sync.py.
START_CTX ~4 % (estimate; get_session read 0). Finished at ~22 %, no rollover needed.

## Root cause (data, not code)
1. **Stale face points (img/mk-fit)**: Foreman C repainted the pictures after the last fit. Fresh mesh vs the stored points, over all 16 656 women pictures on the CDN (por/fig of consort c01–c32, maid m01–m52, mama k01–k08, Thái hậu h1–h3, player look1–4):
   - off > 0.10 eye-distance: **1 744** (consort 361, maid 1 344, mama 14, Thái hậu 24, player 1) — e.g. all trung y ty4–ty8 (lips painted on the chin/neck, lids on the cheek)
   - off 0.05–0.10: **524**; no points at all: **32** (player looks); within 0.05: 14 356
   - the owner's screenshot (lid colour under the eye, lip red low-left, blush off the cheek) is reproduced exactly by face maid-m01 (fig t1/t3 a18) with the old points.
2. **toil-fit2 rows** (blush size = row face width × look size; mouth = face box): 645 rows had a face width > 20 % off (blush too big/small), 2 846 mouths off the lips, 3 696 pictures had no row.
3. Code mapping checked (toilMkDraw box, toilRow cheeks from the mesh, kfx layer CSS, stage + portrait): correct — with good points the layers sit on the painted features at every size. No code change needed except the generated HD_ANCHOR table (hoa điền spot reads the same points).
   - Note: the 'vụng' look keeps its owner-approved faults (one lip-corner smudge, uneven blush, powder puffs) — now on the right spots.

## Fix (whole family, law 11)
- New two-pass MediaPipe face mesh (whole picture → tight 512 px face crop, re-meshed twice): dev/art/mkfit/fit2511/refit.py; sweep.py (all pictures), build.py (mk-fit + toil-fit2), table.py (all-women anchor table), sheet.js (contact sheet through the game's own painter), repro.js (live game shots), viz.py.
- All 16 656 pictures re-fitted (0 detection failures). toil-fit2: 2 846 mouths re-seated, 645 widths rescaled (median face width 2.45 × eye distance), 3 696 rows added (tilt 0), 9 469 kept.
- Checks: dev/test/anchor-table.py **bad 0** (7 208 consort/player); fit2511/table.py all women **bad 0** of 16 656 (before: 3 785 flagged by geometry alone; geometry cannot see stale-but-plausible points, the displacement numbers above are the real before-count). hdanchor.py --check OK (7 208 rows).
- LOOKED: 5 sheets × 60–71 faces (Diêm dúa = every layer visible) = 315 pictures + 10 faces × all 6 looks + game shots — every layer on the painted lips/lids/brows/cheeks. Not every one of the 16 656 was looked at by eye; the rest rely on the mesh checks (closed-eye maid pictures get lid colour on the closed lid, fine).
- Art note for Foreman C (not makeup): consort c16 t2-a18 has grey blotches on the cheek in the base painting (visible in moc).

## Data (LIVE on CDN)
- Backup of the old data: img/_backup/mk-fit-2511/ (100 mk-fit json + toil-fit2.json) — rollback = copy back + cdn_sync.
- Uploaded img/mk-fit/*.json (100) + img/toil-fit2.json; verified on the live game (Fold) without any route override. SW refreshes manifests in the background: the owner may need to reload once or twice.
- CDN had no new/changed women pictures during the run (index compared before upload).

## Code / review
- Branch **review/makeup-fit @ e4d2d3e3** (base main 502c48c9): dev/art/mkfit/*.json + dev/art/toil-fit2.json (git copies of the CDN data), dev/build/jhd.js HD_ANCHOR block regenerated (72 lines, generated), dev/art/mkfit/fit2511/ tools, on-upload.sh note. SẴN SÀNG KIỂM (SMALL: data + generated table). Not LAND READY until a reviewer passes it.

## Review pictures
https://ctm-img.victoria-tntt.workers.dev/img/_review/makeup-fit/index.html (game Fold + iPad before/after, all looks before/after, 5 after-sheets). Wipe with the verdict.

~95 % xong / ~95 % chơi được (makeup placement)
