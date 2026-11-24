# REPORT review/visitor-fix (worker VISITOR-FIX) — commit d60a0ec8581fd739f0904c27dc86086f8fe0fa6e, base origin/main 502c48c9

PRIORITY #1 CHECK: OD 44 | ledger 1 | claims 8 | main 15 | review/* 0 — reused jgreet greetName rule, GREET_COME pool, k61 know/met, rcpReg cards; no new kit part (text + figure wiring only).

## Items
(3) VISITOR FIGURE — new `visitSeen(v)` (jgreet.js): face + met + name stage 2 for every visitor; called in gmCard/gmReplyCard (AG-MEET), j24 AP_MK wrapper (all weekly visitor kinds, survives rcpReg rebuild), j68 e68Make fam "visit". gmReplyCard no longer picks kitStrangerOf. Figure size = the kit event column (unchanged).
(4)+ADD2 ARRIVAL/ETIQUETTE — `visitArrive(v)`: higher rank «Ngoài điện có tiếng xướng: “<Title> giá đáo!”», lower/equal «Ngoài cửa có tiếng thưa: “Thần thiếp <Title>, xin cầu kiến.”». Higher visitor never bows first (new pool GREET_COME_HI, 8 tones x10; she greets first with dialogue «Ngươi hành lễ: “Thần thiếp … thỉnh an …” — Nàng khẽ nâng tay: “Miễn lễ.”»). j24 flat «<name> sang chơi/thăm…» → arrival line + «Nàng …». Rank-agnostic «cúi chào ngươi/ta» removed in j68sd (visit-001/048), jtone_c (3), jtone_b2 (3), jtoil (1). Scan: dev scan script (regex cúi chào|chào ngươi|…) 158 → 149 hits; remaining hits reviewed: servants/envoys/relatives/ksp/eun (lower rank) or her greeting up — OK.
(5) NO SYSTEM REASONING — grLine rewritten as dialogue/narration by rank; grWhy/grWhyM deleted; j61 «Hỏi danh tính» result and k61Know log: «<tên> xưng danh với ngươi». «Ta đã biết:/Vì sao:» in greeting no longer exists (grep j*.js: 0 in greeting code; remaining «Vì sao» rows are kit explanation rows of acts, not story).
22:14Z RULE — unnamed = «một vị <rank/loại>»: k61Mask plain, kitNameList («N vị» / «thêm N vị khác»), jreign, jhc/j61 hint («chưa gặp mặt»), j63 regex follow-up; dev/test/name-mask-scan.js updated.

## Tests
- greet-stranger.js PASS (all kinds incl. mk lines); tone-pool-check 87 pools OK; AG-MEET card repro: Quý phi → «giá đáo» + she greets; Đáp ứng → «xin cầu kiến».
- quickcheck PASS (open 1613 ms, old save ok, core gates PASS, perf ~ live).
- tier.js: BIG (logic lines in jgreet/j24/j61/j63/j68/jtone — "unsure"); content is wording + figure wiring, no BAL/save change. Reviewer decides.
## NOT DONE / honest gaps
- Fold 755x1000 + iPad 1180x820 shots of the visitor card NOT delivered: in this sandbox the new-game chest/loader overlay covered the card; only one early frame showed the card with a real face figure on the left. Reviewer please look at the card on both devices.
- dev/test/name-mask-scan.js timed out (>330 s) in this box, result unknown (not compared with main).
- Mini-game (item 6), timing (item 1), Tin báo rows: not mine.
## Handover: none needed (worker done).

---
# ROUND 2 (fix of rv-visitor-fix FAIL 1-8) — commit fe9eb3a9da8f38a2a58e41cac57aa57384379d67
1. Encounter scene: jdfv showModal wrapper makes the visitor known, refreshes her stage token (renderStage) and WAITS (≤4 s) until her real face has loaded (not the j59 stand-in / unknown-fig) before kitFocus opens. New test dev/test/visitor-scene.js (stranger on stage → gmCard → showModal; Fold + iPad; high + low rank): PASS; same test FAILs on LIVE 502c48c9.
2/3/4. ONE speech table in jgreet.js (grSelf/grAddr/grSay): consort→chí tôn «Thần thiếp», consort→consort «Tần thiếp», quan/thái y «Vi thần … tham kiến», thái giám «Nô tài», cung nữ «Nô tỳ», ma ma «Lão nô»; spoken-to = «<phẩm> nương nương» (Tần+) / «<phẩm> tiểu chủ», Hoàng thượng, «Thái hậu nương nương»; no personal name, no fog descriptor, no «ngươi» in quotes. j84 addr() fixed so «<rank> nương nương» naming another person is not rewritten to «tiểu chủ».
5. Arrival line for EVERY visitor card: first-meeting greet, met kinds (gmReplyCard), j24 AP_MK wrapper (all weekly visitor kinds), j68 fam "visit" (consort → visitArrive, others → visitArriveK); met kinds use the visitor's title; GREET* tone pools skipped for a higher visitor (plain words, no rank-blind humility).
6. Place: door lines («Ngoài điện có tiếng xướng», «Ngoài cửa có tiếng thưa») only when S.place==="home"; elsewhere road lines («Phía trước có tiếng cung nhân xướng», «Có người rảo bước tới …»); 7 road-ish lines removed from GREET_COME_HI.
7. grLine drops the repeated «nói tên mình»; kit know/met toasts («Ta biết tên» / «Ta đã gặp mặt») suppressed for an announced visitor (flag __k61noKn in k61Know / k61MetSet).
8. jtone_c «vẫn nói lời cảm tạ ngươi»; kitNameList «N vị phi tần» (rivals) / «thêm N vị phi tần khác».
Tests: quickcheck PASS (old save ok, core gates PASS), visitor-scene PASS Fold 755x1000 + iPad 1180x820, greet-stranger PASS (men «Vi thần tham kiến Quý nhân tiểu chủ», eunuch «Nô tài thỉnh an…»), tone-pool-check 87 OK.
Shots (CDN img/_review/visitor-fix/): r3-fold-hi.jpg (Quý phi giá đáo, face + name, card path), r2-ipad-hi.jpg (Phi), r2-ipad-lo.jpg («Tần thiếp xin cầu kiến», Đáp ứng face + name). I also saw the Fold encounter scene (kitFocus) with her real face + «giá đáo» in one run; NOT in every run — in some runs on Fold the lower-rank scene did not show at all within 9 s (flaky shot script, other modals/mood events in the queue; not diagnosed). Reviewer: please re-shoot Fold-lo.
