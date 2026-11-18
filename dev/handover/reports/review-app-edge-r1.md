# review-app-edge-r1 (17/11, reviewer, branch review/app-edge-r1 @ dd2e4168, merge of review/app-edge 5a842f58 onto origin/main 4719d424)
PRIORITY #1 CHECK: report app-edge.md + claims app-edge READY | OD "17/11 ~03:54Z" + "~03:56Z" read verbatim (no side bands; Fold page = iPad page scaled) | KIT §0 + §0.0b | git grep main/review/*: only rot.js geo() owns the canvas scale, review/map-full not fetched (Dư đồ layout out of scope) | reviewer, built nothing new.

## Verdict: PASS dd2e4168 (ancestor = origin/main 4719d424)
Merge diff vs main = 5 files only: dev/site/rot.js, dev/kit/KIT.md (§0.0b), index.html, sw.js, assets.json (built files conflicted on merge, resolved by taking main's and re-running build_site.sh).

## Method
Built site served in HOST mode (dev/test/lib/device.js, #krotf frame), real CDN pictures, scale rule read from the live frame. Branch vs main baseline compared at Fold. Shots looked at by me, not committed.

## App width = screen width (#krotf rect vs viewport)
| size | L/R band | canvas (frame inner) | note |
|---|---|---|---|
| 755x1000@2 | -0.4 / -0.4 (0.4 px overshoot from ceil, no band) | 644x852 | main: 31.3 / 31.3 band, 692.5 wide |
| 1000x755@2 | 0 / -0.1 | 1180x820 | 60 px spare strip on TOP (same as 4:3 iPads, unchanged, not a side band) |
| 1180x820@2 | 0 / 0 | 1180x820 | unchanged |
| 1366x1024@2 | 0 / 0 | 1180x820 | 74.8 px strip on TOP (unchanged) |
| 412x1058@2 | 0 / 0 | 1180x820 rotated | prompt "Xoay ngang điện thoại để chơi"; bands above/below the sideways frame (unchanged, by design) |
| 390x844@3 | 0 / 0 | 1180x820 rotated | same |
| 844x390@3 | -0.1 / -0.1 | 1775x820 (cap 1.7x = 2006 not hit) | spread grows to 1775 px, page content not stretched |

## Looked at (Fold 755x1000@2, every tab; other sizes: every tab at 1180, 844x390, 412x1058 contact sheets; dialogs at 755, 1180, 1000x755, 844x390)
Hành sự stage (both figures full height, feet + name plates visible, same kit scale as before), Dư đồ, Hậu cung (Chỉ tôn/Phi tần/Nam nhân/Cung nhân sub-tabs, person card, relation cards), Giao tình, Hoàng tự (all 5 sub-tabs, empty/silhouette frames), Tư trang, Tài nghệ, Mệnh truyện (Mệnh truyện / Việc nhờ / Sổ ghi), Tuần lục book (cover + pages), VIỆC dialog, "Điều mới trong cung" notice, title + ☰ menu card, mini-game intro dialog (Cầm: Thử), night end-of-turn (Bình minh card, then Tuần lục cover), dowry chest dialog. Result: no side bands, pictures keep proportions (figures, chest, book art), text kit size, no cut/overflowing text (scan: no clipped text, no horizontal scroll, 0 page errors at all 7 sizes). The only flagged out-of-viewport boxes are the hidden "pct" bars (same on main) and the book's off-page "kbk-cast" layer (page-turn mechanics, same on main).
- Book: iPad 1180x820 = page 1 alone, then 2-3 as a TWO-page spread, 4 pages total, identical to main; Fold = ONE page (page 1/4, 2/4 …) at the iPad page size; 844x390 (canvas 1775) spread, page art not stretched. Fold page = iPad page scaled: yes (same kit CSS; only the width of the page grows 590 -> 644).
- Fold home/tabs: panels, tab rows (two rows of 4), top card all span the full width; kit inner padding only.
- "Rương đồ khuê các", notice, menu card, mini-game intro keep their own max widths and stay centred (dialogs are not meant to be full width).

## Dư đồ now (review/map-full still being built)
Fold 755x1000: the map picture is drawn at a fixed width and is cut at the RIGHT edge under the info cards (map element 237 px wider than the viewport; on main it was 363 px wider, so slightly better), the "Hoàng thượng / Thái hậu / Hoàng hậu / cung nữ" cards float over it as before, spots at the right ("Hàm Phúc", "Thái Cực") are half hidden. Not a regression of this branch; map-full must own the Dư đồ layout in the 644-wide canvas. 1180, 844x390: map fills the stage as on main.

## Gates
- build_site.sh OK, media-check 0 breakpoints in 280 files, img-allowlist OK.
- quickcheck PASS twice (core gates PASS, time-spill PASS, open 1.4-1.6 s 0 errors, old save from live loads + plays a buổi, 0 errors). Perf new/live medians: run 1 (3 runs) render 270/172, tab 349/308, buổi 930/594 (live runs had 32 s long-task outliers, box noise); run 2 (5 runs) render 324/324, tab 339/390, buổi 974/1060, tasks>200 ms 13/15 → perf <= live +5 % (the change is one scale rule at geo(), no per-render code).
- Old save: yes (quickcheck step 2).

## Small fixes by reviewer
None needed.

## Notes for the coordinator
1. Before main: map-full must trial-merge with this (Dư đồ canvas is now 644 wide on Fold, 1.5x-wide spread on wide phones).
2. Kept as is, by design/KIT: spare TOP strip on 4:3 (1366x1024, 1024x768, 1000x755), bands above/below the rotated phone frame.
3. Caps: canvas growth capped KIT_FRAME.maxGrow 1.7x; 844x390 reaches 1.5x; an ultra-wide screen beyond 1.7x would show side bands again (not an owner device).
