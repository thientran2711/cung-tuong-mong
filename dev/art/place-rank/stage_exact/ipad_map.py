"""Room preview exactly as the LIVE game shows it on iPad landscape 1180x820 when entered from the Dư đồ (map -> palace -> chính điện),
measured with Playwright on thientran2711.github.io (19/11, live.js). Game code untouched.
 frame: the room picture fills a 1162x599 box (cover, bottom-anchored; KIT_PXBG); a 2688x1386 picture (1.939) shows WHOLE (<1 px crop)
 people: 4 (her figure at the left + 3), centres x 168/421/654/888, visible body height 438.7 px (73.2 % H), feet 69.7 px above the bottom (11.6 %)
python3 ipad_map.py ROOM.webp OUT.jpg [gapfactor] [figdir]"""
import sys
from PIL import Image
room, out = sys.argv[1:3]; gf = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0; FD = sys.argv[4] if len(sys.argv) > 4 else 'figs/'
W, H, XS, VH, GAP = 1162, 599, [168, 421, 654, 888], 438.7, 69.7
FIG = ['fig-consort-c06-t1-a18', 'fig-consort-c30-t1-a18', 'fig-maid-m19-t1-a18', 'fig-maid-m39-t1-a18']
SC = 2
im = Image.open(room).convert('RGB'); s = max(W / im.width, H / im.height); w, h = round(im.width * s * SC), round(im.height * s * SC)
st = im.resize((w, h), Image.LANCZOS); x0 = (w - W * SC) // 2; st = st.crop((x0, h - H * SC, x0 + W * SC, h)).convert('RGBA')
feet = H - GAP * gf
for cx, k in zip(XS, FIG):
    fg = Image.open(f'{FD}/{k}.webp').convert('RGBA'); fg = fg.crop(fg.getbbox())
    fg = fg.resize((round(fg.width * VH * SC / fg.height), round(VH * SC)), Image.LANCZOS)
    st.alpha_composite(fg, (round(cx * SC - fg.width / 2), round(feet * SC - fg.height)))
st.convert('RGB').save(out, quality=88); print(out, 'gap %.1f px = %.1f %%' % (GAP * gf, 100 * GAP * gf / H))
