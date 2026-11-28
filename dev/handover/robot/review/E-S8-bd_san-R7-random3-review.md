# E-S8-bd_san-R7-random3 — end-of-life review (player + reviewer, persona: random = clicks anything)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md followed. Harness f65d019b (iPad 1180x820 real taps, jsClicks 0), seed 3288960430, fresh life, profile deleted first, 2 resumes (buổi 76, 505, same life, container/tab crash). Build note: unpinned LIVE github.io; **flag «mixed build»** — LIVE moved during the 9-hour life: 5fb13d60+ (8af7b3429f38) → 8a171afc+ (08960515ebeb). VALID per Foreman E ruling.

## 1. Summary
- origin bd, road bd_san, iPad, persona random (bot `rand`). Phế phi · lãnh cung (Trường Môn viện), 25 tuổi at the end, Bạc 9, Sức 78/92, top bar «Tâm bệnh · nặng · Lãnh cung».
- 6 game years, 812 buổi, 2194 taps, 70 turns, offers 93/74 picked. Ending: **Lãnh cung — «Phát điên trong lãnh cung»** (game-imposed, from «Tâm bệnh · nặng»), end card «Hồn lạc lãnh cung · Mở Sổ luân hồi» + «Tiếp theo» (shot end.png). exitPick none, jsClicks 0, stuck 0, dead buttons 2, 12 bug rows. audit MIXED-BUILD (valid with flag).

## 2. Scores (evidence: moment log, shots end.png, dead-ipad-1795844488530.png)
- a. First 15 min 5. b. Pacing 3 — 6 years in the lãnh cung, ends by madness with Bạc 9. c. UI 6 — end card clean; the «Hoàng thượng lật thẻ bài» scene is beautiful (the whole hậu cung wall of portrait cards, spotlit Quý phi Lữ Linh Vận, «Tối nay: … được chọn hầu đêm nay» card, «Ta biết rồi» button); 2 dead-button rows. d. Story 4 — a Phế phi slowly breaks: «Tâm bệnh · nặng» → madness, clear warning chip; no way to treat it. e. Characters 6 (the card wall names Điển Từ Đàn, Nhan Vân Tịch, Tiêu Tố Tuyết, Tư Mã Nguyệt Thiền, Tào Khê Nguyệt, Chung Tịnh Sơ …). f. Choices 4 (random bot). g. Rewards 3. h. Mini-games n/a. i. Visuals 9. j. n/a.
## 3. Loved: the card-flip scene and the portrait wall. Hated: the «Tâm bệnh» countdown with no cure path; a close button that does nothing.
## 4. BUGS (12 rows)
- **Dead / no-effect**: `.kmov` button covered by `span.kin` (cut-scene decoration over the button); «Danh hiệu mới» «Để sau» tapped 3× for real, dialog stays (same as lover3, random1-h, random2).
- **Dialog without exit**: «Hội phối đồ: báo đề» scrolled to the end has no close / next button (game); harness NO-EXIT rows for #kload (no button for 31 s) and «Hội phối đồ: báo đề».
- **Gift picker**: confirm «kipgo» stays off-screen after 8 real scrolls; «Chọn lá này» re-opened 3× with no gift (every item locked / confirm never usable) — still present on LIVE 5fb13d60+.
- **Softlock** «Sang ngày mới» ×3, Q=1 «Có người đến»; late button «Ta biết rồi» 13.8 s; SAVE STALE (no setItem error); renderer tab crashes ×3 (buổi 76, 507, 642).
## 5. Suggestions (freeze → recorded): «Hội phối đồ: báo đề» needs a close; the gift-picker confirm must stay reachable; «Tâm bệnh» needs a cure option.
