# s3e-display-fix — report (worker S3E-DISPLAY-FIX, opus)

PRIORITY #1 CHECK ('Công lao 11/10|cấm túc|drowning|chết đuối'): OD 0 | ledger 0 | claims 0 | main 15 | review/* 0 | archive 0 — no fix branch existed; reused kit (j79 kitBar), accState (j41/j77), kc3 odds path (kc3Od/kc3Line), BAL.odb.jkc.rlKcElope.

Branch `review/s3e-display-fix` = **290b3bf6** on LIVE origin/main 5e013076. Sources only (dev/build, dev/test, dev/kit/KIT.md); root index.html/sw.js NOT rebuilt (lander rebuilds).
Big review (touches a number rule + odds display).

## (a) «Công lao 11/10» — have/need family
Root: `srvMerit` (j42, every master's order) added công lao with no cap; `srvMonth` clamps only once a month, so between months the
HUD / Thân phận / Xét phẩm showed mp > need (at the top rung she cannot rise; or while the Nội vụ phủ exam waits). Fix: srvMerit caps at
`srvMpNeed(rk)` (behaviour-neutral: srvMonth already threw the surplus away, promotion resets mp=0).
Display rule (ONE kit helper, KIT.md registered): `kitNeed(cur,need)` → the have never passes its need (met = `need/need`). kitBar uses it.

| file:line (before) | before | after |
|---|---|---|
| j42 HUD chip Công lao | `${floor(mp)}/${need}` (11/10) | kitNeed → 10/10 |
| j42 srvRows Công lao | same | kitNeed |
| j42 srvRows Ban gả | `Danh ${S.danh}/20` (hard-coded 20, law 4) | `kitNeed(S.danh,BAL.danhG.srvWed)` |
| j42 srvRows Xuất cung | `${age}/${ask}` | kitNeed |
| jts Xét phẩm Công lao / Chủ tin | raw | kitNeed |
| jts / jmkt «nàng thân với ngươi (a/b)» | raw | kitNeed |
| j79 kitBar number | `${cur}/${need}` | kitNeed (every skill card Tiến bộ bar) |
| j23 / j85 Tiến bộ | raw | kitNeed |
| j14 / j68q Chứng cứ (lãnh cung) | raw | kitNeed |
| jkh / jroute chứng cứ (có a/b); jroute Đức (ẩn dật) | raw | kitNeed |
| jst14 Chủ tin / để ý / Sủng; jst14 + j67 «Hoàng thượng để ý a/b»; j67 Sủng | raw | kitNeed |
| jtabs Ngôi Hoàng hậu Đức chip | raw | kitNeed |
| jkc Lễ nghi (×2) | raw | kitNeed |
| jlant lantern found/need | raw | kitNeed |
Left as is (not progress-to-a-need): Hồi/Bước/trang x/y, ranks n/N, x/10 scores, seats/caps (j30, jpet), stat/cap (jkh Sức), Ta + N bóng; j70/jdh/jdh2/jst14 «Hoặc qua … tháng» already Math.min.

## (b) Dư đồ «đang cấm túc (1 tháng)» on every place
Root: j27 `mapHTML` disR() returned her OWN state (cấm túc / lãnh cung) as the reason of EVERY spot and printed it in each `.mmeta`; list view
did the same (j25 mchip on every `.mband`; j41 grid wrapper + accState in j41 and its j77 override → `mchip agw` on every tile).
Fix: ONE `mapSelfWhy()` (j27). Her state shows once, on HER spot (plan: «Ta + N bóng · đang cấm túc (còn N tháng)»; lãnh cung spot when out;
list: her tile). Every other spot stays shut (lock mark, title tooltip keeps the reason, tap card «Không vào được lúc này: …»).
| view | before | after |
|---|---|---|
| plan map, cấm túc (Fold) | 27/27 spots labelled | 1/27 (her palace) |
| plan map, lãnh cung | 28/28 | 1/28 (Lãnh cung) |
| list view, cấm túc / lãnh cung | 25 tiles | 1 tile |

## (c) «Thuở thanh mai» «Đến bến sông · Rất vững» → «Chết đuối khi bỏ trốn»
Root: the option had no odds (`o` absent in tm96z x1 and BAL.kc3.fx; kcO card in old jkc tmtron), so the kit meter (jk2b kitOptOdds, owner
19/11: sure option = top word) painted «Rất vững», while `kcElope(false)` rolled BAL.odb.jkc.rlKcElope (25) for drowning in secret; the text
«thành: đi theo chàng» was also false (the plain road never elopes; the success road is the rare ✦ card).
Fix: the drowning is THE option's roll: `o:()=>kcElopeLive()` (= 100 − BAL.odb.jkc.rlKcElope, one core), `kcElope(rare,ok)` takes the option's
roll; line now «Vững · tốn: Sức -20 · thành: thoát chết, bị người nhà kéo về · kết: Bị ép chia lìa · hỏng: chết đuối giữa sông». Old-save jkc
tmtron card gets the same j67 line. Family scan `dev/test/scan-sure-death.py` (sure-looking options reaching a hidden death roll): before 1
(jkc3b x1; jkc tmtron also fixed), after 0. Same family, wording only: cung nữ «Hẹn gặp riêng» hỏng line now names the death risk
(srvAffairCaught can kill when pregnant / tied to a consort's scheme).
OPEN FOR OWNER (law 3, not changed — feature freeze / law 16): «Đến bến sông» has no real gain (thành = only survives, caught, losses);
the rare ✦ road is the only elope. Needs her ruling if it should gain something.

## Tests
- `dev/test/s3e-display-fix.js` (new): Fold 755x1000 ALL PASS, iPad 1180x820 ALL PASS (a: kitNeed, srvMerit cap, HUD/Xét phẩm panel
  «Công lao 10/10» with mp 11; b: plan + list, cấm túc + lãnh cung; c: odds 75 = survival, line, ok=false drowns, ok=true caught; 0 page errors).
- `dev/test/dudo-lock.js` Fold: page errors 0.
- Shots looked at (not in git): b-map-confined Fold/iPad (only Dực Khôn / Trường Xuân «Ta + N bóng · đang cấm túc (còn 1 tháng)», rest locked),
  a-congLao Fold/iPad (Xét phẩm «Công lao 10/10», right column 10/10). (c) checked by line text, no shot.
