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

## Test results (15/11, local build, playwright, dev/test/item-info.js)
All 5 viewports 755x1000 · 1000x755 · 1180x820 · 1366x1024 · 844x390: no page errors; dress pick tap = select + strip (no blind wear),
"Mặc" wears, then "Tháo"; slot tap → strip with Tháo; "Mặc bộ này" still gives the verdict; Tư trang bag panel rows = §70 (origin in Lai lịch);
Bên mình pick tile → card with "Cài" (no blind wear); shop picture → card (Tốn row + §70 rows); reward rows tappable → card; event tag → card;
Hội phối đồ tap → strip "Đặt vào …"; other consort's worn slot → card; every card inside the viewport; no horizontal overflow; kit sample §70 renders.
Scan (dev/review/item-info-table.md): before BLIND 5 / NOTAP 3 → after BLIND 0 / NOTAP 0.
Open notes: gift picker grid (jgift) left to review/gift-pick (it reuses §70); pets have their own panel (not items); girlhood chest not on main yet
(will be covered automatically if it uses kitInvGrid / kitReward). BAL.itd.allow=true shows the rank allowance (coordinator design) — the
owner's 08:10Z rule hid it; flip to false if the coordinator prefers.

## Review r1 (review/item-info-r1, 16/11)
- Merged onto origin/main f012058f3 (conflicts: assemble.py list = main's list + jitd.js after jitev; KIT.md §68 + §70 both kept; built files rebuilt).
- Reviewer fix 1: BAL.itd.allow=false (coordinator: owner 08:10Z rule wins; no "hạn mức phẩm ta", no "quá hạn mức").
- Reviewer fix 2: Hội phối đồ strip showed "Bên mình 20 → 41" although the board is not worn → kitItemDetail o.luxItem (Xa xỉ row = "món này N" only), jts passes it. KIT.md §70.2 notes it.
- Tests: item-info.js 5 viewports all pass, 0 page errors; scan BLIND 5/NOTAP 3 → 0/0; Hội phối đồ tap→Đặt vào→Ra mắt places the piece (844x390, 755x1000); old main save (slot 3) loads, every chest item renders §70, 8 more turns, 0 errors; 139 details render in 29 ms; +23 KB index.html.
