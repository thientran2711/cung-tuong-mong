import json, sys
from PIL import Image
J = json.load(open('out/fit.json')); tiles = []
for fid, f in J.items():
    b = Image.open('out/' + f['base']).convert('RGBA'); n = Image.open('out/' + f['neck'])
    b.alpha_composite(n, (f['x'], f['y']))
    tiles.append(b.crop((440, 330, 680, 540)).resize((720, 630), Image.LANCZOS))
c = Image.new('RGBA', (1440, 630)); c.paste(tiles[0], (0, 0)); c.paste(tiles[1], (720, 0))
c.save(sys.argv[1])
