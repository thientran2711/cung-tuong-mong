# batch consort-ty (W2, session_011xDdVRJKYSAaQP1Z2rspXD) — 4k, 80 cr/file
START_CTX ~5% of 1M (get_session reads 0). Roll over at ~30%.
Recipe notes: images_generate gpt-2-6 2048x4096 4k, extraSettings {"transparentBackground": true} REQUIRED (prompt-only gave fake checkerboard). Prompt generator: batch-consort-ty-tools/prompt.py N (gesture index = file index in a18 list). proc.sh KEY URL = download+finish+qa; sheet.py = look sheet. Scratch masters/out in session scratchpad (lost on session end; masters re-downloadable by Magnific id).
Face refs N2HYqYa6D9 bxVgMSX5Y2 dtPf4EDXSL eIyaPEVdqL. Old-figure refs uploaded per file (id in table).
## a18 done (key | magnific out id | QA)
consort-c01-ty1-a18 Lwo9ptaswO PASS(pinholes<400)
consort-c01-ty2-a18 rgdyMuLxtc OK
consort-c01-ty3-a18 Sym3okTUb8 OK
consort-c01-ty4-a18 5jMwcCBKxe OK
consort-c01-ty5-a18 1leOVHJr4r OK
(ids of all OK files: batch-consort-ty-tools/progress/ids.tsv; per-agent logs progress/g*.tsv)
Method: sub-agents run JOB.md (4 images in parallel, max). First 9 files by lead W2 directly: c01 ty1-8 + c02 ty1 all OK.
UPLOADED to CDN: first 73 a18 (fig+por) 17/11
## PAUSE (Foreman C 17/11): all consort ty1 (Đáp ứng) files are PAUSED (owner: Đáp ứng and cung nữ dresses look identical). ty1 a18 already generated: 27 files (see ids.tsv, grep ty1) (idx%8==0 in a18_index.txt); NOT redone yet; awaiting lead #6's new anchor after the owner OK of a side-by-side sample. ty1 files of c32 and every ty1 of a26/a36/a51 NOT generated. g5 told to skip ty1 keys.
## a18 STATUS 17/11 ~03:10Z: 251/256 generated OK (0 hard). Skipped = ty1 c28-c32 (paused). Redo wanted with 'rich' prompt: progress/redo_rich.txt (7 ty2/ty3 made before the rank rule); also all ty1 (27) + ty2/ty3 made before 'rich' (c01-c24) may be redone after the rank sample (rank-sample/consort-ty-at-risk.tsv).
Next: ty4-8 of a26/a36/a51 from batch-consort-ty-tools/older_ty4-8_index.txt (480), then ty1-3 of older ages after GO.
## HANDOVER (W2 consort-ty, written 17/11 ~03:15Z; my context ~28% — successor should start here)
How it runs (works, ~60 files per sub-agent, ~25 min): sub-agents (Agent tool, general-purpose, sonnet, background) follow batch-consort-ty-tools/JOB.md (2k, batches of 5 max, transparentBackground true, short prompt, batch.sh = download+alpha+finish(FORCE_HD)+qa+one sheet). Give each agent a line range of an index file; they log progress/gN.tsv + progress/ids.tsv (key<TAB>Magnific out id). ONE agent at a time (Magnific slot limit; max 5 parallel generations in total).
After each agent: run `batch-consort-ty-tools/upload.sh bN` (background; ensures hd, copies to img/, cdn_sync + check, writes hd-entries/consort-ty-bN.json; marks progress/uploaded.txt), then commit+push (recipe: commit locally; fetch --depth=1; checkout -B x FETCH_HEAD; checkout <commit> -- paths; commit; push x:branch). cdn_sync.py: git show origin/main:dev/site/cdn_sync.py > dev/site/cdn_sync.py (excluded via .git/info/exclude, with img/, __pycache__/).
Scratch (masters/out) is in the session scratchpad of session ...RJKYSAaQP1Z2rspXD: LOST if the container dies; masters re-downloadable by Magnific out id (creations_get).  upload.sh needs masters in $S/m for hd; upload before rollover!
Done: a18 251/256 (ty1 c28-c32 paused). Live with hd: b1-b4 fragments. g6 (a26 ty4-8 lines 1-45 of older_ty4-8_index.txt) running at time of writing.
TODO order: (1) older_ty4-8_index.txt lines 46..480 (a26 c9.. then a36, a51); (2) redo_rich.txt 7 files + after rank sample GO: all ty1-3 (rank-sample/consort-ty-at-risk.tsv) with 'rich' arg, then ty1-3 of a26/a36/a51 (not yet generated: 3 tiers x 32 x 3 ages = 288, in lists/shards/consort-ty.txt, gesture idx = a18 idx of same cNN-tyN); (3) W1b queue appended by lead #6 (eunuch a18 ~108, kid, man/mama other ages, hd retro-fit of ~63 W1b files; read batch-w1-hero-misc.md, tools/w1_drv.py, lists/shards/w1-done-2k.txt).
Lead = session_011xDdVS87fDNLJMJGzeiVWL (Foreman C = ...VSeKM6qi8YXjVTPqrd). Tell lead to open the successor with BOTH queues.
Credits so far: ~(4x80)+~290x65 = ~19.5k. START_CTX ~5%.
NOTE for W2b: do NOT start generating until W2 reports g6 finished (slot limit); then start at older_ty4-8_index.txt LINE 46 (lines 1-45 = g6). W1b queue goes to W4c, not to W2b.
