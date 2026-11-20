# kit-ton-row — report (kit-mark; ROOT-82 deadline order, FOREMAN_D econ-tamco «KIT-BLOCKED: Tốn row» + road-b2 / E22t «quý nhau»)

Branch `review/kit-ton-row` @ 99a80834 (from LIVE b1033eb0). `bash dev/tools/quickcheck.sh 99a80834` PASS (203 s, core gates PASS, old save ok, perf buổi 1174 vs live 1125). `golive.sh` not run (classifier refuses).

## Cause
An option card's «Tốn» row could not show a price the fx does not pay itself (econ-tamco: «Hao tâm cơ» costs Tâm cơ, «Làm như thường» the scheme price — both paid by the act, not by fx). Two places: (1) no option field existed for such a price; (2) a hidden-outcome card (`kitHideOut`, jk2b — every event choice with a `pid`) kept in its Tốn row only khắc / Sức / Bạc / Hồi môn, so a «tốn: Tâm cơ -n» (or Đức / Danh / Sủng) price was removed and the row read «Tốn: không».

## Fix (KIT §13.16, KIT page sample §28.6i, KIT_REQUESTS rows KIT READY)
- `ton:{tamco:-n}` / `ton:{bac:-pr}` on an option (j17 `dilTon`, used by `dilLine`): inserted as «tốn: …» after the odds word unless the line already has a «tốn:» part. Display only.
- `kitHideOut`: the Tốn row of a hidden-outcome card also keeps every price the OPTION ITSELF names (its `ton` field, or a «tốn: …» part of its line) whatever the stat. A plain `fx` consequence («ngay:») of a hidden-outcome card stays hidden (outcome rule) — NOT changed.
- «quý nhau» (L80): already in the word map since kit-cost-rows-home (KIT §13.14, LIVE 27a7dcf5); re-checked here: the decline row's liking loss reads «hai bên bớt quý nhau» at all 3 levels.

## Scan + before / after (dev/test/kit-ton-row.js, 7 stats × fx / «tốn:» / ton × open / hidden, Fold 755x1000 + iPad 1180x820)
| | before (LIVE b1033eb0) | after |
|---|---|---|
| open card, 21 cases | ton field: 0/7 shown (fx and «tốn:» ok) | 21/21 |
| hidden-outcome card, «tốn:» price | Tâm cơ / Đức / Danh / Sủng hidden (4/7), ok for Bạc / Sức / Hồi môn | 7/7 |
| hidden-outcome card, ton field | 0/7 | 7/7 |
| hidden-outcome card, plain fx Tâm cơ / Đức / Danh / Sủng | hidden | hidden (by design) |
| «quý nhau» decline hint | ok | ok |
Before 4/12 FAIL, after 12/12 PASS (the same script on LIVE).
Co-op (ROOT-82 gate): `coop-e2e.js` 68/68 PASS; `dev/test/coop-ton-row.js` (derived from the head of coop-e2e, Fold host + iPad guest, LIVE Worker) 19/19: BOTH seats show «Tâm cơ -3» and «Bạc -20» in the Tốn row, in the open card and in the hidden-outcome card. one-core-guard + media-check green; kit-cost-rows-home.js 15/15.

## For D (econ-tamco, 2 lines)
In `PEND.roadpick` (jtamco.js): replace the «tốn: Tâm cơ -${c.tc}» text in x by `ton:{tamco:-c.tc}` (road «Hao tâm cơ»), and give «Làm như thường» `ton:{bac:-price}` (the scheme price, paid by the act) and «Thuê người» `ton:{bac:-(price+hire)}`; keep `fx:{}` so nothing is charged twice. Rows already carry the same words (no %), the odds word stays first.

## Honest limits
- I did not run econ-tamco's real PEND.roadpick card (the branch is not merged here); I tested the generic option shape with the same fields on both seats. D should re-run its own test after the 2-line swap.
- The fx-consequence of a hidden-outcome card is deliberately still hidden; if road-b2 wanted THAT shown it is an owner/design question (it would reveal event outcomes).
