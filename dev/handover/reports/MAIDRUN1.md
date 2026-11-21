# MAIDRUN1 — maid run L2086 (words only; L2089 = NO gens)
depth 2 (limit 8) · START_CTX ~5 % (used_tokens reads 0, own estimate) · roll at ~30 %, ceiling 60 %. 0 gens, 0 cr.
PRIORITY #1 CHECK: rule.py K19 K20 K22 K24 G59 G60 B27 E13 F11; maid7/CHANGES.md; MAIDFIX3/4 + FACEPAGE1 reports; FOREMAN_C_STATUS L1836/L1919/L1938/L1971/L1983/L2067/L2086–L2090; prod/ newest file per person × rank; ArtifactData `picks` on both face pages. Reused: prod files, check_store, keep_check, maid-items gate, build.py (age support check only).

## 1. Face-pick state (L2089 blocker)
- Page 1 "Danh sách mặt cung nữ" 4jD7WE84Dgb8MSyvhn5sKF (v4: 51 faces m01–m52, m09 Sắc sảo hidden; «đang dùng» m10 m12 m13 m18, m11 «đã bỏ»): `picks` = **0 documents** — she has ticked nothing.
- Page 2 "Mặt dự phòng" 7dv7xgmv261DvwFyZ9PjDv (29 spare faces): `picks` = **0 documents**.
- She still has to choose: (a) which faces are the maid persons (keep m10/m12/m13/m18? which face replaces m11 baby face — L1919 "m11 must redraw"); (b) m09 Sắc sảo: hidden since L1938 — keep or drop; (c) how many maid persons: the 5 with prompts, or all 90 (her L2067 estimate).
- Also still open before mass drawing: thân cận hair (3 choices THANCAN_HAIR_CHOICES_L1971.md sent L1975, no answer recorded; affects tam/nhị/nhất thân cận); ma ma a36 look (approved test5_mama single jade dress FAILS mama gate S32 hai tà — open since MAIDFIX3).

## 2. Job list (persons × ranks × ages 18→36)
Ranks (L2086 "trừ nhị đẳng", = her L2067 8 ranks): thô sử, tam, tam thân cận, nhị thân cận, nhất, nhất thân cận, chưởng sự, ma ma. Ages in the maid system: a18 / a26 / a36 / a51 / a65 (no a22); builder words a18 "about 22", a26 "about 30", a36 "about 36" (build.py tm0–tm4 all three ages verified).
Ma ma exists only a36/a51/a65 (MAIDFIX3 ladder) → in 18→36 only **ma ma a36**.
Per person: 7 ranks × 3 ages + ma ma a36 = **22 pictures**. Prompts that exist today: only ONE age per rank (thô sử/tam/nhất/nhất TC a18; tam TC/nhị TC/chưởng sự a26; ma ma a51) → **15 of 22 cells per person have no prompt yet** (need an age maker, after the face picks, since face words + ref change anyway).
| option | persons | pics | cost @55 |
|---|---|---|---|
| A (current maid persons m09 m10 m12 m13 m18, or 5 after her re-pick) | 5 | 110 | **6 050** |
| B (her L2067 90 persons) | 90 | 1 980 | **108 900** |
| A without nhị thân cận (if "trừ nhị đẳng" also drops it) | 5 | 95 | 5 225 |
Recommend A (latest line L2086 = "cung nữ", the maid production set of L1836/L1919).

## 3. Prompt check (40 files = 5 persons × 8 ranks, newest prod file each; m11 + nhị đẳng excluded)
Gates: check_store (maid a18/a26, mama a51) · keep_check --sidecar · --maid-items (E13) · own cross-person ANGLE/Pose check (check_store --batch cannot read maid file names: FAIL B0 "want <pid>_t<rank>_" on all 40 = gate gap → foreman/BUILDFIX).
Word scans 40/40: K22 hair-up sentence 40 · K15 no hair flowers 40 · G59 sachet/pendant 0 · Qing headdress words 0 · M01 "NOT 3D" 40 · K19 uniform: cung nữ ranks powder blue #A7BAD2 (30), chưởng sự tím cà + ma ma jade (10) = per role.
| fault | before | after | fix |
|---|---|---|---|
| G60b thô sử bow has no long ties | 5/5 FAIL | 0/5 | + "with two long soft ties trailing down from the bow" (make17_L2089.py; maker make8_prod.py line 46 fixed too) |
| LEN ma ma > 10 000 chars | 3/5 FAIL (m10 10056, m12 10040, m18 10023) | 0/5 (max 9955) | drop doubled frame clause "Full-body standing figure … soft even light;" (MASTER_COMMON line 3 keeps the same words), all 5 ma ma |
| maid items E13 | PASS | PASS | — |
| same ANGLE/Pose across persons | 0 dups | 0 dups | — |
After: 40/40 check_store PASS, 40/40 keep_check PASS. New files prod/*_thosu_L2089.txt, *_mama_a51_L2089.txt (+ .keep).
Notes (not changed, A18): ma ma a51 outfit says "fine embroidered silk brocade" (mama scope, B27/B12 ma ma exception?); nhất hairpins "small pearl tassels" (hair, not item).

## Handover
Nothing in progress. Next (only after her face picks + GO): age maker for the 15 missing cells per person, then 1-person sample @55.

## 4. Age maker (ROOT-B2 order after L2089) — make18_ages.py → dev/art/maid7/prod_ages/ (70 files + .keep), 0 gens
- 5 persons × 7 ranks (thô sử, tam, tam TC, nhị TC, nhất, nhất TC, chưởng sự) × the 2 missing ages = 70. Base = newest prod file (thô sử = L2089).
- ONLY the age sentence changes, builder words: a18 "about 22, youthful adult." · a26 "about 30, mature and poised." · a36 builder "about 36 but looking young for her age (trẻ trước tuổi) …". Existing cells kept: 6 ranks a18 today (note: thân cận files say "about 22" = a18), chưởng sự "about 28 but looking young" = her a26.
- Item / hair / pose / angle / outfit / colours / face unchanged (E13 item stays per person × rank; if she wants a different item per age, that is a new choice for her).
- LEN: nhất + nhất TC at a26/a36 went over 10 000 (13 files) → boilerplate trim on the whole age family (A38): builder header "Full-body standing figure … soft even light;" (= MASTER_COMMON line 3) + "gentle expression with soft eyes and a bright closed-lip smile, lips closed, no teeth, mouth never open;" (= the MOUTH/teeth sentences + her own Expression). allow lines in each .keep.
- Gates: check_store --scope maid --age a18/a26/a36 70/70 PASS · keep_check --sidecar 70/70 PASS · max 9 968 chars.
- NOT built: ma ma a36 (only ma ma prompt is a51 with another outfit + elder colour rule; a36 look vs gate S32 = her open question). So drawable 18→36 now = 21/22 per person (105 pics × 55 = 5 775 for 5 persons) once faces are picked; face words + refs will change after her picks (rerun the makers on the new face files).
- check_store --batch maid-name gap sent to BUILDFIX2.
