# NIGHT-TIME — how often is she flipped, and how to fix "3 flips a month"

Analyst: s17 child (opus), report only, no game code changed. v2 adds §10–§16 (flip-chance table, Empress proportional, stealing, cycle, maid nights, player squeeze).
Owner ask: OD 16/11 14:20Z ("hậu cung tới 12 người … một tháng chỉ lật thẻ được 3 lần … tỷ lệ được lật thẻ rất là thấp").
Base measured: review/preg-rate-r1 @1c31bd79 (= what ships next: BAL.conc .5 + fertile window D57) built page, real weekly loop.
Bot: `dev/handover/reports/night-time-bot.js` (copy of the scratch bot; usage in its header). Summary script: `night-time-sum.js`.

# >>> V3 (current) — the owner's 10-night ledger, measured. V3 SUPERSEDES the older parts below where they differ <<<
Owner rulings applied: OD 16/11 17:15Z, L1386 (agents), 18:10Z (10 nights, keep 90 %/65 % per night), 18:40Z (played tối = her first night, extras = notice + own roll), 19:00Z (cycle by day; Empress day 1/15 by custom, never on the tray), 19:05Z (period 5/6/7 days rolled per woman per month).
Superseded below: §12 "drop the flat 90 %" (owner keeps 90/65 %), §13 "BAL.cyc.block .5" (now by day, 5/6/7), §14 maid nights (removed from this scope: npc-agent audit, OD:L1386), §4–§9 K=5 numbers (owner chose K=10). §10, §11, §12 self-interest steal model (as a hook) and §15 method stay valid.
[M] = measured by `night-time-bot3.js` (env V3=1, 100 lives × 10 years each, base review/preg-rate-r1 @1c31bd79, her stats floored as §2); [I] = input to re-measure after the build.

## V3-A. Measured: today vs 10-night ledger
| measure [M] | today, Sủng 25 | today, Sủng 60 | **10 nights, Sủng 25** | **10 nights, Sủng 60** |
|---|---|---|---|---|
| her nights / year | 1.2 | 1.6 | **29.7** | **38.2** |
| of which played tối (her first night of a tuần) | 1.2 | 1.6 | 14.5 | 15.7 |
| of which extra nights (notice + own roll) | — | — | 13.4 | 20.1 |
| months with ≥ 1 night of hers | 10 % | 13 % | **78 %** | **77 %** |
| her conceptions / year | 0.09 | 0.15 | 0.15 | 0.24 |
| her births / year | 0.05 | 0.08 | 0.08 | 0.15 |
| her first son by year 5 (alive then) | 21 % | 25 % | 26 % | 38 % |
| her first son by year 10 | 29 % | 37 % | 50 % | 67 % |
| NPC births / consort-year (D57 target ≈ 0.10) | 0.10 | 0.10 | **0.10** | 0.09 |
| NPC mean Sủng at year 5 / 10 | 55 / 69 | — | 70 / 82 | 67 / 80 |
| NPC mean Ân at year 10 | 4 | — | 44 | 41 |
| heir = an NPC son (full 10-year lives) | 92–95 % | 93 % | 96 % | 87 % |
(± about 8–10 points on the son rows at n ≈ 75. The "today" rows are the same seeds; v1/v2 runs agree.)
Settings that produced the 10-night columns: 90 %/65 % summon per night, Empress custom on day 1/15 and off the tray, cycle by day 5/6/7, **per-night conception = today's conceiveCh × 0.065 applied as a float at the roll** (BAL.nt.concF = .065 [M]), extra NPC nights give Sủng +1 with 50 % and Ân +1 (BAL.nt.extraFx [M]); the played NPC night keeps the full rivalNight.

### What the numbers say
1. She is chosen in ~4 of 5 months instead of 1 in 10, and her played tối comes about every 2.5 tuần (14.5 a year). The owner's complaint is fixed.
2. Births: with NPC births held at 0.10 her conceptions still rise ×1.6–1.7 (rivals pregnant more, her cycle blocks only real days, the Empress no longer takes a tray share). First son by year 10: 29 % → 50 % (Sủng 25), 37 % → 67 % (Sủng 60). By year 5 the gain is small at Sủng 25 (21 → 26 %).
3. **Conception precision is a must-fix**: conceiveCh() rounds to whole % in several wrappers. Lowering BAL.conc instead (×.045) rounded her per-night chance to 0 % at Sủng 25 [M: mean 0.04 %, 0.01 conceptions/yr, first son by year 5 = 3 %]. The factor must be applied as a float at the roll (spec 7).
4. Sủng/Ân inflation: full night gains on every extra NPC night push NPC mean Sủng to 94.5 and Ân to 91 by year 10 [M] (everyone capped, her nights fall). With +1 Sủng at 50 % and +1 Ân it is 82 / 44 [M] (today 69 / 4). Ân inflation is the bigger change: check every rule that reads NPC Ân (seat contests, pillow talk) in the balance pass.
5. Difficulty: her card pull ×1.2 / ×1.5 (her-side knob) adds nights (31 / 38 a year) but almost no sons [M: first son by year 5 = 24 % / 25 % vs 26 %, noise] — she is already chosen most months; pregnancy, not nights, is now her bottleneck. So the difficulty knob for the son squeeze should be her-side **conception** (Dễ ×1.6 / Vừa ×1.25 / Khó ×1.0 on her own roll [I]), tuned by the balance-pass HH bot to Dễ ~50 % / Vừa ~32 % / Khó 15–20 % HH. Not measured here (this bot cannot promote her).
6. Steals (hook only, review/night-steal builds it): her played tối ≈ 14.5 a year. With the §12 self-interest model using the player's own Tranh sủng / Chặn ngự giá odds: ≈ 5.5 contested and ≈ 2.5 lost a year [I: §12 rates × measured played tối]; she has ≈ 21 NPC played tối a year to contest herself.
7. Blank nights: 90 %/65 % per night gives ~1 blank night in 7 (35.9k blank of ~256k nights [M]); "nobody eligible" is rare (0.1 %).

## V3-C. Gain vs risk (owner format)
- Gain: chosen in most months, a played night every ~2.5 tuần, more sons over 10 years, D57 births held, history-true Empress days and cycle.
- Risk 1 — rounding: without the float roll, low-Sủng women can never conceive. Likelihood: dễ (if the worker just lowers BAL.conc). Severity: lớn. Detect: preg-rate.js + this bot (her conceptions per year). Fix: spec 7.
- Risk 2 — Ân/Sủng inflation. Likelihood: dễ. Severity: vừa. Detect: NPC mean Sủng/Ân at years 5/10 (this bot prints them). Fix: BAL.nt.extraFx (Ân +1 at 50 % too if seat contests skew).
- Risk 3 — notice spam: ~13–20 extra-night notices a year (about one every 2–3 tuần). Likelihood: có thể. Severity: nhỏ. Fix: one combined Sổ ghi line per tuần + one toast.
- Risk 4 — son squeeze not solved by nights (first son by year 5 only 26 % at Sủng 25). Likelihood: dễ. Severity: vừa. Detect: HH bot. Fix: her-side conception knob by difficulty [I].
- Risk 5 — co-op: two players both drawn in the same tuần; only one played tối scene is shared. Likelihood: có thể. Severity: nhỏ. Fix: each player's played tối is her own first day; the guest's scene plays on her screen only (night scenes are personal already); host rolls the ledger.
Kết luận: **Được lớn hơn** — the 10-night ledger fixes the core complaint with D57 held. It is safe only with the float conception roll and the reduced extra-night gains; the son squeeze needs one more her-side knob.

## V3-B. BUILD SPEC for the worker (10-night ledger) — owner OD 18:10Z, 18:40Z, 19:00Z, 19:05Z, L1386
Base: origin/main after preg-rate-r1 (D57) and the tham-flip-ui work are on main. Report-only analyst; numbers marked [M] measured by night-time-bot3.js, [I] input to be re-measured after build.
1. ONE file `dev/build/jledger.js`, loaded after j75, jcycle, jflip, jemo, jgift (it wraps flip). No second copy of any weight: every pick uses `nightCh(p)` (the Emperor's preference, see 3), every conception uses `night(p)` → `conceiveCh(p)`.
2. When: at the START of tối (OD 14:00Z #4), host only (co-op guest receives the result in the week merge like nightWhy). `ledgerRoll()` fills `S.ledger = {wk, days:[{d:1..10, day:1..30, who:"me"|id|null, why:"custom"|"pick"|"blank"|"none"}]}`.
3. Per day d (day of month = tuần×10 + d):
   - day 1 and day 15 → custom: the Emperor goes to the Empress's palace (queenP()); if she is barred that day (her period day, pregnant shown, ill, confined) → the visit is "ngự giá thăm" (no night) — reuse the j75 custom texts. If she is the player: her night.
   - other days → the existing summon odds per night: 90 %, 65 % when busy (has("chamchinh")) or the Emperor is ill (OD 18:10Z keeps these). Blank → "Hoàng thượng nghỉ một mình".
   - who: weighted draw over `consorts()` minus the Empress (her card is NEVER on the tray, OD 19:00Z), minus anyone whose period covers that day (4), weights `nightCh(p)`. nightCh is the Emperor's preference function (agent model, OD:L1386): his mood (mm), his traits (Mê sắc, Đa tình, Chăm chính), what each woman did to win him (Sủng, arts, Sắc, gifts/walks, tablet bribe), her state (ill, pregnant, admonished). No other flat roll is added. Flat rolls that stay, with why: the 90/65 % summon (owner keeps it, OD 18:10Z), the j55 troubled-court skip (court rule; owner not asked — list it to her as a question, recommend folding it into "busy" 65 %).
   - same person may be drawn on several days (each day is its own draw).
4. Cycle by day (OD 19:00Z, 19:05Z): each month EACH woman (player + NPC) rolls her period length from BAL.cyc.len = [5,6,7] (equal weight [I]); start day = her cycle tuần (cyBase t) × 10 + cyBase o (existing hash, so the same tuần as today). Only those days block her (`cyDay(p, day)`); `cyTray` stops blocking the whole tuần (keep it for the tray's grey "đang kỳ nguyệt sự" mark on the played tối only). The maid's lie (cyLie) hides only those days. Fertility factor BAL.cyc.fert stays by tuần (D57).
5. Played tối (OD 18:40Z): if she has ≥ 1 day → the cardflip scene shows HER card for her FIRST day (S.tonight="me"), the existing night scene plays. Else the scene shows the first NPC day (or the Empress custom if that is the only night). Every OTHER day of hers = notice: Sổ ghi line "Kính sự phòng ghi: ngày {day}, ngươi được lật thẻ thêm một đêm." + the kit's bottom toast (kit keeper names the part; if none fits → KIT REQ, no private toast) + gains BAL.nt.extraFx + its own conception roll via night(S). Every other NPC day = a Tuần lục/Sổ ghi line only if she has tai mắt (S.mat ≥ 2), else silent; gains BAL.nt.extraFx + night(v). The played NPC night keeps the full rivalNight.
6. BAL (jbal, ONE CORE): BAL.nt = {days:10, summon:90, summonBusy:65, extraFx:{sungP:50, sung:1, an:1}}; BAL.cyc.len=[5,6,7]; BAL.nt.concF = .065 [M: keeps NPC births 0.10 per consort-year], applied as a FLOAT at the roll (see 7).
7. Conception precision (MUST): conceiveCh() rounds to whole % in several wrappers (jbal ×BAL.conc, j35 ×.7, j24, jcycle). With 10 nights the per-night chance is below 1 %, so lowering BAL.conc makes low-Sủng women round to 0 % [M: her mean chance 0.04 % at Sủng 25, conceptions 0.01/yr]. Keep BAL.conc as is and multiply by BAL.nt.concF only at the roll inside night(): `roll(conceiveCh(p)*BAL.nt.concF)` (float). Displays (chanceLvl) show the per-TUẦN chance = 1−Π(1−per-night) over her ledger days, on the same ladder.
8. Stealing = hook only (review/night-steal builds it): `ledgerTonight()` returns the played tối {who, day}; a successful Tranh sủng / Chặn ngự giá (player or NPC, same acts and odds) moves ONLY that day's `who`; ntTake keeps "first success wins". Extra days are not stealable (already past by the notice).
9. Maid nights: out of scope (npc-agent audit, OD:L1386); the ledger draw must accept a maid entry later (who can be a staff id) — keep `who` generic.
10. Save: S.ledger optional (missing → roll on the next tối); old saves load. Co-op: host rolls, ledger sent in COOPW.pend with nightWhy; guest shows lines by her own knowledge.
11. Tests: preg-rate.js (update for float roll), cycle.js (day block, 5/6/7 per month per woman), night-day.js, coop-e2e (host-only ledger), palace-oldsave, a new dev/test/ledger.js (Empress never on tray; day 1/15 custom; her extra days → notice + conception roll; seeded counts). Re-measure with dev/handover/reports/night-time-bot3.js (env V3=1 NF=… LFX=.5) and preg-bots; balance-pass HH bot after landing.

---
# (older v1/v2 text follows)

## 0. Answer in five lines
1. Today she gets **1.2 nights a year at Sủng 25** and **1.6 at Sủng 60** (500 / 200 lives × 10 years). Only **1 month in 10** (1 in 8 at Sủng 60) has any night of hers.
2. The cause is not only "3 flips a month": each flip has ~6.8 cards on the tray, her share is **9 %** (13 % at Sủng 60), she is off the tray **41 %** of tuần (cycle tuần, pregnancy, illness), and ~1 tuần in 4 no card is turned at all.
3. Sủng is a weak lever: Sủng 25 → 60 gives only +33 % nights (nightCh = 4 + Sủng/4 + Sắc/12 + arts… /1.4, so the many flat terms drown Sủng).
4. More nights alone do NOT change births if conception per night is re-tuned (D57 targets kept): it changes how often she is **chosen**, Sủng/Ân income, and gives her a little more of the pregnancies because rivals are pregnant (off the tray) more often.
5. **Recommended: option D = "Kính sự phòng ledger, her night is always the played one"** (5 nights per tuần, tối flip unchanged in look): ~12 nights/yr at Sủng 25, ~16 at Sủng 60, a night in **57–64 % of months**, NPC births on the D57 target, no kit change, small save change, co-op host-only like today. Effort ≈ 1 worker + 1 reviewer.

## 1. How it works today (code, origin/main + preg-rate-r1)
- Time: 1 tuần = 10 days (TUAN thượng/trung/hạ, j1), played as ONE day of 4 buổi × 4 khắc (jtime4). endTurn (j3:87) → resolveTonight → rivalsTurn → (tuần 2: monthTick) → **flip()** once per tuần → 3 flips a month, 36 a year.
- flip (j8:486): 90 % chance a card is turned (65 % with Chăm chính), weighted by nightCh (j8:39 + wrappers j35, j75, jcycle, jemo, jgift, jroute). nightCh = 0 when pregnant / tablet hidden / confined / lãnh cung / her cycle tuần (jcycle cyTray: the whole tuần). Steals: NPC with hostility ≥ 50 has a flat 6 % (j8), player acts Tranh sủng / Chặn ngự giá (oSteal). j55: troubled court can cancel the night (30 %).
- 1st/15th (j75 FAIRN.custom [40,20]): tuần 0 / tuần 1 the Empress takes the night by chance.
- An NPC night (j75 rivalNight): Sủng +3…, Ân +2…, conception through night() unless giuBlocked (low rank, Thái hậu rule).
- Conception per night: conceiveCh × BAL.conc (.5 on preg-rate-r1) × BAL.cyc.fert {peak 1.6, low .5, cyc .1}.
- Seats (j30 SEATCAP {7:1,6:1,5:2,4:4,3:6}) + ranks 0–2 open → harem holds ~10–12 consorts; measured live tray ≈ 6.8 eligible cards per flip (the rest pregnant / cycle / ill / confined).

## 2. Numbers today (bot, 10 years, her stats floored: Sủng ≥ floor, Danh 15, Sức 60, Đức 55, rank ≥ 2)
| measure | Sủng 25 (200 lives; 300-life run agrees) | Sủng 60 (200 lives) |
|---|---|---|
| eligible cards on the tray per flip | 6.8 | 6.7 |
| tuần she is on the tray | 59 % | 57 % |
| her share of the tray when on it | 8.7 % | 12.9 % |
| **her nights per year** | **1.23** | **1.64** |
| months with ≥ 1 night of hers | **9.9 %** | **12.9 %** |
| her conceptions / births per year | 0.09 / 0.06 | 0.16 / 0.09 |
| NPC nights per consort-year (conception nights) | 1.41 | 1.40 |
| NPC births per consort-year (D57 target ≈ 0.10) | 0.10 | 0.10 |
| end of 10 years: palace children alive / NPC sons | 11.6 / 5.6 | 11.8 / 5.8 |
| lives with a son of hers alive at the end | 12.5 % | 16.0 % |
| heir = an NPC son / her son (full 10-year lives) | 95 % / 1 % | 93 % / 1 % |
HH reach: this bot does not promote her (rank floor 2), so it cannot measure HH. Last measured by the balance bots: **HH reach ~5 % on main vs target ~32 %** (HANDOVER s12/s13, balance-pass owner Foreman B). Her nights feed Sủng, Ân and sons, which are the HH conditions, so night scarcity is one of the roots of that 5 %.
Note: the bot player dies before year 10 in ~half of the lives (known: bot does not treat illness, mortality domain); all per-year rates use the years actually lived.

## 3. Root causes (why it feels bad)
1. **One night sampled per 10 days.** 36 nights a year shared by ~7 live cards. Even a perfectly fair tray gives each consort ~5 nights a year; she has 1.2 because:
2. **Her share is small**: 9 % at Sủng 25. NPC weights carry their arts, Sắc, rank (+5 for rank ≥ 7), staff, items; she starts weak.
3. **Sủng barely moves the card**: +35 Sủng = +8.75 raw weight, /1.4 = +6 points against a tray total of ~60–70 → +33 % nights only. Players feel "I raised Sủng and nothing happened".
4. **Her cycle tuần removes her for the whole 10 days** (cyTray). Real cycle ≈ 5 days, so one third of her month is blank where history would blank ~one sixth.
5. **No card in ~1 tuần of 4** (10 % no-flip roll, court trouble j55, everyone barred).

## 4. Options
All numbers: same bot, same seeds, 150 lives × 10 years, Sủng 25 unless marked. K = nights per tuần (1 = today). "BAL.conc ×" = how much the per-night conception had to fall to keep NPC births on the D57 target (≈ 0.10 per consort-year).

| | today | C: 2 played days a tuần | A/B: 3 nights a tuần | **D: 5 nights a tuần** | D at Sủng 60 |
|---|---|---|---|---|---|
| K (nights per tuần) | 1 | 2 | 3 | 5 | 5 |
| BAL.conc multiplier used | ×1 (.5) | ×.37 | ×.24 | ×.14 | ×.14 |
| **her nights / year** | 1.23 | 3.28 | 5.60 | **12.47** | **16.03** |
| months with ≥ 1 night | 9.9 % | 23.6 % | 35.6 % | **56.9 %** | **64.3 %** |
| her conceptions / year | 0.09 | 0.10 | 0.11 | 0.17 | 0.24 |
| her births / year | 0.06 | 0.07 | 0.07 | 0.10 | 0.14 |
| lives with a son of hers alive at the end | 12.5 % | 11.3 % | 13.3 % | 17.3 % | 23.3 % |
| NPC births / consort-year | 0.10 | 0.10 | 0.11 | 0.12 | 0.11 |
| palace children alive after 10 y | 11.6 | 11.5 | 12.8 | 13.5 | 13.3 |
| heir = NPC son (full lives) | 95 % | 95 % | 91 % | 87 % | 84 % |
| shown chance per night (mean) | 7.9 → "Thấp" | 2.8 | 1.9 | 1.4 → "Rất thấp" | 1.5 |
Reading: more nights per tuần raises how often she is chosen ~10× (K=5) while NPC births stay on target (K=5 slightly high, 0.12: trim to ×.12, which gave 0.11 in the first calibration run). Her conceptions rise ×1.9 because rivals are pregnant (off the tray) more often and her cycle no longer costs the whole share of nights; heir pressure from NPC sons eases a little (95 % → 87 %).

### Option A — Kính sự phòng tuần ledger (summary nights)
- Feel: the tối flip stays exactly as now (one card, the played night). At "Sang ngày mới" a ledger line in Sổ ghi / Tuần lục: "Kính sự phòng ghi: mười ngày qua Hoàng thượng triệu Lan Quý nhân 2 đêm, Hoàng hậu 1 đêm (mùng một), ngươi 1 đêm (ngày 7)". Her ledger nights give a short summary line with small gains, no scene.
- Code/BAL: new jledger.js wrapping flip (tối start, per OD 14:00Z #4): draw K−1 more nights by the same nightCh weights (ONE CORE: same function, no copy); BAL.nt {perTuan:5, ledgerFx:{sung:1,an:1}, cycDays:.5}; conception roll per ledger night through night()/conceiveCh; BAL.conc re-tuned (×.12–.14 for K=5) by the preg bot; NPC rivalNight gains only on the played night, ledger nights use ledgerFx (else NPC Sủng inflates ×5). Cycle: in her cycle tuần half the ledger nights are open (cycDays) instead of zero (closer to a 5-day cycle).
- Weak spot: her ledger nights are only text. When she is chosen the player does not SEE it as a night → the owner's complaint is only half fixed. That is why D exists.

### Option B — several cards turned per tối (3 cards)
- Feel: the tray turns 3 cards in a row; 3 nights; she plays hers if one is hers.
- Numbers = K=3 column: 5.6 nights/yr, a night in 36 % of months.
- Code: cardflip scene (jflip, KIT §67) and tray change from 1 to 3 picks = a KIT change (kit keeper first, all 4 device sizes), steal rules must say which of the 3 nights is stolen, co-op tray sync for 3 picks. Not more nights than D, more kit work, a longer scene every evening.

### Option C — more played days per tuần (time-system change)
- Feel: e.g. 2 played days per tuần (6 played tối a month). Every night is a real scene.
- Numbers: K=2 column: only 3.3 nights/yr, a night in 24 % of months — still bad, and it costs the most.
- Cost: every per-tuần rule is tied to S.tuan and one played day: Sức +4 per tuần, Sủng −1 per tuần, rivalsTurn (NPC schemes, block, ghen decay) per tuần, 22 % dilemma per tuần, stipends/lots, rivalsBuoi twice a day, co-op timer (jcooptimer) and week merge (COOPW.pend), cycle tuần, pregnancy months in tuần, Tuần lục pages, saves (S.tuan meaning). Play time per month doubles (a life of decades gets twice as long). Effort: large, many reviews, high regression risk.
- To reach D's numbers C would need 5 played days a tuần → 5× play length. Not sensible.

### Option D (RECOMMENDED) — ledger of the 10 days, her night is always the played one
- Rule: at the START of tối (OD 14:00Z #4) the Kính sự phòng decides the tuần's K nights (K = BAL.nt.perTuan = 5; 1st/15th nights go to the Empress first, see below). Then:
  - if she has ≥ 1 night in it → **tonight is her night**: the tray flip lands on HER card (the existing scene, glow, name+rank under every card per OD 14:00Z #2). Rivals may Tranh sủng / Chặn ngự giá it (symmetric rule OD 14:10Z), she may act with her khắc.
  - else → tonight is an NPC night picked from the ledger (the same flip scene on that card); she may steal it as now.
  - every other ledger night = one summary line ("Kính sự phòng ghi …") + small gains + conception roll.
- Numbers (K=5): 12.5 nights/yr at Sủng 25, 16 at Sủng 60; a night in 57 % / 64 % of months; about one tuần in four is "her night" on screen (vs one in 30 today). NPC births 0.11–0.12 per consort-year (trim BAL.conc to hit 0.10).
- Why 5 and not 10: historically the Emperor was not with a consort every night (ritual fasts, court, nights alone; the custom limits only the 1st/15th) — "about half the nights" is plausible and keeps NPC Sủng income moderate. BAL.nt.perTuan is one number; 3 (A/B column) is the cautious setting.

### Option E — leave time alone, fix only the weights (cheap, partial)
- Raise Sủng's weight in nightCh (e.g. Sủng/2 instead of /4) and halve the cycle block. At best her share at Sủng 60 goes from 13 % to ~20 %: ~2.5 nights/yr. Still ~1 month in 5. Worth doing INSIDE D (Sủng should matter), not instead of D.

## 5. Each option against the owner's other rules
| | A ledger | B 3 cards | C more days | **D ledger + her night played** |
|---|---|---|---|---|
| D57 pregnancy balance | keep NPC births 0.10 by BAL.conc ×.12–.14; shown chance per night drops to "Rất thấp" → show the chance **per tuần** on the stage cell (sum of her ledger nights) | same, ×.24 | ×.37 | as A |
| heir / HH odds | her sons ×1.4 (K5), Sủng income up → HH reach up (re-measure with balance-pass bot) | smaller | smallest | as A, best of all (her nights are also scenes with full gains) |
| co-op | ledger rolled by host, sent in the week merge like nightWhy; guest shows lines | 3-pick tray sync, more risk | timer + merge rewrite | as A; the played-night choice is a pure function of the ledger, host-only |
| 1st/15th (D1 in history-thitam.md) | Empress gets the 1st (tuần 0) and 15th (tuần 1) as ledger nights automatically, NO card flip for those nights — 2 of ~15 nights a month (history: 2 of ~30). The tối flip still runs for another night → D1 is solved without starving anyone (option "both") | Empress takes 1 of 3 cards those tối | Empress takes one played day | as A; if no other night of hers exists that tuần, the tối scene can be the "Hoàng thượng đến cung Hoàng hậu" beat |
| Tranh sủng / Chặn ngự giá | only the played tối night can be stolen (ledger nights are past by the time she reads them) | must pick which of 3 | per played night | the played night is hers whenever she has one → rivals' steals now hit HER more often (symmetric rule): tune NPC intent (R5 in history-thitam.md) cap 2 per tối |
| save migration | new S.ledger (array, defaults to []), old saves load as "no ledger this tuần" | tray format change | S.tuan meaning changes → real migration | as A |
| kit | Sổ ghi line = existing row, no new part | new tray KIT part | many screens | none (same flip scene, same row) |
| effort | 1 worker + review (~1 day) | 2–3 days + kit keeper | 1–2 weeks, many reviews | 1 worker + review (~1–1.5 days) |

## 6. Gain vs risk (owner format)
**Option D (recommended)**
- Gain: her nights ×10 (1.2 → 12.5 a year at Sủng 25), a night in most months, every one of her chosen tuần is a real scene, Sủng finally pays off, 1st/15th rule fits without starving, no kit change, NPC birth target kept.
- Risk 1: Sủng / Ân inflation (more nights = more gains for everyone). Likelihood: có thể. Severity: vừa. Detect: balance-pass bot (NPC Sủng mean, HH reach). Fix: ledger nights use BAL.nt.ledgerFx (Sủng +1, Ân +1), played night unchanged.
- Risk 2: NPC births drift off the D57 target (K5 measured 0.12 at ×.14). Likelihood: dễ (if not re-tuned). Severity: nhỏ. Detect: preg-bots / this bot. Fix: one number, BAL.conc ×.12.
- Risk 3: "Rất thấp" on every night looks discouraging. Likelihood: dễ. Severity: nhỏ. Fix: show the chance per tuần (her ledger nights combined), same ladder.
- Risk 4: rivals steal her played night too often now that it is visible to them (symmetric rule). Likelihood: có thể. Severity: vừa. Detect: count steals per year in the bot. Fix: R5 intent cap (history-thitam.md), FAIRN.eff.
- Risk 5: co-op both players have ledger nights the same tuần — only one can be "tonight". Likelihood: có thể. Severity: nhỏ. Fix: host picks by ledger order; the other gets a summary line + small gain; coop-e2e test.
- Risk 6: HH reach overshoots after the balance pass raises it to 32 %. Likelihood: hiếm–có thể. Severity: vừa. Detect: balance bot. Fix: BAL.nt.perTuan 5 → 3.
**Option A**: same risks, smaller gain on feel (her nights are only lines). **Option B**: kit and co-op risk vừa, gain smaller than D. **Option C**: big regression risk, smallest gain per cost, play length ×2.
Kết luận: **Được lớn hơn** with option D — every risk is one BAL number or one bot check away, and it is the only option that gives her a real night in most months without a kit or time-system rewrite.

## 7. Side finding for the D57 owner (bots)
- dev/measure/preg-bots.js clears Q every tuần, so in HER cycle tuần the "Kỳ nguyệt sự" dialog (jcycle cyAsk) is dropped and flip() never runs that tuần → NPCs lose those nights in the bot. Effect on her: none (she is off the tray then). My runs stub cyAsk (env NOCY=1) and the base numbers matched the un-stubbed run within noise (her nights 1.19 vs 1.23 per year), so the D57 tables stand.
- NPC "conception nights" (1.4 per consort-year) are fewer than NPC flips because low-rank consorts are giuBlocked (Thái hậu rule) unless they bribe — a rule, not a bug; worth knowing when tuning BAL.conc.
- Cause labels (tablet / custom / stolen / none) exist in ~69 % of flips in the bot (nightWhy not present for the rest in this loop); night COUNTS come from night() calls and are unaffected.

## 8. If the owner picks D — work order (for the coordinator)
1. Worker (opus): jledger.js after j75/jcycle/jflip: ledgerRoll() at tối start (host only), S.ledger {wk, nights:[{who, day}]}, Empress custom nights first on tuần 0/1 (day 1 / day 15), tonight = her night if any (sets S.tonight before the cardflip scene), ledger lines in Sổ ghi, ledgerFx gains, conception per night via night()/conceiveCh, cycle half-block (BAL.nt.cycDays). BAL.nt in jbal (ONE CORE).
2. Same worker: stage cell "Có thai" shows the per-tuần chance; Tuần lục week page lists the ledger.
3. Re-tune BAL.conc with preg-bots (target NPC 0.10 per consort-year, her figures reported) and run this bot; balance-pass owner re-measures HH reach.
4. Tests: preg-rate.js, night-day.js, cycle.js, coop-e2e (ledger host-only, guest sees lines), palace-oldsave (no S.ledger).
5. Reviewer (opus) with the gain/risk list above as the checklist.

## 9. Question for the owner (one at a time, numbered at the END of the coordinator's reply)
Q1 (night structure): 1 = option D, 5 nights per tuần, her night always played (recommended) · 2 = option D with 3 nights per tuần (cautious) · 3 = option A (ledger lines only) · 4 = option B (3 cards per evening) · 5 = keep today, only raise Sủng's weight (option E).
After Q1, D1 (1st/15th) is answered by the ledger itself (Empress takes the 1st and 15th as ledger nights, no card flip, the evening flip still runs) — confirm only if she wants it different.

---
# v2 ADD-ONS (coordinator asks after v1: s17 14:25Z, 14:45Z, 14:50Z; s18 15:05Z maid nights; s19 15:35Z cycle). ONE recommendation kept: option D.
New runs: same bot (+ env HERX = her nightCh multiplier, + first-son timing), base preg-rate-r1 @1c31bd79, 100 lives × 10 y each; the v1 numbers re-ran within noise (Sủng 25: 1.18 nights/yr today, 11.7 with D).

## 10. What the flip chance depends on (nightCh, j8.js:39 + wrappers), plain words
Card weight = (4 + Sủng/4 + Sắc/12 + dance level×2 + music level×1.5 + bribed Kính sự phòng +20 + Emperor's mood (+10 happy … −15 angry, /2) + rank Hoàng hậu/Hoàng quý phi +5 + court-faction favour/10 + lucky-charm Sủng bonus/2 + a senior eunuch on her staff +4) ÷ 1.4, kept between 1 and 70; then:
| factor | effect | code |
|---|---|---|
| pregnant (known), card hidden by a rival, confined, in lãnh cung | weight 0 (off the tray) | j8:39 |
| her cycle tuần (Kỳ nguyệt sự) | 0 for the whole tuần (unless her maid lies for her) | jcycle cyTray |
| the tuần after a "late" cycle report | ×0.5 | jcycle luiNext |
| ill | ×0.7 (light) / ×0.3 (heavy) / 0 (contagious); faked illness ×1.2 | j13 illNightF |
| Emperor trait Mê sắc | Sắc and dance count ×2; age ≤ 25 ×1.15, > 35 ×0.8 | j8, j35 |
| Emperor trait Chăm chính / Đa tình | ×0.6 / ×1.2 (and Chăm chính turns a card only 65 % of evenings) | j8 |
| Emperor ill | ×0.6 | j8 |
| admonished "mưa móc đều khắp" in the last 3 tuần | ÷2 | j75 |
| walked with him that week (gift road) | + BAL.empDay.walkNight | jgift |
| on the "ad" story road | 0 | jroute |
| mood (jemo) | ×1 for every mood today (table exists, all 1) | jemo EMO_NIGHT |
| Sủng | only Sủng/4 → Sủng 25→60 adds ~6 points of ~60–160 on the tray | — |
Maids (cung nữ) are never on the tray today; they reach a night only through rivalNight's 3 % "hầu thay" (no pregnancy).

### Current chance per person (probe: 40 lives, snapshots every 9 tuần; "per tối" = share × 0.9 turn chance; "1 in N months" also counts the 41 % of tuần she is off the tray)
| her Sủng | year 1 | year 3 | year 6 | year 10 |
|---|---|---|---|---|
| 10 | 11.1 % · 1 in 5.1 mo | 6.9 % · 1 in 8.2 mo | 4.9 % · 1 in 11.4 mo | 4.0 % · 1 in 14.2 mo |
| 25 | 12.7 % · 1 in 4.4 mo | 8.3 % · 1 in 6.8 mo | 6.0 % · 1 in 9.4 mo | 4.8 % · 1 in 11.7 mo |
| 45 | 15.4 % · 1 in 3.7 mo | 10.3 % · 1 in 5.5 mo | 7.5 % · 1 in 7.5 mo | 6.0 % · 1 in 9.4 mo |
| 60 | 17.3 % · 1 in 3.3 mo | 11.7 % · 1 in 4.8 mo | 8.5 % · 1 in 6.7 mo | 6.8 % · 1 in 8.3 mo |
| 80 | 19.5 % · 1 in 2.9 mo | 13.6 % · 1 in 4.2 mo | 9.9 % · 1 in 5.7 mo | 7.9 % · 1 in 7.2 mo |
Her chance FALLS over the life because NPC Sủng creeps up (rivalsTurn +R(3)−1 per tuần, +3…+8 per night): mean NPC Sủng by rank in the same probe —
| NPC rank | mean Sủng | off the tray (pregnant etc.) | share of the tray when on it |
|---|---|---|---|
| Hoàng hậu | 97 | 25 % | 24 % |
| Hoàng quý phi | 95 | 63 % | 10 % |
| Quý phi | 89 | 74 % | 7 % |
| Phi | 84 | 65 % | 10 % |
| Tần | 67 | 64 % | 10 % |
| Quý nhân | 56 | 64 % | 9 % |
| Thường tại | 37 | 66 % | 6 % |
| Đáp ứng | 43 | 71 % | 5 % |
Maids: 0 % (not on the tray). Harem ≈ 11.9 consorts, ≈ 4–7 cards actually on the tray per evening.

## 11. Owner's proposal: keep 1 day = 1 tuần, Empress night proportional to real time
- Math check: real custom = 2 nights of ~30 = 6.7 % of nights. Game = 3 tối a month, each standing for ~10 real nights → 3 × 2/30 = **0.2 custom tối per month = one every 5 months**. Her arithmetic is right.
- But the Empress is ALSO on the tray with the biggest share (24 %, Sủng ~97, rank +5), so she already gets ~0.65 tối a month by the cards — 10× her historical share before any custom. The proportional custom alone changes little; it makes 1st/15th almost invisible (2–3 times a year).
- With today's model the clean way: a fixed custom on mùng 1 of months 1, 5, 9 (3 a year ≈ 0.25/month), no card flip that evening; or 6.7 % per tối at random (owner dislikes random).
- With option D it needs no conversion: the ledger holds the real calendar days, mùng 1 and rằm are literally ledger nights 1 and 15 of the month (2 of ~15 consort nights), and the tối flip still runs for another night. **Recommendation: D; the proportional rule is only the fallback if she keeps today's 1 night per tuần.**

## 12. Night stealing (owner 14:45Z): self-interest, much more often, and the 90 % flip
Replaces "hostility ≥ 50 AND 6 %" (j8 flip) and the j75 R5 draft. Per tối, after the flip at tối start, each NPC on the tray-eligible list (not the holder, not pregnant/cycle/confined, has Đức ≥ 10 for feign or Sức ≥ 20 for road) rolls ONCE:
try % = BAL.steal.try[trait] × ambition × mood × relation × fear, cap 2 attempts per tối, one attempt per NPC per 3 tuần.
| part | values |
|---|---|
| trait base (ambition first) | Tham vọng 14 · Kiêu ngạo 10 · Hiểm độc 8 · Đa nghi 6 · Nhu mì 3 · Hiền lành 2 |
| ambition (self-interest) | no son ×1.3 · no night in last 6 tuần ×1.4 · holder is her rank or lower ×1.2 · she is on a rank/seat contest ×1.3 |
| mood (jemo) | ghen ×1.5 · giận ×1.2 · buồn ×1.2 · lo ×1.1 · bình ×1 · vui ×0.8 · sợ ×0.5 |
| relation to the holder | ally (rel ≥ 40) ×0.25 · friendly (15–39) ×0.6 · neutral ×1 · enemy (rel ≤ −30) ×1.2 (hatred adds little; it drives framing instead) |
| fear | holder 3+ ranks above ×0.6 · Empress on her custom night ×0.3 · Emperor angry ×0.5 |
Expected (trait mix from the probe: TV 20 %, KN 18, HĐ 19, ĐN 19, NM 13, HL 12 → mean base 7.8 %, mean multiplier ≈ 1.15 → ≈ 9 % per NPC per tối; ~5 eligible rivals):
- an attempt on **≈ 38 % of evenings** (today ≈ 2 %: 607 stolen of 36k flips), success ≈ 45 % (oSteal unchanged) → **the night changes hands on ≈ 17 % of evenings** (today 1.7 %).
- HER night: with D she holds ≈ 12 played tối a year → ≈ 4.5 contested, ≈ 2 lost a year. With today's model: ≈ 0.45 contested a year (she rarely holds a night).
- She SEES it: if tai mắt ≥ 2 or an oSee roll succeeds, a warning card at once ("Tai mắt báo: người của X đang chạy sang Dưỡng Tâm điện báo bệnh") with 3 answers (existing dilemma card, no new kit part): Sai cung nữ canh đường (1 khắc, thief −15) · Đến Dưỡng Tâm điện trước (2 khắc, Sức −5, thief −25) · Mặc kệ. Unseen attempts become next-morning news (who, if she has tai mắt; else "có người").
- The 90 % flip: measured blank evenings are ~24 % of tuần (10 % roll + troubled court j55 30 % + nobody eligible), more than the 10 % she was told. History has "撂牌子" (no tablet turned), so blanks are fair, but not one in four. With D: drop the flat 10 % roll; blanks come from the ledger itself (5 of 10 nights used); Chăm chính = 4 nights per tuần instead of a 35 % blank; troubled court = −1 night. Keeping today's model: keep 90 %, cut j55 to 15 %.
- Gain: drama every few evenings, motive = interest. Risk: her nights stolen too often (có thể / vừa / count per year in the bot, target ≤ 1 lost per 6 of her nights; fix BAL.steal.try ×0.7). Được lớn hơn.

## 13. Kỳ nguyệt sự re-fit (owner 15:35Z)
- Real: cycle ~28 days, bleeding 4–7 days ≈ 18 % of days. Game: month = 3 tuần, the cycle tuần blocks the whole tuần = 33 % of her evenings → twice too much.
- Re-fit (one rule for every option): the period covers **5 of the 10 days** of her cycle tuần (BAL.cyc.block = .5). Today's model: her card is off that tuần with 50 % (the sampled night falls in the period or not). Option D: ledger nights dated on her period days are blocked, the rest of that tuần stay open. Either way blocked share ≈ 1/6 ≈ 17 % ≈ real.
- Numbers: among non-pregnant tuần her open time goes 2/3 → 5/6 (+25 %); overall her nights ≈ +15 % (pregnancy months already block). D at Sủng 25: ~11.7 → ~13.5 nights a year.
- Fertility: keep BAL.cyc.fert.cyc .1 on the open half (D57 decided it; days next to a period are low) → births barely move. The maid's lie (cyLie) still works but only hides the 5 period days.
- Gain: matches real life, fixes "one third of my month is gone". Risk: tiny (hiếm / nhỏ / preg-rate.js + this bot). Được lớn hơn.

## 14. Maid nights (owner 15:05Z #3, history-maid-nights.md @ed5bbd11)
- Rule from the history expert kept (one system replacing sendMaid 3 %, srvRise and staff rise; who = Emperor's own maids 40 / consorts' maids 45 / Thái hậu's 15; seat free → 50 % raised to rank 0; seats full → unranked "cung nữ có ơn", stays a maid, child low-born, heir weight ×0.5, considered when a seat frees).
- How often: expert says ~0.3 a month. With D: **2 % of ledger nights** (15 a month) = 0.3 a month ≈ 3.6 a year; in today's model 10 % of flip evenings = the same 0.3.
- Effect on her: −2 % of nights (D: 11.7 → 11.5 a year). Her own maid may be the one called (news + loyalty swing); on the servant road she is in the pool, with the consent choice the expert wrote.
- Pregnancy: the expert's flat 12 % per night is out of scale — consorts' per-night chance is 1.4 % in D (7.9 % today). 3.6 nights × 12 % = 0.43 maid births a year = +40 % palace births, breaks D57. Use ONE CORE: maid conception = conceiveCh(maid) × BAL.conc × BAL.maid.concX with **concX = 2** → ≈ 0.10 maid births a year in D (one low-born child per ~10 years); count them in the D57 target (trim BAL.conc ≈ 5 %). In today's model concX = 1 gives ≈ 0.25 a year (too many) → 0.5 there.
- Co-op: rolled by the host inside the ledger; a friend's maid can be called like any consort's.
- Gain: owner's wish, real-court flavour, small cost. Risk: unranked state is new code (dễ / vừa: the expert's blind spot #1; keep them as staff with a flag); births drift (có thể / nhỏ / preg bot). Được lớn hơn.

## 15. Player squeeze (owner 14:50Z): nights, pregnancies, first son, per difficulty
Difficulty (jdiff) does NOT touch nights or conception: it changes dangers (childbirth, illness, poison, how hard the palace aims at her, seat gate). So nights/pregnancies are the same on Dễ/Vừa/Khó today; the HH gap comes from survival and from nights.
| her Sủng 25 / 60 (100 lives each) | today | D (K=5) | D + her pull ×1.2 | D + her pull ×1.5 |
|---|---|---|---|---|
| her nights / year | 1.2 / 1.6 | 11.7 / 15.8 | 13.8 / 18.3 | 16.5 / 21.3 |
| months with ≥ 1 night | 10 % / 13 % | 55 % / 64 % | 60 % / 67 % | 65 % / 70 % |
| her conceptions / year | 0.09 / 0.15 | 0.17 / 0.23 | 0.21 / 0.28 | 0.23 / 0.26 |
| first son by year 3 (alive then) | 6 % / 16 % | 14 % / 31 % | 22 % / 18 % | 26 % / 25 % |
| first son by year 5 | 18 % / 25 % | 27 % / 43 % | 36 % / 37 % | 43 % / 42 % |
| first son by year 10 | 29 % / 37 % | 56 % / 59 % | 57 % / 68 % | 64 % / 63 % |
| NPC births / consort-year | 0.10 | 0.12 | 0.12 | 0.10–0.12 |
(lives alive at that year; ±8–10 points of noise at n≈70; the bot player dies in ~half of the lives — see §2.)
Today's HH: Vừa 20 % (n 45, review-balance-after-truth-r1) vs target ~32 %; D31 smoke Dễ 40 % / Khó 0 %; HH median 295 tuần (8.2 years) vs ~188 (5.2 years). Today only ~1 in 5 lives has a son by year 5 — the son gate alone explains the slow HH.
Recommendation (her-side knob, allowed by jdiff's rule like BAL.hz): **D for everyone + "card pull" on her own nightCh by difficulty: Dễ ×1.5 · Vừa ×1.2 · Khó ×1.0**. Expected: first son by year 5 ≈ 43 % (Dễ) / 36 % (Vừa) / 27 % (Khó), against 18–25 % today. This bot cannot promote her, so the HH % itself must be re-measured by the balance-pass HH bot (inpage6) after D lands; tune the three multipliers (and nothing world-side) until Dễ ~50 %, Vừa ~32 %, Khó 15–20 %.
Risk: Dễ too easy (có thể / nhỏ / HH bot / lower ×1.5 → ×1.35). Được lớn hơn.

## 16. Updated one-line recommendation
Option D (ledger of the 10 days, 5 nights per tuần, her night always the played one) + cycle blocks only the 5 period days + 1st/15th as ledger nights + maid nights 2 % of ledger nights (concX 2) + self-interest stealing (≈ 38 % of evenings see an attempt) + her card pull by difficulty (×1.5 / ×1.2 / ×1.0). All numbers in BAL (BAL.nt, BAL.steal, BAL.cyc.block, BAL.maid, DIFF). Verdict: **Được lớn hơn** — the player is chosen in most months instead of one month in ten, every risk is one BAL number checked by an existing bot.
Questions for the owner (one at a time, numbered at the end of the coordinator's reply): Q1 night structure (§9); Q2 stealing frequency: 1 = ≈ 38 % of evenings (recommended) · 2 = ≈ 20 % · 3 = keep rare; Q3 maid children: 1 = about one per 10 years (recommended) · 2 = more often (one per ~4 years) · 3 = maids never conceive.
