# rrcnvma-R4-rebel-3 — player review (R3, cnv_ma, rebel = rule-breaker)
Harness 1a29f470 · Fold 755x1000 · seed 786287489 · real taps 5418 (2069 in the final slice after resume) · 0 dead · 0 stuck · 0 bugs logged by harness.
LIMIT: the harness writes no moment log; this review rests on the harness table + ONE end screenshot (end.png) I looked at. Scores below are not claimed for areas I did not see.

## 1. Summary
Cung nữ tuyển vào cung (Nhâm Ngữ Yên), road cnv_ma, 180 buổi = 2 years, age 19, max rank 0 (Đáp ứng row on the card), ending «Hồng nhan bạc mệnh» — «Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 19 tuổi». Real death, no exit road → VALID.

## 2. Observations (end screen, Fold)
- ODD / BUG (ending card): the banner text «Hồng nhan bạc mệnh» + «Mẹ Sổ luân hồi» is drawn OVER the card body (over the «SỐNG TRONG CUNG / CHẾT TRONG …» rows, centre of the card) — text on text, rows unreadable. Shot: shots-rrcnvma-R4-rebel-3/end.png (local, not in git). Repro: die in cnv_ma, open the «Kiếp này» card; banner fades in over it.
- ODD: row label «ĐÁP ỨNG» shows twice-ish / a row is hidden by the overlay, can't tell the rank row text.
- Good: the card itself reads clearly (thân phận, sống trong cung, con cái, chết vì), the line «Chết là hết. Kiếp sau bắt đầu lại từ đầu…» is clear; figure art is fine.
- Death at 19 from illness after 2 years with rank 0: feels very early for a robot with no scheming; fairness of this early illness death is for the digest.

## 3. Scores
Not scored (no moment log, one screen seen).

## 4. BUGS → fast lane
1. Ending card banner overlaps the card body text (above).
