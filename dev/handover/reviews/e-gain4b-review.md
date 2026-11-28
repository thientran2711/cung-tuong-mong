# E-GAIN4-RV — DELTA review of review/e-gain4b d1afe230 (base review/e-gain4-rv-m cb84eec4) — VERDICT: NOT LAND READY (merge onto current LIVE needs a worker re-merge)

PRIORITY #1 CHECK ('e-gain4|rcvWord|dress-verdict|ACT-MOVE-6'): OD 0 | claims E-GAIN4B session_01DgYSWkaniqei11DuQ25PBJ RV READY d1afe230 | main LIVE **aecbc267** (lr-rules-r3; 5ad52416 + rules bundles incl. **ACT-MOVE-6 db0b3f84**) | review/* e-gain4-rv-m cb84eec4, e-gain4b d1afe230 | archive 0.
KIT CHECK: reuses kaRows / kcls (j63 untouched), j25 optLine (game-side line writer per KIT.md KP13), jdoor doorFold, jone tierRows / toilG, Ghi chú «(…)» note row. No kit module edited (verified: diff = j9 j10 j25 j83 jdoor jone jration jrcv + 2 tests + built files).
Reviewer: E-GAIN4-RV session_01DgYSWoUKNUCW56nNphgiiR, depth 1.

## A. The 3 FAIL items of e-gain4-review.md — FIXED on the branch head
| item | check by me on d1afe230 | result |
|---|---|---|
| 1 (b) untested | unit Fold + iPad; SOURCE mutant: jone doorFold `${x.t} —` + deckPaint `"—"` restored, rebuilt | **26 ok / 0 fail** ×2; mutant → **FAIL b2, 91 printed lines with «—»** (deck «nhẹ: Nghỉ ngơi một lát · vừa: —», pop-up «Giao hảo» «nhẹ — · vừa — · nặng —») → exit 1. Fixed. |
| 2 rcvWord shown as a gain | static: every rcvWord print site (j9, j10 Lập phe + Mời, j83, jration) now rcvWordN «(ý nàng: …)» → kit Ghi chú (j63 kaRows: whole «(…)» value → note); unit f green | fixed (worker's source mutant exit 1 not re-run by me) |
| 3 verdict gain in Ghi chú | root cause j25 optLine glued labelled pieces into one «thành:» → j25Gain keeps labelled / «(…)» pieces as own segments; jdoor way list «(A, B)»; jone toilG re-says the verdict on tier doors; unit g green | fixed (worker's source mutant exit 1 not re-run by me) |
Worker's gate table (quickcheck PASS, row-law3 per state 0, gain-empty 0, door-row-hint 0 + mutant, door-loss 0, poptab 0, act-audit 0, kit-std-scan = LIVE, q-softlock A/B 2+2) was run against LIVE **5ad52416** — stale now.

## B. Merge onto current LIVE aecbc267 — NOT CLEAN (semantic, not only built files)
`git merge origin/main` (base 5ad52416, correct) conflicts in **7 source files + index.html/sw.js**: dev/build/{jtoil, jone, jmline, j25, j10, j15, jration}.js. LIVE's ACT-MOVE-6 (db0b3f84) and the rules bundles (lc34-3b-r1, rules-r1 rank-pace, promo-stack) reworked THE SAME families with a different design:
- jtoil: LIVE puts the whole dress verdict on «kèm:» (kemCol colours a gain green) — this unit routes gain pieces to Được (x) and losses to risk. Two designs for one rule → law 14 (one version).
- jone one-tap: LIVE keeps a labelled member line label-first («thành: … · (tên)») and copies k/tgt; this unit rebuilds Thành from doorGain.
- jmline «Vu tội»: LIVE writes green spans «<tên> bị phạt quỳ, lòng <tên> với <chủ> −N, bị đuổi khỏi cung: <odds>» (more pieces) — this unit «nàng <tên> chịu phạt quỳ, lòng nàng với chủ −N».
- j15 «Mua chuộc» / plant / search buttons (LIVE BAL.btn.* khắc + «được:» gains), j10 faction panel (LIVE 20-line rewrite vs our BAL.ag.par3.fac.k), j25 optLine, jration «Mượn son phấn» (ACT-MOVE-6).
A reviewer may not pick between two designs of the same law; this is a worker re-merge.

## FIX LIST (worker re-merge, branch review/e-gain4c from d1afe230 + origin/main aecbc267)
1. Merge LIVE aecbc267; per conflicting family keep ONE design (law 14): where LIVE ACT-MOVE-6 already meets law 3 for the same card (verdict on kèm with green gain; Vu tội gains), take LIVE and drop the duplicate E-GAIN4 part; keep E-GAIN4/4B only where LIVE still fails (re-check with the unit + e-gain4b-scan + row-law3-scan per state on the MERGE). Keep the reviewer's law-4 fix (j10 khắc from BAL) and the «hắn» fix only if LIVE's rewrite has not already removed the typed number / pronoun.
2. Adapt e-gain4-unit (c)/(g) and e-gain4b-scan to the kept design (e.g. TOILV split vs LIVE kèm) — each must still exit 1 on its source mutant.
3. Rerun the full gate set on the merge sha (unit + source mutants b2/f/g/d2, e-gain4b-scan, row-law3-scan per state Fold + iPad, gain-empty, door-row-hint + mutant, door-loss, poptab, act-audit, quickcheck vs aecbc267, q-softlock A/B ×2, kit-std-scan = LIVE, webkit-syntax), shots of the 3 items Fold + iPad.
Then a DELTA review of the merge only.
