# E98 endcard-top — the life end card is the top and ONLY modal of a dead life (whole popup family)

PRIORITY #1 CHECK: 'Bổng lộc tháng|endcard-popup|end card popup|bonglocover|kitEndUp' → OD 2 | ledger 0 | claims 8 (E STATUS relays only, no fixer) | main: j93.js:230 kitEndUp (KK29, §56.31b, checks kitReward ONLY, at call time), jstip.js:123 stipShow chest, jecon.js:78 month card, j93.js:216 kitInk | review/* 0 | review/e-pack-a 7ee5ab55 changes j32 over() body only (Về sau rows); E98 does NOT touch j32 → no conflict, stacks either way.
Worker: session_01DgYSWobPGyK9ErjyBvPqBE (opus) for FOREMAN E child7. START_CTX ≈ 4 % of the window.

## Branch / sha
`review/endcard-top` = **e560c7c2** (on origin/main f009e1a6). Files: dev/build/j93.js, dev/build/jend.js, dev/test/endcard-top.js (new), dev/test/endcard-top-scan.py (new), index.html + sw.js rebuilt.

## Root cause
KK29 (`kitEndUp()`) only stopped `kitReward` when the end card was ALREADY on screen. On a month-roll death the order is: monthPay → stipShow → stipReveal → kitReward → the chest scene STARTS (end card not up yet) → … → over(). over() replaced Q but never touched the kit scene queue, so the running chest stayed on top (and kitInk's `KMQ.length=0` only cleared the waiting jobs, not the one on screen). Same family: any kit scene queued/running at the death, cards unshifted in front of the end card, toasts/notices/new-day panel opened after it.

## Fix (kit-level, one rule: `kmLifeOver()` = S.dead, never inside a co-op seat's run CW.ctx)
1. **j93 kit scenes (KMQ):** `kmPush` drops new scenes of a dead life; `kmPump` drops queued ones; `kitEndClear()` runs once in the over() hook at the moment of death: voids the running job (kmGen), empties the queue, runs the kmOnReset hooks, closes podium / buổi transition, drops a running night card-flip job (jflip `cfDrop`, it built its scene after its pictures loaded), removes scene layers, hides the new-day panel and toasts. Only the ending's own entrance `kitInk` (job.kend) still plays.
2. **jend cards (Q):** `kesFront()` before every draw and every close: while the life end card (kend) is in Q, every other card is dropped (pushed behind, unshifted in front, queued before the death).
3. **jend non-queue popups:** `KES_GATE` (25 names: srvToast, kitLine, kitLineToast, kitStatFx, kitCoins, kitGain, kitLose, kitLearn, kitItemFx, kitNotice, kitKnow, kitReward, stipReveal, kitEdict, kitGloom, kitBloom, kitAlarm, kitFlyItem, kitPodium, kitPodiumShow, kitFlipTablet, kitFlipNote, kitNewDay, dawn, kitDayTitleShow) is a no-op for a dead life. «A dead life gets no pay.»
The next life (start → S.dead false) is untouched. Co-op: jcoopthin wraps these names later, so a seat's run on the host is captured before the gate; on each phone the gate reads that phone's own S.

## Scan (law 11) — `python3 dev/test/endcard-top-scan.py`
354 sources: KMQ 16 (kitEdict, kitGloom, kitBloom, kitReward, kitFlipTablet/Note, kitEntryGate, kitInk, cfPlay, cfSeal, kitGain, kitLearn, kitNightEnd, kitPersonReveal …) · GATE 25 · CARD 250 Q insertions · BODY 63 other body layers (menus, panels, scene parts, player-tap only; the life-timed ones — buổi transition, podium, card flip, day title — are covered by kitEndClear/KES_GATE).

## Before / after — `node dev/test/endcard-top.js` (26 popup sources × fired AFTER the ending and BEFORE it in the same tick, 8 ending kinds rotating, + month-roll death with a pending chest × 8 kinds, + next life)
| check | LIVE main f009e1a6 (Fold) | e560c7c2 Fold | e560c7c2 iPad |
|---|---|---|---|
| all | **36/62** | **62/62** | **62/62** |
| month-roll death + «Bổng lộc» chest, 8 kinds (death, exile, leave, throne, cold, poison, punish, nun) | 0/8 (chest over the card = robots' 8/8) | 8/8 | 8/8 |
Sources COVERED on LIVE: stipend chest / monthTick / stipReveal / kitReward (before the ending), Q.unshift card in front, kitGain, kitLearn, kitEdict, kitGloom, kitBloom (after AND before), dawn new-day panel after, day-roll card flip (kcf), render/kmDiff edict. After: all END CARD ON TOP; «Chuyển kiếp» → new life, its chest is queued again, the dead life's pay card is gone.

## Other tests
- dev/test/ending-screens.js: death / exile / leave / throne / rare-exit / oldsave PASS. FAILs only on grand / grand-exit / fail / rare (flower/drapes geometry, `geS()` null setting 'st' — flaky which case) — **identical family on LIVE main** (main 32 FAIL lines, this branch 27; none on a dead-life card).
- dev/test/coop-ending-screens.js: **BLOCKED by environment** — "both seats in the room" FAIL (guest never joins) on THIS branch AND on main's own build (same result) — the room relay, not this change. Co-op logic note above; needs a re-run where the room works (reviewer).
- quickcheck (e560c7c2): build ok, old save ok, perf render 165 / tab 377 / buổi 766 ms (live build could not be measured on this box); CORE GATES FAIL only G4 80-dialog-fixed «(kit-dialog-2 a) no empty Tốn / Được cell» ×2 — **the same 2 FAILs on LIVE main's own build** (dev/test/dialog-fixed.js on main index.html) → pre-existing, not this change.
- Shots @2 (looked at each): Fold 755x1000 + iPad 1180x820, month-roll death with pending chest → end card alone, for «Liễu yếu gặp sương» (death) and «Lồng son mở cửa» (leave). Before (LIVE): the chest «Bổng lộc tháng ba» over the card. CDN upload REFUSED (cdn_sync.py: no Cloudflare auth in this session) and images never go in git (OD 17/11), so the reviewer regenerates them: `node dev/test/endcard-top.js <outdir> - 755x1000@2,1180x820@2` writes `<size>-monthroll-death.png` / `-monthroll-leave.png` (the end card alone) and a shot of every COVERED case; on LIVE (`file://…/main index.html` as 2nd arg) the same command shows the chest «Bổng lộc tháng ba» over the card.

SẴN SÀNG KIỂM endcard-top e560c7c2
