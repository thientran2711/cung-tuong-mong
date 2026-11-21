# PR21 — rooms worker (Foreman C #15 session_01D3E3NajnDsKk2KkQgXnroZ), successor of PR20
STATUS 21/11 ~02:30Z: depth 6 (limit 8), START_CTX ~3 % (get_session used_tokens read 0; estimate). Roll line ~28 %, ceiling 60 %.

## Colour fix V3-B "màu tươi" (owner L1637 "Có cách nào cho mấy cái phòng này màu nó tươi tắn hơn không? Game của mình mấy cái màu cũng tươi mà.") — 1 gen, 135 cr
- Builder dev/art/place-rank/prompts_pr21_rooms_bright.py (imports prompts_pr20_rooms_tone) → prompts_pr21_rooms_bright.json + prompts_pr21_bright_<key>.txt (+ .keep) for all 7 Tần rooms (33, 34, 36–40). room_gate PASS ×7, keep_check --sidecar PASS ×7.
- A17 diff vs PR20 TONE v2 (colour/wood/floor words only, A18):
  1. COLOUR LEVEL "soft … gentle, light … never saturated" → "fresh, bright, clear saturated colours like the game UI and the girl in image 2, cheerful daylight … never dull, never muddy, never brownish, never washed-out, never pastel or grey, and never neon or glaring" (the old "never saturated" would contradict).
  2. TONE v2 → TONE v3 = V3-B: pillars/beams/panels/lattices/big furniture lacquered ivory + pale cream with clear pink and jade-green painted flowers and thin gilt lines; pink = silks; only small trims light natural wood; "never a brown or dark-wood room"; white daylight kept.
  3. Card dark-wood names (dark red sandalwood / chestnut-brown huanghuali / walnut-brown elm / reddish-brown jichimu) → "ivory lacquered wood painted with pink and jade-green flowers" (motifs, plaques, chairs, doorways, flowers kept = palace identity).
  4. TẦN level "polished wood with fine carving" → "lacquered wood with fine carving".  5. FLOOR "warm polished wooden floorboards" → "pale blond matt wooden floorboards, light and even, never dark, never glossy".
  Layouts, floor-fraction fix, camera, name-tag strip, refs 1–3 unchanged. Image 4 = strip v2 (pink:4 ivory:1 jade:1), uploaded 0 cr → 1lduM4wr4r.
- TEST room 33 chung-tu-cung-tan-ngu: cpSRLbS0eP → CDN img/_review/place-rank/pr21/chung-tu-cung-tan-ngu-ha-sang.webp. Sheet CDN img/_review/place-rank/pr21/room33-bright-v3b-lbl.jpg (CŨ | MỚI, big labels, model + 135 cr/tấm + TỔNG 135 cr).
- Measured (672×346, Lab): brown share 47.5 % → 8.4 %; L* 58.9 → 72.6 (lighter); C* 17.9 → 18.5; HSV S 27.1 → 24.1 (more ivory area). measure_floor base_c 87.0 → 84.4 % (≥ 82 OK).
- LOOK: no brown wood left — ivory lacquer bed/dressing table/chair with pink plum blossoms, jade cartouches, thin gilt; pink gauze + bedding; same layout (window wall left, doorway left half, bed right half, rack right). Notes (no redraw): floor came out mauve-pink rather than blond; sunlight patches fall from the left windows; overall pink-heavy, saturation a bit below old (ivory surfaces) — if the owner wants "more colour" still, the next lever is the strip/jade share, not wood.
- NOT run: the batch (waiting for owner via the foreman).

## V3-B REJECTED → 0-cr colour grade + prompt v2 (owner 21/11 via Foreman C #17: "không ra một chút gì gọi là Trung Hoa hết trơn, nhìn cứ như là phương Tây ... có một cái màu trầm nó phủ lên, nó cứ bạc bạc bạc cái hình ... tao muốn nó tươi tắn hơn, chứ không có nghĩa là đổi cả cái tông màu ... đổi cái saturate chẳng hạn.") — 0 gens, 0 cr
- prompts_pr21_rooms_bright.py marked REJECTED in its first line (kept as a record; do not use).
- (1) Local grade dev/art/place-rank/room_vivid.py IN OUT {nhe|manh}: luminance-only levels (veil removal) + mean-brightness gamma + gentle S-curve + chroma × k in YCbCr (hue angle kept, less boost on strong colours) + light unsharp mask. No hue shift, wood stays wood.
  nhẹ: sat 1.22 · curve 0.10 · levels 0.4/99.7 % · sharp 35;  mạnh: sat 1.42 · curve 0.18 · levels 0.8/99.5 % · sharp 55.
  Room 33 (old PR20 picture): C* 17.9 → 20.0 → 21.1; HSV S 27.1 → 30.7 → 33.4; L* 58.9 → 60.2 → 60.2.
  Sheet CDN img/_review/place-rank/pr21/room33-vivid-grade-lbl.jpg (CŨ | TƯƠI nhẹ | TƯƠI mạnh, big labels, "0 cr (chỉnh màu, không vẽ lại)"). Files pr21/chung-tu-cung-tan-ngu-tuoi-{nhe,manh}.webp.
  LOOK: same picture, same dark Chinese wood and pink silks; the grey veil is gone; mạnh is clearly richer (wood redder, pinks clearer); no clipping or halos seen at sheet size. If she likes it, the grade can fix ALL drawn rooms at 0 cr.
- (2) Builder prompts_pr21_rooms_vivid.py (LIVE for the next gen): PR20 TONE v2 unchanged (woods, tone, layouts, floor fix, refs); A17 diff = ONLY the COLOUR LEVEL sentence → "rich, clear, saturated colours like the girl in image 2, the same colours as the room in image 1 but fresher: every colour clean, vivid and clearly readable, with crisp contrast; no grey veil, no dull haze and no muted wash over the picture; never faded, never washed out, never grey or dull, and never neon or glaring." Image 4 = 1lduM4wr4r (strip v2). room_gate PASS ×7, keep_check PASS ×7 (one allow line each). No gen.

## Composite test in room 33 TƯƠI nhẹ (owner L1658 via Foreman C #17: "Thử đặt một cái nhân vật mới tạo ngày hôm nay nè, vô trong cái nền tươi nhẹ thử coi.") — 0 gens, 0 cr
- Figures: Tần thu t4 draft 9ZHSjoTNYZ + Phi thu t5 draft mEZp0UIhJQ (both 752×1344 1k drafts, caption text top-left).
- Cut-out 0 cr, local: dev/art/place-rank/cut_plain.py (border-median parchment colour, geodesic background grow thr 22, keep the region holding the centre column → caption dropped, 1 px erode + soft edge). Clean on robe/hair; the sheer blush shawl edges are a little ragged and the gauze reads opaque (parchment shows through it) — fine at stage size. No Magnific remove-background used.
- Stage: dev/art/place-rank/stage_one.py = nf_tags.py live iPad stage numbers (1162×599, figure 438.7 high, feet 69.7 above bottom) at x 421 (in front of the doorway, between dressing table and bed) + soft contact shadow; figure not recoloured.
- Sheet CDN img/_review/place-rank/pr21/room33-tuoi-nhe-ghep-tan-phi-lbl.jpg (two panels Tần | Phi, big labels, "0 cr … TỔNG 0 cr").
- LOOK: both stand on the floorboards at a believable size (head about at the lantern bottoms, a little below the bed canopy top); plum/blush robes read clearly against the dark wood + pink silks of the graded room; the stage crop (iPad shape) trims the room's sides a little.

## 4th grade "rất nhẹ" + composites on rất nhẹ and nhẹ (owner L1659 via Foreman C #17: "Thêm cho tôi một cái màu nhẹ hơn cái tươi nhẹ nữa.") — 0 cr
- room_vivid.py preset ratnhe (about half of nhe): sat 1.11 · curve 0.05 · levels 0.2/99.85 % · sharp 18. Room 33: C* 17.9 → 19.1 (nhe 20.0, manh 21.1); S 27.1 → 28.9 (30.7, 33.4); L* 60.2.
- Sheet CDN img/_review/place-rank/pr21/room33-4muc-tuoi-lbl.jpg (CŨ | TƯƠI rất nhẹ | TƯƠI nhẹ | TƯƠI mạnh, 0 cr). File pr21/chung-tu-cung-tan-ngu-tuoi-ratnhe.webp.
- Composite sheet CDN img/_review/place-rank/pr21/room33-ghep-ratnhe-nhe-lbl.jpg (2×2: rows Tần t4 / Phi t5, columns nền rất nhẹ | nền nhẹ; same cut-outs + stage numbers as before, 0 cr).
- LOOK: rất nhẹ sits clearly between CŨ and nhẹ (veil lifted, colours only a little richer); with the figures the difference between rất nhẹ and nhẹ is small, the robes read well on both.
