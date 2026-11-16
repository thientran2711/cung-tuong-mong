# fig-cutout-clean (art worker, Foreman C)
## STEP 0 — transparent generation test (16/11)
- Magnific `gpt-2-6` lists `transparentBackground: true`; no extraSettings. Prompting "fully TRANSPARENT background" via images_generate with the old figure as image reference gave a true RGBA PNG (2048x3072, ~59% alpha 0, no flat backdrop).
- Sample: fig-consort-c05-t5-a18. Left = old CDN webp (373x900), right = new, each on dark + light. Face, pose, outfit kept; edges clean, no dark fringe/halo seen; sleeves opaque enough. File: step0-before-after.jpg.
- Notes: output aspect follows request (2:3 asked; old file is 373x900 = narrower, so keep ratio of the old figure when requesting). Minor ornament drift vs old (headdress/fan details) — acceptable for re-cut, check per image.
- Cost ~65 credits per 2k figure.

## STEP 1/2 — findings so far (interim, 16/11 ~21:20Z)
- Luân hồi identity card uses origin art (img/origin-wide-*.webp, scenes) + the player figure fig-player-look{1-4}-t*-a* (20 files). Those 20 look clean (pastel, hands joined); I could NOT match the owner's photos (maroon/green/beige/lilac girls with raised hand / scroll / book / peony) — the refs photos and fig-cutout-root.md were not on the branch when I looked. Those poses are the CONSORT figures (fig-consort-cNN-<look>-aXX), e.g. c05-t5 (raised hand) used as the Step-0 sample.
- Figure inventory (assets.json): 8,770 fig-* files = maid 4836, consort 2976 (32 consorts x 24 looks x 4 ages), eunuch 480, kid 216, men ~170, others. ALL native height <= 900 px (so any display > 900 css-px tall is upscaled = soft face).
- Auto scan (tools/scan1.py: dark edge px, semi-alpha dark ring, translucent interior, enclosed holes). Partial result on 1,265 files: dark semi-transparent ring (ringdark > 600) hits ~48/56 of EVERY consort 'ty1..ty8' look (young-consort plain gowns) and nothing else; interior translucency ~0 everywhere except player-look (4 files, benign sheer sleeves). Visual proof: ty-fringe-c05-ty3.png (grey halo along sleeve/hair, soft face). Maids not yet split by look.
- Back-turned / looking-over-shoulder visual flags (a18 contact sheets, low res, still to confirm at 100%): c20-ty1..ty8 (body in profile, head to camera), c02-ty1..ty8 (same), c08-ty1..ty8, c02-ngheo, c02-t1, c06-t3; c03-ty1..8 + c09-ty1..8 have a hand at the brow (check anatomy). Sheets: sheet-c20-backpose.png. Remaining sheets c11–c32 + maids/eunuchs/kids not yet looked at.
- Other: c12-tm0 has a ragged left skirt edge (cut-out artefact); c10-t8 train very wide.
- Scan still running locally (4 procs, ~1.2k/15min is slow, scipy-bound); tools/scan1.py + allfigs.txt are here so a helper can split the list. NEXT: finish scan, look at c11–c32 sheets + maid/eunuch sheets, then credit estimate for failing set only (ty family alone = 32x8x4 = 1,024 files; regenerating at a18 only + reuse for ages is NOT possible: ages differ, so ~65 credits x failing files).

## HANDOVER (worker -> successor; opened by Foreman C) — 16/11 ~21:00Z
START_CTX not recorded; rolled over for context. Read: CLAUDE.md, START_CORE/WORKER/ART, this file, Foreman C's messages below.
- Foreman C order: NO batch repaint before the owner sees the Luân hồi before/after. Helper session scans maid/eunuch/kid (will message you). C9 worker does huadian LAST (only forehead px); you regenerate+upload FIRST and tell C9 the exact file names. Owner method: "vẽ cái hình người này mặc cái bộ đồ này, đưa cái ảnh mẫu lên là được rồi" = same person/outfit/body, never change proportions/costume.
- Regeneration recipe (works): creations_upload_image(url=CDN webp) -> images_generate(mode gpt-2-6, prompt "Redraw this exact same full-body figure ... fully TRANSPARENT background ...", references=[{type:image,identifier}], aspectRatio match old file (e.g. 2:3 was too wide vs 373x900; use ~2:5? try custom width/height keeping old ratio), resolution 2k) -> creations_wait -> download render.png URL -> scale DOWN to 900 px tall -> webp -> look on dark+light -> CDN same name (cdn_sync tooling; CLOUDFLARE token proxy-injected). Python urllib gets 403 from the CDN: use curl.
- CONSORT back-turned/over-shoulder (confirmed on sheet-ty3-all32.png, ty row, same pose for all ty1..ty8 and ages): c02, c08, c14, c20, c26 (+c32 3/4 profile, borderline) -> repaint in calm standing pose (angled ok). Also seen on a18 sheets: c02-ngheo, c02-t1, c06-t3 (low-res, confirm). Hand at brow / on chest, anatomy to check at 100%: c03,c09,c15,c21,c27 ty (hand at brow), c14-ty (hand on chest), c04/c10 ty (hand holds sleeve). c10-t8 very wide train; c12-tm0 ragged left skirt edge.
- Dark halo (scan): ringdark>600 on ~48/56 of every consort ty1..ty8 (all 32 consorts x 8 looks x 4 ages = 1,024 files); no other consort look; maid split by look pending (maid ringdark>150: 245/637 in partial). Interior translucency ~0 (only player-look 4 files, sheer sleeves, benign). Holes: 38 consort / 31 maid files flagged (holes>=6 or >3000 px) — most are legit arm gaps; look at them.
- Seen clean on a18 sheets: c01, c03–c07, c09, c11, c13, c15 (kc/ngheo/t1-8/tcold/tm0-4 poses fine, hands ok at sheet scale).
- NOT done: sheets c16–c19, c21–c25, c27–c32 full (only ty row seen), maids/eunuch/kids (helper), a26/a36/a51 age files (assumed same pose as a18), scan to finish (local process; tools/scan1.py + tools/allfigs.txt; results scan-partial.jsonl is a partial dump), Luân hồi before/after for owner, CDN upload, review/fig-cutout-clean code branch (none needed yet).
- Credit math: ~65/figure at 2k (try 1k/medium quality to cut). Failing set so far: ty family 1,024 + back-turned consort non-ty ~3 looks x4 ages + maid TBD.

## OWNER SAMPLE (successor, 16/11) — Luân hồi before/after
- Files: luanhoi-sample-c20-c02-ty3-{dark,light}.jpg (order: c20 before | c20 after | c02 before | c02 after). Same recipe (upload CDN webp -> gpt-2-6 edit, transparent, 672x2160 2k, 65 credits each).
- After: calm front-facing standing pose, hands joined at waist, same face/hair/pin/gown colour, feet+shoes fully visible, no halo on dark or light. Before: body in profile/looking back + grey halo along sleeve/hair.
- Note: gown sleeves are slightly wider/looser than the old sprite (pose change); face/outfit kept. NOT uploaded to CDN yet — awaiting owner verdict. Scratch masters: render.png 672x2160 (CDN webp target 900 tall).
- Scan split/consort sheets c16–c19, c21–c25, c27–c32: pending.

## SCAN FINISHED + FAILING LIST + CREDITS (successor, 16/11 ~21:30Z)
Consort sheets c16–c19, c21–c25, c27–c32 viewed (a18; looks ty3,t1,t5,tm0,ngheo,kc): all non-ty looks frontal/clean, no back-turn, no visible anatomy fault at sheet scale. ty3 is a calm frontal pose for c16,c17,c18,c19,c21–c25,c27–c31 (hands at chest/brow/skirt; no L/R fault seen at sheet scale; fingers not checked at 100%). c32-ty3 = 3/4 profile, borderline (repaint with the back-turned set to be safe).
Combined failing set (consort scan + helper-scan.md):
| set | files | fix | credits @65 |
|---|---|---|---|
| consort ty, back-turned (c02,08,14,20,26,+32) 6x8x4 | 192 | new calm pose | ~12,500 |
| consort ty, halo only (26 consorts x8x4) | 832 | plain re-cut/regenerate | ~54,100 |
| maid ty back-turned (m03,08,...,48) 10x8x4 | 320 | new calm pose | ~20,800 |
| maid ty, halo only | 1,342 | plain re-cut/regenerate | ~87,300 |
| everything else (consort non-ty, other maids, eunuch, kid, men) | ~8,100 | none (false-positive flags) | 0 |
| TOTAL | 2,686 | | ~174,600 (account has ~1.28M) |
Local free rim-fix tested (local-rim-fix-test-c05-ty3.jpg: left original, right fixed, dark+light): removes the halo but notches hair strands and cheek edge -> NOT acceptable at face level. Recommendation: regenerate transparent (same recipe as the sample) for all 2,686; cut cost by doing ONE age (a18) per look first, then a26/a36/a51 as separate edits only if the owner wants the age differences kept (ages differ in face; cannot copy a18). Alternative to test (not yet): 1k resolution to roughly halve cost — display height <=900px so 1k (1536 tall) suffices; verify face sharpness first.
Batch waits for the owner's verdict on luanhoi-sample-c20-c02-ty3-*.jpg.
