SẴN SÀNG KIỂM fb67d4adfbdc04a6b1071bb6c2244d236600debd
# item-ledger (Foreman D worker, opus) — ITEM CONSERVATION core law + ITEM ledger
Branch review/item-ledger @ fb67d4ad (from origin/main e9c6021d). Details: dev/PROGRESS_review-item-ledger.md on the branch.
START_CTX ~5 % (1M window); finished at ~31 % (only push + report remained at the +25 % mark).

## Step 1 — whole-game audit: every place a piece left its holder (before → after)
| Place | What happened before | After (jil route) |
|---|---|---|
| j8 sellItem, j83 wkSell, j92 wdSell, jecon econSell | gone | market box → her tray / ransom visit by the ceiling; NPC rebuy / another buys |
| j92 wdPawnMonth (pawn overdue) | gone | market box (same returns) |
| j8 vpAccuse, night1 Emperor frown, j92 wdAccuse over, jveil veil, j8 rivalsMonth HH confiscation, empAct her confiscation | gone | Nội vụ phủ store (conf) → atonement after BAL.il.confW |
| j8 giveTo: new object for receiver; tainted caught → pop; to emp/th | original vanished; tainted gone | same piece moves (id kept); tainted → Cung Chính ti (tang vật); emp/th → held by them |
| j8 PEND.giftin "Trả lại quà" / thái y finds taint | gone | back to the giver / tang vật |
| j8 plantItem (new object; caught → gone) | original vanished | same piece planted; caught → tang vật |
| j8 inspect, search, itemAct test, jthaiy npcMonth, j28 NPC discards poisoned gift | gone | tang vật (cct) |
| j92 wdNtMonth / PEND.wdnt ngự tứ "bị mất" / "bị làm vỡ" | gone | lost case (sits in someone's chest) / Nội vụ phủ mends, back after BAL.il.fixW |
| jtsb tsbBurn (fire) | gone | salvaged + mended, back (QUESTION 2) |
| jeitem eitPilfer (servant pockets goods) | gone (re-created if caught) | in the servant's hands (srv); caught → back (no duplicate) |
| jty cướp y phục (her + NPC) | robe gone | robe in the plotter's chest (lost case, kept, recognised when worn) / unknown thug → lost case |
| jlost "never found" | gone | hidden in someone's chest (Soát rương / tra xét find it); no holder → Nội vụ phủ |
| jlost expiry (hidden piece deleted), owner dead, lostReturn with closed case | gone | stays in that chest / store / owner |
| jts borrowed dress (new objects; lender dead → gone) | vanished | same piece moves; lender dead → her effects (store) |
| jevb gift return, jtoilr gift-back | new object / gone | same piece moves to the person thanked |
| j83 wkGive to emp/th | gone | held by Hoàng thượng / Thái hậu |
| jstip stipGoods NPC overflow, stipRestore | gone | durable ones → Nội vụ phủ stock (store); consumables used up |
| NPC death (alive=false, chest kept on a dead object) | unreachable | effects → store "di vật" → resold to market (anyone may buy) |
| jcoopworld gift to the friend (proxy chest rebuilt empty) | vanished | travels in the "res" message, lands in her chest |
| consumables used/eaten/melted/perished (useItem, takeItem, wkPoison, dishes, ice, tea, tonic…) | used up | unchanged: not "lost" (ilDur) |
Scan scripts: dev/measure/ilbot.js (bot), dbg Proxy tracer (every splice/assign/slot overwrite with its stack, used to find the unrouted ones).

## Step 2 — ONE rule
dev/build/jil.js: `ilGone(p,e,how)` (one routing rule, numbers BAL.il), `ilGuard` on each remover, ledger S.il.log [week,id,item,from,to,how], weekly census
(every piece has an id; vanished without a route → store + `net` count), `ilAudit()` (main can answer "where is X" from a loaded save). API for others:
`ilGone(p,e,"lost"|"conf"|"sell"|"evid"|"fix"|…)`, `ilRob(p,e,by)`, `ilWhere(e)`. Foreman C title system: sắc phong book/seal → call these (they don't exist as items yet).
Cause ledger (b): not touched; when review/mem-upgrade lands, ilLog lines can carry its cause id (one field).

## UI (kit only)
kitShop tile in the Nội vụ phủ tray, PEND dialogs with §64 item picture (IEV_PID ilback/ilconf), Tư trang › Việc "Đồ ở nơi khác" (kitItem + kitChip + kitFacts),
jlost act card "Tâu Hoàng thượng xin soát cung" (pbtn). KIT REQUEST: none.

## Tests
item-ledger.js 9 scenarios PASS at 755x1000, 1180x820, 1366x1024, 1000x755, 844x390 · lost-items.js PASS · coop-e2e 59/59 (solo + old save load) ·
ilbot 4×200 weeks: 6021 durable pieces, census net 4 (kept in store), her sold 46 → 46 back (mean 7.6 w, max 31), NPC sold 4 → 4 bought; no page errors.

## QUESTIONS (design beyond the owner's words — defaults chosen, not asked)
1. Consumables used up (food, medicine, poison, incense, tea, charcoal, ice, sewn cloth, letters, story/quest pieces) are exempt — "used", not "lost". OK?
2. Fire (Phóng hỏa kho đồ) now only damages: Nội vụ phủ mends the piece back in 2–4 weeks. Keep, or let fire truly destroy (ash still in the ledger)?
3. A dead consort's effects go to Nội vụ phủ and are later sold on (she may meet them in her tray). Alternative: to her children / family.
4. The tray has a return chance each week (owner said "weekly shop"); the code's tray restocks monthly — returned pieces join it any week.
5. Searching a higher-rank room is simply locked without the decree (no "trouble" road for trying anyway). Add a "tự ý soát" road with a penalty?
## Open
6 ids missing at the bot's end check vs the census (not lost — the net keeps every piece; likely id re-numbering on duplicate copies) → dbg next round. 2 net kinds (wkb_theu_s4 recipe book, vongngoc_r1) → find their remover.
