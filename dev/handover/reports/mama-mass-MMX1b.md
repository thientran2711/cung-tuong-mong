# mama-mass MMX1b (Foreman C ROOT-49, successor of MMX1) — ma ma ONE-REF, continues c09–c13, c22–c26, p01–p03, bd1–bd3

Recipe unchanged from MMX1 (dev/handover/reports/mama-mass-MMX1.md STEP 1): prompt = mama-specs/<id>-<age>.oneref.prompt.txt verbatim (check_store PASS rerun before each gen), refs = image 1 her own face + image 2 costume 79fNlPEJAL, NO style image, gpt-2-6 1024x2304 2k seed 7172 (regen 7173/7174), then images_remove_background.

## Gens
| id | age | face ref | gen | cut | note |
|---|---|---|---|---|---|
| c09 | a36 | nVsCy0SYQD | 3zKhYbCREY | EbY4kdduuO | look PASS |
| c09 | a51 | vQAUVFka47 | P3QBATL42C | rgXzJWbxtc | gen painted checkerboard bg (known store bg sentence), cut clean |
| c09 | a65 | vQAUVFka47 | O6Ed2Szynm | YMlFoBaWeC | look PASS |
| c10 | a36 | jUoGCOPLD0 | rgXzyBAxtc | vQAJrCca47 | look PASS |
| c10 | a51 | dt41ACpXSL | Lw8W67tswO | tCRUkNSmZJ | look PASS; hair flower cream not pure white (minor) |
| c10 | a65 | dt41ACpXSL | SyhV2haUb8 | iG5meG13uK | look PASS |
| c11 | a36 | If3sWKhtvE | bxMRyl75Y2 | 6Abte11iJO | look PASS; one side hairpin near-horizontal (minor) |
| c11 | a51 | xSBAfi1jfW | KLp29mOkqp | - | REJECTED: small red dot on forehead (gate: no forehead mark); no cut |
| c11 | a51 | xSBAfi1jfW | rgXzRpFxtc | - | REJECTED regen 1: forehead red dot again; cause = the a51 face ref xSBAfi1jfW itself carries a red forehead dot |
| c11 | a51 | If3sWKhtvE | YMlFEbHWeC | iG5mIPt3uK | regen 2 of cap 2, face ref SWAPPED to her a36 picture If3sWKhtvE (a51 ref has a forehead dot); forehead clean, PASS |
| c11 | a65 | If3sWKhtvE | jUoYzxZLD0 | fHzyy1fCDY | face ref SWAPPED to her a36 picture If3sWKhtvE (a51/a65 ref has a forehead dot); look PASS |

Sheet 2: img/_review/mama-mass/mama-oneref-c09-c11.jpg (CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/mama-mass/mama-oneref-c09-c11.jpg) + repo copy dev/handover/review-sheets/mama-mass/mama-oneref-c09-c11.jpg. Cuts: img/_review/mama-mass/cuts/<id>-<age>.png (CDN).
Credits MMX1b: 11 gens × 135 + 9 cuts × 3 = 1,512 (run total with MMX1: 2,889). Balance after: ~597,100.
Faults:
1. c11 a51: red dot on the forehead twice (seeds 7172, 7173). Cause: her a51 face picture fig-consort-c11-t1-a51 (xSBAfi1jfW, also her a65 ref) itself has a red forehead dot. Regen 2 (seed 7174) used her own a36 picture If3sWKhtvE → clean, PASS. c11 a65 also made from If3sWKhtvE (seed 7172) → clean, PASS. Rule question for ROOT-49: OK to swap to the a36 face whenever the a51 ref carries a mark? (Screened all remaining refs c12–c13, c22–c26 a36/a51 + p01–p03 + bd1–bd3 at face-crop size: no other forehead mark seen.)
2. Most gens paint a fake checkerboard "transparent" background (store background sentence, known FIGURE_GATE note); remove_bg cleans it every time (all 9 cuts checked on #efe9df).
3. Minor, kept: c10 a51 hair plum blossom cream instead of white; c11 a36 one side hairpin near-horizontal; c09 a51 vs a65 blue shades close.
LOOK method: every gen full size (1400 px tall view + native face crop; forehead zoom when in doubt) before the next gen; every cut composited on #efe9df.

## HANDOVER (MMX1b rolled over at context ceiling, 19/11)
DONE: c09 c10 c11 × a36/a51/a65 (9 pictures). With MMX1: c06–c11 = 18 pictures.
NEXT (successor, in order): c12 c13, then c22 c23 c24 c25 c26, then p01 p02 p03 bd1 bd2 bd3 — × a36 a51 a65 = 39 pictures.
- Same recipe and face ids as MMX1 HANDOVER (c12 xSBAf2LjfW/KLp3mZikqp · c13 DoO5RxBpcl/bxM6Izk5Y2 · c22 SyhTjexUb8/iG5tPua3uK · c23 P3QXwCD42C/Xm9jM9uBfo · c24 KLpZFXWkqp/lJtcrC6gv9 · c25 xSBz5abjfW/vQA78DMa47 · c26 79fDlxqJAL/s7IW1k0l8e · p01 lJtYaFMgv9 · p02 yiupqlAPW9 · p03 1ldZ8qOr4r · bd1 If3sA8MtvE · bd2 BhNxZtOoQR · bd3 P3Qe5Z642C).
- Time/context saver: prompts of one age differ between persons only in slot words (face line, hair flower, colour name, ANGLE sentence, held item) — diff against the previous person's file of the same age to see them, but always paste the file text exactly.
- Forehead: zoom the forehead of a51/a65 gens (the c11 dot was only ~6 px wide at full size).
- Ledger line per gen in dev/art/gen_ledger.jsonl ("who": "mama-mass MMX1b ..." format), row in a table like the one above; sheet every ~8 persons to img/_review/mama-mass/ (dev/site/cdn_sync.py) + repo copy; commit + push + send_message ROOT-49 (session_01PEhRbwA8JoKHSVRhbvu9G3).

## ORDER CHANGE after handover (ROOT-49, 19/11 17:42–17:43Z) — supersedes NEXT above
- OWNER ORDER: STOP ALL MA MA MASS. Nothing was in flight at the stop (last = c11 a65, cut + pushed). Next undrawn would have been c12 a36.
- Owner Lượt 499: ma ma stays STOPPED except ONE SAMPLE: add the ART_RULES B15 TWO-COLOUR sentence VERBATIM from dev/art/owner-copy/pr_cl_t2_V2.txt to the ma ma builder (only the two colour names change: main = her ma ma colour, secondary = clearly different, not gold/silver/ivory/cream/white, not the same family; no other change), draw ONE sample c06 a36 (same refs/seed as one-ref c06 a36: face u5WyedyQLD + 79fNlPEJAL, seed 7172), LOOK full size (two colours clearly visible in large areas?), cut, sheet OLD c06 a36 (cut WDgFRDucXe) | NEW side by side, push, send ROOT-49 paths + secondary chosen + prompt diff vs old c06-a36 + credits, then STOP. Old one-colour ma ma pictures are kept.
- MMX1b did NOT start this sample (context ceiling) → for the successor.
