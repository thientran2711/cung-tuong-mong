# review/cycle-art-r1 (reviewer, Foreman C) — A7b art for the monthly cycle

**PASS 74f96d6c13c98f64cb77526cc3b4ee0a67311f67** (branch review/cycle-art-r1 = review/cycle-art; origin/main eba64ead is already an ancestor, merge = "Already up to date"; jcycle.js is last in assemble.py; no code change by me).

## Checks
1. Pictures: all 7 downloaded from the CDN and looked at. Fit: banner = maid bowing to the lady over the open register; Xem = silver slid to the clerk; Xem lén = night, cloaked woman peeking by one candle; đúng = honest note to the clerk; lùi = day marks pushed one place; sớm = note at the door, tablets ready; giấu = maid turns away from the door, note unsent. Art rules OK: no Emperor, no explicit content, no blood, nobody poor (fine silk, hairpins), men only in teal/navy (no pink/purple), no moles, serene faces. Sizes 640x480 / 384x506 as stated.
2. Live CDN img/ACTS.json: valid JSON, 392 keys (390 + 2), both new keys point to xem-so-nguyet-su / xem-len-so-nguyet-su.
3. Rule-steal scan (old d9c47fad1 vs new KIT_OPT_RULES, first-hit with kitOptHit, 27,275 distinct string literals of dev/build/j*.js): only "báo lùi", "Báo đúng ngày", "Báo lùi vài hôm", "Báo sớm, nói đã sạch kỳ" (to-giac -> new) and "Giấu, không báo" (giau-trong-ruong-h -> new) change. Nothing else moved.
4. Browser: `node dev/test/cycle.js index.html out 755x1000@2 1180x820@2` -> ALL OK (logic ok, both sizes "ok rows 12", no page errors). Screenshots viewed: pop-up at 755x1000 and 1180x820 shows the new banner + the option pictures (kit option rows, nothing custom, no cut text); Hành sự deck at 1180x820 shows both new cards with their own pictures (no placeholder). At 755x1000 the hs shot did not scroll to the cards, so the deck cards there are not seen by me (worker saw them; the same kit card renders at 1180).
5. Rebuilding with build_site.sh in my sparse worktree changed only the hashes in assets.json/sw.js (index.html identical) — reverted; worker's generated files kept.

## Notes (not blocking)
- "Xem lén" art is a woman in a plum cloak (dark scene); fine for a woman, not a man.
- No KIT REQUEST.

Next step: Foreman C fast-forwards main to 74f96d6c13c98f64cb77526cc3b4ee0a67311f67.
