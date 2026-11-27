# E-S5 — gift-picker loop still present on LIVE ca4a1689 (ui3), 27/11

PRIORITY #1 CHECK: Foreman E child7 request (dev/handover FOREMAN_E_STATUS); brief E-rerun-runner.md says robot shots are never in git → screenshots stay on the runner disk (paths below); what they show is described here.

## Lives parked (all pf / pt_su, Fold, bot=bold, harness f65d019b, unpinned LIVE s=ca4a1689, resume=1 pin=0)
| life | seed | buổi at park | progress on ui3 | ckpt (runner disk) |
|---|---|---|---|---|
| E-S5-R5-greedy-5 | 1250053385 | 2326 | 0 in ~25 min | STUCK-botloop/greedy-5-ui3/ |
| E-S5-R5-speed-1 | 2289644890 | 92 | +4 in ~25 min | STUCK-botloop/speed-1-ui3/ |
| E-S5-R5-speed-3 | 1590092324 | 615 | +10 in ~25 min | STUCK-botloop/speed-3-ui3/ |

## Hit line (harness log, every loop turn)
`AREA BLOCKED {"screen":".kscn «»","x":378,"y":538,"ev":"mousedown","hit":"button.opt.ka.kodw","tgt":"span.krl" (or "small.kb"),"top0":"div.kri-t.kri-front"}`
→ `BUG harness area tap would have landed on a button (it appeared under the point) — blocked: «Vòng ngọc khảm vàng Rất vững TỐN 2 khắc …» / «Trâm …» / «Gấm Tô Châu …»`

## What the screenshot shows (speed-3 stuck-7.png, speed-1 stuck-7.png; Fold 755×1000)
Page «Khải Tường cung · Tĩnh Nghi trai» / «Trường Xuân cung · Vĩnh Xuân hiên», scene with two characters, side panels. At the bottom a normal, VISIBLE result card (kri-t): tag «KẾT QUẢ», title «Đồ trong rương (Biếu quà làm lành: một phần lễ là 12 bạc mỗi người)», note «GHI CHÚ — ta không được gì, cũng không mất gì», link «Xem đầy đủ trong Sổ ghi», button «Tiếp ▸». So kri-t.kri-front is a REAL, visible card at the bottom of the scene, NOT an invisible layer. The blocked tap point (378,538) is the harness area-tap in the middle of the scene, NOT on the card (card is y≈740–880). Whether kri-t.kri-front has a transparent full-height hit-area above the scene could not be told from the picture (a transparent hit-box would not show).

## Real player-facing finding
The option «Đồ trong rương» (label: TỐN món đồ −1, "rẻ nhất bán được 12 bạc") resolves to «ta không được gì, cũng không mất gì» — the label promises an item given, the result gives nothing and costs nothing, and the picker re-opens. The bot picks it again and again (greedy: "TỐN 1 món đồ" looks cheap). A player with no giftable item gets the same empty loop.

## Other shot (greedy-5 noclose-1795819317865.png)
Full-screen .kmov «Thẻ bài được dâng lên Hoàng thượng» (11 cards). The harness says "no close / next after scrolling to its end", but the screen shows a small hint «Chạm để bỏ qua» at the bottom edge — a real tap-to-skip exists; likely a harness false positive (hint too small / low contrast; a player may also miss it).

## Also on these lives
SAVE REWIND ×1–2 per life on reload (1 buổi lost each).
