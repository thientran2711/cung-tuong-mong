# PROGRESS review/npc-roads (Foreman D lead worker, NPC ROADS)
Base: review/road-map-next 33b8789a (Foreman B engine: jroad.js, jrd_tt.js, BAL.road). Never patch jroad.js; engine needs → report §8 + ROAD_MAP §8.5.
Plan: dev/handover/reports/npc-roads.md (docs branch claude/cung-tuong-mong-handover-hj0h8w).
## Units
- [x] U0 core dev/build/jnroad.js (p.nr state, origin/road roll, monthly off-screen chapter, help hồi = j72 follow-up, news) + BAL.nroad (jbal2.js)
- [x] U1 consorts (36 women roads, read ROAD14/ARC67) — tested (npc-roads 38/38 with B data, saves 5/5)
- [ ] U2 maids (cnv roads; raised maid → cn)
- [ ] U3 men (~20 templates, ROAD_MAP §4.10 first)
- [ ] U4 tests (dev/test/npc-roads.js long sims, old saves, vp/kit scans, ON/OFF bots), dev/measure/npc-road-scan.js
## Log
- 16/11 ~18:30Z STEP 1 plan pushed.
- 16/11 ~19:30Z U0+U1 built: dev/build/jnroad.js (after jreign.js in assemble.py), BAL.nroad (jbal2.js), tests dev/test/npc-roads.js + npc-roads-saves.js.
  Test build with B's data: temporary local branch tmp/npcr-full (= review/npc-roads + road-b1 + road-b2 + road-b3, NOT pushed; worktree /home/user/wt/npcrt).
  On review/npc-roads alone only tt has .5–.11, so other NPC roads close after .4 until B lands its roads (by design: chapters read at run time).
- 16/11 ~21:00Z U0+U1 SẴN SÀNG KIỂM. Successor: U2 maids, U3 men (design in reports/npc-roads.md 'NEXT').
