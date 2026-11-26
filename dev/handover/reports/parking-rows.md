# E93 — WORKLIST #21 PARKING-LOT rows (re-merge built rows + re-audit + build the rest) — opus — session_01DgYSWoUqcrQr4c6zerBJkA for FOREMAN E child5
PRIORITY #1 CHECK ('PARKING_LOT|parking lot|moment|scent|parking-rank|teeth|kitGameVs|kyOn|roleSet'): OD 2394-2395 (lip-teeth stays parked, never ask) + 2396 (AI key = MAIN, 25/11) + 2481 (vacation freeze 25/11 ~07:55Z: only started work continues; #14 #15 PARKED) + 2483 (#13 temper = Foreman D) | claims E63 audit, E66 verify, E67/E71r scent, E69/E73r/E75/E77r moment, E68r parking-rank | main 5e013076 (rows 1,3a,3b,4,5,6,7,8 incl. MG14 jpma.js:286 kitGameVs, 11 built) | review/moment-r2 8792f09a, review/scent-r 5c428bd8, review/parking-rank 644ee581 (LAND READY, never landed) | archive 0.
18 LAWS: re-merge only (no new code, no number, no wording) — the laws were checked by E77r/E71r/E68r on the same delta; delta proven unchanged below.

## (1) RE-MERGES onto LIVE 5e013076
Ancestor-of-LIVE check: none of the three is an ancestor of origin/main 5e013076 (merge-base ac4790f0 / fd85907a / 35647d5e) → re-merged.

| branch (reviewed sha) | new branch | sha | conflicts | delta proof (diff vs LIVE == reviewed diff vs its old base) | tests |
|---|---|---|---|---|---|
| moment-r2 8792f09a | review/moment-r3m | a9a3323f | assemble.py (main's list + jmoment.js after jshelf.js), KIT_REQUESTS.md (both blocks), index.html/sw.js rebuilt | jmoment.js, moment.test.js, moment-shots.js, KIT_REQUESTS.md SAME; assemble.py = main list + 1 file; assets.json/index.html/sw.js = rebuild only | moment.test PASS; QC see below |
| scent-r 5c428bd8 | review/scent-r3m | 99517ded | assemble.py (main + jscent.js after jdis.js), jbal2.js (BAL.scent block + main's net/fakeX/kmus block, both kept), index.html/sw.js rebuilt | jbal2.js, jinv.js, jscent.js, jthaiy.js, scent.test.js SAME; assemble.py = main list + 1 file (order check ok) | scent.test dev/index.html 3 PASS; QC see below |
| parking-rank 644ee581 | review/parking-rank-r3m | 73bb9781 | none (merge-tree) | diff vs LIVE md5 == reviewed diff md5 (only rank/worker/test/forged.test.mjs +29) | forged / score / board tests ALL OK |

**Stack review/e-pack-c ff373f76** (FF order: moment-r3m → scent-r3m (dd2d96b2, assemble both files, rebuild) → parking-rank-r3m). LIVE 5e013076 is an ancestor. Every changed file's diff vs LIVE == the same file's diff in its own r3m branch (scan: 10 files SAME). moment.test PASS, scent.test 3 lives PASS, forged.test ALL OK on the stack.

QUICKCHECK (bash dev/tools/quickcheck.sh on each sha, vs LIVE 5e013076; old save = LIVE save loads + plays a buổi):
| sha | result |
|---|---|
| moment-r3m a9a3323f | old save ok · open 1503 ms · core gates: only G4 button-crawl (the LIVE fault, below) · perf run 1 tab 532/408 (limit 530) and run 2 buổi 3132/1057 = noise (per-run buổi new 3132/892/3701, live 1057/866; box shared with tests) → perf-only rerun `node dev/tools/quickcheck.js … --runs 5` alone: **QUICKCHECK PASS** (render 210/182, tab 402/420, buổi 1215/3462, tasks 21/25) |
| scent-r3m 99517ded | old save ok · open 1796 ms · perf PASS (render 180/206, tab 471/448, buổi 3875/4254, tasks 24/23) · core gates: G4 button-crawl (LIVE fault) + G4 look-dedupe 1 «fold: real tap on the mood seal opens «undefined»» → re-run alone: scent 13/15 PASS (both fails right after/under the QC load; then 12/12 PASS with a dump probe: Q = one «Tâm trạng · Ngươi» card), LIVE 4/4 PASS; jscent.js queues no card at all (no Q.push / pushFront / kitPanel) → load flake, not this delta |
| e-pack-c ff373f76 | old save ok · open 1598 ms · perf PASS (render 221/187, tab 391/408, buổi 1408/4027, tasks 24/25) · core gates: ONLY G4 button-crawl (the LIVE fault); look-dedupe PASS |

Note: G4 button-crawl FAIL «fold · Ô lưu · Lui · close button did not close its layer» is PRE-EXISTING ON LIVE: the same crawler on origin/main index.html (5e013076) fails with the identical single row → not from these branches (FOR MAIN line).

## (2) RE-AUDIT of every PARKING_LOT row vs LIVE 5e013076 + review/*
| row | idea | state before (E63 24/11) | state now | proof | action |
|---|---|---|---|---|---|
| 1 | thuốc thúc sinh | BUILT | BUILT | main jagacts3.js:210-214 P3C.drug | — |
| 2 | live AI narrator | NOT BUILT | NOT BUILT | main: no runtime LLM call; OD 2396 «cái vấn đề cái API cho AI ngày mai làm» → MAIN offers her the key form | FOR MAIN (key = MAIN's job, not E) |
| 3a | hall names | BUILT | BUILT | main jhall.js:24 hallName | — |
| 3b | steal mini-game | BUILT | BUILT | main jbal2.js:635 BAL.steal.mg, jsmg.js | — |
| 4 | contest makeup tone | BUILT | BUILT | main jmkt.js:127 tsMkWant | — |
| note | leaderboard anti-cheat | PARTLY | BUILT (test lands with e-pack-c) | main rank/worker/src/score.js:38 check(), board.js:83; forged.test on parking-rank-r3m | land e-pack-c |
| 5 | phấn son theo lệ | BUILT | BUILT | main jallot.js, jration.js | — |
| 6 | bubble talk | BUILT | BUILT | main jchat.js, jbal2.js:1906 BAL.chat | — |
| 7 | minister agents | BUILT | BUILT | main dev/test/minister-agents.js, j55.js | — |
| note | lip-teeth | NOT BUILT | PARKED BY OWNER | OD 2394-2395 «cái phần môi răng là vẫn cứ để như vậy … đừng có hỏi nữa» | NOT built, NOT asked (law 16/17) |
| note | mood-seal sets per group | PARTLY (art) | PARTLY (art) | main jemoseal.js:15-18 setThree / roleSet (code takes a set prefix per role) ; only th-act- set drawn | art → FOR MAIN (Foreman C / MAIN art seat); wiring = one roleSet line per set once painted |
| 8 | person mini-game acts + MG14 | BUILT core, MG14 unverified | BUILT | main jpma.js:286 kitGameVs({…}) live board, jgamevs.js:8 | B-PM2 not needed |
| 9 | khoảnh khắc chân dung | NOT BUILT | BUILT, LAND READY | review/moment-r3m a9a3323f (in e-pack-c) | land e-pack-c; KIT REQUEST «moment album» + «!» overlay rows still OPEN (KIT_REQUESTS.md) |
| 10 | hương riêng | NOT BUILT | BUILT, LAND READY | review/scent-r3m 99517ded (in e-pack-c) | land e-pack-c |
| 11 | dress code | BUILT | BUILT | main jdc.js, jbal2.js:1930 BAL.dc | — |
| 11b | borrow accessory layers | SUPERSEDED by 11c | SUPERSEDED | main jdc.js BORROW (trâm) | — |
| 11c | masked robe recolour | NOT BUILT | NOT BUILT (needs art sample + owner look) | main jbal2.js:1926 kyOn = 0 | FOR MAIN (robe masks + 2×3 sample; then E wires kyOn) |
| title art | danh hiệu plaques | NOT BUILT, parked «until she says» | same | OD 21/11 ~04:14Z | nothing (parked by owner) |
| 12 | animated portrait frames | NOT BUILT | NOT BUILT (needs art) | main: no frame animation (j60.js:85 static tall frame) | FOR MAIN (animated frame art + KIT frame-animation slot) |
| 13 | temper-driven play | (new) | IN BUILD by Foreman D | review/temper-outburst, temper-perception, lc15-temper-* | — (not E) |
| 14 | sủng phi che chở + abdication ending | (new) | PARKED (vacation freeze OD 2481) | OD 25/11 ~07:55Z / ~08:10Z | nothing until she is back |
| 15 | nhân vật kỳ ngộ | (new) | PARKED (vacation freeze OD 2481) | OD 25/11 ~08:10Z «để dành» | nothing until she is back |

## (3) BUILD
Rows that need NO art and NO owner ruling and are not built: **none**. B-LIP is parked by the owner (OD 2394, never ask); B-PM2 is already LIVE (MG14); 9 / 10 / rank are built and stacked above; 2 needs the owner's key (MAIN), 11c / 12 / mood-seal need art; 13 is Foreman D's; 14 / 15 / title art are parked by her. → no review/parking-rows branch was made (nothing to build without breaking law 16/17/18).

## FOR MAIN 147 (one line each)
- e-pack-c ff373f76 (moment + scent + parking-rank on LIVE 5e013076) → lander queue (PASS shas above).
- G4 button-crawl «fold · Ô lưu · Lui · close button did not close its layer» FAILS ON LIVE 5e013076 itself (same single row) → every quickcheck on LIVE-based shas will show it until fixed (Foreman F / KK).
- ART (no owner ruling needed): 11c robe masks + recolour sample (2 figures × 3 colours, Fold+iPad) → then owner looks → E flips BAL.dc.kyOn; mood-seal sets per group (OD:L2331/2342 groups) → one roleSet line per set; row 12 animated portrait frame art + KIT frame-animation slot.
- Row 2 AI narrator: her provider key via request_credential (OD 24/11 ~08:50Z «ngày mai làm»), then B-AI.

## VERDICT
- «PASS a9a3323f» review/moment-r3m (PARKING #9) · «PASS 99517ded» review/scent-r3m (PARKING #10) · «PASS 73bb9781» review/parking-rank-r3m (rank anti-cheat test) — each = its reviewed delta on LIVE 5e013076 (rebuild only for index.html/sw.js/assets.json).
- Stack to land: **review/e-pack-c ff373f76** (FF from LIVE 5e013076; one push lands all three). Only gate red = G4 button-crawl «Ô lưu · Lui», which LIVE 5e013076 fails the same way.
- No «SẴN SÀNG KIỂM parking-rows»: no buildable row left (see (3)).
Shots: none new (no UI delta beyond what E77r/E71r shot; re-merge only). Worktrees removed after push.

## REVIEW r1 (E93r, sonnet, 26/11) — review/e-pack-c ff373f76 on LIVE 5e013076
PRIORITY #1 CHECK ('e-pack-c'): brief's line read; reviewed against the earlier PASS shas moment-r2 8792f09a / scent-r 5c428bd8 / parking-rank 644ee581.
18 LAWS: re-merge only; no new code, number or wording → laws 1-6/16-18 untouched; 7 (VANPHONG): shots show odds in words (Rất vững / Có cơ), no %; 9 (KIT): every shot UI is kit (option cards, pbtn «Xông làm hương riêng», item panel rows, tabs); 12: Fold 755x1000 + iPad 1180x820 both shot and looked.
(a) delta per re-merge (git diff reviewed-tip vs its old base == git diff re-merge vs LIVE, +/- lines md5 per file): moment: jmoment.js, moment.test.js, moment-shots.js, KIT_REQUESTS.md SAME; scent: jbal2.js, jinv.js, jscent.js, jthaiy.js, scent.test.js SAME; rank: forged.test.mjs SAME. Only differing: assemble.py (list line), assets.json, index.html, sw.js (rebuild products). assemble list diff vs LIVE: +jmoment.js (after jshelf) in a9a3323f, +jscent.js (after jdis) in 99517ded — nothing else. KIT_REQUESTS union (stack vs LIVE) = only the 2 moment blocks (E69 «moment album», E75 «!» overlay). jbal2 stack vs LIVE = only the BAL.scent block (+13).
(b) stack: assemble list = LIVE + jscent.js + jmoment.js, each exactly once, no duplicates; stack diff vs LIVE touches 14 files = union of the three branches, nothing else.
(c) rebuild (bash dev/site/build_site.sh on ff373f76): index.html identical except the CTM_BI build-line label (s/t); committed sw.js V 7409b96287b9 reproduces = sha256(committed index.html with CTM_BI nulled + manifest + committed assets.json + audio/*.json). Fresh rebuild's sw.js/assets.json differ only because assets.json lists the CDN image set (+28 files since commit) → CDN drift, not code.
(d) tests on the stack: forged.test ALL OK; moment.test PASS; scent.test PASS (2 lives); quickcheck ff373f76: open 1471 ms 0 errors, old save loads + plays a buổi (0 errors), time-spill PASS, core gates: ONLY G4 button-crawl «fold · Ô lưu · Lui · close button did not close its layer». Same crawler (node dev/test/button-crawl.js --fast --game <LIVE 5e013076 index.html>) on bare LIVE: PASS 79 · FAIL 1, the identical single row → pre-existing, not a block. (Perf not re-run by the gate because the core gate stops the run; E93 recorded perf PASS on the same sha.)
(e) shots (scratch only, not in git): moment card «Họa sư đang vẽ» Fold + iPad (kit option cards with odds bar + Rất vững/Có cơ, TỐN/ĐƯỢC rows, «!» chip), risk overlay (rows Kèm/Bại present), scent: Tư trang → Hương liệu → «Hộp hương lan» item panel on Fold (kit panel: PHẨM/LOẠI, Tặng / Bán / Tẩm / «Xông làm hương riêng» ĐƯỢC Sắc +1 mỗi tháng · KÈM đốt một hộp mỗi tháng) and the Sắc +1 flash after the pick on iPad. 0 page errors. Parking-rank = worker test only, no UI row exists (nothing to shoot).
NOTES (not blocks): 1) the Hộp hương (hg_*) item tiles/panel show a BLANK picture (no art painted for the 4 scent boxes) → FOR MAIN art seat (Foreman C): 4 item pictures hg_tram/lan/que/mai. 2) The opening card sequence (Rương đồ khuê các / loading card) covers the home on a fresh life — normal, not touched.
VERDICT: **PASS e-pack-c ff373f76** (FF from LIVE 5e013076; ancestor-of-main check: 5e013076 is its ancestor). 0 faults. No code changed; no r1 branch.
