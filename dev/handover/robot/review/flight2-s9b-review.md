# Player review — flight2-s9b (origin muoi = salt-merchant's daughter, road random, persona BOLD, Fold 755x1000, LIVE github.io)
Honest scope: real-tap robot (0 JS clicks, 8207 taps). The runner AI did NOT view screenshots this life (hands-off, context kept for a very long life); this review is from harness numbers, moment log and bug list only. Scores are not given for areas not seen.

## 1. Summary
Life ended by DEATH: «Hồng nhan bạc mệnh — Sốt rét nguy kịch, không qua khỏi», age 29, game year 11, buổi 1581, no exit pick (exitPick null). Rank stayed 0 for the whole life (486 moment-log lines, all rank 0), although the game offered promotions (offers 593 seen / 54 picked). Real time ≈ 09:20Z–19:00Z with 5 harness switches (all resume=1 from ckpt, same life): 594fa1ee → 34314d23 (buổi 271) → 64d62d9b (371) → d417d3bb (471) → 7ca6b369 (821) → b4b181f8 (871). The json «harness.sha» only shows the first head.
Counters: bugs 59 · dead buttons 9 · stuck 0 · kfocVisits 57 · audit VALID (death, no exit pick, real taps).

## 2. Save size curve (chars)
722k@271 · 927k@371 · 1.06M@471 · 1.56M@821 · 1.67M@871 · 2.28M@1271 · 2.72M@1521 · 2.79M@1571 (≈ +2.0–2.2k chars/buổi, linear, no plateau).

## 3. BUGS (details in flight2-s9b.json / .md)
1. «Có tin đang chờ» / «Sang ngày mới» disabled or no-turn with no dialog on screen and a non-empty dialog queue (21 + 12 + 8 softlock lines).
2. Dialog queue holds N copies of the same dialog («Tâm trạng · Quý phi …», «Tin báo»; up to 10 copies); each close pops one, looks like a dead ✕.
3. [dead] «Lui» has no effect: .dlg «Tâm trạng · Thường tại Diệp Lưu Ly», .dlg «Nhờ thái giám tìm thú nuôi» ×2.
4. [js] `f.rk.split is not a function` ×4.
5. [game] no way out: «Tin báo» — no button reachable (clipped, nothing scrolls); a «dialog scrolled to the end has no close» ×1.
6. [stuck] ×2 no-clock loop (150 taps without a clock step), unstuck by harness; 0 15-min stucks.

## 4. Game-side observations
- 11 years, rank 0 throughout with a BOLD persona: promotion offers existed but the bot's picks never moved rank; worth a balance look (is rank 0 → 1 reachable by a bold salt-merchant daughter in 11 years?).
- Death by illness at 29 arrived as a game-imposed ending (valid).
