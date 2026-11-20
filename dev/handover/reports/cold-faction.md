# cold-faction — faction life while someone is in lãnh cung (law 1 TWO-WAY, law 2/3, law 4, law 6, law 11)

PRIORITY #1 CHECK ('lanhcung faction|faction act|lãnh cung'): OD 12 | ledger 2 | claims 7 | main 15 | review/* 0 | archive 65 — source: FOREMAN_E_STATUS 20/11 12:25Z (E22s facfound-parity PASS follow-up); reused j10 facAct/facHTML/found/joinFac/leaveFac/sellOut, jagacts3 p3FacFr/p3Cold/p3Run, jrcv RCVK.facFound/facJoin/facInvite + PEND.rcvAsk (her 4-answer card), j14 coldActsOf (the ONE lãnh cung card list for her and an NPC). No other worker on it (E31 j68q untouched).

Branch `review/cold-faction` from LIVE 548dcd0d. **SẴN SÀNG KIỂM 29d9258e0acb80ce142230f523cc97c400a688bb.**
GAME CHANGE (rules, no new UI part). Diff: dev/build/j10.js, j14.js, jagacts3.js, jrcv.js, jbal2.js (BAL keys), new dev/test/cold-faction.js, dev/test/coop-cold-faction.js, dev/tools/cold-faction-scan.py, index.html/sw.js rebuilt.

## 1. The rule (one core, j10)
- `herCold()` = S.out from cold() (S.coldTurn set) and not the servant / tiểu thư stand-in S.out (srvW / kcW: isSrv / isKc).
- `facIn(p)` = present for faction life: her → !herCold(); NPC (and the co-op friend's mirror) → alive && !out. Used by every faction reader.
- `facRoll(f)` = the ROLL (she / an NPC in lãnh cung keeps her place: named, sold out, struck off). `facMembers(f)` = who is PRESENT (leads, counts in thế lực, shares news, meets). Before: she was always present (facMembers `p===S||…`), an NPC in lãnh cung vanished and her faction dissolved.
- `facLive(f)` = roll ≥ 2 and someone present → a faction survives a member's lãnh cung (needed for the existing «Nhờ người bên ngoài: nhờ phe vận động» card, which reads facOf/facStr).

## 2. What is real in lãnh cung, per act (both ways)
| act | she in lãnh cung | NPC → her in lãnh cung | NPC in lãnh cung | NPC → NPC in lãnh cung |
|---|---|---|---|---|
| Lập phe / Mời / Xin (face to face) | tab buttons shut, facAct shut, a note «chỉ còn gửi thư» | never: p3FacFr, j10 loop, j10 facInvite, RCVK ok() gate on facIn | no day plan (liveRivals) | never: p3FacFr / j10 loop drop her (j10 loop had NO out check: fixed) |
| Gửi thư xin rời phe | letter card (j14 coldFacActs) | — | same card in p3Cold (C.ag = BAL fac.gLeave) | — |
| Gửi thư tố phe (Bán đứng) | letter card: sellOut names the whole roll | named when a member sells out (oán, evidence to Hoàng hậu; punished only if present) | same card (fac.gSell) | named the same |
| Gửi thư xin vào phe | letter card → the leader answers (jrcv pick) | her card when an NPC in lãnh cung writes to HER faction (PEND.rcvAsk keeps a letter: RCVK.facJoin.cold) | same card (fac.gJoin) | leader answers by jrcv |
| Gạch tên (struck off the roll) | an NPC leader may strike her off (facMonth, BAL fac.drop) | — | she (leader) strikes an NPC off: «Gạch tên» button → facAct gach | NPC leader the same (facMonth) |
Letter roads (law 2, equal worth): **thái giám đưa cơm** (Bạc −lt.bac, odds base lt.euO) or **her own kept maid** (no bạc, odds base lt.maidO + loyalty / lt.loyD; caught → that maid's loyalty −lt.maidLoy). Gains/losses (law 3): rời = Danh +rcv.prop.danh, members quý −fac.leave.rel; tố = Danh +sell.danh, Sủng +sell.sung, members oán +sell.oan; xin = a faction to vận động for her, the leader pays Danh −rcv.prop.danh to take a phế phi in (mirror of the «no» gain); gạch tên = leader Danh +rcv.prop.danh, the one struck off oán +drop.oan.

## 3. Whole family scan (law 11) — dev/tools/cold-faction-scan.py
| ref | spots treating her as always present / no presence test |
|---|---|
| LIVE origin/main | 7 (j10 facMembers ×2, j10 NPC loop, j10 facInvite to her, jagacts3 p3FacFr, jrcv PEND.rcvAsk letter dropped, j14 coldActsOf friend) |
| this branch | 0 |
Also law 4 in the family: sellOut 5 / 3 / 40 / 40 / 40 and leaveFac 10 were typed → BAL.ag.par3.fac.sell / leave; tab words print them.

## 4. Gates (29d9258e0acb80ce142230f523cc97c400a688bb)
| gate | result |
|---|---|
| dev/test/cold-faction.js (new, 19 rows: rule, roll vs present, tab shut, no ask to her, letters ×3 + both roads, maid caught, join answer + phế phi cost, NPC letters + to HER card, strike-off both ways, NPC→NPC, co-op mirror, restore, BAL words) | ALL PASS 19 |
| dev/test/coop-cold-faction.js (new, two seats on the LIVE Worker: B in lãnh cung then A; each seat: tab shut + letters; other seat after the merged week: on roll, not present, no ask, Gạch tên works; back after restore) | ALL PASS 22 |
| coop-e2e | 68/68 |
| fac-parity-play | ALL PASS |
| role-parity.test ×2 (one at a time, ~12 min each) | ALL PASS, byte-identical (md5 of body b2957fcc… = same as facfound-parity / kyngo); open 18 ≤ OPEN_MAX 18; note «maid:P-ONLY:maid:errand» still listed open but closed (E22e, not mine) |
| role-parity-drift2-play | ALL PASS |
| one-core-guard | PASS (fails 0; inline 3769 ≤ baseline 3930) |
| quickcheck (alone) | PASS · open 1646 ms · old save ok · render 203/247 · tab 391/426 · buổi 1166/1166 · core gates PASS (needs dev/art in the sparse checkout for G4) |
| cold-faction-scan.py | LIVE 7 → branch 0 |
Device shots (Fold 755x1000@2, iPad 1180x820@2; looked at): tab as leader with a member in lãnh cung («Gạch tên» = the same kit card as «Hợp mưu hạ»), tab in lãnh cung (note + chip «Ta (lãnh cung)», no buttons), lãnh cung cards (letter cards = the standard card, odds word, Bạc cost). CDN upload refused (401 account E) → regenerate: `node dev/test/cold-faction-shots.js <outdir>`.

## 5. Notes
- Co-op: a friend's lãnh cung crosses seats at the merged week (jcoopworld `me`/week), not live pos — the co-op check plays a week end. S.facs is per seat (not a shared world key, pre-existing): each seat's factions hold the friend's mirror; the rule is the same on both seats.
- No new kit part: the tab note is `p.past`, member chips are the kit chip (hot), the strike-off button is the same `rbtn` button as the tab's other acts, letters are normal lãnh cung cards.
