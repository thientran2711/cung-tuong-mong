"""PR18: rows of up to 4 cut-outs staged (nf_tags.py numbers) on one background, big A27 labels. 0 cr.
python3 sheet_row.py BG OUT 'ROW HEADER' 'fig.png|BIG|small|tag1|tag2|tag3;…' ['ROW HEADER 2' 'figs2'] …"""
import sys, subprocess, tempfile
from PIL import Image, ImageDraw, ImageFont
import os; NF = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'place-rank', 'stage_exact', 'nf_tags.py')
bg, out, rest = sys.argv[1], sys.argv[2], sys.argv[3:]
F = '/usr/share/fonts/truetype/dejavu/'; BG = (250, 244, 232); RED = (122, 30, 22)
def font(n, b=True): return ImageFont.truetype(F + ('DejaVuSans-Bold.ttf' if b else 'DejaVuSans.ttf'), n)
blocks = []
for head, spec in zip(rest[0::2], rest[1::2]):
    it = [s.split('|') for s in spec.split(';')]
    tmp = tempfile.mktemp(suffix='.jpg')
    subprocess.run([sys.executable, NF, bg, tmp, ','.join(i[0] for i in it), ';'.join('|'.join(i[3:6]) for i in it)], check=True, capture_output=True)
    st = Image.open(tmp).convert('RGB'); W = st.width
    hd = Image.new('RGB', (W, 96), BG); d = ImageDraw.Draw(hd); sz = 52
    while d.textlength(head, font=font(sz)) > W - 40 and sz > 30: sz -= 2
    d.text((20, 48), head, font=font(sz), fill=RED, anchor='lm')
    bd = Image.new('RGB', (W, 124), BG); d = ImageDraw.Draw(bd)
    for cx, i in zip([168, 421, 654, 888], it):
        s = 54
        while d.textlength(i[1], font=font(s)) > 440 and s > 28: s -= 2
        d.text((cx * 2, 46), i[1], font=font(s), fill=(40, 28, 20), anchor='mm'); d.text((cx * 2, 100), i[2], font=font(32, False), fill=(90, 70, 50), anchor='mm')
    blocks += [hd, st, bd, Image.new('RGB', (W, 20), (200, 181, 151))]
blocks = blocks[:-1]; O = Image.new('RGB', (blocks[0].width, sum(b.height for b in blocks)), BG); y = 0
for b in blocks: O.paste(b, (0, y)); y += b.height
O.save(out, quality=90); print(out, O.size)
