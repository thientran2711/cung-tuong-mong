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
1. (DONE in the last commit: `hsvJudgeDoor` in jhouse.js folds Thưởng/Phạt/Tha lỗi/Đổi người into ONE «Thưởng phạt» on the stage pop-up via j4ServDoor; Tra khảo/Che chở stay.) Was: stage pop-up of a servant still shows Thưởng vô cớ / Phạt vô cớ / Đổi người separately (G8 row; it lives on the pop-up that J1/J2 own via dfActs). The same `Thưởng phạt` door can be wired there; I left it because the pop-up list is a `dfActs` act array, not a tab.
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

---
# J4b (successor of J4, child of MAIN CHÍNH 157) — ONE DOOR ENGINE switch + re-stack on J1

PRIORITY #1 CHECK: OD 26/11 ~07:25Z/~07:32Z/~08:15Z act-merge rows | main 3af7896e | review/act-merge-J1 c18fe3a5 (jdoor.js DOOR.fold / DOOR.card / DOOR.add, talk-list doorFold), review/act-merge-J0 52334847 (kit, already in J4), review/act-merge-J4 940d6096 (J4's own thin switch) | claims J4 → J4b.

## What changed (law 9: one door engine; no private runner left)
- `jactj4.js`: the private runner `j4Door` (own Q.push + showModal) is DELETED. `J4DOOR` holds ROWS only ({n, x, off:{why}, go}); every tab door card is J1's `DOOR.card(title,h,rows,pMe())` through `j4Card` (adds the KIT §28.6 data flag `act` on the card, like jtamco «roadpick», so the kit treats it as her act picker, not an event: no event seal / co-op timer).
- Fold decision = J1's `DOOR.fold` (`j4Fold`), with J1's talk-list rule (doorFold): a door when ≥ 2 ways are PRESENT; locked door (first way's reason) when none can be used now; < 2 ways → the old button stays.
- `j83.js` illDoor («Mua đồ», Tư trang): its private Q.push dialog → rows + the same card.
- `jhouse.js` servant STAGE pop-up «Thưởng phạt»: J4's private fold `hsvJudgeDoor` + `j4ServDoor` DELETED. It is now a row of J1's engine: `DOOR.add({k:"sj",n:"Thưởng phạt",kinds:["serv"],re:/^(Thưởng|Phạt|Tha lỗi|Đổi người$)/})` (added on the first servant list, since jdoor.js loads after jhouse.js). J1's talkOpts fold, PEND «door» card and talk(-1-j) member path run it; inside the Dư đồ person view J1's doorOpen shows the card as her tap. Members on the stage = what the stage had (Thưởng vô cớ / vì X · Phạt · Tha lỗi · Đổi người); Đề bạt stays on the Cung nhân card door (it never was a stage act).
- Học door, Thái hậu way: the copied buổi-only khắc gate (time-spill guard FAIL) is replaced by j76's own reason: `dayWhy(n)` inside the sáng-lesson window (as `lessonMode` th does).
- BRANCH (MAIN 158, 11:08Z): mg-trim c961211e is on HOLD, J4 does not need it → **review/act-merge-J4b = ce106915, re-stacked on J1 07d74f6a = 3b163bcc (LAND READY)** = J1 LAND READY fe457201 + J4's own files only (jactj4.js, j83 illDoor hunk, jhouse stage row, assemble, test). review/act-merge-J4 (3b92b4b2, carries mg-trim) is superseded; not force-pushed.

## NAME table old → new (unchanged from J4 except the stage row)
| Screen | OLD | NEW (door → ways) | ĐỂ RIÊNG |
|---|---|---|---|
| Tài nghệ (each art) | Tự học · Học với thầy · Học với Thái hậu | **Học** → same 3 | Học lối mới · Các lối / sách phổ · Tự học, làm tác phẩm · Phát bạc cứu giúp · Bảng tài nghệ |
| Tứ đức (each) | Tự học · Học với ma ma | **Học** → same 2 | Phát bạc cứu giúp cung nhân nghèo |
| Cung nhân tab | Thêm cung nữ · Thêm thái giám | **Thêm người** → same 2 | Cài người · Tra xét · Thân cận · Phòng bị |
| Cung nhân › servant | Thưởng · Phạt · Tha lỗi · Đề bạt · Đổi người | **Thưởng phạt** → same 5 | Xem người · Hỏi chuyện · Tiến cử · Thân cận · Phòng bị · Tra khảo · Che chở |
| Stage pop-up › servant | Thưởng vô cớ/vì X · Phạt · Tha lỗi · Đổi người | **Thưởng phạt** (J1 engine row «sj») → same | Tâm sự · Dò la tin tức (J1 door) · Hỏi chuyện · Phòng bị · Xem người · Tiến cử · Tra khảo · Che chở |
| Hoàng tự (per child) | Dạy chữ · Dạy lễ nghi · Tự dạy tài nghệ · Mời thầy riêng · Xin Đại học sĩ · thầy võ; Chăm sóc · Gửi thư, quà | **Dạy con** → the teach ways; **Chăm con** → Chăm sóc · Gửi thư (only when both exist) | Dẫn đi thỉnh an · Canh giữ các con · Về tẩm cung thăm con · Bàn hôn sự · Nhờ con nói giúp |
| Tư trang | Nhờ thái giám mua đồ · Sai cung nữ mua lén · Hối lộ Thái y viện · Chợ đen | **Mua đồ** → same 4 | Xin đồng minh · Kiểm tra đồ · Nhờ thái giám tìm thú nuôi |
| Pets / plants | — | NO CHANGE (owner 26/11 ~05:45Z) | all |

## Tests on review/act-merge-J4b ce106915
- act-merge-j4.test.js Fold 755x1000 + iPad 1180x820: ALL PASS (16 checks each, incl. «no private runner j4Door», «door card = act picker with ✕ Thôi», stage door = J1 row sj with ≥ 2 members).
- one-core-guard / one-core-text / one-core-bind: PASS · time-spill-guard: PASS (static + runtime).
- act-merge-j1.test.js (J1 engine, every person met × scen × buổi, on the J4 stack): door cards opened 156 · members run 149 · page errors 0 · FAIL 0 (servant doors in scope).
- Real taps (LOOK, own shots, Fold + iPad): Học (Công) · Thưởng phạt (Cung nhân) · Mua đồ (Tư trang) · Dạy con (Hoàng tự) open the standard kit card, ways keep their own Tốn / Được / Mất and odds words, disabled ways grey with reason, ✕ top right.
- quickcheck: open · old save from LIVE · perf (render 236/255, tab 536/622, buổi 1751/2125 ms new/live) PASS; core gates FAIL only G4 80-dialog-fixed «(kit-dialog-2 a) no empty Tốn / Được cell» on a SYNTHETIC card — the same 2 FAIL on J1 fe457201 alone (pre-existing in J1's base, not J4). button-crawl / next-dead failed once under CPU load on the mg-trim stack and PASS on J4b.

## LIMITS
- Servant door opened from INSIDE the Dư đồ person view: no real tap — across 4 scenarios × 6 seeds × 3 buổi × every place the stage never showed a servant figure (it shows ≤ 2 figures; the rest behind «+N», whose tap opened no list in the harness). The path is J1's own (doorOpen in the person view, the same code J1's tap test drives for consorts) and J1's engine test runs the servant door with 0 fail. RV should tap one servant on a real save.

## HANDOVER (J4b, context ≈ 55 %)
Worktree /home/user/wt/j4b (branch review/act-merge-J4b). Re-stack on a newer J1 head: merge it, take ours for index.html/sw.js/assets.json, `bash dev/site/build_site.sh`, run act-merge-j4 test both devices + guards, push FF. Tap script used for LOOK: /home/user/wt/j4b-shots/shot.js (scratch, not in git).
