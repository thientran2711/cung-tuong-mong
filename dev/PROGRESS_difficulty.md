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
- [ ] Dễ 30 lives, Khó 30 lives; report table

## Measured (sensible bot, HHSTOP, 9 origins, 3 shards × 10 lives; scratchpad runall.sh)
| run | Dễ HH / early death | Khó HH / early death | notes |
|---|---|---|---|
| v1 (hz .7/1.3, poisonX ×1.33 Khó) | 32% / 32% (n=28, 7 childbirth) | 23% / 17% | Khó: few births (0.5/life), poison lands 3.3×/life but never kills her |
| v2 (Dễ stronger; Khó + poisonNow) | 57% / 10% | 3% / 97% (24 poison deaths) | found: j8 poison kills an NPC at Sức 0 at once (dieIf) but her only at tuần end after +4 rest |
| v3 (Dễ birth −2/−3; Khó no poisonX, seeMaxP −5, hz ×1.2, mot ×1.4) | **50% / 20%** ✔ (childbirth 9.6%/labour, HH median 7.0 y) | 3% / 80% (20 poison) | Dễ final |
| v4a/v4b Khó (runk.sh: hz 1.1/1.2, seeMaxP 0, poisonX .8/.67, mot 1.2/1.4) | – | running | |
