# PR20 — rooms art worker (Foreman C ROOT-66 session_01PEhRbw4KJerwm5MeJ2pquL)
STATUS 20/11 ~05:20Z: depth 1 (limit 8), START_CTX ~3 % (get_session used_tokens read 0; estimate). Roll line ~28 %, ceiling 60 %.

## Room 32 wired (owner Lượt 996 "Tiếp đến là cái phòng 32. Ok Đạt.") — 0 cr
- VX7s33bMMU: CDN pr19/khai-tuong-cung-tan-v2-ha-sang.webp → img/_review/place-rank/pr13/khai-tuong-cung-tan-ha-sang.webp (same as 31/35: copy + cdn_sync.py). No earlier pr13 file existed (404) → nothing overwritten. CDN md5 72a0fd3d75dde4b25c1214f3b1e85815 = pr19 raw, 2688×1386.
- LOOK: right picture — daybed + lotus/crane screen left half, vase doorway centre-right, armchair pair at the right windows, pink/ivory/jade, white light. Old notes stay: floor glossy, a bit more floor than 31/35.
- Live img/<key>-ha-sang.webp not swapped (as rooms 24–31/35: going live is MAIN's wiring step).

## PREPARED, NOT GENERATED (waiting for owner go via the foreman) — dev/art/place-rank/prompts_pr20_rooms.py
- Run: `python3 dev/art/place-rank/prompts_pr20_rooms.py` → prompts_pr20_rooms.json {r3334, batch2} + prompts_pr20_<key>.txt. room_gate PASS ×7 (guard + room_gate.py per txt).
- SET r3334 (rooms 33 chung-tu-cung-tan-ngu, 34 chung-tu-cung-tan): A17 diff vs batch 1 = ONLY the LESS-FLOOR FIX of 32b (FR "four fifths / one fifth" → "five sixths / one sixth" + CAMERA CLOSE sentence). Layout, refs (33 M2X, 34 M3), words otherwise the same. Not changed: arch doorway of 34 (owner did not raise it; A18). 2 gens = 270 cr.
- SET batch2 (5 Tần chính điện rooms with cards; recipe = 32b): each its own layout —
  ham-an-cung-tan reception 3w win L (M3X), daybed centred, begonia doorway right side wall · dien-huy-cung-tan-ngu bedroom 2w win R (M2), bed left half · dien-huy-cung-tan reception 2w win L (M2X), daybed left half, side chairs facing · vinh-hoa-cung-tan-ngu bedroom 3w win L (M3X), bed right half · vinh-hoa-cung-tan reception 2w win R (M2), daybed right half. Woods/doorways/chairs/flowers from CARD_HA/DH/VH. 5 gens = 675 cr.
- Gen settings when the go comes (PR19 METHOD): images_generate gpt-2-6 2k 2688×1386, folder ba4aecfe-efce-47e2-b53f-30d292091886, refs from the json, then measure_floor.py (target base ≥ 82 % H), webp q88 pr20/<key>-ha-sang.webp, labelled sheet, LOOK, cdn_sync, ledger.
- Cost: r3334 270 cr · batch2 675 cr · both 945 cr. Remaining after that (Tần TM ×2 needs a card; Phi 12; Quý phi 12) ≈ 26 rooms ≈ 5–6 batches ≈ 3 500 cr; + Từ Ninh ~2 + ~35 place scenes ≈ 5 000 cr.
- Open: Thừa Minh has no palace card (foreman); 34 arch doorway (owner never raised it).

## s62–s65 in the white-light room (ROOT-67, owner "Đặt thử 4 cô này vào cái phòng tầng mà mình mới vừa vẽ theo cái phong cách ánh sáng trắng thử coi.") — 0 cr
- Room = newest white-light Tần room = room 32 Khải Tường cung chính điện reception (khai-tuong-cung-tan, VX7s33bMMU, approved).
- Cut-outs (F4): s62 nVsrRMPYQD · s63 kseVFSr16B · s64 JNChlRROq4 (Dịu dàng) · s65 jUoe5yJLD0 (Đoan trang), all thiếu nữ. Composer sheet_row.py → nf_tags.py (live iPad stage numbers: same figure height + feet line as the game).
- Sheet CDN img/_review/place-rank/pr20/room32-s62-65-lbl.jpg (2324×1418), with big labels: face id · group · thiếu nữ · room name in the header.
- LOOK: all 4 girls stand on the floor strip in front of the daybed, doorway and armchairs, at a believable scale against the furniture, with clean edges. In the white light their robe colours read true (blue, ochre, pink/lavender, green/peach). Rooms 33/34 + batch 2 still HOLD.

## DRAFT: room colour TONE = occupant's outfit tone (owner on room32 composite; ROOT-67 proposal Lượt 1056, waiting for her OK) — 0 cr, NOT LIVE
- Owner verbatim: "Ok, phòng ốc màu sắc ổn … Cái màu của căn phòng nó cũng phải giống với cái màu của cái bộ trang phục, tức là cùng một cái tông màu … mình có cách nào mình ghi trong cái prom để mình mô tả rằng là cái căn phòng nó sẽ có cái tông màu giống như cái nhân vật không, đồng thời phải có ánh sáng trắng."
- Sentence (inserted right after the RANK COLOUR sentence): " COLOUR TONE (owner: the room has the same colour tone as the outfit of the woman who lives here): the whole room keeps the same lightness and softness as her clothes, like the colour strip in image 4: fresh but calm, medium saturation, never brighter, darker or more saturated than her outfit, never vivid or neon, never dusty or greyed; the wood, the silks, the curtains, the cushions and the ornaments all stay in that one mood, the pink of image 4 as the main colour with its ivory and soft jade-green partners; bright neutral white daylight over everything, no warm golden or amber cast." (wording = B14 tone level + owner's white light)
- Swatch maker dev/art/place-rank/room_tone_swatch.py (PIL, no text): `python3 room_tone_swatch.py OUT.png '#E3A3B8:3' '#F3EBDD:2' '#A8CDB8:1'`. Default Tần strip = rank pink #E3A3B8 + ivory #F3EBDD + soft jade #A8CDB8 → CDN img/_review/place-rank/pr20/tone-swatch-tan-t4.png. Upload with creations_upload_image (0 cr) → image 4.
- Slot-in: dev/art/place-rank/prompts_pr20_rooms_tone_DRAFT.py imports prompts_pr20_rooms (r3334 + batch2), adds TONE + refs [G9, G9, guide, SWATCH_ID_TBD]. A17 diff = that one sentence + image 4; room gate PASS ×7. Sample prompt: prompts_pr20_tone_DRAFT_sample_chung-tu-cung-tan.txt. The live builder prompts_pr20_rooms.py is unchanged.
- Open for the owner/foreman: (1) a Tần chính điện room is shared by whoever holds the rank, so the strip is the room's rank palette; to match one particular girl, put HER outfit pair hexes in the strip (and the sentence's "pink" → her main colour). (2) The recipe already has a "COLOUR LEVEL … same level as the girl in image 2" line; TONE adds the explicit outfit match + strip.

## TONE method LIVE + rooms 33/34 redraw (owner GO "Ok, tiến hành vẽ các căn phòng thử theo cách mới coi." via ROOT-67; default rank strip) — 2 gens, 270 cr
- Live builder dev/art/place-rank/prompts_pr20_rooms_tone.py (= DRAFT + swatch id 3zKqcUwREY, uploaded 0 cr). Room gate PASS ×7. check_store has no room scope; room_gate.py is the room store gate (as for every PR19 room).
- 33 chung-tu-cung-tan-ngu kseMweS16B · 34 chung-tu-cung-tan Xm9yC6fBfo → CDN img/_review/place-rank/pr20/<key>-ha-sang.webp. Sheet pr20/rooms33-34-tone-lbl.jpg (CŨ | MỚI, big labels).
- measure_floor base_c: 33 83.5 → 87.0 %, 34 80.1 → 86.1 % (target ≥ 82 %).
- LOOK: camera closer, narrower floor; one unified soft tone (mauve-pink walls, pink + ivory silks, jade accents), white light. Notes (no redraw): floor still a little glossy; in 34 the right armchair is cut by the frame edge; 34 doorway still an arch (not raised by the owner, A18).

## BATCH 2 (5 Tần chính điện rooms, TONE method; owner GO via ROOT-67) — 5 gens, 675 cr
- 36 ham-an-cung-tan mEZiKiwhJQ · 37 dien-huy-cung-tan-ngu s7IB680l8e · 38 dien-huy-cung-tan EbYGsNRuuO · 39 vinh-hoa-cung-tan-ngu nVsx8bNYQD · 40 vinh-hoa-cung-tan p8y7ET2ehw (room numbers 36–40 = working numbers). CDN img/_review/place-rank/pr20/<key>-ha-sang.webp; sheet pr20/rooms-batch2-tan-tone-lbl.jpg (big labels: no · palace · room type · TẦN).
- measure_floor base_c: 36 84.8 · 37 81.4 · 38 88.3 · 39 81.0 · 40 88.3 % (target ≥ 82).
- LOOK: all 5 follow their written layouts (each different), one soft pink/ivory/jade tone, white light. Notes (no redraw): under the shared tone the palace woods (elm / huanghuali / jichimu) all read as a similar reddish brown, so palace identity now rests on the flowers, doorways and chairs; 37/39 floor just under target; 40 daybed near the centre instead of the right half; 39 has an extra pair of armchairs at the left; floors still a little glossy.
- Credits this session: 270 + 675 = 945 cr (balance before 85 567).
