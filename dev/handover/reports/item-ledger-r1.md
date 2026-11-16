PASS 7aba5de97bb8aa1308e477213284089bd1552856
# item-ledger-r1 (Foreman D reviewer, opus) — review of review/item-ledger @fb67d4ad
Branch review/item-ledger-r1 @7aba5de97bb8aa1308e477213284089bd1552856 = review/item-ledger merged onto origin/main 73c06812, reviewer fixes (155596af), then origin/main fb367740 merged (assemble list = main's + jil.js; site rebuilt). Ancestor of current origin/main: yes.
START_CTX ~3 % (1M window; get_session reads 0, own estimate). Finished under the +25 % mark.

## Owner words checked line by line (OD "16/11 13:30Z" (3) + "16/11 13:40Z" ONE LEDGER, items part)
| Owner line | Verdict |
|---|---|
| every item, even lost, still lies somewhere and can come back; never vanishes | was NOT met (see MUST-CLOSE (a)); met after r1 fixes: 4 bot runs × 4 lives × 200 weeks + 3 tracer runs → census net 0, missing ids 0 (only bot-made "dropped dialog" nets, a player cannot drop a dialog) |
| lost/stolen piece (emperor-gift robe, unsellable) sits in SOMEONE's chest; found by searching rooms | yes: ngự tứ lost → jlost case → found in a holder's chest; robbed robe → plotter's chest (ilRob); "never found" → hidden in a chest |
| searching a HIGHER-rank room: not allowed → only report to the Emperor with REAL evidence | yes: jlost "Tâu Hoàng thượng xin soát cung", locked until BAL.il.empEv (case evidence from maids / Cung Chính ti / Nội vụ phủ book + evidence on the holder); NPC owners same rule; other search acts only touch her own chest (Soát rương) |
| sold pieces come back: chance in the weekly shop, or someone brings it to redeem; CEILING time; cannot pay → again later | tray (BAL.il.shopP) + ransom visit; ceiling was not held (visit skipped whenever any dialog waited; bot max 66 weeks) → fixed: due visit is always queued; unpaid → againW |
| sắc phong book / seal lost → investigated; still somewhere | the items do not exist yet (git grep main: only story text "kim sách kim ấn"); API ready (ilGone "lost" → jlost case + investigation acts; ilRob; ilWhere). FOLLOW-UP Foreman C when the items land |
| applies to every item | durable = every non-consumable (ilDur); consumables used up = Foreman D Q1 answer (keep exempt) |
| ONE LEDGER: every item of every person recorded (granted, in each chest, who lost/took what); main can answer "where is X" | S.il.log [week,id,item,from,to,how] (600 newest lines kept, BAL.il.logCap) + census (every piece an id + holder) + ilAudit(); census is rebuilt at load (not saved: save size) |
| numbers in BAL (OD:L1267) | all in BAL.il (jbal2.js), incl. r1's srvW / cctW / heldCap / mktCap; UI text prints the constants |

Foreman D answers (14:22Z) applied as given: Q1 consumables exempt, Q2 fire only damages (mended), Q3 dead consort's effects → store → resold, Q4 tray any week, Q5 higher rank locked without decree.

## MUST-CLOSE (a): the report's OPEN items — cause found and fixed
Tools (new, committed): dev/measure/iltrace.js (Proxy on every chest/slot: stack of each removal, "UNROUTED" vs "moved as a copy"), dev/measure/ilscan.py (static scan), ilbot.js now prints the detail of any missing id.
1. **Twin-id masking (main cause of the census nets + "missing ids")**: ilWhere matched by id, so a stale object with the same id (an open lost case's c.e, a gift copy) hid a real removal; the guard skipped it, the piece vanished later. Fix: ilAt (identity) in ilGone; the guard counts objects per id before/after the call (moved as a copy = same count → fine; fewer → route it).
2. **Found/held lost case hid its copy's removal**: a holder selling/giving the found copy → the case (c.e) counted as the holder → not routed → jlost then closes the case "matdau" → gone. Fix: only a case still "lost" (not yet found) holds the piece (ilCases).
3. **wdFrame (giá họa)** planted a NEW object (new hairpin, or a copy) and wdFrameTake deleted it when found → the tram_* / boodieu nets. Fix (j92): the very piece is planted (same id); found → back to the one who "lost" it, else tang vật (Cung Chính ti).
4. **Old saves**: a held case's c.e had no id while the holder's copy got one; lostReturn hands back a copy of c.e → new id → census net + a phantom extra copy in the store (duplication). Fix: census gives the case and its chest copy the same id. Stale "lost" cases whose piece is already in a chest are closed (piece located).
5. wkb_theu_s4 / vongngoc_r1 nets of the worker run = the same family (1/2/3: masked removals of crafted/wardrobe pieces); none in r1 runs. 6 "missing ids" = renumbered twins + pieces given ids by a guard in the week she died (census skipped that week) — 0 missing in the final runs.

## MUST-CLOSE (b): whole-game audit (LUẬT SỬA CẢ NHÓM), re-run by the reviewer
ilscan.py: 74 places where a piece leaves a chest/worn slot/veil. Routed by guard or inline rule: 45. The other 29 = used up (thuốc, trà, băng tan, món nấu hết hạn, chứng cứ nộp, bột ngứa, độc + món ăn, vật cốt truyện, vải may áo) or a move between chest and worn/pawn slots / to another chest (same object). After r1 fixes the only unrouted-by-design removals are consumables; the tracer finds no UNROUTED durable removal in 3 × 4 lives.
| Family | Before r1 | After r1 |
|---|---|---|
| sell / pawn / NPC sell (sellItem, wkSell, wdSell, econSell, wdPawnMonth) | routed, but masked by twins (y_vanthuy, y_maimai nets) | routed always (identity + count) |
| theft / cướp y phục (jty, NPC robbery) | ok | ok |
| confiscation (vpAccuse, wdAccuse, night1, rivalsMonth, empAct, jveil) | ok | ok |
| gifts (giveTo, wkGive, giftin, jevb, jtoilr, plantItem) | ok; wkGive to a maid → "net" (store) | wkGive to a maid → in the maid's hands (box "srv", why maid) |
| framing (wdFrame / wdFrameTake) | planted piece deleted when found | the same piece; back to its "owner" or tang vật |
| lost cases (jlost) | found-case copies could vanish (matdau) | routed |
| death / inheritance | NPC: store; player in co-op rebirth: her whole chest + box vanished | co-op rebirth (same world): her chest/worn/pawned → "di vật" in the store, her pieces still out stay out, ownerless (ilInherit); a co-op gift arriving while she is dead still lands |
| co-op trades | ok (res message); but proxy chest counted in my ledger, both sides netted NPC pieces (duplication risk), guest ids could collide | friend's proxy (coop:true) not in my ledger; no NPC nets in co-op (world pieces: each side routes only its own acts, world functions host-only); guest ids from 10 000 001 |
| events (jitev, story) | ok (story pieces exempt) | ok |

## Other checks
- Save size bounded: before r1 S.il grew without end (≈157 KB at week 300, 45 % of the save: census map + Emperor/Thái hậu piles + ownerless market). r1: census not saved; box keeps moving (servant sells a pocketed piece outside after srvW → comes back like a sold piece; tang vật → store after cctW; Emperor/Thái hậu keep heldCap each, older → store; ownerless market pieces over mktCap → Nội vụ phủ allotment to a consort). Measured S.il ≈ 44 KB at week 150, 54 KB at week 300 (log 600 lines ≈ 23 KB + box ≈ 30 KB), flat.
- Old saves: test s8 (in-memory) + NEW s12: a real save() blob stripped of S.il and every id, page reloaded, loadSlot + deser → loads, every piece gets an id at once (new deser hook), 0 net. Co-op: coop-e2e 59/59 (incl. rebirth in the same world, solo + old save).
- UI kit-only: kitShop tile (same as every tray tile), PEND dialogs with §64 item frame + act cards, Tư trang › Việc "Đồ ở nơi khác" rows = the same kwdsel + kitChip + kitFacts + loPic as "Đồ thất lạc" (consistency scan by screenshot); jlost act cards (loBtn/pbtn). No private CSS. KIT REQUEST: none.
- Wording (VANPHONG): no %, cổ trang; "Đồ cũ trở về", "Đồ bị tịch thu", "Chép kinh sám hối, xin lại", "Tâu Hoàng thượng xin soát cung"; numbers printed from BAL.
- Tests: dev/test/item-ledger.js now 13 scenarios (r1 added 10 giá họa, 11 found-copy sold, 12 real old save reload, 13 co-op proxy) PASS at 755x1000, 1180x820, 1366x1024, 1000x755, 844x390; no page errors, no overflow, modal fits. ilbot final runs (r1 build): 6 runs × 2–4 lives × 200 weeks, census net 0 in all; after merging main fb367740: 2 lives, 239 weeks, 1729 pieces seen = 1729 located, net 0, her sold 25 → 25 back (max 14 weeks). Remaining: ~1 id per ~4500 pieces in some runs is renumbered (a same-id twin at census; the piece is still located, census net 0 even with fresh mid-week ids tracked) → follow-up: find the source of same-id twins. coop-e2e 59/59 on the merged build (one earlier run 55/60 stuck at the night gate 'Chờ hảo hữu…' = live Worker timing; rerun 59/59 twice). coop-e2e 59/59.

## Follow-ups (not FAIL)
- Cause ledger: review/mem-upgrade (causeAdd/causeQuery) is not on main yet → when it lands, ilLog's line gets its cause id (one field).
- Sắc phong book / seal items (Foreman C): call ilGone(p,e,"lost"|"conf") / ilRob / ilWhere.
- Optional for main: "tự ý soát" penalty road (Foreman D Q5), Hoàng thượng re-gifting from his held pile (heldCap now sends the overflow to the store).
