# D-RANKPACE (review/rank-pace) — report
depth 3 · START_CTX ~3 % · session_01D3E3Naunyi7o6FG8N58geg · Foreman D session_01D3E3NXaPqTqoCnowMTPdTq
PRIORITY #1 CHECK: OD rank pace / PROMO-HIST 24/11 ~05:55Z–09:20Z (kỳ sắc phong, conditions matter) | main 4cd3f974: stat-pace + pace-all LIVE; promoReqP j8:433 + j30 seat row + j34 contest row + jexam exRow (one exam gate); existing probes dev/measure/inpromo.js, probe_promo.js, pace.js reused (new rank-pace.js = pace.js harness + inpromo gate tally per month) | review/promo-stack-lr4 0aee038a (kỳ sắc phong, BIG PASS, not yet in main), review/pace-speed 47bbe2e8 (Danh rules; PACE-SPEED-3 session_01Rc5AsN93MJix4SYQkmWnjH = «not found» on send_message 05:10Z) | claims D-RANKPACE.

## STATUS 27/11 ~05:50Z — ROOT-CAUSE TABLE (before build; PLAN below, waiting Foreman D go)
Robot: `node dev/measure/rank-pace.js <page> 4 72 0 <profile>` on the LIVE build (main 4cd3f974), 4 lives × 72 months each; table `python3 dev/measure/rank-pace-sum.py`.
Each month, right before the month's decree (promote()), every unmet promoReqP(S) row is counted under one gate; «sole» = the only unmet gate that month.

| profile (4 lives × 6 y, LIVE) | reach Tần (3) | Phi (4) | Quý phi (5) | Hoàng hậu | max rank per life | top gates (share of months below HH) |
|---|---|---|---|---|---|---|
| lazy (plays strong options, sits exams) | 4/4, median m28 | 3/4 m34 | 3/4 m47 | 0/4 | 6,3,6,6 | seatFull 47 %, gap 35 %, hhBlock 24 % |
| even (inpage6 sensible bot) | 4/4 m8 | 3/4 m32 | 2/4 m27 | 1/4 (m69) | 3,6,7,4 | hhBlock 43 %, gap 30 %, hhTh 22 %, seatFull 21 % |
| noexam (lazy, never opens the exam card) | 0/4 | 0/4 | 0/4 | 0/4 | 2,1,2,2 | **exam row SOLE gate 122/291 months**; 169 windows lapsed |
| quiet (answers dialogs only = real-tap «quiet» seat) | 0/4 | 0/4 | 0/4 | 0/4 | 2,1,0,2 | **Sủng 92 % (sole 152)**; 4 demotions to rank 0 |

ROOT CAUSES (game vs harness split):
1. GAME — the exam door is easy to miss: since jexam every promotion passes ONE exam; the window opens for BAL.ex.win = 2 tuần with only a log line + a card in Hành sự («Thẻ Khảo hạch tấn phong ở Hành sự»); not played → lapse, wait BAL.ex.cd (1 month), repeat. A player who does not open Hành sự in those 2 tuần never rises (noexam row = the real seats: rank 0–2 forever). Real seat nc_gian lazy-1g: 23 years, 0 exam offers seen by the harness.
2. GAME (by design, owner 24/11 «phải phấn đấu») — a do-nothing life has Sủng < RANKS[1].s (15): rank 0. Not a fault; the Sắc phong tab already lists the rows.
3. HARNESS (Foreman F) — dev/test/rt-offer.js SCREEN_KIND /^lễ tấn phong/ counts «Lễ tấn phong <NPC>» (going to congratulate ANOTHER consort) as her «decree» offer: lazy-1g promo {raw 280, decree 276}. The «93–280 promotion roads taken» in the digest are NPC ceremonies, not her roads.
4. Active players (exam sat): the climb is held at higher ranks by Hoàng hậu block (hh ≤ BAL.qBlockHh), months since last decree (promoGap), seats (BAL.seat) and Thái hậu for the HH seat — law 5 «harder as she climbs», pace looks right (Tần ~m8–28, Quý phi ~m27–47, HH 1/8 lives in 6 y). No BAL change proposed there.
(promo-stack-lr4 kỳ build + greedy rows: running, added when done.)

## PLAN (needs Foreman D go; balance = owner-facing → D relays to MAIN)
A. Exam window cannot be missed (whole family: every exam window opener — ordinary, grace (son/daughter), kỳ (promo-stack), special exams): when exTick / the kỳ opens her window, a KIT event dialog (existing kit event card, no new part) «Được dự khảo hạch tấn phong X» with «Thi ngay» (opens exStart, same as the card) / «Để sau» (card stays in Hành sự until the deadline); one reminder dialog on the last tuần of the window. Scan script lists every window-open site, before/after table.
B. BAL only: BAL.ex.win 2 → 3 tuần (one whole month) and a LAPSE (never sat) waits BAL.ex.cdLapse = 0 extra months (next eligible month) instead of the fail cooldown; a FAIL keeps BAL.ex.cd. (Numbers for MAIN/owner to confirm.)
C. OWNER QUESTION only (law 16, do not build): should Đáp ứng→Thường tại→Quý nhân (ranks 0→2) still need the exam?
D. To Foreman F: rt-offer.js «Lễ tấn phong» must count only when the title names HER (S.name) — harness fix, not mine.
Before/after: rank-pace.js lazy / even / noexam(the «misses the card» player answering dialogs) / quiet on the fix build: time to rank 3 / 5 / HH. Base: LIVE + promo-stack-lr4 if it lands first (said in report).

## BUILD 27/11 ~06:40Z — Foreman D GO (A + B; C to sếp via MAIN; D to Foreman F) · base review/promo-stack-lr4 e2c5d5ae (not yet LIVE at 98c77517)
Branch review/rank-pace: e05a979d (A+B) · 88aac71e (card rows, lapse date ≤ next kỳ) · CHANGE line + robot pick · site build.
A. jexam exAsk(ex,last): the ONE kit event card (Q.push ev card, existing kit) «Khảo hạch tấn phong»: «Thi ngay» (odds word · tốn: Sức BAL.ex.suc, BAL.ex.k khắc · được: thánh chỉ tấn phong X · hỏng: the Hành sự card's fail wait) / «Để sau» (card stays in Hành sự to the end of the window). Last tuần: one log line + the same card «Sắp hết hạn khảo hạch» once (e.rem). No new chip / kit part.
   WHOLE FAMILY (scan in dev/test/rank-pace.js (0)): window openers = 2 sites, both call exAsk — jexam exTick (her consort window: ordinary/kỳ, son grace, daughter grace, Hoàng hậu special — all open here) and exSrvOpen (serving-maid Nội vụ phủ exam). Before: 0/2 with a card.
B. BAL.ex.win 2 → 3 tuần; BAL.ex.cdLapse 1 (a window never sat); a fail keeps BAL.ex.cd. Consort under the kỳ rule: a lapse still waits to the next kỳ (exCdLapse = max(cdLapse, pbCdKy)) so the printed date is true; maid: 1 month.
ROBOT before/after (rank-pace.js, 4 lives × 72 months; before = promo-stack-lr4 build; NOEXAM/QUIET answer dialogs; a player shown the card takes «Thi ngay»):
| profile | before: max rank per life · reach Quý phi · HH | after: max rank · reach Tần / Quý phi / HH (median month) |
|---|---|---|
| NOEXAM (never opens Hành sự) | 1,2,3,3 · 0/4 · 0/4 (0 exams, 22 lapses) | 7,7,6,6 · Tần 3/4 m3 · Quý phi 4/4 m21.5 · HH 2/4 m40 (32 sat, 29 passed) |
| QUIET (answers dialogs only) | 2,1,0,2 (LIVE) · 0 · 0 | 2,2,2,2 · 0 · 0 — Sủng gate 86–100 % (by design: no striving, no favour) |
| even | 7,6,7,6 · 2/4 m20.5 · HH 2/4 m46 | 6,6,6,7 · Quý phi 3/4 m42 · HH 1/4 m57 (unchanged within noise) |
| lazy (sits exams) | LIVE 6,3,6,6 | 5,7,7,7 · Tần 4/4 m3 · HH 3/4 m66 |
LAW 5 (harder as she climbs) still holds after: months spent per rank (NOEXAM after) r1 4 · r2 27 · r3 28 · r4 53 · r6 99; higher ranks are held by seats, Hoàng hậu block, Thái hậu for the HH seat — no gate loosened.
TESTS: dev/test/rank-pace.js ALL PASS (scan + 12 runtime cases incl. old save with an open / lapsed window). Old promo tests fix vs base: promo-exam 30/32 vs 29/32 (same 2 baseline FAILs; test now closes the new card before playing the Hành sự card), promo-rules / promo-skip / promote-servants / promo-next-rank / promo-root = identical results on base and fix (baseline FAILs), promo-build crashes on both (harness path).
SHOTS/VIDEO (CDN, curl 206): img/_review/rank-pace/ fold-exam-dialog.mp4, ipad-exam-dialog.mp4, {fold,ipad}-{1-exam-card,2-hanhsu,3-reminder,4-board}.webp.
GATES (27/11 ~07:55Z): quickcheck PASS (core gates PASS · open Fold 0 errors · old save from LIVE loads + plays a buổi · perf median of 3 new/live: render 197/204 ms, tab 503/538, buổi 1110/1334, tasks>200 23/23). coop-e2e alone: plain 141/143 then 0 FAIL on rerun (flaky); COOP_EXAM=1 (exam probe at «after rejoin», both seats: card, Để sau, reminder, Thi ngay sits HER exam, friend keeps rank) 151/151 PASS. (Probe at «start» once broke 3 later checks by promoting her mid-test → moved to «after rejoin».)
SẴN SÀNG KIỂM review/rank-pace 548ef991 (base review/promo-stack-lr4 e2c5d5ae; promo-stack not yet LIVE at 98c77517 → land after it, or rebase on LIVE once it lands).
OPEN for others: C = sếp question (exam for ranks 0→2) via MAIN; D = Foreman F rt-offer.js «Lễ tấn phong <NPC>» counted as her decree offer. Worker: no rollover needed (ctx well under START+25 %).
