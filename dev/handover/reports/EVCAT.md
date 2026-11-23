# EVCAT — whole-game event catalog (report-only; FEATURE FREEZE: nothing built)
PRIORITY #1 CHECK ('EVCAT|event catalog|e68Count'): OD 1 (23/11 ~23:00Z «Nhiều sự kiện chưa?») | ledger 0 | claims 2 (this row; SELW-YARD = style model) | main 15 (e68Count at dev/build/j68.js:101, reused) | review/* 0 | archive 0.
Base: LIVE origin/main 72521d62, read-only. Worker: sonnet session_01N1tNP2GNhZTbFcgMmC9h85 (+3 counting sub-agents). START_CTX ~3 % (fresh session); no rollover needed.
Time unit: 1 turn = 1 month, 3 tuần per month, 1 year = 36 tuần. **Kiếp length is NOT measured anywhere in the repo** (natural death rolls N(45,15) clipped 15–85, start age 18–20, jmort). I use a 20-game-year kiếp (720 tuần) as the reference case and give per-year rates so MAIN can rescale; ROBOT-10 (D) will replace these with measured data. Marks: [H] exact by loading the file in a node harness, [G] exact by grep, [E] estimate (method in the cell).

## 0. Search method
1. Registry greps: `EV6(`, `ev(`, `T7(` (j72), `MF(`, `FV7`, `ARC67.<id>=`, `EVD.`, `agReg`, `PEND[`, `Q.push`, header comments of all 430 j*.js (keyword scan: event/festival/night/rare/ending/visit/trial/mini).
2. Harness (`/tmp` only, not committed): loads chosen j*.js into a node vm with a catch-all proxy and reads the top-level consts (E68, T72, ARC67, MF7, FV7, M70, EV, GE_DATA…). Loading all 430 files at once OOMs; sets of 1–8 files work. jtoil/jkc/jkc2 hang the harness → grep only.
3. Cross-checks against code headers and handover reports (night-time.md, npc-agent.md, ag-all-parity.md). Design docs RARE_ENDINGS/GRAND_ENDINGS/ROAD_MAP are not on the sparse trees; counted from code.
4. The order's old numbers are stale: ARC67 is **65 arcs** (not 36) and there are **308 more road chapters** (jrd_*), see §1.

## 1. Tables (one per family)
### 1.1 Daily/situational events
| Family | Templates | Variants / branches | Actors | No-repeat memory | Meet per kiếp (20 y) |
|---|---|---|---|---|---|
| **j68 EV6** (e68Count = 90 templates / 370 text variants) [H] | 90: day 18, visit 18, serv 12, emp 12, sea 10, court 6, rumor 6, kid 5, myst 3. 17 are life-only (cold 6, srv 4, hh 7) → 73 for a normal life | 370 = 4.1 wordings per template; **the options are the same for every wording** (s.o(X)) → 90 real decisions, 370 openings | Drawn from live roster by tie/goal (rv 23, emp 16, sv 11, rv+rv 4, kid, man, th, doc…); 9 need none | YES: per life cooldown 54 tuần per template + per-variant used-list `e.vu`; across lives `ctm-e68h` (last 6 lives, weight ×0.5 per past life seen) | Gap ≥4 tuần (BAL.ag.why.e68.gap) + visit slot gap 3 → ≤9/yr; [E] 5–8/yr → 100–160 events = every fitting template ~3–6× per kiếp |
| **j7 ev()** [H] | 32 (+1 rcpMama in jrcp) = 33 | 2–4 options each | Mostly fixed roles; rivals drawn | per life only: `S.seen`, rest 12 months. **No cross-life memory** | Gated by real state; offered via npwAsk. ≤33/yr; [E] 3–8/yr |
| **j24 visits** [G] | 9 kinds (apFriend→gossip/ally/borrow/gift, apTaunt, apSorry, empTea, thCall, svAsk, maidWarn, manPoem, svDefect) | 1–2 options each | the NPC with a reason (npc-purpose) | none (reason-driven) | ~1 per 3–4 tuần [E] ~10/yr |
| **j24 NPC harm acts** [G] | 20 act kinds in 3 bands (small 3, heavy 10, kill 7); 44 harm keys in the act layer | seen only by Tai mắt/presence | rivals by danger band | j70 chain tells, no text memory | per rival per buổi 3–5 % + band; she sees a fraction |
| **j31 light festival events** [G] | 7 (newyear, nguyentieu, thanhminh, trungthu, giaothua, phoenix, lapbat) | 2–3 options | fixed | `S.festDone` per year | superseded on days j71 fires; ≤7/yr |
| **Night chain** (j8/j75/jnf/jne/jcycle/jvisit) [G] | ~14 cards: night chain 5 scenes, nfch + nfsum, kitNightEnd (5 tiers), 2 morning-after, cyrep, vnight, thai-y bắt mạch | 2–5 options; tone by Sủng | Emperor fixed; rival/mocker drawn | per night/per month flags; none across lives | her nights 15–38/yr (night-time.md [D, measured on older base]); flip choice ≈33/yr; cyrep 12/yr |
| **Place "!" happenings** (jact/jact2/jagharm) [G] | 7 ids: emp, gossip, deed (+ rvquarrel/favour/fest/coldvisit counted elsewhere) | deed = any real NPC act | real NPCs from day plan | `S.adHap` per buổi | [E] ≤0.9/buổi offered, she sees only what she knows |
| **jroute "Lối riêng"** [G] | 8 popups, 4 routes | ~24 option labels | a real man of 9 | `S.rt` step flags | only if she picks a route; 0–12 |
| **jmen stray man** [G] | 1 card (5 options), 6 reasons | | 9 men (6 roles + 3 thị vệ) | ban 12/36 tuần | [E] 1–4/yr |
| **Pets** [G] | 22 pets, 3 prompts + 3 news + 2 deaths | | maid | `P.bad` | 0–3/yr per pet |
| **jlost / jtruth / jpoison / jgift / jweather / jtoil** [G] | jlost 6 cards (3 causes); jtruth 1+3; jpoison pgin etc.; jweather 1; jtoil 10 reactions | | rival drawn | per owner cd 6 months; toil once per host per tuần | jlost ≈0.9 cases/yr; toil ≤60/yr if she dresses daily |
| **jmort cards** [G] | birthEvent, omen, 4 widow fates, 11 accident lines | | all | p.tho | NPC deaths 0.3–0.5/yr, Emperor once per reign |

### 1.2 Chains, quests, festivals, fortune
| Family | Templates | Variants / branches | Actors | No-repeat memory | Meet per kiếp |
|---|---|---|---|---|---|
| **j70 mưu hại chains** [H] | 17 methods (poison, poison2, musk, catswap, kpoison, pond, pushp, kframe, frame, plant, bribe, block, rumor, accuse, ksab, joint, huydung) × 51 routes (2–4 each), 102 tell lines; 7 opportunities, 5 motives, 4 scar grades | each chain: motive→prep→tell→execute→aftermath, 2–3 options per step | NPC→her, NPC→NPC, her→NPC; rivals by danger | `z.types` per life; no cross-life | cap 4 live chains (2 on her); [E] 2–6 chains/yr; same route repeats after ~8 chains |
| **j71 festivals** [H] | 14 festivals (13 dated in j31 FEST; `thanhtho` undated) | **184 variants** (13–14 per festival: 117 contest, 18 rite, 14 banquet, 12 wager, 12 game, 11 gift) | present consorts; wager names fixed (4) | YES per life `vu["f:k"]` + cross-life least-seen (ctm-e68h) | 13/yr, each festival's pool lasts 13–14 years in one life |
| **j71 merit (lập công)** [H] | 14 families | **95 variants** (6–8 each) | roster by wealth | per life + cross-life | ~4/yr (merP .15, cd 9–60) |
| **j72 việc nhờ** [H] | **110** quest templates (craft 26, social 20, court 12, fam 12, pro 9, trade 9, inv 8, love 7, risk 7) + 10 NPC-asks-NPC lines | 1 text each; steps 1 (48), 2 (55), 3 (6), 4 (1); 2–3 choices per step | requester drawn by spec from live roster (doc, th, hh, rv, off, sv, emp, man:sứ thần/họa sư/nhạc sư, kid…); `fam` fixed | **once per template per life**; templates seen in last 5 lives avoided | ≤2 offers/month, cap 4 open, gap 3 tuần → [E] 4–8/yr = 80–160/kiếp > 110 templates |
| **Kỳ ngộ** (jky) [G] | 25 (ma_ 7, vat_ 6, de_ 4, th_ 4, sv_ 4) | 2 options + plain read cards | real person+object at the place | once per life per id (`z.seen`) + sổ ctm-kyngo (record only) | gate-limited (needs a real person+piece at the place), p 85 % per eligible buổi, cd 1 tuần; [E] 8–15 of 25 per kiếp |
| **World events** (jworld/jworld2) [G] | 27 kinds (10 + 17) | each opens a window that acts on everyone | calendar/death causes | `S.wwin.last/n` | cause-driven, maxOpen 2; [E] 1–2/yr |

### 1.3 Story (arcs, roads, home chapters)
| Family | Templates | Beats / options / endings | Actors | No-repeat memory | Per kiếp |
|---|---|---|---|---|---|
| **ARC67 arcs** [H] | **65** (origin 44 incl. bd 8, pf 4; shared `*` 8; stage 3; tm96 3; eg 3), 4 premises each = 260 | 451 beats, 1,099 options, 237 endings; GB67 10 complication kinds × 3 | rv/maid/emp/th/doc… per `w` slot | cross-life `ctm-arcs` (last 10 per origin) | main line ≈14 chapters (≈13 arcs); ~50–65 % of lives add tm96 |
| **Palace road chapters** (jrd_*, ARC67 o:"rd") [H] | **44 roads × 7 chapters = 308** | **2,100 beats, 6,278 options, 957 endings** | cast carried road-long, drawn from live NPCs | road avoids 10 most recent per origin (`ctm-arcs`) | exactly 1 road (8 of 14 chapters ≈ 30–40 hồi, 6–8 game years) |
| **Home chapters** (jkc3*, KCA) [H] | 9 arcs | 54 beats, 165 options, 27 endings | real maid/teachers/suitors | none | 3–4 chapters, home-start lives only |
| **Home events** (jkc/jkc2) [G] | ≈31 event cards, 13 places, 6 rare ends | fire once per life (`S.kc.ev`) | generated people | none | ≈2 game years, home-start lives only |
| **NPC women's roads** (jnroad*) [G] | same 44 roads run by NPCs; jnroadm 20 male/staff templates × 8 chapters; jnroade 4 Emperor roads; jnrask 96 + jnrask_b 120 help-asks | | NPCs | once per life per road | off-screen, shows as news/asks |
| **Rare endings** [G+H] | **101** = 47 j97 + 44 road finales + 6 KCRARE + 1 tm96c + 3 succession | p = 0.9 × (0.05–0.15) after a hidden path | | `ctm-rare97` record only (no skip) | [E] 0.15–0.4 per life |
| **Đại kết cục** (jge) [H] | **44 branches × 4 = 176 endings** (352 thiện/ác titles) | 2 ngã rẽ (4 + 3 choices) | the road she rolled | `ctm-ge`, `ctm-gech` (collection only) | exactly 1 per full-road life |
| **Succession** (j99succ) [G] | 3 paths × 3 chapters, 13 endings | | | `SUCC_BK` record | only if the Emperor dies in her life |
| **Other end types** [G] | ~43 over() call sites: death / exile / leave / throne / fail | not a catalogue | | | 1 per life |

### 1.4 Trials, mini-games, co-op, NPC acts
| Family | Count | Content pool | No-repeat memory | Per kiếp |
|---|---|---|---|---|
| **Khảo hạch tấn phong** (jexam) [G] | 1 template, 7 targets × 3 tiers, 10 engines; servant ladder 6 | procedural boards, no question bank | none on content | ≤7 (+2–5 retakes) |
| **Entry selection** (jentry) [G] | 1 round per kiếp, ~7 subjects, 3 roads × 8 origins, 3–4 intro panels per origin | procedural | none | exactly 1 |
| **Tứ đức** (jtd) [H] | 4 games | procedural | none | player-chosen |
| **Mini-games** (KG82_KIND + sg_*) [H] | **39 kinds**: festival contests, lessons (8 arts), Cùng chơi/Thách đấu, craft ×4, trò mưu ×4, steal, pastimes | pools: le 8 objects, hat 4 songs, banh 4 recipes (+5 decoys), huong 7, ve 3 paintings, hoa 4 seasons, kim 3 shapes, td_cong 3 pieces, tho 13 glyphs, tc 30 goods, xa 144 clue combos; the rest = random seed of a fixed mechanic | **none anywhere** (`Math.random`); only a first-time demo flag | player/act driven |
| **Co-op** [G] | 2 co-op-only cards (thInv 4 ask kinds, thBribe) + heir/rebirth cards; **0 co-op content pools** | everything else = solo events run on host and copied | world-level festival no-repeat shared | n/a |
| **NPC-initiated acts** (jag*) [H+D] | 27 agReg providers, ≈220 act keys (consort ≈169, servant 39, hh 6, th 3, emp 3); 7 greeting kinds reach her; ≈45–50 agents + 9 men + ministers | | | ≈6,500 planned slots/yr, few visible (Tai mắt gate) |

### 1.5 Grand total
- **Situation templates (distinct decisions/chains/chapters/quests/fortunes/festivals): ≈ 940.** Non-story ≈ 390 (j68 90 + j7 33 + j24 9 + j70 51 routes + j71 28 + j31 7 + j72 120 + Kỳ ngộ 25 + world 27) + story ≈ 413 (ARC67 65 + road chapters 308 + KCA 9 + jkc 31) + ≈ 40 misc cards (night, happenings, pets, loss, mort, route, stray man).
- **Beats/options inside story** 2,605 beats · 7,542 options · 1,221 arc endings; plus 176 grand + 101 rare + 13 succession ids.
- **Wordings / variants:** j68 370, j71 279 (184+95), j72 110, j7 33 → ≈ 800 openings for ≈ 330 non-story decisions (≈ 2.4 per decision).
- **Mini-game kinds 39, content items < 400 in total, no memory.**
- Honest reading: the **story spine is very large (≈2,600 beats) and well protected** (one of 44 roads, avoid last 10). The **everyday layer (≈330 decisions) is the part she re-meets**, because one kiếp serves ≈150–300 of them.

## 2. WHERE IT IS THIN (re-met within 1–3 kiếp)
| Rank | Family | Why | Evidence |
|---|---|---|---|
| 1 | **Mini-game boards** (39 kinds) | pools of 3–8 items (hoa 4, banh 4, ve 3, td_cong 3, le 8, huong 7, hat 4 songs); random draw, no memory → same recipe/painting/song several times per sitting; festival contests (≈8/yr) reuse them | no `Math.random` guard anywhere; only demo flag |
| 2 | **j7 ev() 33** | only 33; rest 12 months per life; **no cross-life memory**; she sees the same intrigue (doll, ghost, comet, flood…) each kiếp | `S.seen` per life only |
| 3 | **j72 việc nhờ 110** | one text per template, 48 are 1-step; 80–160 offers/kiếp vs 110 pool, last-5-lives avoidance shrinks the pool → repeats by kiếp 2–3 | q72 header + T72 [H] |
| 4 | **j68 wordings** | 90 decisions × 4.1 wordings; same options per wording; 54-tuần cooldown → a template returns every 1.5–3 y, wordings run out after ~4 visits (≈6–10 y). 17 of 90 only in cold/servant/hh lives | E68 [H] |
| 5 | **Origin roads** | 4 roads per origin; avoids last 10 → every road of one origin seen by kiếp 4–5 of that origin | `choose67` + hist 10 |
| 6 | **Festivals** | 13–14 variants per festival; one life of 14+ years exhausts them; cross-life picks least-seen but pool is the same 13 | FV7 [H] |
| 7 | **Kỳ ngộ 25, world 27, j70 51 routes** | once per life each (Kỳ ngộ) → 8–15 of 25 seen per kiếp, same 25 each time; j70 same route repeats after ~8 chains | |
| – | Not thin | story (2,600 beats), grand endings (176), j71 merit, night/place (reason-driven) | |
Also: **no event has an authored «never see it twice across lives» guarantee except j68/j71/j72**; j7, j70, Kỳ ngộ, world, mini-games have no cross-life memory.

## 3. Content proposal (PROPOSAL ONLY — law 18 FEATURE FREEZE; nothing built; park for Foreman E)
Model = the new selection-scene pools (SELW-YARD yard.md: composable seeds, roles by nết, a real object (law 6c), 4 stances of equal gain/loss steps (laws 2–3), tone/tier, `needs`), plus **one shared no-repeat memory** (generalise `ctm-e68h`: key `family:seed`, last 6 lives, weight ×0.5 per life seen) used by every family below. Numbers always from BAL (law 4); words per VANPHONG (law 7).
| # | Pool | Today → target | Composition (parts) | No-repeat |
|---|---|---|---|---|
| P1 | **Mini-game content, per test type** (hoa, banh, ve, huong, kim, td_cong, le, hat, tho + 30 more) | 3–8 → **≥40 items per type** (≈12 types ≥40 = ≥480 items) | boards composed from parts (motif × palette × rule × decoy set; recipe = base × 2 extras × a story line; song = phrase pool) | per-type seen-list, seed draw avoids last 6 lives |
| P2 | **j7 intrigue seeds** | 33 → **≥60 composable** | incident × actor (nết) × object × place × 4 stances | cross-life memory (new) |
| P3 | **j72 favours** | 110 single-text → **≥60 composed favour seeds per kind** for the 4 biggest kinds (craft, social, court, fam = ≥240) while keeping the 110 | requester (by nết/need) × object × obstacle × twist; steps 1–3 | once per life + last 5 lives (kept) |
| P4 | **j68 openings** | 370 wordings over 90 decisions → **≥60 composable seeds for each of 4 large families** (day, visit, serv, emp) and ≥40 for the other 5; options stay equal-value | opener (≥12) × complication (≥10) × stance set | variant memory (kept) at seed level |
| P5 | **Kỳ ngộ** | 25 → **≥60** | person kind × piece kind × place × tone (DEF rows split into parts) | once per life (kept) + cross-life |
| P6 | **World events + j70 routes** | 27 + 51 → ≥40 world windows, ≥60 tells/routes | cause × scope × reaction; method × route × tell | cross-life memory |
| P7 | **Festivals** | 13–14 per festival → **≥40 per festival (composed: stage × rival × prize × complication)** | | per life + cross-life (kept) |
| P8 | **Origin roads** | 4 per origin → 8 per origin (compose chapter .5–.11 from shared parts) | | avoid last 10 (kept) |
Order of value (my recommendation): P1 and P2 first (cheapest, thinnest, no memory today), then P3/P4, then P5–P8.
**Gain vs risk (one line each):** P1 gain large (kills the most visible repeat), risk small (sparse art needs only procedural parts, fixable by data). P2/P3/P4 gain large; risk medium: a composed line can contradict real state (law 6) — detect with the existing grounding gate (j68h) + a seed validator like the yard build check. All = **Gain larger than loss**, but it is **parked work** until the freeze lifts.
Not duplicated: ROBOT-10 metric 12 (measured variety) is Foreman D's; this file is the static catalog it should be compared against (sum of §1 keys).

## 4. Caveats
- Frequencies are estimates except where marked [D]; no kiếp-length data exists yet → use per-year columns.
- jtd/jpma/jts cooldowns not verified; jkc/jkc2/jtoil counted by grep only; jkc2 rare ends not counted; 17 life-only j68 templates are cold/servant/hh only.
- Variant counts are static text; dynamic lines (trait voices jtone, season pictures) are not enumerated, so real wording count is higher.
## 5. Handover (rollover)
Report-only worker; context far below the 25 % threshold; no successor needed. Sub-agents: 3 counters (all finished).
