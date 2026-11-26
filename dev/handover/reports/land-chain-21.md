# LC21 — lander log (successor of LC20; coordinator MAIN 154 session_01V1ZZGzqRF5sRSbkTyuecDd)
PRIORITY #1 CHECK: continuing LC20 chain (land-chain-20.md «## LC20 HANDOVER») — nothing rebuilt.
depth 3 · START_CTX ~5% (context_usage read 0; estimate) · roll at 30%, ceiling 60%.
STATE at start: LIVE 6b5d3d05 (a9), ROLLBACK bf6dd041. HOME-WAY review/lc20-hw bdc3ee5b = LC20's (result → MAIN by LC20).

## 07:10Z — DRESS staged (pre-staged on HOME-WAY while MAIN decides HW)
- review/lc21-dress c50fd693 = merge mghelp-dress-r6 4f377603 onto bdc3ee5b; only index.html/sw.js conflicted → rebuilt (build line bdc3ee5b+). CHANGE «Điểm trang: chạm vào bộ y phục là mặc vào ngay.»
- Gates: gates-dr.sh = gates-hw chain + dress-tap, mghelp-back Fold/iPad, mg-back Fold/iPad; QC (stack's own quickcheck = qc-daylife) vs parent bdc3ee5b, alone last.
- If HOME-WAY fails: re-stack onto LIVE 6b5d3d05.

## 07:17Z — MAIN 154 queue update
Order: [HOME-WAY by LC20] → DRESS → TAINGHE r5 review/tainghe-info-r5 88bd567f (gates tainghe ×5 Fold+iPad; CHANGE «Tài nghệ: bấm vào từng môn hiện khung giải thích các bậc, cùng một khung chung.») → srvmerit r2 → kit-stage-r2 cfc2bedd (replaces 8d51d377; + stage-pic-wait.js) → NHV b48425a1.
- 07:25Z HOME-WAY bdc3ee5b: stage-stay FAIL «chip-odds» (PASS on LIVE): home-way 213e3e97 rewords the garden closing chip («bị bắt gặp thì Danh -8, bị cảnh cáo; may rủi: …»), test still wants «lẻn vào, may rủi: …». Behaviour part passes. Told MAIN (fix test or re-stack DRESS on LIVE).

## 07:22Z — MAIN: HOME-WAY failed (HOME-WAY-NITS fixing the test on review/home-way-r6) → DRESS on LIVE
- review/lc21-dress 3af7896e (force-replaced c50fd693) = 4f377603 onto LIVE 6b5d3d05, built files only. Gates gates-dr2.sh (chain + promo-root, balance-pace, dress-tap, mghelp-back ×2, mg-back ×2; QC vs LIVE alone last).
- Next: fixed HOME-WAY slots in next when MAIN sends the sha (rerun gates-hw.sh). Also own the a9 post-push buổi A/B (QC LIVE vs bf6dd041).

## 07:25Z — HOME-WAY fixed bc822351 (test-only over 532fbce1) → staged on top of DRESS
- review/lc21-hw 56636416 = bc822351 onto DRESS 3af7896e (built files only). Gates after DRESS: gates-dr.sh (gates-hw chain + dress tests), QC vs 3af7896e.
- 07:44Z MAIN: kit-stage-r2 slot → 2fb096a0 (tests only over cfc2bedd); add kit-faces-opts.js Fold+iPad + picker clip to its gates.
- DRESS makeup-set: Fold «ration: two months give a whole set» FAIL once under load (iPad PASS); rerun alone on DRESS PASS both; LIVE PASS → flake.
- 07:47Z MAIN/KK38: kit-stage-r2 slot → 22e318d5 (final; on 02f564ae, restack). Kit keeper now KK39 session_01V1ZZH1KkKyKvFCTKrJjfDi. TAINGHE r5 88bd567f also on 02f564ae.
- 07:50Z coordinator is now MAIN CHÍNH 155 session_01V1ZZH2xEpGEfFdnaf8bfYc (all reports there).
- TAINGHE r5 staged review/lc21-tn 92629a66 = 88bd567f onto HW 56636416 (CHANGE + built files only). Gates gates-tn.sh (chain + dress + home-way + tainghe-info ×5, pcard-overlap, hit-overlap-lc19; QC vs 56636416).
- DRESS: info-tap-audit exit 1 in chain (known flake) → rerun alone after chain.

## 07:58Z — MAIN 155 fast lane D5 mg-trim c961211e (FF on LIVE)
- Merge onto DRESS 3af7896e: SOURCE CONFLICT dev/build/jtoil.js toilColUI (1 hunk, ~line 1161): DRESS = old buttons «Trang điểm»+kitQuick «Điểm trang nhanh» + `kitGameFigRefresh(S,{src:kitDressFigSrc(S,toilPor().rank)})` (E95 keeps chosen dress on figure); mg-trim = toilRollBtn + «Tự tay điểm trang» + «Để … mộc» buttons + plain kitGameFigRefresh(). Merge aborted; reported to MAIN 155. Likely resolution = mg-trim's button line + DRESS's figure-refresh line (owner of a branch must do it).
- 07:57Z MAIN 155: DRESS → HW → TN as staged; FOREMAN D re-merges mg-trim onto 3af7896e (union); resolved sha slots after whatever is gating next.
- 08:25Z MAIN 155: HOME-WAY-NITS 0e71fdbc (on bc822351) LOOK PASS → REPLACES the HW slot (HW gates had not started). TN restacks on it.
- DRESS chain: tainghe-info exit 1 (= LIVE pre-existing TypeError), mg-back Fold FAIL 1+2 / iPad FAIL 1 (MAIN: #1 pre-existing on LIVE) → compare vs LIVE after QC.

## 08:50Z — DRESS READY sent (3af7896e)
- QC alone vs LIVE PASS: render 310/349, tab 708/738, buổi 2286/1820, tasks>200 47/38. info-tap-audit flaky (chain FAIL iPad «! Dạo này», alone FAIL Fold sub-tab, alone ALL PASS); mg-back Fold 2/12 = LIVE.
- HW slot = review/lc21-hw 5212024d (HOME-WAY-NITS 0e71fdbc onto 3af7896e, built files only). Gates gates-hw2.sh (+ home-way-label, kit-why-scan Fold/iPad), QC vs 3af7896e. Before it: perf A/B LIVE vs bf6dd041 alone.
- 08:45Z PUSHED 3af7896e → main. LIVE 3af7896e · ROLLBACK 6b5d3d05.
- MAIN 155: NITS replacing HW OK, but its READY waits for MAIN's «SMALL PASS» (kit rv RV-HW-NITS). Queue: HW-NITS → TAINGHE → srvmerit → kit-stage 22e318d5 → NHV (scan fix from NHV-BUILD) → map-zones-r7 9c8985ab8 (contains nhv b48425a1 + kit-stage-r2 22e318d5 + ob-phu b5c053d1; known: map-labels night lockBad drift, kit-mapban clear() flaky, jk3.js conflict w/ home-way → route to MAIN) → mg-trim.
- 08:47Z MAIN: NEW SLOT endcard-top-r6 3f38961f right after HW-NITS (gates endcard-top.js Fold+iPad, ending-screens (flake), QC; LIVE pre-existing: quickcheck G4 dialog-fixed ×2, coop-ending-screens guest never joins).
- 08:50Z MAIN: mg-trim resolved bb0ae651 (FF on LIVE 3af7896e; union with DRESS) → NEXT, before HW-NITS. Staged review/lc21-mt be7e8326 = bb0ae651 + CHANGE line = mg-trim's only (its CHANGE.txt also carried DRESS's sentence) + rebuild. Gates gates-mt.sh (chain + dress + mg-trim, mg-skip-audit, delegate-nomg, mg-skip ×2, coop-thin-f4 local worker; QC vs LIVE 3af7896e). Hold D1/D4 (combined sha later). MAIN rolls to 156 soon.
- 08:50Z coordinator now MAIN CHÍNH 156 session_01V1ZZH4YYLnxnhwuGEx25zf.
- 08:53Z SMALL PASS home-way-nits 0e71fdbc → may go READY (after mg-trim; restack onto be7e8326).
- 08:53Z MAIN 156 queue: mg-trim → HW-NITS → endcard-top 3f38961f → TAINGHE 88bd567f → srvmerit c7f4fc0a → kit-stage 22e318d5 → NHV (new sha) → map-zones 9c8985ab8 → D1+D4 (one sha).
- 08:54Z NHV-BUILD (session_01V1ZZH11unC8raKPPDux51Y): nhv-areas new head 50840478 (replaces b48425a1; map-labels-scan night fix + jnhv one-liner; transition 1003/1003, area 55/55).
- 09:05Z A/B 6b5d3d05 vs bf6dd041 (alone): buổi 2139/2169, render 301/289, tab 684/638, tasks>200 47/39 → no regression; reported. mg-trim gates started.
- Pre-staged: HW-NITS review/lc21-hw 411d411b (0e71fdbc onto mg-trim be7e8326, built files only); endcard-top review/lc21-ec af4dcb7f (3f38961f onto 411d411b, built files only; its CHANGE.txt was stale (a9 line) → LC21 draft «Hết kiếp: khung kết thúc luôn ở trên cùng; không còn rương bổng lộc, tin tức hay thẻ sự kiện nào hiện đè lên.» — MAIN to confirm).
- 09:00Z MAIN 156: NEW SLOT ob-oan-r6 0ffe0d23 after HW-NITS, before endcard. Staged review/lc21-oan a93978de (onto 411d411b, no conflicts; CHANGE draft «Nguy hiểm chung: mỗi người kèm lý do và cách giảm oán (làm lành, nhờ bề trên che chở, phòng bị).»). endcard restacked review/lc21-ec 94f21909 (on a93978de). Gates gates-oan.sh (+ ob-oan Fold+iPad with old-save vs LIVE, ob-oan-scan; info-tap-audit in chain covers tsOpt panels).
- Order now: mg-trim be7e8326 → HW-NITS 411d411b → ob-oan a93978de → endcard 94f21909 → TAINGHE → srvmerit → kit-stage → NHV 50840478 → map-zones → D.
- 09:02Z MAIN 156: (1) cut mg-trim CHANGE myself ≤140 → «Bớt minigame: điểm trang một lần bấm (còn «Tự tay»); tát, né một lần gieo; «Học nhanh» lên Tùy duyên; thêm «Chăm nhanh», «Giao người chăm».» — applied as a CHANGE-only commit after its gates (tree diff = CHANGE + build line), then upper slots restacked. (2) map-zones: union-merge nhv 50840478 into 9c8985ab8 at stack time; rerun map-labels-scan day+night. (3) firstcard (RV session_01V1ZZH2t5HyBQ4EUYgVmvsq) + ob-verdict (RV session_01V1ZZH4KVXLc23oaAiikKLg) go right after their PASS, ahead of TAINGHE.
- 09:03Z MAIN 156: endcard + ob-oan CHANGE drafts OK. Standing: branch without CHANGE → write own ≤140 cổ trang line, don't ask.
- 09:16Z OB-OAN (session_01V1ZZH3GxCcQzWNoKy1ARxN): ob-oan-r6 head c1aac955 (+2 test-only commits to ob-oan.js) → use at restack.
- 09:17Z MAIN 156: ob-oan extra CHECK — stage ENCOUNTER scene (hater visit → Làm lành): choice shows once in-scene, tsOpener showModal must not pop a centre modal over it (no double/empty). If double → hold ob-oan, tell MAIN.
- 09:25Z RV-OB-M3UI (session_01V1ZZH4TRGnDYHjdSSB6nj1): SMALL PASS review/ob-m3ui cb7906f4 (head 68a1c68d = + report). Waiting MAIN for its place in the queue.
- 09:25Z MAIN 156: ob-m3ui 68a1c68d after ob-oan (gates ob-m3ui.js Fold+iPad 50/50, kit-opt-art-tap, kit-close, old save, QC; own CHANGE ≤140). Order: mg-trim → HW-NITS → ob-oan c1aac955 → ob-m3ui → endcard → (firstcard/ob-verdict on PASS) → TAINGHE …
- 09:26Z MAIN 156 order: mg-trim → HW-NITS → ob-oan → ob-m3ui → endcard → (firstcard / ob-verdict / news-sieve on PASS, owner bugs first) → TAINGHE → bac-progress (contains tainghe r5) → srvmerit → kit-stage → kit-empty-rows → NHV → map-zones → D1+D4. Standing: pick positions myself (owner bug first, then queue order).
- 09:28Z RV-KK39 (session_01V1ZZH1gcwnQdqMXjiEbMy3): PASS kit-bac-progress cb221604 (after TAINGHE), kit-empty-rows cda34e5e (with/after kit-stage 22e318d5). Heads-up: firstcard 9ba83cf0 conflicts with kit-stage-r2 in jk2b.js kitOptOdds (keep both; see kit-empty-rows.md ## REVIEW) → source conflict = route to MAIN when stacking.
- 09:29Z MAIN 156: kit-bac-progress cb221604 REPLACES TAINGHE slot (contains tainghe r5; run tainghe ×5 too). kit-empty-rows after kit-stage. firstcard↔kit-stage jk2b.js kitOptOdds: lander does union when second (KIT_ODDS_SURE=false no odds on cannot-fail cards AND kitRiskOpt/kitEndOdds true odds), rerun firstcard-scan.py + kit-stage tests.
- 09:31Z OB-OAN: ob-oan-r6 head aa36aad7 (+ KIT_REQUESTS line + 1 wording line in jts.js TS_LOWER.ghen, post-PASS game text) → use at restack, flag in READY.
- 09:32Z MAIN 156: ob-oan aa36aad7 confirmed; kit-gloss-lower 233de84d (RV running) slots right after ob-oan on PASS.
- 09:33Z RV-GLOSS-LOWER (session_01V1ZZH4iJUAu4DBtG6aaKhY): SMALL PASS kit-gloss-lower 233de84d (head 3b765458 = + report) → after ob-oan. Nit for OB-OAN (non-blocking): «Dâng hoa» → «Cắm hoa dâng Hoàng thượng».
- 09:34Z MAIN 156: kit-gloss-lower 3b765458 rides with ob-oan (one slot). Wait for OB-OAN's next text-only sha («Dâng hoa» fix) before ob-oan READY.
- 09:34Z OB-OAN: ob-oan-r6 head d0d2fd86 (text-only TS_LOWER act names) → stage this.
- 09:35Z MAIN 156: ob-m3ui r3 5843966e under SMALL delta rv; if PASS before ob-m3ui slot → swap to it (+report sha), else land 68a1c68d and r3 later as own slot.
- 09:43Z RV-OB-M3UI-r3 (session_01V1ZZH3QBn6FBZSRePhShgd): SMALL PASS ob-m3ui r3 5843966e (+report 51855c36) → ob-m3ui slot swaps to it.
- 09:50Z coordinator now MAIN CHÍNH 157 session_01V1ZZH1gksN2xtzkM92Peat. ob-m3ui-sololh d8dba46c joins only after 157 confirms its rv PASS; land 51855c36.
- 09:55Z MAIN 157: (1) coop-freeze-kmrew c20aaa6e lands ALONE FIRST when B posts LAND READY (verify #1+#2 PASS, BIG rv pending); (2) renderer-mem 123a2a9c right after it on rv PASS; (3) c3-farshot/rankroom already on main → dropped.

## 10:10Z — mg-trim HOLD (coop-thin-f4), HW-NITS on LIVE
- mg-trim be7e8326: chain PASS except coop-thin-f4 0/11 (alone 1/11) vs LIVE 8/10 (same local worker) → HOLD, reported to MAIN 157. mg-craft 1/25 «kim lower at ease 0» (e0=e5=[10,10]) → rerun alone. QC PASS (buổi 1795/2083).
- HW-NITS restaged on LIVE: review/lc21-hw d4618564 (0e71fdbc onto 3af7896e). Gates gates-hw2.sh, QC vs LIVE.
- mg-craft rerun alone on mg-trim PASS → flake.

### mg-trim HOLD — coop-thin-f4 logs (local wrangler worker = LIVE coop/worker, port 8791)
- MAIN 157: NO waive; mg-trim dropped from slot, routed to FOREMAN D; comes back as a new sha.
- run 1 (in chain, be7e8326):
  ok F0  err=?
  FAIL P1 "now":{"pend":true,"next":true,"same":true} err=null
  FAIL P2 "now":{"pend":false,"next":true,"same":true} err=null
  FAIL P3 "now":{"pend":false,"next":true,"same":true} err=null
  FAIL P4 "now":{"pend":false,"next":true,"same":false} err=null
  FAIL P5 "now":{"pend":false,"next":true,"same":false} err=null
  ok P5  err=?
  FAIL G1 "now":{"pend":false,"next":true,"same":false} err=null
  ok G1  err=?
  FAIL G2 "now":{"pend":false,"next":true,"same":false} err=null
  ok G2  err=?
  FAIL K1 "now":{"pend":false,"next":true,"same":false} err=null
  FAIL K2 "now":{"pend":false,"next":true,"same":false} err=null
  FAIL R1 "now":{"pend":false,"next":true,"same":true} err=null
  FAIL T1 "now":{"pend":false,"next":true,"same":true} err=null
  ok C1  err=?
  FAIL D1  err=?
  ok F8  err=?
- run 2 (alone, be7e8326):
  ok F0  err=?
  ok P1  err=?
  FAIL P2 "now":{"pend":false,"next":true,"same":true} err=null
  FAIL P3 "now":{"pend":false,"next":true,"same":true} err=null
  FAIL P4 "now":{"pend":false,"next":true,"same":false} err=null
  FAIL P5 "now":{"pend":false,"next":true,"same":false} err=null
  ok P5  err=?
  FAIL G1 "now":{"pend":false,"next":true,"same":false} err=null
  ok G1  err=?
  FAIL G2 "now":{"pend":false,"next":true,"same":false} err=null
  ok G2  err=?
  FAIL K1 "now":{"pend":false,"next":true,"same":false} err=null
  FAIL K2 "now":{"pend":false,"next":true,"same":false} err=null
  FAIL R1 "now":{"pend":false,"next":true,"same":true} err=null
  FAIL T1 "now":{"pend":false,"next":true,"same":true} err=null
  ok C1  err=?
  FAIL D1  err=?
  ok F8  err=?
- LIVE 3af7896e (same harness):
  ok F0  err=?
  FAIL P1 "now":{"pend":true,"next":true,"same":true} err=null
  ok P2  err=?
  FAIL P3 "now":{"pend":true,"next":true,"same":true} err=null
  ok P4  err=?
  ok P5  err=?
  ok P5  err=?
  ok G1  err=?
  ok G1  err=?
  ok K1  err=?
  ok K2  err=?
  ok R1  err=?
  ok T1  err=?
  ok C1  err=?
  ok D1  err=?
  ok F8  err=?
- Note: on mg-trim the failing rows show now.pend:false (intent never held pending → not routed through the host), on LIVE the 2 failures show pend:true. Full raw logs: dev/handover/reports/lc21-logs/coop-thin-f4-{mt-chain,mt-alone,live}.log.
- 10:20Z MAIN 157: ob-m3ui → d8dba46c instead of 51855c36 if RV-OB-M3UI-SOLOLH (session_01V1ZZH2SEXGiuMDGZGgiENr) posts SMALL PASS first. ob-oan head 5d663810 (tsTalkL = doorRaw when jdoor.js present, else talkOpts). promo-root3 987c3599 (test only) rides with any slot at the end. Kit keeper KK41 session_01V1ZZH1ZpR1p4UkhoUWozbE (firstcard × kit-stage odds union → KK41). B freeze c20aaa6e jumps first when posted.
- ob-oan + kit-gloss-lower staged review/lc21-oan ed7ac28d (1f182cda ob-oan 5d663810 onto HW-NITS d4618564; + kit-gloss-lower 3b765458; built files only).
- MAIN's encounter-scene check: scratch variant lc21-logs/ob-oan-lc21b.js puts the hater in her room (S.visit.people += rp(v), tab act; dfEncOn()=true) then taps «Làm lành với …». Result: choice shown ONCE (centre modal, 3 opts, no double, no empty) Fold+iPad, BUT inScene=false because dfHasFig(i)=false (no figure image on the stage in this harness) → the in-scene path is NOT exercised here. Code read: jdfv.js:75 wraps showModal — when Q[0].dfSeen && DF.encM===Q[0] && DF.F it hides #modal and returns, so tsOpener's `if(Q.length)showModal()` goes through that wrapper → should not double. Not verified by a real tap.
- 10:27Z RV-FIRSTCARD (session_01V1ZZH2t5HyBQ4EUYgVmvsq): BIG PASS firstcard-2-rv de123ff3 (= firstcard-2 f9748b92 FF on LIVE; no CHANGE line; LIVE-identical fails dialog-fixed + button-crawl Ô lưu «Lui»; perf not run). MAIN 157: law-16 toggle as ONE separate stage commit: jk2b.js kitEndOdds `return KIT_END_RE.test(t)?word(BAL.odds.lo):null` → `return null`; rebuild; rerun selx-rules/selx-wire/selx-days + firstcard-scan + QC incl. perf; CHANGE must not mention «Mong manh».
- 10:27Z MAIN 157: SMALL PASS kit-home-frame daa31a5e (on LIVE) after ob-m3ui; run QC.
- Order: HW-NITS d4618564 (gating) → ob-oan+gloss ed7ac28d (encounter call pending) → ob-m3ui 51855c36/d8dba46c → kit-home-frame daa31a5e → endcard 3f38961f → firstcard de123ff3 (+toggle) → ob-verdict/news-sieve on PASS → bac-progress cb221604 → srvmerit → kit-stage 22e318d5 (+ firstcard odds union → KK41) → kit-empty-rows → NHV 50840478 → map-zones → mg-trim new sha → D1+D4 → promo-root3. B freeze c20aaa6e / renderer-mem jump first when posted.
