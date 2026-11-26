# coop-rebirth-stuck — report (worker T3b, foreman D; FLIGHT play-stopper)

PRIORITY #1 CHECK: OD flight priority 25/11 ~16:00Z (MAIN 142/143) | predecessor T3 facts: reports/temper-coop-fix.md «coop-rebirth-stuck — HANDOVER» + «ROLLOVER T3» | reused T3's probe commits e6c84f14 / ba0e8b4c and jdayq's own BAL.dayq numbers | LIVE dbae89eb at start, 17dfa64d at SSK.

## Root cause (found 17:20Z)
Hunt on LIVE dbae89eb (coop-e2e loops under load, 3 seats in parallel): 2 stucks in 16 runs, both host A in a DAY buổi (2:1, 2:2), not only after rebirth.
- NOT a swallowed click: T3's clickTest showed `#next` **disabled** (0 click events reach it) while Q = 0, every co-op gate open (base, not waiting/frozen, no allow), bend false. A direct `nextBuoi()` works.
- New probe (stack of every `#next.disabled` write): the last write is j6 `render()` at **Q = 1** (a card arrived, render disables the button). The card then left Q through a **silent remover**: a splice / filter with no `render()` / `lockNext()` after it. Only those two functions ever write `#next.disabled`, and both only run on events, so the button stayed dead for ever. `lockNext()`'s own last branch already re-enables it for the host-patch case, but nobody called it.
- Silent removers: 57 sites (dev/test/scan-next-dead.py, Family A), e.g. jspread sp13 move-out (jspread.js:84), jnf ksp/prep splices, jcoopthin/thinb filters, jcooplobby drop, j68 / j70 / j74 splices.
- Same family as solo FAST LANE F1 («Sang ngày mới» dead, a hidden card in Q): jdayq `dqActEl` / `dqOldPending` counted an activity host that is in the page but NOT RENDERED (`display:none`, `[hidden]`, zero size, `visibility:hidden`: a scene / podium / roulette / reward host left behind) as «she is inside an activity». The queued card was held hidden for ever, and the safety net `dqWake` never fired because `dqFreeScreen` asks `dqActEl` first.
- Side fact for the record (not changed): in solo, `#next.onclick` is the early-captured nextBuoi (j6 runs before the wrappers; jcoopworld keeps it as `o`). A solo click skips every later nextBuoi wrapper (0 calls through the global chain, measured). That is pre-existing, so it is left as is (LAW 16/18) and only reported here.

## Fix (dev/build/jdayq.js only; paint only: no S key, no random draw, no room message; numbers BAL.dayq.wake / poll)
1. `dqOn(sel)`: only an element that is ON SCREEN (`dqShown`) counts. Used in `dqActEl` (#ov, .kmov, #kmrew, #kpodov, roulette) and `dqOldPending` (busy scene, #ov, podium, roulette). Family B scan: 7 unrendered-host lookups → 0.
2. `dqNextHeal` every BAL.dayq.wake ms: a disabled `#next` while nothing holds it (alive, Q empty, no mini-game) is checked again by its OWN rule. Co-op uses `COOPW.lockNext()`, which keeps every room / night / where / thin-E lock and its words. Solo uses render()'s rule (it skips a button carrying a co-op wait). It never enables a button that a real reason holds: Q > 0 / mg / dead are skipped, and co-op locks are decided by lockNext itself.

## Tests (failing on LIVE → passing on the fix)
| test | LIVE dbae89eb | fix 6691f760 (on dbae89eb, build 16184706) |
|---|---|---|
| dev/test/dayq-ghost.js (new; G1–G4 ghost hosts + R1 real-scene control, Fold 755x1000 + iPad 1180x820) | FAIL 8/10 (all ghosts hold the card) | PASS 10/10 |
| coop-e2e new check «host: a #next left disabled with no reason comes back (heal)» | FAIL (back false, «Sẵn sàng», Q 0) + 1–2 «fold #next enabled» FAILs after it | PASS |
| coop-e2e ALONE ×3 | — | 143/143 · 143/143 · 143/143 |
| dayq-order (solo day turn) | — | PASS |
| dayq-hold (solo, 46 cases activity × source) | — | PASS 46 |
| dayq-hold-coop | — | PASS 17/17 |
| scan-next-dead.py | A: 57 silent removers, not covered · B: 7 ghost lookups | A: 57 covered by dqNextHeal · B: 0 |

Note: my first gate round (17:12–17:32Z) is INVALID. It ran on a build assembled before the heal landed, so it showed the LIVE FAILs. Everything above was re-run on the rebuilt page.

## Branch
review/coop-rebirth-stuck = T3 probe commits (test only) + fix commit 6691f760 + merge of LIVE 17dfa64d (no file overlap with 5b7b4cf4 / 17dfa64d). SSK sha + post-rebase confirmation run: see the last line.

SSK review/coop-rebirth-stuck 6199201d = 6691f760 + merge of LIVE 17dfa64d (tree identical to the tested rebase ea68d8c0; build 16191231: dayq-ghost PASS all, coop-e2e alone 143/143) — 17:57Z

## REVIEW (RV-CRS, BIG tier, foreman D) — PASS 9fea1332 (18:55Z)
PRIORITY #1 CHECK: OD flight priority 25/11 ~16:00Z (MAIN 142/143) | main LIVE 17dfa64d (was dbae89eb at open) | review/* review/coop-rebirth-stuck 6199201d (T3b SSK) | claims RV-CRS.
**Verdict: PASS 9fea1332** = review/coop-rebirth-stuck-r6 = SSK 6199201d + ONE reviewer build commit (index.html / sw.js rebuilt + its CHANGE line «Nút «Sang buổi» / «Sẵn sàng» không còn nằm mờ khi chẳng có gì đang chờ.»). The SSK sha held no build of its own (quickcheck step 1 needs one). Ancestor: LIVE 17dfa64d → fast-forward.

### Code read (jdayq.js only)
- Only j6 render() (j6.js:10), jcoopworld lockNext() (:347–352) and the new dqNextHeal write `#next.disabled` (grep of every `.disabled=` in dev/build/j*.js).
- Solo heal: it enables only when render()'s own rule holds (alive, Q 0, no S.mg) and the button has no coop-wait mark. Any render would enable it in the same state, so the heal adds no new road. Co-op heal: it only calls COOPW.lockNext(), which the co-op render wrapper already calls on every render. Every room / night (nReady) / where / pendBuoi / thin-E (eWait) / gap / frozen / pend lock is kept, together with its words. No path enables a button over a real lock, and both seats stay in step.
- dqOn / dqShown: no real scene host (.kmov, #kmrew, #kpodov, roulette) starts hidden or at zero size (CSS + code grep), so gate (c) still holds every real activity. The R1 control in dayq-ghost and dayq-hold 46 confirm it.
- LAW 4: the heal interval is BAL.dayq.wake, with the same fallback as the existing dqWake. LAW 11: scan-next-dead.py lists 57 silent Q removers; the single heal covers all of them, so no site has to be found one by one. The 6 activity lookups are all on-screen only. No UI, no new words, no S key, no random draw (LAWS 7/9 n/a).
- Out of scope (D): the solo #next.onclick early-captured nextBuoi is pre-existing and parked for MAIN.

### Break probe (D: «try to break it»; real build, Fold): disable #next, wait 2 × BAL.dayq.wake
| held by | #next after | healed |
|---|---|---|
| Q > 0 (hidden card) | disabled ✓ | 0 |
| S.mg | disabled ✓ | 0 |
| S.dead | disabled ✓ | 0 |
| co-op wait mark (data-coopWait) | disabled ✓ | 0 |
| co-op room, lockNext keeps its lock | disabled ✓ (lockNext called 2×) | 0 |
| CONTROL: nothing holds it | enabled ✓ | 1 |

### Gates (run ALONE, one at a time, on the merged sha 6199201d / build 9fea1332)
| gate | LIVE | branch |
|---|---|---|
| coop-e2e alone | 142/142 (dbae89eb) | **143/143 · 143/143** (heal check ok both) — also 143/143 ×2 on 6691f760 |
| dayq-ghost | FAIL 8 (dbae89eb) | PASS all |
| dayq-hold (46 cases) / dayq-order / dayq-hold-coop | PASS / PASS / 17/17 | PASS / PASS / 17/17 |
| quickcheck alone | — | old save ok · open 1951 ms · perf new/live render 269/238, tab 526/542, buổi 1269/1452 · G4 90-button-crawl FAIL (see below) |
| shots Fold 755x1000 + iPad 1180x820: day turn ×3 → «Sang ngày mới» → night (lật thẻ bài flip / night dim) → next buổi | | normal, no visual change, 0 page errors |

**quickcheck G4 90-button-crawl is a LIVE fault, NOT this branch:** «FAIL fold · Ô lưu [#modal.kptitle] · Lui · close button did not close its layer (something else changed)». button-crawl --fast alone ×2 gives the SAME row on LIVE 17dfa64d's index.html and on the branch, ×2 each. It will FAIL golive's quickcheck for ANY sha until fixed or filed in quickcheck.d/button-crawl-known.txt → D/MAIN decide.
Shots in reviewer scratch only (none in git, none on the CDN, nothing to wipe).

### REVIEW r7 (final merge, D 19:41Z: LIVE moved to 351122ba) — **PASS feefe4af** (20:08Z)
review/coop-rebirth-stuck-r7 feefe4af = r6 9fea1332 merged onto LIVE 351122ba (fast-forward from 351122ba). Only index.html / sw.js / CHANGE.txt conflicted; they were rebuilt and the fix's CHANGE line kept. No source overlap: the diff against main is jdayq.js + dayq-ghost.js + scan-next-dead.py + coop-e2e.js.
ALONE on feefe4af: coop-e2e 143/143 (heal check ok) · dayq-ghost PASS all · dayq-hold-coop 17/17 · quickcheck: old save ok, open 1983 ms, perf new/live render 251/252, tab 630/547, buổi 1345/1578 ms, tasks>200ms 25/25. The only fail is the known pre-existing G4 row «Ô lưu · Lui» (LIVE fault, above).

### ROLLOVER RV-CRS (20:25Z, context at the roll line) — HANDOVER for the next BIG reviewer
State: the fix is LAND READY (r7 feefe4af PASS; MAIN 145 has lander LC17 stack 9fea1332 on SANGBUOI r4 + B). Nothing of mine is open: the r6/r7 branches are pushed and the worktrees are removed.
Next job (D 20:23Z): BIG review of T3b's coming SSK «jdayq.js one-rule cleanup» (dqNextHeal solo → dqNextSync; co-op keeps COOPW.lockNext).
Recipe that worked (all ALONE, one at a time):
- Build: `bash dev/site/build_site.sh` in a sparse worktree. If the SSK has no build commit, add one (index.html/sw.js + CHANGE line) on review/<topic>-rN; quickcheck needs it.
- Local server for dayq-hold / dayq-order: python http.server sends no charset and breaks dev/index.html, so use a UTF-8 server (`.html`/`.js` → `charset=utf-8`), then `node dev/test/dayq-hold.js http://127.0.0.1:PORT dev/index.html <out>`. dayq-ghost / dayq-hold-coop / coop-e2e take no URL (coop-serve.js).
- Break probe (re-run it on the cleanup): disable #next, wait 2 × BAL.dayq.wake; it must stay disabled for Q>0 / S.mg / S.dead / data-coopWait / co-op lockNext holding, and come back in the control. A copy is in the RV-CRS scratchpad (break.js); rewrite it from this line if that is gone.
- Code-read anchor: only j6 render(), jcoopworld lockNext() and the jdayq heal write #next.disabled (grep `.disabled=`). A solo sync must equal render()'s rule exactly (S.dead||Q.length||S.mg).
- Known: quickcheck G4 «Ô lưu · Lui» fails on LIVE too (pre-existing, not a FAIL for branch work). Solo #next.onclick using the early nextBuoi is parked for MAIN (out of scope).

## HANDOVER T3b → successor (20:25Z; T3b at its context roll line, so it does not start the next job)
State: fix landing via LC17 stacked on SANGBUOI r4 3762da08 (D, MAIN 145: land as-is; D names the stacked shas 9fea1332 / feefe4af). At 20:25Z origin/main = 351122ba: NEITHER `dqNextSync` (r4) NOR `dqNextHeal` / `dqOn` (this fix) is on LIVE yet.
NEXT JOB (MAIN order 20:10Z, AFTER FLIGHT; start only once LIVE holds r4 + this fix: `git grep -c dqNextSync origin/main -- dev/build/jdayq.js` and the same for `dqNextHeal` must both be > 0):
- Branch review/dayq-one-rule off LIVE. ONE RULE in jdayq.js: in `dqNextHeal` replace the SOLO branch (`if(n.dataset.coopWait)return;n.disabled=false;…dqNextCue()`) with `dqNextSync();return` (r4's render-based net). Keep the co-op branch `c.lockNext()` exactly.
- Gates: dev/test/dayq-ghost.js (it serves through coop-serve.js, so do NOT use python http.server: dev/index.html then fails with «Invalid or unexpected token»), dayq-hold / dayq-order (baseURL server must send `charset=utf-8`), dayq-hold-coop, coop-e2e ALONE ×2 (must include the «#next left disabled … comes back (heal)» check), r4's Sang buổi test, quickcheck ALONE.
- Remember: `python3 dev/build/assemble.py` AFTER every edit (it writes dev/index.html; T3b lost a gate round to a stale build).
- SSK to D (session_01D3E3NYUzBGWQKuxVhNNMNw) + RV-CRS (session_01D3E3NbALbEXx1QFrEeKvCN).
Facts kept: solo `#next.onclick` = the early-captured nextBuoi (skips every later wrapper), pre-existing, parked for MAIN.

## dayq-one-rule (worker) — SẴN SÀNG KIỂM 9e23088d (01:55Z 26/11)
PRIORITY #1 CHECK: OD 0 | main dev/build/jdayq.js:95 dqNextSync + :190 dqNextHeal (LIVE 5e013076) | review/* none before this branch | claims D ROOT 2 row 2026-11-25T22:14Z.
Depth 1 · START_CTX ~4 % · context at SSK ~22 %.
Branch review/dayq-one-rule off LIVE 5e013076: d7584906 (code) + 5a01452c (build: index.html / sw.js / assets.json; CHANGE line kept; assets.json picked up 5 new CDN «xuân sáng» backgrounds from build_site) + 9e23088d (dev/test/dayq-break.js).
Change (jdayq.js only, dqNextHeal solo branch): `n.disabled=false;…dqNextCue()` → `if(n.dataset.coopWait)return; dqNextSync(); if(!n.disabled) healed++`. Co-op branch `c.lockNext()` unchanged. The coopWait guard stays (brief: data-coopWait respected).
Code read: only j6 render() (j6.js:10), jcoopworld lockNext() (:347/:350/:352) and jdayq write #next.disabled (grep `.disabled=`); the heal no longer writes it, so only render() and lockNext() do. dqNextSync = dqUi() && dqNextStale(), and dqNextStale = disabled && !Q.length && !S.mg && !S.dead && #modal hidden → render(), i.e. render()'s rule exactly, plus two narrowings vs the old heal: (1) no heal while #modal is shown, (2) none for bots (dqUi). NOTE: dqWake (every 700 ms) ALREADY calls dqNextSync, so the solo heal is now the same net as dqWake, just on the 2 s tick (law 13: one rule). Behaviour change vs LIVE: the old heal enabled the button with NO render; now render() runs, and when khắc are spent render's own auto-advance (advLock / nextBuoi after 350 ms) can fire.

| gate (ALONE, one at a time) | branch | LIVE 5e013076 |
|---|---|---|
| dayq-ghost (coop-serve) | PASS 10/10 | — |
| dayq-hold (UTF-8 server) | PASS 46 | — |
| dayq-order | PASS | — |
| dayq-hold-coop | 17/17 | — |
| coop-e2e ×2 | 143/143 · 143/143 (heal check ok both) | — |
| sangbuoi-held full | run 1: Fold A–H all PASS (iPad cut by my 1200 s timeout) · run 2: all PASS except Fold A ×1 | — |
| sangbuoi-held CASES=A REPEAT=6 | 1/8 · 4/24 · 3/8 (diag copy) FAIL; my change on LIVE's assets.json 2/24 → **10/64 fail** | **0/24** |
| dayq-break (new) | heal() alone holds Q>0 / S.mg(#ov on) / S.dead / data-coopWait / co-op lockNext (called 3–4×) ✓; control comes back through render (render 1) | same holds; control comes back by direct write (render 0) |
| dayq-break after 2 × wake | S.mg and solo data-coopWait come back ENABLED | IDENTICAL on LIVE (pre-existing, not the heal) |
| quickcheck ALONE | G4 «Ô lưu · Lui» (known LIVE row) · perf buổi 3748/1552 FAIL in the 3-run median (runs 3748/1487/5376) → quickcheck.js --runs 5 rerun: **PASS** buổi 4484/4350, render 278/254, tab 662/548, tasks>200 27/28, old save ok | — |
| shots Fold 755x1000@2 + iPad 1180x820@2 | day turn → «Sang ngày mới» → night → dawn scene «Đêm không được triệu» → day 1-0; 0 page errors both; looked at: normal | — |

sangbuoi-held A reading (NOT settled, per D): every failing dump shows a real game card («Có người tìm đến», Q=1, #modal open, #next disabled correctly) landing after the test's drain loop, or a setup race («setup: next disabled / modal open»). DQ.stat has no `healed` and staleNext 0 in those page lives, so the changed line did not visibly run. But 10/64 vs 0/24 is a real gap. A likely link: render()'s auto-advance now fires from the sync (it did not with the old direct write), so its 350 ms timer clears the test's advLock=true and a game card lands in the setup window. Successor: run LIVE with the same REPEAT count first; if the gap holds, TRACE render callers in case A (copy with a state dump: put `JSON.stringify(await st())+diag()+{advLock,used,#modal text}` into the case-A fail line).
Break-probe callers (who.js, measured): the solo data-coopWait mark is cleared by dqWake → dqNextSync → render → jcoopworld lockNext (r4 code, already LIVE); the fake S.mg is released after a lifeGate → render. Neither is the heal; left as is (LAW 16), reported.

### HANDOVER dayq-one-rule → Q-SOFTLOCK successor (D ROOT 2 opens it)
State: review/dayq-one-rule 9e23088d pushed, gates above. No review of one-rule alone (D 01:11Z): one BIG review of the whole jdayq branch (one-rule + r3wip + Q-softlock).
Next job (MAIN 150 ORDER Q-SOFTLOCK, verbatim in dev/handover/FOREMAN_D_STATUS.md «FROM MAIN 150 → FOREMAN D — ORDER Q-SOFTLOCK» + FAULT/JOB lines): (1) stack review/sangbuoi-held-fix-r3wip 4cf5e9c2 under/with dayq-one-rule; (2) reproduce F's s3f faults on LIVE (a: «Sang ngày mới» ×3, Q=1 «Tin trong cung buổi này»; b: «Có tin đang chờ · xo…» disabled, Q=8 Tin báo / Xét phẩm cuối tháng, 150 taps) — ask Foreman F for the s3f save/dump via FOREMAN_F_STATUS.md; (3) root fix for the whole dqWait / dqShown hold family + scan + before/after table + tests (a)(b) on Fold + iPad; (4) SSK to D.
Recipe: sparse worktree; `python3 dev/build/assemble.py` after EVERY edit, then `CTM_CHANGE="$(cat dev/site/CHANGE.txt)" bash dev/site/build_site.sh` (without CTM_CHANGE the build line takes the last commit message). UTF-8 server for dayq-hold / dayq-order / sangbuoi-held (python SimpleHTTPRequestHandler with `.html/.js/.json` → `; charset=utf-8`); dayq-ghost / dayq-break / dayq-hold-coop / coop-e2e need no URL. sangbuoi-held is SLOW (~10 min per device; REPEAT=6 needs timeout ≥ 3300 s). Quickcheck ~15 min (button crawl 837 s); the perf «buổi» median is bimodal (1.5 s / 4–5 s) → rerun `node dev/tools/quickcheck.js <wt> <live index.html> --out <dir> --runs 5` before calling it a fault.
Traps: the handover branch was force-moved during my run (fetch with `+ref`). My shots script snapped the night step on iPad before the flip (1.5 s wait); the dawn scene holding #next (Q=3, «Có tin đang chờ…») is a correct hold, not fault (b).

## Q-SOFTLOCK owner #2 (session_01D3E3NZp1wTTjkLZkV5TNWr) — WORK DONE, GATES OWED (03:40Z 26/11)
PRIORITY #1 CHECK: OD 0 | ledger 0 | main jdayq.js LIVE 5e013076 (dqOn, dqNextHeal, r4 dqNextSync) | review/* dayq-one-rule 9e23088d + sangbuoi-held-fix-r3wip 4cf5e9c2 (both stacked here) | claims D ROOT 2 row.
Depth 1 · START_CTX ~4 % · context at handover ~27 % (roll line 29 %).
Branch **review/dayq-qsoftlock 5b35ef89** = dayq-one-rule 9e23088d + merge r3wip 4cf5e9c2 (f2557529; r3wip's every-match lines folded into the one `dqOn` helper) + fix 7f2cab7c (code + tests + build) + 5b35ef89 (scan only).

### (0) case-A gap — reading (not yet the final ALONE gate)
- Same load, side by side, Fold, REPEAT=12: LIVE 0/12 · branch 1/12. Branch REPEAT=30: 2 fails. Every fail was traced (render / nextBuoi / showModal ring, state dump): **the changed heal line (dqNextSync from dqNextHeal) never ran in a failing case** (no dqNextSync render in the window; staleNext 0/1). Each fail = a real game card («Có người tìm đến», «Tâm trạng · …») held ≤ 2 s and then shown by the dqWake net (stat woke+1) AFTER the test's drain loop had given up (1.5 s idle < BAL.dayq.wake 2 s + 700 ms tick) → the card sat on screen, `advanced()` saw no turn.
- Test fix (both builds run the same test): dev/test/sangbuoi-held.js drain idle = ceil(BAL.dayq.wake/500)+2 polls (read from BAL, no typed number). Under it the remaining fails seen were only «setup: next disabled» after the test's own ensureQuiet ran >240 s (a new-life intro, test speed), LIVE had the same hangs (6) — noise of the parallel load, not product.
- **Owed (successor)**: sangbuoi-held CASES=A REPEAT=12 ALONE, LIVE then branch, same fixed test (copy the branch test file and point it at a LIVE server), + sangbuoi-held full. Land only if branch fails ≤ LIVE.

### (2) reproduction of F s3f (a) / (b)
- Asked F for the s3f dumps (FOREMAN_F_STATUS 02:00Z line; F #17 and the s3f runner are not reachable by send_message from this account). Used F's own s3f save from dev/handover/robot/flight2-s3f-khoathi/stuck-4 (y7 t72 night, 00:08Z, 5 min before the report) with F's harness robot-rt.js (review/robot-realtap 8dc395ba, dev=ipad bot=cautious, resume from a ckpt built from the dump's ls) on a LOCAL LIVE server: 171 buổi, 0 softlocks. Local assets load instantly; see root below (a scene job whose picture preload never lands is a slow-CDN event), so the robot does not hit it here.
- ROOT (code read, then built as cases): the motion-scene queue KMQ blocked with NOTHING on screen. (1) j93 `kmFree` returns «not free» while `#kmrew` / `#kpodov` / a roulette / `#dawn.on` merely EXISTS (ghost host, not the dqShown rule); (2) a scene job keeps `kmBusy` up to its 600 s guard while nothing of it is on screen. A blocked KMQ holds the turn (`dqOldPending`: KMQ.length → DQ.want, «Sang ngày mới» taps do nothing) and an unstarted night flip (cfBusy) makes jnf's night gate swallow every card (incl. the per-buổi «Tin trong cung buổi này», DQ.newsHold 0 so dqNewsPass does not apply) until its cap BAL.steal.choice.waitMs−ms = 80 s → (a) «×19» (one per night) and (b) Q=8 held + greyed «Có tin đang chờ».

### (3) fix (dev/build/jdayq.js only; solo dqUi; paint/queue only: no S key, no draw, no message; numbers BAL.dayq.stale / wake)
- `dqKmStale` (700 ms tick): kmBusy + a scene waiting in KMQ + screen EMPTY (`dqScreenEmpty`: no #modal, no dawn, no S.mg, nothing of the activity/scene family on screen by dqOn) for BAL.dayq.stale ms → the stale job's finish is voided (`kmGen++`, as kmReset does for a life), kmBusy=false, kmPump. Stat DQ.stat.kmStale.
- `kmFree` wrapper: when j93 says «not free», only a host ON SCREEN keeps that answer (`dqKmReal` = dqDawn() || dqOn(#kpodov, roulette, #kmrew)); a ghost lasting BAL.dayq.wake ms no longer blocks. Stat DQ.stat.kmGhost.
- Scan dev/test/scan-q-hold.py: family A = every showModal / nextBuoi wrapper that returns without calling its inner (10 showModal + 4 nextBuoi hold-returns, listed with file:line; bounded holds: jdfv/jgreet face wait ≤ 4 s, jnf ≤ cap, jrbatch flushes, jspread sp13, jdayq act/dawn with arm + dqWake net); family B = scene-queue holders: **LIVE 5 of 5 uncovered → branch 0 of 5**.
- Tests (sangbuoi-held.js, real taps): **J** (a) night choice open + flip queued behind a stale kmBusy + per-buổi news hidden, she taps «Sang ngày mới» 3× → flip plays (~11.2 s = stale + tick), she taps it, the news card shows, «Sang buổi» advances. **K** (b) ghost `#kmrew` (display:none) + a scene in KMQ + 8 kit cards hidden, khắc spent → cards and the scene show, she taps through, the buổi turns.

| CASES=JK, real taps | LIVE 5e013076 | branch 7f2cab7c |
|---|---|---|
| J Fold 755x1000 | FAIL «flip never played» (news hidden, «Sang buổi» enabled, tapPaint 3 = 3 taps swallowed, no turn) | PASS (flip 11318 ms) |
| J iPad 1180x820 | (run killed at roll; Fold already shows it) | PASS (flip 11174 ms) |
| K Fold | FAIL «queued scene never played» (DQ.want held, KMQ stuck) | PASS |
| K iPad | (killed) | PASS |
Shots looked at (branch, not in git): J2 news card on top after the flip (Fold), K1 the queued scene playing over the room (iPad) — normal.
LAW 16 note: behaviour changes only where a host / busy flag holds the queue with nothing on screen; co-op untouched (dqUi).

### HANDOVER → successor (D opens it): gates ALONE on review/dayq-qsoftlock 5b35ef89 (build in 7f2cab7c is current; rebuild only if you change code)
1. sangbuoi-held full (A–K) Fold+iPad, then CASES=A REPEAT=12 vs LIVE with the SAME test file (LIVE serves its own index.html; run the branch's dev/test/sangbuoi-held.js against both URLs). 2. CASES=JK on LIVE iPad (complete the table). 3. dayq-ghost, dayq-hold (UTF-8 server), dayq-order, dayq-hold-coop, dayq-break, coop-e2e ×2, quickcheck (--runs 5 if perf bimodal). 4. FULL videos Fold + iPad of J and K (recordVideo, real taps) → CDN img/_review/dayq-qsoftlock/. 5. SSK to D → ONE BIG reviewer for the whole jdayq branch.
Recipe: UTF-8 server = python http.server with `.html/.js/.json` → `; charset=utf-8` (see previous handover). sangbuoi-held needs ≥ 1500 s per device pair for J/K on LIVE (they wait out their limits); write output to a file, never through `| tail` in a timed foreground call. Do not run gates in parallel (load 9 on 4 cores made case A flaky).

## Q-SOFTLOCK owner #3 (session_01D3E3NZQpRGvf6D1rFaJRgM) — fix (c) added, LIVE moved twice, GATES OWED on fac74a68 (07:05Z 26/11)
PRIORITY #1 CHECK: OD 0 | ledger 0 | main LIVE 02f564ae | review/* review/dayq-qsoftlock fac74a68 (FF from 02f564ae) | claims D row (Q-SOFTLOCK).
Depth 2 · START_CTX ~4 % · context at handover 25 % (roll line 29 %).

### Branch review/dayq-qsoftlock fac74a68
= 5b35ef89 + 9246cfdd (fix (c), code+test+scan+build) + 82128893 (merge LIVE f009e1a6, built files rebuilt) + c7525e14 (test only: tapAny skips the new «Luân hồi» #kroul roulette) + fac74a68 (merge LIVE 02f564ae, built files rebuilt). Build in fac74a68 is current. Main's CHANGE line kept (no new player text).

### Gates done on 5b35ef89 (before the (c) fix and before LIVE moved)
| gate | result |
|---|---|
| sangbuoi-held full A–K Fold + iPad | **ALL PASS** (J flip 11.2 s both) |
| CASES=A REPEAT=12 on LIVE 5e013076 (branch test file) | 24/24 PASS (Fold+iPad) — branch half stopped on purpose (code changed) |

### New F cases (D 04:17Z / 05:15Z)
- **s9e softlock Q=0** (dev/handover/robot/flight2-s9e-softlock/, harness qs block): noturn-2 = Q 0, DQ.want held, screen free, next «Sang ngày mới» enabled, **DQ.stat.actKm +4/s**; loop-1 28 s earlier = Q 4 («Mục lục / Tin báo / Danh hiệu / Quẻ») held, «Có tin đang chờ» greyed. ROOT: the jdayq kmFree wrapper's activity gate (c) `(ov&&!dqHidden(ov))||(window.DF&&DF.play)` trusted an un-hidden #ov / a left-over DF.play handle with nothing on screen → the queued scene never starts → KMQ holds the turn (dqOldPending), and the jnf night gate held the cards behind that unstarted scene. SAME family B (scene-queue holders), NOT covered by 5b35ef89.
- FIX 9246cfdd (jdayq.js only, solo dqUi, BAL.dayq.wake, same on-screen rule as K): gate (c) holds only for #ov dqShown / a .kfoc on screen; a ghost lasting BAL.dayq.wake ms is released (DQ.ka, stat kmGhost). Co-op seat keeps the old answer.
- TEST case **L** (sangbuoi-held): L1 ghost #ov, L2 left-over DF.play + 2 cards + queued scene, khắc spent, 3 taps on «Sang ngày mới». LIVE 5e013076: **L2 FAIL Fold + iPad** with the exact s9e state (Q 0, want held, next enabled, actKm 168); L1 passes on LIVE (the game re-hides a stray #ov). Branch 9246cfdd: **L PASS Fold + iPad** (L1 4.1/4.5 s, L2 2.5/2.8 s).
- SCAN dev/test/scan-q-hold.py family B now 7 rows (4 j93 kmFree hosts + kmBusy + jdayq gate (c) #ov + DF.play; tap gate / newsHold listed as bounded): **LIVE 7 of 7 uncovered → branch 0 of 7**.
- s9e tintrong «Lui» ×3 (no qs block, ckpt after the event): not reproduced; likely the same scene-wait loop (news card re-shown while the night scene waits) — covered by reasoning only.
- s2e noturn ×49 (25/11 18:16, older build, no qs/DQ block): count only, not diagnosable.

### Open: one Fold K FAIL on 9246cfdd (gate chain g2, before merges)
«the queued scene never played» with KMQ 0, want null, dropped 1: the buổi turned another way while held, and the test loop breaks on a turn before it sees #tstkm. K does not touch #ov / DF.play, so likely timing, but NOT measured yet: run CASES=K REPEAT=6 on the branch (the chain below has it). If it repeats, trace who turned the buổi (dqWait dropped = bkey changed while held).

### Why the gate chain is not done — the test needs one more adaptation to LIVE ≥ f009e1a6
LIVE now starts a life with the «Luân hồi» roulette (#kroul) + daily selection scenes (tuyển tú) in buổi 0. (1) Fixed in c7525e14: tapAny skips #kroul. (2) STILL OPEN: each case that ends at buổi ≥ 2 calls newLife(), which now runs the whole heavy selection flow (GPU ~95 % / renderer ~80 % CPU in headless); on fac74a68 the chain did only A PASS then **B FAIL «setup: turn not held ({scene:true, want:null, bk:"0.0"})»** in 30 min — newLife returned while still in buổi 0 with a scene. Next owner: make newLife() wait until a normal day (S.buoi===1, turn after the selection, nothing on screen; loop longer than 8 × 900 ms, tapping like the robot), or start cases without a new life when buoi ≥ 2 is not needed. Run the SAME test file on LIVE 02f564ae first to prove it before comparing.

### HANDOVER → successor (D opens it): gates ALONE on review/dayq-qsoftlock fac74a68 (or later if LIVE moves: merge main first, take main's built files, `python3 dev/build/assemble.py` + `CTM_CHANGE="$(cat dev/site/CHANGE.txt)" bash dev/site/build_site.sh`, commit)
1. Fix sangbuoi-held newLife for the new life start (above), test only, push. 2. Chain ALONE (my runner script, rewrite it from this list; run it with `setsid nohup` so a 2 h tool limit does not kill it): sangbuoi-held full A–L Fold+iPad · CASES=A REPEAT=12 branch AND LIVE (same test file; land only if branch fails ≤ LIVE) · CASES=JKL on LIVE (before column) · CASES=K REPEAT=6 branch · dayq-ghost · dayq-hold (UTF-8 server, dev/index.html) · dayq-order · dayq-hold-coop · dayq-break · coop-e2e ×2 (out dir arg) · quickcheck `node dev/tools/quickcheck.js <wt> <live wt>/index.html --out <dir> --runs 5`. 3. FULL videos Fold 755x1000 + iPad 1180x820 of J, K, L (a preload that adds recordVideo to every newContext works: `node -r <preload.js> dev/test/sangbuoi-held.js …` with CASES=JKL, VIDDIR) → CDN img/_review/dayq-qsoftlock/ (python3 dev/site/cdn_sync.py img/_review/dayq-qsoftlock). 4. SSK here + to Foreman D (session_01D3E3NaVk7n7f8KTo2enJna) → ONE opus BIG reviewer (brief «ROLLOVER RV-CRS» above + the SSK). 5. On PASS: «LAND READY review/dayq-qsoftlock <sha> (FF from LIVE)» + video URLs → D.
Recipe: UTF-8 server (python SimpleHTTPRequestHandler, `.html/.js/.json` → `; charset=utf-8`), one for the branch worktree and one for a LIVE worktree (detached origin/main, run assemble.py there too for dev/index.html). Never run two gates at once. Worktrees /home/user/wt/qs (branch) and /home/user/wt/live are mine; delete when done.
