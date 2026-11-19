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


## v2 — Cảnh Phúc redrawn after ROOT-48 relays (owner add to Lượt 447 "mỗi nơi … đặc trưng phong cách"; Lượt 450 yellow gradient; phoenix warning). The relays arrived after the v1 push.
STYLE CARDS (used in every prompt of that palace; full text in dev/art/place-rank/prompts.py):
- Cảnh Phúc cung: crabapple blossom (hải đường) · dark rosewood + jade-green inlay · bats among auspicious clouds · round-backed rosewood furniture + moon-gate partition. Rank only changes richness (Tần plain → Phi more carving/inlay → Quý phi gilt, pearls, coral, cloisonné) + accent (pale pink / soft purple / rose red; Quý phi + one small pale gold-yellow accent, NO phoenix).
- Thừa Minh Đông phối (Quý nhân): orchid · pale blue + painted flower lacquer · paper lanterns, simple lattice · modest carved lacquer couch/chairs. No yellow, no phoenix.
- Khôn Ninh cung (Hoàng hậu): peony + phoenix · imperial yellow + gold + red lacquer pillars · gilded throne couch/bed on stone tiles. Most golden.
Every rooms 1–8 prompt now says "No phoenix anywhere (no phoenix carving, embroidery, figure or pendant), no imperial yellow, no golden-yellow fabrics" (Quý phi: yellow only as the one small accent). The 4 kept Thừa Minh/Khôn Ninh pictures were drawn with the v1 wording ("No phoenix anywhere, no yellow silk or yellow fabric anywhere", see commit 5a428d6 prompts.json); they already match their cards.

| picture v2 | gen id | verdict |
|---|---|---|
| canh-phuc-cung-tan-ngu | nVsEG05YQD | kept |
| canh-phuc-cung-tan | UPvTg93wny | kept |
| canh-phuc-cung-phi-ngu | Xm9xeC3Bfo | kept |
| canh-phuc-cung-phi | lJtWLRMgv9 | kept |
| canh-phuc-cung-quyphi-ngu | 8ais8iSIrU (redo of Lw8nxZqswO: clothes rack + side table at left edge) | kept, small gold-yellow throw = the Quý phi accent |
| canh-phuc-cung-quyphi | kseZ53Q16B | kept; FAULT to watch: frieze bat has feathered wings (reads bat/eagle, not phoenix) |
v1 Cảnh Phúc six + old sheet A/spread moved to img/_review/place-rank/v1/ (CDN) as skins. Sheets A + spread rebuilt (same paths).
Credits v2: 7 × 135 = 945. TOTAL 20 gens = 2,700 credits.

## Credits (v1)
13 gens × 135 = 1,755 credits (10 kept + 3 redos).

## Faults / notes for the verdict
- Quý phi reception: possible bird-like gilt scroll in the top frieze (no clear phoenix); redo budget used.
- Rank step: same architecture (rosewood, lattice windows onto lotus garden, moon gate), colour pink → purple → rose red, richness rises (lacquer → mother-of-pearl → gilt + coral/cloisonné), but the Tần rooms are already fairly gilded, so the Tần→Phi step is softer than Phi→Quý phi.
- The Quý nhân phối bedroom is close in richness to the Tần bedroom (pretty, never poor, as asked).
- Light comes from the right as in the template ("light from the right" is the template's light sentence, not a room-side instruction).

## HANDOVER → next worker: v3 (owner verdict Lượt 461, relayed by ROOT-48 16:45Z) — NOT started by PR3 (context roll-over)
Redo list (same names; first move the current files to img/_review/place-rank/v2/ on disk + CDN, never live img/):
A. ALL 5 RECEPTIONS (canh-phuc-cung-{tan,phi,quyphi}, thua-minh-cung-dong-phoi, khon-ninh-cung): the long couch reads as a WESTERN sofa. Host seat = a LA HÁN SÀNG (luohan bed 罗汉床: wide low wooden daybed, three-sided carved panel back, small low kang table in its middle, flat silk cushions) + pairs of Chinese armchairs (quan mạo ỷ / round-back chairs) with small tea tables between them flanking it. Keep side chairs, screen, moon gate, back of room. Add to prompt: "no Western sofa, no upholstered couch". Khôn Ninh reception: keep throne seat, but fill the empty mid-ground floor in front (rugs, low tables, incense stand, potted plants) — not at the left edge.
B. BOTTOM-RIGHT RULE (new): no furniture group spills to the bottom-right edge; at most ONE small object in a small corner there. Redo bedrooms canh-phuc-cung-{tan,phi,quyphi}-ngu and khon-ninh-cung-ngu (move tea table + stools further back). Note: the old "never mention the right side" rule (Lượt 406) now coexists with this — word it as "the bottom-right corner near the viewer holds at most one small object; the tea table and stools stand further back in the room", ask ROOT-48 if unsure.
C. thua-minh-cung-dong-phoi-ngu (liked): redo ONLY to show TWO beds (shared room) and all three low-rank colours: Đáp ứng ivory, Thường tại pale green, Quý nhân pale blue (bedding/curtains/cushions). Keep orchid / painted-lacquer style.
D. RICHNESS shift: current v2 Tần bedroom (nVsEG05YQD) = the LOWEST level → phối ≈ that level; Tần one step richer, Phi richer, Quý phi richest, all below Khôn Ninh. Adjust the 'lux' lines in dev/art/place-rank/prompts.py.
Tools: prompts.py builds prompts.json (style cards CARD_CP etc. inside); sheets.py FIGDIR OUTDIR rebuilds sheets A/B + spread (figs from CDN img/fig-consort-c06/c30-t1-a18, fig-maid-m19/m39-t1-a18). Recipe unchanged (refs gOmYI7iSXO + EbYJzsMuuO, gpt-2-6 2k 2688x1386, folder ba4aecfe-efce-47e2-b53f-30d292091886, no grade, LOOK at each, max 1 redo). The tẩm cung ref carries a phoenix — keep the explicit no-phoenix sentence. Expected ≈ 10 gens + redos ≈ 1,350–2,000 cr. Report v3 here, relay to ROOT-48 session_01PEhRbwqKFPv13Sx5yfxDSx.
