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

## Bot results
See the tables below (filled from `node dev/measure/mort-bots.js 20 5` / `20 20`, new vs `MORT_OFF=1`).
