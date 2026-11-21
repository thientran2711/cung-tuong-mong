#!/usr/bin/env python3
"""M2203-01..08 — ONE final thu s62 batch with every order L2191–L2200 (via ROOT-B5). THUROOT7, words only, 0 cr.
t1–t4 = M2196-01..04 (CAPTION only). t6 = M2196-06 + L2197. t5/t7/t8: base = M2187-05/-07/-08 (L2198 rebase), built on
M2196-0N text (which = M2187 + L2191/L2193/L2194/L2195/L2196) with the L2189-only edits reverted + L2197 (+ L2200) + 'robe' not 'bodice' (L1996/G70)."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
SOFT = "soft, flat and natural, nothing tight, never bulky"
J = {1: [], 2: [], 3: [], 4: [],
 5: [("a slim embroidered lilac silk sash with her small flowers along it, wrapped OVER the outer robe and closed at the CENTRE front of the waist by a small round gold-filigree clasp, two LONG silk ties falling straight down either side of the clasp to well past the knees,",
      "a slim embroidered lilac silk sash with her small flowers along it in shaded silk and fine silver thread (a little richer than the Tần's), wrapped OVER the outer robe, sitting at the natural waist and staying there, " + SOFT + ", and closed at the CENTRE front of the waist by a small round gold-filigree clasp with one tiny pearl, two LONG silk ties embroidered along their length with small double hollyhocks, falling straight down either side of the clasp to well past the knees,")],
 6: [("a slim royal-yellow silk sash wrapped all the way around the waist OVER the outer robe,",
      "a slim royal-yellow silk sash embroidered with small gold-thread double camellias along it and a few small pearls, wrapped all the way around the waist OVER the outer robe,"),
     ("closed at its centre front by a flat endless knot of yellow silk cord (no loops), two LONG yellow ties falling straight down",
      "closed at its centre front by a fine small round gold-filigree clasp, two LONG yellow ties embroidered along their length with small gold-thread double camellias and a few small pearls, falling straight down"),
     ("one pearl; flat, fitted to the waist, never bulky and NARROW", "one pearl; " + SOFT + " and NARROW")],
 7: [("embroidered on the front of the bodice below the collar", "embroidered on the front of the robe below the collar"),
     ("it is never displayed, never shown off; a light olive vân kiên", "it is never displayed, never shown off, never inside the neckline, never framed; a light olive vân kiên"),
     ("a slim royal-yellow silk sash wrapped all the way around the waist OVER the outer robe,",
      "a slim royal-yellow silk sash embroidered with small gold-thread lilac peonies along it, with small pearls and jade beads, wrapped all the way around the waist OVER the outer robe,"),
     ("closed at its centre front by a gold cloud plaque, two LONG yellow ties falling straight down",
      "closed at its centre front by a round gold-filigree clasp set with pearls, two LONG yellow ties embroidered along their length with small gold-thread peonies, small pearls and jade beads, falling straight down"),
     ("soft and flowing (thướt tha); flat, fitted to the waist, never bulky;", "soft and flowing (thướt tha); " + SOFT + ";")],
 8: [("embroidered on the front of the bodice below the collar", "embroidered on the front of the robe below the collar"),
     ("(vân kiên một tầng, never olive), made of the SAME thin, light, flowing silk as her robe, soft and unlined, it DRAPES",
      "(vân kiên một tầng, never olive; ONE single tier, never two or three), made of the SAME thin, light, flowing silk as her robe, soft, light and unlined, never bulky, it DRAPES"),
     ("LONGER than the Quý phi's, its lobes falling to about the MIDDLE of the upper arms (the same length as the Hoàng quý phi's);",
      "the LONGEST of all, its lobes falling BELOW the middle of the upper arms (shoulder-piece LENGTH rises by rank: Đáp ứng shortest, then Thường tại, Quý nhân, Tần, Phi, Quý phi, Hoàng quý phi, Hoàng hậu longest);"),
     ("tiny gold flower studs (finer and prettier than the Phi's) lies OVER them", "tiny gold flower studs, the most beautiful of all, lies OVER them"),
     ("a slim royal-yellow silk sash wrapped all the way around the waist OVER the outer robe,",
      "a slim royal-yellow silk sash embroidered with tiny gold phoenix and cloud motifs along it, set with pearls and jade beads (the richest sash of all ranks), wrapped all the way around the waist OVER the outer robe,"),
     ("closed at its centre front by a small gold double-phoenix plaque set with white jade and pearls, two LONG yellow ties embroidered with small gold phoenixes falling straight down",
      "closed at its centre front by a round gold-filigree clasp set with pearls and jade (the richest of all ranks), two LONG yellow ties embroidered along their whole length with tiny gold phoenix and cloud motifs and small pearls, falling straight down"),
     ("soft and flowing (thướt tha); flat, fitted to the waist, never bulky;", "soft and flowing (thướt tha); " + SOFT + ";")],
}
for n in range(1, 9):
    src = f"M2196-0{n}_s62_t{n}_thu.txt"; s = (P / src).read_text()
    for o, w in J[n]:
        assert s.count(o) == 1, (n, o[:60], s.count(o)); s = s.replace(o, w, 1)
    for bad in ("bodice" if n >= 7 else "@@", "fitted", "cinch", "tight or binding"):
        assert bad not in s, (n, bad)
    code = f"M2203-0{n}"; out = f"{code}_s62_t{n}_thu.txt"
    s = s.replace(f'"M2196-0{n}"', f'"{code}"'); assert s.rstrip().endswith(f'"{code}"'), n
    (D / out).write_text(s); (P / out).write_text(s); print(out, len(s))
