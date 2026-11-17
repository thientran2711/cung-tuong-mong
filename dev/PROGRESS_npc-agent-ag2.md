# PROGRESS npc-agent AG2 — the Emperor as an agent (review/npc-agent-ag2)

Base: review/npc-agent-r1-fix2 @2756d2d2 (AG1 PASS). Design: dev/handover/reports/npc-agent.md §3.2 / §5 row AG2. Report: dev/handover/reports/npc-agent-ag2.md (handover branch).

## Done
- `dev/build/jagemp.js` (new, after jagent): empSummon (BAL.ag.emp.summon 90 / 65 by his state: ill, Chăm chính sự, court crisis j55 tdCrisis),
  empPick (mindPick over the tray, weight nightCh × his memory S.emp.met), empCustom (mùng 1 / rằm duty vs his wish for the turned card),
  empSeat / empSeatPick (vacant Hoàng hậu seat by his duty), nightWhy words (empWhyTxt), her deed memory (runOpt wrapper), pillow deed (row 24).
- j8 flip core / vacant seat, j55 crisis roll muted while the loop is on, j75 custom + whyRows + nightWhy + npcEffort memory + NPC pillow choice,
  jcoopworld buildFriend carries her memory (emet), jtwoway BAL.tw.g.pillow, jbal2 BAL.ag.emp.
- Off switch: BAL.ag.on = 0 → old dice paths (checked).
- Tests: dev/test/agemp_check.js (20 checks). Bot add-on dev/measure/innight.js.

## Open / next
- 10-night ledger (review/night-ledger, not built): call empSummon() + empPick(C) once per night; by-day custom (OD 19:00Z: Empress off the tray,
  fixed day 1 / 15) belongs there.
- AG3: maids enter the pool through S.emp.met (empMet already takes any person with key()).
