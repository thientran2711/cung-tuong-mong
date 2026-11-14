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

## After review/balance v12 (dcb23148: Vừa HH 35%, early death 42%, poisonNow=1 in Vừa)
- Merged; jdiff no longer has its own poison rule (jbal2 owns BAL.poisonNow). Dễ sets poisonNow 0 (a landed poison hurts but does not kill her
  outright: the softer rule, her side only — NPCs already died at Sức 0), Khó keeps it.
- Owner fixes (11/14 late): Độ khó row back in normal flow under the face picker (it sat in the pinned choice block and covered the picker);
  new module jrolefig.js: while she serves as cung nữ she wears the maid tier of her servant rank (m + S.srv.rk; start = tm1), figure + portrait +
  picker thumbs (all through j88 f88Best). Checked all 9 origins: consorts wear consort tier = rank+1 (j66 rule), cnv tm1.
  Overlap check on a local merge with review/identity-card at 686x880@2.2, 755x1000@2, 1180x820@2, 390x844@3: no overlap, choices visible.
| run | Dễ HH / early death | Khó HH / early death | notes |
|---|---|---|---|
| v6 (Dễ hz .55, birth −2/−3, poisonNow 0, hhTh −10, outQ −20; Khó hz 1.1, mot 1.2, poisonX 1.2, hhTh +10, outQ +25) | 67% / 20% (n=30) | 9% / 58% (n=33) | cnv Dễ: 1/4 + cnv-only run 2/7 |
| **v7 shipped** (Dễ: no outQ change, hhTh −5; Khó hhTh +5) | **53% / 20%** (n=30; childbirth 6.2%/labour; cnv 2/3) | **10% / 50%** (n=30; poison 9, childbirth 4, cnv xuất cung 2; cnv 0/4) | Khó pooled v6+v7 n=63: HH 10%, death 54% |

Per origin v7 (n/HH/died) — Dễ: ch 5/4/1 cn 3/1/0 cnv 3/2/1 dtq 4/1/2 muoi 3/1/1 nc 3/3/0 td 3/2/0 thd 3/2/0 tt 3/0/1;
Khó: ch 3/0/3 cn 3/0/1 cnv 4/0/3 dtq 4/0/1 muoi 4/2/2 nc 3/0/0 td 3/1/2 thd 3/0/2 tt 3/0/1. Time to HH median: Dễ 6.2 y (222 tuần), Khó 12.3 y (n=3).
Khó HH sits under the 15–20 band; next step if wanted: Khó hhTh +0 (then re-measure). cnv in Khó: 0/7 over v6+v7 ("possible" not shown in 7 lives).
- Merged origin/review/page-curl (fold-layout + book) 7623ff49: assemble + jbook, jk3, jk4 (j80 stays out, as balance). On that build:
  no page errors, no horizontal overflow, Khó accept/reload OK, old save = Vừa (686/755/1180). Shots dev/shots/difficulty/*-kho.jpg (cnv + tt).

## v8 (Khó hhTh +0, other Khó knobs unchanged) — shipped
Measured on the merged page-curl/fold-layout build, Khó only, 44 lives (4 shards x 11, 2 bots at a time):
HH **20%** (9), early death **50%** (poison 12, childbirth 8, illness 2), survived w/o HH 30%; childbirth death 21.6%/labour (0.84 labours/life);
median time to HH 7.7 y (278 tuần). Per origin (n/HH/died): ch 4/0/2 cn 5/1/1 cnv 4/1/2 dtq 6/1/4 muoi 5/1/3 nc 4/2/0 td 5/2/3 thd 7/1/3 tt 4/0/4.
cnv reached HH in Khó (1/4). Dễ unchanged from v7 (53% / 20%).
Bot harness note: each shard logs 6 PAGEERR "Cannot read properties of null (reading 'classList')" on this merged build (constant per shard, not per life;
the UI check via dui.js on the same build showed none) — likely a bot-path hook into an element the fold/book layout removed.
