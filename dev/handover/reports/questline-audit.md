# REPORT E2 questline-audit (opus, design only) — SẴN SÀNG KIỂM b42a7c70
PRIORITY #1 CHECK ('side quest|phụ tuyến|tuyến nhiệm vụ|questline|npc road'): OD 15 | ledger 1 | claims 4 | main 15 | review/* 0 | archive 27
START_CTX ~8 % (estimate); finished at ~20 %, no rollover needed.
Deliverable: dev/design/QUESTLINES_AUDIT.md on review/questline-audit b42a7c70 (base origin/main 94a93759). No game code, no shots (doc only), no tests needed.

## Findings (short)
- LIVE on main: NPC roads for women + men (jnroad.js / jnroadm.js / BAL.nroad; one help hồi per life, chapter rolled per life), Emperor side story + 6 Tâm nguyện lines (jreign), j72 Việc nhờ 108 templates, tutorial quests (jtq14) + goal card (jgoal), Chính/Phụ tuyến labels (jstory).
- Branches: review/quests 3c5a194f STALE (superseded by main's j72); review/tut-quests 36e7b0e6 + -r1 66f598de MERGED; npc-roads*/reign-road* older than main (stale); review/npc-chain-land b620b051 holds jagday (OD:L1601 (1) answered by L1592) + jagwhy npcTell (reused by Q2/Q3).
- GAPS: G1 help hồi = 8 generic stock cards (not the NPC chapter's story; «bạc» kind = the "xin bạc" she rejected); G2 no visible side-line list; G3 her own 173 «Nhờ …» options ignore the helper's traits/tâm cơ/liking (L1601 (5) MISSING); G4 betrayal one-way, no reward tied to NPC road end; G5 NPC grand endings = GE §2.9 (E1 line, not duplicated); G6 stale docs (ROAD_MAP.md:20 "NPC roads 0 done", GE §1.5, ROAD_MAP §4.10 men templates never written).
- PLAN: Q0 docs fix (sonnet SMALL) · H1 history/drama/game expert (OD:L1327) · Q1a/b/c help-hồi content per chapter in new jnrask.js (opus BIG ×3) · Q2 help record v.nr.hp + finale reward BAL.nroad.fin + strike-back via npcTell BAL.nroad.sb + «Phụ tuyến» kitSkillCard list (opus BIG; after npc-chain-land lands) · Q3 helpers in her road BAL.road.hp, tags in Foreman B's road files (FOR MAIN; owner D-Q1) · Q4 = GE §7 step 5 reading Q2's hooks.
- KIT REQUEST: none now; K-Q1 (helper line on option card) only if §6.2/§6.3 do not fit at Q3 start.
- OWNER DECISIONS (rec first): D-Q1 4 helper answers (hết lòng/qua loa/từ chối/phá ngầm-mách lẻo) · D-Q2 drop «bạc» help kind · D-Q3 keep house table for NPC identity, fix GE §2.9 wording. Only Q3 waits on D-Q1.
- Note: the s32 "Lượt 9" answers are chat-only (no file found); OD:L1608/L1613 used.
