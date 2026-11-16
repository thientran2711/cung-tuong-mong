# OWNER ART RULES — INDEX (the rules themselves live in dev/rules/)

Owner rule OD:L1241 (low context): every session starts small. Do NOT read the whole canon. Read your role's START set in full, then ONLY the topic files your task touches. Every owner line is kept verbatim with its [source:Lnn] tag, in exactly ONE file under dev/rules/ (find a tag: grep -rn '\[OD:L123\]' dev/rules). Canon overwrite (OD:L1232) applies inside those files: old line deleted, new line written in its place.

## Start sets (read in full at start)

- Main chat: dev/rules/START_CORE.md + dev/rules/START_FOREMAN.md + dev/rules/START_MAIN.md
- Foreman: dev/rules/START_CORE.md + dev/rules/START_FOREMAN.md
- Worker: dev/rules/START_CORE.md + dev/rules/START_WORKER.md
- Reviewer: dev/rules/START_CORE.md + dev/rules/START_WORKER.md + dev/rules/START_REVIEWER.md
- Art work (incl. main making samples): dev/rules/START_CORE.md + dev/rules/START_WORKER.md + dev/rules/START_ART.md

## Start files

- dev/rules/START_ART.md (13.2 KB): any art work, incl. the main chat making samples (tools, Magnific, CDN, sizes, samples vs mass production, style anchor)
- dev/rules/START_CORE.md (11.6 KB): binding laws for EVERY role (kit first, fix the whole group, priority rule #1, canon overwrite, verbatim rules, low context, devices)
- dev/rules/START_FOREMAN.md (6.8 KB): main chat + foremen (sessions, claims, rollover, models, agent caps, work sizing)
- dev/rules/START_MAIN.md (6.8 KB): main chat only (what the main chat does itself, how it talks to the owner)
- dev/rules/START_REVIEWER.md (2.9 KB): reviewers only
- dev/rules/START_WORKER.md (10.7 KB): every worker and reviewer (worker brief + preamble lines)

## Topic files (read only when the task touches the topic)

- dev/rules/topic/art-animations.md (14.1 KB): animations, page curl, effects, glow, sprites, videos
- dev/rules/topic/art-costumes.md (15.7 KB): costumes, hair, jewellery, veils, makeup, huadian, foreign costumes
- dev/rules/topic/art-events-effects.md (26.3 KB): event, story, act and minigame pictures
- dev/rules/topic/art-faces-figures.md (22.1 KB): faces, figures, portraits, ages, poses, proportions
- dev/rules/topic/art-frames-kit.md (8.8 KB): frames, ornaments, kit art
- dev/rules/topic/art-items-pets.md (8.7 KB): item icons, gift art, pets
- dev/rules/topic/art-other.md (18.4 KB): other art rules
- dev/rules/topic/art-scenes.md (18.2 KB): rooms, backdrops, map art, seasons and time-of-day art
- dev/rules/topic/balance-economy.md (21.7 KB): gain and loss, bạc, prices, odds, difficulty, promotion, rewards
- dev/rules/topic/coop.md (3.6 KB): co-op / playing with a friend
- dev/rules/topic/handover-restatements.md (68.4 KB): owner rules as restated in handover/foreman/queue/ledger files (OD lines win where they differ)
- dev/rules/topic/kit-ui.md (20.3 KB): shared kit, layout, panels, cards, tabs, dialogs, Fold/iPad screens
- dev/rules/topic/people-life.md (5.8 KB): NPC behaviour, personality, servants, children, death, pregnancy, nights
- dev/rules/topic/process-history.md (12.1 KB): older process rulings and session history (main chat reads when needed)
- dev/rules/topic/story-roads.md (10.9 KB): main/side stories, chapters, roads, origins, endings, tutorial
- dev/rules/topic/systems-other.md (4.4 KB): other game systems (items rules, map, sound, stat logs, minigame limits)
- dev/rules/topic/time-calendar.md (3.7 KB): khắc, buổi, calendar, festivals, seasons (game rules)
- dev/rules/topic/wording.md (8.3 KB): player-visible words, VANPHONG, no %, names of acts

Before 11/16/2026 this file held all lines itself (~192 KB); split by script with 0 lines lost, 0 duplicated, 0 text changes (report: dev/handover/reports/canon-pairs.md).
