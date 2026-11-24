PRIORITY #1 CHECK ('RANKS|promoGap|kiepMin|kyngo.max'): OD 0 | ledger 0 | claims 8 | main 15 | review/* 0 (rank branches seen are art/kit only: fig-rank-match, kit-ico-rank, kit-rank-name, ge-rank — not numbers) | archive 0. Reuse: BAL.promo.cap already exists (lesson 17/11: do not make a second rank table — extend BAL.promo / the existing BAL rank keys if present; grep first). robot10-reco report dev/handover/reports/robot10-reco.md lists the flags.

# LAW-4 RANK NUMBERS → BAL (opus, rules/numbers) — Foreman D depth 3 session_01964izCEg2Mg4ff3dvoeMWK

Read first: dev/rules/START_CORE.md (18 LAWS: esp. 4 ONE CORE, 11 FIX THE WHOLE GROUP, 7 wording, 14 canon) + dev/rules/START_WORKER.md, branch claude/cung-tuong-mong-handover-hj0h8w. Sparse worktree under /home/user/wt, fetch --depth=30 under flock /home/user/wt/fetch.lock, never full-clone.

ORDER (MAIN 115, 24/11 01:40Z, verbatim): "Kiếp real-minutes cap + kỳ ngộ ceiling per kiếp: keep PROVISIONAL numbers (put them in BAL as named constants). LAW-4 flag (RANKS s/d j1.js:6, promoGap j8.js:401 typed in code) → yours as one whole job: move to BAL, LAW 11 scan for every other typed rank/promo number, review, LAND READY to me."
Owner law 4 (OD:L1267, verbatim in START_CORE): "every number in the game comes from ONE shared rulebook (BAL); no part of the game may compute or hard-code its own number. Example of a violation: one place says Hoàng hậu needs 50 points, another says 55 — that alone breaks the one-core rule."

DO:
1. RANKS s/d (dev/build/j1.js:6) and promoGap (dev/build/j8.js:401) → BAL named keys (dev/build/jbal.js / jbal2.js; reuse BAL.promo.* where it fits). Values UNCHANGED (rule tables before/after = 0 diffs, like typed-stat-same in typed-stat-bal).
2. LAW 11 scan script (dev/test/ or dev/tools/): every other typed rank/promotion number in dev/build/j*.js (rank thresholds, promo gaps/cooldowns, rank-gated costs, rank counts in text) → table before/after; move each to BAL, text prints the constant.
3. PROVISIONAL constants in BAL: kiếp real-minutes cap + kỳ ngộ ceiling per kiếp, values = those used in dev/measure/robot10-reco.js (marked PROVISIONAL in a comment); robot10-reco/agg read them from BAL (bal.json) instead of their own constant.
4. Build (dev/build/assemble.py + dev/site/build_site.sh), quickcheck, old-save load, the rank/promo tests, coop-e2e (promotion sync). Branch review/bal-ranks-law4 from newest origin/main. Report dev/handover/reports/bal-ranks-law4.md (scan table + 0-diff proof). On SSK send Foreman D one line with sha. Never push main; no PR.
