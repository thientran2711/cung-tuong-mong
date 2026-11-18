# review-entry-blank-r3 — BIG review (session_01Rc5AsMhWSwNH8bFZFtfMQB, opened by MAIN ROOT-55)

PRIORITY #1 CHECK ('entry blank'): OD 18/11 ~18:25Z owner bug (follows life-preload OD 18/11 ~01:35Z/01:50Z/02:06Z) | main lifeGate/§59.1/j59/sw prune (live fa411d6f) | review/entry-blank-r3 b02c68b4 (worker report entry-blank-r3.md) | claims entry-blank-r3 session_01Rc5AsJn6SQf4eq1uMdP1U5. No other branch on this.
START_CTX ≈ 5 %. depth n/a (reviewer).

## Reviewed sha
**review/entry-blank-r3 @ ff98fe7e** = b02c68b4 + my 1-line fix (a duplicated silhouette comment in jload.js) + merge of live main **fa411d6f** (index.html / sw.js conflicted → rebuilt with assemble.py + build_site.sh; diff vs main = only the branch's 3 source files + test + build). Pushed. Ancestor of origin/main fa411d6f → fast-forwardable.

## Verdict: FAIL — one item (6). Items 1–5 PASS.

| # | check | result |
|---|---|---|
| 1 | merge newest main (fa411d6f, not 13bb8c88: main moved) | PASS, ff98fe7e |
| 2 | root cause + diff read | PASS. Confirmed for real on this env (CDN reachable): with 20 000 cache keys Chrome refuses `cache.keys()` ("Operation too large"). sw.js: no whole-cache walk; prune = diff old/new shell assets.json, once, 15 s later, not per fetch. jload: `cacheHave` per-key lookups; `moveCdn` once per device; `lCore` trusts core only when verified (`done`/`all`/HAVE), false with no manifest; fig body measured on arrival (null cb is safe: kitFigBody calls `f&&f()`); KIT_SILBB preseeded. Offline: plan() falls back to the cached assets.json; lCore false → gate loads core from the SW cache (instant). Old SW at update time still walks once (old code, can't be helped); first transition from main diffs correctly (main's shell holds assets.json). Minor, harmless: a PRUNE list not yet run is lost if a 2nd build activates within 15 s (stale keys stay, nothing reads them). |
| 3 | entry-blank.js fails on main, passes on branch | PASS. big · Fold · 1.5 Mbps: **main 60/60 bad samples (empty frames/portrait/icons, stage hidden), loader dead in `check` "Operation too large"; branch 0/60, loader `done`**. Branch also: big · iPad 1.5 → 0; cont · Fold 1.5 → 0; cont · iPad 1.5 → 2 single samples (1 empty box, 1 stage), screen complete after; merged ff98fe7 big · Fold 5 → 0, big · iPad 5 → 0. |
| 4 | old save + quickcheck + core gates | PASS on ff98fe7: QUICKCHECK PASS, old save ok (0 errors), CORE GATES PASS, TIME-SPILL PASS. |
| 5 | perf vs live | PASS: render 253/269 ms, tab 440/477, tasks>200ms 17/17, open 1419/1461, playable 6078/6385. buổi 1459/1161 = run noise (spread 1161–1498 both sides; branch touches no buổi code). |
| 6 | evicted cache · 1.5 Mbps: any box still empty? | **FAIL.** cold · Fold 1.5: gate covers to its 25 s cap, then for the whole remaining 15 s (still at 40 s, last shot) the **player's portrait chip (top bar) and the cung-nữ side-card portrait are empty paper frames with no line and no picture** — exactly the owner's complaint. Both stage figures do show the §59.1 silhouette (fine). Same on iPad cold 1.5 (65/65 uncovered samples with an empty box). Not a regression (main does the same on this path), but the brief requires "never empty". Cause: KIT §59.1 gives small slots (< 72 px) no line, and the gate cap opens before an 8 MB life arrives at 1.5 Mbps; the 3 visible pictures (portrait + 2 figs) are not fetched before the other ~35 late ones. |

## FAIL list (for the worker / MAIN)
1. Small §59.1 slots must never look empty: this is a KIT change (law 9) → MAIN files a KIT REQUEST for the kit keeper. Suggestion: a waiting small portrait slot shows the existing kit unknown-portrait silhouette (the one the Hoàng hậu card already shows) instead of bare paper; a waiting small icon shows its kit stand-in. Then the worker wires it.
2. Gate order: after the cap, pictures that are on screen now (portrait chip, side cards, stage figures) should be asked first, ahead of the rest of the life set, so they arrive in seconds rather than at the end of the queue.
3. Re-run `dev/test/entry-blank.js <out> fold,ipadAir cold 1.5` → 0 empty boxes after the cap.

NOTE FOR MAIN: items 1–5 are sound and verified; ff98fe7 is strictly better than live (fixes the big-cache dead loader / empty first screen, and the empty room on Tiếp tục). Landing it now as a partial fix while item 6 goes through the kit is MAIN's call; the cold 1.5 Mbps path is unchanged vs live either way.

## 18 laws touched
4 ONE CORE: no numbers added (PASS). 7/VANPHONG: no wording change (PASS). 9 KIT FIRST: no new part, no per-place variant (PASS); item 6 needs a kit change, not a private fix. 11 WHOLE GROUP: the fix goes through the one loader / worker / gate for every first-screen picture (PASS). 12 TWO DEVICES: Fold + iPad tested and shot (PASS). 13 GATE ZERO: worker report has the line (PASS).

## Shots (CDN upload refused earlier for the worker: on the handover branch per common brief; LOOKED)
dev/handover/shots/entry-blank/rv-after-fold-bigcache-update-ff98fe7.webp, rv-after-ipad-bigcache-update-ff98fe7.webp (after-update, big cache: every box drawn, stage + people, act panel), rv-fold-cold-1.5mbps-40s-empty-portraits.webp (item 6: two empty portrait frames). Delete the folder once item 6 lands.
