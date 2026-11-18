# review/reign-road — second reviewer (Foreman D subagent), 16/11 ~05:50Z
Verdict: DUPLICATE. Another reviewer (session 01UV1Szj…) pushed review/reign-road-r1 (fa201bbe0, PASS in its dev/review/reign-road.md) while this
review ran (none existed at start). Use THEIR r1 for the main merge; this review's extra findings are on review/reign-road-r1b @ 3eb2c956d693399f0da019ae079292db34215952
(merge on main eba64ead4, NOT on the current main; do not fast-forward it).
Two findings the r1 review does not cover (apply on r1 before merging):
1. Triều cục pane faction rows list unknown consorts as "Quý phi ???, Tần ???…" (same family as the owner's 'Phi ???' complaint 16/11).
   Fix in r1b (jreign.js rgPaneHTML `mem`): known names only (kitKnownName) + "thêm N vị chưa quen biết"; the foe-evidence result line
   ("X nắm Chứng cứ về ngươi") also masks an unknown name. Cherry-pick the jreign.js hunk of 3eb2c956d.
2. Option cards: 26 of 153 rg options (755x1000) have the Gợi ý hint overflowing the kit option card (`.opts.k3rows` fixed 130px rows) →
   hint text cut by the next card (c1a, c1b, c3a, c3b, c4a…). Worker: shorten wx/lx hints to fit, or KIT REQUEST: k3rows rows grow with content.
Tests run here (merged on eba64ead4): reign.js PASS 755x1000 + 1180x820; panel-size.js 5 viewports 0 failures; coop-e2e 59/59;
palace-oldsave (main save → new build) OK; mid-life main save (S.reign without t0) starts the line cleanly, beats c1a…e2 in 14 months, 0 errors;
screenshots 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844 rotate: no overflow, no page errors.
Next step: coordinator applies 1 (+ decides 2) on review/reign-road-r1, then fast-forwards main.
