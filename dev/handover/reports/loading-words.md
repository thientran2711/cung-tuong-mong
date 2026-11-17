PRIORITY #1 CHECK: OD 7 (loading screen, Thỉnh tranh chip) | main: jload.js, kboot.js, swreg.js, jk2b.js had the lines | review/* review/loading (already merged work: update card, chip) | claims status-icons / ios-install-first (kept their kit parts).

# loading-words — worker (sonnet)
Branch `review/loading-words` @ **7221f0b17** (base main 2de320ac). Built site committed. quickcheck --runs 3: **PASS** (open 1436 ms, old save ok, core gates PASS, perf render 124/133, tab 238/232, buổi 697/758).
Shots (CDN img/_review/loading-words/, Fold 755x1000 + iPad 1180x820, looked at): fold/ipad-1-boot-cover, fold-3-boot-fail, fold/ipad-5-loading-thinh-tranh, fold/ipad-4-rebirth-wait. Wipe after verdict: `python3 dev/site/cdn_sync.py --wipe-review loading-words`.
Not shot: co-op wait/freeze overlay, Sổ mây busy lines (need a live room / cloud); changed by string only, node --check OK.

## What
ONE table `window.CTM_WAIT` in new `dev/site/kwait.js` (inlined in head before kboot by build_site.sh, and at the start of the game script by assemble.py). Code reads `CTM_WAIT.key`. Scan: `python3 dev/test/wait-words-scan.py` (remaining hits = story prose "mạng"=life, and the menu name «Thông tin cập nhật», see Open). KIT.md §KWAIT + kprog note, VANPHONG row added. No logic change.
Kit part changed: `kitProgress` number beside the bar was "26 / 83 MB" → words (mới chút ít / một phần tư / quá nửa / gần đủ / đủ cả).

## Before → after (file: old → new)
| where | old | new |
|---|---|---|
| jk2b.js:706 Luân hồi wait | Đang bày các thân phận… | Tranh luân hồi đang trải các thân phận… |
| kboot.js fail card (slow) | …hoặc tải lại. | …hoặc mở lại. |
| kboot.js fail card (broken) | Máy này chưa mở được bản game. Xin tải lại; … xóa bộ nhớ đệm rồi tải lại | Cửa cung ở máy này chưa mở được. Xin mở lại; … quét sạch lối cũ rồi mở lại |
| kboot.js buttons | Tải lại / Xóa bộ nhớ đệm rồi tải lại | Mở lại / Quét lối cũ rồi mở lại |
| jload.js bar number | a / b MB | words (dlPart) |
| jload.js panel rows | Đã về x / y MB; Còn lại N tệp | Đã về <words>; Còn lại: còn N món |
| jload.js notes | không cần mạng; (N MB) | không cần đợi đường xa; size dropped |
| jload.js errors | Mạng đứt / chập chờn / có mạng | Đường xa đứt / chập chờn / thông lại |
| jload.js pause | Dừng việc tải ngầm | Cho tranh nghỉ chân |
| jload.js button | Chơi luôn trên trình duyệt | Chơi luôn ở đây |
| jcloud.js | Chưa nối được mây; có đường mạng… | Chưa với tới mây; đường xa thông… |
| jcloud.js | Đang gửi, đang lấy… / Đang nối… / Đang lấy danh sách… | Đang gửi sổ đi, lấy sổ về… / Đang nối sổ với mây… / Đang tìm các bản đã giữ… |
| jcloud.js | đồng bộ lúc / Đồng bộ ngay | khớp lúc / Khớp sổ ngay |
| jcloud.js | Bản này do bản trò chơi khác ghi | Sổ này do một lần mở cung khác ghi |
| jcooplobby.js | Chưa nối được với phòng… đường mạng; Đường mạng của ngươi vừa đứt | Chưa vào được phòng… đường xa; Đường xa của ngươi vừa đứt |
| jcooptimer.js | đang vắng hay mất kết nối · mở lại trò chơi | đang vắng hay đứt đường xa · mở lại |
| j16.js | Không ghi được (bộ nhớ trình duyệt…) | Không ghi được sổ (chỗ cất trong máy…) |
Moved to the table unchanged (one source): boot "Cửa cung đang mở", "Đường xa, cung đang dựng dần…", co-op wait labels (jcoopworld), "Đã mở bản mới" lines (swreg), "Đang vào phòng …", "Đang soát tranh…".
Tests updated: webkit-boot.js, chonso-cloud.js (new words).

## Open (owner review, not self-assigned)
- Menu entry «Thông tin cập nhật» (j74/jnotes): "cập nhật" is modern; suggest «Tin bản mới» or «Sổ đổi mới». Needs owner pick.
- iOS notes still say Safari / iPad / màn hình chính (device names, kept).
- VP (j84) still rewrites "ngươi"→"ta" on screen; table text says "ngươi" in two lines (screen shows "ta").
