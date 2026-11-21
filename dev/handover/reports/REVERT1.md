# REVERT1 — owner L1714: t4–t8 back to the old Set A prompts (0 gens)
depth 2 (worker of Foreman C ROOT#19) · START_CTX ~3 % of 1M (own estimate) · end ~10 %.

## Files (dev/art/thu_comoi/, each + .keep, base = dev/art/rank8-s62/s62_tN.txt)
| file | chars | check_store (tpN a22) |
|---|---|---|
| s62_t4_THU_revert_sqtest_L1714 | 9958 | FAIL only B26/M06 (row 1 thin silk vs gate) |
| s62_t4_THU_revert_L1714 | 9620 | FAIL only B26/M06 (row 1 thin silk vs gate) |
| s62_t5_THU_revert_L1714 | 8461 | FAIL only B26/M06 (row 1 thin silk vs gate) |
| s62_t6_THU_revert_L1714 | 9408 | PASS |
| s62_t7_THU_revert_L1714 | 8843 | PASS |
| s62_t8_THU_revert_L1714 | 8814 | PASS |

keep_check --all: 393 PASS. Builders: thu_comoi/revert_L1714/make_t4.py, make_t5_t8.py (COLOUR SLOT = MAIN/SEC/HEX constants at the top), make_keeps.py.

## Gate conflict (Foreman decides)
B26 (L1283) forces matte satin đoạn on t4/t5; owner L1714 row 1 = old 'thin, light, flowing silk and gauze'. t4 ×2 and t5 FAIL only on this. Needs rule.py set B26 / gate override before drawing. t6 'HEAVY SATURATED brocade' + 'FABRIC: thick brocade' (row 2) passes the gate.

## Notes
- sqtest CAPELET CUT uses the approved S13_COMOI wording 'the outer robe closes only at the sash, never at the throat' (old throat-clasp form would hide the square collar). OUT1 WARN only.
- t6 pose keeps today's 'a breeze lifts her long stole' (row 23) though the stole moved to Phi (rows 7+8): the sheer phi bạch shawl reads as that stole — flag if the owner wants it changed.
- t7/t8 have no body-motif-over-bands sentence (row 6 was t4–t6 only in STEP0).
- Row 20: F2 table (ART_RULES F2, FLORA1) is the newest per-tier table found; s62 → t4 lotus, t5 double hollyhock, t6–t8 incurved chrysanthemum.
- Captions added: 'Mùa Thu · Tần · thử cổ vuông' / 'cổ chéo cũ' / '<bậc> · prompt cũ L1714'.

## Diff vs the old prompt (old → new · L1714 row)
### t4 common (both files)
- row 24 repeat: “Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porc…” → “(cut)”
- row 24 repeat / 23 angle: “beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.” → “beautiful/handsome romantic-lead looks for everyone.”
- row 20 + 6: “embroidered borders of plum blossoms at collar, sleeves and hem,” → “embroidered borders of lotus flowers at collar, sleeves and hem (the small embroidered motifs never run over t…”
- row 18: “an embroidered silk sash with hanging jade belt pendants and tassels,” → “an embroidered silk sash with hanging jade belt pendants and tassels, the jade pendants never covered by sleev…”
- row 19: “small dangling gold bu yao tassel hairpins;” → “small dangling gold bu yao tassel hairpins, none at the ears;”
- row 21: “her signature colour family ice blue and mint mist stays the MAIN robe colour (ice blue); the robe itself is c…” → “her signature colour family light olive and lilac stays the MAIN robe colour (light olive); the robe itself is…”
- row 21: “her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ice blue silk like #71B5D7 is th…” → “light olive silk like #9FB577 is the main colour of the robe, sleeves and any cape, with lilac in the inner ro…”
- row 20: “decorated with ONE fresh flower and several” → “decorated with ONE fresh lotus flower and several”
- row 20: “exactly ONE fresh flower in her hair” → “exactly ONE fresh lotus flower in her hair”
- row 23: “ANGLE: a SLIGHT turn to the RIGHT (about 15 degrees), body almost frontal, face toward the viewer; her head tu…” → “ANGLE: a clear THREE-QUARTER view toward the LEFT side of the picture, NOT frontal: her whole body, shoulders,…”
- row 23: “GRACE (pose variety, every rank its own): her shoulders soft and relaxed, one shoulder a touch lower than the …” → “GRACE (pose variety, every rank its own): her head inclined gently toward the hand that holds the item, her fa…”
- row 21: “the MAIN colour ice blue and the SECONDARY colour mint mist,” → “the MAIN colour light olive and the SECONDARY colour lilac,”
- row 21: “BOTH her robe colour ice blue and her secondary colour mint mist.” → “BOTH her robe colour light olive and her secondary colour lilac.”
- row 21: “gauze shawl in mint mist (her secondary colour, clearly different from her main robe colour ice blue)” → “gauze shawl in lilac (her secondary colour, clearly different from her main robe colour light olive)”
- row 23: “Pose: a three-quarter turn looking at the viewer, a silver-mounted book box held near her shoulder, the robe h…” → “Pose: walking with a small white-jade lotus lamp held upright in one hand.”
- row 22: “floor-length robe with slippers visible,” → “floor-length robe, only slipper toe tips peeking under the hem,”
### t4 sqtest only
- row 3 TEST (m19/m29 t3 square-collar words): “a crossed collar,” → “NO crossed wrap collar: a LAYERED NECKLINE, a lilac inner robe with a straight SQUARE NECKLINE framed by a wid…”
- row 3 TEST: “covering only the shoulders and upper chest,” → “covering only the shoulders and the outer upper chest,”
- row 3 TEST: “fastened at the throat with a jade clasp,” → “OPEN at the front, its two front edges parting so the square neckline stays fully visible, never hiding it,”
- row 3 TEST: “the pearl net starts right at the collar at the throat and hangs down” → “the pearl net starts right at the capelet's neck edge and hangs down”
- row 3 TEST (approved S13_COMOI open-collar form, owner L1377): “CAPELET CUT (flowing): the capelet stays the same short round shoulder capelet, but its lower edge and the col…” → “CAPELET CUT (flowing): its lower edge and collar lines are soft CURVES, never flat; the lower edge is rounded …”
### t4 fallback only
- row 24 (approved S13 wording, same meaning): “CAPELET CUT (flowing): the capelet stays the same short round shoulder capelet, but its lower edge and the col…” → “CAPELET CUT (flowing): its lower edge and collar lines are soft CURVES, never flat; the lower edge is rounded …”
### t5
- row 24 repeat: “Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porc…” → “(cut)”
- row 24 repeat / 23 angle: “beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.” → “beautiful/handsome romantic-lead looks for everyone.”
- row 21 (olive is not her original colour): “her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ” → “(cut)”
- row 22: “floor-length robe with slippers visible, no train” → “floor-length robe, only slipper toe tips peeking under the hem, no train”
- row 20 + 6: “richly embroidered in gold with peonies and small birds,” → “richly embroidered in gold with double hollyhocks and small birds, the body motifs never over the borders or b…”
- row 7+8 (old Quý phi cape) + 10: “an embroidered cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of sma…” → “an embroidered light olive pearl-edged cape/stole over the shoulders, a SHORT round-pearl strand swags ACROSS …”
- row 18: “a broad gold brocade girdle with two long jade pendants hanging on silk cords,” → “a broad gold brocade girdle with two long jade pendants hanging on silk cords, never covered by sleeve or shaw…”
- row 20: “large peony medallions” → “large double hollyhock medallions”
- row 19: “dangling gold tassels and jade pins;” → “dangling gold tassels and jade pins, none at the ears;”
- row 23: “ANGLE: a SLIGHT shoulder turn to the RIGHT (about 15 degrees), body almost frontal, face toward the viewer; he…” → “ANGLE: FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, no turn; her head never back-tu…”
- row 23: “GRACE (pose variety, every rank its own): her head tilted very slightly against the turn of her body, a lively…” → “GRACE (pose variety, every rank its own): her head tilted very slightly to one side, a soft graceful line from…”
- row 23: “Pose: a small step forward, a small pipa lute inlaid with gold and mother-of-pearl held at her waist with both…” → “Pose: walking while holding a folded letter on gold-flecked paper tied with a silk cord in both hands, sleeves…”
- row 20: “ONE fresh flower” → “ONE fresh double hollyhock”
- row 21: every 'ice blue' → 'light olive', 'mint mist' → 'lilac', #71B5D7 → #9FB577 (COLOUR SLOT).
### t6
- row 24 repeat: “Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porc…” → “(cut)”
- row 24 repeat / 23 angle: “beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.” → “beautiful/handsome romantic-lead looks for everyone.”
- row 21 (olive is not her original colour): “her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ” → “(cut)”
- row 22: “floor-length robe with slippers visible, no train” → “floor-length robe, only slipper toe tips peeking under the hem, no train”
- row 20 + 6: “embroidered with peonies and plum blossoms in ice blue and gold thread along the borders,” → “embroidered with incurved chrysanthemums in ice blue and gold thread along the borders, the body motifs never …”
- row 7+8 (old Phi cloud collar): “an embroidered ice blue pearl-edged cape/stole over the shoulders,” → “an embroidered cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of sma…”
- row 12: “gold-and-jade necklace and bracelets;” → “gold-and-jade bracelets;”
- row 7+8 (the cape went to Phi): “a pearl-edged collar and cape trim,” → “a pearl-edged collar trim,”
- row 18: “a yellow sash and narrow yellow borders,” → “a yellow sash and narrow yellow borders, the jade pendants never covered by sleeve or shawl,”
- row 24 repeat of the last sentence: “image 2 is only a colour reference, never copy anything but its colour;” → “image 2 is only a colour reference;”
- row 19: “decorated with several gold hairpins (trâm) with dangles, rich” → “decorated with several gold hairpins (trâm) with dangles, nothing at the ears, rich”
- row 23: “ANGLE: a SLIGHT shoulder turn to the LEFT (about 15 degrees), body almost frontal, face toward the viewer; her…” → “ANGLE: a SLIGHT turn toward the LEFT side of the picture (about 15 degrees): her chest and face point a little…”
- row 23: “GRACE (pose variety, every rank its own): her fingers softly and gracefully curved around the item, wrists rel…” → “GRACE (pose variety, every rank its own): her head tilted very slightly against the turn of her body, a lively…”
- row 23: “one hand holding a pearl-tasselled silk lantern with a jade top,” → “one hand holding a pearl-embroidered silk ball (tú cầu) with jade tassels, a round stuffed ball, no handle, no…”
- row 20: “ONE fresh flower” → “ONE fresh incurved chrysanthemum”
- row 21: every 'ice blue' → 'light olive', 'mint mist' → 'lilac', #71B5D7 → #9FB577 (COLOUR SLOT).
### t7
- row 24 repeat: “Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porc…” → “(cut)”
- row 24 repeat / 23 angle: “beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.” → “beautiful/handsome romantic-lead looks for everyone.”
- row 21 (olive is not her original colour): “her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ” → “(cut)”
- row 22: “floor-length robe with slippers visible, no train” → “floor-length robe, only slipper toe tips peeking under the hem, no train”
- row 20 + 13: “embroidered with phoenixes, peonies and auspicious clouds in gold thread on the chest and along the borders,” → “embroidered with phoenixes, incurved chrysanthemums and auspicious clouds in gold thread on the chest and alon…”
- row 18 + 22/24: “a jade-and-gold belt with long tassels, floor-length robe with slippers visible;” → “a jade-and-gold belt with long tassels, its jade pendants never covered by the sleeves, floor-length robe;”
- row 13 + 19: “with pearl strands, kingfisher-blue inlay and a few gold tassels.” → “with pearl strands, its phoenix feathers inlaid in lilac and ice blue, and a few gold tassels, none at the ear…”
- row 12: “a layered pearl-and-gold necklace, ” → “(cut)”
- row 23: “ANGLE: FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, no turn, mirrored: her weight a…” → “ANGLE: FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, no turn, mirrored: her weight a…”
- row 22 (walking): “gaze to the viewer, with stately grace, the robe falling still and straight.” → “gaze to the viewer, with stately grace.”
- row 21: every 'ice blue' → 'light olive', 'mint mist' → 'lilac', #71B5D7 → #9FB577 (COLOUR SLOT).
### t8
- row 24 repeat: “Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porc…” → “(cut)”
- row 24 repeat / 23 angle: “beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.” → “beautiful/handsome romantic-lead looks for everyone.”
- row 21 (olive is not her original colour): “her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ” → “(cut)”
- row 22: “floor-length robe with slippers visible, no train” → “floor-length robe, only slipper toe tips peeking under the hem, no train”
- row 20 + 13: “richly embroidered on the chest, shoulders and wide sleeves with large phoenixes, peonies and clouds in gold a…” → “richly embroidered on the chest, shoulders and wide sleeves with large phoenixes, incurved chrysanthemums and …”
- row 15: “over it a long ceremonial silk mantle falling from the shoulders to the floor, edged with a broad band of gold…” → “(cut)”
- row 18 + 22/24: “a jade-and-gold belt with long tassels and jade pendants, floor-length robe with slippers visible,” → “a jade-and-gold belt with long tassels and jade pendants, never covered by the sleeves, floor-length robe,”
- row 13 + 19: “kingfisher-blue inlay, rubies and pearls, and a few clean pearl tassels at the sides;” → “its phoenix feathers inlaid in lilac and ice blue, rubies and pearls, and a few clean pearl tassels at the sid…”
- row 15: “DOMINANT colour of the robe, mantle, sleeves and skirt” → “DOMINANT colour of the robe, sleeves and skirt”
- row 23: “Pose: weight on one leg, a gold phoenix hairpin with pearl dangles, held in the hand raised and admired, the o…” → “Pose: a gold phoenix hairpin with pearl dangles, slim and palm-length, held between her fingers, never a scept…”
- row 21: every 'ice blue' → 'light olive', 'mint mist' → 'lilac', #71B5D7 → #9FB577 (COLOUR SLOT).
- (t4 files: same row-21 colour swaps, written inline.)

## Handover
Job done (steps A+B). Open: B26 gate override for t4/t5 (Foreman). No drawing done.

## L1716 rewrite of the step-A test (owner correction via Foreman C)
s62_t4_THU_revert_sqtest_L1714.txt rebuilt (9827 ch): OLD Tần prompt with NO new layer words (no inner/outer robe, no layered neckline, no S13_COMOI "outer robe closes at the sash"). Only: "a crossed collar" → "a straight SQUARE NECKLINE framed by a wide stiff lilac embroidered lotus flowers band (NO crossed wrap collar)"; capelet "fastened at the throat" → "OPEN at the front … the square neckline shows fully inside it, never hidden"; CAPELET CUT says the capelet is never closed at the throat. Old-prompt words kept as they were ("a layered silk robe of two or three visible layers", "lilac in the inner robe and linings"). Builder SQ list = the diff (make_t4.py).
Gate: FAIL B26/M06 (row 1) + S13 REWRITTEN (the approved S13 says "the robe closes only at the throat clasp", which would close over the square collar) — both need the Foreman's override. keep --all 393 PASS.

## Fix: Tần sqtest file restored
My 17ebd70 had overwritten the Foreman's own L1716 text of s62_t4_THU_revert_sqtest_L1714.txt (3c1207f, the one drawn p8yYJV3ehw, approved L1720). Restored 3c1207f text + .keep. Do not re-run revert_L1714/make_t4.py over it.

## JOB L1723 (Foreman C #20, 0 gens)
Rule F19 added (rule.py add --force; F3 overlap): hair flower = bloom only, no leaves; never a yellow chrysanthemum in the hair; colour from the table below; own flower per rank (t7/t8 embroidery: herbaceous peony / tree peony).

### Hair-flower table s62 thu (outfit light olive #9FB577 + lilac)
| tier | species (F2/F19) | hair-flower colour | where |
|---|---|---|---|
| t1 Đáp ứng | lilac | pure white | hair |
| t2 Thường tại | tiger lily | soft peach-coral | hair |
| t3 Quý nhân | semi-double China rose | soft rose-pink | hair |
| t4 Tần | lotus | pale blush-pink (proposal; t4 file approved, NOT changed) | hair |
| t5 Phi | double hollyhock | deep rose-pink | hair |
| t6 Quý phi | incurved chrysanthemum | soft mauve-pink (never yellow) | hair |
| t7 HQP | bomb-form herbaceous peony (thược dược) | soft rose-pink + ivory | embroidery only (crown, no hair flower — F2) |
| t8 HH | tree peony (mẫu đơn) | deep rose-red + lilac | embroidery only (crown) |
Question for the owner: should HQP/HH also wear a hair flower now? (F2 still says none at t7/t8.)

### Files (dev/art/thu_comoi/, each + .keep; keep_check --all 412 PASS)
| file | base | chars | check_store tpN a22 |
|---|---|---|---|
| s62_t1_THU_L1723 | rank8-s62/s62_t1 | 8781 | PASS |
| s62_t2_THU_L1723 | rank8-s62/s62_t2 | 8573 | PASS |
| s62_t3_THU_L1723 | rank8-s62/s62_t3 | 9574 | PASS |
| s62_t5_THU_fix_L1723 | s62_t5_THU_revert_sq_L1719 | 9215 | FAIL only B26/M06 (same as L1719, row 1) |
| s62_t6_THU_fix_L1723 | s62_t6_THU_revert_sq_L1719 | 9747 | PASS |
| s62_t7_THU_fix_L1723 | s62_t7_THU_revert_sq_L1719 | 9084 | PASS |
| s62_t8_THU_fix_L1723 | s62_t8_THU_revert_sq_L1719 | 9214 | PASS |
Builders: thu_comoi/fix_L1723/make_t5_t8.py, make_t1_t3.py, make_keeps.py (each edit carries its reason).

### Diffs
- t5 Phi: + Tần pearl net words (t4 approved) laid over the cape, fringe "LONGER and fuller than the Tần's, with bigger pearls", never hiding the square collar; hair flower deep rose-pink, bloom only.
- t6 Quý phi: "a few strands of pearls across the chest" + "with a little jade: small green jade beads set among the pearls"; hair flower soft mauve-pink chrysanthemum, bloom only, never yellow.
- t7 HQP: embroidery + collar band chrysanthemums → bomb-form herbaceous peonies (soft rose-pink and ivory). Nothing else.
- t8 HH: chrysanthemums → tree peonies (deep rose-red and lilac); cloud collar "lying FLAT and close on the shoulders … pearl fringes hanging straight down … NO cloak, NO cape, NO mantle: never a bell or flared cone shape at the neck and shoulders"; "the robe hanging close to the body, never bell-wide".
- t1–t3 (old Set A + L1714 rows): rows 19 (none at the ears), 20 (s62 species, plum → lilac / tiger lily / China rose), 21 (olive + lilac), 22 (toe tips), 23 (angle/grace/pose/item copied from today's dapung4 s62_t1_v11 / t2_v11 / t3_v12), 24 (opening repeat), 6 (motifs never over bands), 18 (t3 jade pendants never covered), G39 (t3 hairpin words, X20), L1723 hair flower. Old collars kept: t1 crossed-collar ruqun, t2 robe, t3 already square (no record asks a square collar at t1/t2). No layer/inner/outer words added.
- t4 Tần NOTE ONLY (approved, unchanged): L1723 would add (a) short pearl tassels — the yoke already has "its lower edge a short pearl fringe"; owner says Tần lacks pearl tassels → proposal: "+ a few short pearl tassels hanging from the capelet's lower edge" ; (b) hair flower "pale blush-pink lotus (the bloom ONLY, NO leaves…)". Foreman decides.

## JOB L1726 (Foreman C #20, 0 gens)
F19 updated (rule.py set): chrysanthemum out everywhere; peonies only t7/t8; new F2 t6 list centifolia rose / formal double camellia / thousand-petal lotus / mophead hydrangea / double crabapple. s62 t6 = formal double camellia, ivory-white with a soft pink blush (hair) + camellia embroidery.
A46 gems: one sentence before "No text, no labels." — "All gems are smooth polished CABOCHON stones (rounded, glossy), never faceted, never sparkling or brilliant-cut." (approved S14 HQP LUXURY sentence kept verbatim, gate requires it).
| file (thu_comoi/, + .keep) | base | diff | gate |
|---|---|---|---|
| s62_t6_THU_fix2_L1726 | s62_t6_THU_fix_L1723 | chrysanthemums → formal double camellias (borders, collar band, hair flower ivory-white/pink blush) + A46 sentence | PASS |
| s62_t7_THU_fix2_L1726 | s62_t7_THU_fix_L1723 | + A46 sentence only | PASS |
| s62_t8_THU_fix2_L1726 | s62_t8_THU_fix_L1723 | crown "rubies" → "smooth cabochon rubies" + A46 sentence | PASS |
keep_check --all 424 PASS. Builder fix_L1723/make_fix2_L1726.py. Words "never a yellow chrysanthemum" stay inside the hair-flower negation (t1–t6 L1723 files) — harmless; say if you want them cut.

## Fix3 t8 + negation cut (Foreman C #20, after draw jUoqvBPLD0 still wide/bell)
- s62_t8_THU_fix3_L1726.txt (base fix2, 9565 ch, PASS): cloud collar → "a SMALL … cloud collar lying FLAT ON the shoulders only, never reaching past the shoulder line, with short pearl fringes hanging straight down"; + "SLIM EMPRESS SILHOUETTE: the sleeves hang straight down close to her body, never flaring out; the robe falls in a slim straight column to the floor, never an A-line, triangle or bell shape." (approved sleeve-length sentences untouched).
- 'never a yellow chrysanthemum' cut from the hair-flower negations (now 'the bloom ONLY, NO leaves') in t1/t2/t3_THU_L1723, t5/t6_THU_fix_L1723, t6_THU_fix2_L1726 + builders. keep --all 428 PASS.

## Fix4 t8 / fix3 t7 (owner via Foreman C #20 on t8 nVsiOyRYQD: 'theo một màu thôi … bảy sắc cầu vồng'; plumage missing)
- s62_t8_THU_fix4_L1735 (base t8 fix3, 9919 ch, PASS): 'tree peonies (deep rose-red and lilac) and clouds in gold, lilac and light olive silk thread' → 'tree peonies and clouds in gold and lilac silk thread, every flower in ONE colour family only: tone-on-tone lighter and deeper shades of lilac with gold, never mixed with red, pink or other colours, elegant and noble; the phoenixes' plumage with OUTER feathers in lilac, inner feathers in light olive, feather tips and eyes in deeper olive, with gold-thread outlines' (G33 way B); crown 'feathers inlaid in lilac and light olive' → 'in the same plumage colours as the robe phoenixes (lilac outer, light olive inner, deeper olive tips)'.
- t7 HQP had the same gap (flowers soft rose-pink + ivory = extra colours; plumage lilac/olive without the deeper tip colour): s62_t7_THU_fix3_L1735 (base t7 fix2, 9483 ch, PASS) = same ONE-colour + G33 plumage + matched crown words.
keep --all 435 PASS. Builder fix_L1723/make_t78_fix4_L1735.py.

## Fix5 t8 (owner L1737: fix3 shoulders/slim were not asked — Foreman's own idea)
- s62_t8_THU_fix5_L1737 (base t8 fix2_L1726, 9691 ch): fix2 + ONLY the fix4 words (one-colour lilac tone-on-tone flowers, G33 plumage on robe phoenixes, matched crown inlay). Word-diff vs fix2 checked: nothing else changed; no 'SMALL … cloud collar' / 'SLIM EMPRESS SILHOUETTE'. fix3/fix4 t8 are superseded.

## Fix6 t8 (owner L1747: fix5 eIPWWUNdqL drew a HIGH STAND collar; fix4 gOmkqTkSXO had the square one)
- Finding: the square-collar words are IDENTICAL in fix4 and fix5 ('a straight SQUARE collar (no crossed collar) framed by a wide stiff band …'). fix4 only differed by its SMALL cloud collar flat on the shoulders (fix3 words, refused by the owner L1737), which left the neck clear; with the bigger fix2 cloud collar + 'SQUARE collar … wide stiff band' the model read a stand collar.
- s62_t8_THU_fix6_L1747 (base fix5, 9837 ch, check_store tp8 PASS, keep PASS, --all 443 PASS): square collar made explicit 'a LOW open square neckline across the upper chest, neck and collarbones bare, NEVER a high stand collar or mandarin collar'; 'wide stiff band' → 'wide flat band'; cloud collar + 'never rising up the neck'. Shoulders/cloud collar size = fix2 (unchanged), one-colour lilac flowers + plumage unchanged.
- Rule: NO rule id for the approved thu square collar. Approval = owner L1720 (Tần sqtest p8yYJV3ehw OK → all tiers, FOREMAN_C_STATUS line 1142); older related G22 (Tần t4 square neck, 20/11) and G17 (t1/t2 square neckline). Suggest the Foreman add one (rule.py add G …).

## JOB L1776 audit (owner via Foreman C #21; G53 THU square collar, F19, peonies t7/t8, one colour, A46) — 0 gens
| tier | latest file before | drawn id | audit | now |
|---|---|---|---|---|
| t1 Đáp ứng | s62_t1_THU_L1723 | fHzo0AZCDY | FAIL G53 (crossed-collar ruqun) | fixed → s62_t1_THU_fix_L1776 (8974, PASS) |
| t2 Thường tại | s62_t2_THU_L1723 | Syh1EQKUb8 | FAIL G53 (no square neckline) | fixed → s62_t2_THU_fix_L1776 (8746, PASS) |
| t3 Quý nhân | s62_t3_THU_L1723 | 79fjFlBJAL | square but 'wide stiff band' (G53 risk words) | fixed → s62_t3_THU_fix_L1776 (9667, PASS) |
| t4 Tần | s62_t4_THU_revert_sqtest_L1714 | p8yYJV3ehw | approved L1720; square drawn OK; has 'wide stiff lilac band' | OK, not changed (approved) |
| t5 Phi | s62_t5_THU_fix_L1723 | 4RFSkRs9Aa | 'wide stiff band' | fixed → s62_t5_THU_fix_L1776 (9303; gate only B26 as before) |
| t6 Quý phi | s62_t6_THU_fix2_L1726 | kseumhl16B | 'wide stiff band' + cloud collar no neck guard | fixed → s62_t6_THU_fix_L1776 (9997, PASS; caption shortened "Thu · Quý phi · cổ vuông" for length) |
| t7 HQP | s62_t7_THU_fix3_L1735 | not drawn | 'wide stiff band' + cloud-collar cape no neck guard | fixed → s62_t7_THU_fix4_L1776 (9629, PASS) = job (1) |
| t8 HH | s62_t8_THU_fix6_L1747 | (fix6) | OK | OK |
F19: no chrysanthemum in any latest file. Peonies only t7/t8. One-colour tone-on-tone: t7/t8 (only tiers ordered). A46 cabochon sentence: t6/t7/t8; t1–t5 have only jade/pearl, no faceted gems.
Edits (word-diff checked vs base): square collar → "a straight SQUARE collar (no crossed collar): a LOW open square neckline across the upper chest, neck and collarbones bare, NEVER a high stand collar or mandarin collar, framed by a wide flat band …" (t1 replaces "crossed-collar upper garment"; t2 inserted; t3 in its SQUARE NECKLINE form); "stiff" → "flat"; t6/t7 cloud collar + "never rising up the neck"; captions. keep --all 490 PASS. Builder fix_L1723/make_fix_L1776.py.

## JOB L1794 (owner on THU @135 sheet, via Foreman C #22) — 0 gens, keep --all 500 PASS
| tier | base (drawn) | new file | change | gate |
|---|---|---|---|---|
| t1 Đáp ứng | s62_t1_THU_fix_L1776 (Lw85wx5swO) | s62_t1_THU_fix_L1794 | skirt + ribbon band + bow tied at her natural WAIST (never high on the chest); lilac inner layer at the square neckline clearly visible above it | PASS |
| t6 Quý phi | s62_t6_THU_fix_L1776 (VX7zBuWMMU) | s62_t6_THU_fix_L1794 | cloud collar "SOFT silk … DRAPING softly over the shoulders, never stiff or flat"; jewellery sentence; length: inner repeat "image 2 is only a colour reference;" + caption boilerplate shortened | PASS (9984) |
| t7 HQP | s62_t7_THU_fix4_L1776 (WDgZpUBcXe) | s62_t7_THU_fix5_L1794 | cape "soft gold-and-jade … with a fringe of small silk-and-pearl tassels along its edge"; "strands of pearls swagged across the chest from the left collar edge to the right collar edge"; crown "(rubies, sapphires, pearls and jade)" → "more jade, pearls and gold"; jewellery sentence | FAIL only S14 (approved sentence names rubies/sapphires) → Foreman override |
| t8 HH | s62_t8_THU_fix6_L1747 (SyhrPfnUb8) | s62_t8_THU_fix7_L1794 | no red: "smooth cabochon rubies and pearls" → "pearls and jade"; "jewelled" → "set with jade" / "gold-filigree wings set with pearls and jade"; jewellery sentence | PASS |
Jewellery sentence (replaces the A46 cabochon one, t6–t8): "JEWELLERY: only jade, pearls and gold, Chinese court style; NO red stones, NO rubies or sapphires, NO faceted or cabochon gems, nothing European." Rule A46 updated (rule.py set).
t8 cloud-collar audit (fix2 → fix6, line by line): one collar sentence "a … gold-and-pearl cloud collar lying FLAT and close on the shoulders, with layered pearl fringes hanging straight down, open at the front, never rising up the neck, never hiding the square collar; NO cloak, NO cape, NO mantle: never a bell or flared cone shape at the neck and shoulders" — no contradiction; the fix3 words (SMALL collar / SLIM SILHOUETTE) are gone since fix5. CAPE ANSWER: YES — this is the version WITHOUT the cloak/mantle (removed since L1714 row 15, "NO cloak, NO cape, NO mantle" since fix_L1723); the only shoulder piece is the flat vân kiên. Triều phục files keep their cloak (not touched).
- S14 override (owner L1794, Foreman C #22 OK): check_store.py gets S14_L1794 (jade/pearl/gold HQP luxury) accepted in the S14 slot (like S13_COMOI). s62_t7_THU_fix5_L1794 now PASS. --self: same 2 old PROOF MISMATCH lines before/after. A46 text updated. Store builder build_all.py HQP_LUX not changed.
- store builder store-all/build_all.py HQP_LUX → L1794 jade/pearl/gold form (Foreman C #22 yes). keep --all 500 PASS, --self unchanged (2 old).

## JOB L1797 (owner, THU full sheet; via Foreman C #22) — 0 gens, keep --all 504 PASS
- t4 Tần: not touched.
- t5 Phi → s62_t5_THU_fix_L1797 (base t5 fix_L1776 = drawn DoOYmUHpcl): fringe "LONGER and fuller than the Tần's, with bigger pearls" → "a little longer than the Tần's, with SMALL pearls of about the Tần's size, never big or heavy"; chest strand "round-pearl" → "of small round pearls". Gate: only B26/M06 (your t4/t5 waiver).
  BELT: unchanged — "a broad gold brocade girdle with two long jade pendants hanging on silk cords" = the OLD Phi belt word for word (Set A rank8-s62/s62_t5, drawn xSBe8KVjfW 20/11; restored by L1714 row 18; the Phi the owner OK'd L1723 = L1719 BhNTNIvoQR had it). The later COMOI files had changed it to "an embroidered silk sash…" (DESIGN22 L1668) — that is the added one, not in use.
- t6 Quý phi → s62_t6_THU_fix_L1797 (base fix_L1794, 9994, PASS): "SOFT silk cloud collar (yunjian) DRAPING softly over the shoulders" → "SOFT silk cloud-collar cape (yunjian) DRAPING softly down over the shoulders". Reason: the HQP's drooping piece is named a "cloud-collar cape" (drawn WDgZpUBcXe file said only "jewelled cloud-collar cape", no 'soft'), so t6 now uses the same word + soft/draping (stronger than HQP's).
- t7 HQP fix5_L1794: tassels CONFIRMED — "with a fringe of small silk-and-pearl tassels along its edge" on the cape (+ pearl swag left→right collar edge).

## L1799 correction (owner via Foreman C #22): red gems MAY be on the CROWN of t7/t8, never on clothing
- t7 fix5_L1794 + t8 fix7_L1794 rewritten in place (not drawn yet): crown 'a few smooth red gems' (t7 'more jade, pearls, gold and a few smooth red gems on the phoenix crown'; t8 crown ', a few smooth red gems, pearls and jade,'); jewellery sentence t7/t8 'red gems ONLY on the crown, NEVER on the robe, cape, collar, belt or pendants; NO sapphires, NO faceted or sparkling gems, nothing European.' t6 keeps no red at all. Both PASS. Gate S14_L1794 + store HQP_LUX same words. A46 updated. keep --all 504 PASS, --self unchanged.
