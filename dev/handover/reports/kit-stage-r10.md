# kit-stage-r10 (successor of R9; MAIN LOOK FAIL on 203c178e, one item)

KIT CHECK: reuses kitOptFinal (jopic) rows, kaRows/kaBody (j63 §224), kitHand big card (jkhand §101.10), kitHandRows, KIT_HAND.big; no new kit part, no private chip/row.
START_CTX ≈ 12 % of the window; this report written at ≈ 40 % (no rollover needed).
PRIORITY #1 CHECK: OD 27/11 ~04:33Z/~04:39Z, ~04:36Z | main 4cd3f974 | review/kit-stage-r9 203c178e + review/kk54-rv166b f04b1201 (merged) | claims R9 → R10.

## Fault and root
Enlarged Bàn bài card, Được row read «Thái hậu: thiện cảm +, Sủng +; hỏng thì Thái hậu: thiện cảm −−, …» (loss in green).
Root = `kitOptFinal` (jopic.js ~l.316): an option with only a hint (`hint` = «gain; ODDS; hỏng thì loss») builds Được from the hint and split only at «nhưng», so the whole «hỏng thì …» clause stayed in the green Được chip.
Fix at the root: split the hint at «; hỏng thì …» too — gain part = green Được, «hỏng thì …» = red chip in its OWN Mất row (same as the act cards). Second root found while looking: the copied Mất row (`kr-mat2 kdup`) got `display:inline` from the `.kdup` rule on the enlarged card and broke the one-value-column grid (values invisible); now a grid row (`display:contents`), chips inline (jkhand.js).

## Whole family (law 11) — scan `dev/test/kit-hand-split.js` (every RGBT beat × every option card, seeded)
| | gain rows with «hỏng thì» | cards scanned |
|---|---|---|
| before (R9 203c178e) | 8 (c1a, c1b ×2, c3b ×3, c4a ×2) | 33 |
| after (R10) | 0 | 33 |
Other hands (Hành sự / Khuê các / Tài nghệ / empty acts) take their rows from kaRows, where Được/Mất are already split (verified by kit-hand-rows); the act cards unchanged.

## Merge
review/kk54-rv166b f04b1201 merged into R10 (j74.js conflict: both the KK42 `__kpMenuS` and the kptitle `__kmOver` lines kept; index.html / sw.js rebuilt).

## Tests (index.html at HEAD)
kit-hand PASS · kit-hand-mount PASS · kit-hand-rows PASS · kit-stage PASS · kit-pick 755x1000 + 1180x820 ALL PASS · kit_dupes OK · kit-hand-split 0/33.
kit-std-scan: NOT RUN — dev/test/kit-std-scan.js is not on any fetchable branch (origin/review/kit-std-audit does not exist); REPORT_ONLY so not blocking.

## LOOK media (CDN, https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage-r10/)
{fold,ipad}-banbai.mp4 (Fold 755x1000 touch, iPad 1180x820 mouse, real taps, cut after full load) + {fold,ipad}-banbai-0{2,3,4}.png. Shot -03 on both = the card «Thưa rằng thần thiếp…»: Được green «Thái hậu: thiện cảm +, Sủng +», Mất red «hỏng thì Thái hậu: thiện cảm −−, Thái hậu nghe ra ý khác». Both looked at.

## Left
RV-166 session_01Rc5AsHmVSRQfKM9T3eHcAb after MAIN LOOK. Kit keeper KK56 session_01Rc5AsJ6UhcqbDDXVR7k7Bq: Mất chip of a hint-only card keeps the words «hỏng thì …» (hint text); if the owner wants the label «Bại» on rolled cards instead, that is a kit-keeper wording call.
~100% xong (this item) / ~ playable: Bàn bài card reads right.

## UPDATE 05:5xZ (OD 27/11 ~05:27Z, owner approved 05:29Z «Ok làm vậy đi»; MAIN 171/172)
- Labels: a card WITH odds reads «Thành:» (green) then its own line «Bại:» (red); a SURE card «Được:» / «Mất:» (kaRows words, as the act cards). The «hỏng thì …» words are cut from the value (the label says it): never inside a row. jopic kitOptFinal (gain slot kr-thanh + «Thành», loss row kr-bai + «Bại» when the card has .kodds); jkhand: hint row hide, label colour, empty-row cleanup know kr-thanh / kr-bai.
- Scan kit-hand-split.js now also fails an odds card labelled Được/Mất and a sure card labelled Thành/Bại: 0 / 33 cards.
- KIT-STD-AUDIT §3 items (kit-std-scan review/kit-std-audit a2934493, SUBS=0 REPORT_ONLY=1): scene hand 5 → 0 findings; tabs: X08 «Tốn … line-clamp cut / Bạc 10 outside card» (Hành sự fold+iPad, Tài nghệ iPad) gone. Cause: kitHandTonL guessed the Tốn lines from text length, capped at 2, while every stat item is one unbreakable unit; now simulated (units wrap whole) with a measured +1 line (max 4) when still cut. The enlarged-card Được squeezed to 25 px = the display:inline on `.kdup` rows (fixed above, display:contents).
- Not mine, still open in the same scan (tabs): court X08 ellipsis «Trong cung: Chương 1…», X09/X12 on div.pcb (Hậu cung person cards) — KK56 / MAIN.
- Media re-recorded with the new labels: same CDN folder (…/kit-stage-r10/), both devices looked at (-03 = Thành green / Bại red own lines).
