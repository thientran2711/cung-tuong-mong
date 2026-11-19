# place-rank SAMPLE — owner Lượt 447 (ROOT-48 art worker PR3)

PRIORITY #1 CHECK: CDN img/_review/place-mass/ already has khon-ninh-cung-ha-sang (main hall: phoenix but no imperial yellow, red/pink), canh-phuc-cung-ha-sang (ROUND 1 hall, no rank colour), thua-minh-cung-dong-phoi-ha-sang (a bed is visible → not a reception), thua-minh-cung-dong-phoi-ngu-ha-sang (two beds, ROUND 2 rule replaced by Lượt 447), skins/canh-phuc-cung-ngu-ha-sang (R2, no rank versions). None fits ROUND 3 + RANK RULES exactly → all 10 drawn new; the old ones stay as skins. Ledger gen_ledger.jsonl L1158–1165, L1430 checked.

Recipe v2 exactly: refs image 1 tẩm cung gOmYI7iSXO + image 2 M09 EbYJzsMuuO, gpt-2-6 2k 2688x1386, folder ba4aecfe…, prompt = dev/art/place-redraw/prompt_template.txt with the room lines in dev/art/place-rank/prompts.py (→ prompts.json). NO grade. The right side is never mentioned in any room line. Saved webp q88 to img/_review/place-rank/ (live img/ untouched).

## Results (all ha-sang, CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/<name>.webp)
| picture | gen id | verdict |
|---|---|---|
| canh-phuc-cung-tan-ngu | EbYyojiuuO (redo of Syh0FwBUb8) | first had a gilt phoenix on the bed canopy → redo adds "canopy and beams carved only with plum blossoms, clouds and scrolls, no birds of any kind"; kept |
| canh-phuc-cung-tan | VX7bij0MMU | kept |
| canh-phuc-cung-phi-ngu | hu2UT3qvqL | kept (small low box + incense burner on a low table corner at the bottom-left) |
| canh-phuc-cung-phi | Xm9xWkdBfo (redo of 0eUHNweTfW) | first had a side table + tall orchid vase at the left edge → redo adds "floor near the viewer at the left is open … no table, no tall vase"; kept |
| canh-phuc-cung-quyphi-ngu | aFG7MYdfSh | kept |
| canh-phuc-cung-quyphi | hu2UTcsvqL (first gen) | redo 4RFXl8C9Aa was WORSE (clear phoenix in the frieze + table at the left) → first gen kept; FAULT: its top frieze has one gilt scroll that might read as a bird |
| thua-minh-cung-dong-phoi-ngu | kseZhve16B | kept: one bed, pale blue, Quý nhân level |
| thua-minh-cung-dong-phoi | gOmcF59SXO | kept: no bed, pale blue |
| khon-ninh-cung-ngu | kseZhQI16B | kept: imperial yellow + phoenix, most dazzling |
| khon-ninh-cung | Tdwq6YiVNR | kept: yellow throne couch, golden phoenixes |

Redo extra sentences (added before "No phoenix anywhere…") are in gen_ledger notes; the rest of each prompt = prompts.json.

## Sheets
- A (Cảnh Phúc 3×2, rows Tần/Phi/Quý phi, cols phòng ngủ / phòng tiếp khách): dev/handover/review-sheets/place-rank/place-rank-A-canh-phuc.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/place-rank-A-canh-phuc.jpg
- B (phối Quý nhân pair + Khôn Ninh pair, 2×2): dev/handover/review-sheets/place-rank/place-rank-B-phoi-khon-ninh.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/place-rank-B-phoi-khon-ninh.jpg
- 4 figures evenly spaced (composite_spread.py) on the Quý phi bedroom: dev/handover/review-sheets/place-rank/place-rank-quyphi-ngu-spread.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/place-rank-quyphi-ngu-spread.jpg
- Script: dev/art/place-rank/sheets.py FIGDIR OUTDIR (reuses composite_spread.py).

## Credits
13 gens × 135 = 1,755 credits (10 kept + 3 redos).

## Faults / notes for the verdict
- Quý phi reception: possible bird-like gilt scroll in the top frieze (no clear phoenix); redo budget used.
- Rank step: same architecture (rosewood, lattice windows onto lotus garden, moon gate), colour pink → purple → rose red, richness rises (lacquer → mother-of-pearl → gilt + coral/cloisonné), but the Tần rooms are already fairly gilded, so the Tần→Phi step is softer than Phi→Quý phi.
- The Quý nhân phối bedroom is close in richness to the Tần bedroom (pretty, never poor, as asked).
- Light comes from the right as in the template ("light from the right" is the template's light sentence, not a room-side instruction).
