# REPORT act-merge-J4 (sonnet worker, child of MAIN CHÍNH 155) — tabs: Tài nghệ · Cung nhân · Tư trang · pets/plants · Hoàng tự

PRIORITY #1 CHECK ('act-merge'): OD 1 (26/11 ~07:25Z + ~07:32Z read verbatim: merge only TRUE duplicates, ĐỂ RIÊNG stays) | ledger 0 | claims 2 | main: dup-report doors none for these tabs | review/act-merge (plan, §4 row J4) REUSED | review/mg-trim c961211e (D5) MERGED, not redone | archive 0.
Branch `review/act-merge-J4` = origin/main 6b5d3d05 + review/mg-trim c961211e + this work. LAND READY sha: see MAIN message.

## What was built (one door = one button; ways inside the existing kit option dialog; no new kit part, no new number)
New module `dev/build/jactj4.js` (assemble.py: one name after jshelf.js) + `j83.js` (Mua đồ, my IROUTE rows) + test `dev/test/act-merge-j4.test.js`.
- `j4Door(title,intro,ways)` = Q + showModal option dialog (`kitOff` for a way that cannot be used now, its reason shown); every way keeps its OWN cost / odds / outcome / reason line.
- `j4Merge(fn,rules)` = wraps one tab builder, replaces the buttons of one family by ONE door button. A way's `go` taps a real button with the OLD attributes, so the old click handler (cost, roll, result card, log) runs untouched → no outcome or rule lost. A door with only ONE live way stays the old button (no useless click).
- Học door wraps `ktArtSkills` (jtabs, after jrcp) and calls the old `lessonMode` / `lessonVir` directly.
- Numbers: only existing BAL reads (Mua đồ range from IROUTE costs; Đức from BAL.rl.j83.ducIllBuy); one-core guards G1 pass.

## Button names old → new, per screen
| Screen | OLD buttons | NEW button (ways inside the dialog) | ĐỂ RIÊNG (own button) and why |
|---|---|---|---|
| Tài nghệ (each of 8 arts) | Tự học · Học với thầy · Học với Thái hậu | **Học** → Tự học · Học với thầy · Học với Thái hậu | Học lối mới với thầy / Các lối, sách phổ (a new style / a list); «Tự học, làm tác phẩm» in Tác phẩm (makes an item: other result); Phát bạc cứu giúp (Đức/Danh deed, once a month); Bảng tài nghệ hậu cung (a view) |
| Tứ đức (each of 4) | Tự học · Học với ma ma | **Học** → Tự học · Học với ma ma | Phát bạc cứu giúp cung nhân nghèo (Hạnh): charity, not study |
| Cung nhân › tab (Cung ngươi) | Thêm cung nữ · Thêm thái giám · Cài người vào cung khác · Chưởng sự tra xét cung nữ · Chọn làm cung nữ thân cận · Giao việc phòng bị (6) | **Thêm người** → Thêm cung nữ · Thêm thái giám; rest unchanged (5) | Cài người (a spy into another palace, 2 khắc) · Tra xét (finds spies) · Thân cận (a role) · Phòng bị (an order): four other features |
| Cung nhân › one servant | Thưởng vô cớ / Thưởng vì X · Phạt vô cớ / Phạt vì X · Tha lỗi · Đề bạt lên … · Đổi người · Xem người · Hỏi chuyện · Tiến cử · Chọn làm cung nữ thân cận · Giao việc phòng bị (10) | **Thưởng phạt** → Thưởng · Phạt · Tha lỗi · Đề bạt · Đổi người (6 buttons) | Xem người (buys a look at her traits) · Hỏi chuyện (evidence) · Tiến cử (recommend her) · Thân cận · Phòng bị; Tra khảo and Che chở (evidence / rescue, shown only in their situation) |
| Hoàng tự (per child) | Dạy chữ · Dạy lễ nghi · Tự dạy con tài nghệ · Mời thầy riêng · Xin Hoàng thượng cử Đại học sĩ · Mời thầy võ / Thôi học võ · Chăm sóc · Gửi thư, quà thăm con · Dẫn đi thỉnh an · Canh giữ các con · Về tẩm cung thăm con (7–9 shown) | **Dạy con** → Dạy chữ · Dạy lễ nghi · Tự dạy tài nghệ · Mời thầy riêng · Xin Đại học sĩ · thầy võ; **Chăm con** (only when a child has both ways: Chăm sóc + Gửi thư, quà thăm con; with one way the old button stays) | Dẫn đi thỉnh an (Hoàng thượng's fondness) · Canh giữ các con (a ward, all children) · Về tẩm cung thăm con (travel) · Bàn hôn sự (marriage) · Nhờ con nói giúp (a favour) — each another deed / other person |
| Tư trang | Nhờ thái giám mua đồ · Sai cung nữ thân tín mua lén ngoài cung · Hối lộ người ở Thái y viện · Chợ đen ở cửa Thần Vũ (4 routes) + Kiểm tra đồ · Xin đồng minh · Nhờ thái giám tìm thú nuôi | **Mua đồ** → the 4 routes, each its own odds, price, failure, Đức; then the old item dialog | Xin đồng minh (a friend's answer, not a purchase) · Kiểm tra đồ (finds poison) · Nhờ thái giám tìm thú nuôi (a pet shop → the pets door) |
| Pets / plants (jpet · jpetcare · jshelf) | Chăm <thú> · Cho theo hầu · Gửi về Ngự thú viên; care dialog: Cho ăn · Tắm, chải lông · Chơi · Giao X chăm (+ «Chăm nhanh» per game); plant: Tưới + Chăm nhanh + Giao X chăm | NO CHANGE | Owner 26/11 ~05:45Z: games stay as they are; D5 already put «Chăm nhanh» + «Giao … chăm» inside the ONE care dialog per pet / plant (LIVE mg-trim, merged here). Cho theo hầu ≠ Gửi về Ngự thú viên (two states of the slot). Merging further would only add a picker layer in front of the existing dialog |

Counts (buttons on one panel, from the code): Tài nghệ 3 per art → 1; Tứ đức 2 → 1; Cung nhân tab 6 → 5; servant 10 → 6; Hoàng tự 7–9 → 5 (after the Hoàng tự dialog opens: 6 ways inside Dạy con); Tư trang 7 → 4 (Mua đồ · Kiểm tra đồ · Xin đồng minh · Nhờ thái giám tìm thú nuôi).

## Gaps for MAIN / other jobs (not edited: files owned elsewhere)
1. Stage pop-up of a servant (`hsvActs`, jhouse.js) still shows Thưởng vô cớ / Phạt vô cớ / Đổi người separately (G8 row; it lives on the pop-up that J1/J2 own via dfActs). The same `Thưởng phạt` door can be wired there; I left it because the pop-up list is a `dfActs` act array, not a tab.
2. The Tài nghệ builders (jtabs, j85, j23, jrcp) are not in my file list: the door is a wrapper in jactj4.js over `ktArtSkills`, so no file of another job was touched.
3. `act-inventory.js` counts an act button only when its small line names tốn/khắc/bạc; the doors say «chọn cách …», so the scan's «ACT buttons» row under-counts doors (it shows Hoàng tự 4, real 5). The test counts button names itself.

## Tests (all PASS)
- `node dev/test/act-merge-j4.test.js dev/index.html [755x1000|1180x820]` (real taps on the built page, Fold + iPad): one Học per skill and no old Tự học / Học với thầy left; the dialog lists every way with its disabled reason; choosing a way runs the old flow (Thưởng: Bạc 200 → 190; Tự học opens the lesson; Hối lộ người ở Thái y viện opens the old item dialog); one «Thêm người»; Hoàng tự ≤ 5; Tư trang one «Mua đồ»; 0 page errors.
- one-core-guard, one-core-text, one-core-bind: PASS (no typed number).
- act-inventory.js re-run (scan-after in this folder is not committed; counts above).
- LOOK videos (one per device, the 5 doors opened by real taps): https://ctm-img.victoria-tntt.workers.dev/img/_review/act-merge-J4/J4-doors-fold-755x1000.webm and https://ctm-img.victoria-tntt.workers.dev/img/_review/act-merge-J4/J4-doors-ipad-1180x820.webm. (Thêm người shows disabled «đủ số theo phẩm» in that scenario.) Older note: no screenshots / videos delivered. The scenario harness (AA.scen) starts a new life, and the roulette / Thánh chỉ / reward overlays cover the tab for the first seconds; I could not get clean pictures within the budget. The dialogs are the standard kit option dialog (kitOptFinal path); MAIN's reviewer should look at: Tài nghệ › Học, Cung nhân › Thưởng phạt, Hoàng tự › Dạy con, Tư trang › Mua đồ on Fold + iPad.

## Handover (context)
Worker used ≈ 35 % of the window. Remaining ideas if a successor is opened: (a) wire `Thưởng phạt` into hsvActs after J1; (b) video of the four doors for LOOK; (c) add `Chăm thú` picker only if the owner asks (OD 17/11 ~18:15Z "ONE Chăm sóc act covers plants + pets").

## Servant pop-up entry point (for J2)
`j4ServDoor(s)` (jactj4.js, global) opens the same «Thưởng phạt» door for servant `s` (Thưởng · Phạt · Tha lỗi · Đề bạt · Đổi người, only those that exist now). J2: in hsvActs / dfActs replace the separate Thưởng vô cớ / Phạt vô cớ / Đổi người acts by ONE act whose `open`/`run` calls `j4ServDoor(s)`.
