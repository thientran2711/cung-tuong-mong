
## REVIEW r1 (sonnet kit reviewer, 11/25/2026 ~08:40Z) — review/mama-only-own r2 91f80e321cb698495e1a55a0e72777ad1bb42c46 (+ reviewer doc fix 1649c8df) — KIT OK
(The first pass on 58bda4c3 was superseded by r2 91f80e32 before the verdict; everything below is r2.)
Merged r2 onto newest LIVE 9f72524b (index.html/sw.js conflict only → rebuilt, merged head 2567656e).
- mama-only-own.js (usage `<url> <outdir>`), Fold 755x1000 + iPad 1180x820, real touch + elementFromPoint: LIVE 9f72524b = 52 checks, 46 FAILED (non-vacuous); merged r2 = 52 checks, 0 failed (22 tips each device: no figure/name/«ma ma», no blank void, «Đã hiểu» tap closes; announcer frame keeps person + closes by tap).
- Frames: no-person tip = width 538 (same as the person frame), height 354/355 (compact §8.1: fits content, no void) vs person 484; std 560x574.
- mama-scan.py: BAD 0 (all 24 sites listed; 22 tips + goal coach = no person; tour steps + askOnce keep Tống ma ma).
- fullbody-frames-scan.js (person frames still one skull→feet): LIVE ALL OK, merged ALL OK.
- duodo-focus-view / goal.js harness: goal.js crashes identically on LIVE (page.evaluate tutOld undefined) = pre-existing harness issue, not this branch.
- Law 11 callers: kitTip ×1 (showTip), kitCoach ×3 (jtut show, askOnce, jgoal), jkitpage sample — all reviewed; no other mmFig()/mmFace() caller.
- quickcheck alone on merged head: QUICKCHECK PASS 215 s (render 218/262, tab 605/580, buổi 1314/1567, tasks>200ms 22/25, old save ok).
- Shots looked at (Fold + iPad, tips muuke / tab-act / thitam + announcer frame): no-person tip = header + «Lời dặn», topic picture, text, «Đã hiểu», no person; announcer frame = Tống ma ma figure + name + two buttons.
Doc row (law 14) fixed by me on review/mama-only-own-rv 1649c8df (KIT.md only, code identical to 91f80e32): §50.2 said the no-person tip has the «SAME frame size» but r2 code makes it same WIDTH, compact height → reworded.
Non-blocking: judgement call kept (tour steps stay with ma ma) — MAIN/sếp may ask to remove.
VERDICT: KIT OK 1649c8df1fbf6c361b87d7f651562f86e969c4f0 review/mama-only-own-rv (= r2 91f80e32 + KIT.md wording).
