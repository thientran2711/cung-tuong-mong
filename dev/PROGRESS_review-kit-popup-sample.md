# PROGRESS review/kit-popup-sample
Task (coordinator, 15/11): show the owner the shared pop-up kit (§8) on the kit page + screenshots.
Done
- dev/build/jkitpage.js: `kitPopSample(k)` + KIT_SAMPLES §8 entry (5 kbtn buttons). #modal cannot be drawn inline on the kit page, so each button opens the REAL kitModal (kpBuild, kitEventStage, kitEvArt, kitDlgFit all apply); kit page hides, returns on close / on option tap. No new CSS.
- KIT.md §8: one line documenting the sample. Test dev/test/kit-popup-sample.js.
- Screenshots (real in-game, origin/main f53bdade, before review/stage-fig-size): scratchpad popup-kit/ 1..7 at 1180x820 + 755x1000.
Tests (kit-popup-sample.js, host frame ?khost=1): 755x1000, 1180x820, 844x390 (rotated host) — all 5 pop-ups open with the right kind, fully in view, no h-overflow, kit page back after close, 0 page errors.
Findings on current main (for the coordinator)
- No small 3:4 PERSON portrait remains: a person subject (even ĐIỀU info, Thái hậu) gets the kitEventStage full-body column (sometimes not, at 1180 one run drew no figure: race on figure load). Small 3:4 slot survives only as the info/item picture (kpiart); the "Bổng lộc" info picture is missing (brown placeholder).
- Option card with a tiny portrait icon ("Thưa rằng do Hoàng thượng định") breaks its title onto two lines in the 2-column grid.
Review r1 (Foreman C reviewer): merged onto origin/main 900ace7f (conflict in jkitpage.js: kept both §28.19b and §8 samples), site rebuilt. kit-popup-sample.js at 755x1000, 1180x820, 1366x1024, 844x390: all 5 pop-ups open from shared kitModal, in view, no h-overflow, kit page returns, 0 page errors. No new CSS; KIT_SAMPLES §8 registered; KIT.md §8 line present. PASS.
