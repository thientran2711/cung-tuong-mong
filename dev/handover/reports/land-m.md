# land-m (sonnet LANDER, MAIN ROOT-53) — stack built on live main d3ea24e8

PRIORITY #1 CHECK: OD 1 / 0 | claims shown-odds-r2-rv PASS cf1fc746, monthly-ration-r6 287a0b79 | main none (live d3ea24e8) | review/* review/shown-odds-r2-rv, review/monthly-ration-r6 | claims land-m (this row)

Branch review/land-m (pushed, NOT main) = origin/main d3ea24e8 + 2 merge commits, each its own. Both branch HEADs equalled the named shas; neither was an ancestor of main.

| step | branch | merge sha | gates |
|---|---|---|---|
| 1 | review/shown-odds-r2-rv cf1fc746 | a5013222 | 1 SOURCE conflict dev/build/jgift.js kmEmpAct (see hunk A); index.html/sw.js rebuilt; one-core-guard 0 fails; time-spill-guard PASS; shown-odds-spend.test.js 79/79 (page errors 0); quickcheck.js PASS (old save ok, render 186/237, tab 412/436, buoi 1326/1206, tasks>200ms 20/18) |
| 2 | review/monthly-ration-r6 287a0b79 | 3fdfb437 (FINAL) | SOURCE conflicts j24.js, jtoil.js (hunks B, C), assemble.py UNION (+jration.js after jlux.js); built files rebuilt; one-core-guard 0 fails; time-spill-guard PASS; monthly-ration.js Fold+iPad 46 PASS / 0 FAIL; shown-odds-spend 79/79 re-run on final; quickcheck.js PASS (old save ok, render 227/253, tab 401/384, buoi 1015/1189, tasks>200ms 16/16) |

## Source hunks resolved (both sides' intent kept)
- A. jgift.js kmEmpAct (step 1): main = ghenUp(v,3,...) in the walk branch; branch = odds `o` read BEFORE spend(2) + roll(o). Took branch line 1 (o before spend) + main line 2 (ghenUp). Nothing dropped. node --check OK.
- B. j24.js approach gift line (step 2): base had "Chắc chắn · thành:" typed word; main removed that prefix (odds-cap), branch changed item "sonphan"→"lxma0" + added lxFix(S). Took branch's list + lxFix and main's text without the "Chắc chắn · " prefix.
- C. jtoil.js toilMkBase/toilMkLayer (step 2): main factored base key into toilMkBase(file,look,col); branch added `(col.no||[]).join(",")` to the key. Kept main's toilMkBase/toilMkLayer and put `(col.no||[]).join(",")` into toilMkBase (same position as the branch). node --check OK.
- assemble.py: union of module lists (jration.js inserted after jlux.js as in the branch).

## Build note (network)
This session's proxy denies the picture CDN (ctm-img.victoria-tntt.workers.dev → 403), so build_site.sh's assets.py / img/_index.json fetch fails. Neither branch touches assets.json (it is unchanged vs main) and built files were rebuilt with the repo's own build_site.sh using a local stub of `img/_index.json` made from main's sw.js precache list; the CDN json list in the new sw.js is IDENTICAL to main's (diffed). The stub script was never committed. A personal environment `cung-tuong-mong` with that host allowed now exists for future sessions.
Not run / env-limited: quickcheck.sh's G3 kit-conform (shows "event pictures: 0" because CDN pictures cannot load here) and G4 70-manifest-guard (needs the CDN) — MAIN or a session with CDN access should re-run `bash dev/tools/quickcheck.sh` on the final sha. The old-save + perf + core one-core parts were run directly (quickcheck.js).

Touched vs main d3ea24e8: see `git diff --stat origin/main review/land-m` (shown-odds-r2 j*.js + test, jration.js + monthly-ration tests, jtoil.js, j24.js, assemble.py, built index/sw).

LAND READY 3fdfb43769f7346489e64eccddafe523182401e5 (FF from d3ea24e8d12c2e8f4421e06786ef2dd5307deab7)
