# PROGRESS review/kit-table (KIT §41 kit table) — base origin/main 114887bc1

Owner bug 11/15 17:27Z (kit group fix): LUẬT · Ân thưởng rewards table — the right column started at a different x on every row
(each legacy `.pcrow` flex row sized its own label; "Sinh hoàng tử" wrapped to 3 lines). Same dialog: blank round dot at the top,
chip "phi tần khác ghen +3" not in kit relation wording.

## Done
- Kit (j79): `.kpkb` (kitRows) label column = `fit-content(var(--kt-lab, max(34%,7rem)))`, labels wrap inside it; person labels
  (face + name) flex; `kitRowsJoin` (merge back-to-back tables), `kitReqRows` (requirement list as a kit table); world fact rows hide
  the blank `.kfdot` (week book keeps its diamond). KIT.md §41 + §9 line.
- Migrated every legacy two-cell `.pcrow` list to kitRows: j20 Ân thưởng + Sổ ân thưởng + Bổng lộc, j24 band (fallback), j27 Tuyển tú,
  j30 Ghế theo phẩm, j32 end card + Sổ luân hồi, j34 Tranh ghế (contestants, score), j15 + jhc Điều ngài thích, j15 Tư chất / Tài nghệ,
  j42 cung nữ Đường đi (tuples via pcard), j52 identity card, j51 Kế vị, j53 Thượng thư phòng, j72 Việc nhờ steps, j6 Điều kiện sắc phong
  (kitReqRows), jinv shop detail (kitRowsJoin). pcard (j15) groups accept `[label,value,cls]` tuples -> one kitRows table.
- DOM fixers updated to read kit rows: j65 fixModal / Con cái box, j69 identity-card chip insert.
- One-cell `.pcrow` lines (news, death chain, Việc nhờ log) are list lines, not tables: left as they are.
- Not touched: Tuần lục HIỆN NAY (review/fix-float, kitRelTable).
- Test: `node dev/test/kit-table.js http://localhost:8765/index.html <W>x<H>@1 [shotdir]` (serve the repo root with
  `python3 -m http.server 8765`). Results in the final report.

## Resume
- If more lists appear, the test prints them (kind legacy / flex / kit-adjacent or spread > 1 / oneWord).
