# PROGRESS review/mortality — one mortality model (thọ số) for every person

Owner rulings used (16/11, via coordinator): Emperor / Thái hậu can be poisoned, assassinated, fall ill and die; ageing for everyone;
every person rolls ONE hidden lifespan (no reroll); bell curve mean 45 sd 15 (15–85); children their own risk curve (12–18 % before 10);
care lengthens life at most +3 years (hard ceiling); omens approved, sudden deaths allowed; NO play floor (the roll decides);
birth rules: stillbirth, newborn death, hard birth survived (Sức loss, rarely barren), "giữ mẹ hay giữ con" = the EMPEROR's choice
(favour, heir need, Thái y's guess, Thái hậu, his traits) for her and every consort; natural miscarriage lowered to ~20 % a pregnancy.
Co-op: existing rule OD L94 (she reincarnates at once into the same world) — nothing new designed.

## Files
- `dev/build/jmort.js` (new, assembled right after jbal2) — the whole model. Pure core between `/*CORE{*/ … /*}CORE*/` (reused by the sim).
- `dev/build/jbal2.js` — `BAL.mort` (ONE source for every number, each knob commented).
- `dev/build/j3.js` — one line: the legacy Emperor roll `S.year>12&&roll((S.year-12)*1.5+…)` now asks `mortEmpDue()` (falls back to the
  legacy roll if `BAL.mort.on=0`). NOTE for the coordinator: review/succession-port changes the line just above (adds `,true` to the Lãnh cung
  over()) — trivial adjacent-line merge conflict; keep both.
- `dev/build/j8.js` — natural miscarriage base × `BAL.mort.birth.misX` (an thai halving and the Sức<30 +8 kept); counts `p.misN`.
- `dev/build/assemble.py` — `jmort.js` after `jbal2.js` (inside jcoopworld's and j99succ's emperorDies wrappers, so the succession CHOICE
  card of review/succession-port stays outermost and untouched).
- `dev/measure/mort-sim.js` (node, lifespan model alone), `dev/measure/mort-bots.js` (month-loop bots in the real build),
  `dev/test/mortality.js` (smoke: every person rolled, Emperor-fate branches, birth branches, old save).

## What existed before (LUẬT ƯU TIÊN SỐ 1) vs what was built
| area | existed (kept) | built here |
|---|---|---|
| Emperor death | j3 legacy monthly roll from year 13 (≈ certain by year 15–17), j24 vương gia, j51 heir rule, j3 endings, review/succession-port choice card | lifespan + plots + accidents replace the legacy roll; her fate when her son is not the heir |
| Emperor illness | j13 longthe (age > 50, never fatal) | omen illness before a natural death (Thái y reports, longthe nguy kịch) |
| Thái hậu | j13 illness (could kill), j4 story death | lifespan, omens, old illness death kept only `thIllKeep` % (lifespan carries the rest), court shift on death |
| consorts / her | j13+jbal2 illness (no age effect), epidemics, birth risk (j32, age +3/yr over 35), ban chết, poison (jpoison) | lifespan, omens, age makes illness easier / deadlier, accidents (a few odd ones), tiredness, grief |
| servants / maid / officials / men / children | no age death; children hp | lifespan for all; maid + staff refill (existing newMaid / fillStaff); officials replaced by a successor; newborn + child curve |
| birth | birthRisk death, miscarriage ~31 %/pregnancy | stillbirth, hard birth survived / barren, Emperor's choice, miscarriage ~20 % |

## The model (numbers in BAL.mort)
- Lifespan roll on first sight (start / appearance / birth / old save load): `mortDraw` bell curve {mean 45, sd 15, 15–85}, redrawn until ≥ the
  present age, ≥ `minMo` (3) months left. Children: `kid.risk` 12 % die young at 1–9 (bands), + `birth.newbornP` 3 % die in the first month → ≈15 %.
- Before a natural death (85 %; `sudden` 15 % strike without warning): the last 12 months weaker (Sức −2/month, +6 %/month illness,
  one Thái y line), the last 2–6 months an omen illness (Bệnh già / Trọng bệnh, Long thể bất an for the Emperor) rising nhẹ → nặng → nguy kịch.
- Accidents per year: her .05 %, NPC .08 %, Emperor .15 % (30 % of them the odd kind: nghẹn hạt sen, đuổi con vẹt…). Children none.
- Emperor plots per year: assassination .45 %, poison .3 %, ×(1+1.2×(50−power)/50) when `S.reign.power` < 50 (review/palace-start; 50 if absent);
  an omen month or two (rumour / người lạ ở Ngự thiện phòng), then cấm quân / thử món foils it 60 % ± (power−50)/2.
- Age: illness +1.5 % a month per 25 years over 35; a critical illness +25×weight×(age−45)/15 % death; sleep regen −1 per 5 years over 35.
- Care (hard ceiling 3 years): each new year Sức ≥ 70 / own thái y / Y thuật ≥ 2 give 12 % each of +1 year; curing the omen illness with the thái y
  +1; a year with none and Sức < 40 takes a gained year back; while kept up, a new illness is shaken off 15 % per source.
- Birth: stillbirth 3 % (+.5/yr over 35); hard birth at birthRisk × 2; of those 35 % → the Emperor's choice (% giữ mẹ = 50 + .5×(Sủng−50)
  + .2×Thái hậu (×2 if Hiếu thảo) − 15 no living prince − 10 Thái y guesses a boy + traits Nhân từ +10, Đa tình +5, Mê sắc +5, Lạnh lùng −10,
  Chăm chính sự −5; 5–95); otherwise 45 % the mother dies, else she survives (Sức −35, 8 % never conceives again). Event card "Giữ mẹ hay giữ con".
- Emperor dies, her son not the heir: a son → Thái phi theo con ra phủ; a daughter or rank Phi+ → Thái phi (old text); childless low rank →
  about half về quê (rank ≤ Thường tại, age < 30) else xuất gia làm ni cô; a childless favourite (Sủng ≥ 60) faces tuẫn táng 25 %, averted by Đức ≥ 50
  or Thái hậu ≥ 40 (no gore: "chén rượu tiễn biệt"). Her son the heir → existing flow / succession choice (untouched). The cause of death is
  added to the card ("Ngự thiện có độc." …).
- Thái hậu dies → quốc tang, the Hoàng hậu (or she, if Hoàng hậu) holds lục cung (Danh +5), the Emperor saddened.
- Switches: `life.show` 0 (hidden, owner), `life.dice` per group, `life.care` 1, `playerFloorYears` 0 (no floor, not read by code), `on` (0 = old game).
- Co-op: world people roll / die on the host only; her own life and household locally; the Emperor's death stays muted in co-op (existing
  jcoopworld rule). Old saves: everyone rolls once at load (`S.mort.old=1`). New games: rolled at start.
- Death ledger `S.mort.dl` (last 300: group, age, cause, year) for audits.

## No new UI
All text goes through the existing news/log lines, the existing kit modal (event card "Giữ mẹ hay giữ con" = a normal Q news item) and the
existing end card (`over()` with alive flag). No chip/row/frame added → no KIT REQUEST. Player-visible words cổ trang, no %, no numbers of odds.

## Bot results (16/11, build of commit after ef8759cb + fixes)
Bots = `dev/measure/mort-bots.js`: month-loop lives in the real build (monthTick directly, no buổi acts, so NO scheme miscarriages / poison by
rivals / punishments — those are game rules on top and unchanged). Pregnancies: conceiveCh once a month. Styles: sensible (treats illness, rests,
keeps Sủng/Danh), random (coin each month), reckless (no care, Sức −15/month), mother (sensible + a Thái tử son at start = the HTH road), world
(she is kept alive: reads every other group). "old" = same bots with `BAL.mort.on=0` (the game before this branch). Merge: `--merge *.json`.
Sim = `node dev/measure/mort-sim.js 40000` (lifespan model alone).

### 20 lives × 5 years per style
| style | she died new / old | Emperor died while she lived new / old | HTH ending new / old | children raised per life new / old | natural miscarriage new / old | she died in childbirth (per birth) new / old |
|---|---|---|---|---|---|---|
| sensible | 10 % / 5 % | 15 % / 0 % | 0 / 0 | 0.70 / 0.75 | 11 % / 26 % | 11 % / 6 % |
| random | 5 % / 5 % | 35 % / 0 % | 0 / 0 | 0.85 / 0.85 | 29 % / 32 % | 5 % / 6 % |
| reckless | 35 % / 20 % | 10 % / 0 % | 0 / 0 | – | – | – |
| mother | 10 % / 15 % | 20 % / 0 % | 20 % / 0 % | 1.60 / 1.90 | 19 % / 20 % | 3 % / 7 % |
Pooled natural miscarriage: new 22 % of pregnancies (36/161) vs old 30 % (43/143). Pooled childbirth death new 7.6 % of births (8/105), old ≈ 6 %.
Hard births seen (new): 16 (Emperor's choice 4); stillbirths 3.

### 10 lives × 20 years
| style | she died | Emperor died while she lived | HTH ending | children raised per life | childbirth death per birth |
|---|---|---|---|---|---|
| mother new | 40 % | 30 % | 30 % | 2.40 | 14 % (4/29) |
| mother old | 30 % | 70 % (legacy roll from year 13) | 60 % | 2.90 | 10 % (3/31) |
| sensible new | 40 % | 60 % | 0 (heir is another's son: Thái phi ×4) | 2.10 | 8 % |
Sim (lifespan + plots + accidents only): Emperor dies within 10 / 20 years 23 % / 53 % (start age 20–33, power 50); palace-start (19–24, power 30)
19 % / 45 % (plots 9 %). Her death by lifespan or accident within 5 / 10 / 20 years 4 % / 11 % / 33 %. Thái hậu alive after 5 / 10 / 20 years
61 % / 34 % / 8 %. Children dying before 10: 12 % (curve) + 3 % newborn ≈ 15 %. Adult curve rolled at 18: under 30 13 %, 30–39 22 %, 40–49 27 %,
50–59 22 %, 60–69 12 %, over 70 ≈ 5 %.

### Death-age histogram by group (all NEW runs pooled, ledger + classified)
| group | n | causes | 10–19 | 20–29 | 30–39 | 40–49 | 50–59 | 60–69 | 70+ |
|---|---|---|---|---|---|---|---|---|---|
| her | 23 | childbirth 10 · illness 8 · lifespan 4 · accident 1 | 1 | 18 | 4 | | | | |
| consorts | 369 | illness 196 · lifespan 116 · other 51 · accident 5 · childbirth 1 | 16 | 292 | 53 | 8 | | | |
| servants (maid + staff + officials) | 203 | lifespan 199 · accident 4 | 2 | 14 | 4 | 56 | 83 | 39 | 5 |
| Emperor | 32 | lifespan 30 · accident 2 | | 9 | 17 | 4 | 2 | | |
| Thái hậu | 62 | lifespan 56 · old illness 6 | | | | | 20 | 42 | |
| children | 42 | lifespan 21 · other 17 · illness 4 | 40 (0–9) | 2 | | | | | |
| men (lovers / officials outside) | 176 | lifespan 169 · accident 7 | | 23 | 101 | 41 | 11 | | |
Old model (same bots): only consorts (illness 141 of 158), her (childbirth / illness), Thái hậu (old illness / story) and children ever died.

### Findings for the coordinator (not changed here)
- Consorts in their 20s die of illness at a high rate in BOTH models (existing j13 + jbal2 illDie 2, illAdd 1): ≈ 13 % per consort-year in
  the bots. Not part of this task; worth a balance look.
- With the owner's curve (mean 45) the Emperor (20–33 at start) dies within 20 years ≈ 53 % (sim) — above the coordinator's earlier 25–40 %
  target, because the curve is the owner's. Lever if wanted: `BAL.mort.life.dice.emp` can get its own {mean,sd} (it is an alias of adult now).
- The HTH road (mother style) is reachable: 20 % in 5 years, 30 % in 20 years (old: 0 % / 60 % — the legacy roll killed the Emperor at year 13–17).
- Existing UI: on the end card the act-filter tab strip of the right page ("Tất cả 0/15 · Giao thiệp …") draws above the modal at 1000x755 and
  844x390 (seen in the mortality-ui shots, also with old endings) — a kit z-index issue, not touched here.

## Tests
- `node dev/test/mortality.js [months] [lives]` — every person rolled at start (0 missing), month loop no errors, Emperor-fate branches
  (xuất gia / Thái phi / tuẫn táng / miễn tuẫn táng / Thái phi with a daughter), birth branches (Emperor's choice both ways, hard birth survived,
  stillbirth), old save without S.mort rolls once at load. PASS, 0 page errors.
- `node dev/test/mortality-ui.js <outdir>` — the "Giữ mẹ hay giữ con" card and the "Xuất gia" end card at 755x1000, 1000x755, 1180x820,
  1366x1024, 844x390: open, no '%', no overflow, nothing off-screen, 0 page errors; 390x844 shows the rotate prompt. ALL PASS. Shots looked at.

## Review r1 (16/11, review/mortality-r1, opus reviewer)
- Merged origin/main cdad7109 (conflicts: assemble.py file list, j3 Lãnh cung `over(...,true)` + `mortEmpDue()` line, jbal2 BAL.mort + BAL.rg kept both; site rebuilt).
- ONE CORE (OD:L1267): moved every hard-coded number left in jmort.js into BAL.mort (cureTy/cureOther/cureSuc/careYt, omenSt, oldAge, thDanh (text prints it),
  repl, maidLoy, pre.omenSuc, emp.foilLo/foilHi/rumour/rumourMat/plotMo, dieAge[2], birth.stillSuc (text prints it)); mort-sim reads plotMo too.
- Fate bug: the Thái phi → Xuất gia / về quê / tuẫn táng / theo con re-route wrapped over() INSIDE later wrappers, so j93's ink animation, jkiep and jkc
  saw the legacy "Thái phi" (ink showed "Thái phi" over a Xuất gia card). Now installed at call time around the outermost over(); test asserts the ink title.
- "Giữ con" (she dies): no longer returns the birth/promotion line after her death.
- Stale header comment (mean 55 sd 12.5) corrected to the owner's L1151 curve.
- Tests added: care ceiling (40 years all sources + 40 cures → +3 = careMax), ink title per fate; mortality-ui.js takes SIZES / DSF env.
