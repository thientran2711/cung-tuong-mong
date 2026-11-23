# coop-famops-pv review — E51r (BIG co-op reviewer-lander, depth 5, session_01DgYSWmEEVZ64oaiXBNfBfe)
PRIORITY #1 CHECK ('coop-famops-pv|E51r'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 1 | archive 0
Reviewed: review/coop-famops-pv 5a239b1a (sha verified on origin). Final-merge: **review/coop-famops-pv-r** on LIVE bda5b75b (earlier merges on b238857f / 40cc2b92).

## What -pv changes (vs LIVE; source = dev/build/jcoopworld.js + dev/build/jil.js, tests = coop-famops-unit.js, coop-lost-scan.js)
- b4Ops (host NPC-turn diff of her entry): an NPC theft from her entry whose piece sits in an open «riv» case OWNED by her entry (thief keeps a copy / case holds it to plant) now sends «rm lost» by that NPC (her seat opens her case held by him) instead of «rm gone» (vanish with no case). Same op as the host's own laydo (famDiff RMHOW).
- famSame (b4Ops + famDiff): an object that left her entry while a NEW object of the same ledger id came in = the same piece re-made (entry rebuilt, festival stale snapshot) → no rm/add; paired one to one (two objects of one id, one taken → still one rm). Children matched by kidId on a rebuilt entry.
- jil ilCoopRes (guest ledger): labels the op's own iu when it carries one (was: first missing id of that kind).
- coop-lost-scan LOST_DBG trace (rm/ret/add/plant ops both seats, last-seen place, per-id history). Test-only.

## Law check (18 laws, those this row touches)
| law | result |
|---|---|
| 1 TWO-WAY | host-NPC theft from her entry now ends in a real case on her seat, the same road as the host's own laydo (both seats symmetric) — PASS |
| 4 ONE CORE | no new number — PASS |
| 6c REAL OBJECTS | V vanish road closed (unit 19/19b); festival mass rm+add closed (20); one-to-one pairing (20b). Remaining 76-wk faults are pre-existing (LIVE twins below) — PASS for this row |
| 7 wording | no new player word — PASS |
| 9/10/12 UI | no UI change — n/a |
| 11 WHOLE GROUP | b4Ops + famDiff both get famSame; items + children; scan table in reports/coop-famops.md (E44d/E44e) — PASS |
| 13 GATE ZERO | worker reports + this review carry PRIORITY #1 lines — PASS |
Old saves / rooms: no saved-state shape change (ops only); quickcheck old save PASS.

## Unit (coop-famops-unit, all cases)
| build | result |
|---|---|
| -pv 5a239b1a | 37/37 |
| LIVE b238857f + -pv unit file | 19, 19b, 20 FAIL (rm «gone» ×2; rebuilt entry → rm+add ×2 + ktake) |
| 0a3493ef (id-set version) | 20b FAIL (no rm sent = dup) — 20b guards the intermediate regression; LIVE passes it (no id matching there) |

## 76 wk coop-lost-scan LOST_DBG (same scan file on both builds)
| run | -pv 5a239b1a | LIVE b238857f CONTROL |
|---|---|---|
| SEED=9001 #1 | 88/92 dup0 **van3** (267, 1045, 528 = T6 shape) | 87/94 dup0 van0 |
| SEED=9001 #2 | 89/92 dup0 van0 | van 10000014 (T1: f7Done←fxFin7 «rm gone») — stopped at w47 after the twin showed |
| COOP_SWAP | 88/92 dup0 van0 | — |
| default 4242 | 89/92 dup0 van0 | — |
Other FAILs in every run = buổi stall «Sẵn sàng» (one week) and Kỳ ngộ traffic counts — pre-existing harness/co-op rows.

## Leftovers judged
- **T6** (267/1045/528 here; 934, 3385 earlier on -pv): NPC-owned case kept by NPC 1 via Kỳ ngộ «giữ lại», later host ledger «me → coop:902 sang hảo hữu» (jil runAct wrapper → ilSent), case closed «matdau», NO fam op of that id on either seat, guest has no line. The piece was never in her entry's snapshot and no op names it, so no -pv hunk (all act on ops of objects in the entry snapshot) can reach it; the gift road is sendRes «items» («Quà tặng» dialog), not traced by LOST_DBG. LIVE twin: E44d CONTROL LIVE 7303aa58 (reports/coop-famops.md: «Kỳ ngộ "giữ lại" by host NPC then "sang hảo hữu" … NPC-owned cases held by NPC 1»). PRE-EXISTING → ticket (E44g holds the T6 trace).
- **T1** festival stale diff (f7Done «rm gone»): LIVE twin reproduced here (10000014 on LIVE b238857f, the same id E44f saw on -pv). PRE-EXISTING → ticket (E44g: famSame by iu OR hiu).
- T2–T5, kyngo-closed pieces, stall-time dup 1372, COOP_SKEW=24 w0 deadlock, coop-b1 buổi stall: not seen in my -pv runs except the buổi stall; all sit in code -pv does not change or have LIVE twins (E44f table) → tickets stay with their rows.

## Final merge (review/coop-famops-pv-r)
- e93dfc5c + 8df903a5: on LIVE b238857f — dev/ identical to -pv (main's delta since base 35f5b5ab = the -p hunks already in -pv); only index.html/sw.js conflicted → assemble + build_site.
- a21eaa11: LIVE 40cc2b92 (5 test files only; no overlap). A fresh build_site then gave another assets.json (CDN *-ha-sang.webp sizes changed since main's bfee517a) — not this row, main's generated files kept.
- LIVE bda5b75b merge: jcoopworld.js main hunks (fromCanon cqBack ~L165, CW.keyMove ~L294, CW.snapNow ~L1101) vs -pv hunks (famDiff/famSame ~L549–560, b4Ops ~L1297–1310): disjoint, auto-merged; no main hunk names b4Ops / famDiff / famApply / ilCoopRes / famSame. coop-lost-scan.js: main console filter (L25) vs -pv trace (L81–85, L145–165): disjoint. jil.js: main unchanged. index.html/sw.js rebuilt (81d76c8b).
- vs LIVE bda5b75b: jcoopworld.js +18/−6, jil.js +2, coop-famops-unit.js +23, coop-lost-scan.js ±8, index.html, sw.js.

## Final gates on review/coop-famops-pv-r 81d76c8b (LIVE bda5b75b ancestor), each run ALONE
| gate | result |
|---|---|
| coop-famops-unit | 37/37 |
| coop-e2e (LIVE suite) | 141/141 Fold host + 141/141 COOP_SWAP (iPad host) |
| coop-b1 | 43/43 (on a21eaa11 it was 42/43 step 9 «week merged» = the known buổi flake, also on LIVE) |
| quickcheck + old save | PASS 252 s, old save ok, core gates PASS, render 290/246 ms, buổi 1608/1277 ms |
| role-parity ×2 | ALL PASS ×2 |
Same gates on a21eaa11 (LIVE 40cc2b92): all PASS except b1 42/43 (flake).

## VERDICT: **PASS 81d76c8b440620c9bb21430b388601d823982add** (review/coop-famops-pv-r, base LIVE bda5b75b). Tickets T1 and T6 stay with E44g (pre-existing, LIVE twins).
No shots (no UI change). Worktrees /home/user/wt/{pv,live,r,ho} and logs /home/user/wt/out are in this container only.
