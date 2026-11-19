#!/usr/bin/env python3
"""Owner sheet of the APPROVED SENTENCES registry (AP1, owner Lượt 500): each entry = thumbnail of the approved picture it came from +
ID + one-line Vietnamese meaning + the exact English sentence. Max 11 entries per image, phone-readable (1200 px wide).
Usage: python3 dev/art/approved/make_sheet.py [LUOT]   -> dev/handover/review-sheets/approved/approved_sentences_N.png"""
import os, re, sys, textwrap
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(os.path.dirname(H)))
sys.path.insert(0, os.path.dirname(H)); import check_approved as CA  # noqa: E402
OUT = os.path.join(ROOT, "dev/handover/review-sheets/approved"); TH = os.path.join(H, "thumbs")
LUOT = sys.argv[1] if len(sys.argv) > 1 else "500"
F = lambda n, b=False: ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf" % ("-Bold" if b else ""), n)
# picture text keyword -> thumb file (thumbs = small copies of the CDN pictures named in the registry 'picture' field)
KEYS = [("Lượt 395 store sheets", "P_STORE395.jpg"), ("Cao Ly V2", None), ("Phù Tang t4", "P_PT4.jpg"), ("Nữ đế c17", "P_ND.jpg"), ("ma ma m01", "P_MAMA.jpg"), ("prompt B", "P_T8B.png"),
        ("HQP c20", "P_HQP.png"), ("Ba Tư t1-t3", "P_LOW.jpg"), ("m13 + m20", "P_POSE.jpg"), ("triều phục c06 r21", "P_TP_R21.jpg")]
VN_X = {"X01": "Cấm viết màu phụ 'chỉ ở áo trong'.", "X02": "Câu cũ 'màu phụ ở áo trong và lót' chỉ được dùng khi có câu HAI MÀU (S01).",
        "X03": "Khăn phi bạch không được màu vàng/kim dưới bậc Quý phi.", "X04": "Màu phụ không được là trắng/ngà/kem/bạc/vàng kim.",
        "X05": "Bậc 7, 8, Nữ đế: dáng đứng không có khăn/dải lụa/đai bay.", "X06": "Không phi bạch / khăn choàng trên bậc 7, 8, Nữ đế, triều phục.",
        "X07": "Không cúi nhìn xuống, không 'mắt nhìn xuống'.", "X08": "Bậc 1-6 (và triều phục 1-6) không có phượng.",
        "X09": "Bậc 1-5 không có màu vàng hoàng gia.", "X10": "Không viết 'áo khoác ngắn' (trông như cung nữ).", "X11": "Không hở răng, không mở miệng.",
        "X12": "Không hoa trên tóc ở bậc 7, 8, Nữ đế, triều phục.", "X13": "Không dùng câu 'ảnh mẫu nét vẽ' (ảnh style đã bỏ).",
        "X14": "Công chúa không viết 'cao tám đầu / chân dài'."}


def thumb(pic, w=300, h=420):
    box = Image.new("RGB", (w, h), (236, 230, 216)); d = ImageDraw.Draw(box)
    fn = next((f for k, f in KEYS if k in pic), None)
    if not fn or not os.path.exists(os.path.join(TH, fn)):
        d.text((14, h // 2 - 40), "chưa có ảnh\ntrên CDN\n(chỉ gửi trong chat)", font=F(24), fill=(120, 90, 60)); return box
    im = Image.open(os.path.join(TH, fn)).convert("RGBA"); im.thumbnail((w, h))
    box.paste(im, ((w - im.width) // 2, (h - im.height) // 2), im); return box


def wrap(d, txt, font, width):
    lines = []
    for para in txt.split("\n"):
        words, cur = para.split(), ""
        for wd in words:
            t = (cur + " " + wd).strip()
            if d.textlength(t, font=font) <= width: cur = t
            else: lines.append(cur); cur = wd
        lines.append(cur)
    return lines


def entry_block(e, W=1200):
    tmp = ImageDraw.Draw(Image.new("RGB", (1, 1))); tw = W - 300 - 60
    is_s = e["id"].startswith("S")
    head = f"{e['id']} · {e['title']}"; vn = e.get("vn") or VN_X.get(e["id"], "")
    sc = "Phạm vi: " + e.get("scope", "") + ((" · tuổi " + e["ages"]) if e.get("ages") not in (None, "", "all") else "") + \
         ((" · chờ chị xác nhận: " + e["confirm"]) if e.get("confirm") not in (None, "", "-") else "")
    en = (e["text"] if is_s else "cấm: " + (e.get("regex") or e.get("slot", "") + " ~ " + e.get("regex", "")))
    parts = [(wrap(tmp, head, F(30, True), tw), F(30, True), (60, 30, 20)), (wrap(tmp, vn, F(29, True), tw), F(29, True), (20, 70, 40)),
             (wrap(tmp, sc, F(21), tw), F(21), (90, 90, 90)), (wrap(tmp, en, F(20), tw), F(20), (70, 70, 110))]
    th = sum(len(l) * (f.size + 8) + 10 for l, f, c in parts)
    pic = thumb(e.get("picture", "")) if is_s else None
    hgt = max(th, 420 if is_s else 0) + 30
    img = Image.new("RGB", (W, hgt), (250, 246, 236)); d = ImageDraw.Draw(img)
    x = 20
    if pic: img.paste(pic, (20, 15)); x = 340
    else: tw2 = W - 40
    y = 15
    for lines, f, c in parts:
        for ln in lines: d.text((x, y), ln, font=f, fill=c); y += f.size + 8
        y += 10
    d.line((0, hgt - 1, W, hgt - 1), fill=(200, 180, 150), width=2)
    return img


def main():
    S, X = CA.load_registry(); os.makedirs(OUT, exist_ok=True)
    pages = [S[i:i + 11] for i in range(0, len(S), 11)] + [X[i:i + 7] for i in range(0, len(X), 7)]
    files = []
    for n, pg in enumerate(pages, 1):
        blocks = [entry_block(e) for e in pg]
        kind = "CÂU ĐÃ DUYỆT (phải chép y nguyên)" if pg[0]["id"].startswith("S") else "CỤM TỪ BỊ CẤM"
        title = f"Lượt {LUOT} · {kind} · trang {n}/{len(pages)}"
        sub = "Chị duyệt MỘT lần: câu nào sai, ghi ID (vd. S12). Tiếng Anh = đúng chữ trong prompt; {…} = chỗ được đổi (màu, món…)."
        hdr = Image.new("RGB", (1200, 120), (120, 30, 30)); d = ImageDraw.Draw(hdr)
        d.text((20, 14), title, font=F(34, True), fill="white"); d.text((20, 70), sub, font=F(19), fill=(255, 230, 200))
        H_ = hdr.height + sum(b.height for b in blocks); im = Image.new("RGB", (1200, H_), "white"); im.paste(hdr, (0, 0)); y = hdr.height
        for b in blocks: im.paste(b, (0, y)); y += b.height
        fn = os.path.join(OUT, f"approved_sentences_{n}.png"); im.save(fn, optimize=True); files.append(fn)
        print(os.path.relpath(fn, ROOT), im.size)
    return files


if __name__ == "__main__":
    main()
