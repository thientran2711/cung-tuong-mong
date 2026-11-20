#!/usr/bin/env python3
"""A26 owner sheet (SEAL9, 0 cr): ONE colour per emotion = big Vietnamese name + big swatch + hex (disc_colours.json),
then the MISMATCHED discs (audit_20-11.json) with the group name written BIG on the picture (A27), and the 2 owner calls.
usage: disc_table.py STILL_DIR out.jpg   (STILL_DIR holds <g>-<key>.webp of the mismatched stills)"""
import json, sys, os
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, "../groups"))
from th_names import VI
C = json.load(open(f"{H}/disc_colours.json"))["colours"]; A = json.load(open(f"{H}/audit_20-11.json"))
WHO = {"th": "Thái hậu", "hh": "Hoàng hậu", "bg": "Bé gái", "bt": "Bé trai", "mm": "Ma ma", "ht": "Hoàng thượng trẻ",
       "htg": "Hoàng thượng già", "tg": "Thái giám", "tv": "Thị vệ", "pt": "Phi trẻ", "ptl": "Phi lớn tuổi"}
SD, OUT = sys.argv[1], sys.argv[2]
FP = "/usr/share/fonts/truetype/dejavu/DejaVuSans"
f = lambda s, b=True: ImageFont.truetype(FP + ("-Bold" if b else "") + ".ttf", s)
W, COLS, TW, TH = 1920, 4, 480, 300
BG, INK = (246, 242, 234), (25, 25, 25)
def name(k): return ("HĐ · " if k.startswith("act-") else "") + VI[k[4:] if k.startswith("act-") else k]
def textc(c):
    r, g, b = [int(c[i:i + 2], 16) for i in (1, 3, 5)]; return (255, 255, 255) if r * .3 + g * .59 + b * .11 < 140 else INK
emo = [k for k in C if not k.startswith("act-")]; act = [k for k in C if k.startswith("act-")]
mis = [x for x in A if x[5] == "MISMATCH"]
rows = lambda n: (n + COLS - 1) // COLS
MH = 500
Htot = 130 + 400 + 90 + rows(len(emo)) * TH + 90 + rows(len(act)) * TH + 110 + rows(len(mis)) * MH + 40
im = Image.new("RGB", (W, Htot), BG); dr = ImageDraw.Draw(im)
dr.text((30, 25), "MÀU ĐĨA CẢM XÚC — MỖI CẢM XÚC MỘT MÃ MÀU (A26)", fill=INK, font=f(54))
dr.text((30, 90), "Chung cho mọi người · ô viền ĐỎ = chờ chủ duyệt", fill=(90, 90, 90), font=f(30, False))
y = 130
dr.text((30, y + 10), "2 VIỆC CHỦ QUYẾT", fill=(190, 0, 0), font=f(46))
calls = [("HĐ · Ghen", [("#E7903B", "hổ phách (Thái hậu)"), ("#1E6B5C", "ngọc bích đậm — đề xuất")], "giống Mưu #208B77?"),
         ("Hăng hái", [("#F77156", "san hô — Hoàng hậu"), ("#8DC423", "xanh lá cũ — Thái hậu")], "lấy san hô cho mọi người?")]
for j, (t, sw, q) in enumerate(calls):
    x0 = 30 + j * 945; y0 = y + 75
    dr.rectangle([x0, y0, x0 + 915, y0 + 300], fill=(255, 255, 255), outline=(220, 0, 0), width=8)
    dr.text((x0 + 24, y0 + 16), t, fill=INK, font=f(46))
    for m, (hx, lab) in enumerate(sw):
        xx = x0 + 24 + m * 440; dr.rounded_rectangle([xx, y0 + 80, xx + 150, y0 + 200], 14, fill=hx)
        dr.text((xx + 162, y0 + 92), ("A " if m == 0 else "B ") + hx, fill=INK, font=f(34)); dr.text((xx + 162, y0 + 140), lab, fill=(80, 80, 80), font=f(20, False))
    dr.text((x0 + 24, y0 + 226), "Chọn A hay B? " + q, fill=(190, 0, 0), font=f(32))
y += 400
def grid(keys, title, y):
    dr.text((30, y + 20), title, fill=INK, font=f(46)); y += 90
    for i, k in enumerate(keys):
        x0, y0 = (i % COLS) * TW, y + (i // COLS) * TH; c = C[k]["hex"]
        flag = k in ("act-ghen", "hanghai")
        dr.rectangle([x0 + 14, y0 + 8, x0 + TW - 14, y0 + TH - 14], fill=(255, 255, 255), outline=(220, 0, 0) if flag else (200, 192, 180), width=8 if flag else 2)
        dr.rounded_rectangle([x0 + 30, y0 + 24, x0 + TW - 30, y0 + 170], 18, fill=c)
        dr.text((x0 + 46, y0 + 110), c, fill=textc(c), font=f(44))
        n = name(k); s = 46 if len(n) < 15 else (38 if len(n) < 19 else 32)
        dr.text((x0 + 32, y0 + 182), n, fill=INK, font=f(s))
        dr.text((x0 + 32, y0 + 240), ("chờ chủ duyệt" if k == "act-ghen" else C[k]["vi"].split(" — ")[0][:30]), fill=(90, 90, 90), font=f(24, False))
    return y + rows(len(keys)) * TH
y = grid(emo, "CẢM XÚC (ĐĨA TĨNH)", y)
y = grid(act, "HÀNH ĐỘNG (HĐ)", y)
dr.text((30, y + 20), f"ĐĨA SAI MÀU — {len(mis)} ảnh (trái: đang vẽ · phải: mã đúng)", fill=(190, 0, 0), font=f(46)); y += 110
for i, (k, g, h, off, d, st) in enumerate(mis):
    x0, y0 = (i % COLS) * TW, y + (i // COLS) * MH
    p = f"{SD}/{g}-{k}.webp"
    dr.rectangle([x0 + 14, y0, x0 + TW - 14, y0 + MH - 16], fill=(255, 255, 255), outline=(200, 192, 180), width=2)
    if os.path.exists(p):
        t = Image.open(p).convert("RGBA").resize((260, 260), Image.LANCZOS); im.paste(t, (x0 + (TW - 260) // 2, y0 + 74), t)
    lab = WHO.get(g, g); s = 44 if len(lab) < 12 else 34
    bb = dr.textbbox((0, 0), lab, font=f(s)); lw = bb[2] - bb[0]
    dr.text((x0 + (TW - lw) // 2, y0 + 14), lab, fill=(190, 0, 0), font=f(s))
    dr.text((x0 + 30, y0 + 344), name(k), fill=INK, font=f(40))
    dr.rectangle([x0 + 30, y0 + 400, x0 + 120, y0 + 468], fill=h, outline=(60, 60, 60)); dr.text((x0 + 128, y0 + 418), "→", fill=INK, font=f(34))
    dr.rectangle([x0 + 172, y0 + 400, x0 + 262, y0 + 468], fill=off, outline=(60, 60, 60))
    dr.text((x0 + 272, y0 + 402), h + " →", fill=(120, 120, 120), font=f(22, False)); dr.text((x0 + 272, y0 + 430), off, fill=INK, font=f(28))
y += rows(len(mis)) * MH
im.save(OUT, quality=88); print(OUT, im.size)
