# rv-cnv-exit-promo — reviewer report (review/cnv-exit-promo 2813d5cd, base = origin/main 9f72524b, merge clean)

PRIORITY #1 CHECK: OD 0 owner-ruled numbers touched (BAL values 2/5/-5/3/-15 unchanged, only moved) | main j42.js:431-446, jts.js:18, jexam.js:250 | review/* cnv-exit-promo only | claims cnv-exit-promo session_01V1ZZH11so2W4LCBezeHWT4.

## Verdict: PASS 2813d5cd

## Checks
1. Age-25 stay answers (j42 PEND.cnvAge, cnvWed, cnvGrant, cnvPrince)
   - Text, odds word, fx and outcome agree: «Xin ở lại» row = TỐN không · ĐƯỢC «ở lại đến ba mươi tuổi, chủ không đứng ra giữ…» · MẤT «chủ bớt tin dùng» (fx tin −5, now in fx, no longer hidden in go()). «Xin chủ giữ lại» = ĐƯỢC stay + Chủ tin +2. «Rất vững» = the kit's ruled sure-option meter; both answers truly certain (law 16 untouched). Law 3: each stay row has gain and loss/cost; law 2: the two stay answers are mutually exclusive by Chủ tin, exit road unchanged.
   - Law 4: diff of every number: typed 2/5/−5/3/−15 → BAL.eff.j42.tinKeep/tinWedStay/tinGrantStay/tinPrinceStay/tinhPrinceStay, same values; «30» → BAL.srvAge.out. one-core-guard / text / bind / text-rule PASS.
   - dev/test/cnv-age-stay.js 16/16 PASS (low + high Chủ tin, real touch, fx, no release before 30). stay-opt-scan.py: A 7 (honest), B 0, C 0, exit 0.
   - Not reproduced by the worker: the robot's real ending at 25 (ASK for F stands; regression test guards the real-tap path).
2. jts tsSrvRows exam row: one source for the hud chip, K3 box and the panel; wording cổ trang, no %, numbers from BAL/state («Công lao 99/10» in my shot is my forced test state). Real taps on Fold 755x1000 (HOST) and iPad 1180x820 (HOST): the box opens the panel, text fits kit boxes, no cut text, no page errors. Chip says «thiếu 1» while only the exam is missing; panel note «đủ công: dự khảo hạch Nội vụ phủ…». Known/kit: the Fold chip is 17 px tall (worker's KIT REQUEST, law 10, not this branch).
3. Gates: odds-unknown-scan = same 7 as origin/main (no new); merge on LIVE 9f72524b clean (branch is on current main); QUICKCHECK PASS · 295 s · open 2469 ms · old save ok · perf new/live render 280/348, tab 797/755, buổi 2242/1929 ms (box noise), tasks>200ms 30/31 · core gates PASS.
Pair picture: CDN img/_review/cnv-exit-promo/pair.jpg (Fold + iPad: age-25 prompt, Xét phẩm box; looked at).

## Notes (non-blocking)
- Xét phẩm chip stays «thiếu 1» for the whole rung until the exam is passed, by design.
- ~100% reviewed / ready to land.
