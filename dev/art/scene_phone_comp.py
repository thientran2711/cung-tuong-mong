"""Convert pilot PNGs to img/<scene>-<se>-<bu>-p.webp and composite test views with two figures on the anchor."""
import sys
from PIL import Image, ImageDraw
R = '/home/user/cung-tuong-mong/.claude/worktrees/agent-a41c1a44a656be65e/'
D = '/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/ph/'
SC = 'phi-tan-cung'
AX, FEET = float(sys.argv[1]), float(sys.argv[2])
S = ['xuan', 'ha', 'thu', 'dong']; B = ['sang', 'trua', 'chieu', 'toi']
if '--webp' in sys.argv:
    import os
    for s in S:
        for b in B:
            im = Image.open(f'{D}{s}-{b}.png').convert('RGB')
            p = f'{R}img/{SC}-{s}-{b}-p.webp'
            im.save(p, 'WEBP', quality=58, method=6)
            print(p.split('/')[-1], os.path.getsize(p) // 1024, 'KB')
F1 = Image.open(R + 'img/fig-consort-c01-t2-a18.webp').convert('RGBA')
F2 = Image.open(R + 'img/fig-consort-c03-t3-a26.webp').convert('RGBA')
def bbox(f):
    a = f.split()[3].point(lambda v: 255 if v > 20 else 0).getbbox(); return f.crop(a)
F1, F2 = bbox(F1), bbox(F2)
# view: (name, css W, css H, dpr, room view w, h, vertical crop bias top-share)
VIEWS = [('fold-686x880', 670, 720, 2.2), ('phone-412x1058', 400, 860, 2), ('ipad-1180x820', 680, 820, 2)]
OUT = R + 'dev/shots/scene-phone/'
import os; os.makedirs(OUT, exist_ok=True)
def view(se, bu, name, w, h, dpr, figh=.6):
    W, H = int(w * dpr), int(h * dpr)
    im = Image.open(f'{D}{se}-{bu}.png').convert('RGB')
    s = max(W / im.width, H / im.height)
    dw, dh = im.width * s, im.height * s
    x0 = min(0, max(W - dw, W / 2 - AX * dw))
    # vertical: keep the feet line at ~85% of the view when cropping
    y0 = min(0, max(H - dh, .85 * H - FEET * dh))
    big = im.resize((round(dw), round(dh)), Image.LANCZOS)
    v = big.crop((round(-x0), round(-y0), round(-x0) + W, round(-y0) + H)).convert('RGBA')
    fy = y0 + FEET * dh; fx = x0 + AX * dw; fh = figh * H
    figs = []
    for F in (F1, F2):
        k = fh / F.height; figs.append(F.resize((round(F.width * k), round(fh)), Image.LANCZOS))
    gap = -.12 * figs[0].width
    tot = figs[0].width + figs[1].width + gap
    x = fx - tot / 2
    for f in figs:
        v.alpha_composite(f, (round(x), round(fy - f.height))); x += f.width + gap
    d = ImageDraw.Draw(v)
    return v.convert('RGB'), (fx, fy)
for name, w, h, dpr in VIEWS:
    v, a = view('xuan', 'sang', name, w, h, dpr)
    v.save(f'{OUT}{SC}-p-{name}.jpg', quality=86)
    print(name, v.size, 'anchor px', [round(t) for t in a])
# all 16 at phone size in one sheet
tiles = []
for s in S:
    for b in B:
        v, _ = view(s, b, 'phone', 400, 860, 1); tiles.append(v.resize((200, 430)))
sh = Image.new('RGB', (4 * 200, 4 * 430))
for i, t in enumerate(tiles): sh.paste(t, ((i % 4) * 200, (i // 4) * 430))
sh.save(f'{OUT}{SC}-p-all16-phone.jpg', quality=82)
tiles = []
for s in S:
    for b in B:
        v, _ = view(s, b, 'fold', 670, 720, 1); tiles.append(v.resize((335, 360)))
sh = Image.new('RGB', (4 * 335, 4 * 360))
for i, t in enumerate(tiles): sh.paste(t, ((i % 4) * 335, (i // 4) * 360))
sh.save(f'{OUT}{SC}-p-all16-fold.jpg', quality=82)
