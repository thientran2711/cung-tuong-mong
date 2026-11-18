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

---
# ROUND 2 (owner verdict ~21:24Z: t1 stays; t2 AND t3 redo; NEVER short/half sleeves; differ by collar/layering/sash/shoulder/embroidery placement)
PRIORITY #1 CHECK: OD verdict relayed by Foreman C (21:23Z) | build.py TIER_LOW | claims 0. Round-1 t2/t3 text replaced (round-1 half-sleeve t2 dropped). Re-fetched first (c4291fcf 3f ITEMS kept; I touched only TIER_LOW[2],[3]; test_low_all.py OK 2304 builds, t1 and t4-t8 untouched, golden_low t2/t3 regenerated).

| | t1 Đáp ứng (unchanged) | t2 Thường tại (NEW) | t3 Quý nhân (NEW) |
|---|---|---|---|
| collar | crossed collar | HIGH STANDING collar, jade button at throat, straight front opening | BROAD embroidered crossed collar in a deep V |
| sleeves | long wide | long wide with deep embroidered cuffs (never short) | long wide, lined in a contrasting soft tone |
| layering/shoulder | one robe, soft layered look | one plain-skirted robe, no outer layer | robe + short sheer capelet over shoulders and upper arms |
| sash | soft silk sash | NO wide sash: slim twisted cord at the side with long knotted tassel | wide brocade belt, jade pendant, long tassels |
| embroidery placement | collar, sleeves, hem | small sprays scattered on chest/shoulders/sleeves + cuffs + narrow hem | wide vertical front band collar-to-hem + large medallions on sleeves and skirt |
| hair | neat bun | side-swept low chignon at the nape, flower at the side | tall high chignon, flower crest, pearl pins, small silver comb |

Sample: 4 new gens (c06 t2,t3; c25 t2,t3), 0 rejected, looked at all 4 (long wide sleeves, closed smile, pins up, no cloud collar/phoenix/yellow). Sheet https://ctm-img.victoria-tntt.workers.dev/img/_review/low-B/t2t3-new/sheet2.jpg (rows c06,c25; t1|t2|t3|t4; singles in .../t2t3-new/v2/). t1/t4 reused from t8-reprompt/t1t6 (their items are the older ones).
Honest check: t2 vs t1 vs t3 clearly different. t3 vs t4 still both wide-sleeved with an over-layer (t3 capelet vs t4 cloud collar + gold headdress); t4 reads richer by its cloud collar, heavier gold and bigger headdress.

---
# ROUND 3 (ROOT-31, owner ~21:36Z on Lượt 43: t2 looked like modern "cách tân"; t3 too close to Phi; compare with current Phi; Phi needs its own collar)
PRIORITY #1 CHECK: owner verdict relayed by ROOT-31 | build.py TIER_LOW, low_outfit t5 | claims 0. Only TIER_LOW[2],[3] + one flagged t5 line changed; `test_low_all.py` OK 2304 builds, golden_low t2/t3 regenerated, default t5 byte-identical.
| | t1 (unchanged) | t2 NEW | t3 NEW |
|---|---|---|---|
| cut | one-piece robe | Tang ruqun: crossed-collar upper garment + skirt tied high at the chest (no standing collar any more) | long straight-front beizi coat hanging OPEN over crossed-collar inner top + chest-tied skirt |
| sleeves | long wide | long wide, wide embroidered cuffs, sheer undersleeve | long wide |
| sash | soft sash | broad chest ribbon band, two long ribbons | ribbon at chest with ONE jade ring pendant (no brocade belt, no sheer capelet/shawl) |
| embroidery | collar/sleeves/hem | sprays on the top + wide hem band, skirt lighter tone | wide bands along coat fronts and hem |
Dropped from round 2 t3 because it matched Phi: sheer capelet, brocade waist belt with jade pendants and tassels.
**Phi (t5) collar finding:** the current t5 text has NO collar word (t4 = cloud collar, t6 = pearl-edged collar + cape, t7 = jewelled cloud-collar cape). Proposal on flag `--phicollar` only (default t5 unchanged): "a broad stand-up rounded collar of gold brocade fastened with a small jade clasp at the throat". Visible in the new image.
Sample: 6 new gens (c06+c25: t2, t3, t5 with new collar), 0 rejected, looked at all. Sheet https://ctm-img.victoria-tntt.workers.dev/img/_review/low-B/t2t3-new/sheet3.jpg — columns t1|t2|t3|t4|t5 (current, as is)|t5 NEW collar; singles in .../t2t3-new/v3/. t1/t4/t5 current are the older t1t6 images (older item lists; the new-collar t5 uses the current 3f items, so its held item differs from the current t5).
Honest check: t2 vs t3 are now both ruqun-family (t3 = t2 + open coat); differ by outer coat, border bands, no cuff sheer. t3 vs t5: t5 is heavier gold brocade, shawl, big headdress; t3 is plain silk with embroidered bands.

---
# ROUND 4 (ROOT-31 22:05Z verdict on Lượt 50, brief dev/handover/briefs/owner-1118-2205.md)
PRIORITY #1 CHECK: owner verdict relayed by ROOT-31 | build.py TIER_LOW + t4/t5 runtime lines | claims 0. Only what she asked changed:
1. SWAP: t1 = the round-3 t2 design (Tang ruqun); t2 = the old t1 design (fine silk robe, embroidered collar/sleeves/hem, soft silk sash).
2. HAIR: all hairstyle wording removed from TIER_LOW t1-t3 (hair slot = ornaments only), from t4 ("elegant high chignon with" cut) and from t5 ("high ornate chignon with" cut); the t1-t3 "Hair:" sentence now reads "her own hairstyle exactly as in her first reference, with silver, pearl and fresh flowers, little gold". The identity line is the ORIGINAL spec5 IDP/IDK wording (keeps "hairstyle colour") — not changed. t6 untouched.
3. t3 = Phi's old garment shape (closed fine-silk robe, long trailing wide sleeves, waistband with hanging jade pendants + tassels, sheer shawl) at the t3 luxury level (wide embroidered bands, plain silk, silk waistband, gold only at borders).
4. Phi (t5) redesigned; `--phicollar` (rejected, áo-dài look) REMOVED. Neck-piece study: t4 = embroidered cloud collar (yunjian) over the shoulders; t6 = pearl-edged collar + cape; t7 = jewelled cloud-collar cape edged with pearls and gold; t5 text had no neck-piece. New t5 = the t4 cloud collar one step up: larger, scalloped gold-thread edge, fringe of small gold tassels; plus deep brocade cuffs, broad gold brocade girdle with two long jade pendants on silk cords, large peony medallions on the skirt front, no sheer shawl; headdress wording kept ("a LARGER gold headdress ...").
Checks: test_low_all OK 2304 builds; t8 golden pB_c06 cmp OK; golden_low t1-t5 regenerated (t4 and t5 changed because of the hair/Phi edits; t6 unchanged; t7 golden mismatch is PRE-EXISTING).
Refs used in EVERY t1-t5 gen (c06/c25): exactly TWO = her own a18 t1 v0 (img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png, uploaded as face-<cNN>-t1.png) + style image kspkwKx16B. No benchmark/praised figure.
Sample: 8 gens (c06+c25 t1,t2,t3,t5), 0 rejected, each looked at (faces, closed lips, pins up, no phoenix). Sheet https://ctm-img.victoria-tntt.workers.dev/img/_review/low-B/t2t3-new/sheet4.jpg columns t1|t2|t3|t4|t5 (t4 = old image, built before the t4 hair wording was cut); singles in .../t2t3-new/v4/.
Honest checks: (a) t2 and t3 look alike in c06 (both open layered robe with a sheer shawl/sleeve drape) — that follows from the swap (t2 = old t1 design) and t3 = Phi's old cut. (b) Hair is closer to her reference but not pixel-identical across ranks (updo height/pins vary a little). (c) Poses/held items untouched by me (3f lists as committed by others); FIGURE_GATE D.3a spec5 pose-table compliance of build.py was NOT part of my line and I did not verify it.

---
# ROUND 5 (ROOT-31 22:05Z): spec5 pose code ported + FACING skip + calm-with-rank
PRIORITY #1 CHECK: ROOT-31 order | W108 branch review/spec5pose-sample (92150bda, cherry-picked unchanged) | claims 0.
Ported W108's `--spec5pose` (SPEC5_POSES verbatim, SPEC5_ADAPT, SPEC5_IDS, spec5pose()) onto 21145c65-based build.py, then added in spec5pose(): (1) FACING skip (D.3a): any pose matching "look(ing) back" is skipped -> next pose of the same personality list ((i+t+k)%6); (2) CALM (APPROVED_PROMPTS rule 3): for t>=6 and a51/a65 the same skip also drops twirl/skipping/dance/swirl/"light turn" poses. Flag off = byte-identical (t8 golden pB_c06 OK, golden_low t4 c06 cmp OK, test_low_all OK 2304 builds). Flag on: 512 builds (c01-c32 x t1-t8 x a18/a51) 0 failures, 0 look-back poses, 0 lively poses at t6+/a51.
c06/c25 a18 v0 poses now: c06 t1 lifting skirt hem | t2 walking mid-step raising the item by the cheek | t3 walking forward, sleeves flowing behind | t4 turning mid-step adjusting a hairpin (spec5 look-back pose skipped) | t5 same turning-mid-step (skip) | t6 breeze lifts stole; c25 t1 walking with item in both hands | t2 walking, item raised | t3 breeze lifts stole | t4 adjusting hairpin | t5 walking mid-step | t6 walking with ruyi in both hands.
Caveat: "turning mid-step while adjusting a gold hairpin" is not literally a look-back pose so it is kept; if the owner reads it as back-turned, add "turning mid-step" to the skip list. NO regen yet (waiting for the owner verdict on sheet4). Usage: `python3 build.py cNN --low N v0 --spec5pose [--age a51]`.
