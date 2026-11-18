# mg-snap — minigame snap / cannot-fail input, whole family (Foreman B worker, opus)

PRIORITY #1 CHECK ('Thêu theo nét' / 'snap' / 'minigame'): OD L1571 + L1255 + L1266 | main dev/build/jtd.js kgTdThread, jmgt mgPace/mgLev/mgTol, BAL.mgTier (mg-tune-r1 live) | review/* none for mg-snap | claims none. Reused: dev/measure/mg-bots.js (mg-balance / mg-tune harness), BAL.mgTier.lev + kG (no second difficulty system), k91 trace score (made the ONE trace score).

Branch: review/mg-snap @ 2a00405f1a7118690db6425f60eca33553f97d51 (base origin/main 6c4f21c3, re-checked up to date before report).
START_CTX ≈ 5 % of the window; finished well under +25 %.

NOTE for Foreman B: the brief file dev/handover/briefs/mg-snap.md also carries the full "staff caps / Thường tại room" task (that is brief staff-root.md). It was NOT done here (branch name, first line and order 07:11Z are mg-snap only). Please make sure staff-root has its own worker.

## 1. Root (Thêu theo nét, td_cong, jtd.js kgTdThread)
- The thread was drawn along the dotted path itself (`for j<=i: lineTo(P[j])`), and the progress index `i` jumped to any path dot within TOL·1.15 of the finger (looking 4 dots ahead). So any scribble near the line drew a perfect line and scored progress 1.0; the only cost was a capped "off time" (max −40 %). Measured: a sloppy bot (5× the skilled hand error) got 63 % Xuất sắc at Vừa, the skilled bot 100 %.
- Fix: the stitch IS her finger. Every point she draws is kept and drawn: inside the tolerance in the thread colour, outside it as a thin dashed red line (dashed so it reads apart from a red thread). She can lift and go on (new stroke). The bright dot = the first path dot not yet covered. A piece is scored by the ONE trace score `mgTraceScore` (jmgt; was k91Trace's private scoreStroke, now shared by Đồ nét bút / Chép kinh / May áo / Thêu theo nét): coverage of the path by her line × her line lying on the path. Tolerance = `BAL.mgTier.lev.td_cong.tol` [.0075, .028] × board width by the board ease (rank / skill, mgLev) — replaces the typed `W·(.055+.006·lv)·mgTol`.
- Same fault in the shared trace core: `cov × (.5 + .5·acc)` let a scribble over the guide keep half the score whatever its accuracy. Now `cov × (1 − a + a·acc)`, a = `BAL.mgTier.trace.acc` = 1 (was a typed .5). kG re-trimmed so skilled play stays in the 20–30 % band.
- Rule text (TD_RULES cong 3): "Mũi chỉ đi đúng theo tay kéo: lệch khỏi nét thì mũi chỉ hiện đỏ và mất điểm. Nhấc tay rồi đặt lại ở chấm sáng là thêu tiếp được." Kit tài nghệ frame untouched (canvas only, no new UI).

## 2. Whole family (LUẬT SỬA CẢ NHÓM) — scan
Scan = (a) code read of every KG82_ENG engine (j82, j91, j92, jlant, jnwp, jnwq, jslap, jtd, jts, jwkg, jwkr) for snap / magnet / auto-aim / free credit, and (b) mg-bots with three "cannot-fail" bots added to dev/measure/mg-bots.js: **sloppy** (skilled with 5× tap/drag scatter, env MGBOT_SLOPPY), **idle** (never touches; timed boards), random (existing). MGBOT_EVAL (JS run in the page) added for calibration sweeps.

| game (kind) | input | can fail? before | before | after |
|---|---|---|---|---|
| Thêu theo nét (td_cong) | trace | NO: stroke snapped onto the path | sloppy Vừa 8.5 mean, 30 % ≥9 (graded); skilled 100 % | her line drawn + scored; sloppy 3.5, 0 %; skilled 20 % |
| Đồ nét bút / Chép kinh / May áo (ve/kinh/may) | trace | partly: scribble kept ½ score | sloppy 4.1 / 4.0 / 4.0 | sloppy 1.6 / 1.6 / 1.5 (trace.acc 1) |
| Thả đèn trôi xa (den) | drag | NO: band ±.16–.21W covered the channel swing ±.22W | idle 5.75 | idle 2.71 (swing .36W, BAL lev.den) |
| Chải chuốt (chai, j92 groom) | 3 timed taps | NO: outcome = average of 3 marks (blind taps land in the middle); time-out made random marks | blind taps "Vừa vặn" 45–66 % (sim, w .26–.4) | 2 of 3 marks in the green; time-out mark = plain: 7–17 % |
| Khám vật chứng (xa, jnwq clue) | tap suspect | partly: wrong ones struck off, floor .4 a case | random mean 3.8 | random 3.1 (BAL.nwq.xaFloor 0) |
| Đi đứng giữ bát (td_dung) | hold halves | partly: a spill re-centred the bowl inside the band for free | idle 1.4 | idle 0.0 (spill costs BAL lev.td_dung.spill s) |
| Ném tên vào bình (dauho, j91 fling) | drag-release | partly: aim dots drew the whole flight to the pot at high ease | aid [.14, .6] s | aid [.14, .45] s (never reaches the pot) |
| Hái sen (duho, tspluck) | tap | yes (empty taps free, but must hit the lotus) | random 0.3 | unchanged |
| Cắm hoa (hoa, arrange) | drag | yes: bloom kept on its stem-length arc = physics, error still scored | random 0.6 | unchanged |
| Cờ (co, go) | tap | yes: Dễ-tier auto hint is the easy-game rule | random 0.4 | unchanged |
| Nấu (banh, cook) | hold+drag | yes (.4 step floor needs right ingredients) | random 0.1 | unchanged |
| Pha hương (huong, blend) | sliders | yes (closeness word = shown aid) | random 0.5 | unchanged |
| Nói đúng lúc (td_ngon) | hold | yes | random 0.4 | unchanged |
| hat, dan, ban, theu, mua, kim, doden, tho, doi, le, tc, thq, tat, ne, td_hanh | tap / hold / drag | yes (no snap; spam penalised or 0) | random ≤ 2.3 (mg-tune table) | unchanged |

## 3. Re-measure (dev/measure/mg-bots.js, n = 30 Vừa / 20 Dễ, Khó; ±8–10 pts noise). Xuất sắc = graded ≥ 9 (kG). Dễ hoc/0/2 · Vừa hoc/4/2 · Khó hoc/6/1.
| kind | skilled Xuất sắc % Dễ / Vừa / Khó BEFORE | AFTER | AFTER Vừa Giỏi+ ≥7 % | sloppy Vừa mean B → A | random Vừa mean A | idle Vừa mean B → A |
|---|---|---|---|---|---|---|
| td_cong | 97 / 100 / 100 (this session) | **95 / 20 / 0** | 100 | 8.51 → 3.52 | 0.08 | 0 → 0 |
| ve | 77 / 30 / 0 (mg-tune) | **85 / 23 / 0** | 93 | 4.06 → 1.55 | 0.02 | 0 → 0 |
| kinh | 83 / 20 / 0 | **100 / 23 / 0** | 97 | 4.03 → 1.55 | 0.02 | – |
| may | 80 / 23 / 0 | **85 / 23 / 0** | 97 | 4.04 → 1.50 | 0.03 | – |
| den | 23 / 13 / 23 | **20 / 20 / 25** | 97 | 7.50 → 7.24 | 1.71 | 5.75 → 2.71 |
| td_dung | 100 / 40 / 0 | **100 / 23 / 0** | 100 | 8.25 → 8.05 (hold game: scatter n/a) | 0.00 | 1.40 → 0.00 |
| dauho | 63 / 30 / 0 | **55 / 23 / 5** | 83 | 2.95 → 2.13 | 0.04 | – |
| xa | 86 / 24 / 1 | **80 / 27 / 0** | 100 | 7.51 → 7.21 | 3.07 | – |
- Every changed game lands 20–27 % Xuất sắc for skilled play at the matching level (target 20–30 %, OD:L1266), Giỏi+ 83–100 % ('vừa', not hard), random ≈ 0, careless scribbling no longer passes.
- den stays flat across tiers (as before: its board barely scales with ease) — OPEN for Foreman B, not in this order.
- Tolerance sweep for td_cong at Vừa (skilled / sloppy mean): [.025,.085] 9.87/8.22 · [.015,.055] 9.77/5.39 · [.012,.045] 9.72/4.66 · [.008,.03] 8.82/3.63 · [.006,.024] 8.02/3.24 → [.0075,.028] + kG 1.3. Vừa tolerance ≈ 10 px on the Fold board (Đồ nét bút ≈ 8 px).

## 4. Tests
| test | result |
|---|---|
| one-core-guard (no --allow-grow) | PASS, 0 fails (inline 6671 / baseline 6691) |
| quickcheck (own build, Fold open, old save from live, perf, core gates) | PASS · 146 s · old save ok · render 286/242 ms, buổi 862/977 ms |
| mg-balance-vp, old save from main 6c4f21c3 → this build, 755x1000@2 + 1180x820@2, the 8 changed games | old save loads (6 keys), 8/8 plays each size, 0 bad, 0 page errors |
| coop-e2e (assemble first, utf-8 server) | 60/60 passed |
| coop-one-world | PASS |
| mg-bots | ≈ 2 300 plays this session, 0 page errors |
Co-op: the minigames run on the playing seat only; no shared value changed (scores go through the existing kg82 end path). Old saves: no save field added or changed.

## Files
jtd.js (kgTdThread rewritten; td_dung spill; rule texts) · jmgt.js (mgTraceScore) · j91.js (trace uses it) · jts.js (steer swing/band from BAL) · j92.js (groom 2-of-3, clock mark) · jnwq.js (xaFloor) · jbal2.js (lev.td_cong.tol, lev.den, lev.td_dung.spill, lev.dauho.aid, trace.acc, nwq.xaFloor, kG trims) · dev/measure/mg-bots.js (sloppy / idle bots, MGBOT_EVAL). Shots in scratch only (Fold 755x1000 + iPad 1180x820 of Thêu theo nét with an off-path stitch, Thả đèn), looked at.
