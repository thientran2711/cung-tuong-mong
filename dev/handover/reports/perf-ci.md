# perf-ci (GAP AP04, J7) — branch review/perf-ci @56d4c0a6
PRIORITY #1 CHECK: OD:L719 rule 6 | main: dev/test/perf.js, play-perf.js, perf-fx.js, perf-budget.json, play-perf-budget.json (reused), .github/workflows has only coop/img/rank | review/* none | claims none.

## What
- `.github/workflows/perf.yml`: on push to main and review/** (paths-ignore md/handover/PROGRESS): setup node 22 + python, install Playwright Chromium, `bash dev/site/build_site.sh`, then
  1. `perf.js --devices fold,pixelLand` (bytes/scene via first-load, after-title, heap, long tasks; budget perf-budget.json),
  2. `play-perf.js --devices fold,pixelLand --minutes 2` (tap latency, long tasks, fps, soak; budget play-perf-budget.json),
  3. `perf-fx-gate.js` rain at 755x1000 and 915x412 (frame time FX on vs off). Any miss = exit 1 = red job. Results go to the job summary and an artifact.
- `dev/test/perf-fx-gate.js` (new, tooling): serves the built root, runs unchanged perf-fx.js, checks the new `fxGate` block of perf-budget.json (medDeltaMs, p95Max, pageErrors).
- `dev/test/perf-fx.js`: only change = proxy-aware chromium launch (same as perf.js).
- Mid-phone = `pixelLand` (Pixel 915x412): portrait phones show the rotate prompt in host mode, so a portrait profile cannot play.

## Tests
- Local: fx gate run twice on this box, 755x1000 cpu4: on med 217, p95 367-550, off med 17 -> ok; also correctly FAILED when ceilings were 6/60 (exit 1).
- Found + fixed while testing: spawnSync froze the static server (page.goto timeout); perf-fx needs `?khost=0`.
- NOT run locally: the whole workflow on GitHub (no Actions access from here) and perf.js/play-perf.js (3-15 min each, existing tests unchanged). workflow YAML parses.

## Open / honest caveats
- fxGate ceilings are PROVISIONAL (~1.5x one sandbox measurement); tighten from the first CI summary. pixelLand has no own budget block yet (falls back to default).
- A push that is red on main from the first run is possible if a runner is slower than the budgets assume (perf.js budgets were set for a 4-CPU box); rerun once, then tune the JSON only.
- Shots: none (tooling only).

## REVIEW r1 (sonnet SMALL, session_01N1tNP4bjLTgLhGHK2jSsH8; written by Foreman B from the reviewer's message)
PASS review/perf-ci-r1 5a32532c (contains origin/main). Diff: perf.yml, perf-fx-gate.js, perf-budget.json (fxGate block), perf-fx.js (proxy arg); no game/BAL/save/co-op file.
FOUND + FIXED 57c58071: the 3 test steps piped into `| tee` without pipefail, so a failing perf.js / play-perf.js / fx gate would not turn the job red → `shell: bash` (-eo pipefail) on those steps.
Checked: YAML parses; triggers main + review/** + manual dispatch only; no secrets; standalone check (no deploy workflow); budgets only from perf-budget.json / play-perf-budget.json; fxGate ceilings PROVISIONAL; perf-fx-gate.js at 755x1000 cpu4 exit 0. Not run: perf.js / play-perf.js (files unchanged), the workflow on GitHub.
Caveats: fxGate has no over33Max (check skipped); first CI run may be red on a slower runner → rerun once, then tune the JSON only (possible / small / fix = JSON edit).
