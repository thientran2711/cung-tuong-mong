# coop — verbatim owner rules

Holds: co-op / playing with a friend.

Read only when your task touches this topic.

Format: [source:Lnn] = line in the source file (OD = dev/OWNER_DECISIONS.md on the docs branch); the text after the tag is the owner's line, copied unchanged by script. Every rule line lives in exactly ONE file under dev/rules/ (find a tag: grep -rn '\[OD:L123\]' dev/rules). CANON OVERWRITE (owner OD:L1232): when a rule changes, delete the old line and write the new one IN ITS PLACE in the same file; never keep the old one with a 'changed to' note. Headings '### OD:Lnn' are the OD section headings the lines sit under. Generated 11/16/2026 from dev/PRIORITY_RULES.md + dev/art/OWNER_ART_RULES.md (owner rule OD:L1241, low context).

### OD:L7 2026-11-14
[OD:L96] - (20:30Z) CO-OP rule (owner): ONE shared world state — every fact (who hates whom, ranks, favour, rumours, deaths, events, ledger) is identical for both players; personal story-arc events stay per player but their effects land in the shared world and affect each other. What each player KNOWS may differ (fog of knowledge: spies, 'chưa rõ'), but the underlying truth is one. Implementation: one authoritative world state (host/server), both clients render from it; player-specific data = only her knowledge + her story progress.
[OD:L222] - (03:10Z) Owner worried about reloads mid-play. Coordinator: never auto-reload mid-play; only a 'Có bản mới' chip (tap: Mở bản mới / Để sau); auto-apply at Qua buổi / reopening the app after a long time; after reload AUTOMATICALLY re-enter the same life at the same spot; co-op doesn't drop. Assigned review/update-flow.
### OD:L588 15/11 ~20:05Z — Big owner batch (recorded by session 6, assigned by session 7)
[OD:L594] - Co-op: helping/harming/stealing a friend's pet must be wired NOW. RULE: every feature must work in 2-player co-op; no "later".
### OD:L624 15/11 ~20:20Z — Thái y: build all 4 ideas (owner)
[OD:L629] All must work in co-op.
### OD:L888 15/11 (session 8) — Owner rulings: stage glow only for HER; stat glow green; buổi transition approved (owner)
[OD:L890]   → RULE (overrides the earlier "rank halo for everyone" entry): on the stage, ONLY HER tag (rank line + name line) has the light glow/halo — that is how the player tells herself apart. Every other person's stage tag has NO glow (plain rank colour + name, still readable). Applies to co-op: each player sees only her own tag glowing (the friend's tag plain).
### OD:L1028 16/11 (session 8) — Lost after picking a character: no main goal shown (owner)
[OD:L1042] - (session 8) Owner (verbatim): "Hồi nãy tôi bấm cái gì á mà từ cái hình thứ hai, cái khung ở phía trên ... chuyển qua hình thứ nhất, nó không có giữ cố định một chỗ là làm sao?" Screens dev/handover/refs/owner-header-jump-1/-2.jpg (iPad landscape: top bar flips between 1-row and 2-row layout, side column 1↔2 columns, when a dialog opens/closes). RULE: layout per viewport is fixed (stable breakpoint + hysteresis), never flips on content change → review/stage-side scope. Also seen: 'Đợi hảo hữu trở lại — Hảo hữu đã rời cuộc' (friend disconnected) during the stuck buổi → coop-timer-r1.
### OD:L1044 16/11 (session 8) — Separate save slots for solo and co-op (owner)
[OD:L1047] - RULE: two separate lists — solo ≥3 slots, co-op ≥3 rooms (each remembers ám hiệu, friend, her character); co-op never writes into solo slots; menu shows both with name/rank/age/date; try to recover overwritten solo saves. → worker review/save-slots (HIGH; waiting for a free slot — act-text asked to wrap up).
