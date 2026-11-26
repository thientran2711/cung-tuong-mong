
## E-S4 (pf / pt_hai solo, iPad-first; runner session_01DgYSWpN3dDzQf4UbZcWfrP) — digest of the first 10 lives, 26/11
Evidence limit (honest): lives are queue-driven; reviews are written from the harness logs/moment logs, bug lists, stuck shots and the ending shot, not from watching every screen. Scores are my reading, low confidence on pacing/story.
Lives (all VALID, real taps, no cap): cautious-3 ipad (thích khách, 18, 97 buổi) · cautious-2 fold (Lãnh cung, 26, 1245) · lazy-1 ipad (khó sinh, 25, 1133) · speed-5 ipad (độc, 25, 803) · cautious-5 ipad (lao phổi, 22, 653) · lazy-5 fold (Lãnh cung, 23, 656) · greedy-3 ipad (độc, 27, 1081) · speed-4 ipad (Xuất gia IMPOSED by the Emperor's death, 32, 2097 — child8 ruling) · cautious-4 ipad (Lãnh cung, 20, 194) · speed-2 ipad (Ban hoa, 20, 1).
### Average score per area (1-10, n=10 unless noted)
a first 15 min 5.9 · b gameplay loop/pacing 3.6 · c buttons/UI 5.5 · d story/drama 5.2 · e characters 4.4 · f choices/fairness 4.4 · g rewards/feedback 5.5 · h mini-games 5.5 (n=2) · i visuals/sound 7.4 · j co-op n/a.
### Recurring themes (lives hit / 10)
1. Monthly stipend popup «Bổng lộc tháng N · Nội vụ phủ phát» stacked ON TOP of the ending card — 5 of 6 endings that were seen on LIVE builds before the fix (cautious-2, lazy-1, cautious-5, speed-4, cautious-4; speed-5/greedy-3/lazy-5/speed-2 clean) → E98 «endcard-top».
2. Dialog queue not draining → «Sang ngày mới»/«Có tin đang chờ» disabled or not turning with no dialog on screen (Q 1-24): lazy-1, greedy-1, speed-4/5, cautious-5, speed-3, cautious-4. GONE after LIVE 5e013076: 0 rows in ~1 500+ buổi of resumed lives.
3. Tall «Tin báo» / story dialogs with options below the fold and no ✕ (cautious-2, lazy-1, cautious-5, greedy-1, cautious-4): game/kit (KK26 #3, KK29). KK29 confirmed on «Tân quân lập uy Ch.2».
4. Duplicate queued «Tâm trạng · <person>» dialogs (2-14 copies; each ✕ pops one) — lazy-1, greedy-1/3, speed-4, cautious-5.
5. Rank 0 for years: 6 of 10 lives never rose above Đáp ứng for 3-20 game years (greedy-1: rank 0 at year 20, 2 800+ buổi, still alive). Long lives at rank 0 are safe and dull.
6. Unexplained falls to Phế phi / lãnh cung (cautious-2, cautious-4 in 2 years, lazy-5): the ending card gives no cause.
7. First-ceremony fairness (speed-2): «Lễ ra mắt · Dâng Kỳ» (all three options «Rất vững») → mini-game → life over in buổi 0 at Quý nhân; needs a BAL odds check.
8. Fold softlock «Tắm gội chờ giá»/«Kính sự phòng báo tin»: killed lazy-5/greedy-3 on the old build; FIXED on dbae89eb (same seed passed).
### Bugs (all sent to Foreman E as BUG FAST LANE with shots)
stipend popup over ending; queue no-turn softlock; Tin báo no ✕; Tân quân lập uy Ch.2 below fold (KK29 fixed); Fold Tắm gội no-op (fixed); JS «reading 'off'» (fixed) and `f.rk.split` (F has); pet dialog «Nhờ thái giám tìm thú nuôi» options covered by chip b.kidn; dead-end frames #kmrew/.kfoc; duplicate mood dialogs; page crash at buổi 1899/2628 with a 3.5-4.4 MB save (harness resumes).
Harness bugs found by this unit (all closed by F): realtap probe on odds chip (c826eca4), #kpzoom/#kpinfo loops, Tin báo scroll, iPad 2-column option-card tap point (closed on d2e03d80, same life moved buổi 126→137).
### Player suggestions (parking lot, feature freeze)
a visible promotion path for lazy/speed/greedy players; a «why you were deposed» line on the ending card; first ceremony must not end the life of a new player; warn when Bạc is too low for a risky scheme; early warning before a fatal illness; explain why «Sang ngày mới» is disabled.
