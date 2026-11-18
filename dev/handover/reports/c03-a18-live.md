# c03-a18-live (W50, 18/11) — c03 a18 t1–t8 B8 set LIVE

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 1 (W40 B10, archived) | main 0 | review/* 0 | archive 0. Reused: `finish_fig.py` (fig-cutout-clean/tools, same canvas rules as the live twins), `headtop.py`, `mkfit/verify.py` + `fixtoil.py`, `cdn_sync.py`, `manifest_guard.py`. No new script.

## What went live (CDN https://ctm-img.victoria-tntt.workers.dev/img/, same names as before)
Source: approved `_review/consort-tiers/c03/b8/c03_a18_t{1..8}.png` (1520x2688, alpha ok), NOT *_prev.
- `fig-consort-c03-t{1..8}-a18.webp` (900 tall, figure height = old fig height, 8 % side pad; widths 342–506)
- `hd/fig-consort-c03-t{1..8}-a18.webp` (1800 tall)
- `por-consort-c03-t{1..8}-a18.webp` (384x506 bust, old face scale/position; match 0.95–1.0), kept in step with the figure
- `tn/fig-…` t1–t4 (240 tall) and `tn/por-…` t1–t4 (128 wide): only the ones that existed
- `fig-ht.json`: live copy + 8 rows (t1 131→128, t2 185→185, t3 134→135, t4 223→218, t5 272→278, t6 300→310, t7 366→387, t8 403→403); all other rows unchanged
- `mk-fit/consort-c03.json`: 7 pictures re-detected (verify.py --names; fig t2 t4 t6 t7, por t2 t6 t7 were >0.10 eye-distances off). `toil-fit2.json` (live copy + fixtoil): 4 mouths re-seated (fig t6 t7, por t2 t7). Nothing else changed.
- Manifests FIGURES.json / FIGURES-hd.json: entries for these files already exist (same names) → no change, no shrink. `manifest_guard.py --live-check`: PASS. cdn_sync: held 0.
- Revert: old twins were not kept on disk; revert = re-run finish_fig on the old masters.

## LOOK (local build of origin/main 5cbfd62 = fullbody-frame r5+s2; CDN images live; c03 files routed over the game's own consort figure; head-top rows from the new fig-ht.json)
https://ctm-img.victoria-tntt.workers.dev/img/_review/c03-a18-live/
- stage-t48-755x1000.png: Fold, t8 (phoenix crown, fan): crown, hand, feet inside the frame, name plate below
- stage-t16-755x1000.png: Fold, t6 (lantern, phoenix robe): whole figure, nothing cut
- stage-t17-1180x820.png: iPad, t7: whole figure, crown + feet in frame
- c03_a18_t1-t8_new_game_sizes.jpg: all 8 game-size figures, uniform scale
I looked at every shot; no page error. Not individually seen on stage: t1–t5 (same pipeline; sheet checked).

## Which approved sets are live
c01, c05, c12 and c03 `fig-consort-cNN-t1..t8-a18` exist on the CDN as fig + hd + por (+tn t1–t4). I cannot tell from files whether c01/c05/c12 hold their approved B8/B10 versions (reports say B10 "Nothing live"): the foreman/main ledger decides. I pushed only c03 B8.

## Code
Branch `review/c03-a18-live` (origin/main 5cbfd62 + 1 commit): repo copies of `dev/art/headtop/fig-ht.json` and `dev/art/mkfit/consort-c03.json`. img/*.json never committed. Main untouched.

~100% xong / ~100% chơi được (c03 a18 t1–t8; t1–t5 not individually viewed on stage).
