#!/usr/bin/env python3
"""J5 WARDROBE (IT02): paste-ready ChatGPT prompts for the per-tier HAIRPIN sets img/wd512/wd-<tier>-t-NN.webp (13 tiers x 10).
Data read from code: tier keys from dev/build/jinv.js KEQ_TIER + maid m0..m4 (jinv.js:333), rank names from dev/build/j1.js RANKS, existing keys from assets.json.
Outfit sets wd-<tier>-y-01..10 already exist in assets.json (skipped, listed in INDEX). Rank richness words = store ladder words (t8-prompt-B/build.py TIER_LOW / t4-t8 / TM, handover worktree), referenced by rank, none invented.
Run from anywhere: python3 gen_J5.py"""
import sys, os, re, json
MYDIR = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(MYDIR, ".."))
from _lib import *
HERE = MYDIR
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
jinv = open(os.path.join(ROOT, "dev/build/jinv.js"), encoding="utf-8").read()
KEQ = re.search(r'const KEQ_TIER=\[([^\]]*)\]', jinv).group(1).replace('"', "").split(",")          # jinv.js:331
j1 = open(os.path.join(ROOT, "dev/build/j1.js"), encoding="utf-8").read()
RN = re.findall(r'\{n:"([^"]+)",s:\d+,d:\d+\}', j1)[:8]                                                 # j1.js:6-8 rank names
assert len(KEQ) == 8 and len(RN) == 8
HAVE = {f[0] for f in json.load(open(os.path.join(ROOT, "assets.json")))["files"]}
TIERS = [(KEQ[i], "t%d" % (i + 1), RN[i]) for i in range(8)] + [("m%d" % i, "m%d" % i, n) for i, n in
        enumerate(["Cung nữ thô sử", "Cung nữ tam đẳng", "Cung nữ nhị đẳng", "Chưởng sự cô cô", "Nữ quan"])]
# rank ladder sentences = store words (build.py TIER_LOW[1..3], c06-t4..t6 hair clauses, t7 crown, TM maid outfits); referenced by rank
LADDER = {
 "dapung": "Rank t1 Đáp ứng (the lowest consort rank, elegant, never poor): pretty silver hairpins and a fresh flower, little gold.",
 "thuongtai": "Rank t2 Thường tại (a little more ornate than t1): silver and pearl hairpins and a fresh flower, little gold.",
 "quynhan": "Rank t3 Quý nhân (richer than t1 and t2): two or three slim pearl hairpins set INTO the gathered hair at natural angles, mostly hidden in the hair, each with a small dangling pearl ornament, never a radiating crown of straight pins or spikes; a little gold thread only.",
 "tan": "Rank t4 Tần (clearly richer than t3): gold and jade hairpins and small dangling gold bu yao tassel hairpins on an elegant high chignon.",
 "phi": "Rank t5 Phi (clearly richer than t4): a LARGER gold headdress piece with dangling gold tassels and jade pins on a high ornate chignon.",
 "quyphi": "Rank t6 Quý phi (clearly richer than t5): a BIG ornate gold headdress piece with pearls, gold flowers and many gold tassels, NOT a pile of jewels, still clearly less grand than t7.",
 "hqp": "Rank t7 Hoàng quý phi (near-empress): a LARGE ornate gold phoenix piece (one large gold phoenix with spreading wings) with pearl strands, kingfisher-blue inlay and a few gold tassels, grander than t6 but clearly simpler than the Empress's nine-phoenix crown.",
 "hh": "Rank t8 Hoàng hậu (the Empress, the grandest of all): a nine-phoenix crown element, gold phoenixes with spread wings, pearl strands, kingfisher-blue inlay, rubies and pearls, grander than every lower rank.",
 "m0": "Maid rank tm0 Cung nữ thô sử (lowest palace maid, clean and neat, never ragged): plain, NO jewels, NO flowers: a simple wooden pin or a cloth tie.",
 "m1": "Maid rank tm1 Cung nữ tam đẳng: one or two elegant silver hairpins with small pearls, NO flowers in the hair.",
 "m2": "Maid rank tm2 Cung nữ nhị đẳng (clearly finer than tm1): several silver and pearl hairpins, NO flowers in the hair.",
 "m3": "Maid rank tm3 Chưởng sự cô cô (dignified, authority): one gold hairpin and a small gold comb, calm and restrained, NO flowers in the hair.",
 "m4": "Maid rank tm4 Nữ quan (court lady official, the most refined of palace servants, much less gold than any consort): a small gold ornament pin and a jade pin, dignified, NO flowers in the hair.",
}
# F2/F19 hair-bloom species per consort rank t1..t6 (bloom only, no leaves, no chrysanthemum, F19(4) t6 list); t7/t8 wear no hair flower (F2)
FL = {"dapung": ["osmanthus cluster", "lilac flower", "pear blossom", "single-petal peach blossom", "plum blossom"],
 "thuongtai": ["cymbidium orchid", "tiger lily", "narcissus", "lily magnolia", "pomegranate blossom"],
 "quynhan": ["michelia flower", "semi-double China rose", "double azalea", "semi-double rose of Sharon", "wintersweet flower"],
 "tan": ["epiphyllum flower", "lotus blossom", "double peach blossom", "double kerria flower", "double daylily"],
 "phi": ["formal double camellia", "double hollyhock", "tea-scented China rose", "double cotton-rose hibiscus", "peony-flowered Chinese aster"],
 "quyphi": ["hundred-petal centifolia rose", "formal thousand-petal camellia", "thousand-petal lotus", "mophead hydrangea", "double crabapple blossom"]}
SOFT = ["soft jade green", "kingfisher blue", "rose pink", "peach coral", "ivory white", "pale lilac", "honey gold", "sky blue", "warm apricot", "pale pearl-grey ivory"]
COMP = ["laid diagonally across the canvas from lower left to upper right, seen from slightly above",
 "standing upright with the ornament head at the top and the pin pointing up, seen straight on, perfectly vertical",
 "laid nearly horizontal with the ornament head on the right, seen from a low three-quarter angle",
 "a matched PAIR crossed in a loose X, seen from above",
 "tilted about thirty degrees with the head at the top left, seen straight on",
 "a matched pair side by side, parallel, slightly staggered in height, seen from the front",
 "laid on a slight curve across the lower half, the ornament head large near the centre, seen from above",
 "a set of three of graduated lengths fanned from one point at the bottom, seen from the front",
 "floating upright and slightly turned so the ornament head shows in three-quarter view, shadow-free",
 "laid horizontally with the head on the left, ornament head in sharp close-up, seen from slightly above"]
def dang(t, i):
    if t in ("m0",): return ["", "", "", "", "", "", "", "", "", ""][i]
    return None
# ---- per-tier 10 pin forms (shape + material), indexed i; scaled in size/richness by LADDER ----
FORMS = {
 "dapung": ["a slim straight silver pin with a small enamel bloom head", "a slim silver U-shaped hairpin with a tiny bloom at the bend", "a short silver pin whose bloom head sits on a bent stem", "a slim silver pin with one short pearl dangle under a small bloom", "a flat silver pin with a leaf-less bloom head and one fine silver chain", "a small silver comb-pin of three short teeth topped by one bloom", "a slim silver pin with a twisted wire neck and a tiny bloom", "a silver pin with a small round bead beside its bloom head", "a slim silver pin with a bloom head and a short silk tassel in a soft colour", "a silver pin with a gentle S-curved neck carrying one bloom"],
 "thuongtai": ["a silver pin with a pearl set beside a small bloom head", "a silver and pearl U-shaped hairpin with a bloom at the bend", "a silver pin with two small pearl dangles under its bloom head", "a silver pin whose neck is wound with fine silver wire, a pearl and a bloom at the top", "a flat silver pin with a pierced bloom head and a single pearl drop", "a short silver comb-pin of four teeth topped by a bloom and two tiny pearls", "a silver pin with a pearl row along the neck and a bloom head", "a silver pin with a bloom head and two short fine chains each ending in a pearl", "a slim silver pin with a bloom, a pearl and a soft silk tassel", "a silver pin with an S-curved neck, one bloom and one pearl drop"],
 "quynhan": ["a slim pearl hairpin with one small dangling pearl ornament and a small silk bloom", "a slim U-shaped pearl hairpin with a bloom at the bend and one tiny pearl dangle", "a slim pearl pin whose bloom head hangs two small pearl strands of unequal length", "a pair of slim pearl pins of different lengths with a small dangling pearl each, a bloom at one", "a slim pearl pin with a pierced silver bloom head and a thread of gold only at the border", "a short pearl comb-pin with a bloom head and a small dangling pearl", "a slim pearl pin with three tiny pearls along the neck and a bloom head", "a slim pearl pin with a bloom, one pearl drop and a thread of gold", "a slim pearl pin with a bloom and a soft silk tassel", "a slim pearl pin with a gently bent neck, one bloom and one dangling pearl"],
 "tan": ["a gold-and-jade hairpin with a jade bead and a bloom head", "a gold U-shaped hairpin with a bloom at the bend and a small gold bu yao tassel", "a small dangling gold bu yao tassel hairpin whose bloom head hangs three short gold chains", "a gold pin with a carved bloom head and one longer gold bu yao dangle", "a gold hairpin with a leaf-less bloom and a pearl pair", "a gold comb-pin with five teeth topped by a bloom with gold beads", "a gold-and-jade pin with jade beads along the neck and a bloom head", "a gold bu yao pin with a bloom and two chains ending in jade drops", "a gold pin with a bloom, a jade bead and a short gold tassel", "a gold pin with a gently S-curved neck carrying a bloom and one gold dangle"],
 "phi": ["a larger gold headdress piece with a big bloom head and dangling gold tassels and a jade pin", "a larger gold U-shaped headdress pin with a bloom at the bend and three long gold tassels", "a larger gold pin whose bloom head hangs gold tassels of different lengths over a jade bead", "a larger gold pin with a carved bloom head and a fan of short gold tassels", "a larger gold headdress piece with a bloom, two jade pins and a pearl pair", "a larger gold comb with six teeth topped by a bloom and gold tassels", "a larger gold-and-jade pin with jade beads, a bloom and one long tassel", "a larger gold bu yao pin with a bloom and two chains of jade drops", "a larger gold pin with a bloom, a jade bead and a rich gold tassel", "a larger gold pin with an S-curved neck, a bloom, jade and gold dangles"],
 "quyphi": ["a BIG ornate gold headdress piece with a large bloom head, pearls and many gold tassels", "a BIG ornate gold U-shaped headdress pin with gold blooms along it and long pearl-and-gold tassels", "a BIG ornate gold pin whose large bloom head hangs a curtain of gold tassels with pearls", "a BIG ornate gold pin set with a large carved bloom, gold flowers and pearls", "a BIG ornate gold headdress piece with a large bloom, two gold pins and a pearl strand", "a BIG ornate gold comb with seven teeth topped by gold blooms, pearls and tassels", "a BIG ornate gold pin with pearl rows along the neck, a large bloom and many tassels", "a BIG ornate gold bu yao pin with a large bloom and three chains ending in pearls", "a BIG ornate gold pin with a large bloom, gold flowers and a heavy gold tassel", "a BIG ornate gold pin with an S-curved neck, a large bloom, pearls and gold dangles"],
}
HQP = ["a large gold phoenix pin, wings spread wide, a pearl string in its beak", "a pair of gold phoenix pins facing outward with kingfisher-blue inlay on the wings", "a gold phoenix comb with a row of pearls along the crest and a few gold tassels", "a gold phoenix bu yao with long straight gold-and-pearl bead dangles from both sides", "a gold phoenix crown-band section set with small gold blossoms and a single red ruby at its centre", "a gold phoenix hairpin with a kingfisher-blue inlaid tail of feathered wings and three pearl drops", "a gold phoenix headdress piece with sprays of small pearl-and-gold blossom sprigs fanning to both sides", "a gold phoenix with a wide feathered wing spread horizontally above a short jewelled band", "a gold phoenix pin with kingfisher-blue inlay, rubies and a few clean pearl tassels at the sides", "a gold phoenix pin with a long pearl strand and gold leaf-less blossom sprigs, a red gem at the centre"]
HH = ["a nine-phoenix crown's central gold phoenix, wings fully spread, a long pearl string from its beak", "a pair of grand gold phoenix pins with kingfisher-blue inlay, rubies and pearl drops", "a crown-side gold phoenix wing section with rows of pearls and kingfisher-blue inlay", "a gold phoenix bu yao of great length, pearl-and-gold bead strands hanging both sides", "a crown-band section of gold phoenixes in a row set with rubies and pearls", "a gold phoenix hairpin with kingfisher-blue feathered wings and long pearl dangles", "a grand gold phoenix headdress piece with sprays of pearl-and-gold blossom sprigs to both sides", "a pair of gold phoenixes facing each other above a jewelled band, rubies at the centre", "a gold phoenix pin with a heavy cluster of pearl tassels and kingfisher-blue inlay", "a tall gold phoenix with a ruby crest and long pearl strands over a gold cloud base"]
MAID = {
 "m0": ["a plain carved wooden pin, honey-brown, one smooth rounded head", "a plain bamboo pin, pale green-yellow, with a flat tapered tip", "a wooden pin with a small plain knob head, darker brown", "a plain dark-wood pin with a slightly bent neck", "a plain folded cloth hair-tie in faded indigo blue, a short loop with a tail, nothing else", "a plain folded cloth hair-tie in light indigo, wound twice, a short tail", "a plain bone-coloured pin, ivory-white, one smooth head", "a plain peach-wood pin, warm pink-brown, with a simple round head", "a plain cloth hair-tie in earth brown, a small neat knot", "a plain boxwood pin, pale yellow-brown, with a flat head"],
 "m1": ["a slim silver pin with one small pearl at its head", "a pair of slim silver pins each with one small pearl", "a slim silver pin with a pearl and a tiny silver ring", "a slim silver U-shaped hairpin with a pearl at each tip", "a slim silver pin with a twisted wire neck and a small pearl", "a slim silver pin with a flat leaf-shaped head and one small pearl drop", "a slim silver pin with a pearl and a short fine silver chain", "a pair of slim silver pins of different lengths, the longer with a pearl", "a slim silver pin with a small knot-shaped head and a pearl", "a slim silver pin with a flat round head and a tiny pearl on its rim"],
 "m2": ["three silver pins of graduated length, two tipped with pearls", "a silver pin with a pearl and a small silver tassel, plus a short plain silver pin", "a pair of silver pins with pearl drops and a third slim pin", "a silver U-shaped hairpin with pearls at both tips, plus a short silver pin", "four slim silver pins in a loose fan, each tipped with a small pearl", "a silver pin with pearls along its neck and a short beaded chain", "a silver comb-pin of four teeth with two pearls, and one slim pearl pin", "two silver pins with twisted wire necks and pearls of unequal size", "a silver pin with a flat openwork head set with a pearl, plus a plain pin", "a set of three slim silver pins with pearl heads in three sizes"],
 "m3": ["a single gold hairpin with a plain rounded head", "a small gold comb with five fine teeth", "a gold hairpin with a small gold knot head and a short plain gold comb", "a slim gold pin with a gently bent neck and a tiny gold bead", "a small gold comb with a thin engraved border and a plain gold pin", "a gold pin with a flat leaf-shaped head, restrained and dignified", "a small half-moon gold comb with engraved lines", "a gold pin with a twisted wire neck and a small round head", "a gold pin and a tiny gold comb laid together, both simple", "a gold pin with a small flat openwork head, plain and calm"],
 "m4": ["a small gold ornament pin with a crane in flight and a jade pin beside it", "a gold ornament pin with a cloud motif and a slim jade pin", "a gold pin with a small crane head and a plain green jade pin", "a small gold ornament shaped like a fan of clouds and a jade pin", "a gold ornament pin with a tiny rank-badge square and a white jade pin", "a gold pin with a small cloud-and-crane plaque and a slim jade pin", "a small gold ornament pin with fine engraved lines and a jade pin with a rounded head", "a gold pin with a bent neck and a jade bead, plus a slim jade pin", "a gold ornament pin with a small cloud knot and a pale celadon jade pin", "a gold pin with a small crane-wing plate and a simple white jade pin"],
}
def hair_subject(tk, tn, rn, i):
    colour = SOFT[(i * 3 + int(re.sub(r"\D", "", tn) or 0)) % 10]
    if tk in FL:
        sp = FL[tk][i % 5]
        form = FORMS[tk][i]
        extra = ("; the bloom head is a %s painted in %s, painted as the bloom only with NO leaves and NO stem leaves; no chrysanthemum" % (sp, colour))
        return "ONE hair ornament of the rank %s: %s%s. Its ornament head is the main attraction, painted with fine detail. Never a radiating crown of straight pins, never spiky, never a fan, never a mirror, never a rattle drum." % (rn, form, extra)
    if tk == "hqp":
        return "ONE hair ornament of the rank %s: %s. The kingfisher-blue inlay is a rich soft blue, the pearls are warm ivory, the gold is clean royal gold. Painted with fine detail, no flowers apart from small gold blossom sprigs." % (rn, HQP[i])
    if tk == "hh":
        return "ONE hair ornament of the rank %s: %s. The kingfisher-blue inlay is a rich soft blue, the pearls warm ivory, the rubies a clear soft red, the gold clean royal gold. Painted with fine detail." % (rn, HH[i])
    return "ONE hair ornament of the rank %s: %s. Nothing else, NO flowers, NO jewels beyond what is written. Painted with fine detail and honest materials." % (rn, MAID[tk][i])
OUT = HERE
rows = []; subjects = set()
for tk, tn, rn in TIERS:
    for i in range(10):
        nn = "%02d" % (i + 1)
        key = "img/wd512/wd-%s-t-%s.webp" % (tk, nn)
        if key in HAVE: rows.append(("SKIP", key)); continue
        subj = hair_subject(tk, tn, rn, i)
        assert subj not in subjects, subj; subjects.add(subj)
        parts = [S_STYLE, S_TAKE, "SUBJECT: a single hairpin picture for the game's wardrobe: " + subj,
          "RANK LADDER (reference only, the rank decides how rich it is): " + LADDER[tk],
          ("FABRIC and MATERIAL: this object is metal, pearl, jade or wood, not cloth; where a silk tassel or tie appears it is thin, light, flowing silk (rule B12 for t1-t5), at t6 and above silk is brocade-rich." if tk in FL or tk in ("hqp", "hh") else "MATERIAL: plain honest materials as written, nothing glittering beyond them; a silk or cloth tie is soft thin cotton or silk."),
          "COMPOSITION: the object, %s. ONE isolated object (or the one matched set written above) centred with generous margin, on a plain solid chroma-free PURE WHITE background (#FFFFFF), soft clean edge, no cast shadow on the background, no person, no hand, no head, no hair, no mannequin, no stand, no box, no tray. Square 1:1, 1024 x 1024 px master (will be reduced to 512 x 512 px)." % COMP[i],
          S_LIGHT, S_COLOUR, S_NOTEXT, S_NOFACE.split(":")[0] + ": no person is shown at all, only the object.", "Every hairpin points upward or backward, never sticking out sideways."]
        code = "AJ5-%s%s-%s" % (tn.upper(), "T", nn)
        p = write_prompt(OUT, "wd-%s-t-%s" % (tk, nn), parts, code)
        rows.append((code, key, os.path.basename(p), rn, tn, i + 1))
save_codes("J5")
# outfit keys already present (skipped)
skipped = [k for k in sorted(HAVE) if re.match(r"img/wd512/wd-\w+-y-\d+\.webp", k)]
named_have = [k for k in sorted(HAVE) if re.match(r"img/(hi/)?wd-[a-z0-9\-]+\.webp", k)]
new = [r for r in rows if r[0] != "SKIP"]
L = []
L.append("# J5 WARDROBE (IT02) - prompt files, INDEX\n")
L.append("PRIORITY #1 CHECK: git grep origin/main 'wd512|wd-' (dev/build/jinv.js:329-335, j92.js:70-100, assets.json) + OWNER_DECISIONS.md:45 (OD 11/14: per tier 20 items = 10 hairpins + 10 outfits, 8 consort ranks + 5 maid ranks = 260) + GAP_LIST_v4.md:19/66 + FOREMAN_C_STATUS.md:1567/1623 | no review/wardrobe branch exists on origin (stale 66d1bd95 not used) | assets.json already has %d outfit pictures wd512/wd-<tier>-y-NN, all 53 WD_LIST icons (img/wd-<key>.webp, 25 hi/ twins) and 20 hoa-dien variants -> SKIPPED; missing = the 130 hairpin pictures wd512/wd-<tier>-t-NN, written below.\n" % len(skipped))
L.append("ART LAW A53: no Magnific generation; these are paste-ready prompts for the owner to draw in ChatGPT (zero credits spent).\n")
L.append("How to use: ChatGPT new chat, attach `%s` (style reference only, ART takes drawing style only) and NO other reference (objects, no person), paste ONE .txt, ask for ONE image. Result: object on pure white; owner removes background later (utility op after she asks, A53), reduce to 512 x 512 px webp transparent.\n" % REF_STYLE)
L.append("Targets: 1024x1024 master -> img/wd512/wd-<tier>-t-NN.webp 512x512 transparent (size per jinv.js:335 / KIT.md:4321 'img/wd512/... already 512'). Tier keys = jinv.js:331 KEQ_TIER (dapung thuongtai quynhan tan phi quyphi hqp hh) + maid m0..m4 (jinv.js:333 isSrv -> 'm1'; SRK.maid j14.js:50).\n")
L.append("Rank ladder is referenced by rank (DESIGN_BIBLE s2 ladder t1..t8; hair words = store ladder words build.py TIER_LOW / c06-t4..t6 / t7 crown / TM maid outfits; fabric B12; hair flowers bloom only, no leaves, no chrysanthemum F19, species per rank F2/F19(4); t7/t8 no hair flower; maids no hair flowers K15).\n")
L.append("## Counts by tier\n\n| tier key | rank | hairpin prompts | outfit y-NN already on CDN (skipped) |\n|---|---|---|---|")
for tk, tn, rn in TIERS:
    L.append("| %s | %s %s | %d | %d |" % (tk, tn, rn, sum(1 for r in new if r[3] == rn), sum(1 for k in skipped if "/wd-%s-y-" % tk in k)))
L.append("| total | | %d | %d |\n" % (len(new), len(skipped)))
for grp, lab in (("c", "## Consort ranks t1-t8"), ("m", "## Maid rank sets (own group)")):
    L.append(lab + "\n\n| code | key (as the CDN would hold it) | prompt file | refs to attach | target | code reads it | note |\n|---|---|---|---|---|---|---|")
    for tk, tn, rn in TIERS:
        if (tk[0] == "m") != (grp == "m"): continue
        L.append("| **%s %s** | | | | | | |" % (tn, rn))
        for r in new:
            if r[3] == rn:
                L.append("| %s | %s | J5/%s | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | %s |" % (r[0], r[1], r[2], FL[tk][(r[5]-1) % 5] if tk in FL else "no flower"))
L.append("\n## Skipped (already exists)\n\n- %d outfit pictures `img/wd512/wd-<tier>-y-01..10` (13 tiers x 10) + `wd-nt-y-*` (6) + `wd-tang-y-*` (2): in assets.json.\n- all %d WD_LIST icons `img/wd-<key>.webp` (j92.js:70-98, 53 keys incl. 6 nt_ and 3 hd_ ) and %d `img/hi/wd-*` twins; `img/wd-hd-<kind>-01..20` hoa-dien variants.\n- Outfit keys list: `python3 -c` over assets.json regex `img/wd512/wd-\\w+-y-\\d+`.\n" % (len(skipped), len([k for k in named_have if '/hi/' not in k and not re.search(r'-\d\d\.webp', k)]), len([k for k in named_have if '/hi/' in k])))
L.append("## Open questions for the owner / C\n\n1. Q1 CODE: no code reads wd512 hairpins (jinv.js:347 ghost for tram uses keqArt('tramngoc'); WD_ITEMS icon = img/wd-<key>.webp j92.js:100). Per-tier t-NN pictures need a wiring decision (B/C): data key + pick rule like keqRobe.\n2. Q2 OUTFITS: OD 11/14 asks 10 outfits + 10 hairpins per tier; the 10 outfits per tier already exist (wd-<tier>-y-NN). I could not tell from git whether the owner has approved them (history: 'owner rejected the first set'). If she wants them redrawn, say so and I add a y-NN group (130 prompts).\n3. Q3 MAID hair flowers: K15 (Lượt 520, no flowers for maids) vs F8 ('each maid rank its own set, all with flower pins'): I followed K15 (no flowers; metal/jade/wood only).\n4. Q4 t7/t8: F2 says no hair flower at t7/t8, so their sets are phoenix/crown parts, not blooms; confirm sets of 10 crown parts are fine.\n5. Q5 WD_LIST vs 260: j92.js:70 WD_LIST is 53 named items not 260; 'sets' = the tier t-NN/y-NN pictures, not WD_LIST rows.\n")
open(os.path.join(OUT, "INDEX.md"), "w", encoding="utf-8").write("\n".join(L))
print(len(new), "written;", len(skipped), "outfit skipped")
