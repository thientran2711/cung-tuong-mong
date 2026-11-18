PRIORITY #1 CHECK ('fullbody-frame'): OD owner pick of full-body frame size (step 1, OD 18/11 ~07:50Z "all full-body frames") | main none (not live) | review/* review/fullbody-frame 4481bf78 (r5), review/fullbody-frame-s2 824cfccf (contains r5) | claims MAIN ROOT-47/48 fullbody-frame step 1+2

# Review fullbody-frame-s2 (+ r5) — small UI reviewer, sonnet

Merged origin/main 36e574fa into review/fullbody-frame-s2 -> 33e98993 (only conflicts: built index.html + sw.js, rebuilt with assemble.py + build_site.sh; NO source conflict). Pushed to origin/review/fullbody-frame-s2.
C-AG note: the branch touches dev/build/jbal2.js (+3 lines: BAL.bookFigW, BAL.bookFrame {cRef .072, gap, footGap}). No jcoop*/jag*/j95*/jtoil*/assemble.py/save file changed. Source changes otherwise: j79 j87 jfigseal jk4 jkit jksize jpdlg jsl.

## Checks (on 33e98993)
1 KIT FIRST + consistency: ONE horizontal part kitFullFigX (jkit.js) used by every full-body place: kszFigFit (centre pop-ups), kitDpFit (shop / pet / several-person), kitPersonDlgFit (coach/tips), kpIdLay (ID card), Tuần lục/Mệnh truyện/Sổ luân hồi (r5 clamp). fullbody-frames-scan ALL OK: skull>feet spread per kind 0.00 % (news, notice, choice, shop) / 0.02 % pdlg / 0.11 % idcard, cut 0, squeeze ~1.000, at Fold + iPad (+1366, 412, 390 smoke run too, ALL OK). No private variant found. Left alone by design (figures stand ON a picture, not in a person frame): painted-scene stages (j59), picture-band stages, book plates.
2 Figures: LOOKED at 755x1000 news/choice/idcard, 1180x820 idcard/pdlg, 1366x1024 choice, 412x1058 pdlg, 390x844 choice: crown to feet whole, nothing cut, not blurry. Wide robe spreads under the text, text drawn on top (as owner asked). Minor, not blocking: (a) name tag "???"/rank line touches the Hoàng hậu crown tassels (tag over tall crown, as the worker noted); (b) 390x844 name "Phùng Thục Nghi" butts against the text column (device shows rotate prompt, unsupported); (c) iPad ID card: "Kéo xuống" kit fade sits over the stat rows (long scroller, kept by MAIN decision).
3 Scroll cue: dev/test/scroll-cue-scan.js ALL OK (94 dialogs x Fold+iPad): no cue on any figure column, shop short scroller has its own strip, tall scrollers keep kit fade, hidden text never overlapped.
4 VANPHONG: no new player-visible word (only kit sample page text; existing "Kéo xuống").
5 quickcheck.sh PASS 33e98993 vs live 36e574fa: core gates PASS (one-core-guard fails 0, rules-one-source, kit-conform, coop), time-spill PASS, open 1406 ms, old save ok, perf new/live render 206/181, tab 421/434, buổi 990/1084 (within +5 %), long tasks 15/16. one-core-guard run alone: PASS.
Note: old dev/test/popup-fullbody.js (checks .kesf selector) FAILs 35 vs 33 on live main too = stale scan, not a regression of this branch; not used as a gate.
Shots: scratch only, CDN img/_review/fullbody-frame-s2 wiped.

PASS 33e9899395faffb71a444a072cac13bc1e3f0c7e
