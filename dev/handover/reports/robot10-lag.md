# robot10-lag — ORDER #7 LAG + ORDER #8 ANIM-STRESS (Foreman D worker session_01964izEXA2WNV5vDcurKoaC, sonnet)

PRIORITY #1 CHECK ('anim-stress|ANIM BUDGET|coop-lag|long tasks'): OD 3 | ledger 0 | claims 5 | main 0 anim-stress (REUSED dev/test/coop-lag.js, lib/playperf.js, play-perf-budget.json, robot10 runner) | review/* robot10-harness (base) | claims D robot10 part 2 split.
Branch review/robot10-lag · head 9001e14c898c4c3c87563ddbb617ab0b7fdccced · base robot10-harness 875ad4ca + main 24883e24 (merged; LIVE 14ba8768 ancestor). TEST-ONLY: dev/measure, dev/test. Game bugs = REPORT ONLY.
Data + the full report: dev/handover/robot/lag-20261124/ (lag-20261124-0314.md/.csv = LAG + ANIM BUDGET sections; anim-*.json raw cells; lagrun-*.json/md = the solo run).

## What was built
- `dev/measure/robot10-lag.js` — LAG probe (runs in EVERY robot10 life, default on, `LAG=0` off): at each UI checkpoint the real Fold/iPad pages are CPU-throttled ×4 (`LAGCPU`) and tap every tab + one act card + «Sang ngày mới»: tap→screen = click → 2nd painted frame, long tasks, long-animation-frame script attribution; bot page: long tasks, per-buổi `[year, month, ms]` (month turn time, per game-year), JS heap/nodes/listeners per sample with the game year. `section(L)` = «LAG» section (also hooked into robot10-agg.js as one block before «Per thân phận», the #6 RECOMMENDATIONS at the end is untouched); `animSection()` = «ANIM BUDGET»; CLI `node dev/measure/robot10-lag.js <jsons> [--coop dir] [--anim dir]`.
- `dev/test/lib/coop-lag-hooks.js` — the co-op hooks of coop-lag.js EXPORTED (WSLOG, CO, collect(), verdict()); coop-lag.js now uses it (same metrics/behaviour) → Foreman B's runners call `collect()` and get coopTurnP95 / coopActionP95 / coopSyncKBMax / coopKBPerMin / coopResendPerMin / coopRejoinMs / coopLongTasks / pageErrors. coop-lag.js also got `--anim fmt:n`, `--no-rejoin`, `--fx lite` (default off).
- `dev/measure/robot10-anim.js` (+ `dev/test/lib/anim-stress.js`, `anim-gen.py`) — ANIM-STRESS (default off, no new art): `solo | coop | soak`. Figures = today's real full-body pictures (fig-consort-c01..c12-t1-a18.webp from the CDN) in 3 formats: **css** (2 transform layers/figure: breath + lower-body sleeve sway), **sprite** (12-frame sheet generated in the page, steps()), **webm** (alpha VP9 loop 3 s made from the same picture; ~230 KB idle / ~210 KB act per figure). 1/2/4/6/12 stage figures + 2 in a dialogue, one action clip at a time every 10–20 s, Fold 755x1000 + iPad 1180x820 @2, CPU ×4, ANGLE SwiftShader.

## ORDER #7 — LAG results (solo, `nc spread 2 1`, CAP 1500 s, checkpoint every 80 buổi; 2 lives, 11 probes per device; box = 4-CPU software GL, ±40 %)
| device | action | taps | p50 ms | p95 ms | max ms |
|---|---|---|---|---|---|
| fold | tab switch | 99 | 1050 | 20259 | 51306 |
| fold | act card | 9 | 2232 | 3068 | 3068 |
| fold | Sang ngày mới | 11 | 2309 | 4189 | 4189 |
| ipad | tab switch | 99 | 1115 | 31838 | 52146 |
| ipad | act card | 11 | 2359 | 4014 | 4014 |
| ipad | Sang ngày mới | 11 | 2767 | 5112 | 5112 |
Budget (play-perf-budget.json, CPU ×4): tapP95 target 200 / ceiling 3500 → OVER ceiling on both devices; **all of it is the Dư đồ tab** (below); without it tab switches are 0.8–2.2 s, act card 2.2 s, Sang ngày mới 2.3–2.8 s p50 (also over the 200 ms target; ceiling 3.5 s is held).
Turn time (bot page, render off = game logic): buổi p50 68 ms / p95 198 / max 541; month (≈16 buổi) p50 1122 ms / p95 1528 ms; year 3-5 band p95 373 ms (only 31 buổi, too few to call a trend). Bot-page long tasks 2.5/min (longest 12 s = the loaded-save step).
Memory (bot page, 24 min, 3 game years): heap 75 → 180 MB = 35 MB per game-year, 262 MB per real hour; nodes +1.1k/h, listeners +0.8k/h. Part-2 harness measured heap to 1.56 GB / ~350k-node DOM bursts over longer lives. Tab crashes 0/2 (PAR 2; part 2: 0 crashes over 77 min).
Co-op pair (coop-lag, CPU ×4, 5 buổi, no figures, 2 runs): coopTurnP95 18.7 s / 21.7 s (ceiling 10 s → OVER; target 2 s), coopActionP95 7.6 / 4.8 s (ceiling 8 s), coopSyncKBMax 168 / 128 KB (ceiling 100 → OVER, target 16), KB/min 385 / 275, resend 10.8 / 11.7 per min (ceiling 12), long tasks 188 / 145 per min (longest 5.2–5.5 s), 0 stalls, 0 page errors. Rejoin not measured (known detection gap of coop-lag, as its header says). Note: coop-lag logs negative turn ms for some buổi (key change seen before the press time) — those are dropped from p95 by the existing filter; harness issue, not game.

### LAG findings (finding → cause/file:line → proposed fix → expected effect), report only
1. **Dư đồ («go» tab) on a PLAYED save: 12 s at CPU ×1, 39 s at ×4** (fresh life 0.25–0.4 s); the 2nd open costs the same; pictures blocked or not. Profile of the tap: hardAt / segR / ovP / costAt / search / geo / kmSolve = label solver `kmSolve` dev/build/j38.js:19, called from j38.js:83 up to 5× per open; cache `window.__mapSolC[ck]` not hit on re-open. Fix: solve once per save change (stable cache key), cap the first pass by the same performance.now() budget as the retries, pre-solve on load/idle, keep the last good layout. Effect: Dư đồ < 400 ms.
2. Real-page save load leaks ~5–6k DOM nodes + 600–800 listeners per load (part 2). Fix: one teardown of the previous screen before building the loaded one.
3. Bot page heap 56 MB → ~1 GB with ~350k-node DOM bursts while render is off: skip DOM work while render is off / page hidden.
4. Sang ngày mới / act card ≈ 2.3 s p50 at CPU ×4 (target 200 ms): render only the changed panel, split the night flip across frames.
5. Co-op: coopSyncKBMax 128–168 KB (ceiling 100): the biggest sync frame is a full state — diff it.

## ORDER #8 — ANIM BUDGET (fx lite = «Hiệu ứng: Gọn» OPT.fxon false isolates the figures; the full game idles at only 5–15 fps in this software-GL box at ×4, so absolute fps there are box-bound)
Pass rule (relative to the game alone, 2 baselines per device): fps p50 ≥ 80 %, p5 ≥ 60 %, long tasks ≤ 130 % + 10/min; every smaller count must pass.
| device | css | sprite | webm | 2 in a dialogue |
|---|---|---|---|---|
| fold | **12 (tested max)** — 60 fps p50 at 1…12 | 4 (6 shows a one-second hitch, 12 passes again) | **1** — any ≥ 2 caps the page at 30 fps | css ok, sprite ok, webm 22–34 fps |
| ipad | **12** | 4 | 1 (12 also passes numerically but p50 30 fps) | same |
Cost: figures add 0–15 MB GPU-process RSS (webm 12: +14 MB, css/sprite 12: +4–10 MB), JS heap +0–3 MB; sprite 6 hitch ≈ the first action clip swaps in a big sheet (decode on the main thread; long task 326–1071 ms) → cause suspected, not proven; fix: `img.decode()` the act sheet before swapping.
Soak 30 min per device, css × 12 (+ an action clip every 10–20 s) — this soak ran at full fx (fps 5–13, box-bound; the `--fx lite` flag was not honoured by soak at run time, fixed in 9001e14c): heap −1 / −0.6 MB per hour, GPU process +12.4 / +6.2 MB per hour, DOM nodes flat → **no leak seen** over 30 min.
Co-op pair, both clients animating (5 buổi, css/sprite/webm × 2 and 12): the box runs two full clients at ~1–3 fps, the baseline turn p95 is already 19–22 s, so the deltas (−1 … +34 s, mostly inside the noise between two baselines) show NO figure effect that rises above the box noise; two sprite runs in the first (full-fx) round stalled (4/5, 3/5 buổi) — flagged as stalls, not repeated in lite (5/5). Co-op was NOT shown to be hurt, nor shown safe: re-run on a real device or a stronger box before a decision.
**Recommended format: css** (transform layers on today's webp: 60 fps p50 up to 12 figures at ×4, +4–10 MB GPU memory, no decoder, no new art file). Sprite sheets only as the action clip (burst), generated at display size; webm (alpha video) only for 1 figure or 1 action clip at a time (it cost half the frame rate from the 2nd video on this box).
Rules (to verify on a real device): pause every loop off screen (IntersectionObserver) and in a hidden tab; stagger phases (random negative animation-delay, 3.1–4.7 s); ONE action clip at a time; idle layers = transform/opacity only; Gọn → stills; co-op loops start after state applies. NOT yet measured: the pause rules themselves (pauseHidden option exists in anim-stress.js, default off), real-GPU devices, figures > 12.

## Known gaps / honesty
- Only 2 whole lives in the solo LAG run (one ended Xuất gia at 0.75 y, one hit the 1500 s cap at 3 y) → per-game-year bands beyond year 5 are empty; run the part-2 round with LAG on (it is on by default) for the full picture.
- CPU ×4 on a shared 4-CPU software-GL box: absolute ms are 2–5× slower than a phone GPU would be; use ratios and the Dư đồ cliff (12 s even unthrottled).
- Co-op under figures: noise-dominated (see above). Rejoin not measured.
- First cell after boot of each device run is a warm-up outlier in the baselines (p5 1–2 fps); the report averages two baselines.

## HANDOVER
Nothing pending except the SSK review. Files: dev/measure/robot10-lag.js, robot10-anim.js, robot10.js (3 small hooks), robot10-in.js (nbY), robot10-agg.js (1 block), dev/test/coop-lag.js, lib/coop-lag-hooks.js, lib/anim-stress.js, lib/anim-gen.py.

## REVIEW (reviewer robot10-lag, 24/11)
1. Diff vs origin/main: only dev/measure, dev/test (+ dev/handover data) and the build stamp of index.html/sw.js (rebuilt; assets.json = LIVE). No game file (dev/build/j*.js) touched. PASS.
2. Runner contract: headers of robot10-lag.js / robot10-anim.js state inputs/outputs. Re-ran anim solo (fold css 2, 8 s): fps 6-9 at full fx, baselines 4-14, same box-bound band; robot10 nc spread (LAG=1, 48 buổi): tab p50 768 ms, act card 2.1 s, Sang ngày mới 1.8 s, Dư đồ tab 3.1-5 s (cliff), same band as the report tables. CLI report writes lag-*.md/.csv. PASS.
3. coop-lag.js --buoi 2: PASS (turn p95 3.5 s, 0 page errors). coop-lag-hooks.js exports WSLOG/CO/latencies/resend/collect/verdict, no side effects on require. LAG=0 run: no probe data (0 acts), default path untouched. PASS.
4. quickcheck PASS on branch merged with newest main (27240ccb): perf new/live render 255/254, tab 428/444, buổi 1285/1352, core gates PASS.
5. Final merge of origin/main 27240ccb done (sw.js conflict: LIVE + rebuild).
Notes (not FAIL): coop pair with figures and the real-device pause rules remain unmeasured, as the worker states.
REVIEW PASS — LAND READY review/robot10-lag-rv 9d144cda69ed064481aa837a84729746565b5f95
