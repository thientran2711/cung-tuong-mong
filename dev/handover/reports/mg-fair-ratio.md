# mg-fair-ratio — worker report (opus wk session_01Rc5AsMnKfGBSQk1sEvtKda; foreman C-AG #28 → #29 session_01Rc5AsJ8GMpdM1fyxzYaf1d) — BUILT FOR REAL (owner OK OD 20/11 ~07:15Z; next: BIG opus rv)
PRIORITY #1 CHECK: OD 20/11 ~01:18Z (thirds) / ~01:42Z / ~01:50Z (upbringing) / ~06:20Z (ratio ask) / ~06:40Z (bell curve, canon overwrite of the 15/20/65 table) / ~07:15Z (OWNER OK) / ~07:20Z (centre = average adult ≈ 7, via MAIN → C-AG #29) | main 37e4a68f: BAL.ag.mg2.cal.k (27 of 31 kinds), jmgcal mgCalBand, jmgt mgHand / mgNpcRaw | review/mg-fair-hands PASS 3fe87277 = the mechanism, reused (branch made from it) | review/cal-p2 read only (report §A2 / §B), not touched | claims: this worker.
START_CTX 4 % (1M window). Branch `review/mg-fair-ratio` = review/mg-fair-hands 3fe87277 + merge LIVE origin/main 37e4a68f (50cd0a9f; still LIVE at push) + code **10919436** + site build **447fadb1**. The first pass (fixed group split, 78f11921 / b3f53559) is overwritten in place by the bell curve (law 14).

## What (law 4 one core; upbringing, art lift, law 1, law 5 kept)
- **BELL CURVE** (owner OD 20/11 ~06:40Z → OK ~07:15Z): every NPC's average play in a kind (hand − w/2) = one hashed draw of **Normal(ctr, sd)** clamped ±3 sd — the real adult population, **NOT centred on her**. jmgt `mgZ(id)` (Box–Muller of two hashes on person + kind) → `mgHand` = c + sd·z, c = ctr + w/2.
- **BAL.ag.mg2.hand** (jbal2.js): `{on:1, w:4, art:.2, ctr:{"":7}, sd:{c:1.4, a:1.5, r:1.7, "":1.5}, eqZ:.43, grp:{…31 kinds}}`.
  - `ctr` = average ADULT play on the fitted board, per kind (key = kind, "" = every other kind): 7 (OD ~07:20Z: cal-p2 fits each board so the average adult scores ≈ 7). cal-p2 can set any kind in one edit.
  - `sd` per skill group: careful 1.4, artistic 1.5, reflex 1.7 (judgement: reaction / timing varies most between adults, fine careful work least on a fitted board).
  - `eqZ` .43 = the "about equal to her" band ± eqZ·sd round HER b — used only to READ her place (jmgcal `mgCalShare`): better / equal / worse FALL OUT of where her b sits (top 15 % → 7 / 20 / 73, median → 37 / 33 / 30, as MAIN wrote).
  - Deleted (law 14): `split`, `eq`, `far` (the thirds); her b no longer moves NPC hands.
- jmgcal `mgCalBand(kind)` → {c, m, sd, lo/hi = ±3 sd, far = 2 sd, sig "n/m/sd"}; `mgCalGrp`, `mgCalShare`. A changed curve re-rolls every saved hand from the same hash (old saves with "t/…" or skew sigs too).
- jslap `slapNpcDraw` reads the curve scale (Bd.far = 2 sd) instead of the deleted H.far. jhd / mgNpcRaw / mgHandEff unchanged.
- **Upbringing / palace shift** = the existing lift on top of the curve: art level = max(own, identity start bậc, BAL.orig.art) → + art .2 hand points per bậc AND the easier board (≈ .7–.8 play pts per level) ≈ .6 sd per bậc. No separate "palace selection" knob added (no evidence for a number; the noble-heavy court comes through BAL.orig.ow and the identity bậc).
- No player-visible text / UI → no shots.
- **Not built here (C-AG #29: cal-p2 / wk MmEgNigP owns it):** (b) the identity modifier ±2 shrinking with her bậc (OD ~07:05Z); measured only (table B) as a flat ±2 on her result. **Hook points for cal-p2:** per-kind centre `BAL.ag.mg2.hand.ctr[kind]` ("" = default 7); spread `BAL.ag.mg2.hand.sd[group]`; group of a kind `mgCalGrp(kind)` / `BAL.ag.mg2.hand.grp`; curve `mgCalBand(kind)` → {c, m, sd, far, sig}; her place `mgCalShare(kind)`; NPC play `mgNpcRaw(kind, p, o)` → an identity ±k on the RESULT for NPCs (law 1) belongs there, beside her own result in the kg82 result path.

## Group of every kind (BAL.ag.mg2.hand.grp; from cal-p2 §B skill column + each kind's own rules text)
| group (sd) | kinds |
|---|---|
| c careful / strategy (1.4) — 16 | co Cờ · tho Thơ · doi Câu đối · doden Thắp đèn · ve Vẽ · theu Thêu · kim Khéo tay · kinh Chép kinh · may May áo · hoadien Dán hoa điền · td_cong Công · td_hanh Hạnh · le Lễ nghi · tc Trị cung · xa Xử án · thq Thái hậu hỏi |
| a artistic (1.5) — 6 | dan Đàn · hat Hát · hoa Cắm hoa · mua Múa · banh Nấu ăn · huong Điều hương |
| r reflex (1.7) — 9 | dauho Đầu hồ · ban Bắn cung · tat Tát · ne Né · td_ngon Ngôn · td_dung Dung · chai Chải chuốt · duho Du hồ · den Hoa đăng |
Judgement calls (one edit each): mua (sequence memory + beat) and banh (lag control) in artistic; hoadien careful (no clock, fine placement); ban reflex by skill type even though her 9.1 is high (cal-p2: the ban board is too easy). Every kind: ctr 7 (default).

## D — her place per kind (better / about equal / worse, % of NPCs before art / upbringing lifts; dev/measure/mg-fair-ratio.js)
| kind | group | her b | z | better | equal | worse |
|---|---|---|---|---|---|---|
| banh | a | 6.1 | -0.6 | 57 | 28 | 15 |
| dan | a | 8.3 | 0.867 | 10 | 23 | 67 |
| hat | a | 8.1 | 0.733 | 12 | 26 | 62 |
| hoa | a | 7.9 | 0.6 | 15 | 28 | 57 |
| huong | a | 4.5 | -1.667 | 89 | 9 | 2 |
| mua | a | 6.3 | -0.467 | 52 | 30 | 19 |
| co | c | 9.7 | 1.929 | 1 | 6 | 93 |
| doden | c | 9.9 | 2.071 | 1 | 4 | 95 |
| doi | c | 9.1 | 1.5 | 3 | 12 | 86 |
| kim | c | 7.7 | 0.5 | 18 | 30 | 53 |
| kinh | c | 9.9 | 2.071 | 1 | 4 | 95 |
| le | c | 9.9 | 2.071 | 1 | 4 | 95 |
| may | c | 10 | 2.143 | 1 | 4 | 96 |
| tc | c | 9.5 | 1.786 | 1 | 7 | 91 |
| td_cong | c | 10 | 2.143 | 1 | 4 | 96 |
| td_hanh | c | 9.3 | 1.643 | 2 | 9 | 89 |
| theu | c | 9.7 | 1.929 | 1 | 6 | 93 |
| tho | c | 8.7 | 1.214 | 5 | 17 | 78 |
| thq | c | 8.5 | 1.071 | 7 | 19 | 74 |
| ve | c | 9.5 | 1.786 | 1 | 7 | 91 |
| xa | c | 9.5 | 1.786 | 1 | 7 | 91 |
| ban | r | 9.1 | 1.235 | 5 | 16 | 79 |
| dauho | r | 1.1 | -3.471 | 100 | 0 | 0 |
| duho | r | 7.9 | 0.529 | 17 | 29 | 54 |
| ne | r | 4.1 | -1.706 | 90 | 9 | 2 |
| tat | r | 4.9 | -1.235 | 79 | 16 | 5 |
| td_ngon | r | 6.7 | -0.176 | 40 | 33 | 27 |
Reading: today her b were taken on the UN-fitted boards (most careful kinds 9.3–10) while ctr 7 is the adult average on the FITTED board — so careful kinds show her at z ≈ 2 (top 2–5 %), reflex kinds at z −1.2…−3.5. Once cal-p2's fitted boards land and she re-tests (her ≈ 7.5–8 target), her places move toward the proposal's top ~15–35 %. The curve itself does not need re-work then: only her b (and any per-kind ctr cal-p2 measures).

## A — contest (occ hoi, her rank 3, her + 5 NPCs; P1st / Ptop3 / mean place; 3000 contests per cell)
NPCs: own art 0, rank 3, identity drawn by BAL.orig.ow + a random road (BAL.orig.art bậc lifts hand + board, as in the game). L = her art level vs the matching board: −1 (a weak art), 0 (outside her identity), +1 / +2 (her identity's start arts).
| kind (group, b) | L−1 | L0 | L+1 | L+2 |
|---|---|---|---|---|
| co (c, 9.7) | 23/81/2.5 | 46/94/1.8 | 73/99/1.3 | 89/100/1.1 |
| ve (c, 9.5) | 32/87/2.2 | 56/96/1.6 | 80/100/1.2 | 94/100/1.1 |
| tho (c, 8.7) | 7/53/3.4 | 21/77/2.6 | 48/95/1.8 | 75/99/1.3 |
| kim (c, 7.7) | 2/32/4.1 | 9/56/3.3 | 28/85/2.3 | 56/97/1.6 |
| dan (a, 8.3) | 6/51/3.5 | 18/75/2.7 | 43/93/1.9 | 69/99/1.4 |
| hoa (a, 7.9) | 5/41/3.8 | 15/69/2.9 | 36/90/2.1 | 66/98/1.4 |
| mua (a, 6.3) | 0/7/5.2 | 1/18/4.6 | 6/47/3.6 | 20/78/2.6 |
| huong (a, 4.5) | 0/0/5.9 | 0/1/5.7 | 0/6/5.2 | 2/23/4.4 |
| ban (r, 9.1) | 16/73/2.8 | 31/89/2.2 | 59/98/1.5 | 80/100/1.2 |
| tat (r, 4.9) | 0/1/5.7 | 0/3/5.4 | 1/14/4.8 | 3/37/3.9 |
| ne (r, 4.1) | 0/0/5.9 | 0/1/5.7 | 0/4/5.3 | 0/17/4.6 |
| dauho (r, 1.1) | 0/0/6 | 0/0/6 | 0/0/6 | 0/0/5.9 |
| **c mean** | 16/63.3/3.1 | 33/80.8/2.3 | 57.3/94.8/1.7 | 78.5/99/1.3 |
| **a mean** | 2.8/24.8/4.6 | 8.5/40.8/4 | 21.3/59/3.2 | 39.3/74.5/2.5 |
| **r mean** | 4/18.5/5.1 | 7.8/23.3/4.8 | 15/29/4.4 | 20.8/38.5/3.9 |
Reading: careful — she wins about a third at L0 and nearly always places; artistic — middle (18 % / 75 % on dan, hoa; mua / huong low because her b is low there); reflex — she rarely places except ban (board too easy). That is her own words (OD 06:10Z): strong kinds she wins, weak kinds 2nd–3rd or lower. dauho 1.1 = the broken board (cal-p2 Đầu hồ fix pending).

## B — identity ±2 on the RESULT (cal-p2, OD 08:30Z method), L0
| kind (group, b) | −2 | 0 | +2 |
|---|---|---|---|
| co (c, 9.7) | 5/46/3.6 | 45/94/1.8 | 88/100/1.1 |
| ve (c, 9.5) | 9/58/3.3 | 56/97/1.6 | 92/100/1.1 |
| tho (c, 8.7) | 1/20/4.5 | 21/78/2.6 | 71/99/1.4 |
| kim (c, 7.7) | 0/8/5.1 | 9/57/3.3 | 54/96/1.7 |
| dan (a, 8.3) | 1/20/4.5 | 19/75/2.7 | 65/99/1.4 |
| hoa (a, 7.9) | 0/13/4.8 | 14/70/2.9 | 63/98/1.5 |
| mua (a, 6.3) | 0/1/5.7 | 1/19/4.6 | 18/75/2.7 |
| huong (a, 4.5) | 0/0/6 | 0/1/5.7 | 1/21/4.5 |
| ban (r, 9.1) | 4/38/3.8 | 32/89/2.1 | 78/100/1.3 |
| tat (r, 4.9) | 0/0/5.9 | 0/3/5.4 | 2/35/4 |
| ne (r, 4.1) | 0/0/6 | 0/0/5.7 | 1/14/4.7 |
| dauho (r, 1.1) | 0/0/6 | 0/0/6 | 0/0/5.9 |
Reading: sở trường +2 turns a careful kind into a near-sure win (54–92 % 1st) and an artistic one into a likely win (63–65 % on dan / hoa); sở đoản −2 drops a careful kind to 0–9 % 1st (top3 8–58 %), artistic / reflex to ≈ 0. With the approved shrink (±2 → 0 as her bậc rises), the effect fades as she studies. Law 1: when NPCs get the same ±2 from their own identity, her edge shrinks where her rivals share that sở trường.

## C — NPC promotion-exam pass rate (the earlier flag 3–9 % → 87–94 %)
mean exChance % over every live consort below Hoàng hậu, 8 fresh courts (72 consorts):
| build | mean | min | p10 | median |
|---|---|---|---|---|
| LIVE main 37e4a68f (skew band, follows her 27 codes) | 82.3 | 0 | 3 | 100 |
| first pass, thirds / group split centred on her b | 99.3–99.7 | 68–85 | 100 | 100 |
| **bell curve (this head)** | **86.4** | 0 | 27 | 100 |
Answer: the jump is **fixed as a mechanism fault** — NPC hands no longer follow her (high) b, so the thirds' 99 % is gone; the bell curve sits close to today's main (+4) with a real spread (p10 27 %). The 3–9 % was measured on 72922870 when only Đàn was calibrated; LIVE main has since moved to ≈ 82 % on her own codes (its old band followed b). The remaining level (median NPC passes) is the exam's own bar (BAL.ex.bar 22 / 25 / 28 vs play avg × 6 + Tứ đức + art): an average adult play of 7 clears it — a promotion-pace question for BAL.ex if MAIN wants slower NPC promotions, not the ratio.

## Tests (head 447fadb1)
| test | result |
|---|---|
| assemble + build_site | ok |
| mg-fair-hands (1 / 1b / 1c / 2 / 5 rewritten for the curve) | 18/18 ok |
| ag-mgcal (3: calibration does not move the curve; places her at b = ctr → 33/33/33) | 14/14 ok |
| ag-mgh (7: centre = ctr) | 10/10 ok |
| origin-arts | 8/8 ok |
| mgcal-apply.test.sh | 8/8 ok |
| ag-mg2 | 24 ok / 2 FAIL (summons ×2, pre-existing) |
| mg-skip | 16/16 ok |
| slap-mg | fails ["marks"] (pre-existing) |
| quickcheck | QUICKCHECK PASS (400 s, old save ok, core gates PASS) |
Pre-existing on LIVE main (not this branch): ag-mg2 "summons" ×2 (calls 15 / median), slap-mg fails ["marks"] (both reported on main by rv-mg-fair-hands and cal-p2). Merge fallout fixed: ag-mgh 7 / ag-mgcal 3–4 / mg-fair-hands used "co" as the untested kind, which her 11/19 code calibrated — they now pick an untested kind at run time.

## Measure tool
dev/measure/mg-fair-ratio.js [dev/index.html] [contests] — prints C (also on a main build), D, A, B as above.
