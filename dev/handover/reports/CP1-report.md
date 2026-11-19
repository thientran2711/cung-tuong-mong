# CP1 report — 3 palettes per woman (B20, owner Lượt 614)

depth 5 · START_CTX ≈ 3 % of the 1M window (context_usage read 0 at start; own estimate) · 0 credits, no gens.

## Done
- `dev/art/face-common/palettes3.json` — `{id: {P1, P2, P3}}` for all 87 women (m01–m52, c01–c32, nc1–nc3), each `{main, main_hex, sec, sec_hex}`.
  P1 = approved palette copied unchanged (m_colours_proposed.json FINAL, c_rank_colours.json, nc1–nc3 from t8-prompt-B/build.py).
  P2 = cool-leaning, P3 = warm-leaning. Status PROPOSAL — **not wired into build.py** (waits for owner OK).
- `dev/art/palettes3/` — `library.py` (≈75 named colours at nc1–nc3 tone), `colourlib.py` (OKLab/OKLCH, warmth, families),
  `gen_palettes3.py` (generator), `check_palettes3.py` (checker), `make_sheets.py` (sheets).
  Re-run: `python3 dev/art/palettes3/gen_palettes3.py && python3 dev/art/palettes3/check_palettes3.py && python3 dev/art/palettes3/make_sheets.py`.
  Hand fixes go in `dev/art/palettes3/overrides.json` as `{"m05": {"P3": ["coral red", "cream"]}}` (library names).
- Checker result: **0 FAIL**, 261 palettes. Checks: contrast (other hue family, ≥40° hue or ivory + lightness gap, close hues need a lightness gap, dE floor tied to P1), no grey (OKLCH chroma ≥ 0.045, whites/ivory allowed), tone (chroma ≤ 0.127 = P1 max, lightness band), no gold/deep yellow (G4), direction (warmth = 10·C·cos(hue−55°), palette = 0.6 main + 0.4 sec: P2 ≤ min(max(P1−0.35, −0.60), −0.20) and P2 main not warmer than P1 main; P3 ≥ max(min(P1+0.35, 0.65), 0.45) and P3 main warm), spread (neighbour rows never share a P2/P3 main, no look-alike palettes 1–2 rows apart, a pair at most twice and ≥10 rows apart).
  9 "info" lines = P1 (approved) items the same checks would flag (m06/m18/m45/m49 pale blues chroma ~0.040; c04/c22/nc3 lilac+rose and m39/m49 blue+ivory low contrast) — not judged, P1 is approved.
- Warmth: P1 −0.29…+0.56 (mean +0.14) · P2 −0.72…−0.20 (mean −0.44) · P3 +0.46…+0.90 (mean +0.64).
- Sheets (Vietnamese headers "Màu gốc | Thiên lạnh | Thiên ấm", main big + secondary swatch, names + hex, 1110 px wide for phone):
  `dev/handover/review-sheets/palettes3/palettes3_sheet1.jpg` (m01–m29), `…sheet2.jpg` (m30–c06), `…sheet3.jpg` (c07–nc3). All looked at full size.

## How it reads
- Cool palette: her colour moved toward blue/green/violet (pinks → orchid/lilac, apricots → lilac/aqua, greens → jade/celadon/aquamarine, blues stay blue) + a deep cool secondary (indigo, teal, peacock/sea blue, violet, plum).
- Warm palette: her colour moved toward apricot/coral/rose (greens → moss/willow/olive, lilacs → blush/peony pink, blues → apricot/coral/pink) + a warm secondary (rose-red, brick/madder/rust red, leaf/moss green, or ivory/cream ~1 in 4).

## Notes for the owner (A18: notes only, change only if she asks)
1. P3 is only a SMALL step warmer for 6 people whose approved palette is already warm: m02, m17, m44, c16, c18, c23 (P1 +0.44…+0.56 → P3 ≈ +0.67). Most visible on m02 (moss + coral rose → bamboo green + rust red) and m17 (olive + rose pink → olive + pomegranate red).
2. Blue-main people lose their blue in the warm palette (nothing blue can read warm) — e.g. m03 slate blue → peony pink + bamboo green, nc1 indigo → peony pink + leaf green.
3. 13 warm pairs repeat once between people far apart (mostly pink + green, e.g. peony pink + bamboo green on m03 and c04).
4. Colour names are English like the tables; hexes all at nc1–nc3 tone (no colour stronger than the strongest approved P1 colour).

## Handover (if a successor continues)
Nothing pending beyond owner verdict. After her OK: wire P2/P3 into build.py (separate job), re-run checker after any override.

---

# CP1 part 2 — 4 SEASONS (B20 rewritten, owner Lượt 616; supersedes the cool/warm palettes3 above)

depth 5 · foreman now ROOT-53 (session_01PEhRbuf8GDz77QZRdK2XXP).

## Files
- `dev/art/face-common/palettes_season.json` — per woman: `root_season`, and `xuan`, `ha`, `thu`, `dong` each `{main, main_hex, sec, sec_hex}`;
  the approved root palette is copied unchanged into its own season with `"root": true` (★). Top-level `root_season_counts`. PROPOSAL, not wired.
- `dev/art/palettes3/seasons.py` (season criteria, classify + target), `gen_seasons.py` (generator, extra colours list EXTRA),
  `check_seasons.py` (checker), `make_season_sheets.py` (sheets). Hand fixes: `dev/art/palettes3/overrides_season.json`
  as `{"m05": {"ha": ["cool lilac", "teal"]}}` (names from library.py or EXTRA). Re-run gen → check → sheets.
- Sheets "Xuân | Hạ | Thu | Đông", ★ (gốc) = root, root count under each season header:
  `dev/handover/review-sheets/palettes-season/season_sheet1.jpg` (m01–m29), `season_sheet2.jpg` (m30–c06), `season_sheet3.jpg` (c07–nc3). All looked at full size.

## Season criteria (OKLCH)
temperature t = 0.8 × main warmth + 0.2 × secondary warmth (warmth = 10·C·cos(hue−55°); ivory/cream/white = 0);
Lmin = lightness of the darker colour; dE = main-vs-secondary difference.
- Root classification: t > 0 → **Xuân** if both colours light (Lmin ≥ 0.66) and no olive/yellow-green, else **Thu**;
  t ≤ 0 → **Đông** if a deep colour or strong contrast (Lmin ≤ 0.58 or dE ≥ 0.30), else **Hạ**.
- Generated palettes use the same rule plus margins: Xuân t ≥ +0.30, Lmin ≥ 0.68, clear, secondary not a strong cool;
  Hạ t ≤ −0.15, Lmin ≥ 0.62, chroma ≤ 0.10, dE ≤ 0.24, secondary not peach/coral; Thu t ≥ +0.30, a deep colour (Lmin ≤ 0.64),
  secondary no colder than teal; Đông t ≤ −0.15, dE ≥ 0.25, a deep colour (Lmin ≤ 0.58) or ivory.

## Root counts (87 women)
- Xuân 19: m08 m22 m35 m38 m41 m42 m52 c06 c08 c10 c13 c17 c18 c19 c20 c22 c31 nc2 nc3
- Hạ 25: m03 m06 m11 m13 m14 m16 m18 m20 m21 m25 m30 m33 m37 m39 m43 m47 m48 m49 c02 c04 c05 c07 c09 c29 c30
- Thu 37: m01 m02 m04 m05 m07 m09 m10 m12 m15 m17 m19 m23 m26 m27 m28 m29 m31 m32 m34 m40 m44 m46 m50 m51 c01 c03 c11 c12 c15 c16 c21 c23 c24 c25 c26 c27 c28
- Đông 6: m24 m36 m45 c14 c32 nc1

## Checker: `python3 dev/art/palettes3/check_seasons.py` → 0 FAIL
Root unchanged and in its classified season; all 4 seasons present; each generated palette passes its season target;
contrast (other hue family, hue/lightness gap, close hues need lightness gap ≥ 0.15); no grey; tone (chroma ≤ 0.127, lightness band);
no gold / nothing near royal yellow #EFBD69; next rows never share a season's main, no look-alikes 1–2 rows apart,
a pair at most twice ≥ 10 rows apart; a woman's own 4 palettes never look alike.

## Royal yellow (B21, Lượt 619)
No palette here contains royal yellow. m01–m52 / c01–c32 are maids/consorts (consort palettes stay yellow-free; the rank t6–t8 adds yellow),
nc1–nc3 are FOREIGN princesses → no yellow. None of the 87 is a royal-family member, so nothing to flag.

## Notes for the owner (A18 — notes only)
1. Many roots are Thu (37) and few Đông (6): most approved palettes pair a warm-ish main with a deep rose/teal/indigo secondary.
2. "Recognisably hers" = generated main stays near her main hue where the season allows; a blue-main woman's Xuân/Thu must change main (peach/coral etc.), a coral-main woman's Hạ/Đông likewise.
3. Hạ palettes are soft on purpose (gentle contrast); 3 use "ice pink" (#E2B6CB) as a very light secondary (c12, c24, c31) — the softest pairs on the sheet.
4. "pale orchid" is the most used Đông main (light cool colour with a deep secondary).
