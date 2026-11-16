# PROGRESS — review/item-ledger (ITEM CONSERVATION core law + ITEM ledger)

Spec (owner verbatim, dev/OWNER_DECISIONS.md on the handover branch): "16/11 13:30Z" (3) ITEM CONSERVATION, "16/11 13:40Z" ONE LEDGER (items part),
"16/11 13:42Z" (cuốn sổ = core rule), "16/11 13:20Z" (4)(5) (sắc phong / confiscation via atonement with a minimum wait). Foreman D INBOX s17 item (2)+(a).

## Done
- `dev/build/jil.js` (new, last in assemble.py): ONE item-location rule `ilGone(p,e,how)` + ledger `S.il` {log, box, at (census), net}.
  Places: chest / worn / veil / pawnshop / box "mkt" (market) "nvp" (Nội vụ phủ store) "cct" (tang vật) "emp"/"th" "srv" (servant) / open jlost case / pending gift dialog.
  `ilGuard` wraps every remover (sellItem, wkSell, wdSell, econSell, wdPawnMonth, vpAccuse, wdAccuse(+jveil), inspect, search, thái y npcMonth, tsbBurn,
  wkGive, giveTo, itemAct, stipGoods, stipRestore, eitPilfer, rivalsMonth, empAct). Weekly census = safety net (a piece with no route goes to the store, counted in `net`).
  Returns: sold → her Nội vụ phủ tray (kitShop tile "Đồ cũ của ta", BAL.il.shopP/week) or a ransom visit by the ceiling (BAL.il.retW, PEND ilback), unpaid → again later;
  confiscated → atonement dialog after BAL.il.confW (PEND ilconf, chép kinh sám hối); broken/burnt → mended back; dead person's effects → store → resold.
  NPCs same rules (rebuy own / bought by another consort). Tư trang › Việc: "Đồ ở nơi khác" under "Đồ thất lạc" (kitItem + kitChip + kitFacts).
- Inline fixes (no new object, the same piece moves): j8 giveTo/giftin (refused gift back to giver, seized tainted → cct), plantItem, night1 + vpAccuse confiscation,
  j28 NPC discards a poisoned gift → cct, j92 ngự tứ lost → lost case / broken → mended, jts borrowed dress, jevb gift return, jtoilr gift-back to the person,
  jty cướp y phục → robe in the plotter's chest (lost case, findable), jlost (never-found → hidden in a chest; expiry keeps it; owner dead → store; lostReturn never drops).
- Higher-rank room (jlost): "Tâu Hoàng thượng xin soát cung", locked until BAL.il.empEv REAL evidence (case evidence + evidence on the holder); NPC owners same rule.
- Co-op: a gift to the friend's entry travels inside the existing "res" message (`items`), lands in her chest; ledger lines on both sides. No worker change.
- BAL.il in jbal2.js (all numbers).

## Tests
- `dev/test/item-ledger.js` 9 scenarios: PASS at 755x1000, 1180x820, 1366x1024, 1000x755, 844x390 (no page errors, no overflow, modal fits).
- `dev/test/lost-items.js` PASS (1180x820, 755x1000). `dev/test/coop-e2e.js` 59/59 (incl. solo + old save loads).
- Old save: S.il absent → census gives every piece an id, nothing moves (scenario 8).
- `dev/measure/ilbot.js` 4 lives × 200 weeks: 6021 durable pieces seen, 6015 located at the end; census net 4 (2 kinds: wkb_theu_s4, vongngoc_r1 — kept in the store, not lost; route open).
  Her sold 46 → back 46 (tray 46, ransom 0 paid of 1 asked), mean 7.6 weeks, max 31. NPC sold 4 → bought by another 4.

## Open
- 6 ids "missing" in the bot end check vs census (likely id re-number on duplicate copies; pieces are not lost: net catches them). Next: dbg on long runs.
- Sắc phong book + seal do not exist as items yet; Foreman C calls `ilGone(p,e,"lost"|"conf")` / `ilRob` when they land.
