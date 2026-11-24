# E68r — review/parking-rank (24/11)
PRIORITY #1 CHECK ('rank'): OD 218 | main rank/worker/src/score.js check(), board.js, jrank.js | review/parking-rank f3c7ce80 (this) | claims E66. 18 LAWS: test-only, touches no law (no UI, no number, no wording).

VERDICT: PASS 644ee581 (LAND READY; = f3c7ce80 + merge of origin/main 35647d5e)

1. Diff vs origin/main = only rank/worker/test/forged.test.mjs (+29). OK.
2. forged / score / board tests: ALL OK each, alone and together (node 22). http.test.mjs not run (needs wrangler, writes data).
3. Anti-cheat proof, mutation run on score.js check(): remove mr limit -> FAIL "phẩm vượt Hoàng hậu" (200) + board 3 rows; remove kids-vs-years -> FAIL; check() returns null -> all forged cases FAIL. So the test does catch a broken check. Honest lives (client score 999999 -> server 780, cap case 12440 <= 15000) pass; board holds only 2 honest lives. Source restored after mutation.
4. origin/main 35647d5e merged into the branch (no rebase); main is an ancestor; the diff vs main is still only the test. Tests re-run after merge: ALL OK.
5. quickcheck (before the merge, game tree = live 68799300 + test): PASS (open 1504 ms, old save ok, perf buổi 1042/994). A first run failed only because my sparse worktree lacked coop/ and dev/site (G4, img allowlist) and one noisy perf sample; full tree rerun PASS. Not re-run after the merge: the merge adds nothing to the branch but main's own commits.
Shots: none (no UI).
