# fix-kframe-heir report (worker session_01964izF3TRAfuFcfdQV1Lie, Foreman D GQbgvTAn, brief briefs/D-kframe-heir.md)

PRIORITY #1 CHECK ('kframe|deposeHeir|phế Thái tử'): brief line re-checked — OD 0 | ledger 0 | main: j8.js:151 typed depose (k.heir=false;S.heir=null), setHeir road j1:210 + jkidlife:78–80 wrap | review/*: only review/j51-heir-danh(-rv) (finding source, my base) | claims: this one only. Reused: setHeir wrap pattern (jkidlife), dev/test/scan-heir-family.py (family list), j51-heir-danh.js probe harness.

Branch review/fix-kframe-heir on review/j51-heir-danh-rv 1a9d2bd0 (= j51-heir-danh + LIVE 225c5c08; lands after it / carries it). SMALL: 5 game files + 1 test + 1 scan.

## Root
Every NEW heir goes through j1 setHeir and its jkidlife wrap (the mother of the new heir +BAL.kid.heirDanh, the put-aside mother −heirDanh, her AND an NPC). The only road that puts a living Thái tử aside WITHOUT naming a new one (j8 kframe win) wrote the flags by hand: `k.heir=false;S.heir=null` → no Danh loss for the mother (law 1 / law 4 vs every other deposition), and S.heir cleared whoever held it.

## Fix
- j1: `deposeHeir(k,m)` next to setHeir = the ONE depose road: clears k.heir, clears S.heir only when it is that son.
- jkidlife: deposeHeir wrap (beside the setHeir wrap): his mother m (her = S, or an NPC / co-op entry, alive) loses BAL.kid.heirDanh. Two-way: she can depose an NPC's Thái tử and an NPC can depose hers, same number.
- j8 kframe: `deposeHeir(k,t)`; the text prints the Danh the road really applied («… bị phế ngôi Thái tử, Danh ngươi −10.» / «Danh <name> −10»).
- j79 kframe card words (heir son) + j17 base preview: print «Danh nàng thêm balSg(−BAL.kid.heirDanh)» (shown == applied). j79 son age typed 6 → BAL.eff.j8.kframeAge (same key as j8, value 6).
- j1 kidDie (same family, death not deposition → no Danh): S.heir cleared only when it is that son.

## Family scan (LAW 11) — every `.heir=false` / `S.heir=` / setHeir / deposeHeir site (dev/test/scan-heir-family.py, 28 → 30 sites, 0 misses)
| site | before | after |
|---|---|---|
| j8.js:151 kframe win, son is Thái tử | k.heir=false;S.heir=null — mother no Danh loss; S.heir cleared even if another son held it | deposeHeir(k,t): mother −heirDanh (her and NPC), S.heir only if that son; text prints it |
| j1.js kidDie | S.heir=null whenever the dying son had the flag | only when S.heir is that son (no Danh: a death is not a deposition, unchanged rule) |
| j3.js:78 / j51.js:68 heirMonth | S.heir=null only when the heir is dead (cleanup) | unchanged |
| j51.js:66/73/75, j3.js:81, j4, j97, jend14, j99succ:203 | setHeir road (wrap pays Danh) | unchanged |
| j51.js:77 / j99succ.js:57 emperorDies fallback | S.heir={…} only when no living heir (succession pick at the death, no Danh in solo) | unchanged (not a deposition) |
| jcoopworld.js:728 res.fam kd heir0 (guest side of a host kframe on her son) | clears her flag, S.heir only if that son | unchanged: her Danh loss now runs in deposeHeir on the host on her entry (same road as kframeDanh) |
| jcoopworld.js:1282/1299/1302/1436, jcoopthinb:73 | co-op heir mirror / hrCard (already −heirDanh) / new life | unchanged |

## Proof
dev/test/kframe-heir.js (fresh game; act forced to land, nobody caught, punish stubbed so the Danh measured = kframeDanh + deposition), BAL.kid.heirDanh 10 and 7:
| case | Danh of the mother (want) | S.heir | text |
|---|---|---|---|
| NPC frames HER Thái tử | −20 / −17 (kframeDanh − heirDanh) | cleared | «… Danh ngươi −10 / −7» |
| NPC frames her son, not heir | −10 (kframeDanh only) | — | no «phế» |
| SHE frames an NPC's Thái tử (law 1) | −20 / −17 | cleared | «Danh <NPC> −10 / −7» |
| NPC frames NPC's Thái tử | −20 / −17 | cleared | ok |
| deposeHeir on a son who is not S.heir | −heirDanh | KEPT | — |
| kidDie: stale-flag son dies, then the heir dies | 0 | kept, then cleared | — |
| j79 card / j17 preview | — | — | «Danh nàng thêm −10 / −7» |
No page errors. PROBE PASS.

Gates: assemble + build_site · one-core-guard PASS (3559 ≤ 3592) · one-core-text PASS · one-core-text-rule PASS · scan-heir-family 30 sites 0 misses · j51-heir-danh.js PROBE PASS · kframe-heir.js PROBE PASS · quickcheck run 1 (pre-commit): core gates PASS, old save ok, open 1752 ms, perf new/live render 222/224, tab 394/523, buổi 1131/1195 ms (only red: NOT BUILT, uncommitted — then committed + rebuilt); run 2 on the commit: built ok, old save ok, perf 214/214, 378/421, 918/1008 ms, core gates: only G4 80-dialog-fixed «new-title plate sits ON the event picture» 1180x820 = the known RED-ON-LIVE fault (FOREMAN_D_STATUS 23/11 19:20Z, routed to MAIN kit keeper), flaky (passed in run 1), no UI change in this branch. Wording VANPHONG (no %, signs as the other heir lines). No layout change → no Fold/iPad shots.

SẴN SÀNG KIỂM review/fix-kframe-heir 504af23b51ad60c813a1546d85c8b59c5f8e7e46
