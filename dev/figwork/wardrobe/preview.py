# preview.py CATJS IMGDIR OUTDIR : per tier, tier-<key>-yphuc.jpg and tier-<key>-tram.jpg (5x2 grid of the 512 icons, name + grade under each)
import sys, json, re, textwrap
from PIL import Image, ImageDraw, ImageFont
cat, IMG, OUT = sys.argv[1:4]
s = open(cat, encoding="utf-8").read()
L = json.loads(re.search(r"const WD_LIST=(\[.*?\]);\n", s, re.S).group(1))
TI = json.loads(re.search(r"const WD_TIERS=(\[.*?\]);\n", s, re.S).group(1))
GR = ["Thường", "Tinh phẩm", "Trân phẩm", "Tuyệt phẩm", "Ngự tứ"]
GC = [(110, 100, 90), (60, 120, 80), (60, 90, 160), (150, 60, 140), (180, 130, 20)]
F = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 19)
FB = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 19)
FT = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 34)
def sheet(rows, title, out, C=5):
    cw, ch, th = 380, 380 + 78, 64
    Rn = (len(rows) + C - 1) // C
    S = Image.new("RGB", (C * cw, th + Rn * ch), (246, 238, 224)); d = ImageDraw.Draw(S)
    d.text((18, 14), title, font=FT, fill=(90, 40, 30))
    for i, r in enumerate(rows):
        x, y = (i % C) * cw, th + (i // C) * ch
        d.rounded_rectangle([x + 8, y + 6, x + cw - 8, y + ch - 6], 14, fill=(252, 247, 238), outline=GC[r[4]], width=3)
        im = Image.open(f"{IMG}/wd512/{r[8]}.webp").convert("RGBA").resize((350, 350), Image.LANCZOS)
        S.paste(im, (x + 15, y + 12), im)
        lines = textwrap.wrap(r[2], 32)[:2]
        d.text((x + 18, y + 364), lines[0], font=F, fill=(40, 30, 25))
        if len(lines) > 1: d.text((x + 18, y + 386), lines[1], font=F, fill=(40, 30, 25))
        d.text((x + cw - 18 - d.textlength(GR[r[4]], font=FB), y + ch - 34), GR[r[4]], font=FB, fill=GC[r[4]])
        d.text((x + 18, y + ch - 34), f"Xa hoa {r[9]} · {r[10]} bạc" if r[10] else f"Xa hoa {r[9]}", font=F, fill=(120, 100, 80))
    S.save(out, quality=86)
for key, P, tn in TI:
    for sl, lab in (("y", "yphuc"), ("tram", "tram")):
        rows = [r for r in L if r[11] == key and r[1] == sl]
        rows.sort(key=lambda r: (r[4], r[8]))
        sheet(rows, f"Bậc {tn} · {'Y phục' if sl=='y' else 'Trâm cài'} (10 món)", f"{OUT}/tier-{key}-{lab}.jpg")
rows = [r for r in L if r[11] in ("nt", "tang")]
sheet(rows, "Ngự tứ (độc nhất mỗi kiếp) · Áo tang", f"{OUT}/tier-ngutu-tang.jpg", C=6)
print("ok")
