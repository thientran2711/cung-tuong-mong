# PASS-not-landed scan 25/11 (read-only; MAIN 145 order; MOTION-DESIGN-5 worker)

PRIORITY #1 CHECK: no existing scan file (grep reports/ + git grep origin/main for pass-not-landed: none). Known seed: review/kit-music-r1 475df8ba PASS 24/11 never landed.

## Method (and its limits — read before trusting a row)
- Source: every file in dev/handover/reports/*.md (1395), dev/handover/FOREMAN_*_STATUS.md, HANDOVER_SESSION9.md and dev/archive FOREMAN_*_STATUS-11-2x / HANDOVER_SESSION9 on the handover branch (history is grafted at 13:00Z 25/11, so «last 5 days» = lines that carry a date 20–25/11).
- A row = a branch named on a line with LAND READY / KIT OK / «reviewer|review|verdict … PASS» AND a 7–12 hex sha. (Bare «PASS» was dropped: robot-test PASS lines flooded the first pass.)
- on main? = GitHub compare main...<sha|branch tip>: behind/identical = the sha/tip IS an ancestor of main. 72 matched branches have their tip on main → skipped (landed). A branch whose tip is NOT an ancestor and has no main commit subject naming its branch/topic is listed as NOT LANDED (suspect).
- Superseded? = another branch of the same stem (-rN, -rv, -land stripped) has its tip on main (column SUP). Main may also carry the work under a different sha/subject (rebase/squash/cherry-pick by the coordinator): the «main mention» column shows the first main commit whose subject names the branch/topic; blank = none found. VERIFY before acting: this scan is by sha + subject, not by file content.
- Counts: 164 rows with a strict PASS/LAND READY/KIT OK sha line not on main (A FF-able 3, B tip is a PASS sha 116, C older PASS sha 30, D branch deleted 15); 63 of them dated ≥ 23/11, not robot-test, no main mention.

## A. Fast-forwardable now (tip = main + N, nothing on main since) — land first
| branch | PASS sha(s) | state | date | file |
|---|---|---|---|---|
| review/coop-night-live | 3f672533, 556c0f57 | tip aacc248a ahead (+9/-0 vs main) | 25/11 | FOREMAN_B_STATUS.md |
| review/coop-rebirth-stuck | - | tip 6199201d ahead (+4/-0 vs main) | 25/11 | FOREMAN_D_STATUS.md |
| review/coop-rebirth-stuck-r6 | 6199201d, 9fea1332 | tip 9fea1332 ahead (+5/-0 vs main) | 25/11 | FOREMAN_D_STATUS.md |

## B/C/D. Not on main (sorted by group then newest PASS date)
| g | branch | PASS sha(s) | state vs main | PASS date | superseded (stem landed)? | main mention | source |
|---|---|---|---|---|---|---|---|
| B | review/co-ngu-seals | 4406fe66 | tip 73fe03b9 diverged (+3/-179 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/coop-presence-reload | - | tip 5399c31f diverged (+27/-179 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/d-followups-1-rv | 563d336b, 59ea20a8 | tip cc4fed89 diverged (+45/-192 vs main) | 25/11 | no |  | FOREMAN_D_STATUS.md |
| B | review/d-robot-bugs | 25a9a9cc, 33da31c9 | tip 95eafc6e diverged (+3/-179 vs main) | 25/11 | no |  | FOREMAN_D_STATUS.md |
| B | review/flight-mucluc | 6fb8e7eb | tip 6fb8e7eb diverged (+1/-285 vs main) | 25/11 | no |  | land-chain-12.md |
| B | review/flight-mucluc-kit | 09e7b6e6, 909be531 | tip 09e7b6e6 diverged (+7/-285 vs main) | 25/11 | no |  | land-chain-12.md |
| B | review/kit-close-reach | d8acb74b, f6e81ca8 | tip d8acb74b diverged (+1/-179 vs main) | 25/11 | no |  | MOCK-STAGE.md |
| B | review/kit-fitfast-r3 | 734ce2f9, 8ae8561b | tip 8ae8561b diverged (+11/-285 vs main) | 25/11 | no |  | land-chain-13.md |
| B | review/kit-focus-fig | d500b6db | tip d500b6db diverged (+1/-470 vs main) | 25/11 | YES | b7c9aa59f 2026-11-25T08:42:05+00:00 STACK LAND kit-focus-fig | MOCK-STAGE.md |
| B | review/kit-mg-intro-r2 | - | tip 25ca281d diverged (+1/-284 vs main) | 25/11 | no | e716092ae 2026-11-24T23:12:38+00:00 kit-mg-intro: kitFocus.i | FOREMAN_B_STATUS.md |
| B | review/kit-optinfo | 0ed69a97, 3292e7a2 | tip e672ebcb diverged (+1/-349 vs main) | 25/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/kit-optinfo-r2 | a6ca9994 | tip a6ca9994 diverged (+4/-285 vs main) | 25/11 | no |  | land-chain-13.md |
| B | review/kit-opts-pack | d8acb74b, dfdf48e4 | tip f6e81ca8 diverged (+3/-178 vs main) | 25/11 | no |  | MOCK-STAGE.md |
| B | review/kit-opts-pack-3 | - | tip f10d269d diverged (+5/-178 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/kit-opts-pack-4 | 084d1b27, 5e3732c9 | tip 7603d689 diverged (+11/-178 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/kit-opts-pack-4-rv | 084d1b27, 5e3732c9 | tip 5e3732c9 diverged (+10/-178 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/kit-opts-realtap | dfdf48e4 | tip dfdf48e4 diverged (+2/-179 vs main) | 25/11 | no |  | MOCK-STAGE.md |
| B | review/kit-promo-hook | 287a6adf | tip 287a6adf diverged (+1/-419 vs main) | 25/11 | no |  | FOREMAN_D_STATUS.md |
| B | review/kit-ring5 | 734ce2f9, e60c3a9c | tip f44c657d diverged (+12/-285 vs main) | 25/11 | no |  | ring-design.md |
| B | review/kit-scene-fade | 14e66f43, 3ac19a3a | tip 14e66f43 diverged (+1/-470 vs main) | 25/11 | no |  | land-chain-12.md |
| B | review/kit-woodskin | 02e4c520, 35d57ca1 | tip 02e4c520 diverged (+10/-285 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/lc14-sansang-on-palace | afb92cef | tip afb92cef diverged (+88/-126 vs main) | 25/11 | no |  | FOREMAN_D_STATUS.md |
| B | review/lc14-savegrowth-on-cnv | 19c0a3b0, 5f23c140 | tip 19c0a3b0 diverged (+17/-126 vs main) | 25/11 | no |  | FOREMAN_D_STATUS.md |
| B | review/moment | - | tip 5a504f92 diverged (+4/-405 vs main) | 25/11 | no | 95718760f 2026-11-25T11:20:26+00:00 robot-realtap: mini-game | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/net-ghen | 6d7d2da9, 96c2859e | tip 6d7d2da9 diverged (+4/-179 vs main) | 25/11 | no | 9c14b7fad 2026-11-25T16:19:07+00:00 tests: two-way-oldsave « | FOREMAN_D_STATUS.md |
| B | review/net-ghen-r1 | 6d7d2da9, 96c2859e | tip de69f206 diverged (+5/-179 vs main) | 25/11 | no | 9c14b7fad 2026-11-25T16:19:07+00:00 tests: two-way-oldsave « | FOREMAN_D_STATUS.md |
| B | review/net-thresholds | 6d7d2da9, 7effba69 | tip 96c2859e diverged (+2/-179 vs main) | 25/11 | no |  | FOREMAN_D_STATUS.md |
| B | review/palace-distance | 7cc392fb, ed777943 | tip ed777943 diverged (+4/-419 vs main) | 25/11 | no |  | FOREMAN_D_STATUS.md |
| B | review/pcport-rk | cc27f8c, cc27f8c7 | tip cc27f8c7 diverged (+1/-179 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/pcport-rk-r2 | 86f289e8, cc27f8c7 | tip 1fbae7c6 diverged (+4/-54 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/robot-coop-fix-2-r3 | 71076b61 | tip 71076b61 diverged (+7/-285 vs main) | 25/11 | no | 15b5e1ff8 2026-11-24T14:44:29+00:00 robot-coop-fix-1 r2 revi | FOREMAN_B_STATUS.md |
| B | review/robot-coop-fix-4 | 2d4d646f | tip 2d4d646f diverged (+4/-285 vs main) | 25/11 | no | 15b5e1ff8 2026-11-24T14:44:29+00:00 robot-coop-fix-1 r2 revi | land-chain-12.md |
| B | review/robot-coop-fix-5 | 556c0f57, 734ce2f9 | tip 556c0f57 diverged (+14/-285 vs main) | 25/11 | no | 15b5e1ff8 2026-11-24T14:44:29+00:00 robot-coop-fix-1 r2 revi | FOREMAN_B_STATUS.md |
| B | review/robot-coop-fix-5-r1 | 556c0f57 | tip 3f672533 diverged (+16/-179 vs main) | 25/11 | no | 15b5e1ff8 2026-11-24T14:44:29+00:00 robot-coop-fix-1 r2 revi | FOREMAN_B_STATUS.md |
| B | review/robot-coop-fix-6 | 5d97d15e, f5b96b7f73ec | tip f5b96b7f diverged (+22/-285 vs main) | 25/11 | no | 15b5e1ff8 2026-11-24T14:44:29+00:00 robot-coop-fix-1 r2 revi | FOREMAN_B_STATUS.md |
| B | review/robot-coop-fix-7-rv | 1b32c409 | tip 1b32c409 diverged (+6/-179 vs main) | 25/11 | no | 15b5e1ff8 2026-11-24T14:44:29+00:00 robot-coop-fix-1 r2 revi | FOREMAN_B_STATUS.md |
| B | review/robot-coop-savert | 71c538df, aad22c92 | tip 71c538df diverged (+17/-285 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/robot-coop-savert-r2 | 71c538df, aad22c92 | tip 56d3b76f diverged (+18/-186 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/robot-realtap | 34314d23 | tip b9311905 diverged (+18/-175 vs main) | 25/11 | YES | 76ed5621a 2026-11-25T11:56:38+00:00 Merge remote-tracking br | FOREMAN_D_STATUS.md |
| B | review/robot10-nc-fix-4-rv | 19c0a3b0, 1cab34e | tip 5f23c140 diverged (+9/-192 vs main) | 25/11 | no | ad3fa9be4 2026-11-24T02:03:00+00:00 robot10-nc-fix-1 review: | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/robot10-nc-fix-4-rv2 | afb92cef, f4611bff | tip f4611bff diverged (+98/-126 vs main) | 25/11 | no | ad3fa9be4 2026-11-24T02:03:00+00:00 robot10-nc-fix-1 review: | FOREMAN_D_STATUS.md |
| B | review/save-growth | 6ac29a2c, e573b9b8 | tip e573b9b8 diverged (+16/-285 vs main) | 25/11 | no |  | land-chain-12.md |
| B | review/sideline-dlg | 0ff57cb0, 9faa337e | tip 9faa337e diverged (+30/-285 vs main) | 25/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/sideline-dlg-2 | 9faa337e | tip ea6e0cbb diverged (+42/-285 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/sideline-dlg-3 | - | tip 0d8bb692 diverged (+48/-285 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/sideline-dlg-f4 | 3ac19a3a | tip 3ac19a3a diverged (+36/-285 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/talk-others-people-rv | 25a9a9cc, 33da31c9 | tip 25a9a9cc diverged (+51/-192 vs main) | 25/11 | no |  | FOREMAN_D_STATUS.md |
| B | review/temper-outburst | 19c0a3b0, 5f23c140 | tip c02602fb diverged (+2/-173 vs main) | 25/11 | YES | 23e5b84f8 2026-11-25T12:34:58+00:00 STACK LAND temper-outbur | FOREMAN_D_STATUS.md |
| B | review/thin-p8 | ce252c43 | tip ce252c43 diverged (+4/-528 vs main) | 25/11 | no | fd85907a6 2026-11-24T07:22:26+00:00 SELF-MERGE LAND thin-p6: | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/bal-ranks-law4 | - | tip 670991d9 diverged (+2/-525 vs main) | 24/11 | no |  | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/bal-ranks-law4-rv | - | tip 2f78c51c diverged (+6/-460 vs main) | 24/11 | no |  | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/coop-thin-g-r3 | 2b8f04ab, 70dc7244 | tip e814a8a9 diverged (+187/-442 vs main) | 24/11 | no | 273a527a6 2026-11-22T01:33:08+00:00 rv coop-host-lag-r2-r3:  | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/kit-batch2 | 1ba60626 | tip 1ba60626 diverged (+3/-437 vs main) | 24/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/kit-dialogue-vn | 214c6b2c, 298ba4e4 | tip a478ddfc diverged (+2/-470 vs main) | 24/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/kit-evframe-r2 | 298ba4e4, e067900f | tip e067900f diverged (+5/-419 vs main) | 24/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/kit-music | 0ff57cb0 | tip 0ff57cb0 diverged (+1/-383 vs main) | 24/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/kit-nochip | 15ecbf0c | tip 15ecbf0c diverged (+1/-456 vs main) | 24/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/kit-nochip-r1 | 15ecbf0c, 6b832589 | tip 6b832589 diverged (+3/-426 vs main) | 24/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/kit-nochip-r2 | - | tip a3108ff7 diverged (+5/-289 vs main) | 24/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/kit-optfit | 69003e15 | tip 69003e15 diverged (+1/-349 vs main) | 24/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/kit-optinfo-r1 | - | tip fc2a2449 diverged (+3/-329 vs main) | 24/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/kit-promo-hook-rv | 1cab34e, 287a6adf | tip 73c692ca diverged (+3/-383 vs main) | 24/11 | no |  | FOREMAN_D_STATUS.md |
| B | review/kit-woodskin-r2 | - | tip e47e113e diverged (+7/-285 vs main) | 24/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/law1-audit | 0cf18eda, 18aca389 | tip 0cf18eda diverged (+4/-426 vs main) | 24/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/law1-maid-away | 619642d7, 63d72694 | tip 63d72694 diverged (+2/-285 vs main) | 24/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/lc12-step8 | 11b6e923, 74ae74a5 | tip 11b6e923 diverged (+16/-256 vs main) | 24/11 | no |  | count-1.md |
| B | review/leave-palace-r2 | 87f6480b, ea730f77 | tip 87f6480b diverged (+16/-329 vs main) | 24/11 | no |  | land-chain-10.md |
| B | review/leave-palace-r3 | 87f6480b, 8d93c027 | tip 8d93c027 diverged (+17/-325 vs main) | 24/11 | no |  | FOREMAN_E_STATUS.md |
| B | review/leave-palace-r4 | 2e7e489b, 8693dc06 | tip 9aa54fa2 diverged (+19/-324 vs main) | 24/11 | no |  | FOREMAN_E_STATUS.md |
| B | review/leave-palace-r5 | 7a3541fd, 9aa54fa2 | tip 44115c0c diverged (+28/-285 vs main) | 24/11 | no |  | land-chain-12.md |
| B | review/mgskin-wire | 53e3b70b, a0d3efa8 | tip 53e3b70b diverged (+4/-440 vs main) | 24/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/mgskin-wire-r2 | b2a0d0c2 | tip b2a0d0c2 diverged (+7/-289 vs main) | 24/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/moment-r2 | 1d2189f3, 4bf6ee6f | tip 8792f09a diverged (+9/-329 vs main) | 24/11 | no | 95718760f 2026-11-25T11:20:26+00:00 robot-realtap: mini-game | FOREMAN_E_STATUS.md |
| B | review/parking-rank | 644ee581 | tip 644ee581 diverged (+2/-405 vs main) | 24/11 | no |  | FOREMAN_E_STATUS.md |
| B | review/promo-build-2-rv | 1cab34e1, 32b6bbdc | tip 4defb821 diverged (+27/-285 vs main) | 24/11 | no |  | FOREMAN_D_STATUS.md |
| B | review/promo-build-rv | 1cab34e, 1cab34e1 | tip 1cab34e1 diverged (+13/-333 vs main) | 24/11 | no |  | FOREMAN_D_STATUS.md |
| B | review/robot-coop-tail | - | tip 08dc8031 diverged (+1/-285 vs main) | 24/11 | no |  | FOREMAN_B_STATUS.md |
| B | review/robot-fix-cnv-r1 | 659d2f09, e50af91a | tip e50af91a diverged (+8/-285 vs main) | 24/11 | no |  | FOREMAN_F_STATUS.md |
| B | review/robot10-e-fix-1 | 8f97171e | tip 8f97171e diverged (+1/-333 vs main) | 24/11 | no |  | FOREMAN_E_STATUS.md |
| B | review/robot10-e-fix-2-r2m | 0673d1a1, 9d9fab98 | tip 9d9fab98 diverged (+3/-329 vs main) | 24/11 | no |  | FOREMAN_E_STATUS.md |
| B | review/robot10-e-fix-2-r3m | 0673d1a1 | tip 9e89619a diverged (+4/-329 vs main) | 24/11 | no |  | FOREMAN_E_STATUS.md |
| B | review/robot10-e-fix-3-r | 183fb7e9, 8693dc06 | tip 8693dc06 diverged (+8/-325 vs main) | 24/11 | no |  | land-chain-12.md |
| B | review/robot10-e-fix-3-r2 | 0ed69a97, 24f8c761 | tip 6ac29a2c diverged (+13/-285 vs main) | 24/11 | no |  | land-chain-12.md |
| B | review/robot10-e-fix-4-m | 66728c90 | tip c1e7d3d3 diverged (+5/-325 vs main) | 24/11 | no |  | FOREMAN_E_STATUS.md |
| B | review/robot10-e-fix-4-r2m | 66728c90, e75c2715 | tip e75c2715 diverged (+6/-325 vs main) | 24/11 | no |  | FOREMAN_E_STATUS.md |
| B | review/robot10-e-fix-5-r | 24f8c761, 4424f9dd | tip 7876bf70 diverged (+10/-303 vs main) | 24/11 | no |  | FOREMAN_E_STATUS.md |
| B | review/robot10-e-fix-6-r | 4424f9dd, 6ac29a2c | tip 6b97260a diverged (+14/-285 vs main) | 24/11 | no |  | land-chain-12.md |
| B | review/robot10-harness-rv | 811cb1a6 | tip 811cb1a6 diverged (+1/-543 vs main) | 24/11 | YES | 2fe42d3c2 2026-11-24T00:27:49+00:00 Merge review/robot10-har | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/robot10-nc-fix-3 | 449cbe08 | tip 449cbe08 diverged (+1/-524 vs main) | 24/11 | no | ad3fa9be4 2026-11-24T02:03:00+00:00 robot10-nc-fix-1 review: | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/robot10-nc-fix-3-rv | 449cbe08 | tip e6b841fd diverged (+4/-456 vs main) | 24/11 | no | ad3fa9be4 2026-11-24T02:03:00+00:00 robot10-nc-fix-1 review: | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/scent | de29c737 | tip de29c737 diverged (+3/-419 vs main) | 24/11 | no |  | FOREMAN_B_STATUS-11-21-2026.md |
| B | review/scent-r | 5c428bd8, de29c737 | tip 5c428bd8 diverged (+8/-333 vs main) | 24/11 | no |  | FOREMAN_E_STATUS.md |
| B | review/servant-trust-rv | 1cab34e1, 59ea20a8 | tip 65abb0de diverged (+11/-285 vs main) | 24/11 | no |  | FOREMAN_D_STATUS.md |
| B | review/titles2 | e01bf0cb | tip 537091a1 diverged (+4/-546 vs main) | 24/11 | no | 51bc472f9 2026-11-25T07:39:53+00:00 STACK LAND co-ngu-titles | FOREMAN_E_STATUS.md |
| B | review/titles2-r | e01bf0cb | tip 0e3a4d7f diverged (+10/-528 vs main) | 24/11 | no | 51bc472f9 2026-11-25T07:39:53+00:00 STACK LAND co-ngu-titles | FOREMAN_E_STATUS.md |
| B | review/titles2-r2 | 3292e7a2 | tip 3292e7a2 diverged (+21/-333 vs main) | 24/11 | no | 51bc472f9 2026-11-25T07:39:53+00:00 STACK LAND co-ngu-titles | FOREMAN_E_STATUS.md |
| B | review/mg10a-r | 3f725551 | tip 3f725551 diverged (+1/-695 vs main) | 23/11 | YES | 13a8dfc72 2026-11-23T08:55:28+00:00 SELF-MERGE LAND mg10a: m | FOREMAN_C_STATUS.md |
| B | review/ui-tour-states | - | tip 98fc6a8b diverged (+3/-753 vs main) | 23/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/coop-famops-c | - | tip 7e13e936 diverged (+1/-1789 vs main) | 22/11 | no | bf1988f65 2026-11-22T09:13:54+00:00 role-parity-bundle-fix:  | HANDOVER_SESSION9.md |
| B | review/rival-hauthay | ff63a590 | tip ff63a590 diverged (+2/-2581 vs main) | 22/11 | YES | b5a47a2df 2026-11-22T04:29:27+00:00 rel-men-servants r7: mer | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/bal-proof-data-1 | - | tip 8fae6a97 diverged (+6/-1868 vs main) | 21/11 | no |  | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/ban-cung-rv | - | tip 9c5fee44 diverged (+1/-1587 vs main) | 21/11 | no | dc83334c6 2026-11-21T16:19:32+00:00 jemo-bal: jbancung «Xin  | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/bundle-nfstall | - | tip 1388c7af diverged (+1/-1251 vs main) | 21/11 | no | c6ffc4c3e 2026-11-21T20:17:47+00:00 night-balance-bundle: co | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/coop-room-faces-rv | 9a4df264 | tip dd7a005d diverged (+2/-1505 vs main) | 21/11 | no | 7fc3905f3 2026-11-22T04:51:27+00:00 rv coop-host-lag-r3: THE | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/mg-intro-2-rv | 18d1b014 | tip 18d1b014 diverged (+2/-2293 vs main) | 21/11 | no | 45ebeae1a 2026-11-25T00:38:29+00:00 minigame-fix-2 r2: mg-in | FOREMAN_B_STATUS-11-24-2026.md |
| B | review/night-final-r3-coop | 8939c663 | tip 86cc402a diverged (+14/-2199 vs main) | 21/11 | no | 00a224b93 2026-11-21T05:29:01+00:00 night-final-r3-coop: mer | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/bd-roads | 5ba7ff28 | tip 5ba7ff28 diverged (+1/-2714 vs main) | 20/11 | no | e77afdfce 2026-11-20T15:41:42+00:00 phutang-road land: final | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/choice-value-audit-rv | - | tip ca3d43a3 diverged (+1/-3666 vs main) | 20/11 | no | 439e50721 2026-11-20T19:56:10+00:00 person-minigame-acts-c:  | FOREMAN_D_STATUS-11-24-2026.md |
| B | review/coop-thin-f6 | 9b46e1ad | tip d8d8447f diverged (+21/-3287 vs main) | 20/11 | no | 868c682c6 2026-11-19T17:43:03+00:00 runact-sv-fix: j29 hoist | FOREMAN_B_STATUS-11-21-2026.md |
| B | review/coop-thin-f6b-r1 | 389da198, 6194dd6a | tip 26f36042 diverged (+76/-3075 vs main) | 20/11 | no |  | FOREMAN_B_STATUS-11-21-2026.md |
| B | review/coop-thin-laydo | - | tip f4fad288 diverged (+71/-3114 vs main) | 20/11 | no |  | FOREMAN_B_STATUS-11-21-2026.md |
| B | review/coop-staff-split-r1-land | - | tip 358b2e85 diverged (+1/-2601 vs main) | ?/11 | no | a8a9e0a2a 2026-11-20T20:33:58+00:00 LAND coop-name-clash-r1  | FOREMAN_B_STATUS-11-21-2026.md |
| B | review/coop-thin-f5-r1 | 7f74ce44 | tip 9b46e1ad diverged (+10/-3287 vs main) | ?/11 | no | a0ac174a0 2026-11-24T08:41:22+00:00 robot-coop-fix-1 r2 (BIG | FOREMAN_B_STATUS-11-21-2026.md |
| B | review/coop-thin-f6-r1 | 6facd67d, 9b46e1ad | tip 389da198 diverged (+43/-3233 vs main) | ?/11 | no | 868c682c6 2026-11-19T17:43:03+00:00 runact-sv-fix: j29 hoist | FOREMAN_B_STATUS-11-21-2026.md |
| B | review/coop-thin-hostnull-r1 | 6facd67d, 9b46e1ad | tip 6facd67d diverged (+28/-3233 vs main) | ?/11 | no |  | FOREMAN_B_STATUS-11-21-2026.md |
| B | review/rare-reach | 29b25146, fa723811 | tip 29b25146 diverged (+11/-3287 vs main) | ?/11 | no |  | FOREMAN_D_STATUS-11-24-2026.md |
| C | review/hoa-dien | 7907c543d | tip fa483a8e diverged (+18/-5069 vs main) | 25/11 | no | 003ac0b00 2026-11-25T07:23:24+00:00 REVIEW test-path-fix: ho | FOREMAN_B_STATUS-11-24-2026.md |
| C | review/kit-tntile | 09e7b6e6, 23772dda | tip a31d69bc diverged (+8/-285 vs main) | 25/11 | no |  | land-chain-12.md |
| C | review/law1-gifts-rv | 1cab34e, 32b6bbdc | tip 99faeb2b diverged (+10/-192 vs main) | 25/11 | no |  | FOREMAN_D_STATUS.md |
| C | review/net-ghen-2 | 6d7d2da9, a83049aa | tip 6ec4237d diverged (+28/-179 vs main) | 25/11 | no | 9c14b7fad 2026-11-25T16:19:07+00:00 tests: two-way-oldsave « | FOREMAN_D_STATUS.md |
| C | review/palace-distance-rv | 1cab34e, 32b6bbdc | tip 9849ca5f diverged (+11/-192 vs main) | 25/11 | no |  | FOREMAN_D_STATUS.md |
| C | review/promo-build | 1cab34e, 1cab34e1 | tip 7c4116de diverged (+9/-371 vs main) | 25/11 | no |  | FOREMAN_D_STATUS.md |
| C | review/robot-coop-fix-7 | - | tip 879ca1c0 diverged (+4/-179 vs main) | 25/11 | no | 15b5e1ff8 2026-11-24T14:44:29+00:00 robot-coop-fix-1 r2 revi | FOREMAN_B_STATUS.md |
| C | review/robot-coop-fix-7-r2-rv | 86f289e8 | tip bf73553d diverged (+12/-18 vs main) | 25/11 | no | 15b5e1ff8 2026-11-24T14:44:29+00:00 robot-coop-fix-1 r2 revi | FOREMAN_B_STATUS.md |
| C | review/robot-fix-cnv | - | tip 1f046fb7 diverged (+4/-333 vs main) | 25/11 | no |  | land-chain-12.md |
| C | review/robot-fix-cnv-2 | - | tip fe3cb80c diverged (+25/-285 vs main) | 25/11 | no |  | land-chain-12.md |
| C | review/robot10-nc-fix-4 | - | tip a1712058 diverged (+1/-456 vs main) | 25/11 | no | ad3fa9be4 2026-11-24T02:03:00+00:00 robot10-nc-fix-1 review: | FOREMAN_D_STATUS-11-24-2026.md |
| C | review/save-unseen-lists | - | tip bd077b00 diverged (+33/-2 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| C | review/sideline-dlg-2-r1 | 1fd0334c | tip 260b4380 diverged (+50/-203 vs main) | 25/11 | no |  | FOREMAN_B_STATUS.md |
| C | review/talk-others-people | b7604887, cc4fed89 | tip 8b288d9e diverged (+48/-192 vs main) | 25/11 | no |  | FOREMAN_D_STATUS.md |
| C | review/temper-perception | - | tip d05a9698 diverged (+8/-179 vs main) | 25/11 | no |  | FOREMAN_D_STATUS.md |
| C | review/thin-p8-r1 | 4d9f748c, ce252c43 | tip c69d6ec9 diverged (+12/-285 vs main) | 25/11 | no | fd85907a6 2026-11-24T07:22:26+00:00 SELF-MERGE LAND thin-p6: | FOREMAN_B_STATUS-11-24-2026.md |
| C | review/coop-e2e-prequel | - | tip 183f478d diverged (+1/-325 vs main) | 24/11 | no |  | FOREMAN_B_STATUS.md |
| C | review/coop-thin-g | 9aa5b6a7 | tip 7fcae66b diverged (+112/-2558 vs main) | 24/11 | no | 273a527a6 2026-11-22T01:33:08+00:00 rv coop-host-lag-r2-r3:  | FOREMAN_D_STATUS-11-24-2026.md |
| C | review/figload-keep | 3fb17db4 | tip 935f52a6 diverged (+4/-285 vs main) | 24/11 | no |  | FOREMAN_B_STATUS.md |
| C | review/kit-rewardplate | 298ba4e4, e067900f | tip deab3d84 diverged (+3/-300 vs main) | 24/11 | no |  | FOREMAN_B_STATUS.md |
| C | review/kit-screenveil | fe8f6e3d | tip 469d7985 diverged (+7/-383 vs main) | 24/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| C | review/leave-palace-r | - | tip ea730f77 diverged (+15/-349 vs main) | 24/11 | no |  | land-chain-10.md |
| C | review/moment-r | e672ebcb | tip 1d2189f3 diverged (+7/-349 vs main) | 24/11 | no | 95718760f 2026-11-25T11:20:26+00:00 robot-realtap: mini-game | FOREMAN_B_STATUS-11-24-2026.md |
| C | review/robot10-coop | 48d1d7e1 | tip 918bfa84 diverged (+16/-445 vs main) | 24/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| C | review/robot10-coop-stuckcap | f76ebce6 | tip 0cdb9a41 diverged (+16/-445 vs main) | 24/11 | no |  | FOREMAN_E_STATUS.md |
| C | review/robot10-e-fix-2 | 19183dca, 8f97171e | tip 0673d1a1 diverged (+3/-333 vs main) | 24/11 | no |  | FOREMAN_E_STATUS.md |
| C | review/coop-thin-g-f2 | 8dbc92dd | tip d0e55df1 diverged (+178/-639 vs main) | 23/11 | no | 273a527a6 2026-11-22T01:33:08+00:00 rv coop-host-lag-r2-r3:  | FOREMAN_B_STATUS-11-24-2026.md |
| C | review/coop-thin-g-f1 | - | tip dea00576 diverged (+170/-692 vs main) | 22/11 | no | 273a527a6 2026-11-22T01:33:08+00:00 rv coop-host-lag-r2-r3:  | FOREMAN_B_STATUS-11-24-2026.md |
| C | review/coop-thin-g-r1 | - | tip 695414cf diverged (+119/-2300 vs main) | 21/11 | no | 273a527a6 2026-11-22T01:33:08+00:00 rv coop-host-lag-r2-r3:  | FOREMAN_B_STATUS-11-21-2026.md |
| C | review/hoa-dien-r2 | 7907c543d | tip 98954903 diverged (+24/-5069 vs main) | ?/11 | no | 003ac0b00 2026-11-25T07:23:24+00:00 REVIEW test-path-fix: ho | FOREMAN_B_STATUS-11-20-2026.md |
| D | review/button-crawl-fix-8-r | 1db0b186, 7ca6b369 | branch deleted on remote | 25/11 | no | dbae89ebf 2026-11-25T15:34:15+00:00 STACK LAND button-crawl- | FOREMAN_F_STATUS.md |
| D | review/kit-icon-row-r1 | - | branch deleted on remote | 25/11 | no |  | FOREMAN_B_STATUS.md |
| D | review/kit-map-marker-r1 | - | branch deleted on remote | 25/11 | no |  | FOREMAN_B_STATUS.md |
| D | review/pcport-rk. | cc27f8c7 | branch deleted on remote | 25/11 | no |  | FOREMAN_B_STATUS.md |
| D | review/talk-others-people. | f860e10e | branch deleted on remote | 25/11 | no |  | FOREMAN_D_STATUS.md |
| D | review/worklist-9 | cc4fed89 | branch deleted on remote | 25/11 | no |  | FOREMAN_D_STATUS.md |
| D | review/MOCK-STAGE | - | branch deleted on remote | 24/11 | no |  | FOREMAN_B_STATUS.md |
| D | review/land-chain | 59ea20a8 | branch deleted on remote | 24/11 | no | 18dc7fa4b 2026-11-20T11:18:49+00:00 night-final-r3 (WIP, not | HANDOVER_SESSION9.md |
| D | review/law1-audit-r1. | ca1ddcf9 | branch deleted on remote | 24/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |
| D | review/leave-palace-review-r2 | a5b9244b | branch deleted on remote | 24/11 | no |  | FOREMAN_E_STATUS.md |
| D | review/mrfoot | 45b4057b | branch deleted on remote | 24/11 | no | c6c3ca76c 2026-11-24T13:14:23+00:00 net-build-rv rv r2: merg | FOREMAN_B_STATUS-11-24-2026.md |
| D | review/robot10-E-fixer | - | branch deleted on remote | 24/11 | no |  | FOREMAN_E_STATUS.md |
| D | review/rooms2. | fa282242 | branch deleted on remote | 23/11 | no |  | FOREMAN_C_STATUS.md |
| D | review/quest-rows. | f1734973 | branch deleted on remote | 21/11 | no |  | HANDOVER_SESSION9.md |
| D | review/mg-intro-2-rv. | 18d1b014 | branch deleted on remote | ?/11 | no |  | FOREMAN_B_STATUS-11-24-2026.md |

## Notes for MAIN
- Group B+C rows with «-N» behind main of 170–450 are based on old main: they need rebase before FF (the PASS was on the old base) — same class as kit-music-r1.
- review/kit-music-r1 475df8ba: GitHub compare = diverged ahead 3 behind 371 (not in table if its branch name carries no strict PASS line with the sha in the scanned files).
- No code changed; nothing landed by this scan. Status: scan done; ~100 % xong scan / ~0 % chơi được.
