# LAND CHAIN 26 (LC26 session_01Rc5AsNFNbUqAWsDjxbf4hH) — lander for MAIN CHÍNH 166 (session_01Rc5AsNFmfoR6xWx1tx5wVP)
PRIORITY #1 CHECK: OD 26/11 ~04:30Z GO-LIVE standing permission (landers stage + gate, MAIN FF-pushes) | main LIVE 4cfcda61 | review/lc25-* stack | claims LC25 → LC26. Continuing land-chain-25.md «LC25 HANDOVER»; nothing rebuilt.
START_CTX ~5 % · roll at ~30 %, ceiling 60 %.
STATE at start: LIVE 4cfcda61 · ROLLBACK 504d2e6a. Next = review/lc25-wf 814bd77d.

## 21:30Z — wf (wording-gain + firstcard-3) 814bd77d
- FF of LIVE 4cfcda61: ok (3 merges + branch commits). CHANGE.txt = ONE line (firstcard). build_site.sh reproducible: only CTM_BI stamp differs.
- Tests (all PASS): wording-gain-scan (0 left), stat-pace index.html, statpace-scan.py, kit-e-rows 26, kit-cost-rows-home 15, firstcard/odds-word-rule, firstcard/family, kit-warn-line, kit-notice-hold, kit-goal-link, one-core-guard, time-spill-guard.
- (times above were build-stamp; real clock ~23:3xZ.) MAIN rolled 166 → 167 (session_01Rc5AsHpsqwBv3JiGHatEyg, child of 166, verified).
- assemble.py module list: wf / title-bal 61bdd97d / wording-marks 42cfbac8 all 469 = LIVE (MAIN 166 union lesson; none dropped).
- STRAY FILE: 814bd77d carries /_aa.html (19.8 MB) = coregates G3 scratch copy ($WT/_aa.html), committed by FIRSTCARD-3 2452e22b; unreferenced. Lander commit a22cf45d drops it + .gitignore /_aa.html (no code change). Branch review/lc26-wf.
- coregates vs 4cfcda61 (764 s): G1 all PASS, G2 ok, G3 kit-conform ok, G4: odds-cap, coop-one-world, mk-layer 0 bad, manifest, npc-purpose 419, dialog-fixed all pass, dead-card, look-dedupe, press-keep, q-softlock, next-dead, anchor-table 0 bad PASS; FAIL only 90 button-crawl «Ô lưu · Lui» = known LIVE baseline.
- quickcheck . vs LIVE --runs 5 ALONE: PASS 523 s · open 2117 ms · old save ok · median new/live render 170/168, tab 430/520, buổi 914/1295, tasks>200 23/24.
- → «READY TO PUSH a22cf45d» to MAIN 167.
### Queue after wf (MAIN 166/167 + RVs)
title-bal 61bdd97d (RV-163C) → wording-marks c580f2cd (RV-164, supersedes 42cfbac8; Tốn no-minus inside) → [D promo when LAND READY, slot priority] → punish-tier+wit 85d1c0ec (RV-163C, one sha; wipe CDN img/_review/punish-tier/ + punish-tier-wit/ after land) → dress-fix-kit 8cc9a284 → dialog-order-r4 4594ec2b → sideq-trim a6ecd04e + sideq-race 16242897 (rides with it) → rest per land-chain-25. oan-pace-ghen FAIL (out); kit-resfold 5fd36e51 superseded by r2 (out). Each later item is FF of 4cfcda61 → restack onto new LIVE.

## ~00:10Z — a22cf45d LIVE (MAIN 167 FF; rollback 4cfcda61). MAIN rolled 167 → 168 (session_01Rc5AsMYn5V43iERgwDRQrj, verified child). UI reviewer RV-165 session_01Rc5AsLoAzF54ipTvF4Hhdn; BIG RV-163D session_01Rc5AsMQU1ehAQ8bwbw6pWo.
- title-bal 61bdd97d → review/lc26-tb fa722503 on a22cf45d: patch-identical, CHANGE line written by me (branch had none). title-bal PASS; title-sys 8 / title-sys2 2 fails identical on stage and RV'd sha (pre-existing). coregates vs a22cf45d: only G4 90 baseline. QC alone PASS (render 176/195, tab 524/507, buổi 1016/920, tasks 22/23). → READY fa722503 to MAIN 168.
- wording-marks c580f2cd → review/lc26-wm 540358c4 on fa722503: patch-identical; CHANGE line mine. kit-ton-row 14/14, marks-choice-scan 0 errs, wording-gain-scan 0, one-core, kit-e-rows, cost-rows-home, odds-word PASS. coregates running.
- ob-verdict-3 452b7cb5 (RV-164 PASS, evc test setup already inside) → review/lc26-ov fda3f280 on 540358c4: patch-identical; CHANGE line mine. ob-verdict-3 35/35.
- New PASSes in queue: result-sieve-r2 5ac24fef (RV-165), map-r9 073d48b3 (RV-165) — slots asked of MAIN 168. kit-resfold-r2 8740785b = FAIL (do not land).

## ~01:15Z — 540358c4 LIVE (wording-marks; MAIN 169 FF; rollback fa722503). MAIN 168 → 169 (session_01Rc5AsLs58Sh2uCgF1R9EHu, verified). Root MAIN 170 to follow.
- wm gates: coregates vs fa722503 only G4 90 baseline; QC alone PASS (render 197/195, tab 452/546, buổi 1027/978, tasks 22/22).
- end-maxrank f0ec2379 (D LAND READY, owner bug) → review/lc26-em 17f23656 on 540358c4: patch-identical, CHANGE = D's line. end-maxrank ALL PASS; rank/worker score+board tests OK (push deploys rank worker via rank-worker.yml → MAIN checks Actions); coop-ending-screens fails identically on LIVE fa722503 (pre-existing). coregates only G4 90 baseline; QC alone PASS (render 172/156, tab 488/416, buổi 878/1036, tasks 19/18). 01:43Z → READY 17f23656 (B not LAND READY by 01:45Z rule).
- ob-verdict-3 restacked onto 17f23656 → review/lc26-ov 77b82a97 (patch-identical, 35/35). Not yet gated (waits B decision).
- Queue (MAIN 169): B save stack JUMP-IN → ov3 → map-r9 073d48b3 → D promo → real-proof a2902d43 (carries punish-tier-wit) → title-parity 4af19072 → result-sieve-r2 5ac24fef → empty-modal df5da07a → kit-plaque-confirm bed400c6 → goal-links-r2d 9448be40 → dress-fix-kit → dialog-order-r4 → sideq-trim + sideq-race 16242897 → rest of LC25 list. RV-163D rolled (new BIG reviewer comes with MAIN 170).
