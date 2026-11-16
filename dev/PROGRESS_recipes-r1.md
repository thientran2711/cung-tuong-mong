# Review state — review/recipes-r1 (reviewer, 15/11 ~21:00Z)
Branch = origin/review/recipes 7dadbc553 merged onto main d51a393e4 (jrcp.js last, after jartc). Details of fixes: dev/PROGRESS_recipes.md "Review r1".

## Checked
- recipes.js at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@3: 0 page errors, no overflow, no clipped text, dialogs inside screen (before the 4-sub-style / balance edits; 755 re-run after level-up feature: OK).
- dev/audio/inventory.js: 0 unmapped / missing / mismatch, 7364 texts 0 bad (INVENTORY.md regenerated).
- 12 book covers on the CDN (img/ + item512/, 200), looked at: clean cut-outs, right subjects.
- Kit-only: jrcp uses kitRows/kitModal/kitFacts/kitSkillCard/kitItem/pbtn/kchip; the grade span is the same pattern as jinv.
- Balance load was ~30-40: balance bot NOT run.

## Fixes made on r1
- Owner ~21:20Z level-up grants a recipe (player + NPC), recipes.js case 9 (passes).
- Owner ~21:50Z (1): 4 sub-styles for all 11 kinds.
- Book price by bổng; ma ma copy fee max(12, 15% bổng); co-op shared taste seed (S.emp.rcpSeed); old-save migration (sub-styles her old level had opened).

## Left
- Re-run recipes.js at all sizes after the last edits; item-events.js, month-cal.js, ts-oldsave.js, coop-e2e.js (once), screenshots 390x844 rotate.
- Owner ~21:50Z (3) Kỳ in the same sub-style UI: probe script .probe/ky.js (not committed) not run yet; code path: WK.the.a="ky" so Kỳ should get chips/"Các lối"/grid — verify in browser.
- Owner ~21:50Z (2) Tứ đức sub-styles: NOT implemented; spec in the reviewer report to the coordinator.
- Open design notes: consort-favour teacher (thiện cảm −4) is much cheaper than nữ quan fee at high rank; NPC sub-style knowledge is a hash of art level (not learnt by roads); virtue teacher fee still flat 5+5×bậc (j85 virCost).

## Review r2 (16/11, review/recipes-r2)
- Merged origin/main 2afdafc39 (incl. item-events §64, month-calendar §58, press-fx-r1); assemble.py list = main's + jrcp.js last; site rebuilt.
- Tests on merged build: recipes.js 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@3 all 0 errors / no overflow / no cut / dialogs inside; month-cal.js 5 sizes ok (+390x844 rotate prompt ok on the built root index.html); item-events.js PASS (86 ok, e68-giftArrive variant skipped at big sizes = test property); ts-oldsave.js (main build -> this build) ok, 12 weeks; coop-e2e.js passed once (on the first merge, main 43 commits older).
- Kit: no new kit part, no KIT.md change, no new CSS; jrcp uses existing kshpick/kinvrows/kitRows/kitFacts/kitSkillCard/kitItem/kitModal; the grade span is the same markup as jinv.
- r2 fix: book shop-card effect shortened to "đọc: học lối này" (the title already names the lối; after the panel-size merge the long line was clipped at 755x1000).
- Still open (design, not blocking): Tứ đức sub-styles (item D16), Kỳ sub-style UI visual check, balance bot not run.
