#!/usr/bin/env python3
"""M2206-01..08 = M2203-01..08 + owner L2206 (via ROOT-B5). THUROOT7, words only, 0 cr.
t1–t4, t8 = CAPTION only (t4 Tần + t8 HH LOCKED, A57). t5 Phi: vân kiên length = QP words, neck = Tần words, sash/ties richer.
t6 QP: tie length anchored to Tần/HQP, more royal-yellow CLOTH (~½ HQP). t7 HQP: collar/neck/vân-kiên-neck/clasp = QP."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
TAG = "owner L2206 via ROOT-B5"
J = {1: [], 2: [], 3: [], 4: [], 8: [],
 5: [  # (a) length = QP words
     ("its lobes reaching the shoulder points and just over them (exactly as long as the Tần's, never shorter (shoulder-piece",
      "its lower edge ending at the UPPER THIRD of the upper arms (longer than the Tần's, never shorter (shoulder-piece"),
     # (b) neck = Tần words
     ("a fringe of small gold tassels, joined at the throat", "a fringe of small gold tassels, its neck edge plain silk, joined at the throat"),
     ("never on the chest, open at the front below it;", "never on the chest, OPEN at the front below it, its two front edges parting so the square neckline stays fully visible, never hiding it;"),
     ("a short pearl fringe at its lower edge; never hiding the square collar; the net", "a short pearl fringe at its lower edge; the net"),
     ("NO necklace, no pearl strand at the neck, the robe richly", "the robe richly"),
     # (c) sash + ties richer than Tần
     ("with her small flowers along it in shaded silk and fine silver thread (a little richer than the Tần's),",
      "with her small flowers along it in fine gold and silver thread and a row of small pearls along both edges (clearly richer than the Tần's),"),
     ("by a small round gold-filigree clasp with one tiny pearl,",
      "by a small gold-filigree clasp shaped as a double hollyhock flower with a pearl at its centre (never the Tần's plain round clasp),"),
     ("two LONG silk ties embroidered along their length with small double hollyhocks,",
      "two LONG silk ties embroidered along their length with small double hollyhocks in gold and silver thread, with a few small pearls,")],
 6: [  # (a) tie length anchored
     ("either side of it to well past the knees, each ending in a pretty silk tassel with a small gold cap",
      "either side of it to well past the knees (exactly as long as the Tần's and the Hoàng quý phi's ties, never shorter), each ending in a pretty silk tassel with a small gold cap"),
     # (b) more royal-yellow CLOTH
     ("a slim yellow panel at the SKIRT FRONT from the waist to the hem (never at the neckline)",
      "a WIDE panel of royal-yellow silk cloth at the SKIRT FRONT from the waist to the hem, clearly visible (never at the neckline)"),
     ("NARROW royal-yellow borders (the edge of the neckline band, the sleeve ends and the hem), narrow royal-yellow sleeve linings showing at the cuffs",
      "royal-yellow silk borders of clearly visible width at the sleeve ends and the hem (only a narrow yellow edge on the neckline band), royal-yellow silk sleeve linings clearly showing inside the wide cuffs"),
     ("(narrow yellow borders at the neckline band edge, the sleeve ends and the hem, narrow yellow sleeve linings at the cuffs, a slim yellow sash with its two long yellow ties, a slim yellow panel at the skirt front from the waist to the hem)",
      "(yellow silk CLOTH, not thread: a wide yellow panel at the skirt front from the waist to the hem, clearly visible yellow borders at the sleeve ends and the hem, yellow sleeve linings clearly showing inside the cuffs, a slim yellow sash with its two long yellow ties, only a narrow yellow edge on the neckline band)")],
 7: [("framed by ONE wide flat pearl-edged gold-embroidered band (the square band",
      "framed by ONE wide flat band in her second colour embroidered with bomb-form herbaceous peonies (the square band"),
     ("like the Phi's soft pearl-net vân kiên; joined at the throat", "like the Phi's soft pearl-net vân kiên; never rising up the neck, joined at the throat"),
     ("never on the chest, its front open so the square collar stays fully visible;", "never on the chest, its front open below it, never hiding the square collar;"),
     ("very wide yellow borders along the neckline, sleeves and hem,", "very wide yellow borders along the sleeves and hem (only a narrow yellow edge on the neckline band),"),
     (" Nothing around the neck: no stand collar, no necklace.", "")],
}
A = {5: ["exactly as long as the Tần's", "its lobes reaching the shoulder points and just over them", "open at the front below it", "never hiding the square collar",
         "NO necklace", "no pearl strand at the neck", "with her small flowers along it in shaded silk and fine silver thread",
         "a little richer than the Tần's", "by a small round gold-filigree clasp with one tiny pearl"],
     6: ["a slim yellow panel at the SKIRT FRONT from the waist to the hem", "NARROW royal-yellow borders", "the edge of the neckline band", "narrow royal-yellow sleeve linings showing at the cuffs",
         "narrow yellow borders at the neckline band edge", "narrow yellow sleeve linings at the cuffs", "a slim yellow panel at the skirt front from the waist to the hem"],
     7: ["framed by ONE wide flat pearl-edged gold-embroidered band", "its front open so the square collar stays fully visible",
         "very wide yellow borders along the neckline", "Nothing around the neck", "no stand collar", "no necklace"]}
for n in range(1, 9):
    base = f"M2203-0{n}_s62_t{n}_thu.txt"; s = (P / base).read_text()
    for o, w in J[n]:
        assert s.count(o) == 1, (n, o[:70], s.count(o)); s = s.replace(o, w, 1)
    code = f"M2206-0{n}"; out = f"{code}_s62_t{n}_thu.txt"
    s = s.replace(f'"M2203-0{n}"', f'"{code}"'); assert s.rstrip().endswith(f'"{code}"'), n
    (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {a}  # {TAG}\n" for a in A.get(n, [])))
    print(out, len(s))
