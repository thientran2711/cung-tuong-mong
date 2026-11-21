# GAP LIST v2 — designed/ruled items NOT built, half built, or broken on LIVE main
PRIORITY #1 CHECK: no central gap list existed (PARKING_LOT 22 lines, SESSION8_QUEUE old) | main 377d5ce3 (dev/build/j*.js + BAL) | review/* 1458 branches matched BY NAME only (not fetched) | claims gap-audit session_01Rc5AsLymU7eumr5TcMGb2s (MAIN ROOT-75)

**SUMMARY (v2, 20/11 ~09:05Z):** 90 rows: 41 missing, 37 half, 12 broken.
By type: UI 33 · rules-numbers 29 · art 16 · content 12. By size: S 33 · M 42 · L 15.
By suggested owner: MAIN UI 26 · B build 22 · C art 16 · E roads 13 · D rules 13. 52 rows already have a matching review/* branch (state unknown: merged-pending, failed or stale). 38 rows have no branch.
v2: 23 branch rows in LAND FIRST below — about 25 gap rows close by landing/reviewing work that already exists (PASS: mg-noword-b, mg-score-same, mg-env, coop-thin-f5, ge-writers-w3; waiting a reviewer: night-final, night-ledger, day-khac-audit, looks-2, mg-allkinds). Do those before opening new workers.
Biggest holes: mini-game fairness/identity numbers + no-word group b + back button (A); final night rule + 10-night ledger (B, KP01); 11 grand-ending branches + foreign-princess roads + NPC grand-ending parity (D); outside-route home chapters (C); ~20 open kit requests (H).
About 345 checked items are DONE on live and are not listed (e.g. MEN_PLAN, MOTION, poison road jpq, demotion confiscation jdemo, calendar, cycle, titles, NPC roads).

How it was made: 8 read-only audit passes, one per design source, each with file:line evidence on LIVE 377d5ce3 (or "no hit for grep" after ≥2 patterns). Conflicting findings between passes were checked by hand (jdemo = done, jpq = done, so neither is listed). Rows marked "(verify)" or "not browser-checked" need a look before work starts. Review-branch column = name match only; check the branch before reusing it (PRIORITY #1).
Sources: MINIGAMES.md, ITEMS.md, ITEMS_EARNED.md, EMOTION_PLAN.md, MEN_PLAN.md, MOTION.md, RARE_ENDINGS.md, design/GRAND_ENDINGS.md, OUTSIDE_PLAN.md, ECONOMY.md, STORY_ROADS_PLAN.md, EVENTS/INTRIGUE/MERIT_PROGRESS, 72 PROGRESS_*.md open sections, dev/kit/KIT_REQUESTS.md, OWNER_DECISIONS.md L1–2049, OWNER_LEDGER.md. OD line numbers = handover-branch OWNER_DECISIONS.md.
Not countable from git (CDN art backlog): see KP23.

## LAND FIRST — rows a finished branch already closes (v2: from reports/*.md + CLAIMS; sha = last verdict seen, re-check on origin before landing)
| branch | verdict seen | closes rows | note |
|---|---|---|---|
| review/mg-noword-b-rv | PASS 790818cd (rv-mg-noword-b.md) | MG03 (group b part) | mg-noword-kit still RUNNING for the kit half |
| review/mg-score-same-rv | PASS 10f1dc0e (rv-mg-score-same.md) | MG08 | then review/kit-mark PASS 5e8c7ad0 (re-run its chip assert after) |
| review/mg-env-rv | PASS 6c45e65b (rv-mg-env.md) | MG02 | |
| review/mg-fair-hands | PASS 3fe8727 **HOLD** (rv-mg-fair-hands.md) | MG15, MG16 | held until owner calibration + ratio OK; review/mg-fair-ratio review running (c214eadd) |
| review/coop-thin-f5 | PASS 9b46e1ad (coop-thin-f5.md) | OD04 (F5 part) | F6/G/H still to come (coop-thin-g RUNNING) |
| review/ge-writers-w3 | PASS r3 b79930bf, re-merged LIVE 0de74d9e (CLAIMS) | GE01 | check it covers all 11 missing branches |
| review/names-unique-r1 | PASS dcb2ea96 (16/11, never landed; stale base c1e1bbd1) | OD06 | needs re-merge on LIVE + re-test |
| review/reign-road-r1 | PASS 0a311183 | (template 1 only; OR18 stays open for 3 templates) | check if already live (jreign.js is live) |
| review/person-minigame-acts-c | APPROVED with answers 3c1b9c8f (FOREMAN E status) | MG13 (+ part of MG14) | round C running |
| review/night-final | SẴN SÀNG KIỂM f7c54202 (night-final.md) | OD01 (+ OD02?) | needs reviewer |
| review/night-ledger | SẴN SÀNG KIỂM 55141158 (night-ledger.md) | KP01 | needs reviewer; NPC Ân drift flagged → balance pass |
| review/day-khac-audit | SẴN SÀNG KIỂM 9e7ddc14 | OD07 | needs reviewer |
| review/looks-2-2 | SẴN SÀNG KIỂM cfd4a681 (looks-2.md) | KP09 (check: body-fit box) | needs reviewer |
| review/tut-followups | SẴN SÀNG KIỂM aa391edf (base tut-quests-r1 PASS, not on main) | OR15 (partly) | stale base, re-merge |
| review/mg-play2 | ready 209f34df, review running | MG05, MG06 | |
| review/mg-allkinds | worker tests PASS 7/7 @5b07ad6e | MG11 | needs reviewer |
| review/bd-roads (+ -w2) | worker tests PASS, RUNNING | GE02 (KP04 seal not covered) | |
| review/kit-option-rows | part 1 ready 3dabd1f7 | KP21 (part) | successor for part 2 |
| review/presentation-wiring | PARTIAL (origin frames / entry animation NOT done, art request) | AP01, KP07 | not a fix for those rows |
| review/item-big | PARTIAL, blocked on KIT REQUEST | IT01 | |
| review/balance-core | core gate FAIL (jgrey.js) | OD05 | fix gate then review |
| review/hoa-dien-art | art READY waiting Foreman C OK | IT04, MG05 (anchors) | |
| review/foreign-princess-samples | samples only, generation paused | — | art only |
Rows not in this table have no finished branch: they need a new worker.

## A. Mini-games (MINIGAMES.md + OD L1978–2049)

| id | item (short) | source | state | evidence | size | type | already on review/<branch>? | suggested owner |
|---|---|---|---|---|---|---|---|---|
| MG01 | ✕ / «Quay lại» back button on every mini-game screen (before Sẵn sàng = back; in play = give up; Thử tay = kind list) | OD:L1995 | missing | kg82Frame (j82.js:103-106) + kitGameFrame (j79.js:531-535) have no close/back; no 'Quay lại\|mg-back' in j82/j79/jmgcal; only mgcal-x on Thử tay result (jmgcal.js:53) | S | UI | review/mg-back (r2 FAIL, fix pending) | MAIN UI |
| MG02 | Chải chuốt shows no green zone from Thử tay; default every env field only one caller passes, all engines | OD:L2015 | broken | j92.js:441 const w=env.zw no default; KG82_ENG.groom (j92.js:463) never passes zw → NaN zone | S | rules-numbers | review/mg-env, review/mg-env-rv | B build |
| MG03 | No text inside play, group b (td_*, Chải, Thái hậu hỏi, Hoa điền…), incl. thq «…năm 209.8» bug + «CÁCH CHƠI» line in play | OD:L1997, L2013, L2015, L2022 | broken | jtd.js:192-193 td_hanh sentence rows; jtd.js:88 «◀ trái / phải ▶»; j92.js:448 «Giản dị / Đúng phẩm / Lộng lẫy»; jnwq.js:153 header text; only group a landed (cfa9156c) | M | UI | review/mg-noword-b (+ -rv, -land), review/mg-noword-kit | MAIN UI |
| MG04 | td_dung (Dung): rewrite rules + guided round so the move is clear from pictures | OD:L2008 | half | touch box fixed (d9800e60, jtd.js:95); rules text jtd.js:17 + guided round unchanged | S | UI | none | MAIN UI |
| MG05 | Hoa điền game: remove tilt step; hidden target tied to each painted face; stricter scoring at higher tiers | OD:L2024, L2026 | broken | tilt still in: jhd.js:35 rot:3, jhd.js:113 hdl/hdr, jhd.js:31 wA:.3; no 'HD_ANCHOR *=' | M | rules-numbers | review/mg-play2 (review running) | B build |
| MG06 | Hoa đăng: "avoid the lotus" obvious from picture; strong light lane | OD:L2028 | broken | jts.js:79 lane alpha .32; jts.js:81 hazard uses same hat-lotus sprite; jts.js:89 text pop «Chạm hoa sen» | S | UI | review/mg-play2 | B build |
| MG07 | Remaining broken boards: Điều hương grading fault + Nấu ăn fire lag | OD:L2045 (1) | missing | jbal2.js:255 kG.huong:3.65 unchanged; jbal2.js:253 banh lag:[.6,.08] unchanged; only Múa cue done (j82.js:316) | S | rules-numbers | review/cal-p2b | D rules |
| MG08 | Board score = given score: one «n/10» chip by the clock (replaces PHẦN/HỒI/CÒN), amber clock after full-marks window, gold pop on time loss | OD:L2041, L2043 (c) | missing | j82.js:103 still 3-cell HUD; final grade by mgGrade (jmgt.js:43) + mgPace (jmgt.js:56) separate from board | M | UI | review/mg-score-same (+ -rv), review/kit-mark (+ -rv) | MAIN UI |
| MG09 | Craft mini-games own mechanic each (Thêu, Vẽ, Cắm hoa, Khéo tay); tracing only for Chép kinh | OD:L2030, L2049 | missing | Vẽ e:"trace" (j91.js:321); Công «Thêu theo nét» tracing (jtd.js:16); Thêu memory-grid (j82.js:27, j91.js:326); MG_CRAFTS.md only on branch | L | UI | review/mg-craft, review/mg-craft-design (+ mg-craft-ve, mg-craft-hoa running) | B build |
| MG10 | Paint every code-drawn object/person in mini-games (Thắp đèn lanterns, Xử án suspects, thq seat cards…) | OD:L1996, L2020, L1712; MINIGAMES.md:53 | missing | jlant.js:17 lmDraw canvas, 0 kg82Spr/drawImage; jnwq.js:156+ nwqRobe arc/ellipse; order at FOREMAN_C_STATUS:309,:357 | L | art | none | C art |
| MG11 | Mini-games outside KG82_KIND (mưu kế, real Cờ j5 gKy, jkc2 envoy chess, pet care, plant care) into Thử tay | OD:L2036; MINIGAMES.md:9-13 | missing | mgCalKinds (jmgcal.js:32) lists only KG82_KIND; jsgame/jpetcare/jshelf/j5 never register | M | rules-numbers | review/mg-allkinds | B build |
| MG12 | «Sẵn sàng» / «Hướng dẫn» rules screen in pet care, plant care, Điểm trang | OD:L1981 | half | kgReady 0 calls in jpetcare/jshelf/jmkt/jtoil (open frames directly: jpetcare.js:89, jshelf.js:403, jmkt.js:164, jtoil.js:316) | S | UI | none | MAIN UI |
| MG13 | Person mini-game acts «Cùng chơi» / «Thách đấu» (Dư đồ dialog + Hậu cung tab; NPCs invite; co-op; harder by rank) | OD:L1978, L1979 | half | only kitGameVs board (jgamevs.js:8, BAL.gameVs jbal2.js:1630); nothing calls it | L | UI | review/person-minigame-acts, review/person-minigame-acts-c | E roads (OD assigns E) |
| MG14 | Four competitive ideas: live head-to-head, Cờ Thách đấu on gKy, onlookers + consequences + gossip, ranking ladder per art | OD:L1982 | missing | no 'thách đấu\|ladder\|Ganh tài' in logic; no gKy challenge path | L | UI | review/person-minigame-acts(-c) | E roads |
| MG15 | Fair NPC hands: bell curve per kind on real adult median, shifted by art level + upbringing | OD:L1983-1986, L2040, L2043 (a) | broken | jmgt.js:80-87 still old "strong hands rare" rule; hand.skew:1.6 (jbal2.js:1095) | M | rules-numbers | review/mg-fair-hands, review/mg-fair-ratio (+ -rv) | D rules |
| MG16 | Per-identity start arts: ~40 identities × 3–4 sở trường + 1–2 sở đoản fitted to road | OD:L1988, L1989, L2019 | missing | no BAL.orig.art; BAL.orig (jbal.js:136) only Bắc Địch numbers; j1 ORIGINS one start art each | M | content | review/mg-fair-hands (origin-arts @4ab03cd) | D rules (+ E roads) |
| MG17 | Identity offset on her result (strong ≈9 / ordinary ≈7.5 / weak ≈6 minus hand b per kind), NPCs same | OD:L2045 (2), L2017, L2033 | missing | no 'sở đoản' in code; nothing applies an offset | M | rules-numbers | review/cal-p2c (D #9 running) | D rules |
| MG18 | Rolling hand b per player (prior 7.5 ≈3 plays, α≈0.2, saved per player; co-op own b) | OD:L2046, L2047 | missing | BAL.ag.mg2.cal.k (jbal2.js:1102) one global table; no per-player b in save | M | rules-numbers | review/cal-p2c | D rules |

## B. Night / flip / co-op / core rules (OD L1000–2049)

| id | item (short) | source | state | evidence | size | type | already on review/<branch>? | suggested owner |
|---|---|---|---|---|---|---|---|---|
| OD01 | Final night rule: flip at end of 4th khắc of tối; 10-second forced choice (Tranh sủng / Chặn ngự giá / Thôi) 0 khắc 0 Sức; both acts removed from Hành sự; one resolve (highest Sủng, then fair seeded roll) | OD:L1436, L1477, L1478 | missing | j2.js:63-64 still in act list with stealCost; jsteal.js:12 "first win ends it"; no countdown in jflip/jsteal | L | rules-numbers | review/night-final, review/night-final-r2, review/night-final-fix | B build (+D numbers) |
| OD02 | Defence "Giữ chân Hoàng thượng" for the flipped consort + rebalance Tranh sủng vs Chặn ngự giá | OD:L1481 | missing | only on sample page jkitpage.js:160 | M | rules-numbers | review/night-final | D rules |
| OD03 | Emperor's monthly favoured/disfavoured art changes flip-scene odds | OD:L1483 | missing | no 'favArt\|empArt\|môn ưa\|ưa thích' | M | rules-numbers | none | D rules |
| OD04 | Co-op thin-guest migration A→H (owner: co-op top priority) | OD:L1446, L1488, L1493 | half | jcoopthin.js:25 TH.CAP = A–E, F1–F4; F5, F6, G, H not live | L | rules-numbers | review/coop-thin-f5, -f6, -f6b, review/coop-thin-g (running) | B build |
| OD05 | Balance pass on start stats + growth by origin (talents start ~75, hit 100 too fast; §7 approved) | OD:L1482, L1484, L1601 | half | branch not landed: reports/balance-core.md core gate G1 one-core-guard FAIL (jgrey.js 5 inline numbers); no balance-core tag on main | M | rules-numbers | review/balance-core, review/balance-core-r2 | D rules |
| OD06 | Unique ancient-Chinese names, one shared registry, no Vietnamese-reading surnames | OD:L1444 | half | j1.js:191 freshName only avoids living consorts/kids; banned "Bùi" (j22.js:5), "Đặng" (j59.js:358) still in pools; no name registry | M | content | review/names-unique, review/names-unique-r1 | B build |
| OD07 ✅ LIVE 7a35db20 | Every "can it still be done" check uses khắc left in the DAY with spill (sweep + guard) | OD:L1472, L1654 | half | 34 "không kịp" hits; j76.js:9,25,35,67 gate per buổi; review/day-khac-audit SẴN SÀNG KIỂM 9e7ddc14 not landed | M | rules-numbers | review/day-khac-audit, review/khac-day | D rules |
| OD-CO1 | Co-op presence at a place: the friend who ARRIVES second does not see the friend already standing there (the one already there does see the arrival). Seat-symmetric (host-first: host sees her, her phone misses host; SWAP: her phone sees host, host misses her) — law 6b real people / co-op visibility, not a law-1 seat asymmetry | OD:L1446 (co-op top priority); laws 1+6b | broken (pre-existing on LIVE 8b2e344d, place tgk too) | dev/test/coop-places.js S1 output (host/guest ppl lists, 21/11 review map-places-r2-r1); suspect (not proven): jcoopworld.js:283 refreshHere refreshes the one already there, while the arriver's goTo may build S.visit.people before the friend's S.where entry | S | rules-numbers | none | B build (co-op lane) |

## C. Outside route, economy, story roads, events (OUTSIDE_PLAN, ECONOMY, STORY_ROADS_PLAN, EVENTS_PROGRESS)

| id | item (short) | source | state | evidence | size | type | already on review/<branch>? | suggested owner |
|---|---|---|---|---|---|---|---|---|
| OR01 | Outside-route scenes, house + city maps, Huynh trưởng figure painted but not wired | OUTSIDE_PLAN.md:117-119, :188; PROGRESS_outside-art.md | half | jkc.js:42 SCIMG still maps to palace rooms; Dư đồ is a pbtn list (jkc.js:623-628); Huynh uses man:thive (jkc.js:127); no img/kc-* in assets.json | S | UI | review/outside-art, review/outside-art-r1 | B build |
| OR02 | Outside art never drawn: bến sông, ngoại ô, Thần Võ môn; mẫu thân / kế mẫu / tổ mẫu / bà mối / female teacher portraits; new act/event pictures | OUTSIDE_PLAN.md:188-191 | half | PROGRESS_outside-art.md §4 "Not drawn"; family uses "mama" pool (jkc.js:124-126); KCART reuses palace pictures (jkc.js:687) | M | art | none | C art |
| OR03 | Origin home chapters are 3 fixed 2-option beats, not j67 arcs with 3+ endings; do not set up palace arcs | OUTSIDE_PLAN.md:121-128 | half | jkc.js:325 beats on turns 4/10/16; KCOB jkc.js:437-456; S.kc.oc read only in jkc.js; only td has effect (jkc.js:465) | M | content | review/kc-lore (td only) | E roads |
| OR04 | Shared home chapters kc_ke «Kế mẫu», kc_hon «Hôn sự», tm96z «Thuở thanh mai» (S.tm96.endZ), kc_tt3 | OUTSIDE_PLAN.md:128-129 | missing | no hit 'endZ\|tm96z\|kc_ke\|kc_hon' | M | content | none | E roads |
| OR05 | Home events E9 (dying mother keepsake), E15 (groom family inspects looks), E28 (father impeached, clan move) | OUTSIDE_PLAN.md:111-115 | missing | no 'di vật\|hấp hối'; "Xin cha cho xem mặt trước" dead-ends (jkc.js:414); impeachment only in td beat (jkc.js:454) | S | content | none | E roads |
| OR06 | Home poetry contest + festivals (S5/E22/E24/E25) use a formula, not a real mini-game | OUTSIDE_PLAN.md:76, :114 | half | kcFest jkc.js:430 sc=l*12+S.tai/3+S.sac/6+R(30); only Phúc tuyển uses real mini-game | S | rules-numbers | none | B build |
| OR07 | Home family roster gaps: no nhũ mẫu, teachers not people (no favour/tiers), bà mối not a person, suitor houses only text | OUTSIDE_PLAN.md:92-108 | half | no 'nhũ mẫu' in jkc*.js; bà mối shows father's face (jkc.js:413); teachers only "Mời danh sư" (jkc.js:239); KCSUIT text (jkc.js:332) | M | content | none | E roads |
| OR08 | Carry-over at palace entry: +15 stat cap; father's liking in "Nhờ cha dâng sớ"; mother letters/gifts; "lời đồn cũ" flag; palace "Thư nhà" section | OUTSIDE_PLAN.md:139-153 | half | kcEnter jkc.js:534-553 no cap; j55 askO (j55.js:181,210) never reads S.kc; no 'lời đồn cũ'; no Thư nhà section | M | rules-numbers | none | B build |
| OR09 (kit part LIVE dd248d5d; kcPhucPlay fin wiring + BAL sister/friend marks OPEN → B) | Tuyển tú podium screen (sister + khuê hữu compete) | OUTSIDE_PLAN.md:133 | half | rivals scored silently in kcEnter (jkc.js:543-545); no podium in jkc/jentry/joi | S | UI | review/kit-podium | MAIN UI |
| OR10 | Early entry roads: "Thái hậu triệu" (ch) missing; E29 vi hành gives score bonus instead of direct Thường tại entry | OUTSIDE_PLAN.md:136 | half | no 'triệu' in jkc.js; vihanh only sets S.kc.vh (jkc.js:407) → score (jkc.js:520) | S | content | none | E roads |
| OR11 | Difficulty does not scale home hazards (stepmother schemes, rumours, forced-match speed) | OUTSIDE_PLAN.md:180 | missing | DIFF jdiff.js:16-21 no KC knobs; KC.ev/sch/apM in jkc.js:15-17 | S | rules-numbers | none | D rules |
| OR12 | Outside-route outcome split not measured on live (palace 70-75 / married 15-20 / death 4-6 / rare 2-4; HH ±5 vs direct) | OUTSIDE_PLAN.md:170-179 | half | PROGRESS_review-outside-r2.md:57 "not re-measured"; kc2val.js measures only waiting value | M | rules-numbers | review/kc2val-home | D rules |
| OR13 | Co-op help home↔palace (letter/gift/sớ/rumour/joining tuyển tú); co-op rebirth into home road at friend's moment | OUTSIDE_PLAN.md:30, :182-185 | half | only kcHook stub jkc.js:648 called with "enter"; KC.ty=3 fixed (jkc.js:15,76); friendHome done (jcoopworld.js:78) | M | rules-numbers | none | B build |
| OR14 | "Khuê các" title/milestone set (first selection, first Quý nhân at entry, each rare ending) | OUTSIDE_PLAN.md:168 | missing | no 'Khuê các' in jtitle/jbook/jkiep | S | rules-numbers | none | B build |
| OR15 | Tutorial ch1-3 tied to her rolled road (STORY FIRST; per-origin examples) | STORY_ROADS_PLAN.md:69-90; OD:L1259 | half | jtq14.js:30-75 same generic text for every origin; never reads S.st.f14.road (only cnv check jtq14.js:20) | M | content | review/tut-followups(-r1) | E roads |
| OR16 | Reason triggers per hồi (goal/grudge/debt/faction/event) for full roads | STORY_ROADS_PLAN.md:37-38, :121 | missing | hồi open on timer j67.js:143, :1772 A.due=S.turn+2+rI67(3); jrd_*.js only if: gates; only j4 uses npcWhy("story") (jagwhy1.js:166-174) | L | rules-numbers | none | E roads |
| OR17 | Intro panel pictures incomplete (no nc-*, bd-3, bd-h3, cn-2, dtq-4) | STORY_ROADS_PLAN.md:100-117; joi.js:9 | half | assets.json lacks those; frames fall back to placeholder | S | art | review/origin-intros(-r1) | C art |
| OR18 | Emperor NPC road: 1 of 4 templates (biên ải, cải cách, kế vị missing) | STORY_ROADS_PLAN.md:156 | half | jnroad.js:99 Emperor has no NPC road; jreign only "Tân quân lập uy" | M | content | review/reign-road (template 1) | E roads |
| OR19 | NPC consorts roll origin from the player's pool incl. foreign princesses (shared princess-face rule) | STORY_ROADS_PLAN.md:143-148; OD:L1289 | missing | BAL.nroad.org (jbal2.js:400) only tt/dtq/ch/thd/td/muoi; nrOrigin (jnroad.js:33) | M | rules-numbers | review/foreign-princess-samples (art only) | B build |
| OR20 | j68 event follow-ups: Hoàng hậu duty, lãnh cung life, servant-road variants | EVENTS_PROGRESS.md:66 | missing | 72 EV6 templates j68e/f/g; only hhSummons (j68g.js:17); e68On off on servant road (j68.js:19); no cold-palace condition | M | content | none | E roads |
| OR21 | Economy §5: Tâm cơ as a separate scheme cost; buy safety with silver (hire someone, better odds) | ECONOMY.md §5 | missing | doc says "Chưa làm"; no scheme card costs tamco; no "thuê người làm thay" card (flavour only j70.js:71,75) | M | rules-numbers | none | D rules |

## D. Grand + rare endings (design/GRAND_ENDINGS.md, RARE_ENDINGS.md)

| id | item (short) | source | state | evidence | size | type | already on review/<branch>? | suggested owner |
|---|---|---|---|---|---|---|---|---|
| GE01 ✅ LIVE 8730f431 | Grand-ending data for 11 branches (ch_co/ch_benh/ch_ho/ch_bi, thd_tho/thd_sach/thd_tro/thd_hoc, cnv_chu/cnv_ban/cnv_ma) + BAL.ge gate/rw/fail numbers | design/GRAND_ENDINGS.md:495 (§7 step 3), catalogue :167+ | half | GE_DATA has 25 of 36 branches (jgedata.js, jgedata_w1.js, jgedata_w2.js); geBranch() returns null without data (jge.js:22-24) → these lives get no grand ending | L | content | review/ge-writers-w3 | E roads (D rules numbers) |
| GE02 | Foreign-princess identity remap (Cao Ly done j1.js:24; bd still "Bắc Địch" jorigins.js:9, jrd_nc.js:9; no Phù Tang) + roads + 4 grand endings each; bd love-arc man role + rare endings (j96 has no bd role, no bd in j97) (Bắc Địch D2; remapped 19/11: Nam Chiếu→Cao Ly, Bắc Địch→Ba Tư, new Phù Tang) | GRAND_ENDINGS.md:152-160, :496; OD:L1927, L1960-1962; PROGRESS_origins.md:38-39 | missing | grep 'bd_san\|bd_soi\|bd_tuyet\|bd_hen' only in jgecat.js; geBranch skips country branches (jge.js:24); GE_CAT still holds superseded bd_* names | L | content | review/bd-roads, review/bd-roads-w2, review/phutang-road, review/foreign-princess-samples | E roads |
| GE03 ✅ LIVE ca642f9c | Sơ đồ nhánh page in Sổ luân hồi (node chart, you-are-here, states, counts) | GRAND_ENDINGS.md:131-143, :493 | missing | BAL.ge.mapOn:false (jbalge.js:18); K-GE-1 kitBranchMap OPEN (KIT_REQUESTS.md:85); only geMap() data fn (jge.js:187) | M | UI | none | MAIN UI |
| GE04 | Two-tone «Thiên mệnh» title plate (thiện gold-white / ác gold-crimson) | GRAND_ENDINGS.md:119, :486 | missing | K-GE-2 OPEN (KIT_REQUESTS.md:86); stopgap title:{tier:8} (jbalge.js:29) | S | UI | none | MAIN UI |
| GE05 | Bảng Thiên mệnh rows break on phones (412x1058, 390x844) | GRAND_ENDINGS.md:121-122 | broken | K-GE-3 OPEN (KIT_REQUESTS.md:87) | S | UI | none | MAIN UI |
| GE06 | Grand-ending scene paintings (160 × 2 shadings, pilot 24) + fail notice reuses road .11 picture | GRAND_ENDINGS.md:100, :484-485 | missing | PEND.geR (jge.js:120-127) shows no picture; no ge entries in assets.json / EVENTS.json | L | art | none | C art (B wires) |
| GE07 | Kim sách Thiên mệnh item icon | GRAND_ENDINGS.md:487 | missing | IT.kimsachtm defined jge.js:181; 0 hits in assets.json | S | art | none | C art |
| GE08 | Grand-ending unlock world news as centre pop-up / NPC news | GRAND_ENDINGS.md:100 | half | only log() «Thiên hạ truyền tai…» (jge.js:113) | S | UI | none | B build |
| GE09 | NPC grand-ending parity (NPC branch draw, last answers by nature, seat locks, title, Bảng rows, fall news) | GRAND_ENDINGS.md:124-129, :497 | missing | BAL.ge.npc:{on:false} (jbalge.js:121); S.geSeat only ever "me" (jge.js:106); NPC roads now exist (jnroad*.js) | L | rules-numbers | none | B build |
| GE10 | Her help/sabotage on NPC road moves NPC grand endings + reward BAL.ge.help.rw | GRAND_ENDINGS.md:128 | missing | number exists "not live in this pass" (jbalge.js:120); no BAL.ge hook in jnroadhp.js | M | rules-numbers | none | B build |
| GE11 | Rare-ending pictures: one per rare ending (47 j97 + 36 RD97L), id arc:<tuyến>:r97 | RARE_ENDINGS.md:13 (+ each "Tranh:" line) | missing | no ket-r97 key in EVENTS.json; stArtOf falls back to arc cover (j89.js:31) | L | art | none | C art |

## E. Items / wardrobe (ITEMS.md, ITEMS_EARNED.md, OD item rulings)

| id | item (short) | source | state | evidence | size | type | already on review/<branch>? | suggested owner |
|---|---|---|---|---|---|---|---|---|
| IT01 ✅ LIVE 26f3bfa9 (already met §28.13b; art gaps → C) | Big centre item display: item alone on transparent ground, no grade frame, ≥1024 px source | OD:L686 | half | jk2b.js:797 has a big display, but the kitGain/kitReward path jkrev.js:37-39 kitRevealHTML draws graded kitItem({size:"xl"}); j98.js:3-4 serves ≤512 px | M | UI | review/item-big | MAIN UI (+ C art hi-res) |
| IT02 | Wardrobe set: 20 per tier (10 trâm + 10 y phục) × 8 consort + 5 maid ranks = 260 | OD:L45 | half | j92.js WD_LIST ≈47 garments (25 y phục, 22 trâm) + 8 hoa điền; maids only 6+2, no maid ranks | L | art | review/wardrobe | C art (+ B data) |
| IT03 | Extra wear slots: earrings (hoa tai) + shoes | OD:L175; PROGRESS_small-art-wire.md:16 | half | art keys at j98.js:22 "no wear slot yet: KIT REQUEST"; KEQ_TT jinv.js:302 has 6 slots | S | UI | none | MAIN UI |
| IT04 | Hoa điền: transparent face sprites, per-face anchors, NPC hoa điền shown | ITEMS.md:90 | half | jhd.js:44 npcShow:0 waiting HD_ANCHOR; no 'HD_ANCHOR\s*=' in build; jhd.js:56-61 falls back to item picture | M | art | review/hoa-dien-art | C art |
| IT05 | Bribed maid "steals jewellery box" moves only silver (law 6c real objects) | OD:L507, L1313 | broken | j8.js:419 text says box stolen but code ap(p,{bac:-g}); no item leaves chest; log always "Bạc -30" | S | rules-numbers | none | B build |

## F. Appearance / presentation (OD L1–1000)

| id | item (short) | source | state | evidence | size | type | already on review/<branch>? | suggested owner |
|---|---|---|---|---|---|---|---|---|
| AP01 | Main-story event frames, one painted style per origin (9 styles) | OD:L528, L609 | half | jpres.js:57-59 KPO_ART={} empty; only colour double-line placeholder (data-kpres-origin hook :82) | M | art | review/presentation-wiring(-r1) | C art (B fills KPO_ART) |
| AP02 | Old-save player looks 1–4: 128 figures (t2–t8 + cold × 4 ages) + the 4 faces into face pools | OD:L749 | half | assets.json has 36 fig-player-look* (no t5/t7/cold, no older ages above t1); no 'look[1-4]'/'player-look'/'PLOOK' in build | M | art | none | C art (B face pools) |
| AP03 | Appearance art: pregnancy figures (6/9 months), nun figure (4 ages), dưỡng nhan glow, early grey strands | OD:L121 (postponed L122; L751 "draw anything drawable") | missing | no 'preg' in jfigx/jfighd/jk2b/jkpor/jface; no fig-nun; no dưỡng nhan / tóc bạc sớm in jlooks.js; xuất gia ending text only (jmort.js:198) | M | art | review/pregnancy-art | C art (confirm postponement lifted) |
| AP04 | Perf test (frame time, memory, bytes/scene) in CI at 755x1000 + mid-phone | OD:L719 (budget rule 6) | half | dev/test/perf-fx.js + perf-budget.json exist; .github/workflows has only coop/img/rank workers | S | rules-numbers | none | B build |

## G. Emotion (EMOTION_PLAN.md)

| id | item (short) | source | state | evidence | size | type | already on review/<branch>? | suggested owner |
|---|---|---|---|---|---|---|---|---|
| EM01 | Emotion balance proof: 150 lives emotions off vs 150 on, then tune EMO_OD / EMO_W idle / danger cap (old numbers stale since FEELINGS-18) | dev/EMOTION_PLAN.md:119; dev/PROGRESS_emotion.md:18 | half | only n=30–61 runs recorded (EMOTION_PLAN.md:106-114); tools ready (dev/measure/run5b.sh, anemo.py; __emoOff jemo.js:56, __feelOff jfeel.js); jfeel.js:126-134 overwrites EMO tables from BAL.feel | M | rules-numbers | none | D rules |

## H. Open kit requests + PROGRESS leftovers (KIT_REQUESTS.md, PROGRESS_*.md)

| id | item (short) | source | state | evidence | size | type | already on review/<branch>? | suggested owner |
|---|---|---|---|---|---|---|---|---|
| KP01 | 10-night ledger: each of the week's 10 nights its own pick; extra nights as notice; cycle by day; Empress automatic days 1 & 15, off the tray | PROGRESS_npc-agent-ag2.md:15; OD:L1387, L1391, L1395 | missing | jagemp.js:18 "review/night-ledger, not built yet"; j75.js:128-132 mùng 1/rằm only a weight (BAL.ag.emp.custom); jcycle.js:72 cycOn blocks whole tuần | L | rules-numbers | review/night-ledger, review/night-ledger-r1 | B build |
| KP02 | Map places Ngự thiện phòng, Nội vụ phủ, Phật đường | PROGRESS_places-port.md:24; OD:L82 | half | jplx.js:16-21 adds cnh/tgk/ttp/acs/dc; j2.js:112 map + j26.js MAPH have no nth/nvp/pd | M | UI | review/places, review/places-port-r1 | B build (+C art) |
| KP03 | Children living rules: call child home, monthly estrangement, Thái tử prestige, orphans to Thái hậu/Hoàng hậu | PROGRESS_places-port.md:25; OD:L87 | half | only "Về tẩm cung thăm con" (j15.js:55) + letters to married daughters (j54.js:203); no 'Cho gọi con về', no 'mồ côi\|orphan' | M | rules-numbers | none | B build |
| KP04 | bd origin seal img/kit/origin-bd.webp | PROGRESS_origins.md:32 | missing | j60.js:23 KIT_ORIGINS has no "bd"; jorigins.js:7 lists it missing | S | art | review/land-origin-bd-r1 | C art + MAIN UI |
| KP05 | Scheme mini-games: "MƯU" seal, own HUD (Bóng/Hồi/Còn), painted boards | PROGRESS_scheme-games-port.md:17-20 | missing | jsgame.js:11 kit silk fallback; j82.js:105 seal hard-coded "TÀI NGHỆ" | M | UI | review/scheme-games | MAIN UI |
| KP06 ✅ LIVE 99bdba82 | "Y dược" act group for medicine / pregnancy cards | KIT_REQUESTS.md:12 | missing | j79.js:666/796 KIT_ACT_CATS has no y-duoc; no 'Y dược' in j*.js | S | UI | review/suc-khoe-fix | MAIN UI |
| KP07 ✅ LIVE dd248d5d (art slots entry-gate-* → C) | kitEntryGate: palace-gate → selection-hall entry animation | KIT_REQUESTS.md:16; OD:L1244 | broken | joi.js:18/176 calls window.kitEntryGate, no definition anywhere | M | UI | review/origin-intros-r1 | MAIN UI (+C art) |
| KP08 | Weather art: icons mo-wx-amu/muarao/giolon/suongmu, fx-fogbank sprite, fog/cloud grade on buổi scenes | KIT_REQUESTS.md:51-54 | missing | jclose.js:62 reuses nearest icons; jfx.js:199 fog uses smoke atlas | M | art | review/wx-anim, review/weather-khac-r1 | C art |
| KP09 | Body-fit box per figure so outfit-stain overlays sit on robes | KIT_REQUESTS.md:56 | missing | jlooks.js:14 slots wait for body-fit box; no data | M | UI | review/looks-2 | MAIN UI + C art |
| KP10 | Đa Bảo Các art: rail icon, painted cabinet + slot points, 67 cut-out item pictures | KIT_REQUESTS.md:60-63, 73-76 | half | screen built (jdisp.js, jshelf.js:373); rail placeholder ico-room (jdisp.js:146); stub grid (jdisp.js:21-23) | M | art | review/display-shelf-r3, review/kit-display-room-r2 | C art |
| KP11 | Painted status icons ico-tin, ico-alert | KIT_REQUESTS.md:92, 97 | missing | no 'ico-tin' (glyph 信 fallback); jstagehere.js:9 uses "!" | S | art | review/status-icons | C art |
| KP12 ✅ LIVE 5cd6d24a | Writer's explicit green/red class should beat word-meaning colouring | KIT_REQUESTS.md:104 | broken | j63.js:19 kaSent runs kcls(h) first, uses old only if neutral | S | UI | review/kyngo-daily | MAIN UI |
| KP13 ✅ LIVE 5cd6d24a | Pay-only-on-success price under THÀNH, "không mất bạc" under BẠI | KIT_REQUESTS.md:48 | missing | no econPayWin/payWin in j63.js / jk*.js | S | UI | review/kit-option-rows-r3 | MAIN UI |
| KP14 | Option tiles squeeze at Fold 755 (one syllable per line) | KIT_REQUESTS.md:36-45 | broken | still open; no option-grid fix in jksize (not browser-checked) | S | UI | review/coop-thin-b-r3 | MAIN UI |
| KP15 ✅ LIVE 5cd6d24a | Item reveal card with many items: icon rows cover the list (row cap / +N) | KIT_REQUESTS.md:68 | broken | jkrev.js:32 kitRevealHTML no row cap or +N | S | UI | review/coop-thin-c-r1 | MAIN UI |
| KP16 ✅ LIVE 99bdba82 | Small loading spinner (life-preload part b) | KIT_REQUESTS.md:77 | missing | part (a) jph.js picWait built; no 'kitSpin\|spinner' | S | UI | none | MAIN UI |
| KP17 ✅ LIVE 5cd6d24a | kitEvArt writes a guessed evId onto act pickers | KIT_REQUESTS.md:89 | broken | jk4.js:559-564 sets m.evId on any artless item, pickers included | S | UI | none | MAIN UI |
| KP18 ✅ LIVE 99bdba82 | kitModal from title screen sits under #title | KIT_REQUESTS.md:22-23 | half | only per-place kptitle patches (j74.js:20, jcloud); kitModal (j79/jk4) no title check | S | UI | none | MAIN UI |
| KP19 ✅ LIVE 5cd6d24a | Việc nhờ step list (✓ ▸ ·) as shared kit part | PROGRESS_tut-followups.md:8 | missing | j72.js:259 builds ✓▸· text by hand | S | UI | none | MAIN UI |
| KP20 ✅ LIVE 5cd6d24a | Chapter detail panel: chapter cover instead of topic picture | PROGRESS_chapter-detail.md:17-18 | half | jchap.js:18 computes o.cover; kitModal info has no subject-picture option | S | UI | none | MAIN UI |
| KP21 ✅ LIVE 5cd6d24a | Act-card parser: strip "kèm:/thành:" labels, pure gains Kèm→Được, split 41 long rows | PROGRESS_review-act-text.md:55-60 | missing | no label-parse change in j63.js kaRows | M | UI | review/kit-option-rows | MAIN UI |
| KP22 | kit-fig2 leftovers: 2-option visit ~124px empty, Ân oán lacks Nam nhân/Cung nhân groups, relation chips old wording | PROGRESS_kit-fig2.md:96-112 | half | "several people → main one" done (jk4.js:493); other three unconfirmed (not browser-checked) | M | UI | none | MAIN UI |
| KP23 | Art backlog (CDN, not countable from git): 48 system keys, 97 dialog banners, ~240 act pictures, outer outing places | PROGRESS_review-act-pics2.md:57-69; PROGRESS_review-act-split-w2.md:22 | half | per those PROGRESS files; queue via dev/figwork/acts/prompts2.py --todo | L | art | review/act-pics2 family | C art |
