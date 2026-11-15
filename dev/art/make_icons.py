"""Cung Tường Mộng app icons (review/brand, owner 11/15): the lady in the red/gold phoenix headdress at the centre of the title / first-load
key art (img/title-key.webp, jbd.js backdrop 'title'), face + head ornaments + shoulders, in a small gold / cinnabar frame.
usage (repo root): curl -o img/title-key.webp https://ctm-img.victoria-tntt.workers.dev/img/title-key.webp
                   python3 dev/art/make_icons.py img/title-key.webp .            -> icons/*.png + dev/build/icon.webp (favicon, inlined)
                   python3 dev/art/make_icons.py --preview out.png .              -> 48/96/192 px on light and dark home screens"""
import sys, os, glob
from PIL import Image, ImageDraw, ImageFont

CIN = (138, 42, 30)        # theme cinnabar #8a2a1e (manifest theme_color)
CIN2 = (110, 30, 22)
GOLD = (214, 172, 92)
GOLD2 = (246, 222, 160)
S = 4                      # supersample


def framed(FACE, N, round_outer, inset, shape='rect'):
    """N px icon. round_outer: corner radius of the tile (0 = full bleed: maskable / apple). inset: portrait inset fraction."""
    W = N * S
    tile = Image.new('RGBA', (W, W), (0, 0, 0, 0))
    d = ImageDraw.Draw(tile)
    ro = int(W * round_outer)
    e = int(W * .012)
    d.rounded_rectangle((0, 0, W - 1, W - 1), ro, fill=CIN2 + (255,))
    d.rounded_rectangle((e, e, W - 1 - e, W - 1 - e), max(0, ro - e), fill=CIN + (255,))
    g = int(W * .03)
    if round_outer:   # outer gold hairline only on the rounded tile (a full-bleed one is cut by the platform mask)
        d.rounded_rectangle((g, g, W - 1 - g, W - 1 - g), max(0, ro - g), outline=GOLD + (255,), width=max(2, int(W * .008)))
    a = int(W * inset)
    box = (a, a, W - 1 - a, W - 1 - a)
    pr = int(W * (0.10 if shape == 'rect' else 0.5))
    side = box[2] - box[0] + 1
    face = FACE.resize((side, side), Image.LANCZOS)
    m = Image.new('L', (side, side), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, side - 1, side - 1), pr, fill=255)
    b, h = int(W * .022), int(W * .006)
    d.rounded_rectangle((a - b, a - b, W - 1 - a + b, W - 1 - a + b), pr + b, fill=GOLD + (255,))
    d.rounded_rectangle((a - b + h, a - b + h, W - 1 - a + b - h, W - 1 - a + b - h), pr + b - h, outline=GOLD2 + (255,), width=max(1, int(W * .004)))
    tile.paste(face, (a, a), m)
    d.rounded_rectangle(box, pr, outline=CIN2 + (255,), width=max(1, int(W * .004)))
    return tile.resize((N, N), Image.LANCZOS)


def make(src, R):
    key = Image.open(src).convert('RGB')
    FACE = key.crop((455, 168, 885, 598))     # 1350x1800 key art: her face centred, headdress to shoulders
    os.makedirs(R + '/icons', exist_ok=True)
    framed(FACE, 512, 0.20, 0.085).save(R + '/icons/icon-512.png', optimize=True)          # purpose any
    framed(FACE, 192, 0.20, 0.085).save(R + '/icons/icon-192.png', optimize=True)
    framed(FACE, 512, 0.0, 0.15, 'circle').save(R + '/icons/icon-maskable-512.png', optimize=True)   # all inside the 80% safe circle
    framed(FACE, 192, 0.0, 0.15, 'circle').save(R + '/icons/icon-maskable-192.png', optimize=True)
    framed(FACE, 180, 0.0, 0.075).convert('RGB').save(R + '/icons/apple-touch-icon.png', optimize=True)  # opaque, iOS rounds it
    framed(FACE, 128, 0.18, 0.07).save(R + '/dev/build/icon.webp', 'WEBP', quality=88)    # favicon (assemble.py inlines it)
    framed(FACE, 48, 0.18, 0.06).save(R + '/icons/favicon-48.png', optimize=True)


def preview(out, R):
    fp = glob.glob('/usr/share/fonts/**/DejaVuSans-Bold.ttf', recursive=True)[0]
    f = ImageFont.truetype(fp, 18)
    any512 = Image.open(R + '/icons/icon-512.png').convert('RGBA')
    msk = Image.open(R + '/icons/icon-maskable-512.png').convert('RGBA')
    apple = Image.open(R + '/icons/apple-touch-icon.png').convert('RGBA')

    def mask(im, kind, n):
        im = im.resize((n, n), Image.LANCZOS)
        if not kind:
            return im
        m = Image.new('L', (n * 4, n * 4), 0)
        dd = ImageDraw.Draw(m)
        if kind == 'circle':
            dd.ellipse((0, 0, n * 4 - 1, n * 4 - 1), fill=255)
        else:
            dd.rounded_rectangle((0, 0, n * 4 - 1, n * 4 - 1), int(n * 4 * .23), fill=255)
        o = Image.new('RGBA', (n, n), (0, 0, 0, 0))
        o.paste(im, (0, 0), m.resize((n, n), Image.LANCZOS))
        return o
    rows = [("purpose any (icon-512/192)", lambda n: mask(any512, None, n)),
            ("maskable, Android circle", lambda n: mask(msk, 'circle', n)),
            ("maskable, Android squircle", lambda n: mask(msk, 'squircle', n)),
            ("apple-touch 180 (iOS rounds)", lambda n: mask(apple, 'squircle', n))]
    sizes = [48, 96, 192]
    bgs = [((242, 239, 232), (40, 30, 24), "nền sáng"), ((28, 28, 34), (235, 230, 220), "nền tối")]
    CW = sum(sizes) + 4 * 30
    H = 40 + len(rows) * (192 + 50)
    im = Image.new('RGB', (len(bgs) * CW, H), (255, 255, 255))
    d = ImageDraw.Draw(im)
    for bi, (bg, fg, name) in enumerate(bgs):
        x0 = bi * CW
        d.rectangle((x0, 0, x0 + CW - 1, H - 1), fill=bg)
        d.text((x0 + 20, 10), name + " · 48 / 96 / 192 px", fill=fg, font=f)
        for ri, (lab, fn) in enumerate(rows):
            y, x = 40 + ri * (192 + 50), x0 + 30
            for n in sizes:
                ic = fn(n)
                im.paste(ic, (x, y + (192 - n)), ic)
                x += n + 30
            d.text((x0 + 20, y + 198), lab, fill=fg, font=f)
    im.save(out)


if __name__ == '__main__':
    if sys.argv[1] == '--preview':
        preview(sys.argv[2], sys.argv[3])
    else:
        make(sys.argv[1], sys.argv[2])
    print('ok')
