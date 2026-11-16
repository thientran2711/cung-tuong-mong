# phone-bars-r1 — review of review/phone-bars @ 3a022369

Reviewer session_01UV1SzivoRHdnDUDwc6UZKt · START_CTX ~0 % (fresh) · finished well under 25 %.
Result: **PASS** — READY **0863f572** on origin/review/phone-bars-r1 (origin/main 73c06812 merged; assemble.py file list resolved = main's list + kvfallback; index.html/sw.js/assets.json rebuilt with dev/site/build_site.sh).
Shots (reports/phone-bars-r1/): 755x1000-home/tab.jpg, 755x1000-servant-home/tab.jpg, 1180x820-home/tab.jpg.

## Checks
- Kit scan: change lives only in kit bar (p1 `:where(.kv1) .bar/.tabs/.bar .main` + j57 tabsFit), one `nav.bar` in the game, KIT.md §0.0 + sample §0b written. No per-screen variant. Minor: sample §0b uses inline style copies of the rule (sample page only) — not a FAIL.
- phone-bars.js (consort + servant, 755x1000, 1180x820, 1366x1024, 412x1058, 390x844, 1024x768): 0 overlap, 0 clipped labels, 0 page errors. Only 755x1000 is the one-page view (kv1); every other size is the spread canvas, bars unchanged (nav 44, tabs 128.6x44).
- Fold 755x1000 consort: tabs 120x36 in 2x4, Sang buổi 84x76 right, all 8 reachable, hud 128.7, open-tab panel 582x591, not clipped (Hậu cung shot).
- Servant mode 755x1000: 5 tabs = 3+2 (161.7x36), Sang buổi tall at right; no overlap/clip; one empty slot at bottom right of row 2 (cosmetic, acceptable; optional later: let the last tab span).
- tab-pairs 755x1000 + 1180x820: 56 pairs, 0 mismatches. kit-conform 755x1000: CONFORMS 85 / MISSING 15, 1180x820 exit 0, no floats. game-feel: exit 0 (old save loads, offline ok).
- design-scale: A (page vs spread) panel box 582x591 vs 582x623 → 32 px (5 %) shorter, xw match 98 %, full 95 % on the merged build. B devices fold, ipad, ipad-pro, fold-cover: 0 errs, no overflow. The run then crashed at the 5th device (390x844 host run) in the harness (`S` undefined after start loop, design-scale.js:46, LIFE), not a UI finding; phone-bars.js covers 390x844 fine.

## Judgement on the worker's flags
- Content area 32 px shorter on Fold: ACCEPT. Owner asked for 2 rows; 36 px rows keep a decent touch target and 13.8 px labels. 32 px rows would only give back ~8 px and make taps smaller. Panel still shows the full card header + first act card (see tab shot).
- design-scale "page = spread" drop is the expected price; the check has no tolerance for the bar difference, so it will report lower matches until its baseline is updated (not done here).

## Test fixes on this branch
phone-bars.js PB_MODE=srv forces a servant start + logs `srv`; pb-run.sh runs one size per process; design-scale.js/game-feel.js start loop now 200 tries and skips Kc origin (as tab-pairs does) — with main merged the 60-try loop left S undefined.
Not run: coop-e2e, scene-end.
