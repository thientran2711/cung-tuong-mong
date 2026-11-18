# ge-writers-w2 — E11b (W2: cn_* ×4 · nc_gian nc_su nc_vuong · td_* ×4) — HANDOVER (context rollover)
PRIORITY #1 CHECK ('grand ending'): OD 5 | main engine LIVE (jge.js/jgedata.js/jbalge.js, pilots tt_co cnv_mat nc_tuc) | review/grand-endings-design r3 (catalogue §3 names/pairs/titles used as fixed) | claims: E11a W1 parallel (jgedata_w1.js untouched). Reused: engine shape of jgedata.js, ge-guard, ge-engine, ge-measure (extended, nothing rebuilt).

Branch `review/ge-writers-w2` = **1e499220** (merged main e18697fe). Worktree `/home/user/wt/gew2` (sparse, hooks on); scratch `/home/user/wt/gew2-work` (opts dump, road option lists r_*.txt, scan.js, measure logs).

## What is done
- `dev/build/jgedata_w2.js` (new): `Object.assign(GE_DATA,{…})`, 11 branches × 4 endings, shape = jgedata.js (pull/close/cond/fo/cw/t/a/ht/ha/fail/ft + lean p/m). Every option name is a REAL road/ch12–14 option (ge-guard checks all; no road patch needed → **FOR B: none**).
- `dev/build/assemble.py`: one line, jgedata_w2.js right after jgedata.js (W1 will add jgedata_w1.js on the same line — keep both).
- `dev/build/jbalge.js`: one appended W2 block `Object.assign(BAL.ge.gate|fail|rw,{…})` for the 44 endings (ONE CORE; W1 conflict is textual only — keep both blocks).
- `dev/test/ge-guard.js`: NEW family check — no two endings of ANY live branch share a narration sentence (t/a/ft), ht/ha, cw or fail name (found + fixed 3 repeats incl. one pilot clash). Result **6/6 pass**, 14 live branches.
- `dev/test/ge-engine.js`: `GE_ROADS=<list>` env runs the unit checks on any live branches → W2 **360/360 pass** (pilots default 104/104).
- Fix the whole group (after measure m1: 3 cruel cn lives shaded thiện on gentle chains): scan of all 44 Chuỗi for thiện/ác-tagged real options; before → after (min per side): before e.g. td_tha_1 +14/−0, nc_su_2 +0/−3, nc_gian_3 +0/−3, cn_tinh_4 +0/−3 → after every ending ≥ +3/−3 (most ≥4) — table: `node /home/user/wt/gew2-work/scan.js dev/build/jgedata_w2.js`.
- Law 6b (18 LAWS): FOLLOW endings name only real people (người ấy = her real bond; nc_vuong_4 hoàng huynh; td_tha_4 the enemy's daughter {foe}); cn_chu_4 «Thay chủ nuôi con» now needs a real son (cond ["son"]; raising another's child = existing act «Xin bế con nàng về nuôi», j8).

## Measure m2 (partial, 45/66 kind+cruel lives, sens bot, data of 80201651 — the 1e499220 text/cond edits do not change chains)
| road | lives | grand rate (in-char) | open at .11 | kind→thiện | cruel→ác |
|---|---|---|---|---|---|
| cn_chu | 6 | .67 | 1.33 | 3/3 | 3/3 |
| cn_tinh | 6 | .50 | 2.50 | 3/3 | 3/3 |
| cn_ban | 6 | .83 | 2.33 | 3/3 | 3/3 |
| cn_than | 6 | .67 | **2.67 OUT** | 3/3 | 3/3 |
| nc_gian | 6 | .67 | 1.67 | 3/3 | 3/3 |
| nc_su | 6 | 1.00 | **2.67 OUT** | 3/3 | 3/3 |
| nc_vuong | 6 | 1.00 | **2.83 OUT** | 3/3 | 3/3 |
| td_an | 5 | .80 | 1.80 | 3/3 | 2/2 |
Shading: 44/44 IN so far. Open-at-.11 band [1,2.6]: 3 roads just above. In-char rate above .60 on most roads (sens bot maxes stats → gates always met, odds at cap 88) — same engine numbers as pilots; not tuned (BAL.ge.odds is shared ONE CORE; report to Foreman E).

## NEXT STEPS (successor)
1. Wait for the running measure (nohup; logs `/home/user/wt/gew2-work/m2.log` then `m3.log` rand lives; `ALLDONE` at the end of m3.log). Do NOT start another heavy job meanwhile (OOM kills at PAR 3).
2. Fill the full per-road table (kind/cruel + rand) from m2/m3 (`REPORT` + `IN/OUT shade <road>` lines).
3. open11 OUT roads (cn_than, nc_su, nc_vuong, + any from the rest): add 1 more Khóa (real option, a chapter .6–.10 fork) to an ending of each, in jgedata_w2.js only; re-run guard + `MODES=kind,cruel node dev/measure/ge-measure.js - 2 2 out.json <those roads> sens`.
4. `bash dev/site/build_site.sh`, then `bash dev/tools/quickcheck.sh` ALONE; commit, push.
5. Finish this report (final table, sha), CLAIMS row, send «SẴN SÀNG KIỂM ge-writers-w2 <sha>» to Foreman E ROOT #4 session_01DgYSWokbRMfu3opDuSCw15.
