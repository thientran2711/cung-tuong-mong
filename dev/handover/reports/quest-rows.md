# quest-rows (owner #66 corrected ~04:49Z: keep info, drop only the chip form)
PRIORITY #1 CHECK: OD #57/#66 | main j72.js PEND q72o (chip source) | review/* dialog-stack had a delete version, reverted (3e34ff22) | claims none
Cause: the offer line `<p class="past"><b>kind</b> · hạn N tuần · N bước: …</p>` was split into a chip cloud by kpConvert.
Fix: j72.js `q72InfoRows` = ONE kit `kitRows` block «Loại | … · Hạn | N tuần · Bước 1 | … · Bước 2 | …» (q72StepTxt shared with q72Steps). No new kit part, no CSS.
Scan dev/test/quest-chips-scan.js (real offer dialog of every T72 template makeable here): before (main) 53/53 chip clouds, after 55/55 with rows and 0 chips, 0 page errors. 80 templates need specific rivals; they share the one builder line. Fold + iPad shots looked: rows aligned, no chips.
Not touched: phụ tuyến chapter news lines «Tin trong cung · … · chương n» (still chips by kpConvert) — say if she meant those too.
