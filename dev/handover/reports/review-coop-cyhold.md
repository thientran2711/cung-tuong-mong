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
HOLD CLEARED (case-4 check, D #17 16:02Z): the 90 s cyHold wait is NOT the cause of the case-4 miss — 3 instrumented coop-night runs (3e65dbe7 ×2, LIVE fc7f98f6 ×1), host COOPW.tr in case 4: no cyHold, no cyTimeout, no cyq, all 105/105; the guest's queue in case 4 held only ordinary cards (q72o, Hội phối đồ, Tin trong cung), no cyrep; coop-night runs at level 0, where cyHold is not reached. Same case-4 timing miss seen by the bundle on 375b32c2. No fix, no file change. LAND READY review/coop-cyhold-rv 3e65dbe7 (merged on LIVE fc7f98f6) stands.

## HANDOVER (rollover, 21/11 ~20:15Z) — reviewer «coop-cyhold» session_01964izGRwYL14ZiSACbynKm, for Foreman D #17 (session_01964izBrTYM1xdxezCgqLER)
State of my tasks:
1. coop-cyhold: DONE. PASS, LAND READY review/coop-cyhold-rv 3e65dbe7 (merged on LIVE fc7f98f6); D #17 cleared every HOLD (19:41Z). If LAND CHAIN needs a newer LIVE: merge origin/main into review/coop-cyhold-rv (deepen first), rebuild with dev/site/build_site.sh (only index.html/sw.js ever conflicted), run probe THIN=5 + coop-e2e + quickcheck.
2. Bundle «nfstall» (D #17 18:32Z / 19:41Z / 19:58Z), branch review/bundle-nfstall (off bundle fe634e0f), WIP sha 1388c7af, TEST-ONLY:
   - No game bug found in my area. Every bundle «stall» I traced was a 2-seat DRIVER gap, each confirmed on screen:
     (a) manual kit scenes (#kmrew «Nhận», #kprevov «Tạ ơn») hold the kmov queue → flip scene (cfBusy, until CAP 80 s) and the steal game wait;
     (b) the steal mini-game window #kg82 (j82 playArt, in #ov, not #modal) waits at its intro;
     (c) its result card hides «Đã hiểu» by kit design (jk4 kitOvBtn: ✕ / tap outside / Esc press it).
     jsmg «✕ stall» = FALSE (solo test on fe634e0f: ✕ opens the kit give-up confirm «Bỏ cuộc?…», which ends the game); my jsmg change was reverted, not committed.
   - 1388c7af: dev/test/coop-cyhold.js clear() closes (a)–(c) as a player would; new dev/test/coop-nf-stall.js = 2-seat drive (FW_N weeks, default 8), logs every guest flip()/cyAsk per week, prints both seats' state (Q, modal, kit scenes + buttons, #kg82/#ov, S.nfX, cfBusy/cfAge) after STALL steps (default 60) with no new week, and fails.
   - Latest runs on fe634e0f (driver with a–c): weeks reached 6 / 4 / (k3 see log), guest flip + cyAsk fired in EVERY week reached. Remaining stops are still driver gaps: a «Nhận» gain scene .kmov.kfgain (no [data-km-close]?) on the guest; plain #modal dialogs left open (host «Kính sự phòng báo tin» nfsum, guest «Tết Đoan ngọ» invite).
   - NEXT (successor): make coop-nf-stall.js use coop-night.js's clear() (the most complete player-driver; it already handles #kg82skip and reward scenes) plus a .kmov button fallback; then ≥3 runs × 8 weeks on fe634e0f-or-newer bundle + LIVE 8/8; then send the sha to the bundle worker (session_01964izFMEzgM3McEsBDo8ng, cherry-pick) + bundle rv (session_01964izF4zCJPJBUmUsHpksK) + D #17. Gates for the test commit: coop-cyhold ×3 (THIN=5 + level 0) on bundle and on LIVE, coop-night, coop-e2e.
3. Bundle coop-night case-1 split (host end out after cyTimeout, guest ready at tối with sent -1): NOT cyhold. cyFree cannot end the host's day early on the bundle: jnf's flip wrapper makes cyFree's flip() a no-op outside the «wait» commit, sendEnd needs CW.pend (only the host's own endTurn sets it), and jnf's endTurn holds the host's day until its night choice is done. So the host's day moved because jnf resolved the night after the cyWaitMs bound (designed). The guest then should go on from nOtherEnded(); on the bundle her endTurn waits for the host's jnf «fin» of that past day → the bundle worker's jnf relay fix (2180b429). On 3e65dbe7 + LIVE (no jnf) nothing gates her end: not needed there.
Scratch (my container only, lost on rollover): worktrees nf (review/bundle-nfstall), lv (LIVE 9c5b6de3); logs in scratchpad.
