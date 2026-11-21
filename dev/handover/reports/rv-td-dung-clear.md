# rv-td-dung-clear — reviewer verdict: PASS after reviewer fix (c2aacf88)

PRIORITY #1 CHECK: brief main83-rv-td-dung-clear.md, worker report td-dung-clear.md, OD td_dung row (21/11 ~00:50Z) + words row 1998, main LIVE 4f34f461, review/td-dung-clear 03ba85c3; git grep origin/main for roundRect/pill in dev/build: none before this branch (it introduces the first private canvas chip and framed buttons).

Merged: review/td-dung-clear-rv @ 9fb6dcd5 = LIVE 4f34f461 + 03ba85c3 + rebuilt site (build_site.sh; quickcheck "NOT BUILT" fixed by that commit). Ancestor = origin/main, FF-able.

## Results (merged build, Fold 755x1000 + iPad 1180x820)
- mgcal-redo 12/12, ag-mgcal 0 FAIL, mg-ui-rest 39/39, mg-noword-b ALL OK, coop-e2e 68/68, quickcheck core gates PASS (+ open/old save/perf PASS). No page errors in any shot run.
- Grading unchanged: diff touches only dev/build/jtd.js, jnwb.js, dev/test/mg-noword-b.js; x/v/kicks/BAND/KICK/SPL and BAL.mgTier untouched (ag-mgcal green).
- Owner goal (5 s): PASS. Rules screen = her figure + bowl + Vững bar + hand, 3 short steps; play = her with bowl, «Vững/Đổ» bar, one guiding line that matches needle and green-framed pad, floor ◀▶ marks; result «Vì sao: Bát vững x/20 giây · đổ n lần» shows via the real tdPlay route. Words short, cổ trang, no %.
- Minor (not blocking): bowl floats a little above her head on both devices (gap), more visible on iPad; header chip «?» is the old kit chip.

## FAIL — law 9 (KIT FIRST), narrow
1. jtd.js kgTdWalk draws a private chip: function pill() = cream rounded pill with coloured border (guiding line). No kit part; first roundRect chip on any board. Fix: use the kit canvas label kg82Lbl(g,text,x,y,maxW) (outlined text, as every other board) or request a kit canvas-chip in KIT_REQUESTS.md.
2. jtd.js draws the two touch pads as framed rounded rectangles with a private green "hold this" frame. Sibling td_ngon uses a DOM kit button (NWB.btn in .kg82act). Fix: same pattern for td_dung (two kit buttons «Đỡ bên trái / phải» under the canvas, pointer hold feeds dir) or kg82Lbl text halves as before (old halves were glyph-only, no frame).
If main waives law 9 for this board, the sha above can be FF'd as is (all else green); if not, a worker needs ~1 small edit in kgTdWalk (pill + pads) then re-shoot.

~100% xong (review) / ~85% chơi được.

## UPDATE — law 9 fixed by the reviewer on review/td-dung-clear-rv @ c2aacf88 (MAIN 84 order: law 9 not waived)
- pill() now draws kit kg82Lbl text (no private chip); the two canvas pads are replaced by kit buttons (.kgbtn.nwb-btn, icon-only ‹ ›, in .kg82act like td_ngon); the one to hold gets the kit gold .ksel ring; canvas halves still work. Bowl lowered onto the head. Icon-only because the kit no-text-in-play pass turns lettered buttons into ●.
- Gates re-run on the fixed build: mgcal-redo 12/12, ag-mgcal 0 FAIL, mg-ui-rest 39/39, mg-noword-b ALL OK, coop-e2e 68/68, quickcheck PASS. Fold + iPad play shots looked.
- Verdict: PASS c2aacf88 (FF of LIVE 4f34f461).
