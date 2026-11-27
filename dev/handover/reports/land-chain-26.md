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

## ~01:45Z–03:25Z
- 17f23656 LIVE (end-maxrank; MAIN 169 FF; rollback 540358c4; rank-worker Actions run 45924290924 — MAIN checks).
- ob-verdict-3 452b7cb5 = OUT: G4 90 button-crawl 14 sure faults on its own tree (Fold home buttons «covered under div.kfoc-veil / kfoc-col / kfoc-tabs» = jfocus person layer stays over home); LIVE 1. RV-164 never ran G4 (RV-165 ack; RV-165 now runs button-crawl on every UI review). Replacement from OB-VERDICT-3 = review/ob-verdict-3 dacba11b (on 17f23656) → WAIT RV-165 verdict.
- dialog-fixed and next-dead each flaked once under load (passed alone 2/2) — LESSON: never run browser tests beside coregates.
- kptitle-close 51ad5d51 (RV-165 PASS, fixes the «Ô lưu · Lui» baseline) → review/lc26-kc 42830063 on 17f23656 (CHANGE line mine, assets = LIVE): CORE GATES PASS (first full pass, button-crawl 0). QC was stopped (restack needed anyway).
- map-r9 073d48b3 → review/lc26-mp b0e495de on 42830063: patch-identical (jbal2 hunk context only), assemble.py union 470, assets.json = map-r9's EXACT (adds 25 place-*/act pictures it uses; build output also adds an unrelated ui-khobai.webp → not taken). map-cover + map-labels PASS (on the earlier stage). Not core-gated yet.
- MAIN 170 (root, session_01Rc5AsKSV1EG8TGLZ2T7KX9) from 02:58Z. BIG reviewer RV-163E session_01Rc5AsKjHoKu34Mhccof3cA; UI RV-165 session_01Rc5AsLoAzF54ipTvF4Hhdn.
- B save-fix-stack-rv21 61085ce0 → review/lc26-b 92e82885 (CHANGE line mine — branch carried end-maxrank's; assets.json = LIVE). NOT READY: G4 92 look-dedupe FAIL 6 on B (re-run alone still 6; LIVE PASS): mood-seal «Ngày thứ nhất — Nhập cung» does not close on one ✕ tap; «a kit notice is saved with its kit spec and comes back with its body» FAIL (Fold+iPad). Reported to MAIN 170 (routes to Foreman B).
- dayq-qsoftlock dccf4f83 (D, play-stopper) → review/lc26-dq b16b4b93 on 17f23656 (CHANGE line mine, assets = LIVE). coregates running at roll time.

## LC26 HANDOVER (to LC27; rolled at ~29 % context, START_CTX ~5 %)
### STATE
LIVE = 17f23656 · ROLLBACK 540358c4. MAIN = MAIN CHÍNH 170 session_01Rc5AsKSV1EG8TGLZ2T7KX9 (root; MAINs roll often — verify each «main is now» with get_session: title + parent). Lander never pushes main; send «READY TO PUSH <sha> (<item>), FF from <LIVE>» + gates + QC line.
### NEXT (MAIN 170 order, 03:00Z)
1. B save-fix-stack-rv21 61085ce0 — HOLD (look-dedupe regression above) until B sends a fixed sha; then restack (stage review/lc26-b 92e82885 recipe: CHANGE line + assets.json = LIVE + rebuild), full gates. save-pid-cards-rv3 right after rv21 when B says LAND READY.
2. dayq-qsoftlock review/lc26-dq b16b4b93 (= dccf4f83 + lander commit): finish coregates (/tmp/claude-0/lc26-dq-cg*, may be gone) → QC alone → READY (lands before B since B is held, unless MAIN says otherwise).
3. D mg-trim-lr5 c8fa513d → 4. D parity-facfix-lr5 947283db (both FF of 17f23656; D LAND READY; branches review/mg-trim-lr5, review/parity-facfix-lr5).
5. kptitle-close 51ad5d51 (stage review/lc26-kc 42830063 — restack onto new LIVE) + RIDE the CLAUDE.md line (MAIN 170 P8): in CLAUDE.md «Core laws» replace exactly «odds ladder Liều/Khó/Năm ăn năm thua/Khá chắc/Chắc/Rất chắc/Nắm chắc» with «odds in words Mong manh / Hiểm / Khó lường / Tùy duyên / Có cơ / Vững / Rất vững — 7 equal bands, BAL.odds.cut (START_CORE law 7)». No game file change.
5b. ob-verdict-3 dacba11b (RV-165 PASS 03:25Z, replaces 452b7cb5, contains LIVE 17f23656; owner-visible → BEFORE map-r9; CHANGE line «Mỗi lựa chọn hiện thẻ kết quả trước, rồi mới sang màn sau; câu kết quả không lặp lại tên thẻ.»; check button-crawl = 0 once kptitle-close is under it).
6. map-r9 073d48b3 (stage review/lc26-mp b0e495de; keep map-r9's assets.json EXACTLY; CHANGE line «Dư đồ: chia khu Đông lục cung, Tây lục cung, Ty sở; mỗi nơi có tranh vẽ riêng, không còn ô trống; chạm tên người trong thẻ việc để xem người ấy.»).
7. D promo stack (on LAND READY) → real-proof-r163d a2902d43 (carries punish-tier-wit 85d1c0ec) → title-parity-r163d 4af19072 → result-sieve-r2-rv165 5ac24fef → empty-modal-rv165 df5da07a → kit-plaque-confirm-rv165 bed400c6 → goal-links-r2d-rv165 9448be40 → npcroads-red-rv165 9eec1427 (tests only, cheap) → dress-fix-kit 8cc9a284 → dialog-order-r4 4594ec2b → sideq-trim a6ecd04e + sideq-race 16242897 (rides with it) → rest of LC25 list (NG be41d1eb, lc24-st chain, k44 + place-close + sound-cache, veil, kit-name-stranger …).
kit-person-panel-rv165 34d41e13 lands WITH/AFTER act-move (not reviewed). OUT: oan-pace-ghen fe3d0888 (FAIL), kit-resfold-r2 8740785b (FAIL), 452b7cb5.
### RECIPE / CHECKS (each item)
FF check vs LIVE; worktree sparse; merge; index.html/sw.js ours → rebuild; assets.json = LIVE unless the item adds pictures it uses (then the item's exact file; build_site output may add unrelated local pictures — never take those); ONE CHANGE line (most branches carry a stale one → write the item's own, VANPHONG cổ trang); assemble.py module list = UNION (MAIN 166 lesson); per-file patch-id vs the RV'd sha; item tests; coregates.sh <wt> <LIVE> <out> ALONE (no browser tests beside it — flakes); quickcheck.js . <LIVE wt>/index.html --runs 5 ALONE. Baseline fail on LIVE: G4 90 button-crawl «Ô lưu · Lui» (gone once kptitle-close lands). Hook repro outside coregates: serve the tree (python3 -m http.server), cp index.html _aa.html, QC_URL=http://127.0.0.1:PORT/_aa.html. coregates leaves _aa.html (now gitignored) — rm it.
Worktrees: /home/user/wt/lc26-{live(17f-ish ref),em,kc,mp,b,dq,ov,ov3rv,wf,tb,wm,ho} — delete the stale ones.
- 03:26Z MAIN 170: land dayq now (not waiting for B); Foreman B = session_01N1tNP4Xowzw4b8yaq4i2EZ has the look-dedupe fault. RV-165 PASS ob-verdict-3 dacba11b → queue slot 5b.
- ~03:55Z dayq: coregates only G4 90 baseline; QC alone PASS (render 202/197, tab 443/541, buổi 1134/1112, tasks 25/23); dayq-break 4 lines identical on LIVE. → READY b16b4b93 to MAIN 171 (session_01Rc5AsLtirkQB1N5Nb16Wct). LC26 STOPS; LC27 = session_01Rc5AsLP7t5oeuhhjJHcDou.
