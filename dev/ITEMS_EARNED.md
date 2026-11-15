# ITEMS EARNED — đồ phải có được, không tự rơi xuống (owner 11/14 19:30Z)

Rule: every item (veil, outfit, hairpin, medicine, antidote, gift, tool) is OBTAINED: tự làm (craft, via the lesson/works
mini-games), mua (merchant, Nội vụ phủ, lén mua ngoài cung) or nhận (ban thưởng / tặng). Same for NPC consorts (two-way).
Branch: review/items-earned (main + review/balance, where the j70/j92/j83 logic lives). Code: dev/build/jveil.js, dev/build/jearn.js.

## Audit of every grant (code as of review/balance 093a869a + main e9e2248f)

| # | Where | What is granted | Before | Verdict / now |
|---|---|---|---|---|
| 1 | j70 PEND.j70scar "Che mạng khi ra ngoài" | face veil after hủy dung | **free toggle** (`p.scar.veil=1`), NPCs never veiled | **FIXED (jveil)**: veil is an item `mc<P><g>` / `mcnt`; craft · buy (Nội vụ phủ / lén ngoài cung) · gift (xin HH/TH, friends, Hoàng thượng); NPCs same rules |
| 2 | j92 `wdOf` default `{from:"base"}` | worn trâm + y phục of her CURRENT phẩm | **free, re-created out of nothing** after demotion, confiscation, taking off, loss of a ngự tứ | **FIXED (jearn)**: starting kit = real items (Nội vụ phủ issue on entering the palace) + 1 spare Thường y phục for the player; afterwards replaced only from her own chest; if no y phục at all, Nội vụ phủ issues one plain y phục (recorded "Nội vụ phủ cấp") so nobody stands unclothed |
| 3 | j92 `wdCands` "phẩm phục of her own rank is always at hand" | phantom outfit for Tự chọn đồ / Chải chuốt | **free, infinite** | **FIXED (jearn)**: only items she holds (+ the mourning issue below) |
| 4 | j92 "Tháo y phục" | puts the free base outfit back on | free | **REMOVED** (change y phục by wearing another; Tháo trâm stays) |
| 5 | j92 wdMonth promotion: "Nội vụ phủ đưa y phục theo phẩm mới" | 1 y phục + 1 trâm of the new phẩm | issue on promotion | KEEP — a receive (ban theo phẩm), tied to an earned promotion |
| 6 | j92 quốc tang `y_tang` candidate | white mourning clothes | free issue | KEEP as a Nội vụ phủ issue to everyone (now a real item, src nvp) |
| 7 | j92 `wdNpcInit` (1–2 items "base0") | NPC consort's own garments | once per NPC | KEEP — her dowry / starting kit (nobody looks poor) |
| 8 | j8 bestow (Hoàng thượng), j92 bestow garments / ngự tứ, j97 rare rewards, j67 reward67 | items | earned rewards | KEEP — ban thưởng |
| 9 | j8 Thái hậu / Hoàng hậu ban (th≥60 / hh≥50) | tonics, hairpins, silk | favour gifts | KEEP — ban thưởng |
| 10 | j24 visitors' gifts, j8 giveTo, j83 wkGive | items, works | gifts | KEEP — tặng |
| 11 | j2/j8 gánh hàng rong, j29 chợ đen, j83 IROUTE đồ cấm | items | paid | KEEP — mua |
| 12 | j83 works (tranh, khăn thêu, túi hương…) | handmade works | lesson mini-game | KEEP — tự làm |
| 13 | j70 "Mua Ngọc dung cao" / NPC buys cure 120 bạc | cure flag (no item) | paid | KEEP — mua (could become an item later; no balance change needed) |
| 14 | j70 "Xin Thái hậu ban Tuyết liên" | cure | gift with odds | KEEP |
| 15 | j8 `ACT.poison` (Hạ độc) without Hạc đỉnh hồng | weak poison (Sức −35..64) | **tool embedded in the act**, costs only Đức | NOT CHANGED — balance-sensitive (rival poisonings drive the early-death target). Recommendation for the balance worker: add `bac:-20` ("mua thạch tín") to the item-less dose, same for NPCs; measure early death before shipping |
| 16 | j8 `ACT.frame` (Vu oan, hình nhân bùa ngải) | the hình nhân | made inside the act (Đức −5) | KEEP — made by her people during the act |
| 17 | j8 starting chest `inv:[]` | nothing | — | OK (starting kit = the worn outfit + spare y phục) |

## The veil (jveil)
- Items: `IT["mc<P><g>"]`, P 0..8 = j92 phẩm scale (0 cung nhân … 8 Hoàng hậu), g 0..3 = Thường / Tinh phẩm / Trân phẩm / Tuyệt phẩm; `IT.mcnt` = Mạng ngự tứ (grade 4, by right, cannot be sold/given). Art = existing paintings: P0 Thường `veil-silk-ivory`, P0 Tinh+ `veil-silk-pink`, P1..P8 `veil-t1..t8`; ngự tứ follows her rank. kitItem tile uses the same painting.
- Worn: `p.vl` (one entry); `p.scar.veil` mirrors it so j70 effSac/scarOf and the jk2b overlays keep working. Healed → the veil goes back to the chest.
- Grade = how much of the wound it hides: Sắc lost while veiled = scar.d × `VL.cover` [2/3, .6, .53, .47, .4] (Thường = the old free veil).
- Vượt phẩm: a veil with P above hers makes the outfit Vượt phẩm (j92 status, hidden until remarked; remarks reveal the veil's phẩm; a successful hặc confiscates it). Ngự tứ never.
- Ways (her: Tư trang › Mạng che mặt, and the weekly scar card):
  - Tự tay kết (2 khắc, Sức −10): embroidery mini-game `playArt("theu")` (else hoa); q = score 0..10 + Thêu bậc + vật liệu; vật liệu 0 / 12 / 45 bạc picks the band (sa → P0; bạc, trai → P1..4; kim tuyến, ngọc → P4..7); phẩm unknown.
  - Đặt ở Nội vụ phủ (1 khắc): her own phẩm (Thường/Tinh/Trân) + plain sa; price `VL.base[P] × gMul[g]`; phẩm known.
  - Mua lén ngoài cung (1 khắc, needs ma ma / thái giám / cung nữ loyal ≥40): P−1..P+2, ×0.8 price, phẩm unknown, leak 12% → Danh −3.
  - Xin Hoàng hậu / Thái hậu ban (1 khắc): odds 15 + hh/2 or 10 + th/2; Tinh phẩm of her phẩm; fail → favour −2.
  - Friends (thiện cảm ≥50) send a Thường veil (12%/month); Hoàng thượng's bestowal on a scarred, unveiled consort adds a Trân phẩm veil (35%).
- NPCs monthly (same functions): wear the best they believe fits (Kiêu ngạo/Tham vọng may go one phẩm over); else buy at Nội vụ phủ (45%), craft (30% if Thêu/Hoa ≥1), ask HH/TH (15%).
- Old saves: `scar.veil=1` without an item → a Thường veil of her own phẩm, worn, phẩm known (art unchanged).

## Knob impacts (for the balance worker)
- Player veil: before free and instant; now a 1-khắc errand + ~6–35 bạc (or 2 khắc + Sức 10 crafting). Only matters while scarred (4–14 weeks). Small.
- NPC veils: before NPCs never veiled; now most scarred rivals veil within 1–2 months → their effSac during a scar is higher by ~1/3 of the scar's Sắc loss. Slightly stronger rivals while scarred. Knobs: `VL.npcBuy/npcCraft/npcAsk/giftP/empP`, `VL.cover`.
- Wardrobe: no free outfit after demotion/confiscation → a demoted player whose chest only holds higher-phẩm items may be Vượt phẩm until she buys/gets lower items (Tự chọn now chooses only real items). Starting kit + spare keeps the common case unchanged. No WD knob changed.
- Not changed: poison/frame acts (see #15/#16), all ban thưởng chances.

## Found on the way (not mine, reported)
- review/balance lacks j92cat (collection counter): the Tư trang wardrobe block threw `wdColInfo is not defined` and vanished. jearn adds a stand-in (`wdColInfo` counts held items) until j92cat lands.
- Stage figures (jk2b kitFigFx): the veil overlay on the room-scene figure can sit beside the face (offset), while portraits are right. Kit owner's area (fit/offset on stage figures).
