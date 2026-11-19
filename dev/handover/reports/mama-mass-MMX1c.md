# mama-mass MMX1c (Foreman C ROOT-49, successor of MMX1/MMX1b) — ONE ma ma TWO-COLOUR sample, c06 a36 (owner Lượt 499)

Ma ma MASS stays STOPPED. This session drew only the one sample, then stopped.

## Builder change (dev/art/t8-prompt-B/build.py, build_mama)
- New opt-in flag `--twocol <secondary>`. It appends, straight after the COLOUR RULE sentence (the same place as in pr_cl_t2_V2.txt), the ART_RULES B15 sentence copied VERBATIM from dev/art/owner-copy/pr_cl_t2_V2.txt. Only the two colour words change: main = her ma ma colour (`main` from her palette, c06 = vermilion), secondary = the flag value.
- Verbatim check: with the colour words masked, the sentence in the new prompt is byte-identical to the one in pr_cl_t2_V2.txt (`cmp` OK).
- Nothing else changed. Without the flag every output stays byte-identical (md5 checked for m01 c06 c22 p01 × a36 a51 a65, with and without --nostyle = 24 outputs).
- Secondary for c06 = **jade green**. Source: dev/handover/reports/two-new-8rank.md §5 (c06 vermilion → jade green; her listed ivory is neutral and not allowed). It is a clearly different colour family, and not gold, silver, ivory, cream or white.

## Prompt diff vs old one-ref c06 a36 (dev/handover/reports/mama-specs/c06-a36.oneref.prompt.txt → c06-a36.oneref.twocol.prompt.txt)
One sentence was ADDED after "...do not copy the brown of image 2." and nothing else changed:
```
+ TWO-COLOUR RULE: the whole outfit uses EXACTLY TWO colours that clearly interact: the MAIN colour vermilion and the SECONDARY colour jade green, the secondary clearly visible in large areas (inner robe or skirt, wide borders, sash, cuffs, linings), never a single flat colour all over; gold or silver only as thin accents, never a third colour.
```
check_store PASS against the old store args (`c06 --state mama --age a36 --nostyle`) and against the new ones (`... --twocol "jade green"`).

## Gen
| id | age | face ref | gen | cut | note |
|---|---|---|---|---|---|
| c06 | a36 | u5WyedyQLD | 1ldGc1er4r | P3QBvGD42C | two-colour sample; look PASS |

Recipe = the same as the one-ref c06 a36 (lJtc5U8gv9 / cut WDgFRDucXe): gpt-2-6 1024x2304 2k, seed 7172, refs image 1 = her own face u5WyedyQLD and image 2 = costume 79fNlPEJAL, no style image.

LOOK (full size 1400 px tall + native face crop):
- PASS. The two colours are clearly visible in large areas. Jade green is the whole lower skirt (with the hem embroidery band), the sash and bow, the broad sleeve cuff bands, the sleeve linings and the collar edge of the inner robe. Vermilion is the over-vest, the robe, the two front panels and the sleeves.
- Gold appears only as thin trim. There is no third colour; the cream/blush embroidery and the umbrella are the same as the old picture.
- Same face as the old c06 a36. Forehead clean. Hair, camellia and hairpins match the old picture. Hai tà: two panels.
- Minor, same as the old picture: one side hairpin dangle hangs diagonally. The gen painted a checkerboard background, and the cut removes it cleanly (checked on #efe9df).
- No regen.

## Files
- Sheet OLD | NEW: CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/mama-mass/mama-twocol-c06-a36-old-new.jpg + repo copy dev/handover/review-sheets/mama-mass/mama-twocol-c06-a36-old-new.jpg
- Cut: CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/mama-mass/cuts/c06-a36-twocol.png (the old cut c06-a36.png is untouched)
- Prompt: dev/handover/reports/mama-specs/c06-a36.oneref.twocol.prompt.txt; ledger line in dev/art/gen_ledger.jsonl

## Credits
1 gen × 135 + 1 cut × 3 = **138**.

## For the owner verdict
If the sample is approved, the mass can use `--twocol <secondary>` per person with the §5 table. The secondary still needs a ruling for a51/a65 (deeper step of the main colour; the secondary is not stepped by the builder). Old one-colour ma ma pictures are kept.
