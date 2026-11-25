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

## REVIEW r3 — KIT OK (09e7b6e67c308e09b4ef0e3fead4cea747065506; origin/main 502c48c9 = merge-base, so BARE head == MERGED head)

PRIORITY #1 CHECK: OD 24/11 ~18:15Z + ~18:19Z | main: none of ktChapToc/kitTocOpen | review/* flight-mucluc-kit | claims: brief b-kit-r2-tntile-fitfast.

| # | Check | Result |
|---|-------|--------|
| 1 | r2 FAIL «index.html not rebuilt» | PASS. `bash dev/site/build_site.sh` on the head: only the build-stamp line of index.html differs (CTM_BI s/t/c); sw.js identical; code identical to the committed build. |
| 2 | ktop-sticky non-vacuous | PASS. r1 b021e429 + r3 test (served 8802): FAIL at 755, 755, 1180, 412 («chips not pinned under the bar (254 vs 281)» etc.). r3 head (8801): `KTOP-STICKY PASS`, 755/755/1180/412 all after = barBottom−1 (280 vs 281; 350 vs 351). |
| 3 | Row 1 (frame, number+name, state) and row 4 (chips pinned) of r1 | PASS (pinned: see 2; frame: row 5). |
| 4 | cnv Mục lục = new kit use | PASS. Only kit parts: kchip n button data-ktoc → kitTocOpen → kitModal info + kitStepList (KIT §99.3 registered). Real arc titles, no typed names. |
| 5 | mucluc-flight.js | PASS: no args (tt,cnv,tdn) 0 issues; all 9 origins tt,dtq,muoi,cn,nc,td,ch,thd,cnv × Fold 755x1000 + iPad 1180x820: 14 rows, frame h 555, 0 issues. Law 11: all 9 roads have Mục lục. |
| 6 | Shots looked 3× (cnv Fold + iPad) | Frame full, names + state right, no cut text/overflow. |
| 7 | NOT RUN | quickcheck (no script found on the branch) and old-save load; cnv Mục lục in-page chip row on Fold seen only in shot background. Non-blocking, small change. |

KIT OK r3 09e7b6e67c308e09b4ef0e3fead4cea747065506 review/flight-mucluc-kit

~90% done / ~75% playable

### REVIEW r3 addendum (Foreman B request: quickcheck + old save + merged)
- origin/main is still 502c48c9 = merge-base, so BARE head == MERGED head (ktop-sticky + mucluc-flight above ran on it).
- `bash dev/tools/quickcheck.sh --runs 3` ALONE on 09e7b6e6: run 1 FAILED on time-spill-guard runtime «court th tap at sáng 1 left» (flake under load: `node dev/test/time-spill-guard.js` alone passes 2/2 on r3 and 2/2 on origin/main). Run 2: QUICKCHECK PASS · 218 s · open 2134 ms · old save ok (loads, plays a buổi, 0 errors) · perf new/live render 253/254, tab 449/471, buổi 1185/1338, tasks>200ms 24/23 · core gates PASS.
KIT OK r3 confirmed (quickcheck PASS, merged PASS)
