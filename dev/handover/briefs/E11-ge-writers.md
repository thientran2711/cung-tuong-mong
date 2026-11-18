# E11 — GRAND ENDINGS phase 3: WRITERS, identity by identity (opus, BIG review per wave)
PRIORITY #1 CHECK ('grand ending'): OD 5 | main: engine LIVE a8a10c66 (jgecat.js, jgedata.js = tt_co + cnv_mat + nc_tuc, jge.js, jbalge.js) | review/grand-endings-design r3 (DESIGN) | claims E1/E1b/E1c DONE; no writer claim.
Read first: dev/handover/briefs/E-common.md (laws, work, report) in full; CLAUDE.md; START_CORE + START_WORKER; dev/kit/VANPHONG.md.
DESIGN: `git show origin/review/grand-endings-design:dev/design/GRAND_ENDINGS.md` — §2 skeleton, §2.6 lean, §2.11 variety guard, §3 catalogue (names / pairs / both titles are FIXED there), §4 worked samples, §5 strings, §7 step 3.
PATTERN = the three live branches in dev/build/jgedata.js (read its header comment: pull / push / close / doom / cond / fo / cw / t / a / ht / ha / fail / ft, plus lean p/m). Copy that shape exactly.

WAVES (one worker each; disjoint identities; Bắc Địch `bd_*` is OUT — step 4, owner D2):
- W1: tt_oan, tt_tranh, tt_mat · dtq_* (4) · muoi_* (4) = 11 branches → branch review/ge-writers-w1, data file dev/build/jgedata_w1.js
- W2: cn_* (4) · nc_gian, nc_su, nc_vuong · td_* (4) = 11 branches → review/ge-writers-w2, dev/build/jgedata_w2.js
- W3 (later): ch_* (4) · thd_* (4) · cnv_chu, cnv_ban, cnv_ma = 11 → review/ge-writers-w3, jgedata_w3.js

TASK per wave, from newest origin/main:
1. New file jgedata_wN.js = `Object.assign(GE_DATA,{...})`, added to assemble.py right AFTER jgedata.js (one line; no other module touched). Each branch: lean{p,m} + e[4] with pull/push/close/doom/cond/fo/cw/t/a/ht/ha/fail/ft.
2. Option names in pull/push/close/doom/lean MUST be REAL options that already exist in that road's chapters (dev/build/jrd_<id>.js, ch12–14, shared lines) — grep them, copy raw (with {v}/{mis}). The jrd_* road files belong to Foreman B: DO NOT edit them. If an ending has no real path (e.g. no harsh option on its Chuỗi, the E1c fix-4 lesson), write the exact proposed road patch in your report under «FOR B» and tell Foreman E — never invent an option name.
3. Every path must be reachable for BOTH shadings: each ending needs enough thiện- AND ác-tagged real options on its Chuỗi (lean bands per BAL.ge.target). Conditions use only the cond/fo vocabulary in the header; numbers only in BAL.ge (jbalge.js) — add gate keys there if a new ending needs one (ONE CORE).
4. Words: cổ trang per VANPHONG; no %, no numbers in cw; t/a narration 2–4 lines, ft 2–3 lines; titles exactly as §3 catalogue. Whole family: run the existing variety guard (dev/test ge-guard) over ALL live branches — no two endings share narration lines.
5. Measure: extend the existing GE bot measure to your 11 branches (kind + cruel lives per branch): every branch IN band (open, kind→thiện, cruel→ác). Print the per-road table in the report.
6. Tests: ge-guard, ge-engine, build_site (bash dev/site/build_site.sh), bash dev/tools/quickcheck.sh. Shots not required (no new UI).
Report dev/handover/reports/ge-writers-wN.md; push every ~30 min; then «SẴN SÀNG KIỂM ge-writers-wN <sha>» to Foreman E. Model opus. No push to main, no PR.
