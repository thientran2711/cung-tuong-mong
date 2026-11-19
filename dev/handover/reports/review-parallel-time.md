# REVIEW parallel-time BIG (opus, session_01964izBqmsKFQ8vM26c8CnQ) · coordinator Foreman D #3
START_CTX ≈ 4% of 1M (get_session reads 0; own estimate); finished well under the rollover line, so no handover.
PRIORITY #1 CHECK ('parallel-time' / 'Giúp qua loa' / '«tin» panel'): OD L1876, L1905–L1915 read verbatim | main: BAL.road.hp (L1876 4 answers, half 20, kw labels) jbal2 ~L398–426; no jerr on main | review/*: review/parallel-time f4eb517a5 (under review), review/errand-scene f6b89cbcd (MAIN's jerr.js «tin» panel, registers kitStatusIcon "tin") | claims: D row (this job).
18 LAWS checked: 1 FAIL (NPC sent-servant deeds) · 2/4 FAIL (qua loa shown≠charged; two qua-loa numbers) · 3 minor (receiver gain row) · 6b ok (ledger) · 7 ok · 9 FAIL (panel) · 11 FAIL (scan) · 15 ok.

## VERDICT: FAIL 7 @f4eb517a5 (review/parallel-time HEAD; the brief named 0306b8ed6, so r3d is included)

1. **«tin» panel (MAIN ~21:58Z order + KIT).** jptime `ptIcon`/`ptPanel` registers its own kitStatusIcon "tin" panel, and the `render` wrapper re-registers it on EVERY render. When errand-scene lands it will overwrite MAIN's jerr.js `errIcon` panel. On this build the panel body (`h`: reports, "X đang … về khắc K", deadline lines) is NOT drawn. Shots fold-3 / ipad-3 show an empty panel with an unrelated figure (Chưởng sự cô cô Hà Tú Dung) and no «Đợi tin», even though a maid is away. On fold-5 the deadline text sits in the green ĐƯỢC row. Fix: no own panel. Keep the PTIME reader API only (register "tin" only when jerr/errIcon is absent, and never re-register on render). **FOR MAIN:** jerr's panel must list `PTIME.orders()` + `ordWhen()` + `answer()`; today it lists only S.away, so orders to her (maid road) would be reachable only by kitLine and would expire as «Từ chối».
2. **One core (law 4): two numbers for «Giúp qua loa».** `BAL.ptime.half = 15` (new) vs the existing L1876 core `BAL.road.hp.half = 20` (jbal2, same rule «giúp qua loa = odds − half»). Use one key. Also drop the typed fallbacks `||15` (j9 ordHalf, j42 PEND.cnvOrd) and `||2` (jptime ansK).
3. **Qua loa shown ≠ charged (laws 2/4).** The receiver card shows `tốn: n−1 = 1 khắc (cả đường đi)`, but `ptRecvGo` charges the walk `travel()` = BAL.walk.far 2 for far places. Probe: Việc chủ sai to vuon, Giúp qua loa used 0→2. The same path serves the cnvOrd half. Qua loa then loses its only advantage. Also, when the rest can't be paid, `ptRecvGo` sets `used=` directly and bypasses `spend` (no ptTick, no spill). Fix: n / half-n must cover the walk (or show the real total), and pay via spend.
4. **Two-way (law 1): NPC deeds done by a SENT servant are still instant.** j28 scheme loop / j40 mindRun / j70 / jtruth npcFrame / jtsb call `runAct(v,t,k)` when not together, and `bestSent(v)` goes with no S.away entry and no due khắc. Her same deed (kind harm) = 1 khắc + chờ 2 + servant locked. Only cx2:maidSpy, cx3:invite2 and giftin were converted. In the same family, an NPC's maid who is away (mm:<vid>) is still used by her other deeds (only re-send of the same deed is blocked).
5. **Whole-group scan (law 11) is stale and blind.** ptime-scan.py still classes Truyền thái y / Mời thái y bắt mạch / Truyền ${m.rw} / jstip đi đòi / jveil / jmkt as OPEN (all converted), Việc chủ sai as «Đi» frame, and Nhờ thái giám mua đồ as FACE (converted). It is label-only and never checks that a PARALLEL label really calls ptSend. The file-wide STORY bucket (jroute/jthaiy/jrcp …) auto-passes any new send label in those files. It does not cover NPC senders (item 4) or her «Mua chuộc» / «Cài người hầu vào cung» (j10 plantsv). `BAL.ptime.kinds.bribe` is a dead row claiming those are converted. Planted test: a new `pbtn("Sai cung nữ đưa thư cho Hoàng hậu")` in j21 → exit 1 (good).
6. **Receiver dò la «Giúp hết lòng» row omits her own gain.** The deed gives công lao `srvMerit(BAL.eff.j42.srvDoOrder_2)`, but the row shows only the master's evidence (shown ≠ applied, law 3 display).
7. **Shots:** fold-1 sender card is covered by a random notice («Nội vụ phủ điều người»). The shot script must clear Q / notices before each shot (also fold-3 / ipad-3, see 1). Re-take all 7×2 after fixes and look at each 3×.

Accepted / notes (not FAIL): labels match L1876 + the existing BAL.road.hp.kw (Giúp hết lòng / Giúp qua loa / Từ chối / Mách lẻo). Việc chủ sai with 3 answers is justified (owner's 4th = "đi mét với kẻ trên"; nothing to tell). No double charge on plant/gift (1 khắc each, probe). The «Đợi tin» jump is exact (test). Sender dò la loss Lòng −5 = receiver Chủ tin −5 (hoảng sợ), the same constant; the sender's oán is shown as a pvOan range vs the receiver's +5 (same BAL value). Minor: jmkt x "chờ 2 khắc ·  · thành" (empty segment). Unread reports of hers are never pruned from S.away (cap it). j54/j55 family routes are still OPEN (D's ruling).

## Gates run on f4eb517a5 (all green; the FAIL is design/one-core, not a test break)
- ptime.test.js ALL OK · ptime2.test.js ALL OK. Mutation (land 1 khắc early: `a.due<=now+1`) → ptime2 FAIL 13/15, ptime.test exit 1 (crash, no clean FAIL line: suggest a try/catch to print FAIL).
- ag-stf2 **25/25 PASS**: the worker's 1-in-5 FAIL was not reproduced (sampling flake, not caused by this branch as far as seen).
- quickcheck --runs 6 PASS (core gates, time-spill, old save loads, perf new ≤ live: render 197/216 ms, buổi 924/1077 ms) · coop-e2e 63/63 · coop-one-world PASS · coop-bot 6 weeks: 0 divergence, 0 page errors.
- Shots: ptime-shots.js Fold 755x1000@2 + iPad 1180x820@2, 14 shots (scratch, not in git; deleted). Looked at Fold 1, 3, 5, 6, 7 and iPad 3.
- No FF merge done (FAIL). No commits on review/parallel-time-rv.

---
## HANDOVER (reviewer #1 → successor; ROUND 4 RE-CHECK not started)
Rolled over at 36% context (358k of 1M; START_CTX 4% + 25% = 29%). The RE-CHECK was ordered by D #4 (session_01964izFYnHRysp6EvC5M7YK) at 00:02Z on 19/11: PARALLEL-TIME #4 is SẴN SÀNG KIỂM **c9e7a7f99** on review/parallel-time (origin/main 9a1d6922 merged); the worker's ROUND 4 is in reports/parallel-time.md. MAIN = ROOT-60 session_01Rc5AsMTMePisU9AmwCgz6i.
What the successor does (D #4's order, verbatim scope):
- Re-verify all 7 FAIL items above plus the minors (jmkt empty segment, cap on unread S.away, ptime.test crash → clean FAIL line).
- BIG gates: ptime + ptime2; scan + planted tests; ag-stf2; quickcheck --runs 6; coop-e2e 63/63; coop-one-world; coop-bot after the last main merge; role-parity.test. Also check the receiver-choice ptOrdAdd API is unchanged.
- Look at the Fold + iPad shots 3×. The worker notes a kitLine pill can cover the KẾT QUẢ toast (fold shot 2); decide whether that is this branch's fault or a KIT note.
- PASS → final-merge CURRENT origin/main, rebuild (assemble.py + build_site.sh), quickcheck again, push the verdict sha to review/parallel-time-rv, write a "LAND READY <sha>" line in FOREMAN_D_STATUS (FOR MAIN ROOT-60) and tell D #4. FAIL → list to D #4.
Recipes that worked (round 1):
- Worktree: `flock /home/user/wt/fetch.lock git fetch --depth=60 origin review/parallel-time:refs/remotes/origin/review/parallel-time main:refs/remotes/origin/main`, then `git worktree add /home/user/wt/ptrv -b review/parallel-time-rv origin/review/parallel-time` + sparse-checkout; `python3 dev/build/assemble.py` before the tests (tests read dev/index.html).
- ag-stf2 is fast (~13 s/run): loop 5–25 runs.
- Item 3 probe: maid road `srvInit()`, `toB0`, set `S.srv.err={k:"vuon",n:"x",v:null}`, `S.place="home"`, `Q.length=0`, `ptErrCard().o[1].go()`, then compare `used` with the card's "tốn" (far walk = BAL.walk.far 2).
- Item 1: open the 信 panel in shots and check the body (reports, away rows, «Đợi tin») is drawn, and that only ONE "tin" registration exists once errand-scene is on main (grep `kitStatusIcon.set("tin"`).
- Item 4: grep the `runAct(v,t,k)` callers (j28/j40/j70/jtruth/jtsb). An NPC deed by a sent servant must create an S.away entry and land at due.
- Scan planted test: append `function ptPlantTest(){return pbtn(\`data-x="1"\`,"Sai cung nữ đưa thư cho Hoàng hậu","tốn: 1 khắc","")}` to j21.js → the scan must exit 1; restore after.
- Mutation: change `!a.back&&a.due<=now)` to `now+1` in jptime → ptime and ptime2 must FAIL.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

---
# ROUND 4 RE-CHECK — REVIEW parallel-time #2 BIG (opus, session_01964izGNmoHXia5rt1oB2wk) · coordinator Foreman D #4
START_CTX ≈ 5% of 1M (get_session reads 0; own estimate) → rollover line 30%; finished below it, no handover.
PRIORITY #1 CHECK ('parallel time'): OD 1 | ledger 0 | claims 3 (= this job) | main 0 | review/* review/parallel-time c9e7a7f99 (under review), review/receiver-choice 28ebffad8 (jrcv → ptOrdAdd/ptOn), review/errand-scene f6d1f3f4 (MAIN jerr "tin").
18 LAWS checked: 1 ok (NPC sent-servant deeds now go through S.away, §18) · 2/3 FAIL (new item 1: an order answer that costs nothing and does nothing; item 2: a 0-khắc «Giúp qua loa») · 4 ok (one qua-loa key BAL.road.hp.half, no typed fallbacks; jagstf2 `K.half||0` is a missing-weight default, not a number) · 6b ok · 7 ok · 9 ok (no own panel when errIcon exists; kit facts spec) · 11 ok (scan with proofs) · 15 ok.

## VERDICT: FAIL 4 @c9e7a7f99

1. **Master's order to another palace is a free escape (laws 2/3; the core receiver path).** The cnvOrd wire (jptime ~L266) runs «Giúp hết lòng» / «Giúp qua loa» through `ptRecvGo(pl,…)` → `srvGoTo(pl)`. j42 `placeEnterHook` refuses a maid at another consort's palace unless `S.srv.sent` (or accHas) says the master sent her, and the cnvOrd path never sets it. Probe (real flow: `pushDil(mkP("cnvOrd",{k:"spy",…}))` → notice → `ptOrdOpen` → option 0): 3/3 targets (kn, r392, r393) → toast «Càn Ninh cung: chỉ khi chủ sai» / «…: cung khác: chỉ khi chủ sai», `S.ordQ` 1→0 (order used up), used +0, Chủ tin ±0, no deed. With the walk refused, «Giúp hết lòng» costs nothing and does nothing, so it beats «Từ chối» (which costs Chủ tin). The same holds for plant / poison (spy and plant probed: charged 0 at kn, r53). Fix: before the walk, mark the trip as the master's errand (the way ptErrGo sets `S.srv.sent={k:pl,…}`). If the walk still fails, keep the order in S.ordQ (as ptErrGo does with `er.acc=0`) instead of consuming it. Test gap: ptime.test 10 only reads the card text (`cnN`/`cnx`) and never clicks a cnvOrd answer. Add a click test: answer to another palace → used == shown, deed ran (log / evidence), order gone only after.
2. **«Giúp qua loa» can cost 0 khắc (law 3: time is the cost).** `ptRecvTask = n − BAL.walk.near − 1` with walk 0 (the master's own palace, or where she already stands) gives the card «tốn: 0 khắc (cả đường đi)». The charge is also 0. Probed: errand at home 1/0; dò la / plant on a consort in the master's own palace (r52) 1/0. The round-4 report's "near: 2 / 1" is not true at walk 0. Fix: floor the task at a BAL minimum (1 khắc) so every answer that does the deed costs time (shown = charged still).
3. **role-parity.test FAILS on this branch (3/3 runs) and PASSES on origin/main 9a1d6922:** new gap `maid:P-ONLY:maid:pil`. In the scan the player's «Lén giữ đồ Nội vụ phủ phát» now shows (j42 L220, `eitPilMaidOk`: needs Chủ tin < BAL.eit.pil.loyal 45). Likely cause: this branch's order expiry (unanswered order past ansK = «Từ chối» with its Chủ tin cost) or the receiver walk changes her state during the scan. Please verify the cause. The NPC side of pilfering exists (eitPilNpc, monthly), so close it the right way: map the NPC side in role-parity-scan, or add an exempt row with its reason, approved by a reviewer. The gate must be green on the branch.
4. **MAIN ROOT-60 order (STATUS ~00:30Z, ONE NOTICE SYSTEM, owner OD 18/11 ~22:10Z):** jptime's own landing kitLine («đã về: có tin báo» etc.) → `window.kitNotice({id,line,text,go,goLabel})` (review/stage-here r4; guard typeof, fallback kitLine). This also settles the shot note below.

## Re-check of the 7 FAIL items @f4eb517a5 → all fixed
1 «tin» panel ✔: `ptIconReg` registers once at boot, never when `errIcon` exists, no render hook. One `kitStatusIcon.set("tin"` in jptime. The fallback panel draws its body (fold-3 / ipad-3: reports, away rows, oán rows, subject = the maid). FAIL7-1 test ok.
2 one core ✔: BAL.ptime.half gone. j9 / j42 / jptime / jagstf2 / jroad read BAL.road.hp.half. No `||15` / `||2`.
3 shown = charged ✔ for «Việc chủ sai» (probe vuon/nvp 3/3 and 2/2, home 1/1 and 0/0). Paid via srvGoTo + spend. But see new items 1 and 2.
4 two-way ✔ (code read): runAct / mindRun / exec70 wrapped (`ptNpcSent`: NPC actor, not together, not ACT_NOSEND, PT.landing guard). Same servant at due (PT.sv). An NPC maid who is away is locked for AGRUN maid deeds / sendMaid / amSendQ. ptime2 18 ok.
5 scan ✔: exit 0 clean. Planted: new pbtn in j21 → exit 1 («?» row); new send label in jroute (a story file) → exit 1; new `bestSent(` site in j28 → exit 1.
6 receiver gain ✔: `srvOrdMerit()` is the one reader of BAL.eff.j42.srvDoOrder_2, printed «ngươi công lao +1» on the dò la / plant rows.
7 shots ✔: clean() works (no stray notice on fold-1).
Minors ✔: jmkt empty segment gone (ptX); BAL.ptime.repMax 8; ptime.test prints FAIL lines on mutation.

## Gates @c9e7a7f99
- ptime.test ALL OK · ptime2.test ALL OK. Mutation `a.due<=now+1` → ptime FAIL, ptime2 FAIL 13 + 15 (exit 1). Restored.
- ptime-scan exit 0 + 3 planted exits 1 (above).
- ag-stf2 5/5 runs, 23/23 PASS each.
- quickcheck --runs 6 PASS (core gates incl. one-core-guard / rules-one-source / kit-conform / coop-one-world, time-spill, old save loads, perf median new/live: render 178/174, tab 331/347, buổi 1038/1124 ms).
- coop-e2e 63/63 · coop-one-world PASS · coop-bot 6 weeks: 0 divergence, 0 friend-position mismatches, 0 page errors.
- role-parity.test **FAIL** (item 3); main PASS.
- receiver-choice API unchanged: jrcv @28ebffad8 uses only `ptOrdAdd(pid,pp,title,p)` + `ptOn()`, both present with the same signature.
- Shots (ptime-shots.js after build_site; scratch only, deleted): Fold 755x1000@2 + iPad 1180x820@2. Looked at fold 1/2/3/5/6/7 and ipad 3/6. Shot note: on fold-2 the kitLine pill («Cung nữ Nhã Thanh đã đi nghe ngóng, về khắc 4») covers the KẾT QUẢ toast. Both are kit notices fired by this branch's send at the same moment. The overlap itself is a kit stacking issue (KIT note), and item 4 (kitNotice) removes this branch's pill.
- No FF merge, no commit on review/parallel-time-rv (FAIL).

---
# ROUND 5 RE-CHECK — REVIEW parallel-time #2 (session_01964izGNmoHXia5rt1oB2wk) · coordinator Foreman D #6 session_01964izFp9G3AD7T7VsRFoFn
SSK 7e654611a (fixer #5). Verdict so far: ALL 4 FAIL items FIXED; every gate green on the merged build. NOT yet LAND READY, because origin/main moved again (fd6118cd) after my last final merge and I hit the rollover line (43% context; START_CTX 5% + 25% = 30%).

## Work branch review/parallel-time-rv @712c6415 (pushed)
= 7e654611a + final merges of origin/main 1cf5e8bb (28184038), c12a5878 (e243a26a), f43a2ba6 (cef906ee); only the generated index.html/sw.js conflicted each time (rebuilt with assemble.py + build_site.sh) + 2 reviewer commits:
- 61990be5 ptime.test de-flake: test 3 counted ANY queued modal (a random world event can queue while time passes) → now counts only a modal naming this send's person; test 11 failed when the target had moved into her master's palace (the walk then correctly reads "home") → accepts that. Before: 2 FAIL in 5 runs; after: 6/6 OK; mutation `a.due<=now+1` still FAILs.
- 712c6415 small fix (law 3, owner "never Tốn: không"): the «Đợi tin» option text «tốn: ngồi chờ đến khắc K» was read by the kit as «Tốn: không» (seen on fold-3; also on e243a26a, so this branch's text, not main) → «tốn: N khắc (ngồi chờ đến khắc K)», N = K − now, the exact jump ptWait makes. Checked rendered: «TỐN 2 khắc (ngồi chờ đến khắc 3)».

## FAIL 4 re-check (all fixed)
1 cnvOrd to another palace ✔: the order is her pass (accGrant before srvGoTo), so she walks there. Real-flow probe, 3 targets × spy/plant/poison × hết lòng/qua loa: used = shown each time (kn 3/2, r2 2/1, r23 2/1), deed ran, order gone. A refused walk keeps the order (ptime.test 11, used 0, same deadline, no pass left).
2 no 0-khắc ✔: BAL.ptime.taskMin 1. Same-palace dò la/plant 2/1, errand home 2/1, vuon/nvp 3/2, all shown = charged.
3 role-parity ✔: maid:pil mapped BY RULE in role-parity-scan (probes the real paths eitPilMaidOk / eitPilWho with the same lòng states, as she is and 10). Exempt/open json unchanged vs main. I accept the mapping over an exempt row. Uncapped compare (my rpfull script, all fresh gaps): main 100 = branch 100, branch-only 0, pageErr 0, maid:pil SAME. Re-run on 1cf5e8bb, c12a5878 and f43a2ba6: identical each time.
4 kitNotice ✔: every jptime notice goes through `ptNote` → window.kitNotice (guarded; the only kitLine is the fallback). Fold-2 shot: the pill is in the top chip and no longer covers KẾT QUẢ.

## Gates (on the merged builds; last full set on cef906ee + 712c6415)
- quickcheck --runs 6 PASS on 28184038, e243a26a, cef906ee, 712c6415 (core gates incl. one-core-guard / kit-conform / coop-one-world, time-spill, old save, perf ≈ live).
- ptime.test: 8/8 OK on 712c6415 after a single FAIL of test 4 (1 of 11 runs: wait loop stopped 1 khắc short, {"wb":[0,1,0],"due":20,"now":19}). The test's own comment: a modal popping on the way stops the jump. Rare harness flake from a random event. ptime2 ALL OK. Scan exit 0; planted pbtn (j21) and new bestSent( site (j28) → exit 1.
- ag-stf2 5×23/23 + 23/23 on cef906ee · coop-e2e 63/63 (28184038, e243a26a, cef906ee).
- coop-bot 6 weeks, branch vs main (main fails on its own, D #5): 0 diverged weeks both; friend-position mismatches branch 9 / 16 vs main 27; page errors 0.
- main's new opt-loss-ton + odds-meter-back on cef906ee: PASS at 755x1000 + 1180x820 (pass a file:// URL; a bare path crashes them).
- Shots Fold 755x1000@2 + iPad 1180x820@2 (ptime-shots, scratch only, deleted). Looked at fold 2/3/6/7, ipad 1/3/6. Note FOR MAIN (not this branch: jroad/kit unchanged here): the low-Tâm-cơ hint layer now labels its row ĐƯỢC and repeats the cost there («ĐƯỢC ba khắc (cả đường đi), nắm thêm…»), and «Từ chối» reads «TỐN bị phạt quỳ… · ĐƯỢC chẳng được gì».

## HANDOVER (successor = REVIEW parallel-time #3; only the final step is left)
1. Worktree: `flock /home/user/wt/fetch.lock git fetch --depth=60 origin review/parallel-time-rv main` → `git worktree add /home/user/wt/ptrv -B review/parallel-time-rv origin/review/parallel-time-rv` (sparse, as in recipes above).
2. Merge CURRENT origin/main (was fd6118cd at 04:56Z). If only index.html/sw.js conflict: `git checkout --theirs index.html sw.js && python3 dev/build/assemble.py && bash dev/site/build_site.sh`, add, commit.
3. Gates on the commit, ONE AT A TIME. Never run tests while quickcheck runs: its coregates writes `_aa.html` + index.html in the worktree. quickcheck --runs 6; ptime.test ×3 + ptime2; ptime-scan; ag-stf2; coop-e2e; role-parity uncapped compare vs main (no branch-only gap); if main touched UI options, opt-loss-ton + odds-meter-back with file:// URLs; shots fold-3 + fold-6 3×.
4. All green → push review/parallel-time-rv, write «LAND READY review/parallel-time-rv <sha>» (FOR MAIN ROOT-63 session_01Rc5AsN8fHJWShQ7rSPxjx5) in FOREMAN_D_STATUS + verdict here, send_message Foreman D (latest PICKUP line). Mention the 2 reviewer commits (61990be5 test de-flake, 712c6415 «Đợi tin» Tốn).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

---
# FINAL STEP — REVIEW parallel-time #3 (session_01964izEbYgo6vZ2a7fvL3ok, depth 7, START_CTX ≈5 % of 1M → rollover 30 %) · coordinator Foreman D #6
PRIORITY #1 CHECK: OD/ledger — parallel-time + errand-scene rounds read in this report and reports/errand-scene.md + review-errand-scene.md | main 56e0ec51 (errand-scene jerr.js LIVE) | review/parallel-time-rv @712c6415 | claims: D #6 STATUS 05:15Z (this seat).
## VERDICT: NOT LAND READY — FAIL 1 (integration with LIVE errand-scene), branch pushed review/parallel-time-rv @6f69471f
Work done on review/parallel-time-rv (pushed):
- d6fc0f7d final-merge main 7fb7c104 (assemble list: keep jptime.js + main's jgedata_w2/jfigx). Gates all green on it: quickcheck --runs 6 PASS (render 170/199, tab 372/380, buổi 929/1040 ms, old save ok, core gates) · ptime 6/6 after de-flake · ptime2 ALL OK · scan exit 0 · ag-stf2 3×23/23 · coop-e2e 68/68 · role-parity uncapped compare main vs branch: 119 = 119, branch-only 0, page errors 0 · opt-loss-ton + odds-meter-back PASS (755x1000 + 1180x820) · shots fold-3/fold-6/ipad-6 looked at (as round 5).
- 701cf26a ptime.test 11 de-flake: the refused-walk probe took far[0] blindly; when mkP refused that rival (rows none:1) the probe never ran (1 FAIL in 8). Now takes the first rival who can take an order. 6/6 OK.
- a82e9f73 final-merge main 56e0ec51 (errand-scene r6 = jerr.js LIVE). Conflicts: jbal2 (BAL.ptime block vs BAL.errand block → kept both), assemble list (+jptime.js), index/sw rebuilt.
- 6f69471f integration fixes (first build ever with REAL jptime + jerr): jerr runs in an IIFE so `errIcon` is private and jptime ptErrOwn() never saw it (boot fallback could register its own «tin»); now `window.ERR` marks jerr → jptime never registers «tin», only refreshes MAIN's icon. ptime2 FAIL7-1 probe counts only jptime's own registration (ptIconReg in stack). ptime-scan: jerr.js bestSent( = errRunner, fallback only when PTIME off. After: ptime2 ALL OK ×2, scan exit 0, ptime 4/4 (one earlier FAIL 5 invite {"due":34,"now":33} = the known "modal stops the jump" harness flake family).
## FAIL 1 (for a fixer; laws 6b real people + owner OD 18/11 ~20:05Z errand scene «thấy con nhỏ đi ra khỏi sân khấu … rồi nó về»)
errand-scene was only ever tested with a PTIME STUB (review-errand-scene.md: "Not run: real jptime"). On the merged build 6f69471f, `node dev/test/errand-scene.js file:///<wt>/ /out 755 1000` FAILS 9 checks:
1. ally / rumor / scout / invite: «one task, away until due» — ERR.tasks() (PTIME branch) lists the older S.away rows first (k "harm" for ally/rumor sent through runAct), tasks[0] already back.
2. rumor: «landed, one unread report» + «!» chip — tasks come back read:true, ERR.news() 0, no «!» (.kmerr-bang 0).
3. on-stage runner (her maid sent on spy): slot chip «đang đi …» missing and token not hidden ({"chip":[],"hid":0}); head marker «!» (.khead) not shown on return. Shot onstage-2away/4bang: the maid is not drawn walking off/back.
4. landing notice: only jptime's kitNotice `pt:back:…` («Ngọc Bích đã về: có tin báo», Xem tin) — the scene's own `errand:` notice never fires (one notice is right; the test must accept the PTIME one OR jptime must hand the landing to jerr).
Then the test crashes at errand-scene.js:69 (`.kmerr-bang` null → click). errand-scan.js also exits 1 on the merged build.
Fix ask: for each check decide (a) REAL scene loss under PTIME (walk-off chip + hidden token, «!» on return, unread news) → make jptime's S.away rows feed jerr's adapter as the ONE state (unread until the report is opened; newest/own task first), or (b) fallback-only test assumption (S.erra reset, tasks[0], errand: id) → extend errand-scene.js / errand-scan.js with the PTIME branch (reviewer-approved). Both test files must be green on the merged build, plus every gate above. Start from review/parallel-time-rv @6f69471f and final-merge LIVE main (now 4217568a).
