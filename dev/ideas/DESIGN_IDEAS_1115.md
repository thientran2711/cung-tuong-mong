# Game-design ideas from other life-sim and relationship games (owner 15/11 20:05Z #15) — game-design worker, review/idea-design

Scope: these are techniques only. No assets, names or text from other games. Base: origin/main as of 15/11 (sparse read), OWNER_DECISIONS (handover branch), IDEAS_OPEN.md, the design files, and `git grep` over `dev/build/j*.js`.
Ranking = fun × fit (fit = matches the "one rule for everyone", "true causes, no bare dice", two-player co-op, and kit rules). Sizes: S ≤ 1 worker-day, M 2–4, L 5+.
Standing rules every idea follows: same rule for her and every NPC (two-way); every bạc price has a road of EQUAL value (owner 20:30Z); every choice card shows Cần/Tốn/Được/Mất plus an odds word (VANPHONG, no %); works in 2-player co-op from day one (owner 20:05Z); any new display must come from the kit — where a part is missing it is listed under **KIT REQUEST** (nothing here is built yet).
Not repeated here (already assigned in the 20:05Z batch): personality + trọng, the mood bar, Thái hậu thỉnh an fix, skimming of items, poisoning the Emperor/Thái hậu, Emperor visits, stolen clothes, girlhood chest, promotion rewards, header move, sound by group, event frames, the 13 animations, update notes. Section B gives ways to make those deeper.

## Quick ranking
| # | Idea | From | Exists? | Size |
|---|---|---|---|---|
| 1 | Kỷ niệm: people remember specific deeds and say so | Crusader Kings memories; Fire Emblem callbacks | partial (her notes only) | M |
| 2 | Witnessed scenes between two NPCs, she may step in | The Sims autonomy; CK3 AI event chains | partial (runs unseen) | M |
| 3 | One ledger of hooks: evidence + owed favours, spent like coin | CK3 hooks | partial (j78, j72 split) | M |
| 4 | Bond scenes in ranks with a perk per bond, and betrayal | Fire Emblem supports; otome affection routes | missing | M |
| 5 | Arch-rival of this life who learns her habits | CK3 rivals; palace mobile games | partial | M |
| 6 | Chí hướng: a life ambition she chooses and may change | CK3 ambitions; Princess Maker target endings | missing | M |
| 7 | First tuần with a mentor and five small goals | Stardew first week; otome tutorials | missing | M |
| 8 | Co-op Liên thủ: a joint scheme with a last-second betrayal | CK3 schemes; co-op social games | missing for players | M |
| 9 | Hồi ức: life-end montage of her biggest moments | CK3 life summary; The Sims memories | partial (one line) | S |
| 10 | Sổ sở thích: likes found by real discovery, never shown free | Stardew gift tastes | partial (notes) | S |
| 11 | Weekly wants and fears that feed the mood bar | The Sims 2 wants/fears | missing | S |
| 12 | Gallery of deaths and endings, each with a hint | Long Live the Queen | partial (rare endings count) | S |
| 13 | Rumours that change as they travel and can be traced | CK3 secrets; palace dramas | partial | M |
| 14 | A prophecy at the start of life that the world tries to fulfil | Long Live the Queen; CK3 | missing | M |
| 15 | Too much favour is dangerous: four-pillar pressure | Reigns | partial | S |
| 16 | Week planner: queue routine acts, events interrupt | Princess Maker schedule | missing | M |
| 17 | Co-op mật thư: each player learns different secrets | asymmetric co-op | missing | M |
| 18 | Co-op sworn sisters: paired endings for both players | co-op narrative games | missing | M |
| 19 | Parenting choices shape the child, the adult child remembers | CK3 childhood; Princess Maker | partial | M |
| 20 | Servants have their own lives and arcs | The Sims | partial | M |
| 21 | Stress: acting against her own nature costs her | CK3 stress | missing | M |
| 22 | Big annual events announced early with preparation goals | Stardew festivals | partial | S |
| 23 | Session-end teaser: one line of what next week holds | soap opera / episodic games | missing | S |
| 24 | Albums: flowers, pets, recipes, faces met (cosmetic) | Stardew collections; The Sims | missing | M |
| 25 | Year-end recap with a named year | Long Live the Queen; Sims legacy | missing | S |
| 26 | Streak and near-miss juice | Reigns, mobile games | partial | S |
| 27 | After a failure: "Vì sao hỏng?" in one line | Long Live the Queen learning loop | partial (before only) | S |
| 28 | Comeback arcs from the lowest points | otome / palace mobile games | partial | M |
| 29 | Co-op notes left at map places, and wagers | Stardew co-op; mobile games | missing | S |
| 30 | Legacy: next life in the same world, a descendant | CK3 dynasty; Sims legacy | missing | L |

## A. The ideas

### 1. Kỷ niệm — people remember specific deeds, and say so  (M)
- From: Crusader Kings (characters keep memories of events), Fire Emblem (later talks refer to earlier ones).
- Exists? Partial. `noteAdd` in j21 keeps up to 6 lines per person, but they are HER notes. NPC side is numbers only: Thiện cảm/Oán bars (j9), the nợ ân ledger (j72). Nobody ever says "ba năm trước ngươi đã…".
- Fit: every person keeps ≤5 kỷ niệm records about each person who mattered: {deed, week, sign, weight, witnesses}. Written by the acts that already exist (saved a child, slandered, gave a gift that was refused, stood by her at an accusation). Event text pulls the strongest one in ("Năm ấy ở hồ Thái Dịch ngươi đã kéo con ta lên"). Weight fades each year unless reinforced; a big betrayal never fades fully.
- Choice use: in a hard event she may "nhắc lại ân xưa" (invoke a good memory) instead of paying. That spends the memory (weight down), which is the equal-value road to a bạc bribe at her rank. A bad memory makes some options cost more with that person.
- Two-way: NPCs remember her and each other; NPC minds (j40) read it.
- Risk: text combinatorics in classical register (keep ~30 deed templates); save size (cap per person). KIT REQUEST: a one-line "memory" row in the person card (could reuse kitLine §42 if its owner agrees).

### 2. Witnessed scenes between two NPCs — she may step in  (M)
- From: The Sims (you see people interact on their own), CK3 (AI characters run event chains on each other).
- Exists? Partial. NPC→NPC plots, factions and joint schemes run (j70, j10 `jointScheme`, j40/j43 minds), but she only reads the result in the week book (j87). She never stands there while it happens.
- Fit: when two people with strong feeling (high Oán, Ghen, or a fresh alliance) are at the same map place in the same buổi as her (presence exists, j9/j38), a short scene: a quarrel, a slap, a whispered pact, a gift handed in secret. Options: side with A, side with B, make peace, slip away and remember (gives evidence j78), tell someone later. Each costs khắc; siding makes one friend and one enemy; peace uses her Đức/Tâm cơ odds.
- Two-way: an NPC can witness HER scenes the same way (already partly: seenNPC).
- Co-op: the friend can be one of the two people; the other player can be the witness.
- Risk: event spam (cap 1 per tuần, none during evBusy). Uses the existing event frame; no new kit part.

### 3. One ledger of hooks — evidence and owed favours, spent like coin  (M)
- From: CK3 hooks (a weak hook is spent once, a strong one can be used again).
- Exists? Partial and split: evidence objects (j78 `evA/evG`, used to accuse or threaten), nợ ân (j72, call in a favour), ân tình (jpoison). Three systems, three looks.
- Fit: one "Nắm thóp" ledger listing what she holds over whom: weak hook (a favour owed, a minor fault seen) = one use; strong hook (proof of a crime, a secret affair) = reusable but each use raises the target's Oán and the chance they destroy the proof or strike first. Uses: make them vote for her at tranh ghế (j34), drop an accusation, hand over an item, stay away from the Emperor one night.
- Equal value: a hook is the non-bạc road for bribes; using a strong hook costs future safety, roughly the worth of the bribe.
- Two-way: NPCs hold hooks on her and on each other; she can buy back or steal proof.
- Risk: hoarding as the best plan → hooks decay (witness dies, proof is found and burned, target rises in rank above it). KIT REQUEST: hook list rows (a kitRelTable §52 variant could carry it).

### 4. Bond scenes in ranks, a perk per bond, and betrayal  (M)
- From: Fire Emblem supports (C/B/A/S talks at thresholds), otome affection routes.
- Exists? Missing as a system. Aff −100..100 (j9) moves numbers; kết nghĩa appears only inside a few story arcs (j67, j97).
- Fit: with any consort, maid, eunuch, Thái y or official, at aff 30/55/80 a short bond scene unlocks (3 per pair, written by personality group, not per person). Each scene needs something real: a gift that matches taste, a shared risk, or keeping a secret. Reward per rank: Sơ giao → Thân tình (a small help each month) → Tâm phúc (one big help: a maid takes the blame once; a consort speaks for her at an accusation) → Kết nghĩa (sworn sisters: a joint act, shared fate in some endings).
- Betrayal: a bonded person can be bought or threatened by a rival; breaking a high bond is the biggest drama the game can make (memory weight max, #1).
- Co-op: the two players can bond the same way (see #18).
- Risk: content volume; keep 6 groups × 3 scenes. KIT REQUEST: bond rank mark on the person card.

### 5. The arch-rival of this life, who learns her habits  (M)
- From: CK3 rivals (a named rival with special rules), palace mobile games (one main antagonist per arc).
- Exists? Partial: every rival plots by the same rules (j70 chains, jtsb threats), but nobody is THE enemy, and no one adapts.
- Fit: once a consort's Oán+Ghen toward her crosses a mark, she becomes "Đối thủ" (the sim picks, no dice). The rival counts which defence she uses most (always tasting food, always guarding with a maid) and switches to the other road (poisoned sachet instead of food). Taunts quote memories (#1). The rival has a discoverable weakness (a secret, a lover, a sick mother) found by eavesdropping. Ending the rivalry: ruin her, make peace (rare, needs a bond scene), or outlive her.
- Two-way: an NPC can hold her as THE rival; NPC pairs can have rivals too (seen in #2 scenes).
- Risk: frustration if the rival reads her too well; the counter switches at most once a season and always gives a tell (j70 already has tells).

### 6. Chí hướng — a life ambition she picks and may change  (M)
- From: CK3 ambitions; Princess Maker (aiming at a chosen ending shapes every month).
- Exists? Missing. The story arc is set by origin (j67), rare endings by arc (j97); she never states what she wants this life.
- Fit: on the identity card (j52/j86) and again at any rank-up she picks one: Hậu vị (the throne), Chân tình (true love, may be outside the Emperor), Báo thù, Bình an (survive, leave the palace well), Quyền thế (rule through her son), Tài danh (art fame). Each gives a goal track of 4–5 steps shown in the Mệnh truyện tab (jtabs), small mood gains when steps are met, and gates a few endings. Changing costs a season of mood loss or Phúc duyên — the price of giving up.
- NPCs: every consort already has hidden aims in their minds; give them the same list so she can find a rival's ambition by dò la.
- Risk: overlap with arc goals; keep ambitions above arcs (an arc can serve any ambition). Uses the existing tab kit.

### 7. The first tuần with a mentor and five small goals  (M)
- From: Stardew Valley (a short first-week task list that teaches the loop), otome games (a guide character).
- Exists? Missing: `git grep "hướng dẫn"` over dev/build = 0. The game is deep (16 khắc a day, 6 stats, maps, items, schemes) and a new player starts cold.
- Fit: an old ma ma (or eunuch, by origin) gives, in character, five goals for the first tuần: greet the Hoàng hậu, learn one face, give one gift, practise one art, rest once. Each done goal gives a tiny real reward and a one-line tip. A second set unlocks at the first rank-up (schemes, evidence). Skippable at the title ("Đã quen việc cung"). Cung nữ start (j42) gets her own set.
- Risk: low; must not block. KIT REQUEST: goal checklist (could use the jtabs document style).

### 8. Co-op Liên thủ — a joint scheme with a last-second betrayal  (M)
- From: CK3 schemes with agents; social-deduction co-op games (commit, then reveal).
- Exists? NPC factions do joint schemes (j10 `jointScheme`); co-op players can only gift, harm or ask (jcoopworld). No plan two players run together.
- Fit: one player proposes a target and a plan; both commit khắc in the same buổi; odds rise with both stats (better than either alone). At the reveal each player secretly picks "Giữ lời" or "Bán đứng" (sell out: she takes the evidence to the Hoàng hậu for favour). Both keep → big win; one sells → the seller gains Danh, the other is caught; both sell → both are suspected.
- Equal value: the sell-out gain is set equal to the shared win, so it is a real temptation.
- Risk: griefing between friends → a betrayal writes a max-weight memory (#1) and the friend can answer with the same tools; a lobby option can turn betrayal off.

### 9. Hồi ức — the life-end montage  (S)
- From: CK3 lifetime summary; The Sims memory scrapbook.
- Exists? Partial: the life-end card (j32) and one line in the Sổ luân hồi.
- Fit: during the life the game marks big moments (first night, rank-ups, a child born, an enemy ruined, a near death, a festival won) with the event picture already shown. At death or ending, the book (kitBook j87 + page curl) plays 6–10 of them with one line each and her age, then the epitaph. Saved per life in the Sổ luân hồi so she can reread past lives.
- Risk: low; pictures already exist; storage = ids only.

### 10. Sổ sở thích — likes found only by real discovery  (S)
- From: Stardew Valley (gift tastes are learnt by trying and by hints).
- Exists? Partial: notes (j21); likes/dislikes/allergies and art sub-style tastes are now assigned (19:50Z, 20:15Z). This idea is how she LEARNS them.
- Fit: a page per person with unknown cells "?". Ways to fill a cell: a gift reaction (cost: the gift, maybe a refusal), watch them at a banquet (khắc), ask their maid (bạc or a favour hook #3), a bond scene (#4) reveals one free. Bạc and khắc roads priced equal by rank.
- Risk: none beyond UI. KIT REQUEST: taste grid cell (could be a kitInvGrid §33 variant).

### 11. Weekly wants and fears  (S) — deepens the 20:05Z mood bar
- From: The Sims 2 (wants and fears drive the mood and the aspiration).
- Exists? Missing.
- Fit: each tuần she (and every NPC) has 2 wants and 1 fear drawn from her real situation and personality ("muốn được khen tài đàn trước mặt Thái hậu", "sợ bị Hoàng hậu quở"). A met want lifts mood; a met fear drops it. NPC wants are hidden, found by dò la, and fulfilling an NPC's want is a strong non-bạc road to their favour.
- Risk: low. KIT REQUEST: want/fear chip.

### 12. Gallery of deaths and endings with hints  (S)
- From: Long Live the Queen (every death is a lesson; players collect them).
- Exists? Partial: rare endings counted "x/y" in localStorage `ctm-rare97` (j97 `r97Book`); deaths only in the life log.
- Fit: "Bách tử đồ": every death cause and ending kind as a tile, unknown ones show a riddle hint ("chén trà đêm Trung thu"). Cross-life, memory only — no power (the j52 rule).
- Risk: low.

### 13. Rumours that change as they travel  (M)
- From: CK3 secrets spreading; the palace-drama staple.
- Exists? Partial: much rumour content (j67, j68f, j42 "talk spreads"), but a rumour does not move person to person or mutate.
- Fit: a rumour is an object {true core, current version, source, carriers}. Each tuần it hops along relations (people who talk to each other); with each hop a mouth with low Đức may make it worse. She can start one (Tâm cơ act), kill one (find the source, bribe or hook the carriers), or trace one back to its source to gain evidence. Same for NPCs.
- Risk: performance on the weekly tick (cap 3 live rumours).

### 14. A prophecy at the start of life  (M)
- From: Long Live the Queen (foreshadowed dangers), CK3 (prophecy-style events).
- Exists? Missing as a life frame (tells exist for single plots in j70).
- Fit: on entering the palace a fortune-teller / old monk gives two vague lines bound to real seeded future events ("hoa sen nở thì máu rơi"). The world steers those events to happen; she can fight them (prepare, avoid the place, protect the person) or bend them to her favour. Learned meaning shown in the life-end Hồi ức (#9).
- Risk: seeding must survive save/load (j52 seed already exists).

### 15. Too much favour is dangerous — four pillars  (S)
- From: Reigns (each power is a bar; too low OR too high ends you).
- Exists? Partial: jealousy and Thái hậu mood exist; but maxing Sủng is always good.
- Fit: when Sủng is far above every rival for long, real causes kick in: rivals unite (faction j10), Thái hậu warns of "hồng nhan họa thủy", officials (j55) memorialise. She can cool it off: send the Emperor to another consort (gains Đức and an ally), refuse a night. Makes "share the favour" a real strategic choice.
- Risk: feels like punishment → always show the cause and a lever.

### 16. Week planner  (M)
- From: Princess Maker (plan the month, then watch it run with interruptions).
- Exists? Missing; every buổi is picked by hand. jmcal shows a month calendar.
- Fit: "Định lịch": queue routine acts for the coming days (practise, greet, rest); the game runs them and stops at any event, visit or danger. Saves taps on phones; risky acts can never be queued.
- Risk: missing things → each auto-day writes one line to the week book.

### 17. Co-op mật thư — each player learns different secrets  (M)
- From: asymmetric co-op design (each player holds part of the picture).
- Exists? Missing: jcoopworld shares the world, knowledge is personal (S.emp.known kept per player) but there is no way to pass knowledge.
- Fit: a "Mật thư" act sends one fact or one evidence copy to the friend (costs a trusted servant's trip; can be intercepted by a rival → the rival learns it too). Withholding is allowed; lying is allowed (a forged letter with Tâm cơ odds).
- Risk: low; uses the act relay.

### 18. Co-op sworn sisters and paired endings  (M)
- From: co-op narrative games; otome paired routes.
- Exists? Missing.
- Fit: bond ranks (#4) between the two players; at Kết nghĩa the pair unlocks paired endings (Hoàng hậu + Hoàng quý phi ruling the palace together; both leave the palace together; one dies to save the other). Breaking the bond writes a max memory and both lose mood.
- Risk: needs both alive; if one dies, the other gets a mourning arc instead.

### 19. Parenting choices shape the child; the adult child remembers  (M)
- From: CK3 childhood education; Princess Maker raising.
- Exists? Partial: child Văn/Võ/Đức from parents and teachers (j53), princess arts (j54), kids art (j73).
- Fit: 3–4 parenting dilemmas per child age band (strict vs gentle, which tutor, defend the child or obey Thái hậu). They set the child's personality group and trọng (the 20:05Z personality system) and write memories (#1). The grown prince/princess acts on them: loyal, cold, or turns on her.
- Risk: content; reuse template events.

### 20. Servants with their own lives  (M)
- From: The Sims (every sim has a life).
- Exists? Partial: traits (j29), trust (jtin), households (j10); but a maid never wants anything for herself.
- Fit: each servant has one personal thread: a sick mother outside, a sweetheart guard, a debt, a wish to be released at 25. She can help (bạc or a favour) → loyalty; ignore → the thread makes the servant buyable by a rival. NPC servants run the same.
- Risk: content; ~12 threads.

### 21. Stress from acting against her own nature  (M) — deepens 20:05Z personality
- From: CK3 stress.
- Exists? Missing.
- Fit: when she (or an NPC) does an act her personality hates (a kind one schemes, a proud one kneels), stress rises; at levels it breaks out: illness (j13), a public outburst, or a vice. Relief: acts that fit her nature, a confidant (#4). Makes personality more than a modifier.
- Risk: double-counting with the mood bar → stress is a slow store that pushes mood down, not a second bar on screen.

### 22. Big annual events announced early with preparation goals  (S)
- From: Stardew Valley (festivals on the calendar; you prepare).
- Exists? Partial: festivals (j31, j71), month calendar (jmcal), tuyển tú.
- Fit: big ones (Thái hậu's birthday, tuyển tú, autumn hunt) appear on the calendar a month ahead with a prep list (a gift, an art at grade X, an outfit). Preparing well gives a better start in the contest; rivals prepare too, and can sabotage prep.
- Risk: low.

### 23. Session-end teaser  (S)
- From: soap opera / episodic games.
- Exists? Missing.
- Fit: when she saves and leaves, the title shows one true line about something already seeded for next week ("Có kẻ đã mua chuộc nhà bếp cung ngươi…"). Pulls the player back; true info only (fog rules: only if her tai mắt would know).
- Risk: none.

### 24. Albums (cosmetic)  (M)
- From: Stardew collections; The Sims collections.
- Exists? Missing (`git grep album|sưu tập` = 0).
- Fit: cross-life albums for flowers seen per season (weather j12), pets kept (jpet 22 kinds), recipes learnt (jwkr), faces met (84 women pool), festivals attended. Rewards: frames or title-screen paintings only, never power.
- Risk: localStorage size; ids only. KIT REQUEST: album page (could use kitBookSpread).

### 25. Year-end recap with a named year  (S)
- From: Long Live the Queen (season summaries), Sims legacy notes.
- Exists? Missing (week summary j87 exists).
- Fit: at the year's turn a two-page spread: her rise or fall, who died, who was born, her best and worst deed, and a name for the year from what happened ("Năm của nước mắt", "Năm phượng bay"). Feeds Hồi ức (#9).
- Risk: none.

### 26. Streak and near-miss juice  (S)
- From: Reigns/mobile games (streaks, close calls felt).
- Exists? Partial: jfx, j93 motion, kitNumDelta (§57 reserved).
- Fit: three good acts in a row → a small "thuận buồm" glow and +1 mood; a failure that was close shows "Suýt nữa…" with a short shake (no number). Works for NPC shows too.
- Risk: none; KIT §54 game-feel owner.

### 27. After a failure: "Vì sao hỏng?"  (S)
- From: Long Live the Queen learning loop.
- Exists? Partial: jwhy explains the odds word BEFORE the act.
- Fit: the result card adds one line naming the biggest true factor ("Hoàng hậu đang giận, lời ngươi không lọt tai"). Teaches without tutorials.
- Risk: none.

### 28. Comeback arcs from the lowest points  (M)
- From: palace mobile games (fall then rise is the best story beat).
- Exists? Partial: Lãnh cung is playable (j14).
- Fit: in cold palace, demotion or disfigurement (j70), unlock 2–3 comeback threads with real causes: an old bond remembers her (#1), the Emperor falls ill and only she knows a cure, a buried evidence surfaces. Harder than normal, never free.
- Risk: making the fall too soft.

### 29. Co-op notes at map places, and wagers  (S)
- From: Stardew co-op; asynchronous mobile hooks.
- Exists? Missing.
- Fit: leave a short note (from a list of classical lines) at a map place; the friend sees it there. Wager bạc or an item on the friend's contest result (j71 has cược for NPCs).
- Risk: low.

### 30. Legacy: the next life in the same world  (L)
- From: CK3 dynasty play; Sims legacy challenge.
- Exists? Missing; each life is a new world (j52).
- Fit: optional "Hậu duệ": if her daughter or a niece survives, the next life may start as her descendant entering the palace 20 years on; old NPCs (now Thái phi) remember the grandmother (#1). Story and faces only, no stat carry-over (j52 rule).
- Risk: large state carry-over and art age bands (ART rule: all 4 bands already exist for consorts).

## B. Making the 20:05Z items deeper
- #1 Thái hậu affection: diminishing gain per repeated thỉnh an (same as the gift-boredom rule); add "Thái hậu's tests" — she sets a duty (copy sutras, manage the birthday banquet) and judges it by her trọng; failing costs more than greeting gains.
- #2 Personality + trọng: reveal personality by fog (find it like tastes, #10); let traits SHIFT from life events (a betrayal makes "đa nghi"), same for NPCs; add stress (#21).
- #3 Mood bar: named mood causes with timers ("Được khen ở yến · 2 tuần") like Sims moodlets; mood spreads to people nearby (a crying maid saddens the room); wants/fears (#11) as the main input.
- #6 Emperor visits: give a short warning (a eunuch runs ahead) and a prep choice (incense, his liked dish, a piece he likes) read from his tastes; a rival can spoil it; the next morning gossip is a rumour object (#13).
- #9 Promotion rewards: one random extra in the chest with the grade reveal (jkrev §54.1) so each rank-up has a small surprise; the new servant arrives with a personal thread (#20).
- #13 Animations: the red-thread alliance/betrayal animation is the natural picture for bonds (#4) and co-op Liên thủ (#8).
- #14 Update notes: write them as "Tin mới trong cung" in character, still one line per change.
- #11 Sound by group: a short sting when a memory is invoked (#1) and when the arch-rival appears (#5).
- #7 Stolen clothes: the thief should be a real person she can trace (rumour #13, evidence j78) and remember (#1).

## C. KIT REQUESTS (if adopted)
1. Memory row on the person card (#1). 2. Hook list rows (#3, maybe a kitRelTable §52 variant). 3. Bond rank mark (#4, #18). 4. Goal checklist (#6, #7). 5. Taste grid cell (#10). 6. Want/fear chip (#11). 7. Album page (#24). Everything else reuses kitBook, event frames, tabs, kitEvBanner, odds chips.

## D. Suggested order
Batch 1 (foundation, most other ideas read it): #1 memories, #3 one hook ledger, #11 wants/fears, #27 failure line. Batch 2 (drama): #2 witnessed scenes, #4 bonds, #5 arch-rival, #13 rumours. Batch 3 (direction + onboarding): #6, #7, #16, #22. Co-op set (#8, #17, #18, #29) can run in parallel since the owner requires co-op for every feature. Cosmetic set (#9, #12, #24, #25) any time.
