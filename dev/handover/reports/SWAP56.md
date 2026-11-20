# REPORT SWAP56 (child of Foreman C #4, depth 4, START_CTX ~5%) — Phi (t5) <-> Quý phi (t6) signature piece swap
Owner L1266 20/11. Text only, 0 credits, no Magnific, no gens.

## What changed (dev/art/t8-prompt-B/build.py = the main/store builder; build_all.py runs it verbatim, so one edit covers every person/age/season)
- t5 Phi: the cloud collar clause `an embroidered cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of small gold tassels` (125 chars) -> `TWO layered embroidered SHORT shoulder capes, one over the other (upper shorter, lower longer), never covering the neckline` (123 chars) = const CAPE5_TWO.
- t6 Quý phi: the TWO-capes clause (G1 CAPE6_TWO regex, applies to every t6 outfit source incl. the foreign-princess t6 rows) -> `an embroidered <main> cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of small gold tassels, pearl-edged, never covering the neckline`.
- YEL_T6 / LUX_T6 / the 3 t6 OUTFIT rows: `pearl-edged collar and cape trim` -> `pearl-edged collar trim` (t6 no longer has a cape).
- Winter (--season dong): G26 fur sentences are per rank group (t4-t6 = Lông 2) and live in winter_g28.py, untouched; they sit on the new pieces automatically (verified c06 t5/t6 dong). winter_g28.py / check_store.py needed NO edit.
- Seasons: dev/art/seasons4/make_comoi.py swaps + captions updated for t5/t6; seasons4/s62_t5_XUAN_COMOI.txt, s62_t6_XUAN_COMOI.txt regenerated (open-front versions: t5 `...(upper shorter, lower longer), open at the front, never hiding the neck`; t6 `cloud collar (yunjian) over the shoulders, OPEN at the front (its lobes rest on the shoulders and back, never covering the neck or the square inner neckline), with a scalloped gold-thread edge and a fringe of small gold tassels, pearl-edged`), captions now "…Phi · 2 choàng vai + cổ mở" / "…Quý phi · Vân kiên + cổ mở". Running make_comoi.py changed ONLY t5/t6 files (t1-t4, t7 byte-identical). seasons4/ladder_base/s62_t5.txt + s62_t6.txt refreshed (they are the build_all s62 outputs = make_comoi base).

## Judgement calls (cape/collar vs jewellery/embroidery)
1. Collar's own `scalloped gold-thread edge` + `fringe of small gold tassels` = the SHAPE/trim of the collar -> moved with the collar to t6 (not "jewellery"). Phi keeps all other gold tassels (headdress tassels, belt pendants).
2. `pearl-edged` on the capes = jewellery of the Quý phi rank -> STAYS on t6 (now on the collar); t5 gets NO pearls (still has no pearl anywhere). t6 `pearl-edged collar and cape trim` -> `collar trim` (word `cape` removed because t6 has no cape now; pearls kept).
3. Colour word: the old t6 capes said `embroidered <main colour>` -> kept on the t6 collar (main colour of her robe). The old t5 collar had no colour word -> t5 capes none either (no colour added; `any cape` already in the shared COLOUR RULE).
4. Length: t5 a51/a65 prompts sit at exactly 10 000 chars, so the t5 clause had to be <=125 chars. Dropped from the t6 capes wording only: `the upper cape shorter... a little longer`, `both resting on the shoulders` (now: upper shorter, lower longer). Meaning kept (two layers, short, upper shorter than lower, never covering the neckline). Owner may restore the long wording if she prefers (needs a shorter element elsewhere at a51/a65).
5. t5 keeps: silk brocade, rich gold embroidery peonies/birds, deep brocade cuffs, girdle + 2 jade pendants, peony medallions, sheer silk shawl (phi bạch), LARGER headdress. t6 keeps: HEAVY brocade, borders embroidery, necklace/bracelets, BIG headdress, pearl strands, royal yellow (t5 has none).

## Proof (all prompts, before/after)
- dev/art/swap56/PROOF_DIFF.md (word-level diffs c06/m19 t5,t6 normal+dong). Method: in-process dump of build_all.build / build_season for ALL 146 people x t1-t8+nude x ages a18/a26/a36/a51/a65 x normal/dong, HEAD vs patched (12 410 prompts incl. 2 890 HELD-not-drawn, 313 pre-existing G28 ERR cells identical before/after).
- Changed: 2 240 = t5 560 normal + 560 dong + t6 560 + 560. Other ranks (t1-t4, t7, t8, nude) 0 diffs. Prompts >10 000 chars newly created by the swap: 0 (the pre-existing 3 270 over-10k cells = Thái-hậu-length a51/a65 etc., identical before/after).
- Build s62 a18 t5/t6 with G31 CAPTION for the owner's ChatGPT test: dev/art/swap56/s62_t5.txt (8 660) "Bậc Phi · Áo choàng vai hai lớp", dev/art/swap56/s62_t6.txt (9 502) "Bậc Quý phi · Vân kiên cổ cuộn mây" (LARGE bold caption line, same CAPTION sentence as the XUAN_COMOI files). check_store.py swap56/s62_tN.txt s62 v0 --low N: PASS both.
- build_all.py CLI gate (build + check_store) PASS for c06 t5/t6 normal + dong; see GATE section below for --check.

## Store gate tables / rules
- check_store.py APPROVED tables + APPROVED_SENTENCES.md + proof files hold NO t5/t6 outfit sentence (only G-law sentences, fur, S/W rows) -> nothing to edit there; the t5/t6 outfit is gated structurally (store part runs the builder). Grep of "SHORT shoulder|yunjian|cloud collar|TWO layered" in check_store.py/APPROVED_SENTENCES.md = 0 hits.
- Rule: `python3 dev/art/rule.py set G1 ... --luot 1266` (old text -> ART_RULES_HISTORY). Other rules naming Phi vân kiên / Quý phi 2 capes: only G1 (grep "cloud collar|yunjian|2 capes|hai lớp|TWO layered" ART_RULES.md = G1 + unrelated G17/G27). rule.py check: 270 lines, 0 dup.
- Not touched (archive/old test files, not live builders): dev/art/rank8-s62/*, rank8-old4/*, review-sheets/*, figwork/, t8-prompt-B golden dirs, owner-copy/mk_ranks_v3.py, seasons4/s62_t5_*_HAN/MINH/THU/... (those are other season test sets with their own "no cape, no cloud collar" words). If any should follow the swap, say so.

## Open
- Pre-existing gate/--check failures (see below) are not caused by the swap.
