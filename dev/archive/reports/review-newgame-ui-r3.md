# review/newgame-ui-r3 — reviewer report
Verdict: PASS f484d226ff5bcf856735be4931bba4cac9d87133 (descends from origin/main 0a311183f). Next: coordinator fast-forwards main.
Earlier FAIL items: 8.1 one panel size (panel-size.js: one width per viewport, same as main, 0 errs), common figure tier (body equal for every face; 755x1000 321/988, 1180x820 689/810, 1366x1024 860/1012, 844x390 328/385), pinned choices below the scroll (ok).
Lag (owner): 4x CPU 755x1000, long tasks main 159 / 45.5 s / max 1451 ms -> r3 48 / 8.3 s / max 613 ms; pick tap->paint main 2.7-3.8 s -> r3 0.1-0.65 s. Cause fixed in r1/r2 (rebuild of picker, Pixi layer behind card, 384px thumbs, late crisp figure).
Small fix in r3: stale .kpmbw on reused #mb (j86) after the identity card closed.
Notes (not blocking): first view hides the face picker below the fold at 1180x820 / 844x390 (25 px at 755x1000); scroll reaches it. Event frame #mb is overflow:hidden for long text on main too (pre-existing kit behaviour; Nhập cung Hậu cung row cut at 1366x1024).
Tests: newgame-ui.js 5 viewports, panel-size.js 6 viewports, stage-fig-size.js 5 viewports ok (one row sq=false, distorted 0), 390x844 rotate prompt ok.
