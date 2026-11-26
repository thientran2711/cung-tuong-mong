# PLAYER REVIEW — E-S1-R1-skilled-2-286280747 (thd / thd_tho, iPad, persona skilled = core gamer)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md §B; moments in rerun-E-S1-E-S1-R1-skilled-2-286280747-moments.md. Scope: the runner (an AI driving a real-tap harness) looked at the end card + the harness log/moment lines (0 bugs); the life is 960 buổi.

## 1. Summary
- Persona skilled (harness `sens`), origin thd · road thd_tho, seed 286280747, iPad, real taps (2514), jsClicks 0.
- Years 7 (age ~17→24), 960 buổi, max rank 1 (Đáp ứng → Quý nhân?? = rank 1 at year 4, back to 0 at year 6), ending «Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 24 tuổi» (death, VALID).
- ~5 h wall clock (started ~02:40Z 26/11), resumed at buổi 276 and 675 = harness switches (8dc395ba → 4d7a22c6 → d2e03d80, in switch-log.txt); LIVE github.io sw Build 13f84c70f2a3 → c039fbea2394.

## 2. Scores (1–10)
a. First 15 minutes — 6 · b. Gameplay loop & pacing — 4 (2 idle years, then the palace; one promotion then a slow fall) · c. Buttons & UI — 9 (0 bugs, 0 stuck; 2 harness «dead button» notes = a reward toast over the «Nghỉ ngơi» card) · d. Story & drama — 6 (the Điện tuyển selection scene is a real beat) · e. Characters & interactions — 5 · f. Choices & fairness — 6 (Điện tuyển options with odds words; but the promotion reversal is unexplained) · g. Rewards, feedback & emotion — 4 (a rank 1 → 0 with no explanation; the death is a text line) · h. Mini-games — n/a (offers 106 / picked 35, none entered) · i. Visuals & sound — 8 · j. Co-op — n/a.

## 3. Top 3 loved · hated · replay?
Loved: the Điện tuyển scene; the stipend chest art; the zero-bug 960 buổi. Hated: the unexplained demotion; 2 idle years; the stipend popup over the end card. Replay? Yes, to try to hold the rank.

## 4. BUGS found
1. GAME — popup over the END card, 6th repro (end.png): «Bổng lộc tháng sáu» over «KIẾP Liễu yếu gặp sương». Fast lane (already sent).
2. UI — a reward toast item (span.kitem in #rtoast) covers the «Nghỉ ngơi» act card for a moment (harness dead-button note ×2).
No game-logic bugs, no stuck.

## 5. Suggestions (player view; feature freeze, MAIN files new-feature ones)
- Explain a rank loss. · Hold the stipend dialog until the end card is dismissed.
