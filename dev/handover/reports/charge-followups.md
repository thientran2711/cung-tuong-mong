# charge-followups (STEP 3 after D4) — worker D1+D4 #4 session_01D3E3NZG2LWTwaYMqBjHCPL (depth 3, START_CTX ~4 %)

PRIORITY #1 CHECK ('tịch thu|bồi bạc|Mua chuộc|Trình Hoàng hậu'): OD 1 | ledger 0 | claims 2 (D1+D4 row = this worker) | main 15 | review/* 0 | archive 0.
Reuse: jil item ledger (ilGone / ilOut / box / census «net»), jagstaff asOut (one servant-dismissal road), D4 jcharge (chPunish, chDeedMap, punRows), jtruth deeds, D4 table A (reports/punish-reason.md rows C/D).
Branch review/charge-followups from D4 LAND READY acd6932d (FF from LIVE 6b5d3d05). Order (Foreman D 06:43Z): (b), (c), (a).

## (b) D4 table A punishments that were not built
| charge | table A | before (acd6932d) | after |
|---|---|---|---|
| C Ức hiếp quấy phá | bồi bạc cho người bị hại, cấm túc, Danh − | cấm túc only | cấm túc + bồi `BAL.charge.uhPay` (20) lượng to EACH person harmed (the victims of her uh deeds, at most «need» = 2); her notice row «Bồi thường: bồi 20 lượng bạc cho …»; NPC: log line |
| D Mua chuộc người hầu | người hầu bị đuổi khỏi cung, phạt bổng, Đức − | phạt bổng + Danh/Đức − only (deed had no servant) | + the bought servants (spyFor = the guilty) dismissed through jagstaff `asOut(s,"expel")`, at most `BAL.charge.mcFire` (2), the one named by the deed first (jtruth bribeServ/threatServ deed now records `d.s` servant sid + `d.o` palace); her notice row «Người hầu bị mua»; her own servant bought by an NPC is dismissed too (log) |
Two-way (law 1): the same chPunish for her and every NPC (both directions tested). Not covered: the player-as-servant life (S.srv.spyFor, she is not in a staff list) is not dismissed by an NPC's proven Mua chuộc — that would end her life; left for Foreman D / sếp if wanted.

## (c) Trình Hoàng hậu odds
| road | before | after |
|---|---|---|
| jaudit `ACT.trinhhh` card (live executor) + j78 legacy o/f | `35 + aff(q,a)/2 + 8 × evG` (TOTAL pieces, typed numbers) | `chTrinhO`: `BAL.charge.trinh.base + aff(q,a)/affD + per × pieces of the PROVEN charge` (35 / 2 / 8 — same scale, like Tố giác `accW`) |
Test: a piece of another charge leaves the odds unchanged (58.5 = 58.5); 3 proven pieces = 3 × 8.
Other «× total pieces» odds left as they are (they are evidence uses, not an accusation by charge): Trình Thái hậu (j78 trinhth), Uy hiếp đòi bạc, jtsb/jroute threat odds, jlost keep odds, jagacts3 Kể tội, j95 NPC affair tell (Foreman D may route the last one to the D4 owner if it should need Tư thông pieces).

## (a) LAW 6c REAL OBJECTS — every «tịch thu» piece lands somewhere traceable
One road, reusing jil (no second system): `ilSeize(p,e,how,o)` = `ilOut` + `ilGone` ("conf" → Nội vụ phủ store with the atonement road, "evid" → Cung Chính ti as tang vật; `o.keep` lets a seized consumable such as poison stay as tang vật). `vpSeize(t)` takes exactly what `vpItems(t)` lists (worn jewellery, WD slots of a Vượt phẩm outfit with the rank's plain piece put back, over-rank dress) by reference.

Runtime probe `node dev/test/seize-ledger.js <index.html>` — a real piece with a ledger id, the road run by the game's own function (odds forced «thành»), then the weekly census:
| road | before (acd6932d) | after |
|---|---|---|
| vpAccuse her→NPC / NPC→her / NPC→NPC | nvp, net 0 (×3) | nvp, net 0 (×3) |
| chPunish Vượt phẩm xa xỉ → NPC / her | NOT TAKEN (vpItems copies: indexOf −1; itGone did not exist) | nvp, net 0 |
| chPunish Giấu đồ cấm → NPC / her | NOWHERE (spliced) | cct tang vật, net 0 |
| hhAct «Tịch thu trang sức» NPC queen → her / NPC | gone, census net +1 | nvp, net 0 |
| empAct conf (her as Hoàng hậu; jagacts replaced the ilGuard-wrapped empAct) | gone, net +1 | nvp, net 0 |
| wkSell caught at Thần Vũ («đồ bị tịch thu») | market (routed as «bán») | nvp «bị tịch thu» |
| total | 8 FAIL / 11 | 0 FAIL / 11 |

Static scan `python3 dev/test/seize-scan.py [ref]` (every «tịch thu / thu hồi / sung công / bị thu lại» site in dev/build/j*.js: text / routed / unrouted):
| ref | text | routed | seize_unrouted |
|---|---|---|---|
| acd6932d | 38 | 9 | 2 (jagacts:69 hhAct, jcharge:92 chPunish) |
| this branch | 38 | 12 | 0 |
(50 sites; the static scan counts a guard-wrapped function as routed, which is why empAct / wkSell only show in the runtime probe.)

## Tests (built index.html of 61e43277 unless said)
| test | result |
|---|---|
| charge-followups.js (new) | 12/12 PASS, 0 page errors (before: keys missing, crash) |
| seize-ledger.js (new) | 11/11 PASS |
| seize-scan.py (new) | seize_unrouted 0 |
| charge-smoke.js | 31/31 PASS |
| charge-scan.py | all families 0 (deed_unmapped 0) |
| punish-scan.py | npc_zero 0 |
| punish-reason.js 755x1000 / 1180x820 | ALL PASS / ALL PASS |
| cold-faction.js | 20/20 |
| promo-root.js | PASS |
| coop-e2e.js (live Worker) | 143/143 |
| charge-taps.js Fold 755x1000 / iPad 1180x820 | PASS, accusation reached by real tap; her notice AI TỐ / VÌ SAO / CHỨNG CỨ / HÌNH PHẠT Cấm túc 2 tháng / BỒI THƯỜNG bồi 20 lượng bạc cho <victim> |
Videos: https://ctm-img.victoria-tntt.workers.dev/img/_review/charge-followups/fold-755x1000.webm · https://ctm-img.victoria-tntt.workers.dev/img/_review/charge-followups/ipad-1180x820.webm (+ fold-notice.png, ipad-notice.png — looked at: kit notice rows, no cut text).

## STATUS (worker D1+D4 #4, depth 3, START_CTX ~4 %, 26/11 ~07:45Z)
- D4 LAND READY sent to Foreman D 07:2xZ: review/charge-evidence-rv acd6932d (FF from LIVE 6b5d3d05; contains D1 punish-reason-rv 8351f5ab, which is no longer FF alone).
- STEP 3 = review/charge-followups d1981654 (from acd6932d), SSK → ONE BIG reviewer session_01D3E3NYHtvnZpVmMEJ5xy5z (opus, my child): checks STEP 3 AND the D4 merge delta 1e0b8ccb→acd6932d. On BIG PASS → LAND READY review/charge-followups(-rv) <sha> to Foreman D (after D4 lands; re-merge if LIVE moved).
