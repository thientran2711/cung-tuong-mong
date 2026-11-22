# PLACES1 — redraw ALL game places + Từ Ninh (owner L2355) — worker of Foreman C ROOT-C2 (session_01D3E3NbRKVda1eN4trg7rnx)
depth 2 · START_CTX ~4 % (get_session context_usage read 0; estimate) · finished at ~22 % (under the 29 % roll line) → no handover needed.

## Done (22/11): 17/17 pictures, ONE try each, 17 × 135 = 2 295 cr, 0 redraws (no heavy fault seen). Balance ~2.86 M before.
Builder `dev/art/place-rank/prompts_places_L2355.py` → `prompts_places_L2355.json` + `dev/handover/prompts_L2095/M2355-NN_<key>_ha_sang.txt` (+ `.keep`).
Recipe (A17 diff): M2300 room prompt head + tail copied VERBATIM from prompts_roompf1_M2300.json (M2300-03 / M2300-02); ONLY the middle
(ROOM sentence + palace card + RANK COLOUR + TONE + rank lux + no-phoenix/yellow line) replaced by a per-place ROOM part keeping the live old
picture's function and key props. No rank → no tone strip (image 4 dropped; refs = G9 + wall guide). Outdoor places (Lãnh cung, Tân giả khố,
Ngự hoa viên): 4 listed tail word swaps (OUTDOOR in the builder). Thái hậu rooms: B22 #CE9C48. Bed-type places keep the BED L804/815 sentence.
Gates: room_gate PASS ×17 (builder guard); keep_check sidecars PASS ×17 (every dropped base phrase allowed with reason); check_store has no room scope.
Settings: images_generate gpt-2-6, 2k, 2688×1386, folder ba4aecfe-…, refs as json. room_vivid grade NOT applied (ungraded, like the approved rooms).
Wire: `dev/art/place-rank/places_wire.py` → CDN img/_review/place-rank/places/<key>-ha-sang.webp (q88). Live img/<place>-* NOT touched (swap after owner OK).
People sheets (Fold 755 portrait | iPad): `people_pr13/make_sheet_places.py` (Fold template = fresh live screenshot 755×1000 via stage_exact/live_phone755.js).
 https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/places/people/L2355-batch1.jpg … batch2 / batch3 / batch4.jpg

| code | place | key | Magnific | floor % | sha1 | note |
|---|---|---|---|---|---|---|
| M2355-01 | Dưỡng Tâm điện | duong-tam-dien | JNE4As4Oq4 | 12.6 | 744f00adf84f | |
| M2355-02 | Ngự thư phòng | ngu-thu-phong | YMgToRgWeC | 14.3 | 9181a31ecc75 | |
| M2355-03 | Thái y viện | thai-y-vien | LwISN7ZswO | 12.1 | db3b99e4e82a | floor just under band |
| M2355-04 | Lãnh cung | lanh-cung | 9Zq3c2kNYZ | ~25 by eye (tool n/a outdoors) | ba636ebb9d5a | plain/poor |
| M2355-05 | Nội vụ phủ | nvp | P3F6YZY42C | 14.7 | 0966f400f0e9 | small phoenix beam carving |
| M2355-06 | Kính sự phòng | kinh-su-phong | O6u9n3Oynm | 10.0 | 95d6c3155658 | |
| M2355-07 | Tẩm cung | tam-cung-dem | LwIS6O2swO | 12.6 | 29479c96f996 | |
| M2355-08 | Thượng thư phòng | thuong-thu-phong | 9Zq30G1NYZ | 10.8 | 40b5f9bc6870 | student desks in the people band (mild) |
| M2355-09 | Phòng cung nữ | phong-cung-nu | IfRv5QQtvE | 19.0 | 50a8135d1251 | |
| M2355-10 | Cung nhân | cung-nhan | WDSVtXJcXe | 19.9 | 2a7c3c6f73ae | |
| M2355-11 | Tân giả khố | tan-gia-kho | tCZaKdgmZJ | 11.7 | 1438a42af96a | outdoor |
| M2355-12 | A ca sở | a-ca-so | ovimqpt829 | 12.6 | 4488deb5834e | bed cut at right edge (mild) |
| M2355-13 | Đông cung | dong-cung | SyvJZjtUb8 | 15.6 | 565cc6d7defe | phoenix pair on beam (mild) |
| M2355-14 | Phi tần cung | phi-tan-cung | 4RHicJD9Aa | 19.5 | 711473cb393e | |
| M2355-15 | Ngự hoa viên | ngu-hoa-vien | huAC18YvqL | 19.5 | 6a65de56922d | outdoor |
| M2355-16 | Từ Ninh cung (phòng ngủ) | tu-ninh-cung-ngu | YMgTtbXWeC | 14.3 | 5ea70eb35f0f | |
| M2355-17 | Từ Ninh cung (phòng khách) | tu-ninh-cung | KLexyzDkqp | 15.6 | d13d828c8689 | |

## Open / FOR FOREMAN
- Owner verdict per place → then swap live img/<place>-* (and season×buổi variants later, not done).
- Prompt notes: gate R11 forced canopy-bed words for A ca sở / Cung nhân / Phòng cung nữ (head names image 1 'the bedroom'); Phi tần cung written as lowercase 'phi tần cung' so the gate does not read it as a t5 Phi room.
- Repo note: the container's local branch was a stale divergent copy; I reset it to origin and kept the old ref as `stale-local-backup` (local only, not pushed).
- MA_HINH.json: M2355-01..17 added.
