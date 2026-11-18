# REPORT low-t2t3-new (W103, Foreman C ROOT-30)
PRIORITY #1 CHECK: OD 0 new | FIGURE_GATE C7 + 2a + B/F table + owner t1-t3 lines | build.py TIER_LOW | claims 0 -> edited TIER_LOW t2/t3 only.

## Result
- Only `TIER_LOW[2]` and `TIER_LOW[3]` in dev/art/t8-prompt-B/build.py changed. t1 and t4-t8 byte-identical (t1 golden cmp OK, golden_t8 c06 OK; `test_low_all.py` = OK 2304 builds, goldens c01..c32 match). Regenerated only golden_low/t2_v0_c01..c32 and t3_v0_c01..c32. (Pre-existing, not mine: golden/pB_c25.txt already differed before my edit.)
- Same prompt structure as the other ranks: "Outfit (rank..): a NEW outfit, <garment>; <hair>; her signature colour family ... stays the MAIN robe colour ..." + same fabric-drape sentence, stitched embroidery, no phoenix, no cloud collar, crossed collar, hairpins.

## The 3 designs side by side
| | t1 Đáp ứng (unchanged) | t2 Thường tại (NEW) | t3 Quý nhân (NEW) |
|---|---|---|---|
| cut | one-piece fine silk robe | TWO-PIECE ruqun: short fitted jacket over a separate skirt | THREE-LAYER: long open-front beizi coat + inner robe + skirt |
| collar | embroidered collar | crossed collar on the jacket | crossed collar on the inner robe |
| sleeves | long robe sleeves | wide elbow-length half sleeves + pale thin undersleeve | long wide sleeves of the beizi |
| skirt | robe skirt | long pleated skirt gathered high at the chest | long pleated skirt with embroidered hem band |
| sash | soft silk sash | broad embroidered waistband, bow, two long ribbons | embroidered sash + hanging jade pendant |
| shawl | none | none | narrow silk stole over shoulders and forearms |
| hair | neat bun, silver hairpins, flower | double-loop bun, silver+pearl pins, flower | tall layered chignon, flower, pearl-tipped pins, small silk flowers |
| gold | little | little | a little gold thread only at borders |

## Sample (c06 + c25, a18 v0, 4 new gens, 0 rejected)
- gens = 4 (t2, t3 for c06 and c25) + 4 background cuts. t1 and t4 are the existing t8-reprompt/t1t6 images (no new gens).
- Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/low-B/t2t3-new/sheet.jpg (rows c06, c25; columns t1|t2|t3|t4). Single images beside it: `c06_a18_t2_v0.png` etc.
- Refs: own a18 t1 v0 (uploaded as face-c06-t1 / face-c25-t1) + style B kspkwKx16B. gpt-2-6, 1024x2304, 2k, folder ba4aecfe..., no seed.
- Looked at all 4: face = her t1 face, closed smile, pins upward, no cloud collar, no phoenix, consort not maid, silk soft.
- Honest check: t2 differs clearly from t1 and t3 (two-piece, half sleeves, bow). t3 is clearly different from t1 and t2 (beizi + stole). But t3 and t4 are closer than t1/t2 (both layered, both wide sleeves); t4 is told apart mainly by its cloud collar, gold borders and larger gold headdress. If the owner wants t3 further from t4, next step is to give t3 a different sleeve/skirt shape (e.g. narrower sleeves, no stole) -- not done, waiting.

~100% xong prompt / sample chờ sếp duyệt (WAIT, no mass).
