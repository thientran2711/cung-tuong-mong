# DESIGN17 — art prompt designer (child of Foreman C #13)
depth 4 · START_CTX ≈ 3 % (get_session read 0; my estimate) · roll line 28 %, ceiling 60 %.

## JOB L1565 — xuân Hán t1–t3 _v2 (NO gens)
Files: dev/art/seasons4/s62_t{1,2,3}_HAN_BAC_v2.txt + .keep (base = s62_tN_HAN_BAC.txt). Chars 9601 / 9855 / 9996.
Gates: keep_check --sidecar PASS ×3; `keep_check --all` 237 PASS; check_store --scope tpN --age a22 STORE CHECK PASS ×3.
Kept (A39): peach-blossom pink #EB8186 + ivory white, B29 fabric, rank blocks, pose, hair, everything else.

### Diff (only the 3 owner points)
1. COLLAR. First line → "OPEN-NECK LOOK: collar open OFF the neck to the shoulder points: bare neck and collarbones."
   Outfit: "…pulled wide OFF the neck: its two edges start at the OUTER shoulder points and run straight down to cross only LOW at the sash; the inner collar lies flat just inside those edges;" →
   "the collar is worn moderately OPEN, off the neck: its two edges rest exactly ON the shoulder points, shoulders covered (never off the shoulder), and curve down to cross high, well above the sash, never a deep low V;"
2. INNER ROBE (new): "INNER ROBE: an opaque ivory white inner robe, its own neat crossed collar just inside the outer edges, crossing higher; its collar edged by one narrow band of tiny embroidered lilacs (t1) / one narrow band of small embroidered tiger lilies (t2) / one slightly wider band of small embroidered semi-double China roses (t3) in peach-blossom pink and gold;"
3. EMBROIDERY = t4 open5 sentence verbatim, only motif + size change: "the robe body densely embroidered ALL OVER (not only the borders) with many <size> <F2 flower> spread over the whole garment, clearly more embroidery than any palace maid (<flower> in gold and ivory white);" sizes t1 small-size lilac blossoms · t2 small-size tiger lilies, a little larger than at the lowest rank · t3 small-to-medium-size semi-double China roses, a little smaller than the Tần's. Removed invented "SMALL lilac sprays … in ivory white and fine gold thread". G8 store clauses now verbatim: t1 "a wide embroidered lilac hem band, small sprays of embroidered lilac on the upper garment"; t2 unchanged "delicate embroidered tiger lilies at the sleeves and hem"; t3 "wide embroidered semi-double China rose bands at the collar, sleeves and hem".
Open question: none. Next step = owner yes before any gen (A20/A21).

## L1565 rework after C #13 L1566 / L1567 / L1568 (supersedes the hand-edited v2 above)
### A. t3 Quý nhân hairpins fixed AT THE SOURCE (L1566 + L1568, rule G39)
- Source of the spiky words: store t8-prompt-B/build.py TIER_LOW[3] "pearl-tipped hairpins, small silk flowers and a fresh flower ({flower})" (store-all/build_all.py F13 turns the tail into ", a fresh flower"), together with the master "Every hairpin … pointing upward" lines (all ranks, unchanged).
- New store words: "two or three slim pearl hairpins set INTO her gathered hair at natural angles, mostly hidden in the hair, each with a small dangling pearl ornament, never a radiating crown of straight pins or spikes, small silk flowers and a fresh flower ({flower})".
- Gate: check_store.py X20 bans "pearl-tipped hairpins" in tp3/pr3 (old wording FAILS, tested); new prefix added to SLOT. build_all s62 3 = internal gate PASS.
- Files updated with the new words: t8-prompt-B/golden_low t3 ×32 (test_low_all.py: 792 problems before = 792 after, golden still equals the builder), seasons4/ladder_base/s62_t3.txt, seasons4/s62_t3_HAN_BAC.txt, winter1/s62_t3_dong.txt, winter1/g28/s62_t3_dong.txt.
- NOT changed, still carry "pearl-tipped hairpins" (now X20 FAIL): dapung4/s62_t3_COMOI_v2, _v2c, s62_t3_quynhan_COMOI (each would go over 10 000 chars → needs a trim decision); f2/s62_t3 + f2/base; flower/s62_t3 + flower/base; owner-copy m19_t3_V3–V7, new-person-1119/m39_t3, pr-night-1119/bt-t3 (+old ×2), trieu/r16/t3_c06_RAN; rank8-m19/m19_t3, rank8-old4 m07/m13/m20/m29_t3, rank8-s62/s62_t3, rank8-s65/s65_t3; store-all/samples_a18.txt, store-all/test m07/m13/m20/m29_noM09_t3.
- Regression: check_store --scope tp3 --age a22 on all 95 t3 prompts before/after: the only new findings are X20 on the files listed above. The golden_low diffs are overlap percentages and X16 no longer firing on 4 'small lotus' golden files; all 32 golden files already FAILED before.

### B. v2 files now BUILT (L1567): dev/art/seasons4/make_han_xuan_t13.py
Base = store-all/build_all.py s62 N (a18 = "about 22": master common block + store rank text + F2 flower + G39 hairpins). Deltas (asserted):
D1 OPEN-NECK line (Hán set; L1565 words) · D2 store fabric → master_common.B29_A_HEAVY · D3 outfit design words → Hán zhiju design (L1554/L1555) + L1565 collar/inner robe; density = make_han_bac.DENSE (H6/H12, the t4 words) with the store motif; the G8 rank clause is copied OUT of the store text (asserted present); store hair-ornament clause kept verbatim · D4 xuân colours (B20) · D5 COLLAR CUT sentence (Hán t4 open5, belt→sash) · D6 CAPTION (G31) · TRIM (A38, duplicated boilerplate only, same list as DESIGN16 / make_han_bac.TRIM[4]): store "Full-body standing figure … fair porcelain skin;", "; face clearly visible, 3/4 or frontal view", the "her signature colour family …" clause, ", never a pair", ", no cluster", ", never back-turned", ", never in profile", " Everyone beautiful at every age."
Sentences NOT verbatim from master/store, each an approved delta: OPEN-NECK line (Hán), B29 fabric (L1556), the Hán outfit design incl. rank edge / sash / girdle (L1554/L1555), collar + INNER ROBE words (L1565), DENSE density sentence (H6/H12 via the Hán t4), colours (B20), COLLAR CUT (Hán), CAPTION (G31). New words written here: collar + inner robe only.
Chars 9473 / 9711 / 9983. Gates: check_store tpN a22 STORE CHECK PASS ×3; keep_check --all 237 PASS (.keep base = s62_tN_HAN_BAC.txt).
Note for C #13: the t1 caption still says "Nhu quần hai mảnh" although the Hán t1 design is a straight-hem zhiju (caption unchanged, owner did not raise it).
