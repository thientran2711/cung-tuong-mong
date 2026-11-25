# makeup-set — mirror preset sets back + mirror never plays for her + sharp result + ✓ word (worker MAKEUP-SET, MAIN 147)

PRIORITY #1 CHECK: OD 4 ('Trước gương đồng') / 1 ('tông ấm') / 1 ('bộ màu') | main jtoil TOIL_PRE (16 sets) + toilPreRows intact, jration lxColRows, jallot oil wrap | review/* none | claims 2 (this job).
Prior rulings kept: OD L748 (4 cool + 4 warm per group, lips exact), L1515 (set name only), L1756, L1465/L1513 (no clutter).

## Root causes
1. **Sets gone** (owner OD 25/11 ~23:20Z, shot k12): commit 02ed7d10 *monthly-ration* (18/11) — `lxColRows` dropped every preset set whose 4 colours she did not ALL own as boxes; jallot (hair oil) then dropped the whole «Kiểu cầu kỳ» row without oil. With one random-colour box per part, all 16 sets vanished → «one swatch per part».
   Also the set item was one conic-mixed circle, not a 4-swatch block.
2. **Mirror skipped to Khuynh thành** (shot k13): `toilMakeup` frame(): when the face points (`img/mk-fit/<face>.json`) had not arrived after `BAL.toil.meshWait` (8 s), the board PLAYED her sitting (`toilNpcPlay`) and finished. `MK_FIT.load` never retried a failed fetch; the face picture (`new Image`, not in the DOM) had no retry either → empty beige glass.
3. **Blurry result** (shot k14): `toilReveal` zoomed so her face = 34 % of the short side (iPad: face ≈ 560 device px) while the sharpest source face is 134 px (por) / ~160 px (img/hd fig) → 3.5–4x upscale.
4. **Bare «✓» bar**: KIT §13.x sign pass (OD 20/11 no words in play) turned «Kẻ xong» into a bare ✓.

## Fix (sha below)
- KIT §60 `kitSwatches`: SET item (`cols` ×4 → 4 swatches side by side + name), OFF item (greyed, never applied, tap → «name: thiếu …» in the row header), row `note`. KIT.md §60 + KIT_REQUESTS entry.
- jration `lxColRows`: every set stays; unowned colour → greyed, why = «thiếu <colours>»; row note «Bộ mờ là thiếu hộp đúng màu (chạm để xem thiếu gì). Đường kiếm: …» (one string `LX_ROADS`, also used by the mirror note). `lxColPick` crash guard.
- jallot: no oil → Kiểu cầu kỳ sets greyed «thiếu dầu chải tóc» (not hidden).
- jtoil board: never auto-plays; re-fetches the face points every meshWait; a picture with no points → another picture of HER face that has them (real points, never guessed); after meshWait she gets «Bỏ qua» (kitQuick) / «Để mặt mộc»; face picture re-fetched (BAL.toil.faceRetry 3, faceRetryMs 1200).
- jtoil reveal: face drawn at most `BAL.toil.rvUp` 1.25 x its source pixels (portrait or HD fig twin, whichever is sharper; device px incl. design-canvas scale); zoomed figure gets its HD twin.
- j82 sign pass: the DONE sign keeps ≤ `BAL.mgDoneWords` (2) words: «✓ Kẻ xong» (whole family: every mini-game done button). dev/test/mg-noword-kit.js accepts it. **Note for MAIN: this softens OD 20/11 «no words in play» for done buttons only (same as the mg-5s-clear keep-words «✓ Dán»); one-line revert in j82 if sếp disagrees.**

## Whole family (dev/test/makeup-set-scan.js)
| part | place | before (origin/main) | after |
|---|---|---|---|
| A | jration lxColRows (makeup sets by boxes) | BAD: drops sets | OK: greyed + why |
| A | jallot wrap (Kiểu cầu kỳ by hair oil) | BAD: drops the row | OK: greyed + why |
| A | toilDressUI (dress / jewels) | OK: fixed tabs, owned pieces (never had sets) | OK |
| A | kitSwatches kit part | BAD: no set block / no greyed state | OK |
| B | jtoil makeup board wait | BAD: plays her sitting after 8 s | OK: waits, her choice |
| B | jhd hoa điền board wait | OK: falls back to the face-box anchor, she still plays | OK |
| C | toilReveal close-up (k14) | face 3.5–4x source px | ≤ 1.25x (test: Fold 201/161, iPad 197/158) |
| C | kitFaceZoom (mirror colour step, 200 px round) | ~2x source px at dpr 2 | NOT changed (owner-approved size; capping shrinks the face in the frame) — MAIN to decide |
| C | mirror board glass | face ~2–3x source px | NOT changed (the board needs that face size to play) — needs bigger portraits (art, Foreman C) |

## Tests
- `node dev/test/makeup-set.js <worktree>` 755x1000@2 + 1180x820@2: ALL PASS (16/16 sets, 4 colours each, names only, greyed with why + row note, owned set applies all 4, greyed tap changes nothing, no-oil greyed, board waits + her buttons, face re-fetched, later points start her board, «✓ Kẻ xong», close-up within pixels, no page errors).
- `node dev/test/makeup-set-scan.js` before FAIL 4 → after ALL OK.

## Open note (not a question to sếp now)
With today's ration (one random colour per part) she rarely owns all 4 colours of any set, so most sets show greyed. Design follow-up for MAIN if sếp wants sets usually pickable (e.g. ration colours drawn from a set).

## r2 — WHOLE SETS in the ration (MAIN 147 order 25/11 23:03Z)
- BAL.ration.set {on, pair:2, start:["cool","warm"], diemRank:4}. Nội vụ phủ issues the colours of ONE preset set per `pair` months (the month's parts rotate, so 2 months complete it); any box without a colour (gift, shop, old save) takes its period's set.
- Start (lxInit, every consort incl. NPCs, two-way): one full cool + one full warm set of her level (Kiểu thanh nhã; Kiểu cầu kỳ joins the pool from rank diemRank). Old saves keep their boxes (lxInit runs once).
- Mirror: sets she can paint first in each row, then the greyed ones with where to get them.
- Test adds: start ≥2 pickable sets (one cool + one warm), pickable first, 2 months of ration = a whole set. Fold + iPad ALL PASS. Shots: img/_review/makeup-set/start-*.jpg.

## r3 (MAIN 147 look 25/11 23:19Z / 23:24Z)
- WHITE BOX over her face in the reveal step-in: the portrait patch (.ktrv-pw) faded in before its picture had painted — only its makeup layers showed (a pale square). Now it shows only once the portrait is decoded (class ktrv-pon). Whole family (KIT §60): every face-layer box `.kfxf` stays hidden until the picture beside it has painted (img[data-kld], one global rule `:has(>img:not([data-kld]))>.kfxf`): mirror zoom, reveal figure + patch, stage figures, kitFxPut boxes. A failed picture keeps its layers hidden.
- The set note is printed ONCE, short: «Bộ mờ: còn thiếu màu, chạm để xem» (LX_SETNOTE); what is missing + «Đường kiếm» only on tap (row header).
- Tests add: note once and short, why + roads on tap, patch only over a painted picture, layers hidden until painted, portrait failing → no white box. Fold + iPad ALL PASS.
- Videos r3: img/_review/makeup-set/mirror-set-r3-{fold-755x1000,ipad-1180x820}.mp4.

## r4 (MAIN 148 25/11 ~23:39Z): black band on Fold
- Cause: r1 capped the result zoom (rvUp) → a smaller scale; the camera still moved the face to 36 % of the screen height, pulling the room plate's top edge into view → the dark overlay showed as a ~90 px band (Fold; thinner on iPad). Fix: the camera move is clamped so the scaled .ktrv-cam always covers the screen edge to edge. The reveal also waits for the room plate (no opening on the bare dark backdrop).
- Whole family (KIT 81b .km-full scenes): dev/test/fullscene-band.js measures the top + bottom 60 px on Fold + iPad: makeup reveal step-in, reveal zoom, «Học thành tài» (kitLearn, KIT 81c picture) — ALL PASS. Lật thẻ (jflip) is a dark-tray scene by design (its edge fades into the dark), not measured.
- «✓ + word»: unchanged (r1 state) pending MAIN 148's answer (A revert / B keep).
- Videos r4: img/_review/makeup-set/mirror-set-r4-{fold-755x1000,ipad-1180x820}.mp4.
