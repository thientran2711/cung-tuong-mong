# AGEBAND — E59r BIG review (review/ageband 6155c7c4 → review/ageband-r)

PRIORITY #1 CHECK ('ageBand|ageMin|age.adult|18+R('): OD 10 (OD 24/11 ~00:25Z = this job) | main BAL.ageBand jbal.js:339 (LIVE 14ba8768) | review/ageband 6155c7c4 (E57) | claims AGEBAND row (E) + this review row.

Owner (verbatim, OD 24/11 ~00:25Z): "Cập nhật tuổi game là 18, 28, 39, 51, 64".

**VERDICT: FAIL** (one finding, LAW 11 / LAW 4; everything else PASS). Merge base for the fixer: **review/ageband-r @ 86b87a32** = 6155c7c4 + merge of LIVE 14ba8768 (only index.html / sw.js / assets.json conflicted; rebuilt with dev/site/build_site.sh, no code conflict).

## FAIL list
1. **LAW 11 / LAW 4: the adult-minimum-18 scan missed 4 sites.** The report's table says "adult minimum 18 … 37 → 0". Left typed in the khuê các home cast (all spawn ages that mean "the youngest adult", same kind as the j54 suitor `BAL.ageMin+R(6)` and the jkc `S.age=BAL.ageMin` the worker already moved):
   - `dev/build/jkc.js:131` Thứ muội `T("muoi",…,18,"consort",…)`
   - `dev/build/jkc.js:133` Khuê hữu ×2 `18+R(2)`
   - `dev/build/jkc2.js:134` Xuân Đào `18+R(2)`
   - `dev/build/jkc2.js:142` muội `T("muoi",kc2Muoi(),…,18,"consort",…)`
   Fix: `BAL.ageMin` / `BAL.ageMin+R(2)`; re-run the scan over every `T(`/spawn age literal 15–20 in dev/build (scan used: `grep -nE "\b18\s*\+\s*R\(|age\s*[:=]\s*18\b|Math\.max\(18\b|,\s*1[89]\s*,\s*\"(consort|man|maid|mama|official)\"" dev/build/j*.js`), add the rows to the before/after table, rebuild, quickcheck. No runtime change (values ≥ 18, jage never lifts them), so the fixer's re-run of ageband-unit + quickcheck is enough; I re-review only the diff.

## Checked and PASS (on 86b87a32, every gate run by me)
- **Numbers**: `BAL.ageMin:18`, `BAL.ageBand:[28,39,51,64]`, `BAL.ageArt` a18…a65; labels 18-27 / 28-38 / 39-50 / 51-63 / 64+. No old band value left: grep of 25/26/35/36/50/51/64/65 next to age/tuổi/band in dev/build, dev/*.md, dev/rules (handover) → only non-band concepts.
- **"Not changed" list is right** (none is a band edge): birth risk >35 (j35 ageLine, j32), illness >50 (j35, j13 emperor), menopause ≥50 (jcycle), mama picture ≥45 (j3 maidSrc), maid womid to 44 (j17), Thái hậu face pool ≤55 (j17 th0/th1 split), suitor age-out >27 (j54) / quý nữ >24 (jht), j96 min 19, conceive −3/yr after 28 (j8), lãnh cung ≥40 (j3). `BAL.age.sacFrom:25` (Sắc falls after 25) is already in BAL and is a beauty rule, not a band; listed for the record only.
- **Art tags as band indexes**: every manifest on the CDN (FIGURES, -servants, -others, -x, -kc) uses only a18/a26/a36/a51/a65, so `ageArtIx` covers every row. Picking: j66 `figDist` (the global override, band distance ×1.2 first) + j35 `tagBand` + jkc `kcDressRec` + jstaff/jtut `BAL.ageArt[3]/[2]` + jimg `mePor` (capped band 3 = player set) all go by band, so nobody gets art of a wrong band (the j39 base figDist that would pick a26 for a 27-year-old is replaced by j66 for every caller: figBest / f88Pick / jfigx / jty / j86).
- **j35 identity rule / old saves**: unit case 6 (26/27 keep a18, 28 → a26, same identity c01) PASS; quickcheck old save from LIVE loads and plays a buổi.
- **BAL.age.adult folded**: no reader left in game code, tests, co-op / rank workers (only the historical dev/measure/one-core-dup2-move.py). «công chúa từ … tuổi» prints `BAL.age.wed` (j54:240, jht:261).
- **Canon edits** (main HANDOVER:53, OUTSIDE_PLAN, SUCCESSION_PLAN:68, ART_COMPLETENESS:78; handover HANDOVER:53, FIGURE_GATE:171/216, WORKER_BRIEF:17, START_WORKER:28): word-diff shows only the band numbers (+ the owner tag / art-tag note) replaced in place; no other rule wording touched (LAW 14 / 16 OK). "51+" left in OUTSIDE_PLAN:95/98 and SUCCESSION_PLAN:68 means "aged 51 and over" — still true.
- **Gates on 86b87a32**: ageband-unit **13/13 PASS** · quickcheck **PASS** (core gates G1–G5 incl. one-core-guard / -text / -bind / -text-rule, time-spill, old save ok, perf median new/live render 222/212 ms, tab 358/382, buổi 1005/1199) · fig-wiring **PASS** (0 blanks, every rule held, 0 page errors) · role-parity ×2 **ALL PASS** · coop-e2e ×2 pairs: Fold host **141/141**, COOP_SWAP **141/141**, Fold host **141/141**, COOP_SWAP **141/141** (no canonical-W diff in any run; the worker's first-pair diffs were the known OPEN-B / week-2 flake, not this branch).
- **Shots looked at** (Fold 755x1000@2 + iPad 1180x820@2, scratch only, not in git): her header «27 tuổi» → «28 tuổi», same identity, a18 → a26 figure; her maid at 38 → 39, same identity, a26 → a36 ma ma look on the stage and in the maid card (iPad). No page errors, nothing cut.
- Worker shots under dev/handover/shots/ageband/ (2 jpg in git, CDN refused) — delete after the verdict per IMAGE STORAGE rule (Foreman E).
