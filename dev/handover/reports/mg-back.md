# mg-back — kit ✕ «Quay lại» on every mini-game screen (MAIN ROOT-73, owner bug fast lane)
PRIORITY #1 CHECK ('kgrback|Quay lại|go back|mg back'): OD 5 (generic) | ledger 0 | claims 0 (own row) | main: kit ✕ only on result screens (jk4 kitOvSync), none on rules/play; Thử tay only «Thôi» on the kind list | review/* 0 | reused: kit ✕ kitXHTML (32.10), kitConfirm (83.9), kitOvBtn.
START_CTX ~5 % (1M window); now ~15 %. Depth 3.

Branch **review/mg-back** = **883aaa7a** (from dddb1f94, merged newest origin/main d74f86a5 clean).

## What
- **KIT §13.9** (j82 `kg82BackX` / `kg82Back` / `kg82GiveUp`, KIT.md entry): ONE kit ✕ (`kitXHTML('data-kitx="kgback"',"Quay lại")`, the 32.10 ✕, no new CSS look) put by `kg82Open` in the frame header — rules screen, «Hướng dẫn», play, result, every caller. jk4 kitOvSync adds no second ✕.
- Order: `KG82.back` (nothing at stake → back) → result button (kitOvBtn, old behaviour) → `KG82.xdo` (only way on: jsgame «Ra tay», jtoil result, Nghiệm thân blood scene) → else **give up** (laws 2/3): kit `kitConfirm` «Bỏ cuộc?» (Bỏ cuộc / Chơi tiếp, lifted over #ov by `body.kg82cf{z-index:40}`), then the caller's OWN lose path with 0/10: during play `KG82.quit()`, rules screen = «Sẵn sàng» run with `KG82.giveUp` (ends at once with 0, no board, no clock).
- **Thử tay** (jmgcal): ✕ → kind list from rules / Hướng dẫn / between rounds at once, during play after a confirm («Bỏ dở môn …: các hồi đã chơi của môn này không được ghi»); kind left early NOT saved (recSet only at round n, unchanged); first-try rule unchanged. Kind list: «Thôi» row removed (✕ closes it, 32.10). Between-round button renamed `#mgcal-nx` so the ✕ means «Quay lại» there.
- Hooks: kg82Play (startContest, playArt, jexam, jentry, jslap, jtd, jts, Thử tay), jsgame sgEng, j92 (rules = straight back, nothing spent; play = «quá giản dị», the timeout rule), jroute (give up = «bị nhìn thấy»), jtoil + jmkt (✕ = «Để mộc», own confirm lines).

## Tests
- `node dev/test/mg-back.js dev/index.html 755x1000` **PASS 8/8**; `1180x820` **PASS 8/8** (merged build).
- `node dev/test/mg-ready-guide.js` PASS 9/9 (31 kinds × callers; jmgcal step uses #mgcal-nx); `node dev/test/ag-mgcal.js` all ok (same id update). No page errors.

## Scan table (caller | screen ✕ | rules ✕ goes to | play ✕ goes to | cost/stake effect) — 755x1000
| caller | rules ✕ | Hướng dẫn ✕ | play ✕ | result ✕ | rules ✕ goes to | play ✕ goes to | cost/stake effect |
| startContest (hội thi) | ✕ | ✕ | ✕ | ✕ | confirm → own result: Màn thiVụng 0/10 → +0Tài 63+19Cầm bậc 1+9Cầm: Hoàn | confirm → own result: Màn thiVụng 0/10 → +0Tài 63+19Cầm bậc 1+9Cầm: Hoàn | contest stake / place prizes → give up → last-place result (0/10 màn thi) |
| playArt (học, tự học, tác phẩm) | ✕ | ✕ | ✕ | ✕ | confirm → own result: Màn chơi0/10 · VụngĐã hiểu | confirm → own result: Màn chơi0/10 · VụngĐã hiểu | khắc / materials already spent by the caller → give up → «Màn chơi 0/10» |
| jexam khảo hạch | ✕ | ✕ | ✕ | ✕ | confirm → own result: Môn 10/10 · VụngMôn kế tiếp | confirm → own result: Môn 10/10 · VụngMôn kế tiếp | exam subject → give up → this subject 0/10, exam goes on |
| jentry tuyển chọn | ✕ | ✕ | ✕ | ✕ | confirm → own result: Màn chơi0/10 · VụngKết quảtính cùng Sắc, Tài, ĐứcĐ | confirm → own result: Màn chơi0/10 · VụngKết quảtính cùng Sắc, Tài, ĐứcĐ | entry exam → give up → 0/10 |
| jslap Tát / Né | ✕ | ✕ | ✕ | ✕ | confirm → own result: Kết quảTay nhẹĐã hiểu | confirm → own result: Kết quảTay nhẹĐã hiểu | slap stake → give up → 0/10 lose result |
| jtd Tu đức | ✕ | ✕ | ✕ | ✕ | confirm → own result: Màn chơi0/10 · VụngMục đíchĐường kim đều và đúng m | confirm → own result: Màn chơi0/10 · VụngMục đíchĐường kim đều và đúng m | khắc of the lesson → give up → 0/10 |
| jts Hoàng thượng triệu | ✕ | ✕ | ✕ | ✕ | confirm → own result: Màn chơi0/10 · VụngĐã hiểu | confirm → own result: Màn chơi0/10 · VụngĐã hiểu | the summons → give up → 0/10 lose |
| jsgame mưu kế | ✕ | ✕ | ✕ | ✕ | confirm → own result: Phần chơiVụng · 0/10Vụng về: cơ may xuống một bậc. | confirm → own result: Phần chơiVụng · 0/10Vụng về: cơ may xuống một bậc. | scheme odds → give up → 0/10 odds result, ✕ there = «Ra tay» |
| jroute Nghiệm thân | ✕ | ✕ | ✕ | ✕ | confirm → own result: Ra taybị nhìn thấyNgười canh3 ngườiCó người đã thấ | confirm → own result: Ra taybị nhìn thấyNgười canh3 ngườiCó người đã thấ | the trick → give up → «bị nhìn thấy» |
| j92 Chải chuốt | ✕ | ✕ | ✕ | ✕ | closed (back) | confirm → own result: Trâm càiTrâm ngọc bíchY phụcVáy sa xanh ngọcKim dừ | spend(1) only at the end → rules: straight back (nothing spent); play: give up → «quá giản dị» (the timeout rule) |
| Thử tay (mgcal) | ✕ | ✕ | ✕ | ✕ | kind list, no confirm | confirm → kind list | nothing at stake; kind not saved |

## Shots (Fold 755x1000@2 + iPad 1180x820@2, looked) — CDN img/_review/mg-back/
rules https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/rules-755x1000.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/rules-1180x820.webp
play https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/play-755x1000.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/play-1180x820.webp
Thử tay confirm https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/confirm-755x1000.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/confirm-1180x820.webp
kind list after back https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/list-755x1000.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/list-1180x820.webp
hội thi confirm https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/contest-confirm-755x1000.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/contest-confirm-1180x820.webp
hội thi give-up (ceremony then result) https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/contest-giveup-755x1000.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/contest-giveup-1180x820.webp

## Notes for main
- PRE-EXISTING (same on main, not touched): Thử tay kind list at 1180x820 — the kind buttons overlap the «Đã thử / Chưa thử» rows and the «Hoặc chọn một môn» heading (kg82act grid over kitRows). Worth its own small fix.
- While the give-up confirm is open the board keeps running (clock not paused); «Chơi tiếp» returns to the live board. Pausing would need an engine pause hook per family — left out to land fast.
- j5 old lesson panel (openMG fallback, not the kg82 frame) not changed.
- Free return (no give-up) is used only where nothing is charged before the end (Thử tay, Chải chuốt rules); every other caller gives up with its own lose result, per brief item 3.

# r2 — reviewer FAIL 883aaa7a fixes (rv-mg-back.md @86ad3dfb; order MAIN ROOT-74)
Branch **review/mg-back** = **7f7d467a** (r2 a0a98e66 + merge origin/main eb056f7b, clean).
1. **jtd Tu đức**: rules ✕ = its own «Thôi, để lúc khác · không tốn gì» (`KG82.backPre=cancel`); nothing charged, no tdFinish.
2. **Pre-charged callers → FREE back before «Sẵn sàng»** (KIT §13.9 step 0): `KG82.preBack` (set by the caller right before the frame opens) → `kg82Open` turns it into `KG82.backPre`, cleared by «Sẵn sàng» / any result / kg82Close. Undo = `kgSnap()` (S top-level fields that changed + khắc `used` put back exactly) + what the dialog option paid (material). Wired in: j83 wkAsk + **jwkr wkrMat (the live recipe picker overrides wkAsk — same go pattern, whole group)**, both reached by lessons (self / thầy / Thái hậu), practice and jrcp rcpMaster; jveil vlCraftRun; jsgame sgpick pay. **Found while testing:** jaudit already defers lesson costs (`__aaPend` / `S.mg.cost`, paid when the game reports) — a free back now drops that pending cost (jaudit rule (c) "closed unplayed costs nothing"), else every later lesson / act stayed blocked (`busy()`). jaudit works deck card («Tự học …» in Hành sự, cost only pending): back = card untaken, S.mg cleared.
3. **jsgame result**: ✕ asks kit confirm «Ra tay?» («Ra tay» / «Ở lại»), never silent; «Ở lại» keeps the card, nothing runs.
- Stake callers unchanged (give-up). jtoil/jmkt: khắc is spent entering the mirror; ✕ = its own existing «Để mộc» button (reviewer OK). jsmg: give-up = its free «Thôi» result (reviewer OK). j92 rules free back (unchanged).

## r2 tests (merged build 7f7d467a)
- `node dev/test/mg-back.js dev/index.html 755x1000` **PASS 11/11**, `1180x820` **PASS 11/11** (new: 6 free back per pre-charged caller — S + khắc identical, nothing left pending; 6b those callers really charged/held pending; 7 jsgame «Ra tay?»).
- `mg-ready-guide.js` PASS 9/9; `ag-mgcal.js` all ok; no page errors.

### Free-back scan (caller | charged/held before the frame? | rules ✕ | S + khắc after | pending left)
| caller | charged before frame | rules ✕ | state | pending |
|---|---|---|---|---|
| jtd Tu đức (self) | no (pending/none) | free back: closed, no confirm | identical | none |
| jtd Tu đức (thầy) | no (pending/none) | free back: closed, no confirm | identical | none |
| j83 Tự học (bậc 5, vật liệu tốt) | yes | free back: closed, no confirm | identical | none |
| j83 học: tự học | yes | free back: closed, no confirm | identical | none |
| jrcp học với thầy | yes | free back: closed, no confirm | identical | none |
| jrcp thầy dạy lối mới (bậc 5) | yes | free back: closed, no confirm | identical | none |
| j83 thẻ Tự học (Hành sự) | yes | free back: closed, no confirm | identical | none |
| jveil kết mạng (dây bạc) | yes | free back: closed, no confirm | identical | none |
| jsgame mua chuộc (trả khắc) | yes | free back: closed, no confirm | identical | none |

### Full scan table r2 (755x1000)
| caller | rules ✕ | Hướng dẫn ✕ | play ✕ | result ✕ | rules ✕ goes to | play ✕ goes to | cost/stake effect |
| startContest (hội thi) | ✕ | ✕ | ✕ | ✕ | confirm → own result: Màn thiVụng 0/10 → +0Tài 64+19Cầm bậc 1+9Tổng28 ph | confirm → own result: Màn thiVụng 0/10 → +0Tài 64+19Cầm bậc 1+9Tổng28 ph | contest stake / place prizes → give up → last-place result (0/10 màn thi) |
| playArt (học, tự học, tác phẩm) | ✕ | ✕ | ✕ | ✕ | confirm → own result: Màn chơi0/10 · VụngĐã hiểu | confirm → own result: Màn chơi0/10 · VụngĐã hiểu | callers that pre-charge (j83, jrcp, jveil) pass their undo → rules: free back with the charge undone (or give up when no undo); play: give up → «Màn chơi 0/10» |
| jexam khảo hạch | ✕ | ✕ | ✕ | ✕ | confirm → own result: Môn 10/10 · VụngMôn kế tiếp | confirm → own result: Môn 10/10 · VụngMôn kế tiếp | exam subject → give up → this subject 0/10, exam goes on |
| jentry tuyển chọn | ✕ | ✕ | ✕ | ✕ | confirm → own result: Màn chơi0/10 · VụngKết quảtính cùng Sắc, Tài, ĐứcĐ | confirm → own result: Màn chơi0/10 · VụngKết quảtính cùng Sắc, Tài, ĐứcĐ | entry exam → give up → 0/10 |
| jslap Tát / Né | ✕ | ✕ | ✕ | ✕ | confirm → own result: Kết quảTay nhẹĐã hiểu | confirm → own result: Kết quảTay nhẹĐã hiểu | slap stake → give up → 0/10 lose result |
| jtd Tu đức | ✕ | ✕ | ✕ | ✕ | closed (back) | confirm → own result: Màn chơi0/10 · VụngMục đíchĐường kim đều và đúng m | nothing before tdFinish → rules: free back = its «Thôi, để lúc khác»; play: give up → 0/10 |
| jts Hoàng thượng triệu | ✕ | ✕ | ✕ | ✕ | confirm → own result: Màn chơi0/10 · VụngĐã hiểu | confirm → own result: Màn chơi0/10 · VụngĐã hiểu | the summons → give up → 0/10 lose |
| jsgame mưu kế | ✕ | ✕ | ✕ | ✕ | confirm → own result: Phần chơiVụng · 0/10Vụng về: cơ may xuống một bậc. | confirm → own result: Phần chơiVụng · 0/10Vụng về: cơ may xuống một bậc. | pay (khắc / bạc) at the choice → rules: free back, pay undone (sgpick); play: give up → 0/10 odds; result ✕ asks «Ra tay?» |
| jroute Nghiệm thân | ✕ | ✕ | ✕ | ✕ | confirm → own result: Ra taybị nhìn thấyNgười canh3 ngườiCó người đã thấ | confirm → own result: Ra taybị nhìn thấyNgười canh3 ngườiCó người đã thấ | the trick → give up → «bị nhìn thấy» |
| j92 Chải chuốt | ✕ | ✕ | ✕ | ✕ | closed (back) | confirm → own result: Trâm càiTrâm ngọc bíchY phụcVáy sa xanh ngọcKim dừ | spend(1) only at the end → rules: straight back (nothing spent); play: give up → «quá giản dị» (the timeout rule) |
| Thử tay (mgcal) | ✕ | ✕ | ✕ | ✕ | kind list, no confirm | confirm → kind list | nothing at stake; kind not saved |

Shots (looked): «Ra tay?» https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/scheme-raytay-755x1000.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-back/scheme-raytay-1180x820.webp (earlier r1 shots still in the same folder).

# r3 — reviewer FAIL 7f7d467a fix (rv-mg-back.md r2 section, handover 19372a3c)
Branch **review/mg-back** = **c43c6066** (contains LIVE 70bea3d3).
- **kgSnap removed** (it JSON-restored S: detached S→rivals refs, rewound S.away after spend()'s wrappers had moved the world). Replaced by a **deferred charge**: `kgDefer(cost, open)` opens the game with the charge only remembered → `kg82Open` keeps it as `KG82.payOnGo` (lessons also `S.mg.pay`, so a reload reopens the same unpaid lesson) → `kgPay()` takes it on «Sẵn sàng» / the quick option / any result / an outcome close (jsgame «Giao cho người làm»). When jaudit holds a pending cost for the game, the charge joins it (paid with jaudit's one result card, which keeps showing the whole cost). A rules-screen ✕ = free back with nothing to undo: **spend() never runs before «Sẵn sàng»**; no refund anywhere.
- Wired: j23 lessonMode (self / Thái hậu / thầy incl. tchPaid favour), j2 lesson (old path), j83 wkPractice (→ wkPracOpen), jrcp rcpMaster (fee + tchPaid), jveil vlCraftRun (material stays with jaudit's existing pending), jsgame sgpick (`pay.chk` = can she pay now; `pay` runs on «Sẵn sàng» / «Giao cho người làm»). j83 wkAsk / jwkr wkrMat back to main (no undo code). jaudit deck card: `KG82.preBack` = card untaken (clean-up only). jtd + jsgame «Ra tay?» unchanged (passed r2).
## r3 tests (c43c6066)
- `mg-back.js` **PASS 12/12** at 755x1000 and 1180x820: 6 free back per caller — closed, no confirm, **spend() calls = 0**, **every S→rivals reference held before is the same object after**, S identical incl. S.away (ambient: chatter, logs, Emperor walk, roster, visit, emoSeen), nothing pending left; 6b the charge is only remembered on the rules screen; 6c «Sẵn sàng» takes it (lesson: Sức −15 + 2 khắc join jaudit's pending; paid scheme: spend runs, used +).
- `mg-ready-guide.js` PASS 9/9; `ag-mgcal.js` all ok; no page errors.
| caller | charge remembered on rules screen | spend() calls | S→rivals refs | S after ✕ | pending left |
|---|---|---|---|---|---|
| jtd Tu đức (self) | no charge before the frame | 0 | same (0/0) | identical | none |
| jtd Tu đức (thầy) | no charge before the frame | 0 | same (0/0) | identical | none |
| j83 Tự học (bậc 5, vật liệu tốt) | yes | 0 | same (0/0) | identical | none |
| j83 học: tự học | yes | 0 | same (0/0) | identical | none |
| jrcp học với thầy | yes | 0 | same (0/0) | identical | none |
| jrcp thầy dạy lối mới (bậc 5) | yes | 0 | same (0/0) | identical | none |
| j83 thẻ Tự học (Hành sự) | no charge before the frame | 0 | same (0/0) | identical | none |
| jveil kết mạng (dây bạc) | yes | 0 | same (0/0) | identical | none |
| jsgame mua chuộc (trả khắc) | yes | 0 | same (0/0) | identical | none |
Note: jaudit's own pre-existing putBack-after-spend (main, lessons opened outside these callers) is not touched; with r3 no caller above spends before «Sẵn sàng», so that path now sees no khắc to put back.
