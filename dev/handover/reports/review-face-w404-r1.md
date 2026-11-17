PRIORITY #1 CHECK ('@W|FPOOL|face-consort|faceUrl'): OD 1 (L1636, unrelated) | ledger 1 | claims: FACE TOKEN 404 row (D, worker session_01964izC859jzWy9Hygkf3UJ) | main dev/build/j25.js:88, j17.js FPOOL probe | review/face-w404 (this)

# review r1 of review/face-w404 @ df8b57bc7d6092cc2da8532704102441190829ad  (merged with origin/main e9bbc4d6 -> 51857175, branch review/face-w404-r1)

Merge: source merged clean; index.html/sw.js conflicts = generated files, rebuilt with dev/site/build_site.sh.

## Verdict: FAIL 1 — the fix switches OFF every face in new draws (gameplay change, violates check 2)

### FAIL 1 (blocker) — j17.js FPOOL probe compares the wrong string
`faceUrl()` returns "img/"+fc+".webp", but dev/build/assemble.py rewrites every "img/ literal to the CDN base in the BUILT game. Built all.js:3291 is
`return "https://ctm-img.victoria-tntt.workers.dev/img/"+fc+".webp"`. `CDN_INDEX` keys are stripped to "img/<file>" (`replace(/^.*?(?=img\/)/,"")`), so
`ix.has(u)` is false for EVERY token -> FAV[f]=0 for all 172 non-@W pool entries (every consort, maid, mama, eunuch, emperor, man...).
Fix hint: `ix.has(u.replace(/^.*?(?=img\/)/,""))` (same strip on both sides) — and re-run everything below.

Evidence (dev/test seed script, kept at /home/user/wt/rvkeep/seed.js; Math.random seeded identically, 6 seeds, start() after 6 s of load, live main build vs branch build, real CDN):
- FAV==0 entries after load: live 0/2/0/0/0/3 ; branch 172 in all 6 runs.
- new life, seed 0: me live face-consort-05 -> branch ""; maid face-maid-31 -> ""; emperor face-emperor-8 -> ""; rivals face-consort-13/07 -> ""; servants (maid/eunuch/mama) all missing.
- persons compared 301, different 247. i.e. who-gets-which-face is NOT the same as live; new lives get empty faces (fallback silhouettes/pics).
Why the worker's gates did not see it: the 404 scan counts 0 because nothing is requested any more (faces are never drawn); the old-save test only loads saved ids; quickcheck old-save/perf do not draw new faces (perf even "improves": buổi 983 vs 1115 ms is partly this). 

## Other checks (as far as they could be judged)
1. Root cause: right (raw token probe; @W inline = data url; face-man-1..8 absent). One faceUrl() resolver in j17; no other site builds an fc-token URL by hand (grep clean; fixed-name fallbacks face-eunuch-N / face-physician / kid faces / face-official-N are not token paths). OK, but see FAIL 1.
2. No gameplay change: FAIL (above). @W handling itself matches live (FAV=0 sync) — fine.
3. Perf quickcheck median of 3 new/live: render 196/213, tab 364/398, buổi 983/1115, tasks>200ms 16/14 (not meaningful while faces are off). Offline/slow index: fallback Image probe present, undefined FAV = drawable like live; not exercised.
4. Gates at 51857175: quickcheck PASS (core gates, time-spill, old save ok), one-core 0. Fold/iPad 404 scan + shots NOT re-run: the scan result is invalid until FAIL 1 is fixed.

## For C / MAIN (art note only)
face-man-1..8 (FPOOL.man = rng(1,8,"face-man-"+i), dev/build/j22.js:4) are referenced and missing on the CDN: face-man-1, face-man-2, face-man-3, face-man-4, face-man-5, face-man-6, face-man-7, face-man-8 (only face-man-old-1..4 exist).

FAIL 1 @51857175ba7c (review/face-w404-r1 = merge of branch + origin/main; same defect as worker sha df8b57bc7d6092cc2da8532704102441190829ad)

# ROUND 2 — review of review/face-w404 @ c81fd72c310e34267a65f6b221112fd448e41777 (merged with newest origin/main c114ab9e -> 51b87607b1c4acccfd212f3e585cb81478ef4500, branch review/face-w404-r1; FF from live main)

Fix checked: one `cdnKey()` on both sides of every index lookup (j17 FPOOL probe, j82 kg82Pic; jevban KIT_CDNHAVE = the shared CDN_INDEX). Other KIT_CDNHAVE users (jevb, jevban kitEvBanner, jph) already stripped; nothing left comparing a raw/prefixed url. Branch source diff vs main = j17, j25, j82, jevban only.

1. Same-seed compare (my scripts, kept at /home/user/wt/rvkeep/draw.js + seed.js; real CDN, Fold device):
 - FAV after load: identical pool by pool live vs branch (33 zero = 25 @W + 8 face-man, same entries; FAV-zero set identical, 6/6 runs). Round-1 defect (172) gone.
 - drawF compare (3 seeds x 15 kinds x 4 ages x 40 draws = 7200 draws, facesPresent neutralised, seeded Math.random): live-vs-live 0 different; branch-vs-live 0 different; empty draws 480 on both (the same pools that are empty on live: man etc.), 0 extra empty. => who-gets-which-face for new lives is unchanged (me/maid/emperor/Thái hậu/rivals/court/servants all come from drawF/faceFor).
 - Noise floor of the whole-life seeded start (start() with seeded random) is NOT zero even live-vs-live (async timers consume Math.random): 216/306 persons differ live-vs-live too, so the whole-life compare is not a usable gate; the drawF compare above is the deterministic one. FAVset (what feeds drawF) identical.
2. 404 scan (dev/test/face-w404-scan.js, title -> new life -> tabs -> person cards): Fold 755x1000@2: 545 requests, 0 x 404, 0 page errors; iPad 1180x820@2: 453 requests, 0 x 404, 0 page errors. Failed/other = ERR_ABORTED cancelled image swaps (fig-*, map-xuan-sang), not 404 (Fold 39, iPad 3; round 1 worker said 3-6 — Fold count is higher here because the run was longer on a slow proxy; all -1 aborts, no HTTP error).
3. Old save (face-w404-oldsave.js, saved on LIVE build, loaded by branch): 51 people, face ids + drawn urls identical 51/51, forced "@W3"/"@W8" rivals keep their portrait, 0 page errors.
4. quickcheck on the PASS sha 51b87607: PASS (core gates PASS incl. one-core-guard 0 fails, time-spill PASS, old save ok). Perf noisy: median of 3 buổi 1125 vs live 921 (+22 %), previous sha b7bb7a66 841 vs 1061, median of 5 on the same sha: render 163/202, tab 300/306, buổi 807/950, tasks>200ms 11/13 => no regression (same drawF workload, shown above; index fetched once, shared).
5. j82 kg82Pic keep (D decision): LOOKED at every minigame at Fold 755x1000@2 (dan, hat, co, dauho, ban, tho, doi, doden, ve, hoa, theu, kim, mua, banh, huong = all 15) and iPad 1180x820@2 (dan, hat, co, dauho, ban, tho, doi, doden, ve, hoa): background painting now shows (live Fold dan/ve = plain cream, bg dropped — confirmed side by side). Backgrounds fit the game frame, cover the box edge to edge, the intro "Cách chơi" cards and HUD/labels (string names, ingredient plates, flower labels, hương labels, nút) stay readable over them, no overlap/cut-off; feet/figures column on iPad unaffected. Notes only (not a FAIL): hương title wraps to 2 lines and sits tight to the top at Fold (same text on live; not background related); the "Tuyệt!" pop on dan Fold is faint over the wooden floor (fades, pre-existing). minigames91.js assertions not re-run in full (harness stops at theu "kfgain" dialog intercepting a tap when run in one go; kinds were run one by one).
6. Offline/slow index: code path = fetch fails/empty -> null -> Image-probe fallback; FAV stays undefined (drawable) until resolved, same as live. Not exercised against a real outage.

## For C / MAIN (art note only): face-man-1..8 still missing on the CDN (face-man-1 … face-man-8; only face-man-old-1..4 exist). FPOOL.man in dev/build/j22.js:4. No review images were uploaded to the CDN; scratch shots outside the repo, deleted.

PASS 51b87607b1c4acccfd212f3e585cb81478ef4500
