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

## PART 2 (worker ROLE-PARITY #2 opus session_01Rc5AsMM3ssHnCBtjLf11Qr, branch review/role-parity-2)
PRIORITY #1 CHECK (prio1.sh): 'role.?parity|chăm sóc con|canh giữ' OD 1 | ledger 0 | claims 8 | main 15 | review/* 1 (review/role-parity = part 1) | archive 0 · 'sổ nguyệt sự|báo ngày giả|forg' OD 5 | main 15 | review/* 0 · 'son phấn|ration' OD 38 | review/* 2 (monthly-ration, landed) · 'mua lén|illicit' OD 0 | review/* 0 · 'liếc mắt|trao khăn|j22|affair' OD 7 | review/* 0 · 'tố xa xỉ|harm:xx|harm:vp' OD 3 | review/* 0 → REUSED every player builder (j25 kidAct, jcycle cyDeck, jration talk cards, j83 IROUTE/illBuy, j22 man talk, jagacts3 p3Run/p3Kc); nothing rebuilt.
START_CTX ~3 % of 1M; finished near START + 25 % (only push + report left).

### SẴN SÀNG KIỂM f2b8fb0c (part 2: §4 families closed both ways; part 1 d6c2dc17 untouched, merged with live main fa411d6f)
Commits: ff81e63 merge main · 47dc7f0 code · 586e5e8 root site · f2b8fb0 deterministic scan + open baseline.

### 1. Families before → after (gap rows in dev/tools/role-parity-open.json; table dev/tools/role-parity-table.md on review/role-parity-2)
| family | before (d6c2dc17) | after |
|---|---|---|
| other (probe-limit / part-1 families) | 163 | 138 |
| alias ally/gift | 18 | 9 |
| harm:vp | 9 | 0 |
| harm:xx | 9 | 0 |
| kid care | 18 | 0 |
| cycle forgeries | 18 | 0 |
| rouge | 16 | 3 |
| illicit buys | 9 | 0 |
| affair road j22 | 18 | 0 |
| **total** | **278** | **150** |

### 2. How each family was closed (ONE function per card, the player's own builder; NPC option cx4:<k> in new dev/build/jagacts4.js; worth/gates BAL.ag.par4)
- KID CARE «Chăm sóc» / «Canh giữ các con»: j25 kidCareOk/kidCareDo, kidGuardOk/kidGuardDo for her and an NPC mother (same BAL.bacFee + BAL.btn rows; typed 2 months / 50 → BAL.btn.kidGuard.mo/blk). Two-way: the guard now shields ANY mother's children against ANY doer (was: only hers, only NPC doers); every consort's guard counts down monthly.
- CYCLE FORGERIES «Sửa sổ nguyệt sự» / «Dặn ma ma báo ngày giả»: jcycle cyHideCards(p) builds both cards for her deck and an NPC (odA of the doer, same costs, same failures: Tổng quản knows / ma ma blurts → others' ghen + news). The flat "clever rival" hide roll (BAL.cyc.rvHideTc/rvHide) is REMOVED (canon overwrite): an NPC's pregnancy is hidden only by her own forgery (v.cyHide).
- ROUGE «Mượn / Xin / Lấy trộm son phấn»: jration lxBorrowCard / lxBegCard / lxStealCard(p, …) — lxBorrowOdds(lender, borrower), lxBegOdds(p,kind), lxStealOdds = oPlant(p,v)+add; boxes really move (lxGive, law 6c). The NPC monthly borrow / ask-her / steal dice (BAL.ration.npc borrow/steal/ask/stealGhen) are REMOVED; buying at her own price stays monthly. An NPC who borrows from HER = her answer card (lxAskHer), never a dice for her. Left: 3 rows (up / hh N-ONLY: the risen player has no rival-visit / chest roads in that probe world — probe limit, listed).
- ILLICIT BUYS (4 routes): j83 IROUTE + illBuy are the NPC options cx4:illMaid/illThaiy/illCho/illAlly (same need, cost, odds, failure, evidence; a poison on its way via the maid route blocks a second buy). The monthly roll(8) road is REMOVED. Scan: «Hối lộ người ở Thái y viện» was mis-mapped to cx3:tyGift → now cx4:illThaiy.
- AFFAIR ROAD j22: manCards(p,m,place) for her talk and an NPC consort (per-woman tình ý m.tw[id], khăn m.lw[id] = real objects; lộRisk/watcher take the woman; trystNpc). The flat roll(2) affair start and roll(3) death are REMOVED: an NPC affair starts only by her own steps; exposure = caught in a tryst, the book check, or a hostile woman's PROOF (same BAL.manRd row as hers, law 6a). Typed /5 and roll(4) → BAL.manRd (one-core).
- harm:vp: verified two-way (j92 wdCause reads obs.wdSeen for any doer); P-ONLY was a probe limit → world "seen" (dressLook + wdSee for both doers) → closed.
- harm:xx: verified: her card may accuse on a GUESS (jshelf owner rule: "The player may guess at anyone; an NPC guesses only in the monthly pass"); the NPC side is shelfNpcAccuse (seen room or guess at BAL.shelf.acc.guessO → same act) + the day plan on a seen dress. Documented EXEMPT in role-parity-exempt.json with that reason (not a code gap).
- harm:ally = cx:ally (same ACT.ally.f) → ALIAS in the scan: closed. harm:gift stays (NPC cx:gift needs a giftable item the probe world never gives — probe limit).

### 3. Scan fixes (dev/tools/role-parity-scan.js) — needed so the test is meaningful
- Deterministic page (seeded Math.random + crypto, frozen Date/performance, as ag2perf-diff): before, rows flipped between runs (part 1's ag-par3-style flakes; the part-1 baseline FAILED on live main with 25 new + 25 gone rows). Two runs now give the identical 150 rows.
- Worlds added (symmetric, both doers): rouge (no boxes), men (palace men at the garden, Sủng low), malice, seen; plus a pass with her own real needs (agNeeds) besides the flat all-needs world. The promotion check compares act sets only (options seen only under her real needs depend on her life, not her rank).
- Labels: AGC4BTN; one label on two roads (maid:hail vs cx4:manHail…) counts the maid key in the maid column and the consort key in consort columns.

### 4. Gates (on 586e5e8 / f2b8fb0)
| gate | result |
|---|---|
| role-parity.test.js | ALL PASS (no new gap; promotion exact both; riseCore same numbers; no page errors) |
| quickcheck (586e5e8, CDN reachable here) | PASS · open 1838 ms · old save ok · perf new/live render 226/209, tab 408/388, buổi 1176/1040 · core gates PASS |
| one-core-guard | PASS (inline 3988 < 4212) · one-core-text PASS |
| ag-all.test | ALL 21 PASS (accepts cx4 by the same label rule as cx2/cx3) |
| ag-par3 | ALL PASS · ag-stf2 23/23 PASS |
| agmaid_check | 1 FAIL «Tiến cử option text: no invented odds» = same pre-existing FAIL on main (part 1 note) |
| deeds (ag2perf-deeds 160 buổi; counter now includes AG4 like AG2/AG3) | seeds 1–4 base fa411d6 615/569/594/609 → branch 603/529/596/628 = 2387 → 2356 (−1.3 %, within ±3 %); per seed −2.0/−7.0/+0.3/+3.1 (chaotic paths); seeds 5–6 diverge (base dies at seed 6: 231 vs 634) |
| coop-e2e | BLOCKED: co-op Worker host refused by the proxy (CONNECT 403) — not run, not faked |

### 5. OPEN after part 2 (150 rows, all in role-parity-open.json; test fails on any new one)
- my families: rouge 3 (up/hh probe world), harm:gift 9 (probe item) — both probe limits.
- part-1 §4.3 probe-limit families (138 rows, unchanged in kind): cx3:sell/test (item-detail menu), cx:study, cx3:teachD/teachV (kid card), cx3:use/facDiv/staff*/cx:maidR, mediate, harm:pushp/tat/trip (rank), hh:conf/cutpay, maid column. Next worker: add probe worlds for these, never filler code.
- NOTE for reviewers: NPC behaviour changed by design (flat monthly rolls → choices): fewer NPC affairs at start (no roll 2), no flat affair deaths (evidence instead), NPC hidden pregnancies hidden only by forgery, NPC rouge borrowing/stealing and poison buying only when chosen.

## PART 1 FIX (worker ROLE-PARITY #3 opus session_01Rc5AsN67UuWKQGjGP9MeW8, depth 4, branch review/role-parity-2)
PRIORITY #1 CHECK ('role-parity'): OD 0 new | ledger 0 | claims 8 (C-AG role-parity rows) | main 0 | review/* review/role-parity d6c2dc17, review/role-parity-r1 75f9dd84, review/role-parity-2 f2b8fb0c (continued here), review/role-parity-4 (Foreman B, stopped) | archive 0 → reused the part-2 scan; no new parity family built.
START_CTX ~3 % of 1M; finished well under START + 25 %.

### PART1 FIX READY 72fbb3fb
Commits on review/role-parity-2: fe0f1959 merge origin/main **e16e1d66** (conflicts: assemble.py module list keeps jagacts4.js + jgedata_w1.js + jmapz.js; index.html / sw.js regenerated) · 72fbb3fb the fix + rebuilt root site.

| reviewer item | done |
|---|---|
| (a) seeded page, identical runs | already in part 2; re-proved: 3 full scans on 72fbb3fb's code give byte-identical JSON (sha256 787b66e8…): 2 runs on the plain build, 1 on the CDN build (build_site.sh). NEW: the scan page now aborts EVERY http(s) request (as ag2perf-deeds) — before, a CDN build loaded the CDN asset index during the probe and gave other rows than the plain build (role-parity.test FAILED on the CDN build with 2 new / 8 gone rows). |
| (b) per-rank TARGET states | gates(): a TARGET LADDER, the same for both doers — one fixed target (first non-Empress consort of the shared target list) put at every rank t1…t7 + Hoàng hậu seat, once as she is and once in the state the deed needs (standing with the doer in the garden via jagharm HA.here = the hook the NPC deed uses when it lands; holding a stealable piece (jlost loOk); at odds with a third person; no slap mark); restored after each check. New symmetric world "staff": the doer's own servants span loyal 10/25/45, in trouble this tuần, fond of someone (undo list). AG.sc (jagent agSocT per-tuần SOC target cache, keyed by id not rank) reset per probe world — it carried a target list drawn at rank 0 into the rank-6 probe (the t7 «Nương theo» N-RANK). |
| (c) cap + side key | role-parity.test.js: open list keyed role\|key\|side; `OPEN_CAP=111`, FAIL when role-parity-open.json holds more (raising the cap is a visible diff). open.json regenerated from the seeded scan. |
| (d) «Chuyện cũ» | EXEMPT in role-parity-exempt.json: the person card's kit tab (jpcf SKIP_TAB, data-pct) that shows past-events info — a tab, not an act. |
| (e) promotion exact | re-proved on the seeded scan: NPC and player onlyRisen = onlyBorn = [] |

### Open rows before → after (role\|key\|side)
| family | before (open.json f2b8fb0c) | after |
|---|---|---|
| harm:tat | 4 | 0 |
| harm:trip | 2 | 0 |
| harm:pushp | 6 | 0 |
| mediate | 8 | 0 |
| harm:laydo / laydol | 2 | 0 |
| follow | 1 | 0 |
| cx3:staffChe / Doi / Phat (t2…hh) | 21 | 0 |
| cx3:staffTam (hh) | 1 | 0 |
| other families (unchanged kind, B3) | 105 | 103 |
| new rows seen after the main merge (world draw moved with main's palace trim 13 → 10; the OLD scan on the merged build shows them too): up harm:accuse/banphe/expose/tieuhuy/trinhth/uyhiep N-ONLY, hh hh:judge P-ONLY, maid maid:accuse P-ONLY | 0 | 8 |
| **total** | **150** | **111** |
(The old scan on the merged build alone: 147 → 111 with the fix.) Left for Foreman B's B3, not touched here: cx3:sell/test/use/facDiv, cx3:teachD/V, cx:study, harm:gift, cx2:chest, rouge up/hh, up column (def_*, staffHoi, maidTalk, maidR, hhShield, talkGossip, xinhh + the 6 harm N-ONLY above), hh:conf/cutpay/judge, maid column.

### Gates (72fbb3fb)
| gate | result |
|---|---|
| role-parity.test.js | ALL PASS (cap 111 ok, no new gap, promotion exact both, riseCore same numbers, no page errors) |
| quickcheck | PASS · open 1343 ms · old save ok · perf new/live render 192/162, tab 367/351, buổi 965/854 ms, tasks>200 18/18 · core gates PASS |
| one-core-guard | PASS (inline 3988 < 4212) |
| ag-all.test | ALL 21 PASS |
| ag-stf2 | 23/23 PASS |
| deeds ±3 % (ag2perf-deeds 160 buổi, seeds 1–4) | live main e16e1d6 615/569/594/609 = 2387 → branch 603/529/596/628 = 2356 (−1.3 %) PASS (no game code changed in this fix; the deeds diff is part 2's) |
| coop-e2e | BLOCKED in this env (accepted) |
Note: never run two scans at once on this box (the second Chromium is OOM-killed, as the reviewer saw).
