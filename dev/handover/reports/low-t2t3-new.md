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

---
# ROUND 6: `--nostyle` (owner 18/11 ~22:30Z: only her own identity image as reference, no style image)
build.py flag `--nostyle` removes ONLY the sentence " The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose." (same text in every builder: t8, t7, t1-t6, triều, states). Flag off byte-identical (test_low_all OK 2304, t8 golden OK, golden_low t4 cmp OK). Checked 448 flag-on/flag-off pairs (c01-c32: t8 v0/v1/v2, t7, t1-t6, triều t1/t8, states nude/thaihau): output = flag-off minus exactly that sentence, no "style reference" left. t6 swatch (colour-only third image) text is untouched. Generation side: send ONLY her own identity image as reference (no kspkwKx16B).

---
# ROUND 7 (ROOT-31, owner verdict on sheet4 ~22:20Z) — CODE DONE by W103; GENERATION = HANDOVER to successor
PRIORITY #1 CHECK: owner verdict relayed by ROOT-31 | build.py TIER_LOW, Hair sentence, PHI_VAR | claims 0.
Owner: t1/t2/t3 OUTFITS APPROVED (sheet4). Hairpins t1<t2<t3 must differ; t3 keeps current; Phi (t5) must differ from Tần beyond the collar → 4 designs A–D to choose from (she picks one).
## Code (build.py, pushed): 
- t1 ornaments = "pretty silver hairpins and a fresh flower"; t2 = "silver and pearl hairpins and a fresh flower"; t3 unchanged ("pearl-tipped hairpins, small silk flowers and a fresh flower"). The shared "Hair:" sentence is now per rank for t1/t2/t3 (t1 "with pretty silver hairpins and a fresh flower", t2 "with silver and pearl hairpins and a fresh flower", t3 "with silver, pearl and fresh flowers"); t4–t6 Hair sentence = "decorated with several gold hairpins (trâm) with dangles, rich like her rank" (no fresh flowers); t6 "tall chignon crowned by a" → "a" (runtime replace).
- Flags `--phiA` `--phiB` `--phiC` `--phiD` (t5 only; default t5 unchanged = cloud-collar step): A = brocade robe under a short gold-edged over-jacket with wide elbow-length half sleeves (long inner sleeves below), waistband + jade pendants; B = long sleeveless brocade vest-coat worn open over a long-sleeved robe + long gold-embroidered stole across both arms + waistband with pendants; C = wide sleeves in three stacked tiers of different tones each edged with gold embroidery + waistband; D = fitted gold-brocade bodice with stiff waist panel over a long brocade over-skirt with wide front panel of peony medallions, side pleats, silk apron with two jade pendants. None has a cloud collar or phoenix (384 builds checked: c01–c32 × A–D × v0/v1/v2 with --nostyle --spec5pose).
- Guards: test_low_all OK 2304, t8 golden OK; golden_low t1–t6 regenerated (t1/t2/t4/t5/t6 changed by hair edits; t3 only the Hair sentence stays same text).
## TO DO (successor): 12 gens, c06 + c25 a18 v0: t1, t2, PhiA, PhiB, PhiC, PhiD
- Prompts: `python3 build.py cNN v0 --low 1 --nostyle --spec5pose` ; `... --low 2 ...` ; `... --low 5 --phiA|B|C|D --nostyle --spec5pose` (paste output UNCHANGED).
- References: ONLY her own identity image (c06 Magnific id of upload face-c06-t1.png = rgXsjcmxtc, c25 face-c25-t1.png = u5WqFZ2QLD; both in the Magnific account used by this session — if the account changed, re-upload https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png). NO style image.
- Settings: gpt-2-6, 1024x2304, 2k, count 1, folder ba4aecfe-efce-47e2-b53f-30d292091886, then images_remove_background. Look at every image (facing rule: frontal/three-quarter only).
- Sheet: per person t1 | t2 | t3(existing: img/_review/low-B/t2t3-new/v4/<cNN>_t3.png) | t4(existing: img/_review/t8-reprompt/t1t6/<cNN>_a18_t4_v0.png) | PhiA | PhiB | PhiC | PhiD → img/_review/low-B/t2t3-new/sheet5.jpg (≤1400 px: 8 columns of ~170 px). cdn_sync from a sparse checkout of origin/main (dev/site/cdn_sync.py + manifest_guard.py), CLOUDFLARE_API_TOKEN=proxy-injected.
- Honest notes for the owner: A–D are structure changes (not collar changes); Phi must stay richer than t4 and below Quý phi t6; she picks one → then the chosen flag becomes the default t5 (canon overwrite: delete the other three, delete the cloud-collar default).

---
# ROUND 8 (W103b, owner "Đi" 19/11 after ROOT-34 chain): the 12 sample gens — READY
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | topic lives in this report (ROUND 7). FIGURE_GATE A0 REFERENCES (a3d2b08) + rule 3 + hoa điền rule re-read before each person (handover b3b7731).
- Refs (every gen, exactly two): style3_girls Xm9tPkMBfo (type style) + her own a18 t1 v0 face image (c06 rgXsjcmxtc, c25 u5WqFZ2QLD). No pink style B, no m09 alone, no --nostyle. Prompts = `python3 build.py cNN v0 --low N [--phiA..D] --spec5pose` pasted UNCHANGED (verified: output == earlier --nostyle output plus the style sentence only).
- Settings: gpt-2-6, 1024x2304, 2k, count 1, folder ba4aecfe..., then images_remove_background. 12 gens, 0 rejected (the 7 earlier gens with own-t1-only refs + --nostyle were discarded: c06 t1/t2/A/B/C/D, c25 t1 = 945 credits wasted before the refs rule settled).
- Looked at all 12 (≤600 px): frontal/three-quarter only, closed-lip smiles, bare foreheads (no hoa điền), pins upward, no phoenix, no cloud collar, hair = her own bun. t1 (pretty silver pins + 1 flower) < t2 (silver+pearl pins + flower) < t3 existing (pearl-tipped pins + silk flowers) read as a ladder, though t2 vs t3 pin difference is subtle at sheet size. Phi A (over-jacket, half sleeves), B (sleeveless brocade vest + sheer stole), C (3 stacked sleeve tiers), D (bodice + peony-medallion apron) are clearly different from each other and richer than t4 (big gold headdress, heavy gold brocade).
- Sheet5 (rows c06, c25; columns t1 | t2 | t3 existing | t4 existing | PhiA | PhiB | PhiC | PhiD, labels on sheet): https://ctm-img.victoria-tntt.workers.dev/img/_review/low-B/t2t3-new/sheet5.jpg ; cut-out singles (transparent PNG): .../t2t3-new/v5/<cNN>_<t1|t2|phiA|phiB|phiC|phiD>.png. t3 = v4/<cNN>_t3.png, t4 = t8-reprompt/t1t6/<cNN>_a18_t4_v0.png (older images).
- Flags for the owner/foreman: (1) the consort-low prompt still carries the old "all colours fresh, clear and luminous" COLOUR RULE; the owner's 23:20Z rule ("fresh but restrained, trầm") is not in build.py for t1/t2/Phi, so robes are coral/brick (c06 reads fairly saturated). I did NOT edit build.py (A0: paste unchanged); a follow-up would need a build.py change. (2) Poses are the spec5pose table (Phi: all four share the same pose by design so only the garment differs). (3) She picks one of A–D; then the chosen flag becomes default t5 (canon overwrite: delete the other three + the cloud-collar default).
- ~100% xong sample / chờ sếp chọn Phi A–D. START_CTX ~15%, now ~45% of window.

---
# HANDOVER W103b → successor (ROOT-34 HOLD, ~45 % of window; no more gens by me)
State: ROUND 8 above is complete and delivered (sheet5 sent to the owner, Lượt 116). Waiting for her pick of Phi A–D. Nothing is running.
If she asks for the trầm colour: the consort-low COLOUR RULE is build.py L320 (`s+=f" COLOUR RULE: all colours fresh, clear and luminous, never dusty or greyed; "...`, used by low t1-t6) and the shared `fresh=` string at L281; L646/L647 (t8), L707 (t7), L753 (other) carry the same clause. The approved trầm wording already exists at L694 (bd/trieu): "all colours fresh but restrained, in deep, toned-down shades with a soft subdued trầm feel ..." and L944 shows the runtime-replace pattern used for a51/a65. Cleanest patch = replace the clause at L281/L320 (low ranks only) with the L694 wording, flag-guard it first (guards: test_low_all OK, goldens OK, flag-off outputs byte-identical), then regen the 12 (same refs: style3_girls Xm9tPkMBfo + own t1 face rgXsjcmxtc (c06) / u5WqFZ2QLD (c25); gpt-2-6 1024x2304 2k, folder ba4aecfe-efce-47e2-b53f-30d292091886; commands in ROUND 7). Needs a build.py change = foreman's call (A0: paste unchanged).
Ids (new gens, bg-removed): see sheet5 singles .../t2t3-new/v5/. Discarded old-setup gens: c06 aFGQCLBfSh 79f4OWbJAL xSBgLtujfW 9ZHR61CNYZ kseLrmH16B mEZCvVshJQ, c25 gOmJwD1SXO.

---
# ROUND 9 (W103c, Foreman C ROOT-35; owner PHI (t5) REDESIGN VERDICT 19/11 ~00:20Z + rule 3 GAME COLOUR BENCHMARK = SHEET5 TONE LEVEL)
PRIORITY #1 CHECK: FIGURE_GATE "PHI (t5) REDESIGN VERDICT" (b45d2e4) + rule 3 sheet5 tone (d0c996b) | build.py build_low COLOUR RULE (was L646/647), PHI_VAR | triều already on the sheet5 wording (0bb8ca1), BD lifted (9fe7e7b) | claims 0. FIGURE_GATE A0 + REFERENCES + rule 3 + consort-B10 re-read before c06 and before c25.
## (1) Colour rule patch (8e55d49)
- New constant `LOW_TONE` = the triều rule words, reused unchanged: "all colours at ONE medium tone level, the same as the soft coral-red and brick-red robes of the game: medium saturation, medium lightness, neither too fresh nor too dark, never rực, never glaring, never neon, never pastel-washed, never dusty, grey, muddy or black; ". No "trầm"/"subdued".
- Replaces "all colours fresh, clear and luminous, never dusty or greyed; " in build_low (t1–t6, v0/v1/v2, incl. Phi variants) for young ages only. a51/a65 keep the old clause so the elder swap still fires (byte-identical). build_bdq index lookup loosened (its output byte-identical).
- MD5 guard: 3940 commands (c01–c32 × t8 v0–v2, t7, --head, low t1–t6 × v0–v2 × a18/a26/a51/a65 + spec5pose, Phi A–D a18/a51, triều 1–8, 8 states, bdq) before vs after: 1856 changed = exactly low t1–t6 young (a18/a26/spec5pose) + Phi A–D a18, each differing ONLY by that clause (checked by string swap); every t7/t8/triều/state/a51/a65 output identical. (`--bdq N --spec5pose` crashes before and after = pre-existing.) test_low_all OK 2304; golden_low 192 regenerated (each = old with the clause swapped). Pre-existing, not mine: golden/pB_c06.txt already differs from `build.py c06 v0` before my edit.
## (2) Phi E–H sample (876b5a0): flags `--phiE..--phiH` (t5 only; default t5 unchanged until she picks)
Same robe for all four = "a silk brocade court robe with a crossed collar, richly embroidered in gold with peonies and small birds, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, and as her ONE signature piece, clearly visible at game size, <piece>; no cloud collar, no vest, no stiff shoulder pieces"; headdress/hair/colour/pose = same as sheet5 Phi (same spec5 pose for all four).
| | signature piece |
|---|---|
| E | large jewelled necklace-collar (yingluo): rigid gold ring set with pearls and jade, pearl strings + small jade pendants in a curved fringe over the upper chest |
| F | short round capelet over shoulders/upper chest, soft brocade, smooth round outline (not cloud-shaped), small gold flowers, pearl edge, jade clasp at the throat |
| G | beaded shoulder yoke shoulder-to-shoulder: open net of pearls + small jade beads, tiny gold flower studs, short pearl fringe |
| H | small Ming-style stand collar (≤ mid-neck) with two gold button-clasps + gold pendant chain ending in a jade plaque; crossed outer collar visible below |
Not used from the foreman's idea list: the long pearl-edged shoulder stole (t6 Quý phi already wears "an embroidered pearl-edged cape/stole over the shoulders", and sheet5 B's stole was rejected) → replaced by the FIGURE_GATE example "beaded yoke" (G).
- Gens: 8 (c06 + c25 × E–H), 0 rejected, gpt-2-6 1024x2304 2k, folder ba4aecfe…, refs per A0 (2 images): style3_girls Xm9tPkMBfo (style) + own t1 face (c06 rgXsjcmxtc / c25 u5WqFZ2QLD); prompts = `python3 build.py cNN v0 --low 5 --phiX --spec5pose` pasted unchanged; then images_remove_background. Gen ids c06 E–H: jUoU6o5LD0 jUoU61ULD0 JNCNnw3Oq4 p8y8uDbehw; c25 E–H: Xm9mqjKBfo ov6v5lP829 MBJBE1sDCm BhNhbSvoQR (cut-outs MBJBuHKDCm fHzHlUhCDY rgXg6Z2xtc If3f1sstvE / rgXg62txtc If3f1lltvE 0eUefqMTfW 79f9YDaJAL). 1080 + 24 credits.
- Looked at all 8 (full + neck crops): frontal/three-quarter, closed-lip smiles, bare foreheads, pins upward, no phoenix, no vest, no cloud collar; each piece reads as asked; robe colours at the sheet5 level (c06 coral, c25 brick red).
- SHEET6: https://ctm-img.victoria-tntt.workers.dev/img/_review/low-B/t2t3-new/sheet6.jpg — rows c06, c25; columns t4 Tần (existing t8-reprompt/t1t6) | Phi E | F | G | H | t6 Quý phi (existing t8-reprompt/t1t6/<cNN>_a18_t6_v0.png). Singles (transparent): .../t2t3-new/v6/<cNN>_phiE..H.png.
- Honest notes: (a) H is the quietest at sheet size (small collar + jade plaque); (b) F's round capelet is the most "shoulder" option, so it sits closest in outline to the t4 cloud collar / t6 cape — clearly round and pearl-edged, but compare; (c) E and G read strongest as a neck/shoulder signature. (d) t4/t6 columns are older images (built with the old "fresh, clear" clause). She picks one → that flag becomes default t5 (canon overwrite: delete A–D, the unpicked E–H and the cloud-collar default).
~100% xong sample / chờ sếp chọn Phi E–H. START_CTX ~4 %, now ~15 % of window.

---
# ROUND 10 (W103c, ROOT-35 quick job, no gens): live cung nữ → ma ma ladder sheets
PRIORITY #1 CHECK: live CDN img/_index.json + FIGURES-servants.json + FIGURES-hd.json | main dev/test/player-dress.js L6/L24/L48-49 (tm0..tm4 = cung nữ rk0..4; "a maid face's rank-1 dress is the plain maid art"; ma ma = `S.srv.mama=1` → look "tm4") + jrank.js L100 (Ma ma → one frame-mama) | claims 0.
- https://ctm-img.victoria-tntt.workers.dev/img/_review/ladder/ladder_m01.jpg and .../ladder_m37.jpg (a18).
- Columns (file, from CDN img/hd/ when it exists, else img/): Cung nữ bậc 0 = fig-maid-<m>-tm0-a18 (m01: SD only, no hd) | bậc 1 = fig-maid-<m>-a18 (plain maid art) | bậc 2/3/4 = fig-maid-<m>-tm2/tm3/tm4-a18 | Ma ma = the same tm4 image (live game dresses a ma ma in the tm4 art) | Mama bậc 1–4 = grey "chưa có hình" (no mama tier art exists; the fig-mama-k01.. figures are separate mama identities without tiers, not these faces).
- Note: no veils are painted on these figures; the OD:L12 veil (m0–m1 ivory, m2–m4 pink) is not in the figure art (presumably an in-game overlay, veil-fit.json) — not shown on the sheet.
