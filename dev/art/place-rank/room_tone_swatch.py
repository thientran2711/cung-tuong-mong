"""PR20 DRAFT (owner 20/11 on room32 composite: "Cái màu của căn phòng nó cũng phải giống với cái màu của cái bộ trang phục ... cùng một cái
tông màu ... đồng thời phải có ánh sáng trắng"). Makes the TONE swatch strip used as image 4 of a room gen. 0 cr (pure PIL), NO text on
the strip (letters in a reference picture can leak into the gen).

python3 room_tone_swatch.py OUT.png '#E3A3B8:3' '#F3EBDD:2' '#9CC5B0:1'      # hex[:weight] blocks, left to right, widths by weight
Layout: 2048x512, flat colour blocks with a thin soft gap (no gradients, no borders), neutral white (#FFFFFF) margin, so the gen reads
"these colours, this lightness" and nothing else.
Upload: creations_upload_image (0 cr) -> put the id as image 4 in the room refs (prompts_pr20_rooms_tone_DRAFT.py SWATCH)."""
import sys
from PIL import Image, ImageDraw
out, specs = sys.argv[1], sys.argv[2:]
cols = []
for s in specs:
    h, _, w = s.partition(':'); cols.append((h.strip(), float(w or 1)))
W, H, M, G = 2048, 512, 48, 16
im = Image.new('RGB', (W, H), '#FFFFFF'); d = ImageDraw.Draw(im)
tot = sum(w for _, w in cols); x = M; span = W - 2 * M - G * (len(cols) - 1)
for i, (h, w) in enumerate(cols):
    bw = round(span * w / tot) if i < len(cols) - 1 else W - M - x
    d.rectangle((x, M, x + bw - 1, H - M - 1), fill=h); x += bw + G
im.save(out); print(out, im.size, [h for h, _ in cols])
