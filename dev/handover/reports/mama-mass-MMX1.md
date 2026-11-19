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
| c06 | a36 | u5WyedyQLD | lJtc5U8gv9 | WDgFRDucXe | first one-ref gen, look PASS |
| c06 | a51 | jUoGfuHLD0 | 6AbIJosiJO | fHzOIpHCDY |  |
| c06 | a65 | jUoGfuHLD0 | s7IWK0cl8e | s7IWkFul8e |  |
| c07 | a36 | YMlEy3QWeC | s7IWxs1l8e | vQAJfQha47 |  |
| c07 | a51 | 1ldZhqUr4r | DoOkVBSpcl | - | REJECTED: small cross mark on forehead (gate: no forehead mark); no cut |
| c07 | a51 | 1ldZhqUr4r | If3gIeOtvE | aFGOEJgfSh | regen 1 of cap 2, seed 7173 (same prompt/refs), forehead clean, PASS |
| c07 | a65 | 1ldZhqUr4r | SyhTl9XUb8 | 8aigtCdIrU |  |
| c08 | a36 | 79fVbSUJAL | If3gIB4tvE | vQAJCOsa47 |  |
| c08 | a51 | CqnJpurEEy | Lw8YLLEswO | 4RFo6to9Aa |  |
| c08 | a65 | CqnJpurEEy | fHzyEFsCDY | w4aDOBi7EI |  |

Sheet 1: img/_review/mama-mass/mama-oneref-c06-c08.jpg (CDN) + repo copy dev/handover/review-sheets/mama-mass/mama-oneref-c06-c08.jpg. Cuts: img/_review/mama-mass/cuts/<id>-<age>.png (CDN).
Credits so far: 10 gens × 135 + 9 cuts × 3 = 1,377. Faults: 1 (c07 a51 forehead cross mark → regen seed 7173 PASS). LOOK method: full-size gen PNGs downloaded, 3 ages side by side at 1400 px tall + face crop when in doubt.

## HANDOVER (MMX1 rolled over at context limit, 19/11 ~17:30Z)
DONE: STEP 1 (one-ref recipe) + c06 c07 c08 × a36/a51/a65 (9 pictures).
NEXT (successor, in order): c09 c10 c11 c12 c13, then c22 c23 c24 c25 c26, then p01 p02 p03 bd1 bd2 bd3 — × a36 a51 a65 = 48 pictures.
- Prompt = dev/handover/reports/mama-specs/<id>-<age>.oneref.prompt.txt (exact builder stdout, store check PASS already; rerun check_store `<file> <id> --state mama --age aXX --nostyle` before each gen).
- images_generate gpt-2-6, width 1024 height 2304, resolution 2k, seed 7172 (regen: 7173, 7174), folderReference ba4aecfe-efce-47e2-b53f-30d292091886, references [{type image, her face id}, {type image, 79fNlPEJAL}], NO style image. Then images_remove_background.
- Face ids (already uploaded, [a36, a51/a65]): c09 nVsCy0SYQD/vQAUVFka47 · c10 jUoGCOPLD0/dt41ACpXSL · c11 If3sWKhtvE/xSBAfi1jfW · c12 xSBAf2LjfW/KLp3mZikqp · c13 DoO5RxBpcl/bxM6Izk5Y2 · c22 SyhTjexUb8/iG5tPua3uK · c23 P3QXwCD42C/Xm9jM9uBfo · c24 KLpZFXWkqp/lJtcrC6gv9 · c25 xSBz5abjfW/vQA78DMa47 · c26 79fDlxqJAL/s7IW1k0l8e · p01 lJtYaFMgv9 · p02 yiupqlAPW9 · p03 1ldZ8qOr4r · bd1 If3sA8MtvE · bd2 BhNxZtOoQR · bd3 P3Qe5Z642C (princesses: one a18 face for all ages).
- Ledger line per gen in dev/art/gen_ledger.jsonl (format = the MMX1 lines: kind OWNER-DESIGN, cmd with --nostyle, refs, gen_id, cut_id, prompt_file, settings, credits 138, store_check PASS) + a row in the table above.
- Sheets (rows = persons, cols a36 a51 a65, bg #efe9df) → img/_review/mama-mass/ via dev/site/cdn_sync.py + repo copy dev/handover/review-sheets/mama-mass/; cuts → img/_review/mama-mass/cuts/<id>-<age>.png + sync. Every ~8 persons: commit + push + send_message ROOT-48 (session_01PEhRbwqKFPv13Sx5yfxDSx).
- OPEN QUESTION to ROOT-48: costume image kept as image 2 (see STEP 1). If ROOT-48 says face ONLY, the store "image 2" sentences would need a ruling first.
