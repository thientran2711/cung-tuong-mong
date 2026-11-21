# chiton-name report (branch review/chiton-name)

PRIORITY #1 CHECK: OD 21/11 ~01:58Z (this bug) + L1069; main j1.js empName(), j65.js fixModal rename, j15/jhc empCard; review/* none; CLAIMS row "chiton-name". Reused: kitRows/kitFactRows, pcard `chips`/`lines`.

## Done (owner bugs 1, 2, 4, 5; bug 3 «trait box → ⓘ» dropped by MAIN, replaced by the kit keeper's «!»)
1. **Name = «Hoàng thượng»**: new `empNm()` (name slot) + `empEra()` (niên hiệu); `empName()` («Hoàng thượng niên hiệu X») kept ONLY for story sentences (băng hà…).
   Chí tôn card (j15 empCardHTML + jhc empCard): name «Hoàng thượng», niên hiệu = kit row «Niên hiệu | X» under the portrait (new optional pcard option `rows` → `kitRows`, j15.js, rendered in `.pcl` after the chips, next to «Biết tên»). j65 fixModal rename to «Niên hiệu …» removed.
2. **Whole group** (scan: `bash dev/test/chiton-name-scan.sh`, 0 name-slot uses left):
| place | before | after |
|---|---|---|
| Chí tôn card j15/jhc | name «Hoàng thượng niên hiệu X» | name «Hoàng thượng» + row Niên hiệu |
| person dialog j6 showEmp title + j65 rename | «Niên hiệu X» | «Hoàng thượng» |
| j2 Tư trang row «Hoàng thượng» | «Hoàng thượng niên hiệu X, 20 tuổi…» | «niên hiệu X, 20 tuổi…» |
| j2/j95/jcoopworld people lists (info) | «Hoàng thượng niên hiệu X · mood» | «niên hiệu X · mood» (name «Hoàng thượng») |
| j21 relation table | name + «Hoàng thượng niên hiệu X» | name «Hoàng thượng», sub «niên hiệu X» |
| j95 ppl list, jface fxName | name = empName() | «Hoàng thượng» |
| story: j3, j24, j99succ, jpq, joi | «Hoàng thượng niên hiệu X băng hà…» | unchanged (story) |
Thái hậu card: already name «Thái hậu», no era — no change.
3. **One label column** (owner «Sở trường | Thi», «Trọng | tài nghệ, sắc», «Dạo này | Trong cung: …»): block headings (h4 Sở trọng / Đã biết / Dạo này / Kỷ niệm / Ân oán chưa dứt) removed from the person-card info panel (jpcf, jmind, jmem); rows are the only label column. Emperor «Hay» split: tend phrases «trọng X» → ONE row «Trọng | X, Y» («trọng» not repeated), the rest → «Hay | …» (same PERS tend source). Row «Chuyện» → «Dạo này | Trong cung: <story>»; «Tin» → «Đã biết». CSS jk2b.js: a heading-less `.kpsec` in `.pcf` uses the full width.
   Applies to every card with the info panel (Chí tôn, Phi tần, Nam nhân, Cung nhân). 
4. **Place label order** (owner 21/11 ~02:18Z): palace on TOP, her hall BELOW: sources jpm.js (`palace · hall`), jres.js (2 residence labels), jplst.js comment (old «hall line 1» rule overwritten). Stage label, Dư đồ/notice strings built from the same names follow.

5. **Đức chip** (owner 21/11 ~02:54Z): Tài nghệ › Tứ đức no longer repeats «Đức N» (top bar has it): chip removed in jtabs.js:54 and the old «Đức ngươi: N» in j85.js:180; the «ⓘ luật Đức» button stays. Scan of tab headers for chips/rows repeating Sắc/Tài/Tâm cơ/Đức/Danh/Sủng/Bạc/Sức: only these two; the Kén chọn / entry rows (jkc, jkc2 «Tư chất», «Mang theo Bạc») are pre-game dialogs without the top bar, left as is.

6. **Trait words** (owner 21/11 ~03:40Z, MAIN 84): Emperor rows now «Tính cách | Nóng nảy, Chăm chính sự» (one ETRAITS name per trait) and «Trọng | …», each word = kit tap-word `kitFactTap(word, meaning)` (dotted underline; popup = only that trait's ETRAITS sentence). Long «Hay» sentence rows removed for Emperor AND for consorts/maids (jpcf.js). PERS danghi tend «dễ nghi» → «Đa nghi» (j28.js; the only trait occurrence; j13 lot verse is another meaning). Keeper will rename to kitTapWord/kitTraitWords later (review/kit-tap-word) — plain rename.

## Not done / for MAIN
- Trait box (Lạnh lùng: … bullets) left in place on the Emperor cards (j15/jhc `note:`) for the kit keeper's «!» (kit-pcrow-square). DOM I touched: `.pcl` (new `.pcrows`), `.pcf .kpsec` (no `.kpst`), `#kpname` order. I did NOT touch tag centring or act cards (CSS rule I tried for centring removed).
- Fold: the left column (.pcl) scrolls (existing, overflow:auto), so «Niên hiệu» row sits below the big portrait there, same place as «Biết tên».
- The «Dạo này» label column is a separate table from Sở trường/Trọng/Hay (label widths differ by ~16px); kitRowsAlign could merge them — kit keeper's call.

## Tests
- quickcheck: PASS on ee3eead (render 208/204 ms, tab 410/498, buổi 1091/1113). First two runs FAILED perf (render 305-333 vs 184-202) because of a `:has()` selector I had added in jk2b.css; replaced by class `kpno` → PASS. The last commit (Đức chip, 2 text edits) was rebuilt only; core gates run by the build. coop-e2e (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc): 68/68 passed. pcard-fill (?khost=0, 1180x820): court0/court1/rv0/rv1 card+info+sticky OK, no hscroll, 0 errors. pcard-facts: rows incl. «Trong cung: …», no clamp, popups OK, 0 errors.
- Shots (Fold 755x1000 + iPad 1180x820, host mode, looked 3x): before/after in the worker scratch (not in git).
