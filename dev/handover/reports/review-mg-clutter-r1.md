PRIORITY #1 CHECK: OD "17/11 ~03:22Z real" clutter line read verbatim; git grep origin/main + review/* for kghud/kitGameFrame/toilDressUI = only review/mg-clutter touches them; no duplicate work.

# Review mg-clutter r1 — verdict PASS cbbbc7d9 (fast-forwards on origin/main 7abaf07a, no conflict)

Reviewer: mg-clutter r1. Trial merge of review/mg-clutter onto current origin/main = fast-forward (branch already contains main). No small fixes needed; no r1 branch pushed.

## Checks
1. PHẦN/HỒI/CÒN chip row: kitGameFrame (j79) and kg82Frame fallback (j82) render `.kghud` with `hidden aria-hidden="true"` plus CSS `.kghud[hidden]{display:none!important}`; no other producer of `.kghud` in dev/build (grep). Hidden cells stay in DOM for env.hud/kitGameSet; aria-hidden + display:none = no screen reader or tap issue. OK in every mini-game that uses the kit frame (all of them go through kitGameFrame/kg82Frame).
2. Điểm trang: "Hôm nay" agenda block removed (jtoil), mama hint line kept (`.toilmama`, full width). Fold shot looked at: seal title, Cách chơi, tabs, wardrobe, hint, two buttons in one screen, no scroll. OK.
3. Timed games: only kitGameClock -> existing kitCoopClock chip "Còn N giây" at the right of the title line; hidden unless HUD time = "N giây". Fold shot Đàn ("Còn 17 giây") and iPad shot Điều hương ("Còn 23 giây") looked at: title line only, nothing else. Dịp 23 giây chip stays inside the frame. OK. KIT.md §13 updated.
4. Engine/tests unchanged: diff = j79, j82, jtoil, KIT.md + build outputs only.
5. Tests (file:// build of cbbbc7d9): toilette Fold/iPad/iPad-Pro ok, overflow false, errs []; small-bugs-2 Fold ok errs []; minigames91 Fold (first 10 kinds before my timeout, all done/no overflow) and iPad 1180x820 (dan co mua ban theu huong) done, errors [], hudOver 0, hudMax empty; quickcheck PASS 146 s (old save ok, core gates PASS, perf new/live render 224/220 ms).
6. contest-ui.js: fails identically on origin/main build and on cbbbc7d9 (TypeError reading 'right' of null = .kgpic missing in sandbox CDN). Not caused by this change.
7. Index build line differs from a fresh rebuild only in CTM_BI (build line sha/time), expected.

## Notes / not measured by me
- Scroll px per device: I confirmed by shots + overflow=false at Fold and iPad (and iPad-Pro for Điểm trang); I did not re-run the worker's px scan for iPad-Pro on every contest kind or phone 390x844. Worker reports Điểm trang phone residual 106 px (wardrobe grid taller than a phone; owner allowed phone to scroll a little) — NOTE only.
- Exams, Nghiệm thân, tài nghệ học, mưu/dò la, tát/né, Phối đồ were not scanned by the worker or me; they share kg82Frame so the row removal applies, their scroll is unmeasured.
- Shots stayed in scratch, none committed.

## Verdict
PASS cbbbc7d9
