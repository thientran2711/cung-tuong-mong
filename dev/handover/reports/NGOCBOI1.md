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
