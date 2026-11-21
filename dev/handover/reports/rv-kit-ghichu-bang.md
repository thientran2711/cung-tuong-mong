# rv-kit-ghichu-bang — PASS

PRIORITY #1 CHECK: grepped OWNER_DECISIONS (L1867 + 21/11 ~04:30Z repeat), CLAIMS, reports, KIT.md §62.1/§73.1; the change lives in the one kit part kitRows (j79) so every caller inherits it; reuses the kit round «!» (.khap) and the kit popup (kitFactTipHtml), no custom chip.

Branch: review/kit-ghichu-bang-rv = keeper a775df5b + LIVE 5a8c30af, sha 6fb2f34aed3a7a32ab87bc09830e3b250f732293. The merge conflicted in j79.js (kitFactTipHtml next to the new kitTapWord block) and KIT.md; resolved by keeping BOTH (keeper's data-kfxt-aware kitFactTipHtml once, tap-word block, both KIT.md sections); node --check ok; index/sw rebuilt.

Checks
- kit-ghichu.js PASS 755x1000 + 1180x820 (Ghi chú row gone, one «!» at the end of the row above, popup titled «Ghi chú» with the text; a first-row Ghi chú stays a row).
- Looked at the real kit dialog (Bổng lộc tháng Giêng: Bổng / Đồ phát / Bị cắt xén «!» / Còn) on Fold + iPad: «!» sits at the right end of the «Bị cắt xén» row, tap → popup «Ghi chú: cắt xén vì thái giám Nội vụ phủ lo việc phát bổng vốn tham». Item cards (jinv 123/341) and every other table go through kitRows.
- Whole group: grep of every «Ghi chú» producer — kitRows callers (jecon, jpet, jrcp, jtoil, jts, jinv, j82) all covered; act/option-card Ghi chú (j63 kaRows, jk2b kr-note) are the approved separate form, untouched. OBSERVATION (not a fail, MAIN to decide): j85.js:169 builds a kitModal SECTION headed «Ghi chú» (Art rule modal, rows «Lên bậc», «Hoàng thượng trọng tài») — a visible Ghi chú block, not a row; the owner word was about rows beside the fact.
- coop-e2e 92/92. QUICKCHECK PASS 233 s then 219 s (first buổi 2737/1711 was my parallel probes; rerun render 252/277, tab 563/486, buổi 1344/1273, core gates PASS, old save ok).
