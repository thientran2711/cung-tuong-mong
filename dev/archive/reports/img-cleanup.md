# img-cleanup report (worker of Foreman B s7, 11/16/2026)

Branch `review/img-cleanup` @ a2e99bd0a0d9f2835e1268eb5bc886f41b9a3254 (from origin/main a0d93ac8). No history rewrite, `git rm` only. Not pushed to main, no PR.
Handover branch: images removed in fd8642e0 / 5639d9b5, brief templates in 5c48f5a6.

## 1. Image files in git, before -> after

| Where | Before | After |
|---|---|---|
| origin/main (a0d93ac8) | 6117 image/video files (~1.0 GB of 1.44 GB tracked) | 7 (allow-list) |
| handover branch | 4557 image files | 4 + the allow-listed 3 icons kept (icons/*.png, dev/build/icon.webp) |

Removed from main, by folder (files): dev/shots 2255 (961 MB), dev/figwork 619 (sheets 575 + maidB 40 + 4; 195 MB), .tmp/cdn 1640 (54 MB), .ahcache/img 1272 (52 MB), dev/handover 43, dev/review 76, dev/art 36 (review sheets), dev/kit/ref-daihy 30, dev/owner-shots 12, dev/shots-td 24, dev/test shot dirs 12, .out 62, .t/ff 10 (the e987508d quickcheck shots; plus stray .t/ff.log), .tmp 34 (non-cdn). Kept: `icons/*.png` (6, PWA/apple-touch) + `dev/build/icon.webp` (inlined by assemble.py).
Removed from handover: img/ 3584 (stale copies; every key exists on the CDN, checked against img/_index.json), dev/shots 529, dev/handover (reports + refs) 352, dev/owner-shots 58, dev/kit/ref-daihy 30.
Nothing the game serves lives in git (all pictures are on the CDN, jcdn.js IMG_BASE), so no served image was touched.

## 2. Check (priority rule #1: no existing allow-list/pre-commit found on main or 727 review/* heads; built new)
- `dev/site/img-allowlist.txt` (globs, comments) + `dev/test/img-allowlist.py` (modes: default = git ls-files, `--ref REF` = a commit's tree, `--staged` = pre-commit, `--list`).
- Wired in: `dev/site/build_site.sh` (right after media-check; fails the build), `dev/tools/quickcheck.sh` (step 0, checks the sha tree with the kit's script, FAIL before the build), pre-commit hook `dev/site/hooks/pre-commit` (`bash dev/site/hooks/install.sh` once per worktree/clone), self-test `bash dev/test/img-allowlist-selftest.sh` = PASS.
- Same script/allow-list/hook also on the handover branch.
- `.gitignore` on main gets scratch/shot dirs.
- NOTE for main: once review/img-cleanup is merged, any older review/* branch that still carries images FAILS quickcheck step 0 until its images are `git rm`-ed (intended).

## 3. Brief templates (handover branch, coordinator template lines only, no owner rule text changed)
PREAMBLE.txt L14 (and its generated copy START_WORKER.md L39), REVIEWER.txt L4 (and copy START_REVIEWER.md L12): shots go to scratch outside the repo, or CDN review folder `img/_review/<topic>/`, wiped with the verdict; reports reference shots by name only.
New tool for that: `python3 dev/site/cdn_sync.py --wipe-review <topic>` (deletes only `img/_review/<topic>/`, `--dry-run` lists; on review/img-cleanup until merged).
Question for main: none of the 'shots' lines was an owner verbatim line. START_WORKER L28 `[HO/WORKER_BRIEF.md:L20]` ("every owner screenshot must be on the approved layout") and OD:L177 mention owner-shots paths (`dev/owner-shots/1115-fig-ok.jpg`); text left unchanged (owner words); those files are gone from git now, only the CDN/owner chat holds them. Main: reword or keep?

## 4. CDN: unused assets (NOTHING deleted). Method: no literal reference in dev/build + dev/site + the 23 img/*.json manifests (pulled by cdn_sync --pull). Names built from parts in code can hide a reference, so verify before deleting.

| Group | Files | MB | Evidence | Suggested |
|---|---|---|---|---|
| img/_kcwork/idref-*.jpg | 81 | 35.2 | work folder, 0 refs | delete |
| img/nvp-v4-*.webp | 32 | 53.8 | 0 refs in code + manifests | delete (ask owner: scene variants) |
| img/nvp-scene-contact-sheet.png, nvp-scene-v2/v3-vs-approved-sheet.jpg, nvp-scene-v4-vs-ksp-sheet.jpg | 4 | 7.4 | review sheets, 0 refs | delete |
| img/hi/item-tp-*.webp | 88 | 20.9 | 0 refs (img/item-tp-* and img/item512/* are live) | delete after check |
| img/fig-bg-samples.jpg, huadian-sample-sheet(-2).jpg, podium-bg3-sample-sheet.jpg | 4 | 3.0 | samples, 0 refs | delete |
| img/kc-sanh.webp | 1 | 0.2 | 0 refs | delete |
| img/pl2/nhat-duc, nhat-duong, nhat-garden, nhat-noi, nhat-truong (single-hall courtyard sets; review/single-hall makes them unreachable) | 134 | 48.3 | referenced as DATA in jpm.js on main (KPM_DATA), unreachable only after review/single-hall ff05f03d lands | delete after single-hall is live (I count 5 dirs, not 7: the 6 multi-hall dirs phi, quy, vinh, spare, can, cac stay) |
| img/veil*.png (13), rash-1..3, scar-1..3 | ~19 | 1.5 | code references them (j79 comment: owner rejected the old veil*.png) | ask owner |
Total clear candidates ~125 MB (of 2.16 GB, 26925 objects).

## 5. Proof nothing served was removed
- `bash dev/site/build_site.sh` OK on the cleaned tree (index.html differs from main only by the build line, reverted).
- `bash dev/tools/quickcheck.sh HEAD` = QUICKCHECK PASS · open 1190 ms 0 errors · old save (live build's sổ) loads and plays a buổi · perf new/live render 344/317 ms, tab 461/397, buổi 1133/1156 (an earlier run FAILed perf only because I ran other jobs at the same time; rerun alone = PASS).
- Pictures with the CDN, shots kept outside git (scratch): Fold 755x1000@2: 1105 image requests OK, 0 failed, 0 broken `<img>`, 0 page errors; iPad 1180x820@2: 1081 OK, 0 failed, 0 broken, 0 errors. Looked at the Fold shot (Luân hồi cards, all pictures present).

## Questions for main
1. START_WORKER L28 / OD:L177 mention deleted owner-shots paths: keep text as is?
2. Approve the CDN delete table (section 4) or tell me which rows; the veil/rash/scar row needs the owner.
3. Old review/* branches still carrying images must be `git rm`-ed before they pass quickcheck.

SẴN SÀNG KIỂM a2e99bd0a0d9f2835e1268eb5bc886f41b9a3254
