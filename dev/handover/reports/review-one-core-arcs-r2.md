# review-one-core-arcs-r2 — reviewer verdict on review/one-core-arcs @ 2831e112 (Foreman B)

PRIORITY #1 CHECK ('one-core-arcs|e67heir|e67merit|amt1'): OD ONE CORE OD:L1267 | main 05ebe3da (contains: yes) | review/* review/one-core-arcs 2831e112 (this), review/one-core-arcs-r1 f6b07eb3 (r1 FAIL + proof), review/one-core-dup2-r2 069188d7 (merged in; r4 PASS 08:54Z), review/one-core-roads-r1 75bc9f05 (trial merge) | claims B row "one-core-arcs SẴN SÀNG KIỂM 2831e112 → re-review r2" = this session
Reviewer session_01N1tNP5234t4p9HE1eAvTYL (opus, BIG). START_CTX ≈ 4 % of 1M; finished well under rollover (no handover needed).
Foreman: Foreman B s3 session_01N1tNP3Jf9UG8ZtZdVruBg7 → handed to s4 session_01N1tNP2Mw57iytjNHmoygKN (verdict sent to s4).

## VERDICT: PASS review/one-core-arcs-r2v 6b2ab41be3d0f907e86846e3a7f30cc439649a2c
= 2831e112 + 2 reviewer commits (below). origin/main 05ebe3da is an ancestor (FF-able). dup2-r2 r4 PASSED, so this PASS is NOT conditional.
Landing order unchanged: dup2-r2 069188d7 → arcs (this sha) → roads-r1 75bc9f05.

### Reviewer fixes (review/one-core-arcs-r2v)
1. **1260064f — same family, missed (LUẬT SỬA CẢ NHÓM):** 6 typed merit amounts were still left in j67 go closures: `e67merit(6)` cnv_chu.E.win, `e67merit(5)` cnv_chu.E.win2, `e67merit(6)` cnv_ban.E.win, `e67merit(5)` cnv_mat.E.win2, `e67srvUp(10)` / `e67srvUp(6)` cnv_ma.E.win / win2 (e67srvUp's fallback is e67merit(n), text "Công lao +n" prints it). Moved with the worker's own mover (dev/measure/arc-onecore-g2.js; move-lib AMT += `merit|srvUp`) into BAL.arc.fx[..].E[..].g; closure reads G[0]. j67/j97 now hold 0 typed amounts of e67dad|bien|kho|heir|ally|pun|foe|drop|merit|srvUp.
   Proof made stronger: arc-onecore-same.js now also stubs e67heir / e67merit / e67srvUp / r97srvRk (before, those returned "" on the seeded life — no S.srv — so their moved numbers were not really compared; e.g. all 13+ e67heir moves). Runs with log 8625 → 8862; result SAME.
   New dev/measure/arc-onecore-nomut.js: BAL.arc after the game loads must equal jbalarc.js as written (r1 tree: 173 diffs, e.g. gb.rumor[1].c.suc −5 → −2; this branch: 0).
   Site rebuilt.
2. **6b2ab41b — stray 9 MB `_old.html` at the repo root** (coregates.sh temp file, committed by one-core-dup2 e6c8904e; not on main, not on roads). Removed + `/_old.html` in .gitignore. NOTE for landing: dup2-r2 069188d7 still carries it, so main gets it for one step when dup2 lands; this arcs sha removes it right after.

## Checks (on 1260064f / 6b2ab41b unless noted)
| # | check | result |
|---|---|---|
| 1 | one-arg amounts `e67(dad|bien|kho|heir|ally|pun|foe|drop)(N)` in j67+j97 | **0** (648461b5: 48+13 lines) |
| 1 | arc-onecore-same (r1 version, identical to f6b07eb3) on 2831e112 vs 16d4925f / 648461b5 | SAME · go runs 11448 ERR 0 · odds 201900 ERR 0 · page errors 0/0 (both) |
| 1 | same, strong stubs, on 2831e112 and on 1260064f, vs 16d4925f / 648461b5 | SAME (all 4 runs) |
| 2 | BAL.arc after load == jbalarc.js (arc-onecore-nomut) | 0 diffs (r1 f6b07eb3: 173) |
| 3 | baseline per key 069188d7 (11790) → 2831e112 (9128) | 427 entries shrank by 2669; **grew: exactly 7** = amt e67heir jend14 (6)×2 (8)×2 (4)×2 + jrd_thd (6)×1 — each on origin/main 05ebe3da at jend14:134/135/138/139/159/160, jrd_thd:977, same numbers. Nothing else grew. Guard code diff = e67heir added to amt + comment only; kinds list unchanged |
| 3 | one-core-guard | 0 fails (inlineNow 9128 = baseline) |
| 4 | one-core-text / one-core-bind | 0 sites / prints 524, mismatches 0 |
| 5 | quickcheck.sh (1260064f) | PASS: build same, core gates PASS, open 1239 ms, old save from live loads + plays, perf new/live render 235/229, buổi 821/1019 ms |
| 5 | coop-e2e (live Worker) | run 1 62/63, run 2 53/62 (host stuck with queued popups «Điềm báo», «Hội phối đồ: báo đề», weeks never merged), **run 3 62/62, run 4 (6b2ab41b) 62/62**; main 05ebe3da 62/62. Run 2's stall (weekly popups queued on the host) is not an arc-number path and did not repeat in 2 more runs → flaky live-server co-op timing, flagged for Foreman B only |
| 5 | coop-one-world (QC_WT) | PASS |
| 5 | road-rare | ALL PASS |
| 5 | road-end | 51/51 pass |
| 5 | road-full | not run (≈5 min/life × 62); r1 partial was clean |
| 6 | trial merge with review/one-core-roads-r1 75bc9f05 (temp tmp/arcs-r2-trial, not pushed) | conflicts ONLY assets.json / index.html / sw.js / one-core-baseline.json; took theirs, assemble, guard 0 fails, `--update` 7475 → 4730, per-key grow NONE; text 0 / bind 524·0; e67heir typed left 0; merit typed in j67 0; arc-onecore-same (strong) vs 648461b5 SAME; nomut 0 diffs |
Pre-existing on main, not re-run (r1 showed main→main identical): chap-label arc-head, chap-label-oldsave v3 .obj67, story14-frame p.startsWith crash, road-saves 2/7 stale premises.

## For Foreman B (not blocking)
- **Guard gap, same family:** one-core-guard `amt` does not list `e67merit` / `e67srvUp` / `srvMerit`, so typed merit amounts are not frozen anywhere. Left on this branch: jrd_cnv 8 sites (e67merit(4/5/6/8/2…)), j42 srvMerit; on roads-r1 they live in rdfrag/cnv_ban 7 · cnv_chu 6 · cnv_ma 9 · jrd_cnv 1. Adding them to `amt` needs an --allow-grow of those pre-existing sites (guard owner + your approval) → leftovers wave (one-core-dup3).
- r97srvRk(3/4) in j97 R97L = target servant rank tied to the title text (identity, not an amount) — left as is.
- r1's open list (evA / evStory evidence amounts, j96 adj96 heat objects, jroute rtCard k: costs) still stands for your call.
Shots: none (no UI change). Scratch only.
