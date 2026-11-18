# review lyf-tier (reviewer session_01UV1SzkwG1gCApRdP2jjZYj)
PRIORITY #1 CHECK: brief lyf-tier.md + report lyf-tier.md read; git grep lyF across dev/build, dev/test, dev/measure; claims row MAIN.

VERDICT: PASS 2848c13 (review/lyf-tier; merge of origin/main 550dd1b into the fix 22dac5c).

## Checks
- Branch: 2848c13 is a FF of origin/main 550dd1b; diff vs 550dd1b = jly.js, jmort.js, dev/test/lyf-tier.js + generated index.html, sw.js only. Live main has since moved to 97de885 (face-reveal-anim); 97de885 touches none of jly.js / jmort.js / lyf-tier.js, so the coordinator only needs the usual generated-file rebuild when landing (no source conflict).
- Readers: git grep lyF over dev/build/*.js (excl. avatars), dev/test, dev/measure. Truthiness readers of a person's lyF were exactly the 6 fixed (jly.js:19,20,21; jmort.js:44,59,66), all now `===1`. Every other use is S.lyF as the object (W_KEYS, jnpcd, jreign, lyFallen, tests) = correct. None missed.
- Old saves: lyFallen() has always created the object with lyF:1 (jly.js on main); S.lyF is an object, so S never equals 1. Old save with S.lyF object and the lyF:1 object both load right (npc-death old-save case ok; lyf-tier round trip ok).
- lyf-tier.js 33 ok; on main 550dd1b it shows the bug (figTierOf(S)=-1), on the branch 0 real FAIL.
- npc-death.js (old main as oldRoot) 13/13, 0 FAIL, no page errors.
- one-core guard / bind / text-rule / text: all PASS.
- quickcheck PASS (open, old save, perf new/live render 183/151 ms, core gates, 336 s).
- Shots (CDN img/_review/lyf-tier/, Fold + iPad home + map-tab, before/after): LOOKED. Before = her figure in plain cream cold-palace dress; after = her figure in rank gown (orange phoenix / pink peony), Cung nữ beside her unchanged. Same dress class on both devices.
- Kit: no UI change. VANPHONG: no player text change.

Not shot: mirror / avatar (same figFor/figTierOf path, covered by the lyf-tier test table).
