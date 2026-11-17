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
