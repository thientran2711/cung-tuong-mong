#!/usr/bin/env python3
"""MAIDP2 (owner Lượt 1456/1457): v2 ChatGPT maid prompts. Every swap asserted exactly once.
Run from repo root: python3 dev/art/maid7/make7_gpt.py [nhat chuongsu thancan mama]
"""
import sys, os
D = 'dev/art/maid7/gpt/'

CAP = ('\n\nCAPTION: in LARGE bold letters, top-left corner, on the plain background, never over her body, '
       'write exactly this Vietnamese text WITH accents: "{}"')

# job 4 (owner L1456): vest shoulders stiffer
VEST_SHOULDER = (', the over-vest cut from a firmer, lightly stiffened brocade with crisp, slightly structured '
                 'shoulders that keep a clean straight shoulder line and sit a little away from her shoulders '
                 '(not soft, never clinging to or hugging the shoulder, never padded or boxy)')

# job 2 (owner L1456): senior hairpins at least as rich as the young maids' ("several silver and pearl hairpins")
SENIOR_PINS = ('with MORE and richer hairpins than a young first-rank maid (nhất đẳng): several gold, jade and pearl '
               'hairpins with small dangles set in the bun, all pointing upward or backward, no flowers')


def swap(t, old, new):
    n = t.count(old)
    assert n == 1, (old, n)
    return t.replace(old, new)


def keep(path, base, allows):
    with open(path + '.keep', 'w', encoding='utf-8') as f:
        f.write('base: %s\n' % base)
        for a, why in allows:
            f.write('allow: %s   # %s\n' % (a, why))


def nhat():
    base = D + 'nhat_gpt.txt'
    t = open(base, encoding='utf-8').read()
    t = swap(t, 'with a band of gold-edged trim down the front, worn over the inner robe',
             'with a band of gold-edged trim down the front, worn over the inner robe' + VEST_SHOULDER)
    t = t.rstrip() + CAP.format('Cung nữ nhất đẳng · Áo ghi lê cổ đứng + hai tà')
    out = D + 'nhat_gpt_v2.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [])
    return out


def chuongsu():
    base = D + 'chuongsu_gpt.txt'
    t = open(base, encoding='utf-8').read()
    t = swap(t, 'with one plain jade hairpin in the bun', SENIOR_PINS)
    # K26 (owner L1461): m18 own main powder blue ~ cung nữ uniform blue -> her own SECONDARY deep rose
    assert t.count('powder blue like #A7BAD2') == 2 and t.count('powder blue') == 5, t.count('powder blue')
    t = t.replace('powder blue like #A7BAD2', 'deep rose like #CA7281').replace('powder blue', 'deep rose')
    t = t.rstrip() + CAP.format('Chưởng sự cô cô · Áo khoác tím cà dài tới gối + váy hồng')
    out = D + 'chuongsu_gpt_v2.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('with one plain jade hairpin in the bun',
                      'owner Lượt 1456: chưởng sự hairpins not fewer than the young maids'),
                     ('with broad powder blue front-edge borders and a powder blue lining showing at the hem', 'K26 owner L1461: secondary = her deep rose'),
                     ('over a long inner robe and skirt in powder blue like #A7BAD2', 'K26 owner L1461'),
                     ('in lighter tones of purple and powder blue with fine gold thread', 'K26 owner L1461'),
                     ('the MAIN colour eggplant purple and the SECONDARY colour powder blue like #A7BAD2', 'K26 owner L1461')])
    return out


HDR_TC = ("[ChatGPT: attach Image 1 = m18 face reference (the same single reference used on Magnific, s7IPw0Ll8e) and "
          "Image 2 = the round-1 picture (Magnific 1ldexOWr4r) as the OUTFIT and COLOUR reference only (never copy its face). "
          "'The reference image' and 'the identity reference' below both mean Image 1. Make ONE tall portrait image "
          "(about 1024x2304), one figure.]\n\n")

HDR_MM = ("[ChatGPT: attach Image 1 = her identity / face reference (Magnific KLpSlnEkqp, m05) and Image 2 = her 36-year-old "
          "picture (Magnific BhNUblSoQR) = 'the second reference' of the STYLE LOCK; 'the reference portraits' means both images. "
          "Make ONE tall portrait image (about 1024x2304), one figure.]\n\n")

TC_COLLAR_OLD = ('a sleeveless embroidered over-vest with a stand collar closed by a small knot button, with a band of '
                 'gold-edged trim down the front, worn over a crossed-collar inner robe')
# nhất v2 collar sentence (owner L1465: "che kín giống như bên Nhất đẳng") + thin collar edge of her colour + job 4 shoulders
TC_COLLAR_NEW = ('a LONG sleeveless embroidered over-vest with a straight upright standing collar, the vest closed edge to edge '
                 'all the way from the collar down to the waist, with NO knot button at the throat, NO gap, NO V-opening and NO '
                 'slit below the collar, so it fully covers the inner robe at the chest; only a thin edge of the inner robe\'s own '
                 'collar shows just above and inside the vest\'s standing collar at the neck, with a band of gold-edged trim down '
                 'the front, worn over a crossed-collar inner robe' + VEST_SHOULDER)
TC_PLACE = (' COLOUR PLACEMENT (cung nữ thân cận, exactly as in Image 2): the long sleeveless over-vest with its two front '
            'panels (hai tà) and the WHOLE wide sleeves, blue all the way down, are the palace maid uniform colour powder blue '
            'like #A7BAD2; the long INNER robe and the skirt are her OWN colour deep rose like #CA7281 (her own main colour is '
            'the same blue as the uniform, so her own secondary colour deep rose is used); the broad embroidered cuff border '
            'bands at the sleeve ends are deep rose, the sash is deep rose, and the thin edge of the inner robe\'s collar '
            'showing at the vest\'s collar is deep rose.')


def thancan():
    base = 'dev/art/maid7/test_mama.txt'
    t = open(base, encoding='utf-8').read()
    t = swap(t, 'A palace ma ma (ma ma, a senior woman of the palace staff)',
             'A trusted personal palace maid (cung nữ thân cận, the close personal attendant of her mistress)')
    t = swap(t, TC_COLLAR_OLD, TC_COLLAR_NEW)
    t = swap(t, 'RECOLOUR the whole costume to her colour powder blue', 'RECOLOUR the outer layers to the colour powder blue')
    t = swap(t, 'never a single flat colour all over; gold or silver only as thin accents, never a third colour.',
             'never a single flat colour all over; gold or silver only as thin accents, never a third colour.' + TC_PLACE)
    t = HDR_TC + t.rstrip() + CAP.format('Cung nữ thân cận · Áo ghi lê dài xanh + áo trong hồng')
    out = D + 'thancan_gpt_v2.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('A palace ma ma (ma ma, a senior woman of the palace staff)', 'owner Lượt 1352/1465: ma ma -> cung nữ thân cận'),
                     ('a sleeveless embroidered over-vest with a stand collar closed by a small knot button', 'owner Lượt 1465: vest closed like nhất đẳng (nhất v2 collar sentence)'),
                     ('RECOLOUR the whole costume to her colour powder blue', 'owner Lượt 1465: outer = blue, inner = her colour (K26)')])
    return out


def mama(age):
    base = 'dev/handover/reports/mama-specs/m05-%s.styleref.r55.prompt.txt' % age
    t = open(base, encoding='utf-8').read()
    t = swap(t, 'ALL her hair pinned UP in a neat bun (chignon) with her hairpins,',
             'ALL her hair pinned UP in a neat bun (chignon) ' + SENIOR_PINS + ',')
    t = HDR_MM + t.rstrip() + CAP.format('Ma ma · Áo ghi lê hai tà đỏ san hô + váy xanh ngọc')
    out = D + 'mama_gpt_v2_%s.txt' % age
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('with her hairpins', 'owner Lượt 1456: ma ma hairpins not fewer than the young maids (-> richer set)')])
    return out


def mama51(): return mama('a51')
def mama65(): return mama('a65')


if __name__ == '__main__':
    jobs = sys.argv[1:] or ['nhat', 'chuongsu', 'thancan', 'mama51', 'mama65']
    for j in jobs:
        p = globals()[j]()
        print(p, len(open(p, encoding='utf-8').read()))
