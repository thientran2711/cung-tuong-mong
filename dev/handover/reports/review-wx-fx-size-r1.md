PRIORITY #1 CHECK: OD 15 (weather rules incl. OD:L1302-1303, OD 17/11 ~03:08Z petals) | ledger 0 | claims wx-fx-size (worker) | main: jfx.js KF_WX/kfSp, jfxkit.js kfkSp/kitFxBurst, j93 kitBloom | review/* wx-fx-size only. Nothing rebuilt by the reviewer.

# review wx-fx-size r1 — PASS 5b266411
Reviewed review/wx-fx-size @ a36104cfe (built 7754f10f3). origin/main moved to bad6d59f meanwhile; trial merge conflicted only in generated index.html / sw.js / assets.json -> took main's, merged sources (clean), rebuilt with dev/site/build_site.sh. Result review/wx-fx-size-r1 @ 5b266411 = merge of origin/main + branch (ancestor = origin/main bad6d59f), pushed. Diff vs main = the worker's 9 files only.

## Checks
- Owner screenshot dev/handover/refs/owner-petals-too-big-1117.jpg is NOT in the repo (never committed); judged against her verbatim line + the brief's description.
- Size: petal median px (stage-scaled): Fold 755x1000 15 (max 17-18), iPad 1180 12, iPad Pro 1366 16, 390x844 9. Leaf 11-19, burst favour 12-18, snow 17-21 soft dots. Looked at the shots: petals are small, a few only, no longer larger than a stat number.
- Containment: weather/season/rays clipped to the stage; 0 particles over the top bar in all sizes; none over side chips / place name in shots (Fold, iPad, iPad Pro, 390 rotate-prompt screen). "outStage" counts for snow/rain are sprites in the 90 px spawn margin, hidden by the stage mask (verified in shots).
- Whole family through the shared FX part: kfUnit()/kfkSp (KFK_U regex) + KF_WX table + kfFall; no per-screen size; KIT.md 68.0 written. Rain/storm/mist/fly intentionally unchanged (streak/glow, already stage-scaled).
- Consistency: kitBloom + kitFxBurst petals share the same kfUnit; no private CSS.
- No page errors at 755x1000@2, 1180x820@2, 1366x1024@2, 390x844@3 (spring petal/favour, winter snow, rain/drizzle).
- Quickcheck a36104cf vs live 7abaf07a, --runs 7: PASS. core gates PASS, time-spill PASS, old save ok, open 963 ms. Perf median new/live: render 232/236, tab 278/305, buổi 773/1145 (very noisy box, runs 456-811 vs 483-1555), long tasks 10/10 -> not worse than live +5 %.
- Post-merge smoke on 5b266411 (Fold): petal med 15, snow 18, favour 16, no errors.

## Notes (non-blocking)
- Petals are now sparse (6-10) and tiny on iPad; if the owner wants more presence raise KF_WX.petal.cap, not size.
- 390x844 portrait shows the rotate prompt and a pre-existing header overflow (not from this branch).
Shots were kept in scratch only; nothing committed, no CDN review folder used.
