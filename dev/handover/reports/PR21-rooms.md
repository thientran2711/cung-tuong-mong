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
