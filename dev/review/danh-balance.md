# danh-balance — Danh after act-dedupe wave 1 (flag 1 of dev/handover/reports/act-dedupe.md)
Branch review/danh-balance (base main bad941b4). No BAL value changed; the proposal below needs the owner's OK.

## 1. Danh sources and gates
Static scan (`python3 dev/measure/danhscan.py`): 501 literal Danh gains (sum 2337) and 408 literal losses (sum 1566) in 68 files, plus
57 computed ones. The biggest gain files: j67 Mệnh truyện (150 gains / 158 losses), j97 rare roads (50 / 0), j71 festivals (44 / 15), j92 dress (28 / 13), j72 favours,
j68e/f/g/h happenings, j4 origin stories, j7/j8 rival acts, j2 Hành sự deck (13 / 8), jreign, jtsb.
Gates that read Danh: promotion `RANKS[].d` 10/20/30/42/55/68/78 (j1, read by promoReqP j8 and the exam window), Hoàng hậu seat weighing,
succession (b) 50 / (c) 70, rare roads (j4 sách cha 40, j97 thd_sach 40), j42 servant wedding 20, j3 "Bị bỏ quên" ≤5, jkc rare ends 60/50.

Measured Danh per life (sensible bot, Hành sự only, 2 seeds × 48 lives, cap 144 tuần; +gained / −lost):
| source | before (main 0a311183f) | after (main bad941b4) |
|---|---|---|
| card Múa trong yến tiệc | +94 / −71 (38×) | +166 / −72 (55×) |
| card Phát chẩn cho cung nhân (Bạc −40, Danh +7, Đức +3, 85 %) | +92 (15×) | — removed by act-dedupe |
| card Thỉnh an Thái hậu | +20 / −18 | +49 / −22 |
| dialogs / events (pick) | +67 / −81 | +77 / −76 |
| buổi change (month ticks, clock events) | +24 / −73 | +10 / −76 |
| outside hooked calls (minigame / study results; the removed study cards) | +21 | 0 |
| Tài nghệ "Phát bạc cứu giúp" (Bạc −20, Đức +3, Danh +1 / month) | not used by the bot | not used by the bot (see trials) |

## 2. ONE CORE fixes (no value change)
| typed copy (before) | now |
|---|---|
| j3 `S.danh<=5` (Bị bỏ quên) | `BAL.danhG.forget` |
| j4 `S.danh>=40` + text "Cần Danh 40" | `BAL.danhG.fatherBook` (rule + text) |
| j97 `S.danh>=40` + "Danh từ 40" | `BAL.danhG.thdBook` |
| j42 `S.danh>=20` | `BAL.danhG.srvWed` |
| jkc `S.danh>=60`, `S.danh>=50` | `BAL.danhG.kcVihanh`, `kcR5` |
| j99succ rows: Tân đế <16, Danh 50/70, Tâm cơ 35/60, Bạc 100/300, Phẩm Phi, Thái hậu 60/50/20, NPC claim 50/35, rare end Danh 80 (rule + text) | `BAL.succN.*` |
| j85 charity() `{bac:-20,duc:3,danh:1}`, 1 khắc + card text in j85 AND jtabs (copy) + Đức panel "Đức +3, Danh +1" | `BAL.charity.{khac,bac,duc,danh}` |
Scan: typed Danh gates 10 → 0 (6 hits left are sign checks `g.danh>0` in display code). Probe: texts identical, charity gives Bạc −20 Đức +3 Danh +1, 0 page errors.
Not moved: `RANKS[].d` (j1) — one source already, no copy found; noted for the coordinator (BAL has no RANKS key).

## 3. Measures (dev/measure/pass/data/danh/*.json; `python3 dev/measure/andanh.py label=files…`)
Bot = balance-pass sensible bot (inpage6 + inx/inpz/inty/inpromo) + indanh.js. hs = Hành sự cards + exam + dialogs only; mix = full sensible bot
(cards, pop-ups, walks, accuse, lessons); rand-hs = random bot, Hành sự only. Cap 144 tuần (~4 years), HHSTOP. Mean ± 95 % CI; Wilson CI for %.
| | hs before | hs after | mix before | mix after | rand-hs before | rand-hs after |
|---|---|---|---|---|---|---|
| lives (seeds) | 96 (501, 777) | 96 | 97 | 97 | 48 (501) | 48 |
| Danh at tuần 12 | 40.3 ± 3.4 | 31.3 ± 2.9 | 42.9 ± 3.6 | 28.6 ± 3.4 | 32.8 ± 3.8 | 17.7 ± 3.7 |
| Danh at tuần 48 | 70.0 ± 5.9 (med 83) | 52.4 ± 6.0 (med 52) | 56.6 ± 6.0 | 29.9 ± 5.1 | 43.2 ± 9.0 (med 36) | 18.8 ± 6.0 (med 14) |
| Danh at tuần 144 | 89.4 ± 4.3 | 69.9 ± 6.7 | 79.1 ± 4.4 | 57.9 ± 6.7 | 73.7 ± 11.6 | 22.5 ± 11.9 |
| tuần held back by the Danh row | 16 % | 33 % | 27 % | 51 % | 34 % | 63 % |
| tuần held back by the Sủng row | 4 % | 5 % | 2 % | 2 % | 7 % | 15 % |
| max rank (mean) | 5.5 ± 0.2 | 4.2 ± 0.3 | 5.2 ± 0.2 | 3.9 ± 0.3 | 4.2 ± 0.3 | 2.5 ± 0.3 |
| rank at tuần 144 | 5.0 ± 0.3 | 3.8 ± 0.4 | 4.5 ± 0.3 | 2.9 ± 0.4 | 4.0 ± 0.6 | 1.6 ± 0.7 |
| Hoàng hậu within 144 tuần | 9 % (5–17) | 1 % (0–6) | 7 % (4–14) | 0 % (0–4) | 0 % | 0 % |
| died / ended early | 12 % | 12 % | 10 % | 6 % | 31 % (20–45) | 48 % (34–62) |
| promotion exam passed / sat (per-page counter, 2 seeds) | 82–85 % | 41–47 % | 84 % | 56–64 % | 95 % | 58 % |
Seeds agree (hs Danh-row hold 17/14 % before, 34/33 % after). Random mixed arms were dropped: the random bot picks "Xuất gia" in 41/50 lives.
A first mixed-after run was void: act-dedupe renamed the pop-up "Đẩy nàng xuống hồ sen" to "Đẩy xuống hồ sen", which the bot did not avoid
(16 pushes a life, Danh −89); fixed in inpage6, re-run (kept as after_mix_501_pond.json).

TWO causes, not one:
1. Danh: the only bạc → Danh card (Phát chẩn, ≈ +92 Danh a life) left Hành sự; the replacement in Tài nghệ gives Danh +1 a month. The Danh row
   holds her back twice as often (16 → 33 %, mix 27 → 51 %). The random Hành-sự player sits at Danh 0–42 — the flag's numbers.
2. Exams: pass rate fell 82–95 % → 41–64 % in every arm. Likely cause (not proven): the study cards (Tự học / Tự luyện / Luyện cầm kỳ thi họa)
   left Hành sự, so Tứ đức and art levels — two thirds of the exam score (BAL.ex wVir, wArt) — stay low unless she uses Tài nghệ; the
   "outside hooked calls" Danh (+21 → 0) is the same missing study. The bots never open Tài nghệ Tứ đức, so this needs a Tài nghệ-using bot.

Trials (Hành sự + the Tài nghệ charity once a month when Bạc ≥ cost + 20; BAL overridden in the bot only, seed 501, 48 lives):
| BAL.charity | uses / life | Danh at tuần 48 | Danh at tuần 144 | Danh-row hold | rank at tuần 144 |
|---|---|---|---|---|---|
| bac 20, danh 1 (now) | 18 | 49.4 ± 10.2 | 71.8 ± 10.2 | 32 % | 3.8 ± 0.5 |
| bac 30, danh 3 | 15 | 56.4 ± 10.3 | 75.9 ± 9.3 | 25 % | 3.2 ± 0.5 |
| bac 35, danh 5 | 11 | 55.9 ± 9.3 | 84.3 ± 7.2 | 21 % | 3.3 ± 0.6 |
| (before, Phát chẩn in Hành sự) | 15 | 70.0 ± 5.9 | 89.4 ± 4.3 | 16 % | 5.0 ± 0.3 |
Charity at bac 35 / danh 5 brings late Danh back near the old level but does not bring rank back: the exam (cause 2) now holds her.

## 4. PROPOSAL (for the main chat → owner; nothing applied)
P1 — BAL.charity: bac 20 → 35, danh 1 → 5 (duc 3, khac 1, once a month unchanged), and give the act a SECOND DOOR in Hành sự with the
  shared lock (act-dedupe shared-door pattern, like Thỉnh an), named as the act ("Phát bạc cứu giúp cung nhân nghèo"), so a Hành-sự player
  has a bạc road to Danh again without a duplicate act.
  Why: restores ≈ +55 Danh a life (11 uses × 5); measured Danh-row hold 33 → 21 %. Price per Danh 7 bạc = the old Phát chẩn (40 bạc / ~6 Danh).
  Gain/loss: gain Danh +5, Đức +3; loss 35 bạc (a whole month's stipend at Đáp ứng) + 1 khắc; once a month. BALANCE rule: the non-bạc road
  is Múa trong yến tiệc (Sức −20, Bạc −10, Danh +4 on success / −6 on failure, jealousy +4) and Thỉnh an; with 35 bạc in the pocket she weighs
  a sure Danh for her month's silver against a risky Danh paid in Sức — neither is the obvious pick at low rank; at high rank bạc is easy,
  which is why the cap stays once a month.
P2 — no number yet: exam pass rate. Next item: a bot that also uses Tài nghệ (Tứ đức courses + arts) like a real player, then decide between
  (a) nothing (the drop is only the "never studies" path), or (b) BAL.ex.bar [22,27,31] → [22,25,28] (already measured on review/balance-pass,
  unmerged; there HH 34 → 45 %, so re-measure the full life first).
P3 — flag: random Hành-sự play now dies more (31 → 48 %); with P1 her Danh holds better; recheck after P1/P2.
Not proposed: raising Múa trong yến tiệc (already the bot's main road, 55× a life — raising it makes one card the obvious pick).

## Tests
Measures only plus value-neutral BAL reads; probe of the changed texts/acts on the built page (0 page errors); site rebuilt (build_site.sh).
