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
