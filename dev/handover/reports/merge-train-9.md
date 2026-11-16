# merge-train-9

Branch review/merge-train-9, base origin/main 5682ce6f. Every merge --no-ff at the PASS/READY sha (branch head == PASS sha verified for each).

## IN (9, merge order)
1. veil-zoom-r3 d236f309 (B reviewer PASS; r1 was dropped from train-8 for a 1180x820 overlay offset, re-run veil-zoom 1180)
2. art-complete-r2 d5ca28a8 (C PASS)
3. mem-upgrade-r1 64b40270 (D READY)
4. seatcap-r1 7d463838 (D READY, includes promo-skip-r1)
5. npc-death-r1 5f58a715 (D READY)
6. preg-rate-r1 1c31bd79 (D READY)
7. emperor-visit-r1 b2e34df7 (D READY)
8. coop-b1b5-fix-r1 287a7010 (D READY; run coop suites)
9. coop-chat-r1 24578406 (D READY; needs coop/worker deploy, merged LAST so it is easy to drop)

## OUT
- entry-exam-r1 d7364cb2: D ship order = after kc-roads-cn-nc-fix (FAIL, not PASS) and B's mg-balance (not on main).
- kc-roads-cn-nc-fix de331af6 / fix2: FAIL / running.
- mg family (mg-balance-r1 288aa4f6, nw-poem-r1, nw-quiz-r1, owner-answers-b-r1 07f84484, slap-mg-r3 6444443b): B's review/mg-train is not pushed yet, not marked READY.
- rank-port-r2 d8636053: BLOCKED on KIT REQUEST. spread-events-r3, mg-balance-2-r1, item-ledger-r1: reviewers still running, no PASS.
- s18 pending: phone-bars-r1, tut-place, tham-flip-ui-r1, square-icons, anim-pace, lag-play, kit-size, kit-marks.
- Already on main (ancestor): coop-guest-maid-r1, danh-balance-r1, close-maid-r1, name-mask-r1, servant-mline-r3, scene-end-sweep-r1, reign-road-fix-r1, act-split-w2-r1, coop-invite-ux-r1, cloud-save-r1, newgame-ui-r3 and every older PASS line.
