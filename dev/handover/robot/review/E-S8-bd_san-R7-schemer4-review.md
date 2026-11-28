# E-S8-bd_san-R7-schemer4 — end-of-life review (player + reviewer, persona: schemer = plots, calculates)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md followed. Harness f65d019b (iPad 1180x820 real taps, jsClicks 0), seed 2613155667, fresh life, profile deleted first, no resume; **unpinned LIVE github.io, build 8a171afc+ (08960515ebeb, 28/11 04:14Z)** from first load to the end → clean, not mixed.

## 1. Summary
- origin bd, road bd_san, iPad, persona schemer (bot `sens`). Rank 1 (Mưu kế quê «Trung»), 19 tuổi, Trường Xuân cung · Vĩnh Xuân hiên, Sức 89/99, Bạc 175, top bar «Sốt rét nặng».
- 1 game year, 60 buổi, 916 taps, 5 turns, 9 boards (hat ×7, mua ×2), offers 10/6 picked. Ending: **Hồng nhan bạc mệnh — «Sốt rét nguy kịch, không qua khỏi»** (illness, game-imposed; the last action was an ordinary «Sang ngày mới» after the board result), end card «Liễu yếu gặp sương · Mở Sổ luân hồi» + «Tiếp theo» (shot end.png). exitPick none, jsClicks 0, stuck 0, dead buttons 0, 1 bug row. audit VALID.
- Board note: the board #kg82 «Quay lại» in the last taps is the normal exit of the finished «hat» result screen (BOARD line recorded «hat 92 moves 7/10» before it); it did not skip a playing board → not the INVALID «board left via Gợi ý/Bỏ qua/Quay lại while playing» case.

## 2. Scores (evidence: moment log, shot end.png)
- a. First 15 min 5. b. Pacing 2 — 60 buổi, 1 year, dead. c. UI 7 — end card clean; Chương 1 / Danh hiệu panels readable; 0 dead buttons. d. Story 2 — a rank-1 plotting start dies of malaria within 60 buổi with no real chance to scheme. e. Characters 3. f. Choices 4 («Tranh sủng · Mong manh» honest). g. Rewards 3. h. Mini-games 5 (hat boards end 20–22 s with 2–7/10 moves and raw 0.00 on all 7 — same pattern as every other hat board in this round; mua 10/10). i. Visuals 8. j. n/a.
## 3. Loved: honest odds on «Tranh sủng»; clean end card. Hated: dying at 19 in year 1 with no counter-play; the «hat» board never scoring.
## 4. BUGS: 1 row — SAVE STALE («the stored save stopped following the live game», no setItem error). No crash, no stall, no dead button.
## 5. Suggestions (freeze → recorded): an early «Sốt rét nặng» should give a cure option; look at hat-board scoring (raw 0.00 on every hat board).
