# FLIGHT ROBOT ROUND — report (ORDER MAIN 131 02:10Z 25/11; Foreman F)
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 1 (F runners) | main 0 | review/* 0 | archive 0 ('flight robot'; F #3 02:24Z).
Arms: A = review/lc12-varC9 4232709a (now LIVE, MAIN 132 03:16Z). B = local merge 4232709a + robot-fix-cnv-2 fe3cb80c (0d4f3f14; only index/sw conflicted). Fold 755x1000, true reload in each life; co-op harness stuckcap-r 5127e083.
Baselines: thd R2 14ba8768 (10 lives, 8 bugs; soft-lock-after-load 5/10) · pf rates-20261124-1754 (50 lives) · robot-fix-cnv-2.

## Interim table (03:27Z) — updated as runners report
| Arm/seat | Lives done | Endings | Soft-lock after load | No ending / timeout | Save drift | Leak | Tab lag >400 ms | Notes |
|---|---|---|---|---|---|---|---|---|
| A-SOLO | 2/10 | 0 | n9/n10 family (same as thd R2 baseline, NOT new) | 2 CAP45 (cnv_mat 2781 buổi rank 4; thd_tho 2664 buổi rank 7) | in-place drift = harness artefact; 13 reloads all clock-identical, 0 reload failures | thd life1 page memory grows | n16-18 yes; buổi p50 ~0.1 s p95 0.8-1.0 s max 9.3 s | ui-text-overlap kbk-ts/kbk-ls/kbk-rh every tab (1 persistent element). Remaining 8 lives restarted with CAP 90 min; ETA ~09:00Z |
| A-COOP | 1 life ended | — | 3/3 rooms STUCK = game all-bạc forced card (j68c-sea-023 «Thời tiết», j68c-serv-022) — PRE-EXISTING, fix on review/flight-modal-deadlock | — | — | — | turn p95 30-45 s | «Sủng +N» text ≠ applied (~12 families, new family) |
| B-SOLO | 2/10 | 1 (Xuất cung) | none yet | life1 harness «page closed» ~3 min | 7 hits | — | 17 hits | |
| B-COOP | 1 kiếp | — | none | — | resHall RT drift guest | — | turn/action p95, syncKB, buổi stall | 10 known families; ~35 min/kiếp; bạc out of range, coop-pos 19, coop-stat 4 |

Verdict so far: NO new arm-A blocker in solo; the only stuck shape (co-op all-bạc card) is a pre-existing game bug with its own fix branch. Final table when runners finish (~09:00Z).
