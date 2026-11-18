PRIORITY #1 CHECK ('final-merge|land FF'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 0 | archive 1
# land-d4 (sonnet lander) — STOPPED at step 1: SOURCE conflict (brief: "if a source file conflicts: stop, report the hunk")

Base: origin/main 9c581406 (still live at start). Worktree /home/user/wt/land-d4, branch review/land-d4 = origin/main (nothing pushed, merge aborted, tree clean).

| step | branch | sha merged | result |
|---|---|---|---|
| 1 | review/odds-cap-r1 | 591cedf9 | `git merge --no-ff` CONFLICT in 3 SOURCE files (dev/build/jmort.js, j77.js, j83.js) + built index.html, sw.js. Aborted. No merge sha. |
| 2 | review/title-stale-sel-rv | 4842ab42 | not tried (stacked after 1) |
| 3 | review/toil-react-top-rv | 84de2423 | not tried |
| 4 | review/staff-cap-row3-rv | bc7640dd | NOT PASS: review-staff-cap-row3.md ends "FAIL 1 @bc7640dd" (tutorial.js `old` red); no r2 verdict on the handover branch at 2e14bf3. Would stop after 3 anyway. |

## Source hunks (main side = HEAD, odds-cap side = origin/review/odds-cap-r1)
Cause: main moved on after odds-cap-r1's merge-base 4dcd50e7 (map-tap-go r8/r9, mg-skip-all r2, lyF fix); odds-cap-r1 rewrote the same lines for BAL odds.

1. **dev/build/jmort.js:44-50, `assign()`** — two lines differ:
   - main: `p.lyF===1&&M.ly?M.ly.floor:0` ; odds-cap: `p.lyF&&M.ly?M.ly.floor:0` (main made the lyF test strict `===1`).
   - main: `p.thoO=Math.random()*100<M.sudden?0:…` ; odds-cap: `p.thoO=roll(M.sudden)?0:…` (odds-cap routes the raw roll through `roll`).
   Resolution = take odds-cap's `roll(M.sudden)` AND main's `p.lyF===1` (both independent). Needs the author's OK because the first line is a main fix.
2. **dev/build/j77.js:80-89, j77Card "Đi" option + j77Go** — main: option text `Chắc chắn · tốn: ${tc} khắc · …` kept, and main ADDED the `j77Go(k)` function + 3-line map-tap-go comment (tap = go at once). odds-cap: option text WITHOUT the typed «Chắc chắn» (`tốn: ${tc} khắc · …`), and it has the old one-line comment, and no new j77Go in the hunk (j77Go is the old one-liner context; odds-cap predates map-tap-go). Resolution = main's j77Go block + odds-cap's text without «Chắc chắn» (note: main's j77Tap already calls j77Go, so the card's "Đi" text is the only odds-cap change).
3. **dev/build/j83.js:139-143, mg-skip button label** — main: `kitParse(kitQuickSub(m.mode==="prac"?{sure:1,win:"không ra thành phẩm"}:{win:"tiến bộ một phần, không ra thành phẩm",lose:"không tiến bộ"}))` (mg-skip-all r2 kit component); odds-cap: `kitParse(\`${…word(od(BAL.odb.j83.odPts))} · thành: …\`)` (typed odds sentence). These are different designs of the same label: main's kit quick-sub supersedes; odds-cap's `word(od(BAL.odb.j83.odPts))` odds word must be re-expressed inside kitQuickSub (or kitQuickSub must take the odds word). This is a real semantic decision, not a mechanical merge.
(Built files index.html/sw.js also conflict — rebuild would fix those; not attempted because of 1–3.)

## Needed
review/odds-cap-r1 worker (or a reviewer) must merge origin/main 9c581406 (or newer) into odds-cap-r1 themselves, resolve the 3 hunks above, rebuild, re-run its cap tests and push a new tip; then re-order the lander with the new sha. Steps 2–3 depend on step 1 only for stack order — Foreman D may instead ask for 2→3 landed first (title-stale-sel-rv and toil-react-top-rv were not tried against main; unknown whether they conflict) — I can do that if ordered.

NO LAND READY. SẴN SÀNG KIỂM 0000000 (nothing built; stopped on source conflict per brief)
