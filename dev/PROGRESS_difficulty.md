# PROGRESS — review/difficulty (Độ khó Dễ / Vừa / Khó, owner 11/14 21:30Z)

Base: origin/review/balance (merge newer review/balance as it moves). Module: `dev/build/jdiff.js`, in assemble.py right after jbal2.

## Design (done)
- `S.diff` per life: "de" | "vua" | "kho"; missing (old saves) = Vừa. Chosen on the identity card (Thân phận kiếp này) while NLP is set,
  fixed after "Nhận thân phận". Last choice remembered in localStorage `ctm-diff` (default for the next card). Bot: `window.__diffO`.
- Vừa = no change at all (BAL/J70CFG untouched while Vừa). Dễ/Khó = base × m + a on the same knobs, base = values in force when leaving Vừa
  (so a later balance pass on Vừa is followed automatically).

| knob | Dễ | Vừa (v10) | Khó | who |
|---|---|---|---|---|
| BAL.hz (palace aims at her) | ×0.7 | 3.2 | ×1.3 | NPC aggression toward her |
| BAL.birthAdd / birthMin | −2 / −3 | 4 / 8 | +3 / +4 | every woman |
| BAL.illDie / illAdd | ×0.5 / – | 2 / 1 | ×1.5 / ×2 | everyone |
| BAL.seeMaxP (spot poison cap) | +10 | 65 | −15 | everyone |
| BAL.poisonX | ×0.67 | 1.5 | ×1.33 | everyone |
| BAL.accCdT (charge cooldown) | ×1.33 | 36 | ×0.67 | everyone |
| BAL.hhTh (Thái hậu gate for HH) | −5 | 55 | +5 | every candidate |
| J70CFG.mot (scheme motive) | ×0.7 | 3 | ×1.5 | every schemer |
| starting bạc (hers) | ×1.5 | – | ×0.7 | her |
| Phúc duyên earned | ×1 | – | ×1.5 | her |

- UI: kit section `.kpsec.kdiff` = h4.kpst kitGloss("Độ khó") + kit segmented control `.ksub/.ksubb` on one row + `.kpnote` one-line
  description; placed INSIDE the choice block (.kpopts), right above "Nhận thân phận" (with review/identity-card's pinned choices it stays on
  screen while the body scrolls; tested on a local merge). No chip on the identity card itself (the control shows it: one fact, one place);
  chip `kitChip("Kiếp này: Khó","n")` on her own card in the game (pcard of S). End card row "Độ khó"; Sổ luân hồi line "· Kiếp này: Khó"; in-game Sổ luân hồi
  Phúc duyên line starts with "Kiếp này: <b>Khó</b>".

## Measure
`GAME=<build with meta charset> INP=inpage6.js INP2=inx.js HHSTOP=1 XJS='window.__diffO="kho";<9-origin rotation>' node dev/measure/runb.js sens N out.json`
then `python3 dev/measure/anx.py label out*.json`.

## Status
- [x] jdiff.js + assemble
- [x] UI check 686x880@2.2, 755x1000@2, 1180x820@2: switch/accept/reload/old save OK, no page errors, no overflow.
  Note: on review/balance alone the identity card (with j86 face picker) already overflows at 686/755/390/1024 (buttons cut) — pre-existing;
  fixed by review/identity-card 360f138a (body scrolls, choices pinned). Local merge test: buttons + Độ khó visible at all 7 sizes.
- [x] Khó Phúc duyên probe: promo +5 → +8, ending +5 → +5 +3 ("kiếp khó: +3"), end card row "Độ khó", Sổ luân hồi "· Kiếp này: Khó".
- [x] Dễ 30 lives (v3), Khó 30 lives (v5); table below.

## FINAL (shipped knobs = jdiff.js DIFF; Vừa = review/balance v10, untouched)
| | Dễ (v3, n=30) | Vừa (balance v10, n=30, their report) | Khó (v5, n=30) |
|---|---|---|---|
| Hoàng hậu | **50%** (target ~50) | 33% | **30%** (target 15–20; pooled with v4a n=50: 24%) |
| early death | **20%** (target ~20) | 20% | **53%** (target ~55) |
| causes | childbirth 5, illness 1 | | poison 10, childbirth 3, caught 2, illness 1 |
| childbirth death / labour | 9.6% (1.7 labours/life, shown 9.7) | 6.4% | 13% (0.8 labours/life, shown 16.3) |
| poison on her tried/landed per life | – | 25.5/1.7 | 17/1.0 (kills now: poisonNow) |
| time to HH median (years / tuần / min @10s / @20s) | 7.0 / 253 / 42 / 84 | 11.3 / 408 / 68 / 136 | 10.2 / 369 / 62 / 123 |
| cnv (servant) HH | 0/3 (v2: 1/3) | 0/3 | 2/4 |
| per origin n/HH/died | ch 4/3/0 cn 4/2/1 cnv 3/0/1 dtq 3/2/0 muoi 4/3/1 nc 3/2/0 td 3/0/1 thd 3/1/1 tt 3/2/1 | | ch 4/1/3 cn 3/1/2 cnv 4/2/2 dtq 3/0/1 muoi 3/0/1 nc 3/2/0 td 4/1/3 thd 3/2/1 tt 3/0/3 |
| deaths in first 2 tuần / page errors | 0 / 0 | | 0 / 0 |
n=30: one life = 3 points; 95% band ±17 points. Tab crashes ("Target crashed") came from machine memory, not the game.

## Open / for the balance worker
- j8 ACT.poison: an NPC dies at once when a poison takes Sức to 0 (dieIf) but she only at tuần end, after the +4 rest, so a landed poison
  practically never kills her (the "độc trúng mà không chết" open item of PROGRESS_balance). jdiff adds `BAL.poisonNow` (default 0 = Vừa unchanged;
  Khó 1). If the balance worker sets BAL.poisonNow=1 for Vừa, Dễ inherits it (Dễ only scales from Vừa's values) — re-measure Dễ then.
- Khó HH 30% sits above the 15–20 band (pooled 24%); if needed, hhTh +10 for Khó (not measured).

## Measured (sensible bot, HHSTOP, 9 origins, 3 shards × 10 lives; scratchpad runall.sh)
| run | Dễ HH / early death | Khó HH / early death | notes |
|---|---|---|---|
| v1 (hz .7/1.3, poisonX ×1.33 Khó) | 32% / 32% (n=28, 7 childbirth) | 23% / 17% | Khó: few births (0.5/life), poison lands 3.3×/life but never kills her |
| v2 (Dễ stronger; Khó + poisonNow) | 57% / 10% | 3% / 97% (24 poison deaths) | found: j8 poison kills an NPC at Sức 0 at once (dieIf) but her only at tuần end after +4 rest |
| v3 (Dễ birth −2/−3; Khó no poisonX, seeMaxP −5, hz ×1.2, mot ×1.4) | **50% / 20%** ✔ (childbirth 9.6%/labour, HH median 7.0 y) | 3% / 80% (20 poison) | Dễ final |
| v4a Khó (hz 1.1, seeMaxP 0, poisonX .8, mot 1.2) | – | 15% / 70% (n=20, 10 poison; tabs crashed: memory) | |
| v4b Khó (hz 1.2, seeMaxP 0, poisonX .67, mot 1.4) | – | 0% / 88% (n=8) | dropped |
| **v5 Khó = v4a + seeMaxP +5 (shipped)** | – | **30% / 53%** (n=30) | pooled v4a+v5 n=50: HH 24%, death 60% |
