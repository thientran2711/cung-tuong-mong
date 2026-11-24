# flight-mucluc-kit — REVIEW (reviewer 2)

PRIORITY #1 CHECK: OD 24/11 ~18:15Z + ~18:19Z (read verbatim) | main: kitSlide/ktStoryHTML/kcSlideHTML | review/* flight-mucluc(-kit) | claims: brief b-kit-batch-1941.

## REVIEW r1 — KIT FAIL (b021e429; merge-base = origin/main 502c48c9, so BARE head == MERGED head)

Build: `bash dev/site/build_site.sh` OK (only the build line in index.html differs).

| # | Check | Result |
|---|-------|--------|
| 1 | Mục lục = large kit frame, ALL chapters number + name, state on right (f10 ask) | PASS. `node dev/test/mucluc-flight.js <url> <out> tt,dtq,muoi,cn,nc,td,ch,thd,cnv`: 8 origins x (755x1000, 1180x820) = 14 rows each, frame h 555, no overflow. Shots looked (Fold tt, iPad dtq): names real (e.g. «Chương 5 · Thanh mai trúc mã: Lửa thử vàng»), «Còn khoảng N chương» gone. |
| 2 | One source (law 4): ARC67/MS67/F14; chip count from same list | PASS for the count («còn 13 chương» = 14 rows − 1 now). Minor: `ktChapToc` types the fallback names «Chuyện chung trong cung» / «Chuyện kế của kiếp này» and `c.max\|\|14`; open slots show a part name, not a chapter name (owner: "phải biết được cái tên"). Non-blocking, KK22 to confirm with MAIN. |
| 3 | Whole family: every road's Mục lục | GAP: `cnv` (cung nữ) has no Mục lục button (test FAIL on cnv; report says same on main — not re-verified by me). Owner wrote «every road's mục lục». Ask MAIN whether cnv is exempt. |
| 4 | **Chip row pinned under the sub-tab bar (f11/f12 ask)** | **FAIL on Fold-size.** Own probe (Mệnh truyện › Chương này, find the scroller, scrollTop = max): iPad 1180x820 PASS (chip top = bar bottom −1); 390x844 PASS (−1); **755x860 FAIL: chip top 92 px ABOVE the bar bottom, i.e. hidden behind the sub-tab bar after scrolling; shot shows only the sub-tab bar, chip row gone** — the owner's bug unchanged at the width she plays. At 755x1000 and 412x1058 this screen does not overflow, so nothing scrolls (cannot show pass). |
| 5 | `dev/test/ktop-sticky.js` | Reports PASS but is VACUOUS on Fold: at 755 it printed `scr:false` (nothing scrolled) and the test only fails when `r.scr` is truthy. It must force overflow (e.g. 755x860) and fail when no scroll happens. |
| 6 | Quickcheck, old-save load, perf, law-11 before/after table | NOT RUN (stopped at first FAIL; re-run on r2). |

Likely cause (hypothesis, not proven): the sticky chip row's containing block ends before the end of the scroll range at 755 wide (the Fold layout wraps the chip row/content differently), so it scrolls away with its parent; `--ktt` is correct (bar height). KK22: make the chip row a child of the scrolling content with the bar, or move the sub-tab bar + chip row into one sticky header, then re-test 755x860, 755x1000 (tall content), 1180x820, 412x1058, 390x844 on every tab with `.ksub+.ktop` / `.kpbar+.ktop`.

Fix list for KK22: (a) row 4, (b) make ktop-sticky.js non-vacuous (row 5), (c) answer rows 2–3 with MAIN, then resubmit as r2.

KIT FAIL flight-mucluc-kit → KK22

~85% done / ~70% playable
