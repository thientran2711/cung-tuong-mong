# NF2 report — thiếu nữ c07–c32 drawn (owner GO Lượt 607)

depth 5 · START_CTX ≈3 % · job DONE (no handover needed).

## Result
- Sheet: `dev/handover/review-sheets/new-faces-c/ncv3_all.jpg` — c01–c32 cut-outs, labelled id + look (c01–c06 = NF1 sample cuts, red labels, for comparison).
- 26 kept people c07–c32, each = gen + remove_bg cut. Ledger: 32 lines appended to `dev/art/gen_ledger.jsonl` (26 KEPT + 6 REJECTED), **4,404 credits** (gen 135 + cut 3).
- Settings exactly as c01–c06: prompt = `cNN.v3.FULL.txt` verbatim, gpt-2-6 1024x2304 2k, ONE ref M09 eIyOFEidqL, no transparentBackground, then images_remove_background.

## Cut ids (kept)
c07 JNCBytcOq4 · c08 Lw80qQpswO · c09 xSBWFuTjfW · c10 jUocHFqLD0 · c11 Cqn9IfbEEy · c12 aFG4C3ifSh · c13 gOmMrUsSXO · c14 aFGP8u5fSh · c15 xSBWKKMjfW · c16 1ldnbKlr4r · c17 aFGPtvEfSh · c18 1ldnb1Sr4r · c19 6Abv3QJiJO · c20 jUocxySLD0 · c21 bxM2qSV5Y2 · c22 rgXY1yHxtc · c23 O6EoPf6ynm · c24 xSBcLXwjfW · c25 EbY6qU4uuO · c26 ov6UI6L829 · c27 rgXWl3bxtc · c28 JNCB9V9Oq4 · c29 EbY6qOiuuO · c30 hu2yEUcvqL · c31 1ldYS3Zr4r · c32 lJtMJwTgv9

## Redone (real faults only)
Every picture looked at full size + face crop + 2× mouth crop.
- c07, c12, c19, c25: teeth visible (lips parted) → redone once with seed 7173 → clean.
- c31: teeth at seed 7172 AND 7173 → third gen seed 7174 → clean.
- Why the seed changed: same prompt + seed 7172 gives the same picture again, so a redo needs a new seed. The prompt was not changed.

## Fault notes (left as they are, owner's call)
- Grey (B19): none found in c07–c32 outfits. The ivory skirts and robes (c14, c18, c29, c32) are warm cream, not grey. c02 from the earlier sample still has the silvery-grey skirt (NF1 note).
- No extra limbs, broken hands or wrong item count seen. Every girl holds exactly one item.
- Small rule misses, not redone:
  - Hairpin points sideways on c08 (pearl pin), c11 (silver pin points down-left), c17 (silver pin) and c32 (pearl comb).
  - c24's smiling eyes are narrowed into crescents, though still open.
  - c21 and c24 wear extra gold hair ornaments that the prompt does not ask for.
- Style compared with c01–c06: same drawing style and skin. c07–c32 are lighter and gauzier, as their princess-tone + gauze sentences ask, so they look softer than the more saturated c01–c06. The faces are pleasant but quite alike across the set.
- Watch item (from NF1): the gauze sentence in the c07–c32 lines gives sheer, floating outer robes almost everywhere. COMMON_v3 says "real cloth … no sheer floating scarf". The owner may want one rule for this.
