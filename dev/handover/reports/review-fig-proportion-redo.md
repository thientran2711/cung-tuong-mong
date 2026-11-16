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
