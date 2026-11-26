# GOD-RESEARCH — how Game of Dice (Joycity 2015) presents skill cards → SPEC for our Bàn bài / kitHand
PRIORITY #1 CHECK: OD 2 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0; reuse kitHand (jkhand.js, review/kit-stage-r4 41594be5), kit-plaque-post, Bàn bài. (kitHand code not in this sparse checkout; sizes below must be checked against it by KK.)

## Sources and honesty
- The owner's 3 shots (refs/owner-2611-god/god1-3): seen directly, all pattern facts below come from them.
- App Store listing (apps.apple.com/us/app/game-of-dice/id946811576): 200+ skills, deck-building, skills are played on the board.
- WebSearch (standard): no public guide describes select/enlarge/Use steps. The fan wiki (game-of-dice.fandom.com/wiki/Skill_Cards) and Joycity help (joycity.oqupie.com/portals/402/articles/8300) are NOT reachable from this network (ENOTFOUND) — not read.
- I could NOT watch gameplay video here, so motion timings below are NOT observed; they are my proposals (marked PROP) from common card-UI practice. If sếp wants observed timings, someone must record the app.

## What the 3 shots show (observed)
1. Hand: 3 cards fanned at bottom-centre over the board; side cards tilted ~±8°, overlapping the middle one by ~15 %, the middle one raised ~20 px and in front; the cards are cut by the screen bottom (the effect text is half hidden when not chosen).
2. Card face (all on the FRONT): name band on top (curved plate) · large art ~45 % of height · star row (rarity/level, 3–5 stars) under the art · SHORT effect text in 2–3 centred lines at the bottom. Gold ornate border = rarity colour. No cost line, no flip.
3. Chosen card: enlarged to ~35 % of screen width in the centre, glowing banner on top («recommended skill»), ONE wide Use button flush under the card (same width as the card, rounded, gold), the other cards stay small at the bottom-left, board visible but dimmed ~30 %. A small status («skill in use») appears at the right after use. Dice roll is blocked while a skill is used.

## Mapping to ours (take the pattern, not the look)
| Game of Dice | Ours (VANPHONG cổ trang, our art, kit) |
|---|---|
| name band | kit plaque (kit-plaque-post): tên thẻ, cổ trang |
| art 45 % | our event/card art from the kit art set (Magnific gpt-2-6, law 9), no Joycity art |
| star row | NOT stars. Show Tốn exactly («Tốn: n khắc / n lượng», from BAL, law 4) on a kit chip row |
| short effect text | 2 lines max: «Được: …» green mark and «Mất: …» red mark (law 3 gain-and-loss, law 2 equal value); no % ever (law 7 words) |
| Use button | «Chọn» (kit button tier L) |
| glow banner | kit title plaque «Thẻ này?» is optional, skip unless sếp wants |
| dim board | keep the event backdrop visible at 65 % |
Two-way law: NPC hands use the same card face. Cards of one hand have equal value (law 2), so the face must make no card look «best» (no crown/«recommended» banner).

## SPEC — info on FRONT, tap = enlarge + ONE «Chọn», NO flip
Sizes (law 10/12, ratio 5:7 like her shots; one fixed size per tier across devices):
| | Fold 755x1000 portrait | iPad 1180x820 landscape |
|---|---|---|
| card small (in hand) | 150x210 | 170x238 |
| card enlarged | 360x504 (48 % width) | 340x476 (height-capped: 58 % of 820) |
| fan | 3 cards, tilt −8°/0/+8°, overlap 20 px, middle raised 20 px, centred at bottom | same, hand at bottom-left, enlarged in centre |
| button «Chọn» tier L | 280x64, 12 px under the card | 280x64 (same size, the largest the tier needs) |
| backdrop | event background only, no character figure (owner 22:07Z), dimmed 35 % | same |
Face layout on both (enlarged): plaque 12 % · art 45 % · Tốn chip row 9 % · Được/Mất 2 lines 26 %. Small card in hand shows ONLY plaque + art + Tốn (effect hidden, less clutter); enlarged shows all.
Behaviour: tap card A → A enlarges, others shrink back/dim; tap another card → switch; tap outside or ✕ (kit ✕) → back to hand; «Chọn» → play. Hit target ≥ 48 px; the button never overlaps the card text.
Motion (PROP, not observed): deal 3 cards in 220 ms each, stagger 80 ms, from bottom; lift 120 ms ease-out; enlarge 200 ms ease-out (scale + move to centre); use: card flies up and fades 250 ms; dismiss 150 ms.

## RULED by sếp (verbatim, via MAIN 167): "Ok bỏ lật, làm theo Game of Dice"
NO FLIP anywhere. Version A is the only spec; the old rule 22:07Z (tap 2 flip) is overwritten (canon overwrite, law 14). The flip-back state is removed from kitHand.
Card FRONT carries everything: name · picture · Tốn exact · Được/Mất marks · odds word (Liều/Khó/Năm ăn năm thua/Khá chắc/Chắc/Rất chắc/Nắm chắc, kit chip, no %). In the enlarged card the odds word sits on the Tốn chip row (right end); the small hand card shows plaque + art + Tốn only.

## Wireframes
refs/god-spec/fold-755x1000.svg and ipad-1180x820.svg (plain shapes, enlarged state, version A).

## Handover
Context low, no rollover needed. Next: sếp picks A/B → MAIN → KK builds kitHand enlarge + «Chọn» → KIT-STAGE applies to every Bàn bài / event hand.
