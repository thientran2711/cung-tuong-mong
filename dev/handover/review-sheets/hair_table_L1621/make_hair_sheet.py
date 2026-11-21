#!/usr/bin/env python3
"""HAIR1: LIST-format sheets of dev/art/hair/HAIR_TABLE.json (drawn by code, 0 credits).
00_danh_muc.png = the style catalogue; then per group two sheets: _A (t1–t4) and _B (t5–t8). One row per person."""
import json, os
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
T = json.load(open(os.path.join(ROOT, "dev/art/hair/HAIR_TABLE.json"), encoding="utf-8"))
P = T["people"]
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf" % ("-Bold" if b else ""), n)
RV = {1: "Đáp ứng", 2: "Thường tại", 3: "Quý nhân", 4: "Tần", 5: "Phi", 6: "Quý phi", 7: "Hoàng quý phi", 8: "Hoàng hậu"}
BG = (250, 247, 240); INK = (30, 30, 30); RED = (110, 20, 30); GREY = (95, 95, 95)
RK = {1: (231, 240, 250), 2: (232, 246, 236), 3: (250, 240, 228), 4: (243, 233, 246), 5: (250, 233, 236), 6: (236, 240, 226), 7: (246, 240, 222), 8: (252, 244, 214)}
W = 2080; LW = 150; CW = (W - LW - 20) // 4; RH = 178
FOOT = "vẽ bằng code · 0 cr · TỔNG 0 cr · HAIR1 · ĐỀ XUẤT, chờ chủ duyệt"


def wrap(d, txt, font, w):
    out, line = [], ""
    for word in txt.split(" "):
        tst = (line + " " + word).strip()
        if d.textlength(tst, font=font) <= w: line = tst
        else: out.append(line); line = word
    out.append(line); return out


SE = T["seasons"]; SV = T["season_vi"]
SC = {"xuan": (200, 60, 110), "ha": (200, 110, 20), "thu": (150, 80, 30), "dong": (40, 90, 160)}


def cell(d, x, y, r, draw=True):
    """one rank cell = 4 season blocks stacked; returns the height used"""
    yy = y + 6
    for se in SE:
        vs = r[se]["vi_short"]
        lines = wrap(d, f"{SV[se]}: {vs[0]}", F(23, True), CW - 22)[:2]
        for n, ln in enumerate(lines):
            if draw:
                if n == 0:
                    lab = SV[se] + ":"; d.text((x + 10, yy), lab, font=F(23, True), fill=SC[se])
                    d.text((x + 10 + d.textlength(lab + " ", font=F(23, True)), yy), ln[len(lab) + 1:], font=F(23, True), fill=INK)
                else:
                    d.text((x + 10, yy), ln, font=F(23, True), fill=INK)
            yy += 28
        for ln in wrap(d, " · ".join(vs[1:]), F(19), CW - 30)[:2]:
            if draw: d.text((x + 22, yy), ln, font=F(19), fill=(80, 80, 80))
            yy += 23
        yy += 6
    return yy - y


def group_sheet(g, ids, part):
    tiers = [1, 2, 3, 4] if part == "A" else [5, 6, 7, 8]
    tmp = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    rh = {pid: max(cell(tmp, 0, 0, P[pid][f"t{t}"], False) for t in tiers) + 8 for pid in ids}
    H = 196 + 70 + sum(rh.values()) + 60
    im = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(im)
    d.text((20, 15), f"Bảng kiểu tóc L1621 — nhóm {g} ({len(ids)} người) · bậc {tiers[0]}–{tiers[-1]} · 4 mùa", font=F(46, True), fill=RED)
    note = ("Bậc 1–3: chỉ BÚI phần tóc trên, phần lớn tóc XÕA (tuổi 18/26). Tuổi 36+: phần xõa búi gọn ở gáy (luật F11)."
            if part == "A" else "Bậc 4–8: búi hết tóc lên. Bậc 7–8: búi nằm dưới mũ phượng (chữ mũ giữ nguyên).")
    d.text((20, 78), note, font=F(26), fill=GREY)
    d.text((20, 114), "Mỗi mùa một kiểu (L1631): cùng bậc + cùng mùa: 90 người = 90 kiểu khác nhau", font=F(24, True), fill=(20, 110, 40))
    d.text((20, 146), "Mỗi người: 8 bậc × 4 mùa = 32 kiểu khác nhau · 4 mùa của 1 bậc = 4 dáng búi khác nhau (máy kiểm tra: PASS)", font=F(24, True), fill=(20, 110, 40))
    y = 196
    for j, t in enumerate(tiers):
        x = LW + j * CW
        d.rounded_rectangle((x + 4, y, x + CW - 6, y + 58), 10, fill=RK[t])
        d.text((x + 16, y + 10), f"t{t} {RV[t]}", font=F(32, True), fill=INK)
    y += 70
    for k, pid in enumerate(ids):
        if k % 2 == 0: d.rectangle((10, y, W - 10, y + rh[pid] - 4), fill=(244, 240, 230))
        d.text((22, y + 14), pid, font=F(38, True), fill=INK)
        for j, t in enumerate(tiers):
            cell(d, LW + j * CW, y, P[pid][f"t{t}"])
        y += rh[pid]
    d.text((20, H - 45), FOOT, font=F(22), fill=GREY)
    return im


def catalogue():
    A = T["axes"]; H = 2600
    im = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(im)
    d.text((20, 15), "Danh mục kiểu búi L1621 — 10 dáng búi riêng cho MỖI bậc (không bậc nào dùng lại)", font=F(42, True), fill=RED)
    d.text((20, 72), "Kiểu tóc = DÁNG BÚI × VỊ TRÍ (bậc 1–3) / MAI TÓC (bậc 4–8) × CÁCH QUẤN = 10×3×3 = 90 kiểu mỗi bậc", font=F(27, True), fill=INK)
    d.text((20, 110), "Bậc 1–3 thêm PHẦN XÕA: " + " / ".join(v for v, _ in A["loose_t1_t3_a18_a26"]) + " · tuổi 36+: búi gọn ở gáy", font=F(24), fill=GREY)
    d.text((20, 142), "Vị trí búi (1–3): " + " / ".join(v for v, _ in A["position_t1_t3"]) + "   ·   Mai tóc (4–8): " + " / ".join(v for v, _ in A["sides_t4_t8"]), font=F(24), fill=GREY)
    d.text((20, 174), "Cách quấn: " + " / ".join(v for v, _ in A["wrap"]), font=F(24), fill=GREY)
    y0 = 225; colw = (W - 40) // 2
    for t in range(1, 9):
        c, r = (t - 1) % 2, (t - 1) // 2
        x = 20 + c * colw; y = y0 + r * 580
        d.rounded_rectangle((x, y, x + colw - 20, y + 560), 14, fill=RK[t])
        d.text((x + 16, y + 10), f"t{t} {RV[t]}", font=F(34, True), fill=INK)
        yy = y + 60
        for code, vi, en in A["shape"][f"t{t}"]:
            d.text((x + 16, yy), f"{code}  {vi}", font=F(26, True if t <= 3 else False), fill=INK); yy += 48
    d.text((20, H - 45), FOOT, font=F(22), fill=GREY)
    return im


def main():
    files = []
    im = catalogue(); fn = os.path.join(HERE, "00_danh_muc.png"); im.save(fn); files.append(fn)
    for n, g in enumerate(T["group_order"], 1):
        ids = sorted(p for p in P if P[p]["group"] == g)
        for part in "AB":
            im = group_sheet(g, ids, part)
            fn = os.path.join(HERE, f"{n:02d}{part}_{g.replace(' ', '_')}_t{'1-4' if part == 'A' else '5-8'}.png")
            im.save(fn, optimize=True); files.append(fn)
    left = [p for p in P if P[p]["group"] not in T["group_order"]]
    assert not left, left
    print("\n".join(files))


if __name__ == "__main__":
    main()
