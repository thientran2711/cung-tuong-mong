# review-one-core-dup2-r4 — independent opus reviewer (BIG), session_01N1tNP3RUAMCUVaePSwSLjg, coordinator Foreman B S3 (session_01N1tNP3Jf9UG8ZtZdVruBg7)

PRIORITY #1 CHECK ('one-core-bind|one-core-text|balSg|AOUT|aoLz'): OD:L1267 | main 05ebe3da (contained in 069188d7) | review/* one-core-dup2-r2 069188d7 (this), earlier FAILs 711e637d / 8e75df35 / f97a5841; one-core-arcs 882649ac / 2831e112, one-core-roads-r1 75bc9f05 | claims B row "review r4" (this session)
START_CTX ≈ 5 % of window; at verdict ≈ 35 %; no rollover.
Reviewed review/one-core-dup2-r2 @ 069188d7f8406a62a5b1bafc2696ddb51873a24b. No reviewer fix commits (nothing to fix), so no review/one-core-dup2-r4 branch was pushed.

## VERDICT: PASS 069188d7f8406a62a5b1bafc2696ddb51873a24b (contains origin/main 05ebe3da)
One non-blocking guard limit for the next ONE CORE sweep (§1c). Everything else checked independently below.

## 1. FAIL 1 closed — wrong bindings
(a) Hand check, 27 sites (all 15 rows of review-one-core-dup2-r2 + 12 more), text ↔ the rule that really runs:
| # | site | printed key | rule that reads it | ok |
|---|---|---|---|---|
| 1 | j72:386 bắt trả bạc "lòng với ngươi" | j72.bacMat | s.loyal + bacMat, same fn | ✓ |
| 2 | j72:440 gioi_th fn + x | j72.gioiTh | ap {th:gioiTh} | ✓ |
| 3 | j72:451 tin_doi fn + x | j72.tinDoi | ap {th:tinDoi} | ✓ |
| 4 | j71:200/204 hầu thuốc (player CH7 w/l + npc both lines) | j71.thNurse[0]/[1] | w/l and ap ok?[0]:[1] | ✓ |
| 5 | j55:57 tdGift "người ấy quý ngươi" | j55.tdGiftHead | h.af + tdGiftHead, same line | ✓ |
| 6 | j55:174 + 61/62 "Nhờ cha dâng sớ" | j55.tdAsk | tdAsk tdPowAdd (:60) | ✓ |
| 7 | j55:176 + :204 leak thành | j55.tdLeak | tdLeak tdPowAdd (:71) | ✓ |
| 8 | j78:155/187 trình Thái hậu gain/fail | j78.trinhth / trinhth_2 | A("trinhth") f: apply {th:…} both branches (:138–139) | ✓ |
| 9 | j78:184 accuse fail quý + oán | j8.f_6 (+ balOan hurt) | j8:99 relAdd f_6; relAdd hurt = j9:9 | ✓ |
| 10 | j70:429 / :519 che chở / Tuyết liên | j70.thShield / thLotus | no: apply {th:…} | ✓ |
| 11 | jkc:254/255 "${maid} thiện cảm" | -jkc.mzL | mzL(BAL.eff.jkc.mzL) go + fail | ✓ (wording §Wording) |
| 12 | jtsb:236 Đến ngay / Cáo bệnh | jtsb.thCall / thCall_2 | apply {th:…} of each opt | ✓ |
| 13 | jpet:22/36 tho / ngoctho "bớt oán" | this.soft (2) | jpet:152 oanAdd(v,p,-T.soft) | ✓ |
| 14 | jmen:175 nghe lén hỏng | jmen.hearMan / menChoose | :223 m.af+hearMan, :224 oanAdd menChoose | ✓ |
| 15 | jmen:174 giấu giúp "hắn mang ơn, người ấy quý ngươi" | jmen.hideMan | :205 m.af + hideMan (the man) | ✓ |
| 16 | j25:10 "Bàn tán về" wrapper | j9.run_3 / run_4 | j9:53 affAdd run_3, oanAdd run_4 | ✓ |
| 17 | j78:192 Xử tội risk | j8.judge (+ balOan) | j8:140 relAdd judge | ✓ |
| 18 | jlost:181 Đòi lại hỏng | jlost.loUI | :216 relAdd loUI (askback) | ✓ |
| 19 | jlost:187 Trả về chủ | jlost.loUI_2 | :219 relAdd loUI_2 (giveback) | ✓ |
| 20 | jwhy:68/74 maid spy hỏng | j78.j78maidFail | j78:107 oanAdd j78maidFail | ✓ |
| 21 | j72:442 hh_th fn + x | j72.hhTh | ap {th:hhTh} | ✓ |
| 22 | j71:142 dâng hương | j71.incenseTh | apply {th:incenseTh} same go | ✓ |
| 23 | j42:349 Tố lỗi hỏng | j42.cnvFrame | :356 srvAf(s,cnvFrame) fail | ✓ |
| 24 | j21:56 inviteBtn (previews: placeWhere) | j21.top | :61 relAdd top on refusal | ✓ |
| 25 | j55:44 ccLine (previews: ccStep) | j55.ccStep | ccStep apply {hh:ccStep} | ✓ |
| 26 | jpoison:69 pgLine (previews: pgGive) | BAL.pg.hhEv | pgGive reads BAL.pg.hhEv | ✓ |
| 27 | j17:70–75 AOUT (11 acts, see §2) | j8.f…plantItem, BAL.steal.* | j8:87–129 | ✓ |
(b) 17 new BAL.eff keys hold exactly the typed values they replace (jbaleff diff d4e105ad→069188d7: only additions; every old key unchanged).
(c) one-core-bind.js plants (scratch copy of dev/build, one plant at a time):
| plant (wrong key printed) | result |
|---|---|
| W1 j9:53 Bàn tán x: run_3 → run_12 (other option, same module) | CAUGHT |
| W2 j24:19 Nhận lời: go → go_3 (other option) | CAUGHT |
| W3 jts:198 Không đến: jts.go → j9.npcEncounters (other module, same value 3) | CAUGHT |
| W4 jecon:159 AOUT.spyk: jecon.f → j8.f (same value -8, act "spy" ≠ "spyk") | CAUGHT |
| W5 j30:26 xinhh: j30.f → jwhy.f (same value -8) | CAUGHT |
| W6 j2:146 Khiêu khích balOan: go_2 → go | CAUGHT |
| W7 j68e:100: j68e.ok → jne.go | CAUGHT |
| W8 j17 AOUT spy: j8.f → j8.f_4 (rumor) | CAUGHT |
| W9 j92:298 AOUT.vp: wdAccuse → wdAccuse_2 (same act, the "bỏ qua" branch) | missed |
| W10 j9:53 x: run_3 → run_4 (same option, the oán-to-third amount) | missed |
| W11 j17 AOUT ally: success f_2 → fail f_3 | missed |
→ sound at OPTION / ACT level (every cross-option / cross-act / cross-module plant caught, incl. equal-value decoys).
(c') LIMIT (non-blocking, for the next ONE CORE sweep): a swap between two keys read by the SAME option (success ↔ fail branch, or another stat of the same rule) is not seen. Today's code has no such case (27 hand rows + the AOUT pairs ally f_2/f_3, takeaway f_9/f_8 checked against the roll branches). Gain/risk: likely "có thể" (preview pairs are written by hand), severity "nhỏ–vừa" (one preview shows the other branch's number), found by the next hand review or a branch-slot check (thành/được slot ↔ the roll's true branch; quý/oán word ↔ affAdd/oanAdd). Được lớn hơn: PASS now, the cross-option class that caused FAIL 1 is closed.

## 2. FAIL 2 closed — j17 AOUT
spy f · ally f_2/f_3 · rumor f_4 · frame f_5 · accuse f_6 · ksab f_7 · takeaway f_9/f_8 · vp vpAccuse_2 · plant plantItem — each matched to its j8 relAdd (j8:87–122, 144, 241); steal/road print BAL.steal.ghen / -rel / balOan(-rel,hurt) / -failSung = stealWin (j8:129) + j2 l:{sung:-failSung}. aoLz: element getters, still an Array (Array.isArray true in game). Load order: browser Fold + iPad, AOUT read after boot = spy "thù -8", ally "+25 / -5", steal "ghen +25, quý -15, oán +9", takeaway "-30 / -10"; Hậu cung › Hại nhỏ card shows rumor "thiện cảm -5" (j8.f_4 through the jaudit / kit wrappers). 0 page errors.

## 3. FAIL 3 closed — one-core-text plants (current tree, all CAUGHT 10/10)
P1 jreign rgPurge "thiện cảm -15" · P6 jreign "oán ngươi +9" · P8 jend14 lx "Sủng +4" (road.end.fertM) · P5 jtruth DEEDX provoke "oán ngươi +6" (→ j28.run_5) · P7 jstip "lòng 60+" (loy.close) and "Đức 80–100" (ducLv) · new: j17 AOUT spy typed "-8", jlost askback typed "-4", j92 AOUT.vp typed "-12", j9 Bàn tán typed "-3". Hand LINK list gone (line 59: links from one-core-bind linkMods()); `mode==='amt'` skip gone (P8 caught).

## 4. No visible wording / value change — own render-compare
Own tool (scratch rv4s/rc: regex printer for ${balSg|balAb|balOan(…)} / ${BAL…} + bare BAL reads → values from each side's own BAL, then every string/template literal of the module compared as a set):
- fix commits d4e105ad → 1a100b61, 16 modules: 9 byte-equal after render; the rest differ only by quote style (`"…"` → `` `…` ``), the aoLz wrapper / "function" typeof string, `/* previews */` comments and jpet `${balAb(this.soft)}` (= 2, the same field). 0 rendered word differences.
- origin/main 05ebe3da → 069188d7, 93 modules: strings present only in 069188d7 = quote-style twins of main's strings (j71, j95, jmen, jwhy) + the two jpet getters; strings only in main = the ladder words / bands moved into BAL and the dead second-copy functions removed (accepted in review-one-core-dup2-r1 / dup r1). 0 new player text.

## 5. Gates (on 069188d7)
- one-core-guard 0 fails (inline 11729 ≤ baseline 11790); baseline unchanged since 711e637d; no --allow-grow in any commit; one-core-text 0 sites; one-core-bind 514 prints / 0.
- quickcheck PASS (core gates PASS incl. rules-one-source / kit-conform / coop-one-world hook; time-spill PASS; old save from live loads + plays a buổi; perf new/live render 241/281, tab 387/341, buổi 1028/1048). A first run FAILED perf (longTaskMax 35 s, also 34 s in one LIVE run) while my plant scripts loaded the CPU; the idle re-run passed — machine load, not the branch.
- coop-e2e 62/62 (LIVE Worker); coop-one-world PASS (default + SEED=7).
- Smoke Fold 755x1000 + iPad 1180x820: Hậu cung › Gặp mặt (j21 invite "thiện cảm -3") and › Hại nhỏ (AOUT rumor), act zoom opens; no page error, no horizontal overflow. Shots looked at in scratch only (not uploaded, deleted).
- origin/main 05ebe3da contained (re-fetched at verdict).

## 6. Trial merges (not pushed)
- + one-core-arcs 882649ac: conflicts assemble.py (union of lists), j96 (rare96 BAL.loy.trust from ours + arcs' arcFx wrapper; t96 fade/amb/note/cool from arcs with main's hasT(m,"Tham vọng")), jroute (arcs' BAL.route.seen + main's netRx), one-core-guard.js (arcs' amt + amt1), baseline (arcs'), generated assets/index/sw (rebuilt). Result: guard 0 fails (inline 9128 ≤ 9314), text 0, bind 524 / 0, coop-one-world PASS.
- + one-core-roads-r1 75bc9f05 on top: generated + baseline only; guard 0 fails (inline 4730), text 0, bind 524 / 0.
Note for Foreman B: arcs r2 now at 2831e112 already contains 069188d7 (CLAIMS), so this merge is done there.

## Wording note (brief) — jkc "${maid} thiện cảm -5" while the rule lowers maid.loyal
NOT misleading: VANPHONG line 53 names a servant's feeling toward her master "thiện cảm" (bar "Thiện cảm"), and j84 FULL maps every displayed "Lòng" → "Thiện cảm"; the maid chip in game reads "Cung nữ thân tín … Thiện cảm 89". No change.

## Side notes (not this branch's)
- jtsb:236 x starts "Chắc chắn" (VANPHONG bans the word; j15/j17 use it as the no-roll sentinel, presumably mapped by the kit). Pre-existing; worth one check by the VANPHONG owner.
- jmen nghe lén hỏng also does affAdd(v,S,menChoose_2 = -8) that the text does not show (pre-existing omission).
- jlost:242–243 LO.act and jroute "Chủ tin 60+" (already listed by the r2 reviewer and the worker).

Scratch: /home/user/wt/rv4s, worktrees rv4 / rv4m (deleted after this report).
