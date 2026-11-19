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
  `dev/handover/review-sheets/palettes3/palettes3_sheet1.png` (m01–m29), `…sheet2.png` (m30–c06), `…sheet3.png` (c07–nc3). All looked at full size.

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
