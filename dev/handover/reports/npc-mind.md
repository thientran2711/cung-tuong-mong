# review/npc-mind: every person's mind + the NPC choice audit

Branch `review/npc-mind`. Base: origin/main 0c23da40, with review/personality-r1 (D7, PASS) and review/pcard-dislikes (C35b) merged in.
Owner rules: OD:L571 (likes and dislikes), OD:L599 (personality + trọng for everyone; "whatever she has, they have"), OD:L1247–1249 (real cast; NPC decisions by their own abilities, affinity and traits, never the AI-best choice; every person has a personality, sở trường, sở ghét and sở thích).
Builds on jtrong (trọng) and jdis (dislikes). Neither was redone. New module: `dev/build/jmind.js` (assembled after jdis.js). Numbers are in `BAL.mind`.

## A. Inventory: the five traits for each person class

Columns: **nết** = personality, **trọng** = virtue, **sở trường** = strength, **sở thích** = likes, **sở ghét** = dislikes.
"BEFORE" is main + personality-r1 + pcard-dislikes. "AFTER" is this branch.

| class | nết | trọng | sở trường | sở thích | sở ghét |
|---|---|---|---|---|---|
| player (S) | jtrong S.pTr ✓ | jtrong ✓ | **GAP** → mindStr: her best art, live from S.arts; else from her nết | **GAP** → 1 key in S.mlike | **GAP** → 1–2 keys in S.dis |
| consorts and Hoàng hậu (rivals) | j1 trait/trait2 ✓ | ✓ | **GAP** (arts held, but never named a strength) → best art | partly (jdis likeKeys, IT.tg) → one stated like, own best art first | jdis ✓ |
| co-op friend (rival .coop) | jtrong (same seat key) ✓ | ✓ | as consort | as consort; seeded by trLifeSeed, so both seats agree | jdis ✓ |
| Emperor | ETRAITS ✓ | ✓ | **GAP** → from his traits (chamchinh → Chính sự, trongtai → Thi…) | LIKES flower/music/dish ✓ | jdis ✓ |
| Thái hậu | archetype ✓ | ✓ | **GAP** → by archetype (Nghiêm khắc → Lễ nghi, Đa nghi → Dò la…) | **GAP** → S.thO.mlike | **GAP** → S.thO.dis |
| close maid, maids, eunuchs (allServ) | j10 tr ✓ | ✓ | **GAP** → from tr (lanh → Dò la, chuyen → Giao thiệp, trung → Hầu hạ, tham → Buôn bán, nhat → Khéo tay) | **GAP** → s.mlike | **GAP** → s.dis |
| elder staff (jstaff, eid) | tr if they have one, else **GAP** → .mnet | ✓ | **GAP** → Lễ nghi / Quán xuyến | **GAP** | **GAP** |
| palace officials S.court (Tổng quản, Kính sự phòng, Nội vụ phủ, Thái y) | **GAP** → .mnet (PERS keys) | ✓ | **GAP** → by post (Quán xuyến / Sổ sách / Buôn bán / Y thuật) | **GAP** | **GAP** |
| men (S.men: guards, physicians, princes) | jmen trait ✓ | ✓ | **GAP** → by title (Thị vệ → Võ nghệ, Thái y → Y thuật, Vương gia → Chính sự) | **GAP** | **GAP** |
| children (allKids) | **GAP** → .mnet | ✓ | **GAP** → by tal (≥55: an art), else Võ nghệ (sons) / Khéo tay (daughters) | **GAP** | **GAP** |

Gaps found: 31 of 50 cells. All are filled now.
The probe `dev/test/npcmind-check.js` runs on an old main save and finds 35–37 people, 0 missing, nobody liking something they also dislike, and the same values after a reload.
The ma ma are the jstaff elders, so they are covered above.
Officials of the five court houses (j55 TD) are houses, not person objects. They have no card, so nothing was added for them. **Open:** if the owner wants them as people, they first need person objects.

How the values are drawn:
- Each value is drawn once per life from `trLifeSeed` and the person's key (same as jtrong), and stored on the person (`.mlike`, `.dis`, `.mnet`).
- Old saves fill in lazily through normAll.
- Likes and dislikes use the same key space as jdis: `art:<k>` for a handmade work, `kd:<kind>` for a bought item kind.

### Where it is shown (kit parts only, no new UI part)
- **Filled person cards (jpcf):** the rows "Sở trường / Thích / Ghét" go into the existing "Sở trọng" block through `kitRows`. If jpcf had no Sở trọng block, the same kit block is added.
  - The Emperor keeps "Ngài thích / Ngài ghét"; consorts keep "Nàng ghét" from jdis. No row is shown twice.
- **Her own card and a child's card:** jpcf does not fill these, so the facts become card lines, which `kitPcGrid` turns into chips (the jtrong pattern). A child also gets a "Tính nết" line.
- **Stranger rule:**
  - Strength is shown once the person is known (it is their reputation).
  - Others' likes and dislikes are "chưa rõ" until she learns them by talk (`BAL.mind.learnTalk` 20%), by spying (a new "like" fact in j78facts), or by giving a gift.
  - She always knows her own household's (her maids, eunuchs and children).
  - Strangers' cards show nothing (unchanged).

### Where the game rules use them
- **Gifts:**
  - A liked gift gives +`BAL.mind.like` (3) regard on top of the usual amount.
  - A disliked gift gives −3. This now also covers Thái hậu (S.th), servants (loyalty) and everyone outside jdis.
  - jdis (Emperor and consorts) is unchanged.
- **Gifts to her (NPC → S):** her own like makes her mood vui (+30); her own dislike makes it buồn. This is the same rule she applies to them.
- **NPC choices:** strength, abilities and trọng feed `mindW` (part B).

## B. NPC choice audit (LUẬT SỬA CẢ NHÓM)

The full catalogue covers about 55 sites. Below are the sites that picked the BEST or the FIRST option, and what they do now.

The shared helpers are in jmind:
- **mindW(p, tag)** is a weight from THAT person's state:
  - abilities by act type (tâm cơ for schemes and spying, đức for helping, danh/tài for court acts, sức for work, bạc for bribes): ×(1 + (a − 40)·0.012), so 0 → ×0.52 and 90 → ×1.6;
  - ×1.6 if the act uses their strength;
  - ×1.35 for each virtue of theirs the act honours, and ×0.65 for each one it offends.
- **mindPick / mindPickBy** is a weighted pick, with `BAL.mind.slip` = 12% human slips: the NPC misjudges and takes another option, ignoring the weights.

Motive gates are unchanged:
- the danger band `bandOf(danger)` with `persF harmGate`;
- motives70, the oán ≥ 20 gate, the rel ≥ 20 gate, hostility thresholds and every `ok()` check.

Every new pick chooses only among options that already passed the old gate. Note: the brief names "S.roster/j95 motive rules", but **j95 / motiveOK does not exist in the code** (grep). The real gates are the ones listed above.

| site | who chooses | what | BEFORE | AFTER |
|---|---|---|---|---|
| j40:45 | Tham vọng consort | overreach target | ARGMAX rank | weighted: rank² + hostility/5 |
| j40 mindMenu (wrap in jmind) | consort | harm act within her band | weighted: traits × odds × fail memory | the same × mindW (strength / tâm cơ / trọng, e.g. a Nhân-valuing consort poisons less); 12% slip |
| j70:143 | consort | target of a humiliation plot | ARGMAX oán | weighted oán (gate oán ≥ 20 kept) |
| j28:94 | consort | social deed target | UNIFORM | weighted by how strongly she feels: 4 + abs(aff)/4 + oán/4 |
| j28:94 | consort | social deed | SOC.w × persW | × mindW(tag of the deed) |
| j28:75 | consort | which danger to warn about | FIRST | weighted: danger + her oán toward the schemer |
| j28:87 | consort | patron to follow | ARGMAX rank | weighted: rank + aff/10 |
| j8:396 | Hoàng hậu (NPC) | whom to judge | FIRST with evidence ≥ 2 and rel < 0; flat 35% | weighted: evidence + hostility; chance 35 × mindW(punish) (Nhân lowers it, a Chính sự strength raises it) |
| j8:349 | rivals | who bribes a disloyal maid | ARGMIN rel | weighted: dislike × mindW(bribe) (Liêm-valuing consorts bribe less) |
| j8:489 | rivals | who steals her night | FIRST in roster order | weighted among those who pass the gate: hostility × mindW(scheme) |
| j34:26 | contest NPC | sabotage target | FIRST, always the player | weighted: 2 + hostility |
| jwd92b:14 | consort | dress-frame target | ARGMAX hostility | weighted hostility |
| jlost:50 | — | which rival is the thief | ARGMAX danger | weighted: danger × mindW(scheme) |
| jlost:77 | thief | where to plant the item | ARGMAX danger + noise | weighted danger |
| j55:148 | consort | court leak target | FIRST | weighted: deG + hostility/20 |
| j4:21 | story NPC | accuser (Đại tướng quân) | ARGMIN rel | weighted: (30 − rel) × mindW(frame) |
| j96:60 | story NPC | foe | ARGMIN (rel − ghen/2) | weighted × mindW(frame) (gate96 kept) |
| j83:208 | — | witness to an illness | Hoàng hậu, else ARGMAX hostility | Hoàng hậu, else weighted hostility × mindW(frame) |
| j13:36 | rival | who bribes the physician | FIRST | weighted: hostility × mindW(bribe) |
| j10:93 | faction member | who betrays | FIRST with aff < 0 | weighted: −aff × mindW(flee) (Trung/Nghĩa-valuing members betray less) |
| j10:95 | faction leader | joint-scheme target | FIRST | weighted: shared oán |
| j10:99 | consort | faction partner | FIRST friend | weighted aff |
| j20:16 | Hoàng hậu | whom to reward | ARGMAX rel | weighted: rel × mindW(help) (gate rel ≥ 20 kept) |
| jtin:7 | NPC mistress | which servant to send | ARGMAX loyalty/trust | weighted: score² × mindW(spy). **Her own pick stays the best**, because the card shows its odds. |
| jmen:218 | consort | reaction to a stray man | THRESHOLD per trait, no dice | weighted 4 answers; her old answer +4 (still the most likely), scaled by hostility and mindW (court / bribe / spy / help) |

### Kept on purpose (not a "best option" choice, or must stay stable)
- **Ability-driven picks** (the owner rule says to choose by ability):
  - j34:13 contest art = her best art;
  - j75 npcEffort chain (vũ ≥ 3 → cầm ≥ 3 …);
  - jexam exam art.
- **Rules, not choices:**
  - Emperor promotion thresholds (promoReqP, exams);
  - punishment severity;
  - Thái hậu / Hoàng hậu regard thresholds (j8:420–422);
  - the j9:35 meeting outcome.
- **Identity lookups called many times per screen** (randomness would flicker or desync):
  - j99succ succEnemy;
  - j8 tKid / kframe target child;
  - jecon econBanTo (shown in the stipend card);
  - jpoison dish choice.
- **Already weighted:**
  - Emperor night pick (nightCh: sủng, sắc, arts…);
  - heir choice (kvOrder);
  - j85 study;
  - j51 heir plot;
  - jtruth frame doer and victim;
  - j55 impeachment;
  - j70 plot choice.
- **Not touched:** jtruth:87 defence road (ARGMAX odds). It is the framed person's best defence and is shown to the player as a road, so it is not an AI move.

## Tests
- `node dev/test/npcmind-check.js <main index.html> <branch index.html> [shots]`: an old main save loads with 0 page errors; every person has all five traits; values are the same after a reload; gift rules work (Thái hậu like/dislike, her mood after an NPC gift); person cards (consort, Emperor, Thái hậu, herself, close maid, Thái y, child) at 755x1000, 1180x820, 1000x755, 1366x1024, 844x390 and 412x1058 show no overflow and have the rows/chips.
- Probe: `dev/test/npcmind-probe.js`.

## Balance (sens bot, `EXTRA=inpers.js node dev/measure/runpers.js sens N out.json`, same CAP for both builds)
Canonical harness: `INP=inpage6.js INP2=inx.js HHSTOP=1 node dev/measure/runb.js sens 40`.
- Setup: 2 processes per build, CAP 3000 s, the same machine at the same time.
- BASE = 44f9e10 (main + personality-r1 + pcard-dislikes, before npc-mind). NEW = this branch.

| build | lives | Hoàng hậu (maxRank 7) | early death (died before HH) | Thái phi (outlived the Emperor) | crash / timeout / page errors |
|---|---|---|---|---|---|
| BASE | 28 | 1 (4%) | 14 (50%) | 13 | 0 / 0 / 0 |
| NEW | 28 | 0 (0%) | 14 (50%) | 14 | 0 / 0 / 0 |

- maxRank spread: BASE 1:3 2:5 3:6 4:4 5:5 6:4 7:1; NEW 1:1 2:3 3:5 4:9 5:8 6:2.
- At n=28 one life is about 3.6 points (95% band about ±17).
- **npc-mind does not move the numbers beyond noise.** Early death is identical. NEW lives climb at least as high (more lives end at ranks 4–5).
- **OUT OF RANGE, but already in BASE:**
  - Hoàng hậu is 0–4% against the ~32% target (OD:L20). It was already low after personality-r1 (that review measured 17%).
  - Early death is 50% against the ~40–45% target.
  - Most lives now end with the Emperor's death at about year 13–14 (Thái phi), before she reaches Hoàng hậu.
- BAL was NOT tuned here. This is a main-level regression from earlier merges (personality greetings plus Emperor mortality, OD:L1116), not from this branch. A tuning that fits it belongs in a balance pass with bigger samples. **ESCALATED to the coordinator.**
