# balance-after-truth — SẴN SÀNG KIỂM 14fdce0c4a608e6de9efa96272e6d910dcb7301b (review/balance-after-truth, base main eba64ead4). Measures only, no BAL/game change.
- Sensible bot (harness ported from review/balance-pass), A = main 6c17e4611 (before evidence-truth/palace-start/train-3) n=45 vs main n=90:
  HH 36 % → 34 % (CI 25–45, target ~32 ✔); early death 40 % → 38 % (CI 28–48, target 40–45 ✔ low edge); childbirth 11 % → 5 %/birth (shown risk 10.5;
  mechanism verified exact: 324/3000 at 11 %, B2 4/35 vs 3.7 expected; seed-501 arm 0/53 was chance). Frames landed on her 1.8 → 4.8 a life (evidence-truth works, does not shift HH/death).
- Not changed: early death at the low edge, but review/mortality (not on main) adds deaths → re-measure with dev/measure/pass/mkinp.sh + run_par after mortality lands.
- Pace HH after ~285 tuần (target ~188) on both builds: exam-bar fix BAL.ex.bar lives on review/balance-pass (unmerged); if merged, re-measure (HH may overshoot → ex.bar[2] 28→30).
- Details: dev/PROGRESS_balance-after-truth.md on the branch. Next: reviewer (opus) re-runs one 45-life arm on main; merge harness (dev/measure only).
