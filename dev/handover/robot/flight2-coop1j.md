# flight2-coop1j — A-COOP #3 fresh co-op room on LIVE (host Fold 755x1000 / guest iPad 1180x820), real taps, no cap, no exit road
PRIORITY #1 CHECK: harness = review/robot-realtap-live d1d1541f (newest robot-rt, contains 2df8f5fa) | main 772bee4f = LIVE CTM_BI b 86170222adab (s d9ca7892+ t 2026-11-27T12:32Z) | coop-clear 8e1121d3 (RV-173) | claims A-COOP #3 (CLAIMS 15:46Z).
Handover line: depth 5 · START_CTX ~4 % of 1M (estimate; get_session reads 0).
Branch: review/flight2-coop (harness/test files + this folder only; game code = LIVE served by rt-serve-build.sh, pin=1).

## (a) Harness port of 8e1121d3 — f3a3c18a
- 1c HELD RESULT CARD: robot-rt INFO now returns `#rtoast.on.kres-hold .kres-next` (jverdict RF hold, ob-verdict-3) as a layer; the seat real-taps «Tiếp ▸» at its hit-checked centre (counter R.harness.kresTaps). Before: the held card covers no button (modal hidden), so the old «blocks» test skipped it.
- SCN body.kscn-on: NOT APPLICABLE to the real-tap harness — robot-rt / realtap / rt-* never read body.kscn-on; they read real `.kscn` elements, and the kit stage dialog (#modal.kstg) is an ordinary #modal layer.
- Proof in play: room b host-k1 kresTaps 15 in its first buổi (the card was tapped, the next card came).

## (b) Rooms
### Room a — RCT6, seed 7101, 15:51–15:56Z — STOPPED (not a co-op test)
- guest-k1 «Nhan Kiều Ân» (Tú nữ, Sắc 86) ended at Điện tuyển, buổi 1: «Ban hoa — Bị ban hoa, xuất cung», age 18 (game over() verdict, no exit pick, 0 dead buttons) = game-imposed ending, VALID life.
- The guest then took kiếp 2…6 IN THE ROOM («Trở lại phòng» → «Kiếp thứ hai/ba…»): the same fixed thân phận (j52 «Thân phận này đã định sẵn»), same stats, same picks → «Ban hoa» at buổi 1 every time (6×). Host meanwhile at #coopfz «Đợi hảo hữu trở lại — Hảo hữu đang vắng» between the guest's lives. Room can never reach a week end → stopped, new seed. Not a game hang (the guest seat always had a way on).
- «Ban hoa» at the first Điện tuyển (room a guest, room b host) = KNOWN live bug «Ban hoa b1» per F ROOT #5 16:08Z (fix Foreman D review/live-bugs-2711-rv b5639104, LAND READY, not live) — logged, not hunted.
- F ROOT #5 16:08Z caution: harness base d1d1541f under BIG #21 FAIL (F1 lift PASS rows not proof; F2 plaque «mine» bugs = harness-suspect). Hang judgement uses real screen state of both seats only.
### Room b — QWWC, seed 7102, 15:56–16:30Z — STOPPED (HARNESS fault, not a game hang)
- host-k1 «Ban hoa» at Điện tuyển, buổi 1, age 19 (known bug Ban hoa b1; bugs: 1 two-tap «Trò chuyện với Quách Lạc Anh» nothing lifted (BIG #21-suspect); 1 coop rejoin).
- HARNESS FAULT: the next kiếp of a seat had pre=null → host-k2 tapped «Chơi một mình → Một mình» and played SOLO (k2 voided IDENTITY at buổi 46 after a reload, k3 Ban hoa, k4 solo) while guest-k1 «Thôi Dao Quang» sat at #coopfz «Đợi hảo hữu trở lại · HẢO HỮU đang vắng · TA đang ở trong cuộc» (stuck-1 15 min, guest still had «Chép đường dẫn / Về màn đầu» + «Nhận» behind). Not a mutual wait: the host had left the room.
- FIX c5a242e0 robot-rt-coop.js: a seat's next kiếp uses resumePre (title → «Cùng hảo hữu» → «Trở lại phòng»), never «Chơi một mình» / «Mời hảo hữu».
### Room c — seed 7103, from 16:30Z on c5a242e0 — RUNNING
- Foreman = F ROOT #6 session_01UV1SzhyWsBExe78xC7zMYR from 16:29Z.

## (c) Hang watch
Watcher /home/user/wt/coop1j-watch.sh: stops when either seat (host / guest) has no file change for 15 min; then both seats are checked by hand for every card / button / kscn.
