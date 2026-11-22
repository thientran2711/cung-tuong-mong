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

## L2381 (owner via ROOT-C4 19:07Z; verbatim dev/handover/briefs/L2381_owner_verbatim.md). 3 gens = 405 cr. Ctx 22 %.
| job | code | key | gen id | floor % | what |
|---|---|---|---|---|---|
| (2) Phòng cung nữ = Cung nhân prompt copied | M2370-28 | phong-cung-nu-r3 | WDSBlj3cXe | 15.2 | the M2370-23 prompt byte-for-byte; only the caption code differs |
| (3) A ca sở luxurious curtains + bed | M2370-29 | a-ca-so-r3 | dt9fPy5XSL | 11.3 (a bit low) | layered sapphire dragon-cloud brocade curtains with gold/silver embroidered borders, fringe, tassels and a gilt pelmet; zitan canopy bed carved with dragons and waves, embroidered valance |
| (4) Thượng thư phòng embroidered curtains | M2370-30 | thuong-thu-phong-r4 | CqY1zzVEEy | 15.6 | deep-blue brocade embroidered with peonies, clouds and cranes like its chairs/lanterns; gilt pelmet |
| (5) Ngự hoa viên fresh | M2370-04 fresh | ngu-hoa-vien-fresh | 0 cr | — | calm grade undone; room_calm.py 'tuoi' on the original (mean S 60 → 66), detail kept |
Before|after sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/places-l2370/people/L2382-before-after.jpg
Gates: room_gate PASS; keep_check PASS (sidecars, base = the M2370 prompt each was edited from).
Repairs (line-based rebase merges broke these): MA_HINH.json rebuilt from its key lines (388 codes); swap_L2370.py had the old r2 lines merged back in, which gave a 23-row plan, removed. room_vivid.py on the branch is broken (repeated headers, unclosed '{'); NOT fixed, not used.

## GAME SWAP DONE (approved plan, ROOT-C4 order). 15 live files: img/<place>-ha-sang.webp, decapped, 2688×1386 q88, cdn_sync index v=81df8ded440d.
Newest per place: phong-cung-nu←M2370-28, a-ca-so←29, lanh-cung←03, ngu-hoa-vien←04 fresh, duong-tam-dien←05, ngu-thu-phong←26, thai-y-vien←07, kinh-su-phong←20, tam-cung-dem←10, thuong-thu-phong←30, cung-nhan←23, tan-gia-kho←13, dong-cung←14, phi-tan-cung←15, tu-ninh-cung←25.
Verified live: a-ca-so / phong-cung-nu / ngu-hoa-vien return 2688×1386 from the CDN.
FOR MAIN (not swapped): Nội vụ phủ (no img/nvp-ha-sang.webp; live has nvp-v4-* → which key?), Từ Ninh bedroom M2370-24 (approved by her; needs a code hook-up, no live file). Only ha-sang was swapped; the other 15 season×buổi variants per place are still old (later job).
Total PLACES3: 10 gens = 1 350 cr.

## L2384 (owner + HIST1 prince rule @e80219f; coordinator ROOT-C5 session_01D3E3Na19R1KD7i2QJSJgsf). 2 gens = 270 cr.
| code | key | gen id | floor % | what |
|---|---|---|---|---|
| M2370-31 | a-ca-so-r4 | vQG5MOsa47 | 12.1 | layout/embroidery richness kept; dragons → qilin + bats among clouds + waves + pine; zitan pelmet; thin gold line only; no yellow |
| M2370-32 | thuong-thu-phong-r5 | dt9fGgBXSL | 26.0 (HIGH, wide empty floor in front) | moderate: plum/orchid/bamboo curtains, narrow key-fret border, 2 plain lanterns, unpainted rosewood, few ornaments; bats-and-clouds beam |
OLD|NEW sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/places-l2370/people/L2385-old-new.jpg
Builder bug fixed: rerunning prompts_places_L2376.py renumbered used codes (it deleted its own entries and numbered them by len(OUT)). Codes are now frozen (code_for); no pushed file was changed.
Swap: waiting for the owner to see the sheet (ROOT-C5), then `python3 dev/art/place-rank/swap_L2370.py --go` (r4/r5 win automatically).
PLACES3 total: 15 gens = 2 025 cr.
