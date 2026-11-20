# DESIGN14 — Hán t7 HQP + t8 HH hem/khúc cư (owner L1506) — depth 2, START_CTX ~8 %
0 gens. Brief dev/handover/briefs/han-t78-L1506.md.

Files: dev/art/seasons4/s62_t7_HAN_BAC_open6.txt (+.keep), s62_t8_HAN_BAC_open6.txt (+.keep), base = _open5.
Note: _open5 already said "the same length as the Quý phi's, the hem ending at the floor, no trailing train" (L1428) and still gave long trains, so open6 uses the Quý phi t6 "floor-length" wording and adds an explicit no-pool/no-trail clause.

## Word diff (open5 → open6)
t7 HQP (1 change):
- "…to the floor, the same length as the Quý phi's, the hem ending at the floor, no trailing train," → "…to the floor, floor-length like the Quý phi's: hem just at the floor, NO train, nothing pooled or trailing,"

t8 HH (same length change +):
- "yet still light:" → "yet still light, never heavy:" (HQP)
- "thin, airy silk gauze … WOVEN in, soft close drape," → "light, thin, airy silk gauze … WOVEN in, soft drape close to the body," (HQP)
- "never covered by any other robe, with very wide sleeves and broad light clear warm plum borders edged with pearls along the wrap edge and hem;" → "never covered by any other robe, very wide sleeves, two broad light clear warm plum borders along the wrap edge edged with pearls;" (HQP wrap/border-band cut; HH colours kept: yellow quju, plum borders)
- trimmed boilerplate duplicate "eyes open, lips closed," in the item/face sentence (the full MOUTH FULLY CLOSED/eyes sentence stays) to fit 10 000.
Kept: HH royal yellow, DENSER woven gold, LARGEST motifs, shou, zupei, pearl strands, cloud collar, nine-phoenix crown, slim tall silhouette, face, pose, item, caption.

## Checks
- chars: t7 9986, t8 9993 (≤ 10 000)
- keep_check --sidecar: t7 PASS (3 allowed), t8 PASS (6 allow lines); --all 173 PASS
- check_store: same FAIL set as base _open5 (pre-existing B12 MASTER BROCADE / S07 FABRIC rewritten) — no new fails; foreman decides before any gen.

# Job 2 — owner L1515: "Copy toàn bộ trang phục của hqp qua cho hoàng hậu, khiên vân y chang luôn" — 0 gens
File: dev/art/seasons4/s62_t8_HAN_BAC_open7.txt (+.keep), base t8 _open6. 9704 chars: no trim needed, nothing trimmed.
Outfit sentence = t7 HQP _open6 outfit VERBATIM (layers, gauze/Tống cẩm fabric, khúc cư cut + floor-length/no-train hem, borders, cuffs, sleeves, belt, shou, zupei, pearl strands, cloud collar/vân kiên + fringe), with only these swaps:
- "Outfit (rank-7 imperial noble consort (Hoàng quý phi),):" → "Outfit (the Empress (Hoàng hậu),):"
- collar bands "FIVE … (light clear warm plum, bright blush pink and royal yellow)" → "SIX … (royal yellow, light clear warm plum and bright blush pink)" (HH rank count + colour order kept from open6)
- quju "light clear warm plum long-spiral quju" → "royal golden yellow long-spiral quju"
- "deep royal golden yellow cuffs, two broad royal golden yellow borders" → "deep light clear warm plum cuffs, two broad light clear warm plum borders"
- HQP crown clause replaced by HH's own nine-phoenix crown clause (from open6)
- caption "…Tống cẩm, thụ vàng + vân kiên ngọc trai" → "…Tống cẩm + vân kiên ngọc" (= HQP caption garments)
Kept from t8 open6 (not outfit words): "The Empress.", COLOUR RULE (yellow dominant), THREE-COLOUR rule, angle, pose/item, face, image-2 line. HQP LUXURY sentence NOT copied (HQP rank sentence).
Dropped HH outfit phrases (all in .keep allow): soft collars like HQP's, "EXACTLY TWO… never a third", "FABRIC the richest of all", "woven gold DENSER / yellow larger than HQP", "LARGEST motifs… far denser", "Empress's long shou… large jade rings", "two long zupei", "many long strands of pearls and jade", HH cloud collar "denser… more pearls", "LONGEST fringe", "slim tall silhouette".
OPEN QUESTION for C #11: verbatim copy brings HQP rank-ladder words into HH's outfit: "a near-empress Han ceremonial look", "one step richer than the Quý phi's brocade", "LARGER spring flowers", "LONGER pearl-and-gold drop fringe (longer than the Quý phi's tassels)". Left as is (owner said y chang); change if you want.
Checks: keep_check --sidecar PASS (19 allowed); --all 176 PASS; check_store same pre-existing FAIL set as base (B12, S07), no new fails.

# Audit L1520 — why HH t8 comes out bell-shaped + flowers only (0 gens, no prompt edits)
Owner (via C #11): HH is bell-shaped whatever she wears; not the original Empress prompt; the Empress must have phoenixes, this one has only flowers.
Method: STANDARD = `store-all/build_all.py s62 8` (scratch; equals seasons4/ladder_base/s62_t8.txt except one motif word: ladder has "peonies", the store now prints "incurved chrysanthemums"). Sentence-level drop tracker (dev/handover/reports/DESIGN14_audit/lin.py, output hh_t8_lineage_sentence_drops.txt) over the chain: standard → ladder_base → han_bac_base _02cd263 → _ed3e8fd → s62_t8_HAN_BAC → _a2128fc → gon → gon2 → gon3 → open → open3 → open4 → open5 → open6 → open7 (open2 is a side branch).

## A) BELL — causes
C #11's list is correct: in the Hán set, the only non-garment differences between t7 and t8 are angle, pose, colour dominance and the crown (plus the HQP LUXURY sentence, which only t7 has). Why these make a bell:
1. **POSE + SLEEVE LAW together (main cause).** t8 pose: "a gold lidded jewel casket … raised and admired, the other hand beneath it … the robe falling still and straight". Both hands are at chest height. Both t7 and t8 also have the sentence "Even while her hands are raised to hold her item at chest height, each wide sleeve still hangs straight down from her forearm and its hem lies on the floor beside her feet" plus "very wide sleeves … touch the floor". With BOTH forearms up in front of the chest, two very wide floor-length sleeves drop from chest height on each side → a triangle/bell from chest to floor. HQP's item is held LOW at her side while walking, so her sleeve falls along her body and her outline stays slim.
2. **ANGLE.** t8: "SLIGHT turn … about 15 degrees … body almost frontal". t7: "clear THREE-QUARTER … about 45 degrees". In a frontal view, both hanging sleeves frame the body symmetrically, so the widest outline shows. In 3/4 view, one sleeve sits behind the body.
3. **STILL HEM.** "the robe falling still and straight" (t8) vs "the robe hem swaying gently with her step" (t7). This gives a static, symmetric cone.
4. **Colour dominance.** "the royal golden yellow is the DOMINANT colour of the quju, sleeves and skirt (more than half of everything visible)". This is a minor cause: one big yellow mass reads as one solid shape. It is rule I1 (HH = almost all imperial yellow), so it stays.
5. **Shared across EVERY HH prompt:** these four come from the STANDARD t8 store text (pose + 15° angle + still hem + yellow DOMINANT), so they appear in all sets: the standard store prompt, Hán, thu_comoi v8 (FULLY FRONTAL, same "raised and admired … falling still and straight"). Đông _cloak7 already had to fight it. It changed to a 3/4 RIGHT angle and the hairpin "held close at her waist in both hands, sleeves falling close … the hem swaying softly", and added "a slim cloak hanging close, never bell-wide". That is proof the bell is a t8-store problem, not a Hán-garment problem. "stately grace" + "slim tall silhouette" are not enough to beat it.
Nothing else differs: sleeve law, fabric sentences, embroidery sentences and legs/feet are word-identical t7/t8.

## B) LINEAGE — what the standard HH lost, and where
| step (worker) | dropped / weakened | effect |
|---|---|---|
| ladder_base → **_02cd263 (DESIGN2, L1259–1265)** | **"The phoenix is the main embroidered motif, larger and more prominent than the flowers."** (deliberately removed: make_han_bac.py doc "F6: phoenix only on the crown … dropped at t8") | **PHOENIX LOST HERE.** F6 is about headdresses only; rule **I3** says "t7/t8 robes carry a clear stitched embroidered phoenix (main motif)" and **I1** "HH = almost all imperial yellow + phoenix". DESIGN2 misread F6. |
| same step | outfit "the Empress's **imperial phoenix ceremonial robe** … embroidered … with **large phoenixes**, peonies and clouds … (far denser than any other rank) … long silk mantle … broad band of gold brocade and pearls … layered pearl fringes … jade pendants" → Hán design words | phoenix leaves the outfit sentence too; only S04 "All flowers, birds and the phoenix are … embroidery" stayed (gate sentence, now with no phoenix for it to refer to) |
| _02cd263 → _ed3e8fd (DESIGN4) | "no cape, no cloud collar…", "GRACE: her chin lifted just a little, her neck long and elegant", "face clearly visible, 3/4 or frontal view", "never copy anything but its colour" | grace/neck line gone |
| _ed3e8fd → s62_t8_HAN_BAC (DESIGN5) | "elegant, slim, clearly adult", "beautiful/handsome romantic-lead looks for everyone", "a kind, caring, gentle-hearted girl", "Everyone beautiful at every age", "gold only as thin accents on the borders", header "clearly much richer and more splendid than the lower ranks" | **"slim" + rank-superiority header lost**; FIVE-layer heavy brocade added (later cut) |
| a2128fc → gon (DESIGN6) | store FABRIC prompt-B sentence → "light gold-woven gauze over thin supple Song brocade" | = the pre-existing B12/S07 gate FAIL in every later file |
| gon → gon2 → gon3 → open … open5 | collar / neckline / cloud-collar wording rewritten many times (owner-asked); "An imperial consort" → "The Empress."; swallowtail guiyi layer cut (open4); hairpin-direction, luminous skin, forehead sentences trimmed for length (open5) | open5 trims = boilerplate, hairpin sentence shortened to the "points upward or backward" form |
| open6 → **open7 (me, L1515)** | "LARGEST motifs of all ranks: big peonies, peach blossoms and clouds … (far denser than any other rank)", "woven gold DENSER, royal yellow larger than HQP's", "Empress's … shou with large jade rings", "two long zupei", "many long strands of pearls and jade", "LONGEST fringe", "slim tall silhouette" → HQP words (owner "y chang") | **rank signs now HQP-level**: motif = "many LARGER spring flowers" → all-over flowers, no phoenix (= the owner's picture) |
Hán colours (ice blue #71B5D7/mint mist → plum #DF9ED9/blush pink) were swapped on purpose at DESIGN2 (HAN_A/HAN_B). Not a drop.

## Fix proposal _open8 (from open7; needs C #11/owner yes)
1. **Phoenix back (I3/I1):** restore the standard sentence verbatim: "The phoenix is the main embroidered motif, larger and more prominent than the flowers." In the outfit, change "with many LARGER spring flowers spread over the whole garment" → "with large phoenixes, peonies and clouds in gold and kingfisher-blue silk thread (far denser than any other rank)" (standard words). Note: I3 also covers t7, and HQP open6 has no robe phoenix either. Ask whether HQP needs it too.
2. **Bell fix (copy what works in t7/đông, keep HH's own item):** pose → "weight on one leg, a gold lidded jewel casket with a phoenix and pearls held low at her side in one hand, with stately grace, the robe hem swaying gently" (t7 structure). ANGLE → t7's clear THREE-QUARTER sentence. Add the đông guard "slim and close to the body, never bell-wide, never flared". (Pose/angle are per-rank store slots, so this needs the owner's yes.)
3. **Empress signs back:** header "(the Empress (Hoàng hậu), clearly much richer and more splendid than the lower ranks)"; "slim tall silhouette"; "the Empress's long royal golden yellow silk shou hung with large jade rings"; "many long strands of pearls and jade"; replace the HQP ladder words in the HH outfit ("near-empress", "one step richer than the Quý phi's", "LONGER … than the Quý phi's") with the HH words ("the Empress's Han-dynasty grand ceremonial dress", "the richest of all", "the LONGEST fringe of all ranks"). Shape/cut/vân kiên stay = HQP (owner L1515).
4. Same bell guard (2) is worth applying to every HH t8 set that still has the store pose (thu_comoi v8 FULLY FRONTAL), only on the owner's word.

# Job 4 — owner L1529: copy what the ORIGINAL/rules say (phoenix + Empress rank words) — 0 gens
Files: dev/art/seasons4/s62_t8_HAN_BAC_open8.txt (+.keep, base = _open7 as edited by C #11 a99b9c1) and s62_t7_HAN_BAC_open7.txt (+.keep, base = _open6). Angle / pose / colour NOT touched (owner).
## t8 HH open8 (9983 chars) — changes (phrase → phrase)
- header "Outfit (the Empress (Hoàng hậu),):" → "Outfit (the Empress (Hoàng hậu), clearly much richer and more splendid than the lower ranks):" (store)
- "an empress Han ceremonial look in TWO visible robe layers like the Phi's, one step richer than the Quý phi's brocade, yet still light," → "the Empress's imperial phoenix ceremonial robe, a Han-dynasty grand ceremonial dress in TWO visible robe layers like the Phi's, FABRIC the richest of all, yet still light," (store "imperial phoenix ceremonial robe" + HH open6 words)
- "+ its woven gold DENSER and its royal yellow larger than the Hoàng quý phi's" after "never stiff, thick or puffed" (HH open6)
- "the robe body densely embroidered ALL OVER (not only the borders) with many LARGER spring flowers spread over the whole garment, clearly more embroidery than any palace maid in gold thread;" → "the robe body and quju densely embroidered ALL OVER with the LARGEST motifs of all ranks: large phoenixes, incurved chrysanthemums and clouds in gold and kingfisher-blue silk thread (far denser than any other rank);" (store t8 motif words as the store prints them today; ladder_base had "peonies")
- shou → "the Empress's long royal golden yellow silk shou hung with large jade rings falling to the hem, a jade-and-gold belt and two long zupei;" (HH open6)
- fringe "its LONGER … (longer than the Quý phi's tassels)" → "the LONGEST pearl-and-gold drop fringe of all ranks" (HH open6)
- "with strands of pearls" → "with many long strands of pearls and jade" (HH open6)
- "+ slim tall silhouette;" before the crown (store)
- + store sentence "The phoenix is the main embroidered motif, larger and more prominent than the flowers." (before S04 "All flowers, birds and the phoenix…")
- + store sentence "GRACE (pose variety, every rank its own): her chin lifted just a little, her neck long and elegant." (after ANGLE, its store place)
- + store words "; elegant, slim, clearly adult" at the end of the "gentle expression…" sentence
- TRIMS (boilerplate duplicates, to fit 10 000): ", lips closed, no teeth, mouth never open" (dup of MOUTH FULLY CLOSED sentence); "and the hand really grips it" (dup of "EXACTLY ONE held item, the hand really gripping it"); "the whole face fully visible with" + "nothing covering the face" (dup of "The whole face clearly visible"); "; the royal yellow in the robe is exactly that colour" (dup of the yellow hex rule, = t7's shorter image-2 line); "clearly more embroidery than any palace maid" (covered by "far denser than any other rank").
- Cut / shape / layers / fabric / borders / cuffs / hem / vân kiên shape = HQP open6 unchanged.
## t7 HQP open7 (9941 chars)
- "densely embroidered ALL OVER (not only the borders) with many LARGER spring flowers" → "… with phoenixes, incurved chrysanthemums and auspicious clouds in gold thread on the chest and along the borders, and many LARGER spring flowers" (store t7 outfit words verbatim; store t7 has no separate "main motif" sentence, so none added)
- TRIMS: ", lips closed, no teeth, mouth never open" (dup); item sentence "and the hand really grips it", "the whole face fully visible with", "eyes open, lips closed,", "nothing covering the face" (dups).
## Checks
keep_check --sidecar PASS both (t7 5 allowed, t8 16); --all 183 PASS; check_store = same pre-existing FAIL set as base (B12, S07), no new fails.

# Job 5 — owner L1536 (via C #12): HQP phoenix by the rule + one flower per person — 0 gens
## Chrysanthemum answer (plain)
- "incurved chrysanthemum" is NOT shared by everyone. It is s62's OWN flower: rule F2 (Lượt 1352) gives each person one species, `F2_FL[rank][(n-1)%5]` in t8-prompt-B/build.py (n = number in her id). For s62, (62-1)%5 = 1 → t6 list item 2 = incurved chrysanthemum (cúc đại đóa). t7/t8 reuse her t6 species, as embroidery only.
- The store builder (`flower_outfit`) swaps EVERY flower word in the outfit to her species. That is why the store's "large phoenixes, peonies and clouds" prints as "incurved chrysanthemums" for her.
- The two-flowers problem came from hand-made Hán words, not the store: HQP had "incurved chrysanthemums" (store) + "many LARGER spring flowers" (Hán) one after another, and both HQP and HH had "small peonies" on the collar bands. Per F2 (one flower per person, her own): all now = incurved chrysanthemums, said once in the robe-body motif.
## Phoenix rule used (rule.py find I1, I3; A28 = crown only; G33 = plumage palette, HOLD / not in builder → untouched)
I3: t7/t8 robes carry a stitched phoenix, flowers allowed with it. I1: HH phoenix = the most dazzling; HQP "phoenix allowed", and "nobody's yellow or phoenix ever outshines the ranks above". So HQP phoenixes are smaller than HH's.
## t7 HQP _open8 (from _open7, 9985 chars)
- "in gold with small peonies and" → "in gold with small incurved chrysanthemums and" (F2)
- "with phoenixes, incurved chrysanthemums and auspicious clouds in gold thread on the chest and along the borders, and many LARGER spring flowers spread over the whole garment" → "with phoenixes in gold thread on the chest and along the borders, SMALLER than the Empress's, never as large, and many LARGER incurved chrysanthemums and auspicious clouds spread over the whole garment" (I1 + F2; store t7 words kept)
## t8 HH _open10 (from C #12's _open9 = open8 + "slim, hanging close, never bell-wide", 9972 chars)
- "in gold with small peonies and" → "in gold with small incurved chrysanthemums and" (F2). Body motif stays "large phoenixes, incurved chrysanthemums and clouds" (store, = her one flower).
- TRIM (open9 was 10 031 > 10 000, gate LEN FAIL): sentence "Floor-length robe, only slipper toe tips peeking under the hem, no train." removed. It repeats the outfit hem words "floor-length … hem just at the floor, NO train". (I tried trimming the "The silk has real weight" sentence instead; that is a gate master sentence (M07), so it stays.)
## Checks
keep_check --sidecar PASS both (t7 3, t8 2 allowed); --all 189 PASS; check_store = only the pre-existing B12/S07 FAILs (LEN now OK).

# Job 6 — owner L1543 rule G37: vân kiên ONE tier for everyone, HH moderately firm — 0 gens
Scope found (grep "tier" in thu_comoi + dong_hientai): only the HH t8 files say two tiers. The current t7 cloak7 files (m02, s62) already say "ONE small single-tier SOFT" → no change. Older superseded versions (thu v4–v8, cloak–cloak6) and one-off gen tests (_FRONTAL_test, _LUAMONG_test, already drawn) are NOT re-versioned. s62_t8 cloak7 is DESIGN16's file, so I sent DESIGN16 the words instead. owner-copy/trieu not touched.
## thu_comoi m02_t8 v5→v6 (9981), m28_t8 v5→v6 (9979), s62_t8 v9→v10 (9912) — same 4 swaps each
- "a jewelled cloud collar of two tiers of scalloped" → "a jewelled cloud collar of ONE tier of scalloped"
- "over the shoulders (upper tier smaller), edged" → "over the shoulders, edged"
- "light and flat," → "light and flat, moderately firm, never too stiff," (HH stiffness, G37)
- "drops hanging straight down from both lobe tiers" → "… from the lobes"
## dong_hientai m02_t8 cloak7→cloak8 (9923)
- "a SOFT jewelled cloud collar of supple silk in two small tiers of softly scalloped cloud-shaped lobes (upper tier smaller)," → "a moderately firm (never too stiff) jewelled cloud collar of supple silk in ONE small tier of softly scalloped cloud-shaped lobes,"
## For DESIGN16 (s62_t8 cloak7 → cloak9): the same swap as m02 cloak8 above (its text is identical there).
## Checks: keep_check --sidecar PASS ×4, --all 199 PASS; check_store FAIL set identical to each base (no new fails).
## Q (L1541 lost look): in s62_t8_HAN_BAC_open9 AND open10 the HQP words are present exactly once, byte-identical to HQP t7 open6/open8: the OPEN-NECK opener, "collar is worn OPEN, pulled wide OFF the neck … cross only LOW at the sash", "sewn flat along the wide V out to the shoulders", the whole "long-spiral quju (khúc cư), its front panel wound SEVERAL times in a long spiral … never covered by any other robe" clause, and "two broad … borders along the wrap edge edged with pearls". So the prompt has them; the loss is in the draw (model), not in the prompt.
