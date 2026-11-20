#!/usr/bin/env python3
"""MAIDP2 (owner Lượt 1456/1457): v2 ChatGPT maid prompts. Every swap asserted exactly once.
Run from repo root: python3 dev/art/maid7/make7_gpt.py [nhat chuongsu thancan mama]
"""
import sys, os, re
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


# owner L1483: caption garbled -> rank name ONLY + exact-spelling clause (family fix, all v3 maid gpt files + tamdang)
CAP2 = ('\n\nCAPTION: in LARGE bold letters, top-left corner, on the plain background, never over her body, write exactly this '
        'Vietnamese text WITH accents, spelling every Vietnamese letter and accent mark exactly, with no extra or wrong marks: "{}"')


def fixcap(t, rank):
    t2, n = re.subn(r'\n\nCAPTION: [^\n]*$', '', t.rstrip())
    assert n <= 1, n
    return t2 + CAP2.format(rank)


def oldcap(path):
    m = re.search(r'write exactly this Vietnamese text WITH accents: "([^"]*)"', open(path, encoding='utf-8').read())
    return [(m.group(1), 'owner Lượt 1483: caption = rank name only (garbled long caption)')] if m else []


# owner L1503/L1507 / K27: below Tần only SMALL fine embroidered flowers (clause after the file's own embroidery wording)
def k27(t, anchor, garments):
    return swap(t, anchor, anchor + ' all embroidered flowers and motifs (on ' + garments + ') are SMALL and fine, never large flowers;')


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
    # owner L1501: the jacket hem carries the same embroidered flower band as its collar and cuffs
    t = swap(t, 'only a narrow band of small embroidered flowers along the collar edge and the edges of the short outer sleeves,',
             'only a narrow band of small embroidered flowers along the collar edge, the edges of the short outer sleeves and the '
             'whole bottom HEM edge of the short outer jacket (the same flower band as on its collar and cuffs),')
    t = k27(t, 'in a lighter tone, no embroidery elsewhere;', "the collar, the jacket's sleeve edges and hem, and the skirt hem band")
    t = fixcap(t, 'Cung nữ tam đẳng')
    out = D + 'tamdang_gpt.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('with a SMALL SHORT outer top on top', 'owner Lượt 1470: outer top too flimsy -> nhị đẳng jacket'),
                     ('a short jacket with short outer sleeves that ends just below the waist', 'owner Lượt 1470: = nhị đẳng bijia, only shorter'),
                     ('clearly smaller and shorter than a nhị đẳng maid\'s half-sleeve jacket', 'owner Lượt 1470: "chẳng qua là nó ngắn hơn thôi" (only shorter)'),
                     ('only a narrow band of small embroidered flowers along the collar edge and the edges of the short outer sleeves', 'owner Lượt 1501: + jacket hem band (same as collar/cuffs)')])
    return out


NHAT_V2_COLLAR = ('a sleeveless embroidered over-vest with a straight upright standing collar, the vest closed edge to edge all '
                  'the way from the collar down to the waist, with NO knot button at the throat, NO gap, NO V-opening and NO slit '
                  'below the collar, so it fully covers the inner robe at the neck and chest (none of the inner robe shows at the '
                  'neck or chest), with a band of gold-edged trim down the front, worn over the inner robe')
# owner L1486 (supersedes the L1474 slim-V text): closed edge to edge below the knot button.
# owner L1474: the collar of nhất đẳng round 2 (Lw8auqkswO, test2_nhat). Its prompt words = the round-5 words, so the look is
# written out from the picture: tall stand collar + one knot button, vest edges close together, narrow slim-V of layered inner collars.
NHAT_R2_COLLAR = ("a sleeveless embroidered over-vest with a TALL upright stand (mandarin) collar that wraps closely around the neck and is fastened at the throat with ONE small knot button; from the button the vest's two front edges MEET EDGE TO EDGE and stay closed all the way down to the waist sash, one smooth closed front like a straight upright standing-collar robe, with NO gap, NO slit, NO V-opening and NO inner robe visible on the chest; the inner robe's collar shows ONLY as a thin line just above the stand collar at the neck, with a band of gold-edged trim down the front, worn over a crossed-collar inner robe")


def nhat3():
    base = D + 'nhat_gpt_v2.txt'
    t = open(base, encoding='utf-8').read()
    t = swap(t, NHAT_V2_COLLAR, NHAT_R2_COLLAR)
    t = k27(t, 'delicate cream-and-blush peony and plum-blossom embroidery over the vest, sleeves, panel and hem;', 'the robe, vest, front panels, cuffs and skirt hem band')
    t = fixcap(t, 'Cung nữ nhất đẳng')
    out = D + 'nhat_gpt_v3.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, oldcap(base) + [('the vest closed edge to edge all the way from the collar down to the waist', 'owner Lượt 1474: round-2 collar replaces the closed collar'),
                     ('with NO knot button at the throat', 'owner Lượt 1474: round-2 collar (knot button)'),
                     ('NO gap', 'owner Lượt 1474'),
                     ('NO V-opening and NO slit below the collar', 'owner Lượt 1474: round-2 collar (narrow slim V)'),
                     ('so it fully covers the inner robe at the neck and chest', 'owner Lượt 1474'),
                     ('none of the inner robe shows at the neck or chest', 'owner Lượt 1474'),
                     ('a sleeveless embroidered over-vest with a straight upright standing collar', 'owner Lượt 1474'),
                     ('worn over the inner robe', 'owner Lượt 1474: -> worn over a crossed-collar inner robe (round-2 words)')])
    return out


# owner L1475 (round-2 collar for thân cận too) + L1476 (v2 fabric not soft like round 1)
TC_R2_COLLAR = ("a sleeveless embroidered over-vest with a TALL upright stand (mandarin) collar that wraps closely around the neck and is fastened at the throat with ONE small knot button; from the button the vest's two front edges MEET EDGE TO EDGE and stay closed all the way down to the waist sash, one smooth closed front like a straight upright standing-collar robe, with NO gap, NO slit, NO V-opening and NO inner robe visible on the chest; the inner robe's collar in her own colour shows ONLY as a thin line just above the stand collar at the neck, with a band of gold-edged trim down the front, worn over a crossed-collar inner robe")
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
    t = k27(t, 'delicate cream-and-blush peony and plum-blossom embroidery over the vest, sleeves, panel and hem;', 'the robe, vest, front panels, cuffs and skirt hem band')
    t = fixcap(t, 'Cung nữ thân cận')
    out = D + 'thancan_gpt_v3.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, oldcap(base) + [('a LONG sleeveless embroidered over-vest with a straight upright standing collar', 'owner L1475 round-2 collar; L1476 "LONG" made it a stiff coat'),
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


# owner L1478: chưởng sự embroidery only on edges (sleeve cuffs, borders, hems), plain body
CS_EMB_OLD = ("RICH embroidery, clearly MORE and denser than a first-rank maid's (nhất đẳng): broad bands of dense peony and "
              "plum-blossom embroidery on the collar band, along both front-edge borders, on wide embroidered cuff bands and along "
              "the coat hem and the skirt hem, plus embroidered flower sprays scattered over the whole coat body, the sleeves and "
              "the front of the inner skirt, in lighter tones of purple and deep rose with fine gold thread (embroidery, never brocade);")
CS_EMB_NEW = ("RICH border embroidery, clearly richer than a first-rank maid's (nhất đẳng) borders, but ONLY on the edges: broad bands "
              "of dense peony and plum-blossom embroidery on the collar band, along both front-edge borders, on wide embroidered cuff "
              "bands of the sleeves and along the coat hem border and the skirt hem, in lighter tones of purple and deep rose with "
              "fine gold thread (embroidery, never brocade); the coat body, the middle of the sleeves and the middle of the skirt stay "
              "PLAIN with NO embroidery in the middle of the cloth (never flower sprays scattered over the body, never like a consort's robe);")


def chuongsu3():
    # built from the CURRENT chuongsu_gpt_v2.txt on disk
    base = D + 'chuongsu_gpt_v2.txt'
    t = open(base, encoding='utf-8').read()
    t = swap(t, CS_EMB_OLD, CS_EMB_NEW)
    t = k27(t, 'with fine gold thread (embroidery, never brocade);', 'the collar band, front-edge borders, sleeve cuff bands, coat hem border and skirt hem')
    t = fixcap(t, 'Chưởng sự cô cô')
    out = D + 'chuongsu_gpt_v3.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, oldcap(base) + [("RICH embroidery", 'owner Lượt 1478: -> RICH border embroidery, edges only'),
                     ("clearly MORE and denser than a first-rank maid's", 'owner Lượt 1478: thêu nhiều quá như phi tần'),
                     ('on wide embroidered cuff bands and along the coat hem and the skirt hem', 'owner Lượt 1478: kept as cuff bands of the sleeves + coat hem border + skirt hem'),
                     ('plus embroidered flower sprays scattered over the whole coat body', 'owner Lượt 1478: không thêu trên thân áo'),
                     ('the sleeves and the front of the inner skirt', 'owner Lượt 1478: không thêu giữa vải')])
    return out


# owner L1479: ma ma collar = the round-2 nhất collar; L1480: only vest + long robe, NO short/half-sleeve layer
MM_TWO = (" Exactly two garments: a sleeveless vest over a long robe with long sleeves; NO short-sleeved or half-sleeved layer, "
          "no extra jacket.")


def mama3(age):
    # built from the CURRENT mama_gpt_v2_<age>.txt on disk (it carries Foreman C's L1473 no-near-3D fix) - never rebuild v2
    base = D + 'mama_gpt_v2_%s.txt' % age
    t = open(base, encoding='utf-8').read()
    t = swap(t, TC_COLLAR_OLD, NHAT_R2_COLLAR)
    t = swap(t, 'wide layered sleeves hanging softly, each with a broad embroidered cuff band',
             'the long robe\'s own wide long sleeves hanging softly in ONE single layer, each with a broad embroidered cuff band')
    t = swap(t, "(never a consort's long trailing sleeves). COLOUR RULE",
             "(never a consort's long trailing sleeves)." + MM_TWO + " COLOUR RULE")
    t = fixcap(t, 'Ma ma')
    out = D + 'mama_gpt_v3_%s.txt' % age
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, oldcap(base) + [('a sleeveless embroidered over-vest with a stand collar closed by a small knot button', 'owner Lượt 1479: ma ma collar = round-2 nhất collar'),
                     ('wide layered sleeves hanging softly', 'owner Lượt 1480: "layered" invites an extra short-sleeve layer -> one single layer')])
    return out


def mama3_51(): return mama3('a51')
def mama3_65(): return mama3('a65')


# owner L1493: ma ma still 3D/realistic -> master style block (copied verbatim from nhat_gpt_v3) replaces B's own style lines
HDR_MM4 = ("[ChatGPT: attach Image 1 = her face reference (Magnific KLpSlnEkqp, m05). 'The reference image' and 'the identity "
           "reference' below both mean Image 1. Make ONE tall picture (about 1024x2304), one figure.]\n\n")
MM_STYLELOCK_OLD = ("STYLE LOCK (same drawing as her 36-year-old picture, the second reference): exactly the same soft painterly "
                    "guofeng illustration rendering, the same smooth luminous painted skin, soft stylised features and gentle painted "
                    "shading as the 36-year-old picture; her age shows ONLY through the silver in her hair and a few soft painted "
                    "lines, NEVER photographic, NEVER photo-realistic, no realistic skin texture, no pores, no detailed wrinkles.")
MM_AGE_NEW = "Her age shows ONLY through the silver in her hair and a few soft painted lines."


def master_block():
    n = open(D + 'nhat_gpt_v3.txt', encoding='utf-8').read()
    return n[n.index('\n\n') + 2:n.index(' A first-rank palace maid')]


def mama4(age):
    base = D + 'mama_gpt_v3_%s.txt' % age
    t = open(base, encoding='utf-8').read()
    body = t[t.index('\n\n') + 2:]
    b_open = body[:body.index(' A palace ma ma')]
    body = master_block() + body[len(b_open):]
    body = swap(body, MM_STYLELOCK_OLD, MM_AGE_NEW)
    body = swap(body, ', with small earrings;', ';')   # master "Bare earlobes, no earrings" (NOEAR)
    # owner L1503 / K27: below Tần only SMALL fine embroidered flowers
    body = swap(body, 'delicate cream-and-blush peony and plum-blossom embroidery over the vest, sleeves, panel and hem;',
                'delicate cream-and-blush peony and plum-blossom embroidery over the vest, sleeves, panel and hem; all embroidered '
                'flowers and motifs (on the robe, vest, panels, hem band and cuffs) are SMALL and fine, never large flowers;')
    t = HDR_MM4 + body
    out = D + 'mama_gpt_v4_%s.txt' % age
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('exactly matching the rendering of the reference portraits', 'owner Lượt 1493: B style line -> master style block'),
                     ('soft natural light and fine detail', 'owner Lượt 1493: B style line removed'),
                     ('never semi-realistic', 'owner Lượt 1493: B style line -> master block (NOT a photo, NOT a realistic real person, NOT 3D)'),
                     ('never photographic', 'owner Lượt 1493'),
                     ('smooth airbrushed painted shading', 'owner Lượt 1493: master block says smooth airbrushed painting'),
                     ('STYLE LOCK', 'owner Lượt 1493: style lock to the near-3D a36 picture removed (Image 2 dropped)'),
                     ('same drawing as her 36-year-old picture', 'owner Lượt 1493'),
                     ('the second reference', 'owner Lượt 1493'),
                     ('exactly the same soft painterly guofeng illustration rendering', 'owner Lượt 1493'),
                     ('the same smooth luminous painted skin', 'owner Lượt 1493'),
                     ('soft stylised features and gentle painted shading as the 36-year-old picture', 'owner Lượt 1493'),
                     ('her age shows ONLY through the silver in her hair and a few soft painted lines', 'owner Lượt 1493: kept as its own sentence (Her age shows ONLY …)'),
                     ('NEVER photographic', 'owner Lượt 1493'),
                     ('NEVER photo-realistic', 'owner Lượt 1493'),
                     ('no realistic skin texture', 'owner Lượt 1493'),
                     ('no pores', 'owner Lượt 1493'),
                     ('no detailed wrinkles', 'owner Lượt 1493'),
                     ('with small earrings', 'master block NOEAR: Bare earlobes, no earrings'),
                     ('attach Image 1 = her identity / face reference', 'owner Lượt 1493: header -> Image 1 only (style + face)'),
                     ('and Image 2 = her 36-year-old picture', 'owner Lượt 1493: near-3D a36 ref dropped'),
                     ("'the reference portraits' means both images", 'owner Lượt 1493'),
                     ('Make ONE tall portrait image', 'owner Lượt 1493: no "portrait" word -> tall picture')])
    return out


def mama4_51(): return mama4('a51')
def mama4_65(): return mama4('a65')


# ===== MAIDP3: owner L1518 (C #11 22:39Z) =====
# (c) nhị collar: square -> crossed (cổ xéo). Neither test5_nhi nor tamdang_gpt names a collar in words; tam's crossed collar
#     is written from the tam picture aFGdKgifSh (sheet_L1512).
NHI_CROSSED = ("with a CROSSED collar (cổ xéo, jiaoling) exactly like a tam đẳng maid's jacket: the jacket's two front edges "
               "cross over the chest in one clean diagonal wrap, the left front over the right, forming a y-shape at the neck, "
               "with the inner robe's crossed collar showing as a thin line inside it; never a square, straight-down or upright "
               "stand collar")
# (b) nhị: only ONE sleeve layer (her round-5 picture gOm5NnCSXO had two stacked half-sleeve tiers)
NHI_ONE_SLEEVE = ("its half-sleeves ONLY ONE single layer (one short half-sleeve over the inner robe's long sleeve, never two or "
                  "more stacked, tiered or ruffled half-sleeve layers)")
# (d) thân cận collar -> nhị's current SQUARE collar. test5_nhi has no collar words either; written from the nhị picture
#     gOm5NnCSXO (sheet_L1512).
TC_SQUARE_COLLAR = ("a sleeveless embroidered over-vest with a SQUARE collar (cổ vuông, fangling): a flat embroidered collar band "
                    "that runs straight down from each side of the neck and turns at a right angle, framing a square opening at "
                    "the upper chest, inside which the inner robe's crossed collar in her own colour shows; below the square "
                    "opening the vest's two front edges meet edge to edge, closed with one small knot button, never a tall "
                    "upright stand collar, with a band of gold-edged trim down the front, worn over a crossed-collar inner robe")
# (e) nhất: + ONE shorter front panel on top of the two long ones
NHAT_TA_NGAN = (" and ON TOP of these two long front panels ONE more SHORTER front panel (tà ngắn): a single short embroidered "
                "panel with a gold-edged border hanging at the centre front from the waist sash, about half as long as the long "
                "panels, so TWO layers of front panels are clearly visible at the front (the short top panel over the two long ones),")


def nhi():
    base = 'dev/art/maid7/test5_nhi.txt'
    t = open(base, encoding='utf-8').read()
    # (a) unify fabric + rose words with tam/nhất (tam đẳng's words verbatim: same jacket family)
    t = swap(t, 'a fine silk ruqun in powder blue, with narrow embroidered',
             'a fine silk ruqun, the long inner robe and skirt in powder blue like #A7BAD2, with narrow embroidered')
    t = swap(t, 'a layered half-sleeve brocade jacket (bijia) on top in deep rose like #CA7281,',
             'a half-sleeve brocade jacket (bijia) on top in deep rose like #CA7281, '
             'made of the SAME fine silk brocade with a soft sheen as the outer jacket of the higher maids (never a plainer or '
             'duller cloth), ' + NHI_ONE_SLEEVE + ', ' + NHI_CROSSED + '; so the main and the secondary colour are both clearly visible;')
    t = swap(t, 'her main colour powder blue like #A7BAD2 on the ruqun (the long skirt, the inner robe and its long sleeves), '
                'her secondary colour deep rose like #CA7281 on the whole half-sleeve outer jacket (bijia), both clearly visible.',
             'her main colour powder blue on the inner robe and skirt, her secondary colour deep rose clearly visible on the outer jacket.')
    t = k27(t, '(a little more embroidery than a tam đẳng maid),', 'the collar, cuffs, jacket and skirt hem band')
    t = HDR_M18 + t.rstrip()
    t = fixcap(t, 'Cung nữ nhị đẳng')
    out = D + 'nhi_gpt.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('a fine silk ruqun in powder blue', 'owner Lượt 1518: fabric/colour words = tam đẳng (one common text)'),
                     ('a layered half-sleeve brocade jacket (bijia) on top in deep rose like #CA7281', 'owner Lượt 1518: ONE sleeve layer only (no "layered")'),
                     ('her main colour powder blue like #A7BAD2 on the ruqun', 'owner Lượt 1518: rose/colour words = tam đẳng verbatim'),
                     ('the long skirt', 'owner Lượt 1518: -> tam words "on the inner robe and skirt"'),
                     ('the inner robe and its long sleeves', 'owner Lượt 1518'),
                     ('her secondary colour deep rose like #CA7281 on the whole half-sleeve outer jacket', 'owner Lượt 1518: -> tam words'),
                     ('both clearly visible', 'owner Lượt 1518: -> tam words "so the main and the secondary colour are both clearly visible"')])
    return out


def thancan4():
    base = D + 'thancan_gpt_v3.txt'
    t = open(base, encoding='utf-8').read()
    t = swap(t, TC_R2_COLLAR, TC_SQUARE_COLLAR)
    t = swap(t, "and the thin edge of the inner robe's collar showing at the vest's collar is deep rose.",
             "and the inner robe's crossed collar showing inside the square collar opening is deep rose.")
    out = D + 'thancan_gpt_v4.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('a sleeveless embroidered over-vest with a TALL upright stand', 'owner Lượt 1518: square collar'),
                     ('with a TALL upright stand (mandarin) collar that wraps closely around the neck and is fastened at the throat with ONE small knot button', 'owner Lượt 1518: thân cận collar -> nhị\'s square collar'),
                     ("from the button the vest's two front edges MEET EDGE TO EDGE and stay closed all the way down to the waist sash", 'owner Lượt 1518'),
                     ('one smooth closed front like a straight upright standing-collar robe', 'owner Lượt 1518'),
                     ('with NO gap', 'owner Lượt 1518'), ('NO slit', 'owner Lượt 1518'), ('NO V-opening and NO inner robe visible on the chest', 'owner Lượt 1518: square opening shows the inner collar'),
                     ("the inner robe's collar in her own colour shows ONLY as a thin line just above the stand collar at the neck", 'owner Lượt 1518'),
                     ("and the thin edge of the inner robe's collar showing at the vest's collar is deep rose", 'owner Lượt 1518: same deep rose, now inside the square opening')])
    return out


def nhat4():
    base = D + 'nhat_gpt_v3.txt'
    t = open(base, encoding='utf-8').read()
    t = swap(t, 'the centre front of the skirt showing between them,', 'the centre front of the skirt showing between them,' + NHAT_TA_NGAN)
    t = swap(t, 'the sleeveless over-vest and its two front panels are deep rose.',
             'the sleeveless over-vest, its two long front panels and the short top front panel are deep rose.')
    out = D + 'nhat_gpt_v4.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('the sleeveless over-vest and its two front panels are deep rose', 'owner Lượt 1518: + short top panel (tà ngắn), also deep rose')])
    return out



# ===== MAIDP3: owner L1528 — nhi_gpt v1 came out like tam đẳng ("I said the COLLAR like tam, not the whole outfit") =====
# v1 culprits: "exactly like a tam đẳng maid's jacket" in the collar clause + tam's colour-placement sentence. v2: ONLY the 5 asked changes.
NHI2_CROSSED = ("with a CROSSED collar (cổ xéo, jiaoling): the jacket's two front edges cross over the chest in one clean diagonal "
                "wrap, the left front over the right, forming a y-shape at the neck, with the inner robe's crossed collar showing as "
                "a thin line inside it; never a square, straight-down or upright stand collar")
# test5_nhi has NO words for the two short tà; written from the owner-approved nhị picture gOm5NnCSXO so they are not lost
NHI2_TWO_TA = ("below the sash the jacket's front hangs down in TWO small SHORT separate front flaps (two short tà), one on each side "
               "of the centre, ending around the upper thigh over the skirt")


def nhi2():
    base = 'dev/art/maid7/test5_nhi.txt'
    t = open(base, encoding='utf-8').read()
    # (3) fabric + colour words = shared words (tam/nhất: same hex, same brocade cloth); no tam jacket shape
    t = swap(t, 'a fine silk ruqun in powder blue, with narrow embroidered',
             'a fine silk ruqun, the long inner robe and skirt in powder blue like #A7BAD2, with narrow embroidered')
    # (1) crossed collar  (2) ONE sleeve layer  (3) shared brocade fabric words; nhị's own two short tà kept explicit
    t = swap(t, 'a layered half-sleeve brocade jacket (bijia) on top in deep rose like #CA7281,',
             'a half-sleeve brocade jacket (bijia) on top in deep rose like #CA7281, made of the SAME fine silk brocade with a soft '
             'sheen as the outer jacket of the higher maids (never a plainer or duller cloth), ' + NHI_ONE_SLEEVE + ', '
             + NHI2_CROSSED + '; ' + NHI2_TWO_TA + ';')
    # (4) K27
    t = k27(t, '(a little more embroidery than a tam đẳng maid),', 'the collar, cuffs, jacket and skirt hem band')
    # (5) header + caption
    t = HDR_M18 + t.rstrip()
    t = fixcap(t, 'Cung nữ nhị đẳng')
    out = D + 'nhi_gpt_v2.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('a fine silk ruqun in powder blue', 'owner Lượt 1518/1528: shared colour words (+ #A7BAD2)'),
                     ('a layered half-sleeve brocade jacket (bijia) on top in deep rose like #CA7281', 'owner Lượt 1518: ONE sleeve layer only (no "layered")')])
    return out



# ===== MAIDP3: owner L1542 (C #12) — chưởng sự + ma ma wear the CURRENT thân cận outfit; thân cận = each grade, colours swapped + square collar =====
def tc_outfit():
    """Garment words of thancan_gpt_v4 (from the robe to the small-flower clause), verbatim."""
    t = open(D + 'thancan_gpt_v4.txt', encoding='utf-8').read()
    a = t.index('a long robe of fine embroidered silk brocade')
    b = t.index('never large flowers;', a) + len('never large flowers;')
    return t[a:b]


def chuongsu4():
    base = D + 'chuongsu_gpt_v3.txt'
    t = open(base, encoding='utf-8').read()
    a = t.index('a knee-length outer coat')
    b = t.index('never like a consort\'s robe);', a) + len('never like a consort\'s robe);')
    old = t[a:b]
    t = t[:a] + tc_outfit() + t[b:]
    t = swap(t, 'Outfit (the palace mistress of servants, design D):', 'Outfit (the palace mistress of servants):')
    out = D + 'chuongsu_gpt_v4.txt'
    open(out, 'w', encoding='utf-8').write(t)
    allows = [('design D', 'owner Lượt 1542: coat design D replaced by the thân cận outfit')]
    for frag in re.split(r'[;,()]', old):
        frag = frag.strip()
        if len(frag.split()) >= 3:
            allows.append((frag, 'owner Lượt 1542: chưởng sự wears the current thân cận outfit (old coat words)'))
    keep(out, base, allows)
    return out


def mama5(age):
    base = D + 'mama_gpt_v4_%s.txt' % age
    t = open(base, encoding='utf-8').read()
    a = t.index('a long robe of fine embroidered silk brocade')
    b = t.index('never large flowers;', a) + len('never large flowers;')
    old = t[a:b]
    t = t[:a] + tc_outfit() + t[b:]
    out = D + 'mama_gpt_v5_%s.txt' % age
    open(out, 'w', encoding='utf-8').write(t)
    allows = []
    for frag in re.split(r'[;,()]', old):
        frag = frag.strip()
        if len(frag.split()) >= 3 and frag not in tc_outfit():
            allows.append((frag, 'owner Lượt 1542: ma ma wears the current thân cận outfit'))
    keep(out, base, allows)
    return out


def mama5_51(): return mama5('a51')
def mama5_65(): return mama5('a65')


def swapcol(t):
    """Swap MAIN <-> SECONDARY colours (powder blue #A7BAD2 <-> deep rose #CA7281)."""
    for a, b in [('powder blue', '\0PB'), ('deep rose', '\0DR'), ('#A7BAD2', '\0HA'), ('#CA7281', '\0HC')]:
        t = t.replace(a, b)
    for a, b in [('\0PB', 'deep rose'), ('\0DR', 'powder blue'), ('\0HA', '#CA7281'), ('\0HC', '#A7BAD2')]:
        t = t.replace(a, b)
    return t


# thancan_gpt_v4 square-collar words, said of the grade's own outer garment
def sq_collar(garment):
    return ("a SQUARE collar (cổ vuông, fangling): a flat embroidered collar band that runs straight down from each side of the "
            "neck and turns at a right angle, framing a square opening at the upper chest, inside which the inner robe's crossed "
            "collar shows; below the square opening the %s's two front edges meet edge to edge, closed with one small knot button, "
            "never a tall upright stand collar" % garment)


def tc_cap(t, rank):
    return fixcap(t, rank + ' · thân cận')


def tamdang_tc():
    base = D + 'tamdang_gpt.txt'
    t = swapcol(open(base, encoding='utf-8').read())
    t = swap(t, 'ending just below the waist, in',
             'ending just below the waist, with ' + sq_collar('jacket') + ', in')
    t = tc_cap(t, 'Cung nữ tam đẳng')
    out = D + 'tamdang_thancan_gpt.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('the long inner robe and skirt in powder blue like #A7BAD2', 'owner Lượt 1542: thân cận = colours swapped'),
                     ('in deep rose like #CA7281', 'owner Lượt 1542: colours swapped'),
                     ('her main colour powder blue on the inner robe and skirt', 'owner Lượt 1542: colours swapped'),
                     ('her secondary colour deep rose clearly visible on the short outer top', 'owner Lượt 1542: colours swapped'),
                     ('Cung nữ tam đẳng', 'caption + · thân cận')])
    return out


def nhi_tc():
    base = D + 'nhi_gpt_v2.txt'
    t = swapcol(open(base, encoding='utf-8').read())
    t = swap(t, NHI2_CROSSED, 'with ' + sq_collar('jacket'))
    t = tc_cap(t, 'Cung nữ nhị đẳng')
    out = D + 'nhi_thancan_gpt.txt'
    open(out, 'w', encoding='utf-8').write(t)
    al = [('the long inner robe and skirt in powder blue like #A7BAD2', 'owner Lượt 1542: colours swapped'),
          ('a half-sleeve brocade jacket (bijia) on top in deep rose like #CA7281', 'owner Lượt 1542: colours swapped'),
          ('on top in deep rose like #CA7281', 'owner Lượt 1542: colours swapped'),
          ('her main colour powder blue like #A7BAD2 on the ruqun', 'owner Lượt 1542: colours swapped'),
          ('her secondary colour deep rose like #CA7281 on the whole half-sleeve outer jacket', 'owner Lượt 1542: colours swapped'),
          ('Cung nữ nhị đẳng', 'caption + · thân cận')]
    al += [(f.strip(), 'owner Lượt 1542: crossed collar -> square collar') for f in re.split(r'[;,():]', NHI2_CROSSED) if len(f.split()) >= 3]
    keep(out, base, al)
    return out


def nhat_tc():
    base = D + 'nhat_gpt_v4.txt'
    t = swapcol(open(base, encoding='utf-8').read())
    t = swap(t, NHAT_R2_COLLAR, 'a sleeveless embroidered over-vest with ' + sq_collar('vest') +
             ', with a band of gold-edged trim down the front, worn over a crossed-collar inner robe')
    t = swap(t, "(a touch deeper than a lower maid's blue), the sleeves blue all the way down",
             "(a touch deeper than a lower maid's rose), the sleeves rose all the way down")
    t = tc_cap(t, 'Cung nữ nhất đẳng')
    out = D + 'nhat_thancan_gpt.txt'
    open(out, 'w', encoding='utf-8').write(t)
    al = [('RECOLOUR the whole costume to her colour powder blue', 'owner Lượt 1542: colours swapped'),
          ('the MAIN colour powder blue like #A7BAD2 and the SECONDARY colour deep rose like #CA7281', 'owner Lượt 1542: colours swapped'),
          ('the long SKIRT and the WHOLE SLEEVES are powder blue', 'owner Lượt 1542: colours swapped'),
          ("a touch deeper than a lower maid's blue", 'owner Lượt 1542: colours swapped'),
          ('the sleeves blue all the way down', 'owner Lượt 1542: colours swapped'),
          ('only their embroidered cuff band may carry deep rose embroidery', 'owner Lượt 1542: colours swapped'),
          ('the short top front panel are deep rose', 'owner Lượt 1542: colours swapped'),
          ('Cung nữ nhất đẳng', 'caption + · thân cận')]
    al += [(f.strip(), 'owner Lượt 1542: stand collar -> square collar') for f in re.split(r'[;,():]', NHAT_R2_COLLAR) if len(f.split()) >= 3]
    keep(out, base, al)
    return out



# ===== MAIDP3: owner L1545 (C #12) — corrections =====
# (4) nhất short top tà was not visible -> say where, length, colour contrast
NHAT_TA_NGAN2 = (" and ON TOP, in FRONT of these two long front panels, ONE more SHORT front panel (tà ngắn) that is clearly visible: "
                 "a single short, wide embroidered panel hanging straight down from the waist sash at the CENTRE FRONT of her body, "
                 "overlapping the inner edges of both long panels, ending at mid-thigh (about half as long as the long panels), in a "
                 "CONTRASTING colour (powder blue against the deep rose long panels) with its own gold-edged border, never hidden "
                 "behind the held item, the hands or the sash bow, so TWO layers of front panels are clearly visible at the front "
                 "(the short top panel over the two long ones),")
NHAT_PLACE_OLD = 'the sleeveless over-vest, its two long front panels and the short top front panel are deep rose.'
NHAT_PLACE_NEW = ('the sleeveless over-vest and its two long front panels are deep rose; the short top front panel is powder blue '
                  'with a deep rose gold-edged border, so it stands out clearly against them.')


def nhat5():
    base = D + 'nhat_gpt_v4.txt'
    t = open(base, encoding='utf-8').read()
    t = swap(t, NHAT_TA_NGAN, NHAT_TA_NGAN2)
    t = swap(t, NHAT_PLACE_OLD, NHAT_PLACE_NEW)
    out = D + 'nhat_gpt_v5.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('and ON TOP of these two long front panels ONE more SHORTER front panel', 'owner Lượt 1545: tà ngắn made clearly visible'),
                     ('a single short embroidered panel with a gold-edged border hanging at the centre front from the waist sash', 'owner Lượt 1545: + where/length/contrast'),
                     (NHAT_PLACE_OLD, 'owner Lượt 1545: short panel in contrasting powder blue')])
    return out


# (3) tam: square collar did not show -> stronger words
TAM_SQ_STRONG = ("a clearly visible SQUARE neckline (cổ vuông, fangling) on the jacket: a flat embroidered collar band runs straight "
                 "DOWN from each side of the neck and turns at a RIGHT ANGLE into a straight HORIZONTAL edge across the upper chest, "
                 "framing a clear SQUARE (box-shaped) opening, inside which the inner robe's crossed collar shows; below the square "
                 "opening the jacket's two front edges meet edge to edge, closed with one small knot button; NEVER a crossed or wrap "
                 "collar, NEVER a V-neck, never a tall upright stand collar")
# (2) thân cận: ONE extra garment layer per grade (open front, so the square collar stays in view)
TC_EXTRA_VEST = ("; OVER the jacket she also wears ONE extra layer that marks her as a thân cận maid: a short sleeveless over-vest "
                 "(bijia) in %s, worn OPEN at the front with its straight edges hanging down on each side, ending at the hip, with "
                 "a narrow band of small embroidered flowers along its edges, so the jacket's square collar stays fully visible between them")
TC_EXTRA_NHAT = ("; OVER the vest she also wears ONE extra layer that marks her as a thân cận maid: a short cropped half-sleeve "
                 "open jacket (bolero) in %s ending just above the waist, worn OPEN at the front, with a narrow band of small "
                 "embroidered flowers along its edges, so the vest's square collar stays fully visible between its fronts")


def tamdang_tc2():
    base = D + 'tamdang_thancan_gpt.txt'
    t = open(base, encoding='utf-8').read()
    t = swap(t, 'with ' + sq_collar('jacket') + ', in', 'with ' + TAM_SQ_STRONG + ', in')
    t = swap(t, '(never a plainer or duller cloth),', '(never a plainer or duller cloth)' + (TC_EXTRA_VEST % 'deep rose like #CA7281') + ',')
    out = D + 'tamdang_thancan_gpt_v2.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('a SQUARE collar (cổ vuông', 'owner Lượt 1545: tam square collar stronger'),
                     ('with a SQUARE collar', 'owner Lượt 1545: -> clearly visible SQUARE neckline'),
                     ('a flat embroidered collar band that runs straight down from each side of the neck and turns at a right angle', 'owner Lượt 1545: stronger square words'),
                     ('framing a square opening at the upper chest', 'owner Lượt 1545')])
    return out


def nhi_tc2():
    base = D + 'nhi_thancan_gpt.txt'
    t = open(base, encoding='utf-8').read()
    t = swap(t, NHI2_TWO_TA + ';', NHI2_TWO_TA + (TC_EXTRA_VEST % 'deep rose like #CA7281') + ';')
    out = D + 'nhi_thancan_gpt_v2.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [])
    return out


def nhat_tc2():
    base = D + 'nhat_thancan_gpt.txt'
    t = swapcol(open(D + 'nhat_gpt_v5.txt', encoding='utf-8').read())
    t = swap(t, NHAT_R2_COLLAR, 'a sleeveless embroidered over-vest with ' + sq_collar('vest') +
             ', with a band of gold-edged trim down the front, worn over a crossed-collar inner robe')
    t = swap(t, "(a touch deeper than a lower maid's blue), the sleeves blue all the way down",
             "(a touch deeper than a lower maid's rose), the sleeves rose all the way down")
    t = swap(t, 'never stiff, padded, flat or board-like;', 'never stiff, padded, flat or board-like' + (TC_EXTRA_NHAT % 'deep rose like #CA7281') + ';')
    t = swap(t, 'so it stands out clearly against them.', "so it stands out clearly against them. The inner robe's crossed collar "
             "showing inside the square collar opening is deep rose (PINK), never blue.")
    t = tc_cap(t, 'Cung nữ nhất đẳng')
    out = D + 'nhat_thancan_gpt_v2.txt'
    open(out, 'w', encoding='utf-8').write(t)
    keep(out, base, [('and ON TOP of these two long front panels ONE more SHORTER front panel', 'owner Lượt 1545: tà ngắn made clearly visible'),
                     ('a single short embroidered panel with a gold-edged border hanging at the centre front from the waist sash', 'owner Lượt 1545'),
                     ('the sleeveless over-vest, its two long front panels and the short top front panel are powder blue', 'owner Lượt 1545: short panel in contrasting colour')])
    return out


if __name__ == '__main__':
    # NOTE: mama51/mama65 (v2) and chuongsu (v2) are NOT in the default list: mama v2 was hand-edited by Foreman C (L1473).
    jobs = sys.argv[1:] or ['nhat', 'thancan', 'tamdang', 'nhat3', 'thancan3', 'chuongsu3', 'mama3_51', 'mama3_65', 'mama4_51', 'mama4_65']
    for j in jobs:
        p = globals()[j]()
        print(p, len(open(p, encoding='utf-8').read()))
