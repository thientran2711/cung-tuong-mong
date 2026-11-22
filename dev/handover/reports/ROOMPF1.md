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
