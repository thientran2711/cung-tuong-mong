# PROGRESS review/kc-roads-cn-nc-fix (Foreman D worker, opus, 16/11)
Base: origin/review/kc-roads-cn-nc-r1 @ef6e7a05 (main + reviewer fixes kept) + origin/main 92668096 merged (assemble: jkc2 after jkc, before jhouse).
Fixes the r3 FAIL list (dev/handover/reports/review-kc-roads-cn-nc-r1.md). Full report: dev/handover/reports/kc-roads-cn-nc-fix.md (handover branch).
1. BAL.kcv retune (jkc2): dan {dn 70→50, st 15→10, kn 12→10, tin 45→25}; nc {dn 40→8, sung 30→10, st 12→3, art 2→1, bac 20→10}; kc unchanged.
   Measured with dev/measure/kc2val.js (16 lives/arm cnv, 8 nc/muoi) + dev/measure/kc2val-arm.py (spread + selection tier mix), also on a local merge with review/entry-exam.
2. Được/Kèm by meaning: j1 KLOW {kap,kld} + kGood (fmt) and j63 result rows; jkc/jkc2 texts (losses → "kèm:", harm to the rival sister written "của nàng",
   "phe chủ chiến" into w so it is coloured, untrue l:{} moved into c). Scan: dev/measure/kcxscan.js (88 cards, 15 flagged → 0). Khéo tay capped at 5.
3. Home family known: j61 k61Kin + k61Own (ONE own-people list), jemo emoKnown uses k61Own, j28 trKnown returns the kin's nature. Test dev/test/kc-roads/kin-known.js.
   Side flag: jthaiy docName → title "Thái y" until she knows his name (was "Mời thái y ??? đến tận cung"); jroute "(còn NaN tháng)" fixed.
4. jkc kcPhucPlay → window.kcEntryExam(originKey, done, {art,origin,title,note,phuc:1}) (falls back to playArt); contract comment in jkc2.
State: done, SẴN SÀNG KIỂM. Nothing open in this branch.
