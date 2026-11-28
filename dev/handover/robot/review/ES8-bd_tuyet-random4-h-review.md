# Review ES8-bd_tuyet-random4-h — E-S8 row run by E-S3 (origin bd / road bd_tuyet, iPad, bot rand, seed 2859551964)
Harness real-tap f65d019b. Long life with 2 resumes onto real github.io (22:56Z, 01:03Z) and 3 «unstick reload» fallbacks to local recorded builds (0b372aa14258, 86170222adab, 0b37…). VALID, flag «mixed build» (robot-audit MIXED-BUILD).
## 1 Summary
Heroine Liêu Ý Hoan (Công chúa Ba Tư hòa thân) · 20 years, age 37 · max rank Thường tại · 2906 buổi · 16 256 real taps · 0 sons, 1 daughter · ending «Thái phi — Thành Thái phi»: Hoàng thượng Vĩnh An băng hà y12-of-card, Tân Thái hậu Diêu Doanh Nguyệt xét lại chuyện cũ (cơ may: Hiểm) và tha, dời đến Thọ Khang cung (a SURVIVED ending, not a death) · bugs 13, stuck 0, dead buttons 2.
## 2 Findings (facts)
- End card «Tà dương cung cũ» (life summary + «Chuyển kiếp») is clean — no «Bổng lộc» popup over it.
- Real SAVE REWIND ×4 (b367→364 ×2, b378→376 ×2, b460→459, b1191→1190: 1–3 buổi lost each), all in the old-build segments.
- Softlocks: «Chờ tin» disabled with no dialog on screen ×2 (queue Q=5 and Q=10: Lịch tháng / Hôn sự / Tin báo / Thiên mệnh / Xét phẩm cuối tháng) and «Sang ngày mới» ×3 not turning ×2 (Q=1 «Có người đến», «Nghe đồn») — hidden-queue family, on real-LIVE segments too.
- Dialog «Hội phối đồ: báo đề» scrolled to the end has no close/next (first visit; later visits unstuck by taps).
- «Danh hiệu mới» «Để sau» tapped 3× for real, dialog stays (dead close).
- Gift picker: «kipgo» off-screen ×8 only in the old-build segment (before the 22:56Z re-force); after it, «re-opened 3× by «Chọn lá này» with no gift given» ×4 (gift-completes UNPROVEN).
- No-clock loops ×2 (150 taps without a clock step) on «Ngọc Thanh các» and «Cảnh Phúc cung · Dưỡng Xuân hiên».
- SAVE STALE ×17 = packed-save false positive (not counted).
- Dead button: .mapsc «Phật đường1 bóng» covered by span.k3l (same as random5-h).
## 3 Suggestions: clear the hidden dialog queue before «Chờ tin» / «Sang ngày mới» disable; add a close to «Hội phối đồ: báo đề»; make «Để sau» close «Danh hiệu mới»; fix the save rewind on reload.
