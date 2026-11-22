# PLACES2 — owner L2370 places (white light cause, Phòng cung nữ up, law-11 group scan, A ca sở curtains, Ngự hoa viên furniture) — worker of ROOT-C3 (session_01D3E3NaHk4WXbAeqcG1iXWK)
START_CTX ~3 % (get_session used_tokens read 0; estimate, window 1M) · roll line 28 % · ceiling 60 % · depth 3

## Done 22/11 — 4 gens × 135 = 540 cr, one try each, no redo. Live img/ NOT touched.
Builder `dev/art/place-rank/prompts_places_L2370.py` (base prompts_places_L2355.json; nothing in M2355 changed) → prompts_places_L2370.json + `dev/handover/prompts_L2095/M2370-0N_<key>_ha_sang.txt` (+ .keep).
Gates: room_gate PASS ×4 · keep_check PASS ×4 (every drop has an allow line, owner L2370) · check_store / --batch = person gates, no room scope (crash / B0 "no person"), same as PLACES1.
Settings as PLACES1: gpt-2-6, 2k, 2688×1386, folder ba4aecfe…, same refs (G9 + wall guide; Ngự hoa viên + old live ksdj6iw16B).
Review copies: CDN img/_review/place-rank/places-l2370/<key>-ha-sang.webp (PLACES1 copies in places/ untouched).

### Job 1 — white light: the real cause (0 cr)
Compared A ca sở v1 (ovimqpt829) + v2 (tCZaj6ImZJ) with the blue room Diên Huy tây phối ngủ (pr13, soft blue #7E9CCB — no Phi/QP room is blue: Phi = lavender, QP = honey orange), Phi Khải Tường ngủ, Phòng cung nữ, Thái y viện.
Same in all 17 places: LIGHT sentence ("bright neutral white daylight"), refs, model, settings, no grade step, same batch. Different: only the ROOM part.
CAUSE (2 lines): 1) the prompt never names a wall colour and the head says "painted exactly like image 1 … same natural light" (image 1 = warm pink-red bedroom, R−B 31), so the model takes the wall/paper tone and the haze from the object colours: A ca sở "deep blue, ink grey, bronze" → white-grey walls = white light; others "warm wood, pink, cream, gilt" → cream/beige walls + peach floor glow = yellow light. 2) the blue phối rooms are yellow because their own prompt asks "same natural warm light" + "soft warm morning daylight" — blue curtains do not change the light.
FIX in the builder (WHITE): head "same natural light" → "the same daylight direction but NOT image 1's warm colour of light"; new sentence before LIGHT: "WALLS AND WHITES … plaster walls, wall panels and window paper clean soft white like #F3F2EE, never cream/beige/yellow/peach/pink … no warm haze" (outdoor variant #EDEDEA). Result: Phòng cung nữ R−B 50 → 36 (neutral surfaces 32 → 21), A ca sở 21 → 17, Lãnh cung 26 → 24, Ngự hoa viên 24 → 19.
Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/places-l2370/wb/L2370-anh-sang-trang.jpg
GROUP (owner decides, not done): the other 13 drawn places (M2355-01,02,03,05,06,07,08,10,11,13,14,16,17) with WHITE = 13 × 135 = 1 755 cr (one try each). The consort rooms (M2300/pr13) are outside this brief.

### Jobs 2–5 (WHITE applied)
| code | place | Magnific | R−B | floor % | note |
|---|---|---|---|---|---|
| M2370-01 | Phòng cung nữ (job 2) | rgBsz0oxtc | 36 | 15.6 | up to Cung nhân finish: carved painted wardrobe/platform, flower frieze, embroidered gauze, quilts, flowers; white walls |
| M2370-02 | A ca sở (job 4) | lJmw0ePgv9 | 17 | 17.3 | curtains = fine misty blue-grey #9FB3C8 damask silk, jade toggles; masculine décor kept |
| M2370-03 | Lãnh cung (job 3) | N2bRIfJ6D9 | 24 | outdoor | old/faded but clean & lovely (no peeling, torn, broken); small stray glyph after the caption code |
| M2370-04 | Ngự hoa viên (job 5) | s7tUceIl8e | 19 | outdoor | terrace now only balustrade + flower beds; table inside pavilion; frontal, lake, pavilion, bridge kept |
People sheet (Fold 755 | iPad): https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/places-l2370/people/L2370-batch1.jpg

### Job 3 — law 11 scan (looked at every low-rank / service place)
| place | poor? | why |
|---|---|---|
| Phòng cung nữ M2355-09 | YES | bare plaster, bare platform, plain box furniture → redrawn M2370-01 |
| Lãnh cung M2355-04 | YES | peeling pillars, torn paper, cracked vat, broken stool, weeds = shabby → redrawn M2370-03 |
| Cung nhân M2355-10 | no | carved beds, chests, frieze, flowers (stays) |
| Tân giả khố M2355-11 | no | plain but clean, tidy laundry court, neat racks |
| Kính sự phòng / Nội vụ phủ / Thái y viện / Thượng thư phòng | no | richly carved, gilt, porcelain |
| 18 phối rooms (đông/tây phối, pr13) | no | carved lacquer, embroidered silks |

### Prompt diffs (A17) — all vs M2355 base, listed as allow lines in the .keep files
WHITE (all 4) · M2370-01 ROOM part rewritten + noun "plain, tidy" → "pretty, well-kept" · M2370-02 3 curtain/palette phrases · M2370-03 ROOM rewritten + noun "neglected" → "old, quiet" + GROUND · M2370-04 GARDEN FURNITURE sentence + 2 tail phrases (furniture band → balustrade/flower beds; corners → flowers and plants).
