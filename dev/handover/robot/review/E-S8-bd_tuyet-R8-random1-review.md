# E-S8-bd_tuyet-R8-random1 — end-of-life review (player + reviewer, persona: random = casual newcomer)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md followed. Harness shas used on this one life (resume=1 from checkpoints): c826eca4→…→b4b181f8→496b6b66→8dc395ba (12 resumes, incl. 5 container restarts). Game builds 6a87c26fe0f5 → 79050fbf5464 → 4763d410aa0d → 13f84c70f2a3.

## 1. Summary
- persona random (harness bot `rand`), origin bd, road bd_tuyet, iPad 1180x820 real taps, seed 444865383.
- 21 game years (age 19→39), 2995 buổi; rank: lowest tier («Phế phi · lãnh cung», Danh 4, Sủng 0, Sức 89/89 shortly before the end).
- Ending: **Hồng nhan bạc mệnh — «Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 39 tuổi»** (death by illness, game-imposed). exitPick none, jsClicks 0 → audit VALID.

## 2. Scores (evidence: harness moment log (687 lines) + every-20-buổi looks + the final screen; I did not watch each buổi)
- a. First 15 minutes: 5. Goal is told by chapter cards; the first buổi stacks Tin báo / Lịch tháng dialogs before I can act.
- b. Loop & pacing: 3. Most of 21 years is the lãnh cung loop: Trường Môn viện, 2 cards («Đưa cơm áo», «Hỏi chuyện cũ»), «Sang ngày mới». Nothing changes for ~15 years.
- c. Buttons & UI: 3. 6 dead-button rows (`.kmov «?»` zero-size ×3, «Tâm trạng · Phi Tề Tố Ngưng» «Lui» ×3 no effect), 71 bug rows (dialog dup queue «Tâm trạng», «Sang ngày mới» no-turn / disabled with Q 9–24, Tin báo no way out on iPad).
- d. Story: 4. Rare chapter beats («Chương 4 · Mã cầu và săn hổ») queued many times; the person you talk to in lãnh cung (Viên Lạc Anh) says the same «Hỏi chuyện cũ» every visit.
- e. Characters: 5. Faces good (final shot: Viên Lạc Anh, Phế phi · lãnh cung, atmospheric ruined courtyard); no memory of my earlier visits.
- f. Choices: 4. Only 2 cards; «Đưa cơm áo» is grey (no money, Bạc 15) — a newcomer cannot tell what unlocks it.
- g. Rewards/emotion: 5. The night frame and illness warning «Trọng bệnh · nguy kịch» (top bar) foreshadow the end; the death itself is a plain text card.
- h. Mini-games: n/a (0 played). i. Visuals/sound: 8 (courtyard art strong). j. Co-op: n/a.

## 3. Loved / hated / replay
- Loved: lãnh cung courtyard art; cổ trang wording; the illness warning before death.
- Hated: duplicate «Tâm trạng» dialogs; dead «Sang ngày mới»; 15 empty years.
- Replay: yes (curiosity), not on this road without a way out of lãnh cung.

## 4. BUGS — all known families (BUG FAST LANE already has them): Tâm trạng dup queue, Sang ngày mới no-turn (fixed on Build 13f84c70f2a3: no-turn count dropped after 21:55Z), Tin báo no ✕ iPad (KK29 pack-4), `.kmov «?»` zero-size button ×3 (new tiny item: a zero-size «?» button in the movement dialog — NOT blocking).
## 5. Suggestions (freeze → recorded): lãnh cung exit/revival event; ask names in dialog once, not per queue.
