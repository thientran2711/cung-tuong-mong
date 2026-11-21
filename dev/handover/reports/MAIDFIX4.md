# MAIDFIX4 — owner L1919 jobs (items / m11 face / captions)
depth 8 (limit 8) · START_CTX ≈ 4 % (est.; get_session reads 0) · roll line 29 %, ceiling 60 %

## 1. Held items (owner L1919) — DONE, 0 gens
- Picker `dev/art/maid_items.py` (builder AGE5 lists via item_age.py; rank → tier/age per MAIDFIX3 plan: thô sử tm0 a18 · tam tm1 a18 · tam thân cận tm1 a26 · nhị tm2 a18 · nhị thân cận tm2 a26 · nhất tm3 a18 · nhất thân cận tm4 a18 · chưởng sự tm3 a26 · ma ma mama a51; pick from (n-1)%5, then the tier's other ages). Kind tags = build.py _E6_KINDS + maid extras (medicine, sewing, keys, cloth, tray, light, record, plant, abacus); a clash = any shared tag. Skipped: broom (chưởng sự "never holds a broom"), herb bag (= sachet, G59), cane. Big items (lantern on pole, umbrella, fabric roll, brocade board, food carrier, robe, mending/chrysanthemum basket) only at thô sử / tam / ma ma (their L1905 hands carry at the side / in both hands).
- Files `dev/art/maid7/prod/<pid>_<rank>_L1919.txt` (+ .keep) = 6 persons (m09 m10 m11 m12 m13 m18) × 9 ranks = **54**; supersede L1905. Builder `dev/art/maid7/make12_items.py`; table `prod/ITEM_TABLE_L1919.tsv`. Base = L1905 (per-rank poses, G61 hands clear of front waist, G57/G59/G60 kept). Diff = ONLY the "she holds … in a contrasting colour" phrase (+ m11 face line, §2) + A38 trim on files over 9 995 (hands-interact boilerplate shortened / duplicate FABRIC line; crepe sentence stays in the master block). Typo "a her mistress's comb box" gone (comb box now written "her mistress's comb box").
- Note: the old signature items (chưởng sự keys, ma ma abacus, nhất handkerchief) now appear only where the builder picks them (m10 ma ma = abacus). Owner asked for different items, so this is intended; say if chưởng sự must keep keys.
- GATE (new): `python3 dev/art/check_store.py --maid-items dev/art/maid7/prod L1919` → MAID ITEMS PASS (54 files). On L1905 it FAILs with 63 repeats (proof it catches them). Rule **E13** added (rule.py add --force; overlaps E6 which only covered consorts).
- keep_check --sidecar PASS ×54; check_store PASS ×54 (maid a18; chưởng sự maid a26; ma ma mama a51). Max length 9 996.

| pid | thô sử | tam | tam TC | nhị | nhị TC | nhất | nhất TC | chưởng sự | ma ma 51 |
|---|---|---|---|---|---|---|---|---|---|
| m09 | fan | flower basket | medicine packets | towel tray | embroidery patterns | ribbons | letter | incense box | prayer beads |
| m10 | hairpin box | ribbons | candles | sewing basket | fresh flowers | medicine packets | hand mirror | feather duster | abacus |
| m11 | letter | lantern | incense box | fan | potted flower | feather duster | sewing basket | medicine packets | storeroom seal |
| m12 | sewing basket | hand mirror | pastry tray | hairpin box | letter | bamboo-slip list | fan | ribbons | hand warmer |
| m13 | fabric roll | comb box | flower basket | letter | fan | embroidery hoop | candles | measuring ruler | account book |
| m18 | potted flower | pastry tray | comb box | embroidery patterns | hand bell | measuring ruler | feather duster | bamboo-slip list | ribbons |

## 2. m11 face — files ready, REF PENDING
- m11_*_L1919: "small ROUND baby face … tiny chin, very LARGE round eyes … button nose, tiny rosebud mouth" → "a soft rounded oval face with gently full cheeks and a softly rounded chin, large bright almond eyes in adult proportion, softly arched brows, a small straight nose, a small rosebud mouth; an adult young woman of about 20, adult face and body proportions, never a baby face, never chibi, never a big head on a small body" (chưởng sự: about 28; ma ma: "a real 51-year-old woman with a mature adult face, …"). Expression line kept.
- REF = placeholder `prod/m11_REF_L1919.txt`: wait for #26 to give the owner's FACEPAGE1 pick; NEVER Syh9qs6Ub8. If the chosen face has store face words, swap only the "Her face:" sentence, re-run gates.
- Baby/chibi scan of every maid person in prod (m09 m10 m12 m13 m18): clean (only "never a tiny head" master guard). Store (KC_REFS) persons with child-leaning words, if any becomes a maid: m11 (worst), m34 ("soft baby cheeks", tiny, button nose), m16 (tiny chin, button nose), m50 (tiny, button nose), m14 / m27 ("very large" eyes), m47 (tiny), m07 / m38 / m39 (button nose only).

## 3. Captions — face GROUP only
`prod/CAPTION_LABELS_L1919.tsv` (from FACE_MAP_L703): m09 Sắc sảo · m10 Đoan trang · m11 Tươi tắn (new face pending) · m12 Tinh nghịch · m13 **no group (Kho)** → foreman to name · m18 Dịu dàng. Never face-shape words (oval/round/V…) in captions.

## Enforced now
E13 + `check_store --maid-items` (items differ per rank inside a person, thân cận ≠ grade, no same item at same rank across persons); keep_check + check_store per file; poses/G61/G57/G59/G60 carried from L1905.

## OWNER L1924 / L1925 (via #26)
- **L1925 m11 DROPPED**: m11_*_L1919 files + m11_REF removed; make12_items.py keeps m11 in the PICK ORDER only (other persons' items unchanged, verified 0 file changes) → L1919 = 5 persons × 9 = 45 files; --maid-items PASS.
- **Colour codes**: uniform blue = ONE code everywhere: "powder blue like #A7BAD2" (162 hits, the only blue hex in prod, same in m12 as in m09/m10/m13/m18). Own colours also one hex each (m09 #D5909C, m10 #ABCDA2, m12 #DEBF9C, m13 #C3A1CE, m18 #CA7281), ma ma jade #4E8FA3. So m12's lighter-looking blue is NOT from the prompt (same words + hex) → model variance / next to the light sand colour. Gaps: chưởng sự **tím cà has NO hex** (words only, identical in all files) — needs a code picked; m10's season file now lists soft leaf green #A4D098 (maid prompts use sage #ABCDA2) and m18's season file soft blue #8FBCF1 (her consort main, not the maid uniform) — foreman to say if maids follow those.
- **Tam vs nhị same (cause)**: tam = "a SMALL SHORT outer top … ends just below the waist"; nhị = "a layered half-sleeve … jacket (bijia)" with NO length word → model drew the same short top in the same two colours. Fix files `<pid>_nhi[_thancan]_L1924.txt` (m09 m10 m12 m13 m18; script make13_nhi.py): the bijia's front and back tà hang to MID-THIGH, clearly longer than tam (waist), shorter than nhất (tà just past the knee). Pure addition (keep 0 drops); keep PASS, check_store PASS ×10, --maid-items L1924 PASS. NOT drawable until the owner OKs one sample @55 (A49): VE11 asked to draw m18_nhi_L1924 once.
- **Captions** `prod/CAPTION_LABELS_L1924.tsv` (replaces L1919 labels): "m09 · Xuân · xanh dương phấn + hồng phấn · sắc sảo", "m10 · Xuân · xanh dương phấn + xanh lá dịu · đoan trang", "m12 · Thu · xanh dương phấn + vàng cát · tinh nghịch" (FACE_MAP says Tinh nghịch; #26 example said đoan trang — confirm), "m13 · Hạ · xanh dương phấn + tím hoa cà · (no group)", "m18 · Đông · xanh dương phấn + hồng đậm · dịu dàng"; chưởng sự = tím cà + own, ma ma = ngọc bích + own.
- #26 decisions: tím cà = "soft eggplant purple like #8E6C98" → inserted (2 places) in all 5 m*_chuongsu_L1919 files in place (+ allow line for the split phrase; keep/store PASS; make12 does it too). Maids keep their maid colours (no season changes). m12 = Tinh nghịch; m13 = Tươi tắn (FACEPAGE1 card) → CAPTION_LABELS_L1924 updated. m18 = 7 files OK.
