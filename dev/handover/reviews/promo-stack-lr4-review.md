# BIG REVIEW — review/promo-stack-lr4 (Foreman D PROMO-STACK REMERGE) — 27/11 ~03:30Z

PRIORITY #1 CHECK: OD 24/11 ~09:20Z «Kỳ sắc phong theo dịp lễ ok, làm luôn đi» + ~07:00Z đại lễ / quốc tang + 26/11 ~22:45Z «giữ sắc phong theo lễ trong năm như đang có» + ~22:58Z HUD «5/32 tuần» (counts in TUẦN) | main 4cfcda61 had no jpromob (LIVE now 17f23656, still none) | review/* d-stack-lr3 cb398c07 (source), promo-stack-lr4 d713f162 (under review) | claims: worker session_01D3E3NZ4EBSHMcWVkhfsBVX (built it), reviewer = this session (session_01D3E3NacPigdjGR1RRt4q3j), coordinator Foreman D session_01D3E3NYwRePZXPzMMwNfkEq.

Reviewed: d713f162 (= LIVE 4cfcda61 + merge cb398c07 01d5c8ab + d0c47043 tests + 80c628ea law-4 drop + LIVE merges a22cf45d / fa722503).
Final: **0aee038a** = d713f162 + reviewer fix commit + merge of LIVE 17f23656 (FF from LIVE 17f23656; pushed, origin head == 0aee038a).

## VERDICT: PASS → LAND READY review/promo-stack-lr4 0aee038a (FF from LIVE 17f23656)

## Merge audit (method)
- Re-ran the merge with `git merge-tree 4cfcda61 cb398c07` (base 3af7896e): 22 code files + 4 generated conflicted, matching the worker's table.
- Script (token-level): for every line LIVE or D added vs the base, checked that each added token run is in the resolved file (01d5c8ab). Only misses:
  - j1.js ghenUp, j28.js oanCool / ghenCool / oanMonth, j8.js:519 rivalsTurn fade = the ★ decisions #1–#3 (D net-ghen / net-thresholds not taken; LIVE pace-all kept).
  - jtsb.js:148/149, jts.js:340, jky.js:229, j63.js:397 = false alarms (literal → BAL key rewrites; read by hand, both sides there).
- ★ #1–#3 confirmed. LIVE BAL.oanCool {on:1, ghen:{base 1, than 3, pct .03, npc .5, dm}} covers the same pain: NPC-caused jealousy → oán toward the causer × .5 (same as D ghenOanK .5); D's ghenCool k .03 = LIVE ghen.pct .03; her own S.ro cools in LIVE oanCool(…, mine) with C.me. Behaviour lost vs D: (a) her own jealousy v.pg fades a flat −1 a turn (D: by rule); (b) D's oán fade proportional to oán (net.oanCool .10) is replaced by LIVE band ÷ season. Both are LIVE behaviour; any tuning goes into BAL.oanCool (MAIN / owner call, not a merge call). 80c628ea removes BAL.net.ghenOanK / ghenCool / oanCool. grep: no reader left in dev/build or dev/test → no second copy of a number (law 4).
- Semantic clash the token merge DID create (fixed, see below): j28.js oanMonth rollback path (BAL.oanCool.on = 0): base line untouched by LIVE + D changed it to `oanCool(h,h.oan)` (D's 2-arg signature) → with the LIVE `oanCool(w,mine,onlyMine)` it wrote `undefined` into every man / servant oán. Dead while on = 1, but it was a broken rollback.
- No other call of a D-signature oanCool/ghenCool and no BAL.net.ghen*/oanCool reader in the tree.
- LIVE 17f23656 (end-maxrank) merge: 12 source files, disjoint from promo (j32 / jend maxRank, jrank, jk2b …), auto-merged; only CHANGE.txt / index.html / sw.js conflicted → CHANGE = promo line, site rebuilt. assets.json = branch build (+25 D-stack pictures: place-*, act-opt-*, same as d713f162).

## Reviewer fixes (commit on the branch, small)
1. dev/build/j28.js:87 oanMonth rollback: LIVE flat-fade line restored for men / servants (see above).
2. dev/build/jpromob.js:54–57 `pbWkIn(m) = pbWk(m) − S.tuan`: «còn N tuần» counted whole months × 3 from the START of this month, so in trung / hạ tuần it said 1–2 tuần too many (e.g. hạ tuần, kỳ next month → «còn 3 tuần», truly 1). Used at the 4 kỳ countdowns (pbKyRow, pbDl «chờ kỳ», kỳ notice, chip), pbDlNext().w, and the 2 exam-retry texts (jexam cardH, result). pbWk(m) stays the plain span (for the HUD total y). Law 11 family = the worker's own scan table (6 sites); none missed.

## MAIN 167 items
1. pbWk(m) = m × (BAL.cut.tuanDays.length + 1) = 3 tuần / month (j3: 3 tuần per month) — one count, from BAL (law 4). Whole family converted (6 sites); not converted on purpose: quốc tang length, favour cap «24 tháng», promoRuleTxt gap text (rule text, not countdowns) — agreed.
2. j8.js:453 old «Cách lần sắc phong trước N tháng» row only when !pbKyOn(); jexam kitPromoHook gap = 0 when on. Other readers of the row (j34 candOK, j8 seatRivals, j68i rsn6, jexam EX_WAIVE/exBase) only filter it → removing it cannot block anything. NPCs follow the same rows (law 1).
3. pbDlNext(): read-only (no pbSt / pbDlSt; reads S.pb with `||{}`); returns {A,k,name,m,w}. OK.

## Laws
- 1 two-way: promoReqP rows and pbKyRow are the same for her and NPCs. OK.
- 2/3: no new choice sets. OK.
- 4 one core: pbWk from BAL.cut; D BAL.net copies removed; coregates G1 guard/text/khac/bind/textrule/c6 all PASS. Note (non-blocking): jagacts3 dance preview repeats ghenUp's rounding `max(1, round(n × npc))` inline — same number, but a shared helper would be cleaner. Pre-existing typed numbers (not from this branch): j2.js:172 Khiêu khích «ghen +15» / hh −15; j8.js:446 promoGap 3/5/7/9 (rollback only).
- 5: untouched.
- 7 wording: «còn N tuần», «chờ N tuần mới được thi lại» — cổ trang, no %. OK.
- 9–12 kit / devices: no new UI parts; rows / chips are kitChip + promo rows. Videos and shots looked at (frames of both webm + 4 jpg): Fold 755x1000 and iPad 1180x820 Sắc phong panel, «Kỳ tới: Tết Đoan ngọ, còn 6 tuần» (tháng ba thượng tuần → right), no «Cách lần» row, no overflow. Known gap (worker point 3, not this branch's to fix, law 9): the kit §77c HUD chip still says «Kỳ thăng: 2 tháng · Tần» next to «còn 6 tuần» → HUD-SACPHONG / kit keeper: use pbWkIn(kitPromoHook().months) for «còn» and pbWk for the span.
- Co-op: see gates. Old save: PASS.

## Gates on 0aee038a (reviewer runs)
| gate | result |
|---|---|
| promo-build (Fold, SP_OFF set-ups) | 48/48 ok, 0 page errors |
| promo-build WITHOUT SP_OFF (judgement run) | 43/48: the 5 BAD rows are set-up writes that stat-pace paces (S.hh / x.sung jumps → «Hoàng hậu -12», «Sủng 0 (cần 38)»), not rule faults → SP_OFF is a fair set-up (as ag-moodknow); it hides no real break |
| kit-promo-hook | 8/8 ok, 0 errors |
| coop-e2e (live Worker, Fold host + iPad guest) | run 1: 142/143; run 2: **143/143**; LIVE 17f23656: 143/143. Run-1 miss «after rejoin: same world» = R#11/14/16/17 `.evc.902` A undefined / B {} — LIVE jcharge.js:30 chStore creates an empty map on a READ (chHave/chOK → chSync); intermittent, not promo code. Follow-up for MAIN (non-blocking): make chSync not write on read, or drop empty evc maps in the canonical compare |
| quickcheck core gates | all PASS except G4 button-crawl «fold · Ô lưu · Lui · close did not close its layer» = identical on LIVE 17f23656 (crawled LIVE myself) |
| quickcheck part 2 | QUICKCHECK PASS · open 1904 ms · old save ok · perf new/live render 210/224, tab 512/600, buổi 1271/1138 ms, tasks>200 26/27 |
| promo-next-rank | 8 BAD, identical rows on LIVE 17f23656 |
| promo-rules | 26/28, the same 2 FAIL on LIVE (NPC servant exam roll, 844x390 reveal button) |

Videos / shots: https://ctm-img.victoria-tntt.workers.dev/img/_review/promo-stack-lr4/ fold-755x1000.webm, ipad-1180x820.webm, fold-sacphong.jpg, ipad-sacphong.jpg, ipad-stage-hud.jpg, fold-hanhsu.jpg (kept for the land report; the lander wipes the folder after landing: python3 dev/site/cdn_sync.py --wipe-review promo-stack-lr4).

## REMERGE after the verdict (LIVE moved 3 times) → LAND READY e2c5d5ae (FF from LIVE 4cd3f974)
| LIVE | what came in | conflicts | resolution |
|---|---|---|---|
| b16b4b93 + 0b43ee55 | dayq-qsoftlock (jdayq), mg-trim-lr5 (jshelf, jbal2 skip, j5/j79/j83/jdf/…) | built files only | rebuilt; no overlap with promo code; no BAL.net copy back |
| 066d9af0 | parity-facfix-lr5 (j10 facFrOk, jagacts3 p3FacFr) | **j10.js facHTML** (source) | by hand: D line (BAL.btn.fac.k, pvOan) + LIVE facFrOk filter + the two founding-road texts; p3FacFr auto-merged |
| 4cd3f974 | kptitle-close (j74: the «Ô lưu · Lui» button-crawl fault) | built files only | rebuilt |

Gates on e2c5d5ae: promo-build 48/48 · kit-promo-hook 8/8 · fac-parity-play / fac-roads-play / ag-par3 ALL PASS (run on 2883892b; j10 unchanged since) · coop-e2e 143/143 · CORE GATES PASS (button-crawl now green) · QUICKCHECK PASS, old save ok, perf new/live render 256/189, tab 472/427, buổi 1228/966 ms, tasks 28/21 (within the gate; earlier runs of this stack were ≈ live: 210/224, 227/204, 231/208 → run noise).
Co-op note: one coop-e2e run on 2883892b was 139/143 (S.fidUsed maid face picked on the guest, j39 figPick); the same-time run on LIVE 4cd3f974 was 139/143 with another face mismatch (Thái hậu face). Both are intermittent LIVE co-op face faults, not promo code; with the evc one (jcharge.js:30) → MAIN follow-up «co-op face / read-path writes on the guest».

## REMERGE round 3 (LIVE 98c77517 → 611fca61 → 0562e15f) and ROLLOVER HANDOVER (reviewer session_01D3E3NacPigdjGR1RRt4q3j, 27/11 ~09:30Z)
State: review/promo-stack-lr4 = **d79c08b5** (FF from LIVE 0562e15f) — **NOT LAND READY** (open item 1 below). bcab53ba (FF from 611fca61, all promo gates green) is superseded.
Hand resolutions (each followed by a token check over every file both sides changed: no loss except the intended key swap):
- 98c77517 (ob-verdict-3): j63 kaResultCard = LIVE kaSenDeTitle/sen0 line + D kaKnowSince gain push.
- 611fca61 (BUNDLE 1): jstagehere = D act wrapper (actKn/kaWalkKn) + LIVE place-close pcTurn/pcCheck/stayPen (asserted each side only touched its own part); j72 = LIVE q72Pp portraits + D BAL.btn.q72.k; assemble.py union.
- 0562e15f (door-onetap + act-move): j61 / jgift = LIVE lines (+ D wkGainTxt(ev,t)). **LAW 4 one home**: both sides had made the same «khắc of a gift / ask» key — D BAL.btn.give.k / BAL.btn.k61Ask.k (2 / 1) vs LIVE BAL.time.cost.give / .ask (2 / 1). LIVE's key kept; D entries removed from BAL.btn; every D reader (j8, jinv, jrcp, jveil, jwdinv) rewired. assemble.py union (+ jamove/jone/jkpp).
- assets.json = LIVE each time (Foreman D order).
Gates:
- bcab53ba: promo-build 48/48, kit-promo-hook 8/8, place-close ok, actwalk-scan ok, QUICKCHECK PASS (old save ok, perf ≈ live). Core G4 q-softlock 1 FAIL = LIVE 611fca61 also fails it (4 then 1 FAIL); branch re-run PASS.
- d79c08b5: promo-build 48/48, kit-promo-hook 8/8, act-move-reach PASS, act-move-rows-scan PASS, door-onetap PASS. NOT yet run: quickcheck, coop-e2e.
OPEN for the successor:
1. **act-move-reach2 on d79c08b5: FAIL 2 of 3 runs** («hh pop-up miss «Giao việc phòng bị» [data-j70o] on elder Diệp Thanh Hòa @ksp / @tyv»); LIVE 0562e15f: PASS 2 of 2. The scenario is «hh» (she is Quyền Hoàng hậu). The test baselines old card buttons BY NAME (staff tab, j70 pcard wrapper adds «Giao việc phòng bị» to a card whose name is in S.staff and rank Cung nữ/Thái giám) and checks the pop-up of whoever with that name stands on stage. Probe at scenario start: no elder shares an object or a name with S.staff on either build. Next step: during the walk (places × buổi) find whether an elder (elderTabRows, kind "elder") becomes / matches one of her S.staff (a D servant / promotion / srv-rank path at rank 7 — jsvt, jpdist?), i.e. one person in two places (law 6b) or a name clash; or prove it is a test flake (run LIVE 5×).
2. **coop-e2e cannot pass on LIVE since BUNDLE 1 (611fca61)**: LIVE alone and the branch both stop after 28 ok («05-world»), then «Target page, context or browser has been closed» at coop-e2e.js:114 buoiBoth / :68 press, and hang to timeout. Reported to Foreman D for MAIN / LC28.
3. Then quickcheck + coop-e2e on the final sha, push, «LAND READY».
Worktrees left: /home/user/wt/rv-plr4 (branch d79c08b5), /home/user/wt/rv-live (LIVE 0562e15f, built), probe /home/user/wt/rv-tools/probe/elder.js (args: <worktree root>).

## ROUND 4 (successor reviewer session_01D3E3NbMdjyPsvcEGgZBrQ1, 27/11 ~11:30Z) → VERDICT PASS · LAND READY **f85c2c61** (FF from LIVE 00dca386)
PRIORITY #1 CHECK: OD ORDER 165 kỳ sắc phong theo lễ + MAIN 167 HUD-SACPHONG | main 00dca386 (LC29 sx unit) | review/promo-stack-lr4 d79c08b5 → f85c2c61 | claims D promo-stack (Foreman D session_01D3E3NagaVYs8K14c2bMUy1).
KIT CHECK: reuses kitChip / promo rows / kpanel (no UI change this round; merge + gates only).
START_CTX ~4 % (get_session read 0; own estimate).

### LIVE moved 0562e15f → 00dca386 (sx-scope-fix jkc/jkc2 + scope-classb dev/measure + kc-nc-palace test) — merged as f85c2c61
- Conflicts: built files only (index.html, sw.js, CHANGE.txt). CHANGE = promo lines + LIVE line; site rebuilt (build_site.sh); assets.json = LIVE.
- jkc.js / jkc2.js auto-merged (D changed jkc kcMapHTML `BAL.walk.near`; LIVE changed the kc card closures — disjoint hunks). Line check: every line LIVE or D added since 0562e15f is present in the result (0 missing, both files, both sides).
- LAW 4 re-verify (round-3 key swap): `git grep 'btn\.give|k61Ask\.k|BAL\.btn\.k61Ask'` in dev/build + dev/test = no reader left; every caller reads BAL.time.cost.give / .ask.

### Open item 1 (act-move-reach2 «Giao việc phòng bị» on elder Diệp Thanh Hòa) = LIVE fault, NOT promo
Runs: LIVE 0562e15f 2 FAIL / 3 this round (@tyv, @tgk) + 2 PASS / 2 last round = 2/5 FAIL; branch 1 FAIL / 2 this round (@nvp) + 2/3 last round = 3/5 FAIL. Same single miss, same person, both sides.
Root cause (probe /home/user/wt/rv-tools/elder.js + elder2.js, both builds): in scenario hh (rank 7) the Khôn Ninh elder ma ma (eid "kn", Diệp Thanh Hòa, call «Diệp ma ma») is IN S.staff on both builds. At home she stands as kind "serv" (jhouse hsvPerson → hsvActs has «Giao việc phòng bị»); away from home the roster (j95.js:629 `if(s.eid)return j95elderEntry(s)` — eid checked BEFORE the S.staff → hsvPerson branch) puts the SAME person on stage as kind "elder", whose pop-up has no household acts. The test checks each name only at its FIRST sighting (`seen`), so it fails exactly when the random walk meets her away from home before home. Not a flake, not promo code; identical on LIVE.
MAIN follow-up (law 6b one person one card + law 11 family = every elder who joined her household): either j95.js:629 test `(S.staff||[]).includes(s)&&hsvOn()` before `s.eid`, or jhouse talkOpts wrapper add hsvActs(p.ref) for kind "elder" when p.ref ∈ S.staff (keeping the elder's own office acts). Design call → not made in this merge.

### Gates on f85c2c61
| gate | result |
|---|---|
| promo-build | 48/48 ok, errors none, old save (no S.pb) loads |
| kit-promo-hook | 8/8 ok, errors none |
| kc-roads/scope-cards (new LIVE test) | refErrors [] · pageErrors [] |
| scope-scan --strict | 194 class-B names, 0 unexplained |
| quickcheck core gates | G1 guard/text/khac/bind/textrule/c6 PASS · G4 coop-one-world PASS ×2, manifest, npc-purpose, dead-card, button-crawl (0 faults), look-dedupe, press-keep, q-softlock, next-dead PASS · time-spill PASS · **G4 80-dialog-fixed 2 FAIL = LIVE**: same test on LIVE 00dca386 = 5 FAIL (superset: «3-dai-ket-cuc» frame XL figure size + seal, plus «2-hoi-nga-re-2 dialog open null»); branch 3 FAIL on a re-run, all in the 3-dai-ket-cuc family |
| quickcheck part 2 | QUICKCHECK PASS · open 2423 ms · old save ok · perf median new/live: render 285/272, tab 614/580, buổi 2391/1765, tasks>200 31/39 (box loaded by parallel coop runs; within the gate) |
| coop-e2e | **= LIVE**: LIVE 00dca386 stops after 28 ok («05-world … no horizontal overflow»), then hangs to the timeout, «Target page, context or browser has been closed» at coop-e2e.js:290 (exit 124); branch f85c2c61: SAME — 28 ok, same step, same line :290, exit 124. Logs: scratch coop-live.log / coop-br.log (this session). LIVE fault since BUNDLE 1 (already with Foreman D → MAIN / LC28) |

### VERDICT: PASS → LAND READY review/promo-stack-lr4 **f85c2c61** (FF from LIVE 00dca386)
Laws: 1 / 4 (key swap re-verified) / 7 / 9–12 unchanged from round 1 (no new UI, no new number). Remaining reds are all = LIVE (reach2 elder card, dialog-fixed 3-dai-ket-cuc, coop-e2e hang).
If LIVE moves again before landing: merge the same way (token / line check on every shared source file), re-run promo-build + kit-promo-hook + quickcheck.

## ROUND 5 (same reviewer, 27/11 ~14:30Z): LIVE moved 3× more → VERDICT PASS · LAND READY **c8b6b67e** (FF from LIVE d9ca7892) — supersedes f85c2c61
| LIVE | merged as | hand resolution | gates |
|---|---|---|---|
| f28d28b9 (lc29-ui bundle + kc-odds-chip-r3) | 9126e74f | jkc kcMapHTML = D «tốn: ${BAL.walk.near} khắc» (law 4; LIVE still typed «1 khắc») + LIVE law-6 `mineK` road places; assemble.py = union (D jpromob/jpdist/jtperc/jsvt + LIVE jplink; both orders kept) | promo-build 48/48 · kit-promo-hook 8/8 · scope-scan 195/0 · kc scope-cards clean · QUICKCHECK PASS (all core gates incl. dialog-fixed green) |
| 5cee92bb (lc30-kg82: j82 kg82ShowRes) | 9d016bc7 | built files + CHANGE only (branch does not touch j82) | promo-build 48/48 · kit-promo-hook 8/8 · kg82-phase-scan 15/0 · kg82-phase 1/7 FAIL «pixi really loaded» = LIVE 5cee92bb (same 1/7; Pixi does not load here) · QUICKCHECK PASS |
| d9ca7892 (lc30-b2: help-housemate + srv-rank + selx-fair) | **c8b6b67e** | j9 topicOpts = D pvQuy previews (Nhún nhường / Giúp đỡ nàng) + LIVE same-house filter (+«Nhờ giúp đỡ»); BAL.audit (removed by LIVE): no reader left; BAL.srvLoyal / srvCap single home | promo-build 48/48 · kit-promo-hook 8/8 · help-housemate ALL PASS · srv-rank 16/16 (incl. LIVE old save) · QUICKCHECK run 1 FAIL (G4 q-softlock 1 «view parked by a tab change» + one longTaskMax spike 4283 ms), run 2 **PASS** (all core gates PASS, old save ok, perf new/live render 306/275, tab 513/632, buổi 2026/1912, tasks 41/35) → q-softlock = the known intermittent (it failed on LIVE 611fca61 too, round 3) |
Every round: line check on every file both sides changed = 0 missing; CHANGE = union; site rebuilt; assets.json = LIVE. Open = LIVE items unchanged (reach2 elder card j95:629, coop-e2e hang after 28 ok).

## ROUND 6 (same reviewer, 27/11 ~18:30Z): LIVE d9ca7892 → 772bee4f (lc31-goal: goal-links + coop-clear) → VERDICT PASS · LAND READY **747a4787** (FF from LIVE 772bee4f) — supersedes c8b6b67e
- Merge: assemble.py = union (D jpromob/jpdist/jtperc/jsvt + LIVE jglink; both orders kept); CHANGE.txt = LIVE (Foreman D order: the lander adds the promo line); jinv / jpet auto-merged, line check 0 missing; site rebuilt; assets.json = LIVE.
- promo-build: run 1 47/48 («Hoàng hậu đề cử once + maxTo + new queen — cut 70 (Kiêu ngạo) BAD: not granted»), re-runs 48/48 ×2 → a one-off roll in that row's set-up. kit-promo-hook 8/8 · help-housemate ALL PASS · srv-rank 16/16 (LIVE old save).
- QUICKCHECK: part 2 PASS (open 2006 ms, old save ok, perf new/live render 268/238, tab 426/395, buổi 1420/1352, tasks 24/23). Core gates: all PASS except G4 q-softlock («view parked by a tab change → card on court», fold + ipad) under quickcheck load. Standalone q-softlock: branch 2/2 PASS, LIVE 772bee4f 2/2 PASS. The same gate failed on LIVE 611fca61 under quickcheck in round 3 → intermittent under load, not promo.
- coop-e2e (coop-clear now on LIVE): branch 747a4787 = 134 ok · 1 FAIL «after rejoin: same world» (R#25/26/30 .evc.902 A undefined / B {} = the LIVE jcharge.js read-path write seen in round 1), then a hang in a later week (coop-e2e.js:396), exit 124. LIVE 772bee4f = 73 ok · 0 FAIL, then a hang in week 3 (coop-e2e.js:290 buoiBoth), exit 124. → **= LIVE (LIVE stops earlier)**; coop-clear does not yet make coop-e2e finish on LIVE → MAIN / RV-173 follow-up. Logs: scratch coop-br2.log / coop-live2.log.
- Open LIVE items unchanged: reach2 elder card (j95.js:629), coop-e2e hang, jcharge evc read-write.

## ROUND 7 (same reviewer, 27/11 ~22:05Z): LIVE 772bee4f → bd47c753 (save-fix-stack rv26) merged as **1ef034be** (FF from bd47c753, pushed) — NOT LAND READY yet · ROLLOVER HANDOVER
Merge: 15 source files conflicted. 17 hunks token-merged (disjoint edits on one line; tool /home/user/wt/rv-tools/tokmerge.py, conservative: any touching edit = conflict). 3 by hand:
- j24 approach gift: D giftHand line kept (law 6c).
- jemoact: LIVE eaHitMineCard (rcpReg generator) + D's pvOan preview moved into it.
- jts: D `gl=tsLeGifts(G,S)` + LIVE tsLeMeCard (rcpReg) + D's two pvQuy previews moved into it.
LAW 11: LIVE's dev/test/inv-stack-scan.py found 2 raw `.inv.push` in D's jmind giftHand → `--fix` → invAdd (RAW 0). assemble.py = union (+ LIVE jstack). CHANGE = LIVE (lander adds the promo line). Line check: misses only on lines both sides edited (token-merged) or hand-moved into the generators. j8 LIVE `invAdd(p,{k,from:"th"})` present.
Gates on 1ef034be:
| gate | branch | LIVE bd47c753 |
|---|---|---|
| kit-promo-hook | 8/8 | – |
| promo-build | 47/48 run 1 (HH đề cử «not granted»), 48/48 × 15 re-runs (12 instrumented: set-up always reaches the cut; pbTry is deterministic → fresh() random-life set-up miss, 2 in ~17 runs since 772bee4f) | – |
| help-housemate / srv-rank | ALL PASS / 16/16 | – |
| save-unseen-lists | 32/32 | 32/32 |
| save-rewind (needs commit 8ae99226, fetched --depth=1) | 4/4 | 4/4 |
| inv-stack | 25/27 (DOM Dâng quà 2319 / Biếu quà 2790 > 2000) | identical 25/27 |
| quickcheck part 2 | PASS (old save ok, perf ≈ live) | PASS |
| core gates | all PASS except G4 q-softlock | all PASS except G4 next-dead (this run) |
| **q-softlock under equal parallel load** | **2/4 PASS** (FAIL «view parked by a tab change» foc="" i.e. the person-view layer .kfoc is GONE, not hidden, after the tab tap; card itself shows; + 3 other ipad rows once) | **4/4 PASS** |
| q-softlock alone | 2/2 PASS (round 6) | 2/2 |
| coop-e2e | 82 ok · 1 FAIL «after week 2 same world» (66 diffs: S.emp.met, S.wxDay.sk, staff loyal/tin/suc), stop :292 | 131 ok · 4 FAIL incl. the same «after week 2 same world» (114 diffs, same family) → = LIVE |
OPEN for the successor (the one blocker):
1. **q-softlock on the branch under load (2/4 vs LIVE 4/4)** — find why the person view layer is removed (not parked by jdfv dfTabLayers) after a tab change on the branch. No D-added line touches .kfoc / DF.F (grep of the D diff). Next: run `node dev/test/q-softlock.js <wt>/index.html` 4 parallel per side again; if the branch stays worse, bisect D's render/tab wrappers (renderPanel / render / showModal wrappers added by D files jpromob, jpdist, jtperc, jsvt, j8 promo rows) — or prove load flake with ≥8 runs each side. Then quickcheck, push, LAND READY, tell Foreman D (session_01D3E3NYmw9Zcix4ZdKH48EG) + rank-pace rv NX4yGtbq (restacks on the final sha).
2. If LIVE moves again: same method (token merge tool + inv-stack-scan + line check).
Worktrees (container-local): /home/user/wt/rv-plr4 (branch 1ef034be, built), /home/user/wt/rv-live (LIVE bd47c753, built), /home/user/wt/rv-ho (handover), /home/user/wt/rv-tools (elder.js / elder2.js probes, tokmerge.py).
Rollover (verbatim canon): "Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop." "Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker)."
This session: START_CTX ~4 %, now 33 % → rolled over (worker rule: coordinator opens the successor).
