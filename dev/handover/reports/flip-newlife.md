# flip-newlife — SẴN SÀNG KIỂM 9bea3721e55a72c35f487ced821e85804a371884 (review/flip-newlife; merged main c4e89f89; also fixes bug 4 empty-room text + bug 5 whole-name painter, see dev/PROGRESS_flip-newlife.md)
- Root: week-0 palace flip queued in j93 KMQ inside start() while the Luân hồi identity card (NLP) is open; nothing reset queue/scenes on a new life. Reproduced on main (scene over the card).
- Fix: j93 kmReset()/kmOnReset (queue, running-job gen, all .kmov/#kmrew/.kmfly/.kmalarm, podium, buổi transition) called from start() and slot load; jflip life token + busy() waits while NLP open (scene plays after "Nhận thân phận").
- UI (kit only): "Tất cả" usable first; grey-card popover sits ON the tapped card (kpPop inside); shop rare tile has kitItem mark "hàng hiếm".
- Tests: dev/test/flip-newlife.js + flip-newlife-ui.js pass at 755x1000@2, 1180x820@2, 844x390@2; cardflip.js (bot now accepts identity card) real scene plays; act-dedupe-w1 0 FAIL. Shots looked at.
- Found, not fixed: at 1180x820 the identity card's face-pick .ksub strip (sticky) overlaps "Nhận thân phận / Đổi thân phận".
- Not run: coop suites, route.js, oldsave (none touch changed code paths except start()).
