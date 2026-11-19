# mama-mass MMX1 (Foreman C ROOT-48, owner Lượt 479/482) — ma ma ONE-REF, range c01–c32 + bd1–bd3 + p01–p03 (undrawn only)

PRIORITY #1 CHECK: git grep origin (handover branch) for "nostyle" / "NOSTYLE_FOR" / "MAMA_IMG3": store --nostyle path exists in build.py (drops only the style sentence + "first reference image is style only"); consorts t2–t8 use it via dev/art/store-all/build_all.py NOSTYLE_FOR with image 3 → image 2 renumber. No ma ma one-ref path existed. FIGURE_GATE 11 (Lượt 482 M09 retired) + 12 (one-ref).

## STEP 1 — recipe change (done)
- build.py: `--state mama --nostyle` now also renumbers "image 3" → "image 2" (exactly the consort t2–t8 renumber) and `--refs` lists image 1 = own face, image 2 = costume (MAMA_REF). Every other builder output byte-identical (checked: mama without --nostyle for m01 c01 c06 c22 p01 bd1 m20 × 3 ages, and c06 --low 3 / --t7 / t8 with --nostyle).
- Refs now: image 1 = her OWN face picture (mama-mass-persons.md), image 2 = costume 79fNlPEJAL. NO style image 6AbGv6EiJO. (Interpretation: "one-ref" = the only face/style reference is her own picture; the costume picture is kept like the consorts' swatch because the store text names it — dropping it would mean rewriting store sentences, which LAW #1 forbids. Flagged to ROOT-48.)
- Prompt files: dev/handover/reports/mama-specs/<ID>-<age>.oneref.prompt.txt (57 files = all undrawn c06–c13, c22–c26, p01–p03, bd1–bd3 × a36/a51/a65). Builder now also carries the Lượt 440 ANGLE sentence (the old paused prompt files predate it).
- check_store (self form `<ID> --state mama --age aXX --nostyle`): 57/57 PASS; spot checks c06-a36, p01-a51, bd3-a65 also PASS against the old args (no --nostyle).
- Brief dev/handover/briefs/mama-mass.md steps 1–2 rewritten for one-ref.

## STEP 2 — gens
| id | age | face ref | gen | cut | note |
|---|---|---|---|---|---|
