"""Owner Lượt 817 composite test: any 4 figures in a room on the live iPad stage (same numbers as ipad_tags.py) + 3-line tags.
python3 nf_tags.py ROOM OUT FIG1,FIG2,FIG3,FIG4 'l1|l2|l3;l1|l2|l3;…'   (FIG = image path with alpha)"""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
room, out, figs, tags = sys.argv[1:5]; FIG = figs.split(','); TAGS = [t.split('|') for t in tags.split(';')]
W, H, XS, VH, GAP, TAGY, SC = 1162, 599, [168, 421, 654, 888], 438.7, 69.7, 533.3, 2
F = '/usr/share/fonts/truetype/dejavu/'
f1 = ImageFont.truetype(F + 'DejaVuSerif.ttf', 10 * SC); f3 = ImageFont.truetype(F + 'DejaVuSerif-Bold.ttf', 12 * SC)
im = Image.open(room).convert('RGB'); s = max(W / im.width, H / im.height); w, h = round(im.width * s * SC), round(im.height * s * SC)
st = im.resize((w, h), Image.LANCZOS); x0 = (w - W * SC) // 2; st = st.crop((x0, h - H * SC, x0 + W * SC, h)).convert('RGBA')
feet = H - GAP
for cx, k in zip(XS, FIG):
    fg = Image.open(k).convert('RGBA'); fg = fg.crop(fg.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox())
    fg = fg.resize((round(fg.width * VH * SC / fg.height), round(VH * SC)), Image.LANCZOS)
    st.alpha_composite(fg, (round(cx * SC - fg.width / 2), round(feet * SC - fg.height)))
txt = Image.new('RGBA', st.size, (0, 0, 0, 0)); d = ImageDraw.Draw(txt)
for cx, (a, b, c) in zip(XS, TAGS):
    y = TAGY * SC
    for t, f, col, lh in ((a, f1, (122, 86, 30), 12.5), (b, f1, (178, 34, 34), 12.5), (c, f3, (40, 28, 20), 14)):
        tw = d.textlength(t, font=f); d.text((cx * SC - tw / 2, y), t, font=f, fill=col + (255,)); y += lh * SC
halo = txt.split()[3].filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(2))
glow = Image.new('RGBA', st.size, (255, 248, 235, 0)); glow.putalpha(halo.point(lambda v: min(255, v * 2) * 0.8))
st.alpha_composite(glow); st.alpha_composite(txt); st.convert('RGB').save(out, quality=90); print(out)
