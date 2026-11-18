# Consort live audit — which of the 32 consorts' figures are really redrawn on the CDN (W38, 18/11)

Read-only audit. PRIORITY #1 CHECK: owner question 18/11 (verbatim in the order) | read batch-consort-rest.md, -rest-B.md, -ty.md, hd-entries/*, TSV ledgers, CLAIMS, FOREMAN_C_STATUS, hoa-dien-art.md | origin/main assets.json history | CDN HEAD/GET.

## 0. Method (evidence, not just reports)
- Universe = every `img/fig-consort-cNN-<family>-<age>.webp` in origin/main `assets.json` = **2976 files** (32 consorts x [t1-t8, tm0-tm4, ty1-ty8, tcold, kc] x a18/a26/a36/a51, plus ngheo a18 only).
- "Redrawn" = (a) the file hash in `assets.json` CHANGED between the snapshot babc9b4a (17/11 01:39Z, before the 2K transparent pipeline started) and now, AND (b) a worker ledger/hd fragment says that key was generated + uploaded. All 1060 ledger keys changed; no ledger key is unchanged.
- Live size check: HEAD of all 2976 live figures: content-length == assets.json size for every one (0 mismatches, 0 missing), so the snapshot equals the CDN today.
- 612 more files changed too but are in NO generation ledger. They changed during the 17/11 hoa-dien forehead-mark cleaning (hoa-dien-art.md: "consort-ty fig 491 + hd 444", all families, local patch of the forehead dot, `q98` re-encode). These are the OLD figures with only the forehead mark removed (code `f`), NOT redrawn.
- Letters in the table: **A** redrawn by 2K transparent pipeline, refs [old figure (or old lineup sheet) + 4 faces N2HYqYa6D9 bxVgMSX5Y2 dtPf4EDXSL eIyaPEVdqL], NO m09 ref; **B** W2e/W2f recipe (m09 hd eIyOFEidqL style ref + luminous-skin clause); **C** anything else; **f** old figure + forehead patch only; **o** old, untouched. Cell = 4 letters in order a18 a26 a36 a51 ("-" = file does not exist; ngheo has a18 only).

## 1. Table c01..c32 x family x age
| c | t1 | t2 | t3 | t4 | t5 | t6 | t7 | t8 | tm0 | tm1 | tm2 | tm3 | tm4 | ty1 | ty2 | ty3 | ty4 | ty5 | ty6 | ty7 | ty8 | tcold | kc | ngheo |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| c01 | Afff | Afff | Afff | Afff | Affo | Afff | Afff | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c02 | Aooo | Afff | Aofo | Aooo | Aofo | Afff | Aooo | Aoff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c03 | Afff | Afff | Afff | Affo | Aoff | Aofo | Afff | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c04 | Aofo | Afff | Affo | Affo | Afff | Aofo | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c05 | Afff | Afff | Affo | Afff | Affo | Afff | Aoff | Aofo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c06 | Afff | Afff | Afff | Afff | Afff | Aoff | Afff | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c07 | Afff | Afff | Aooo | Affo | Affo | Afff | Afff | Aoff | Aooo | Aoof | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c08 | Aooo | Aofo | Aooo | Aooo | Afoo | Aoff | Afff | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c09 | Afff | Affo | Afff | Affo | Afof | Afff | Aoof | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c10 | fffo | Afff | Afof | Afff | Afff | Afff | Afff | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c11 | ffff | Afff | Afff | Afff | Afff | Aoff | Afff | Affo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c12 | offf | Affo | Afff | Afff | Afff | Afoo | Afff | Aoff | oooo | oooo | oooo | oooo | oooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c13 | offf | ffff | Afff | ffff | ffff | ffff | ffff | ffff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | oooo | oooo | o--- |
| c14 | ffff | ffff | ffff | Afff | ffff | ffff | ffff | foff | oooo | oooo | oooo | oooo | oooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | oooo | Aooo | A--- |
| c15 | ffff | ffff | ffff | ffff | ffff | ffff | ffof | ffff | oooo | oooo | fooo | oooo | oooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | oooo | ofoo | o--- |
| c16 | fooo | oooo | foof | oooo | fooo | oofo | ffff | foff | oooo | oooo | oooo | oooo | oooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | oooo | oooo | o--- |
| c17 | Afff | AAAA | AAAA | AAAA | AAAA | AAAA | AAAA | AAAA | AAAA | AAAA | AAAA | AAAA | AAAA | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | AAAA | AAAA | A--- |
| c18 | Afff | AAAA | AAAA | AAAA | AAAA | AAAA | AAAA | AAAA | AAAo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | AAAA | AAAA | A--- |
| c19 | Afff | Afff | Afff | Afff | Afff | Afff | Affo | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c20 | Afff | Afoo | Aoof | Aooo | Afff | Afoo | Afff | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c21 | Afff | Afff | Afff | Afff | Afff | Afff | Afff | Afff | Aooo | Aoof | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c22 | Afff | Afff | Aoff | Afff | Aoof | Aofo | Aooo | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c23 | Afff | Afff | Afof | Afff | Afff | Afff | Afff | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c24 | Afff | Afff | Aofo | Afff | Afof | Aoof | Afff | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAAo | Aooo | Aooo | A--- |
| c25 | Afff | Afff | Afof | Afff | Affo | Afff | Afff | Aofo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAAo | AAAo | AAAo | AAAo | AAoo | Aooo | Aooo | A--- |
| c26 | Aoff | Aoof | Aooo | Afff | Afff | Afff | Afff | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAoo | AAoo | AAoo | AAoo | AAoo | Aooo | Aooo | A--- |
| c27 | Afff | Afff | Afff | Afff | Afff | Afff | Afff | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAoo | AAoo | AAoo | AAoo | AAoo | Aooo | Aooo | A--- |
| c28 | Afff | Afff | Afff | Aoff | Aofo | Afoo | Afff | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAoo | AAoo | AAoo | AAoo | AAoo | Aooo | Aooo | A--- |
| c29 | Afff | Afff | Aooo | Afff | Affo | Affo | Afff | Affo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAoo | AAoo | AAoo | AAoo | AAoo | Aooo | Afof | A--- |
| c30 | Affo | Afof | Afff | Afff | Afff | Afff | Afff | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAoo | AAoo | AAoo | AAoo | AAoo | Aooo | Aooo | A--- |
| c31 | Affo | Affo | Aofo | Afoo | Aofo | Afff | Afff | Afof | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAoo | AAoo | AAoo | AAoo | AAoo | Aooo | Aooo | A--- |
| c32 | Afff | Afff | Afof | Aofo | Afff | Afff | Afff | Afff | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | Aooo | AAoo | AAoo | AAoo | AAoo | AAoo | Aooo | Aooo | A--- |

Per-key detail (status, source fragment/ledger, last gen id): `dev/handover/reports/consort-live-audit.tsv`.

## 2. Totals
- **Redone A: 1060 of 2976 (35.6 %)**. **Redone B: 0. Redone C: 0.** Old: 1916 = 612 old+forehead patch (f) + 1304 untouched (o).
- A split: rest a18 449 / ty a18 256 / rest ages a26-a36-a51 24+24+23 = 71 / ty a26 160 / ty a36 124 / ty a51 0.
- Not covered a18 (63 keys still old): c12 6 (t1 + others), c10-t1, c11-t1, c13 10, c14 13, c15 all 16, c16 all 16 (the "rest-A" shard stopped at c14-t2; W7b went c17+).
- Older ages of the non-ty families (t/tm/kc/tcold, a26/a36/a51): only c17 (41) and c18 (30) are redrawn; all other 30 consorts are old/f (1369 of 1440).

| family | age | redone A | forehead-patch only (f) | old (o) | total |
|---|---|---|---|---|---|
| kc | a18 | 29 | 0 | 3 | 32 |
| kc | a26 | 2 | 2 | 28 | 32 |
| kc | a36 | 2 | 0 | 30 | 32 |
| kc | a51 | 2 | 1 | 29 | 32 |
| ngheo | a18 | 29 | 0 | 3 | 32 |
| t1-t8 | a18 | 223 | 28 | 5 | 256 |
| t1-t8 | a26 | 14 | 191 | 51 | 256 |
| t1-t8 | a36 | 14 | 204 | 38 | 256 |
| t1-t8 | a51 | 14 | 183 | 59 | 256 |
| tcold | a18 | 28 | 0 | 4 | 32 |
| tcold | a26 | 2 | 0 | 30 | 32 |
| tcold | a36 | 2 | 0 | 30 | 32 |
| tcold | a51 | 2 | 0 | 30 | 32 |
| tm0-tm4 | a18 | 140 | 1 | 19 | 160 |
| tm0-tm4 | a26 | 6 | 0 | 154 | 160 |
| tm0-tm4 | a36 | 6 | 0 | 154 | 160 |
| tm0-tm4 | a51 | 5 | 2 | 153 | 160 |
| ty1-ty8 | a18 | 256 | 0 | 0 | 256 |
| ty1-ty8 | a26 | 160 | 0 | 96 | 256 |
| ty1-ty8 | a36 | 124 | 0 | 132 | 256 |
| ty1-ty8 | a51 | 0 | 0 | 256 | 256 |

Why B = 0: W2e/W2f (the only workers using m09 + skin clause) generated ~48 a36/a51 ty keys + 2 check keys into SCRATCH only; the owner halted mass repaint 17/11 ~21:50Z, FOREMAN_C_STATUS: "W2f ... 29 scratch keys ... nothing live ... NO W2g". The 94 a36 ty keys W2c/W2d put live earlier (c09-ty5..c25-ty7) were made with the OLD refs (A), STYLE_ANCHOR-less short prompt. Why C = 0: consort rank samples (c01/c02/c03/c12 t1-t8 + Nu de, recolour-sample, rank-standard, maid-consort-sample, B6/B8) are all in `img/_review/` only, "Nothing live" in every status line.

## 3. Recipe B prompt (full, as coded in batch-consort-ty-tools/w2c/gp.py; NOT live anywhere)
Refs: [old sheet id, a18 master id, 4 faces N2HYqYa6D9 bxVgMSX5Y2 dtPf4EDXSL eIyaPEVdqL, STYLE REF eIyOFEidqL (m09-a18 hd 1800)], gpt-2-6 1024x2048 2k, extraSettings {"transparentBackground": true}.
```
Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; serene gentle neutral expression, soft eyes, closed lips or faint smile; elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view. Image 1 = old design sheet: take OUTFIT DESIGN ONLY (colours, embroidery, trims, hairstyle) and redraw as ONE full-body figure; the woman is the same woman as image 2 (her face only), about 40 years old, mature dignified; images 3-6 face only. Image 7 is THE style and fabric reference: match its rendering exactly. Near-3D semi-realistic rendering, soft volumetric shading on face and hair, NO dark contour line around face, nose or jaw, natural eye size (not big stylised eyes), soft individual hair strands, exactly matching the rendering of the style reference. Luminous smooth porcelain skin, soft even light, no grey or dark shading on the face, no nasolabial or under-eye lines, dewy flawless complexion. Bare clean forehead, no forehead mark, no huadian. Hands: <POSE: prop gripped by both hands, e.g. flower basket / lantern / fan> (the item is really gripped by the hands, five fingers each); sleeves hang naturally ending near the hips. OUTER robe reaches the floor, no train. Hair ornaments visible on BOTH sides of the head, real gold hairpins (zan) with dangles/tassels and flowers like the style reference, no flat combs or plates, nothing jutting out sideways. Every hairpin inserted into the bun pointing upward or backward, dangling pearls hang down. Transparent background.
```
(`<POSE ...>` = per-file prop line; age text for a36 shown; ORN[high] = ornaments both sides, ORN[low] = one side.) Skin clause = "Luminous smooth porcelain skin, soft even light, no grey or dark shading on the face, no nasolabial or under-eye lines, dewy flawless complexion."

### Recipe A (what the 1060 live files actually used)
Rest families a18 (FAMILY_BRIEF.md step 2, W3/W7): refs [old fig, 4 faces], prompt = STYLE_ANCHOR prefix + "Redraw image 1 as the exact same full-body figure: same person, hair and hairpins, same outfit colours and embroidery, same age. Face, skin and painterly finish must match the praised beauty portraits in images 2-5: fair porcelain skin, very beautiful/handsome face, soft round-almond warm eyes, serene gentle expression; copy only face beauty, skin tone and painterly finish from images 2-5." + hands line + HUADIAN line ("a TINY flower / leaf / butterfly / phoenix mark only, about 1/12 of the face width") + "Fully transparent background with clean edges, no halo..." (W3 later: <=110-word version, "No haze or glow around the head", no-train line). Rest ages: refs [new a18 master, old age file, faces].
ty families (prompt.py): "Redraw image 1 as the same full-body figure: same hair, hairpins, outfit colours and embroidery. Face, porcelain skin and painterly finish like images 2-5. ... Bare clean forehead, no forehead mark, no huadian. NO long trailing train ... FULLY TRANSPARENT BACKGROUND, real alpha". ty a26/a36: refs [old lineup sheet, a18 master, faces] ("the same woman as image 2 (her new 18-year-old reference); face beauty, porcelain skin ...").
So A has the plain "porcelain skin" wording only — NO "luminous ... dewy flawless complexion" clause and NO m09 skin/fabric ref. The skin is not "fixed" in the B sense on any live consort file.

## 4. Spot-check on CDN (hd twins downloaded, looked at on dark + light)
c01-t1-a18, c20-t8-a18, c01-ty5-a18, c17-t3-a26 (all A): real alpha 0..255, 1.8k tall hd, clean forehead, fresh near-3D look. c14-t5-a18 and c10-t4-a26 (old/f): same pipeline-era alpha but the c14-t5 forehead still shows the red huadian dot and the older flatter rendering. c15-t3-a18 old. c25-ty8-a36: fig exists, `hd/` twin returns 404 (a36 ty hd of the W2e keys never uploaded; consistent with B = 0). Live files match the ledger.

## 5. Plain summary
1. Only 1060 of 2976 consort figures (36 %) were truly redrawn on 2K transparent; 1916 are still the old drawings (612 of them just had the forehead dot cleaned).
2. Almost all redrawn files are a18: all 256 ty a18 and 449 rest a18; older ages are mostly old: non-ty only c17/c18 (71), ty a26 160 of 256, ty a36 124 of 256, ty a51 none.
3. NONE of them use the m09 style ref + "luminous porcelain skin" prompt (B = 0): that recipe only exists as unused scratch samples; all live redraws are recipe A (old figure + 4 faces).
4. Not even all 32 a18 are done: c15 and c16 are fully old, c12-c14 partly (63 a18 keys), and nothing of a51 ty or of c19-c32 older ages exists.
5. So the answer to "all 32 phi tan fixed?" is NO — about a third done, skin clause never applied to a live consort.
