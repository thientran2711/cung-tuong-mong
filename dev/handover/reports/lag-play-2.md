# lag-play-2 — play-time lag, part 2 (owner 16/11 15:05Z, first priority) — worker report

Branch review/lag-play-2, base review/lag-play @ 7200e7d2 (rebase onto its PASS sha when it lands). Same test box / flags as lag-play
(4 CPU, Chromium CPU 4x, HOST mode, ANGLE SwiftShader). No UI / kit / wording change: every change is caching, batching or skipping
repeated work, or a network-format change in co-op.

## What changed
| # | task | change | files |
|---|---|---|---|
| 1 | render chain | `nrDOM` (j65) ran after renderHUD, renderHud2, renderStage, renderPanel AND render = 5 full DOM passes per render → nested calls only count, the outermost runs it once. `fixTitles` (tooltip cleanup, read scrollWidth = forced layout mid-render) → next frame, once. | j65.js |
| 1 | render chain | `kaNorm1` button-normaliser chain (6 wrappers) ran on every button twice per render (~150 ms at 4x each) → per-button memo (class + children + text length + attrs); dialog buttons always run. | jlag2.js (new, last module) |
| 1 | render chain | `tabsFit` (2x per render, reset --tfs + measured every tab) → only when viewport / tab buttons / shell classes changed. `kitHdFit` no longer mid-render after renderHUD (it still runs at the end of render). `kitPane` observer → once per frame, writes only changed values. Rank colour painters (`kitRankPaint`, `kitRankNamePaint`): name regex before the ancestor walk; nested roots walked once; name→title table rebuilt once per render (`window.__rendN`). | j57, jk4, jpane, j79, jaudit |
| 2 | co-op seat copy | `COOP.send`: any frame > 8 KB is gzip (the Worker already gunzips every binary frame), all sends go through ONE ordered queue (a small message never overtakes a big one being compressed). `{t:"seatd"}` = only the changed parts (`buoi`,`used`,`c`,`d.<k>`,`d.S.<k>`) on top of the server's stored version `sv`; server applies only on exactly that version, else `error seatresync` → client sends the full copy. Used only when the Worker's `room` reply lists `caps:["seatd"]`. | jcoop.js, jcoopworld.js, coop/worker/src/index.js, PROTOCOL.md, seat.test.mjs (+7 checks, ALL OK) |
| 4 | first Pixi load | `pxPreload()` (j11): ~2.5 s after a life is in play, at idle: load the library, open the stage layer if the stage is on screen, open the FX overlay app (hidden, ticker stopped). Skipped with effects off / reduced motion. | j11.js |

LIVE WORKER NOT DEPLOYED (coordinator decision, it is the owner's live co-op). Until it is deployed the client sends the full seat copy
gzip-compressed (~37-47 KB → est. 5-8 KB per send, measured below); after `wrangler deploy` of coop/worker it sends deltas.

## Before / after
Same-box A/B, back to back, alternating order, 2 lives each (`.lp2/bench.js`-style: life settled 25 s, then CPU 4x; per tab tap
CDP Performance.getMetrics deltas over 1.5 s; medians of 54 tab taps, 6 Sang buổi):

| metric (Fold, median) | review/lag-play | lag-play-2 | change |
|---|---|---|---|
| tab tap: script ms | 362 | 277 | −23 % |
| tab tap: style+layout ms | 256 | 206 | −20 % |
| tab tap: all main-thread task ms (1.5 s window) | 1058 | 971 | −8 % |
| tab tap: render() synchronous ms | 266 | 217 | −18 % |
| tab tap → next paint (Event Timing) median / p95 | 592 / 1544 | 424 / 1376 | −28 % / −11 % |
| Sang buổi tap → paint median | 1000 | 968 | ~same |
| Sang buổi task ms | 1721 | 1829 | ~same (noise) |

play-perf.js (2-min bot, same box, base run first then this branch; single runs swing ±40 %):

| play-perf metric | fold base | fold lag-play-2 | iPad base | iPad lag-play-2 |
|---|---|---|---|---|
| tap p95 ms | 1768 | 1064 | 2224 | 2848 (noise; tab bench above is the stable measure) |
| worst long task while acting ms | 3568 | 2054 | 12925 (first Pixi load in a tap) | 2621 |
| worst long task in bot play ms | 4084 | 2584 | 2591 | 2756 |
| long tasks / min in bot play | 65.5 | 77 | 87.5 | 71 |
| heap growth MB / DOM growth | 4.4 / 800 | 5.1 / 640 | 4.1 / 712 | 4.5 / 673 |
| budget | FAIL (soakLongTaskMax) | PASS | FAIL (actLongTaskMax) | PASS |

## Goal status (honest)
Goal tap p95 ≤ 200 ms at CPU 4x is NOT reached (tab p95 ~1.4 s). After these cuts the tab cost is spread over many layers (no single
hot spot left above ~10 %): panel rebuild via innerHTML of the whole page + ~60 render wrapper layers + ~45 forced layouts per tap.
Reaching 200 ms needs the structural change: render the panel incrementally (diff instead of innerHTML), and move all
measuring wrappers into one read phase. That is a multi-module rewrite of the render chain, not a speed patch.

## Tried and dropped
- Skip renderStage / renderHUD on tab-only taps when nothing rendered since: DOM compare (skip vs full render, same page) showed the
  stage side cards differ (a later pass rewrites a "Lòng" value), and it skipped only 2 of 7 taps (picture arrivals render in between).
  Removed — not safe without a per-part state signature.

## Not done (next worker)
- (3) slow listener / DOM leak: not investigated in this session (play-leak.js). play-perf soak numbers below show heap/DOM growth.
- render chain structural rewrite (above). Profile hot spots left (tab): getImageData in picture measurers kitFigBody / kporMeasure /
  kmmHead (~70 ms per tab at 4x while pictures arrive; could persist results per picture URL), kitDialogOpen sync getClientRects,
  jk2b tab-change re-measures at rAF+160+480 ms (the 160/480 were for the removed page curl).
- Sang buổi: unchanged by this branch; profile it next (nextBuoi chain).
- Deploy coop/worker (coordinator) then run coop-lag.js to measure seatd live; a staging worker (`wrangler deploy --name ctm-coop-lp2`)
  + `coop-lag.js --worker <url>` was not run in this session.

## Tests run
- coop/worker: merge / vault / seat tests ALL OK.
- coop-e2e.js (live Worker, new client = gzip seat copies + ordered queue; Worker without seatd): 59/59 PASS
  (COOP_OLD_REF=origin/review/lag-play for the old-save step: old save loads). A first run had 2 FAILs at "start: each sees the other"
  (timing; passed on the rerun, and the same checks pass from week 1 on) — reviewer: rerun once if it shows.
- play-perf.js fold + ipadAir: PASS (table above). No page errors.
- coop-lag.js: NOT run (needs the deployed / staging Worker to see deltas).
- Visual: no CSS / markup / wording change in this branch; kit-conform + per-tab shots NOT re-run (reviewer: one round of tab shots).

## HANDOVER (worker rolled over at context ~30 %, START_CTX ~5 %)
Successor (opened by the coordinator): continue on review/lag-play-2 @ <this sha>. Order: (a) deploy staging Worker
`cd coop/worker && npx wrangler deploy --name ctm-coop-lp2` (api.cloudflare.com is proxy-authenticated), run
`node dev/test/coop-lag.js --worker https://ctm-coop-lp2.victoria-tntt.workers.dev` → coopSyncKBMax before/after; (b) leak (play-leak.js
--buoi 16, fold); (c) Sang buổi profile (play-prof --acts next --tree); (d) structural render-chain plan for the 200 ms goal.
Tool kept out of the repo: an A/B bench (two roots, alternating, CDP Performance metrics per tap) — rebuild it from the table method above.
