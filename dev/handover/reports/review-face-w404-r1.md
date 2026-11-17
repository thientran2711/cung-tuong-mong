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
