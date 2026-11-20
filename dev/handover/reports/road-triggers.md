# road-triggers (E26, opus) — GAP OR16 + OR18 (OR20 handed to the successor)
PRIORITY #1 CHECK ('reason trigger|npcWhy|biên ải|cải cách|kế vị|lãnh cung|hhSummons'): OD 13 | ledger 2 | claims 2 | main 15 | review/* 0 | archive 70
- LAW 13: review/reign-road-r1 (PASS 0a311183) + reign-road-fix are LIVE on main (jreign «Tân quân lập uy», kitNameList in j10/j2/j27/j34/j42/j61/jgift/jht; the
  "NOT ancestor" answer of a depth-30 fetch was shallow history, the code is on main). Reused: j67 engine, npcWhy (jagwhy), U3 men-road engine (jnroadm), j72 nr_* help hồi.
Branch review/road-triggers, sha: see the last line. Base origin/main (merged before the report).

## OR16 — each hồi opens on a REASON, timer kept as fallback (dev/build/jrtrig.js, new; loads after jagwhy1.js)
- STORY_ROADS_PLAN §1 "A hồi fires only for a real in-game reason (a person's goal, grudge, debt, faction move, an event, a deadline) — never a daily dice".
- Every j67 chapter (14-chapter life, the full origin roads jroad/jrd_*, old v2 frame): from BAL.arc.trig.min months after the last hồi, each month npcWhy("hoi67")
  asks the hồi's REAL cast ({v}, {v2}, the family foe, the Hoàng hậu when the hồi needs her) for a reason; the strongest opens the hồi now. Kinds:
  grudge (j9 hostility to her, or HER oán to them — two-way, law 1), debt (j72 nợ ân both ways), faction (jreign side against / with hers), goal (that person's own
  NPC road names her as rival), event (one of them acted on the other in the people ledger S.roster.acts). First month needs a strong reason (early × min).
- No reason → the old timer opens it (numbers unchanged, now in BAL.arc.trig.fb / fr / st instead of inline 2+rI67(3) / 2+rI67(2) / 1|3+rI67(3) in j67.js).
- On screen (existing kit only): Mệnh truyện card text "… Cớ sự: <reason>.", hồi dialog body a «past» line "Cớ sự: <reason>." after the title, Sổ ghi line.
- One person moves a hồi at most once per BAL.ag.why.cd.hoi67 (6 tuần). Off switch BAL.arc.trig.on = 0.
## OR18 — the Emperor's NPC road, templates 2–4 (dev/build/jnroade.js, new; loads after jnrask_m.js)
- STORY_ROADS_PLAN §3.1: "4: tân quân lập uy (reign), biên ải chiến sự, cải cách triều chính, kế vị / lập Thái tử | jreign «Tân quân lập uy» = template 1 as is".
- Template 1 = jreign unchanged. After its struggle ends (rg.out) — or at once in a life with no reign line — he lives ONE of em_bien «Biên ải chiến sự»,
  em_cai «Cải cách triều chính», em_ke «Chuyện kế vị» (8 chapters .4–.11 each) on the U3 men-road engine: own odds (stat = throne grip rg.p), off-screen,
  palace news, his road line on his person card, one help hồi for her (j72 nr_*, asker «Hoàng thượng», voice trẫm, only with Sủng ≥ askSung, never in
  learning chapters / servant life / lãnh cung; he never asks her to plead before himself). Rolled per life avoiding last life's (localStorage ctm-emproad).
- Gain AND loss on real fields (BAL.nroad.men.emp): biên ải → Biên cương + Đại tướng quân house; cải cách → Kho lúa + the strongest other house (old guard);
  kế vị → the two princes closest to the succession (fond). Her house / her son hit → she reads it in the news line. Tags NEVER name an heir (j51 heirName only).
- Interpretation to confirm (FOREMAN E): "template 1 as is" read as "jreign comes first in a reign life, one of 2–4 follows it"; the alternative (roll 1 of 4 per
  life, jreign off in 3 of 4 lives) would change a working rule (law 16) → not built.
## OR18 history expert note (law 8, written before the templates)
- Biên ải chiến sự: the classic court arc is *tin cấp báo → chủ chiến / chủ hòa debate → chọn tướng → quân lương (Hộ bộ) → the decisive battle →
  khải hoàn or nghị hòa / cắt đất*. Real models: Han Wudi vs the Xiongnu, Tang vs Tufan, Kangxi's own campaigns against Galdan (1690–97), Lý
  Thường Kiệt's war (1075–77) on the Vietnamese side. The palace link is real too: palace women sewing winter robes for the frontier troops
  (Tang Kaiyuan "poem in the robe" story) and cuts of palace spending in war years. The game's own enemy countries (Bắc Địch / Nam Chiếu)
  play the enemy; the Đại tướng quân house leads the army, so his house rises / falls with it.
- Cải cách triều chính: *a reform memorial → old ministers kneel and protest → trial in one province → tax / granary test → censors' memorials
  (Ngự sử dâng sớ) → corrupt officials exposed → a famine year blamed on the new law → it stands, half stands, or is repealed*. Models: Wang
  Anshi's New Policies under Song Shenzong (repealed after him), Yongzheng's reforms (tax-in-silver from land, the huohao reform, Quân cơ xứ),
  Hồ Quý Ly's reforms. The strongest old house is the natural opponent; Kho lúa is the in-game measure.
- Kế vị / lập Thái tử: *ministers press about "quốc bản" → he tests the princes → whispers in the harem → the princes' maternal clans form
  factions → the tutors of Thượng thư phòng are suspected of bias → a prince's fault → the sealed edict (Yongzheng's secret-succession casket
  behind the 正大光明 plaque, 1723) → the matter settled / left open / the princes more at odds*. Model of the danger: Kangxi's "nine sons" strife
  and the twice-deposed heir Yinreng (1708 / 1712). Rule kept: this road NEVER names the heir (only j51 heirName does), it moves the princes'
  standing with him (fond).
- Template 1 «Tân quân lập uy» = the regency struggle at the accession (jreign); it comes first in a reign-line life; the three above follow it.
## Tests
- dev/test/road-triggers.js (Fold 755x1000, seeded; tt/muoi/td 36 months + reason switch off + state test + Emperor road): PASS 17/17, 0 page errors.
  Sample reasons: «Thục tần Âu Dương Khinh Vũ ghen với ân sủng của ngươi», «Quý phi Lục Lan Chi tìm đến đòi ngươi trả ân», «… vừa ra tay với ngươi», «đường riêng của … vướng phải ngươi».
- one-core-guard PASS (inline 3837 ≤ baseline 4212, 0 fails), one-core-text / -bind / -text-rule PASS.
- QUICKCHECK PASS on 72a9b918 (after merging origin/main 66bd36cd): open 2230 ms, old save loads + plays a buổi, core gates PASS; perf render 233/232, tab 624/621,
  buổi 1719/1392 ms (inside the gate; watch: the monthly npcWhy reason check adds a little to the buổi), tasks>200ms 24/23.
- Shots: CDN upload refused for account E (HTTP 401, FOREMAN_E_STATUS 09:48Z) → no shots uploaded; nothing committed. The visible change is one text line
  in the existing kit dialog / card (no layout change).
## Measured (bot, 3 origins × 36 months, seeded): hồi gap with a reason 1.6 months, timer-only 2.0, reason switch off 2.25 → chapters run a little faster
  (deadline A.dl unchanged, so more slack); grudges dominate in real lives (strongest score), the other kinds are proven by the state test. Rules/numbers → BIG review.
## HANDOVER — OR20 not started (roll point reached; brief allows handing it on)
OR20 = j68 follow-ups (EVENTS_PROGRESS.md:66 "more templates for rank-specific life (Hoàng hậu duties), lãnh cung life, servant-road (j42) j68 variants").
Findings for the successor: the player's lãnh cung = S.out (j14 cold(); S.coldTurn set; but srvW / kcW also set S.out=1 temporarily); e68On() is false when S.out
or isSrv() → today no j68 life at all in lãnh cung or as a servant. Plan: new j68q.js after j68i.js: (1) wrap e68On to also allow real lãnh cung (S.out && S.coldTurn!=null
&& !isSrv && !kc) and servant life; (2) wrap e68Cands to keep only s.life==="cold" in lãnh cung, s.life==="srv" as servant, and drop those families elsewhere;
(3) Hoàng hậu duty templates gated by S.rank ≥ BAL.voice.hq && !S.out (thỉnh an mornings, lục cung accounts, judging two consorts, rites, tú nữ selection);
(4) EV6 format (j68g.js hhSummons is the model; c6 options with gain AND loss), every amount in a new BAL.eff.j68q (one-core-guard flags new inline numbers);
(5) cold-palace actors: fallen consorts (q72A "fallen"), the eunuch who brings food, S.maid; servant actors: srvM() mistress, fellow maids, quản sự.
Art: none needed (existing faces). Write it on a new branch from main or continue review/road-triggers after its verdict.

SẴN SÀNG KIỂM road-triggers 72a9b918d92d79325567e924b0278e7baeeb799e (BIG: rules/numbers)
