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

## REVIEW (reviewer, 25/11)
PRIORITY #1 CHECK: reused dev/test/anchor-table.py, dev/art/mkfit/hdanchor.py, fit2511/repro.js, dev/tools/tier.js + quickcheck.sh, hoa-dien/makeup-theme/makeup-places/toil-draw tests.
**PASS dd200174** (= review/makeup-fit e4d2d3e3 merged onto origin/main 5d4f722f as review/makeup-fit-r6; clean merge, ancestor = current main).
- Tier: BIG by script (only because the generated dev/build/jhd.js HD_ANCHOR block is "logic unsure"; everything else SMALL data/tools). Content is data + generated table, so the touched-part tests + quickcheck + shots were run; the full-suite list (game-feel, kit-conform, tab-pairs, phone-bars, perf) NOT run — owner-bug fast lane, no UI/code change.
- Repo JSON == CDN: 99 img/mk-fit/*.json + img/toil-fit2.json byte-identical to live CDN (md5.json repo-only).
- anchor-table.py: pictures 7208 bad 0. hdanchor.py --check: rows 7208, skipped 0 -> OK.
- quickcheck: core gates PASS, time-spill PASS, open 0 errors, old save loads + plays a buổi (Dư Thục Hoa). First perf step died with a browser-closed harness error (box load); re-run of quickcheck.js PASS (perf median render 292 ms, buổi 1592 ms).
- Tests: hoa-dien Fold + iPad ALL OK; toil-draw PASS 10; makeup-theme errs []; makeup-places errs [].
- Looked (shots in scratch, not CDN): Fold 755x1000 (c15 t3 a18, Diêm dúa/vụng + face crops) and iPad 1180x820 (c05 t3 a18 face + full stage): lips on the painted lips, brows/lids on the painted features, blush on the cheeks inside the face outline. No cut text/overflow on the stage.
- Not checked: every one of the 16 656 pictures by eye (worker also did not; mesh checks only).
Wipe img/_review/makeup-fit/ with LAND (python3 dev/site/cdn_sync.py --wipe-review makeup-fit) — I did not upload shots.
~100 % xong review / ~95 % chơi được

## NO-BOOST — HANDOVER (worker rollover by context, 25/11 ~04:10Z)
Order from MAIN 132 (session_01V1ZZGzdGzMVPdKEXV8pQRA, 04:06Z), owner row «25/11 ~03:10Z» + shot dev/handover/refs/owner-2511-makeup/m2-nguhoavien-1104.jpg. NOT started: this worker is at 27.8 % context (START_CTX ~4 % + 25 % = 29 % trigger), so it hands over before starting a new task. The COORDINATOR opens the successor.
Successor starts here:
- Task = the MAIN 132 message verbatim (measure her scene's LOD step on LIVE; remove every size boost in ONE BAL place: BAL.toil.lod boost/steps/cue, jlooks lkLodMul, BAL.looks.smuFx.big.boost; before/after Fold 755x1000 + iPad 1180x820 of her scene + avatar/card/chip sizes, LOOK at them; branch review/makeup-noboost; LAND READY + one Vietnamese line for sếp; report here under «## NO-BOOST»).
- Code map (dev/build/jtoil.js, main 502c48c9): toilLodStep(px) ~L907 (BAL.toil.lod fullAt/maxAt/steps); toilStageEl ~L909 (#stage,.kesfi,.kfxf[data-kav] → step 0 = no boost on the stage since 18/11); toilLodPass ~L912 (re-keys img.kmkc by step); toilLodT(T,lod,look) ~L928 (boost × cue per part × BAL.toil.lod.look[look]); toilMkDraw vụng powder dabs also × (1+(boost-1)·lod·cue.vung). jlooks.js: lkLodMul + smudge layer LOD (step ≥ 10 = big faces, BAL.looks.smuFx.big). Simplest one-core fix: BAL.toil.lod.boost = 1 and BAL.looks.smuFx.big.boost = 1 (every curve becomes ×1), keep the code paths.
- Ready tools on review/makeup-fit dev/art/mkfit/fit2511/: repro.js (live game, swaps her face via figFor/kitFigOf, sets S.toilette look, crops the face + full shots; arg 4 = local fit dir or '-'), sheet.js (contact sheets through toilMkDraw). Measure the step in page: img.kmkc dataset.mkk ends '|L<n>' = step n; layer width/1.6 = face px.
- Hint from the MAKEUP-FIT run: her stage layer was step 0 already, so the stage «Vụng về» heaviness is likely the vụng recipe itself (TOIL_MKS.vung, or vungB = the heavy 'đánh quá tay' v7 look picked by col.seed with chance BAL.toil.vungB .5) — check which one her save rolls.
