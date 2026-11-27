# LAND CHAIN 28 (LC28) — lander for MAIN CHÍNH 172
Session session_01Rc5AsKBqhCq1XrtewR7VyR, opened 27/11 ~05:36Z, successor of LC27. START_CTX ~5 % (1M window; get_session read 0, own estimate). Roll at ~30 %, ceiling 60 %.
PRIORITY #1 CHECK: lander queue only (no new work) — items from land-chain-27.md «LC27 HANDOVER»; LIVE 4cd3f974.

## LOG
- 05:45Z ring-build 72f2450f: merged LIVE 4cd3f974 → only index.html/sw.js conflicted → rebuilt; CHANGE = ring-build line; assets.json = LIVE (identical). Staged lc28-rb 8d511052 (local). G1 one-core-guard fails 0. coregates running.
- 05:47Z MAIN 172: queue (HOLD) dress-fix-rv166 02203967 — RV-166 UI PASS; land only after RV-163E PASS on rules parts (4)(5)(6). kk54 = 8bee402e confirmed; staged lc28-kk 2d51aaf4 on lc28-rb (source == 8bee402e).
- 05:50Z RV-166: kit-std-audit-rv166 b3a2b9ef PASS (= ddddca2e on LIVE; new files + WORKER_BRIEF line; adds G4 hook 96-kit-std-scan baseline 20) → queue after kk54 (cheap, tooling).
- 06:15Z ring-build HELD: coregates FAIL G4 80-dialog-fixed #71 (2/2 alone; LIVE passes): spyPick/shop ksz undefined (ring screens), choice dialogs NL/747 Fold, XL/1164 iPad. kk54 staged same fail. q-softlock fail = flake (PASS alone). Sent to RV-166 + MAIN 172.
- 06:20Z ov next-dead (95) alone: ov PASS 2/2, LIVE PASS → flake. quickcheck --runs 5 on ov running.
- 06:20Z RV-166 ruling #71 = test update: ring-build 9856601b, kk54-rv166d 5be6a2ec (replaces rv166c; only dialog-fixed.js + KIT.md line). lc28-rb now 3e443c60. kk restack pending rebuild.
- 06:20Z queue adds: pace-speed-rv163e d64f53cf (RV-163E PASS, on LIVE) → reign-end-rv163e 85791268 right after (MAIN 172). door-onetap e408ab1d (contains act-move 90488b6c; jone.js after jamove.js in assemble; land after RV-163F PASS). BIG reviewer now RV-163F session_01Rc5AsMvEuneMZA87bEtG2n.
- 06:40Z ob-verdict-3 98c77517: QC --runs 5 alone PASS (render 251/233, tab 564/571, buổi 1568/1733, tasks 34/30, old save ok) → READY TO PUSH 98c77517 sent to MAIN 172.
- 06:42Z ring-build restacked on 98c77517 = review/lc28-rb d7718f8b (CHANGE ring-build line; assets = LIVE); coregates + QC (vs ov) running.
