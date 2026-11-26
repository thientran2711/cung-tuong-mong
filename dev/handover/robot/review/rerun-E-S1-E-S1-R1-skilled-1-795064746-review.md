# PLAYER REVIEW — E-S1-R1-skilled-1-795064746 (thd / thd_tho, Fold, persona skilled = core gamer)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md §B; moments in rerun-E-S1-E-S1-R1-skilled-1-795064746-moments.md. Scope: the runner (an AI driving a real-tap harness) looked at ~4 shots (cold-palace look, end card, stuck shots) plus the full harness log/bug table, not every buổi (the life is 2813 buổi).

## 1. Summary
- Persona skilled (harness `sens`), origin thd · road thd_tho, seed 795064746, Fold 755x1000, real taps (1221), jsClicks 0.
- Years 18 (age ~19→35), 2813 buổi, max rank 0, ending «Hồng nhan bạc mệnh — Lao phổi nguy kịch, không qua khỏi» (death, VALID).
- ~9.5 h wall clock, started fresh 17:05Z 25/11 (the previous try on Build 6a87c26fe0f5 locked on «Kính sự phòng báo tin» and was parked), 4 resumes (buổi 336, 1182, 1537, 2627).
- Builds: LIVE 79050fbf5464 (dbae89eb) → 13f84c70f2a3 (5e013076) from buổi 1182 (new browser profile). Harness: d417d3bb → b4b181f8 → 496b6b66 → 8dc395ba (HARNESS PASS) from buổi 2627 (switch logged in switch-log.txt).

## 2. Scores (1–10)
a. First 15 minutes — 5. Origin card + Tuyển chọn cards read well, 5 pop-ups before the first free tap; no stated goal.
b. Gameplay loop & pacing — 2. After the demotion at year 3 the life is 15 years (~2300 buổi) on one page; stats grow (Tài 96, Đức 100) but Danh 0 / Sủng 0 never move.
c. Buttons & UI — 6. On the old builds many softlocks («Sang ngày mới» ×76, «Có tin đang chờ · xo» ×15 with 4–12 hidden dialogs, «Tin báo» with no reachable button); after buổi 1182 on Build 13f84c70f2a3: ZERO softlock lines in 1631 buổi, 0 dead buttons.
d. Story & drama — 5. The slide into Lãnh cung is a strong tragic beat but explained by a one-button card; 15 years of silence follow.
e. Characters & interactions — 4. Same two Phế phi companions for years (Thượng Quan Diệu Âm, La Mạn Nhu); no visitors, no events that react to my 15 years.
f. Choices & fairness — 3. Core-gamer view: no option leads out of the cold palace (no petition, no scheme), so skill does not matter (law 5 «harder as she climbs» cannot even be tested).
g. Rewards, feedback & emotion — 4. Monthly stipend lists only; the death is a one-line text.
h. Mini-games — n/a (none entered).
i. Visuals & sound — 9. Cold-palace snow scene is the best art of the run; sound not testable.
j. Co-op — n/a.

## 3. Top 3 loved · hated · replay?
Loved: the cold-palace art; the clear stat strip; the zero-softlock stretch after the queue fix.
Hated: 15 years with nothing to do; the unexplained fall; the stipend popup over the end card.
Replay another life? Not as this road — I would stop at the demotion.

## 4. BUGS found
1. GAME — popup over the END card, 4th repro (end.png): «Bổng lộc tháng chạp» over «KIẾP Liễu yếu gặp sương» (death on a month turn). Fast lane (already sent).
2. GAME (old builds, FIXED?) — «Sang ngày mới» no-turn ×76, «Có tin đang chờ · xo» ×15; none after buổi 1182 on Build 13f84c70f2a3 (1631 buổi) — verification for the queue no-turn fix.
3. GAME — «Tin báo» dialogs with all buttons below the screen (2×), stuck once 15 min (old builds).
4. DESIGN — Lãnh cung has no goal and no exit for 15 years (see §2b/§2f).
5. Harness: 1 note «area tap would have landed on a button — blocked: Nhận» (harness guard worked).

## 5. Suggestions (player view; feature freeze, MAIN files new-feature ones)
- Give the cold palace goals/events or a petition path so skill matters. · Explain the demotion. · Hold the stipend dialog until the end card is closed.
