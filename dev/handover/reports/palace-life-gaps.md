# palace-life-gaps — GAP rows IT05 + KP03 (b-gap-1 J5, worker session_01N1tNP2d78pGcErwtE8UsCK, opus)
PRIORITY #1 CHECK ('jewellery|hộp trang sức|orphan|mồ côi|Cho gọi con'): OD 7 | ledger 1 | claims 1 | main 15 | review/* 0 | archive 51 → reused jlost (cases, keep/held road, Đòi lại / Báo / Tâu acts), jil (item ledger), jplx (where the children are), j54 Mẫu tử bar (k.hM), j95 orphan housing, j99succ hoa. Design: OD:L87, L507, L1313; PLACES_PLAN.md §5 "Móc lối chơi" (on review/places); PROGRESS_places-port.md:25.
Branch review/palace-life-gaps @ 3af67a8e (base LIVE 30e8714e, merged LIVE 90d57324, own build committed). START_CTX ~5 % (1M window; get_session reads 0).

## IT05 — real objects (law 6c)
- j8 maidMonthP: the bought maid now takes a REAL piece of the chest (new jlost `maidTheft`: loLose with cause riv, by = buyer, keep → the piece sits in the BUYER's chest as a "held" case; loKnowAt → owner knows: Đòi lại êm thấm / Báo Cung Chính ti thu hồi / Tâu Hoàng thượng xin soát cung (higher rank, real evidence)). Same rule for NPC owners (two-way). Nothing worth taking → silver, text says silver, amount BAL.eff.j8.maidStealBac (was typed 30 and text "hộp trang sức").
- Whole group (scan `python3 dev/tools/theft-object-scan.py`): j68e/j68h lostItem + j68f/j68h hairpinThief named made-up objects and ended "đồ mất hẳn" with nothing moving. Now the event binds one real chest piece when it opens (jlost LO_EV: piece → jlost case, text {it} = its name, servant thief named on the case); "found" outcomes put it back (loEvBack → lostReturn); every other outcome leaves the case open ("còn thất lạc"); no piece worth taking → event does not come. jcmaid debt text: "Bạc cất trong hộp trang sức vơi đi n lượng" (silver, not an object).

| scan | lines naming a taken object | real piece moved | UNROUTED |
|---|---|---|---|
| before (LIVE) | 9 | 1 | 7 (j8:419, j68e:22,23, j68f:110, j68h:31,32,77) |
| after | 5 | 4 (+1 silver text) | 0 |

## KP03 — children living rules (new dev/build/jkidlife.js, after jagwhy1; numbers BAL.kid in jbal2.js)
- Mẫu tử (k.hM) for sons too (kit sbar, same as princesses). A child living AWAY (prince 6–17 at A ca sở / Đông cung; any child while the mother is in lãnh cung) not seen this month → Mẫu tử BAL.kid.estr (−3) at month end, logged "xa cách".
- «Cho gọi con về» (1 khắc · Mẫu tử +3 · kèm: con bỏ một buổi học, Tài con −1; child is at her palace that buổi via plxKidPlace) and «Sang A ca sở / Đông cung thăm con» (walk · Mẫu tử +4, once a month; seen on goTo arrival) — both in the card's «Thăm con» group next to j15's «Về tẩm cung thăm con» (kit pbtn cards). Gain + loss / equal value: call = cheap time but costs a lesson; visit = walk time, more Mẫu tử.
- NPC mothers (two-way): monthly visit via npcWhy "kidSee" (registered, reason = Mẫu tử) × BAL.kid.npcSee; same estrangement.
- Thái tử prestige: setHeir no longer types +10 for her only; mother of the new Thái tử (her OR an NPC) Danh +heirDanh, the mother whose son is put aside −heirDanh; her day adds ghenAll heirGhen. Texts j3:60 / j51:66 print BAL.
- Orphans (mother dead / lãnh cung): raised by the Hoàng hậu — her when she holds the seat, else the NPC queen — else Thái hậu; j95 houses them there (kidWardHome); foster mother Danh +ward.danh once; her wards listed in the children tab «Con nuôi» (pcard + Mẫu tử bar k.fM).
- Succession: her son's Mẫu tử ≥75 / <35 moves j99succ "mẹ con" (hoa) ±1.
- Not done (PLACES_PLAN item, park): "kẻ thù của mẹ có thêm động cơ nhắm vào Đông cung" beyond the ghen bump.

## Tests
- dev/test/palace-life.js 23/23 at 755x1000@2 and 1180x820@2 (×3 runs fold, ×2 ipad), 0 page errors, no x-overflow, save round-trip.
- quickcheck PASS 3af67a8e (core gates PASS · old save ok · perf new/live render 218/221 ms, buổi 1228/1050 ms (noisy box), tasks>200ms 19/19). Old saves: every new field defaults.
- Shots (LOOKED): https://ctm-img.victoria-tntt.workers.dev/img/_review/palace-life-gaps/ fold-1-kid.jpg, ipad-1-kid.jpg (son card «Thăm con» group), fold-2-lost.jpg, ipad-2-lost.jpg (bought-maid case: "Thấy ở … cung", Đòi lại / Tâu Hoàng thượng).
- Co-op: NPC children only on the host (worldOn()); her children in her S; no co-op code touched. coop-e2e not run (no co-op file changed).

## Kit
No new kit part (pbtn, sbar, pcard, kit tabs only). KIT REQUEST: none.
SẴN SÀNG KIỂM palace-life-gaps 3af67a8e

## REVIEW r1 (BIG, opus, session_01N1tNP6rEmQko7Y5Qk716AK) — PASS 5b670afb (branch review/palace-life-gaps-r1)
PRIORITY #1 CHECK: brief J5 line present | reused jlost/jil/jplx/j54/j95/j99succ (no rebuild) | review/* none other on IT05/KP03 | claims: worker row 396.
START_CTX ~3 % (1M window). Base: worker 3af67a8e + newest origin/main 315950c2 merged (index.html/sw.js rebuilt; conflicts only in the build files).

### Fix made by the reviewer (BLOCKING bug, now fixed)
1. KP03 estrangement fired even when she saw the child. monthTick (j3:111) runs `S.turn++` BEFORE kidsMonth (j3:117), so `k.kmS!==S.turn` at month end was always true: a call or a visit was erased by "xa cách" the same month (net 0 / +1). The worker test called kidLifeMonth() without the turn step, so it never saw it. Fix: jkidlife kidLifeMonth checks the month that just ended (T=S.turn-1); the NPC mother's month-end visit stamps T too. New regression test dev/test/palace-life-r1.js drives the REAL monthTick (no visit → −3; call → +3 net; visit A ca sở → +4 net; unseen brother −3): 5/5. Worker test line 45 now steps the turn like the game: 23/23.

### 18 laws
- 1 two-way: maidTheft for her and NPC owners (probe: NPC owner case st=found, held by buyer; jlost loOwnerMove acts for NPC); heir Danh for her and NPC mothers; NPC mothers see sons (npcWhy kidSee). OK.
- 2/3 equal value + gain-and-loss: Cho gọi con về (1 khắc, Mẫu tử +3, Tài con −1) vs Sang A ca sở/Đông cung (walk, +4); recovery roads are the existing jlost acts (each with cost/fail). OK.
- 4 ONE CORE: BAL.kid + BAL.eff.j8.maidStealBac; texts print BAL; one-core guard PASS.
- 5: n/a (no trial added).
- 6 REAL: (c) the bought maid moves a real chest piece into the buyer's chest (held case, Đòi lại / Báo / Tâu with 2 real proofs); lostItem/hairpinThief bind a real piece, found → back, else case stays open. (a) Tâu still needs real evidence. OK.
- 7 wording: "tốn/thành/kèm", no %, odds ladder from jlost. OK. 9–12 kit: pbtn act cards, sbar, pcard, kit tabs; no private CSS. OK (shots LOOKED).
### Tests (all on the merged head unless noted)
- quickcheck PASS (core gates · time-spill · old save ok · perf new/live render 265/279, buổi 1231/1647 on 66bd36cd merge; re-run on 5b670afb: QUICKCHECK PASS render 242/243, buổi 1467/1340 (noisy), old save ok, core gates PASS).
- palace-life.js 23/23 fold 755x1000@2 + ipad 1180x820@2; palace-life-r1.js 5/5; undef-scan PASS; coop-e2e 68/68 (live Worker).
- role-parity: 2 FAIL (cx3 tell P-ONLY; harm accuse/banphe/uyhiep N-ONLY + promoted-maid PROMO) — IDENTICAL on origin/main 66bd36cd build → pre-existing, not this branch (no file of those acts touched).
- bots: bot-same 30 steps finished 0 lives on this box (OOM-killed once), so no n≥30 table; numbers moved are one-offs (heir Danh ±10 now also NPC mothers, ward Danh +3 once, Mẫu tử ±3/4 per month only feeding succ hoa ±1). Not blocking; Foreman B may run a bot lane if wanted.
- theft-object-scan: UNROUTED 0. Shots looked: fold/ipad kid card (Thăm con group: Cho gọi con về, Sang A ca sở thăm con, Về tẩm cung thăm con), fold/ipad Đồ thất lạc case (Gấm Tô Châu held at Càn Ninh cung).
### Non-blocking follow-ups (park)
- Co-op: when the HOST's son replaces the GUEST's Thái tử, the guest's hrCard only handles her own son → the guest loses no Danh (host side does). Small two-way gap in co-op.
- Law 6c outside this group: story roads name objects with no item behind them (jrd_cn:101 "vòng bạc", jrd_cn:574+ Tố Nga's trâm vàng, jrd_cnv:243 hộp trâm) — past-event narrative, not her chest.
- Ward bond growth k.fM reuses BAL.kid.visit; a own key (ward.grow) would read clearer.
- The two new act cards show the generic palace-room act picture (kit picker); a child/visit picture would fit better (Foreman C).
