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
E. (owner Lượt 462, ROOT-48 16:45Z) Quý phi yellow touch too faint → a bit MORE visible in BOTH Quý phi rooms: gold-yellow brocade throw + yellow cushion trims + yellow tassels on the bed / seat; still clearly less than Hoàng quý phi / Empress; no phoenix. Edit NOPE_QF + the quyphi 'bed'/'rec' lines in prompts.py.

## v3 — DONE by PR4 (owner Lượt 461 A–D + 462, corrections 465 + 466 relayed by ROOT-48)
Prompts: dev/art/place-rank/prompts.py → prompts.json (all 10 rebuilt). Changes:
- A: every reception = LUOHAN() helper: luohan daybed (three-sided carved back, small kang table with tea set in its middle, flat cushions) flanked by pairs of Chinese armchairs with small tea tables; + "No Western sofa, no upholstered couch." Khôn Ninh: throne seat kept, consort armchair rows, mid-ground in front of the dais furnished (small rugs, low tables with fruit/tea, gilt incense stand, potted peonies).
- B: RIGHT sentence (ROOT-48 wording) in all 10: "The bottom-right corner nearest the viewer stays almost clear, holding at most one small object; tea tables and stools stand further back in the room." (assert: it is the only 'right' in a room line).
- C: phối bedroom = TWO beds (ivory + pale green bedding/curtains, pale blue cushions), orchid / painted lacquer kept, "Exactly two beds."
- D: Tần/Phi lux lines one step richer (Tần now fine carving + jade inlay + a little gilt; Phi deeper carving + gilt edging). Phối richness = UNCHANGED v1 level (owner Lượt 465 overrides D for the phối).
- E (Lượt 462): Quý phi bed + daybed get a gold-yellow brocade throw, gold-yellow cushion trims and tassels; NOPE_QF says clearly visible but far less than an Empress, no yellow curtains/bedding/walls, no phoenix.
- Lượt 466: Khôn Ninh bedroom mixes imperial yellow with rich crimson red (red-lined yellow curtains, red borders/cushions/tassels), "never all yellow".
Redo sentences (placement only) are in the gen_ledger notes; prompts.json holds the base prompts. For a mass run, add the bed/daybed placement sentence from the start (the model likes to push the bed to the left edge and a dressing table/stool group to the right edge).

| picture v3 | gen id | verdict |
|---|---|---|
| canh-phuc-cung-tan | WDgFohIcXe | kept |
| canh-phuc-cung-phi | nVsuoWoYQD | kept |
| canh-phuc-cung-quyphi | KLpZJjDkqp | kept; gold-yellow throw + tassels clearly visible, one small jar bottom-right |
| canh-phuc-cung-tan-ngu | kse24Rp16B (redo of vQA710Ja47: bed at the left edge) | kept; FAULT: dressing table + stool at the right edge mid-foreground (corner itself open floor) |
| canh-phuc-cung-phi-ngu | SyhTG51Ub8 (redo of s7IW33Tl8e: dressing group at the right edge) | kept; tea table + stools right of centre, corner open |
| canh-phuc-cung-quyphi-ngu | 0eUqf23TfW (redo of u5W4gwNQLD: cut-off table bottom-right) | kept; gold-yellow throw on the bed |
| thua-minh-cung-dong-phoi | If3gkSntvE (redo of DoOkfzXpcl: armchair close up at the left edge) | kept; FAULT: embroidery-frame stand at the right edge |
| thua-minh-cung-dong-phoi-ngu | BhNL5dMoQR (redo of JNCpnMjOq4: bed at the left edge, stool + basket bottom-right) | kept; two beds ivory / pale green, pale blue cushions; one small jar bottom-right |
| khon-ninh-cung | kse24n816B (redo of kse2OF716B: armchair rows at both front edges) | kept; mid-ground furnished, one small jar bottom-right |
| khon-ninh-cung-ngu | jUonRSTLD0 (redo of p8y1ux8ehw: dressing group at the right edge) | kept; yellow + crimson mix, phoenixes |
Other faults to watch: all Cảnh Phúc receptions keep a small low table cut off at the bottom-left corner holding a vase/incense burner (small low objects, as the LEFT rule allows); gilt frieze "bats" still read a little bird-like (no phoenix tail); the Tần bed has a pale beige-gold throw.
v2 files (10 rooms + sheets) → img/_review/place-rank/v2/ (CDN). Sheets A, B and the Quý phi bedroom spread rebuilt at the same paths (repo copies dev/handover/review-sheets/place-rank/).
Credits v3: 17 gens × 135 = 2,295 (10 kept + 7 rejected first gens). TOTAL place-rank = 37 gens = 4,995 credits.

## HANDOVER → next worker (PR5): v4 (owner Lượt 473, FIGURE_GATE 14c, ROOT-48 GO 17:08Z for ONE round, then STOP) — NOT started by PR4 (context roll-over)
KEEP, no regen: canh-phuc-cung-{tan,phi,quyphi}-ngu, canh-phuc-cung-tan, khon-ninh-cung, khon-ninh-cung-ngu (v3 files above).
0. First move all current v3 files + sheets to img/_review/place-rank/v3/ (disk + CDN: cp, then python3 dev/site/cdn_sync.py img/_review/place-rank/v3). Pull them first with: python3 dev/site/cdn_sync.py --pull 'img/_review/place-rank/*'.
1. CORNER NUMBERS (measure, no gens): in the 3 kept Cảnh Phúc bedrooms measure the right-side furniture group (bbox as % of width/height, how far it reaches toward the centre) and the small bottom-left low table in the Quý phi rooms (owner: about 1/10 of the height is fine). Write them here as CORNER NUMBERS; put them as limits in every new prompt (e.g. "the furniture group at the right stays within the right X % of the width and below Y % ... ") and check every result against them.
2. REDRAW 4 (cap ~1,200 cr ≈ 8 gens incl. redos):
 a. canh-phuc-cung-phi + canh-phuc-cung-quyphi receptions: ORDERLY like the kept Tần reception (WDgFohIcXe): luohan daybed centred against the back wall/screen, square to the wall; armchair pairs + tea tables in straight symmetric rows parallel to the side walls, aligned to the architecture; nothing at odd angles; centre floor open.
 b. thua-minh-cung-dong-phoi-ngu: room tighter (camera closer / back and sides fuller), NOTHING on the middle floor (the v3 tea table + stools centre-right must go; a table group only in a corner within the CORNER NUMBERS). Two beds.
 c. thua-minh-cung-dong-phoi reception: everything square to the back wall, orderly like the Tần reception.
 d. PHỐI COLOURS by occupant PAIR (new rule), sample ONE pair only: Thường tại pale green + Quý nhân pale blue — bed 1 + its corner pale green, bed 2 + its corner pale blue; reception cushions/curtains mix the two. (No ivory in this sample.) Later the 6 pairs ĐĐ ĐT ĐQ TT TQ QQ after owner OK.
 Phối richness stays the sample v1 level (Lượt 465).
3. PEOPLE ON EVERY ROOM: for all 10 rooms make the 4-figure evenly spread composite (dev/art/place-redraw/composite_spread.py; set cs.R and cs.SHEETS like sheets.py does) and rebuild sheets A/B from those (room alone small + with figures) — sheets.py needs extending for this. Figures: curl https://ctm-img.victoria-tntt.workers.dev/img/{fig-consort-c06-t1-a18,fig-consort-c30-t1-a18,fig-maid-m19-t1-a18,fig-maid-m39-t1-a18}.webp into a scratch FIGDIR.
4. Same sheet paths + repo copies, ledger line per gen, report, commit, relay to ROOT-48 session_01PEhRbwqKFPv13Sx5yfxDSx, then STOP (FIGURE_GATE item 0).
Tool notes (PR4): images_generate mode gpt-2-6, resolution 2k, width 2688, height 1386, folderReference ba4aecfe-efce-47e2-b53f-30d292091886, refs image gOmYI7iSXO + EbYJzsMuuO. creations_wait → creations_read hq medium → creations_register_download → fetch results.url and save webp q88 (PR4 scratch helper: PIL open, resize only if not 2688x1386, save WEBP quality 88 to img/_review/place-rank/<name>-ha-sang.webp). Never use creations_search without a tight filter (it dumps huge prompts). The model tends to put the bed at the left edge and a dressing/tea group at the right edge: write placement sentences into the base prompt from the start. gen_ledger.jsonl conflicts on rebase: keep both sides' lines.

## v4 — DONE by PR5 (owner Lượt 473 + 477, ROOT-48 GO for ONE round) → STOP, waiting for the owner's verdict
0. v3 files + sheets copied to img/_review/place-rank/v3/ (disk + CDN).
1. CORNER NUMBERS (measured on the v3 files at sheet size, ±2 %; x = % of width from the left, y = % of height from the top):
- Tần bedroom right group (dressing table + chair + stool): x 82–99, y 38 (mirror top) / 52 (table top) – 88 (feet).
- Phi bedroom right group (round tea table + 4 stools): x 67–100, y 47–87.
- Quý phi bedroom right group (tea table + stools): x 80–97, y 50–83.
- Bottom-left small low table: Quý phi bedroom x 0–6, y 73–88 (table body ≈ 6 % tall, with the incense burner ≈ 15 %); Quý phi reception x 0–8, y 84–100 (cut off, ≈ 12 %; candle stand on it up to y 77); Phi bedroom x 1–7, y 79–89.
LAYOUT NUMBERS (owner Lượt 477, template = v3 Phi bedroom SyhTG51Ub8): furniture fills ≈ 5/6 of the room; furniture feet reach y ≈ 68 at the left (cabinet / clothes rack), ≈ 78 at the centre (bed step, mat to 80), ≈ 87 at the right (stools) → open floor from the bottom edge ≈ 32 % of the height at the left, ≈ 22 % at the centre, ≈ 13 % at the right. Right-corner table group x 67–100, y 47–87.
In the prompts: CORNER (dev/art/place-rank/prompts.py; first version kept as CORNER_473) = "LAYOUT NUMBERS … like image 3 … base reaching down to about four fifths of the height; open floor only a strip of about one fifth of the height at the centre, never more floor than in image 3; table group only in the back right corner, inside the outer fifth of the width, between one half and seven eighths of the height; bottom-left at most one small low table about one tenth of the height". ORDER sentence (receptions) = daybed centred against the back wall, square to it; armchair pairs in straight mirrored rows, square to the walls, lined up with the pillars; nothing at an odd angle. Image 3 = v3 Phi bedroom (SyhTG51Ub8) as an extra layout reference (on the kept gens only).
2. REDRAW 4 — first gens (Lượt 473 wording, launched before Lượt 477 arrived) were orderly but ≈ 35 % open floor → all 4 rejected; redo with LAYOUT NUMBERS + image 3:
| picture v4 | gen id | measured | verdict |
|---|---|---|---|
| canh-phuc-cung-phi | ov6szIo829 (redo of DoOk9Inpcl) | daybed x 30–68, base y 75; chair rows x 3–27 / 71–96, feet y 87; floor strip ≈ 16 % centre | kept; FAULT: front armchair pairs fairly large at both sides (left one at the left edge, like the kept Tần reception) |
| canh-phuc-cung-quyphi | 8ailnauIrU (redo of Tdwby5HVNR) | daybed x 28–75, base y 72; chairs x 3–26 / 74–95, feet y 80; floor ≈ 25 % centre | kept; gold-yellow throw + tassels visible; FAULT: a guqin table cut off at the right edge (x 95–100, y 63–85) |
| thua-minh-cung-dong-phoi-ngu | 1ldAmKir4r (redo of KLpZBn0kqp) | two beds x 22–75, base y 75; right-corner tea table + stools x 77–97, y 46–63; floor ≈ 23 % centre | kept; bed 1 + its dressing corner pale green, bed 2 + corner pale blue; FAULT: bottom-left low table ≈ 14 % tall (a bit over 1/10) and green dressing group at x 10–25 |
| thua-minh-cung-dong-phoi | JNCp5R3Oq4 (redo of fHzOcRQCDY) | daybed x 14–67, base y 80; chairs x 3–17 / 74–94, feet y 88; floor ≈ 12–20 % | kept; green + blue cushions mixed; FAULT: left armchair pair at the left edge |
3. PEOPLE: sheets A and B now show every room small alone + large with the 4 figures spread (game stage crop, composite_spread.stage); sheets.py grid4 (old layout kept as main_v3).
- A: dev/handover/review-sheets/place-rank/place-rank-A-canh-phuc.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/place-rank-A-canh-phuc.jpg
- B: dev/handover/review-sheets/place-rank/place-rank-B-phoi-khon-ninh.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/place-rank-B-phoi-khon-ninh.jpg
- Quý phi bedroom spread (same path): place-rank-quyphi-ngu-spread.jpg
Note: the 6 kept v3 rooms are NOT redrawn; by the Lượt 477 numbers the Tần reception (floor ≈ 22 %) and Khôn Ninh reception (≈ 30 %+) show more floor than the Phi bedroom → owner to say whether those need a v5.
Credits v4: 8 gens × 135 = 1,080 (4 kept + 4 rejected first gens). TOTAL place-rank = 45 gens = 6,075 credits.

## HANDOVER → next worker (PR6): v5 (owner Lượt 491, FIGURE_GATE 14d + dev/art/ART_RULES.md L5 L7 L11, commit d72e87a; ROOT-49 GO for ONE round, then STOP) — NOT started by PR5 (context roll-over)
Foreman: ROOT-49 session_01PEhRbwA8JoKHSVRhbvu9G3 (replaces ROOT-48). Read 14d + L5/L7/L11 first, drop nothing.
KEEP, no regen: khon-ninh-cung, khon-ninh-cung-ngu.
0. Move current v4 files + sheets to img/_review/place-rank/v4/ (cp, then python3 dev/site/cdn_sync.py img/_review/place-rank/v4). They are already on disk if the container is fresh? No — pull first: python3 dev/site/cdn_sync.py --pull 'img/_review/place-rank/*'.
REDRAW:
1. canh-phuc-cung-tan-ngu: bed stands in the walkway → give it a real bed place (bed set into an alcove/against a wall like the Phi/Quý phi bedrooms).
2. canh-phuc-cung-phi-ngu + canh-phuc-cung-quyphi-ngu look IDENTICAL → Tần ≠ Phi ≠ Quý phi: each rank its OWN layout (e.g. bed position, partition/moon gate placement, window wall differ), same palace style card CARD_CP. NB the Phi bedroom v3 (SyhTG51Ub8) was the LAYOUT-NUMBERS template (Lượt 477): new layouts may differ in arrangement but keep its floor share (open floor ≈ 32 % left / 22 % centre / 13 % right of the height; right table group x 67–100 %, y 47–87 %). Ask ROOT-49 whether the Phi bedroom itself must be redrawn or only Quý phi (+ Tần) changed — 14d says "redraw so Tần ≠ Phi ≠ Quý phi".
3. thua-minh-cung-dong-phoi-ngu (1ldAmKir4r): colours by ROLE not by bed: ALL curtains one colour (e.g. pale blue), ALL furniture fabrics/cushions/bedding the other (pale green). Layout + pairing OK — keep it close (use 1ldAmKir4r as an extra image ref?). 5: its right corner is EMPTY → furnish it (e.g. tea table + stools / cabinet) set BACK from the bottom edge, like the Khôn Ninh bedroom table, so a figure in front covers it.
4. canh-phuc-cung-phi + canh-phuc-cung-quyphi receptions (ov6szIo829, 8ailnauIrU): chairs in an ARC + curved 3-face hall = "very AI" → rectilinear room, square corners, 2 walls (like the bedrooms / Tần reception) or a correct 3D box like the phối reception JNCp5R3Oq4 (owner likes it); furniture in straight lines along the walls.
7. Re-check ALL other rooms (Tần reception WDgFohIcXe, phối reception JNCp5R3Oq4) against L5/L11; redraw only rule breakers; list checked/kept/redrawn with reasons in the report.
Tools (all from PR4/PR5): prompts.py → prompts.json (V4 tuple, CORNER = LAYOUT NUMBERS sentence, CORNER_473 old one, ORDER sentence for receptions, V4REF = SyhTG51Ub8 as image 3; assert counts 'right' — adjust when adding corner sentences). Gen: images_generate mode gpt-2-6, resolution 2k, width 2688, height 1386, folderReference ba4aecfe-efce-47e2-b53f-30d292091886, refs gOmYI7iSXO + EbYJzsMuuO (+ layout ref), max 1 redo each; creations_wait → creations_register_download → curl results.url → PIL save WEBP q88 to img/_review/place-rank/<name>-ha-sang.webp. Look with a 10 % grid contact sheet (PR5 scratch grid.py: resize 900x464, red lines every 10 %), full size only to judge a fault. Sheets: python3 dev/art/place-rank/sheets.py FIGDIR img/_review/place-rank (grid4 = room small alone + large with 4 figures; then mv place-canh-phuc-cung-quyphi-ngu-canh-phuc-cung-quyphi-ngu-spread.jpg place-rank-quyphi-ngu-spread.jpg; copy the 3 jpgs to dev/handover/review-sheets/place-rank/; cdn_sync img/_review/place-rank). FIGDIR: curl https://ctm-img.victoria-tntt.workers.dev/img/{fig-consort-c06-t1-a18,fig-consort-c30-t1-a18,fig-maid-m19-t1-a18,fig-maid-m39-t1-a18}.webp. Ledger: one line per gen in dev/art/gen_ledger.jsonl (kind PLACE-RANK, see PR5 lines). Lessons: the model drifts to too much floor without the layout ref image; first gens with only wording failed. Budget guess: 6–7 rooms × (1 + redo) ≈ 1,600–1,900 cr — confirm cap with ROOT-49.

## v5 — DONE by PR6 (owner Lượt 491, FIGURE_GATE 14d, ART_RULES L5 L7 L11; ROOT-49 GO for ONE round) → STOP, waiting for the owner's verdict
Foreman ROOT-49 answer to PR5's question: KEEP the Phi bedroom v3 (Lượt 477 layout template); redraw Quý phi + Tần bedrooms each with its own layout.
0. v4 files + sheets copied to img/_review/place-rank/v4/ (disk + CDN).
Prompts: dev/art/place-rank/prompts.py v5 block → prompts.json (5 rooms rebuilt; the 5 kept rooms keep their old prompts). New shared sentences: RECT (L5 rectilinear, straight lines, no arc) + CORNER5 (Lượt 477 numbers + "image 3 only for how close/full, NOT where things stand" + right corner furnished, set back from the bottom edge). The old RIGHT sentence ("bottom-right almost clear") is dropped in v5 rooms (it caused the empty corner). Receptions: the LUOHAN "flanked on each side" wording is replaced by "armchairs standing only in the straight rows described above" (the flanking wording is the likely cause of the arcs). Layout lines per rank in L5BED / L5REC.
LAYOUTS (L11, every rank step different):
- Bedrooms: Tần = 2 walls (corner right, windows in the right side wall), bed set into an alcove just RIGHT of centre, moon gate + study at the LEFT · Phi (kept v3) = frontal, bed LEFT of centre, moon gate far left · Quý phi = 3-wall box, bed CENTRED on a platform between two mirrored moon gates.
- Receptions: Tần (kept v3) = frontal, daybed left of centre, moon gate left · Phi = 2 walls (corner left), one straight armchair row flat along the left wall, daybed right of centre · Quý phi = 3-wall box, daybed centred on a platform, two straight armchair rows along the side walls facing each other.
| picture v5 | gen id | measured (x/y % of width/height) | verdict |
|---|---|---|---|
| canh-phuc-cung-tan-ngu | EbY494KuuO (redo of s7Iczu2l8e: alcove bed but centre-left, same order as the Phi bedroom → L11) | bed x 35–74, step base y 80; right tea group x 78–100, y 55–85 | kept |
| canh-phuc-cung-quyphi-ngu | VX7KHZNMMU (first gen) | bed x 27–71, base y 82; right tea group x 76–100, y 47–93 | kept; FAULT: front stool reaches y 93 (a bit below 7/8); bottom-left incense box ≈ 14 % tall |
| canh-phuc-cung-phi | ov6ljBx829 (first gen) | daybed x 44–77, base y 75; left chair row x 0–27; guqin table + stool x 84–100, y 57–84 | kept; FAULT: floor ≈ 25 % at the centre (template 22 %); front armchair at the left edge (as in the kept Tần reception) |
| canh-phuc-cung-quyphi | gOmTc4oSXO (first gen) | daybed x 36–68, platform base y 73; chair rows x 0–21 / 79–100 | kept; FAULT: floor ≈ 27 % at the centre (more than the template); armchairs at both edges |
| thua-minh-cung-dong-phoi-ngu | cpSqbrH0eP (redo of DoO1KBtpcl: colours right but tea group pushed back to y 48–65, lower right bare again) | two beds x 20–76, base y 80; tea table + stools x 80–100, y 54–83 | kept; ALL curtains pale blue, ALL fabrics pale green (both beds alike); image 3 = v4 1ldAmKir4r |
No phoenix: friezes checked full size (gilt bats with bat wings).
RE-CHECK of the other rooms (L5/L11):
- canh-phuc-cung-phi-ngu (v3 SyhTG51Ub8): KEPT — foreman decision (the L5 template), rectilinear, its own layout now that Tần/Quý phi differ.
- canh-phuc-cung-tan (v3 WDgFohIcXe): KEPT — 2 walls, furniture in straight lines along the walls, floor ≈ 22 % (= template); layout differs from the new Phi (corner right vs left, daybed left vs right of centre) and Quý phi (box) receptions.
- thua-minh-cung-dong-phoi (v4 JNCp5R3Oq4): KEPT — owner likes it (14d 4: the correct 3D box example); it is a different palace/rank (Quý nhân), so L11 is not touched; its cushions mix green + blue (L7 is stated for the bedroom).
- khon-ninh-cung + khon-ninh-cung-ngu: KEPT — owner OK (14d 6).
PEOPLE: sheets A and B show all 10 rooms small alone + large with the 4 figures spread (sheets.py grid4).
- A: dev/handover/review-sheets/place-rank/place-rank-A-canh-phuc.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/place-rank-A-canh-phuc.jpg
- B: dev/handover/review-sheets/place-rank/place-rank-B-phoi-khon-ninh.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/place-rank-B-phoi-khon-ninh.jpg
- spread: dev/handover/review-sheets/place-rank/place-rank-quyphi-ngu-spread.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/place-rank-quyphi-ngu-spread.jpg
Credits v5: 7 gens × 135 = 945 (5 kept + 2 rejected first gens). TOTAL place-rank = 52 gens = 7,020 credits.
WORDING CHANGES (LAW #0, owner Lượt 505; ROOT-49 ruled both KEEP): (a) dropped RIGHT "bottom-right almost clear" in the 5 v5 rooms → serves owner point 14d-5 (empty right corner); (b) receptions' "flanked on each side" → "armchairs only in the straight rows described above" → serves owner point 14d-4 (arc). Floor share 25–27 %, armchairs at edges, stool y 93 %, bottom-left box 14 % = NOTES only, no prompt change.

## HANDOVER → next worker (PR7): v6 (owner Lượt 520, ART_RULES L12 + A18 LAW #0 + A20; ROOT-49 GO) — NOT started by PR6 (context roll-over; 0 gens made)
Foreman: ROOT-49 session_01PEhRbwA8JoKHSVRhbvu9G3. Owner words relayed: ALL layouts OK ("tôi cực kỳ ưng các cái bố cục") → KEEP every layout; EVERY room shows TOO MUCH EMPTY FLOOR at the bottom → redraw ALL 10 rooms with less visible empty floor, change ONLY the floor share (LAW #0: no other prompt change, our own fault notes stay notes).
Rooms (current file → gen id to use as image 3 = its OWN layout):
- canh-phuc-cung-tan-ngu EbY494KuuO (floor "hơi bị nhiều" — reduce most) · canh-phuc-cung-phi-ngu SyhTG51Ub8 ("ít hơn nữa, nhỏ hơn nữa") · canh-phuc-cung-quyphi-ngu VX7KHZNMMU
- canh-phuc-cung-tan WDgFohIcXe · canh-phuc-cung-phi ov6ljBx829 · canh-phuc-cung-quyphi gOmTc4oSXO (receptions: reduce most)
- thua-minh-cung-dong-phoi-ngu cpSqbrH0eP · thua-minh-cung-dong-phoi JNCp5R3Oq4 (floor only)
- khon-ninh-cung-ngu jUonRSTLD0 · khon-ninh-cung kse24n816B (floor only)
- NEW: Hoàng quý phi (t7) bedroom + reception, to compare with Hoàng hậu: rank between Quý phi and HH, below Khôn Ninh luxury, OWN layout (L11: different from every Cảnh Phúc room and from Khôn Ninh), people on the sheet. Needs a palace name + style card (ask ROOT-49 which palace HQP lives in; A1 sample-first applies to this new design: one sample pair, then STOP).
Suggested method (keeps layout, changes only floor): for each room run its EXISTING prompt from prompts.json word for word, but image 3 = that room's own current gen (list above) instead of SyhTG51Ub8, and replace ONLY the floor numbers inside the LAYOUT NUMBERS / CORNER5 sentence: base of the main piece at about seven eighths of the picture height (was four fifths), open floor strip about one tenth of the height at the centre (was one fifth), "keep the same room and the same arrangement as image 3, seen a little closer and lower so less floor shows". The 4 rooms without CORNER5 (Tần reception, phối reception, Khôn Ninh ×2) take the same one floor sentence ADDED (B5: insert, never rewrite). Do this in prompts.py as a v6 block (FLOOR6 constant + replace), keep V5 untouched for history. Ask ROOT-49 before using it if unsure it counts as "floor only".
Check: measure open floor at the centre (bottom edge → base of the main piece) on a 10 % grid; target ≤ ~12 %; figures' feet line in composite_spread (cs.FEET) must still land on floor, not on furniture — check the people sheet. Look at each gen full size; regen only on a real (owner-point) fault; max 1 redo.
Order + reporting: Cảnh Phúc 6 → sheet A → send ROOT-49; phối 2 + Khôn Ninh 2 → sheet B → send; HQP pair → its own sheet (extend sheets.py) → send; then STOP. READ messages (ReadNotifications) between every gen.
Tools as v5: images_generate mode gpt-2-6, resolution 2k, 2688x1386, folderReference ba4aecfe-efce-47e2-b53f-30d292091886, refs gOmYI7iSXO + EbYJzsMuuO + image 3; creations_wait → creations_register_download → curl url → PIL WEBP q88 → img/_review/place-rank/<name>-ha-sang.webp (first cp current files to img/_review/place-rank/v5/ + cdn_sync). Grid preview helper: 1400x722 with red lines every 10 % (recreate; PR6's was in scratch). Sheets: python3 dev/art/place-rank/sheets.py FIGDIR img/_review/place-rank, then mv place-canh-phuc-cung-quyphi-ngu-canh-phuc-cung-quyphi-ngu-spread.jpg place-rank-quyphi-ngu-spread.jpg, copy jpgs to dev/handover/review-sheets/place-rank/, cdn_sync img/_review/place-rank. FIGDIR: curl https://ctm-img.victoria-tntt.workers.dev/img/{fig-consort-c06-t1-a18,fig-consort-c30-t1-a18,fig-maid-m19-t1-a18,fig-maid-m39-t1-a18}.webp. Ledger: one PLACE-RANK line per gen (see PR6 lines). Git: the ledger often conflicts on rebase (both sides append) → keep both sides' lines. Paste prompts verbatim from prompts.json (print them; never hand-type). Budget: 12 rooms × (1 + redo) ≈ 1,620–3,240 cr — confirm cap with ROOT-49.

## v6 (owner Lượt 520, L12 + A18 LAW #0) — worker PR7 (session_01PEhRbwronSNrACtu2Qiwhx, depth 3), foreman ROOT-50
Method: dev/art/place-rank/prompts.py v6 block → prompts_v6.json. Every room = its v5 prompt word for word; image 3 = that room's OWN current gen;
ONLY the floor numbers change (base of main piece 4/5 → 7/8, open floor strip 1/5 → 1/10, "seen a little closer and lower so less floor shows",
"keep the same room and the same arrangement as image 3"). Rooms without floor numbers (Tần reception, Phi bedroom, Khôn Ninh ×2) get ONE added FLOOR SHARE sentence.
v5 copies: img/_review/place-rank/v5/ (disk + CDN).
### Sheet A — Cảnh Phúc 6 (6 gens, 810 cr, 0 redos)
| room | gen | open centre floor v5 → v6 |
|---|---|---|
| Tần bedroom | aFGy5YNfSh | ~25 % → ~13 % |
| Phi bedroom | If3UHfPtvE | ~22 % → ~7 % |
| Quý phi bedroom | gOmViD0SXO | ~20 % → ~9 % |
| Tần reception | iG5hVwC3uK | ~27 % → ~7 % |
| Phi reception | If3UKjGtvE | ~27 % → ~13 % |
| Quý phi reception | 9ZHIVwlNYZ | ~25 % → ~11 % |
Sheet: dev/handover/review-sheets/place-rank/place-rank-A-canh-phuc.jpg · CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/place-rank-A-canh-phuc.jpg
Notes (ours, NOT prompt changes — LAW #0): Tần reception left armchair pair now larger close to the left edge; Phi bedroom bed curtains now reach the bottom ~90 % (figures stand in front of the bed bench).
### Sheet B — phối 2 + Khôn Ninh 2 (4 gens, 540 cr, 0 redos)
| room | gen | open centre floor before → v6 |
|---|---|---|
| phối bedroom | s7I0GAVl8e | ~22 % → ~10 % |
| phối reception | jUoWAEyLD0 | ~28 % → ~12 % |
| Khôn Ninh bedroom | YMlHuhtWeC | ~25 % → ~9 % |
| Khôn Ninh reception | rgXnGrDxtc | ~15 % → ~4 % |
Sheet: dev/handover/review-sheets/place-rank/place-rank-B-phoi-khon-ninh.jpg · CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/place-rank-B-phoi-khon-ninh.jpg
Notes (ours, not changed): Khôn Ninh reception — the front low table + stools now reach the bottom edge, so on the people sheet figures 3–4 stand among/over the stools (feet not on clear floor).
### Owner Lượt 548 (sheet A): all distances OK EXCEPT Phi bedroom v6 "gần quá" → v6b redraw (A20), only the camera distance
Phi bedroom v6b aFGyN6afSh (prompts_v6b.json: FLOOR SHARE sentence says "same distance as image 3, NOT closer, whole bed fits, nothing cropped, camera only a little lower"; image 3 = own v3 SyhTG51Ub8). Open centre floor ~14 %. v6 If3UHfPtvE kept in img/_review/place-rank/v6/. Sheet A rebuilt.
### Owner Lượt 554 (sheet B): phối ×2 + Khôn Ninh bedroom OK; Khôn Ninh reception REDO (table in the middle) → v6c 9ZHIFD7NYZ
prompts_v6c.json: only her point — the "middle ground furnished with low tables/rugs" clause replaced by "NO table and NO stools in the middle … tea tables only between the side armchairs"; mat at the foot of the dais; FLOOR SHARE says "except that the low table and stools in the middle are removed". Image 3 = v6 rgXnGrDxtc (kept in v6/). Centre floor open ~16 % for the 4 people; feet on clear floor. Sheet B rebuilt.
### Sheet C — NEW Hoàng quý phi (t7) pair vs Hoàng hậu (A1 sample, then STOP)
PALACE: no palace for HQP in the game data/docs (OD L41 only says HQP lives alone) → picked **Trường Xuân cung** (in the game's Đông lục cung list, no rooms drawn yet).
STYLE CARD (CARD_TX in prompts.py): flower = white magnolia (ngọc lan); carved endless swastika-fret borders + round longevity medallions; dark zitan sandalwood with gold lacquer + mother-of-pearl; square-backed furniture (Cảnh Phúc = round-backed); tall VASE-SHAPED doorway (Cảnh Phúc = round moon gate); kingfisher-blue feather-inlay screens.
RANK (LUX7 + COL7, I1): richer than Quý phi, one step below the Empress; golden apricot yellow ONLY in bedding/seat brocades (warmer/softer than HH imperial yellow), deep ruby red curtains/lanterns/tassels, a pair of small phoenixes only (no golden phoenix statues).
LAYOUTS (L11/L5): bedroom = back wall + right side wall; a walk-in babu bed centred, kingfisher screen left, vase doorway to a dressing room right, dressing table group right corner. Reception = back wall + right side wall; full-width carved luozhao arch frame, luohan daybed on a one-step platform centred under a gilt plaque, cloisonné flower stands, ONE chair row along the right wall, vase doorway left.
| room | gen | result |
|---|---|---|
| HQP bedroom | u5WNiYGQLD | rejected: floor ~17 % |
| HQP bedroom | s7I0dD0l8e | KEPT: floor ~11 % (image 3 = QP bedroom v6 gOmViD0SXO as closeness guide) |
| HQP reception | vQAORPpa47 | rejected: floor ~19 % + Chinese characters on the plaque (our words "plaque with carved characters" → fixed to "carved with magnolias (no writing)") |
| HQP reception | rgXnolAxtc | SHOWN WITH FAULT (redo 1/1 used): no text, design OK, but open centre floor ~23 % |
Sheet: dev/handover/review-sheets/place-rank/place-rank-C-hqp-vs-hh.jpg · CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/place-rank-C-hqp-vs-hh.jpg
Round credits (PR7): 17 gens × 135 = 2,295 cr (cap 3,300).
STATUS: PR7 STOPPED after the HQP sample (A1). Open: HQP reception floor too big (foreman/owner decides on 1 more gen; suggested: same prompt, image 3 = the HQP bedroom s7I0dD0l8e as closeness guide).
