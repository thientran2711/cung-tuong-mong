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
