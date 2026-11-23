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

## ADD-ON (Foreman D 23/11 21:16Z, robot10 nc/nc_gian finds) — same branch
PRIORITY #1 CHECK ('actNone|statSet|reading .heir|Danh 101'): OD 0 | main: none (no guard / clamp helper) | review/*: none | claims: this one. Robot gave no stack → reproduced with a new dynamic scan.

### (1) option f() crash «Cannot read properties of undefined (reading 'heir')»
Root: j8 «Xin bế con nàng về nuôi» (takeaway) f picks `pick(kidsOf(t).filter(age<6))`; when no child qualifies any more (grown / gone / taken since the act was offered, or a caller that skips ok), k = undefined → `t.kids.splice(t.kids.indexOf(undefined),1)` = splice(-1) **removes her LAST child** (law 6b), `a.kids.push(undefined)`, then `k.heir` throws. Same family: every act that picks a child / pet inside f with no guard.
Fix: j8 `actNone(a)` — the act does nothing and costs nothing (her line «Người ngươi nhắm tới nay không còn ở đó, việc đành gác lại.», NPC silent); guard right after the pick in ksab, kpoison, pond, kframe, takeaway; jpet thaopet picks the pet BEFORE paying bạc.
New scan dev/test/act-missing-scan.js: all 55 ACT f × win/lose × npc→her / her→npc × (no child / one grown daughter), caught/punish stubbed: no throw, no child moved, no undefined pushed.
| act | before | after |
|---|---|---|
| takeaway | win: «reading 'heir'» + a child moved / undefined pushed; lose: «reading 'name'» | nothing happens |
| ksab, kpoison | «reading 'name'» of null (cost paid first) | nothing happens, no cost |
| pond, kframe | «reading 'name'» of undefined | nothing happens, no cost |
| thaopet | «reading 't'» (bạc paid first) | nothing happens, no bạc |
| other 49 acts | ok | ok |
| **total** | **6 acts fail** | **0** |

### (2) Danh 101 (over cap)
Root: apply (her) / ap (NPC) clamp every 0..100 stat; a few roads write the stat directly. The one that reaches 101 in palace life for any origin: jpet petBonus — the following pet's +1/+2 is added raw (`S[k]=(S[k]||0)+n`, 5 pet kinds give Danh) → Danh 100 + 1 = 101 until the next apply; and removing the pet then took n off a clamped value (net loss).
Fix: j1 `statSet(p,k,v)` = the same clamp as apply / ap (0..100, Sức under sucCap, Thân/Hận ±100) for direct writes; petBonus adds through it and records the amount REALLY added (0 at the cap → 0 taken off). Family: every direct raise of a person stat (dev/test/scan-stat-clamp.py, new; reviewed bounded inits listed in its ALLOW with why).
| site | before | after |
|---|---|---|
| jpet.js petBonus (her and NPC) | raw +n (Danh/Sắc/Tài/Tâm cơ/Đức 101+) | statSet, real delta kept |
| jkcg.js fest (S.danh += F.danh[0/1], muội +sis) | no upper clamp | statSet |
| jkc.js muội +3 / +2 / fest +3/+1 | no clamp | statSet |
| jkc2.js muội (mu.danh||5)+4, jkc3.js muội +B.muoi.danh | no clamp | statSet |
| jkcco.js her Danh ±n (2 sites), co-op NPC ruNpc ±n | only Math.max(0,…) | statSet |
| **scan-stat-clamp** | **13 unclamped writes** | **0** |
Probe (kframe-heir.js, new case): Danh pet at Danh 100 → 100, off → 100 (before: 101 → 100 after clamp → 99); 50 → 51 → 50; statSet NPC 103 → 100, −5 → 0. PASS.

### Gates (add-on, on 2c241f86)
act-missing-scan 0 fail · scan-stat-clamp 0 · kframe-heir.js PROBE PASS (now incl. Danh cap) · j51-heir-danh.js PASS · scan-heir-family 30/0 · one-core-guard / text / text-rule PASS · quickcheck PASS (old save ok, open 1643 ms, perf new/live render 180/240, tab 377/416, buổi 1122/1031 ms, core gates PASS incl. G4) · **coop-e2e 141/141 PASS** (both seats; her Danh via toCanon road unchanged) · pets-fix.js 755x1000: fails at line 88 «getBoundingClientRect of null» on LIVE 225c5c08 too (pre-existing stale UI test, not this branch).

SẴN SÀNG KIỂM review/fix-kframe-heir 2c241f860a1d7b998e74c6ccd196663279492872
