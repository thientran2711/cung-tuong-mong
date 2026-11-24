# kit-dialogue-vn — report

## REVIEW r1 (sonnet reviewer-lander #2 · 24/11)
START_CTX ~3 %. PRIORITY #1 CHECK: KIT.md §93/§95 + KIT_REQUESTS | main: no kitDialogue/typewriter (git grep), kitScene §93 reused, kitFocus §92 untouched | review/kit-dialogue-vn 8e12fbc5 | BAL.kdlg in jbal2.js.
Branch review/kit-dialogue-vn-r1 = 8e12fbc5 + merge LIVE 68799300 (auto-merge jbal2.js, KIT.md) + rebuild + new test → 214c6b2c5ab54b8a9b18ae5540e6d69179410dd2.
| check | result |
|---|---|
| Consistency scan | kitDialogue builds on the ONE scene layer + kitDlgBox (§93); spotlight/focus are kitScene methods, one CSS block (#kdv-css), numbers only from BAL.kdlg (law 4: msWord 110, dim .5, dimSat .75, focusScale 1.5, focusBlur 14). No per-place variant; kit page sample §95 + KIT.md §95 in the same branch. No game caller yet (kit part only) |
| Tests the branch added | NONE → I added dev/test/kit-dialogue.js (no args = both devices): typing word-by-word, box never reflows (140→140 px), tap finishes the line + every cue fires (2,12), next tap = next line, spotlight speaker lit / others brightness .5 (not black), focus shot (one fig scale 1.5, others hidden, bg blur 14), box inside layer, onDone cleans dim/focus/box |
| node dev/test/kit-dialogue.js OUT 755x1000,1180x820 (merged head, no arg + with arg) | ALL PASS, 0 page errors both devices |
| node dev/test/kit-selscene.js OUT 755x1000,1180x820 | only the known flaky pair-card count (fold «cards»:2, ipad «cards»:1; same flake on main base); everything else ok, 0 page errors |
| bash dev/tools/quickcheck.sh | PASS 257 s · core gates PASS · open 1934 ms · old save ok · perf render 246/268, tab 478/546, buổi 1394/1408 (noise) |
| Shots Fold + iPad (typing, line done, focus), looked | spotlight: speaker lit, others dim not black; box inside layer; focus: one big figure, bg blurred; nothing cut |
Notes: speech box title chip reads «VIỆC <speaker>» (kitDlgBox default chip) — author's choice, left as is, KK18 may want a speaker-only title. Kit-page §95 demo buttons not clicked (same API driven by the test). No co-op part.
Verdict: **PASS** 214c6b2c5ab54b8a9b18ae5540e6d69179410dd2.
