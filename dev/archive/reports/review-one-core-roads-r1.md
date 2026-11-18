# review-one-core-roads-r1 — independent review of review/one-core-roads @ 75bc9f05 (reviewer session_01N1tNP5phUb758q6HmgPWgY, Foreman B)

PRIORITY #1 CHECK ('one-core-roads|BAL.road.fx|rareK'): OD 6 | ledger 0 | claims B one-core-roads session_01N1tNP4eyJ4AQGCmA1HpA9c | main 15 | review/* one-core-roads (this), one-core-dup (base), one-core-arcs (sibling). Reused: the worker's proof + the repo tests; my extra checks are scratch only (not committed).
START_CTX ≈ 3 % of the window; finished ≈ 12 % (no rollover).
Read in full: START_CORE + START_WORKER + START_REVIEWER, REVIEWER.txt, brief one-core-roads.md, one-core-dup.md §2b + worker-2 brief, OD:L1267 + OD line 1500 (verbatim), worker report.

## VERDICT: PASS 75bc9f05

Branch review/one-core-roads-r1 = 75bc9f05 (no reviewer fixes needed). Its ancestor set contains current origin/main 6c4f21c3 (fast-forward possible).

## (1) No value changed
- Worker proof rerun by me: `node dev/measure/road-onecore-g-same.js 16d4925f 60` → SAME; table identical to the worker's (tt 8700 · dtq 10140 · muoi 8040 · cn 8280 · nc 6780 · bd 6780 · td 11400 · ch 10920 · thd 10500 · cnv 15300 · noi14 360 · hau14 360 · ke14 900 go runs; 0 differences; RD97L 40 rare entries).
- Proof audit: OLD = files at 16d4925f, NEW = tree; covers every ARC67 road chapter (9 origins + bd aliases + jend14), every option (c/w/l/sc/sf/f/ff/e/need), every ending (fx/k/sc/tag), every odds fn (60 lives, Object.is), every option/ending/RD97L go; recording stubs log every argument (objects by id), plus return value + whole state after. Weak spot: the go runs are random lives, so a branch never taken in 60 trials is not exercised; 120 td runs end in a stub error ("rivals.find is not a function", same in OLD and NEW) and stop early.
- To close that gap I wrote an INDEPENDENT static check (scratch): load OLD raw and NEW raw (BAL g lists pulled out before rdFx/rdRare wrap), substitute every `G[k]` in the NEW go source by its BAL value and compare to the OLD go source text. Result: 1641 go closures compared (all options, endings, CHHO_D beats via BAL.road.fx.ch_hoD, bd aliases, 40 RD97L), 1424 g lists, every g element used exactly once, no G index out of range, no go reading G without a list, 0 unused BAL g lists. Text identical except 3 places that are `x-N` → `x+G[k]` with G[k] = −N (ch_co_8.x1[0] `v.sung … -6`, ke14.s2[2] and ke14.s2[5] `s.fond … -4`): `(v.sung||0)+-6` ≡ `(v.sung||0)-6` for numbers (sung / fond are numbers) — accepted.
- Callers: option go is called go(A,ok) (j67:125), ending go(A) (j67:1693), rare go(A) (j97:266 r97After) — match the wrappers `(A,ok)=>f(A,ok,G)` / `A=>f(A,G)`. No other caller passes more arguments.
- Negative test (real): BAL rare td_tha_11 g 50→51 and ch_hoD.sD[2] g −4→−5 → the worker's proof reports DIFFERENT (e67ally 51; relAdd −5) and my static check reports both; restored.
- 24 hand spot-checks (old literal vs BAL value), all equal: tt_co_5.E.lose k −1 g[−4] (e67dad(−4)) · cn_ban_10.c3[1] sc 1 g[8] · dtq_huynh_8.E.mid k 0 · cnv_ma_6.s2[1] sc 1 · muoi_doi_9.c1[2] g[6,10] · cnv_mat_11.s2[4] sc 1 g[6,−4] · muoi_no_6.E.lose k −1 g[12] · dtq_binh_5.E.lose g[−5,−3] · dtq_binh_9.s1[1] sc 1 · td_song_11.s1[0] sc 1 · nc_gian_9.E.mid k 0 · muoi_doi_10.s2[1] sc 1 · nc_su_9.E.lose g[−4] (e67bien) · tt_co_7.c2[2] g[10,−6] · dtq_bien_5.c3[2] g[−2] · cn_chu_9.t1[0] sc 1 g[15] · td_an_10.E.mid k 0 · cn_ban_11.s2[1] sc 1 · cnv_ma_7.E.win k 1 g[4] · thd_tho_11.c2[0] g[15,−4] · dtq_huynh_11.c2[0] g[15,5] · cnv_ban_6.c2[0] sc 1 · cnv_chu_11.E.both k −1 g[5] (CHU_MIS) · rare td_tha_11 g[50] (e67ally) · jroad r97 k → BAL.road.rareK 1.

## (2) Texts
Every string / template literal in the 11 files is byte-identical OLD vs NEW (acorn token multiset; jroad only gains the key names "k","sc"). No player text was touched; VANPHONG unchanged. Pre-existing, outside the moved amounts: jrd_cn:16 evidence text "−1" next to evA(S,q,−1) (follow-up 2).

## (3) Guard
one-core-guard: 0 fails, inlineNow 7475 = baseline 7475. Baseline vs 648461b5: every changed entry is a removal or a smaller count (0 grown, 0 new); no --allow-grow. Guard code untouched.

## (4) Tests (on 75bc9f05, assemble.py first, build reproducible: index.html unchanged)
- road-rare ALL PASS · road-end 50/51: all 12 lives (tt/muoi/cnv/ch cases) reach ch14 with the right ch12 variant + hau14 + ke14; the 1 FAIL is the page error `r.updateLocalTransform is not a function` (Pixi) — known PRE-EXISTING on live (reports/batch-0430.md:29, HANDOVER_SESSION9 #10), this branch touches no Pixi code · coop-e2e 60/60 · coop-one-world PASS · QUICKCHECK PASS (old save ok; render 189/192 ms, buổi 1200/1381 new/live; core gates PASS).
- road-card Fold 755x1000@2 + iPad 1180x820@2 (tt_co_5, thd_sach_9, cnv_mat_8, ch_ho_7, nc_su_6, hau14): 0 errors, no overflow; looked at the shots (the promotion "Thánh chỉ" overlay that the random test life triggers sits on top; card itself unchanged). Shots in scratch only, deleted.
- Old save mid-road: road-saves variant where the full-road mid-road saves are made on the MAIN build 6c4f21c3 (old code) and loaded in this build, 9 origins tt,dtq,muoi,cn,nc,td,ch,thd,cnv: 9/9 PASS (each keeps its road, cast and plan and plays 60 buổi on; 0 page errors). The 2 other checks of that old test FAIL on stale expectations, not on this branch: "main build save has no road state" (main 6c4f21c3 already has the roads) and "td road not full" (td is full since road-b2); both would fail the same on main.

## (5) Trial merges
- with review/one-core-arcs c682afe6 (merge base 648461b5): dev/build/jroad.js auto-merges (arcs adds rdOdds terms dz/mz/a; roads touches rdFx/rdRare/r97) — no code conflict. Conflicts only in generated files (index.html, sw.js, assets.json → rebuild) and dev/test/one-core-baseline.json (both shrink; resolve by per-key minimum, then the guard: 0 fails, inlineNow 4916). On the merged tree: road-onecore-g-same SAME and arc-onecore-same SAME (8217 fields, 3365 odds fns, 1908 go closures, 0 page errors).
- with origin/main 6c4f21c3: already contained, nothing to merge.

## (6) Guard 'amt' misses single-argument calls — CONFIRMED (for the guard owner, one-core-dup2 session_01N1tNP5YW8yGvX2ZkQozRyk)
dev/test/one-core-guard.js:56 JOIN_PAT.amt needs `[(,]` AFTER the call's own `(`, so a call whose only argument is the number never matches: tested `e67dad(4)`, `e67dad(-4)`, `e67bien(ok?3:-2)` → no match (`rdOan(A,"v",5)` matches). Also missing from its name list: e67merit, e67heir, e67srvUp, matMis, CHU_MIS / BAN_MIS / CHU_NT / BAN_NT, CHR_TH, lmmCon (all moved by this branch, so the roads files are clean, but F2/F3 files can still hide them). Fix idea: `\((?:…)*?(?:[(,]\s*|(?<=\()\s*)` or a separate single-arg kind, plus the names.

## Follow-ups (not blocking)
1. Guard gap (6) → one-core-dup2.
2. jrd_cn:16 evidence text types "−1" and code evA(S,q,−1): one BAL key + text prints it (small, ONE CORE).
3. Proof tool: the random-life go runs do not prove branch coverage; keep the static G-substitution check as part of the proof for F2/F3 (I can hand over the script).
