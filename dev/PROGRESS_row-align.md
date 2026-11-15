# PROGRESS review/row-align (worker, 15/11 session 8)
Owner: "Hàng trên hàng dưới chưa alignment." (dev/handover/refs/owner-row-align.jpg, docs branch) — mood dialog "Tâm trạng · …",
block ĐANG TÁC ĐỘNG: LO ÂU / ẢNH HƯỞNG values started at different x (2nd row = a heading-less kitPanel section = its own kitRows grid).

## Done
- KIT §51.1 `kitRowsAlign(root)` (j79), run by `kpBuild` on every kit panel: kit tables (.kb.kpkb) that read as one block are joined
  into ONE grid (table after table; heading-less section starting with a table after a section/table ending with one; bare table after
  such a section). Heading h4.kpst starts a new block. No new CSS; §51 column cap/wrap unchanged (narrow screens fine).
- Family found by the scan and fixed: mood dialog (emoBox, all persons), Xét phẩm cuối tháng (tsPromoPanel "Ghi chú" under
  "Điều kiện lên …"), Bổng lộc (jecon blCard override still wrote legacy .pcrow rows → kitRows).
- Test: dev/test/kit-table.js gained kind `kit-block` (one visual block = same left edge, ≤22px gap, no heading between) and step `mood`.
- KIT.md §51.1 + kit page sample "§51.1".

## Results (kit-table.js, all steps, @1) fails before -> after
755x1000 7->0 · 1000x755 5->0 (baseline run was partial: 301 lists) · 1180x820 7->0 · 1366x1024 7->0 · 844x390 7->0; page errors 0.
Re-run hud,rules,mood,items,shop @2 at 755x1000 and 1366x1024 after the final edit: 0 fails.

## Review r1 (reviewer, 15/11 session 8) — review/row-align-r1
- Merged origin/main f8f51797c (mood-dialog r1: emoBox title/art; KIT.md conflict = keep §51.1 + main's §52 note; site rebuilt).
- Merge audit (kitRowsAlign hooked, kit-table steps + 160 random play steps + Xét phẩm + Bổng lộc): only intended joins (mood dialog
  Đang tác động + Ảnh hưởng; Xét phẩm Ghi chú). No unrelated table joined. kitRowsAlign cost <=0.2 ms per panel (1st call 12 ms JIT).
- Family fix (tab panes are not kit panels, so kitRowsAlign does not run there): Mệnh truyện "Chương này" wrote "Kết cục xuất thân" as a
  2nd table under the checklist (values 55 px right of Mục tiêu/Bước này/Hạn) -> joined into the chapter rows (jtabs). panel67 (j67):
  "Các chương đã qua" + "Kết cục xuất thân" = one rows67 table.
