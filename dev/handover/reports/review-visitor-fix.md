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
