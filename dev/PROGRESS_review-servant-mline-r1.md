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
