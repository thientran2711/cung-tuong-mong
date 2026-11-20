#!/usr/bin/env python3
"""MG3 (Lượt 781 redraw): OLD row above NEW row, one column per age, <= ~700 KB jpg.
Usage: mg3_sheet_oldnew.py CUTDIR OUT.jpg "TITLE" "WHO" AGES OLD_IDS NEW_IDS
  AGES / OLD_IDS / NEW_IDS = comma lists; a NEW id '-' draws a 'NOT DRAWN' box (e.g. failed gen)."""
import sys, os
from PIL import Image, ImageDraw, ImageFont
D, OUT, TITLE, WHO = sys.argv[1:5]
AGES, OLD, NEW = (s.split(",") for s in sys.argv[5:8])
assert len(AGES) == len(OLD) == len(NEW)
FH, CW, HEAD, TAG = 820, 470, 60, 70
ROWH = FH + TAG + 40; BG = (236, 230, 220)
F = lambda s, b=False: ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf" % ("-Bold" if b else ""), s)
W = CW * len(AGES) + 40; H = HEAD + 2 * ROWH
sh = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(sh)
d.text((20, 14), TITLE, fill=(60, 30, 20), font=F(24))
for r, (ids, lab) in enumerate(((OLD, "OLD"), (NEW, "NEW"))):
    y0 = HEAD + r * ROWH
    d.text((20, y0 + 4), lab, fill=(150, 30, 30) if lab == "NEW" else (90, 90, 90), font=F(30, True))
    for i, cid in enumerate(ids):
        cx = 20 + i * CW + CW // 2
        if cid == "-":
            d.rectangle((20 + i * CW + 20, y0 + 60, 20 + (i + 1) * CW - 20, y0 + 40 + FH), outline=(150, 30, 30), width=4)
            t = "NOT DRAWN"; w = d.textlength(t, font=F(30, True)); d.text((cx - w / 2, y0 + 40 + FH // 2), t, fill=(150, 30, 30), font=F(30, True))
        else:
            im = Image.open(os.path.join(D, cid + ".png")).convert("RGBA"); im = im.crop(im.getbbox())
            s = FH / im.height; im = im.resize((int(im.width * s), FH), Image.LANCZOS)
            if im.width > CW - 10: s = (CW - 10) / im.width; im = im.resize((CW - 10, int(im.height * s)), Image.LANCZOS)
            sh.paste(im, (20 + i * CW + (CW - im.width) // 2, y0 + 40 + FH - im.height), im)
        ty = y0 + 40 + FH + 6
        for k, (t, f, c) in enumerate(((AGES[i] + " · " + lab, F(28, True), (80, 20, 20)), (WHO + " · " + cid, F(20), (90, 70, 60)))):
            w = d.textlength(t, font=f); d.text((cx - w / 2, ty + [0, 34][k]), t, fill=c, font=f)
q = 88
while True:
    sh.save(OUT, quality=q, optimize=True)
    if os.path.getsize(OUT) < 700_000 or q < 50: break
    q -= 6
print(OUT, sh.size, os.path.getsize(OUT))
