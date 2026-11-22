START_CTX ~3 % (get_session read 0 at start; own estimate) · depth 3 · now 18 % (180 923 / 1 M), under the 28 % roll line
# PLACES3 — owner L2376 places fixes (coordinator ROOT-C3 session_01D3E3NaHk4WXbAeqcG1iXWK)
Coordinator now ROOT-C4 session_01D3E3NWqpW2ooEEFJyANw9a (ROOT-C3 rolled over 07:00Z). Idle until ROOT-C4 relays the owner verdict on L2377 / swap OK.
Brief = PLACES2 handover @7150f4ad. One try each, details ours. The game swap is still HELD.

## Done
| job | code | key | gen id | floor % | result |
|---|---|---|---|---|---|
| 2 Phòng cung nữ ≈ old Cung nhân, not a boudoir | M2370-21 | phong-cung-nu-r2 | DoyX7zqpcl | 19.5 (band 12.5–18.5, a little high) | plain polished-wood shared canopy platform, cotton quilts, carved lattice band, NO painting on the walls |
| 1 A ca sở youthful masculine blue | M2370-22 | a-ca-so-r2 | jU8gBY3LD0 | 10.0 (low) | crisp sapphire #2E5C9E curtains, navy/steel bedding with key-fret border, sword, bow, weiqi |
| 4 Cung nhân less restrained, carved wood | M2370-23 | cung-nhan-r2 | jU8gBWRLD0 | 13.0 | warmer and fuller, carved openwork wooden friezes instead of painted ones |
| 5 Từ Ninh bedroom = Thái hậu tones | M2370-24 | tu-ninh-cung-ngu-r2 | P3F6u8A42C | 12.1 | antique-gold/amber brocade curtains, dark zitan with gilt, no white curtains |
| 5 Từ Ninh hall | M2370-25 | tu-ninh-cung-r2 | MBOd7xtDCm | 16.0 | amber brocade curtains, gold daybed, crane screen |
| 6 Ngự thư phòng imperial-rich | M2370-26 | ngu-thu-phong-r3 | O6u9Co7ynm | 12.1 | yellow dragon brocade, dragon pillars and screen, dragon armchair, zitan bookcases (books lie flat) |
| 6 Thượng thư phòng refined-rich | M2370-27 | thuong-thu-phong-r3 | gOh7tpmSXO | 19.0 (high; cushions in front) | rosewood with gilt, deep-blue curtains, brocade cushions |
| 3 Ngự hoa viên calmer colours | M2370-04 calm | ngu-hoa-vien-calm | — (0 cr grade) | — | room_calm.py 'vua': chroma ×0.76, strongest colours pulled more; mean saturation 60 → 44 |
Credits: 7 × 135 = 945 cr. Pictures: img/_review/place-rank/places-l2370/<key>-ha-sang.webp (on the CDN).
People sheets: https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/places-l2370/people/L2377-a.jpg (21–24) and L2377-b.jpg (25, 26, 27, NHV calm).
RECOMMENDED-REDRAW (only on the owner's yes): none needed for content. Floor is off-band on -22 (10 %), -21 (19.5 %) and -27 (19 %).

## LAW 11 group scan: painted walls (all 17 places, both contact sheets read)
| place | painted wall/frieze? | servants? | action |
|---|---|---|---|
| Phòng cung nữ M2370-01 | flower-bird frieze | yes | redrawn → M2370-21 (carved only) |
| Cung nhân M2370-12 (old M2355-10 too) | flower frieze panels | yes | redrawn → M2370-23 (carved openwork) |
| Tân giả khố, Thái y viện, Lãnh cung | none | yes | ok |
| Kính sự phòng, Nội vụ phủ | carved gilt beam friezes (wood, not plaster), one hanging scroll | office | ok |
| Đường tâm điện, Đông cung, Phi tần cung, Tẩm cung, Từ Ninh, studies | painted/gilt beams, panels | grand halls | ok (owner: wall painting fine in grand places) |
The new prompts carry a NOPAINT sentence (WALLS OF A SERVANTS' ROOM).

## Prompt diffs (A17) + gates
- Builder: dev/art/place-rank/prompts_places_L2376.py. It reads the frozen prompts_places_L2370.json and appends job=2376 codes. Only the ROOM text changed; the BED/BOOKS sentences were carried over. For Từ Ninh, WALLS_IN was replaced by WALLS_TN (ivory plaster, curtains NOT white).
- room_gate PASS (7). keep_check PASS (7). Each sidecar `.keep` has base = the M2370 prompt it was edited from, and every cut phrase is an allow line with its owner L2376 reason.
- Fixes: prompts_places_L2355.json on the branch was broken JSON (a bad merge in PLACES1 5fbe619 left a duplicate "8aiwqQTIrU" ref line). I removed that line, so prompts_places_L2370.py and make_sheet can load it again. make_sheet_places.py labels now strip -rN/-calm. swap_L2370.py now picks the newest version of each place (base < r2 < r3; calm wins for Ngự hoa viên). Its dry run gives 17 entries; NOTE still lists nvp and tu-ninh-cung-ngu = FOR MAIN.
- Ledger: 7 lines in gen_ledger.jsonl. MA_HINH: M2370-21..27.

## Open
- Swap HELD (needs the owner's OK via ROOT-C3): `python3 dev/art/place-rank/swap_L2370.py --go`.
