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

## RE-CHECK R2 (same reviewer) — verdict: **PASS LAND READY ddbf9c77**
ddbf9c77 = worker 6e9277d8 (ff98fe7e + c9009dba R2 fix + merge e16e1d66) + my merge of live main **884ce97c** (index.html / sw.js conflicted → rebuilt). Diff vs main = the branch's 8 files only (j73, jload, jph, KIT.md §59.1, sw.tpl, test, build). Pushed; fast-forwardable.

| check | result |
|---|---|
| item 6 · cold (evicted) · 1.5 Mbps · real CDN | **main e16e1d66: Fold 67/67 bad (empty portrait frame); branch: Fold 0/78, iPad 0/79**, late pictures 37 → 19–24. Shots LOOKED: Fold at 28 s every box drawn; iPad at 31 s every box drawn, player figure fading in. Small portraits on their way now show the existing kit stranger portrait (no new art); act-card art keeps its frame and gets the line on a child. |
| regression big / cont · 1.5 Mbps | Fold big 1/60 (one 250 ms blank sample of a figure, then complete), Fold cont 0, iPad big 0, iPad cont 0; loader `done` in all (no "Operation too large" death). |
| quickcheck + old save + core gates | PASS on 6e9277d8 and again on ddbf9c77 (old save ok, core gates PASS). |
| perf | ddbf9c77: render 230/229, tab 421/420, buổi 977/1214, tasks>200 19/20, open 1586. Earlier runs showed buổi +300–650 ms (incl. `--net`); a warm-device probe (warm-continue + 4 Sang buổi, main vs branch) showed no gate cover on buổi in either and only event-driven variance; the last run has the branch faster → noise, not a regression. |
| diff read (R2) | sw: one download per picture (in-flight share; waiter falls back to its own fetch when the first fails) — sound. jload: life set queued (8 under cover, 1 off-screen while an on-screen picture is out after the cap, 6 otherwise), lFront/lAfter ≤ 90 s — sound. jph §59.1: portrait stand-in + `.kwaitl` line child + re-look at unlaid slots — sound; KIT.md + kit sample updated in the same branch. j73: child age bands wait while the life set is busy — fine. |

Notes for MAIN (not blocking):
1. Law 9: the worker changed the shared kit part §59.1 itself (one place, whole group, KIT.md + sample, existing kit art, no new part). Kit keeper should be told / take ownership.
2. sw.js now answers CDN img/*.json (FIGURES*, *-fit, POR_FACE2) from the shell copy and refreshes 20 s later = new art manifests appear one open later than before. Accepted trade-off for the slow-line first screen; mention to the art pipeline (a CDN-only manifest change shows on the 2nd open).
3. Stale keys already in her cache stay (no safe whole-cache walk); harmless.
Laws touched: 4 (no numbers), 7 (no new words; «Đang thỉnh tranh…» reused), 9 (see note 1), 11 (whole group via the one kit part / gate / worker), 12 (Fold + iPad) — PASS.
Shots: dev/handover/shots/entry-blank/rv2-fold-cold-1.5mbps-28s.webp, rv2-ipad-cold-1.5mbps-31s.webp (+ r1 rv-*). Delete the folder after landing.
