PRIORITY #1 CHECK: OD L1981, L2008, L2036 | main kgReady/kitGameFrame/kg82Frame (jsgame already has kgReady) | review/mg-ui-rest b5253eeb, review/mg-noword-b (holds MG04) | claims REVIEW mg-ui-rest
# rv mg-ui-rest — verdict FAIL b5253eeb (1 fix)
Branch review/mg-ui-rest-rv = 9137759f (b5253eeb + origin/main 66bd36cd merged; only index.html/sw.js conflicted, rebuilt by build_site.sh + assemble.py). No code fix made by me.
## Passed
- Tests on the merged tree: mg-ui-rest.js 35/35 at 755x1000 AND 1180x820 (no page errors). mg-ready-guide / ag-mgcal were still running when I wrote this verdict (not awaited, because the FAIL below already blocks).
- kgReady rules screen opens first for feed/bath/play/water; khắc only on «Sẵn sàng»; guided round unscored; «Để trời định» spends once; bath fix (petcFig .kszfig fallback) real.
- Seal: kpHeader/kitGameFrame/kg82Frame/kg82Open take `seal` (default TÀI NGHỆ); jsgame passes MƯU; every other caller defaults; no per-screen variant. Điểm trang (jmkt/jtoil) untouched. MG04 skipped, agrees with mg-noword-b.
- Plant (jshelf) rules screen looks right on iPad (Sẵn sàng + Hướng dẫn visible).
## FAIL 1 (blocking): pet care rules screen — «Sẵn sàng» / «Hướng dẫn» are cut off and unreachable
The pet dialog is the figure-left layout (.ksz3); its `.k3right` is `overflow:clip` (not user-scrollable), so scrollIntoView in petcRules does nothing (scrollTop stays 0). Measured bottom of «Hướng dẫn» vs bottom of .k3right (css px):
| device | feed | bath | play |
| Fold 755x1000 | 834 / 885 ok | 942 / 780 CUT | 939 / 780 CUT |
| iPad 1180x820 | 796 / 684 CUT | 808 / 681 CUT | 808 / 681 CUT |
| iPad 1366x1024 | 898 / 786 CUT | 910 / 783 CUT | 910 / 783 CUT |
Her own shots (worker's, pet-*-rules-*) show the same: the button row is below the dialog edge. She cannot press «Sẵn sàng» → pet care unplayable. (Worker's "open nit" was this.) Law 10 (frame→layout→button: no scroll-hidden primary button).
Fix (kit, whole group): on the pet rules screen the dialog must fit: e.g. while .kg-ready is on, collapse the pet info block above (picture/stat/«Lớn tiếp») or make the figure-left dialog's right column scrollable; then re-scan every kgReady-in-dialog place (pet 3 kinds, plant) at Fold/iPad/1366 with a measured test (add assert: kgr-go and kgrtut bottoms <= visible bottom of their dialog column, all three devices) + LOOKED shots.
