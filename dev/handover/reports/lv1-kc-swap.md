# LV1 — old khuê các out of the live game (owner Lượt 557), 19/11 ~19:40Z real
depth 3 (lineage limit 8) · START_CTX ~4 % (own estimate, get_session read 0; window 1M) → roll over at ~29 %, ceiling 60 %. Ending ~22 %.
Owner verbatim (Lượt 557): "Hình quê cát cũ trong game cũng bỏ luôn, cái gì mà cũ trong game là cũng tháo ra hết luôn, không có để lại, mất công lộn."

## STEP 1 — DONE (live on the CDN)
| what | count |
|---|---|
| maid m01–m52 kc a18 REPLACED by her thiếu nữ v3 picture (KC_REFS.json ref_id cut, same names) | 52 people = 156 files (fig 900 + hd 1800 for ALL 52 (28 had no hd before) + por 384×506) |
| consort c01–c32 kc rows REMOVED (a18/a26/a36/a51) | 128 rows |
| maid m01–m52 kc a26/a36/a51 rows REMOVED (old set, no v3 picture at those ages) | 156 rows |
| old live files moved (copy md5-verified, then deleted from live path) to img/_rejected/live-old/ (never reuse) | 731 copied (= every live -kc- file: fig/hd/por), 603 deleted, 128 overwritten by the new maid files |
| princesses / p / nc / bd | had NO kc rows in any manifest → nothing to remove |

- Method = LIVE-1 recipe: Magnific cut (creations_get url, register_download logged) → finish_fig.py (FORCE_HD=1: fig = old live figure height, hd 1800) → porface.py (bust seated by face mesh to the old bust's face size/position; face height old/new within ±6 px of ~120). Looked at all 52 on 4 contact sheets: whole body in, nothing cut, faces placed.
- Manifests: FIGURES-kc.json 420 → 136 (maid kc 52 a18 rows now carry magnificUrl=gen_id, bg=ref_id, sheet "thieu-nu-v3"); FIGURES-hd.json 4151 → 4145 (35 gone, 52 maid kc a18 written with new widths). Pushed with --allow-shrink (intended).
- Fit tables for the 104 new fig/por (all measured on the new pictures, 0 failures): POR_FACE2 (por_face.py), fig-ht (headtop), mk-fit/maid-mNN + md5.json (mkfit.detect_free), veil-fit + scar-fit (look-fx-figfit add / look-fx-porfit run), keep-fit (look-fx-eyefit + keepfit-build: 92 rows; 12 implausible → no row = game constants, the tool's rule). face-fit (outliers only) + FIGLIGHT: old rows of the 104 removed (no measuring tool → game default). Rows of the 603 deleted files removed from every table (POR_FACE2, fig-ht, veil/scar/keep, face-fit, FIGLIGHT, toil-fit, toil-fit2, mk-fit/* + md5).
- CHECK: CDN listing → live -kc- objects = 156 (only maid a18 fig/hd/por); old URL fig-consort-c01-kc-a18 = 404; live md5 m13 = ours; manifest_guard --live-check PASS here.

### What the game shows now (dev/index.html j-kc home dress, kcDressRec / kcPor / qnFace)
- Consort identity (c01–c32) at home in khuê các: no kc row → kcDressSrc "" → old path: her **rank-1 (t1 Đáp ứng) figure** of her age (sheet c01). Poor origins (thd) still use ngheo (untouched).
- Sister / khuê hữu with a consort face: kcPor → FIGIX consort figBest(tier 0) → also her t1 figure.
- Maid faces at home: a18 = new thiếu nữ v3; ages 26/36/51 → nearest band = the same a18 v3 picture.
- Quý nữ (hôn sự pool, KCIX): only the 52 maid v3 faces now; when all used → free consort face in t1 dress.

Sheet: dev/handover/review-sheets/live/kc_swap.jpg (m13, m01, c01 before | after).

## FOR MAIN (LV1 via ROOT-50)
1. dev/site/manifest-floor.json (main only): FIGURES-kc.json floor must drop to {"by":{"consort|kc":0,"consort|ngheo":32,"maid|kc":52,"maid|ngheo":52},"n":136} — else main's --live-check FAILs (owner ordered the removal). Do NOT run --write-floor expecting it to lower (it only grows).
2. Repo copies on main are now stale for these names: dev/art/mkfit/{consort-*,maid-*}.json + md5.json, dev/art/headtop/fig-ht.json, dev/art/toil-fit*.json — pull from CDN (img/mk-fit/*, img/fig-ht.json, img/toil-fit2.json) when next landing.
3. Comment in the kc home-dress block ("r2: the CDN list now also has a26/a36/a51 khuê các dresses") is out of date; consort kc art is gone → t1 fallback (owner may want a new home dress later = new gens, not LV1).

## STEP 2 — REPORT ONLY: other live figure sets older than the current approved recipes (nothing changed)
Counts = manifest rows (each row = fig + por [+ hd]); "ids" = people.
| # | live set (manifest) | rows | status vs approved recipe |
|---|---|---|---|
| A | consort/ngheo a18 (FIGURES-kc) | 32 (32 ids) | from the SAME 18/11 kc2k batch as the rejected khuê các (LIVE-1 G6 src img/_review/kc2k/cNN_a18_ngheo_*) → likely "set A" too; ask first |
| B | maid/ngheo a18 (FIGURES-kc) | 52 | old nhà nghèo set, no v3 recipe |
| C | consort t1–t6 thường phục (FIGURES.json tiers 1–6) | 768 (32 ids × 6 × 4 ages) | OLD: t1–t6 being redrawn by the one-ref/store recipe (Tần capelet, phi bạch, two-colour rule…); none of the new ones live |
| D | consort t7/t8 a51 (FIGURES.json) | 58 (29 ids × 2) | OLD muted a51; only c04/c05/c13 have the approved dark a51 live |
| E | consort t7/t8 a18/a26/a36 (FIGURES.json) | 186 | prompt-B v0 pushed 19/11 00:45 = approved 18/11 (current unless the owner says otherwise) |
| F | consort cold / lãnh cung (FIGURES.json tier cold) | 128 | old |
| G | consort ty1–ty8 (FIGURES-ty) | 1024 | old |
| H | maid ty1–ty8 (FIGURES-ty) | 1664 | old |
| I | maid in consort dress t1–t8 (FIGURES-servants) | 1664 (52 × 8 × 4) | old (maid rank redraws not run; only samples) |
| J | maid uniform (servants tier none) + maid cold | 208 + 208 | old uniforms (cung nữ sleeves rule 19/11 02:10Z not applied live) |
| K | mama k01–k08 (servants) | 32 | old (owner: mama = old maid picture; approved skins m01 a51/a65 not wired) |
| L | player look1–4 (FIGURES.json player/1) | 16 | old pre-identity faces (old saves only) |
| M | FIGURES-x.json consort 7/8 v1/v2/a65 + th (Thái hậu) | 592 | NEW approved art (LIVE-2) uploaded under new names, NOT wired (game never reads FIGURES-x) — not "cũ" |
| N | men: emperor 8, eunuch 120, công tử 80, huynh 8, others (man 36, official 24, physician 12, thaihau NPC 12) | 300 | old; no approved new men recipe yet (proportion sample still open) |
| O | kids prince/princess 336 | 336 | old; no new recipe |

Tools/backup list: dev/handover/reports/lv1-tools/ (run2.sh, mv_old.py, sheet52.py, measure.py, live-old_md5.txt = the 731 backed-up keys + md5).
HANDOVER: none needed — job complete (~100% xong step 1; step 2 = list only). Context ~22 %.
