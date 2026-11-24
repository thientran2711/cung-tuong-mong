# NET-THRESHOLDS — personality (nết) drives thresholds: research + audit + proposal (Foreman D, worker session_01D3E3NZ3P5j3cm5nr2pybFY, 24/11)

PRIORITY #1 CHECK: OD 3 rows (24/11 ~06:00Z, ~06:35Z, ~06:40Z, MAIN CHÍNH 116, verbatim in dev/OWNER_DECISIONS.md L2307/L2316/L2317) | ledger 0 | claims 0 for this job | main: jnet.js + BAL.net.T[t] (jbal2.js:921, the ONE trait pool; already per-nết: w, dang, mal, slight, forgive, trust, gift, harmGate, fade, q), BAL.mem.fadeT (jbal2.js:412), j28 danger/npcAct/SOC, j9 hostility, BANDS (j24.js:3), BAL.quyLv / oanLv (jbal.js:2/365), ETRAITS (j1.js:58), RANKS.s (j1.js:7), jdis.js likes/dislikes, BAL.eff.jemo.tr (per-nết emotion strength) | review/*: none for thresholds (trait-pool / trait-rename / voice-trait / tinh-net-word are older trait work, all on main) | promo-build (favour Sủng per Emperor) = worker session_01D3E3NZySUEoGSM1U1L4WvJ, not pushed yet → values sent to it (§5).

Owner words: read OD L2307 (~06:00Z), L2316 (~06:35Z), L2317 (~06:40Z) verbatim. Her numbers 20 / 35–40 / 10 / 20–25 / 40 are EXAMPLES (OD ~06:40Z); the values below are designed from robot data.
NO GAME CODE in this job. Tools + raw robot tables: dev/handover/reports/net-thresholds-tools/ (nt-in.js instrument, nt-run.js runner, nt-sum.js summary, robot-sum.md, robot-norm.md, scan-literal.txt).

---------------------------------------------------------------------------------------------------
## 0. Verdict in five lines
1. Nết already changes WHAT a person does (act weights work: provoke Kiêu ngạo 11.3 vs Khiêm nhường 1.3 per 100 holder-weeks, ×9). It does NOT change WHEN she starts: every gate is one flat number for everyone.
2. Worse, the scales SATURATE: in robot lives NPC→her danger has median 112 (band 3 "sát hại" starts at 80) and NPC→NPC oán median 25 / p90 97. 88 % of npcAct calls happen at band 3. So harm frequency is FLAT across nết: 19–30 per 100 holder-weeks, max/min only 1.4× (table §2.3). Per-nết thresholds alone will not show personality until the heat is lowered (§4 step 0).
3. Kind deeds almost never fire (help 0.3, warn 0.3, visit 0.4 per 100 holder-weeks) because thiện cảm rarely reaches the flat 10/20 gates (NPC→NPC ≥10 only 12 % of pairs; NPC→her 1 %).
4. "Friend/thân" is typed as at least FOUR different numbers (20 / 30 / 40 / 60) in different modules — a ONE CORE (law 4) problem; the proposal makes it ONE per-nết lookup.
5. Proposal: one base table BAL.net.th + per-nết offsets in BAL.net.T[t].th (added over the 3 nết, clamped), read by ONE function netTh(p,key); same lookup for her (her p.net) — law 1. Emperor favour: per-ETRAIT multiplier on RANKS.s for the favour road only (§5).

---------------------------------------------------------------------------------------------------
## 1. Expert research (LAW 8)
How sim / life-sim / court-drama games make personality drive thresholds, reactions, actions:
- **Personality sets the emotion THRESHOLD, the relationship shifts it** (computational emotion models, OCC + Big Five): each NPC's personality gives the base threshold of each emotion; the relation to the other person raises or lowers it; intensity decays and below threshold the emotion vanishes unless re-triggered. → exactly the owner's idea: a cold person needs more thiện cảm before "thân", a proud one less oán before acting. [Nottingham repository paper](https://nottingham-repository.worktribe.com/OutputFile/773625); OCC+Five-Factor for story planning: [Shirvani et al. 2023](https://cs.uky.edu/~sgware/reading/papers/shirvani2023personality.pdf); survey for game NPCs: [arXiv 2307.10031](https://arxiv.org/pdf/2307.10031); GAMYGDALA/ALMA (OCC appraisal, PAD mood, personality as intensity modifier): [Popescu, Broekens, van Someren 2013](https://ii.tudelft.nl/~joostb/files/Popescu_Broekens_Someren_2013.pdf); Big-Five NPCs that attack / evade / befriend by personality: [SBGames 2017](https://www.sbgames.org/sbgames2017/papers/ComputacaoFull/175357.pdf).
- **Crusader Kings III**: traits give opinion modifiers, scheme/acceptance modifiers and AI "energy/vengefulness/compassion" values; the design goal stated by Paradox: a player should be able to read an AI's traits and roughly predict what it does ([CK3 dev diary 104 thread](https://forum.paradoxplaza.com/forum/threads/ck3-dev-diary-104-ai-ai-ai.1539411/page-5); trait tables [SegmentNext](https://segmentnext.com/crusader-kings-3-traits-guide)). Player complaints when it fails: a shy, forgiving AI blackmailing ([Steam](https://steamcommunity.com/app/1158310/discussions/0/2966141980969364055)), "AI looks the same regardless of personality" ([Paradox forum](https://admin-forum.paradoxplaza.com/forum/threads/worst-traits-for-a-courtier-dark-triads-and-murder-hobos.1725590)) — our robot shows the same failure for harm (§2.3).
- **The Sims**: relationship bands (friend ≈ 35, good friend ≈ 60 in TS4 per wiki; TS1 friend > 50); traits change which socials appear and how fast they land ([Sims wiki Friendship](https://www.thesimswiki.com/wiki/Friendship), [Carl's guide](https://carls-sims-4-guide.com/relationships)). Lesson: words for bands are shared, the SPEED and the menu differ by trait.
- **RimWorld**: insult → social-fight chance multiplied by trait (Bloodlust ×4; Kind never starts one); Psychopath cannot build positive opinion normally, so stays in the fight zone ([Opinion](https://rimworldwiki.com/wiki/Opinion), [Social](https://rimworldwiki.com/wiki/Social)). Lesson: a trait can BLOCK an act outright (our harmGate), and can keep a person in a band by changing gain speed (our trust/slight).
- **Dwarf Fortress**: facets (how one acts) vs values (what one believes); grudges form when values clash (>60 vs <40); friendship forms among people who idle together ([Personality](https://dwarffortresswiki.org/Personality), [Facet](https://dwarffortresswiki.org/index.php/Facet)). Lesson: likes/dislikes clashes (jdis) should seed grudges/liking, both ways.
- **Court dramas** (Chân Hoàn truyện, Diên Hi công lược, the shape the owner names): the proud consort strikes at the first slight and openly; the gentle/upright one endures long and acts only when cornered or to protect someone; the schemer smiles and waits, then strikes hard; the cold one is hard to win but loyal for life once won; the gossip carries every word; crowded places (sân chờ, tú nữ sống chung) are where drama starts (OD ~06:00Z).
Design rules taken: (a) personality = threshold offset + speed + menu (we have speed and menu, not threshold); (b) one shared word ladder, per-person cut points; (c) a trait may block a road (harmGate) but every nết keeps a gain and a cost (law 2/3); (d) values must live in the middle of the scale or thresholds cannot show (saturation fix first).

---------------------------------------------------------------------------------------------------
## 2. Audit — every flat threshold that should depend on nết
Scan: `grep -noE "(aff|oan|danger|hostility|evG|agSpite)\(…\)\s*(>=|>|<=|<)\s*N"` over dev/build/*.js (all.js excluded) = 138 literal gates (list: tools/scan-literal.txt) + ~70 gates against BAL keys. Robot: 3 runs of the inpage5 «sens» bot (runpers setup) + nt-in.js, 969 bot-weeks, 16 251 NPC→her and 60 000 NPC→NPC weekly pair samples (NPC→NPC capped at 20 000 per key → early-life weighted). "Fires" = share of ok() calls that pass (SOC) or share of sampled pairs above the cut.

### 2.1 Scales today (one value each, same for every nết)
| scale | where | today | robot (ALL) |
|---|---|---|---|
| thiện cảm words (Ghét…Thân thiết) | BAL.quyLv jbal.js:365 | −30 / −10 / 10 / 30 / 60 | NPC→NPC p10 −79, p50 −14, p90 16; ≥30 7 %, ≥60 4 %. NPC→her p50 −101 (!), ≥10 1 % |
| oán words | BAL.oanLv jbal.js:2 | 5 / 20 / 45 / 75 | NPC→NPC p50 25, p90 97; ≥20 56 %. NPC→her p50 24 |
| harm bands (danger) | BANDS j24.js:3 | 30 nhỏ / 60 nặng / 80 sát hại | NPC→her p10 90, p50 112; NPC→NPC p50 37; npcAct calls by band 0/1/2/3 = 61 / 217 / 224 / 3630 |
| hostility | j9.js:48 (+j30, jmem) | gates 20–60 typed | p50 53, p90 142 |
| harmGate | BAL.net.T["Ân cần"] only (60) | one nết | no effect: values already > 60 |
| oán fade | BAL.oanFade 2/month × forgive | per-nết speed (works) | — |
| memory fade | BAL.mem.fadeT ← BAL.net.T[t].fade | per-nết (works) | — |
| Sủng to promote | RANKS.s j1.js:7 | 0/15/25/38/52/66/78/85 | bot reaches 96–99 |

Out-of-range bug seen: aff() returns −101 … −135 (p10 −126) though the scale and its bar are −100..100 → memMod (jmem.js:357 path) or ghen terms pass the clamp. Family scan needed when building (LAW 11).

### 2.2 Flat gates that should read nết (main, today)
| concept | file:line | today | fires (robot) |
|---|---|---|---|
| THÂN / friend (help, defend, warn, mourn, shared side) | j28.js:56 SOC.warn aff≥20 | 20 | 2 % of calls |
| | j28.js:54 SOC.help aff≥10 | 10 | 3 % |
| | j28.js:65 SOC.drop aff≥30 | 30 | 1 % |
| | BAL.ag.goal.friend jbal.js:300 (jagacts.js:45, jagday.js:313) | 20 | ≈9 % of NPC pairs |
| | BAL.eff.jemo.wk.friend jbaleff.js (jemo.js:78 friendDie) / upFriend | 30 / 40 | 7 % / 6 % |
| | jagent.js:70 G.friend, BAL.ag.why.tell.friend jbal2.js:1544 | 30 | 7 % |
| | jbal2.js:572 friend / jbal2.js:1429 friend | 60 / 40 | 4 % / 6 % |
| | BAL.mem.goodGate jbal2.js:416 (no harm to a friend) | 40 | — |
| | BAL.hook.czClose jbal2.js:417 | 20 | — |
| | BAL.mood.fr.aff jbal2.js:380 (mood from friends) | 30 | — |
| | j10.js:181/183 faction join 15/35; BAL.facJoinAff 30 | 15/35/30 | — |
| | j70.js:195/451, j83.js:240, j51.js:27 aff≥40 | 40 | 6 % |
| | jveil.js:209 aff≥50; jts.js:268/jtsb.js:153/jaudit.js:25/j21.js:67/j34.js:20 aff≥30 | 50 / 30 | 5 % / 7 % |
| GHÉT (dislike → hostile everyday acts) | BAL.quyLv[0] Ghét ≤ −30; j72.js:320/373/375/382/487/593 ≤ −10…−20; jemo foeAff −20, downAff −25; BAL.invite.hate | −10…−40 | NPC→NPC ≤−20 50 %, ≤−30 41 % |
| OÁN → ACT (harm, provoke, humiliate) | BANDS 30/60/80 (j24.js:3; j28 npcAct, j40 mindMenu, j43, j51, j70, j78, jagharm) | 30/60/80 | band ≥1 on 98 % of calls; 88 % band 3 |
| | SOC.provoke danger≥10, humiliate ≥18, feign ≥20 (j28.js:58/59/69) | 10/18/20 | 90 % / 56 % / 84 % |
| | j10.js:181 oán≥30 faction foe; j70.js:152/241 oán≥20; jtwoway.js:63/78 30/20; j32.js:16/18 "kẻ thù" oán≥40; jwhy.js:82 danger≥30; jroute.js:390 ≥60 | 20–60 | 46–62 % of pairs |
| | hostility gates j13.js:39 40, j95.js:79/139/195/456 50/45/30/40, jpetcare 40, jagstaff/j42 20/25, BAL.cyc.foeHost, BAL.mline.feudHost 25 | 20–60 | 60–79 % |
| GOSSIP / tell | SOC.gossip ok()=true (j28.js:72); BAL.ag.why.tell host 40 / friend 30 (jbal2.js:1544, j76.js:114, jroute.js:109) | 40 / 30 | gossip passes 99 % — only weights differ |
| FORGIVE / apologise | SOC.apologise oán(t,v)≥15 j28.js:70; mediate oán≥20 j28.js:57; jagacts.js:59 X.humble.oan; BAL.ag.hh.pardonAff 20 | 15/20 | 74 % / 51 % |
| | monthly fade BAL.oanFade × forgive (per-nết speed already) | 2 | — |
| ÂN (owed favour → repay) | evG≥1 / ≥2 gates (jagacts*, j78, jtwoway) 25 places; BAL.anFade | 1 / 2 | — |
| FAVOUR (Sủng → favour promotion) | RANKS.s j1.js:7 (same for every Emperor) | 25 for Quý nhân etc. | — |

### 2.3 Robot: per-nết rate per 100 holder-weeks (NPC consorts; full table tools/robot-norm.md)
| nết | provoke | humiliate | help | warn | mediate | apologise | gossip | harm (any band) | harm band 3 |
|---|---|---|---|---|---|---|---|---|---|
| Kiêu ngạo | 11.3 | 5.5 | 0.1 | 0.2 | 1.6 | 0.5 | 3.1 | 27.0 | 24.6 |
| Nóng nảy | 11.8 | 4.6 | 0.5 | 0.4 | 3.3 | 2.2 | 3.9 | 27.3 | 25.3 |
| Thù dai | 8.8 | 3.0 | 0.5 | 0.7 | 2.7 | 1.4 | 2.7 | 29.8 | 27.0 |
| Xảo quyệt | 3.8 | 1.6 | 0.1 | 0.1 | 1.1 | 2.2 | 5.1 | 24.3 | 22.0 |
| Lạnh lùng | 4.9 | 3.1 | 0.1 | 0.1 | 2.9 | 2.2 | 1.8 | 26.9 | 23.9 |
| Nhiều chuyện | 3.3 | 1.8 | 0.2 | 0.7 | 2.0 | 2.2 | 9.7 | 21.3 | 18.9 |
| Khiêm nhường | 1.3 | 0.6 | 0.3 | 0.5 | 4.3 | 4.4 | 4.0 | 22.9 | 20.1 |
| Ân cần | 2.0 | 0.7 | 0.7 | 0.3 | 9.5 | 3.8 | 3.8 | 21.8 | 19.7 |
| Rộng lượng | 3.2 | 3.2 | 0.5 | 0.2 | 6.2 | 2.4 | 3.2 | 22.9 | 19.9 |
| Điềm tĩnh | 2.3 | 1.1 | 0.7 | 0.2 | 5.8 | 3.1 | 4.0 | 24.6 | 21.0 |
| ALL | 5.5 | 2.6 | 0.3 | 0.3 | 3.8 | 2.5 | 3.8 | 25.1 | 22.3 |
Reading: rude acts follow nết (×9), harm does not (×1.4), kind acts are near zero for every nết.
Robot limits: one bot policy («sens», a strong player: Sủng 96–99, so NPC→her is the worst case), 3 runs (2 lives ended + 1 TIMEOUT), early-life weighted NPC→NPC samples. Before building, re-run with a weak/average policy (runpers `rand`) — the NPC→NPC numbers below are the design base because they are not driven by her favour.

---------------------------------------------------------------------------------------------------
## 3. PROPOSAL — per nết × each relation scale (values from data)
### 3.1 Shape (one core, law 4; same rule for everyone, law 1)
- `BAL.net.th` = base cut of each key (below). `BAL.net.T[t].th` = offsets of that nết. `netTh(p,key)` = base + Σ offsets of p's 3 nết, clamped to `BAL.net.thClamp[key]`. Lives in jnet.js next to nv()/persF.
- Every gate in §2.2 of that concept reads `netTh(holder,key)` instead of its typed number (the holder = the person whose feeling it is). The typed copies 20/30/40/60 of "friend" collapse into `netTh(p,"than")` (×k where a module truly needs a stronger tie, e.g. `than2` for life-bond acts).
- Her (S): she has p.net (jnet netKey "me:"); wherever the game reads HER feeling (jtwoway, jagknow her side, co-op seat, her «thân» word to someone, her mourning/gloating emotion lines), the same netTh(S,key) applies (law 1). Her own choices are never blocked by a threshold — it only changes words/emotion and what others perceive.
- Player-visible: only the existing words (quyW / oanW ladders, hint lines "Nàng khó gần: phải rất quý mới coi ai là thân") — no numbers (law 7). The shared word ladder stays; the CUT where a person's word becomes «Thân thiết» is hers.
- BANDS: cut_i(v) = BANDS[i][0] + netTh offset "act" (band 1) and half of it for bands 2/3 (a proud girl slaps sooner, but murder still needs deep hate).

### 3.2 Base values (from NPC→NPC data)
| key | meaning | today | base | clamp | share of NPC pairs at base (robot) |
|---|---|---|---|---|---|
| quen | friendly: help, visit, small favours | 10 | 10 | 0..30 | 12 % |
| than | thân: warn, defend, share secrets, mourn, join side | 20/30/40/60 | 30 | 15..60 | 7 % |
| ghet | hate: cold/hostile everyday acts, gloat | −10…−30 | −30 | −60..−10 | 41 % (≤−20: 50 %, ≤−45: 30 %) |
| act | oán/danger to START acting (band 1 + provoke/humiliate/feign gates scale with it: 10/18/20 → act/3, act×.6, act×.67) | 30 | 30 | 10..60 | 66 % |
| tell | gossip: hostility to spread a person's secret / thiện cảm to tell her a secret | 40 / 30 | 40 | 15..70 | 60 % |
| nguoi | oán below which an apology / mediation is accepted and the pair is "made up" | 15–20 | 30 | 10..60 | — |
| an | owed ân (evG) needed before she repays on her own | 1 | 1 | 1..3 | — |

### 3.3 Offsets per nết (BAL.net.T[t].th; sum over the 3 nết)
| nết | quen | than | ghet | act | tell | nguoi | an | gain / cost (law 2/3) |
|---|---|---|---|---|---|---|---|---|
| Ân cần | −5 | −10 | −15 (hates late) | +15 | 0 | +10 | 0 | easy friend / slow to defend herself |
| Lạnh lùng | +10 | +12 | 0 | +5 | +15 | 0 | 0 | thân rare but fade .6 keeps it for life / hard to win |
| Nóng nảy | 0 | 0 | +10 (hates fast) | −10 | −5 | +10 (cools fast) | 0 | open, forgives fast / strikes first |
| Điềm tĩnh | 0 | +3 | −5 | +8 | +5 | 0 | 0 | hard to provoke / slow hidden hatred (hide q) |
| Nhiều chuyện | −5 | −5 | 0 | 0 | −20 | 0 | 0 | brings news / spreads yours too |
| Kín đáo | +5 | +8 | 0 | 0 | +25 | 0 | 0 | keeps secrets / tells her little |
| Kiêu ngạo | +5 | +15 | +10 | −12 | 0 | −15 (needs a big apology) | +1 | quick to act, easy to read / very hard to befriend |
| Khiêm nhường | −5 | −5 | −10 | +12 | +5 | +10 | 0 | gentle, easy to reconcile / follows the strong |
| Cương trực (m) | 0 | +5 | +5 | −5 | 0 | 0 | 0 | honest witness / blunt enemy |
| Xu nịnh (m) | −8 | −8 | 0 | +5 | −5 | +5 | +1 | easy friend / drops the fallen |
| Thật thà | −3 | 0 | 0 | +5 | +5 | +5 | 0 | trustworthy / easily fooled |
| Xảo quyệt | −5 (smiles at all) | +10 (rarely truly thân) | 0 | +8 band 1 / −8 band 3 (waits, then strikes hard) | −5 | −10 | +1 | sharp ally / betrays when useful |
| Thanh liêm | 0 | 0 | 0 | +5 | +5 | 0 | 0 | can't be bought / gifts don't move her |
| Ham lợi | −5 (paid) | +5 | 0 | 0 | −10 (sells) | 0 | +1 | buyable / sells to higher bidder |
| Rộng lượng | −5 | −3 | −15 | +12 | +5 | +20 | +1 (forgets ân too) | forgives / forgets favours |
| Thù dai | +5 | +5 | +10 | −8 | 0 | −20 | −1 (repays at once, for life) | never forgets a favour / never forgets a wrong |
| Trọng nghĩa | 0 | −3 | 0 | +5 (−10 to defend a friend) | +10 | +5 | −1 | defends friends / refuses dirty work |
| Thực dụng | −5 | +5 | 0 | 0 | −5 | 0 | +1 (repays only while she rises) | easy alliance / drops the fallen |
| Tham vọng | 0 | +5 | +5 | −5 (vs whoever blocks the next seat) | 0 | −5 | +1 | follows the rising / climbs over you |
| An phận | 0 | 0 | −5 | +10 | 0 | +5 | 0 | stays, no jealousy / won't risk for you |
| Ham học | +5 | +3 | 0 | +3 | +5 | 0 | 0 | sharp / few visits |
| Ham vui | −8 | −5 | 0 | 0 | −8 | +5 | 0 | easy friend at a party / fickle |
| Mê tín | 0 | 0 | 0 | 0 | 0 | 0 | 0 | (no threshold change; acts via pray/check) |
| Thực tế | +5 | +5 | 0 | 0 | +5 | 0 | 0 | sees through tricks / slow to trust |
| Vì gia tộc | 0 | 0 | 0 | +5 (−10 if her clan is harmed) | 0 | 0 | 0 | keeps rules / drops a friend for the clan |
| Vì mình | +3 | +8 | 0 | −3 | −5 | 0 | +1 | buyable with her own gain / leaves when danger |
Worked examples (base + 3 nết, clamped): Kiêu ngạo + Thù dai + Tham vọng → than 55, act 30−25=10 (owner's "proud acts at 10"); Ân cần + Rộng lượng + An phận → than 17, act 30+37 → clamp 60 (gentle acts only at deep grudge); Lạnh lùng + Kín đáo + Thực tế → than 55 (owner's "cold needs 35–40+"); Ân cần + Thật thà + Ham vui → than 15 (warm: 20 is already thân).
Expected spread (from the NPC→NPC distribution): than 15 → 9 % of pairs thân; 30 → 7 %; 55 → 4 %. NPC→NPC danger ≥10 → 77 % of pairs "ready"; ≥30 → 66 %; ≥60 → 36 % — about ×2 between proud and gentle for harm, against ×1.4 today, once step 0 is done.

### 3.4 Reactions / actions / thoughts per nết (where nết should show and does not yet)
| moment | today | add (per nết, existing kit/lines) |
|---|---|---|
| crossing her own «than» cut toward someone | nothing | one news/thought line in her voice (jtone by nết): Lạnh lùng "Ít khi ta coi ai là người nhà…", Ân cần "Muội cứ coi tỷ như chị ruột" — Sổ ghi via newsAdd |
| crossing «act» cut | danger bands only, silent | mindTell sign (j43) earlier for Nóng nảy/Kiêu ngạo (open), later/never for Điềm tĩnh/Xảo quyệt (hide q) |
| crossing «ghet» | nothing | everyday cold acts (drop/humiliate) unlock for her; voice line |
| apology / mediation | oán≥15/20 flat | accepted if oán < netTh(t,"nguoi"); Kiêu ngạo needs a gift/rank-up too; Thù dai refuses (keeps memory "keep") |
| friend/foe dies, rises, falls, gives birth (jemo wk.*) | flat 30/40/25/−20 | read netTh(x,"than") / netTh(x,"ghet") — so a cold one mourns only true friends, a gentle one pities even a rival |
| gossip | weight only | tell gate per nết (Kín đáo almost never, Nhiều chuyện about anyone) |
| ân repay | evG≥1 for all | Thù dai / Trọng nghĩa repay at once and unasked; Thực dụng/Vì mình only while the giver rises |
| likes / dislikes (OD ~06:35Z) | jdis: consorts + Emperor only | servants, men, Thái hậu, her (two-way): gift on a dislike = thiện cảm loss scaled by nết gift ×; Kiêu ngạo takes it as a slight (oán), Rộng lượng shrugs. (Gap, separate build; dislike clash also seeds oán between NPCs — Dwarf Fortress pattern.) |

---------------------------------------------------------------------------------------------------
## 4. Build order (when MAIN 117 / sếp says go; not built here)
0. **Heat first** (without it nothing above shows): find why NPC→her thiện cảm sits at −100 and danger at 112 when she is favoured (ghen × 1.15 and −aff in danger; affAdd from ghenUp; memMod pushing past −100). Clamp aff() to −100..100 everywhere (family scan); scale danger so a high-Sủng player meets band 3 from a few deep enemies, not from everyone. Robot target: NPC→her danger median 35–50, band-3 share ≤ 30 % of npcAct calls.
1. BAL.net.th + T[t].th + netTh() in jnet.js; replace every gate of §2.2 (scan script + before/after table, LAW 11).
2. Collapse the "friend" copies (20/30/40/60) into netTh "than" (law 4).
3. Reaction lines of §3.4 (kit news/notice lines only, no new UI; KIT FIRST).
4. Robot re-run (sens + rand): per-nết harm ratio proud/gentle ≥ ×2, kind acts ≥ 2 per 100 holder-weeks for warm nết.

---------------------------------------------------------------------------------------------------
## 5. FAVOUR — Sủng threshold per Emperor nết (sent to promo-build worker session_01D3E3NZySUEoGSM1U1L4WvJ)
Owner OD ~06:35Z: favour promotion depends on THIS Emperor's nết; occasion/batch promotions keep the common RANKS thresholds.
Proposal: `BAL.promo.favK[etrait]` multiplier on RANKS[r].s, product over his traits (S.emp.traits, 2 traits), threshold = min(BAL.promo.favCap 95, round(RANKS[r].s × Πk)). Multiplier (not offset) so low ranks and high ranks scale alike.
| ETRAIT | k | Quý nhân (25) | Tần (38) | Phi (52) | why (gain / cost for her) |
|---|---|---|---|---|---|
| datinh Đa tình | 0.80 | 20 | 30 | 42 | easy to rise / everyone ghen more (existing) |
| mesac Mê sắc | 0.90 | 23 | 34 | 47 | beauty counts double / plain girls wait |
| nongnay Nóng nảy | 0.95 | 24 | 36 | 49 | Sủng swings both ways (existing) |
| nhantu Nhân từ | 1.00 | 25 | 38 | 52 | Đức valued (existing) |
| trongtai Trọng tài | 1.00 | 25 | 38 | 52 | arts count double (existing) |
| hieuthao Hiếu thảo | 1.05 | 26 | 40 | 55 | Thái hậu must nod (existing) |
| danghi Đa nghi | 1.15 | 29 | 44 | 60 | slow trust / schemes against her also exposed |
| chamchinh Chăm chính sự | 1.20 | 30 | 46 | 62 | few nights / values court talk |
| lanhlung Lạnh lùng | 1.40 | 35 | 53 | 73 | hard to rise / Sủng also fades slowly (existing) |
Pairs (CLASH excludes nongnay+nhantu, chamchinh+datinh, datinh+lanhlung): e.g. datinh+mesac 0.72 → Quý nhân 18; danghi+lanhlung 1.61 → 40 (the owner's "cold needs 40" example shape). Shown to her only as a word on the countdown chip («Hoàng thượng đa tình, dễ được thăng» / «khó được thăng»), never the number (law 7). Robot-check after build: favour-road promotions per life datinh ≈ 1.5× nhantu, lanhlung ≈ 0.5×.

---------------------------------------------------------------------------------------------------
## 6. Laws check
1 two-way: one netTh for every holder incl. her and men/servants (p.net exists for all but Emperor/Thái hậu; Emperor uses ETRAIT keys like fadeT). 2/3: every offset row has a gain and a cost (column above). 4 one core: all numbers in BAL.net.th / T[t].th / BAL.promo.favK; four typed "friend" copies removed. 5: n/a. 6: people keep acting by their own nết; no fake events. 7: words only. 11: build = whole family per scale with scan + before/after. 14: the per-nết cut REPLACES each flat number in its place. 18: not a new feature — owner order (OD ~06:00Z/~06:35Z/~06:40Z).

## Handover
Job complete (report only). Worktrees /home/user/wt/netth (main, detached) + /home/user/wt/netth-ho removed after push. Robot tools are in tools/ (copy nt-in.js / nt-run.js / nt-sum.js into dev/measure to re-run: `node dev/measure/nt-run.js out.json 1300`, then `node dev/measure/nt-sum.js out*.json`; a run can hang in a bot step — the file keeps the data up to the hang).
