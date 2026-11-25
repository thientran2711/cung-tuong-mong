# rrcnvma-R4-rebel-1 — player review (R3, cnv_ma, rebel = rule-breaker)
Harness 1a29f470 · Fold 755x1000 · seed 1943759971 · 698 buổi (~6 years), 2194 taps in the last slice (resumed several times) · 0 dead buttons · 2 stuck verdicts, both on the «Tin báo» dialog.
LIMIT: no moment log from the harness; this review rests on the table + 2 shots I looked at (end.png, stuck-1.png). No scores claimed.

## 1. Summary
Từ Cẩm Thư, cung nữ nhị đẳng of Phi Yến Thục Ý (Phi), road cnv_ma. Age 25, rank 0 at the end, ending «Xuất cung về quê» (age-forced exit, harness exitPick = none → VALID per audit rule «Xuất cung by age»; note the audit rule says tuổi 30, this one came at 25 — please confirm which age trigger applies on cnv_ma).

## 2. Observations
- BUG (known family): «Tin báo» dialog with «71 tin mới» is a wall of text; the robot's 15-min no-progress verdict fired twice on it (shots-…/stuck-1.png). 71 pending news items = the queue grows because nobody reads it → a real player would also drown. Sample lines are all the same shape («Nội vụ phủ bớt xén bổng lộc của X (Phi …) có oán, sai Nội vụ phủ chèn ép») — repetitive.
- ODD: end.png was captured on the «Đang thỉnh tranh…» loading screen, not on an ending card, so the harness's «end» shot does not show the ending; ask F whether the end shot should wait for the card.
- ODD (wording): «Đáp ứng Quách Như Mặc… tự nay ghét Hoàng hậu» — fine; nothing non-cổ-trang spotted in the visible lines.
- A cnv_ma maid at rank 0 after 6 years (Cung nữ nhị đẳng, Bậc 3 «đang ở») — a rebel persona that never rises may be the game working as intended for the maid road; flag for balance digest, not a bug.

## 3. BUGS → fast lane
1. «Tin báo» 71-item pile / stuck verdicts (family already fixed in newer harness; confirm on game side).
2. End screenshot taken on loading screen (harness).
