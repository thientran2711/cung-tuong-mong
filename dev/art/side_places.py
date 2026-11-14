import os, sys, subprocess
from PIL import Image, ImageDraw, ImageFont
D = os.path.dirname(os.path.abspath(__file__)); R = sys.argv[1]; urls = sys.argv[2]; tag = sys.argv[3]
os.makedirs(os.path.join(D, 'cand'), exist_ok=True)
try: F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 26)
except Exception: F = None
def fit(im):
    im = im.convert('RGB'); w, h = im.size; s = 720 / h; nw = round(w * s)
    im = im.resize((nw, 720), Image.LANCZOS); x = (nw - 1280) // 2
    return im.crop((x, 0, x + 1280, 720))
refs = ['lanh-cung-xuan-sang', 'ngu-hoa-vien-xuan-sang', 'kinh-su-phong-xuan-sang']
for ln in open(urls):
    k, u = ln.split(None, 1); p = os.path.join(D, 'cand', k + '.png')
    if not os.path.exists(p): subprocess.run(['curl', '-sS', '-o', p, u.strip()], check=True)
    c = fit(Image.open(p)); c.save(os.path.join(D, 'cand', k + '.jpg'), quality=90)
    # side by side: candidate | existing game scenes
    sh = Image.new('RGB', (1280 * 2, 720 * 2), 'white')
    sh.paste(c.resize((1280, 720)), (0, 0))
    for i, r in enumerate(refs):
        im = Image.open(os.path.join(R, 'img', r + '.webp')).convert('RGB')
        if i == 0: sh.paste(im.resize((1280, 720)), (1280, 0))
        else: sh.paste(im.resize((1280, 720)), ((i - 1) * 1280, 720))
    d = ImageDraw.Draw(sh)
    for (x, y), t in [((0, 0), f'MOI: Day nha cung nhan ({k})'), ((1280, 0), 'game: lanh-cung'), ((0, 720), 'game: ngu-hoa-vien'), ((1280, 720), 'game: kinh-su-phong')]:
        d.text((x + 16, y + 12), t, fill='white', font=F, stroke_width=3, stroke_fill='black')
    sh.resize((1920, 1080)).save(os.path.join(R, 'dev/shots/places', f'{tag}-{k}.jpg'), quality=85)
    print(k)
