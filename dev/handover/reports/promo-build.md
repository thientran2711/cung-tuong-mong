# promo-build — PROMOTION BUILD part A + special routes + PHÂN CUNG (worker session_01D3E3NZySUEoGSM1U1L4WvJ, Foreman D depth 1)
PRIORITY #1 CHECK ('kỳ sắc phong' / 'Thái hậu ân điển' / 'phanCungEdict'): OD 24/11 ~07:15Z…~09:50Z (read verbatim) | ledger 0 | claims: promo-build (D, this session) | main 0c0877a2: none of it (PROMO_SRC jexam.js:106, promoteP j8.js:419, palFix jpal.js, bcGrantIx jbancung.js:49 reused) | review/*: promo-hist ed47e570 (parts taken: world hash → pbH, NOT landed whole), kit-promo-hook-rv 73c692ca (merged, rewritten to the new rules), selection-scene 5787170b (caller of phanCungEdict, read jselxday.js:233-236), palace-distance 9e655c3e (no SSK yet; same distance measure bcDistOf/bcNear, not forked).

## Branch
review/promo-build 7c4116de — base origin/main 0c0877a2 (+ kit-promo-hook-rv 73c692ca merged).

## What was built
1. **KỲ SẮC PHONG (part A)** — `dev/build/jpromob.js` (new, after jexam in assemble.py).
   - Calendar: `pbKyStep/pbKyUpdate/pbKyAt/pbNextKy`. BAL.promoR.ky.p = {newyear 85, doanngo 20, vantho 75, thanhtho 55 (only while the Thái hậu lives), dongchi 20}; world draw per (festival, year, Emperor era/likes/traits) = same on both co-op seats; a kỳ < gapMin 3 months after the last is dropped; ≥ gapMax 8 months without a kỳ → the next festival is forced. Past months are stored (S.pb.ky) so a kỳ never moves; future months are simulated (pure). Thái hậu death → no kỳ for BAL.promoR.mourn 27 months.
   - Gate: `promoReqP` (j8) has one new row «Kỳ sắc phong: …» (`pbKyRow`): true in a kỳ month / while her kỳ window runs on into the next month / once the exam is passed (decree waits for a seat). So her window (exTick), the NPC exam (promoteP wrapper), fillSeats/contests and the Sắc phong panel all follow one rule (law 1). No monthly check any more.
   - Fail / lapse → wait for the next kỳ: `exCd` → `pbCdKy` (months to the next kỳ); the fail/lapse lines print that date.
   - Her notice once per kỳ month (`pbNotice`): «Tiết Vạn thọ là kỳ sắc phong …» or «… chưa đủ điều kiện nên không được dự (Danh 0 (cần 30)). Kỳ tới: Tết Nguyên đán, còn 5 tháng.»; kit chips in Mệnh truyện › Sắc phong (`exChips`): next kỳ + the special exam held. Old saves: one notice line «Luật mới trong cung …».
2. **SPECIAL EXAMS (daughter weight)** — `pbGrant/pbTry/pbMonth/pbCost` + jexam edits.
   - Waived: Sủng, Danh, months since the last decree, the kỳ (`EX_WAIVE`, jexam exElig). Still apply: seat (waited after the exam, as today), Hoàng hậu/Thái hậu block rows, hiếu thảo row, Phi+ opposition, cấm túc, lãnh cung. **Fix: a daughter no longer waives everything** (old exElig returned true for any grace).
   - Routes: daughter + every later son (PROMO_SRC son/dau = "special", BAL.promoR.sp.birth 1 per birth; first son stays DIRECT; th/emp/quyen faction endings stay DIRECT); Hoàng thượng sủng ái (Sủng ≥ RANKS[next].s + mean add of THIS Emperor's traits, BAL.promoR.sp.sung.add; ≤1 per 24 months, ≤2 per life); Thái hậu ân điển (Thái hậu quý ≥ cut[TH_ARCH]); Hoàng hậu đề cử (Hoàng hậu quý ≥ cut[the queen's tính tình], target ≤ Phi). Patrons: once per life per patron; a new Thái hậu (key cleared at her death) / a new Hoàng hậu (queen key) = a new chance.
   - Failed or missed special exam USES UP the chance (jexam exDone / exTick lapse); unused one lapses at the next kỳ (≥ ky.hold 2 months). One special exam open at a time; a birth while one is open waits in p.pbs.q. A special is not granted when the ordinary road is already complete (she sits the kỳ) or a block row would stop it (births are always granted).
   - Losses (law 3, BAL.promoR.sp.cost): favour → palace ghen (NPC: others oán); Thái hậu → Sủng −4 «Bệ hạ coi ngươi là người của Thái hậu»; Hoàng hậu → nợ ân 1 in the j72 ledger (NPC: others oán).
   - NPCs: same `pbTry` every month (host only in co-op), their exam in the existing jexam promoteP wrapper; news lines via newsAdd.
   - Wording WHY: e.g. «Hoàng thượng sủng ái ngươi hơn người (Sủng 59; bệ hạ đa tình, hiếu thảo, cần 59): ân cho ngươi một lần thi riêng tấn phong Tần ngoài kỳ … Lần 1 trong 2 lần của đời; lần sau sớm nhất sau 24 tháng. Lục cung ghen (ghen +10).»
   - promoRuleTxt + the «Khảo hạch tấn phong» gloss rewritten from BAL (one text).
3. **PHÂN CUNG** — `window.phanCungEdict({list:[{p,fav:{E,T,H}}],then})` exactly that shape. Re-houses the listed people by the ONE palFix rule, then a kit panel (Q modal → kit T1 panel, kitRows Nơi ở / Vì sao + one row per kept girl) «Thái giám Nội vụ phủ tuyên chỉ phân cung …», button «Về nơi ở mới»; then() once when it closes (also on an empty list / error).
   - Rule (`pcHostPick`, hooked into jpal palFix pickHost, so every later palFix and every NPC use it): score = Sủng'·standing'(bcDanh + bcNear = palace-distance measure) + Hoàng hậu'·kind[host tính tình] + Thái hậu'·(host's Thái hậu favour) − load × co-residents. Chủ vị palaces keep bcGrantIx (Sủng-driven).
   - fav: SELSCENE carries fav into Sủng / th / hh before the hook (selxCarry) → the rule reads the live values (no double count).
   - Later promotion that changes her lodging → the same panel once (skipped when the Tần ban-cung ceremony S.palCer runs).
4. **kitPromoHook** (jexam, rewritten): {months, rank, miss, ready, ky, sp}; months = 0 when ready, else months to the first kỳ at/after the time wait (a kỳ month she cannot use points to the next one); read-only (S.ex and S.pb restored).
5. **ĐẠI LỄ (son weight)** — added on Foreman D's SCOPE ADD 07:00Z (OD 24/11 ~05:55Z «đều phải có điều kiện … sủng, danh, đức»): `pbDl/pbDlWhich/pbDlRows`.
   Triggers (world state, same on both co-op seats): first Tết of a reign (era), a new Hoàng hậu, Thái hậu thọ 50/60/70/80 (Thánh thọ month), Hoàng thượng thọ 30/40/50/60 (Vạn thọ month), a new Thái tử. Two within BAL.promoR.dl.minGap 24 months → the later is an ordinary kỳ. A đại lễ month replaces its kỳ.
   Who: every consort (her + NPCs, law 1) meeting every promoReqP row but the exam/kỳ rows + Đức ≥ BAL.promoR.dl.duc[target] → DIRECT decree (exDirectUp), no exam; more candidates than free seats of a rank → all hold a passed exam and j34 fillSeats seat contest decides; the rest «chờ kỳ sắc phong tới (…, còn N tháng)». Loss: lễ tạ ân Bạc bacM × BAL.pay + ghen (NPC: oán).

## Tests
| gate | result |
|---|---|
| dev/test/promo-build.js (new, 29 checks incl. 5 đại lễ: direct, not-eligible waits, Đức row, minGap → kỳ, seats short → contest; and: kỳ timing irregular, stable calendar, ordinary gated, window runs on, fail → next kỳ, daughter special + block kept, first son direct, fail/lapse use up, birth queue, favour cut per nết + caps, Thái hậu once + renewal, Hoàng hậu once + maxTo + new queen, NPC parity, NPC exam only in kỳ, phanCungEdict then() once + empty list, host rule kind/harsh, hook read-only + ready in kỳ, rule text from BAL, old save) | 29/29 PASS, 0 page errors (24/24 ×3 before đại lễ) |
| one-core-guard ×3 | PASS ×3 (inlineNow 3112 ≤ baseline) |
| promo-exam | 32/32 (test `elig` moved into a kỳ month) |
| kit-promo-hook | 8/8 Fold + iPad (2 expectations moved to the new rule) |
| promo-skip | same 2 FAILs as LIVE 0c0877a2 (grace-seat, strike-back); help-text check now /i |
| promo-rules | 26/28; LIVE 26/28 — same 844x390 reveal FAIL; LIVE's NPC-servant FAIL passes here, ours has none new |
| promo-next-rank | same BAD rows as LIVE (card names "") — pre-existing |
| coop-e2e | 142/142 (before and after đại lễ) |
| quickcheck (7c4116de vs LIVE 0c0877a2) | PASS: core gates PASS (one-core, rules-one-source, kit-conform, coop-one-world, 7 hooks), old save ok, perf new/live render 296/315, tab 565/597, buổi 1471/1694 ms. (An earlier run during a robot job failed perf longTaskMax and G4 80-dialog-fixed #54 «new-title plate on the event picture»; #54 fails on LIVE 0c0877a2 too — pre-existing; the clean rerun passed both.) |

## Robot (20 lives × 10 years each, same drift policy for her: Sủng +1.2 / Danh +1 a month, auto-sit every open window)
| per life | LIVE 0c0877a2 | promo-build |
|---|---|---|
| her promotions, first 5 years | 1.90 | 2.10 |
| her promotions, 10 years | 2.30 | 2.50 |
| NPC promotions (all consorts), 5 years | 8.30 | 9.05 |
| NPC promotions, 10 years | 9.20 | 10.55 |
| special grants (20 lives) | — | 113 NPC + 12 her (sung 79, hh 31, th 15) |
Second run after ĐẠI LỄ (another 20 random lives): her 1.30 / 1.75, NPC 9.25 / 10.95; 25 đại lễ in 20 lives (≈ one per 4–8 years), 10 direct đại lễ decrees. Her numbers swing ±0.6 between 20-life runs (random lives), so read her rows as «about the same as LIVE».
Read: the ordinary road now opens ~2.3 kỳ a year instead of any month, so ordinary sittings fall (NPC 362 vs 320 sits incl. specials); the special routes put the totals back slightly ABOVE today (+10 %). If sếp wants promotion rarer, the knobs are BAL.promoR.sp.sung.add (favour cut) and the patron cuts — not changed by me (numbers are ours, tuned by robot; flagging for Foreman D).

## Shots (Fold 755x1000 + iPad 1180x820, host mode, looked 3×) → CDN img/_review/promo-build/
phan-cung (edict panel: her + 3 kept girls; unknown girls keep «Quý nhân ???» per the greeting rule), phan-cung-later (Thường tại → Quý nhân move), ky-log. Fixed after looking: «Hoàng hậu quý ta» got the relation auto-link («Hoàng hậu → ta: thiện cảm») → now «được Hoàng hậu thương»; «Càn Thanh» → PLNAME.dtd (Dưỡng Hòa điện).
**ART REQUEST (Foreman C):** the Phân cung panel has no picture of its own, so the kit shows the room she is in (fallback of jevban); a «phân cung / tuyên chỉ dời cung» banner would fit better. No code-drawn art added.

## Open points for Foreman D
0. net-thresholds worker (NZ3P5j3c, 07:22Z) proposed BAL.promo.favK multipliers per Emperor nết (reports/net-thresholds.md §5) for the favour cut. Built here: the ADDITIVE table of the approved design (BAL.promoR.sp.sung.add, cut = RANKS[next].s + mean add). Switching to favK is one function (pbSungCut) — Foreman D / MAIN decide; not changed.
1. LAW 1 gap: when SHE is the Hoàng hậu, NPCs get no «Hoàng hậu đề cử» from her (it would need her choice: an act card «Đề cử phi tần», equal-value options). Not built — needs a design word.
2. Deathbed / posthumous special exams (design rows 9–10) were not in this brief → not built.
3. Mourning 27 months after the Thái hậu dies stops every kỳ (design value); robot runs rarely reach it.
4. palace-distance (review/palace-distance 9e655c3e) has not posted SẴN SÀNG KIỂM yet; its diff touches jbancung palCeremony only — no conflict with jpal pickHost; merge when it lands.

~95% xong / ~90% chơi được
