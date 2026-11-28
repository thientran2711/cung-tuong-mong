# flight2-s20g bugs

Life: iPad 1180x820, bot=greedy, seed 2026112573, pick="Tĩnh dưỡng|Truyền thái y", build main 5ad52416 (b 08960515ebeb), harness 795f87ec. Ending: Lãnh cung — Phát điên trong lãnh cung, age 26, year 9, buổi 1166, taps 4658.

- [dead] x2 .mapsc «Phật đường1 bóng» covered by span.k3l in #kshR (years 1 and 7; same as s20d)
- [game] x4 softlock: «Sang ngày mới» tapped 3x, buổi does not turn (Q=1: Có người đến)
- [game] x4 softlock: same (Q=1: Nghe đồn)
- [game] x1 softlock: «Chờ tin» disabled with no dialog on screen (Q=6: Lịch tháng / Xét phẩm cuối tháng · Quý nhân / Cách làm / Bảng tài nghệ / Tin chờ người sai đi / Nghe đồn)
- [game] x1 no-clock loop: 150 taps without a clock step on page «Chung Tú cung · Minh Hòa hiên · Ở đây còn 1 người.»
- [game] x1 item pick grid: confirm «kipgo» stays off-screen after 8 real scrolls

## Illness scan (bệnh / ốm / thái y / Tĩnh dưỡng)
- Her own illness: «Tâm bệnh · nhẹ» (year 5 turn 50): dialog shows ONLY «Lui», no cure road, no Tĩnh dưỡng / Truyền thái y (same pattern as s20c «Tâm bệnh» -> BUG per ILLNESS-CURE rule). The life then ended «Phát điên trong lãnh cung» (year 9), i.e. the mental-illness line ends in madness with the only dialog being «Lui».
- «Nổi mẩn» (year 5): «Mời thái y kê thuốc» present (ok). «Thái hậu bệnh nặng» (year 3): «Xin vào hầu bệnh» / «Chép kinh cầu an» present (ok). «Lập công · Trông con bệnh» (year 7): ok. «Thái y viện» modal (year 6): only «Lui» (info panel). «Cáo bệnh» on «Hội phối đồ» = event exits.
- «Tĩnh dưỡng» / «Truyền thái y» never appeared (0 hits in run.log): the pick never fired.
