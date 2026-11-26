# PLAYER REVIEW — E-S1-R1-random-4-3513467308 (thd / thd_tho, ipad, persona random = casual newcomer)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md §B; moments in rerun-E-S1-E-S1-R1-random-4-3513467308-moments.md (this run only). Scope: the runner (an AI driving a real-tap harness) looked at the trace tail + moment log (+ shots where noted); a short life.

## 1. Summary
- Persona random = casual newcomer (harness `rand`), origin thd · road thd_tho, seed 3513467308, ipad, real taps (1608), jsClicks 0, harness 2df8f5fa.
- Age 21, year 4, buổi 423, rank 0, ending «Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 21 tuổi»; death by illness at 21 (Hồng nhan bạc mệnh), game-imposed; debut board played (29 moves); robot-audit VALID. 0 bugs / 0 stuck / 0 dead buttons.

## 2. Scores (1–10)
a. First 15 minutes — 5 · b. Gameplay loop & pacing — 5 · c. Buttons & UI — 9 · d. Story & drama — 6 · e. Characters & interactions — 5 · f. Choices & fairness — 5 · g. Rewards, feedback & emotion — 3 · h. Mini-games — 7 · i. Visuals & sound — 8 · j. Co-op — n/a

## 3. Top 3 loved · hated · replay?
Loved: the 29-move board I could play; the prince's banquet gift choice; the readable end summary. Hated: the stack of chest + toasts over the end card; the cut stipend. Replay another life? Yes.

## 4. BUGS found
1. GAME — popup over the END card, 9th repro (end.png): the stipend chest «Bổng lộc tháng giêng · bị cắt xén» + toasts «Thái hậu → ta: thiện cảm -1», «Danh -2», «Sủng -10» cover the end card «KIẾP Liễu yếu gặp sương». Fast lane (already sent).
2. HARNESS — .kmov NO-EXIT DIALOG (div.kmov.kcf.km-full) stalled the picker 96 steps / 60 s; unstuck by tapping «Ta biết rồi» (scene layer: a person taps the scene).

No technical bugs.

## 5. Suggestions (player view; feature freeze, MAIN files new-feature ones)
- Hold the stipend chest and toasts until the end card is dismissed. · Do not cut the stipend on the month of death.
