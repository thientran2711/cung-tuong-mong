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
