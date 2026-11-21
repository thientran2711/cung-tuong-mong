# REVIEW coop-cyhold — reviewer «coop-cyhold» (session_01964izGRwYL14ZiSACbynKm), for Foreman D #16 (was D #15)
START 2026-11-21 ~10:30Z | START_CTX ~5 % | rollover 30 % not reached. This file REPLACES the earlier r1 verdict (written against 8ecdb5fc, with unfilled placeholders): canon overwrite.

PRIORITY #1 CHECK: main LIVE jcoopworld.js:748 cyHold set / :238 sendEnd blocked / :981 cyWait / :989 cyFree / :1008 presence; no BAL.coop on LIVE (only coopTm/coopBribe/coopEmpY) | review/night-final-r3-coop jnf.js:195 (choice.waitMs, not on LIVE) | claims: Foreman D, worker session_01964izDPrCNteY5iRRFuhaC.

## VERDICT: PASS
LAND READY review/coop-cyhold-rv 3e65dbe7 (merged on LIVE fc7f98f6), coop-e2e PASS + coop-cyhold probe PASS both seats.
Content = worker r2 review/coop-cyhold 60b5ee43 (r1 8ecdb5fc + cyq re-ask) + 2 reviewer commits + LIVE merges (LIVE moved 4× during the review: 94cbe0cd → b88f3d63 → 0046a920 → ee02e8c0 → 6f4e8d70 → fc7f98f6. Each merge: source clean, only built index.html/sw.js conflicted → rebuilt with dev/site/build_site.sh). Diff vs LIVE: jbal2.js +3, jcoopworld.js, dev/test/coop-cyhold.js, index.html, sw.js.

## Reviewer commits
1. 47f3f5c3 law 4: cyMs() typed a second 90000 next to the BAL key (`v>0?v:90000`) → now `+BAL.coop.cyWaitMs` only (kept through the r2 merge, 1348597a).
2. 44e960ff probe: shots of both seats at the moment the wait runs out + a check that the «no answer» line is in each seat's kit «!» notice box.

## r2 (host reload loses CW.fcy, NLC #10 / coop-night case 12) — MUST-cover from D #15
The branch RE-ASKS (it doesn't persist fcy): cyArm sends p2 "cyq" on every hold (level < 5; P2H.cyq → the guest clears cyK and cySend → P2H.cyb → fcy → cyFree), and on a returning peer (COOP "peer" on) both seats cySend again. Thin (≥5): her answer lives in the host's stored person S.cyb (persisted), so no re-ask is needed. The 90 s BAL bound is a backstop only for a truly AFK seat. Her real answer is never replaced by «no answer» when she answered: law 1/6 OK.
Test evidence (stated plainly):
- coop-cyhold CY_RELOAD=1 CY_WAIT=120000: fix 14/14 at level 0 and at THIN=5 — but LIVE 14/14 too: after the host reload this flow never reaches a hold (hold:null, no cy trace), so this probe is NOT a red→green repro of the reload case.
- coop-night case 12: night chain head review/night-final-r3-coop 86cc402a ALONE 111/111 (case 12 green: the chain's own e43b7146 «after a host reload the host still answers the guest's ask» + fixture 86cc402a fixed it; red at bde59c73 not reproduced at head); night chain + this branch (scratch merge, not pushed) 111/111.
→ The cyq re-ask is verified by CODE, not by a red→green test. It's correct and harmless (one relay per hold). Option for D: if you want a real repro, the worker can make CY_RELOAD force a hold after reload (empty CW.fcy + base S.cyb without rk).

## Laws
- 4 ONE CORE: bound only in BAL.coop.cyWaitMs (after fix 1). PASS.
- 1 TWO-WAY: the rule sits on the host role, whichever seat hosts; the guest's wait on the host (cyHer) ends because the host's end now goes out. PASS.
- 3 GAIN-AND-LOSS / no free win or loss: «no answer» = rk≠week → jcycle's honest default (card off the tray this week; same as single-player endTurn rv="dung", jcycle.js:180, and as her own week end freeing the hold). Never answers for her, never picks a lie, her card stays open. PASS.
- 6c TRACEABLE: S.cyb.to = week (thin: host-stored person patched to her; level 0: her phone via P2H.cyto). Probe: before/after/host all carry to=week. PASS.
- 9 KIT: kitLine → §42.2 kitNotice (jnotice.js:125). PASS. 7 wording: no %, cổ trang. PASS.

## Claim «cyHold was the only unbounded host-on-guest gate» — holds
sendEnd gates: CW.sent / cyHold (now bounded) / cyHer (guest only). tryEnd: resWait() = CW.rpend acks, which DOES gate tryEnd but is bounded at 10 s (jcoopworld.js:576, pre-existing hard-coded 10000 = a law-4 note for D, not this branch); Q / S.mg / frozen = the seat's own dialogs / pause; night gate = room clock (nforce). eWait / isWaiting / waitCard = guest side. New LIVE jcooptimer (hao-huu icon) = UI only, no new wait.
Open (worker's note, D/owner call): an AFK seat with ANY real-choice dialog open still holds the ROOM merge (jcooptimer «a real choice is never made for her»).

## Gates
- probe coop-cyhold THIN=5 (A host Fold 755x1000@2, B guest iPad 1180x820@2, real Worker): LIVE build 13/18 FAIL (no timeout, host end never out, no notice, no S.cyb.to, hold left) = real repro. Fix: 18/18, 18/18, 19/19 (r1), 20/20 (r1 + shot/box checks), 20/20 on 1af8da4b, 20/20 on 83fcfd36, 20/20 on 3e65dbe7. Level 0: 18/18 with the N/A line (no cyHold in that flow).
- coop-e2e 94/94 (47f3f5c3, f444012e, 1af8da4b, 83fcfd36). coop-night 105/105 (47f3f5c3, 1af8da4b; case 12 ok). cycle-roll PASS.
- QUICKCHECK PASS on 83fcfd36 (old save ok; perf medians render 188/246, tab 445/450, buổi 1271/1551 ms; core gates PASS); also PASS on 44e960ff and 1af8da4b. One run on d0ae0f76 failed G4 dialog-fixed (#54 title plate on the event picture, iPad): dialog-fixed alone 2/2 PASS on LIVE 0046a920 and on the fix → timing flake, not this branch.
- 3e65dbe7 = 83fcfd36 + LIVE fc7f98f6 merge only (fc7f98f6 touches no co-op/cycle file): probe 20/20.
- LIVE-revert audit (vs fc7f98f6): removed lines = only the 4 replaced (begin / flip hold / stop / room+peer line). Clean.
- Old saves: S.cyb.to is a new optional key, read nowhere on load; CW.cyTo is runtime only; not in CYK (cyRec). Quickcheck old-save load + buổi ok.

## Kit notice, both seats (Fold 755x1000@2 + iPad 1180x820@2)
Shots at the moment the wait runs out (cyhold-note-host-755x1000, cyhold-note-guest-1180x820; scratch only, deleted): the host has the kit wait panel «Đợi hảo hữu xong tuần», the guest has the season-opener scene. While a full-screen dialog is up, the §42.2 chip is parked by kit rule, so the line isn't on top at that moment; it IS in each seat's «!» box (probe, 20/20): host «Quá giờ chờ: Kính sự phòng đã lật thẻ đêm nay khi hảo hữu chưa báo Kỳ nguyệt.» · guest «Quá giờ chờ: Kính sự phòng đã lật thẻ đêm nay khi chưa có lời báo Kỳ nguyệt của ngươi.» No page errors, no horizontal overflow.

## Pre-existing flakes (FOR THE FOREMAN) — confirmed on LIVE, not made worse
1. coop-rejoin-stats: fix 81/83 (X guest-other-device «keeps every gain», W «keeps other device gains") · LIVE 94cbe0cd 81/83 (H, G «friend's real stats»). Different cases each run, same count = LIVE flake; no cy* code on that path.
2. coop-cyc THIN=5: this time 66/66 on both fix and LIVE (the worker saw the «waits for her answer … null» flake on both).
3. cycle.js (single-player): UI «pop-up not shown; no Tổng quản at ksp» FAILS identically on LIVE and fix at every size. Logic «flip not deferred»: 1 of 3 runs on the fix, 0 of 3 on LIVE; the changed line runs only when CW.on (co-op) → random cycle.js flake, listed for D.
4. quickcheck G4 dialog-fixed #54 (above): one-off.

## For Night chain #10
jnf.js:195 waits on COOPW.cyHold up to choice.waitMs; with this branch cyHold ends after BAL.coop.cyWaitMs (same 90 s) and a reload re-asks at once. Night chain + this branch merge: assemble.py list (union: night jbalcore.js + jnf.js into the LIVE list), KIT_REQUESTS.md (keep both), index/sw rebuild; coop-night 111/111 on that merge. Option: jnf reads BAL.coop.cyWaitMs for the cyHold wait (one key).

## STATUS 21/11 ~16:30Z (D #16/#17 HOLD check: bundle 35b3a3f5 coop-night case-1 cascade)
coop-night on review/coop-cyhold-rv 3e65dbe7 ALONE: 105/105, 104/105, 105/105, 105/105 (4 runs) · LIVE fc7f98f6: 105/105, 105/105. Case 1 green in every run → the bundle's case-1 cascade is not from cyhold alone. The one miss = case 4 run 2 (guest night not started within the test's 40 s window, st=-1; the week still merged right); 3 reruns with a temporary trace of the host's cy* lines in case 4: no cyHold / cyTimeout / cyq in any run (fix or LIVE), all 105/105 → timing flake. VERDICT unchanged: PASS, LAND READY review/coop-cyhold-rv 3e65dbe7 (merged on LIVE fc7f98f6); recommend lifting the HOLD.
