# ROLE PARITY report (worker ROLE-PARITY opus session_01Rc5AsNHRsgq6S4C9tpNLxA, branch review/role-parity)
PRIORITY #1 CHECK ('role parity' / 'promot' / 'riseCore adSrv'): OD 2 (21:30Z this task, 21:15Z receiver choice D) | ledger 0 | claims 0 | main: AG-ALL-2 registries (jagday agReg/agGrp, jagacts/2/3, jagstaff, jagmaid amRise, j42 srvRise) | review/* 0 for role parity (review/promote-servants-r1 = servant ranks, not maid→consort) | START FROM reports/ag-all-parity.md (17/11 table) — reused its SAME/NUM classes, exemption lists and label tables.
START_CTX ~4 % of 1M; stopped ~29 % (= START + 25) → ROLLOVER, handover below.

## SẴN SÀNG KIỂM d6c2dc17 (part 1: scan + table + ONE promotion rule + risen-maid fix + test; open gaps listed for the successor)
Commits on review/role-parity (base main 13bb8c88): 724cf018 (code + scan + test) · d6c2dc17 (open-gap baseline, table, rebuilt root index.html).

## 1. Scan (dev/tools/role-parity-scan.js) — table role × act × {player, NPC} from the LIVE game
- Columns: cung nữ · Đáp ứng … Hoàng quý phi (rank 0–6) · Hoàng hậu seat (rank 7) · "cung nữ → phi tần" (promoted).
- NPC side: every AGREG provider of the person's group (agGrp) + agOpts, called on an NPC of each role over symmetric seeded worlds (base, tired, social, proof, body, chest, rival-down); shared-gate deeds (TW.req / ACT.ok) counted for NPCs only when their option set can offer them (haOpts BANDS+HA_VAR−HA_NO, AGSELF/AGSOC, hh admon).
- Player side: deck (deal/pool/artActs/directActs/illCards), talkOpts of every person at every place (goTo) + Emperor talk, topicOpts + rvCard of every consort, staff/fac/art/inv/works/pet/kid tabs (consort); srvCards + srvStaffHTML (maid). Labels → keys via TW.n, ACT.n, AGC2BTN, AGC3BTN + KEYLAB.
- Verdict per cell: SAME / NUM / P-ONLY / N-ONLY (group-level gap) / P-RANK / N-RANK (shared-gate deed differs by rank) / EXEMPT (dev/tools/role-parity-exempt.json, each with its reason) / —.
- Promotion = EXACT set check: the risen maid vs her clone born as Đáp ứng (NPC: amRise; player: srvRise then the same S without S.srv).
- TABLE (share with Foreman D receiver-choice audit): **dev/tools/role-parity-table.md** on review/role-parity (JSON: run `node dev/tools/role-parity-scan.js dev/index.html --json out.json`).

## 2. Closed in this part (before → after)
| gap | before | after | how (ONE function, BAL) |
|---|---|---|---|
| promotion numbers (player srvRise vs NPC amRise / j14 eye) | player Sủng 15+nt/5 typed, Danh +5 / Bạc +20 typed, old mistress ghen 5/25 typed; NPC: Sủng from BAL, no Danh/Bạc, no ghen; j14 path: random Sủng, no fromMaidOf | SAME | riseCore(n,m,o) in jagmaid: Sủng = BAL.ag.maid.rise b + regard/d, + danh/bac, old master relation BAL.mline.riseLoy/riseRel (hers by Chủ tin, NPC by lòng), ghen BAL.ag.maid.rise.ghen — srvRise, amRise and j14 eye all call it |
| promoted player still treated as maid (jact adSrv: any S.srv; j83 works card: any S.srv) | risen player lacked consort doors (peddler pop-up «Để ta xem», «Trò chuyện với cung nữ», Thái y viện / Lãnh cung copies, «Tự học, làm tác phẩm») | SAME as a born Đáp ứng | adSrv / j83 test S.srv && !S.srv.risen |
| promotion act set | not checked | EXACT (scan: onlyRisen = onlyBorn = [] both sides) | test asserts it |

## 3. Tests / gates (on 724cf018 + d6c2dc17)
- dev/test/role-parity.test.js (new): re-runs the scan; FAIL on any gap not in dev/tools/role-parity-open.json (278 entries = the open baseline, must SHRINK); promotion exact sets; riseCore same Sủng/Danh/Bạc/ghen for her and the NPC maid.
- one-core-guard PASS (inline 4001 < 4212). ag-stf2 23/23. agmaid_check 1 FAIL «Tiến cử option text: no invented odds» = SAME FAIL on base main 13bb8c88 (pre-existing, not this branch). ag-par3: flaky on BOTH base and branch (base 2/0 FAIL, branch 0/2 FAIL over 2 runs each: «Mời đến cung ta», «Nhờ giúp đỡ») — pre-existing flake.
- deeds ratio (ag2perf-deeds 160 buổi): seed 1 base 615 → 607 (−1.3 %), seed 2 569 → 569 (0 %) — within ±3 %.
- quickcheck: BLOCKED in this env (build step assets.py cannot read the CDN _index.json: proxy 403). coop-e2e: BLOCKED in this env.

## 4. OPEN (successor, in this order) — rows of role-parity-open.json grouped by family
1. REAL gaps (player button, no NPC option): kid care «Chăm sóc» / «Canh giữ các con» (j25 kid tab); cycle forgeries «Sửa sổ nguyệt sự» / «Dặn ma ma báo ngày giả» (jcycle: NPC hidden pregnancies never forge); rouge «Xin / Mượn / Lấy trộm son phấn» (jration: NPC side = monthly flat chances BAL.ration.npc, not a choice → option with the same odds fn); illicit buys «Sai cung nữ thân tín mua lén ngoài cung» (j83 maid road; NPC harm acts never buy the item — also law 6c); consort affair road j22 talk:man («Chào hỏi đúng lễ», «Liếc mắt đưa tình», «Trao khăn tay», «Hẹn gặp riêng», «Cắt đứt» — shows as maid:hail/flirt keys in consort columns); harm:xx «Tố xa xỉ» (jdress: not in BANDS → NPC never) and harm:vp (gate P-only in probe — check ACT.vp.ok for an NPC doer).
2. MAPPING fixes (not gaps): harm:ally / harm:gift = cx:ally / cx:gift (same ACT.f) → alias in KEYLAB; cx3:def_* in «up» column.
3. PROBE limits to fix before calling them gaps: cx3:sell / cx3:test N-only (item-detail menu itemAct not probed), cx:study N-only (art-tab lesson buttons), cx3:teachD/teachV N-only (j53 kid card buttons), cx3:use / tell / facDiv / staff* / cx:maidR P-only (NPC providers' utility + monthly locks: add worlds where they pay), mediate / harm:pushp / tat / trip / laydo / follow (target state per rank), hh:conf / hh:cutpay (NPC Empress needs evidence / over-rank items on targets), maid column (NPC maid stats live in s.st and master home/away: add worlds).
4. Each closed row: remove it from role-parity-open.json (the test prints entries no longer seen).
Pattern for closing (as AG-ALL-2e): build the card ONCE as f(p,…) used by her button and an NPC provider agReg("consort","par4",…) key cx4:<k>, numbers in BAL, utility agcU + mindPick.

## HANDOVER (ROLE-PARITY → successor; coordinator opens it)
Branch review/role-parity tip d6c2dc17; worktree recipe: sparse worktree from origin/review/role-parity; build `CTM_IMG_BASE= python3 dev/build/assemble.py`; scan ≈ 12 min (`node dev/tools/role-parity-scan.js dev/index.html --json /tmp/x.json --md /tmp/x.md`); test `node dev/test/role-parity.test.js dev/index.html`. Root site rebuild: `bash dev/site/build_site.sh` (assets.py CDN read fails here, index.html still builds).
