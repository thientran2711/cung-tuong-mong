"""Owner Lượt 612: every room preview for the owner = live iPad dư đồ positions (ipad_map.py numbers) + a 3-line NAME TAG under each person's feet,
where the game puts its tags (tag top = 533 px of the 599 px stage = 89.0 %): line 1 DANH HIỆU (title), line 2 RANK (red, as the game), line 3 NAME (bold).
The live game has 2 lines (rank + name); the 3rd line is a placeholder so the owner can judge the floor under the feet.
python3 ipad_tags.py ROOM.webp OUT.jpg [figdir] [gapfactor]"""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
room, out = sys.argv[1:3]; FD = sys.argv[3] if len(sys.argv) > 3 else 'figs'; gf = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0
W, H, XS, VH, GAP, TAGY = 1162, 599, [168, 421, 654, 888], 438.7, 69.7, 533.3
FIG = ['fig-consort-c06-t1-a18', 'fig-consort-c30-t1-a18', 'fig-maid-m19-t1-a18', 'fig-maid-m39-t1-a18']
TAGS = [('Hiền Đức', 'Quý phi', 'Chu Thục Nghi'), ('Ôn Uyển', 'Tần', 'Lý Băng Tâm'),
        ('Cần Mẫn', 'Cung nữ', 'Tiểu Đào'), ('Thanh Tú', 'Đáp ứng', 'Người lạ')]
SC = 2
F = '/usr/share/fonts/truetype/dejavu/'
f1 = ImageFont.truetype(F + 'DejaVuSerif.ttf', 10 * SC); f2 = ImageFont.truetype(F + 'DejaVuSerif.ttf', 10 * SC); f3 = ImageFont.truetype(F + 'DejaVuSerif-Bold.ttf', 12 * SC)
im = Image.open(room).convert('RGB'); s = max(W / im.width, H / im.height); w, h = round(im.width * s * SC), round(im.height * s * SC)
st = im.resize((w, h), Image.LANCZOS); x0 = (w - W * SC) // 2; st = st.crop((x0, h - H * SC, x0 + W * SC, h)).convert('RGBA')
feet = H - GAP * gf
for cx, k in zip(XS, FIG):
    fg = Image.open(f'{FD}/{k}.webp').convert('RGBA'); fg = fg.crop(fg.getbbox())
    fg = fg.resize((round(fg.width * VH * SC / fg.height), round(VH * SC)), Image.LANCZOS)
    st.alpha_composite(fg, (round(cx * SC - fg.width / 2), round(feet * SC - fg.height)))
txt = Image.new('RGBA', st.size, (0, 0, 0, 0)); d = ImageDraw.Draw(txt)
for cx, (a, b, c) in zip(XS, TAGS):
    y = (TAGY - GAP * (1 - gf)) * SC
    for t, f, col, lh in ((a, f1, (122, 86, 30), 12.5), (b, f2, (178, 34, 34), 12.5), (c, f3, (40, 28, 20), 14)):
        tw = d.textlength(t, font=f); d.text((cx * SC - tw / 2, y), t, font=f, fill=col + (255,)); y += lh * SC
halo = txt.split()[3].filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(2))
glow = Image.new('RGBA', st.size, (255, 248, 235, 0)); glow.putalpha(halo.point(lambda v: min(255, v * 2) * 0.8))
st.alpha_composite(glow); st.alpha_composite(txt)
st.convert('RGB').save(out, quality=90); print(out, 'tag lines end at %.1f %% H' % (100 * (TAGY + 39) / H))
