# E-S8-bd_tuyet-R8-speed4 — end-of-life review (player + reviewer, persona: speed = impatient mobile player)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md followed. Harness f65d019b on resumes (first start 8ea10d7e), iPad 1180x820 real taps, jsClicks 0, seed 1278943442, ~30 resumes (same life, resume=1). Build note: **flag «mixed build»** — 4 builds recorded (8d5e3382 → 540358c4 → 066d9af0 → ca4a1689 LIVE); most of the life ran on a pinned local build (pin-server resume), the last stretch (~buổi 3524+) on LIVE ca4a1689 after I cleared pinUrl/build0 in the ckpt (backup kept) per Foreman E's pin note.

## 1. Summary
- origin bd, road bd_tuyet, iPad, persona speed (bot `sens`). Diệu Nhạn Hồi, 38 tuổi, Phế phi · lãnh cung (Trường Môn viện), rank 0 all life (Sắc 91 Tài 100 Tâm cơ 100 Đức 49 Danh 0 Sủng 0, Bạc 189, Sức 93/93).
- 21 game years, 3780 buổi, 2409 taps, 253 turns. Ending: **Hồng nhan bạc mệnh — «Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 38 tuổi»** (illness, game-imposed; the top bar showed «Trọng bệnh · nguy kịch» for the last stretch). exitPick none, jsClicks 0, dead buttons 0, stuck 0. audit MIXED-BUILD (valid with flag).

## 2. Scores (evidence: moment log, shots m-look-3780.png, m-new-3772-60.png)
- a. First 15 min 6. b. Pacing 3 — 21 years in the lãnh cung at rank 0 / Danh 0 / Sủng 0; the loop repeats (chest, look, Sang buổi). c. UI 6 — the «Tặng quà» picker (1 Chí tôn · 19 Phi tần tabs) is clear on the LIVE build: item card (Túi thơm hồ lô, DÙNG / NGUỒN / KHI TẶNG / HỢP NHẤT) + recipient card (TỐN 2 khắc, ĐƯỢC Sủng +); the «Mệnh truyện» tab says honestly «Ta đang ở lãnh cung, chưa bàn chuyện sắc phong» with the condition «Được minh oan thì phục vị Đáp ứng». d. Story 4 — a long, quiet, rankless life ending by illness; the «Trọng bệnh · nguy kịch» warning chip is a fair signal, but nothing offers a cure. e. Characters 4 (only Tần Liên Y, Hoàng thượng offered as recipient). f. Choices 5. g. Rewards 5. h. Mini-games OK (boards mua/dan/hat played, results normal; 2 «theu» boards stalled 6 min = known harness-cleared family). i. Visuals 8 (lãnh cung scene + Phế phi portraits lovely). j. n/a.
## 3. Loved: the honest Mệnh truyện line about what restores rank; the gift-picker layout. Hated: 21 years with no way up; the repeated tab crashes (below).
## 4. BUGS (31 rows, no new play-stopping game bug)
- **Renderer tab crashes** ×22 (buổi 869…3513, renderer 1.9 GB) — harness resumed each time from the ckpt.
- **Save quota** (game, old build): QuotaExceededError + SAVE STALE + one SAVE REWIND (older build segment). After the LIVE switch the save was ~400K chars (fix is LIVE).
- Known `.kmov` NO-EXIT stall (harness unstuck); 2 «theu» board rows (harness); 1 late button «Vào cung ngay» 19.3 s on #klife; **softlock «Sang ngày mới» tapped 3× but the buổi does not turn (dialog queue Q=1 «Có người đến»)** — same family E-S3 reported on LIVE ca4a1689.
## 5. Suggestions (freeze → recorded): illness warning earlier with a cure path; tab memory.
