# PROGRESS review/preg-rate (D57, Foreman D)
Owner choice (OD 16/11 s9, verbatim in dev/OWNER_DECISIONS.md L1205 + FOREMAN_D.md D57): option 4 = 1+3 — DOUBLE the base conception chance per night for everyone (player and NPC) PLUS a fertile-window peak from the monthly cycle (jcycle); low on other days. Balance check; trim the peak if NPC births run high.
Preconditions checked: mortality-r1 live (main b85cdb1e, jmort), cycle-r3 live (jcycle.js + dev/test/cycle.js on main).

## Done
- jbal.js: BAL.conc .25 → .5 (the one conception multiplier every conceiveCh caller goes through: nights, stolen nights, trysts jroute/j22, steal text, stage chips).
- jcycle.js §7: BAL.cyc.fert {peak:1.6, low:.5, cyc:.1}; cyPhase(p) from her TRUE cycle (cyBase.t): peak = the tuần after her cycle tuần (≈ day 10–17), cyc = cycle tuần, low = the tuần before it; no cycle (pregnant, ≥ 50) → ×1. conceiveCh wrapper = round(c × fert[phase]).
  Player text: one Sổ ghi line when her peak tuần starts (not when pregnant, once per tuần): "Ma ma dặn nhỏ: … tuần này là lúc dễ đậu thai nhất (có thai mỗi lần thị tẩm: <Rất thấp…Rất cao>)" — side-chance ladder (OD 03:05Z), no %; the stage "Có thai" cell already reads conceiveCh so it rises in the peak tuần. No kit part added (log line only).
- Co-op: no new roll; the factor is a pure function of name + tuần (same on host and guest); NPC nights stay in rivalsTurn/rivalsMonth (host only).
- Old saves: nothing new in the save except S.cyb.ft (optional).
- Bot dev/measure/preg-bots.js (real weekly endTurn loop, seeded), test dev/test/preg-rate.js.

## Results: see dev/handover/reports/preg-rate.md (handover branch). Peak NOT trimmed (NPC births ≈ 0.10 per consort-year).

## Review r1 (review/preg-rate-r1, reviewer session_01DgYSWobwX8ehBC7umUckXK) — PASS
- Merged onto main e9c6021d (jbal conflict: kept main's birthAdd:2 from balance-pass-r1 + conc:.5).
- Fix: three conception rolls bypassed conceiveCh — her "Hẹn gặp riêng" tryst (card showed conceiveCh, rolled a typed 15), an NPC consort's affair month (typed roll 5), and jroute Tư thông (typed clamp 5..60). Now one function trystCh(p) (jbal; jcycle applies BAL.trystC bounds to the raw chance, then the cycle factor). Check added to dev/test/preg-rate.js.
- Left alone (not a consort night, no cycle): servant-mode tryst j42 roll(10)/chanceW(10) — typed number, pre-existing; follow-up for the BAL one-core audit.
- Sims re-run (30 lives Sủng≥25, 15 lives Sủng≥60, 10 years): NPC births/consort-year 0.06→0.10 and 0.07→0.08; palace children after 10 y 6.2→9.5, 8.3→8.9; NPC-son heir 21/30→25/30. Peak not trimmed.
