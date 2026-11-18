# review: face-fit 7068619d (reviewer, sonnet, child of MAIN s37)
PRIORITY #1 CHECK: claims toil-looks8 | review/face-fit 7068619d | reports/face-fit.md + toil-looks5 6a3c1ef9 (repo fit d19dc9d4) | main dev/art/mkfit == live CDN mk-fit (0 diff, 36 files differ from the corrected set).

## Verdict: PASS 838e7a8e (branch review/face-fit-r1 = review/face-fit + latest origin/main 4c8568f5 + data commit)
## What I checked (by pixels, my own renders: red = LIVE CDN points, green = staged corrected points, brows/eyes/lips polylines + cheek and mouth circles from toil-fit2, drawn on the live pictures, portrait AND figure)
- c05-t4 (fig+por), c17-t1 (fig+por), c18-t1 (fig+por), player-look1 (fig+por), maid-m26 (fig+por, no change = control), c26-t7 fig, c25-t2 por, thaihau h2-a51 por / h1-a51 por / h2-a18 fig / h3-a18 por.
- Result: on every changed face green sits on the painted brows, eyes, lips; red is on nose / cheek / background (blush-on-nose, lip-on-cheek confirmed). Green cheek circles sit on the cheeks (c05, c17, c18, c26, c25, player-look1). before-after.jpg looked at: lip centre green on lips in all 8 cells, red 6-24 % off.
- Data: staged mk-fit/*.json (99 files) == review/toil-looks5 repo values: 0 differences over 15752 entries; staged toil-fit2.json == repo: 0 differences over 12966 rows; no staged-only / live-only keys; live == main dev/art/mkfit (0 diff). 1213 toil rows and 1741 mk entries change (35 mk files + toil-fit2).
- Caveat kept from the worker: the judge uses the same detector family as the repo points; my check is therefore the eye test above, which agrees.
## One source (FIXED by me)
review/face-fit carried only tools + judge-result; main dev/art/mkfit still held the stale set (next mkfit/fixtoil run would restore it) and main has no dev/art/toil-fit2.json. Commit 838e7a8e on review/face-fit-r1 puts the corrected values in dev/art/mkfit (36 files) and adds dev/art/toil-fit2.json. Ancestor-ok vs origin/main 4c8568f5.
## Follow-ups (not blockers; unchanged live==staged, not caused by this change)
1. thaihau mk-fit (h1/h2/h3, 24 entries): LIP points fine, EYE + BROW points sit on cheeks/nose (seen on por-thaihau-h2-a51, h1-a51, h3-a18, fig-h2-a18). Wrong in live AND staged. Needs a re-detect; the worker report did not list this.
2. 21-24 thaihau toil rows still 2-7 % off (worst por-thaihau-h2-a51 7.07, h1-a51 6.95, h2-a18 6.53); cheek circles on por-thaihau sit low (jaw level). fig-thaihau-h3-a51 (2.39 -> 2.85) and h3-a36 (1.73 -> 2.05) get 0.3 pt worse: negligible.
3. Not covered by the worker nor by me: other fit files the game loads: img/veil-fit.json, img/scar-fit.json, POR_FACE2.json (jkpor.js), old toil-fit.json (only mentioned in comments now; sw.js PRE still precaches it).
4. Pictures md5 in dev/art/mkfit/md5.json not re-measured (worker note).
## Go-live: files to upload to the live CDN (MAIN uploads)
- cdn_sync pull right before; then copy the 99 files https://ctm-img.victoria-tntt.workers.dev/img/_review/face-fit/mk-fit/*.json (excluding md5.json if present) over img/mk-fit/ and _review/face-fit/toil-fit2.json over img/toil-fit2.json. They are identical to the committed repo files (dev/art/mkfit/*.json minus md5.json, dev/art/toil-fit2.json on 838e7a8e).
- Bump the service-worker cache: sw.js PRE precaches img/toil-fit2.json (stale copies would stay on devices); mk-fit is fetched on demand, so fetch cache-bust or SW version bump covers it.
- After go-live: game-driven check on c05-t4 (blush off the nose, lip on lips); then wipe the staging folder: python3 dev/site/cdn_sync.py --wipe-review face-fit (I did not wipe it: MAIN needs it as the upload source; shots of mine are in scratch only, none in git).
