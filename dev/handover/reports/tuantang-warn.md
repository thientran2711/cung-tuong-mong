# TUANTANG-WARN — report (worker session_01PEhRbxieBKhF66jW9SU6j4, depth 2, START_CTX ~4 %)

PRIORITY #1 CHECK ('tuẫn táng|tuan tang|tuantang'): OD 0 | ledger 0 | main dev/build/jmort.js:193 + dev/build/j3.js:233 (two tuẫn táng rolls) | review/* none (reign-end / reign-road / mortality / npc-death / tmk-warn checked: none touch the tuẫn táng rolls) | claims TUANTANG-WARN → this session. Related: ILLNESS-CURE (review/illness-cure) owns illness deaths — listed below as «ILLNESS-CURE», not touched.
KIT CHECK: reuses the PEND dialog (Q item + mkP, same as PEND.rg / succ0), option rows {n, fx (Tốn), j67 (odds word · tốn · thành · hỏng → markTxt marks), need (✗ row)}, resultShow result card, pMe(). No new UI part, no CSS.

## Status
RV READY (BIG) 46c6853 on LIVE 18003079 (branch review/tuantang-warn). Foreman: C ROOT 4-1-1 session_01PEhRbukr4GYy3DnzMDdpJD.

## 0. History / drama check (law 8)
- Ming dynasty: tuẫn táng (殉葬) of consorts for Hongwu (1398, ~40 consorts), Yongle, Hongxi, Xuande; ended by Emperor Yingzong's will in 1464 («the practice should stop with me»). The victims were mostly childless consorts; mothers of princes went with their sons to the fiefs (Minh sử, Hậu phi truyện). → path B: childless + favoured = risk; a child protects (already in the engine).
- Han: after Liu Bang died, Lã hậu (now Thái hậu) took revenge on the favourite Thích phu nhân, while the little-favoured Bạc Cơ was let go with her son to Đại (Sử ký, Lã thái hậu bản kỷ). → path A: the new Thái hậu settles old scores; being out of favour / keeping a low profile saves you (NẶNG road «Cáo bệnh, lánh xa ân sủng»); good ties with the new Thái hậu save you (NHẸ / VỪA roads).
- Qing: Nurhaci's Đại phi A Ba Hợi forced to follow him (1626) by the new ruler's side citing the will — the will is in the hands of the court → bribing the eunuch who holds the di chiếu (VỪA bạc road, path B) and the court pleading (Đức save, existing).
- Signs come first in reality: the Emperor's illness (Thái y reports), the will being drafted, palace talk.
Sources (web, mixed quality — popular history; primary = Minh sử / Sử ký): https://en.wikipedia.com/wiki/Zhengtong · https://www.theworldofchinese.com/2021/11/how-ancient-chinese-buried-the-living-along-with-the-dead/ · https://ancientwarhistory.com/?p=20570 · https://mingtombs.eu/o/cocu/cocu.html

## 1. Reproduced on LIVE 18003079 (dev/test/tuantang-warn.js on the LIVE build)
- Path A «Tân Thái hậu xét lại chuyện cũ» (= Foreman E ES8 seed 902785299, Tân Thái hậu Lôi Thanh Từ): 4 months with the Emperor's sign → **0 cards before**, then «… ban lụa trắng, ép ngươi tuẫn táng theo tiên đế» (Mong manh).
- Path B «Di chiếu theo hầu nơi Hoàng lăng» (childless favourite): **0 cards before**, fate «Tuẫn táng theo tiên đế».
Both rolls lived inside emperorDies with no sign, no road, no odds shown before the day.

## 2. Family scan (law 11) — every game-imposed death/end of HER life (scan: every die()/over()/deathSentence() call in dev/build/*.js, 104 hits, regex `(?<![\w.])(die|over)\(` + grep deathSentence)
| # | path (file:line) | warning signs today (before) | paid roads today (before) | after this branch |
|---|---|---|---|---|
| 1 | Tuẫn táng A — Tân Thái hậu (j3.js emperorDies) | none | none (hidden Đức/tie math) | **FIXED**: «Lời đồn hậu sự» cards + 3-tier roads, odds word shown |
| 2 | Tuẫn táng B — di chiếu theo hầu (jmort.js mortFate) | none | none (hidden Đức ≥ 50 / Thái hậu ≥ 40) | **FIXED**: same cards + roads; NẶNG road also lowers Sủng under the line |
| 3 | Ban chết for her own scheme caught (j8 poison/kpoison/kframe, j4 spy, j22/j30/jmen/jroute tư thông, j8 fake pregnancy, jroute escape, jpq, j99succ c_fail) | the act card itself says «lộ: ban chết» + odds word (jaudit 9) before she acts | choosing not to act; first-year mercy; nhân từ mercy → lãnh cung; j22 «Thú tội» | OK — her own decision; no change |
| 4 | Ban chết on an NPC accusation (jroute trích huyết nghiệm thân, charges) | the accusation dialog | defence / confess options (rtOpt); PUNISH-TIER charges flow | OK — owned by PUNISH-TIER; no change |
| 5 | Lãnh cung death «Chết rét, chết đói» (j14 coldMonth, Sức ≤ 0) and «Bệnh nặng» (j3 endTurn, Sức ≤ 0) | Sức bar + monthly cold lines («Đêm đông giá buốt…») | rest, letters/faction cards in lãnh cung, Thái hậu mercy, đại xá | PARTIAL — no explicit «sắp kiệt sức» beat before Sức hits 0 → **follow-up proposed** (small: one kitNotice-level warning at low Sức; not done here, needs a kit/notice choice) |
| 6 | Phát điên in lãnh cung (j14, tâm bệnh st 3) · illness deaths (j13, jbal2 illness, jmort old-age critical illness) | ILLNESS-CURE | ILLNESS-CURE | **ILLNESS-CURE** (not touched) |
| 7 | Lifespan end (jmort kill «Tuổi trời đã tận») | omen illness thoO months before (85 %); BAL.mort.sudden 15 % no omen | treat / care (+ ≤ careMax years) | OK for 85 %; **question Q2** for the 15 % sudden |
| 8 | Accidents (jmort ACC, acc.me .05 %/yr) | none (an accident) | none | **question Q2** |
| 9 | Birth deaths (jmort khó sinh, giữ mẹ hay giữ con) | pregnancy known; Thái y | an thai etc.; «giữ mẹ hay giữ con» = the Emperor's choice (owner 16/11 approved) | OK — no change |
| 10 | Poison / assassination by others (jpoison, jbal2 poison) | owned by the poison system (OD 26/11 21:40Z «Giữ bệnh, độc, ám sát») | thử độc / counters in that system | not touched; listed for the reviewer |
| 11 | Servant road deaths (j42: beaten, wells, overwork) | servant mode | servant mode | out of scope (consort order); noted |
| 12 | Co-op «bị hại» (jcoopworld) | two-way with the other player | — | not touched |
Also seen (not mine, flag): **j3.js:215 «Tuổi xuân qua đi» age-40 end is still on LIVE** although OD 26/11 ~21:30Z removed it (owner «Đời tôi chỉ kết thúc khi…») → owner of REIGN-END / PACE-SPEED should check.

## 3. The fix (branch review/tuantang-warn)
- NEW dev/build/jttw.js (assembled right after jmort.js): ttwRisk() reads the SAME conditions the engine uses on the day (heir pick j99succ/j51/j3, Vương gia ally j24, rank, her own son, Đức/Thái hậu saves, NPC regent claim −12). When her chance to be spared is below BAL.mort.ttw.warnO (83 = the «Rất vững» cut) a **«Lời đồn hậu sự»** card comes: at once the first time, then every cd.sign (3) months while the Emperor shows a sign (jmort omen illness / Thái y «hay mệt» / plot rumour), else every cd.quiet (12) months. The card names the sign, who threatens her (the heir's mother by name if known, or the old custom), and her chance today as an odds word.
- ROADS (law 2: ≤ 3 tiers, Tốn and Được rise together, bạc paired with a same-tier non-bạc road; law 3: every road gains, a failed road still gives Đức/Sức; law 6a: every road can fail):
  NHẸ «Năng sang thỉnh an <mẹ Thái tử>» / «Chép kinh dâng Thái hậu» — Sức 8, Có cơ → protection +6, tie +
  VỪA «Dâng lễ hậu cho …» / «Đút lót thái giám giữ di chiếu» — Bạc 60 (price67) ⟷ «Hết lòng chăm lo cho <Thái tử>» / «Ngày ngày hầu thuốc bên Thái hậu» — Sức 18 · same odds → protection +12, tie ++ (bạc road shows ✗ need when short)
  NẶNG «Cáo bệnh, lánh xa ân sủng» — Sủng 15, Vững → protection +20, Đức +, Sức +
  + «Để sau».
- ON THE DAY: path A adds S.ttw.pz to the j3 odds base (one formula j3SpareB(v) shared with the warning); path B: a hit is averted by roll(min(cap, pz)). Protection capped at BAL.mort.ttw.cap 40 → the end can still happen. With no road taken the rolls are exactly as before (mortality.js «childless favourite, low Đức» still → Tuẫn táng). Death / spared texts say whether her preparations counted.
- TWO-WAY (law 1): NPC consorts at risk B take a road per beat (npcP 50 %, v.ttwPz); when she, as the new Thái hậu, forces a foe to tuẫn táng (j99succ «Chuyện cũ hậu cung»), the foe's roads can save her (triều thần can → chùa).
- Numbers: BAL.mort.ttw in jbal2.js (law 4; one-core guard clean after moving the j3 formula into j3SpareB). Words: cổ trang, odds words only, no % (law 7).
- Off in co-op (Emperor death muted there) and on the servant road.

## 4. Tests
- NEW dev/test/tuantang-warn.js: 34 checks (signs first, spacing, odds words/no %, tiers + bạc pair, raise + cap, failure gain, bạc need, day odds +pz, end still possible at cap, spared texts, path B avert + still possible, no-risk cases, NPC roads both ways, old save without S.ttw, co-op off) → 34/34 on 13 of 14 runs; the one red run was before the last state pin (random month events); later runs all green. On the LIVE build it prints the REPRO lines (0 cards before).
- dev/test/mortality.js 120 2: fates unchanged, old save ok, 0 errors. dev/test/succession.js 755x1000: output identical LIVE vs branch (its existing fails are on LIVE too).
- Shots Fold 755x1000 + iPad 1180x820 (looked at, not in git): card on the kit event stage (sign line, threat line, «cơ được tha: Mong manh», 4 road cards + Để sau); tapped «Dâng lễ hậu» shows TỐN «Bạc 50» + odds word «Tùy duyên» + hint (kit hideOut). 0 page errors, no horizontal overflow. Card is `must:1` so the j68 event gate never drops it.
- QUICKCHECK PASS · 46c6853 vs live 18003079 · 564 s · old save ok · core gates PASS (one-core guard clean) · perf new/live render 311/305, buổi 1735/1472 ms (noise range; live runs vary 1466–1750).

## 5. Questions (law 16 — not my decision)
- Q1: warn threshold = anything below «Rất vững» (83) and the card rhythm 3 months with a sign / 12 months without — MAIN to confirm or set.
- Q2: the 15 % sudden lifespan deaths (BAL.mort.sudden) and accidents have no warning by nature (real world). Keep as is, or give every sudden death a one-month sign? (Changes WHEN ends fire → owner.)
- Q3: follow-up «sắp kiệt sức» warning for Sức-0 deaths (lãnh cung / overwork) — open a small worker?

## r1 — RV-163L FAIL-1/2 fix (58a10245 on 46c6853)
- FAIL-1: NPC roads now run every month on the NPC's OWN risk (childless, Sủng ≥ tuanSung, Đức below tuanDuc), on its own rhythm (v.ttwLast, cd 3/12 like hers), independent of her risk (ttwMonth → ttwNpc first).
- FAIL-2: NPC roads pay the same cost and roll the same BAL odds as hers (odA(v, road.p)); failure → no protection, fw still applied; Bạc road only when the NPC has the bạc.
- Tests: tuantang-warn 40/40 (4 runs): probe (her son heir → she has no risk; npcP 100 × 12 months → NPC takes roads), NPC roll = road odds, fail = no pz + fw, success = pz, her order can still go through. MUTATE: «tick only when she is at risk» → FAIL-1 assert red; «NPC road always succeeds» → 3 FAIL-2 asserts red.
- mortality.js unchanged · succession.js = LIVE except «fail-c»: branch now reaches the expected «Mưu nghịch bất thành · ban chết» (LIVE shows a new-life card there; likely RNG shift from the monthly NPC rolls).
- Quickcheck 58a10245 run 1: open/old save/perf PASS, gate G4 95-next-dead FAIL inside a 1026 s gate run; next-dead.js alone = FIX-6 PASS ×2 branch, PASS on LIVE (load flake). Rerun: **QUICKCHECK FAIL** (perf only): core gates PASS (next-dead flake confirmed), old save ok, open ok; perf longTaskMaxMs median 3470 vs live 2133 (limit 3413). Runs: new 3470/3450/3982, live 2133/4019/1920; run 1 of the same sha passed perf (3399 vs 3242). Not proven to be noise; my monthly code is a loop over the rivals plus one kvOrder per month. To settle it, rerun perf, or profile the longest task (successor / reviewer).

## r2 — ORDER (Foreman C ROOT 4-1-1-1, MAIN 185 rulings 28/11 02:20Z) — NOT STARTED, HANDOVER
Worker rolled over at context (START_CTX ~4 % + 25 %); successor builds r2. Verbatim order from the foreman:
«Q1 = OK. Q2 = YES: every sudden lifespan death (BAL.mort.sudden) and every accident gets a ONE-MONTH sign first (an omen line/card a month before, in words; from BAL, law 4; NPCs same, law 1). Q3 = YES: «sắp kiệt sức» warning before Sức-0 deaths (lãnh cung cold/hunger j14, j3 «Bệnh nặng», j42 overwork/kneeling «Kiệt sức chết…» — scan every Sức≤0 die() call, law 11, table before/after) with a road out (law 2/3). Age-40 flag = MAIN seat REIGN-END, not yours. PRIORITY #1 CHECK ('sắp kiệt sức warning' / 'sudden death sign'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0. Build it on a STACKED branch review/tuantang-warn-r2 on 58a10245 (so RV-163M's re-review is not disturbed); tests with MUTATE, rebuild, quickcheck, Fold + iPad shots, old save. Report section r2 in reports/tuantang-warn.md, then «RV READY (BIG, delta) <sha>» to me.»
Pointers for the successor (from this worker's reading):
- Sudden deaths: jmort.js assign() sets p.thoO = roll(M.sudden)?0:omen → thoO 0 = no omen. A one-month sign = when thoO is 0, still show a sign at ml ≤ 1 (new BAL key e.g. M.suddenSign:1 months); omen()/weak() text shapes are in jmort.js. Accidents: monthMort → accY/accText roll and kill in the same month → change to «pending accident» (p.accP = {t, mo:1}) shown one month before (a sign line: e.g. bậc đá đóng băng / ngựa kinh) and applied next month; same for NPCs (law 1). The Emperor's accident → S.mort.empDue path (kill sets empDue) — sign must come a month before too. The test harness dev/test/tuantang-warn.js shows how to pin state (PIN, BAL.mort.acc zeroed in tests).
- Sức-0 deaths, scan list (from the 104-call scan): j14.js coldMonth «Chết rét, chết đói trong lãnh cung» (S.suc ≤ 0) · j3.js endTurn «Bệnh nặng, không qua khỏi» (S.suc ≤ 0) · j42.js:268 «Kiệt sức chết… / Lao lực kiệt sức mà chết» · j42.js:368/402 «Quỳ phạt đến kiệt sức mà chết» · j42 beatings (323/388/562) are punishments, check if Sức-based · dieIf (j8) is NPC Sức ≤ 0 (law 1 side). Roads: rest / xin nghỉ / thuốc / cầu xin (tiered, a bạc road paired with a non-bạc one).
- Kit: reuse the PEND + Q item pattern in jttw.js (must:1 for life-or-death cards; the j68 event gate drops optional cards). Shots: /home/user/wt/ttw-tmp/shot.js shows how to get past title / life intro (dev/index.html via ts.local route, remove #klife, do not force S.rank → a promotion edict covers the card).
- Quickcheck: ~25 min; run it in the background and do not pgrep for «quickcheck» in a waiter (it matches itself).
