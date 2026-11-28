# E-S8-bd_tuyet-R8-lover1 — end-of-life review (player + reviewer, persona: lover = chases romance/gifts)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md followed. Harness f65d019b (iPad 1180x820 real taps, jsClicks 0), seed 409298460, ~35 resumes (same life, resume=1). Build note: **flag «mixed build»** — 5 builds (a22cf45d → b16b4b93 → 066d9af0 → ca4a1689 → 5fb13d60+ LIVE); most of the life ran on pinned local builds (pin-server resume), the last ~450 buổi on LIVE after I cleared pinUrl/build0 in the ckpt per Foreman E's pin note (backup kept). VALID per Foreman E ruling (real game-imposed ending, exitPick none).

## 1. Summary
- origin bd, road bd_tuyet, iPad, persona lover (bot `sens`). Rank 0 (Phế phi · lãnh cung) all life, 40 tuổi at the end (Bạc 188, Sức 93/92).
- 23 game years, 4648 buổi, 516 taps (a very long auto-played life), 262 turns, 736 offers/319 picked. Ending: **Lãnh cung — «Tuổi xuân qua đi, sống cô quạnh nơi thâm cung»**; end card «Xuân tàn lãnh cung · Mở Sổ luân hồi» with a visible «Tiếp theo» button (shot end.png). exitPick none, jsClicks 0, stuck 0, dead buttons 1, 36 bug rows. audit MIXED-BUILD (valid with flag).

## 2. Scores (evidence: moment log, shot end.png)
- a. First 15 min 6. b. Pacing 2 — 23 years / 4648 buổi stuck at rank 0 is the longest flat life of the round; the story never rises. c. UI 6 — end card is clean (dark ink vignette, title, subtitle, single red «Tiếp theo»), one dead button (`img.kfr` over a `?`), 2 late buttons (11–13 s). d. Story 3 — a lover persona never got romance traction in the lãnh cung; ending «sống cô quạnh nơi thâm cung» fits but is bleak. e. Characters 4. f. Choices 5 («Phụ tuyến · Gửi quà Tết về nhà» offers Nhận lời / Khéo từ chối with clear Tốn/Được). g. Rewards 4. h. Mini-games n/a. i. Visuals 8. j. n/a.
## 3. Loved: the clean end card; the Tết side-quest wording. Hated: 23 years with no path out of the lãnh cung; the number of tab crashes.
## 4. BUGS (36 rows, no new play-stopping game bug)
- **Renderer tab crashes** ×26 (buổi 495…4610, renderer ~1.9 GB) — harness resumed each time from the ckpt.
- **Save**: QuotaExceededError («the game save no longer fits localStorage»), SAVE STALE ×2, SAVE REWIND ×1 — all on the old pinned segment (save 5.2M chars); on LIVE the save is ~380K chars (fix is LIVE).
- **Softlock** «Sang ngày mới» tapped 3× but the buổi does not turn, dialog queue Q=1 «Có người đến» (LIVE; same family as speed4/random3/E-S3).
- 2 late buttons: «Ta biết rồi» 11.4 s after .kmov opened; «Vào cung ngay» 12.7 s after #klife opened. 1 DEAD BUTTON: `?` covered by `img.kfr` (frame image over the button).
## 5. Suggestions (freeze → recorded): rank-0 lovers need a romance hook in the lãnh cung; save size must stay small for 4000+ buổi lives.
# E-S8-bd_tuyet-R8-lover1 — end-of-life review (player + reviewer, persona: lover = romance player) — FLAGGED, read §1

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md followed. Harness 08a4ff8b → 2df8f5fa → 8ea10d7e (4 resumes, 2 tab crashes at buổi 485 / 1039 resumed from ckpt), iPad 1180x820 real taps, jsClicks 0; game github.io LIVE; seed 409298460.

## 1. Summary — TWO kiếp in one process
- **Kiếp 1 (Công chúa Ba Tư hòa thân, age 18, rank 2): ended «Ban hoa — Bị ban hoa, xuất cung» at buổi 1** (moment log lines 4–13): picked the dance card «Dâng điệu múa Ba Tư» → mini-game board #kg82 → the robot left it (the board-idle quit family, fixer #11 job 8) → «Duyên cung lỡ hẹn». By the 26/11 rule (board left via Quay lại → INVALID) kiếp 1 is NOT counted.
- **Kiếp 2** (the harness continued after «Chuyển kiếp»): Tào Mạn Châu, lãnh cung, 21 tuổi at the year-5 look (Danh 4? Bạc 301, Sức 100/100, mood «Phiền muộn» −46), 17 game years (age 18→34), 2350 buổi, 6852 taps → **Hồng nhan bạc mệnh — «Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 34 tuổi»** (illness, game-imposed). exitPick none, jsClicks 0, audit VALID for this final end. It is a real whole life but NOT the row's Ba Tư road (kiếp 2 is a normal hậu cung origin). **Counting decision left to Foreman E: I count E-S8 = 13 valid + 1 FLAGGED (this).**

## 2. Scores (kiếp 2, 2350 buổi; evidence: moment log (814 lines), year-5 salary shot m-rank-521-37)
- a. First 15 min: 6. b. Pacing: 4 — long (2350 buổi) with a rich beat every month: «Bổng lộc tháng chín · Nội vụ phủ phát» panel (vải bông, Trà Long Tĩnh, than liễu, son sáp, nén mỡ dê ×3, Bạc +55, big «Nhận») — clear, good. c. UI: 5 — 7 bug rows: 2 tab crashes (buổi 485, 1039; resumed), `.kmov` no-exit stall 88 steps (unstuck), «Biếu quà làm lành» stall 15 min, #kload stall 127 steps. d. Story: 5. e. Characters: 5. f. Choices: 5 — «Chép kinh cầu phúc», «Cho mượn (Bạc -20 → thiện cảm)», «Không mua» for the informer are readable. g. Rewards: 7 (the monthly salary reveal). h. Mini-games: kiếp 1 board left unplayed by the old harness. i. Visuals 9. j. n/a.
## 3. Loved: monthly salary reveal; clear cost/gain rows. Hated: 2 page crashes; the gift picker stall again; lãnh cung 17 years. Replay: yes.
## 4. BUGS: Page crash ×2 (renderer, large save ~4 MB; ckpt resume ok) — for F/MAIN perf; gift picker confirm off-screen (known); .kmov no-exit (known); #kload stall 127 steps (harness waiting on the load screen «Vào cung ngay» after a reload).
## 5. Suggestions (freeze → recorded): same as other lãnh cung lives (a way out).
