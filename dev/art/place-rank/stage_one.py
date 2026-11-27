"""PR21: stage ONE cut-out in a room with the live iPad stage numbers of nf_tags.py (W 1162 x H 599, figure height 438.7, feet 69.7 above
the bottom) + a soft contact shadow; the figure is not recoloured. python3 stage_one.py ROOM FIG OUT [cx=421]"""
import sys
from PIL import Image, ImageDraw, ImageFilter
room, fig, out = sys.argv[1:4]; CX = float(sys.argv[4]) if len(sys.argv) > 4 else 421
W, H, VH, GAP, SC = 1162, 599, 438.7, 69.7, 2
im = Image.open(room).convert('RGB'); s = max(W / im.width, H / im.height); w, h = round(im.width * s * SC), round(im.height * s * SC)
st = im.resize((w, h), Image.LANCZOS); x0 = (w - W * SC) // 2; st = st.crop((x0, h - H * SC, x0 + W * SC, h)).convert('RGBA')
fg = Image.open(fig).convert('RGBA'); fg = fg.crop(fg.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox())
fg = fg.resize((round(fg.width * VH * SC / fg.height), round(VH * SC)), Image.LANCZOS)
feet = (H - GAP) * SC; x = round(CX * SC - fg.width / 2)
sh = Image.new('L', st.size, 0); d = ImageDraw.Draw(sh); rw = fg.width * 0.42; rh = 14 * SC
d.ellipse((CX * SC - rw, feet - rh * 0.6, CX * SC + rw, feet + rh * 0.6), fill=110)
sh = sh.filter(ImageFilter.GaussianBlur(10 * SC)); dark = Image.new('RGBA', st.size, (40, 25, 20, 0)); dark.putalpha(sh)
st.alpha_composite(dark); st.alpha_composite(fg, (x, round(feet - fg.height))); st.convert('RGB').save(out, quality=92); print(out)
