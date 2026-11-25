# R6-greedy-5 (Fold 755x1000, bot=sens, seed 495740957, pf/pt_tang) — end-of-life notes — COUNTED (mixed builds, see below)
Ending **Thái phi — «Thành Thái phi»**, age 23, year 6, rank 0, 986 buổi, 5553 real taps, 0 JS clicks. robot-audit: VALID. Builds: github.io LIVE only, but the life ran ≈ 4 h across Build 9434d88366cc → 4763d410aa0d → 0dc642a71578 → 13f84c70f2a3 (service-worker updates arrived mid-life); harness 64d62d9b at start, one crash (`bareTap is not defined` in unstick, buổi ~367) then RESUMED as the same life on b4b181f8. Written from the result JSON + moment log; I did not play it by eye, so no score table.
## Bugs (shots/saves/dumps under shots-R6-greedy-5/)
1. GAME «Sang ngày mới» no-turn softlock ×16 + 2 more (dialog queue Q=1..3: «Tin trong cung buổi này», «Xét phẩm cuối tháng · Tần», «Chương 3 · Học lễ nghi cung») and «Có tin đang chờ · xo» disabled with no dialog on screen (Q=6 and Q=11). Family = SANGBUOI r4 queue no-turn (fix 5e013076 / Build 13f84c70f2a3). I cannot attribute these rows to a build; the next life that starts on 13f84c70f2a3 will tell.
2. GAME dialogs with no reachable button: «Tin báo» (year 3 buổi 3 and a 150-tap no-clock loop on it), «Tết Nguyên tiêu · Đặt cược» (scrolled to the end, no close/next).
3. GAME «Tin trong cung buổi này» «Lui» tapped 3× for real, dialog stays; and DEAD BUTTONS «Xem Mèo mướp / Xem Chó nhỏ lông xù / Xem Chim họa mi» in the dialog «Nhờ thái giám tìm thú nuôi».
4. no-clock loops (150 taps without a clock step): «Lịch tháng», map page «Thừa Minh cung · Duyệt Xuân hiên» ×2.
5. HARNESS (blocked by the new guard, not a game bug): an area tap would have landed on a button that appeared under the point («Bàn chuyện thiên hạ»).
## Notes
Opening «Tiền truyện · Công chúa Phù Tang hòa thân · 1/3» moved rank 2 → 0, then rank 0 → 2 at year 3 (buổi 264, #kmrew), and the life ended as a Thái phi in year 6; 153 offers seen, 17 picked.
