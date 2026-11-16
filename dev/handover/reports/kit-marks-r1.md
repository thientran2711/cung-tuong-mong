# kit-marks-r1 (reviewer) — review/kit-marks @5c594381 -> review/kit-marks-r1 @677c765f
RESULT: PASS 677c765ffe4583a406ab5da62ecfa628bea3f407 (fast-forwardable: branch already descended from origin/main 5682ce6f; main had not moved). START_CTX ~5 %.

## Owner 16:10Z fixes made on review/kit-marks-r1 (kit only, whole game)
1. Hoàng thượng + Hoàng thái hậu = ONE token `KIT_IMP #ffd400` (j1; KIT_ROLE.emp/th both read it). kitToneOf keeps it bright (no darkening to the dull #a37600), jk4 §48.1h adds a thin brown ink edge on paper (any element whose --rt/--rtn is the token; 4x attribute repeat to beat the `!important text-shadow:none` rules). Clearly different from Đáp ứng bronze and Hoàng hậu.
2. kitRel2 (jkrel): `align-items:stretch; grid-auto-rows:1fr` -> boxes shown together = same width AND height, tops aligned (also stacked at 240 px: 97/97 px measured); a lone box ("Hoàng thượng → ta", "Tô Lan Chi → Ôn Ngưng Sương") is ONE column wide, not the whole row. One layout for every caller.
3. §78 place chips: the kit sample was a private dark-brown chip; real map label (.mspot .mlab) is already cream + ink. Sample now uses the real label (cream, dark text, icon above). No other chip changed.
4. Perf: kitMarkPaint skips a panel with no ✓/✗ (textContent precheck) and tests the regex before closest().
Sheets (before = kit-marks 5c594381, after = r1, 755x1000@2): dev/handover/reports/kit-marks-r1/r1-gold-names.jpg, r1-relations.jpg, r1-place-chips.jpg. Script dev/test/kit-marks-compose-r1.py (+ kit-marks-sheet.js).

## Tests (BUILT site via build_site.sh + sw-serve; branch index.html/sw.js/assets.json were stale vs sources, rebuilt and committed)
- tab-pairs 755x1000, 1180x820, 1366x1024, 844x390@3: 56 pairs each, 0 mismatches, 0 errors.
- kit-conform 755x1000 CONFORMS 91 / MISSING 14, 1180x820 90/15, floats none, 0 CUSTOM/MIXED (main 90/15).
- game-feel (old save, offline, touch kit, Pixi): exit 0, old save "Hàn Lăng Vân" loads, 0 errs.
- Real game shots 755x1000 (Giao tình/Dư đồ/Triều cục): 0 page errors; gold name on paper readable; relation box ok. (Map art does not load in the sandbox CDN, map chips could not be judged live; they are the old cream .mlab.)
- Consistency scan: no kitRelRow/kitRelBar caller left (only comments); typed ✓/✗ are painted by the global kitMarkPaint pass (canvas-drawn ✓ in all.js ~14762 is not covered, minor).
## LAG (first priority): no play-perf.js exists on main or any review/lag* branch -> I wrote dev/test/play-perf.js (tab tap/render/long-task, 4x CPU, A vs B) and a CPU-metric run.
- Wall time (play-perf, both orders, 6 reps): first-run bias dominates (whoever runs first is slower); averaging both orders new vs main: act +15 %, court +20 %, rel −9 %, inv +34 % but individual runs flip sign (act: new 1318 vs main 923, then main 954 vs new 851). Not a reliable signal.
- CPU (CDP Performance.getMetrics, 5 rounds x 8 tabs, 3 runs each): TaskDuration median main 18977 ms vs new 19567 ms (+3 %, runs 17955–23136 overlap), ScriptDuration 5931 vs 5995, Style 3155 vs 3317 (+5 %), Layout ≈ equal. => no measurable play slowdown.
- Startup (domContentLoaded 4x CPU, interleaved): main ~2.85 s, new ~3.0–3.2 s (+0–10 %, noise ±300 ms); +16 KB index.html (0.3 %). Not proven; follow-up: a deterministic startup profile inside the iframe.
## Not done / notes
- Worker's open points stand (broken samples 6.4/7.7/8.x need a demo state; brush ✓ look for owner to confirm).
- play-perf.js is a comparison tool, not a budget with a threshold file; coordinator may want a proper budget after the lag worker lands.
