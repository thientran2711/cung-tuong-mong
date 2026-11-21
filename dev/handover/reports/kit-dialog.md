# kit-dialog report (worker session_01Rc5AsMcXo2ivEx1p5K5Ysh, coordinator MAIN CHÍNH 87)
PRIORITY #1 CHECK: OD 21/11 ~03:47Z/~03:54Z/~04:00Z (#44/#47/#49) + L1867/L1878 + 18/11 21:20Z | main kitModal j79, kitOptTier jopic, kitSealEvPlace jseal, kszFigFill3 jksize | review/* kit-pcrow-square, kit-act-grid (keeper, not touched) | claims: kit-dialog (me).
START_CTX ~0 %.

## Branch review/kit-dialog, sha e8d30ca7 (base main 56ff0db0) — quickcheck PASS (507 s, gates incl. new hook 80-dialog-fixed.sh)
Done (ordered by MAIN): #49 option card + fixed dialog, #56 every option card has a picture, #47 same figure per frame size, #44 one Trân nữ seal place. Not yet: #54, #71, #72, #75, #76, #80, #82 (queued, see bottom).

## What changed (all in the shared kit parts)
- #49a jopic.js: `.kat` nowrap, title `flex:1 1 0`, `.kodds` right on the title row; narrow card (< KIT_OPT.stackW 430 px, class kodstk) stacks the meter bar-over-word so the title keeps width.
- #49b iPad 2 columns: tier S card h 88 -> 132 (pic 60 wide); BUG FIX kitOptTier early return left `--k3c` overwritten by kszBtnGridLive3 (picked 2 columns rendered as 1) -> re-asserted.
- #49c picture fills the card: `.kaart` height = card clientHeight (set in kitOptTier, cleared in each trial); jk3.js tight-column no longer pins 84 px.
- #49d fixed picture + info, only list scrolls: already true (KIT 56.18); now guarded by the test (scroll every scroller, figure/event/info must not move).
- #56 kpOptArt: no art of its own -> §59 stand-in even when no sibling has a picture (was only when a sibling had one). Reproduced on old build with «Tiếp chuyện / Không tiếp».
- #47 jksize kszFigFill3: L / XL frames: target = the frame's room (not min(room, info height)) -> same figure size+position in every L/XL dialog of a device (Fold: 220x666@90 in 3 dialogs, was 666/537/472).
- #44 jseal.js: seal = ONE fixed place (top of the header bar `.kph`, 34 px, 52 px from the right = left of the ✕ slot), no corner search, no bottom strip; header reserves padding. seal-events scan: 126 event dialogs Fold+iPad, ALL `tr:34`, 0 FAIL (before: corners br/bl/tr mixed, 40 px, 42 FAIL "covers").
- Test dev/test/dialog-fixed.js (+ hook dev/tools/quickcheck.d/80-dialog-fixed.sh, README line): odds on title row, iPad 2 cols / phone 1 col, picture fills card, only list scrolls, one seal place+size, same figure per frame size, #56 picture on every card. Old main: 33 FAIL; this branch: all pass. opt-card-scan updated (picture = card height). KIT.md §6.2b/§6.2d/§39.1/§56.17 overwritten in place + new §6.2f (kit sample pages §6.2/§6.2b use the same CSS).

## Before / after (law 11, opt-card-scan + dialog-fixed, Fold / iPad)
| case | before | after |
|---|---|---|
| odds meter row | own row (all cards) | on title row (all) |
| picture vs card (TIERCHK bad) | 3/3, 2/2, 3/3 | 0 everywhere |
| FIG gap (mat2/dress/fest, Fold) | 21 / 20 / 22 FAIL | 0 |
| iPad layout mat, mat2, dress, fest, Hồi kết nhánh 1+2 | 1 column | 2 columns (2S) |
| Fold XL figure h (3 dialogs) | 666 / 537 / 472 | 666 / 666 / 666 |
| seal corner (126 event dialogs) | tr/br mixed, 40 px, 42 cover-FAIL | tr 34 px all, 0 FAIL |
| picture-less cards (Tiếp chuyện…) | 2/2 | 0 |

## Queued (not started): #54 Danh hiệu mới title ON the picture, #71 Fold narrow dialog on S/M/L/XL + test, #72 separate Mất row (Tốn/Được/Mất), #75 Lỡ hẹn avatar both devices, #76 left-slot person/item/matter, #80 picture at top of right column in small frames, #82 iPad 2-col lists + scan of every list frame.
