# rrcnvma-R4-speed-4 — review (SEAT R3, road cnv_ma)
- Ending: Xuất cung age 30, buổi 1709, taps 2966, dead buttons 4, stuck 0, bugs 1.
- Age-25 card (buổi 987): bot picked "Xin ở lại" (pickedExit=false); exit sibling not taken.
- Validity: VALID, forced exit at 30.
- Dead buttons (all in dlg «Nhờ thái giám tìm thú nuôi», age 19, ~buổi 1708-1742): "Xem Mèo mướp / Chó nhỏ lông xù / Chim họa mi" covered by span.kitb / b.kidn in #mb (item-card tap hits the price/stock button area), plus «Lui» NO EFFECT 3x. Shot noeffect-1795654426156.png shows the dialog with "Hết hàng / Thiếu bạc" disabled buttons and the ✕ at top; the «Lui» label is below the fold, so this looks like a harness tap target issue more than a game bug. Not confirmed; flag for F.
- Harness sha: 93812531 start; later resumes on bfa73a6e + F10 hooks.
