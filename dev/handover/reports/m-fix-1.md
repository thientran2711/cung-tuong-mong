# m-fix-1 — robot M4 findings (Foreman F #7 brief dev/handover/briefs/F-mfix-2511.md) — F M-FIX-1 (opus), depth 7, START_CTX ~5 % of 1M
PRIORITY #1 CHECK: OD 'Bỏ qua|skip|quick result' 9 (L1845–L1850: «a quick result never beats a good own play») | main: kitQuick/kitQuickRoll j79:627–635,
BAL.skip jbal2 (od 40, raw 5, care .5), mgSkipRaw jmgt:146 (her median = old skip), dev/test/mg-skip-audit.js (reused + extended) | review/*: mg-skip-all(-r2),
promo-skip(-r1) already on main; review/sangbuoi-held-fix: NOT on origin (no branch yet) — item 2 here only adds the cue, does not touch dqWait |
claims: MAIN 135 sangbuoi-held-fix session_01V1ZZH3zq7i35Qgmz3XuUHS (jdayq dqWait silent exit; complementary).
Branch review/m-fix-1 from LIVE origin/main 9f72524b. Never main, no PR.

## 1. SKIP FAMILY — FIXED (law 2/5, OD L1850)
Root: every «Để tài nghệ quyết định» / not-played mark = mgSkipRaw = her median on the board + her identity shift (jmgid), UNCAPPED → up to 10/10
Xuất sắc (M4: Cháu gái Thái hậu, exam Nấu ăn skip 10/10 vs skilled own play 5/10). tsGame won skip = 7 (Giỏi).
Fix: ONE cap BAL.skip.cap = 5 (= word Khá, BAL.mgTier.word[1]; the middle tier like makeup) read through ONE kit function kitSkipCap(raw) (j79, beside
kitQuickRoll). Every skip MARK passes through it; NPC estimates (pmMed, mgNpcRaw) untouched (law 1: NPCs still draw their own play).
Words: «…, như người cùng bậc» (promised her uncapped median) → «…, tự thi giỏi thì hơn»; Khảo hạch / jkc2 «Cúi đầu chờ xét» hints → «không thi; tính
theo tài nghệ, cao nhất là Khá» (word from mgWord(BAL.skip.cap), one core).
| skip path | file | formula before | max before | after | typical good own play |
|---|---|---|---|---|---|
| Hội thi / thi tài (startContest) | j82:515 | mgSkipRaw(tier) | 10 | kitSkipCap(…) ≤ 5 | Giỏi 7+ |
| playArt default / caller raw (pm, works) | j82:565 | o.quick.raw or 5 | 10 (pm) | kitSkipCap(…) ≤ 5 | 7+ |
| Tuyển chọn entry + Phúc tuyển (entSkipRaw, kcEntry) | jentry:42/53, jkc:535, jkc2:371/391/520 | mgSkipRaw | 10 | ≤ 5 | 7+ |
| Khảo hạch thăng phẩm (exSkipRaw, also aborted rounds) | jexam:61 | mgSkipRaw(mgNpcTier) | 10 | ≤ 5 | 7+ |
| Cờ / pm duels her quick (pmSk) | jpma:58 | mgSkipRaw | 10 | ≤ 5 | 7+ |
| Hội (kcg fest) | jkcg:62 | BAL.kcg.fest.skip 5 | 5 | ≤ 5 | 7+ |
| Court act games (tsGame) won skip | jts:118 | 7 | 7 | kitSkipCap(BAL.skip.raw)=5, lost 3 | 7+ |
| lessons j5/jtd, j83/jrcp, jveil, petcare/shelf, toil | — | roll / sure / care .5 / middle tier | already ≤ middle (mg-skip-all) | unchanged | — |
| odds skips (jroute Tâm cơ, jsgame helper, jslap, j92 auto dress, jts dress) | — | the act's own odds, no mark | — | unchanged | — |
Runtime (dev/test/skip-cap.js, 567 cells = every origin × lv 0/3/5 × 9 kinds × rank 1/3/6): maxOldSkip 10, maxNewSkip 5, 378 cells had old skip ≥ Giỏi 7;
entry 5, fest 5; cap 5 Khá < good 7 Giỏi. PASS. Static: dev/test/mg-skip-audit.js rule 5 (every mark through kitSkipCap, no «như người cùng bậc») PASS,
fails on origin/main (17 lines). jkitpage/jmgcal added to its skip list (kit sample page; her hand-test calibration — pre-existing 3 fails on main).
Live (real taps, Fold): start Tuyển chọn intro now reads «Bỏ qua · kết quả khá, tự thi giỏi thì hơn»; result «5/10 · Khá (để tài nghệ quyết định)».

## 2. «Sang buổi / Sang ngày mới» greyed with no cue — FIXED (says why)
Root: j6 render disables #next while Q holds a card; jdayq gate (c) HOLDS that card unpainted while she is inside an activity / a person view she
opened (kfoc) → grey button, nothing on screen explains it. Fix (jdayq, the hold's own module, solo only): dqNextCue — when #next is disabled and the
card is held (modal hidden, not a mini-game), the button reads CTM_WAIT.dqHeld «Có tin đang chờ · xong việc đang làm đã» in the existing co-op wait
look (#next.kcwait, maxWidth kept); own label back as soon as the card shows. Wired on render + a MutationObserver on #next + a 700 ms tick (a
close that does not render). No new kit part (existing kcwait + CTM_WAIT table). Not touched: dqWait silent exit (MAIN 135's sangbuoi-held-fix).
Test dev/test/m-fix-1.js (Fold + iPad): free → enabled «Sang buổi»; held → disabled + cue; shown → own label; after → enabled.

## 3. «Nhận thân phận» twice — FIXED (one tap)
Root: the roulette (jk2b kitRoulette step 3) labelled its own button «Nhận thân phận», then the identity card (j52 data-nl="ok") asked again.
Fix: the roulette button = «Xem thân phận» (it only flies the card in); she takes the identity once, on the card (keeps «Đổi thân phận» there).
Real taps (Fold, before/after): before 2 «Nhận thân phận» taps; after 1. Static test: only j52 carries the label. Tests click .krgo (unchanged).

## 4. «Nghỉ ngơi một lát» Rất vững → BẠI — NO CHANGE (by owner rule; odds and toast agree)
j76 rest o:100 → ODDS CAP (owner OD L1664 17/11 ~17:35Z «Trần 95%, việc chắc ăn mà hỏng thì chỉ hỏng nhẹ»): a formerly-sure act rolls at BAL.odds.hi
(95, word Rất vững) and fails softly 5 %: seal BẠI + «người tính không bằng trời tính: chỉ uổng công, không mất gì khác» + note «ta không được gì, cũng
không mất gì» (c:{} costs nothing). The shown word (Rất vững = top band, not certain) and the toast agree. Owner-level question for MAIN (law 16, not
changed here): should resting be deterministic bookkeeping like walking (oddsSure flag) rather than a capped roll?

## 5. Options below the fold — KIT REQUEST filed (law 9, kit keeper)
Scan dev/test/opt-fit-scan.js (every PEND card ≥3 options): Fold 16/26 cards hide options (night1 3/4, prep 3/5, night2 3/4, vnight 3/4, j7c 2/4 …),
iPad 12/26. Root = kit option row 140 px / 132 px (.k3rows) in the column the text leaves. Filed in dev/kit/KIT_REQUESTS.md «M-FIX-1 … choice cards».
Not reordered (law 2: no «best» option). No private CSS made.

## 6. Bạc 160 → 1 in ~2.5 months — MEASURED, no BAL change (owner-level → MAIN)
Monthly stipend net (stipend(S) at 1000 bạc, no staff, LIVE build): Đáp ứng 40 · Thường tại 55 · Quý nhân 59 (BAL.pay 70) · Tần 95 · Phi 125 · Quý phi
165 · Hoàng quý phi 183 (215) · Hoàng hậu 280. Common paid acts a cautious player taps: Thưởng cung nữ 20 (BAL.ag.cx.maidR), Truyền thái y 40 (j13),
Mời thái y chữa 25–30 (j68e/j70/j7), Hối lộ Thái y viện item+40 (j83). M4 (Quý nhân, 160 start): ~2 pays ≈ 118 in → ~277 spent ≈ 110/month ≈ 1.9×
her Quý nhân pay; i.e. ~5 paid acts a month drain her. No ruled number broken that I could find (no OD savings target); the first pay shows «Bổng lộc
sau N tuần» (no income visible early). The old whole-life bot (dev/measure/runb.js sens, INP2=inecon.js) TIMEOUTs at turn 0 on LIVE (Q 2 held,
3/3 lives) → it cannot give per-rank monthly income/spend now; flagged for the measure owner.

## Extra finding (not in the 6; for Foreman F)
Real-tap newcomer flow, Fold, origin/main AND m-fix-1: after «Bỏ qua» on the start Tuyển chọn round (jkc2 kc2Play), the result card showed with
#kg82ok «Đã hiểu» and its .kg82act hidden (display none); only ✕ «Quay lại» was tappable (✕ works). Looks like a result screen whose button is hidden
(same family as the 24/11 «Sẵn sàng không bấm được»). Not fixed here.

## Handover
All 6 items answered; if a successor is needed: branch review/m-fix-1, tests dev/test/{skip-cap,m-fix-1,mg-skip-audit,opt-fit-scan}.js.
