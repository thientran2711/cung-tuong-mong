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
