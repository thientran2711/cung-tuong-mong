# rv-tainghe-open-fix — BIG review (reviewer session_01V1ZZH2yv2CZAtHKPPbvjSU, for MAIN CHÍNH 132 → 133 → 134), 11/25/2026

PRIORITY #1 CHECK ('tainghe-open|modal-open-buoi|nlOpen'): OD 0 | ledger 0 | claims 1 | main 0 | review/* 1 (review/tainghe-open-fix) | archive 0. Extra: git grep 'nlOpen|busy()' on origin/main: no other fix; review/kit-tntile holds the tiles (no overlap with jflip).

Branch under review: review/tainghe-open-fix 993725c4 (worker TAINGHE-OPEN-FIX session_01V1ZZH4uyCCyRueugyGEVwf). Tier: BIG (night / time).
Reviewer branch: **review/tainghe-open-fix-rv** — merged on LIVE 3a3234ff → re-merged on 49f17d4d (LC13: LIVE base is fine) → re-merged on LIVE 008aa59b = ef1082ff (full gates) → re-merged on **LIVE ee37ab5f = f8cb11b2** (index.html/sw.js conflicts only, rebuilt; sanity gates). Diff vs LIVE: jflip.js busy()/nlOpen (+4/−1), 2 tests, worker report, CHANGE line, rebuilt index/sw.

## VERDICT: BIG PASS f8cb11b2 (review/tainghe-open-fix-rv; ancestor = LIVE ee37ab5f; fast-forwardable)

## 1. The fix (code read)
- jflip.js `busy()` waited on the bare `NLP` flag (j52 «Thân phận kiếp này» pending). A life whose card leaves Q without `nlAccept` kept NLP set for ever → the flip job never played → `cfBusy()` true → jnf.js night gate (`scene()`) swallowed EVERY showModal with nothing on screen. Fix: wait on NLP only while `nlOpen()` = the nl card is queued (`Q.some(m=>m.nl)`) or shown in `#modal` (`.nlopts` / `[data-nl]`); errors → true (holds, safe side).
- Real open card still holds: nlCard() always `Q.unshift({nl:1…})` then showModal → the card is either in Q or in #modal (.nlopts) — no gap. Closing it (✕ / onClose) = nlAccept → NLP null. Every `nlAccept` wrapper (jage, jcoopworld, jentry, jkc, jkc2, jkiep, joi, jrank, jrbatch, jcoopthinb) checked: none keeps NLP set with the card gone, except co-op thin guest `nlAccept` early return while an intent is out (jcoopthinb:196) and `rollAsk` (NLP={seed:0,thin:1} + «Sổ luân hồi» wait card): there the old life is dead (`S.dead`) so the flip job drops itself (`gen!==life||S.dead`) — no flip over the wait card. Coop gates green (below).
- Every `Q=[]` / `Q.length=0` / `Q=Q.filter(!m.nl)` site in dev/build scanned (j1, j2, j52, j93, jcoophl, jcoopthin*, jflip, jhd, j99succ, jkc, jkc2, jagacts3, jcloth): the ones that touch the game Q either run before nlCard (start) or drop the nl card on a dead/co-op life (above). No player path orphans NLP with a live life → for a player the bug only showed through the harness; the fix still removes the whole class (law 11).
- Family (law 11): `python3 dev/test/modal-hold-scan.py index.html` on the merged head: 56 showModal wrappers, 16 early returns; RESULT PASS (no gate waits on a bare flag with nothing on screen). Agree with the worker's table.
- Law 9 kit: no UI/CSS touched. Law 4 one core: no number. Law 7 wording: one CHANGE line (cổ trang, no %). Other laws not touched.

## 2. Gates (merged head; Fold 755x1000 + iPad 1180x820)
| gate | result |
|---|---|
| modal-hold-scan | PASS |
| modal-open-buoi (real tap: kitModal + HUD + Mệnh truyện + Tài nghệ tile where built) | on 3a3234ff: Fold 4/4, iPad 4/4 PASS · on 49f17d4d (after reviewer test fix, below): Fold 3/3 PASS (2 lives b0→b3→night→next day), iPad 2/3 PASS + 1 check at b3 while a night-end scene (`kmov kne-ov`, visible) was on screen = card waits behind a visible scene by design (not the bug) · on 008aa59b (ef1082ff): Fold 2/2 + iPad 2/2 ALL PASS · on ee37ab5f (f8cb11b2): Fold 1/1 (b0→b3→night→next day) + iPad 1/1 ALL PASS |
| orphan-NLP life (old harness state) | flip scene PLAYS on screen (`push 0|run|play 10`, `.kmov.kcf` visible) — PASS on every build |
| quickcheck | PASS ×3 (3a3234ff+: 189 s, render 189/230 tab 361/508 buổi 1166/1321; 49f17d4d+: 174 s, 178/185, 412/429, 969/1364; 008aa59b+: 241 s, 317/265, 680/645, 1571/1589; ee37ab5f+ (f8cb11b2): PASS 229 s, 273/262, 589/623, 1536/1313 — box shared with test browsers, buổi within noise of earlier runs) |
| coop-e2e default / swap | 3a3234ff+: 142/142 + 142/142 · 49f17d4d+: swap 142/142; default one run 137/142 (week 3 stall), then A/B: head 142/142 ×2, LIVE 142/142 ×2 → one-off · 008aa59b+ (ef1082ff): 142/142 + 142/142 |
| coop-one-world | PASS (49f17d4d+, 008aa59b+) |
| dayq-order / dayq-hold / dayq-hold-coop both orders | PASS / PASS 46 cases / 17/17 + 17/17 |
| flip-newlife | ALL OK |
| dead-card (new on LIVE) | DEAD-CARD PASS (ef1082ff) |
| flip-entry · night-softlock · night-day · night-end | FAIL 8 · FAIL 6 · ok:false · crash (null.click) — **identical on LIVE** 3a3234ff and 49f17d4d = stale tests, pre-existing, not this branch |

Reviewer fix (test only, 3b6037d7): `modal-open-buoi.js` driver taps like a player on the new LIVE — since day-queue-2 (jdayq) the day's cards wait behind a visible activity (Luân hồi roulette, Tuyển chọn mini-game panel), and the driver never closed them (LIVE 49f17d4d without the fix gave the same FAIL). Driver now presses «Bỏ qua» on the roulette and ✕ on the mini-game panel. Game code unchanged.

## 3. Buổi-3 Tài nghệ tap, LOOKED AT (stack: review/kit-tntile + LIVE + this fix; real Playwright taps: Nhận thân phận, every dialog, the night, the tab button, the tile)
- Fold 755x1000: 4/4 lives at buổi 3 → the «Công · Nữ công» pop-up opens, 1 column, act cards readable, nothing cut, no h-overflow, 0 page errors.
- iPad 1180x820: 3/3 lives → pop-up XL, 2 columns, nothing cut, 0 errors.
- Shots (CDN): img/_review/tainghe-open/fold-b3-tab.jpg, fold-b3-pop.jpg, ipad-b3-tab.jpg, ipad-b3-pop.jpg, ipad-minigame-panel-blocks-tap.jpg.
- NOTE for MAIN (owner's «chạm không mở»): at buổi 3 after an act, the act result card «KẾT QUẢ» (#rtoast) is usually still up; by the kit rule 32.10 (owner 11/15) the first tap anywhere only closes it (#kxcatch), the second tap opens the tile. In 6 of 7 buổi-3 lives the toast was up at the moment of the tap. If the owner tapped once, she saw «nothing». That is the agreed rule, not this bug — MAIN may want to ask her which one she saw.

## 4. Fold b3 stacking («TÀI NGHỆ · Luật chơi» side panel under the pop-up)
That panel is the Tuyển chọn / Xét phong mini-game (j82 kgReady, `#ov .kg82`), open from the start of the life. The worker's shot came from a DOM `.click()` on the tile, which goes through the overlay. With REAL taps the mini-game's full-screen ground (#ov) takes the tap: Fold 2/2 and iPad 2/2 lives → «#ov intercepts pointer events», no pop-up opens over it (shot ipad-minigame-panel-blocks-tap.jpg). In every real-tap buổi-3 shot (Fold 4, iPad 3) no «Luật chơi» panel is visible outside the dialog. → not shown to a player: PASS, nothing to fix.

## 5. Robot M4 «Sang buổi» dead tap (MAIN 135 asked to check) — a DIFFERENT root, not this branch
M4 state at the lock (M4 session_01V1ZZH4FnHKCCfGmdfjxKD6, own driver dev/handover/robot/m4/drv.js, LIVE 0756a05b, Fold, seed 104): Tháng tám trung tuần, **buổi trưa**, Q = 2 cards («Có người đến», «Kỳ ngộ»), #modal hidden, no .kmov, DQ = {want:null, t:0, **mt:0**, newsHold:1, stat:{held:2, ran:2, **dropped:0**, modalHeld:74, actHeld:1, pulled:2, actKm:11}}; «Nhận thân phận» was tapped (NLP accepted); a tab tap («Dư đồ» → render → showModal) painted the card.
- Not the jflip/NLP root (NLP accepted; buổi trưa, no night gate).
- Not the dqWait drop path (dropped 0, want null).
- Fits jdayq `dqArmModal`: the tick is ONE-SHOT — it returns without re-arming at `if(!dqUiC())return`, and when its `showModal()` is swallowed by an inner gate (16 wrappers can return early, modal-hold-scan) nothing re-arms either → DQ.mt=0 with cards hidden until any other showModal (a tab tap). Whole-family fix belongs in jdayq (after the paint attempt: if Q.length && #modal still hidden → re-arm, bounded), with a regression test reproducing «card held by dawn/activity, inner gate swallows the first paint». Not part of this branch; MAIN said the worker adds it on top — I review that sha with the merge when it comes.

**UPDATE 07:45Z — ROOT CONFIRMED (M4 dump AT the lock, LIVE 0756a05b):** buổi tối, S.nfX.st "open", NLP null, **cfBusy() true**, nothing on screen, Q=[«Tin trong cung buổi này»], DQ {want null, mt 0, newsHold 1}. Deadlock of two holds: jdayq.js:105 wraps kmFree → false while DQ.newsHold && a news card is queued → j93 kmPump never starts the queued night flip → cfBusy() true → jnf.js:271 night gate swallows showModal → the news card is never painted → newsHold never clears. Same family as this branch (cfBusy true with nothing on screen) through a blocker the worker's family scan listed as «overlays in DOM» but that is a FLAG (jdayq wrappers of kmFree: newsHold, actKm, kmTap). f8cb11b2 stays correct and safe (no regression, closes the NLP blocker); law 11 for the family is completed by SANGBUOI-HELD-FIX (session_01V1ZZH3zq7i35Qgmz3XuUHS): break the cycle + dqArmModal/dqWait no-re-arm + regression test of this exact state + modal-hold-scan.py extended to count kmFree wrapper flags.

**CORRECTION 07:46Z (M4):** the 07:42 lock released itself after ~80 s (nfX myAt = at+80000, «đang đi nghe ngóng…», then nfX done, news card painted). So the mutual wait is BOUNDED by the 80 s night timer / flip CAP, not permanent. Player impact: up to ~80 s dead screen (day button grey, no cue). SANGBUOI-HELD-FIX gate: card paints within ~1 s in that state, re-arm members covered, a kit progress cue for any intended timed wait, test asserts time-to-paint.

## 6. For others
- review/kit-tntile: kit-skillacts.js harness should accept the identity card and tap like a player (worker report §5) — still true.
- Pre-existing stale tests (flip-entry, night-softlock case 6, night-day, night-end) fail the same on LIVE: worth a test-keeper ticket.

Shots wiped from CDN by the verdict giver after MAIN has looked (python3 dev/site/cdn_sync.py --wipe-review tainghe-open).
