SẴN SÀNG KIỂM 911dc47899facad6534e5692fda8d9218db1e659 — D57 review/preg-rate (conception ×2 + fertile window), peak kept, tests pass (pre-existing night-day 'steal' fail also on main).

# D57 review/preg-rate — worker report (session_01DgYSWnxBe741HPgNbrkYjF)
Owner rule: OD L1205 (16/11 s9) option 4 = 1+3, verbatim in dev/OWNER_DECISIONS.md and FOREMAN_D.md D57. Base: origin/main b85cdb1e (mortality-r1 + cycle-r3 live, checked).

## What changed (one source, no typed numbers)
- dev/build/jbal.js: BAL.conc .25 → .5 (doubled for everyone; every conception roll and every shown chance goes through conceiveCh).
- dev/build/jcycle.js §7: BAL.cyc.fert {peak:1.6, low:.5, cyc:.1} by her TRUE cycle phase (cyPhase): peak = tuần after her cycle tuần (≈ day 10–17 of the cycle), cyc = her cycle tuần (only trysts/odd nights reach it: the card is off), low = the tuần before it. Pregnant / age ≥ 50 → ×1.
- Player sees it through: the existing "Có thai" stage cell / act texts (chanceLvl, ladder Rất thấp…Rất cao, no %) which now rise in the peak tuần, and one Sổ ghi line when her peak tuần starts ("Ma ma dặn nhỏ: qua kỳ nguyệt sự chừng mươi ngày, tuần này là lúc dễ đậu thai nhất (có thai mỗi lần thị tẩm: …)"). No new kit part.
- Co-op: no new roll; the factor is a pure function of name + tuần, same on host and guest; NPC nights/rolls stay host-only (rivalsTurn/rivalsMonth muted on the guest).

## Balance check (dev/measure/preg-bots.js: real weekly endTurn loop, seeded, same seeds before/after, 10 years)
Player bot "sensible" (Sủng ≥ 25), 40 lives each:
| measure | before | after |
|---|---|---|
| NPC conception per 100 nights | 5.5 | 10.7 (peak 16.0 / low 5.4 chance) |
| her conception per 100 nights | 2.6 | 7.0 |
| NPC births per consort per year (mean y1–10) | 0.07 | 0.10 |
| NPC births per year (palace) | 0.20 (y1) … ~0.8–1.2 | 0.33 (y1) … ~1.0–1.5 |
| palace children alive after 5 years | 6.1 | 8.6 |
| palace children alive after 10 years | 7.2 | 9.4 |
| NPC sons alive after 10 years | 3.4 | 4.8 |
| named heir = an NPC son (end of run, 40 lives) | 31 | 36 |
Player bot "favoured" (Sủng ≥ 60), 20 lives each:
| measure | before | after |
|---|---|---|
| her conception per 100 nights | 4.1 | 11.4 (peak 16.9 / low 5.9) |
| her births per year (mean) | ~0.07 | ~0.12 |
| her children alive after 10 years | 0.15 | 0.65 |
| NPC births per consort per year | 0.04 | 0.10 |
| palace children alive after 10 years | 5.2 | 10.5 |
Verdict: NPC births ≈ 0.1 per consort-year (one child per consort per ~10 years) — not high; peak NOT trimmed. NPC heir pressure rises (more NPC sons), which is the intended pressure on her. Note: the bot's player dies early in ~half the lives (bot does not treat illness) — mortality domain, not this item.

## Tests (one at a time)
- dev/test/preg-rate.js (new): PASS (phases for her + 11 NPCs × 3 tuần, ×fert, no phase pregnant/50, friend entry same, notice once / not while pregnant, old save without cyb loads).
- dev/test/cycle.js: logic ok, UI ok at 755x1000/1000x755/1180x820/1366x1024/844x390; 390x844 "NO rotate prompt" ALSO on base main (the test loads dev/index.html without rot.js) — pre-existing.
- dev/test/mortality.js 120 2: ok, no page errors.
- dev/test/night-day.js: ok:false on BOTH main and this branch (the 'steal' case: Tranh sủng closed in her cycle tuần since cycle-r3) — pre-existing, not caused here; flag to the night/cycle owner.
- dev/test/coop-e2e.js (live Worker): 59/59 passed, old save loads in solo.
- dev/test/palace-oldsave.js (main build save → this build): loads, no errors.
Files: dev/build/jbal.js, dev/build/jcycle.js, dev/measure/preg-bots.js, dev/test/preg-rate.js, dev/PROGRESS_preg-rate.md, index.html + sw.js rebuilt.
Context at end ≈ 9 % of the window (START_CTX ≈ 3 %); no rollover needed.
