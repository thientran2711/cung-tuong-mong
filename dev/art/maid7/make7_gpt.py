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
    # family fix (Foreman C 21:43Z, owner L1476): soft shoulder sentence instead of job-4 VEST_SHOULDER
    t = swap(t, 'with a band of gold-edged trim down the front, worn over the inner robe',
             'with a band of gold-edged trim down the front, worn over the inner robe' + TC_SOFT_SHOULDER)
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


HDR_M18 = ("[ChatGPT: attach Image 1 = m18 face reference (the same single reference used on Magnific, s7IPw0Ll8e). "
           "'The reference image' and 'the identity reference' below both mean Image 1. Make ONE tall portrait image "
           "(about 1024x2304), one figure.]\n\n")


def tamdang():
    # owner L1470: tam đẳng outer top looks thin/flimsy -> same real outer jacket as nhị đẳng (test5_nhi bijia), only SHORTER
    base = 'dev/art/maid7/test3_tm1.txt'
    t = open(base, encoding='utf-8').read()
    t = swap(t, 'with a SMALL SHORT outer top on top: a short jacket with short outer sleeves that ends just below the waist, '
                'clearly smaller and shorter than a nhị đẳng maid\'s half-sleeve jacket',
             'with a SHORT outer jacket on top: a layered half-sleeve brocade jacket (bijia) exactly like a nhị đẳng maid\'s, '
             'the same real outer jacket with the same weight, body and structure (a proper jacket, never thin, flimsy or see-through), '
             'only SHORTER than the nhị đẳng\'s, ending just below the waist')
    t = HDR_M18 + t.rstrip() + CAP.format('Cung nữ tam đẳng · Áo khoác bỉ giáp ngắn hồng + váy xanh')
    out = D + 'tamdang_gpt.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('with a SMALL SHORT outer top on top', 'owner Lượt 1470: outer top too flimsy -> nhị đẳng jacket'),
                     ('a short jacket with short outer sleeves that ends just below the waist', 'owner Lượt 1470: = nhị đẳng bijia, only shorter'),
                     ('clearly smaller and shorter than a nhị đẳng maid\'s half-sleeve jacket', 'owner Lượt 1470: "chẳng qua là nó ngắn hơn thôi" (only shorter)')])
    return out


NHAT_V2_COLLAR = ('a sleeveless embroidered over-vest with a straight upright standing collar, the vest closed edge to edge all '
                  'the way from the collar down to the waist, with NO knot button at the throat, NO gap, NO V-opening and NO slit '
                  'below the collar, so it fully covers the inner robe at the neck and chest (none of the inner robe shows at the '
                  'neck or chest), with a band of gold-edged trim down the front, worn over the inner robe')
# owner L1474: the collar of nhất đẳng round 2 (Lw8auqkswO, test2_nhat). Its prompt words = the round-5 words, so the look is
# written out from the picture: tall stand collar + one knot button, vest edges close together, narrow slim-V of layered inner collars.
NHAT_R2_COLLAR = ('a sleeveless embroidered over-vest with a TALL upright stand (mandarin) collar that wraps closely around the neck '
                  'and is fastened at the throat with ONE small knot button; below the button the two straight front edges of the '
                  'vest run down side by side, CLOSE together, leaving only a NARROW straight opening down to the sash (never a '
                  'wide gap, never a wide V), and inside that narrow opening the neat layered crossed collars of the inner robe '
                  '(with a thin light inner edge) show as a slim V just under the button, the inner robe\'s crossed collar also '
                  'rising neatly inside the stand collar at the neck, with a band of gold-edged trim down the front, worn over a '
                  'crossed-collar inner robe')


def nhat3():
    base = D + 'nhat_gpt_v2.txt'
    t = open(base, encoding='utf-8').read()
    t = swap(t, NHAT_V2_COLLAR, NHAT_R2_COLLAR)
    out = D + 'nhat_gpt_v3.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('the vest closed edge to edge all the way from the collar down to the waist', 'owner Lượt 1474: round-2 collar replaces the closed collar'),
                     ('with NO knot button at the throat', 'owner Lượt 1474: round-2 collar (knot button)'),
                     ('NO gap', 'owner Lượt 1474'),
                     ('NO V-opening and NO slit below the collar', 'owner Lượt 1474: round-2 collar (narrow slim V)'),
                     ('so it fully covers the inner robe at the neck and chest', 'owner Lượt 1474'),
                     ('none of the inner robe shows at the neck or chest', 'owner Lượt 1474'),
                     ('a sleeveless embroidered over-vest with a straight upright standing collar', 'owner Lượt 1474'),
                     ('worn over the inner robe', 'owner Lượt 1474: -> worn over a crossed-collar inner robe (round-2 words)')])
    return out


# owner L1475 (round-2 collar for thân cận too) + L1476 (v2 fabric not soft like round 1)
TC_R2_COLLAR = ('a sleeveless embroidered over-vest with a TALL upright stand (mandarin) collar that wraps closely around the neck '
                'and is fastened at the throat with ONE small knot button; below the button the two straight front edges of the '
                'vest run down side by side, CLOSE together, leaving only a NARROW straight opening down to the sash (never a '
                'wide gap, never a wide V), and inside that narrow opening the neat layered crossed collars of the inner robe in '
                'her own colour (with a thin light inner edge) show as a slim V just under the button, the inner robe\'s crossed '
                'collar also rising neatly inside the stand collar at the neck, with a band of gold-edged trim down the front, '
                'worn over a crossed-collar inner robe')
TC_SOFT_SHOULDER = (', the vest only slightly crisp and neat right AT the shoulder line (not clinging to or hugging the shoulder), '
                    'while the rest of the vest, its two front panels and the sleeves stay the same soft, thin, light, flowing silk '
                    'as the rest of the outfit, draping, swaying and trailing softly (thướt tha), never stiff, padded, flat or board-like')


def thancan3():
    base = D + 'thancan_gpt_v2.txt'
    t = open(base, encoding='utf-8').read()
    t = swap(t, TC_COLLAR_NEW, TC_R2_COLLAR + TC_SOFT_SHOULDER)
    t = swap(t, 'the long sleeveless over-vest with its two front panels (hai tà) and the WHOLE wide sleeves, blue all the way down, are',
             'the sleeveless over-vest, the TWO separate soft front panels (hai tà) hanging from the waist and the wide LAYERED sleeves '
             '(every soft layer of each sleeve, all the way down) are')
    out = D + 'thancan_gpt_v3.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('a LONG sleeveless embroidered over-vest with a straight upright standing collar', 'owner L1475 round-2 collar; L1476 "LONG" made it a stiff coat'),
                     ('the vest closed edge to edge all the way from the collar down to the waist', 'owner L1475: round-2 collar'),
                     ('with NO knot button at the throat', 'owner L1475: round-2 collar has the knot button'),
                     ('NO gap', 'owner L1475'),
                     ('NO V-opening and NO slit below the collar', 'owner L1475: round-2 slim V'),
                     ('so it fully covers the inner robe at the chest', 'owner L1475'),
                     ("only a thin edge of the inner robe's own collar shows just above and inside the vest's standing collar at the neck", 'owner L1475: now the slim V of her colour'),
                     ('the over-vest cut from a firmer', 'owner L1476: stiff fabric -> only the shoulder line crisp'),
                     ('lightly stiffened brocade with crisp', 'owner L1476'),
                     ('slightly structured shoulders that keep a clean straight shoulder line and sit a little away from her shoulders', 'owner L1476'),
                     ('never clinging to or hugging the shoulder', 'owner L1476: -> not clinging to or hugging the shoulder'),
                     ('never padded or boxy', 'owner L1476: -> never stiff, padded, flat or board-like'),
                     ('the long sleeveless over-vest with its two front panels', 'owner L1476/L1477: no LONG coat-like vest, separate tà'),
                     ('and the WHOLE wide sleeves', 'owner L1477: layered sleeves, not one solid sleeve (still all blue)'),
                     ('blue all the way down', 'owner L1477: -> every soft layer of each sleeve, all the way down')])
    return out


if __name__ == '__main__':
    jobs = sys.argv[1:] or ['nhat', 'chuongsu', 'thancan', 'mama51', 'mama65', 'tamdang', 'nhat3', 'thancan3']
    for j in jobs:
        p = globals()[j]()
        print(p, len(open(p, encoding='utf-8').read()))
