# cold-faction — BIG REVIEW (E33r, opus, depth 6) of review/cold-faction 29d9258e

PRIORITY #1 CHECK ('cold-faction|herCold|facIn'): OD 2 | ledger 0 | claims 7 | main 15 | review/* 1 (this branch) | archive 0 — git grep LIVE + branch: ONE `herCold` / `facIn` (j10.js:134-135), no second presence copy; reused j10 facAct/leaveFac/sellOut, jrcv RCVK/PEND.rcvAsk, j14 coldActsOf, jagacts3 p3Cold.

**VERDICT: PASS (LAND READY) — review/cold-faction-r6 @ 5b5510f0037a6f0434b655f91397ce54cbde4c31** (FF on LIVE b1033eb0; history: f72e91a6 merge 463d3d70 + fixes, 4762a707 merge 24dd2c62, 5b5510f0037a6f0434b655f91397ce54cbde4c31 merge b1033eb0).

## Laws checked
| law | result |
|---|---|
| 1 two-way | PASS — she ↔ NPC both ways: letters out of lãnh cung (her deck + NPC p3Cold = one list j14 coldFacActs), NPC letter to HER faction → her 4-answer card, strike-off both ways (her «Gạch tên» button / NPC leader in facMonth), co-op friend mirror same rule both seats |
| 2 equal value | FIXED by reviewer — maid road (free) could reach odds 95 vs eunuch 80 + Bạc −12 = always better. BAL lt.maidO 45 → 30: maid odds 65 (loy.trust 70) … 80 (loyalty 100) ≤ eunuch 80; free road pays in odds + maid caught risk, eunuch road in bạc |
| 3 gain-and-loss | FIXED by reviewer (whole group) — «Rời phe» on her tab and NPC cx3:facLeave was cost-only (only «đồng đảng −10»); only the lãnh cung letter had the «không dính bè phái» Danh gain. New j10 `leaveFacSelf` (leaveFac + Danh BAL.rcv.prop.danh) used by all 3 voluntary leaves; tab label prints it. Forced leaves (divide / sellOut / split) stay `leaveFac`. Other new options: Tố (Danh/Sủng + / oán), Xin vào (faction / leader pays Danh − to take a phế phi), Gạch tên (Danh + / oán) — all gain+loss |
| 4 one core | PASS — new numbers in BAL (fac.sell/drop/leave, cold.lt); typed 5/3/40/10 moved to BAL; one-core-guard fails 0 |
| 5 harder by rank | N/A — letters are not mini-games/trials; in lãnh cung she holds no rank (same as the rest of the lãnh cung card family) |
| 6 real world | PASS — the roll keeps the real woman (named in sell-outs, strikable); only real channels (food eunuch, her own kept maid, a real staff member) |
| 7 / VANPHONG | PASS — new lines cổ trang, odds words (Chắc …), no % |
| 9 kit | PASS — letters = standard lãnh cung card; «Gạch tên» = same rbtn card as «Hợp mưu hạ»; cold member = kit chip «(lãnh cung)» hot; tab note = p.past |
| 11 whole group | PASS — scan dev/tools/cold-faction-scan.py LIVE 7 → 0; reviewer added the Rời phe group (3 places) |
| co-op gate (OD L594) | PASS — coop-cold-faction both seat orders (B then A) |

## Reviewer fixes (table)
| item | before | after |
|---|---|---|
| maid letter road odds (law 2) | 45 + loyal/2 → 80…95, no bạc (dominates eunuch 80 + Bạc −12) | 30 + loyal/2 → 65…80 ≤ eunuch |
| her tab «Rời phe» (law 3) | cost only: đồng đảng −10 | Danh +prop.danh · đồng đảng −10 |
| NPC cx3:facLeave (law 3 + law 1) | leaveFac only | leaveFacSelf (same gain as her) |
| lãnh cung letter «xin rời» | own inline leaveFac + rcvAp | leaveFacSelf (one function) |
| merge jrcv PEND.rcvAsk | conflict | keeps D.cold letter + main's need/tsDis |
Test row 13 added to dev/test/cold-faction.js (20 rows).

## Gates
| gate | sha | result |
|---|---|---|
| cold-faction.js | 5b5510f0037a6f0434b655f91397ce54cbde4c31 | ALL PASS 20 |
| coop-cold-faction (B→A and A→B) | 5b5510f0037a6f0434b655f91397ce54cbde4c31 | ALL PASS 22 ×2 (one earlier run on 24dd2c62 failed at SETUP «each has the other as a consort entry» before any faction step = harness flake 1/4 runs; not the feature) |
| coop-e2e | 5b5510f0037a6f0434b655f91397ce54cbde4c31 | 68/68 |
| fac-parity-play | 4762a707 | ALL PASS |
| role-parity-drift2-play | 4762a707 | ALL PASS |
| role-parity.test ×2 | 4762a707 | ALL PASS, byte-identical (md5 0664fd79…) |
| one-core-guard | 5b5510f0037a6f0434b655f91397ce54cbde4c31 | PASS (fails 0; inline 3769 ≤ 3930) |
| quickcheck (+ old save) | 5b5510f0037a6f0434b655f91397ce54cbde4c31 | PASS · open 1563 ms · old save ok · render 198/234 · tab 460/477 · buổi 965/3479 · core gates PASS |
(b1033eb0 brought jtq14/ge-rank/jnroad/j29 only — no faction code; role-parity/drift2/fac-parity from 4762a707 stand.)

## Shots (local only, CDN 401 on account E; looked 3×; not committed)
- Fold 755x1000@2 lãnh cung cards: letter card «Gửi thư xin rời phe … (nhờ thái giám đưa cơm)» = standard card, odds «Chắc», Tốn 2 khắc · Bạc −12, Thành rời phe · đồng đảng −10, Ghi chú Danh +1; no overflow. (Shot script's first card view had a random «Bộ sưu tập» notice over the left column — game notice, not this feature.)
- iPad 1180x820@2 lãnh cung cards: both letter cards (xin rời / tố phe → Hoàng hậu) clean, kit card, Danh +5 · Sủng +3 / cả phe oán +40.
- Fold tab as leader: «Rời phe» now Danh +1 · đồng đảng −10; «Gạch tên Phế phi …» kit card Danh +1 / nàng oán +15; cold member chip «(lãnh cung)» red.
Regenerate: `node dev/test/cold-faction-shots.js <outdir>`.

## Notes for FOREMAN E
- coop-cold-faction setup can flake (friend consort entry not yet there right after both seats enter); a waitFor on COOPW.friend() before the step would harden it — non-blocking.
