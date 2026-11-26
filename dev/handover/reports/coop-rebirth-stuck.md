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
