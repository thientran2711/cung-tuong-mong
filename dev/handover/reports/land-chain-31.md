# LAND CHAIN 31 (LC31, session_01Rc5AsKS3DTsYdH1BXztqVn) — START_CTX ~5 % (1M window; roll at ~30 %, ceiling 60 %). Lineage depth 7 of 8.
Succeeds LC30. MAIN = MAIN CHÍNH 178 (rolling → ROOT 179).

## LOG
- 14:35Z review/lc31-goal 772bee4f = goal-links-rv174-f28 8aee40a9 ALONE on LIVE d9ca7892 (+ coop-clear-rv173 8e1121d3 test-only). Conflicts: built files + CHANGE only (CHANGE = goal-links line); 0 LIVE deletions; assets.json = LIVE. goal-links.js PASS Fold + iPad; arrive-walk.js 15 rounds PASS Fold + iPad. coregates + quickcheck running.
- 14:40Z UI bundle 2: review/lc31-ui2 bc649964 (kit-resfold-r4 d500f132 + kit-dlg-avatar-r3 e258a0f9 + punish-stack-live-2 9585e741 + mgskin-wire-lrm 92116db8, on lc31-goal; assemble = union, jdead last). ★ punish-stack-live-2 has REAL code conflicts with 3a (j8 deathSentence/fall, j3 x2, j14, j30) and 3b (j30 j78 j95 jagacts3 j9). review/lc31-ui2l 26a1eacd = same WITHOUT punish-stack: 3a / 3b merge onto it with built files + assemble + jbal2 / j9 only. Asked MAIN: (a) ui2l → 3a → 3b → punish-stack re-merged by its fixer (lean) or (b) punish first.
- 14:45Z MAIN 178 ruling (a): ui2l → 3a → 3b; punish-stack-live-2 (with owner-ui-a) waits for PUNISH-TIER-9 (MAIN 179 opens) to re-merge on the new LIVE and resolve punish × e-pack E74 (newer ruling wins, list clashes).
- 14:50Z MAIN 178: tai-mat-know-rv173 409371d5 LAND READY → added to 3b. RV-173 known-LIVE gate fails (not branch): G4 94-q-softlock iPad, G4 80-dialog-fixed hand-of-cards (random), coop hang.
- 15:00Z lc31-goal 772bee4f: coregates PASS 757 s (hook 96 28/28); quickcheck --runs 5 alone PASS 1486 s → READY TO PUSH 772bee4f sent.
- Stack (unbuilt above ui2l): review/lc31-b3a 05804755 = lc30-b3a 927c408e on ui2l (jbal2 both additions; assemble union; CHANGE = 3a line). review/lc31-3bx 28b66653 = lc30-b3b minus allot-season (revert -m1 c9e8cd2d, assemble − jseason; ss* fns 0 refs) + sideq-road-fold-r2. review/lc31-b3b 612afc75 = 3bx + tai-mat-know on b3a: j9/j30/j10 per line, jbal2 both, jwhy one line combined, j24/j42 char-merged (charmerge.py).
- 15:02Z ui2l 26a1eacd coregates running.
- 15:16Z LIVE = 772bee4f (MAIN 178 FF); ROLLBACK d9ca7892. LAND-REMERGE-2 pinged. WORKLIST_OPEN recounted (41 open, ~85 %, row 33 closed).
- 15:35Z ui2l 26a1eacd coregates FAIL only G4 94-q-softlock = known-LIVE random (q-softlock.js on LIVE 772bee4f: 1/3 FAIL same «court» case; ui2l alone 1/3). Own tests PASS: kit-res-fold, rtoast-stage-scan, kit-title-name, kit-dlg-avatar, mgskin-wire 76/76. quickcheck --runs 5: PASS except that hook (render 239/256, tab 463/409, buổi 1563/1431, tasks 25/22; old save ok).
- 16:05Z act-move-law3-r2 d8f4d213 (RV-163J LAND READY) added to 3b → review/lc31-b3b 07f7cd16. ★ charmerge.py put spSee on the wrong value in jtwoway humil (fixed by hand): ALWAYS read every char-merged hunk vs both sides.
- 16:10Z coop-e2e is a normal gate again (MAIN 178; single flake → rerun once). ui2l run 1: stalled after «week 2» (73 ok, timeout 1500 s). Rerun 2 running (timeout 2700 s), log scratch coop-ui2l-2.log.
- 16:54Z MAIN 179 (session_01Rc5AsKs9pwks1oTM4gcZSm, ROOT) ruling: Foreman B save stack rv26 lands NEXT and ALONE; HOLD LIVE 772bee4f — no READY TO PUSH for ui2l/3a/3b until rv26 is LIVE (if rv26 has no sha by ~18:30Z tell 179). Queue after rv26: ui2l (restack) → e-gain3-live-m 41da6fae → 3a → 3b → dress-fix-df-rv173 fba7bacc + door-onetap-hs-rv173 28eab644. Foreman D LAND READY lines 14:10Z/14:42Z STALE. Reviewer now RV-163K session_01Rc5AsLEELg3zQtrwAFQF6Y.
- e-gain3-live-m 41da6fae: FF of LIVE 772bee4f; vs 3a real conflicts j30 + j9 (not built-only) → its own unit before 3a (then 3a restacks; j9/j30 d3line first).

- 17:21Z ui2l coop-e2e run 2 = 142/143, FAIL «week after rebirth advances» (A ended, B not, waiting at week 3). Told LC32 (run LIVE 772bee4f coop-e2e on same box to compare) + MAIN 179. review/lc31-b3b pushed = 07f7cd16.

## LC31 HANDOVER (to LC32; rolled ~17:05Z, ctx ~25 % of 1M, START ~5 %)
### STATE
LIVE 772bee4f · ROLLBACK d9ca7892 · before 5cee92bb · f28d28b9. MAIN = ROOT MAIN CHÍNH 179 session_01Rc5AsKs9pwks1oTM4gcZSm (send READY TO PUSH there). Reviewer RV-163K session_01Rc5AsLEELg3zQtrwAFQF6Y. RV-173 session_01Rc5AsJgDxrLHWzcPGS8PkN (reply direct). LAND-REMERGE-2 session_01Rc5AsLrH23Mb9grBW2TR61 (ping after each landing). ★ LC32 = lineage depth 8 = LIMIT: cannot create_session / triggers; at roll it writes its handover and asks MAIN 179 (root) to open LC33.
### NEXT (in order)
0. coop-e2e rerun on ui2l (scratch log coop-ui2l-2.log): see result line in LOG below / rerun once more if needed. LIVE-box comparison: run coop-e2e on LIVE 772bee4f if ui2l stalls twice.
1. rv26 (Foreman B save stack, from MAIN 179 / Foreman B — ask 179 for the sha if not sent): gate ALONE on LIVE 772bee4f: own save tests + coregates + quickcheck --runs 5 + coop-e2e → READY TO PUSH. Save/slot = alone.
2. After rv26 LIVE: restack ui2l (merge new LIVE into review/lc31-ui2l; built files --ours, rebuild with build.sh <wt> <LIVE>), regate (coregates + quickcheck --runs 5 + coop-e2e; own tests listed in LOG) → READY.
3. e-gain3-live-m 41da6fae own unit (restack on LIVE) → own tests + gates → READY.
4. 3a = review/lc31-b3a 05804755 (UNBUILT): restack on LIVE (expect j9/j30 vs e-gain3), build, own tests: srvmerit-guard.js <file url>, veil-buoi-scan.js <url> 755x1000 + 1180x820, law1-audit.test.js dev/index.html, noise-sampler-pure.js index.html; hook 96 noise-hygiene lines to look at once; gates → READY.
5. 3b = review/lc31-b3b 07f7cd16 (UNBUILT; on b3a): build, own tests: pace-speed, reignend, balance-core, cold-faction, fac-parity-play, mood-mem, moodknow, nroadhp, oan-pace, role-parity, lgr-ledger (args: LC30 TOOLS note), tai-mat-know (20/20 expected), act-move-law3-scan NATIVE=1 (≤4 left = LIVE-born), act-move-rows-scan, sideq tests (look in dev/test for sideq*). allot-season tests are GONE (reverted). monthly-allotment.js: expect presetsHidden-only (allot gone). Gates → READY.
6. dress-fix-df-rv173 fba7bacc + door-onetap-hs-rv173 28eab644 (RV-173 LAND READY).
7. punish-stack-live-2 9585e741 (+owner-ui-a): NOT ours until PUNISH-TIER-9 re-merges it on the new LIVE (MAIN 179 opens it).
### KNOWN-LIVE gate fails (not branch FAILs; MAIN 178/RV-163J/RV-173)
G4 94-q-softlock (random, jkring band over stage figures; show LIVE same-hook runs as proof), G4 80-dialog-fixed hand-of-cards (random). Hook 96 kit-std-scan baseline 28.
### TOOLS (copies in dev/handover/reports/lc31-tools/ on the handover branch; fix the S= / path lines)
build.sh <wt> <LIVE> (build_site minus assets.py; assets.json = LIVE; buildinfo vs LIVE) · asmunion.py (assemble list union, aborts on removals) · d3line.py (per-line diff3) · both.py (empty-base hunks: ours+theirs) · charmerge.py (char-level diff3 — CHECK every hunk by hand) · hpush.sh (log + MAIN_STATUS line push to handover branch with retry; edit its S path).
A new session gets a NEW container: none of LC31's worktrees exist for LC32. Every branch is pushed: review/lc31-goal (LIVE), review/lc31-ui2 bc649964 (with punish, parked), review/lc31-ui2l 26a1eacd, review/lc31-b3a 05804755, review/lc31-3bx 28b66653, review/lc31-b3b 07f7cd16. Quickcheck: run from a LIVE worktree: CTM_LIVE_REF=<LIVE> bash dev/tools/quickcheck.sh <sha> --runs 5.
