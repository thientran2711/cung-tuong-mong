# NGOCBOI1 — G57 no jade pendant (owner L1851) — 0 generations
START_CTX ~5 %, depth: worker (child of Foreman C #24).

## Done
- `dev/art/strip_pendant.py` (new): ordered regex table that removes every pendant/yupei/zupei/jinbu/ngọc bội/jade-disc clause; replacement = nothing or "a plain gold belt" / "the two silk ends tied flat" / "silk sash tied flat at the waist" / "plain apron edges". Nothing else touched (A47: hair, pose, angle, held item byte-identical). `--write FILE...`.
- Prompts changed (.txt): ~530 files across seasons4 (incl. han_bac_base, ladder_base, Hán/Minh LADDER3-8), thu_comoi, winter1, dong_hientai, dapung4, design1, thancan1, tang1, rank8-s62/s65/m19, place-rank, b26, capes, f2, flower, swap56, itemfix2, template-B, emperor-B. Superseded/old copies, `_retired`, `owner-copy`, `approved/proof`, `rank8-t78`, `t8-prompt-B/golden*`, `face-common` (test/legacy), `nude-B`, `store-all/test` NOT touched (history/proof, not live).
- Sidecars: ~100 `.keep` files got `allow:` lines (pendant removal only, tag "G57 owner L1851"). `keep_check --all`: 631 sidecars PASS.
- Builders / sources: `store-all/build_all.py` HQP_LUX; `check_store.py` store sentences (line ~224 HQP, 736 apron, 864 S14_L1794); `KC_REFS.json` (42 "sash with a small X pendant" outfit lines -> plain sash); `item_spec.py` (dance fans "jade pendants" -> "jade tassels"); `POSES_30.md` dropped pose M6 wording; live makers `seasons4/make_han_bac.py`, `make_thu_ab.py`, `make_han_xuan_t13.py`.
- Gate (check_store.py): new **G57** `g57_fails` called in `check_text` for every scope: FAILS on pendant / yupei / zupei / jinbu / ngọc bội / jade disc|ring|"plaques linked". Negations pass ("no pendants", "belt or pendants" after NEVER). 6 selftest cases added. G43 (maids) and G45 (cloth over waist) kept; since no prompt names a pendant, `master_common.JADE_CLEAR` / `build_all.g45_post` no longer fires (G45 sleeve clause unchanged). `check_store --self`: only the 3 pre-existing PROOF MISMATCH (S12/S14/S19) as before.
- Scan after change: G57 finds 0 hits in all live dirs above.

## Not changed / for Foreman C
1. TRIỀU PHỤC hà bí block (`check_store.py` ~369, "bí trụy (帔坠) pendant: {pendant}"): a cape-band tip pendant at the ankle, not a waist ngọc bội; exempted in G57. Owner to decide.
2. One-shot historic scripts thu_comoi/make_s62_t4_thu.py, make_s62_t5_thu_v6.py, make_s62_t6_thu_v6.py, make_design22*, fix_L1794/revert scripts still contain old pendant text (their outputs already fixed; re-running them would now FAIL the G57 gate). `seasons4/make_han_ladder7_L1847.py` already carries HAN5's own G57 patch; ladder3-6 builders contain old clauses but their outputs are fixed.
3. Kept as non-pendant: tú cầu "with jade tassels" (held item), "jade clasp" (closure), shou ribbon without jade, hairpin/bu yao tassels, bracelets. "jade-and-gold belt" kept only where HAN5's LADDER7 text has it (belt, not pendant; gate allows).
4. Maid files (maid7) not touched (G43 already none; sachet OK).
5. Held-out dirs listed above hold pendant text in history/proof prompts; say if the owner wants those scrubbed too.
Coordination: pulled/rebased between each push; HAN5 LADDER8 files landed mid-run, sidecars fixed.

## Addendum (#25 request, drawn pendants)
Drawn "pendants" came from jade clasp on silk cord + tú cầu "jade tassels" + jade disc. Now stripped everywhere live (jade clasp -> gold clasp, tú cầu -> silk tassels) and G57 also FAILs jade tassel/clasp/disc/ring. strip_pendant.py updated.

## G59 no sachet (owner L1874) — #25 job
- check_store.py: G59 `g59_fails` (all scopes) FAILs sachet/túi thơm/scent pouch/perfume bag/hà bao/embroidered pouch; G43 text no longer permits sachet; 4 selftests.
- dev/art/strip_sachet.py: worn sachets deleted (sash left plain); held sachets (rank8-m19/s62 t2, KC_REFS pose, face-common s45/s58/m35, store-all/test) swapped to "a small round embroidered silk fan with a silk tassel" — owner/foreman may choose another held item.
- maid7 non-prod + prod/base stripped (maid7/prod done by MAIDFIX3 63f8a93c5); maid7/make7_gpt.py G43 swaps now delete instead of adding a sachet.
- ART_RULES: G59 added, G43 marked REPLACED.
- Not touched: t8-prompt-B/golden_low, owner-copy, _retired, sachet-tryon dirs, approved/proof (history); item_spec.py/ITEM_ART.md item-art catalogue ("tuithom", "huong" Túi hương, item-rank-age.md) are game ITEM pictures, not people prompts — foreman to decide. keep_check --all PASS.

## G60 bow centred (owner L1890)
dev/art/strip_bow.py adds "at the centre front" to every sash/bow/knot lacking a position (115 live consort files, not maid7, not *ha_DUONG* = HADUONG1); no prompt had explicit side-bow words. check_store G60 `g60_fails` FAILs side/off-centre/hip bow, knot, sash words (negation passes; hair ribbons not matched), 5 selftests. ART_RULES G60 added. keep_check PASS.

## G61 front waist free (owner L1905)
Audit offenders (consort live files, 206 changed + POSES_30.md + KC_REFS.json): "item held in both hands lowered before her at waist height" (25), flute/tú cầu "in the other hand at her waist" (~52), letter "held level/gently at her waist with both hands" (13), hairpin/flute "held close at her waist in both hands" (8), pipa at waist (1), butterfly "in front of her", plus every "holding X in both hands," (now "raised at chest height"). POSES_30 L4 L5 M1 M9 C1 C4 C5 C6 C7 C9 reworded to side/chest-height. Only hand/item position words changed; emperor ("his") untouched; maid7/prod untouched (MAIDFIX3). strip_waist.py; check_store G61 FAIL (negations pass; 5 selftests); ART_RULES G61. keep_check PASS.

## G57b held-item tassel (owner L1924 via #27)
Cause: "gem tassels" on the jade flute + "any embroidery, painting or tassel on it" in the HELD ITEM COLOUR sentence. strip_tassel.py: removed tassels on held items (tú cầu "with silk/pearl/gem/jade tassels", flute/fan/parasol/lantern tassels) and "or tassel" from the HELD ITEM COLOUR sentence — in ~969 live .txt, check_store approved text (+ APPROVED_SENTENCES.md regenerated), store-all/build_all.py, nude-B/mk.py, t8-prompt-B/build.py items, owner-copy/mk_hqp_hh.py parasol. Gate: G57_RX now includes "gem tassel(s)"; new held-item tassel FAIL (flute/fan/parasol/lantern/ruyi/tú cầu/handle … tassel; headdress and hairpin tassels untouched); 5 selftests. Skipped frozen: thu_comoi/s62_t6_THU_vankien2_L1893 + THU_QP_t6_L1933_FROZEN, HAN_COLLAR_L1915_FROZEN, maid7/prod. keep_check PASS.
