# NPC AGENTS — every NPC plays the game like a player (audit + design, REPORT ONLY)

Analyst: child of main s20 (opus), no game code changed. START_CTX ≈ 3 % of the window (get_session reads 0; own estimate), end ≈ 12 %. No rollover.
Law audited against: people-life.md [OD:L1386] (16/11 17:50Z) + OD 17:15Z (maid nights, "no invented %") + OD 15:05Z (3) (seats full → unranked mother, low-born child) + HANDOVER:L46 (two-way equal rules) + OD:L1248 (no AI-best choice) + OD:L35 (every act has a motive from real state) + OD:L1267 (ONE CORE / BAL) + OD 15:05Z (4) (lag = first priority).
Code read: origin/main @fb367740 (dev/build/j*.js sources, not the assembled all4x.js), review/people-ledger @e0aef4d0 (j95/j95b/j95c, contains schedules3-r4 fixes), review/schedules3-r5 @51f9364b (same j95 files, reviewer branch), review/npc-mind @7fd289cd (jmind, report npc-mind.md). Line numbers are main unless a branch is named.

## 0. Answer in six lines
1. The game already has most of the pieces of an agent: NPCs use the player's ACT table (j8 runAct), a social menu (j28 SOC), the player's Sủng deck acts (j75 npcEffort), the same night grading (j75 rivalNight), the same promotion rules (j8 promoteP), a per-khắc place record with habits and weekly intentions (j95, branch), and trait/strength/virtue weights with human slips (jmind, branch).
2. What is NOT agent-like: **when** an NPC acts and **whether it works** are mostly flat dice per week/month (inventory §1: 27 sites), the Emperor has no needs and no memory of people beyond `sung`, servants/maids have no road and no actions that reach him, and the outcome of "reaching the Emperor" is a separate invented chance in four places (sendMaid 3 %+30 %, srvRise via S.nt, staff maid eye BAL.mline.eye, flip 90 %/65 %).
3. Design (§3): ONE loop, once per buổi, host-only: each person (consort, maid, eunuch, Emperor, Thái hậu) picks ONE act from the SAME act list the player sees in that role, by utility = need × odds × mindW (traits/strength/virtue) × road weight, with the jmind 12 % slip. Results use the player's odds formulas. No new bar.
4. The Emperor is an agent whose night choice = weighted pick over **everyone he has met this tuần** (consorts AND maids who served him), weight from the existing per-person `sung` (Ân sủng) + `an` + his traits/mood/needs. S.nt "Hoàng thượng để ý" is the same fact as `sung` → fold it into `sung` (one fact one place).
5. Perf: ~50 agents × 1 pick per buổi ≈ 50 × ~25 option checks ≈ 1–3 ms per buổi on a phone (estimate, §4); budget 8 ms; host-only in co-op (already the pattern: jcoopworld, mlGuest, j95gate).
6. Recommendation (§5): Foreman C does it in 6 worker items on top of review/people-ledger, the first one (AG1 agent core + Emperor agent + maid nights) replaces the four night/maid shortcuts at once. **Được lớn hơn.**

## 1. Inventory: NPC outcomes made by a flat roll, an invented gate or a shortcut
Legend: **ROLL** = flat % not driven by the person's state; **GATE** = invented bar/threshold/frequency only NPCs have; **SHORT** = outcome written directly instead of the NPC doing the player's act. "Under the law" = which player act/rule the NPC should use and what drives the choice.

### 1a. Nights, the Emperor, maids (the owner's example)
| # | site (main) | what it does today | kind | under the law |
|---|---|---|---|---|
| 1 | j8.js:486 `flip()` | 90 % a card is turned, 65 % with Chăm chính; else no night | ROLL | The Emperor agent decides at buổi tối: his needs (rest after a heavy court day, mood, illness j13:27) vs desire (affinity to the people he met). "No night" = he chose rest/memorials, with the reason shown in nightWhy. |
| 2 | j8.js:487 weights `nightCh` (j8:39 + wrappers j35/j75/jcycle/jemo/jgift/jroute) | weighted pick over consorts on the tray | OK (weighted by state) but **consorts only** | Keep the weights; extend the candidate set to anyone he met/was served by this tuần (maids who served tea, poured wine, did an errand where he was). Same formula (`sung`, Sắc, arts, his traits). |
| 3 | j8.js:489 NPC steal | any NPC with hostility ≥ 50: flat `roll(6)`, then 50/50 feign/road | ROLL+GATE | The rival agent chooses the player act "Tranh sủng" / "Chặn ngự giá" (j8:126-127, same cost Đức −4 / Sức −5, same `oSteal`) when tonight's card is a foe and her need for Sủng is high; mindW(scheme) + slip. jmind already weights WHO (npc-mind table j8:489); the 6 % must go. |
| 4 | j55.js:96 | court trouble (bien or kho < 30): `roll(30)` cancels the night | ROLL | Emperor agent need "state affairs" rises when the court is troubled → he picks memorials/court instead of a night by his own utility; Chăm chính weighs it more. |
| 5 | j75.js:131,193 FAIRN.custom [40,20] | mùng 1 = 40 %, rằm = 20 % the Empress takes the night | ROLL | Custom (lệ) is a DUTY of the Emperor agent: on mùng 1 / rằm the duty "visit Khôn Ninh" carries a strong weight; a Đa tình / Mê sắc emperor or a cold relation with the Empress (her `sung`, `an`) can break it, and breaking it costs him with Thái hậu (her regard) like any player breaking etiquette. Numbers in BAL. |
| 6 | j8.js:294 rivalNight `roll(3)` → sendMaid | 3 % of NPC nights the consort's maid serves instead | ROLL+SHORT | The consort agent picks the player's own option "Tiến cử <maid> hầu thay" (j8:255) when her need says so (pregnant soon / ill / cycle tuần / wants an ally in his bed); the maid then serves → a normal night for the maid (see 7). |
| 7 | j8.js:295 sendMaid `rise=roll(30)` | 30 % the maid becomes rank 0, else "thả ra cung với chút bạc"; new rival gets a **fresh name and face** (identity lost; j88 f88Carry patches only staff maids) | ROLL+SHORT | A maid's night = the same `nightFx`/`night()` as anyone (Sủng/Ân gain, conception by `conceiveCh`). Rank only through the normal path (promoteP / seat / exam, OD 07:20Z). Seats full → she stays a maid, "đã được sủng hạnh" (unranked mother), child low-born (OD 15:05Z (3)). Same person object carries over (no new face). |
| 8 | j42.js:200 `roll(1.2+S.nt/25)` monthly | player maid: monthly dice "Hoàng thượng để mắt" | ROLL | Delete. He remembers her only through acts she did (tea, errands, feast) that raised his `sung` toward her; she enters his night pool like anyone (row 2). |
| 9 | j42.js:131-133 `srvNotice` + S.nt ≥ 45 → `roll(S.nt/2-10)` → cnvName | player maid: separate bar S.nt + 45 gate + "hỏi tên" | GATE (player-only bar) | S.nt is the Emperor→her relation = `sung` (§3.4). The acts stay (Quỳ dâng trà j42:113, errand j42:127, Hầu trà khi ngự giá j42:163, Rót rượu j42:291) but raise `sung` with the same od() they use today. "Hỏi tên" becomes a scene inside a night or a summons, not a gate. |
| 10 | j42.js:295 `srvRise` | sets rank 0 at once, no seat check, no child | SHORT | Through the normal rank path; seats full → unranked favoured maid (row 7). |
| 11 | jmline.js mlEye (called j14.js:37), BAL.mline.eye [.1,.25,.6,1,1.2] %/month × seekMul 3 × (1+master Sủng/100×.5) | NPC staff maid becomes consort by a monthly chance | ROLL+GATE | The maid agent's own acts ("seek" = serve tea / stand where he passes, already modelled by mlSeek) raise HIS `sung` toward her through the same od() as the player maid; he picks her by the night pool. mlSeek's trait drive (seekTr) and master reactions (punish/use) are good agent pieces: keep them, drop the eye roll. |
| 12 | j8.js:255 player's "Tiến cử" preview `chanceW(30)` | shows the invented 30 % | (text of 7) | Preview shows the real night chance of the maid on the tray and the seat state. |

### 1b. Favour, regard, skills: monthly stat drips
| # | site | today | kind | under the law |
|---|---|---|---|---|
| 13 | j8.js:393 rivalsTurn | every NPC Sủng random walk `R(3)-1` per tuần | ROLL | Remove; j75 already adds the player's −1/tuần decay (j75 rt0 wrapper). Sủng moves only by acts and nights. |
| 14 | j8.js:380 npcMonthly `roll(30)&&roll(odA(v,55+sung/5+mm()))` → Sủng +3 (j75 turns it into "quiet favour" costing 10 bạc) | Sủng drip | ROLL | Fold into the agent pick: the player deck acts (dâng canh, thơ, túi thơm, đàn, múa, cờ: j2.js:53-56,132-133; j75 npcEffort list) are options; chosen by need (low Sủng) × odds. |
| 15 | j75.js npcEffort `EFF` per trait .1–.35 per tuần | how OFTEN an NPC works for Sủng = flat trait frequency | GATE | Frequency comes from the agent budget (one act per buổi like her khắc) and from need, not a trait %; trait stays as mindW. |
| 16 | j8.js:381 `roll(25)&&roll(odA(v,75))` → Thái hậu +4 | regard drip | ROLL | Player act "Thỉnh an / hầu Thái hậu" (and SOC.serveTH j28:93) chosen by need (TH regard low, road "Cháu gái Thái hậu" etc). |
| 17 | j8.js:382 `roll(20)&&roll(odA(v,70))` → Hoàng hậu +4 | regard drip | ROLL | Player act "Thỉnh an Hoàng hậu" (greet, j95 ACT95.greet) by need. |
| 18 | j8.js:376 `roll(30)` art practice | skill drip | ROLL | Player study acts (Tài nghệ › Tự học / Học với thầy) chosen by road (an art-road consort practises her strength; jmind mindStr). |
| 19 | j8.js:377 `roll(25)` shop buy, :379 `roll(15)` gift item to emp/th, :383 `roll(10)` ally gift, :384 `roll(10)` give rival item | item drips | ROLL | Player acts "Mua ở Nội vụ phủ", "Tặng quà" (j2.js:144) by need (wants favour of X) and money. |
| 20 | j8.js:394 `roll(33)` rel −1 toward her when her Sủng is close; `roll(50)` Empress rel −1 | relation drip | ROLL | Jealousy already has a stat (ghen). Remove the drip; relation moves by deeds and seen nights (ghenAll, j8:270). |
| 21 | j28.js:104 npcSocial: `roll(60)` per tuần, target = **uniform** `pick(T)` (jmind makes it weighted, branch) | frequency gate + random target | GATE | Same agent pick; the social deeds are just more options in the list. |
| 22 | j8.js:398-399 harm acts: `Math.random()<want*.04` | frequency of schemes | GATE | Same agent pick: harm acts are options only inside the motive gate (danger band j28:60, motiveOK j95:82 branch); utility = need (rival blocks her road) × odds × mindW; no separate 4 %. |
| 23 | j8.js:388-389 fake illness `roll(3)`, fake pregnancy `roll(2)` | flat schemes | ROLL | Player acts "Giả bệnh" / "Giả mang thai" (j2.js:50, Tâm cơ ≥ 50) by need (no son, low Sủng). |

### 1c. Ranks, seats, servants, others
| # | site | today | kind | under the law |
|---|---|---|---|---|
| 24 | j8.js:416 `promoteP(v)` monthly | same rules as hers | OK | keep (it is the "normal seat rule"). |
| 25 | j8.js:405 vacant seat `roll(12)` weekly + seatW | Emperor picks the Empress by a weekly dice | ROLL (timing) | Emperor agent duty "fill the seat" grows with months vacant (Thái hậu presses) → he decides; seatW stays as his weights. (j34 contest already replaces this when on: j34.js:53.) |
| 26 | j8.js:411 `R(12)===0` new tú nữ; :401 Empress dies `R(480)` | world events | ROLL | Tuyển tú = Emperor/Thái hậu agent decision when the harem is small (j55 already does it by court houses, j55.js:109). Illness deaths belong to the mortality domain, not this audit. |
| 27 | j14.js:38 `roll(1.5)` a richer consort buys your maid | flat | ROLL | Consort agent act "Mua người" (bribeServ j10) by need for a skilled maid. |
| 28 | j42.js:201 `roll(1.5)` same for the player maid | flat | ROLL | same act as 27. |
| 29 | j42.js:203-204 master finds her spy/betrayal `roll(25 or 8/10)`, then `roll(30)` death | flat | ROLL | Master agent's "Tra xét cung nữ" act (j14.js:41 searchMaids is the player's version) by her suspicion (Đa nghi, losses). |
| 30 | jroute.js (40 rolls), j10 (27), j13 (22), j55 (23), jcycle (7) | route events, factions, illness, court, cycle | mixed | Not line-audited here (illness/cycle are body rules, not choices). Worker AG6 scans them with the same legend. |

Count: 27 sites in 1a–1c are ROLL/GATE/SHORT; 2 are OK.

## 2. What already exists for agents, and the gap
| piece | where | agent part it gives | gap to "plays like a player each buổi" |
|---|---|---|---|
| ACT table + runAct | j8.js:100-140 (A(...) entries), NPC use j28.js:60 npcAct | NPC harm acts = the player's acts, same costs/odds | chosen only through the 4 % frequency gate (#22); only harm acts |
| SOC social menu | j28.js:72-95 | ~20 non-harm deeds, weighted by persW (traits) | 60 % weekly gate, effects written directly (e.g. steal +2/−2 instead of stealNight; serveTH +2) instead of calling the player's act |
| npcEffort (Sủng work) | j75.js npcEffort | the player's deck acts with her odds shapes | trait frequency gate (#15); only 4 acts |
| rivalNight graded like hers | j75.js rivalNight | same prep/talk/mood/luck | still triggered only by flip; maids never get one |
| Promotion, seat, exam | j8.js promoteP:339, j34 contest, jexam/jkc | same rules for all | fine |
| People ledger + schedules (D29) | review/people-ledger j95.js (habits §1, motive gate §2, weekly intent §4 incl. `seekemp` "tranh sủng", Emperor plan j95planEmp), j95b roles/gates, j95c | WHERE each person is each khắc and WHY; motive gate; intentions incl. seeking the Emperor | intentions are placement only: `seekemp` puts a consort in the garden but nothing happens to her Sủng; no act choice per buổi; Emperor's day is weights per place, no needs |
| npc-mind | review/npc-mind jmind.js | every person has nết, trọng, sở trường, thích, ghét; mindW + mindPick with 12 % slip (OD:L1248) | used for WHICH target/act among a few sites; not a general chooser |
| maid line | main jmline.js | maid seeking by trait, master reactions, maid feuds | the outcome is the eye roll (#11) |
| two-way rules | HANDOVER:L46, act-audit | same odds both ways | broken by #1-23 (NPCs get dice the player does not) |
| Emperor | j1.js:34 ETRAITS (9 traits), mkEmp j1.js:135 (age, mood, likes, known), j12 weather→mood, j13:27 illness, per-person `sung`/`an` on each consort | traits, mood, likes | no needs, no duties as weights, no memory of maids, no own choice except flip weights |
| Origins / roads | j1.js:14 ORIGINS (8) + maid road j42 = 9 thân phận (OD 17:15Z) | the player's road | **NPC rivals have no origin/road field** (newRival j1.js:132 has trait only) → nothing drives a road choice |

## 3. Design
### 3.1 The agent loop (one, shared)
- Tick: once per buổi (4 per played day), in endBuoi on the host, after j95 builds the buổi plan (so place is known; acts need the person to be where the act happens, same as the player's place rule).
- Budget: the player has khắc (4 per buổi) and acts cost khắc; an NPC gets the same budget, but for perf and readability it spends it as ONE chosen act per buổi of cost ≤ its khắc (the rest is its schedule activity from j95). Equal rule: no NPC act costs less than hers.
- Options: `agOpts(p)` = the player act list for p's ROLE at p's place: consort → deck acts (j2) + person-card acts (j2.js:144-147) + ACT harm (j8) + SOC; maid → srvCards (j42) incl. dâng trà/errand/feast; eunuch → its srv list; Emperor → §3.2; Thái hậu → greet/receive/judge/admonish. Each option already has cost, od()/odA() odds and effects. Gate: `a.ok(p,t)` + motiveOK (j95) + danger band (j28) — unchanged.
- Choice: utility = Σ need gaps it closes × odds × mindW(p,tag) (jmind) × road weight; pick by mindPick (12 % slip). No argmax.
- Needs (from stats she already has, no new bar): Sủng (favour), Bạc, Sức, safety (danger(v,S/x)), Thái hậu / Hoàng hậu regard (`th`, `hh`), kids (sons), rank goal (promoReqP gaps), servant: Chủ tin/lòng. A need is "the gap to what this person's road wants".
- Road (new DATA field, not a bar): `p.road` = one of the 9 thân phận keys for women (j1 ORIGINS k + "cn" maid). It sets goal weights (e.g. "tt" Tể tướng daughter → rank/Empress; "ch" cháu Thái hậu → TH regard + rank; "thd" thầy đồ → arts/Danh; maid → master's trust, then the Emperor's notice, or a good marriage out). Seed at newRival / maid creation from the same table, saved, lazy-filled for old saves.
- Result: the act's own effect function, the same that runs when she taps it; text through seenNPC/newsAdd (truth rule).

### 3.2 The Emperor as an agent
- State he already has: traits (2 of 9), mood 0–3, age, illness, likes (flower/music/dish), dislikes (jdis), per-person `sung` (Ân sủng) and `an` (Ân tình).
- Needs (derived each buổi, not stored bars): rest (court load: j55 T.bien/T.kho, busy week j95 `empWk.busy`), state duty (Chăm chính ×), desire/company (Đa tình, Mê sắc ×), heirs (sons alive; Thái hậu pressure), harmony (độc sủng admonition j75 monopoly is his "harmony" need).
- Day: j95planEmp already places him (Ngự thư phòng / Dưỡng Hòa điện / garden) by weights → keep; every person whose act touches him this tuần is added to `S.emp.met[id]` with the act (tea, errand, feast, night). That list is his memory.
- Night (buổi tối): utility per option: "rest / memorials" (rest + duty needs), "custom" (mùng 1/rằm → Empress; duty weight from BAL, breaking it costs TH regard), and one option per person in `met` ∪ the tray, weight = the existing nightCh terms (sung, Sắc, arts × his traits, mood) + recent act bonus. Pick by mindPick (he is human too, OD:L1248). Steals (#3) happen before he settles, as now.
- Maids enter his pool only through `met` (they DID something near him), so a maid night is always the result of her acts or her mistress's "Tiến cử" — the owner's 17:15Z rule.

### 3.3 Maid night → child → rank (OD 15:05Z (3), 07:20Z)
- Maid night = nightFx/rivalNight path, `night()` conception with the same conceiveCh (giuBlocked applies: low rank → "Giữ hay không giữ", j8:258).
- After: if `roomFor("consort")` (j17.js:53) the maid is a candidate for rank 0 through the normal promotion review (promoteP at month end; Thái hậu/Hoàng hậu regard as today). The same person object becomes the consort (no fresh face; reuse f88Carry j88.js:74).
- Seats full: she keeps her servant role with flag `favoured:true` (Kính sự phòng ledger fact, j95 roster acts); a child is `low:true` (low-born: lower kvOrder heir weight, smaller allowance); when a seat frees, she is in the next promotion review like everyone. Death/abuse risk from a jealous mistress = the mistress agent's harm acts (no extra 25 % line as in cnvName j42:275).
- Player maid uses exactly this path (she taps the acts; the Emperor agent chooses).

### 3.4 S.nt folds into `sung` (ONE CORE, one fact one place)
- S.nt ("Hoàng thượng để ý", j42.js:10) = the Emperor's regard for her while she is a maid; `S.sung` is the Emperor's regard for her as a consort, and srvRise already converts nt → sung (j42.js:295 `S.sung=15+nt/5`). Two numbers for one relation.
- Fold: maids carry `sung` from day one (0 at start); srvNotice adds to `sung`; HX/HXN label for a maid reads "Ân sủng"; the 45 gate and the cnvName dice go. Save migration: `S.sung=max(S.sung, S.nt)` once, delete S.nt. NPC maids get `sung` too (staff objects), so the night pool reads one value for everyone.

## 4. Perf (owner first priority: no lag, co-op too)
- Estimate per buổi (host): ~12 consorts + Emperor + Thái hậu + ~30 servants/elders ≈ 45–50 agents. Options per agent after `ok()` filter: consort ~25, maid ~8, Emperor ~15 (rest/custom + pool ≤ 15). Each option = a few multiplies + one odA() call → ~1 µs desktop, ~5 µs phone. 50 × 25 × 5 µs ≈ **6 ms phone worst case, ~1 ms desktop**; the act effect itself only for the chosen one (50 runs, most are stat adds). Comparable data point: j95final 0.003–0.10 ms per call (review-schedules3-r3.md:29).
- Budget: ≤ 8 ms per buổi on the Fold (it runs at the buổi transition, which already animates ~1 s, jbuoi; work runs before the animation, never during).
- Keep cheap: (1) servants who are not on duty near anyone (off-shift, not seeking) run a 1-option "routine" (their j95 activity) and skip scoring; (2) cache needs once per buổi per agent; (3) no DOM, text only into the news list (newsAdd) — render once; (4) a counter `window.__agN` + time `__agMs` for the bot, and the perf check fails the build if p95 > 8 ms.
- Co-op: the loop is world agency → host only, guest mutes it (same as rivalsTurn/rivalsMonth in jcoopworld and `mlGuest()` in jmline). Only state goes over the wire (OD perf rule PREAMBLE:L12). j95's record is today single-player only (j95on() false in co-op, j95.js:28) → the agent loop must not depend on the record in co-op: use `whereOf` fallback (j95gate already stays on in co-op).

## 5. Work order for Foreman C (owner of schedules + people-ledger)
Base: review/people-ledger (has j95 + schedules3-r4 fixes) + review/npc-mind (jmind) merged in, once both PASS. Every number in BAL.ag (jbal2.js), measured by bot; no typed numbers in text (OD:L1267). Each item: old save loads, 0 page errors, Fold/iPad shots only if text changes, perf counter reported.

| item | scope | replaces (§1 rows) | size |
|---|---|---|---|
| AG1 agent core | `agTick()` per buổi, host-only; needs, road field (`p.road`, seeded from ORIGINS + maid), utility × mindW × mindPick; options = existing act lists; perf counters | framework only | 1 opus worker |
| AG2 Emperor agent + nights | `S.emp.met` memory, needs, night choice incl. rest/custom/pool; flip() becomes his choice; nightWhy shows his reason | 1, 2 (pool), 4, 5, 25 | 1 opus |
| AG3 maids reach him | maid options (dâng trà, errand, feast, hầu trà khi ngự giá) for NPC maids; Tiến cử as consort option; maid night → child → normal rank / unranked favoured mother / low-born child; S.nt → `sung` migration | 3, 6–12 | 1 opus (after AG2) |
| AG4 consorts work by acts | npcEffort, quiet favour, TH/HH regard, art practice, shop/gifts, fake ill/preg as agent options; remove drips | 13–19, 23 | 1 opus |
| AG5 social + schemes in the loop | SOC and ACT harm through the agent pick; SOC effects call the player's act functions (steal → stealNight); remove 60 % / 4 % gates | 20–22 | 1 opus |
| AG6 sweep | servants buying/searching (27–29), jroute/j10/j55 NPC rolls (30) with the same legend; bot run: HH reach, early death, NPC births (D57), nights/yr vs night-time.md table | 26–30 | 1 opus + reviewer |

Gain vs risk (one recommendation: do AG1→AG2→AG3 first as one train, then AG4–AG6):
| risk | likelihood | severity | how detected / fixed |
|---|---|---|---|
| Balance shift (HH reach, births, early death move) when drips become choices | dễ xảy ra | vừa | bot sens 40 + night-time bot before/after; BAL.ag knobs; same seeds |
| Lag on the Fold at buổi change | có thể | lớn (owner first priority) | `__agMs` p95 in the perf check, fail > 8 ms; servant routine shortcut |
| Co-op desync (guest runs agency) | hiếm | lớn | host-only guard like mlGuest; coop test that guest never calls agTick |
| Conflicts with D13 spread-events (Foreman B builds on the ledger) and C's j95 | có thể | vừa | build on review/people-ledger tip; additive hooks only; rebase before review |
| Feels random to the player ("why did she do that?") | có thể | nhỏ | every NPC act carries `why` (j95 actLog) shown via tai mắt / nightWhy |
| Old saves (S.nt, no road) | hiếm | nhỏ | lazy normAll fill + migration test |
Gain: the game's core law holds ("50 people playing"), four separate maid/night shortcuts become one path, S.nt duplicate goes, NPC behaviour becomes explainable (every act has a need + reason), and future features add an act once for everyone. **Được lớn hơn** — the main risks are measurable (bot, perf counter) and reversible by BAL knobs.

## 6. Questions for the owner (one at a time, in this order)
1. Road for NPC women: should each NPC consort get one of the 8 noble origins at random (like the player's choices), or should some NPC consorts start as maids who rose (the 9th road), so the harem always shows one or two maid-born consorts?
   - (1) random among the 8, maids only by playing (recommended)  (2) always 1–2 maid-born at start  (3) other
2. When the Emperor breaks the mùng 1 / rằm custom (goes to someone other than the Empress), should Thái hậu always learn of it (and her regard for that person drop), or only when tai mắt / Kính sự phòng tell?
3. A favoured maid with no seat and a child: may she raise the child herself, or is the child given to a higher consort to raise (Qing practice, history-maid-nights.md §1.1)?
