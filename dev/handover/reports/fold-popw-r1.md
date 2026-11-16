# fold-popw-r1 review (reviewer, s22)
Branch review/fold-popw-r1 = origin/main 7b5e5e491 + review/fold-popw ffc088f7. Net diff vs main: jk4 (2 lines), KIT.md (32.10 RULE + 31.7 text), dev/test/fold-popw.js, PROGRESS, rebuilt index/sw/assets.
Result: PASS

1. jk3 line k3pop>#popw{grid-area:stage}: main's line + comment kept (jk3 identical to main, no diff).
2. jk4 headerless x: one rule `#modal .dlg:has(>.kit-x.kxabs),#ov .kpanel:has(>.kit-x.kxabs){padding-top:48px}` covers #modal + #ov.
Checks (dev/test/fold-popw.js, fold 755x1000, ipadAir 1180x820, ipadPro 1366x1024, foldLand, iphone14Land; 4 dialog shapes who/pcm/self/emp):
- x hit-test at 5 points while list scrolls 0/30/60/100 %: no overlap (all []); x 36x36 same size/offset in every shape; page errors 0.
- Fold card: popw [4,141,582,591], top bar 129 px, no squeeze. iPad: card in panel, hud 132.
- Orphan grid-area scan: only hidden ones left (#emp/#hud2, #stage on map tab; #popw hidden off k3pop).
- quickcheck on final HEAD: PASS (old save ok, perf <= live).
NOT RUN: dev/test/kit-conform.js — page.goto never reached domcontentloaded on this box (200 s), same with ?khost=1; looks like an environment/test-harness issue, not this diff (CSS-only change). #ov kpanel x not exercised by the test (covered by the same rule, not seen live). 844x390 is rendered by the host at the 1180x820 design box, so no separate layout.
NOTE for main: origin/main dev/kit/KIT.md contains an unresolved conflict block (<<<<<<< HEAD ... >>>>>>> origin/main around section 77.1). Not touched here; coordinator should fix.
