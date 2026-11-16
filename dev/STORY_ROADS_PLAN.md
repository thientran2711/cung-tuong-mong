# STORY ROADS PLAN — the 14-chapter life (Cung Tường Mộng)

Status: owner chose this direction 16/11 08:30Z ("Ok, chọn hướng tuyến truyện 14 chương đi" = option 1 of the 07:05Z recommendation).
Owner words: read the appendix (OWNER_DECISIONS lines copied verbatim) and dev/PRIORITY_RULES.md in full; this plan never replaces them.
Build branch for phase 1: `review/story14-p1` (report: dev/handover/reports/story14-p1.md).

## 0. What already exists (LUẬT ƯU TIÊN SỐ 1 check, 16/11)
- `dev/build/j67.js` (owner 11/14): 4 premises per origin (36 arcs) + 8 shared arcs (`o:"*"`) + 3 stage arcs (`st_the` Gây dựng thế lực,
  `st_con` Con đường của con, `st_dong` Ngôi Đông cung) + court/scholar arcs; each arc 3–6 hồi (mở đầu → 1–3 rắc rối → bước ngoặt → cao trào
  → kết), ≥3 endings, real rivals cast with `castRv67`, history of the last 10 arcs per origin (`ctm-arcs`), chapter deadline, Lợi thế,
  reward item by outcome. v3 frame "about 13 chapters": nhap, sung, 4 origin arcs, origin ending, 3 shared, 3 stage, hau, ke.
  Header rule: a lost chapter never closes the Hoàng hậu / Hoàng thái hậu road.
- `j4.js` origin roads (v1 story, old saves), `jkc.js` pre-palace home road (6 origins), `j96.js` Thanh mai trúc mã chapters
  (spliced into the plan), `j72.js` Việc nhờ (2–5 step favours from real people), `jreign.js` reign road + 3-step lines for 6 key people,
  `jgoal.js` chapter goal + chapter detail (KIT §72), `jtut.js` coach/tips tour (KIT §72), `jtabs.js` Mệnh truyện tab.
- Queued, not on main: `review/chapter-detail-r1` (jchap.js: hồi-by-hồi chapter detail, folded into kitGoalDetail),
  `review/tutorial-r2*`. Phase 1 touches jgoal/jtabs only by a few lines so these still merge.

## 1. The frame (all phases)
A life = 14 chapters (chương) in three parts. Each chapter has several hồi (3–5 for her own chapters).
| Part | Chapters | Content | Built in |
|---|---|---|---|
| Phần đầu · Nhập cung học việc | 1–3 | new-player chapters: each quest is DONE by really using a feature (e.g. sell 1–2 items from the chest); reward only on completion; a chapter closed by its time limit gives nothing; replaying a life gives no free tutorial reward | frame P1, quests P2 |
| Phần giữa · Truyện xuất thân | 4–11 | ONE of the origin's 4 roads, rolled at đầu thai, avoiding the roads played lately; 8 chapters of that road | P1 (j67 mapped), P3 (4 full roads) |
| Phần cuối · Ngôi Trung cung | 12–14 | endgame: con đường của con / ngôi Đông cung, Tranh ngôi Trung cung, Mẫu nghi thiên hạ | P1 (existing), P4 (full) |

Rules that hold in every phase:
- OD:L1247: anyone a road involves REALLY exists in the palace with the same name and identity, and a hostile role is REAL in the
  relationship system (thiện cảm down, oán up both ways, j9 relAdd) — set when the person is cast. Phase 1 does this (jst14 castRv67 wrap;
  td family enemy S.foe = the same live consort, hostile both ways).
- OD:L1253: the same identity + road + option must NOT always give the same result across lives. Outcomes read THIS life's context
  (cast person's thiện cảm/oán and nature, her Tâm cơ/Đức, how many consorts bear her a grudge, earlier choices / Lợi thế) — never a
  fixed table. Phase 1: every chancy story option's odds move up to 15 either way by that context (jst14 f14Ctx); bot check: one fixed
  choice path over many lives → outcome spread, no single dominant answer. P3 writes context into the branch results too.
- Roles are cast from REAL people of this life (rivals, men, servants, family, officials); story-only named NPCs are allowed when a road needs
  them (e.g. the old steward of her ruined house), created for that road and shown with an existing face.
- A hồi fires only for a real in-game reason (a person's goal, grudge, debt, faction move, an event, a deadline) — never a daily dice.
  j67 today: hồi open from the "Mệnh truyện" card when due; servant life: beats come on their own. P3 adds reason triggers per hồi.
- Every reward has a gain AND a loss (OD rule 16/11 07:15Z). P2/P3 rewards are written with both columns; P1 keeps j67's existing
  choice costs and chapter rewards unchanged (noted for P5 balance).
- Failing a chapter never closes the Hoàng hậu road (j67 rule). A chapter that cannot run (no arc left, already Hoàng hậu, son already
  Thái tử) is replaced by a shared arc so the numbers stay 1..14.
- Only new lives get the frame; every older save keeps its old frame (v1 story, j67 v2/v3).
- Kit parts only (LUẬT KIT TRƯỚC); wording per dev/kit/VANPHONG.md ("Mệnh truyện" for the tab, never "Tuyến truyện" on screen).

## 2. Phases
### Phase 1 — frame + port j67 (review/story14-p1, built 16/11)
- `dev/build/jst14.js` (after j67.js): new life → `S.st.f14={v:1,road}`, `S.st.v2=4`, plan
  `ms:nhap14, ms:sung14, ms:tap14 | o,o,o,o, fin, s,s,s (cnv: ms:len14,s,s), st:st_the | end:12, ms:hau, ms:ke`.
- Road roll: the first premise is picked among the origin's 4 avoiding the ctm-arcs history (fresh first) and names the road; the other 3
  premises follow (each chapter's outcome picks the next, j67 chNext67), then shared arcs + Gây dựng thế lực up to chapter 11.
- Chapter 12 = st_dong (son) / st_con (child) / a shared arc; 13 = Tranh ngôi Trung cung; 14 = Mẫu nghi thiên hạ.
- Thanh mai trúc mã chapters (j96, jkc) are moved out of Phần đầu into Phần giữa and replace shared arcs (frame stays 14).
- Tutorial milestones nhap14 / sung14 / tap14 (Học quy củ: a friend at thân tình 30 + one art at bậc 2) / len14 (cnv, 12-month limit):
  real state checks; the time-limit step closes the chapter with NO Danh and NO item ("Lỡ dịp").
- UI (existing kit only): chapter detail (kitGoalDetail) gets a section "Đời người · 14 chương" (kitRows: three parts, where she is,
  chapters left); Mệnh truyện tab chip row gets `kchip` "Chương n/14 · <part>" and "còn N chương"; servant road panel same words.
- Tests: dev/test/story14-frame.js (sensible bot lives + fast story bot over all 9 origins walking 1..14, detail/tab text, tutorial
  reward rule, old saves from main and from frame-off).

### Phase 2 — tutorial chapters + origin intros (next)
Tutorial chapters 1–3, each 3–5 hồi, each hồi a TASK that is done only when she really does it, reward on completion with a gain and a loss:
- Ch1 "Nhập cung, đứng vững": thỉnh an (Hành sự card played), go to a place on Dư đồ, read a person card (Hậu cung), wear an outfit
  (Tư trang › mặc), sang buổi / sang ngày once.
- Ch2 "Lần đầu được sủng": learn one art lesson (Tài nghệ), play one art mini-game, give a gift to a person (gift picker), serve the
  Emperor once (night / dâng canh), answer one event card.
- Ch3 "Học quy củ trong cung": sell 1–2 items from the chest (Tư trang › bán), buy one item (Nhờ thái giám mua đồ), take one Việc nhờ
  (j72) to its end, make one ally (Giao tình), read Sổ ghi.
STORY FIRST (OD:L1259): chapters 1–3 are part of her story — every task is motivated by what is happening in her life and her rolled
road (narration + a plot thread that later chapters pick up), never a detached feature tour. The road rolled at đầu thai (S.st.f14.road)
seeds the reason; the feature is the means. Worked examples per origin group:
- Court families (tt, dtq, ch): a letter from home — the house needs silver to quiet an official who is digging into the father (the
  road's first conflict) → she SELLS 1–2 chest items and sends the silver home (Tư trang › bán + gửi); gain: the family's gratitude and a
  name she will meet again in ch4; loss: the items and a little Danh if the sale is seen.
- Merchant / poor scholar (muoi, thd): her stipend is short and a rival mocks her plain dress at the first gathering → she BUYS one item
  through the eunuch (Nhờ thái giám mua đồ) and WEARS an outfit for the gathering (Tư trang › mặc); the eunuch becomes the contact the
  road uses later; loss: silver she will miss next month.
- Disgraced house (td): the old steward of her house (story-only NPC allowed, OD:L1234) sends a message from outside → she must find out
  who guards the side gate: GO to a place on Dư đồ and READ a person card (Hậu cung); gain: the first clue of the frame-up; loss: the
  guard now knows her face.
- Foreign princess (nc, incl. Bắc Địch): the Lễ bộ asks her to prove she follows palace custom → THỈNH AN the Thái hậu three mornings and
  learn one art lesson (Tài nghệ); gain: Thái hậu's first favour; loss: her envoy is angry she bowed so low.
- Palace maids (cn, cnv): her mistress needs a gift for a senior consort by month end → she makes one work in an art mini-game and GIVES it
  (gift picker); gain: the mistress's trust; loss: a fellow maid who wanted the errand resents her (real oán, OD:L1247).
- Every origin, ch2 "Lần đầu được sủng": a real reason from the road (her father's rival's daughter is favoured; the Thái hậu hints) leads
  to the first night / dâng canh; ch3 "Học quy củ": a Việc nhờ from a person already in her road (j72 card) and one ally made in Giao tình.
Each hồi text names the real people involved (castRv67 / road cast), and the chapter-end card ties the outcome into chapter 4.
State per task: counters written by the feature itself (S.tu14.{sold,bought,gift,...}); no counter → the task cannot be marked; the coach
(jtut kitCoach) may point at the button but never completes the task. Replay: tasks reset per life, rewards only when done again (no skip-with-reward).
Servant life (cnv) gets its own three chapters (phận sự, Đồng liêu, chủ tin).

Pre-palace home roads (OD:L1251, replaces the "no home road" part of OD:L1244): cn and nc (every country branch incl. Bắc Địch) get a
home road like td — built by a separate worker on `review/kc-roads-cn-nc`; this plan only references it. cnv starts as a palace maid, no home road.
Entry rank (OD:L1250): an origin's entry rank is only its CEILING; she earns it by passing the tuyển tú selection (minigame score from tài,
đức, abilities); a weaker result gives a lower rank; patronage (the Thái hậu's person …) opens the higher ceiling. Every origin.
Entry choice and co-op (OD:L1288, replaces the 07:25Z co-op home-road line): where a road offers "Vào cung ngay / Chờ 3 năm", waiting
3 years must be worth as much as 3 years lived in the palace (home gains equal what 3 palace years would give), so both choices are real.
Co-op: both players get that choice at the SAME time point on their roads, each chooses freely, time runs the same for both; one may live
in the palace while the other lives at home. No forced joint entry, no waiting for the friend. P5 balance measures the two branches.
Origin intros (OD:L1244): every origin gets
- a NARRATED intro with ILLUSTRATIONS (3–4 painted panels, kit scene panel kitPanel({scene:true}) + kitTiles), and
- an ENTRY animation (palace gate → selection hall, kit §67/§68 painted FX parts), and
- a tuyển tú MINIGAME that decides the entry rank by score: high score → the highest rank of that selection; fail → a lower rank
  (never "the highest rank the origin allows"). Reason shown on the result card (caught the Emperor's / Thái hậu's eye, Hoàng hậu's word…).
  Draft: 3 hồi — dung nghi (pose/bearing, tap timing), ứng đối (answer the Thái hậu's question, 3 choices by trait), tài nghệ (one
  short art mini-game from j82). Score 0..30 → rank ladder of that selection per origin (table in P2, balanced in P5).
  Hòa thân: the welcome audience replaces the selection; cung nữ: the cung nữ selection (rank = post: cung nữ bậc / đại cung nữ).
ART NEEDED — SAMPLES ONLY, made by the MAIN chat (owner 07:30Z/07:45Z), mass production by Foreman C after approval. This worker
generates no art. Sample list for main:
1. one origin intro set as the sample (Con gái Tể tướng): 4 landscape panels (phủ at dawn, farewell to the family, sedan at the
   palace gate, kneeling in the selection hall), style per dev/art/OWNER_ART_RULES.md;
2. the selection hall (Điện tuyển tú) background, landscape, 4 buổi variants later;
3. the selection audience: Emperor and Thái hậu seated (existing figures reused, only the throne-dais scene is new);
4. one candidate-line panel (her among 5–6 candidates, backs/three-quarter, no faces revealing personality);
5. the entry animation key frames: palace gate opening, path of the Tử cấm thành (2–3 frames) — or confirm the kit §68 painted FX can do it;
6. hòa thân arrival panel (envoy procession) and cung nữ selection panel (Nội vụ phủ courtyard) as the two "no home road" samples.
Then (after approval) per origin 4 panels × 9 origins → Foreman C.

### Phase 3 — four full roads per origin
Each origin: 4 different roads (today's 4 premises grow into 4 roads), each road = 8 chapters (4–11) × 3–5 hồi, own cast slots
(real NPC by role; story-only NPC where needed), ≥3 endings per road, reason triggers per hồi (goal / grudge / debt / faction / event),
gain-and-loss on every choice and reward. Roll at đầu thai avoiding recent roads (ctm-arcs). Content plan per origin → Foreman (content).
Shared arcs stay as fillers only when a road chapter cannot run.

### Phase 4 — endgame chapters 12–14
Ch12 child road / Đông cung (with a road for childless lives: nuôi con nuôi / Thái hậu's heir choice), ch13 Tranh ngôi Trung cung as hồi
(not only rank milestones), ch14 Mẫu nghi thiên hạ (kế vị, Hoàng thái hậu), seat rules (j30 SEATCAP) and promo-skip rules apply.

### Phase 5 — bot balance
Same harness and target band as the origin balance (OD:L19 + L43): Hoàng hậu ~20–40 % per origin; per-road win/lose spread;
chapter length (months) per part; reward value vs cost per rank (BALANCE rule 15/11 20:30Z). Report table; no new rules.

## 3. Phase 6 — NPC roads (OD:L1243, APPROVED by OD:L1252)
Consorts (and maids) get their OWN origin + one of the 4 roads of that origin, on the SAME chapter/hồi frame as hers (jst14), so they live
with goals. Parts of an NPC's road become HER side quest: her help = ONE hồi drawn from A's road (her own chapters have 3–5 hồi); not every
chapter asks her. Variety (OD:L1252): the same person A with the same identity in two lives brings a DIFFERENT request at a DIFFERENT hồi
of A's road (this life hồi 1, another life hồi 4); tasks and choices vary per life; never repeat A's last request (history like ctm-arcs,
keyed by identity). Replaces D5 "side quests for every NPC". Outcomes read context (OD:L1253).
Build sketch: NPC road = light state on the person {road, ch, h, flags}, advanced by the NPC month simulation for a real reason (her goal,
grudge, debt, faction, event), no dialogs; the hồi that names the player becomes a j72-style Việc nhờ card with gain and loss; at most one
open NPC request at a time. Starts after phase 1 is on main (needs the frame), can run beside phases 2–4.

### 3.0 NPC identities from the same pool (OD:L1289)
NPC consorts roll their identity (origin) at game start from the SAME pool as the player (9 origins + country branches), so in some lives an
NPC consort IS a foreign princess (Nam Chiếu / Bắc Địch) with that princess art set, costume rules and road. The 3+3 princess faces per
country are shared by player and NPC rolls, never the same face twice in one game. Her NPC road (this phase) = one of that origin's roads.
Phase 1 note: castRv67 already casts live consorts; once NPC origins exist, road roles prefer the NPC whose identity fits the role
(e.g. "the daughter of the family's enemy" = a consort whose origin/family is that enemy, OD:L1247).

### 3.1 Men's roads (OD:L1264)
Every named male character gets an identity + road on the same frame, same rule: her help = ONE hồi of his road, a different request at
a different hồi each life, never his last request again. Groups and road templates (identity = role + family + trait; a template is a
road shape of 4–8 chapters × 2–4 hồi, cast from real people):
| Group | Who (existing data) | Road templates | Reuse |
|---|---|---|---|
| Emperor | the Hoàng thượng (one per life) | 4: tân quân lập uy (reign), biên ải chiến sự, cải cách triều chính, kế vị / lập Thái tử | jreign "Tân quân lập uy" = template 1 as is; her faction road stays hers |
| Princes / vương gia | sons (S.kids), Emperor's brothers (j96 vương gia) | 3 per kind: học hành thành tài, tranh ngôi, phong vương ra trấn | st_con / st_dong arcs give the hồi shapes |
| Court officials | tdHead posts (Tể tướng, Đại tướng quân, Thượng thư…), her father / brothers (jkc fam) | 4: thăng quan, bị đàn hặc, bè phái, cáo lão hồi hương | j72 Việc nhờ cards for "her help"; jreign rgL lines for the 6 key people become their road's hồi |
| Guards / thị vệ | cấm quân, thống lĩnh (S.men roles) | 3: lập công, phạm cấm, tình riêng | j96 Thanh mai trúc mã = template "tình riêng" |
| Eunuchs | Tổng quản (S.court.tq), Kính sự phòng, her servants (S.staff) | 3: leo chức Tổng quản, giữ của / tham ô, trung với chủ cũ | jstaff / promote-servants data |
| Outer court men / suitors | S.men (physicians, envoys, scholars, merchants) | 3 per role group: công danh, nợ nần, tình duyên | j96 men pool, j82 physician |
Totals to write in phase 6: ~20 templates for men + the women's origin roads reused for consorts/maids. Build order: Emperor (reuse jreign)
→ officials (reuse j72/rgL) → eunuchs/guards → outer court men. Same light state per person {road, ch, h, flags, lastAsk}.

## Appendix — owner decisions, copied verbatim from dev/OWNER_DECISIONS.md
[OD:L1223] - (16/11 06:30Z, s10) OWNER STANDING RULING (from her s9 words 05:51–05:52Z; original ruling lost, history search reports/owner-history-chapters.md): EVERY origin has 4 DIFFERENT story roads (tuyến truyện) for variety; she recalls 12–14 chapters per origin. Today main has ONE road per origin with n:3 steps (td n:5). Meaning of "12–14 chương" (per road vs total over the 4 roads) asked to the owner 06:30Z — do not build until answered. Scope later: content plan per origin → Foreman (content), not main.
[OD:L1226] - (16/11 07:05Z, s10) OWNER (verbatim summary, story roads; she had to re-state it because earlier chats lost it): 9 origins × only 1 road = 9 roads = boring, players learn them by heart. On đầu thai: roll the origin, THEN roll one of MANY different roads, every road fully different. A life spans 14 CHAPTERS in total (not 3). The first chapters work as a NEW-PLAYER TUTORIAL: quests that make her use each game feature, with rewards. Each chapter has several hồi. LIVING WORLD: replaying the same road can end differently; the people in a road are REAL characters of this life (not always the same NPC A), and when they come to her it must be for a REAL in-game reason (their goals, grudges, debts, faction, events), never a dice roll that day. Coordinator found on main: j67 (owner 11/14) already has 4 premises per origin (36 + court/scholar/st), 3–6 hồi each, casts real rivals (castRv67), >=3 endings, avoids the last 10 played. Recommendation sent 07:05Z; plan in dev/STORY_ROADS_PLAN.md after she approves.
[OD:L1233] - (16/11 07:55Z, s10) OWNER (tutorial chapters): the new-player tutorial is NOT "show the button". Each tutorial quest makes her DO the task to finish it (e.g. sell 1–2 items from the private chest) and the reward comes only when the task is done. Replaying lives does not get free tutorial rewards: the "skip but still rewarded" idea from the 07:05Z recommendation is REJECTED.
[OD:L1234] - (16/11 07:55Z, s10) OWNER (story cast): story-only named NPCs are OK when the road needs them (e.g. the old steward of her ruined house seeking shelter in a revenge road) — they need not be game-world people. Separately: she already ruled that EVERY NPC in the game must have side quests (phụ tuyến) for her — check whether it is built (today jreign gives 3-step quest lines to only 6 key people; every named person has a Tâm nguyện). Also check the old rule: does failing a chapter close her road to Hoàng hậu (j67 header: a lost road never closes the Hoàng hậu / Hoàng thái hậu road) or must all chapters be done first.
[OD:L1242] - (16/11 08:30Z, s10) OWNER: "Ok, chọn hướng tuyến truyện 14 chương đi" → coordinator picks option 1 of the 07:05Z recommendation: chapters 1–3 = tutorial (quests must be DONE for the reward, no skip-with-reward), 4–11 = one of the origin's 4 roads, 12–14 = endgame; roles cast from real NPCs; hồi fire only for real in-game reasons; story-only NPCs allowed; phased build (1 frame + port j67, 2 tutorial, 3 extend roads per origin, 4 endgame, 5 bot balance).
[OD:L1243] - (16/11 08:30Z, s10) OWNER (NPC roads, asks for a recommendation): instead of side quests for every NPC, give NPCs (esp. consorts, also maids) their OWN origin + one of the 4 roads of that origin, 14 chapters like hers, so they live with goals; parts of an NPC's main road can be HER side quest (helping them) — but not every chapter asks her; her help = ONE hồi (one task) where her own chapters have 3–5 hồi. Otherwise NPCs need no extra side quests.
[OD:L1244] - (16/11 08:30Z, s10) OWNER (origins without a home road): cung nữ and hòa thân going straight into the palace is fine (no extra home road). BUT every origin needs its own NARRATED intro with ILLUSTRATIONS, and an ENTRY animation; the entry rank must have a REASON like real tuyển tú (catching the Emperor's / Thái hậu's eye gives a higher rank) with a MINIGAME exam: high score → the highest rank of that selection, fail → lower rank (not "the highest rank the origin allows").
[OD:L1247] - (16/11 08:40Z, s10) OWNER RULE (story cast, real people): when a road (hers or an NPC's) involves another person — e.g. "the daughter of the family's enemy" — that person must REALLY exist in the palace with the SAME name and identity, and the hatred between them is REAL in the relationship system (they truly hate each other, act on it), not just quest text.
[OD:L1250] - (16/11 08:40Z, s10) OWNER RULE (entry rank): an origin's entry rank (e.g. Cháu gái Thái hậu → Quý nhân) is only the HIGHEST rank that origin can get at entry; she gets it only by PASSING the selection exam (minigame/score from tài, đức, abilities); a weaker result gives a lower rank. Patronage (being the Thái hậu's person) opens the higher ceiling, but the rank itself is earned by ability — like real life. Applies to every origin.
[OD:L1251] - (16/11 07:00Z, s11) OWNER (replaces the "no home road" part of OD:L1244): build a PRE-PALACE road for the two remaining origins Cung nữ tuyển vào cung (cn) and Công chúa hòa thân (nc, every country branch incl. Bắc Địch), the same way as the td fix (home life before the event that sends her into the palace; that event shown as a kit event card, then the palace road). "Bạn linh động." Coordinator: cnv (cung nữ được sủng hạnh) already starts as a palace maid → no home road. Narrated intro + illustrations + entry animation + selection minigame (OD:L1244, L1250) still apply to every origin.
[OD:L1252] - (16/11 07:00Z, s11) OWNER RULE (variety across lives): an NPC who comes to ask her help must NOT bring the same task every life. Same person A with the same identity in two lives → a DIFFERENT request, at a DIFFERENT point of A's own road (this life A comes at hồi 1, another life at hồi 4). Tasks and their choices vary per life. → NPC roads (OD:L1243) are the way: her help = one hồi drawn from A's road. Treated as the owner's approval of NPC roads; D5 "side quests for every NPC" is replaced by it.
[OD:L1253] - (16/11 07:00Z, s11) OWNER RULE (no memorised outcomes, main story too): the same identity + same road + same option chosen must NOT always give the same result across lives. Outcomes depend on the context of that life (people's traits, relations, abilities, who is watching, earlier choices), so players cannot learn the story by heart and always pick "the best". Reaffirms OD:L478 for EVERY story choice (main road, NPC requests, events).

[OD:L1259] - (16/11 07:15Z, s11) OWNER RULE (tutorial chapters 1–3): the new-player tutorial must still be PART OF THE STORY — narration and plot thread tie each tutorial task to what is happening in her life/road; not a detached feature tour.
[OD:L1264] - (16/11 07:25Z, s11) OWNER RULE (NPC roads for men too): NPC roads (OD:L1252) exist so far only in concept for women (consorts, maids, by identity). MEN need them too — every named male character (Emperor, princes, officials, guards, eunuchs, suitors/men of the outer court…) gets his own identity + road, with the same "her help = one hồi, varied per life" rule.
[OD:L1288] - (16/11 08:45Z, s12) OWNER RULE (co-op entry choice + value of waiting, REPLACES the 07:25Z co-op home-road line, verbatim): "Cái vấn đề lựa chọn vào cung hay là chờ 3 năm á, thì mình cũng phải cho cái giá của cái việc chờ 3 năm nó bằng với cái giá mà mình ở trong 3 năm mình làm được gì ở trong cung. Bạn hiểu không? Thì như vậy thì cái chờ 3 năm đó nó mới có giá trị. Đó. Chứ bây giờ ai cũng chọn vào cung hết, chắc chắn cái chuyện chờ 3 năm là ít ai chọn. Rồi cái vấn đề này nữa là khi mà chơi chung á, ai muốn chọn gì kệ họ, thời gian vẫn trôi như nhau thôi. Cái người nào mà chọn chờ 3 năm ở ngoài cung thì vẫn sống ngoài cung. Người nào vào cung rồi thì cứ sống ở trong cung. Nhưng mà ý của tôi nói là vào cung chung một lúc có nghĩa là vậy nè. Là cái tuyến truyện của họ đều phải cho họ cái sự lựa chọn là vào cung ngay và chờ 3 năm chung một mốc thời gian, bạn hiểu không? Chứ không phải là ngày hôm nay đó là cái người A được hỏi, rồi phải một tuần sau cái người B mới được hỏi, là không phải." → (1) "Chờ 3 năm" must be worth as much as 3 years lived in the palace (gains at home equal what 3 palace years would give), so both choices are real. (2) Co-op: both players get the "Vào cung ngay / Chờ 3 năm" choice at the SAME time point on their roads; each chooses freely; time runs the same for both; one may live in the palace while the other lives at home. No forced joint entry, no waiting for the friend.
[OD:L1289] - (16/11 09:10Z, s12) OWNER RULE (verbatim): "Rồi lưu ý nha, các nhân vật NPC phi tần á, là khi mà vào game là cũng bóc hên xui những cái thân phận này, cho nên là cũng sẽ có những cái kiếp mà tôi chơi á, là sẽ có phi tần là công chúa liên bang giống như vậy nè nha." → NPC consorts also roll their identity (origin) at game start from the same pool as the player, so in some lives an NPC consort IS a foreign princess (Nam Chiếu / Bắc Địch) with that princess art set, costume rules and road. The 3+3 princess faces per country are shared by player and NPC rolls (never the same face twice in one game).
