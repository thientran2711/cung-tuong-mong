"""Owner L2318: the TRUE Fold portrait 755x1000 view of a room with the in-game person, from fold755.json (measured on the live game).
Top bar + bottom nav are copied from a live screenshot (TEMPLATE.png, 2x); the stage (747x749 at y 163) = room cover (x anchor 70 %) + the game's big figure (visible h 566, feet y 831, centre x 641.5) + 3-line tag.
python3 fold755.py ROOM.webp TEMPLATE.png OUT.jpg [figdir]   (prints the visible part of the room: left/right % kept)"""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
room, tpl, out = sys.argv[1:4]; FD = sys.argv[4] if len(sys.argv) > 4 else 'figs'
SC = 2; SX, SY, SW, SH = 4, 162.73, 747, 749.27; AX, AY = 0.70, 0.5
scr = Image.open(tpl).convert('RGBA')
im = Image.open(room).convert('RGB'); s = max(745 / im.width, 747.27 / im.height); w, h = im.width * s, im.height * s
x0 = (745 - w) * AX; y0 = (747.27 - h) * AY
pic = im.resize((round(w * SC), round(h * SC)), Image.LANCZOS).crop((round(-x0 * SC), round(-y0 * SC), round((-x0 + 745) * SC), round((-y0 + 747.27) * SC))).convert('RGBA')
scr.paste(pic, (5 * SC, round(163.73 * SC)))
fg = Image.open(f'{FD}/fig-consort-c06-t1-a18.webp').convert('RGBA'); fg = fg.crop(fg.getbbox())
VH = 566; fg = fg.resize((round(fg.width * VH * SC / fg.height), VH * SC), Image.LANCZOS)
cx, feet = 641.5, 831
scr.alpha_composite(fg, (round(cx * SC - fg.width / 2), round(feet * SC - fg.height)))
F = '/usr/share/fonts/truetype/dejavu/'
txt = Image.new('RGBA', scr.size, (0, 0, 0, 0)); d = ImageDraw.Draw(txt)
y = 834 * SC
for t, f, col in (('Hiền Đức', ImageFont.truetype(F + 'DejaVuSerif.ttf', 11 * SC), (122, 86, 30)), ('Quý phi', ImageFont.truetype(F + 'DejaVuSerif.ttf', 11 * SC), (178, 34, 34)), ('Chu Thục Nghi', ImageFont.truetype(F + 'DejaVuSerif-Bold.ttf', 13 * SC), (40, 28, 20))):
    d.text((cx * SC - d.textlength(t, font=f) / 2, y), t, font=f, fill=col + (255,)); y += 15 * SC
halo = txt.split()[3].filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(2))
glow = Image.new('RGBA', scr.size, (255, 248, 235, 0)); glow.putalpha(halo.point(lambda v: min(255, v * 2) * 0.8))
scr.alpha_composite(glow); scr.alpha_composite(txt)
scr.convert('RGB').save(out, quality=90)
print('kept %.0f %%..%.0f %% of the width, %.0f %% of the height' % (-x0 / w * 100, (-x0 + 745) / w * 100, 745 * 0 + 100 * min(1, 747.27 / h)))
