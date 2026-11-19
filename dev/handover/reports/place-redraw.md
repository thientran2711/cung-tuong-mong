# place-redraw: measure + 2 samples (helper of Foreman C ROOT-47; owner Lượt 389-397)

## v2 (owner Lượt 397) — CURRENT. The v1 samples and the v1 recipe below are SUPERSEDED.
Sheet v2: https://ctm-img.victoria-tntt.workers.dev/img/_review/place-redraw/sample-sheet-2.jpg (local copy: scratchpad gui/7-noi-chon-mau2.jpg)
Rows: tẩm cung (TARGET) + c06 c30 m19 m39 at game size | alone; NEW Khôn Ninh + 4 | alone; NEW Cảnh Phúc chính điện + 4 | alone.
NEW masters v2: img/_review/place-redraw/khon-ninh-cung-ha-sang-new2.webp, img/_review/place-redraw/canh-phuc-cung-ha-sang-new2.webp (2688x1386).
Owner faults with v1: rooms too EMPTY (a stage left free for people), colours pale/forced by the grade. Fixed in v2: lived-in, furnished through the whole room with foreground pieces and depth like tẩm cung; natural colour, NO grade.
Gens: Lw8zAZvswO Khôn Ninh, gOmWnWySXO Cảnh Phúc (2 x 135 = 270 cr; total so far 6 gens = 810 cr). Looked full size: furnished, deep, same hand and colour as the bedroom, real floor (stone tiles / wood boards), no big rug (small mat under the tea table in Cảnh Phúc), throne / moon gate in the centre half. Figures read lit by the room on both, like on the bedroom.
Light numbers v2 (same method as below): NEW Khôn Ninh L 54.0, Lsd 20.3, C 18.1, a +9.6, b +12.1, L-R -4.5 · NEW Cảnh Phúc L 55.0, Lsd 19.9, C 20.9, a +10.3, b +16.3, L-R -7.3 · bedroom L 56.5, Lsd 18.6, C 14.4, a +7.3, b +8.7, L-R -2.1. So v2 sits on the bedroom's own light and contrast (figures L ~75 stand out of it as on the bedroom).

### RECIPE v2 for the 35 rooms (run exactly like this)
1. Refs (type image, this order): image 1 = tam-cung-dem-ha-sang (Magnific upload gOmYI7iSXO), image 2 = M09 hd figure img/hd/fig-maid-m09-a18.webp (upload EbYJzsMuuO). NEVER the old room picture (not as ref, not as edit).
2. gpt-2-6, resolution 2k, width 2688, height 1386, folder ba4aecfe-efce-47e2-b53f-30d292091886, 1 gen per room (135 cr).
3. Prompt = dev/art/place-redraw/prompt_template.txt (v2). Fields: {SEASON_TIME} "summer morning", {TIME_LIGHT} "morning daylight", {ROOM_LINE} = the room described from scratch as "a real room in daily use" + a LONG list of furniture and everyday objects through the room + "foreground pieces at the left and right edges (a carved table with objects, a vase, a curtain fold) give depth", {FLOOR} "polished stone tiles" / "warm polished wooden floorboards", {MAT_UNDER}, {KEY_PIECE}.
   - khon-ninh-cung ROOM: "Khôn Ninh cung, the Empress's main hall in an ancient Chinese imperial palace, a real room in daily use: towards the back a carved rosewood throne couch with red silk cushions on a low dais, behind it a folding screen painted with a phoenix among peonies; red lacquer pillars; hanging red and gold palace lanterns; sheer embroidered curtains tied back; a pair of golden phoenix figures on tall stands; side tables with celadon vases of lotus, a tea set, an incense burner, a small writing desk with scrolls, a fan on a stand, potted peony; lattice windows open onto a sunny summer garden; foreground pieces at the left and right edges (a carved table with objects, a vase of flowers, a curtain fold) give depth." FLOOR stone tiles, MAT "the dais", KEY "the throne area".
   - canh-phuc-cung ROOM: "Cảnh Phúc cung chính điện, the main hall of a high-ranking imperial consort's palace in ancient China, a real room in daily use: at the back a large carved round moon-gate doorway with gilded lattice, opening onto a sunny courtyard garden with a tree and a lotus pond; pale green sheer embroidered curtains tied back; hanging palace lanterns; a folding screen painted with bamboo and cranes; a carved rosewood settee with celadon cushions and a small low table with a tea set; side tables with porcelain vases of pink flowers, an incense burner, a guqin on a stand, a bookshelf with scrolls and boxes, a round embroidered fan on a stand, potted plants; foreground pieces at the left and right edges (a carved table with objects, a vase, a curtain fold) give depth." FLOOR wood boards, MAT "the settee", KEY "the moon gate".
4. Look at each result full size: reject an empty stage-like room, a big rug, people, text, plastic look, key piece outside the centre half; redo once.
5. NO colour grade (owner Lượt 397). Save the render as webp q88, 2688x1386 -> img/<room>-<season>-<time>.webp. (dev/art/place-redraw/grade.py is kept only as the light-measure tool; do not apply it.)
6. Check sheet per room: the 4 figures c06 c30 m19 m39 t1 a18 at 0.73 H, feet ~0.92 H, next to tẩm cung + 4.

---
## v1 (superseded)
Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/place-redraw/sample-sheet.jpg
NEW masters: https://ctm-img.victoria-tntt.workers.dev/img/_review/place-redraw/khon-ninh-cung-ha-sang-new.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/place-redraw/canh-phuc-cung-ha-sang-new.webp
Delete after verdict: `python3 dev/site/cdn_sync.py --wipe-review place-redraw`.

## A. Measure (main c02748c, built root, HOST mode = real rot.js frame, Playwright, places kn Càn Ninh = khon-ninh-cung, r2 Cảnh Phúc cung chính điện)
The painting is `#scimg` (div, `background-size: cover`, position set per room by kitFloorFit, jk2b.js; a Pixi copy `.pxc` uses the same crop).
The game always runs at a DESIGN size (rot.js): landscape spread 1180x820, portrait one page 590-644x852; it is then scaled by s. Stage sizes below are design px; "screen" = x s.

| device (viewport) | layout | stage box (design px) | aspect | screen px | fit / position | visible of 1620x1080 | visible of 1280x720 |
|---|---|---|---|---|---|---|---|
| iPad Air land 1180x820 | spread, place full width | 1162 x 599 | 1.94 | 1162 x 599 | cover, 50% 100% (bottom) | full width, top 22.6 % cut | full width, top 8.3 % cut |
| iPad Pro land 1366x1024 | same, s 1.158 | 1162 x 599 | 1.94 | 1345 x 694 | same | same | same |
| iPhone 14 portrait 390x844 | landscape frame turned sideways (rotate prompt), s 0.476 | 1162 x 599 | 1.94 | 553 x 285 | same | same | same |
| Pixel portrait 412x915 | turned sideways, s 0.502 | 1162 x 599 | 1.94 | 584 x 301 | same | same | same |
| iPad Air portrait 820x1180 | one page 593x852, s 1.385 | 583 x 599 | 0.97 | 807 x 830 | cover, x by KIT_FANCHOR (kn 76.6 %, r2 73.8 %), y 50 % | 65 % of width (L 26.9 / R 8.2), full height | 55 % (L 34.7 / R 10.6) |
| Fold inner 755x1000 | one page 644x852, s 1.174 | 634 x 599 | 1.06 | 744 x 703 | cover, x 79.8 % / 78.4 % | 70.5 % (L 23.5 / R 6.0) | 59.5 % (L 32.3 / R 8.2) |
| (home room, any landscape) | spread LEFT page, actions on the right | 580 x 599 | 0.97 | — | cover, x by anchor | like iPad portrait | like iPad portrait |

Dư đồ on iPad landscape: the map (`.mapsc`) takes exactly the same box as the place stage, 1162 x 599 at (9,164), horizontal, under the top bar; opening a place from it shows the place painting in that same full-width box (shots: scratchpad stage-measure/ipadAir-kn-go.jpg, ipadAir-r2-act.jpg). The narrow 580 x 599 "left page" box is the player's own room (home) with the action page on the right.
So the old 3:2 / 16:9 pictures never fit the iPad stage: 3:2 loses 22.6 % of its top, 16:9 loses 8.3 %.

**Master canvas chosen: 2688 x 1386 px (aspect 1.939 = 1162/599)**: ≥ 2x the iPad Pro screen box (1345x694), shown uncropped on every landscape iPad and every phone (phones turned sideways). Generated natively at this size (gpt-2-6 custom size), no crop needed.
**Phone / one-page portrait safe zone**: phones in portrait show the WHOLE landscape stage sideways (no crop). Portrait one-page screens (Fold inner, iPad portrait, and the 580-wide home room) show the full height and only 50-55 % of the width (583..634 / 1162). With KIT_FANCHOR x = 0.5 that is the centre strip x 25 %..75 % of the master (672..2016 px); keep the key furniture inside x 27 %..73 % and set KIT_FANCHOR x = .5 / feet ≈ .92 for the new paintings (the old anchors .55 etc. push the strip right).
Figures on the iPad stage: about 0.73 x stage height tall (≈ 436 of 599), feet ≈ 0.90-0.92 H (place-stage.md, kitFloorFit --kfh/--kfb).

## Who made the old place paintings
- Season/time variants of the 10 scenes (khon-ninh-cung, tam-cung-dem, ...): **Magnific gpt-2-6 EDIT** of each original picture, 1344x752 -> 1280x720, no style ref (dev/art/PROGRESS_seasons.md); later colour-graded per buổi (dev/art/scene-light, grade2.py).
- Residence rooms (canh-phuc-cung..., 3:2 1620x1080): **Magnific gpt-2-6** (dev/build/jres.js header "Magnific gpt-2-6, 3:2").
- The original 1280x720 base scenes: no gen record found in main (shallow history, ledger only from 19/11).

## B. Samples (4 gens x 135 cr = 540 credits; 2 discarded)
- Gens 1-2 (s7IzHDDl8e, s7IzHXXl8e) used the OLD room as image 3: DISCARDED per owner Lượt 392 (brand-new paintings only), never downloaded.
- Gens 3-4 KEPT: ov6xTEB829 Khôn Ninh cung, s7IzbiNl8e Cảnh Phúc cung chính điện (summer morning). Both: no big rug (only a small mat under the dais / settee), real floor (stone tiles / wood boards) in the lower third, key furniture in the centre half, soft painterly finish close to the bedroom. Looked full size: not plastic; Cảnh Phúc is the closest to the bedroom hand; Khôn Ninh is a bit pale/lavender but calm.

### Recipe v1 (SUPERSEDED by v2 above)
1. Refs (type image, this order): image 1 = tam-cung-dem-ha-sang (Magnific upload gOmYI7iSXO), image 2 = M09 hd figure img/hd/fig-maid-m09-a18.webp (upload EbYJzsMuuO). NEVER the old room picture.
2. Model gpt-2-6, resolution 2k, width 2688, height 1386 (custom size), folder ba4aecfe-efce-47e2-b53f-30d292091886, 1 gen per room, 135 cr.
3. Prompt = dev/art/place-redraw/prompt_template.txt with the per-room fields: {SEASON_TIME} (e.g. "summer morning"), {ROOM_LINE} (what the room is + its furniture, described from scratch), {FLOOR} ("large smooth polished pale stone tiles" / "warm polished wooden floorboards"), {MAT_UNDER}, {KEY_PIECE}.
   Per-room lines used:
   - khon-ninh-cung: ROOM "Khôn Ninh cung, the main audience hall of the Empress in an ancient Chinese imperial palace: at the back centre a low two-step wooden dais with a carved rosewood throne couch with red silk cushions, behind it a large folding screen painted with a phoenix among peonies; a pair of small golden phoenix figures on tall stands beside the dais; red lacquer pillars at the sides, hanging palace lanterns, celadon vases with lotus on side tables, carved lattice windows open onto a summer garden at the left and right." FLOOR stone tiles, MAT "the dais", KEY "dais, throne and screen".
   - canh-phuc-cung (chính điện): ROOM "Cảnh Phúc cung chính điện, the main hall of a high-ranking imperial consort's palace in ancient China: at the back centre a large carved round moon-gate doorway with gilded lattice, open onto a sunny courtyard garden with a tree and a lotus pond; on one side a folding screen painted with bamboo and cranes and a low carved table with a small incense burner; on the other side a carved rosewood settee with pale celadon cushions and a vase of pink flowers; pale green sheer curtains, hanging palace lanterns." FLOOR wooden boards, MAT "the settee", KEY "the moon gate".
4. Look at each result (creations_read medium): reject a big rug, people, text, plastic/glossy look, key furniture outside the centre half; redo once.
5. Light-match grade: `python3 dev/art/place-redraw/grade.py raw.png out.webp` (Lab: mean L lifted toward figures' L - 7 (max +5), contrast eased to Lsd 13.5, a/b moved halfway toward the 4 test figures' mean). Output 2688x1386 webp q88 -> img/<room>-<season>-<time>.webp. Season/time variants: same recipe, change {SEASON_TIME} (fresh gen, or gpt-2-6 edit of the NEW summer-morning master).
6. Game side (not done here): KIT_FANCHOR x .5 / feet ~.92 and KIT_FLOOR ~.62 for the new pictures; kitFloorFit reads the natural size, so 2688x1386 needs no code change.

### Light numbers (Lab on opaque figure pixels / whole picture; L-R = left half minus right half: negative = lit from the right)
Test figures (random, seeds in this report: C from c01-c32 random.seed(390) -> c06, c30; NEW m-persons of the 18-19/11 owner design -> m19, m39), all t1 a18:
| image | L | Lsd (contrast) | chroma C | a | b | mean RGB | L-R |
|---|---|---|---|---|---|---|---|
| fig-consort-c06-t1-a18 | 70.8 | 15.0 | 27.9 | +18.0 | +20.8 | 216,161,138 | -9.8 |
| fig-consort-c30-t1-a18 | 82.8 | 10.8 | 7.2 | +4.3 | +3.8 | 218,204,200 | +0.9 |
| fig-maid-m19-t1-a18 | 72.1 | 10.8 | 20.5 | +10.1 | +17.6 | 207,170,146 | -0.3 |
| fig-maid-m39-t1-a18 | 74.4 | 11.8 | 6.5 | +4.4 | -0.5 | 191,181,185 | -3.1 |
| M09 fig-maid-m09-a18 (light ref) | 70.2 | 12.5 | 22.4 | +18.2 | +12.4 | 212,160,151 | -3.3 |
| figures mean (4) | 75.0 | ~12 | — | +9.2 | +10.4 | — | — |
| bedroom tam-cung-dem-ha-sang | 56.5 | 18.6 | 14.4 | +7.3 | +8.7 | 154,132,123 | -2.1 |
| OLD khon-ninh-cung-ha-sang | 62.6 | 19.2 | 25.6 | +11.0 | +18.3 | 180,144,121 | +0.4 |
| NEW khon-ninh raw -> graded | 65.9 -> 68.0 | 14.8 -> 13.5 | 14.4 -> 14.8 | +9.3 -> +9.2 | +9.2 -> +9.8 | 189,160,149 | -2.7 |
| OLD canh-phuc-cung-ha-sang | 69.4 | 16.0 | 20.7 | +3.1 | +18.6 | 188,167,137 | +0.1 |
| NEW canh-phuc raw -> graded | 61.7 -> 66.7 | 13.5 -> 13.5 | 19.3 -> 17.2 | +9.0 -> +9.1 | +15.9 -> +13.1 | 188,157,140 | -2.7 |
Reading: the old rooms are harder (Lsd 16-19) and more saturated/yellow (b +18) than the soft figures (Lsd ~12, b ~+10) and lit flat (L-R ≈ 0); the new ones are soft (Lsd 13.5), warm-neutral like the figures and lit from the right like M09 / c06 / m39. On the sheet the 4 figures sit in the new rooms; on the old ones they look pasted on (bright red/gold behind them).

## Files
dev/art/place-redraw/prompt_template.txt, dev/art/place-redraw/grade.py; ledger: 4 PLACE-REDRAW lines in dev/art/gen_ledger.jsonl. Measure script + shots stay in the session scratchpad (stage-measure/, measure2.js).
