# Review ES8-bd_tuyet-random5-h — E-S8 row run by E-S3 (origin bd / road bd_tuyet, iPad, bot rand, seed 902785299)
Harness real-tap f65d019b, ~9 resumes; last ~1221→1667 on real github.io (CTM_BI s=ca4a1689). VALID, flag «mixed build» (robot-audit MIXED-BUILD; unstick reload fell back once to local recorded 86170222adab, later re-forced onto LIVE).
## 1 Summary
Age 30 · year 12 · max rank 0 · 1667 buổi · 4299 real taps · ending «Hồng nhan bạc mệnh — năm 12 Hoàng thượng Cảnh Hòa băng hà thọ 33; Tân Thái hậu Lôi Thanh Từ xét lại chuyện cũ (cơ may: Mong manh), ban lụa trắng, ép tuẫn táng» (game-imposed; same no-warning tuẫn táng family).
## 2 Findings (facts)
- Tuẫn táng by Tân Thái hậu: the last buổi (b1660) shows a «Long thể bất an» + «Chương 9 Sốt trong trại» build-up, but the lụa trắng arrives with no choice/escape shown to the player in the moments log.
- SAVE REWIND ×3 real reload rewinds (b162→b160/161, b408→406, b755→753, b1049→1048, b1221→1220: 1–2 buổi lost each) — game bug, real.
- SAVE STALE ×5: «stored clock unreadable» on packed saves → likely harness false positive (E-S6), not counted as game bug.
- Softlock on real LIVE (b~1237, y9): «Sang ngày mới» tapped 3× and the buổi does not turn, dialog queue Q=1 «Có người đến» (hidden-queue family, shot noturn-1.png in shots dir).
- Gift picker: «kipgo» off-screen ×1 and «re-opened 3× by «Chọn lá này»» ×1, both in the OLD-build segment (before the 22:55Z LIVE re-force); none after.
- Dead button: .mapsc «Phật đường1 bóng» covered by span.k3l in #kshR (iPad).
## 3 Suggestions: show the Tân Thái hậu review before the lụa trắng with a way out; fix the save rewind on reload; clear the hidden dialog queue before «Sang ngày mới» disables.
