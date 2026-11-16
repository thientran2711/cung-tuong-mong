# diff-remeasure — report (worker session_01N1tNP4CcXesvskQcWYTMwP, opus) — ROLLOVER 16/11 ~17:40Z (worker context limit; coordinator opens the successor)

Branch: review/diff-remeasure (base main ee5d33de). Full notes: dev/PROGRESS_diff-remeasure.md on the branch.

## Q14 rain gear wears out — DONE (78454563)
BAL.wx.gearMo = 3 months; gear stamped on buy / load (old saves: fresh season) / week end; worn-out gear leaves the chest with a Sổ ghi
line; NPCs same rule (host only in co-op); kiệu unchanged. Shown via kit §70 item card "còn N tháng" + item text prints BAL.wx.gearMo.
Test dev/test/wx-gear.js: ALL OK at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844; 0 page errors, no overflow.

## D31 — HH root cause (IN PROGRESS)
| arm (sensible bot, Vừa) | build | n | Hoàng hậu | early death |
|---|---|---|---|---|
| old bot | main ee5d33de | 27 (+14 Dễ/Khó) | 0 % (0/27) | ~35 % |
| bot fix (reads kèm/hỏng + risk label) | main ee5d33de | 15 | 0 % (0/15; 0–20) | 60 % (lifespan 4, poison 4, illness 1) |
| bot fix | main eba64ead4 (this morning, HH 34 % in balance-after-truth) | 6 (running to 12) | 100 % (6/6) | 0 % |
1. BOT artifact found + fixed (harness only): the monthly cycle-report pop-up (jcycle cyrep, cycle-r2) has hidden-outcome options;
   the old bot tied them and picked "Giấu, không báo" ~half the months → "mừng hụt" Sủng −3 / Danh −2 every month (largest Danh loss).
   Fixed in inpage6.js (side costs after "kèm:"/"hỏng:" at half weight + risk label). Not enough alone: still 0/15.
2. The GAME regression is between eba64ead4 and ee5d33de: ranks 0–2 take ~100 tuần each per life (C7: ~20–27); Danh is the binding
   gate (Sủng ~100, Danh 0–23 at life end). Ablations on ee5d33de: robbery off 0/2, mortality off 0/2 (too small, stopped).
   Bisect running now on the committed builds 92668096 (before merge-train-7), 0af9dedd (merge-train-7: balance-after-truth,
   act-split-w2, reign-road-fix, scene-end-sweep, servant-mline), e9c6021d (merge-train-6: balance-pass-r1, mortality-r1, …), n=6 each.
3. Mortality (owner rule, not touched): lifespan dice kill her before HH in 4/15 stalled lives (long stalls reach the 30s).
Next: name the merge, find the line, fix (code bug) or BAL number, re-measure Vừa n≥30, then jdiff Dễ/Khó n≥30 each.

## Update ~17:40Z (branch head aa489e85a7be9135affb93dac4262794af462715)
- ROOT CAUSE #1 FOUND + FIXED (bd887323): act-dedupe w1 (jact AD_OUT) removed the Hành sự card "Phát chẩn cho cung nhân" (Bạc −40 → Danh +7,
  Đức +3, any week) — on eba64ead4 it gave ≈0.70 Danh a tuần, the whole margin of the climb — and kept only Tài nghệ Tứ đức
  "Phát bạc cứu giúp" HARD-CODED in j85 (Bạc −20 → Đức +3, Danh +1, monthly; ONE CORE breach). Now BAL.charity {bac:40,duc:3,danh:7},
  all texts print it, NPCs same; the bot uses it.
- After the fix, Vừa (fixed bot): HH 7 % (1/14; 1–31), early death 64 % (lifespan dice 4, childbirth 3, poison 1, illness 1).
  Ranks 0–2 still ~90–105 tuần each → a SECOND drain remains (suspects: "Nói thật lòng" Danh losses ×3.5, "Sang buổi mới … bị chê trách",
  "Nhún nhường"); next step = bisect merge-train-4 merges between eba64ead4 and 92668096 with BAL.charity applied. Details + commands:
  dev/PROGRESS_diff-remeasure.md "ROLLOVER HANDOVER". Raw lives: dev/measure/pass/data/dr/.
- Not ready for review (no SẴN SÀNG KIỂM): Vừa not at ~32 % yet, Dễ/Khó not re-measured.

## Successor (session_01N1tNP3F65YoGjUoBixheuW, opus) — 16/11 ~17:10–20:30Z
### SECOND drain = promotion exams (bot/harness; no game bug)
- Arm "head + the old Phát chẩn card back in Hành sự (any week)": HH 0/8 → charity was not the remaining gap.
- Exam recorder dev/measure/inexam.js: eba64ead4 exam pass 86–91 %, her arts sum at the exams 13–26; head pass ~50 %, arts sum ~2.
- Cause: since merge-train-4 (tuduc-sub-r1) every lesson opens a kit pick dialog ("Học X: làm gì?" → material); the bot closed it, so it
  never studied. On eba64ead4 it studied via the Hành sự card "Tự học X: <work>" (j83, no dialog), removed by act-dedupe w1 (AD_OUT).
  A player studies in Tài nghệ → not a game bug. Same two causes as review/danh-balance (Foreman D, on main; its P2 "needs a Tài nghệ bot").
- Harness fix (inpage6): taps kit pick dialogs (window.__noPick off); self-studies arts + Tứ đức in Tài nghệ when Sức ≥ 60 (window.__noSelf off).
### Merge with main fb367740 (and 0488c57a)
- ONE BAL.charity = main's (danh-balance) {khac:1,bac:20,duc:3,danh:1}; my 40/7 dropped; danh-balance P1 (35/5 + Hành sự door) still waits for the owner.
### Before / after (sensible bot; before = main ee5d33de old bot, after = merged build + fixed bot; n ≥ 30 each after)
| mode | HH before | HH after | early death before | early death after | owner target (OD:L85) |
|---|---|---|---|---|---|
| Dễ | 0 % (0/8) | 67 % (20/30; 49–81) | 25 % (2/8) | 0 % (0/30; 0–11) | HH ~50 %, death ~20 % → TOO EASY |
| Vừa | 0 % (0/28) | 37 % (11/30; 22–54) | ~35 % | 50 % (15/30; 33–67) | HH ~32 %, death ~40–45 % → OK |
| Khó | 0 % (0/7) | 16 % (5/32; 7–32) | 29 % (2/7) | 53 % (17/32; 36–69) | HH 15–20 %, death ~55 % → OK |
Rank curve, median tuần from life start to reach rank r (Thường tại r1 … Hoàng hậu r7), after:
| mode | r1 | r2 | r3 | r4 | r5 | r6 | r7 |
|---|---|---|---|---|---|---|---|
| Vừa before (old bot) | 80 | 166 | 219 | 191 | 303 | 323 | – |
| eba64ead4 (this morning) | 10 | 24 | 40 | 86 | 120 | 201 | 247 |
| Dễ after | 5 | 26 | 60 | 90 | 117 | 142 | 196 |
| Vừa after | 11 | 25 | 54 | 83 | 115 | 167 | 229 |
| Khó after | 18 | 40 | 82 | 130 | 187 | 325 | 355 |
Early-death causes after: Vừa poison 7, lifespan dice 4, childbirth 2, illness 1, expelled 1; Khó poison 10, lifespan 4, other 3.
Emperor-death endings (Thái phi / xuất gia / về quê): Vừa 3, Dễ 8, Khó 5 of ~30. Mortality rules untouched.
No BAL value changed for Vừa: with the bot fixed, Vừa is on target. Exam pass after: Vừa 96 %, Dễ 96 %, Khó 98 %.
OPEN (proposal, not applied; Dễ knobs touch the owner's mortality rules → coordinator/owner): Dễ early death 0 % vs ~20 %
(DIFF.de illDie ×0.5, poisonNow off), Dễ HH 67 % vs ~50 % (DIFF.de hhTh −5 → 0 would cut it).
Tests (merged build): dev/test/difficulty.js ALL OK at 755x1000, 1180x820, 1366x1024, 1000x755, 844x390 (one flaky FAIL under bot CPU load,
re-run clean); dev/test/wx-gear.js ALL OK at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844. Site rebuilt.
Data: dev/measure/pass/data/dr2/ on the branch; tools rankcurve.py, exr.py, inexam.js, indanhlog.js.
<<<<<<< HEAD
### Update ~21:40Z — main moved to 0488c57a (danh hiệu jdh/jdh2, jspread, mg-balance …): merged, re-measured, Vừa tuned
- Vừa on 0488c57a, hhTh 55: HH 53 % (16/30; 36–70); hhTh 65: 26 % (8/31; 14–43). APPLIED BAL.hhTh 55 → 60 (jbal.js, world rule, texts print BAL).
- Final, hhTh 60, n=30 each (branch head 057243edeea3e3be5b977f7a481b38c42b7f0b75):
| mode | HH | early death | HH among survivors | median tuần to HH | owner target |
|---|---|---|---|---|---|
| Dễ | 76 % (58–88) | 10 % | 85 % | 235 | ~50 % / ~20 % → too easy |
| Vừa | 47 % (30–64) | 23 % (lucky sample; pooled 38 %) | 61 % | 290 | ~32 % / 40–45 % → ≈35 % when normalised |
| Khó | 33 % (19–51) | 37 % | 53 % | 256 | 15–20 % / ~55 % → too easy |
- Vừa normalised: HH among survivors 55 → ~77 %, 60 → 61 %, 65 → 47 %; × (1 − ~42 % early death) → hhTh 60 ≈ 35 %.
- OPEN (not applied): the newest main lowered early death in every mode; Dễ and Khó need the jdiff DIFF layer tuned (Dễ hhTh −5 → 0,
  Khó hhTh +5..10; Dễ illDie / poisonNow are mortality knobs = owner rules). Suggest a follow-up item.
- Tests: rules-one-source.js 755x1000@2 OK (old save loads, 0 page errors); difficulty.js ALL OK 5 sizes, wx-gear.js ALL OK 6 sizes (fb367740 merge).
=======
>>>>>>> a1438803 (Foreman C s7: handover to s8)
