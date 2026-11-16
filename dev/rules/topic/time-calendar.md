# time-calendar — verbatim owner rules

Holds: khắc, buổi, calendar, festivals, seasons (game rules).

Read only when your task touches this topic.

Format: [source:Lnn] = line in the source file (OD = dev/OWNER_DECISIONS.md on the docs branch); the text after the tag is the owner's line, copied unchanged by script. Every rule line lives in exactly ONE file under dev/rules/ (find a tag: grep -rn '\[OD:L123\]' dev/rules). CANON OVERWRITE (owner OD:L1232): when a rule changes, delete the old line and write the new one IN ITS PLACE in the same file; never keep the old one with a 'changed to' note. Headings '### OD:Lnn' are the OD section headings the lines sit under. Generated 11/16/2026 from dev/PRIORITY_RULES.md + dev/art/OWNER_ART_RULES.md (owner rule OD:L1241, low context).

### OD:L7 2026-11-14
[OD:L34] - ONE location ledger (S.roster): every living person in the palace has exactly one place + activity at every khắc; map, stage, spies, encounters, reports all read from it (never contradictory). Dev audit tool dev/tools/roster.js <save> [week buổi khắc] prints the full roster; owner can export a save (Chép sổ) and ask the main session who was where. (j95)
[OD:L68] - (18:40Z) Owner (room home): why is Đức red (stats in normal ink; red only for cost/risk, warnings as a small mark+tooltip); 'còn 4 khắc' → 4 round dots; place name text directly on the scene, no frame, one line; figure name labels without background, rank+name one line.
### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L414] - (11:30Z) DECISION REVERSED: KEEP the start-of-buổi news card (daily news matters; Tuần lục is only the weekly summary). Clearer name: "Tin trong cung hôm nay". Fix the Triều chính picture.
[OD:L419] - [ ] (11:50Z) Skill Nấu nướng: before playing it already shows BẠI, takes Sức −15, Bạc −6, all the buổi's khắc → the act ran twice (suspected tap-through). Rule: each tap runs once only; an unplayed game deducts nothing and gives no result (act-audit fixes + tests).
[OD:L484] - [ ] (16:40Z) Dư đồ: evening with 4 khắc left yet no Bái kiến button (afternoon with 1 khắc is correctly not enough). Bái kiến must show when there are enough khắc; if evening audiences aren't allowed the card must state why. Audit every act with khắc/buổi conditions.
### OD:L710 15/11 ~22:35Z — Calendar ideas all; art level-up scene; performance budget (owner)
[OD:L710] ## 15/11 ~22:35Z — Calendar ideas all; art level-up scene; performance budget (owner)
### OD:L740 15/11 ~22:55Z — Co-op pause + timer sync (owner)
[OD:L742] - When one player is in a minigame (or forced dialog), the other must wait — normal; the shared buổi timer pauses for both (with the cap).
### OD:L1108 16/11 (session 8) — Tutorial goal; frames can succeed; cycle book as Hành sự act + monthly popup; no duplicated content (owner)
[OD:L1111] - Owner: "nút lót tổng quản Kính sự phòng để được lật thẻ bài ... chỉ tốn khắc và tốn bạc ... Tại sao sổ nguyệt sự tôi phải đi tới Dư đồ? ... thì cái tab Hành sự để làm gì?" → RULE: acts that don't need to physically meet someone are Hành sự cards (cost khắc/bạc), e.g. "Xem sổ nguyệt sự" / "Xem lén sổ nguyệt sự" belong in Hành sự (the Kính sự phòng place can keep a shortcut). 
### HANDOVER.md
[HANDOVER.md:L90] - Hidden outcomes: in EVENT choices (weekly events j68, Mệnh truyện chapters j67, side events, dilemmas) show ONLY costs (Sức, khắc, bạc) — no long-term gains/losses (Sủng, Danh, Đức, favour…) and no odds word. The result card still shows the true numbers afterwards. Normal act buttons/cards keep full price + gain/loss + odds.
