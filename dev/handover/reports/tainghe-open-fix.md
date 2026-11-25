# tainghe-open-fix — worker TAINGHE-OPEN-FIX (opened by MAIN CHÍNH 130), 11/25/2026

PRIORITY #1 CHECK ('tntile|skillacts|tai nghe pop|buoi 3'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 1 (review/kit-tntile) | archive 0. Evidence: dev/handover/reports/kit-tntile.md «## REVIEW r4» + r4 addendum. Extra grep 'NLP|nlOpen|busy()' in jflip/jnf/j52 on origin/main + review/*: no existing fix.

Branch: review/tainghe-open-fix (from LIVE main 502c48c9). Commits: 8db1befa fix + test · 144e2af2 CHANGE line + rebuild (READY build) · 1aef4771 tests (scan + orphan check). Tier (dev/tools/tier.js): **SMALL** (jflip.js ui code + tests).

## 1. Reproduced on LIVE main 502c48c9 (not only review/kit-tntile)
Probe with the kit-skillacts harness setup on the committed LIVE index.html: a plain `kitModal({kind:"info"})` card at buổi 3 never shows (3/4 lives at buổi 3 hidden, the buổi-0 life shows). A setter trap on `#modal.hidden` logged NO write at all → the base showModal (j3) is never reached.

## 2. Root cause, layer by layer
- Every showModal wrapper tagged in a copy of index.html (57 wrappers, push of its number on entry): failing lives run 47,37,28,25,24,19,16,5,57,56,55,54,53,**52** and stop; passing lives run all 57 + BASE.
- Wrapper 52 = **jnf.js:271** (night gate, owner OD 16/11 22:45Z «no dialog under / over the flip scene»): `if(x.st==="open"&&x.me===undefined&&!x.dlg){if(scene()){if(!window.__bot)return}…}`.
- In failing lives: `S.nfX.st="open"`, `cfBusy()` true, `cfAge()` ≈ 6 s (CAP 80 s), `__cfdbg = "push 0|run"`, **no `.kmov.kcf` on screen**. The flip job's `go()` (jflip.js cfPlay) polls `busy()` every 300 ms.
- `busy()` (jflip.js:236) returned true on **`NLP`** = j52's «Thân phận kiếp này» card pending. The harness (`start()` then `Q.length=0`) drops that card WITHOUT `nlAccept`, so NLP stays set for ever: the flip never plays, cfBusy() stays true, jnf swallows every dialog with nothing on screen (≤ CAP 80 s, then cfDrop). The kit-skillacts harness waits 12 s → "opens nothing". The common state in the r4 addendum (all failing lives at S.buoi 3) = nextBuoi ×5 reached the end of tối, where the flip is queued.
- Real player check (dev/test/modal-open-buoi.js, life with «Nhận thân phận» TAPPED and every dialog / scene / night choice tapped through): LIVE main 4/4 Fold lives open the pop-up at buổi 0/1/2/3 → for a real player the identity card is always accepted, so the bug is a harness state (orphaned NLP) that the game nonetheless turned into "all dialogs dead" because the wait was on the flag, not on the card.
- Not causes (cleared by the wrapper trace): j74 park, j61 k61Shown, j25/j57/j58, kitPanel, j68 evGate, jdfv.

## 3. Fix (whole family, LAW 11)
- jflip.js `busy()`: the wait on NLP holds only while the identity card is REALLY open — queued in Q (`m.nl`) or on screen (`#modal` showing `.nlopts`/`[data-nl]`) — `nlOpen()`. Same rule as its own comment ("the identity card is open"); no owner rule changed. flip-newlife case 1 (identity card open → no flip over it) still ALL OK.
- Family scan `python3 dev/test/modal-hold-scan.py index.html`: 56 showModal wrappers, 16 can return early; real hold gates and their verdicts:

| hold gate | waits on | before (LIVE) | after (branch) |
|---|---|---|---|
| jnf night gate (scene()) | jflip cfBusy() job → busy()/kmFree() blockers | NLP flag with no card = held unseen | NLP only while card queued/on screen |
| ↳ busy(): NLP | identity card | **bare flag (bug)** | card open (FIXED) |
| ↳ busy(): #dawn | morning panel, hidden attr + .on | visible overlay, OK | same |
| ↳ busy(): .kbk | book, visibility-checked | OK | same |
| ↳ busy(): #title | title screen | OK | same |
| ↳ kmFree(): #kpodov / roulette / #kmrew | overlays in DOM | visible in play, OK | same |
| jrbatch RB.d>0 | renderHold try/finally | synchronous, bounded | same |
| jspread SP13.nb | inside nextBuoi try/finally | synchronous, bounded | same |
| jdfv dfSeen | the same card playing in the focus scene | on screen, OK | same |
| j99succ | succession cards (own path, base called) | OK | same |
Scan RESULT: LIVE = FAIL (busy() waits on bare NLP), branch = PASS.

## 4. Tests (READY build 144e2af2 + tests 1aef4771)
- Real-tap test `node dev/test/modal-open-buoi.js <url> <WxH> <lives> 6` on review/kit-tntile index.html + this fix (tiles exist only there): per buổi b0,b1,b2,b3, across the night flip + choice, next day b0,b1: kitModal card + REAL click on a Tài nghệ tile (pop-up .ktn-pop shown) + Mệnh truyện slide opener. **iPad 1180x820: 4/4 lives PASS, all reached buổi 3 + the next day**; **Fold 755x1000: 4/4 lives PASS** (2 reached buổi 3 + next day; 2 lives stayed at b1/b2 because a roulette mini-game the driver does not play held nextBuoi — no FAIL, but not a buổi-3 check). Buổi-3 tile taps on Fold are also covered by the first driver (same taps, `realflow`): **Fold 4/4 lives reached b3 → night → next day, every tile tap opened**, iPad 4/4 likewise. Orphan-NLP life (the old harness setup): before = flip queued, nothing on screen, dialogs swallowed; after = the flip scene PLAYS on screen (`push 0|run|play 10`, .kmov.kcf visible).
- `bash dev/tools/quickcheck.sh 144e2af2`: **QUICKCHECK PASS** (core gates incl. kit-conform, time-spill guard, open 0 errors, old save made by LIVE loads + plays a buổi; perf medians new/live render 240/217, tab 441/420, buổi 1466/1141 ms — measured while 8 other test browsers shared the 4 CPUs; the change is one Q.some() per 300 ms poll only while a flip waits).
- coop-e2e: **142/142** twice (two runs).
- tier list: cardflip (Fold+iPad) no FAIL · flip-newlife ALL OK · flip-entry ALL OK · flip-newlife-ui FAIL 1 «rare tile labelled hàng hiếm» = **pre-existing**, identical on LIVE 502c48c9.
- Shots (scratch, not in git): buổi-3 opened Tài nghệ pop-up + tiles, Fold + iPad — looked at (see §6).

## 5. For review/kit-tntile (KK25 / its reviewer) — no KIT REQUEST (cause is not in a kit part)
The kit-skillacts.js harness must accept the identity card (tap `[data-nl=ok]` or call `nlAccept()`) instead of emptying Q, and play out the night (tap the flip scene / answer «Thôi») if it drives nextBuoi past tối; remove the r4 "showModal() again after 0.8 s" retry (it cannot help: the gate is above the base). With this fix landed, an orphaned card no longer kills dialogs, but the flip scene then really plays on screen at buổi 3 and holds dialogs by design, so the harness still has to clear it. ~160 other tests use `start()`+`Q.length=0`; they were silently running without the night scene; with this fix the scene plays in those lives.

## 6. Shots looked at
Scratch /home/user/wt/tnopen-scratch/shots (not in git): b3-pop-755x1000-0.jpg, b3-pop-1180x820-0.jpg (+ tiles). Both: header «Buổi tối ●●●●», real tile tap → «Công · Nữ công» pop-up open, act cards readable, nothing cut; Fold 1 column, iPad XL 2 columns.
Note for kit-tntile (not this fix): on the Fold shot an older «TÀI NGHỆ · Luật chơi · Tuyển chọn…» side panel stays open UNDER the pop-up (left from the life; the driver does not close side panels). Their reviewer may want to check pop-up over side-panel stacking.

## 7. LAND READY
LAND READY 993725c4 (tier SMALL per tier.js on the head) — head of review/tainghe-open-fix (84a62610 + report text only); the build (index.html/sw.js) is the one made at 144e2af2, later commits add only tests + this report.
