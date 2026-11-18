# PROGRESS — npc-death (D4, orphan audit #18) · Foreman D
- 16/11 13:40Z DONE → SẴN SÀNG KIỂM 84b184c47d2168c05f969c191a9a8dc827e3fcc6 on review/npc-death (base main b85cdb1e).
- Scope: every NPC death retires the dead's portrait/figure/name (new person in the post, never the dead's picture); her maid / court officers replaced with fresh names, their quests end; Phế phi họ Lý is a world person with a lifespan, stays beside fallen rivals in Trường Môn viện, the place is empty after her death; rgl_ly3 no longer frees her (OD:L641).
- Tests: npc-death 11/11, mortality OK, mortality-ui ALL PASS, coop-e2e 59/59. Bots before/after + ART NEEDED + 2 questions: dev/handover/reports/npc-death.md.

## Review r1 (16/11)
PASS 5f58a7156533afda959e0c591d9e64e66cbea142 on review/npc-death-r1 (merged onto main 0ee35a63; fixes: dead men keep faces, Lý given-name clash "???" fixed + old-save repair, Lý age fallback from BAL). Report: dev/handover/reports/npc-death-r1.md
