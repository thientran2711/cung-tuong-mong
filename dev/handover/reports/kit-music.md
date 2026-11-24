
## REVIEW r1 (24/11, sonnet reviewer-lander, Foreman B)
PRIORITY #1 CHECK: KIT §96 | LIVE music old six | review/kit-music 0ff57cb0 (KK18) | claims B | no earlier kit-music review found.
Merged review/kit-music onto origin/main 0c0877a2 as review/kit-music-r1; rebuilt (bash dev/site/build_site.sh), built files committed. Head 475df8baeba238e7160c61883b6417595f5a5724 (origin/main is an ancestor). Branch had NOT rebuilt index.html/sw.js/assets.json.
Laws touched: 4 (holdMs is BAL.kmus, jbal2.js; no typed numbers), 7/14 (no player-visible text added; the old musicCtx wrapper in jpres is removed, not kept beside the new one), 6c (every new key has an old-six fallback KMUS_FB, never silence).
Results (MERGED head 475df8ba unless noted):
- node dev/test/kit-music.js, BARE head 0ff57cb0 (own build): ALL PASS (Fold 755x1000).
- node dev/test/kit-music.js MERGED, Fold 755x1000: ALL PASS. Same file with viewport 1180x820 (iPad): ALL PASS. Key lines: "ok missing file -> falls back to bgm-day (curName bgm-day)", "ok event track holds, then base returns", "ok no page errors".
- node dev/test/presentation.js http://localhost:8931/index.html <out> 755x1000@2 1180x820@2 (Chromium via proxy): cats 75, noPlan [], noSound [], badMus [] (music follows the group = musicCtx), errs [], gon [], perf maxGap 28 ms. Only "ok:false" cause = http4xx 404 on CDN audio/bgm-*.mp3 (files not uploaded yet; the game fell back to the old six). NOTE: presentation.js counts a 404 on .mp3 as a failure; it will go green once the 37 CDN files exist, or exclude mp3 from its filter.
- bash dev/tools/quickcheck.sh --runs 5 (alone): "QUICKCHECK PASS · 448 s · open 2033 ms · old save ok · perf (median of 5, new/live): render 277/291 ms, tab 512/529 ms, buoi 1703/3088 ms, tasks>200ms 24/27"; core gates PASS (one-core-guard, rules-one-source, kit-conform, hooks 7), time-spill guard PASS. A first run (3 runs) FAILED perf longTaskMaxMs 6353 (one run 7039 ms; live had a 5519 ms run too) = box noise, not repeated with 5 runs (median 2448 vs live 3454).
- node dev/test/coop-e2e.js (live Worker): 142/142 passed, seat order A=Fold host/B=iPad guest. COOP_SWAP=1 node dev/test/coop-e2e.js: 142/142 passed (seats swapped). Music is per-seat; both green.
- Old save: quickcheck "old save ok" (loads, plays a buoi, 0 errors).
Missing CDN files: verified live in presentation run (404 on bgm-joy.mp3, bgm-fest-thanhminh.mp3 …) with 0 page errors, and in kit-music.js (joy → bgm-day). Never silence.
Open (from the worker, not gated): «đại lễ tế Giao» category not wired to key daile; vocals of the 37 files unchecked; the 37 files are not on the CDN yet (upload needed before players hear new tracks).
VERDICT: PASS — kit-music-r1 475df8baeba238e7160c61883b6417595f5a5724.
