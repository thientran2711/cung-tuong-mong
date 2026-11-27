# E-GAIN3b review — BIG REVIEWER E-GAIN3b-RV (27/11)

PRIORITY #1 CHECK: OD 0 new (law 2 27/11 ~00:46Z, law 3 18/11 ~09:20Z) | main 98c77517 (no flauntDanh / tamcoJoint; jtwoway TWD flaunt = ghen only) | review/* review/e-gain3 23b44074 (base, rv PASS) + review/e-gain3b 78c8608a (this) | claims E-GAIN3b session_01DgYSWoLuNzXKnrryMfczWF (done).
KIT CHECK: the work reuses kaRows/kcls rows (Thành / Được / Kèm), the writer's class `<span class="g">` (KP12 kaSent), kitHint (jk2b, called with caller data), doorGain (jdoor). Checklist lines touched: hint row / Được row truth. Kit internals j63 / j19 / jk2b / jopic: NOT in the diff (checked `git diff --stat 23b44074 78c8608a`). kit-std-scan not run (no CSS / frame / part added).

**VERDICT: FAIL** — review/e-gain3b **78c8608a** (diff vs 23b44074). The rule change (Khoe quà ngự ban → Danh +) is sound and the target-harm wording is true, but the new door-dialog row hint (jdoor.js PEND.door `hint:`, commits 8c3ce425 / 96eb9ee2) puts false «Được» text on rows that were right before (law 3 truth; a gain she does not get).

## FAIL list (for the worker)
1. **jdoor.js:225 PEND.door row `hint`** — `h1 = kitHint(a)` (the raw way) is taken whenever it does not start with «chẳng được gì / không được mất gì». For ways whose `x` is a NEED text, a tip, or a harm with «nàng» as subject, h1 is wrong and wins over the row's right hint. Seen on the final build, both devices (gain-empty json, lvl-1 rows of the door dialogs), base 23b44074 → head 78c8608a:
   | door › row | base (right) | head (wrong) |
   |---|---|---|
   | Tố cáo › Hặc ăn mặc sai phẩm | «Bị phạt −, Danh +» | «cần nguyên cớ: đã nghe người nhận xét, hoặc tai mắt báo …» (the NEED text in Được) — Fold + iPad, con |
   | Tố cáo › Tố xa xỉ | «Bị phạt −, tháo món xa xỉ nhất» | «cần đã thấy (cùng chỗ, hoặc dò la): …» — Fold + iPad, con |
   | Hãm hại › Hạ độc · nặng | «nàng ta trúng độc, mất mạng …» | «có hạc đỉnh hồng thì khỏi mua thạch tín» (a tip, jbal2.js:90) — Fold + iPad, con |
   | Khiêu khích › Hạ nhục · nặng | «Danh nàng ta −−» | «Danh ++» / «Danh +» (reads as HER Danh rising; she actually PAYS Danh 1, BAL.tw.humil, and the rival loses Danh 2) — Fold hau/hh, iPad hh |
   Fix (whole family, law 11): use the way's own hint only when it names a real gain (e.g. the same test doorGain uses, or kitHint parts with a «good» piece), otherwise keep the base row hint (from the full line). Then re-run the base↔head row diff below over every door dialog row and paste the table: no row may lose its gain or gain a need/tip text. A «Danh nàng −» piece must keep its subject in the hint (KIT REQUEST #4 family — if the kit drops «nàng», keep the base hint for that row instead of the raw one).
2. **Balance smoke for the rule change (asked by the order, not delivered by the report)**: run the Danh bot that exists (dev/measure/inx.js + indanh.js + inpage6.js, life-long sensible bot) before/after (BAL.tw.g.flauntDanh 0 vs 1) and report NPC + her Danh at the DT checkpoints. My own runs could not measure it (see §1.4); not a blocker on its own, but it belongs to a BIG rule change.

## 1. Rule: «Khoe quà ngự ban» → Danh +BAL.tw.g.flauntDanh (laws 1, 2, 3, 4)
- **Real for her**: probe on the built page, `twDo(S,null,'flaunt')` with Sủng 60 → S.danh 23→24 (another run 8→9, 33→34). Card line «Danh +1 · mọi phi tần ghen +2» = jtwoway.js:112, both numbers from BAL.tw.g. TRUE.
- **Real for an NPC doer (law 1)**: SOC.flaunt (j28) is remapped to `twDo(v,t,"flaunt")` (jtwoway.js:84), which runs the same TWD run → `twAp(a,{danh:G().flauntDanh})` → `ap(v,…)`. Probe inside an agent tick (`AG.inTick=true`, which jagent.js:317 requires for NPC deeds): NPC Danh 64→65, TW.flaunt.run hit. TRUE, same deed same effect.
- **Key**: `flauntDanh` is new (not on main 98c77517) and read in exactly 2 places (TWD run + her option line). OK (law 4).
- **Khiêu khích claim**: j2.js:175 `w:{danh:PK.danh}` with PK = BAL.talk.provoke = {rel:15, ghen:10, danh:1} (jbal2.js:1165), and j2.js:110 `apply(ok?(a.w||{}):…)` applies `w` (o:100). NPC side: TWD provoke run `twAp(a,{danh:g[0]})`, g = BAL.tw.g.provoke[0] = 1. TRUE — Khiêu khích already gave Danh +1 on both sides.
- **Law 2 sizing (P6 door)**: nhẹ Khoe quà — Tốn 1 khắc, Được Danh +1, Mất ghen +2 spread on every rival; vừa Khiêu khích — Tốn 1 khắc, Được Danh +1 + ONE rival stung (ghen +10), Mất her regard −15 + oán; nặng Hạ nhục — Tốn Danh 1, Được rival Danh −2, Mất her oán +10. Cost and result rise together; nhẹ's Danh equals vừa's (+1 is the smallest unit), the vừa step is the aimed sting. Accepted.
- **Agent choice unchanged**: AGSELF/AGSOC flaunt gain model still `{spite:BAL.tw.g.flaunt}` (jagent.js:108) — the new Danh is not in the NPC's utility, so NPCs do not flaunt more often than before; the extra Danh per life = (flaunts per life) × 1. Note (not a FAIL): if the agent should value it, add `danh:BAL.tw.g.flauntDanh` to that gain (one core) in a later pass.
- **Balance smoke (my runs)**: (a) month-loop A/B (dev/measure/ge-npc-bots pattern, 10 lives × 10 years, same seeds): NPC Danh mean at end 60.5 (0) vs 71.3 (1), max 90.7 vs 94.1, NPCs at 100: 0.3 vs 0.5 — BUT TW.flaunt.run was hit 0 times in both arms (NPC day deeds do not run in a bare monthTick loop), and an A/A pair in the buổi loop also drifts (30.8 vs 30.4, max 68 vs 68.3) → the gap is page-to-page noise, not this rule. (b) a bare nextBuoi loop does not advance time without a playing bot (0 months in 400 buổi). So no number for flaunt frequency; FAIL item 2 asks the worker for the real bot run.

## 2. §5.1 punishments worded as green Thành (true to code, BAL numbers, writer class)
| act | card text | code | verdict |
|---|---|---|---|
| xinhh | «thành: <g>nàng bị giáng một phẩm</g>» | f → `demote(t,…)` | true |
| tocao | «<g>nàng chịu phạt theo tội ấy</g>; Danh +BAL.eff.j30.danhTocao» | f → `ap(a,{danh:danhTocao})` + `chPunish` | true, BAL |
| accuse (jcharge AOUT) | «<g>chWinTxt</g>; Danh balSg(BAL.eff.j8.accuseDanh)» | j8.js:142 / jcharge.js:149 `ap(a,{danh:BAL.e…accuseDanh})` | true, BAL |
| trinhhh (j78) | «<g>W chPunTxt / chịu phạt theo tội</g>» | unchanged text, now green | true |
| pgift | «thành: <g>nàng trúng độc nếu ăn</g>» | poison gift | true |
| huydung | «thành: <g>Sắc nàng giảm mạnh, ân sủng giảm</g>» | scar70: Sắc −d, Sủng −, Danh − | true (Danh − not named; minor) |
| thathu | «thành: <g>Sắc nàng giảm mạnh tới khi lành, Sủng và Danh giảm</g>» | unchanged text | true |
| tat / phatquy (jface AOUT) | «<g>…Sắc giảm vài tuần</g>; nàng oán ngươi» / «<g>nàng quỳ phạt: Sức balSg(BAL.rl.jface.penQuy)…</g>» | FXF.penQuy = BAL.rl.jface.penQuy (jface.js:80) | true, BAL |
Writer class: only `<span class="g">` (kit KP12 kaSent, KIT.md:4681); no CSS, no new class. OK.

## 3. §5.5 numbers moved to BAL — values unchanged
- jointScheme `tamco:1` → `BAL.eff.j10.tamcoJoint` = 1 (jbaleff.js:11). Unchanged.
- jaudit Khiêu khích `pvRel(v,-15)`, «ghen +10» → `-BAL.talk.provoke.rel` (15), `BAL.talk.provoke.ghen` (10). Unchanged. No silent balance change.

## 4. jdoor doorFold / doorGain / door-dialog hint
- doorFold `OL`: a way whose `x` gives no gain is read from its optLine — the door cards now show «Danh +» (Khiêu khích), «nàng ta mất Danh và Sủng −−−» (Hạ uy thế), Ra uy both pieces. OK.
- doorGain: green-only from a rolled Thành, target-subject plain pieces, «quý ngươi / thiện cảm / tin ngươi −» excluded. Base↔head door-card (lvl 0) gains: no door lost its gain except where the card turned disabled; changes elsewhere follow the seed (names, bands).
- **Door-dialog row hint: regression → FAIL item 1.**

## 5. Tests (final build 78c8608a, `python3 dev/build/assemble.py`, page opened as file://)
| test | result |
|---|---|
| gain-empty Fold 755x1000, 6 states | **1493 cards, 0 empty, 0 page errors, exit 0** |
| gain-empty iPad 1180x820, 6 states | **1397 cards, 0 empty, 0 page errors, exit 0** |
| gain-empty base 23b44074 Fold (before) | 1570 cards, 26 runs / 4 distinct empty (Dò la, Hạ uy thế, Ra uy, Khiêu khích), exit 1 |
| worker mutant `MUTANT=1 … toi` | exit 1 (Hãm hại, Hạ uy thế, Mua đồ, Tố cáo, …) = FAIL as required |
| **my mutant** (jdoor OL reverted to `x` only + AOUT.tat green removed), cao | **exit 1**, 2 distinct empty (Dò la, Hạ uy thế) = FAIL as required |
| act-audit 755x1000 cao | done errs=0, exit 0 (510 runs) |
| old save (main 98c77517 build → head) oldsave-r1 | **16/16 ok**, 0 page errors at 755x1000 / 1180x820 / 1366x1024 |
| charge-smoke | 0 page errors, exit 0 |
| odds-one-row | PASS, exit 0 |
| fac-parity-play | head 18 ok / 0 FAIL = main 18 ok / 0 FAIL |
| role-parity-drift2-play | head 12 ok / 0 FAIL = main 12 ok / 0 FAIL |
| gain-empty's detector hole (hint words / need text counted as a gain) | the FAIL item 1 rows pass gain-empty because the test counts any text; KIT REQUEST #4 note stands |
Co-op / save: no co-op or save file in the diff; old save loads (above).

## 6. KIT REQUESTs #1–#5 (law 9)
Written in dev/kit/KIT_REQUESTS.md «27/11 E-GAIN3b» with file:line; each line checked on the branch: j63.js:80 (tốn→duoc), jk2b.js:248 (MARK_NUM), j19.js:27 (kcls nàng), jk2b.js:231 / :314 (kitHintSign / kitHint), jk2b.js:217 (kitOptModel). Kit internals not edited. OK.

## 7. Result
**FAIL 78c8608a** — item 1 (door-dialog hint shows need / tip / wrong-subject text as «Được», 4 rows on Fold + iPad, regression from 23b44074) must be fixed for the whole family with a base↔head row table; item 2 (Danh bot before/after) belongs to the BIG rule change. Everything else (rule, law 1 both sides, law 2 tiers, BAL keys, §5.1 wording, §5.5 values, KIT REQUESTs, regression tests) is PASS-ready. Shots: none taken (wording-only review; rows read from the gain-empty json). Scratch: /home/user/wt/eg3rv-out (not in git).

---

# RE-REVIEW (27/11 ~11:15Z) — review/e-gain3b 76821d10 (fix 5e26fc81 on 78c8608a) + test merge onto LIVE 0562e15f

PRIORITY #1 CHECK: OD 0 new | LIVE/main 0562e15f (no DOOR.rowHint / flauntDanh) | review/* review/e-gain3 23b44074 + review/e-gain3b 76821d10 | claims E-GAIN3b-FIX (Foreman E child3 session_01DgYSWn1AhiLBvHqmVLmY3B).
KIT CHECK: fix reuses kitHint / kitHintSign (jk2b, read-only), optLine kit HTML (read), doorGain reading; kit internals j63 / j19 / jk2b / jopic not in `git diff 78c8608a 76821d10` (jdoor.js + new test + report only).

**VERDICT: BRANCH FIXES PASS (FAIL 1 + FAIL 2 closed) — LAND UNIT FAIL on 0562e15f (2 items below).** The coordinator lands e-gain3 + e-gain3b as ONE unit on LIVE; on that unit the branch's own law-3 checks are not green.

## A. FAIL 1 (door-dialog row hint) — CLOSED on the branch
- Code (jdoor.js DOOR.rowHint / hintGain / lineOf / TGT): base hint (kitHint of the row's own line) FIRST; the way's own hint only when the base says nothing gained AND hintGain finds a real gain (no «cần …», no «có … thì khỏi …», no stat in `a.c`). Read and agreed.
- My door-row-hint runs on 76821d10 (6 states): **Fold 7089 rows, 0 bad, 0 page errors, exit 0; iPad 7467 rows, 0 bad, 0 page errors, exit 0.**
- The 4 rows of my FAIL 1, fix build (Fold json): Hặc ăn mặc sai phẩm «Bị phạt −, Danh ++; Vững; hỏng thì oán ++, Danh −−» · Tố xa xỉ «Bị phạt −−, tháo món xa xỉ nhất; …» · Hạ độc · nặng «nàng trúng độc, nàng không chết (có thuốc giải); …» · Hạ nhục · nặng «Danh nàng −−; Rất vững; nhưng oán +» — all = base or base cleaned. Khoe quà ngự ban · nhẹ «Danh +; Rất vững; nhưng mọi phi tần ghen +».
- Worker mutant `MUTANT=1` (dau,cao): **exit 1** (21 distinct bad, e.g. the «có Hạc đỉnh hồng…» tip). My own mutants: (a) `DOOR.hintGain` → `!!h`, (b) `DOOR.TGT` → false: both **exit 0** — the fallback branch and TGT are defence code the 6 states never reach (kit already reads «Danh nàng −−» right); not a defect, noted: the test proves the base-first rule, not hintGain / TGT.
- Pre-existing kit readings (base = head = fix, KIT REQUEST #4 family, for the kit keeper, not this unit): P14 «Tát · nhẹ» hint «Sắc +» (it is the target's Sắc), «Phạt quỳ · vừa» «Đức +» (check against FXF.phatDuc), «Tung tin đồn» / «Vu oan» «Danh / Sủng +» (subject «nàng» dropped).

## B. FAIL 2 (Danh balance) — CLOSED (accepted on the worker's numbers)
- Worker ran the life bot (run_par.js sens + indanh, 3 seeds, 21 lives, cap 144 tuần), flauntDanh 0 vs 1: NPC Danh mean 31–45 in both arms at every checkpoint, max ≤ 97, **0 NPCs at 100**; NPC flaunts 2.5–5.5 per life; her bot never flaunts. No runaway; no BAL change. Matches my bound (agent utility for flaunt = spite only, jagent.js:108 → frequency unchanged; +1 Danh per flaunt). Note: the per-arm hook infl.js was scratch, not committed — the run cannot be re-made from the repo (not blocking).

## C. Regression on 76821d10
| test | result |
|---|---|
| gain-empty 6 states Fold / iPad | **1924 / 1656 cards, 0 empty, 0 page errors, exit 0** |
| act-audit cao | done errs=0, exit 0 |
| charge-smoke · odds-one-row | exit 0 · 755/1180/390 PASS |
| fac-parity-play · role-parity-drift2-play | 17 ok ALL PASS · 11 ok ALL PASS |

## D. Test merge onto LIVE 0562e15f (e-gain3 23b44074, then e-gain3b 76821d10)
- e-gain3: clean (auto-merge j10, j15, jdf). e-gain3b: **1 conflict, dev/kit/KIT_REQUESTS.md** (LIVE added «27/11 KK53 kitPick plaque», the branch added «27/11 E-GAIN3b» at the same end of file) — keep both sections, LIVE first. No source conflict. assemble.py builds (18513573 b). KIT REQUEST file:line refs (j63:80, jk2b:248/:231/:217, j19:27) still right on the merged tree.
- Merged build (Fold 755x1000): old save LIVE 0562e15f → merged **16/16**, 0 page errors (755x1000 / 1180x820 / 1366x1024); charge-smoke exit 0.
- Merged build gain-empty Fold: 2254 cards, **10 distinct empty**, exit 1. LIVE 0562e15f alone (same test): 1864 cards, **13 distinct empty**, exit 1. The unit removes 8 (Chưởng sự tra xét, Cài người vào cung khác, Dạy con, Học, Lập phe cùng <X> ×2, Mua đồ, Tố cáo); 5 are LIVE's own and stay (Lấy trộm son phấn › Mặc kệ, Lục rương tìm chứng cứ › Mặc kệ, Lập phe cùng ai · 1, Nghỉ ngơi một lát · nhẹ, Đổi người chạy việc) — not this unit's fault; 5 appear only in the merged run (Thỉnh an › Đeo ngay / Để sau, Thỉnh an, chép kinh › Đeo ngay / Để sau, **Trò chuyện** at con:place:kn#0 / r4#0) — state-random or not, the worker must show which.

## LAND FAIL list (for the worker; fix on review/e-gain3b, re-run on a merge with 0562e15f)
1. **«nàng quý ta −−» shown as Được on the merged unit (law 3, the family E-GAIN3b fixes).** LIVE words the regard drop as «nàng quý ta −−» (Bàn tán về <X>); the branch's exclusions only know «quý ngươi / tin ngươi / thiện cảm» (jdoor.js doorGain filter, doorGain TG, DOOR.TGT; dev/test/door-row-hint.js DRH). Merged gain-empty: **9 «Trò chuyện» door cards «Bàn tán về <X>: nàng quý ta −−»** as the door's Được (LIVE alone: 13; fix branch alone: 0). Widen every one of those regexes to both pronouns («quý (ngươi|ta)», «tin (ngươi|ta)», «oán (ngươi|ta)» where used), then show 0 such cards on the merged build.
2. **door-row-hint exits 1 on the merged unit**: 12 rows / 3 lv, Giao hảo door (gh) › «Mượn son phấn» (cao): base «Lắm lời, thiện cảm +» (kit heads glued) → fix «Lắm lời, nàng có thể chia một nửa hộp còn thiếu» (the «thiện cảm +» piece is lost, and «nàng có thể chia …» is a maybe-text the test does not take as a gain). LIVE alone: 0 bad (rows unchanged there). Decide with code (jration lxBorrowCard + jrcv RCVK.rougeBorrow: what the asker really gets) and either keep the base gain pieces or make the hint name the real gain; door-row-hint must be green on the merged build.
3. With 1 + 2 done, re-run on the merged unit: gain-empty Fold + iPad (6 states) and say for each of the 5 merged-only empties (Thỉnh an › Đeo ngay / Để sau ×2, Trò chuyện) whether LIVE alone shows it in the same state (pre-existing) or the unit causes it.

Shots: none (rows read from test json). Scratch: /home/user/wt/eg3rv2-out (not in git).

---

# RE-REVIEW 2 (27/11 ~15:30Z) — review/e-gain3-live 4db15919 (code + build 26308d3f; e-gain3c + e-gain3b + land fixes, merged with LIVE d9ca7892)

PRIORITY #1 CHECK: report dev/handover/reports/e-gain3-live.md §A/§D | LIVE d9ca7892 at the review start (ancestor of 4db15919); main moved to 772bee4f during the review | review/* review/e-gain3-live 4db15919 | claims E-GAIN3-LIVE-2 session_01DgYSWnf2mstVedSHmT1NNq. Scope (Foreman E): LAND items 1–3 of «RE-REVIEW» + e-gain3b scope + regression; e-gain3c content = E-GAIN3c-RV.
KIT CHECK: `git diff d9ca7892 4db15919 -- j63 j19 jk2b jopic jkring` = empty (kit internals untouched); fixes reuse kaRows/kcls, kitHint, DOOR.rowHint, the writer class `g`.

**VERDICT: PASS 4db15919** (on LIVE d9ca7892). Landing note: main is now 772bee4f — `git merge 772bee4f` into 4db15919 is source-clean; only the generated `index.html` + `sw.js` conflict → rebuild (assemble + build_site), then re-run door-row-hint + gain-empty Fold on that merge before the fast-forward.

## LAND items
1. **«nàng quý ta −−» as Được — CLOSED.** One reading `DOOR.REG` (jdoor.js:20: quý/tin/thương/nể/mến/kính + ngươi/ta/bổn cung/nàng, thiện cảm, quý nhau) used by the doorGain filter + TG, DOOR.TGT, DOOR.hintGain. Root fix: her «Bàn tán về <X>» is offered only when `aff(listener, X) < 0` (j9 topicOpts) = the NPC speaker's own gate (jagacts3.js:150 `if(aff(t,th)<0)add("talkGossip",…)`) → law 1 parity, and the cost-only case is gone (law 3). It is a small rule-level change (her option hidden when the listener likes X); justified by laws 1 + 3, Foreman E should name it to MAIN. My gain-empty: cards with «quý ta / quý ngươi / tin ta −» in Được = **0 / 0** (Fold / iPad); gain-regard-scan: regard loss as the only gain **0 runs** both devices.
2. **door-row-hint on the merge — CLOSED.** Mine: **Fold 8145 rows, iPad 8415 rows, 0 bad, 0 page errors, exit 0.** «Mượn son phấn» (gh): x now leads with `<g>được chia nửa hộp <part></g> (hoặc chút ít cho có)` = the lender's «Chia» answers (jrcv RCVK.rougeBorrow) → hint «được chia nửa hộp còn thiếu (hoặc chút ít cho có), Sẵn lòng / Không ưa». The 4 rows of FAIL 1 stay right (Hặc ăn mặc sai phẩm, Tố xa xỉ, Hạ độc · nặng, Hạ nhục · nặng); Khoe quà ngự ban · nhẹ «Danh +; …». Mutants: MUTANT=1 (dau,cao) **exit 1** (14 distinct), MUTANT=hg (dau) **exit 1** (7) — the hintGain branch is now covered (my earlier note closed).
3. **merged-only empties — CLOSED.** gain-empty 6 states: **Fold 1698 cards, iPad 1729 cards, 0 page errors**; the only empty = «Lập phe cùng ai · 1 ›» (Fold hh:fac / iPad con:fac) = the jkring §104.2 ring opener, LIVE-own kit part, filed as KIT REQUEST #11 (dev/kit/KIT_REQUESTS.md:438; also empty on LIVE alone in my 0562e15f run). Thỉnh an › Đeo ngay / Để sau, Trò chuyện, Mặc kệ, Đổi người chạy việc, Nghỉ ngơi một lát: not empty in any of my runs.

## e-gain3b scope (unchanged since PASS-ready): Khoe quà ngự ban Danh +BAL.tw.g.flauntDanh both sides, §5.1 green Thành wording, §5.5 BAL keys, KIT REQUESTs #1–#5 — present on 4db15919 (grep), no new typed number in the e-gain3b files.

## Regression (4db15919 rebuilt with assemble.py = the committed dev build; page as file://)
| test | result |
|---|---|
| door-loss Fold | 736 ways, 0 bad, exit 0 |
| act-audit cao 755x1000 | done errs=0, exit 0 |
| old save LIVE d9ca7892 → 4db15919 (oldsave-r1) | **16/16**, 0 page errors (755x1000 / 1180x820 / 1366x1024) |
| charge-smoke · odds-one-row | exit 0 · 755/1180/390 PASS |
| fac-parity-play · role-parity-drift2-play | ALL PASS · ALL PASS (0 FAIL) |
| q-softlock (root index.html, same machine), 4 alternating runs | LIVE d9ca7892: FAIL(4), FAIL(5), FAIL(4)… then PASS · branch: FAIL(4), PASS, FAIL(4) → **flaky on LIVE too, pre-existing** (the 4 checks: view holds card / ✕ shows it / parked view / stale view; device flips) — not this unit; worth its own ticket |

## Notes (not blocking; pre-existing on LIVE / kit keeper)
- Some door-dialog hints still glue kit heads where the row comes from LIVE's jone card mode: «Hạ nhục · nặng: Danh nàng −−Bạichỉ uổng công·không mất gì khác …»; «Hặc ăn mặc sai phẩm / Tố xa xỉ: không, Danh ++ …» (a leading «không» piece). Same text as base (test «changed» excludes them) — ugly, not false; for the kit keeper / jone owner.
- KIT REQUEST #4 family still open: «Hạ độc · nặng: Đức +, Bạc +» (servant runner lines read as hers), «Tát · nhẹ: Sắc +», «Phạt quỳ · vừa: Đức +».
- gain-regard-scan info: «Thỉnh an Hoàng hậu: Hoàng hậu → ta: thiện cảm −» and «Dâng tài nghệ: thiện cảm −−» sit beside a real gain in Được (Fold / iPad) — check whether those are the hỏng half.
Shots: none (rows read from test json). Scratch /home/user/wt/eg3rv3-out (not in git).
