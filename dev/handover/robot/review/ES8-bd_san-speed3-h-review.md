# Review ES8-bd_san-speed3-h — E-S8 row run by E-S3 (origin bd / road bd_san, iPad 1180x820, bot sens, seed 1507365466)
Harness real-tap f65d019b, fresh life, NO resume. Started unpinned on github.io LIVE build 8af7b3429f38 (CTM_BI s=5fb13d60+); one «unstick reload» when LIVE moved to 2bf58283d119 → harness served the recorded 8af7b3429f38 locally (127.0.0.1:8813) for the rest of the life. VALID; robot-audit class MIXED-BUILD only because of that one harness switch (game build identical, 8af7b3429f38 throughout).
## 1 Summary
Heroine Phùng Diệu Hoa (Công chúa Ba Tư hòa thân) · 17 years, age 36 · max rank Tần · 2364 buổi · 23 760 real taps · 0 children · ending «Xuất gia làm ni cô» (Hoàng thượng Gia Thịnh băng hà năm 17, thọ 37; Hoàng tử Vĩnh Tông lên ngôi; no child + low rank → cạo tóc vào chùa Cảm Nghiệp — game-imposed custom) · bugs 4, stuck 0, dead buttons 3.
## 2 Findings (facts)
- End card «Thanh đăng cổ Phật» (life summary + «Chuyển kiếp») is clean — no «Bổng lộc» popup.
- Softlock «Sang ngày mới» tapped 3× and the buổi does not turn ×5, queue Q=1 «Có người đến» (hidden-queue family, still on 5fb13d60+ build).
- Dead close «Để sau» on «Danh hiệu mới» AND «Danh hiệu lên bậc» (3 real taps, dialog stays) — same fault as random4-h.
- Dead button .mapsc «Phật đường1 bóng» covered by span.k3l in #kshR (same as random4/5-h).
- SAVE STALE ×24 (every 100 buổi) = packed-save false positive; no SAVE REWIND, no crash, no JS error this life.
- No gift-picker bug this life.
## 3 Suggestions: clear the hidden dialog queue before «Sang ngày mới» disables; make «Để sau» close the «Danh hiệu …» dialogs; uncover the Phật đường map hotspot.
