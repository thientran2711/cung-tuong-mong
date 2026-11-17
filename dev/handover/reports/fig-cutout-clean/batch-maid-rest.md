# batch-maid-rest (W5 worker, shard lists/shards/maid-rest.txt, 3172 files) — resume file
START_CTX (worker #1, est.) ~10 %; roll over at ~35 %, never above 60 %. Lead = session_011xDdVRBW26agruDT2Bm65K (opens successors).
## Method that WORKS (per file, 83 credits)
1. creations_upload_image old CDN fig (https://ctm-img.victoria-tntt.workers.dev/img/<file>) into folder ba4aecfe-efce-47e2-b53f-30d292091886 -> id.
2. images_generate gpt-2-6 2048x4096 4k, refs [old id, face-consort 01 N2HYqYa6D9, 05 bxVgMSX5Y2, 12 dtPf4EDXSL, 18 eIyaPEVdqL]; prompt = pilot recipe (STYLE_ANCHOR prefix + identity line + "Embroidered fine silk with hairpins and small jewellery; she is a rich palace maid, nothing looks poor." + HANDS (prop rotates: fan, lantern, teacup, scroll, flower branch, jade pendant, handkerchief, book, hairpin fingertip) + HUADIAN + NO-TRAIN line + transparent/margins). 80 cr.
3. !! The 4k render has a FAKE baked checkerboard (alpha 255). Run images_remove_background on the creation (3 cr, same 2000x4000 output, true alpha) -> THAT url is the master.
4. scratch tool (not in repo; recreate if lost): post.py KEY URL... = curl master; tools/finish_fig.py MASTER KEY OUT (fig 900 + tn + por; writes _old); tools/fit_fig.py ... --H 1800 -> img/hd/ (CDN has no maid hd; made anyway, upload decision = lead); tools/qa_fig.py; sheet (new fig dark|light + face crop). Needs pip scipy opencv-python-headless.
5. LOOK at sheet. halo FAIL 2500-3300 on bg-removed edges = hair strands, looks clean (same as pilot m52); pinholes <400 ignore. Huadian auto = WARN only.
Outputs live in scratch /tmp/claude-0/w/out/img (NOT in git); upload to CDN (cdn_sync.py) after ~100 passed files.
## DONE (name -> gen id / bg-removed id), all looked OK
fig-maid-m01-a18 xSXPMlnjfW/1leOTEUr4r | m01-cold-a18 3z5VF9VREY/jUB4eovLD0 | m01-kc-a18 Ifiq4BTtvE/mER562ThJQ | m01-ngheo-a18 KLD70bKkqp/w4vZtCv7EI | m01-t1-a18 3z5VF3eREY/kspJVbC16B| m01-tm2 fHGrY5iCDY/3z5V1U6REY | m01-tm3 s78NmPul8e/4RQYqsy9Aa | m01-tm4 w4vZCZy7EI/w4vZC1u7EI | m02-a18 8a6HRqHIrU/YMsoSifWeC
## HARD: none
## CREDITS: 5 files x 83 + 0 retries = 415 (+ the first test bg-removal included)
## NEXT: m01-t2-a18 onward in shard order (a18 first, then a26/a36/a51 with the NEW a18 as identity ref + old file)
