# review-fig-proportion-redo (art worker, Foreman C)
## STEP 1-2: measure + SAMPLE (waiting for owner verdict)
Owner verdict 16/11 20:12Z: previous redo only fixed w/h; heads stayed small vs big shoulders. New metric = HEAD size (Haar face box height as % of figure height, face:shoulder width, chin line %, w/h). Reference band (approved): c01 a26 face 9.8% / face:shoulder .44 / chin 14.0% / w/h .34; c05 10.3% / .51 / 16.3%; c12 10.8% / .51; Thai hau v3 (h1-a51) 9.7% / .43 / 16.0%; Emperor 9.7% / .34 / 16.3% (men have broader shoulders: .34-.36).
Previous redo (rejected): man p03-a51 face 8.1% / .33 (head too small); women f04 9.8%/.47, f01 9.4%/.44 (heads OK-ish, shoulders padded).
New sample (edit with refs [approved ref at same scale, old figure as identity], gpt-2-6 3:4, bg removed): f04 10.0%/.49, p03 9.4%/.36 (chin 16.6% = Emperor 16.3%), f01 10.3%/.51.
Sheet: dev/handover/reports/fig-proportion-redo/sample-sheet.jpg (ref | gốc | lần trước | mới, same height, numbers under each).
Honest notes: detector is a Haar face box (noisy, relative only); women's dresses drifted slightly lighter/flowing toward the c01 body (needed to narrow shoulders).
Cost ~ 6x40 + 6x3 = 258 credits.

## SAMPLE v2 (after owner verdict 16/11 20:20Z: ✓ previous-round costumes, ✗ my lighter robes)
Rule: start from the PREVIOUS round's pictures (live on CDN), keep costume/pose/face/colours exactly, change ONLY the proportion. Method: gpt-2-6 edit, image 1 = previous figure (identity, "keep exactly the same picture"), image 2 = approved reference at same scale (c01 / Emperor), prompt "only head ~15-20% larger, shoulders narrower". Sheet: sample-sheet-v2.jpg (ref | previous | fixed, same height, numbers).
Numbers (face height % / face:shoulder / chin %): f04 9.8/.47/15.9 -> 10.6/.53/17.8; p03 8.1/.33/14.1 -> 10.2/.44/17.6 (Emperor 9.7/.34/16.3); f01 9.4/.44/15.1 -> 10.7/.52/16.9 (c01 9.8/.44/14.0).
Honest: heads now ~5-10% LARGER than the reference (safe side; could be toned to ~10%), man's shoulders now narrower than Emperor (face:shoulder .44 vs .34). Costume patterns/colours preserved. Cost 6x40+3x3 = 249.

## SAMPLE v3 (owner verdict on v2: heads too big, bodies too small; NO numbers in prompts)
Method (owner's words): gpt-2-6, image 1 = approved reference figure (c01 / Emperor) = body/height/proportions to copy; image 2 = previous-round figure (face + checked costume); prompt: "draw this person wearing this outfit with exactly the same body, height and proportions as the reference figure". No numbers anywhere. Sheet: sample-sheet-v3.jpg (reference | previous | new, no numbers). Cost 6x40+3x3 = 249.

## SAMPLE v4 (owner rejected v3; method = her words: base image IS the approved reference figure)
gpt-2-6 edit: image 1 = approved reference (c01 / Emperor) = the body, never redrawn; image 2 = previous-round figure (face + checked costume). Prompt: keep image 1's body/height/head size/shoulders/stance; replace only face+hair and clothes with image 2's. Sheet: sample-sheet-v4.jpg (reference | previous | new, no numbers). Cost 249. Note: women inherit c01's arm pose (beads at chest).

## OWNER RULE relayed 16/11 21:24Z (applies to the v4 batch once she OKs it)
ONE skin tone for everyone (STYLE_ANCHOR fair porcelain), PAINTED never code-tinted; use the approved c01 face as the fixed skin reference in every generation (v4 already uses c01/Emperor as the base image; in the batch also pass the c01 face as a skin reference and check skin next to c01). Status: WAITING for owner verdict on v4; no batch started.

## 17/11 OWNER VERDICT on v4 (relayed by Foreman C s10) + ORDERS
Owner: old man head still wrong; Thai hau v4 direction OK; use the palace MA MA figure (fig-mama-*) as the model for Thai hau, not c01; Thai hau h2a18 pink / orange young girls = wrong; no fish-tail trains; no more owner approval needed (C looks at sheets; upload when QA passes).

## DONE 17/11: THAI HAU (all 15 figs + 15 por) ON CDN
Method: gpt-2-6 edit, image 1 = ma ma figure of the matching age (fig-mama-k01 -> h1, k02 -> h2, k03 -> h3; fig-thaihau-1/2/3 on k01-a36 / k02-a51 / k03-a36) = body, height, head size, stance never redrawn; image 2 = current Thai hau figure (face + hair + crown); image 3 (a18/a26/a36 only) = the set's a51 dignified robe, so NO pastel pink/orange young-girl looks: h1 = amber/crimson phoenix, h2 = deep plum + gold, h3 = deep teal + gold; "hem reaching the floor, no long train" (no fish tail). bg removed (Magnific), bbox crop, 900 px tall WebP. Edges checked on dark + light sheets (thaihau-figs-dark-1.jpg, thaihau-figs-light-2.jpg): clean. Facial size (Haar face box / figure height): old .083-.097 -> new .094-.104 (c01 .098, mama .093-.110). Skin: painted, not tinted.
LIVE on CDN (same names): img/fig-thaihau-1,2,3, fig-thaihau-h{1,2,3}-a{18,26,36,51} (15) and img/por-thaihau-1,2,3, por-thaihau-h*-a* (15; busts gen'd from the new figs, 384x506 transparent). Verified md5 live == local. Old live files backed up in fig-proportion-redo/old-backup-thaihau/ (30 files). Before/after: thaihau-before-after-1..3.jpg; por: thaihau-por-dark-1.jpg / light-2.jpg.
NOT touched: face-thaihau-1..6 (six separate dowager portraits, not the 15 figure identities), thai-hau.webp icon, info-thai-hau, the 17 scene pictures (their Thai hau was already redone earlier), kit/frame-thaihau.
RISK for C: img/mk-fit/thaihau-h1..3.json (makeup fit) was fitted to the old figures; bodies are now shorter/wider-set (mama build) so fit data may need a re-check.
Honest: new Thai hau looks like the mama build (shorter, broader robe) than before; a18/a26 faces stay young-looking (same identity as before).

## OLD MAN (fig-kid-p03-a51) — NOT uploaded, needs C's decision
Measured face height / figure height: Emperor .097; previous live p03 .081; v4 .089; latest tries .085-.092 (best D = .085, chin line 14.4% vs Emperor 16.3%). So by measurement his head is SMALLER than the Emperor's, not bigger; the owner's first verdict was 'head tiny'. Relayed order says 'still too big'. Variant D (smallest, .085) is prepared (final/fig-kid-p03-a51.webp, not on CDN). If she means the crown+topknot make the whole head look big, say so and I shrink the crown/hair; if she means the face is small, I enlarge to Emperor's .097. Women f04/f01 v4 samples were not rolled out (only samples); no other old-people batch started.

## 17/11 ~01:45Z CORRECTION from owner (via C): colours follow AGE; Thai hau a18 problem = PROPORTION (too tall); old man head too SMALL
- Colours: young bands keep bright/young colours (pink/orange/pale green); only older ages dark. My earlier all-dark a18/a26 (already live on CDN: fig-thaihau-h*-a18, h*-a26 and por) are WRONG colour -> REPLACED below (not yet uploaded: C sees sheet first).
- a18/a26 (6 figs): base = young consort c01-a26 body (c01-a18 pose has closed eyes + fan, so c01-a26 used for both); identity+costume = OLD live figure (original pastel colours kept: h1 peach-orange, h2 pink / pink-lilac, h3 pale cream-green / pale green); no train. Sheets: young-thaihau-a18.jpg (light bg), young-thaihau-a26-dark.jpg. face height/figure height: a18 .091/.098/.093, a26 .096/.096/.094 (c01 a18 .104, a26 .098). Poses now = c01-a26 pose (beads held at the chest).
- a36/a51 + fig-thaihau-1/2/3 stay as uploaded (mama build, colours = their old colours, already dark/amber in the old files).
- Old man p03-a51: base Emperor, face crop of the old man as identity, outfit from previous live figure, prompt says head as big as the Emperor's: face .091-.095 (Emperor .097, previous live .081). Candidate G (.095) chosen: oldman-p03-v5.jpg. Not uploaded.
- por for a18/a26: must be re-cut from the new figures (6 more busts) after C OKs the figures; the por on CDN for those 6 are currently the dark-colour ones.
- 2K: all gens used the default 2K output.

## 17/11 ~02:20Z FIXED + LIVE (after C's 01:35Z/01:44Z corrections) — AGE BANDS + AGE COLOURS + OLD MAN
LIVE on CDN now (verified md5): fig-thaihau-h{1,2,3}-a18, -a26 (6, young: black hair, young face, young colours peach-orange / pink / pale green, c01-a26 body), fig-thaihau-h1-a36 (black hair, mature), fig-thaihau-h2-a51 (grey-streaked, older), fig-kid-p03-a51 (old man, head enlarged: face .095 vs Emperor .097, previous .081), and 8 por-thaihau (h*-a18, h*-a26, h1-a36, h2-a51) re-cut from them.
Age ladder now correct for every set: a18 young -> a26 young woman -> a36 mature dark hair -> a51 grey/older (h1: a51 grey; h2: a51 grey-streaked; h3: a51 grey). Unchanged (already right): h2-a36, h3-a36, h1-a51, h3-a51, fig-thaihau-1/2/3 + their por. Body: mama build for a36/a51, c01-a26 build for a18/a26. No train. 2K.
Sheets: thaihau-all15-dark.jpg, thaihau-all15-light.jpg (7+8 figs on dark/light), thaihau-por-changed8-dark.jpg, young-thaihau-a18.jpg, young-thaihau-a26-dark.jpg, oldman-p03-v5.jpg. Backups: old-backup-thaihau/ (old live + DARKVERSION-* = the wrong dark a18/a26 that were live 01:2x-02:1x).
NEXT: roll out old men (p-series, Emperor base + old face crop + previous costume) and old women (f-series, c01 base) from audit-list.txt per the same rule; sheets to C first.

## 17/11 ~02:50Z a18 HEAD FIX (C 01:50Z: a18 head ~10% smaller than c01 a18)
Re-generation did not enlarge the head (the model follows the identity figure's small head: tries .086-.091, one .107), so the lower body (below 40% of height) of the 3 a18 figures was vertically squeezed to 84% (geometry only, no colour change; drapery/hem) and rescaled to 900 px: face height / figure height h1 .091 -> .103, h2 .098 -> .107, h3 .093 -> .104 (c01 a18 .104; target .100-.104; h2 slightly above); w/h .29 -> .35-.36 (c01 .34). LIVE (md5 ok). a26 unchanged (OK per C). Pre-squeeze files: old-backup-thaihau/PRESQUEEZE-*. Sheet thaihau-a18-head-fix.jpg (c01 a18 | live before | after). Por unchanged (face only). Honest: a mechanical squeeze, not a repaint; fine if drapes look natural (they do at 84%).

## WORKER HANDOVER (context rollover; Foreman C opens the successor) — 17/11 ~02:00Z
DONE + LIVE: 15 fig-thaihau (+15 por), fig-kid-p03-a51. Owner/C verdicts: v4 method = BASE IMAGE IS THE APPROVED REFERENCE FIGURE (c01 women / Emperor men), replace only face+hair and clothes with the person's own from the previous picture. NEVER put proportion numbers in prompts (owner anger). Colours follow AGE (young bright, old dark). One skin tone (c01 face), painted. 2K (default; no 4K). No fish-tail train.
STILL TO DO (rollout, ~85 figs in audit-list.txt): ONLY after the Thai hau work the other old men (fig-kid-p0x, a51/a36 etc.) and old women (fig-kid-f0x) per audit-list.txt, SAME method: gen 1 edit with refs [approved ref figure (image 1 = base) ; person's current CDN figure uploaded as creation (image 2 = face + costume)]; for MEN also upload a face crop of the old man (top 27% of the figure) as image 2 and the full figure as image 3 (the model otherwise keeps the old man's small head: v5 face .095 vs Emperor .097). Refs already uploaded to Magnific (creation ids): c01-a26 body bxVsmeq5Y2, c01-a18 w4vZCfB7EI, Emperor KLDgvBZkqp (ids in tools/ids.txt). Per figure: gen (40 cr) -> images_remove_background (3 cr) -> bbox crop, 900 px tall WebP -> measure face height/figure height with tools/face.py (Haar face box; refs: c01 .098, c01-a18 .104, Emperor .097, mama .093-.110; band: >= .094) -> sheets (tools/sheet.py: ref | previous | new, dark+light) -> C -> upload with dev/site/cdn_sync.py (put files in <tmp>/img/, copy cdn_sync.py to <tmp>/dev/site/, run from <tmp>; verify md5 vs live), back up the old live file first.
LESSONS: (1) the model copies the HEAD SIZE of the identity picture, not the base; if heads stay small, a mechanical fix = squeeze the lower body (below 40% of height) vertically x0.84 and rescale to 900 px (used for a18: face .091 -> .103). (2) c01-a18 base gives closed eyes + fan; c01-a26 base gives open eyes + prayer beads (hands/pose are inherited from the base). (3) Magnific refs must be creation ids (upload via creations_request_upload -> PUT -> creations_finalize_upload, canvas 1200x1600 parchment). (4) git: `git push` output of a REJECTED push also contains '->'; test the exit code and verify with git ls-remote; the sparse shallow worktree makes rebase conflict, so reset --hard to origin and re-copy my files. (5) a ~3 min cdn_sync is fine foreground (<=60 s for 20 files).
mk-fit/thaihau-h*.json fit data: C to re-check (bodies changed).

## C's APPROVAL + REFINEMENT of the rollout (17/11 01:58Z) — for the successor worker
Method approved. Body base by AGE and SEX: young women (a18/a26) = c01 build (c01-a26 for open eyes); older women (a36/a51+) = mama build (fig-mama-k0x of the same age); young men = Emperor build; older men = the approved p03 v5 build (head = Emperor ratio; i.e. use fig-kid-p03-a51 v5 as base for older men). Face + costume from the CURRENT picture, colours by age (young bright, old dark), no trains, 2K, a measured table per file (face h/figure h, w/h, chin%) in this report. Send C the FIRST batch sheet; after that upload each batch when QA passes and just report counts to C.


## ROLLOUT (successor worker, 17/11) — BATCH 1: 18 figures (kid f01-f04 all ages, p01-a36, p03-a20/a26/a36)
START_CTX ~4%. Scope note: audit-list = 45 fig-kid (f x30, p x15; p03-a51 already live) + 39 consort figures; I do the kid ones first, consorts after (C to confirm).
Method (as approved): gpt-2-6 2K edit, image 1 = body base by age/sex (women a20/a26 = c01-a26; a36 = mama k01-a36; a51 = mama k01-a51; men = Emperor), image 2 = current CDN figure (face+hair+costume); a36/a51 prompt asks a deeper, more muted version of the same colours (age rule); no train; no numbers in prompts. bg removed (Magnific), bbox crop, 900 px tall WebP q88. 65 + 3 credits per figure.
Sheets (old|new pairs, dark + light): https://ctm-img.victoria-tntt.workers.dev/img/_review/fig-oldrollout/b1-dark-{1,2,3}.jpg and b1-light-{1,2,3}.jpg (wipe: python3 dev/site/cdn_sync.py --wipe-review fig-oldrollout).
Measured (Haar, face h / fig h ; face:shoulder ; w/h ; chin%) old -> new. References: c01 .098/.44/.34/14.0, mama .093-.110, Emperor .097/.34/-/16.3.
| file | face h old->new | face:shoulder | w/h | chin% |
|---|---|---|---|---|
| fig-kid-f01-a20 | 0.088 -> 0.1 | 0.376 -> 0.433 | 0.286 -> 0.302 | 16.0 -> 18.0 |
| fig-kid-f01-a26 | 0.093 -> 0.099 | 0.449 -> 0.436 | 0.371 -> 0.328 | 16.7 -> 17.8 |
| fig-kid-f01-a36 | 0.08 -> 0.082 | 0.396 -> 0.4 | 0.386 -> 0.317 | 14.1 -> 14.7 |
| fig-kid-f01-a51 | 0.094 -> 0.096 | 0.436 -> 0.43 | 0.313 -> 0.289 | 15.1 -> 15.2 |
| fig-kid-f02-a20 | 0.089 -> 0.092 | 0.435 -> 0.405 | 0.254 -> 0.319 | 15.6 -> 16.7 |
| fig-kid-f02-a26 | 0.086 -> 0.101 | 0.381 -> 0.448 | 0.362 -> 0.322 | 15.2 -> 17.8 |
| fig-kid-f02-a36 | 0.086 -> 0.089 | 0.36 -> 0.372 | 0.37 -> 0.33 | 15.4 -> 16.1 |
| fig-kid-f03-a20 | 0.088 -> 0.099 | 0.427 -> 0.452 | 0.33 -> 0.331 | 15.4 -> 17.6 |
| fig-kid-f03-a26 | 0.093 -> 0.099 | 0.431 -> 0.536 | 0.371 -> 0.327 | 16.1 -> 17.1 |
| fig-kid-f03-a36 | 0.089 -> 0.093 | 0.415 -> 0.416 | 0.377 -> 0.336 | 15.6 -> 16.6 |
| fig-kid-f04-a20 | 0.103 -> 0.1 | 0.404 -> 0.439 | 0.38 -> 0.324 | 27.7 -> 17.2 |
| fig-kid-f04-a26 | 0.108 -> 0.099 | 0.495 -> 0.438 | 0.302 -> 0.316 | 20.6 -> 16.9 |
| fig-kid-f04-a36 | 0.086 -> 0.096 | 0.445 -> 0.424 | 0.376 -> 0.318 | 14.7 -> 16.3 |
| fig-kid-f04-a51 | 0.098 -> 0.102 | 0.468 -> 0.434 | 0.32 -> 0.324 | 15.9 -> 16.7 |
| fig-kid-p01-a36 | 0.093 -> 0.101 | 0.387 -> 0.367 | 0.35 -> 0.379 | 15.2 -> 16.8 |
| fig-kid-p03-a20 | 0.079 -> 0.093 | 0.324 -> 0.34 | 0.41 -> 0.38 | 13.7 -> 16.0 |
| fig-kid-p03-a26 | 0.081 -> 0.098 | 0.349 -> 0.352 | 0.348 -> 0.379 | 14.2 -> 16.7 |
| fig-kid-p03-a36 | 0.081 -> 0.098 | 0.336 -> 0.348 | 0.321 -> 0.383 | 13.4 -> 16.4 |
Weak heads (<.094) by Haar: f01-a36 .082, f02-a20 .092, f02-a36 .089, f03-a36 .093 — by eye the heads look in proportion with the mama/c01 bases; a lower-body squeeze (x0.84 below 40%) is available if C wants them tightened. Women inherit the c01 / mama pose (hands low, beads at the chest), so props like the plum branch / pipa / fan are replaced by the base pose.

## ROLLOUT WORKER HANDOVER #2 (context rollover ~29%; C opens the successor) — 17/11 ~03:00Z
STATE (all Magnific ids are in dev/handover/reports/fig-proportion-rollout/*.txt; creations persist in the account, folder ba4aecfe…):
- BATCH 1 (18 figs: f01-f04 x ages, p01-a36, p03-a20/26/36): done, sheets sent to C (b1-*.jpg in CDN img/_review/fig-oldrollout/). NOT uploaded — waiting for C's OK. Processed 900 px WebPs are staged at https://ctm-img.victoria-tntt.workers.dev/img/_review/fig-oldrollout/new/fig-kid-*.webp (md5-same as what would go live). On C's OK: back up the old live files (curl img/<name>), copy to <tmp>/img/, python3 dev/site/cdn_sync.py (from origin/main) <files>, verify md5 live == local, tell C counts. (Note p03-a51 is already live, not part of it.)
- BATCH 2 (26 young figs: f05,f08,f09,f10,f12,f13,f14,f15,f16,f17,f18,f19,f21,f22,f23,f24 -a20 women on c01-a26 base; p06,p07,p10,p14,p15,p16,p17,p20,p22,p24 -a20 men on Emperor base): all 26 generated (ids_gen2.txt women, ids_gen3.txt men). Background removal DONE for the 16 women (ids_rm.txt, appended). STILL TO DO: images_remove_background (3 cr) for the 10 men (ids in ids_gen3.txt, mode folderReference ba4aecfe…); then creations_wait -> download each cut-out PNG (results.url) to rm/<name>.png (names like f05-a20.png; the url has a token, fetch with curl straight away); python3 tools/proc.py (bbox crop, 900 px tall WebP q88 -> new/fig-kid-<name>.webp); measure with tools/face.py; table into this report; pairs.py b2 <names> for old|new dark+light sheets (cur/ = current CDN figures: curl img/fig-kid-<name>.webp); LOOK at every sheet; if a figure is bad regenerate it (65 cr); send C sheet; upload after OK.
- Prompts used (verbatim pattern, no numbers): men "Image 1 is the base figure: keep its body, height, head size, shoulders and standing stance exactly, never redraw the body proportions. Replace only the face, hair and headwear, and the clothes, with those of the man in image 2: same face, same hair and crown/hat, same outfit pattern and the same colours as image 2. Calm standing pose, hands held low in front, robe hem reaching the floor with no long train behind. Full body head to feet, plain light parchment background. Same painterly rendering and the same fair porcelain skin tone as the base figure."; women same with "young woman ... hairpins"; a36 adds "in a more muted, deeper and darker version of image 2's colours suitable for a mature woman" (base mama k01-a36 VXwhL3HMMU); a51 "deep dark rich colours (deep wine, deep brown, deep teal)" (base mama k01-a51 5jMwYmeKxe). gpt-2-6, aspect 3:4, resolution 2k, refs [base creation, source creation].
- Source figures for every kid fig are on the CDN review folder img/_review/oldroll-src/fig-kid-*.jpg (1200x1600 parchment canvas; wipe at the end with --wipe-review oldroll-src) and imported as Magnific creations (ids_src.txt). Bases: c01-a26 bxVsmeq5Y2, Emperor KLDgvBZkqp, mama k01-a36 VXwhL3HMMU, k01-a51 5jMwYmeKxe.
- AFTER the kid figs: (a) mk-fit: tools exist at origin/main dev/art/mkfit/mkfit.py (`python3 -I dev/art/mkfit/mkfit.py --only thaihau [--jobs 4]`, needs `pip install mediapipe` + libegl1 libgles2 + face_landmarker.task model) — img/mk-fit/thaihau-h1..3.json were fitted to the OLD Thái hậu bodies; re-measure and cdn_sync them (manifests: pull right before editing; --force only if needed) and report; (b) consort figs in audit-list (39, c06-c30 mostly a18/a26) only if C confirms scope; (c) wipe review folders (img/_review/oldroll-src, fig-oldrollout) after C's final OK.
- Env notes: pip install "opencv-python-headless<4.11" "numpy<2.3" (cv2 5.x has no Haar CascadeClassifier); never print full MCP upload URLs; creations_upload_image(url=CDN review jpg) is a much cheaper way to import refs than request_upload+PUT; creations_wait output URLs must be re-typed into bash (use `name id hash` lines + curl loop).

## OVERRIDE of handover #2 by C's orders (read after the handover was written; C msgs 02:03–02:13Z) — SUCCESSOR READ THIS FIRST
- Batch 1 (18) is NOT OK and must NOT be uploaded; batch 2 (26 gens, women bg-removed) must NOT be continued/uploaded — it used the rejected c01/mama-base method (women inherit the base pose and lose props; owner says those sample bodies are too tall). Treat batch 1/2 files as scrap (credits already spent: ~44x68). Wipe img/_review/fig-oldrollout and img/_review/oldroll-src when done.
- The 39 consort figs are OUT of scope (the whole-figure repaint batch covers them).
- OWNER'S METHOD (2-reference): image 1 = the person's OWN current/original picture (face, costume, pose, props kept); image 2 = an owner-approved REPAINTED figure of similar age/sex = proportion only. Prompt: draw the woman of image 1 (same face, costume, colours, crown/props) with exactly the body proportions/height/head size of image 2; no fish-tail train; hands holding something lightly. 2K, transparentBackground true. Measure with face.py.
- ORDER OF WORK: (1) Thái hậu NIGHT TASK: originals are in dev/handover/reports/fig-proportion-redo/old-backup-thaihau/fig-thaihau-*.webp; first 2 samples h1-a18 + h1-a51 (~130 cr) with the 2-ref method, proportion model = live repainted consorts of the same age band (e.g. c26-t2-a18 / c20 a18; a matching a51 consort — measure; NOT mama/c01); sheet model | ORIGINAL | NEW with numbers, push, tell C. If proportion is right: all 15, NOT uploaded live (owner reviews in the morning), full sheet in the report folder, tell C. (2) mk-fit anchors check (0 credits) is fine now. (3) fig-kid p/f rollout WAITS for the owner's morning approval of the Thái hậu result, same method.

## ROLLOUT WORKER #3 (17/11 night) — Thái hậu 2-ref samples
START_CTX ~4%. Method: gpt-2-6 2K, image 1 = ORIGINAL (old-backup-thaihau/fig-thaihau-h1-a18|a51), image 2 = live consort of the same band (c26-t2-a18 / c10-t2-a51; uploaded as parchment 1200x1600 refs from CDN img/_review/thaihau-night). No numbers, no train. bg removed, 900 px WebP.
Measured (face h/fig h, face:shoulder, w/h): model a18 .100/.33/.35, ORIG a18 .083/.40/.35, NEW .084/.40/.31, NEW+squeeze x0.84 below 40% .094/.43/.34; model a51 .100/.44/.35, ORIG a51 .097/.43/.33, NEW .096/.47/.30.
Finding: costume/face/props/colours kept, body proportion ≈ original (model copies the identity figure's body). Stronger "head as large as image 2" wording (2 tries, a18) overshoots to chibi + changed face -> discarded. Sheets: CDN img/_review/thaihau-night/sheet-light.jpg + sheet-dark.jpg. Cost ~270 cr. Reported to C; WAITING for go (options A squeeze / B as-is / C reversed base). Nothing uploaded to live paths. Magnific ids: orig a18 yiEn3V6PW9, orig a51 9ZFc2e0NYZ, model a18 Bh9FvrKoQR, model a51 bxVwj625Y2; gens SymRPeeUb8 (a18), aFArH6kfSh (a51); cutouts 9ZFc297NYZ, UPhZ97bwny.

### ROLLOUT WORKER #3 — all 15 Thái hậu (C's GO option A: 2-ref gen + per-figure squeeze to face ≈ .100), NOT live
Per figure: 1 gen (65 cr) + cutout (3 cr); squeeze factor s on the part below 40% of height (floor 0.80, so none stubby), rescaled to 900 px. Measured face h/fig h, face:shoulder, w/h. Models: a18 c26-t2-a18 (.100), a26 c26-t2-a26, a36 c10-t2-a36, a51 c10-t2-a51 (.100). fig-thaihau-1/2/3 = k01-a36 / k02-a51 / k03-a36 -> bands a36/a51/a36.
| id | ORIGINAL | NEW (gen) | s | NEW+squeeze |
|---|---|---|---|---|
| fig-thaihau-h1-a18 | [0.083, 0.4, 0.35] | [0.084, 0.4, 0.31] | 0.8 | [0.097, 0.43, 0.35] |
| fig-thaihau-h1-a26 | [0.091, 0.4, 0.3] | [0.091, 0.4, 0.28] | 0.85 | [0.1, 0.4, 0.31] |
| fig-thaihau-h1-a36 | [0.086, 0.38, 0.31] | [0.091, 0.4, 0.31] | 0.85 | [0.102, 0.42, 0.34] |
| fig-thaihau-h1-a51 | [0.097, 0.43, 0.33] | [0.096, 0.47, 0.3] | 0.93 | [0.099, 0.47, 0.32] |
| fig-thaihau-h2-a18 | [0.091, 0.46, 0.29] | [0.079, 0.42, 0.27] | 0.8 | [0.09, 0.44, 0.31] |
| fig-thaihau-h2-a26 | [0.088, 0.44, 0.31] | [0.094, 0.46, 0.29] | 0.91 | [0.099, 0.46, 0.31] |
| fig-thaihau-h2-a36 | [0.096, 0.42, 0.33] | [0.084, 0.4, 0.3] | 0.8 | [0.096, 0.42, 0.34] |
| fig-thaihau-h2-a51 | [0.084, 0.4, 0.34] | [0.088, 0.42, 0.3] | 0.8 | [0.098, 0.43, 0.34] |
| fig-thaihau-h3-a18 | [0.089, 0.45, 0.3] | [0.086, 0.44, 0.29] | 0.8 | [0.098, 0.46, 0.33] |
| fig-thaihau-h3-a26 | [0.091, 0.43, 0.3] | [0.093, 0.47, 0.26] | 0.89 | [0.099, 0.47, 0.28] |
| fig-thaihau-h3-a36 | [0.084, 0.4, 0.32] | [0.093, 0.45, 0.29] | 0.89 | [0.099, 0.46, 0.31] |
| fig-thaihau-h3-a51 | [0.091, 0.39, 0.33] | [0.097, 0.44, 0.3] | 0.94 | [0.096, 0.43, 0.31] |
| fig-thaihau-1 | [0.091, 0.38, 0.29] | [0.086, 0.39, 0.28] | 0.8 | [0.096, 0.4, 0.31] |
| fig-thaihau-2 | [0.096, 0.42, 0.29] | [0.096, 0.42, 0.29] | 0.93 | [0.099, 0.43, 0.31] |
| fig-thaihau-3 | [0.091, 0.44, 0.3] | [0.088, 0.44, 0.3] | 0.8 | [0.1, 0.46, 0.34] |
Faces below .100 after squeeze (floor 0.80 kept natural): h1-a18 .097, h2-a18 .090, h2-a36 .096, h3-a51 .096, fig-thaihau-1 .096 (h2-a18 is the lowest). None above .107.
Honest: h2-a51 gen was accidentally generated twice by my slot-error mix-up; h3-a36 regenerated (+68 cr). Total ≈ 270 + 13x68 + 68 ≈ 1220 cr.
Files (WebP 900 px, transparent, CDN review, NOT live): https://ctm-img.victoria-tntt.workers.dev/img/_review/thaihau-night/final/fig-thaihau-<id>.webp. Sheets: overview.jpg, sheet-{h1,h2,h3,k}-{dark,light}.jpg in the same folder (ORIGINAL | NEW+sq | model per identity).
Not done: por busts, mk-fit re-check (no mediapipe set up; 0 cr, later), wipes of fig-oldrollout / oldroll-src / thaihau-night (after owner/C verdict).
