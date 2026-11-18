PRIORITY #1 CHECK ('final-merge|land FF'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 0 | archive 1
# land-d4 (sonnet lander) — FIX ROUND 3: steps 2+3 landed (Foreman D ROOT order 18/11 07:51Z: skip odds-cap, skip staff-cap-row3)

Branch review/land-d4 (pushed, NOT main), stacked on origin/main 9c581406 (unchanged at the end). Each merge commit is FF-able from the previous and from origin/main.

| step | branch | merge sha | gates |
|---|---|---|---|
| 1 | review/odds-cap-r1 591cedf9 | — SKIPPED | first try: source conflict jmort.js / j77.js / j83.js (hunks below); an opus re-merge worker takes it |
| 2 | review/title-stale-sel-rv 4842ab42 | 43b632cbf5179126f85f20e7ad3ee7157b681f5a | only index.html + sw.js conflicted → rebuilt with dev/site/build_site.sh (no side picked). one-core-guard 0 fails; quickcheck PASS (old save ok, render 149/140, tab 301/334, buổi 878/738 — one noisy run, rerun on step 3 build 809/823); title-stale-sel.js ALL PASS at 755x1000@2 and 1180x820@2 (replay button kit .kbtn.alt, home hooks, Chọn sổ rows, no page errors); Fold + iPad title/Chọn sổ shots LOOKED at: no overlap, nothing cut. tutorial.js: crashes/"tour did not start" IDENTICALLY on plain origin/main build (harness red on main, not caused by this branch; the replay behaviour is covered by title-stale-sel.js). |
| 3 | review/toil-react-top-rv 84de2423 | a2ad2401b415c70e733df22e0639b67b1aedfe1a | auto-merged, no conflicts; branch is test-only (dev/test/toil-react.js, toil-react-layers.js) so index.html/sw.js rebuild = identical except the CTM_BI build stamp (left as is). one-core-guard 0 fails; quickcheck PASS (render 157/158, tab 477/360, buổi 809/823, old save ok, core gates PASS); toil-react.js fails:[] errs:[] and toil-react-layers.js fails:[] at 755x1000@2 and 1180x820@2. No UI change → no new shots. |
| 4 | review/staff-cap-row3-rv bc7640dd | — SKIPPED | latest verdict FAIL (tutorial.js old red); r2 running |

Stack check: a2ad2401b415c70e733df22e0639b67b1aedfe1a first parent = 43b632cbf5179126f85f20e7ad3ee7157b681f5a, 43b632cbf5179126f85f20e7ad3ee7157b681f5a first parent = 9c581406 = origin/main; main never pushed.

## Odds-cap source hunks (for the re-merge worker)
1. dev/build/jmort.js assign(): main `p.lyF===1&&M.ly` vs odds-cap `p.lyF&&M.ly`; main `Math.random()*100<M.sudden` vs odds-cap `roll(M.sudden)` → take both (lyF===1 + roll).
2. dev/build/j77.js ~80-89: main has new j77Go + map-tap-go comment and "Đi" text with «Chắc chắn»; odds-cap drops «Chắc chắn» → keep main's j77Go, odds-cap's text.
3. dev/build/j83.js ~139-143: main kitQuickSub(...) label vs odds-cap word(od(BAL.odb.j83.odPts)) label → design decision: odds word inside kitQuickSub.

LAND READY 43b632cbf5179126f85f20e7ad3ee7157b681f5a a2ad2401b415c70e733df22e0639b67b1aedfe1a
SẴN SÀNG KIỂM a2ad2401b415c70e733df22e0639b67b1aedfe1a
