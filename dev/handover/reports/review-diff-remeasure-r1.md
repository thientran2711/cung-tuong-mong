# review-diff-remeasure-r1 — BIG review (BAL / difficulty) — PASS ebe9ab2dea4293b9b1ecde3d10e1d02e199f0fd5

Reviewer: opus, session_01N1tNP49bxdSjM6pJkVehNh. Branch reviewed: review/diff-remeasure @ 057243ed (worker report dev/handover/reports/diff-remeasure.md).
Result branch: review/diff-remeasure-r1 @ ebe9ab2d = 057243ed + origin/main 9c49f13c (conflicts only in generated index.html / sw.js / assets.json:
main's taken, site rebuilt with build_site.sh). Descends current origin/main.

## What the branch changes in the game (vs its base main 0488c57a)
| file | change |
|---|---|
| jbal.js | BAL.hhTh 55 → 60 (Thái hậu favour for the Hoàng hậu seat, with a son). The ONLY value change. |
| jweather.js | Q14: new knob BAL.wx.gearMo = 3; rain gear wears out after 3 months (her + NPCs, host-only in co-op); shop texts print the BAL number; kit §70 item card "còn N tháng". |
| j85.js | NPC charity reads BAL.charity (gate bac ≥ BAL.charity.bac × 3 = 60, same as the typed 60 before; gain = BAL.charity) — value-neutral ONE CORE fix. |
| dev/measure/* | harness only (inpage6 reads kèm/hỏng side costs + risk label, taps kit pick dialogs, self-studies arts + Tứ đức), recorders, data. |
No mortality knob touched (jmort, illDie, poison*, birth*, lifespan dice, DIFF de/kho mortality rows all unchanged) — owner mortality rules OK.

## Claims checked
1. Second drain = bot gap, not a game bug — CONFIRMED. Probe on the merged build (755x1000@2, fresh Vừa life): Tài nghệ "Tự học Cầm" →
   kit pick dialog "Học Cầm: làm gì?" with 3 enabled "Làm" tiles → material dialog "…: dùng vật liệu gì?" → minigame opens (S.mg mode self).
   Tứ đức "Tự rèn Công" → the same pick dialog, 2 enabled tiles. Closing the pick dialog spends nothing (wkAsk runs before spend). A human can
   self-study; the old bot just closed the dialog. 0 page errors. (Side note, not a FAIL: the pick dialog's only footer button reads "Đã hiểu"
   and cancels the lesson — existing main kit behaviour, out of scope.)
2. BAL.charity single copy — CONFIRMED: only jbal2.js `charity:{khac:1,bac:20,duc:3,danh:1}` (main's, from danh-balance-r1); the branch's 40/7 is gone;
   j85 act, NPC copy, card text and Đức panel all read it.
3. hhTh 55 → 60 — OK. hhTh is a world rule shared by every mode: jdiff DIFF.de.bal.hhTh = [1,−5] (Dễ = base − 5 → 50 → 55), Khó has no hhTh knob
   (= base → 55 → 60). So the change also makes Dễ and Khó harder — both were TOO EASY vs OD:L85, so the direction is right for all three.
   Owner targets (OD:L85, newest difficulty ruling; OD:L20 base): Vừa HH ~32 %, early death ~40 %; Dễ HH ~50 %, death ~20 %; Khó HH 15–20 %, death ~55 %.
   Worker data re-read from dr2/*.json: Vừa hh55 16/30, hh60 14/30, hh65 8/31; Dễ hh60 23/30 (76 %); Khó hh60 10/30 (33 %). Numbers match the report.
   ONE CORE: every Hoàng hậu text reads BAL.hhTh (j8 promoReqP, jtabs gloss, jbal hhNeed); no typed 55/60 left (grep). rules-one-source.js: bad 0/200.
4. Own sample (seed 901, NEW seeds, n=16 Vừa, merged build on main 594415aa, fixed bot, natural origin roulette):
   | arm | HH | early death | pace (median tuần to HH) |
   |---|---|---|---|
   | reviewer, hhTh 60 | 31 % (5/16; 14–56) | 44 % (7/16; 23–67): poison 5, lifespan 2 | 271 |
   | worker, hhTh 60 | 47 % (14/30; 30–64) | 23 % | 290 |
   Direction confirmed: Vừa sits on the owner target (pooled 19/46 = 41 % HH; death pooled 31 %). Rank curve (median tuần to r1…r7):
   10 / 41 / 78 / 129 / 164 / 199 / 271.
5. OVERLAP with review/danh-balance (Foreman D):
   - danh-balance is ALREADY on main (danh-balance-r1 → merge-train-8): value-neutral ONE CORE refactor only — BAL.danhG, BAL.charity {1,20,3,1},
     BAL.succN. No values changed there.
   - Its proposals (NOT applied, owner OK needed): P1 BAL.charity bac 20 → 35, danh 1 → 5 + a second Hành sự door; P2(b) BAL.ex.bar → [22,25,28]
     (main already has [22,25,28], so P2 is moot); P3 flag only.
   - diff-remeasure changes BAL.hhTh and adds BAL.wx.gearMo — no textual conflict with anything danh-balance touched.
   - Effect conflict: P1 raises Danh → raises HH; hhTh 60 was tuned WITHOUT P1. If P1 lands later, Vừa/Dễ/Khó must be re-measured and hhTh re-tuned
     (likely back toward 55) — do not land P1 without a fresh n≥30 measure. Landing diff-remeasure now is safe.

## Tests (merged build)
- dev/test/wx-gear.js 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844: ALL OK, 0 page errors (its own shots were taken over the
  "Luân hồi" loading overlay under CPU load — harness timing; the card text checks passed; gear stamp e.wxe = turn + 3 confirmed in my probe at 755x1000@2 and 1180x820@2).
- dev/test/difficulty.js 755x1000, 1180x820: ALL OK, 0 page errors.
- dev/test/rules-one-source.js 755x1000@2: old save (published main) loads, rules bad 0/200, no overflow, 0 page errors.
- Final merge (main 9c49f13c): load probe 1180x820@2, 0 page errors.
- No UI piece changed except item texts (kit §70 card reused) → kit consistency OK. Shots in scratch only, deleted; none in git, no CDN folder used.

## OPEN for the coordinator (not FAIL items)
- Dễ HH 76 % (target ~50 %) and Khó HH 33 % (target 15–20 %) remain too easy; Dễ early death 10 % (target ~20 %), Khó 37 % (target ~55 %).
  Fix belongs in the jdiff DIFF layer (Dễ hhTh −5 → 0; Khó hhTh +5..10); Dễ illDie / poisonNow are mortality knobs = owner rules (ask).
- Pace: median tuần to HH 271–290 vs owner OD:L353 "~188 weeks, keep the speed" — pre-existing on main (eba64ead4 already 247), worth a follow-up.
- If danh-balance P1 is approved: re-measure all three modes before/with it (hhTh interacts).
