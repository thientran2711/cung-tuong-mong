# anim-pace-r1 (reviewer) — review/anim-pace-r1

Result: PASS (see sha in message to main). START_CTX n/a, no rollover needed.

Merged review/anim-pace onto origin/main 5682ce6f4 (conflicts only in generated index.html/sw.js; site rebuilt with build_site.sh).

Fixes made by reviewer:
1. KIT number clash: anim-pace §82 renumbered to §83 (KIT.md heading, KIT_NUMBERS.md, comments in jflip/jne/jbal2); title-tag keeps §82. Next free: §84.
2. Pace bypass: CSS motion with literal seconds now uses calc(Xs*var(--pace,1)) in p1.html (fxo red/ink/night, stamp, coinp, xam drop, gold flash, shake-hard, night dialog fade, dawn box), jflip result, jfx ripple/hit, jkrev rise, jne beat fade. JS removal timers that must match (j11 fxOver/stamp/coinPop/fxCls) now use kitPace().
3. petal-gold: no code use left (worker); removed from KIT.md text too. Sprite file still on the CDN (unused).
Not scaled (left for follow-up, JS timers coupled to CSS, risk of cut animations): jk2b roulette, jtoil reveal (ktrv), jbook/j87 page curls, loops, stat fx, loading UI.

Tests (headless, built root index.html ?khost=0, CDN via proxy):
- buoi-transition: fold, fold-land, ipad, ipad-pro, phone-land, phone: FAIL 0, 0 page errors, skip tap, Gọn=1 layer. Viewed 755x1000 and 1180x820 frames: full-screen tint, clear title, band + hills + orb.
- Icon slot: BTR_ICON all 0 -> no icon element. Season/festival art: only thu + trungthu band images referenced, both 200 on CDN; other variants request nothing (no 404).
- Old saves: diff adds no save/S fields; BAL.pace not saved. (Custom old-build -> new-build harness timed out on CPU, not a code failure.)
- PERF (dev/test/perf.js, fold, no-warm; no play-perf.js exists on any branch): main base: playable 11250 ms, heap 41.7 MB, long tasks>200ms 38 (max 2065 ms). This branch: playable 11825 ms, heap 42 MB, 38 (max 1601 ms) (one noisy run 45 s playable, 23 long tasks). No play regression. firstLoad 68.9 MB and title time over budget identically on main (existing).
- coop-e2e not run (needs live Worker); change is visual, runs after state applies.
- Not run: game-feel, kit-conform. 1366x1024/412x1058/390x844/1024x768: DOM test only (ipad-pro, phone) + frames not individually viewed.
