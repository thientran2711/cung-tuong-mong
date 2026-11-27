# E-S8-bd_tuyet-R8-speed3 — end-of-life review (player + reviewer, persona: speed = impatient mobile player)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md followed. Harness 8ea10d7e (iPad 1180x820 real taps, jsClicks 0), seed 291451175, several resumes (same life, resume=1). Build note: LIVE moved during the long run → **flag «mixed build» (4 builds: f573dc94 → 540358c4 → 066d9af0 → 4cd3f974)**, VALID per Foreman E ruling.

## 1. Summary
- origin bd, road bd_tuyet, iPad, persona speed (bot `sens`). Đậu Mộng Điệp (Ba Tư princess road), 37 tuổi at the end, rank 0 the whole life (Sắc 100 Tài 100 Tâm cơ 75 Đức 100 Danh 0 Sủng 0, Sức 73/73).
- 20 game years, 2933 buổi, 729 taps, 245 turns. Ending: **Hồng nhan bạc mệnh — «Lao phổi nguy kịch, không qua khỏi»** (illness, game-imposed; the top bar showed «Lao phổi · nguy kịch» during the last invitation). exitPick none, jsClicks 0, dead buttons 0, stuck 0. audit VALID (MIXED-BUILD).

## 2. Scores (evidence: moment log 1288 lines, shots m-new-2930-7.png, end.png)
- a. First 15 min 6. b. Pacing 3 — 20 years at rank 0 / Danh 0 / Sủng 0 is a long flat road; the loop (chest → look → Sang buổi) repeats. c. UI 6 — the monthly chest «Bổng lộc tháng mười một» is clean (9 item rows, Nhận visible) but the list repeats «Nến mỡ dê» ×3; the invitation card is readable with odds label «Mong manh», OK. d. Story 4 — the long-lived princess never rises; the illness ending arrives after 20 years with a visible «Lao phổi · nguy kịch» warning at the top (good) but no action to cure. e. Characters 4. f. Choices 5 — odds ladder words used correctly. g. Rewards 6 (chest repeats). h. Mini-games n/a. i. Visuals 8 (card art + portrait good). j. n/a.
## 3. Loved: the warning chip «Lao phổi · nguy kịch» at the top (honest); the invitation card layout. Hated: 20 years with no progress; the save breaking (below) for a long life.
## 4. BUGS (14 rows, no new play-stopper in the game itself)
- **Save quota (game)**: key hclh-save-v2-1 reaches ~5.29M chars; QuotaExceededError ×600+ from buổi ~2863, «SAVE STALE», one «SAVE REWIND». Fix stack save-fix-stack-rv18 is not LIVE yet.
- **Renderer tab crashes** at buổi 1500/1701/1854/1945/2135/2413/2588/2816 (memory 2–2.7 GB renderer) — harness resumed each time from the ckpt.
- Known `.kmov` NO-EXIT stall (harness unstuck by «Ta biết rồi»); 1 harness area-tap-blocked row.
- 404 /audio/VOICES.json (console).
## 5. Suggestions (freeze → recorded): trim the save size for long lives; the chest should merge identical items («Nến mỡ dê» ×3).
