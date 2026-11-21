# REVIEW coop-cyhold — reviewer «coop-cyhold» (session_01964izGRwYL14ZiSACbynKm, D #15 reviewer)
START 2026-11-21 ~10:30Z | START_CTX ~5 % | rollover at 30 % (not reached).

PRIORITY #1 CHECK: main LIVE jcoopworld.js:748 cyHold set / :238 sendEnd blocked / :981 cyWait / :989 cyFree / :1008 presence; no BAL.coop on LIVE (only coopTm/coopBribe/coopEmpY) | review/night-final-r3-coop jnf.js:195 (choice.waitMs, not on LIVE) | claims: Foreman D, worker session_01964izDPrCNteY5iRRFuhaC.

## VERDICT: PASS
LAND READY review/coop-cyhold-rv @SHA@ (merged on LIVE b88f3d63), coop-e2e PASS + coop-cyhold probe PASS both seats.
(Worker branch review/coop-cyhold 8ecdb5fc + 2 small reviewer commits + LIVE merge. LIVE moved 94cbe0cd → b88f3d63 during the review: deepened, merged; source merged clean, only built index.html/sw.js conflicted → rebuilt with dev/site/build_site.sh.)

## Reviewer commits (small fixes, on review/coop-cyhold-rv)
1. 47f3f5c3 law 4: `cyMs()` had a second `90000` literal as fallback (`v>0?v:90000`) beside BAL.coop.cyWaitMs → now reads only `+BAL.coop.cyWaitMs`.
2. 44e960ff probe: shoot both seats at the moment the wait runs out + new check «the no-answer line is in this seat's kit notice box» (host and guest).

## Laws
- Law 4 ONE CORE: bound = BAL.coop.cyWaitMs (90000) only, after fix 1. PASS.
- Law 1 TWO-WAY: the rule sits on the host role (whichever seat hosts); the guest's own wait on the host (cyHer) ends because the host's end now goes out. Same rule both ways. PASS.
- Law 3 GAIN-AND-LOSS / no free win or loss: «no answer» = c.rk≠week → jcycle reads it as the honest default (card off the tray this week, the same as single-player endTurn's default `rv="dung"` at jcycle.js:180 and as her own week end freeing the hold). It doesn't answer for her and doesn't pick a lie; her card stays open. PASS.
- Law 6c REAL-WORLD / traceable: S.cyb.to = week on her person (thin: the host's stored copy, patched to her; level 0: her phone through P2H.cyto). Probe: before/after/host all carry to=week. PASS.
- Law 9 KIT: notice = kitLine → §42.2 kitNotice (jnotice.js:125), no private UI. PASS (see Kit notice).
- Law 7 wording: no %, cổ trang wording. PASS.

## Claim «cyHold was the only unbounded host-on-guest gate» — checked
Scanned every gate on the host's sendEnd/tryEnd path in jcoopworld/jcooptimer/jcoopthin*: sendEnd gates = CW.sent / cyHold (now bounded) / cyHer (guest-only). tryEnd: resWait() = CW.rpend acks, **bounded at 10 s** (jcoopworld.js:576; worker called it "not a gate": it does gate tryEnd but is bounded — pre-existing hard-coded 10000, a law-4 note for D, not this branch); Q/S.mg/frozen = the seat's own dialogs/pause; night gate nGoNow = bounded by room clock (nforce). CW.eWait / isWaiting / waitCard = guest-side. Claim holds.
Open (worker's note, D/owner): an AFK seat with any real-choice dialog open still holds the ROOM merge (jcooptimer «a real choice is never made for her»).

## Repro + gates
- probe dev/test/coop-cyhold.js THIN=5 (A host Fold 755x1000@2, B guest iPad 1180x820@2, real Worker):
  LIVE build (CYC_HTML, 94cbe0cd): **13/18 FAIL** (no cyTimeout, host end never out, no notice, no S.cyb.to, hold left) → real repro.
  fix 8ecdb5fc+47f3f5c3: 18/18, 18/18, 19/19; with new shot/box checks 18/18 then 20/20; on merged @SHA@: @PROBE_M@.
  Level 0 (no flag): 18/18 with the N/A line (no cyHold in that flow), as the worker says.
- coop-e2e: 94/94 (47f3f5c3) · @E2E_M@ (merged @SHA@).
- coop-night: 105/105. cycle-roll: PASS (396 draws).
- QUICKCHECK: PASS on 44e960ff (old save ok; perf medians render 255/245, tab 459/480, buổi 1338/1135 ms; core gates PASS) · merged @SHA@: @QC_M@.
- LIVE-revert audit (vs b88f3d63): removed lines = only the 3 replaced lines (begin / flip hold / stop). Clean.
- Old saves: S.cyb.to is a new optional key, read nowhere on load; CW.cyTo is runtime only; not in CYK (cyRec). Quickcheck old-save load + buổi ok.

## Kit notice (both seats, Fold 755x1000@2 + iPad 1180x820@2)
Shots taken at the moment the wait runs out (cyhold-note-host-755x1000, cyhold-note-guest-1180x820, scratch only, deleted): the host has the kit wait panel «Đợi hảo hữu xong tuần», the guest has the season-opener scene — the §42.2 chip line is parked under a full-screen dialog (kit rule, KIT.md §42.2 / kdlg-on), so the line isn't visible on top at that moment. It IS in each seat's kit «!» notice box (probe check, 20/20):
host «Quá giờ chờ: Kính sự phòng đã lật thẻ đêm nay khi hảo hữu chưa báo Kỳ nguyệt.» · guest «Quá giờ chờ: Kính sự phòng đã lật thẻ đêm nay khi chưa có lời báo Kỳ nguyệt của ngươi.» No page errors, no horizontal overflow.

## Pre-existing flakes (FOR THE FOREMAN) — confirmed on LIVE, not made worse
1. coop-rejoin-stats: fix 81/83 (X guest-other-device «keeps every gain», W guest wakes «keeps other device gains») · LIVE 94cbe0cd 81/83 (H host rejoin, G guest rejoin «friend's real stats»). Different cases each run, same count = flake on LIVE; no cy* code on that path.
2. coop-cyc THIN=5: this time 66/66 on the fix AND 66/66 on LIVE (the worker saw «waits for her answer … null» flake on both).
3. cycle.js (single-player): UI «pop-up not shown; no Tổng quản at ksp» FAILS identically on LIVE and fix at all sizes (pre-existing). Logic part: «flip not deferred» failed once on the fix (1 of 3 runs; 2 later runs clean), 0 of 3 on LIVE. The changed line (cyArm in the co-op flip hold) only runs when CW.on — single-player can't reach it → random flake in cycle.js logic (S.tonight draw), listed for D.

## For Night chain #10
As the worker says: jnf.js:195 waits on COOPW.cyHold up to choice.waitMs; with this fix cyHold ends after BAL.coop.cyWaitMs (same 90 s). Option: jnf reads BAL.coop.cyWaitMs for the cyHold wait (one key).
