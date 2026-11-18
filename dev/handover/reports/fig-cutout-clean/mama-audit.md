# MAMA audit: maid identity x servant-rank x real age (read-only, 17/11)

Sources: lists/fig-maid.txt + lists/shards/maid-*.txt, live CDN `img/_index.json` (28757 objects), `img/FIGURES-servants.json` (game manifest, 2112 rows = 2080 maid + 32 mama), `img/FIGURES-hd.json` (2k masters), hd-entries/*.json, batch-maid-*.md, dev/build/all43.js (`figFor`, `SRK`). Nothing painted, uploaded or edited except this file.

## 0. Key facts (read these first)
- Maid rank names (SRK.maid, all43.js): 0 Cung nữ thô sử, 1 Cung nữ, 2 Đại cung nữ, 3 Chưởng sự cô cô, 4 Nữ quan. Mama is NOT a rank: single title "Ma ma" (`S.srv.mama`), figure role falls back to maid figs aged >=36 (`["mama","maid"]`).
- No file is tagged with a rank name. The "rank" of a maid file is its look key: `base` (no suffix), `cold`, `t1..t8`, `tm0/2/3/4`, `kc`, `ngheo`, `ty1..ty8`. Game matching (`figFor`): score +4 if file tier == rank or rank+1, +3 trait, +2 ageBand. So rank r picks tier t(r)/t(r+1): rank0->t1, 1->t1/t2, 2->t2/t3, 3->t3/t4, 4->t4/t5. Servant-rank outfits in practice = **t1..t5** (+ `base` = unranked plain maid, tier null, never tier-matched).
- Only `base, cold, t1..t8` (10 looks x 52 ids x 4 ages = 2080) are in FIGURES-servants.json. `ty*`(1664) `tm*`(832) `kc`(208) `ngheo`(52) = 2756 files are on the CDN but NOT in the game manifest, so the game never shows them.
- The 5-rank servant standard (rank-standard/maid-markers.md, m01 a18 only) was DROPPED 05:55Z ("keep OLD designs"); its masters are not on CDN. So no dedicated Thô sử..Nữ quan art exists at any age.
- Age bands in game: <26 a18, 26-35 a26 (`ageBandOf`: >=36 old, >=26 mid), so **a36/a51 are the "old" band that a mama would draw from**.

## 1. Live a36 / a51 maid figures
All 4836 keys in fig-maid.txt are live (4836/4836 in _index.json). 52 identities m01..m52 (ngheo exists for 13 ids only).

| shard | keys | a36 listed | a36 live | a51 listed | a51 live | a36/a51 in game manifest |
|---|---|---|---|---|---|---|
| maid-ty (ty1-ty8) | 1664 | 416 | 416 | 416 | 416 | 0 / 0 |
| maid-rest-A (m01-m26) | 1586 | 390 | 390 | 390 | 390 | 260 / 260 |
| maid-rest-B (m27-m52) | 1586 | 390 | 390 | 390 | 390 | 260 / 260 |
| total | 4836 | 1196+13=1209 | 1209 | 1209 | 1209 | 520 / 520 |

(shard totals: 416+390+390 = 1196 per age; the 13 ngheo keys per age sit in rest-A/B, counted in their 390.)

Servant-rank outfits (t1..t5) at a36 / a51: 52 ids x 5 = 260 each, all live, all in the game manifest, split rest-A 130 + rest-B 130 per age. Plain `base`: 52 per age. Outfits t6-t8/cold: 156 per age, but tier never matches maid ranks 0-4 (only reachable via `cold`).

NEW (2k repaint) vs old:
| age | evidence of repaint | verdict |
|---|---|---|
| a36 | 0 maid a36 keys in FIGURES-hd.json (hd exists only for repainted files; 500 maid hd rows, ALL a18), 0 in hd-entries/*.json, 0 in any batch-maid-*.md done list (batches stopped at a18; a26/a36/a51 were always "NEXT") | OLD (high confidence, not byte-proven: CDN md5 cannot be diffed against a pre-repaint copy) |
| a51 | same | OLD (same caveat) |

Repainted maid a18 (hd rows) for context: 500 keys, ids m01..m38 only; t1-t5 a18 repainted for ~20 of 52 ids each (base 22, t1 21, t2..t5 20); ty a18 repainted for m01..m22 (22 ids, ty5+ later partly). Painting stopped 17/11 ~06:19Z at m38.

## 2. Gap list (what a mama needs vs what exists)
Definition: mama = maid identity x rank (0-4) x age (a36, a51), NEW-repaint, servant-rank outfit.
- Needed: 52 ids x 5 ranks x 2 ages = 520 combos (if tiers t1..t5 stand for ranks; dedicated rank art would be a new standard).
- Have new: **0 / 520**. Have old, live, matchable: 520 / 520.

| gap | range | count |
|---|---|---|
| a36 t1-t5 repaint | m01-m52 x t1..t5 | 260 |
| a51 t1-t5 repaint | m01-m52 x t1..t5 | 260 |
| a36/a51 `base` plain maid (optional) | m01-m52 | 104 |
| a18 t1-t5 identity ref still missing (needed first: BATCH rule = new a18 as ref for older ages) | ids m39-m52 all 5 tiers (70) + holes below m38 (~30) | ~100 |
| a18 base | m39-m52 + holes | ~30 |
| dedicated rank art (Thô sử, Cung nữ, Đại cung nữ, Chưởng sự cô cô, Nữ quan) at any age | none exists on CDN; m01 a18 masters only (CqzLNH4EEy, w4vADly7EI, rgd4Wssxtc, WDltqNucXe, O6CnXxqynm) | 5 x 52 x 4 ages if ever revived |

Not-gaps: ty/tm/kc/ngheo a36/a51 (2 x 1209 - 520 = 1898 files) are outside the manifest, ignore for mama.

## 3. Current mama files
lists/fig-mama.txt: 32 keys = k01..k08 x a18/a26/a36/a51. All 32 live and in the manifest (identity k01..k08, tier null, role mama). Only a18 are new 2k (W1b, batch-w1-hero-misc.md; also in hd, FIGURES-hd.json has 8 mama a18). a26/a36/a51 are old and "paused" (W4d) .

| k | note | mapping to maid |
|---|---|---|
| k01 | peach, handkerchief (pilot) | no link to any m-id; stand-alone identity |
| k05 | lilac, flower branch (pilot) | no link |
| k02-k04, k06-k08 | repainted a18 | no link |

k01..k08 are separate "old-woman" identities with no rank (tier null), not derived from any maid mNN. They were used as the BODY reference for Thái hậu figures (k01 a36, k02 a51, k03 a36 in review-fig-proportion-redo.md), so their older-age builds are depended on.

## 4. Recommendation
1. Do NOT retire k01-k08 yet. Today they are the only mama-specific, live, new-style (a18) figures and the old-woman body model for Thái hậu. Nothing replaces them: 0/520 mama combos are new.
2. If MAMA = real-age maid in a servant-rank outfit, the minimum viable set is a36 + a51 of t1..t5 for the identities that get promoted (260+260 total for all 52; pilot with m01-m10 = 100 files). Prerequisite: new a18 t1-t5 of that id (identity ref). Ids m01-m38 mostly have it (~20 of 52 per tier), m39-m52 do not.
3. Retire k01-k08 only after (a) the new a36/a51 maid t1-t5 are live AND (b) `figFor`/`bandKeys` is changed so age>=36 servants prefer maid figs over `mama` (today ["mama","maid"] list order puts mama first) AND (c) the Thái hậu body refs no longer need k01/k02/k03. Then remove the 32 rows from FIGURES-servants.json first (soft retire), keep the files on CDN one release for cache/rollback.
4. Alternative cheaper path: keep k01-k08 as the Ma ma (title) figure, and repaint a36/a51 only for rank 0-4 roles that aren't mama; no change to retire.
5. Decision needed from owner: does "mama at servant rank" mean (A) older-looking maid per rank (needs the 520 new files above) or (B) the single "Ma ma" title (k01-k08 already cover it)?
