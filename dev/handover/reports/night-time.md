# NIGHT-TIME — how often is she flipped, and how to fix "3 flips a month"

Analyst: s17 child (opus), report only, no game code changed. START_CTX ≈ 4 % (get_session 118k / 1M at the first read, most of it the start brief); end ≈ 17 %. No rollover.
Owner ask: OD 16/11 14:20Z ("hậu cung tới 12 người … một tháng chỉ lật thẻ được 3 lần … tỷ lệ được lật thẻ rất là thấp").
Base measured: review/preg-rate-r1 @1c31bd79 (= what ships next: BAL.conc .5 + fertile window D57) built page, real weekly loop.
Bot: `dev/handover/reports/night-time-bot.js` (copy of the scratch bot; usage in its header). Summary script: `night-time-sum.js`.

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
