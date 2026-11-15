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
After: see the report in the coordinator thread (all five checks empty at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390; old save loads).
KIT.md: §12.1, §13 note, §32.12 note, §33.7 note, §49.3a.
