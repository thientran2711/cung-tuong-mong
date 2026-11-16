# systems-other — verbatim owner rules

Holds: other game systems (items rules, map, sound, stat logs, minigame limits).

Read only when your task touches this topic.

Format: [source:Lnn] = line in the source file (OD = dev/OWNER_DECISIONS.md on the docs branch); the text after the tag is the owner's line, copied unchanged by script. Every rule line lives in exactly ONE file under dev/rules/ (find a tag: grep -rn '\[OD:L123\]' dev/rules). CANON OVERWRITE (owner OD:L1232): when a rule changes, delete the old line and write the new one IN ITS PLACE in the same file; never keep the old one with a 'changed to' note. Headings '### OD:Lnn' are the OD section headings the lines sit under. Generated 11/16/2026 from dev/PRIORITY_RULES.md + dev/art/OWNER_ART_RULES.md (owner rule OD:L1241, low context).

### OD:L7 2026-11-14
[OD:L36] - Before release, the record (j95) must pass a bot audit (30+ lives × 2 years, smart+random bots, all origins; invariants: headcount, one place each, map/stage/spies match, motive gate 0 contradictions, deaths removed, save/load stable) + an independent re-check. Report dev/test/ROSTER_AUDIT.md must be clean.
[OD:L91] - (19:30Z) Owner: items are never free/automatic — must be obtained by crafting, buying or gifts (e.g. the face veil after hủy dung: craft, buy, or be gifted; until then scars show). Same for NPCs. Audit all free grants (review/items-earned).
[OD:L187] - (08:10Z) Owner: don't show the rank luxury allowance — only item 'Xa xỉ N' and the worn total; player learns limits from consequences.
[OD:L188] - (08:20Z) Owner: men's intrusions must not be luck — plan-driven (scheduled meetings/shifts in world state); she sees it only if she is really there at that time; recognition by stats; tai mắt can tip her off in advance.
[OD:L199] - (10:05Z) Owner: poison/heavy-harm minigame should be abstract, not explicit → 'Thời cơ' timing/attention game (no method detail).
[OD:L258] - (06:20Z) Owner: 'Sửa luật cho đúng một nguồn luôn, xong báo tôi' → review/rules-one-source first priority of the act-audit worker.
### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L377] - (08:45Z) Sound: every game moment needs sound (buy, sell, receive gift/reward/grant, open chest, confiscation, minigames, weather, ceremonies…), gentle court style; inventory + fill gaps (review/sfx).
[OD:L454] - (13:25Z) The gift-return event (Khương Lạc Anh) plays a senseless laugh → sound follows the event's meaning. Event choice buttons lack Được/Mất → audit ALL events, every choice must have Cần/Tốn/Được/Mất + certainty level + Vì sao; remove "TỐN không".
### OD:L693 15/11 ~21:50Z — Sub-styles: always 4; also Công Dung Ngôn Hạnh (owner)
[OD:L695] - EVERY art / work kind must have exactly 4 sub-styles (recipes branch has some with 3 → add a 4th).
[OD:L696] - Công · Dung · Ngôn · Hạnh (j85) must ALSO have 4 sub-styles each, learnt and valued the same way (tastes/trọng, teachers, level-up unlocks).
### OD:L888 15/11 (session 8) — Owner rulings: stage glow only for HER; stat glow green; buổi transition approved (owner)
[OD:L891] - Owner (verbatim): "Tới ô Danh thì ô đó phát sáng: vàng nếu cộng, không phải, xanh lá chứ." → stat-fx: + glows GREEN (− glows dim red), not gold.
### OD:L918 15/11 (session 8) — Sổ ghi numbers don't match the header (owner screenshot)
[OD:L921] - Rule: every stat/relation change is logged with its reason; the log's "X → Y" chain for each stat replays exactly to the header value; same-moment changes in applied order. Whole family audit of unlogged stat changes. → worker review/log-sync (spawned).
### OD:L977 15/11 (session 8) — Grey bar under chips; one act-card size (owner screenshots)
[OD:L978] - Owner (verbatim): "Có thanh gì màu xám nè." Screenshot dev/handover/refs/owner-grey-bar-chips.jpg (Tư trang › Túi đồ category chips: a grey bar (scroll indicator/track) runs under/through the chip row). → same family as the stray bar on Hành sự chips → review/tab-underline (C39): no visible scroll track/indicator lines across chip rows anywhere; use edge fade + overflow hint instead.
### HANDOVER.md
[HANDOVER.md:L47] - People come to her (visits, gifts, summons) as well as she to them. Four ways to meet: wander the map, visit her palace, scout then go, invite.
[HANDOVER.md:L54] - Seasonal UI theme; festivals; emotion voice sounds (Giọng slider).
