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


if __name__ == '__main__':
    jobs = sys.argv[1:] or ['nhat', 'chuongsu']
    for j in jobs:
        p = globals()[j]()
        print(p, len(open(p, encoding='utf-8').read()))
