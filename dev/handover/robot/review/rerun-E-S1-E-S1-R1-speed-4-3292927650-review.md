# PLAYER REVIEW — E-S1-R1-speed-4-3292927650 (thd / thd_tho, Fold phone, persona speed)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md §B; moments in rerun-E-S1-E-S1-R1-speed-4-3292927650-moments.md. Scope: AI runner on a real-tap harness; end shot + moment log + full bug table, not every buổi.

## 1. Summary
- Persona speed (harness `bold`), origin thd · road thd_tho, seed 3292927650, Fold, real taps (10084, jsClicks 0).
- Age 40, year 23, 3173 buổi, rank 0 throughout, ending «Xuân tàn lãnh cung — Tuổi xuân qua đi» (game-imposed, no bot exit pick); VALID. Boards played: hat ×43, mua ×40, dan ×5, doi ×2, doden, theu, kim, ve. 374 offers seen, 141 taken.
- Flags: «mixed build (pin-server resume)» (Foreman E 27/11 01:08Z, VALID); «save-quota» (QuotaExceededError from ~buổi 2750, year 20: every later save lost; Foreman E 27/11 01:02Z, VALID at a real end).
- Builds: 5ab5b80e406e → LIVE fb660cb78eec (pin=0). Harness 2df8f5fa → 8ea10d7e → 97e55a457 (ended there).

## 2. Scores (1–10)
a. First 15 minutes — 4. Several pop-ups before the first free tap; the goal is never stated.
b. Gameplay loop & pacing — 3. 3173 buổi, rank 0 for 23 years; same festival/invitation cards, then Trường Môn viện with «Sang buổi».
c. Buttons & UI — 4. Gift pickers «Tặng quà» / «Biếu quà làm lành» confirm off-screen; the end card hidden by the stipend dialog.
d. Story & drama — 5. Event writing good, but nothing changes the player's rank.
e. Characters & interactions — 4. People appear as look-ups; in Lãnh cung only «Hỏi chuyện cũ» with a fellow outcast.
f. Choices & fairness — 6. Options show Tốn/Được and odds words (Vững, Rất vững); no way out of Lãnh cung.
g. Rewards, feedback & emotion — 3. Stipend chests, no progress; the end card never showed.
h. Mini-games — 7. Many boards played well (mua, hat); kim/ve once each.
i. Visuals & sound — 6. Art strong; sound not testable.
j. Co-op — n/a.

## 3. Top 3 loved · hated · replay?
Loved: (1) cổ-trang event writing and art; (2) the stipend chest card; (3) many boards that really play.
Hated: (1) 20+ years of Lãnh cung with no goal; (2) save lost silently after year 20 (quota); (3) end card hidden by a pop-up.
Replay another life? Not before Lãnh cung has a goal and the save quota is fixed.

## 4. BUGS found (shots/saves in the runner out dir, not in git)
1. GAME — popup over the END card: «Bổng lộc tháng chạp» over «Xuân tàn lãnh cung» (end.png; semi-transparent, title collides). Same family as 12 earlier lives; fast lane.
2. GAME — save-quota: QuotaExceededError ×1959 (save ~5.19M chars) from year ~20; j6 save() swallows it; SAVE STALE ×4 and SAVE REWIND ×1 (the game went back to an older save). Forwarded by Foreman E to MAIN 168 / Foreman B (packed save).
3. GAME KIT — gift pickers: «Tặng quà» ×1 and «Biếu quà làm lành» ×1: confirm «kipgo» off-screen after 8 real scrolls.
4. HARNESS — area tap would have landed on a button (kfxon j59sz) — blocked, ×1.
5. DESIGN — Lãnh cung has no goal; rank 0 for 23 years.

## 5. Suggestions (player view; feature freeze, MAIN files new-feature ones)
- Pack/trim the save so long lives do not hit the quota. · End card above any stipend dialog. · A goal or way out of Lãnh cung.
