# ROOMPF1 — next room batch of 5 as ChatGPT prompt files (Foreman C ROOT-B8 session_01D3E3NadxEFd7mXzQAPmzNG child)
STATUS 22/11 ~00:55Z: depth 8 (limit 8). START_CTX ~3 % (get_session used_tokens read 0; estimate). Roll line ~28 %, ceiling 60 %. Finished well under it.
Owner orders: L2291 "tranh phòng … làm tiếp đi"; L2293 "vẫn cứ giữ phong cách cũ … đừng có đổi gì hết" (old in-game room style). Method A53: no Magnific drawing, 0 gens, 0 cr.

## Done
- New batch builder dev/art/place-rank/prompts_roompf1_M2294.py (→ prompts_roompf1_M2294.json). It only ADDS rooms and changes no existing builder (A55). It imports the live chain pr19_batch1 → pr20_rooms (floor fix) → pr20_rooms_tone (TONE v2) and uses their helpers verbatim, plus the PR21 COLOUR LEVEL 'rất nhẹ' (rule L28).
- 5 prompt files in dev/handover/prompts_L2095/, each with its own code in the CAPTION (A56; MA_HINH.json appended):
  | code | room | walls / windows / guide | layout |
  |---|---|---|---|
  | M2294-11 | thua-minh-cung-tan-ngu (Tần bedroom) | 3w, windows RIGHT, M3 | bed centred (pr19 bed3R) |
  | M2294-12 | thua-minh-cung-tan (Tần reception) | 2w, windows LEFT, M2X | daybed right half, fan doorway left half (pr19 rec2L) |
  | M2294-13 | khai-tuong-cung-phi-ngu (Phi bedroom) | 3w, windows LEFT, M3X | bed right half, vase doorway left half (KT Tần bed = 3w R centred) |
  | M2294-14 | khai-tuong-cung-phi (Phi reception) | 2w, windows RIGHT, M2 | daybed left half, vase doorway right half (KT Tần rec = 2w L, daybed right) |
  | M2294-15 | chung-tu-cung-phi-ngu (Phi bedroom) | 3w, windows RIGHT, M3 | bed centred, cracked-ice doorway in the left wall (CT Tần bed = 2w L, bed right) |
  The 3-wall and 2-wall rooms alternate, continuing from room 40 (2w).
- Gates: room_gate PASS ×5 (builder guard + `room_gate.py --json`). keep_check sidecars `.keep` PASS ×5 (A38). Bases are the clean PR20 TONE v2 files prompts_pr20_tone_vinh-hoa-cung-tan{-ngu,}.txt. Every dropped phrase has an allow line with a reason: COLOUR LEVEL rất nhẹ (L28) / Tần→Phi rank swap / own room (other palace, own layout L19). No common-block phrase was dropped. check_store has no room scope; room_gate is the room store gate.
- ATTACH list dev/handover/prompts_L2095/M2294_ATTACH.md: 4 pictures per file, in order. Local files are in dev/handover/prompts_L2095/refs/rooms/ (the exact Magnific refs of the old recipe, downloaded with creations_get, a read only):
  image 1 anh1_tam_cung.jpg (gOmYI7iSXO) · image 2 anh2_cung_nu_m09.jpg (EbYJzsMuuO) · image 3 one of anh3_M3 / M3X / M2 / M2X (cpS5YIl0eP / 1ldYySkr4r / 4RFIyNR9Aa / 8aiwqQTIrU) · image 4 anh4_mau_tan_t4.png (1lduM4wr4r) or anh4_mau_phi_t5.png (NEW, room_tone_swatch.py '#A88BCB:4' '#F3EBDD:1' '#A8CDB8:1', 0 cr, not uploaded).
- After she draws: grade with `room_vivid.py IN OUT ratnhe` (L28, 0 cr).

## A17 diff (vs the last approved recipe = PR20 TONE v2 + PR21 CL rất nhẹ)
1. Tần Thừa Minh: the same Tần words. NEW **CARD_TM** (Thừa Minh never had a palace card). These are the ONLY new words in the batch. They follow the card template of CARD_HA/DH/VH word for word, and each slot was chosen so it repeats no other palace: osmanthus (hoa quế) · pairs of mandarin ducks among water reeds · warm amber-brown camphor wood with small mother-of-pearl inlays · spindle-backed armchairs with a straight top rail · fan-shaped doorway in a lattice partition of step-patterned frets. **Needs the owner's OK**. If she wants another flower or wood, only the card line changes.
2. Phi rooms: the pr20 bed/rec helpers verbatim, with rank swaps only:
   - occupant "a Phi (an imperial consort of the fifth rank, below a Quý phi)"
   - RC4 → RC5: B24 t5 lavender-violet #A88BCB, words of the approved RC9[5]. The Tần line's "no purple" becomes "no pink" (purple = the Phi's own colour, pink = the t4 neighbour).
   - LUX4 → approved RANK['phi']['lux'] words
   - "soft pink" → "soft lavender-violet"
   - TONE "the pink of image 4" → "the lavender-violet of image 4"
   - image 4 = the Phi strip
3. All files: COLOUR LEVEL = the 'rất nhẹ' sentence (L28). + CAPTION code line.

## Found (for the foreman, not fixed: not my builder)
- prompts_pr21_rooms_vivid.py defines CL_NEW TWICE. The second line (the "fresh and vivid … saturated" wording from before L1669) overrides the 'rất nhẹ' one. Running it prints the wrong COLOUR LEVEL.
- Its committed prompts_pr21_vivid_*.txt files hold TWO full prompts back to back (~13.5k chars).
- The module also rewrites its json/txt files on import (I imported it once by mistake and reverted those files with git checkout). My builder hard-codes the 'rất nhẹ' sentence instead.
- Fix = delete the second CL_NEW line and rebuild. That is the foreman's call (A55).

## Remaining rooms after this batch
- Phi ×9: Chung Tú rec · Hàm An bed + rec · Thừa Minh bed + rec · Diên Huy bed + rec · Vĩnh Hòa bed + rec
- Quý phi ×12: Khải Tường, Chung Tú, Hàm An, Thừa Minh, Diên Huy, Vĩnh Hòa × bed + rec
- Từ Ninh ~2
- Trường Xuân Tần/Phi/QP versions (Q1, last)
- ~35 place scenes
- Next batch = Phi CT rec, HA bed + rec, TM bed + rec → codes from M2294-16 (or a new Lượt code).

## Cho chủ (VN)
- Lượt 2294: 5 prompt phòng mới (M2294-11..15), giữ y phong cách phòng cũ: Tần Thừa Minh ngủ + khách, Phi Khải Tường ngủ + khách, Phi Chung Tú ngủ. 0 cr.
- Mỗi file đính 4 hình theo thứ tự trong M2294_ATTACH.md (thư mục refs/rooms/). Chỉ có thẻ cung Thừa Minh (hoa quế, uyên ương, gỗ long não) là chữ mới, chị duyệt giúp.
- Còn lại: Phi 9 phòng, Quý phi 12, Từ Ninh ~2, Trường Xuân, ~35 cảnh nơi chốn.

Commit: see git log "ROOMPF1".

## L2296 Magnific order (relayed by ROOT-B8 00:56Z: "bạn tự làm bên mặt đi") — BLOCKED, 0 gens, 0 cr
- Balance checked: 3 015 079 cr available (stop line 60 000).
- 1st call refused by the session permission check (auto-mode classifier: "Destructive or Unwanted Actions"). I did NOT retry or work around it. The call:
  images_generate mode gpt-2-6, resolution 2k, width 2688, height 1386, folderReference ba4aecfe-efce-47e2-b53f-30d292091886, refs image gOmYI7iSXO + EbYJzsMuuO + cpS5YIl0eP + 1lduM4wr4r, prompt = prompts_roompf1_M2294.json['thua-minh-cung-tan-ngu'].prompt (the .txt without its CAPTION line: no code text in a backdrop).
- All 5 are ready in prompts_roompf1_M2294.json (prompt + refs). Phi image 4 = strip img/_review/place-rank/roompf1/tone-swatch-phi-t5.png: cdn_sync was still running at the time of writing; upload with creations_upload_image once the CDN serves it.
- Needs: the gen allowed for this session, or a session where Magnific generation is permitted.
- Phi strip uploaded 0 cr → Magnific nVlcVgLYQD (CDN img/_review/place-rank/roompf1/tone-swatch-phi-t5.png); json refs updated. Gens still blocked.

## OWNER L2299 "Duyệt, tiếp đi" (via ROOT-B9 session_01D3E3NbN2JHBLFPohVouQYb): M2294-11..15 APPROVED, Thừa Minh card APPROVED
### (1) Wired, 0 cr (same as approved rooms 31/32/35: CDN img/_review/place-rank/pr13/<key>-ha-sang.webp, webp q88 2688×1386; images never in git)
| code | Magnific id | CDN path | measure_floor base_c (target ≥ 82 %) |
|---|---|---|---|
| M2294-11 | CqYQqr0EEy | img/_review/place-rank/pr13/thua-minh-cung-tan-ngu-ha-sang.webp | 84.4 |
| M2294-12 | UPaJ4z1wny | img/_review/place-rank/pr13/thua-minh-cung-tan-ha-sang.webp | 86.1 |
| M2294-13 | rgBLSivxtc | img/_review/place-rank/pr13/khai-tuong-cung-phi-ngu-ha-sang.webp | 84.4 |
| M2294-14 | LwIg7DQswO | img/_review/place-rank/pr13/khai-tuong-cung-phi-ha-sang.webp | 79.7 (a little more floor than the target; note only, no redraw) |
| M2294-15 | 0ewMdjfTfW | img/_review/place-rank/pr13/chung-tu-cung-phi-ngu-ha-sang.webp | 87.0 |
- Every Magnific prompt was checked as identical to prompts_roompf1_M2294.json (ids ↔ rooms verified).
- The pictures were wired UNGRADED, exactly as the owner approved them on the sheet. Reasons:
  - later owner notes say 'rất nhẹ' was too strong (L1695 → sieunhe preset) and that room 31 needed no grade (L1689);
  - dev/art/place-rank/room_vivid.py is GLUED again: three versions are concatenated and it fails with a SyntaxError at line 9, so it cannot run. Foreman: fix it (keep the top version), then grade only if the owner asks.
- ⚠ FOR MAIN: no game table or JSON references the chính điện rank rooms yet. Rooms 31–40 are not live either (they also sit only at the pr13 review path). Going live is MAIN's wiring step, for these 5 together with 31–40.
### (2) NEXT 5 prompts M2299-11..15 (builder dev/art/place-rank/prompts_roompf1_M2299.py → prompts_roompf1_M2299.json; recipe = M2294 exactly; no new style words, only the existing cards CT, HA and TM (approved L2299); no palace needs a new card)
- M2299-11 chung-tu-cung-phi: 2w, windows LEFT, M2X; daybed in the left half, doorway in the right half, rose chairs facing each other.
- M2299-12 ham-an-cung-phi-ngu: 3w, windows LEFT, M3X; bed in the left half, begonia doorway in the right half.
- M2299-13 ham-an-cung-phi: 2w, windows RIGHT, M2; daybed in the right half, begonia doorway in the left half, yoke-rail chairs facing each other.
- M2299-14 thua-minh-cung-phi-ngu: 3w, windows LEFT, M3X; bed centred, fan doorway in the right side wall.
- M2299-15 thua-minh-cung-phi: 2w, windows RIGHT, M2; daybed in the left half, fan doorway in the right half, spindle-back chairs facing each other.
- Layouts differ from the same palace's Tần room (L19), and 3-wall / 2-wall rooms alternate.
- room_gate PASS ×5 · keep_check PASS ×5 (bases prompts_pr20_tone_vinh-hoa-*) · MA_HINH appended · ATTACH dev/handover/prompts_L2095/M2299_ATTACH.md (Magnific ids + local refs).
- Refs: [gOmYI7iSXO, EbYJzsMuuO, image-3 guide, nVlcVgLYQD Phi strip].
### Remaining rooms after M2299
- Phi ×4: Diên Huy bed + rec, Vĩnh Hòa bed + rec
- Quý phi ×12: KT, CT, HA, TM, DH, VH × bed + rec. These need a Quý phi rank swap (B24 t6 #E3A25B + small royal-yellow touch; RANK['quyphi'] lux words) like the Phi one: no new style words, but the first QP batch is a new rank recipe → owner sample first.
- Từ Ninh ~2 · Trường Xuân versions (Q1) · ~35 place scenes
