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

# Round 2 — PASS 2859b245
PRIORITY #1 CHECK: unchanged (see above).
- Worker fix 24e15807 (care info folds while the game frame is open): measured assert 39/39 on Fold 755x1000 (3 runs, no flake), iPad 1180x820, 1366x1024; shots looked (buttons inside dialog).
- NEW reviewer fix 2859b245: quickcheck FAILED perf on 24e15807 twice (render 377/255, 368/240 ms; tab 728/540, 710/513 vs live) while 9137759f passed -> culprit = the `#kpcare:has(...)` CSS. Replaced by a `.kg-open` class set in petcGameBox / water open and removed in petcDraw / shelfPlantDraw / quick-roll clear. mg-ui-rest re-run 39/39 (Fold x3, 1180, 1366).
- quickcheck on 2859b245 PASS: render 297/273, tab 540/637, buoi 1294/1461, old save ok, core gates PASS.
- mg-ready-guide PASS 9/9; ag-mgcal ok; care-oldsave ok (pets=2, no banner/overlap, 0 errors); mk-oldsave-pets needs other args (skipped; quickcheck old-save ok).
- origin/main 66bd36cd is an ancestor of 2859b245 (FF-able).

# Round 3 — LAND READY 86a8125993900dfdf60b58bbcd608b532fc55b36
Final-merge of LIVE 90b7e797 (mg-back + noword-kit + kit-ge) into review/mg-ui-rest-rv. Real conflict in dev/build/j82.js resolved keeping BOTH intents: kgReady «Sẵn sàng» click = `kg82El()||box.closest(".kgame")` + `KG82.backPre=null;kgPay()`; CSS = LIVE `.kg82 .kghow{display:none}` + my `.kgame.kg-ready/.kg-tut .kghow{display:none}` + `#kpcare.kg-open` fold. index.html/sw.js rebuilt.
Tests on the merged tree: mg-ui-rest 39/39 (Fold, iPad 1180, 1366); mg-back 12/12; mg-noword-kit PASS 31 kinds 0 words; mg-ready-guide 9/9; quickcheck PASS on rerun (first run: core gate g4 coop-one-world flaked "guest week changes the world", passes on rerun; perf ok).

# Round 4 — LAND READY ce4db1cf5b831b9c3d7a6c35decdbe4ec16d25af
Final-merge of LIVE 0aaf8152 (cal-p2b + mg-noword-b + kit-mark). Conflict in dev/build/j79.js kitGameFrame resolved keeping all: kpHeader(..., g.seal) + `<span class="kgmk" hidden>` + `<span class="kgclk" hidden>`. index.html/sw.js rebuilt. Tests: mg-ui-rest 39/39 (Fold, 1180, 1366); kit-mark PASS; mg-back 12/12; mg-noword-kit PASS 31 kinds 0 words; quickcheck PASS (render 269/260, tab 553/524, core gates PASS).
