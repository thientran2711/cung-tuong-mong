# merge-hot-3: review/cardflip-smooth-r1 onto main c4e89f8

Branch: review/merge-hot-3, sha feba37e (re-merged after main moved to ba07c65; first version f8a989c on c4e89f8). Pushed.
- Merge --no-ff. Conflicts only in generated files index.html, sw.js: took main's side, rebuilt with dev/site/build_site.sh (assets.json regenerated, unchanged in git).
- dev/build/assemble.py: no conflict. Branch did not change the module list; jflip.js already sits in main's list, so main's list is kept as is.
- Real changes from the branch: dev/build/jflip.js, dev/kit/KIT.md, dev/PROGRESS_cardflip.md, dev/measure/cardflip-*.
- Card-flip measure (dev/measure/cardflip-frames.js + cardflip-trace.py, 1180x820, CPU x4): Decode Image 1 event/4 ms, Layout 15 passes/20 ms, RasterTask 379, no page errors. Matches the "after" column in dev/measure/cardflip-smooth.md. Wall-clock fps still not meaningful here (SwiftShader); a real iPad check is still open.
- Boot + cfDemo(14,3,'me') at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390: no page errors, no horizontal overflow, flip scene runs (not run at 844x390 height, scene check skipped there).
- main moved c4e89f8 -> ba07c65 (merge-hot-2) mid-work: merged again, generated files rebuilt, cardflip measure (Decode Image 1/4 ms, Layout 14/24 ms) and 5-size boot re-run clean.
