#!/usr/bin/env python3
"""porscale/register.py: where does a por-* portrait sit inside its fig-* full figure (same painting)?
reg(por_rgba, fig_rgba) -> (k, ox, oy, score): fig pixel = por pixel * k + (ox, oy)  (k < 1: the figure is lower-res).
Multi-scale template matching (OpenCV, grey over white) of the portrait's middle band (face + shoulders) in the figure's top 45 %."""
import numpy as np, cv2
def gray(a):
    al = a[..., 3:4].astype(np.float32) / 255.
    return cv2.cvtColor((a[..., :3] * al + 255 * (1 - al)).astype(np.uint8), cv2.COLOR_RGB2GRAY)
def reg(por, fig):
    pg, fg = gray(por), gray(fig)
    PH, PW = pg.shape; FH, FW = fg.shape
    y0, y1, x0, x1 = int(PH * .2), int(PH * .8), int(PW * .15), int(PW * .85)
    tpl = pg[y0:y1, x0:x1]; top = fg[:int(FH * .45)]
    best = (-2, 0, 0, 0)
    def tryk(ks):
        nonlocal best
        for k in ks:
            tw, th = int(tpl.shape[1] * k), int(tpl.shape[0] * k)
            if tw < 16 or th < 16 or tw >= top.shape[1] or th >= top.shape[0]: continue
            r = cv2.matchTemplate(top, cv2.resize(tpl, (tw, th), interpolation=cv2.INTER_AREA), cv2.TM_CCOEFF_NORMED)
            _, mv, _, ml = cv2.minMaxLoc(r)
            if mv > best[0]: best = (mv, k, ml[0], ml[1])
    tryk(np.linspace(.25, 1.1, 35))
    k0 = best[1]; tryk(np.linspace(k0 * .96, k0 * 1.04, 17))
    mv, k, mx, my = best
    return k, mx - x0 * k, my - y0 * k, mv
if __name__ == '__main__':
    import sys
    from PIL import Image
    p = np.array(Image.open(sys.argv[1]).convert('RGBA')); f = np.array(Image.open(sys.argv[2]).convert('RGBA'))
    print(reg(p, f))
