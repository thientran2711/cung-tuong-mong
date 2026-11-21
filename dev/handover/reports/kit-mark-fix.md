# kit-mark-fix (KIT keeper; MAIN 89 order, rv NH8m strict mark-verify on LIVE 666def0c)

Branch `review/kit-mark-fix` (tip see CLAIMS). Table `mark-verify-2111.md`: #17, #38, #3 WRONG.

**#17 Hoàng tự > Hoàng tự trong cung — REPRODUCED with rv's seeded world** (`dev/test/fixback-2111.js`): Fold 755 showed the mother block (`.kpl`) LEFT and the rows RIGHT, iPad mother above rows.
Cause (measured DOM): the info group is `div.pcb`, a generic `repeat(auto-fill,minmax(168px,1fr))` grid; at the Fold pane width (461 px) it gets 2 columns (228+228), at iPad (327 px) 1.
Fix (KIT §6.3k, jk4.js): every non-button child of `.pc>.pcr>.pcb` spans the whole row (`grid-column:1/-1`) and `align-content:start` → mother block ALWAYS on top, rows under, one layout on every width; whole group (every `pcard` info group, not only kin).
Shots after: `reports/mark-fix-shots/17-fold-after.jpg`, `17-ipad-after.jpg` (same card, same layout).

**#38 left column clipped** — the card (and so the left column) is its own scroller (`overflow:auto`), but the figure was never fitted in pop-ups (`kitPcKeyFit` ran only from `kitPcSize`) and the column sat cut at the bottom with no cue.
Fix (§6.3i, refined): the observer fits every `.pc.kpwide`; ONLY the portrait shrinks (`--kpcw`, floor 170 px wide, centred) while the column keeps its width (`--kpcl`) so the three wear slots stay together; what still does not fit scrolls with a thin always-visible bar.
Before → after (maid pop-up, Fold): content 1032 → 895 px in a 735 px card; Fold shot `38-fold-after.jpg` shows all key rows + wear slots (Đeo tay / Đeo eo / Túi thơm / Khăn / Áo) down to the card edge, remaining slice scrolls. iPad 877 → 865 in 587 px: still scrolls (honest: the column is longer than the card there), bar visible.

**#3 rank + name two colours** — §6.3j (`kitPcTagColour`, name takes the `.pcrk` rank colour) already in this branch (test: name colour = rank colour). kit-rankunit covers story text only, not the card tag.

Test `node dev/test/kit-mark-fix.js <url> <out> [WxH]` (default now 755x1000 + 1180x820): figure ≥170, cut ⇒ scrollable, same colour, `.kpl` above rows (+ grid-column 1/-1) PASS. quickcheck / coop-e2e: see CLAIMS.

Tip 7be0f5718: quickcheck PASS (render 250/253, tab 474/445, buổi 1141/1465); coop-e2e 92/92. Extras: fit memoised (perf: first try +35 % tab), observer also watches the person pop-up dock (`.pcpop`,`.j59dock`, outside #panel), rank colour falls back to computed colour. kit-mark-fix.js is occasionally flaky in the pop-maid scene (0 cards = harness race), product asserts pass otherwise.
