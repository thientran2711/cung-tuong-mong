# Review: review/nw-poem (eb5f223) -> review/nw-poem-r1

Verdict: **PASS 5d2000414bedc4839f39b98d999606b00b020295** (descends from origin/main 802fe821; branch already contained latest main, no merge needed).

## My change (1 small fix)
- `nwTier` in dev/build/jnwp.js: with review/mg-balance, `KG82.tier` is an OBJECT (`mgSet` returns `{tier,ease,...}`), so the worker's `typeof === "number"` test never matched and it silently fell back to `kg82Tier(env.lv)`. It now reads `.tier` from an object or a number. Site rebuilt (build_site.sh).

## Checks
- Entry scan (dev/test/nwpoem-scan.js): contests, plain arts, lessons all -> calli/doiline; verse/pair unregistered; no doi quiz bank; 0 page errors. `grep` confirms no other reference to `KG82_ENG.verse/pair`.
- Play (oracle bot, LV=2) tho/doi: 755x1000@2 10/10, 1000x755 10/10, 1180x820@2 10/10, 1366x1024@2 10/10, 844x390 10/10, 390x844 rotate prompt shown (10/10 behind it). 0 page errors, no horizontal overflow. One parallel run gave 0/6 at 755x1000 (CPU contention, same flake the worker saw); passed alone.
- Screenshots viewed (tho 755/844/390, doi 755/844/1366): demo-less board, Gợi ý button, labels, tiles, brush all uncut; kit tiles/buttons/HUD only, no new CSS/art.
- Numbers: all tunables in `BAL.nw.calli/doi` (assigned onto the one BAL object, in jnwp.js). Small hard-coded bits remain (result-word thresholds .85/.65/.4, timers 250/1300/1500 ms) - non-blocking.
- mg-balance compatibility: `mgTier`/`mgSet`/`mgFull(env,b)` signatures match; `merge-tree` nw-poem vs mg-balance: only dev/build/assemble.py conflicts that concern nw-poem (one list line: keep both jmgt.js and jnwp.js); j83.js and jtabs.js conflicts come from mg-balance being based on an older main, not from nw-poem. mg-balance must add `BAL.mgTier.kAdj.tho/doi` and may move BAL.nw to jbal2.
- Old saves: only lazy `S.mgSeen.nwcalli/nwdoi`; no schema change.
- Not re-run: skilled/random tier-distribution bot (real-time, too slow here); relied on worker's table (random ~0, skilled Khó 25-33 % at >=9). Worker noted tho lane was tightened after that run -> final calibration belongs to mg-balance's virtual-clock bot.

## Notes / owner questions
1. Festival blurbs in j71 still say "Thi thơ", "ra vế đối" (worker's question 1): wording pass for coordinator, not a FAIL.
2. Dead word code (k91Verse/k91Pair, DOI, j82 bank) left on purpose; delete after nw-lantern/nw-quiz land.
