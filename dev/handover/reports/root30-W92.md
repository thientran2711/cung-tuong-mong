# root30-W92 (painter W92, Foreman C ROOT-30) — JOB A: a65 t7+t8 v0/v1/v2, c09–c16
PRIORITY #1 CHECK: brief dev/handover/briefs/root30-mass.md | builder dev/art/t8-prompt-B (frozen) | review/* none reused | claims none.
Read before start: START_CORE, START_WORKER, START_ART, FIGURE_GATE (all), consort-B10, t8-prompt-B README+refs. Golden check OK (pB_c06 cmp) + test_low_all.py OK (2304 builds).
Method: prompt = exact build.py output (`build.py cNN vK --age a65`, `build.py cNN --t7 vK --age a65`), refs = [image own live a51 t1 (hd webp, uploaded as fig-consort-cNN-t1-a51.png)] + [style eIyOFEidqL], gpt-2-6, 1024x2304 2k, count 1, no seed, folder ba4aecfe…, then images_remove_background. Output img/_review/t8-reprompt/cNN_a65_t{7,8}_v{k}.png + cNN_a65_sheet.jpg (a51 live t8 | t7 v0-2 | t8 v0-2). Live a51 t8 = img/fig-consort-cNN-t8-a51.webp (no hd).
Checks ticked per figure (FIGURE_GATE): reads ~65 (wrinkles, much silver, not white), deeper colours, phoenix clear, closed lips, eyes open, face fully visible (item below chin/beside body, not covering), one item contrasting with robe, no cup, no forehead mark, 3 colour families, no draft wording changes.
| figure | gens | pass |
|---|---|---|
| c09 t8 v0/v1/v2, t7 v0/v1/v2 | 6 | yes (sheet c09_a65_sheet.jpg) |
| c10 t8 v0/v1/v2, t7 v0/v1/v2 | 6 | yes |
| c11 t8 v0/v1/v2, t7 v0/v1/v2 | 6 | yes |
| c12 t8 v0/v1/v2, t7 v0/v1/v2 | 6 | yes |
Notes: c09 t7 v0 robe is pale lavender-grey (her original colour, deepened by the prompt only slightly) — builder text unchanged. Uploaded t1-a51 refs (Magnific ids): c09 tCRvzslmZJ, c10 79fykPFJAL, c11 dt4oWODXSL, c12 79fygtPJAL.
## Handover (W92 stops after c12 at the rollover; NEXT = c13, then c14, c15, c16)
Work dir /home/user/wt/w92work (finish.py cNN t8_v0=URL … does download+sheet+cdn_sync; needs /home/user/wt/w92-cdn = sparse worktree of origin/main with dev/site/cdn_sync.py). Workflow per person: upload ref (creations_upload_image of https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-cNN-t1-a51.webp, fileName fig-consort-cNN-t1-a51.png; c13 rgXL37zxtc and c05 If3hxHCtvE already uploaded on the old account), build 6 prompts, gen 4 then 2, look at each, bg-remove, finish.py, send READY.
