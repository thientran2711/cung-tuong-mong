#!/usr/bin/env python3
"""M2231-02..08 (thu s62) — owner L2232 (relayed as L2231 in the brief) + L2233 + L2236 + L2228 neck, via ROOT-B7. THUROOT9, 0 cr.
Bases: t2 = M2213-02 · t3..t6 = M2217-03..06 · t7/t8 = M2227-07/08. Only the owner-ordered items below change (A18/A57);
ANGLE / Pose / GRACE blocks byte-identical (A54, asserted). Every edit pair: old text must occur exactly once."""
import json, pathlib, re, sys
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; OUT = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(R / "dev/art")); import keep_check as K, lowneck_L2228 as LN

SOFT = "made of the SAME thin, light, supple silk as the robe, soft and unlined, never stiff, never a board, moving and folding softly with the skirt"
LADDER = "(centre-panel embroidery RICHNESS and flower SIZE rise by rank: Quý nhân, Tần, Phi, Quý phi, Hoàng quý phi, Hoàng hậu richest)"
def panel(colour, emb): return (f"from the sash a narrow CENTRE-FRONT PANEL (dải dọc) of {colour} silk hangs straight down the middle of the skirt to the hem, "
                                 f"{SOFT}, embroidered down its whole length with {emb} {LADDER}; ")
TIE = "to well below the knees (ties and tassels together exactly the SAME fixed length as at every other rank, the tassels hanging below the knees, never ending at mid-thigh)"

E = {
 2: ("M2213-02", [
   ("delicate embroidered tiger lilies at the collar, sleeves and hem, never over the bands,",
    "only small tiger-lily sprigs embroidered in narrow bands at the collar, the sleeve ends and the hem, plus only a FEW small tiger-lily sprigs widely spaced on the skirt with plain light olive silk between them (never all over the robe, never big lily sprays), never over the bands,"),
   ("No phoenix anywhere on the robe or in the hair:",
    "FLOWER SIZE (rank ladder): every embroidered flower on her robe is SMALL, small sprigs only, never big lily sprays, clearly smaller than the Quý nhân's roses. No phoenix anywhere on the robe or in the hair:"),
 ]),
 3: ("M2217-03", [
   ("delicate embroidered small China roses at the collar, sleeves and hem,", "delicate embroidered China roses at the collar, sleeves and hem,"),
   ("and only a FEW small China-rose sprigs, widely spaced with plain silk between them, mainly near the hem and the sleeve ends (clearly FEWER than at the Tần rank, a little more than at the Thường tại rank), with a few pairs",
    "and China-rose sprays embroidered ALL OVER the robe body, the sleeves and the skirt, evenly scattered, each rose clearly visible (clearly more than at the Thường tại rank), with a few pairs"),
   ("each ending in a small silk tassel; from the girdle hangs down the centre front an embroidered lilac APRON PANEL (a long narrow ceremonial front panel, only small fine China-rose sprigs, NO big flowers, gold-braid edge) reaching to the ankles;",
    f"the ties themselves embroidered along their WHOLE length with small China roses in shaded silk, clearly visible, each ending in a small silk tassel; from the girdle hangs down the centre front an embroidered lilac APRON PANEL (dải dọc, a long narrow ceremonial front panel, {SOFT}, embroidered down its whole length with her China roses in shaded silk floss, the same size as on her robe, gold-braid edge) reaching to the ankles;"),
   ("NO BIG FLOWERS: every flower on her outfit is small and fine.",
    "FLOWER SIZE (rank ladder): her China roses are clearly bigger and clearly visible, bigger than the Thường tại's small sprigs, but clearly smaller than the Tần's big flowers and never big lily sprays."),
 ]),
 4: ("M2217-04", [
   ("each ending in a small silk tassel with a small bead-and-knot cap (thướt tha); SLIM, and",
    "each ending in a small silk tassel with a small bead-and-knot cap (thướt tha); "
    + panel("lilac", "her double kerria pompons, the same size as on her robe, in shaded silk floss with fine silver-thread edges") + "SLIM, and"),
 ]),
 5: ("M2217-05", [
   ("a slim embroidered lilac silk sash with her small flowers along it in fine gold and silver thread and a row of small pearls along both edges (clearly richer than the Tần's)",
    "a slim lilac silk sash DENSELY embroidered in gold thread along its whole length with her small double hollyhocks, a row of small pearls along both edges (clearly richer and more golden than the Tần's)"),
   ("closed at the CENTRE front of the waist by a small gold-filigree clasp shaped as a double hollyhock flower with a pearl at its centre (never the Tần's plain round clasp), two LONG silk ties embroidered",
    "closed at the CENTRE front of the waist by a small flat gold plaque buckle set with pearls (never the Tần's plain round clasp), two LONG gold-edged silk ties embroidered"),
   ("each ending in a small silk tassel with a small bead-and-knot cap (thướt tha); SLIM;",
    "each ending in a small silk tassel with one round jade bead above it (thướt tha); "
    + panel("lilac", "her double hollyhocks, a little larger than the Tần's flowers, in shaded silk floss and fine silver thread with a few small pearls") + "SLIM;"),
 ]),
 6: ("M2217-06", [
   ("plus a moderate amount of royal yellow (about HALF of the Hoàng quý phi's): a WIDE panel of royal-yellow silk cloth at the SKIRT FRONT from the waist to the hem, clearly visible (never at the neckline),",
    "plus a modest amount of royal yellow: a NARROW CENTRE-FRONT PANEL (dải dọc) of lilac silk with narrow royal-yellow edges at the SKIRT FRONT, hanging from the sash to the hem (never at the neckline), "
    f"{SOFT}, embroidered down its whole length with her double camellias in gleaming gold thread with tiny seed pearls {LADDER},"),
   ("a slim royal-yellow silk sash embroidered with small gold-thread double camellias along it and a few small pearls,",
    "a slim royal-yellow silk sash densely embroidered in gold thread with small double camellias along it and small pearls along both edges (richer than the Phi's, never bulkier),"),
   ("closed at its centre front by a fine small round gold-filigree clasp, two LONG yellow ties embroidered",
    "closed at its centre front by a small gold-filigree plaque buckle set with pearls and one jade bead, two LONG gold-edged yellow ties embroidered"),
   ("to well past the knees (exactly as long as the Tần's and the Hoàng quý phi's ties, never shorter), each ending in a pretty silk tassel with a small gold cap and one pearl;",
    f"{TIE}, each ending in a pretty silk tassel with a small gold cap, one pearl and one jade bead above it;"),
   ("royal-yellow silk borders of clearly visible width at the sleeve ends and the hem (only a narrow yellow edge on the neckline band), royal-yellow silk sleeve linings clearly showing inside the wide cuffs,",
    "NARROW royal-yellow borders at the sleeve ends and the hem (only a narrow yellow edge on the neckline band),"),
   ("her own colour stays clearly the main robe colour, light olive", "her own colour stays clearly the main robe colour, yellow clearly much less than the Hoàng quý phi's, light olive"),
   ("yellow in a moderate amount (yellow silk CLOTH, not thread),",
    "yellow only in a modest amount (yellow silk CLOTH, not thread: narrow yellow borders at the sleeve ends and the hem, a slim yellow sash, narrow yellow edges on the centre-front panel), clearly much less than the Hoàng quý phi's,"),
 ]),
 7: ("M2227-07", [
   ("a gold-thread phoenix and clouds are finely embroidered on the vân kiên's silk first,",
    "a gold-thread phoenix with spreading wings and clouds are finely embroidered over the WHOLE vân kiên's silk first, clearly visible, the phoenix sunk UNDER the pearl net and showing through it,"),
   ("gold flower studs and small smooth gemstones set at the crossings", "gold-filigree flower studs and small smooth gemstones set at every crossing"),
   ("a slim royal-yellow silk sash embroidered with small gold-thread lilac peonies along it, with small pearls and jade beads,",
    "a slim royal-yellow silk sash densely embroidered in gold thread with small lilac peonies along it, with small pearls and jade beads (richer than the Quý phi's, never bulkier),"),
   ("two LONG yellow ties embroidered along their length with small gold-thread peonies, small pearls and jade beads, falling straight down either side of it to well past the knees,",
    f"two LONG gold-edged yellow ties embroidered along their length with small gold-thread peonies, small pearls and jade beads, falling straight down either side of it {TIE},"),
   ("a wide yellow panel at the SKIRT FRONT below the waist (clearly more yellow than the Quý phi, clearly less than the Empress);",
    f"a wide yellow panel at the SKIRT FRONT below the waist (clearly more yellow than the Quý phi, clearly less than the Empress), this CENTRE-FRONT PANEL (dải dọc) hanging from the sash to the hem, {SOFT}, embroidered down its whole length with her peonies in gleaming gold thread, small pearls and jade beads {LADDER};"),
 ]),
 8: ("M2227-08", [   # HH LOCKED: only L2228 neck + tie length (L2233 D) + centre panel (L2232 item 4)
   ("falling straight down either side of it to well past the knees, each ending in the richest silk tassel of all ranks, a little longer than the others, with",
    f"falling straight down either side of it {TIE}, each ending in the richest silk tassel of all ranks, with"),
   ("soft and flowing (thướt tha); soft, flat and natural, nothing tight, never bulky; SLIM, never covered",
    "soft and flowing (thướt tha); " + panel("lilac", "her tree peonies and small clouds in gleaming gold thread with flat gold couching, small pearls, jade beads and tiny gold flower studs (the richest of all ranks)")
    + "soft, flat and natural, nothing tight, never bulky; SLIM, never covered"),
 ]),
}
WHY = {2: "L2232 #2 density swap t2<-t3 + size ladder; L2228 neck", 3: "L2232 #2/#3/#4 density all over, ties embroidered, soft centre panel; L2228 neck",
       4: "L2232 #4 centre panel; L2228 neck", 5: "L2232 #5 neck (L2228) + #6 Phi sash richer/golder + #4 panel",
       6: "L2233 A QP yellow reverted to M2187 (modest) + #4 panel own colours + sash ladder + L2233 D tie length; L2228 neck",
       7: "L2233 B vân kiên phoenix under net (like HH) + #4 panel + sash ladder + L2233 D tie length; L2228 neck",
       8: "HH LOCKED: L2228 neck + L2233 D tie length + L2232 #4 panel only"}
def blocks(s): return [s[s.index(x):s.index(". ", s.index(x)) + 1] for x in ("ANGLE:", "Pose:", "GRACE")]
mh = {}
for n, (bc, ed) in E.items():
    base = f"{bc}_s62_t{n}_thu.txt"; s0 = (P / base).read_text(); s = s0; keep = blocks(s)
    for o, w in ed:
        assert s.count(o) == 1, (n, o[:80], s.count(o)); s = s.replace(o, w, 1)
    s, ln = LN.post(s); assert ln and LN.PHRASE in s, n     # L2228/G76 neck = NECK1's tool, same words as M2228
    assert blocks(s) == keep, n
    assert "#EFBD69" in s0 and s.count("#EFBD69") == s0.count("#EFBD69") or "#EFBD69" not in s0, n   # L2226 yellow wording untouched
    code = f"M2231-0{n}"; assert s.count(f'"{bc}"') == 1; s = s.replace(f'"{bc}"', f'"{code}"'); assert s.rstrip().endswith(f'"{code}"')
    out = f"{code}_s62_t{n}_thu.txt"; (P / out).write_text(s); (OUT / out).write_text(s)
    # allow = exactly the base phrases that the edit pairs removed (each must come from an edited old string)
    olds = " ".join(K.norm(o) for o, _ in ed) + f" {K.norm(bc)}"
    gone = K.check(str(P / base), str(P / out), [])[0]
    tmp = OUT / "_neck.tmp"; tmp.write_text(LN.post(s0)[0]); neck = set(K.check(str(P / base), str(tmp), [])[0]); tmp.unlink()
    al = []
    for p in dict.fromkeys(gone):   # every dropped base phrase must come from an edited old string (3-word window) or from NECK1's post()
        w = K.norm(p).split()
        if any(" ".join(w[i:i+3]) in olds for i in range(len(w) - 2)): al.append(f"allow: {p}  # {WHY[n]} (ROOT-B7)")
        else: assert p in neck, (n, p); al.append(f"allow: {p}  # owner L2228 G76 low neckline a18-a36 via lowneck_L2228.post (NECK1 wording)")
    (OUT / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(x + "\n" for x in al))
    mh[code] = f"{out} (= {bc} + " + {2: "mật độ thêu đổi với t3: hoa nhỏ theo dải + vài cành trên váy; cổ thấp L2228)",
        3: "thêu khắp áo, hoa to hơn t2 nhỏ hơn Tần; dây thắt lưng thêu; dải dọc vải mềm; cổ thấp L2228)",
        4: "dải dọc thêu vải mềm; cổ thấp L2228)", 5: "cổ thấp L2228; đai Phi khác Tần: thêu chỉ vàng dày, khoá vàng nạm ngọc trai, viền vàng, hạt ngọc bích trên tua; dải dọc)",
        6: "QP vàng trả về như cũ (ít); dải dọc tím viền vàng; đai giàu hơn Phi; tua dài bằng các bậc; cổ thấp L2228)",
        7: "phượng chìm dưới lưới ngọc như HH; dải dọc; đai; tua dài bằng các bậc; cổ thấp L2228)",
        8: "HH KHÓA: chỉ cổ thấp L2228 + tua dài bằng các bậc + dải dọc)"}[n]
    print(out, len(s0), "->", len(s), "allow", len(gone))
mp = P / "MA_HINH.json"; d = json.load(open(mp)); d.update(mh); mp.write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n")
