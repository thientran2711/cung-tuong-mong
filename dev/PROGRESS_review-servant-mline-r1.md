# PROGRESS review/servant-mline-r1 (reviewer, Foreman D) — servant-system PART C only (active NPC maid line)

Base: origin/main bad941b4 + merge of review/servant-system-r1 (part A, PASSed, e82a9bcf79) + cherry-pick of 27219c13 (part C: jmline.js, BAL.mline, j14 eye hook, assemble entry, measures). No part B code.

## Reviewer fixes made on this branch (no number changed)
1. ONE CORE: every literal left in jmline.js moved to BAL.mline with the SAME value: seekTr (nết multipliers), feudFrame 50, fightLoy 2, poisonLv 1, evN 1, hitBribeBac 60, hitBribe 40, hitBeat 55, beatLoy 3, ageDef 20, offRank 2 / offEye 1.2 (old rule behind the off switch, also j14's fallback). Scan: jmline.js holds no number other than 0/1/100 clamps and counters.
2. Text prints the constant: "(lòng +3)" -> "(thiện cảm +${B.beatLoy})" (VANPHONG row 51: servant -> mistress = thiện cảm, "Lòng" is the wrong word).
3. VANPHONG row 34: "trong mục Cung nhân" -> "ở Hậu cung › Cung nhân" (2 places).
4. Co-op: jcoopworld mutes only rivalsTurn/rivalsMonth/festival on the guest; servMonth (and so mlMonth) and servRanks (so mlEye) ran on BOTH clients -> NPC maid events/rises rolled twice and diverged. Added mlGuest(): on the guest, mlMonth only rolls her own maids' seeking, mlEye returns false for NPC masters (the host decides NPC maid rises).

## Measures (dev/measure/sim_maidline_r1.js; she does nothing and is kept alive)
See dev/handover/reports/review-servant-mline-r1.md for the table.

## Resume
Worker: fix the FAIL list in the report on top of this branch (git checkout review/servant-mline-r1).

## Results (07:50–08:30Z)
- Sim (dev/measure/sim_maidline_r1.js; 5 lives on = 1380 months, 2 lives off = 720 months): rises 4–12 per 25–30 years (old rule 10–11); eye hits 34–64 but the consort face pool is full in 70–85 % of months, so most hits are wasted; her maids (3 hired) targeted 3× / 25 y at Tai mắt 0, 11× at Tai mắt 3; her Sổ ghi lines from the maid line: 10 / 300 months at Tai mắt 0, 150 / 300 months (max 3 a month) at Tai mắt 3 — no flood. SEATCAP over-cap months seen at ranks 3/5/6 in BOTH on and off runs -> pre-existing, not part C (maid rises enter rank 0, uncapped). 0 page errors.
- Off switch: __mloff=1 leaves only eyeTry/eyeHit/rose counters (old rule) — works.
- Old save (dev/test/mline-oldsave.js): save made on main bad941b4, loaded here, 24 months with the maid line, 0 errors.
- Co-op e2e (dev/test/coop-e2e.js, live Worker): 59 ok, 0 FAIL.
- Screens (dev/test/mline-shots.js; forced month with every event kind, Sổ ghi): 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844 (rotate prompt) — kit log row, "ta" on screen, no %, no overflow, 0 errors.
- Verdict FAIL (see dev/handover/reports/review-servant-mline-r1.md).
