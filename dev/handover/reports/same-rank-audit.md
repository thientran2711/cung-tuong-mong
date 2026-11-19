# Same-rank audit: item / angle / pose / grace across people

Read-only audit (no builder changed, no image made). Source: `dev/art/store-all/build_all.py` `build(person, rank, age)` run in-process for m01–m52 × t1–t8 × a18/a26/a36/a51/a65 (2080 prompts; the B8 "not drawn" refusal was bypassed so all 52 are counted). Fields pulled from each final prompt: HELD ITEM (`{prop}` of the pose slot), `ANGLE:` sentence, ` Pose:` sentence (exact, and its template with the item words removed), `GRACE` line.
Audited at commit `de5b1612c`. Note: `_e6_picks` does **not** exist in either builder at this commit (grep finds nothing); items come from `_install_ladder.pick`: `idx = (n-1 + 3*ageStep) % 10` over a 10-item list per rank.

A "cell" = one (rank, age); 40 cells. "Distinct" = number of different values among the group's people in that cell.

## Summary tables

### All m01-m52 (52)

| field | distinct per cell (avg / min) | largest same-value group | cells (of 40) with any repeat | avg people per cell sharing with someone | worst cell |
|---|---|---|---|---|---|
| held item (exact) | 10.0 / 10 | 6 | 40 | 52.0 | t1 a18: m01+m11+m21+m31+m41+m51; m02+m12+m22+m32+m42+m52; m03+m13+m23+m33+m43 |
| angle sentence (exact) | 12.0 / 12 | 8 | 40 | 52.0 | t1 a18: m03+m04+m17+m21+m24+m27+m44+m48; m07+m10+m13+m23+m29+m34+m43+m52; m01+m12+m31+m47 |
| angle, visual class (5) | 5.0 / 5 | 16 | 40 | 52.0 | t1 a18: m05+m06+m08+m09+m11+m19+m20+m25+m28+m35+m36+m37+m39+m40+m45+m51; m01+m07+m10+m12+m13+m23+m29+m31+m34+m43+m47+m52; m03+m04+m14+m17+m21+m24+m27+m38+m44+m48+m49 |
| pose (same template, item words aside) | 38.2 / 33 | 3 | 40 | 27.2 | t2 a26: m02+m28+m37; m01+m17; m05+m52 |
| pose sentence (exact, incl. item) | 50.4 / 46 | 2 | 29 | 3.2 | t3 a26: m04+m34; m07+m47; m15+m45 |
| grace line | 8.0 / 8 | 7 | 40 | 52.0 | t1 a18: m01+m13+m19+m31+m38+m48+m49; m03+m12+m16+m24+m36+m46+m52; m04+m11+m18+m21+m37+m44+m50 |
| item + angle | 44.5 / 40 | 4 | 40 | 14.0 | t5 a18: m13+m23+m33+m43; m01+m11+m31; m12+m42 |
| angle + grace | 41.0 / 38 | 4 | 40 | 20.4 | t1 a18: m09+m20+m28+m40; m04+m21+m44; m01+m31 |
| item + angle + grace | 50.0 / 47 | 2 | 35 | 4.0 | t1 a18: m01+m31; m04+m44; m05+m45 |
| item + angle + pose | 51.8 / 50 | 2 | 7 | 0.4 | t4 a65: m01+m51; m22+m42 |
| item + angle + pose + grace | 52.0 / 51 | 2 | 2 | 0.1 | t1 a18: m04+m44 |

### Sắc sảo (8)

| field | distinct per cell (avg / min) | largest same-value group | cells (of 40) with any repeat | avg people per cell sharing with someone | worst cell |
|---|---|---|---|---|---|
| held item (exact) | 5.0 / 5 | 2 | 40 | 6.0 | t1 a18: m05+m35; m11+m41; m17+m47 |
| angle sentence (exact) | 5.8 / 5 | 3 | 40 | 4.1 | t1 a18: m05+m11+m35; m23+m29 |
| angle, visual class (5) | 4.5 / 4 | 3 | 40 | 6.0 | t4 a18: m29+m41+m47; m05+m23; m17+m35 |
| pose (same template, item words aside) | 7.7 / 6 | 2 | 11 | 0.6 | t8 a26: m11+m29; m17+m23 |
| pose sentence (exact, incl. item) | 8.0 / 7 | 2 | 2 | 0.1 | t4 a36: m17+m47 |
| grace line | 5.2 / 4 | 3 | 40 | 5.2 | t1 a18: m17+m41+m47; m05+m23; m29+m35 |
| item + angle | 7.8 / 7 | 2 | 10 | 0.5 | t1 a18: m05+m35 |
| angle + grace | 8.0 / 8 | 1 | 0 | 0.0 | - |
| item + angle + grace | 8.0 / 8 | 1 | 0 | 0.0 | - |
| item + angle + pose | 8.0 / 8 | 1 | 0 | 0.0 | - |
| item + angle + pose + grace | 8.0 / 8 | 1 | 0 | 0.0 | - |

### Tinh nghịch (8)

| field | distinct per cell (avg / min) | largest same-value group | cells (of 40) with any repeat | avg people per cell sharing with someone | worst cell |
|---|---|---|---|---|---|
| held item (exact) | 5.0 / 5 | 2 | 40 | 6.0 | t1 a18: m06+m36; m12+m42; m18+m48 |
| angle sentence (exact) | 6.1 / 5 | 3 | 35 | 3.6 | t7 a18: m18+m24+m36; m12+m30 |
| angle, visual class (5) | 4.0 / 3 | 5 | 40 | 6.4 | t3 a18: m12+m18+m24+m30+m36; m06+m48 |
| pose (same template, item words aside) | 7.5 / 6 | 2 | 18 | 1.0 | t1 a26: m12+m48; m30+m42 |
| pose sentence (exact, incl. item) | 8.0 / 7 | 2 | 2 | 0.1 | t3 a65: m06+m36 |
| grace line | 5.9 / 5 | 3 | 40 | 4.0 | t6 a18: m36+m42+m48; m06+m24 |
| item + angle | 7.8 / 7 | 2 | 10 | 0.5 | t2 a18: m18+m48 |
| angle + grace | 7.8 / 7 | 2 | 10 | 0.5 | t2 a18: m18+m48 |
| item + angle + grace | 7.9 / 7 | 2 | 5 | 0.2 | t2 a18: m18+m48 |
| item + angle + pose | 8.0 / 8 | 1 | 0 | 0.0 | - |
| item + angle + pose + grace | 8.0 / 8 | 1 | 0 | 0.0 | - |


## Concrete examples

- **Sắc sảo, same item at EVERY rank and age (40/40 cells):** m05 = m35, m11 = m41, m17 = m47 (numbers 30 apart, 30 ≡ 0 mod 10). Only m23 and m29 have their own item. E.g. t1 a18: m05+m35 *a plain paper folding fan*; m11+m41 *a plain silk round fan with a bamboo handle*; m17+m47 *a small embroidery hoop with silk*.
- **Sắc sảo, same item + same angle (10 cells):** t1 all 5 ages m05+m35 (FULLY FRONTAL, no turn; same grace "chin lifted"; only the pose differs); t2 all 5 ages m11+m41 (THREE-QUARTER toward the LEFT).
- **Sắc sảo, same exact angle (every cell, up to 3 people):** t1 m05+m11+m35 FULLY FRONTAL; t6 m23+m35+m47 FULLY FRONTAL; t8 m11+m29+m47 FULLY FRONTAL.
- **Sắc sảo, same pose sentence:** t4 a36 m17+m47 (same item *lacquered jewel box* + same pose "holding … mid-step"); t7 a26 m05+m35 (*gold-filigree palace lantern*, "weight on one leg, hip slightly out"). No Sắc sảo pair shares item+angle+pose.
- **Tinh nghịch:** m06=m36, m12=m42, m18=m48 same item 40/40. t2 all 5 ages m18+m48 = same item + same angle (SLIGHT turn LEFT) + same grace (chin lifted); only the pose differs. t3 a18: 5 of 8 in the same visual angle class.
- **All 52, item + angle + pose identical (7 cells, all pairs n / n+10·k):** t1 a18 m04+m44 (plum sprig, slight turn RIGHT, tiptoe step; also same grace), t1 a26 m16+m46 (silk lantern, 3/4 LEFT, walking; also same grace), t1 a65 m04+m24, t4 a65 m01+m51 and m22+m42, t7 a18 m19+m39, t7 a51 + a65 m14+m34.
- **All 52, exact angle:** t5 a18 one string "FULLY FRONTAL …" is used by 15 people (several frontal strings combined: 16 in the "frontal" class at t1 a18).

## Conclusion (what causes repeats)

1. **Items:** a 10-item list per rank, index `(n-1+3·age)%10` → person n and n+10, n+20, … hold the **identical** item at every rank and age (5–6 people per item among 52). The 6-step groups (Sắc sảo, Tinh nghịch) hit n and n+30 → 3 fixed pairs per group, only 5 distinct items for 8 people in every cell.
2. **Angles:** ANG14 has only **12 different sentences** (index 1 = 12 and 5 = 8 are word-identical) and ~5 visual classes (4 of the 14 are frontal); the plan balances counts over all 87 people (c01–c32 + m + p), not per group, so 52 people → 4–8 per exact sentence, up to 15 frontal.
3. **Grace:** only 8 lines → among 52 people every line is used ~6–7 times per rank; within an 8-person group 4–6 distinct, up to 3 share.
4. **Angle and grace ignore age** (`plan("a18")` is used for both), so a pair that shares angle/grace at a rank shares it at all 5 ages; only the pose plan and item change with age. Combined with (1) this makes item+angle pairs persist across all ages (m05/m35 t1, m11/m41 t2, m18/m48 t2).
5. **Poses** are the only really spread field (66 poses, 0–3 per template per cell); the pose is what keeps every Sắc sảo/Tinh nghịch full combo (item+angle+pose) unique, while across all 52 there are still 7 cells with an identical item+angle+pose pair and 2 with an identical item+angle+pose+grace pair.

## E12 SAME-RANK FIX — BEFORE / AFTER (BW6, 19/11; owner Lượt 650/656, ROOT-54 ruling (b))

Script: `dev/art/store-all/same_rank_audit.py` (same method as above: `build_all.build(person, rank, age)` in-process, B8 bypassed, fields read from the final prompt; angle class = `build_all.ang_class`). 8 ranks × 5 ages = 40 cells per group.
BEFORE = commit a8dbfcd (E6 picks already wired, so the item numbers differ a little from the first table above, which was made at de5b1612c). AFTER = the BW6 commit.

What changed:
- **Items:** every per-rank list (L3F t1–t6, ITEMS7 t7, ITEMS t8) and TH_ITEMS (Thái hậu) extended IN PLACE from 25 to 40 items (3 new per age → 8 per age; the first 25 untouched, same order). Inside one look group, member i (sorted) takes colour class i of a proper 8-edge-colouring of the rank × item-kind graph of that age → 8 different items per rank, and still 8 different kinds per person over t1–t8 (E6, e6_check = []). Thái hậu: member i → TH_AGE[age][i]. People outside the m look groups keep the old pick.
- **Angle / grace:** per-age plan (was the a18 plan at every age). Inside each look group, per age: angles = seeded backtracking grid (each rank: 8 different sentences, ≤ 2 per visual class; each person: 8 different over her ranks, E1); grace = seeded Latin square (each rank 8 different lines, each person 8 different). Poses untouched.
- **ANG14:** entries 8 and 12 were word-identical to 5 and 1; rewritten with approved words ("body turned slightly three-quarters to the RIGHT/LEFT" = _TA_NF approved HH words, "the whole face clearly visible and towards the viewer" = MAMA_ANGLE). 14 different sentences now.
- **Gate:** `build_all --check` runs `_E12_GATE`: FAIL on any repeat of item / angle / grace (cap = ceil(members/options)), > 2 per angle class, or a repeated Thái hậu item inside a group at one rank + age.

### BEFORE
#### Sắc sảo (8)

| field | distinct per cell (avg / min) | largest same-value group | cells (of 40) with any repeat | cells over the E12 cap (item/angle/grace 1, class 2) | worst cell |
|---|---|---|---|---|---|
| held item (exact) | 4.6 / 3 | 4 | 40 | 40 | t4 a65: m05+m11+m35+m41 |
| angle sentence (exact) | 5.8 / 5 | 3 | 40 | 40 | t1 a18: m05+m11+m35 |
| angle, visual class (5) | 4.5 / 4 | 3 | 40 | 30 | t1 a18: m05+m11+m23+m29+m35+m47 |
| grace line | 5.2 / 4 | 3 | 40 | 40 | t3 a18: m17+m35+m41 |

#### Tinh nghịch (8)

| field | distinct per cell (avg / min) | largest same-value group | cells (of 40) with any repeat | cells over the E12 cap (item/angle/grace 1, class 2) | worst cell |
|---|---|---|---|---|---|
| held item (exact) | 4.6 / 3 | 4 | 40 | 40 | t5 a51: m12+m18+m42+m48 |
| angle sentence (exact) | 6.1 / 5 | 3 | 35 | 35 | t7 a18: m18+m24+m36 |
| angle, visual class (5) | 4.0 / 3 | 5 | 40 | 35 | t3 a18: m12+m18+m24+m30+m36 |
| grace line | 5.9 / 5 | 3 | 40 | 40 | t4 a18: m06+m12+m48 |

### AFTER
#### Sắc sảo (8)

| field | distinct per cell (avg / min) | largest same-value group | cells (of 40) with any repeat | cells over the E12 cap (item/angle/grace 1, class 2) | worst cell |
|---|---|---|---|---|---|
| held item (exact) | 8.0 / 8 | 1 | 0 | 0 | - |
| angle sentence (exact) | 8.0 / 8 | 1 | 0 | 0 | - |
| angle, visual class (5) | 4.8 / 4 | 2 | 40 | 0 | t1 a18: m05+m17+m23+m35+m41+m47 |
| grace line | 8.0 / 8 | 1 | 0 | 0 | - |

#### Tinh nghịch (8)

| field | distinct per cell (avg / min) | largest same-value group | cells (of 40) with any repeat | cells over the E12 cap (item/angle/grace 1, class 2) | worst cell |
|---|---|---|---|---|---|
| held item (exact) | 8.0 / 8 | 1 | 0 | 0 | - |
| angle sentence (exact) | 8.0 / 8 | 1 | 0 | 0 | - |
| angle, visual class (5) | 4.8 / 4 | 2 | 40 | 0 | t1 a18: m06+m12+m30+m36+m42+m48 |
| grace line | 8.0 / 8 | 1 | 0 | 0 | - |

(AFTER "worst cell" for angle class lists the pairs that share a class; 2 per class is the E12 maximum.)

Gates on the BW6 commit: `build_all.py --check --age` a18/a26/a36/a51/a65 → 0 FAIL ×5 (incl. E6 + E12). `check_store.py --self` 0 problems; `item_age.check_age5()` []. Extra: all 16 Sắc sảo + Tinh nghịch people (B8 bypassed) × t1–t8 × 5 ages = 640 prompts through check_store → 0 FAIL; their Thái hậu prompts a36/a51/a65 → 0 FAIL (Thái hậu a18/a26 do not exist in the 18/11 elder file).
Old look groups with 9 m people (Tươi tắn, Dịu dàng, Trong trẻo, Đoan trang): angles fully different; items and grace allow exactly the pigeonhole repeat (8 options for 9 people) — the gate cap is 2 there.
E12: NEW gens only. Nothing redrawn, no gens made.
