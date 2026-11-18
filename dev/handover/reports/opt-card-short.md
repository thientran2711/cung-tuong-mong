# opt-card-short — OPTIONS report (worker session_01UV1Szk6j15PHjAL8gMSR9z, for MAIN s42)
PRIORITY #1 CHECK: OD 30 (18/11 ~08:55Z + ~09:02Z) | main jopic.js kpOptArt / jk4 kitOptFill+kitCompactCSS | review/* none | claims none besides this row.
Branch review/opt-card-short sha 68d460fd (review switch only; NO final rule yet — waiting for the owner's pick). START_CTX ≈ 12 % (estimate).

## Root causes (STEP 0)
1. Person dialogs (kdper/figure column): `kitOptFill` makes the picture fill the card height (width 54..84, height = text height) ⇒ a card with long text gives a 66x170..187 STRIP (owner shot: 1:3). Other dialogs use 54x72.
2. Rows: Tốn / Được / Ghi chú each wrap; the Ghi chú tier note is a 3–5 line sentence.
3. Mixed forms: an option with no own picture (confirm/"Đã hiểu…", night "Thôi"-like) gets NO picture slot (kpanel-compact rule "no placeholder on a menu/confirm option") ⇒ different frame next to picture cards (dress: 162 px picture card + 72 px picture-less card; night: 55 vs 90).
4. Title squeezed: the odds chip sits in the title row (`.kat` flex nowrap, chip flex:none) ⇒ title 8 em wide, one word per line (dress option 1, 590 px design = Fold host).

## Scan table (card height px, "design" widths: Fold host = 590x820 portrait page, iPad 1180x820) — BASE
| dialog | Fold 590 cards | pic | iPad 1180 cards | pic | mixed form? |
|---|---|---|---|---|---|
| mat2 (VIỆC material) | 205/205/205 | 66x187 STRIP | 92 | 56x74 | no |
| dress (Hội phối đồ: báo đề) | 162/72 | 66x144 / NONE | 111/111/55 | 70x93 / NONE | YES (both) |
| night | 55/90 | NONE / 54x72 | 55/90 | NONE / 54x72 | YES |
| visit | 90 | 54x72 | 92 | 56x74 | no |
| many (5 opts) | 90 | 54x72 | 90 | 54x72 | no |
| fest | 91 | 55x73 | 91 | 55x73 | no |
| choice/two/man/child/thtrieu | 90–91 | 54x72 | 90–91 | 54x72 | no |
Tallest 205 (Fold), avg of all cards ≈ 100. Mixed-form dialogs: 2 of 12 scanned (dress, night), each is a card without picture. Narrow titles (< 8 em): dress opt 1 = 8.1 em.
Scan script: `node dev/test/opt-card-scan.js <url> <outdir> <tag> 590x820,1180x820 <none|A|B|C> <shot cases>` (measures card height, picture, title width in em, row line counts).

## Options (all three: ONE form for every option of a dialog; picture-less options get the §59 placeholder; odds chip under the title, title full width)
- A = picture fixed 54x72 (3:4, never stretched, top-left), rows unchanged. The text does NOT run under the picture: the kit rows are one grid (§51), so run-under would need per-row hacks; card height = max(picture, text).
- B = A + Tốn and "trả khi làm xong" on one line; Được chips run inline joined by "·"; the tier note → "5 phần: Khá · 8 phần: Tinh xảo" (full sentence kept as tooltip title; the "Tuyệt phẩm cần vật liệu quý" tail is dropped, it is already in the dialog text).
- C = B + picture a 40x40 square at title height, rows run full width under it (smallest card).
Card heights, Fold 590 / iPad 1180 (cards of one dialog):
| dialog | BASE Fold | A | B | C | BASE iPad | A | B | C |
|---|---|---|---|---|---|---|---|---|
| mat2 | 205/205/205 | 101/157/157 | 90/138/138 | 73/108/124 | 92x3 | 157x3 | 138x3 | 108x3 |
| dress | 162/72 | 148/90 | 127/90 | 126/90 | 111/111/55 | 148/148 | 127/127 | 161/161/90 |
| night | 55/90 | 90/90 | 90/90 | 73/91 | 55/90 | 90/90 | 90/90 | 73/91 |
| visit | 90x3 | 101/99/115 | 115/99/99 | 115/132/115 | 92x2 | 167/167/99 | 166/166/115 | 115/82 |
| many x5 | 90 | 90 | 90 | 73 | 90 | 90 | 90 | 73 |
| fest | 91x3 | 101/101/99 | 100/100/90 | 99/99/82 | 91x3 | 101/101/99 | 100/100/99 | 99/99/82 |
Honest read: A mostly does NOT shorten on iPad (the 2-column iPad cards had a 74 px picture already; A's 54 px picture is not the limit, the text is). A/B fix the Fold strip (205 → 101..157 / 90..138) and the mixed forms. C is the shortest everywhere (mat2 Fold 205 → 73..124) but its picture is only 40 px. Cards inside one dialog are NOT equal height in A/B/C (rows differ); the old person-dialog "all cards one size" rule (OD 17/11 ~05:00Z) is dropped under these options — owner to confirm.
Note: my material test dialog (wkrMat) has a shorter text than the owner's Tứ đức one (jtds, "trả khi làm xong" inside Tốn); B's merge of that note is coded (kitOptCompactRows) but visible in the shots only for the tier line.

## Shots (LOOKED at: mat2/dress A,B,C Fold + dress C iPad; others by measurement) — CDN img/_review/opt-card-short/
Naming `<v0-base|vA|vB|vC>-<mat2|dress|night>-<590x820|1180x820>.jpg`, e.g. https://ctm-img.victoria-tntt.workers.dev/img/_review/opt-card-short/vC-mat2-590x820.jpg · .../vB-dress-590x820.jpg · .../v0-base-dress-590x820.jpg
(590x820 = the Fold host's design page, shot at DSF 2; the game inside the host is scaled ×1.28 to the 755 screen.)

## Not done (waiting for the owner's pick): final single rule in KIT §6.2, removing the review switch (kitOptVarSet / KIT_OPT_VAR, kitOptFit0 early-exit), person-card act rows (.pc>.pcr) which use the same kitCompactCSS but are not dialog options, tests, whole-group scan after/before.
~35% xong / ~0% chơi được (review switch only, not in main).
