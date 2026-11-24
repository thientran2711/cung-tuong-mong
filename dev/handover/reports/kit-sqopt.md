# kit-sqopt — report

## REVIEW r1 (sonnet reviewer-lander #2 · 24/11)
START_CTX ~3 %. PRIORITY #1 CHECK: KIT.md §6.2c/§6.2b/§6.2d, KIT_REQUESTS SELSCENE-2 | main jopic.js KIT_OPT, jkitsel.js KIT_SQOPT, jk4 kitOptSet, jk3 k3OptCols | review/kit-sqopt 5917286b | claims B (reviewer #1 keeps nochip/toilring/batch2).
Branch review/kit-sqopt-r1 = 5917286b + merge LIVE 68799300 (clean) + rebuild commit + test fix → 8ac751ed4f2beefc162e3de14357b04f6b683d28.
| check | result |
|---|---|
| Consistency scan (whole option-card group) | every dialog option card (button.ka.kopt, #modal, kitpg demo, .kscn-box) takes the tier square S60/M66/L84 from ONE table KIT_OPT.tiers; kitBareOpt scene option = KIT_SQOPT 64/56 (KIT §6.2c, own component, one size). Legacy fitters kitOptSet/k3OptCols no longer set a width. No per-place variant found |
| FAULT FOUND + FIXED | dev/test/dialog-fixed.js still asserted the old #49c rule «option picture fills the card» → quickcheck gate G4 FAILED (13 FAIL, every dialog, both devices) on the branch head. Check now asserts the SQUARE tier picture (w==h ±1, h ≤ card). KIT.md already canon-overwrote the rule |
| node dev/test/opt-card-scan.js file://…/index.html OUT sqopt 755x1000,1180x820 none none (all 12 cases) | errors 0 both devices; pictures 60x60 / 66x66 / 84x84 only (square, per tier), card heights equal per dialog (104/132/140), no card stretched. Fold «dress» case: OVERFLOW 3 = the person-card tassel (kcf tag) hanging 3 px under its own card, not a stretch (main base shows 2 cards in that case, no person card) |
| node dev/test/kit-selscene.js OUT 755x1000,1180x820 | ipad all ok; fold «pair layout A» fails ONLY on the known flaky pair-card count («cards»:2): on main base the same 755x1000 run gave FAIL, ok, FAIL (flaky, same as MAIN said) |
| node dev/test/dialog-fixed.js (no args) | bare head: FAIL (the old rule, above); r1 head: all pass |
| bash dev/tools/quickcheck.sh | r1 head PASS · 270 s · core gates PASS · open 2081 ms · old save ok · perf render 304/278, tab 525/566, buổi 1834/1585 (noise) (an earlier run on the pre-fix head: only G4 FAILED, rest PASS) |
| Shots Fold 755x1000 «dress» + iPad 1180x820 «fest», each looked (law 12) | square pictures, one size, card height = tier, text not cut, no overflow; scratch only |
Not run: coop-e2e (the option card is not a co-op-only part; solo dialogs only).
Verdict: **PASS** 8ac751ed4f2beefc162e3de14357b04f6b683d28.
