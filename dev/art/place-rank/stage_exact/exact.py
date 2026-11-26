"""Preview of a room with the 4 test figures at the EXACT positions the live game uses (measured with Playwright, game code untouched).
python3 exact.py ROOM.webp MEASURE.json OUT.jpg [gapfactor]
Stage crop = CSS background cover + background-position from the game; floor line = stage bottom - fo (fo * gapfactor);
every figure gets the same visible-body height as the game's figure (j59: one height for every adult), centred on the game's x."""
import sys, json
from PIL import Image
room, mj, out = sys.argv[1:4]; gf = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0
FD = sys.argv[5] if len(sys.argv) > 5 else 'figs/'  # folder with the 4 test figure webps
FIG = ['fig-consort-c06-t1-a18', 'fig-consort-c30-t1-a18', 'fig-maid-m19-t1-a18', 'fig-maid-m39-t1-a18']
m = json.load(open(mj)); W, H = m['stage']['w'], m['stage']['h']; fo = float(m['fo'].rstrip('px'))
im = Image.open(room).convert('RGB'); s = max(W / im.width, H / im.height); w, h = im.width * s, im.height * s
# live game draws the room with the PIXI layer (index.html ~L2278): cover x1.08, centred (drift +-3 % zoom, +-2 % x, +-1.5 % y: mid-point used);
# the CSS background (KIT_FLOOR crop) is hidden while PIXI runs (scimg opacity 0)
s *= 1.08; w, h = im.width * s, im.height * s; x0, y0 = (W - w) / 2, (H - h) / 2
SC = 2  # render at 2x the CSS px
st = im.resize((round(w * SC), round(h * SC)), Image.LANCZOS).crop((round(-x0 * SC), round(-y0 * SC), round((-x0 + W) * SC), round((-y0 + H) * SC))).convert('RGBA')
# visible body height of the game's figure (c06 file, same as served in the game run)
c06 = Image.open(FD + FIG[0] + '.webp').convert('RGBA'); bb = c06.getbbox(); f0 = m['figs'][0]
visH = f0['h'] * (bb[3] - bb[1]) / c06.height
floor = H - fo * gf
for f, k in zip(m['figs'], FIG):
    cx = f['left'] + f['w'] / 2
    fg = Image.open(FD + k + '.webp').convert('RGBA'); fg = fg.crop(fg.getbbox())
    hh = visH * SC; fg = fg.resize((round(fg.width * hh / fg.height), round(hh)), Image.LANCZOS)
    st.alpha_composite(fg, (round(cx * SC - fg.width / 2), round(floor * SC - fg.height)))
st.convert('RGB').save(out, quality=88)
print(out, 'stage', round(W), 'x', round(H), 'fo', fo * gf, 'gap %.1f%%' % (100 * fo * gf / H), 'visH %.1f (%.1f%% H)' % (visH, 100 * visH / H),
      'xs', [round(f['left'] + f['w'] / 2) for f in m['figs']])
