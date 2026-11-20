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
