# PROGRESS review/kit-table (KIT §51 kit table; numbered §41 on the branch) — base origin/main 114887bc1

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

## Results (kit-table.js, 11/15)
755x1000 1182 lists / 0 fails · 1000x755 1291/0 · 1180x820 1284/0 · 1366x1024 1283/0 · 844x390 1274/0 · 390x844 1193/0; 0 page errors.
Before (origin/main, 755x1000): Ân thưởng rewards spread 99.9 px (2 labels one word per line), Sổ ân thưởng 42.1 px, Bảng phẩm vị
"Ghế theo phẩm" 61 px, Bổng lộc 9.1 px, Điều ngài thích legacy rows, shop detail two tables 9.1 px apart. After: 0 px everywhere.
Status: SẴN SÀNG KIỂM (branch pushed). Worktree deleted after push.

## Review r6 (11/15, review/kit-table-r6 = kit-table 77625c7ab merged on main f500d0464)
- Merge conflicts: KIT.md (both appended sections at the end), assets.json / index.html / sw.js (build outputs: took main, rebuilt with
  dev/site/build_site.sh). j79 auto-merged: main's tabs-kit rewrote the §21 skill card; the branch only touched kitRows / `.kpkb` / `.kfdot`.
- **Renumbered §41 -> §51** (registry: main §41 = kitMeMark): KIT.md heading + note, KIT.md §9 line, comments in j20, j42, j52, j65, j79,
  dev/test/kit-table.js.
- Mệnh truyện "Điều kiện sắc phong": main's tabs-kit draws the Sắc phong sub-tab in jtabs `ktStoryHTML` (the j6 panel is only the fallback);
  it used §46 `kitChecks(R)` -> now `kitReqRows(R)` (unmet first). kitChecks stays for one-cell check lists (chapter steps).
- Main's §43 compact act cards (jk4, `.kpanec` / `.pc > .pcr` under 640 px) turned the act card Cần/Tốn/Được rows into a flex chip flow:
  short values sat beside the label, long ones under it (kit-table.js at 755x1000: 817 lists with spread up to 135 px, Hậu cung / Con của
  ta / Cung nhân / Tài nghệ / Hôn sự). Fixed in jk4: the compact `.kb` stays the kit grid (label column fit-content(max(34%,7rem))),
  only the value cell flows its chips. After: 0 fails. (kit-fig2 carries the reference copy of §43: keep this rule when it merges.)
- Kit sample page (#kit): §51 samples kitRows, kitRowsJoin, kitReqRows, kitChip(kitRel(...)) (jkitpage KIT_SAMPLES.push).
- Tests on the merge (local server, 0 page errors everywhere): kit-table.js 755x1000@2 1076 lists / 0 fails · 1000x755 1108/0 ·
  1180x820@2 1093/0 · 1366x1024@2 1113/0 · 844x390@3 1125/0 · 390x844@3 1080/0. pane-bar.js 6 sizes × 8 tabs all ok; tabs-kit-shots.js
  6 sizes × 10 sub-tabs 60/60 ok; old save (made with main f500d0464 index.html, slot 2, with S.awards) loads at 6 sizes, 8/8 tabs render,
  Ân thưởng dialog opens, no horizontal overflow. Screens checked by eye: Hậu cung act cards (compact), LUẬT Ân thưởng, Mệnh truyện ·
  Sắc phong, #kit page at 755x1000 and 844x390.
- Seen, not this branch: the "Tối nay Hoàng thượng lật thẻ" toast sits over an open dialog at 844x390 (main behaviour).
- Result: PASS (see report sha).
