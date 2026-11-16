# lag-play — play-time lag (owner 16/11 15:05Z, first priority) — worker report

Branch review/lag-play (base origin/main 2232ea32). Measured on the shared 4-CPU test box, Chromium CPU-throttled 4x (phone-like),
HOST mode (rot.js iframe, what the player gets), Fold 755x1000 and iPad Air 1180x820. GPU = ANGLE SwiftShader (no real GPU here).

## Before / after
Stable measure = main-thread busy time (CPU profile, sampled − idle) for the SAME scripted actions, Fold, 3 reps each, back to back:

| action (x3) | origin/main busy | lag-play busy | change | wall time main → lag-play |
|---|---|---|---|---|
| Sang buổi (+3.5 s transition) | 31.1 s | 23.3 s | −25 % | 36.6 → 29.7 s |
| tab switch round (6 tabs) | 59.0 s | 29.4 s | −50 % | 71.1 → 40.3 s |
| Hành sự card + its dialog | 13.3 s | 9.8 s | −26 % | 21.3 → 18.9 s |

play-perf.js (3-min bot + real taps). Tap→paint latency swings ±40–100 % between runs on this box (two runs of the SAME build differ
more than main vs branch), so only the large effects are reliable:

| metric (fold) | main run A | main run B | lag-play run A | lag-play run B |
|---|---|---|---|---|
| worst long task while acting | 1.8 s | 9.1 s | 1.8 s | 3.4 s |
| worst long task in 3-min bot play | 20.7 s | 16.5 s | 2.5 s | 3.4 s |
| live intervals after play | 17 | 51 (leak) | 17 | 17 |
| buổi played by the bot in 3 min | 17 | 21 | 36 | 29 |
| tap p95 (all actions) | 3.2 s | 2.4 s | 2.1 s | 3.1 s |
| tab tap p50 / Sang buổi p50 | – / 1.6 s | 1.35 / 1.45 s | 1.19 / 1.18 s | 1.18 / 2.26 s |
| iPad tap p95 | – | 5.3 s | 6.5 s | 13.4 s (first Pixi load 3.8 s parse inside a tab tap) |

Co-op (coop-lag.js, two throttled clients on one 4-CPU box, live Worker, 6 buổi): NOT improved by this branch and too noisy to judge
(main: turn p95 6.0 s, friend-sees p50 2.4 s; lag-play: 23.4 s incl. a week change, p50 4.3 s). The friend-sees time is the
receiver's busy main thread (frames wait behind long tasks), so it follows the play-time fixes, not the network.

## Update 17:55Z — owner OD 16/11 15:45Z + 15:55Z: tab change = instant on every device
- jbook render wrapper: a tab change calls render directly (no kitCurlSwap, no copy); Dư đồ → page no kcl-in fade either. The page turn
  stays only in the Tuần lục book (kitBook, untouched). kitCurlSwap kept in the kit, unused by tabs. KIT.md §34.0a added, §34.0b scoped
  to books. Dư đồ leather unroll (kitUnroll) unchanged — coordinator: say if the owner wants that gone too.
- New test dev/test/tab-instant.js (Fold 755x1000 + iPad 1180x820, HOST): 6 tab taps each, 20 frames checked for any curl/slide/fade
  layer: PASS 12/12, no page errors. Videos: dev/handover/reports/lag-play-video/tabs-fold.webm, tabs-ipadAir.webm (10 fps, compressed).
- play-perf after this change (2-min bot): fold tap p95 1.41 s (was 2.1–3.1 s), worst act task 1.66 s; iPad tap p95 1.97 s (was
  5.3–13.4 s), worst act task 0.70 s. Budget check fixed (soakLongTasksPerMin was read as a floor).
- Reviewer: dev/test/sheet-turn.js / page-curl.js tab-turn frames are obsolete for tabs now (they still apply to the book).
- Baseline from s19 (square-icons-r1 reviewer, main 5682ce6f, perf.js fold 10 buổi): playable 7.2 s, 23–28 long tasks > 200 ms, worst ~1.0–1.1 s.

## Top causes found (and what was done)
1. Pixi stage canvas resized to 0 px and back on EVERY tab switch (stage collapses under other tabs) → WebGL buffer realloc twice:
   0.5–5 s per switch at 4x. FIXED (j11: skip 0-size / same-size resize; j79 kitStagePause also pauses the stage layer while it is 0 px;
   j19 RO wakes it). Same action set: 8.5 s → 0.18 s.
2. Every figure picture that arrived re-paginated every open book (kitFigBody / learn → __kbk.relayout per picture): 5–20 s freezes
   while a life's figures stream in (the "20 s long task" in bot play). FIXED: one coalesced kitBookRelayoutSoon (j87, jsl).
3. Act-card name lookup (kitActKey → kpSlug of every table entry) re-run for every card on every DOM change (kaNorm observer + 3
   kpActArt wrappers) ~300 ms/buổi; kitPhActReady did Object.keys of the whole act table per card. FIXED: memo per KIT_ACTS object.
4. (now REMOVED for tabs, see update) Tab page-turn copies the whole page with computed styles 3–4 times per switch (kclPrep), plus per-frame forced layouts. FIXED part:
   one getComputedStyle per element, boxes below the visible bottom keep class styles only, re-print only when the page changed
   (MutationObserver / pictures loading), copied scrollers sync only after a scroll. Still the biggest tab cost (~200 ms/copy at 4x).
5. Layout thrash (read-after-write) in render passes: fixTitles, j59tags (innerText per person), kitMeMark scheduling (each DOM change
   queued another rAF pass + an uncancelled 700 ms pass), rank-name pass re-reading every person's title (kitTitle→kitFace) per root;
   image arrivals each doing a full render(). FIXED (two-phase reads/writes, one pending pass, per-pass title memo, kitRenderSoon).
   Also willReadFrequently on the 3 pixel-measuring canvases (GPU read-back on phones).

## Not fixed (next steps, measured)
- render() is ~30 wrapper layers; a Sang buổi still costs ~350 ms script at 4x + forced layouts (kitHdMe, k3Shell, k3Stage, k3RW,
  kmmAvoid read layout between other layers' writes). Needs a read/write phase split in the render chain (big change, kit owners).
- Co-op: {t:"seat"} full seat copy 37–47 KB sent every ≥3 s while state changes (26 sends = 1.1 MB in 4 min); COOP.send gzips only
  above 200 KB (BIG). Suggest gzip above ~8 KB or a delta — needs the coop owner (Worker reads it).
- Listeners +230 and detached nodes +2.7k per ~25 buổi on both builds (slow leak; dev/test/play-leak.js lists the growing ones).
- First Pixi load (script parse + init) lands inside the first tab/act tap: 3.8 s parse at 4x on iPad. Preload it idle after the title.
- coopRejoinMs: coop-lag's rejoin detection never saw both seats back within 120 s on main or here — test-side doubt; report only
  (coop-rejoin-stats.js is the authority).
- Visual check of the page turn after the copy change: screenshots of the live pages are fine; a mid-turn frame could not be
  frozen on the Fold slide (kitCurlSwap.hold) — reviewer please look at one tab turn on 1180x820 + 755x1000.

## Tests added (dev/test/README.md "PLAY-TIME lag budget")
play-perf.js (+ play-perf-budget.json, ONE place for the numbers; ceilings now = regression gate ~30–50 % above this branch,
_target = the goal), coop-lag.js, play-prof.js (--tree, --callers), play-trace.js, play-leak.js, lib/playperf.js (shared launch
flags: ANGLE SwiftShader — the old --use-gl=swiftshader added ~70 ms/frame fake canvas commit cost).
Reviewer checklist line for the coordinator to add to REVIEWER.txt (coordinator note, not an owner rule):
"Every branch touching game code: run node dev/test/play-perf.js --devices fold,ipadAir (and coop-lag.js for co-op branches) on the
branch AND on origin/main back to back; FAIL if a budget is missed and the branch is worse than main."
No UI / kit / wording change. Behaviour kept (all changes are caching, batching or skipping invisible work).
