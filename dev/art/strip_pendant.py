#!/usr/bin/env python3
"""G57 (owner L1851): remove every jade pendant / yupei / zupei / ngọc bội / jade-disc from consort prompts.
Replacement = nothing or a plain silk sash end (never another hanging ornament on the front).
usage: strip_pendant.py [--write] FILE...   (dry-run prints changed count)"""
import re,sys
S=r"(?:,? never covered by (?:the )?sleeves?(?: or (?:the )?shawl)?(?:, cape or shawl)?)?"
R=[ # (regex, replacement) – ordered, specific first
 (r",? (?:and )?long jade-and-gold belt pendants with pearl tassels"+S, ""),
 (r"a jade-and-gold belt with a long (royal golden yellow|soft peach-blossom pink) rank ribbon \(shou\) with jade rings and two zupei", r"a gold belt with a long \1 rank ribbon (shou)"),
 (r"a jade-and-gold belt with long tassels and jade pendants", "a plain gold belt"),
 (r"a jade-and-gold belt and two long zupei", "a plain gold belt"),
 (r"a short royal golden yellow shou and a zupei", "a short royal golden yellow shou"),
 (r"an embroidered silk sash with hanging jade belt pendants and tassels", "an embroidered silk sash tied flat at the waist"),
 (r"an embroidered silk sash with jade belt pendants and tassels", "an embroidered silk sash tied flat at the waist"),
 (r"a WIDE stiff embroidered waist belt with a gold buckle plaque and (?:one|a long) set of (?:SMALL thin )?jade discs and (?:fine )?pearl strands \(zupei\)(?: on silk cords)?(?: to the knee| hanging (?:on silk cords )?to the knee)", "a WIDE stiff embroidered waist belt with a gold buckle plaque"),
 (r"a WIDE stiff embroidered waist belt with a gold buckle plaque and a long set of jade discs and pearl strands \(zupei\) hanging on silk cords to the knee", "a WIDE stiff embroidered waist belt with a gold buckle plaque"),
 (r"a WIDE jade-and-gold belt with two long sets of jade discs and pearl strands \(zupei\) to the knee", "a WIDE plain gold belt"),
 (r"a broad gold brocade girdle with two long jade pendants hanging on silk cords"+S, "a broad gold brocade girdle"),
 (r" with TWO long jade pendants on silk cords", " with the two silk ends tied flat"),
 (r" with two long jade pendants on silk cords", " with the two silk ends tied flat"),
 (r"two long jade pendants hanging on silk cords from the band", "the band tied flat"),
 (r"a wide embroidered sash at the waist with two long jade pendants hanging on silk cords", "a wide embroidered sash at the waist"),
 (r"a slim embroidered sash with two long jade pendants on silk cords", "a slim embroidered sash"),
 (r"with ONE small jade disc and ONE small jade pendant on silk cords", ""),
 (r" with ONE small jade (?:disc|pendant) on (?:a|an ivory) silk cord", ""),
 (r"with ONE jade disc at the centre and a long (?:ceremonial )?jade pendant set on each side down to the knees: small carved jade plaques linked by strings of pearls, ending in silk tassels"+S, ""),
 (r"a wide stiff ivory white silk girdle at the natural waist with a long ceremonial jade pendant set on each side down to the knees: small carved jade plaques linked by strings of pearls, ending in silk tassels"+S, "a wide stiff ivory white silk girdle at the natural waist"),
 (r"a wide ivory white silk girdle with a small carved jade pendant set on each side", "a wide ivory white silk girdle"),
 (r"on each side of the apron hangs a long ceremonial jade pendant set down to the knees: small carved jade plaques linked by strings of pearls, ending in silk tassels"+S, "the apron hangs plain to the knees"),
 (r" and a long jade pendant set \(ngọc bội\) (?:of jade plaques and tassels )?at each outer side", ""),
 (r"a long jade pendant set \(ngọc bội\) of jade plaques on pearl strings with tassels at each outer side", "plain apron edges"),
 (r"with (?:two long |a )carved jade pendant sets? \(ngọc bội\) and tassels in front"+S, "with two plain silk sash ends in front"),
 (r"a long jade pendant set \(ngọc bội\) of jade plaques", "plain apron edges"),
 (r"; two gold-and-jade pendant sets \(jinbu\) with pearl tassels", ""),
 (r"(?:a long )?gold-and-jade pendant sets? \(jinbu\)[^,.;]*", "a plain skirt front"),
 (r"two gold-and-jade pendant sets \(jinbu\) with pearl tassels", "a plain skirt front"),
 (r", plus a gold-embroidered waist band with a jade disc", ", plus a gold-embroidered waist band"),
 (r"plus a gold-embroidered waist band with a jade disc", "plus a gold-embroidered waist band"),
 (r"hung with large jade rings falling to the hem", "falling to the hem"),
 (r"a jade-and-gold belt with long tassels", "a plain gold belt"),
 (r"a jade-and-gold belt", "a plain gold belt"),
 (r", jade belt pendants and tassels hanging from it", ""),
 (r"ONE jade disc at the centre and a long (?:ceremonial )?jade pendant set on each side down to the knees: small carved jade plaques linked by strings of pearls, ending in (?:ivory )?silk tassels", "no pendant"),
 (r"a long (?:ceremonial )?jade pendant set on each side down to the knees: small carved jade plaques linked by strings of pearls, ending in (?:ivory )?silk tassels", "no pendant"),
 (r"a jade belt", "a plain gold belt"),
 (r"(sash|girdle|belt) with a (?:small|little) [a-z ]{0,25}(?:pendant|disc pendant)", r"\1"),
 (r"dance fans with jade pendants", "dance fans with jade tassels"),
 (r"on each outer side of the two panels hangs a long (?:ceremonial )?jade pendant set down to the knees: small carved jade plaques linked by strings of pearls, ending in (?:ivory )?silk tassels"+S, "the two panels hang plain to the knees"),
 (r"a soft silk sash with a small carved jade pendant \(ngọc bội\) on a silk cord with a silk tassel at each side", "a soft silk sash tied flat at the waist"),
 (r"a wide gold-and-jade belt with long tassels and jade pendants hanging at the front", "a wide plain gold belt"),
 (r"one hand adjusting her belt pendant", "one hand resting lightly at her belt"),
 (r"(sash|girdle) with a (?:small )?(?:white jade|amethyst|jade) pendant on a silk cord(?: with a tassel(?: at the (?:centre|sash))?)?", r"\1"),
 (r"[,;] a jade pendant on a silk cord with a tassel(?: hanging)?(?: at the (?:centre|sash))?", ""),
 (r"(sash|girdle) with a small (?:white jade|amethyst) pendant", r"\1"),
 (r",? the jade pendants never covered by sleeve or shawl", ""),
 (r",? (?:its )?(?:jade )?pendants never covered by (?:the )?sleeves?", ""),
 (r"NEVER on the robe, (cape, )?collar, belt or pendants", r"NEVER on the robe, \1collar or belt"),
 (r"belt jade pendants and tassels hanging from it", "belt"),
]
def strip(t):
    for a,b in R: t=re.sub(a,b,t)
    return t
DET=re.compile(r"ngọc bội|ngoc boi|yupei|zupei|jinbu|(?<!no )(?<!or )pendants?\b|jade discs?|jade plaques linked|jade rings?|jade[- ]and[- ]gold belt|jade belt|belt jade|long jade|jade (?:disc|rings?)",re.I)
if __name__=="__main__":
    w=sys.argv[1]=="--write"; n=0
    for f in sys.argv[1+w:]:
        t=open(f,encoding="utf8").read(); u=strip(t)
        if u!=t:
            n+=1
            if w: open(f,"w",encoding="utf8").write(u)
    print("changed",n)
