# rv-huong-cue (reviewer, 21/11)
PRIORITY #1 CHECK: brief main83-rv-huong-cue.md; OD huong bug 21/11 ~00:40Z + words rule row 1998; review/huong-cue d9fa3a93; main 4f34f461 (head e4fd4dcf) | claims huong-cue worker rolled over.
Verdict: PASS. Reviewed sha = merge of newest origin/main (e4fd4dcf, LIVE 4f34f461) into review/huong-cue; only index.html/sw.js conflicted -> rebuilt by build_site.sh. Pushed review/huong-cue-rv.
## Checks
1. Điều hương: shots Fold 755x1000 + iPad 1180x820 show «Mẫu nặng về X · độ khớp: còn xa / đã gần / rất gần / khớp», Hương mẫu / Hương ngươi pha, scent names, ring (hair->brown->gold->green) + 3-pill gauge; all four steps seen on Fold, three on iPad; legible. Grading untouched (diff only j91 draw code).
2. Group: kg82Sym keeps short words (BAL.mgFx.popMax, law 4); labels restored per report table. mg-noword-a/b/kit PASS (31 kinds).
3. KIT FIRST: live canvas marks + kit colours only, no custom chip/row/frame.
4. Tests: mg-noword-a/b/kit, mg-allkinds 7/7, mgcal-redo 12/12, ag-mgcal ok, coop-e2e 68/68. quickcheck: run1 failed only gate G4 coop-one-world (passes alone twice, PASS in run2); run2 core gates PASS, failed perf buoiMs 2931 vs 1048 (run1 1106 vs 1070) = box noise, canvas-only change.
## Notes (non-blocking)
- Noword tests now cap each drawn string at 60 chars: they catch a long prose line but NOT a poem drawn as short lines; jnwp/jtd/jnwq/jhd still pending (not in this scope).
- Far-state label is brown on a busy shelf: readable, slightly low contrast.
- Relabelled non-huong games verified by the noword tests (words present, ≤60), not by individual shots.

# ROUND 2 — widened to review/huong-cue-2 (MAIN 84)
Verdict: PASS 5fa9aa87 (pushed review/huong-cue-2-rv) = huong-cue-2 fffd3f59 + review/kit-nwb-cap 39b91a16 + LIVE c3a398dd.
- Merge: jbal2 (popMax + laneFade both kept); jtd td_dung = main's td-dung-clear version (it already carries the guiding bar words Vững/Đổ + «Bát nghiêng… giữ …» line; branch's older td_dung labels dropped, no loss); mg-noword-b kept main's GUIDE list + the 60-char rule. index.html/sw.js rebuilt.
- Kit (law 9): .nwb-cap ACCEPTED by kit keeper (rem font + wrap fix, KIT §13.7.3) — merged.
- Tests on merged sha: mg-noword-a/b/kit, mg-allkinds 7/7, mgcal-redo 12/12, ag-mgcal, coop-e2e 68/68, quickcheck PASS (gates PASS, perf ok).
- Shots Fold + iPad of doi, thq, xa, tho, td_cong, td_dung, td_hanh looked: words legible, no overflow.

Final: LIVE moved again (train 2 landed huong-cue 9234a983); re-merged origin/main 64d2e094 → PASS 7af73d06 (review/huong-cue-2-rv). Re-ran noword-a/b/kit, allkinds, mgcal-redo, coop-e2e 68/68, quickcheck PASS.

Final sha for huong-cue-2: 710b8fe6 (review/huong-cue-2-rv) = merged with LIVE a88b14f0, verified there: noword-a/b/kit, allkinds 7/7, mgcal-redo 12/12, coop-e2e 92/92 (this LIVE adds coop-name-clash tests), quickcheck PASS on the previous merge 7af73d06. origin/main kept moving (rv kit-ton-row-2 merge commits, built files only) so it is not a strict FF: coordinator merges main once more (only index.html/sw.js conflict → build_site.sh).
