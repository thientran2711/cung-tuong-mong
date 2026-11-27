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
