# dialog-order (E96 = E-c «môn Ngôn» lag + talk/send pickers, E-e «out of order» dialogs) — SẴN SÀNG KIỂM review/dialog-order 7be57a8e

PRIORITY #1 CHECK ('dò la|dola|modal queue|out of order' + 'jdayq|dqActBlocks|kfoc|popw'): OD 34 | ledger 1 | claims 8 (E96 row = this session) | main: jdayq.js gate (c) (DAYQ-2/3, the cause), jdfv.js, jdfg.js | review/*: dialog-stack(-rv), flight-modal-deadlock(-r), kit-modal-spin(-rv), modal-scroll(-r1), kit-dialog-2(-land), dialog-dedup(-rv) — all already on main (git grep origin/main: jk4 / jnolock / dead-card.js / dialog-stack-scan.js), none touches gate (c); no robot sweep table from MAIN ROLE B #7 in reports/ yet (FOR MAIN line below) → own real-tap scan built (dev/test/dialog-order-scan.js). KK37 kit part (picker cards clipped) NOT touched.

Branch review/dialog-order from origin/main 5e013076 (main is now 02f564ae; the diff touches only jdayq.js / jbal2.js dayq / jdfg.js + 2 new tools → rebases clean). Commits 7318fd39, 5cb7ab5b, 7be57a8e.

## E-e — ROOT (one root for «Sai đi dò la shows nothing» AND «appears only after ✕»)
jdayq gate (c) «nothing painted inside an activity» (DAYQ-2) counts the person view she opened (jdfv kitFocus, `.kfoc`) as an activity and lets a card through only when her tap is INSIDE `.kfoc`. The view's act cards (Giao thiệp / Mưu kế / Hại người tabs) run through the docked person card `#popw` (jdfv dfRun clicks the hidden pop-up button), which lives OUTSIDE `.kfoc` → her own act read as «a card posted by the game» → the pick-who dialog was held in Q, #modal hidden, until ✕ closed the view, then dqArmModal painted it = exactly the owner's «out of order». A second path of the same family: acts that QUEUE their card and only call render() (pushDil → «Cài đồ vào rương», «Cùng chơi», «Thách đấu», «Xin bắt mạch»): the render net armed the painter, which waited on the open view the same way.

## FIX (jdayq.js only — the one queue gate, no per-act patch)
1. The person view OWNS its controls: `.kfoc` + its docked `#popw` (+ the view's intro layer). «Inside» is judged where her finger LANDED (capture-phase listener; the target is often re-rendered / detached before showModal runs).
2. A card she opens herself from inside the view is marked hers (`DQ.mine`): the gate never holds it and `dqPull` never takes it back.
3. A NEW card that her tap inside the view queues without painting (Q compared with the queue at pointerdown) is painted on top at once — looked for `BAL.dayq.mineLook` = 400 ms after the tap (ONE CORE, jbal2.js).
Cards the game posts by itself (no tap / a tap outside) still wait exactly as before (DAYQ-2/3 unchanged: dayq-hold 46/46 PASS).

## E-c — «môn Ngôn» lag (the on-figure «Lời hay» word game at «Trò chuyện với cung nữ», jdfg words)
Cause: every frame (60/s) the game (a) re-parsed the kit ✓/✗ sign SVG strings into new Path2D objects for every sign and (b) rewrote the kit clock chip's whole HTML (kitGameClock innerHTML = a layout + paint per frame). Fix (jdfg.js, the one dfGame shell → all 7 on-figure games): sign paths parsed once per sign; the clock chip is rebuilt only when its whole second changes.

Frame time, real path (maid view → «Trò chuyện với cung nữ» → «Sẵn sàng» → game), dev/measure/ngon-lag.js:

| device | CPU | before p50 / p95 / max ms · frames >33 ms · long tasks | after p50 / p95 / max · >33 ms · long tasks |
|---|---|---|---|
| Fold 755x1000 | 4x slower (phone) | 43.0 / 59.7 / 66.4 · 89 of 89 · 388 ms | 16.6 / 19.9 / 49.8 · 7 of 235 · 0 |
| iPad 1180x820 | 4x slower | 59.7 / 84.5 / 128.4 · 63 of 63 · 3433 ms | 16.7 / 28.4 · 7 of 220 · 153 ms (one 1071 ms frame = the game's end + reaction, not play) |
| Fold | 1x | 16.2 / 20.0 / 28.7 | 16.7 / 16.9 / 20.4 |
| iPad | 1x | 16.8 / 21.7 / 189 · 343 ms long | 16.7 / 20.5 / 96.7 · 249 ms |

Talk/send pickers: tap «Sai đi dò la» → picker on screen: before = NEVER (held until ✕); after = 627 ms Fold / 751 ms iPad (1x), ~2.9–3.2 s at CPU 4x. The remaining time is the shared kit dialog fitting (profile: kitDpFit / kitDpAll / kscue band / kitDlgFit forced layouts ≈ 0.7 s of 2.5 s at 4x) — a kit-wide cost of every person dialog with many option cards → FOR MAIN 151 / KK37 (below), not changed here (law 9).

## SCAN (law 11) — every act card of every person view, every place, real taps (dev/test/dialog-order-scan.js, seeded world SEED=7, same life before/after)
TOP = dialog / scene / mini-game intro on screen at once · HELD = card in Q, nothing on screen (the bug) · DIRECT = no dialog (in-place line, or a locked card showing its reason, e.g. «Chưa biết người này là ai» — looked at).

| run | before (LIVE 5e013076) | after (7be57a8e) |
|---|---|---|
| Fold 755x1000 | TOP 16 · HELD 4 · DIRECT 13 | TOP 25 · HELD 0 · DIRECT 14 |
| iPad 1180x820 | TOP 45 · HELD 17 · DIRECT 124 | TOP 59 · HELD 0 · DIRECT 130 |

HELD acts before → after: Giao việc phòng bị (HELD→TOP), Cùng chơi (9 → TOP), Thách đấu (8 → TOP), Cài đồ vào rương nàng ta (→ TOP), Xin bắt mạch (→ TOP); «Sai đi dò la» (owner's case, maid view, not dealt in the seeded scan life) → evidence below + measure tool. Per-act table (52 acts × before/after × Fold/iPad): dev/handover/shots/dialog-order/scan-table.md; raw rows scan-{main,fix}-{755,1180}.md.

## TESTS
- dev/test/dialog-order-scan.js (NEW, exit 1 on any HELD row / page error): Fold 0 HELD, iPad 0 HELD, 0 page errors.
- dev/test/dayq-hold.js PASS 46 cases (Fold+iPad; A4 = the person view still holds cards the GAME posts) · dayq-order.js PASS · dayq-ghost.js PASS all.
- Old save: save made with LIVE build (mk-oldsave.js) → loaded on the branch, 6 buổi played, Fold + iPad, 0 errors.
- No player-visible word added; no new UI part; one BAL key (BAL.dayq.mineLook).

## EVIDENCE (CDN upload refused: no R2 credentials in this session → fallback dev/handover/shots/dialog-order/ on the handover branch; looked at every shot)
- before-fold-1-after-tap.webp: tap «Sai đi dò la» → nothing (view only) · before-fold-2-after-x.webp: after ✕ the picker appears = her bug · after-fold-1-after-tap.webp: picker ON TOP of the view at once. Same three for iPad (before-ipad-1/2, after-ipad-1). Videos: before-fold.webm, after-fold.webm, before-ipad.webm, after-ipad.webm (real taps, dpr 2).

## FOR MAIN 151
1. ROLE B #7 robot sweep table («screens out of order / behind another box») was not in reports/ — when it lands, run it against review/dialog-order; dialog-order-scan.js covers every person-view act path.
2. KK37 (kit, picker cards): the tap → paint of a big person picker (dò la, gifts) is ~0.7 s on a fast device, ~3 s at phone speed; hot = kit dialog fit passes (kitDpFit / kitDpAll / band / kscue) re-measuring layout several times per open. Suggest KK37 batch those reads (one measure pass) in the same kit job. Tool: `PROF=1 node dev/measure/ngon-lag.js <base> dev/index.html 755 1000 4 1`.

## REVIEW (E96r, opus, fresh eyes, session_01V1ZZH3mbPVRPUJvdawM1xo, 26/11 ~09:30Z) — FAIL 69244656
PRIORITY #1 CHECK ('dò la|modal queue|out of order|Q.length' ): OD 26/11 ~01:25Z/~03:40Z rows read verbatim | main 6b5d3d05: jdayq gate (c), jdfv.js:66, j25.js:20 | review/*: dialog-stack, flight-modal-deadlock, kit-modal-spin, modal-scroll, kit-dialog-2, dialog-dedup (all on main, none covers held-card + own tap) | claims: E96 row only.
Merged 69244656 onto LIVE 6b5d3d05 = review/dialog-order-r 68e0f2b1 (clean merge, rebuilt) + c3634a5d (reviewer probe dev/test/dialog-order-held-probe.js only, no game code).

### What PASSES
- Owner case fixed (real taps): maid → Mưu kế → «Sai đi dò la»: LIVE = nothing on screen, card held (Fold shot looked at: view only, «Có tin đang chờ»); branch = pick-who picker ON TOP at once, Fold 755x1000 (10 cards) + iPad 1180x820 (9 cards), cards visible, not empty (shots looked at).
- Worker scan rerun myself: Fold LIVE HELD 5 → branch 0 (TOP 25 · DIRECT 14); iPad LIVE HELD 17 → branch 0 (TOP 65 · DIRECT 130); 0 page errors. Matches the report.
- P3: a game card posted while her picker is open waits behind it (Q order picker → game card), not over it.
- «Lời hay» frame time at CPU 4x (ngon-lag.js, rerun): Fold p50 52.8 → 16.6 ms (frames >33 ms 70/70 → 9/218); iPad p50 92.7 → 17.7 / 19.1 ms (2 runs). 1x Fold/iPad p50 16.6 / 16.7.
- dayq-hold PASS 46 · dayq-ghost PASS all · dayq-order PASS ×2 alone (one FAIL under 3-job CPU load, LIVE PASS → timing flake, not counted).
- quickcheck 68e0f2b1: time-spill PASS, open 2.5 s 0 errors, old save from LIVE loads + plays a buổi 0 errors; CORE GATES FAIL = G4 80-dialog-fixed («kit-dialog-2 a» empty Tốn/Được cell ×2) + G4 90-button-crawl («Ô lưu · Lui close»): BOTH identical on LIVE 6b5d3d05 (ran each gate on LIVE) → pre-existing, not this branch.
- Law 4: BAL.dayq.mineLook in jbal2 (timing only). Law 7/VANPHONG: no player word added. Law 9: no UI/kit part touched (KK37 untouched).

### FAIL (numbered, for the worker)
1. (check 1, law 11 — the SAME «nút bấm không thấy gì» family, not covered) While a card the GAME posted waits hidden behind the open person view (gate (c) holds it by design, dayq-hold A4), EVERY act card she taps in the view is DEAD — nothing on screen, nothing queued, no reason shown. Cause: the view's own click handler returns on any Q (jdfv.js:66 `if(!dfViewOn()||…||Q.length)return`), and the open-acts path too (j25.js:20 `if(a.lock||S.dead||Q.length)return` → «Sai đi dò la», gift/plant pickers…); ~60 more `Q.length)return` guards in j*.js treat an invisible held card as «a card is showing». Repro (real taps, Fold + iPad, LIVE and branch alike): `node dev/test/dialog-order-held-probe.js <base> dev/index.html 755 1000` → P2: GAMECARD held (modal hidden) → tap «Sai đi dò la» → modal null, Q = [GAMECARD] only; after ✕ the game card shows and her picker is gone (lost). The worker's scan cannot see this: `__D.clean()` empties Q before every tap. Needed: her tap inside the view acts, her dialog paints on top, the held game card comes after it (none lost/duplicated) — one rule in the queue gate / guards (e.g. a «a card is VISIBLE» test instead of Q.length for her own taps), whole family scanned with a held-card variant of dialog-order-scan (before/after table).
2. (check 2, E-c talk path) After «Trò chuyện với cung nữ» (Lời hay) ends, the maid view stays open with NO tabs and NO act cards — an empty view with only ✕, no dimmed cards / reason (Fold, LIVE and branch alike; looked at). This is «ở chổ nói chuyện với cung nữ … nút bấm không thấy gì» too: show the used acts dimmed with their reason below the available ones (OD:L317), or close the view with the result.
3. (FOR MAIN / KK37, not this worker's code — law 9) Tap → «Sai đi dò la» picker paint: 0.77 s Fold / 1.56 s iPad at 1x, 5.3 s / 6.0 s at CPU 4x — not «at once» on a phone; hot = kit dialog fit passes (worker's FOR MAIN 2). E-c is not done until KK37 lands that batching; land together or sequence it.
4. (note) iPad 4x «Lời hay»: p50 fine but p95 55–135 ms, long tasks 2.5–3 s per 4–6 s — recheck after item 3.
Shots/videos (scratch, looked at): P1/P2 Fold+iPad before/after, talk-after-game Fold LIVE+branch. Worker's fallback images under dev/handover/shots/dialog-order/ stay until the final verdict, then wipe them (no images in git).

## r2 (E96f fixer, session_01V1ZZH26Li1sb4jqYFv92t9, for MAIN 156→157) — SẴN SÀNG KIỂM review/dialog-order c34f796e
PRIORITY #1 CHECK ('dialog-order|Q.length)return|pushModal|front of queue'): OD 34 (dò la / modal queue) | ledger 1 | claims E96 row (CLAIMS.md:428) | main 6b5d3d05: jdayq gate (c), jdfv.js:66, j25.js:20, j3.js:22 pushModal | review/*: dialog-order 69244656, dialog-order-r c3634a5d (E96r probe), ob-m3ui 0c6e3222 (kitTopClose / kitBackArm read #modal only — no Q code, no conflict), ob-oan-r6 0ffe0d23 (tsOpener `if(Q.length)showModal()` goes through the same showModal wrapper → follows the rule, nothing to fork) | robot oo-sweep.md root (pushModal = Q.push BACK) = same family.
Branch review/dialog-order fast-forwarded from c3634a5d: e3a07f3b (rule + FAIL 2), fc2d17e5 + d25ebde6 (scan HOLD variant), 931c6df3 (in-scene guard), c34f796e (KIT REQUEST).

### FAIL 1 — ONE queue rule (jdayq.js, tap hook registered early in j3.js), no per-act / per-guard patch
Owner rule via MAIN 156: «a dialog she opens from a tap goes to the FRONT; cards the game posted wait after it; none lost».
- (a) DEAD TAPS: while her tap is handled, a card NOBODY CAN SEE (dqQHidden: in Q, #modal hidden, not playing in-scene; not over the new-day host / a mini-game) is set aside (DQ.park) → every `Q.length)return` guard (66 sites: jdfv.js:66, j25.js:20, dfTap, j21/j42/j77 …) sees the truth «no card is up» and her act runs; after the tap the set-aside cards go back BEHIND what she queued (no card doubled; a save during the tap writes them; a painter armed meanwhile is re-armed). Hook = window capture listener in j3.js (runs before every module's own listeners incl. jselxsc / jevb window-capture ones).
- (b) FRONT: every card her tap queues (during the tap or BAL.dayq.mineLook ms after) is moved in front of the cards that were waiting (dqMineFront, in the outermost showModal wrapper + the tap look), then painted — over the person view (marked DQ.mine, gate (c) never holds it) and in place of the open box whose button she tapped (the opener comes back after it = oo-sweep fix direction). Kept: an ending/death card already waiting keeps its place; a card PLAYING in-scene in the person view / stage encounter (OB-OAN) keeps its place (931c6df3); cards the game posts with no tap keep the back. Solo only (dqUi) like gates (a)/(b): a co-op room keeps its own Q pacing.
- No player word, no UI part, no BAL key added (uses BAL.dayq.mineLook).

### FAIL 2 — empty person view after «Trò chuyện» (whole group: every person card, pop-up + view)
Cause j15 popCard: `groups=done?[]` dropped EVERY act once she talked with the person this visit → the kitFocus view (built from that card) had no tabs/cards, only ✕. Fix: the acts stay, dimmed with the reason (kit pbtn disabled + .kwhy, ONE text POP_DONE «Lần ghé này đã nói chuyện với người này rồi.», already player text); jdf.js in-person acts (Mưu kế / Hại người) likewise. OD:L317 (dimmed below). Fold: «Giao thiệp 0/3 · Mưu kế 0/1», cards dimmed with «!» reason (shot looked at). Family scan: only popCard + dfActs use `visit.talked`/`tk[i]` to hide acts (grep).

### SCAN (law 11) — held-card variant (dev/test/dialog-order-scan.js HOLD=1: a GAME card waits hidden behind the view before EVERY tap; __D.clean no longer hides it). Joined by act with a plain run of the fix (13 acts that open a dialog).
| run | before (base c3634a5d build) | after (r2) |
|---|---|---|
| Fold 755x1000 | dialog acts: DEAD 46 / 46 («Trò chuyện» 23, «Giao việc phòng bị» 23) | TOP 13 / 13 · LOST 0 · GAMEFIRST 0 · HELD 0 |
| iPad 1180x820 | dialog acts: DEAD 45 / 45 | TOP 41 / 42 (1 NOTAP = tool tap timeout; the plain run shows 3 of the same) · LOST 0 · GAMEFIRST 0 · HELD 0 |
Other rows DEAD in both = acts that never open a dialog (in-place line; DIRECT in the plain run). 0 page errors in all 6 runs.

### E96r probe (dev/test/dialog-order-held-probe.js, real taps), r2 build
| | Fold 755x1000 | iPad 1180x820 |
|---|---|---|
| P1 owner case | picker on top (10 cards) | picker on top (10 cards) |
| P2 game card held → tap «Sai đi dò la» | picker ON TOP, Q = [picker, GAMECARD] (base: nothing, Q = [GAMECARD], picker lost) | same |
| P2 order after | picker → (view) → GAMECARD after ✕ → empty: none lost | same |
| P3 game card posted while picker open | waits behind the picker | same |
Shots P1/P2 Fold + iPad looked at (scratch, not in git).

### TESTS (r2 build)
- dayq-hold PASS 46 · dayq-order PASS · dayq-ghost PASS all.
- Old save (made with LIVE origin/main index.html, mk-oldsave.js) → loads on r2, 3 buổi played with real taps, 0 page errors, Fold + iPad; base build stops at the same card with the same tool (tool lacks the «Ta biết rồi» button, not a game fault).
- 0 page errors in every run.

### FAIL 3 — picker paint (measure; KIT REQUEST, law 9)
CPU 4x, real tap «Sai đi dò la» → picker painted: 4.96 s Fold · 6.76 s iPad. Hot = forced layout reads (getBoundingClientRect 0.54 / 1.45 s, offsetParent ~0.47 s, clientWidth ~0.2 s) inside kit fit passes: jk4 kitDpAll + person-row fit, kitDlgFit; jopic `band`; jksize `.dlg *` scan; jk3 kitTabStick. → KIT REQUEST K-PICKER-FIT in dev/kit/KIT_REQUESTS.md (review/dialog-order c34f796e), sent to KK41 session_01V1ZZH1ZpR1p4UkhoUWozbE. Not patched here.
### FAIL 4 — iPad 4x «Lời hay» (measure, note)
Fold 4x: p50 16.7 · p95 29.7 · max 107 ms · >33 ms 11/277 · long tasks 129 ms. iPad 4x: p50 17.5 · p95 95.2 · max 1006 ms · >33 ms 16/100 · long tasks 2.9 s. The iPad long tasks come from the same layout-read family (same hot list as FAIL 3 on that run) → recheck after K-PICKER-FIT lands.

### FOR MAIN 157
1. E-c (picker speed) is done only when KK41 lands K-PICKER-FIT; FAIL 1/2 code does not depend on it.
2. Worker's fallback images under dev/handover/shots/dialog-order/ stay until the verdict (E96r wipes them).

## REVIEW r2 (E96r, session_01V1ZZH3mbPVRPUJvdawM1xo, 26/11 ~11:40Z) — FAIL c34f796e
PRIORITY #1 CHECK ('dqTap|park|Sang buổi|#next|Q.length)return'): r2 report + oo-sweep root read | main 3af7896e (jdayq #next M4 dead-tap rule: a queue nobody painted is shown first) | review/*: dialog-order-r c3634a5d (my r1 probe) | claims E96 row.
Merged c34f796e onto LIVE 3af7896e = review/dialog-order-r2 e19478ee (only built files conflicted → rebuilt) + 19181bf2 (reviewer probe dev/test/dialog-order-next-probe.js, no game code).
### PASS
- r1 FAIL 1 fixed: dialog-order-held-probe.js, real taps, Fold + iPad: P2 game card held → «Sai đi dò la» → picker ON TOP (9 / 10 cards), Q = [picker, GAMECARD], game card after ✕, none lost; P1 / P3 OK.
- r1 FAIL 2 fixed: after «Trò chuyện» the maid view keeps «Giao thiệp 0/3 · Mưu kế 0/1» with every card dimmed + «!» reason (Fold shot looked at; figure = real maid painting, loading at shot time).
- dayq-hold PASS 46 · dayq-ghost PASS all · dayq-order PASS. quickcheck: time-spill PASS, open 2.2 s, old save loads + plays 0 errors; core-gate FAILs = dialog-fixed «kit-dialog-2 a» + button-crawl «Ô lưu · Lui» (same as LIVE, pre-existing).
- No player word / UI part / BAL key added (POP_DONE = the existing text).
### FAIL (for the fixer)
1. REGRESSION vs LIVE — the park (dqTap) runs on EVERY tap, so a card waiting unseen no longer stops time. Real taps, Fold, `node dev/test/dialog-order-next-probe.js <base> dev/index.html 755 1000 <shots>`:
   - N1: person view open, game card held behind it, tap «Sang buổi» → r2: buổi 0→1, the «Buổi trưa» title plays over the view, the card is STILL unseen («Có tin đang chờ»); LIVE 3af7896e: buổi stays 0.
   - N2: no view, a card queued but not painted, tap «Sang buổi» → r2: buổi 1→2 and the card shows only in the NEW buổi (out of order, exactly the owner's complaint); LIVE: buổi stays, the card is shown first (M4 dead-tap rule).
   Same risk for every time-spending tap outside the activity (Dư đồ move, top-bar «Về phòng», Hành sự acts …): the guards now see «no card» and khắc passes over a card she never saw. Fix direction: set cards aside ONLY for a tap that opens her own act inside the activity (.kfoc/#popw/… or an open box she tapped in), never for #next / time-passing taps — those keep LIVE behaviour (card first). Add N1/N2 (+ one Dư đồ move) to dayq-hold so the gate catches it; rerun HOLD scan + both probes.
2. (note) quickcheck perf new/live: buổi 1979 / 1146 ms median (tasks>200 ms 36/34) — check it is not the unpark / re-arm path after fixing 1.
3. FAIL 3 (picker paint, K-PICKER-FIT → KK41) and FAIL 4 (iPad 4x) unchanged — not this fixer's code; E-c done only when KK41 lands.
Worker images under dev/handover/shots/dialog-order/ still to wipe at the final verdict.

## r3 (E96f, answer to «REVIEW r2» E96r + MAIN 158) — SẴN SÀNG KIỂM review/dialog-order b6fb7a30
Base: your review/dialog-order-r2 19181bf2 (fast-forwarded, probe dialog-order-next-probe.js taken in) → d56d60c4 + 9b983d4c (r3) → b6fb7a30 (r3b, rebuilt site files).
### REGRESSION fixed — «Sang buổi» passed the buổi over an unseen card
- Set-aside (park) now runs ONLY for a tap inside the person view she opened (DQ_OWN: .kfoc, its docked #popw, the view's intro layer) — never #next, a tab, Dư đồ, the top bar, a panel or a box (a panel/box may hold a time-passing control). The FRONT move runs only for her act taps (person view / the box or panel she has open), never a time-passing control.
- Whole family of time-passing controls: every buổi turn goes through ONE function nextBuoi (j9; endTurn from it) — «Sang buổi», auto-advance, «Nghỉ», night end, dqWait. The outermost jdayq nextBuoi wrapper now gives set-aside cards back FIRST (her act in the view may spend the last khắc) → an unseen card holds the turn and is painted (M4 rule), as LIVE.
- dayq-hold: new cases N1 (card held behind the person view + real tap «Sang buổi») / N2 (card queued unpainted + real tap). On the r2 jdayq (c34f796e): N1 FAIL Fold + iPad «buổi passed over the unseen card (0→1)». On r3b: PASS 50 cases (46 + N1/N2 × 2).
### r3b tests (real taps)
| test | Fold 755x1000 | iPad 1180x820 |
|---|---|---|
| dialog-order-next-probe (yours) | N1 buổi 0→0, card waits behind the view · N2 buổi 0→0, card painted first · 0 errors | same |
| dialog-order-held-probe P2 | picker on top, Q = [picker, GAMECARD]; order picker → GAMECARD → empty | same |
| held-card scan HOLD=1 | TOP 22 · LOST/GAMEFIRST/HELD 0 · 0 errors | (r3: TOP 59 · LOST/GAMEFIRST/HELD 0) |
| dayq-hold | PASS 50 (both) | |
| dayq-order / dayq-ghost (r3) | PASS / PASS all | |
### quickcheck perf (your «buổi 1979 vs 1146 ms»)
quickcheck.js on b6fb7a30 vs live origin/main, iPad CPU 4x, 3 runs each, run alone on the box: QUICKCHECK PASS · buổi median 1800 / 1689 ms (runs new 1481 · 1779 · 1821 vs live 1650 · 1689 · 1739 — overlapping = box noise, no cost found) · render 232/257 · tab 586/524 · tasks>200 33/32 · open 2425 ms 0 errors · old save ok. Full quickcheck.sh on 9b983d4c: CORE GATES = only the two pre-existing LIVE fails (80-dialog-fixed «kit-dialog-2 a», 90-button-crawl «Ô lưu · Lui»), time-spill PASS.
### Still open (not this code): FAIL 3/4 = K-PICKER-FIT with KK42 session_01V1ZZH3CYo8F1o9jbxCsySG.
