# E73r — BIG REVIEW review/moment 5a504f92 (PARKING #9 Khoảnh khắc chân dung, rules/data) — VERDICT: FAIL 5a504f92 (5 items)
PRIORITY #1 CHECK ('khoảnh khắc chân dung' / 'họa sư' / 'chandung'): OD 0 (owner row PARKING_LOT #9 20/11 ~06:35Z; build OD 24/11 ~05:20Z) | main 0 for the feature; reused parts verified (j22 MROLES Họa sư, jmen menSched/menOrder, j31 FEST, jil, jlost loOk, jshelf, jkrev, j3 Q/act cards, jcol pastHTML); existing painter-bribe road j68e:109 «Bỏ bạc nhờ vẽ cho đẹp» (30 bạc) | review/* 0 | claims E69 (archived), E73r (this).
Reviewer: E73r = session_01DgYSWmJLYD7zyj2DJo7qYU (opus). Merge: review/moment-r **7d526e92** = 5a504f92 + origin/main 056c2402 (only conflict: assemble.py list → main's list + jmoment.js after jshelf.js; index.html/sw.js rebuilt). Pushed; the worker may continue from it.

## GATES (on 7d526e92)
| gate | result |
|---|---|
| dev/test/moment.test.js | PASS |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS · core gates PASS · time-spill PASS · open 1569 ms · old save ok · perf median new/live: render 184/198, tab 357/323, **buổi 2302/994**, tasks>200 19/17 (inside the gate; runs noisy 2819/969/2302 — worker also saw 1998/1149: please measure the placeWhere wrap cost, item 6) |
| role-parity.test.js ×2 | ALL PASS / ALL PASS |
| coop-e2e.js | 142/142 passed |
| old-save load | ok (quickcheck + moment test 9) |
| shots Fold 755x1000@2 + iPad 1180x820@2 (moment-shots.js, LOOKED) | no page errors; painter card / reward reveal / bag tile render from kit parts; see item 2 (the card itself shows the dominated road) |

## LAWS
| law | result |
|---|---|
| 1 two-way | PARTIAL — NPCs sit (same moOdds), hold, give, can be robbed (jlost two-way); but NPCs never take the «Lót tay» road (item 3) |
| 2 equal value | **FAIL** (item 2) |
| 3 gain-and-loss | FAIL in the clamp case (item 2: bribe = bạc + rumour risk for no extra odds) |
| 4 one core | mostly ok (BAL.mo); minor hard-coded grade 2 (item 5) |
| 5 harder with rank | ok — bar 40→68, odds 68…40 at Sắc 60/Tài 50 |
| 6b real painter | **FAIL** for 2 moments (item 1); festival work order lawful (menLawful 'order') ok |
| 6c real objects | ok — chest item, ilLog, giveTo identity kept by S.moIu (moFix), emp box, jlost, shelf |
| 7 wording | ok (no %, odds word); one visible bug line «… đang vẽ cho undefined» (item 4) |
| 9 kit | ok — Q dialog + act cards, kitItemInfo reveal, kitInvGrid tile, rows67; album correctly STOPPED on KIT REQUEST |
| 11 family | ok for item copies (giveTo / reveal / bag / iname / gallery / shelf) |

## FAIL ITEMS (worker fixes on review/moment from 7d526e92)
1. **Law 6b — two moments can never be earned.** Simulation through the REAL schedule (placeWhere → jmen menSched/menPlace, 2 years × 12 months × 3 tuần × 4 buổi, wk() advanced): painter at vuon only at buổi 0/2 by work order (menOrder b ∈ {0,2}) and at tối only on festival orders. Hits: xuandao 6, thucuc 6, dongmai 2, each festival 2, **hasen 0** (Hạ · tối: impossible by rule), **haquat 0** (Hạ · trưa/chiều: trưa impossible, chiều-in-garden in Hạ 0 in 2 years). Gallery rows then promise «chưa có · Hạ · Ngự hoa viên» for a slot nobody can fill. Fix: retime hasen/haquat to buổi the schedule delivers (or one lawful seasonal work order like the festival one), and add a test that walks the real schedule (no forced S.menW) and proves every non-event moment is reachable within N years.
2. **Law 2 / 3 — «Lót tay họa sư» is not equal value to «Ngồi cho họa sư vẽ».** Priced off no value table. With the game's own table BAL.pm.val (khacBac 6, danhBac 5, eqTol 8) and item worth pr 120 + Danh: bribe − sit = 0.15·125 + 6 − bribe[r] − 0.3·5 = +3 at rank 0, −17 at rank 3, −57 at rank 7 (out of eqTol from rank 3). When p0 ≥ hi − bribeB the bribe buys 0–9 odds for 20–80 bạc + a rumour risk: the Fold/iPad shots show both cards «Rất vững», bribe «Bạc −20» = a dominated road (law 3: cost with no gain over the other road). The rumour risk is also not on the card (Tốn line shows only Bạc). Fix: price the bribe from the one value table so both roads sit within eqTol at every rank/odds (or give it a real distinct gain), show the risk on the card, and add an eq test (pattern: dev/test/kyngo-eq.js).
3. **Law 1 — NPCs have one road only.** npcPass rolls only the sit road; an NPC with bạc never bribes, never risks the rumour. Same choice set for NPCs (agent pick between the two roads, bạc spent, rumour → her Danh), host only in co-op.
4. **Bug (visible text)** — after she picks «Thôi, để dịp khác» or closes the card, any re-offer in the same buổi (goTo back to vuon / placeWhere) logs «<Họa sư> đang vẽ cho undefined; hôm nay không vẽ thêm ai.» (reproduced: S.moBusy who "none"/"asked" has no n). Log only when a real sitter holds the painter.
5. **Law 4 (minor)** — grade 2 typed in jmoment (kitItemInfo r.grade=2, BAL.shelf.it.chandung gr:2): put it in BAL.mo (e.g. BAL.mo.gr) and read it.
6. (note, not blocking alone) measure the buổi cost of the placeWhere wrap (moFixAll over every chest each buổi) — quickcheck buổi median 2302 vs live 994 on this box.

## OTHER NOTES
- Dialog top picture = generic evArt (a lightning-storm scene on this run) — off-tone for a calm sitting; fine until the ART ORDER lands, worth a scene pick from the kit pool.
- Worker shots dev/handover/shots/moment/*.webp deleted with this verdict (E-common image rule).
