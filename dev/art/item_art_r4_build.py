#!/usr/bin/env python3
"""item-art r4: fit Magnific cut-outs (tmp/new/<key>.png) onto a 1024 square like their siblings -> img/hi, img/item512|pet512, img/<key>."""
import os, sys
from PIL import Image
R = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
for key in sys.argv[1:]:
    pet = key.startswith("pet-")
    box = (942, 922) if pet else (900, 886)
    im = Image.open(f"{R}/tmp/new/{key}.png").convert("RGBA")
    im = im.crop(im.getchannel("A").getbbox())
    s = min(box[0] / im.width, box[1] / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    c = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    c.alpha_composite(im, ((1024 - im.width) // 2, (1024 - im.height) // 2))
    mid = "img/pet512" if pet else "img/item512"
    for d in ("img/hi", mid): os.makedirs(f"{R}/{d}", exist_ok=True)
    c.save(f"{R}/img/hi/{key}.webp", quality=92, method=4)
    c.resize((512, 512), Image.LANCZOS).save(f"{R}/{mid}/{key}.webp", quality=88, method=4)
    c.resize((256, 256), Image.LANCZOS).save(f"{R}/img/{key}.webp", quality=88, method=4)
