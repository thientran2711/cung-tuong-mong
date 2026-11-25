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
