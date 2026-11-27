# ARRIVE-WALK-FIX — report (worker ARRIVE-WALK-FIX, MAIN CHÍNH 177; bug root-caused by RV-171 §5)

PRIORITY #1 CHECK: OD/HANDOVER/PROGRESS — no prior fix (RV-171 §5 is the only hit; home-way OD 26/11 ~04:25Z = the rule that made #k3room walk home) | main 0562e15f jpm.js:162-163 (bug), jk3.js:399-401 k3RoomTap/k3Home, jtut.js:172 goRoom already uses k3Home directly (pattern reused) | review/* — goal-links-rv168b: jpm.js identical to main (0-line diff), no fix on any branch | claims none.
KIT CHECK: no UI part touched (one engine call switched: auto-click → k3Home view call). Branch review/arrive-walk-fix off LIVE 0562e15f, re-based on LIVE 00dca386 (MAIN 177/178: LIVE moved; jpm.js / jk3.js unchanged between them).

## Fix
dev/build/jpm.js «phone shell: arriving in a hall shows the ROOM» (render wrapper on __kpmArrive): replaced `document.getElementById("k3room").click()`
(«Về phòng» = k3RoomTap → homeGo() → goTo("home"), khắc spent whenever she is away) with a direct view switch `window.k3Home()` (the same call
k3RoomTap uses for the in-place case and jtut goRoom uses), guarded like k3ShowPlace (no co-op thin ctx, alive). __k3quiet handling unchanged.
The room view still opens on arrival; she is never walked anywhere by an auto path.

## LAW 11 — whole family: dev/measure/auto-click-scan.js
Scans every programmatic `.click()` / `dispatchEvent(` in dev/build/j*.js and gives each a verdict (USER = inside her own tap/key/pick handler,
UI = pure view target, EVENT = custom event, AUTO-DESIGN = documented auto rule, BUG = auto path clicking a side-effect button). Exit 1 on BUG/unclassified.

| | sites | USER | UI | EVENT | AUTO-DESIGN | BUG | unclassified |
|---|---|---|---|---|---|---|---|
| before (0562e15f) | 66 | 37 | 22 | 5 | 1 | **1** (jpm.js:163) | 0 |
| after | 65 | 37 | 22 | 5 | 1 | **0** | 0 |

AUTO-DESIGN (kept, listed for MAIN): jcooptimer.js:185 nafScene — the co-op AFK timeout presses a ONE-button end scene (kmend / krevok / data-km-close, KIT §81), no choice; documented rule, not a walk. All tutorial / goal / notice auto tab opens are pure view (tab buttons); jtut goTab and jgoal goWhere already skip the open tab (no room bounce).

## Tests (all under parallel load: 3–6 Chromium robots at once on 4 cores)
dev/test/arrive-walk.js (new): each round = home → Dư đồ → REAL tap on a place spot (rotating over all 15 walkable places / palace halls, 15 of 24 via kpmEnter) → «Đi một mình» → «Lên đường» → wait 1.5 s; asserts place = target, no goTo after arrival, khắc (used) unchanged since arrival. On the goal-links build every 3rd round enters Nội vụ phủ by goal link «Đi tới».

| run | build | Fold 755x1000 walked-home rounds | iPad 1180x820 walked-home rounds |
|---|---|---|---|
| 3 parallel × 24 rounds | LIVE 0562e15f (before) | 13+11+12 = **36/72** | 11+13+12 = **36/72** |
| 3 parallel × 24 rounds | fix | **0/72** (2 rounds no arrival: walk refused, not this bug) | **0/72** (1 no arrival) |
| 1 × 21 rounds (7 goal «Đi tới») | goal-links b66b9ca2 (before) | 13/21 (goal 7/7) | 13/21 (goal 7/7) |
| 2 parallel × 21 (14 goal) | goal-links + fix | **0/42** (goal 0/14) | **0/42** (goal 0/14) |
| 3 parallel × 20 rounds | fix on LIVE 00dca386 (the pushed build) | **0/60** (4 no arrival) | **0/60** (4 no arrival) |

«No arrival» = the walk was not made in that round (a gate / refused walk / card still up); never a walk home — the robot FAILs any goTo("home") seen without an arrival.

Before-fix trace example: `ksp/2/ksp,home/4/home` = arrived at Kính sự phòng (used 2), then goTo("home") (used 4).
- goal-links.js on goal-links b66b9ca2 + this jpm.js hunk: **10/10 PASS** Fold 755x1000 (2 loops in parallel with the arrive robots). RV-171's companion miss is gone.
- one-core-guard.js: PASS (fails 0).
- door-onetap.js (a randomised sweep: law-6c coverage and best-pick checks over random seeds): **flaky on LIVE itself** — LIVE 00dca386: 3 runs = PASS, PASS, FAIL (law 6c «members never picked: 1»). Fix build: 4 runs = PASS, FAIL (law 6c «talk|Cảnh báo nàng» never picked, on 0562e15f), FAIL («door word worse than best: hau»), plus 1 lost to a Chromium «Target crashed». The fails change from run to run and come from door picks run through goTo with __walkFree, which never goes through the hall-arrival render path this change touches → same flake as LIVE, not caused by this fix. Owner of the flake: the door-onetap owner (seeded picks would make it stable).
- 0 page errors in every run.

## Build
dev/site/build_site.sh run; assets.json = LIVE (restored); own CHANGE line (dev/site/CHANGE.txt). Gate: merge-base --is-ancestor 0562e15f and 00dca386 = both OK; 0 files deleted vs LIVE (7 files, +193/−9: the jpm hunk, CHANGE line, rebuilt index/sw).
Note for MAIN: goal-links-rv168b needs no change — it lands clean on top of this (jpm.js untouched there).
