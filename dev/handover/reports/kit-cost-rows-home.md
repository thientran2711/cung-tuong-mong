# kit-cost-rows-home — report (kit-mark; ROOT-80 order: E25 «KR home-stat rows» + E22t «quý nhau»)

Branch `review/kit-cost-rows-home` @ 3332c63b (from LIVE 983a9436). `bash dev/tools/quickcheck.sh 3332c63b` PASS (217 s, core gates PASS, old save ok, perf like live). `golive.sh` not run (classifier refuses).

## Cause
1. `kld` «Lời đồn» was not in NAMES (kgt / kap / khm were), so `fmt` never printed it.
2. Word mode (`kitHintPhrase`, hidden-outcome cards): an effect line with a number and no entry in the phrase map returns null = «never guessed» → every home stat and «quý nhau» vanished: a card holding one read «không được mất gì»; «Xin thêm hồi môn» was guessed as «dưỡng sức»; a decline row «mất: hai bên quý nhau −F» (jrcv rcvNoO) read «không được mất gì».
3. Rows: «Hồi môn» was not a cost word (`KIT_COSTRE`, `KA_STAT`); on the plain-text path pressure / rumour «+N» was read as a gain.

## Fix (KIT §13.14, KIT page sample §28.6h, KIT_REQUESTS rows marked KIT READY)
NAMES.kld; KIT_COSTRE + KA_STAT know «Hồi môn»; `kaSent` + `kitHintSign`: Áp lực hôn sự / Lời đồn are «less is better»; `kitHintPhrase` + `KIT_HINT_MAG`: one phrase triple per stat (Gia thanh, Áp lực hôn sự, Hồi môn, Lời đồn) and «quý nhau»; `kitHintSign` knows «quý nhau».

## Before / after (dev/test/kit-cost-rows-home.js, 15 checks; same script on LIVE 983a9436 vs the branch)
| check | before | after |
|---|---|---|
| fmt names all four home stats | FAIL (no Lời đồn) | ok |
| rows: dowry in Tốn / Gia thanh in Được / pressure +8 a loss | FAIL (pressure +8 in Được) | ok |
| rows: pressure −8 a gain, Gia thanh ± | FAIL | ok |
| rows: rumour less is better | FAIL | ok |
| hint signs (pressure / rumour inverse, quý nhau) | FAIL | ok |
| word mode ×6 (kgt, kap, khm, kld, quý nhau decline, quý nhau gain) | FAIL ×6: «không được mất gì» / «ngươi giữ lễ» only | ok: stat named |
| real home cards of all 9 origins (kcInit + kcCards), 23 distinct cards with a home stat | – | all have a non-empty hint that is not «không được mất gì» |
Before 11/15 FAIL, after 15/15 PASS. Real-card hints before→after: «Xin thêm hồi môn» «dưỡng sức» → «thêm của hồi môn (chút ít)»; «Thỉnh an phụ thân» «người ấy có thiện cảm hơn» (whole kit card read as one blob by my scan, not the game path) → «gia môn thêm danh giá».

## Honest limits
- E25b's costrows.js scan (101/366 + 8/10) is on a branch I could not fetch (7882ea5d not on the remote), so I wrote my own scan above. E28 «Dâng phần hồi môn…» lives on that unmerged branch: not seen; its «Tốn: không» should be re-checked there after merging this branch (the hint now names the dowry; the Tốn row of a plain cost line «Hồi môn −40» is shown in rows and kept in word mode).
- A sure card (no roll) never shows its `l` (failure) part — by design (a sure act cannot fail); 12 of the 23 scanned cards have their home stat only there or under other labels («Nợ nhà», «Tiếng trong xóm», «Phe chủ chiến», «Hòa ước» = kap / kgt of the cnv / nc origins, already shown by `fmt`).
