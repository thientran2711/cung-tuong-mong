# PLAYER REVIEW — E-S1-R1-speed-5-3753418049 (thd / thd_tho, iPad 1180x820, persona speed)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md §B; moments in rerun-E-S1-E-S1-R1-speed-5-3753418049-moments.md. Scope: AI runner on a real-tap harness; end shot + moment log + bug table, not every buổi.

## 1. Summary
- Persona speed (harness `bold`), origin thd · road thd_tho, seed 3753418049, iPad, real taps (7016, jsClicks 0), harness 97e55a457, one continuous run on LIVE Build fb660cb78eec (pin=0).
- Age 23, year 6, 832 buổi, rank 0 throughout, ending «Hồng nhan bạc mệnh — Kiết lỵ nguy kịch, không qua khỏi» (death by illness, game-imposed, no bot exit pick); fell into Lãnh cung at year 4 (turn 35) after the debut.
- Validity: VALID; flag «kim board 2/10 at debut (97 s idle, raw 0.00)». The Lãnh cung fall came ~1 year after that board and the life ended 2 years later by illness — not a direct trial-quit ending; Foreman E asked to confirm. Other boards played: mua ×20, hat ×4, doden 10/10, td_cong 5/10, dan 1/10.

## 2. Scores (1–10)
a. First 15 minutes — 4. Pop-ups before the first free tap; goal never stated.
b. Gameplay loop & pacing — 3. After the debut, two years of Lãnh cung with nothing to do but «Sang buổi».
c. Buttons & UI — 4. Gift picker «Biếu quà làm lành» confirm off-screen (×7); popup over the end card.
d. Story & drama — 5. Debut cards read well; the fall to Lãnh cung has no clear cause.
e. Characters & interactions — 4. Few people in Lãnh cung.
f. Choices & fairness — 5. Debut picks show Tốn/Được and odds words; no way back out of Lãnh cung.
g. Rewards, feedback & emotion — 3. Stipend chest instead of an ending.
h. Mini-games — 6. Many boards played; kim stalled at 2/10 for 97 s (known board-input family).
i. Visuals & sound — 6. Art strong; sound not testable.
j. Co-op — n/a.

## 3. Top 3 loved · hated · replay?
Loved: (1) debut card writing; (2) the stipend chest art; (3) odds words on options.
Hated: (1) Lãnh cung dead-end; (2) the end card hidden by a pop-up; (3) gift picker with an off-screen confirm.
Replay? Not before Lãnh cung has a goal and a way out.

## 4. BUGS found
1. GAME — popup over the END card: «Bổng lộc tháng mười một» over «Kiếp Liễu yếu gặp sương» (end.png). Same family as 11 earlier lives; fast lane.
2. GAME KIT — gift picker «Biếu quà làm lành»: confirm «kipgo» stays off-screen after 8 real scrolls (×7) / no item can be given (126–240 items, ×7 notes).
3. JS — «page error: c is not defined» ×2.
4. HARNESS/GAME — board «kim» left at 2/10 moves raw 0.00 after 97 s (area 57 taps) at the debut (F board-input family).
5. DESIGN — Lãnh cung at year 4 with rank 0 and no goal; no explanation of the fall.

## 5. Suggestions (player view; feature freeze, MAIN files new-feature ones)
- End card above any stipend/info dialog. · A goal or way out of Lãnh cung. · Say why the fall to Lãnh cung happened.
