# E-S8-bd_tuyet-R8-random2 — end-of-life review (player + reviewer, persona: random = clicks anything)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md followed. Harness f65d019b (iPad 1180x820 real taps, jsClicks 0), seed 2582426134, ~15 resumes (same life). Build note: **flag «mixed build»** — 4 builds (4c4f7d0f → cb090860 → ca4a1689 → 5fb13d60+ LIVE); the first part ran on pinned local builds (pin-server resume); I cleared pinUrl/build0 in the ckpt per Foreman E's pin note (backup kept) and the rest ran on LIVE. VALID per Foreman E ruling (time-driven emperor-death ending).

## 1. Summary
- origin bd, road bd_tuyet, iPad, persona random (bot `rand`). Rank 0 all life, 38 tuổi at the end.
- 19 game years, 2653 buổi, 5752 taps, 220 turns, offers 531/384 picked. Ending: **Hồng nhan bạc mệnh — «Năm 19, Hoàng thượng niên hiệu Hưng Long băng hà, thọ 38 tuổi. Tân Thái hậu Lư Nguyệt Thiền xét lại chuyện cũ (cơ may: Mong manh), ban lụa trắng, ép ngươi tuẫn táng theo tiên đế»** (game-imposed, time-driven). End card «Ba thước lụa trắng · Mở Sổ luân hồi» + «Tiếp theo» (shot end.png). exitPick none, jsClicks 0, stuck 2, dead buttons 11. audit MIXED-BUILD (valid with flag).

## 2. Scores (evidence: moment log, shot end.png)
- a. First 15 min 5. b. Pacing 3 — 19 years rank 0; long flat. c. UI 5 — 11 dead-button rows (see below), end card clean. d. Story 6 — the ending is the strongest beat of the life: the new Thái hậu reviews the old grudge with an honest odds label («cơ may: Mong manh») and sends the white silk; strong, fitting. e. Characters 5. f. Choices 4 (random bot). g. Rewards 4. h. Mini-games 5. i. Visuals 8 (end card + vignette). j. n/a.
## 3. Loved: the tuẫn táng ending text with the odds line; the clean end card. Hated: 19 years at rank 0; map hot-spots covered by the side panel.
## 4. BUGS (38 rows, no new play-stopping bug)
- **DEAD BUTTON ×11**: `.mapsc` «Phật đường1 bóng» etc. covered by `span.k3l` / `button.k3r.kasr` in #kshR (the Ân sủng side panel over the Dư đồ map; same as random3); «Danh hiệu mới» «Để sau» tapped 3× for real, dialog stays (×2); `.kmov` `?` covered by `img.kfr` / `span.kin`.
- **Gift picker** (old-build segment): confirm «kipgo» off-screen after 8 real scrolls (×2); «Chọn lá này» re-opened 3× with no gift given.
- **Softlock** «Sang ngày mới» ×3, Q=1 (LIVE family); SAVE REWIND ×1; renderer tab crashes ×15; late button «Chuẩn bị thị tẩm» 13 s.
## 5. Suggestions (freeze → recorded): the map hot-spots must not sit under the Ân sủng panel; make «Để sau» close the dialog.
