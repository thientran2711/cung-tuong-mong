# flight2-s8b (real-tap harness 496b6b66, fold)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick |
|---|---|---|---|---|---|---|---|---|
| flight2-s8b | Thái phi — Thành Thái phi | 23 | 740 | 1885 | 4 | 0 | 8 | — |

## Dead buttons

- .dlg «Nhờ thái giám tìm thú nuôi» «Xem Mèo mướp» covered by span.kitb in #mb · dead-fold-1795647598627.png
- .dlg «Nhờ thái giám tìm thú nuôi» «Xem Chó nhỏ lông xù» covered by b.kidn in #mb · dead-fold-1795647604976.png
- .dlg «Nhờ thái giám tìm thú nuôi» «Xem Chim họa mi» covered by b.kidn in #mb · dead-fold-1795647611344.png
- .dlg «Nhờ thái giám tìm thú nuôi» «Lui» covered by tapped 3× for real, dialog stays · noeffect-1795647626595.png

## Bugs

- [freeze] ×1 page froze: no harness step for 10 min (page.evaluate hung) at buổi 65
- [game] ×19 softlock: «Sang ngày mới» tapped 3× in one buổi but the buổi does not turn (dialog queue Q=1: Tin trong cung buổi này)
- [stuck] ×1 no-clock loop: 150 taps without a clock step on .dlg «Xét phẩm cuối tháng · Thường tại»
- [stuck] ×1 no-clock loop: 150 taps without a clock step on page «Chung Tú cung · Minh Hòa hiên · Ở đây còn 1 người.»
- [game] ×1 softlock: «Có tin đang chờ · xo» disabled with no dialog on screen (dialog queue Q=6: Xét phẩm cuối tháng · Thường tại / Tin chờ người sai đi / Tin báo / Lịch tháng / Nhờ thái giám tìm thú nuôi / Tin trong cung buổi này)
- [game] ×1 softlock: «Sang ngày mới» tapped 3× in one buổi but the buổi does not turn (dialog queue Q=3: Xét phẩm cuối tháng · Thường tại / Xét phẩm cuối tháng · Thường tại / Tin trong cung buổi này)
- [harness] ×1 area tap would have landed on a button (it appeared under the point) — blocked: «kemo kemo-gian kemo-live kemo-m-shake»
- [dead] ×1 close button has no effect: .dlg «Nhờ thái giám tìm thú nuôi» «Lui»