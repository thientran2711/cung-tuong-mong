# PLAYER REVIEW — ES7-R8-speed-4-h (bd / bd_hen, iPad 1180x820, persona speed) — E-S7 column

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md §B; moments in rerun-E-S1-ES7-R8-speed-4-h-moments.md. Scope: AI runner on a real-tap harness; end shot + harness log + bug table, not every buổi.

## 1. Summary
- Persona speed (harness `bold`), origin bd · road bd_hen, seed 596336198, iPad, real taps (15185, jsClicks 0), harness f65d019b, pin=0 on LIVE.
- Age 23, year 5, 628 buổi, rank 0 throughout, ending «Lãnh cung — Phát điên trong lãnh cung» (game-imposed, no bot exit pick); VALID with flags «mg-unplayed (debut ve 0/10)» (same family as E-S5 / speed 3753418049: the life fell to Lãnh cung in year 1 and went on 628 buổi with 80+ real boards) and «mixed build (LIVE update mid-life: 86170222adab → bf5366a06e45 / s 24beb1a4)».
- Boards: hat ×38, mua ×34, dan ×5 (1–5/10), tho ×5, hoa, dauho, ve ×1 (0/10, 97 s). 121 offers seen, 83 taken.

## 2. Scores (1–10)
a. First 15 minutes — 4. Pop-ups before the first free tap; the goal is never stated.
b. Gameplay loop & pacing — 3. Lãnh cung from year 1; 4 years of «Sang buổi».
c. Buttons & UI — 4. «Biếu quà làm lành» confirm off-screen ×8 (+×5 re-opens); dialogs scrolled to the end with no close (.kmov, «Phòng bị»); dead «Để sau» on «Danh hiệu mới».
d. Story & drama — 5. The fall into Lãnh cung in year 1 reads abrupt; the madness ending is moody and fitting.
e. Characters & interactions — 4. Few people in Lãnh cung.
f. Choices & fairness — 5. Options show Tốn/Được and odds words; no way out of Lãnh cung.
g. Rewards, feedback & emotion — 5. The end card «Hồn lạc lãnh cung · Mở Sổ luân hồi» is clear and has a single «Tiếp theo».
h. Mini-games — 6. Many boards really played; the first board «ve» not (0/10, 97 s).
i. Visuals & sound — 6. Art strong, the end card art is dark and fitting; sound not testable.
j. Co-op — n/a.

## 3. Top 3 loved · hated · replay?
Loved: (1) the end card for the madness ending; (2) boards that really play; (3) odds words on options.
Hated: (1) the debut board «ve» that cannot be played; (2) Lãnh cung with no goal; (3) the gift picker with an off-screen confirm.
Replay? Not before «ve» and the gift picker are fixed.

## 4. BUGS found
1. HARNESS/GAME — debut board «ve» left at 0/10 moves after 97 s (area 25) → Lãnh cung in year 1 (F «ve» board-input family; Foreman E rule: mg-unplayed flag, valid).
2. GAME KIT — gift picker «Biếu quà làm lành» confirm «kipgo» off-screen after 8 real scrolls ×8; re-opened 3× by «Chọn lá này» with no gift ×5 (K-PICK-GO-REACH, not live yet).
3. GAME — SAVE REWIND ×4 (the game went back to an older save).
4. GAME — dialogs scrolled to the end with no close/next: «.kmov» ×1, «Phòng bị» ×1 (harness unstuck by taps); dead «Để sau» on «Danh hiệu mới» ×1.
5. DESIGN — Lãnh cung has no goal.
End card: CLEAN on s=24beb1a4 (no «Bổng lộc» over it) — first unpinned LIVE end seen without the pop-up; CTM_BI s=24beb1a4 b=bf5366a06e45.

## 5. Suggestions (player view; feature freeze, MAIN files new-feature ones)
- Fix the «ve» board so the debut is playable. · A goal or way out of Lãnh cung. · A reachable gift confirm.
