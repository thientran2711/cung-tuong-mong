# PROGRESS — review/small-bugs-2 (five small bugs, each fixed as a whole class)

Base: origin/main b8a58e87. Test: `node dev/test/small-bugs-2.js <page> <WxH@dpr> [oldPage] [shotdir]` (env CACHE=<dir> caches CDN pictures).
Page = `_t.html` (doctype + dev/index.html after `python3 dev/build/assemble.py`); oldPage = main's built index.html (writes a cung nữ save, loaded by the new page).

| # | Bug (coordinator) | Class fixed | Where |
|---|---|---|---|
| 1 | Cung nữ road header shows Đức "!" "Cần Đức 50 mới được lập Hoàng hậu" | every consort-only gloss / badge / tap text / plaque on the cung nữ road AND in lãnh cung: Đức "!" badge, HX tap texts (Sắc, Đức, Danh, Bạc, Sủng), glossary popovers, Ân sủng plaque (Lật thẻ, Có thai, Bổng lộc) | j79 `kitRoad` `KIT_GLOSS_ROAD` `kitGlossText` `kitHxRoad`; jk3 k3Hud, k3Explain, k3AsRows |
| 2 | Blank header portrait on the cung nữ road (1180x820) | her portrait on every life type, including the first seconds before FIGURES*.json load (cause: jimg returned "" until the manifests arrived → empty frame) | jimg `kitMePor` + porOf(S) |
| 3 | Thái hậu silhouette in dialogs, face on the stage | Hoàng thượng + Thái hậu met from day one on every road (isKnown61 + k61SeedChiTon, old saves too); Hoàng hậu silhouette until met everywhere; stage-chip attitude follows the same rule (`kitCourtKnown` = `kitChiTonMet`); kitFigOf({kind:"th"/"emp"}) resolves the person (was "") | j61, j90 |
| 4 | 844x390 lãnh cung: 2nd person behind the people panel | compact stages reserve the right plaque column too; a left plaque column that reaches the heads moves the first slot | j59 widthFor / leftFor |
| 5 | j82 frame progress cell "HỒI" in exams (rounds = Môn) | round label per game type: exam "Môn" (locked), engines Hồi / Câu, contest result "Hạng" | j82 kg82Frame / kg82Set, jexam |

Before (main, 1180x820): check 1 = 12 hits (srv) + 15 hits (cold); check 2 = blank before manifests; check 3 = Hoàng thượng/Thái hậu silhouettes everywhere on both roads; check 4 = "lc +2: p1 under kshR"; check 5 = 7 wrong labels.
After (latest build): all five checks empty at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844; old save (main build, cung nữ road) loads with real portrait and chí tôn faces. dev/test/stage-slots.sh 844x390 + 1366x1024: all cases clean.
Slot rule detail: next to a reserved panel the edge figure is pulled in (j59 inLim) instead of cutting the slot count (a first try that shrank the slots dropped iPad vườn to 1 per page).
Her mistress on the cung nữ road counts as met (met61) — she was a grey silhouette in the Phận sự row.
Residual (not fixed, pre-existing on main): 390x844 phone portrait has no rotate prompt; the place subtitle wraps one letter per line on the left edge, which pushes the folded chip row down over the heads (main overlaps too, less).
KIT.md: §12.1, §13 note, §32.12 note, §33.7 note, §49.3a.

## Reviewer r6 (review/small-bugs-2-r6, merged onto origin/main 888463759)
- Merge: conflicts only in built files (index.html, sw.js, assets.json) → rebuilt with dev/site/build_site.sh. jk3 auto-merge (event-balance K3 row + road guards) checked by hand.
- Fixed on r6: (a) j59 widthFor/leftFor decide a panel's side by its CENTRE — tassel-fix's 2-column plaques start left of mid-stage at 844x390 (kshR 204–420 on a 8–429 stage), so the old `q.left > mid` test skipped the reservation and a figure stood under the plaques (srv, lc +1/+2/+3, home +2, vườn +2/+3). (b) KIT_GLOSS_ROAD "Ân tình" for srv and cold: jpoison (main) rewrote the consort gloss with "thị tẩm".
- small-bugs-2.js (test page needs `<meta charset="utf-8">` when served by python http.server): all checks empty + old save OK at 755x1000@2, 1000x755, 1180x820@2, 1366x1024 (@1; @2 in one long page slows down after ~5 new games and hangs — main does the same, test-harness load), 844x390, 390x844 (direct mode).
- stage-slots.sh 844x390: n1–n5 clean; ksp case now squeezes 2 slots to the 44 px left of the plaques (tag overlap) — before r6 those figures stood under the plaques (stage-slots.js does not check panels).
- header-danh 1180x820@2 clean; tassel-scan 844x390: 1 hit (rel view, "Tư trang" button over a pendant) — same on main.
- Real 390x844 phone (host mode): game shown as the 1180x820 layout rotated 90° (s 0.476) + one-time 4 s tip "Xoay ngang điện thoại để chơi"; automated runs (navigator.webdriver) get direct mode, so the 390x844 test runs never see that.
