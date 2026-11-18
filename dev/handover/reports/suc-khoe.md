# Sức khỏe + postpartum + preterm/overdue + miscarriage causes + "born early = not his child?" — analyst report (REPORT ONLY, no game code)

Analyst session_01UV1Szi7v8PddXTW8k42Jd1 for MAIN s21. START_CTX ≈ 3 % (get_session read 0; own estimate). Base: origin/main 2026-11-16 17:04Z, plus origin/review/preg-rate (D57) for the birth targets.
Owner lines covered: OD 16/11 18:45Z (Sức khỏe = speed of Sức regen), 19:10Z (preterm + overdue), 19:15Z (miscarriage reacts to weather / travel / work / low Sức), 19:20Z (preterm → paternity scheme), 19:25Z (drop-of-blood test, reuse jroute.js:301). Laws applied: OD:L1386 (NPCs = agents, same rules), OD:L1143 (care helps a little, hard ceiling), OD:L1267 (every number in BAL), OD:L1327 (history first), priority rule #1 (git grep first).

---

## PART 1 — History and drama check (short)

**Recovery after birth (ở cữ / zuo yuezi).**
- Chinese and Vietnamese custom: about one month of confinement after a birth (zuo yuezi "sitting the month"; Vietnamese ở cữ, often 1–3 months in well-off homes): stay indoors, no wind or cold water, warm tonics, no work. The idea is that a birth drains the body and an unfinished confinement leaves lasting weakness ("bệnh hậu sản" in Vietnamese folk medicine). So: **the loss is partly temporary (heals with rest) and partly lasting (repeated births wear the body down).**
- Imperial consorts did **not** nurse. Wet nurses fed the child from birth (Ming already had a large wet-nurse office; Qing kept the system all through the dynasty). Without nursing, a mother can conceive again soon after. Real court gaps between births were therefore short. Example: Consort Ling (later Empress Xiaoyichun, Qianlong) had 6 children in about 10 years (1756–1766, ages ~29–39), then died at 47 (1775).
- Court physicians (Thái y viện / Taiyiyuan; Nguyễn: Thái y viện too) took routine pulse checks, wrote case records (mạch án) and prescribed postpartum tonics. The game already has this: jthaiy pulse visits and the mạch án.

**Preterm and overdue.**
- Folk medicine says "七活八不活" (born at 7 months lives, at 8 months dies). Medically that is wrong, but it shows people knew early babies often died. Before modern care, a baby born about 2 months early mostly died, and one born about 1 month early often lived.
- Overdue births were known. Legends made very long pregnancies a sign of a sage: Lady Gouyi (Han Wudi) carried 14 months, "like Yao's mother", and the emperor named her palace gate after it. Overdue is a good chance for **omen talk** (a sign from heaven or a bad omen), and real risk to mother and child goes up a little.

**Dates as evidence.**
- The Kính sự phòng / Jingshifang record of who served the Emperor each night was used to check that a pregnancy matched a recorded night. In dramas this is the classic trap: in *Empresses in the Palace* (Hậu cung Chân Hoàn truyện), doubts about when the twins were conceived lead to the **drop-of-blood test** (滴血验亲), with the water rigged (alum: every drop mixes; oil: no drop mixes). The game already has exactly this (jroute.js:301 TRÍCH HUYẾT NGHIỆM THÂN). An early or late birth that does not match the book is the natural reason for rivals to demand it.

**Miscarriage causes in custom.** Pregnant women were told to rest, avoid falls, heavy lifting, long walks and cold or rain, and to take "an thai" (calm-the-fetus) tonics. This matches the owner's idea (19:15Z).

Sources: [Empress Xiaoyichun (Wikipedia)](https://en.wikipedia.org/wiki/Empress_Xiaoyichun) · [historyofroyalwomen: Empress Xiaoyichun](https://historyofroyalwomen.com/empress-xiaoyichun/empress-xiaoyichun-the-third-empress-of-the-qianlong-emperor-and-mother-of-the-jiaqing-emperor) · [Lady Gouyi (Wikipedia)](https://en.wikipedia.org/wiki/Lady_Gouyi) · [Emperor Zhao of Han (Wikipedia)](https://en.wikipedia.org/wiki/Emperor_Zhao_of_Han) · [SCMP: China's imperial wet nurses](https://www.scmp.com/magazines/post-magazine/short-reads/article/3091590/chinas-imperial-wet-nurses-how-these-mothers) · [SCMP: Life inside the Forbidden City](https://multimedia.scmp.com/culture/article/2154046/forbidden-city/life/chapter_01.html) · [Imperial Chinese harem system (Wikipedia)](https://wikipedia.com/wiki/Imperial_Chinese_harem_system). The confinement, folk-saying and drama points are general knowledge, not taken from these pages.

**What this means for the design:** (1) a birth costs health: a large part heals with a proper ở cữ, and a small part stays; (2) closely spaced births and age wear the body down; (3) physicians and tonics help only up to a limit; (4) early or late births are rare, risky for the baby, and they make the dates disagree with the book, which is a ready-made scheme.

---

## PART 2 — What already exists (git grep origin/main + review/*)

| Topic | Code today | Note |
|---|---|---|
| Sức regen per tuần | `j76sleep` (j76.js:119): 14, +6 when Sức<30, +4 with her own thái y, 8 in harsh weather; plus j3.js:90 +4 (+1 harsh). NPCs the same. | j80 `sleepRegen` and jkc:290 are NOT in the assemble list (dead or other mode). |
| Age makes you tired | jmort `tired` {from:35, per:5, min:4}: sleep regen −1 per 5 years over 35 | Already a "health by age" piece. The proposal folds it in (one core). |
| Life care, hard ceiling | jmort `careN` (Sức≥70 / own thái y / Y thuật≥2), `careP` 12 %, `careMax` 3 years (OD:L1143) | Same care sources are reused below. |
| Birth costs | normal birth: **no Sức loss**; hard birth −35 Sức (`birth.hardSuc`), stillbirth −20, miscarriage −20 (j8:308) | Normal births leave no trace on the body. |
| Ở cữ | j35.js:31: no conception for 6 turns (= months) after a birth, then conception ×0.7 forever | **Not historical** for consorts (wet nurses); see Q2. |
| Hậu sản illness | `ILL.hausan` (j13:3) exists but is never rolled (jface:223 skips it) | Dead data. The proposal uses it. |
| Pregnancy months | j8.js:301 `pregMonthP`: p.preg 1→10, birth always at 10; miscarriage 6/2/6 % × misX .62, +8 when Sức<30, ×½ an thai | No preterm, no overdue, no weather/travel/work effect. |
| Poison | jpoison "docngam" Sức −25 + `p.sick`=3; j30 slow poison the same | `p.sick` = months of illness after poison. |
| Thái y | jthaiy (main): monthly bình an mạch, verdict Khỏe mạnh / Hơi yếu / Có bệnh, mạch án records; thuốc bổ cards j42:122/141, j68e:104, j2:40 (Sức +10..+20) | Ready-made places to show and restore health. |
| Paternity | `trueFather` + `pregMismatch` (j22, jroute:103), Kính sự phòng bribe / "Khai lùi" (j22, jcycle), evidence `evA` (j22:38/59, j78), blood test `rtNgSet(k,acc,oil)` jroute.js:301+ (alum / oil / swap / bribe, endings tt_hoa, ng_oan), NPC side j22:58 | The whole scheme is already built for real affairs. A preterm birth is the **innocent mirror**: no new system is needed, only a new trigger. |
| Pets | jpet Sức +1/+2 per tuần (fish), asthma −2 | A small care source (not counted as health). |

---

## PART 3 — Measurements (bots, before/after)

**3a. Sensible bot that plays every buổi** (runb.js sens + inpage6, my counters `dev/measure/sk/insk.js` in worktree /home/user/wt/suckhoe, origin/main build). The run is slow (~3.5 min a life alone), so the sample is small: 6 lives before, 2 after.

| | her Sức mean (per tuần) | tuần with her Sức<30 | NPC consorts' Sức mean | NPC tuần <30 |
|---|---|---|---|---|
| before (6 lives, 0.4–12.5 years) | 82–86 | 1 of ~1 900 | 97–98 | ~10 of ~15 000 |
| after (regen ×(0.4+0.6·kh/100) + Sức max 60+0.4·kh, 2 lives) | 81–82 | 0 | 97–98 | — |

**Finding 1 (important):** Sức is **saturated**. A sensible player sits at ~84, and NPC consorts at ~97, because NPC acts hardly spend Sức. A regen-speed stat alone changes almost nothing in normal play. It bites only for a player who overworks, and for the old or the much-weakened. For NPCs it is invisible until NPC agents spend Sức the way the player does (OD:L1386: same actions, same costs). → **flag for the npc-mind owner**: NPC acts should cost the same Sức as the player's.
**Finding 2:** the first prototype healed too fast (+1/month, +1 per care source). Her health fell to 86–91 after illness or a birth and was back to 100 within months (bot trace kh 100…86…100). Health that always comes back means nothing → the proposal below adds a **lasting part** (scar) and slows healing.

**3b. D57 birth bot** (review/preg-rate preg-bots.js: real weekly endTurn loop, seeded; D57 numbers built on main: conc .5 + fert window). 40 lives × 10 years per arm. Player = sensible (Sủng ≥ 25, Sức clamped ≥ 60 by the bot), so these rows mostly speak for NPCs. Note: the same seeds drift once a new roll is added, so differences under ~15 % are noise.

| arm | NPC births / consort-year (mean y1–10) | NPC births | NPC mother died in childbirth | hard births | stillbirths | newborn deaths (1st month) | preterm (m8 / m9) | preterm baby died | overdue | NPC Sức mean | NPC kh mean |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A = D57 today | 0.12 | 432 | **34 (7.9 % of births)** | 72 | 10 | 15 | — | — | — | 95.1 | — |
| B = + Sức khỏe (fast-heal prototype) | 0.14 | 459 | 46 (10 %) | 82 | 15 | 16 | — | — | — | 95.0 | 98.7 |
| C = + Sức khỏe + preterm/overdue | 0.11 | 510 | 38 (7.5 %) | 97 | 22 | 7 | 6 / 21 (5.3 % of births) | 8 (30 % of preterm) | 38 (7.5 %) | 94.9 | 98.7 |

D57 target ≈ 0.10 NPC births per consort-year: all arms stay at 0.11–0.14 (within noise). Her births in this bot: 12–20 per 40 lives (the bot's player is rarely favoured, and she dies early in 16–25 of 40 lives because the bot does not treat illness, as in the D57 report). Favoured-player arms (SUNG=60, 20 lives × 10 years): **Af (D57 today)** her births 11 (3 hard, 1 she died), NPC births/consort-year 0.094, NPC mother deaths 20 of 164 births (12 %); **Cf (+ health + preterm/overdue)** her births 11 (2 hard, 0 died, 1 overdue), NPC 0.098, NPC mother deaths 10 of 202 (5 %), NPC preterm 13, overdue 20. So her birth count is unchanged and NPC births stay at the D57 target.

**Finding 3 (existing, outside this idea but it decides it):** an NPC consort dies in **~8 % of births** today (jmort: hard birth = birthRisk × hardX 2; 45 % of the rest die). Elite women in pre-modern China and Europe died in very roughly 1–2.5 % of births. Any health rule that adds birth risk would make this worse. → the proposal adds **no new death roll for the mother**. Preterm and overdue only move risk onto the baby and onto health. Re-tuning `BAL.mort.birth.hardX/hardDie` is a separate item for the mortality owner (see Q4).

The proposed miscarriage causes (19:15Z: weather, travel, work) **could not be measured** here. They need buổi play (travel khắc, act Sức), and the D57 bot skips buổi acts. The numbers below are targets, to be measured with the sens bot when it is built.

---

## PART 4 — ONE proposal (combined): "Sức khỏe" (kh) + the pregnancy bundle

### 4.1 What Sức khỏe is
- A **stored** value per person, `p.kh` 0–100 (her `S.kh`, every NPC `v.kh`, the same code). It has two parts:
  - **ceiling** `khCap(p) = 100 − max(0, age − kh.ageFrom) × kh.agePer − p.khScar` (floor `kh.capMin`). Age and lasting harm lower it. **Nothing raises the ceiling** (the hard ceiling, like OD:L1143).
  - **current** `p.kh` ≤ ceiling. Temporary harm lowers it; rest, care and tonics bring it back up to the ceiling only.
- **Replaces** jmort `tired` (age now acts through the ceiling; one core, no double count).

### 4.2 What it does (owner's idea: "sức khỏe = tốc độ tăng của sức")
- Sức regen per tuần (j76sleep + the j3 +4) × `kh.regenLo + (1 − kh.regenLo) × kh/100`. At kh 100 → 18/tuần (as today); kh 70 → ~15; kh 50 → ~13; kh 30 → ~10.
- **Sức max** = `kh.maxBase + kh.maxPer × kh` (100 at kh 100, 80 at kh 50). This part is needed for the stat to matter (Finding 1). It is the owner's own "(and max?)" — Q1.
- Feeds the existing risk rules instead of new ones: preterm odds (4.4), illness catch (j13 uses Sức<40 today, add kh<`kh.illLo` → same +4), birthRisk (j8:311 uses Sức<40, add kh<`kh.birthLo` → same +3). No new death roll.

### 4.3 What lowers it / restores it (all BAL.kh)
| event | temporary (heals) | lasting (scar, lowers the ceiling) |
|---|---|---|
| a birth | −`birth` 10 | −`birthScar` 2 |
| hard birth (extra) | −`hard` 15 | −`hardScar` 5 |
| stillbirth / miscarriage | −`still` 10 / −`mis` 6 | −2 / −1 |
| next birth < `closeMo` 18 months after the last | −`close` 6 | −1 |
| ở cữ broken (heavy act or going out in the month after a birth) | — | −`ocuScar` 2, and Hậu sản (`ILL.hausan`, now rolled at `ocuIll` 25 %) |
| illness, per month, per stage | −`illSt` 1 | — |
| poison (p.sick > 0), per month | −`sick` 3 | docngam / slow poison −`poisonScar` 4 once |
| age | — | via `ageFrom` 30, `agePer` 1.2 a year (45 → 82, 60 → 64) |

Restore (only up to the ceiling): `rec` +0.5 a month while not ill; +`recCare` 0.5 a month per jmort care source (Sức≥70, own thái y, Y thuật≥2 — the same `careN`); ở cữ kept for the whole month after a birth +`ocu` 5 once; thuốc bổ (the existing cards j42:122/141, j68e:104, j2:40; also the thái y "bồi bổ" order) +`tonic` 3, at most `tonicMo` 1 a month. **The ceiling is never raised** by care or by money.

Example: she has 3 children by 28, with one close pair and one hard birth → ceiling 100 − 2·3 − 1 − 5 = 88. At 40 the ceiling is 76 (Sức max 90, regen ×0.86). At 50, after 5 births, it is ≈ 64 (Sức max 86, regen ×0.78). Consort Ling's pattern (6 children in 10 years) → a visibly worn body by ~40.

### 4.4 Pregnancy bundle (BAL.preT, j8 pregMonthP; the same for NPCs)
- **Preterm**: in month 8 / 9 (counter after +1) a roll `m8` 1.5 % / `m9` 4 %, + `lowSuc` 3 when Sức<30, + `lowKh` 3 when kh<40, + `age` 0.2 per year over 35, ×½ an thai. A preterm baby dies in the first month at `die8` 40 % / `die9` 15 % (kidDie, text "sinh non yếu ớt"). The mother is spared the overdue risk; kh loss is as for a birth. Measured: 5.3 % of births, 30 % of those babies die (≈1.6 extra baby deaths per 100 births).
- **Overdue** ("quá ngày", past 9 tháng 10 ngày): at the birth month `od` 8 % wait one more month. Labour then has birthRisk × `odHard` 1.5 and stillbirth +`odStill` 3. One omen line: chance `odOmen` 30 % of an "điềm thánh nhân" rumour (Danh +2 if the child is a son; the Gouyi legend), else "điềm xấu" talk. Measured: 7.5 % of births.
- **Miscarriage causes (19:15Z)** — one BAL table `BAL.pgRisk`, added to the monthly risk while pregnant, **capped** at `cap` +4 %/month:
  - travel: +`khac` 0.25 % per khắc walked beyond `freeKhac` 6 in the month (`travel()` j9:124, the same for NPC moves);
  - outdoors in harsh weather (`harsh()` and an outdoor place): +`rainOut` 1 % per buổi;
  - heavy work: +`work` 0.05 % per Sức spent on acts beyond `freeSuc` 40 in the month (`__cardSuc` j76);
  - low Sức: keep +8 under 30, add +`lowSuc2` 3 under 50;
  - an thai still halves the total.
  Target (to measure with the sens bot): careful play keeps today's ~20 % miscarriage per pregnancy; careless play (rain walks, overwork) reaches ~35–40 %. The text names the cause ("đi lại giữa mưa gió nhiều quá", "lao lực").

### 4.5 "Born early → not his child?" (19:20Z + 19:25Z): no new system, a new trigger
- A preterm or overdue birth sets `p.dateOff = 1` (the birth does not match the 10-night ledger / Kính sự phòng book). This becomes **one fact** in the j78 intel store ("sinh non/quá ngày, lệch sổ Kính sự phòng"), which spies and gossip can learn like any other fact.
- **Agents decide by self-interest** (OD L1332 14:45Z, OD:L1386): a consort with her own son competing for heir, a rival for the same rank, or one with high oán treats the fact as evidence through the existing `evA` (j22:38/59). When her evidence reaches the existing accuse bar (j70 accuse), she calls for the **existing blood test**: `rtNgSet(kid, accuserId, oil)` (jroute.js:301). Oil is chosen by her traits, as today.
- **The truth decides**, as today: `k.tf` is empty for an innocent preterm → the water is honest → the blood mixes → the accuser takes the existing false-accusation fall (ng_oan). The innocent mother is in danger only if the accuser rigs the bowl, and the existing counter-cards (bribe the physician, swap the bowl, spy) are her defence. Extra defence for a real early birth: the thái y mạch án (jthaiy S.thy.rec) shows when the pregnancy was found → `preT.recDefend` +20 to the existing "prove" odds.
- **Two-way**: an NPC's preterm or overdue birth gives HER the same fact and the same choice (accuse, or keep it as leverage), and other NPCs the same.
- Frequency (measured 5.3 % + 7.5 % of births, ~1.5 palace births a year): about one "lệch sổ" birth every ~5 years in the palace. It is a real event, not a weekly one.
- To check in build: `rtNgKid` looks up `S.kids`. Confirm the NPC-child path ("tâu xin nghiệm con của phi tần khác") works for an NPC's kid before wiring it.

### 4.6 Where it shows (kit parts that exist; no private UI)
- Sức row: the existing labelled bar `sbar(label,v,cls)` / `fbar` (KIT.md §table "labelled bar") showing "Sức N/M". **KIT REQUEST** only if the owner wants the ceiling drawn as a mark on the bar (Q1).
- Sức khỏe in words (no new number for the player if she prefers): the thái y monthly verdict that already exists (jthaiy "Khỏe mạnh / Hơi yếu / Có bệnh" → driven by kh: ≥80 / 50–79 / <50 or ill), and a line in the person card facts (j79 §9 facts rows) on her and NPCs ("thân thể hao tổn sau sinh nở"). Weak look: jface ỐM YẾU already exists (lvl from illness / p.sick / low Sức) → add kh<`kh.faceLo` 45.
- Night/act reasons: the existing "kèm" line on cards shows the miscarriage cause for a pregnant player ("đang mang thai: đi xa giữa mưa dễ động thai").

### 4.7 NPCs, co-op, old saves
- NPCs: the same functions (j76sleep, illMonthP, birthP, pregMonthP, travel). **But** Finding 1 — NPC Sức ~97: until NPC acts spend Sức like hers (npc-mind owner), the work/Sức parts barely touch NPCs. Births, age, illness and poison do touch them.
- Co-op: NPC health rolls host-only, as the jmort world rules are. Her own kh is local. kh is saved state, no new sync channel.
- Old saves: `kh` is missing → on load the ceiling = age part − 2 × children born, current = ceiling (no temporary harm). The same for NPCs, lazily. jmort `tired` switched off in the same change (no double count).

---

## PART 5 — Gain vs risk

| # | Risk | Likelihood | Severity | How detected / fixed |
|---|---|---|---|---|
| 1 | Health stays invisible (heals too fast, Sức already full) — Finding 1/2 | likely without the scar and Sức max | medium (the owner sees "nothing changed") | sens bot: her Sức mean and kh curve per age; fix = scar / heal numbers in BAL |
| 2 | Too harsh: old or many-children players cannot act (low max, slow regen) | possible | medium | sens bot by age band (Sức max at 45/55), act-fail "cần Sức" counts; BAL agePer / maxPer |
| 3 | NPCs untouched by work/Sức parts (NPC acts cost ~no Sức) | likely (today's code) | medium (breaks OD:L1386 in spirit) | NPC Sức mean in bots (97 today); fix belongs to npc-mind (NPC act costs) |
| 4 | Births drop below the D57 target | rare (measured 0.11–0.14) | small | D57 bot births/consort-year; BAL preT / pgRisk |
| 5 | More childbirth deaths (already ~8 %/birth) | rare (no new mother death roll) | large if it happened | preg-bots "mother died in childbirth"; the separate tuning item Q4 |
| 6 | Paternity scheme fires on the innocent too often or kills her unfairly | possible | large | count ng_set / ng_oan per life in bots; the truth rule plus the counter-cards; BAL recDefend |
| 7 | Miscarriage causes punish normal walking | possible | medium | sens bot pregnancy outcomes, careful vs careless style; freeKhac / cap |
| 8 | Old saves load with wrong health | rare | small | palace-oldsave test; lazy init |
| 9 | Co-op desync | rare | small | coop-e2e (host-only NPC rolls, as jmort) |

**Gain:** births get a real body cost, as the owner asked and as history shows. Age stops being a flat −1 and becomes one core with births and illness. The thái y, tonics, ở cữ and an thai get a real job. Early and late births are new, rare drama that plugs into a scheme system that is already built (blood test). It is the same for NPCs and adds no new death roll.
**Được lớn hơn** (gain wins): the risks with large severity (5, 6) are rare or have a direct counter and a bot check, and the other risks are tuning numbers in BAL.

---

## RECOMMENDATION (one)
Build 4.1–4.7 as ONE item (health + pregnancy bundle) on one branch: `p.kh` with ceiling + scar, regen **and** Sức max from kh, jmort `tired` folded in, preterm/overdue in pregMonthP, the miscarriage-cause table, and the "lệch sổ" fact feeding the existing evA → accuse → rtNgSet flow. Every number in `BAL.kh`, `BAL.preT`, `BAL.pgRisk`. Measure with the sens bot (her Sức curve by age, miscarriage careful vs careless, ng_set per life) and the D57 bot (births/consort-year ≈ 0.10–0.14, mother deaths not up). In parallel, two side items for their owners: NPC act Sức costs (npc-mind) and the 8 % childbirth death (mortality) — Q4.

## Owner questions (only hers)
1. Sức khỏe lowers **Sức max** as well as regen speed (recommended: without it the stat barely shows, Finding 1), and is it shown as a number or only in words (thái y verdict + card line)?
2. Ở cữ today blocks conception for 6 months and cuts it ×0.7 forever after a first birth (j35). Consorts historically had wet nurses and conceived again within ~1 year. Keep 6 months, or shorten to the real **1 month** of confinement and let Sức khỏe carry the cost of close births instead?
3. When a "lệch sổ" (early/late) birth happens to HER, may rivals take it all the way to the blood test even if she is innocent (danger only if they rig the bowl), or should an innocent early birth stop at rumours?
4. Today about **8 % of NPC births kill the mother** (history ~1–2.5 %). Lower it (mortality BAL hardX/hardDie) together with this item?

## Files (measurement only, not pushed to game branches)
Worktree /home/user/wt/suckhoe (detached origin/main): dev/measure/sk/insk.js (counters), proto.js / proto2.js / proto3.js (prototypes injected by XJS), preg-bots.js (D57 bot + XJS hook), d57.html (main + D57 conc/fert), results A/B/C.json, base_*.json, t0.json, after3.json.
