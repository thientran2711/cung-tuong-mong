# PROGRESS review/item-info (owner 15/11 "Khi bấm vào món đồ không thấy hiện thông tin món đồ")

## KIT PART (§70) — API for review/gift-pick and every other item cell
File `dev/build/jitd.js` (assemble: after jitev, before jtoil). Full doc: dev/kit/KIT.md §70.
- `kitItemRef(ref)` — ref = "key" | {k} | S.inv entry | kitInvGrid tile {g} | {ix} | {wdSlot} | {e}; + `who` for another person.
- `kitItemDetailRows(ref, o)` — kit rows Phẩm · Loại · Hợp đề · Được · Mất · Xa xỉ · Lai lịch · Ghi chú. o.lead = rows first (price), o.note = extra Ghi chú.
- `kitItemDetail(ref, {acts, size:"md"|"lg", cls:"kidet-strip"})` — the block (picture, name in grade colour, grade chip + kind, rows, act buttons).
- `kitItemCard(ref, {acts, note, closeModal})` — floating card over anything; ✕ / outside / Esc.
- `kitItemTap(ref)` — attributes for a read-only tile → tap opens the card. `data-kidpick="wear"|"use"` → card with the one act.
- `kitItem({sel:true})` — selected tile (gold ring).
- kitItemRows / wdItemRowsE are now this row set (old callers unchanged).
- gift-pick: picture grid tile tap → `kitItemDetail({e}, {cls:"kidet-strip", acts:[your Tặng button]})` beside the grid, `sel` on the tile.

## Done
- jitd.js kit part + KIT.md §70 + kit page sample §70 + BAL.itd.allow (jbal2).
- jinv: kitItemLists (facts as lists), kinvOpen rows with entry (origin → Lai lịch), Bên mình pick tiles → card, shop card → kitItemDetail.
- jwdinv: wdItemLists, wdSlotOpen pick tiles → card, wdFabOpen rows. jecon econWkOpen rows. kinvOpenWork rows.
- jtoil dress pick: tap = select + strip (Cài / Mặc / Đeo / Tháo), no blind wear; Mặc bộ này / Giữ đồ hôm qua unchanged.
- j93 kitReward rows + shelf tiles tappable (jfx kgItem carries k). jitev kitItemTag tappable. jtsb demand tile tappable.
- jts Hội phối đồ: tap = select + strip "Đặt vào …" / "Bỏ ra". jveil picker: picked veil = kitItemDetail. jk2b other people's worn slot → card.

## Tests
`node dev/test/item-info.js <url> <outdir> [sizes]`; scan `node dev/test/item-info-scan.js` (family table dev/review/item-info-table.md).
