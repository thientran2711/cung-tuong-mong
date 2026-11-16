import sys
from PIL import Image, ImageDraw, ImageFont
D = '/home/user/wt/fig-bg/.figbg/'
FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
FR = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
import os
for c in ['/usr/share/fonts/truetype/noto/NotoSerif-Bold.ttf', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf']:
    if os.path.exists(c): FB = c; break
f1, f2, f3 = ImageFont.truetype(FB, 46), ImageFont.truetype(FB, 32), ImageFont.truetype(FR, 24)
W = 2400; BG = (246, 238, 222); INK = (92, 40, 30)
WHO = [('tan', 'tan', 'Tần · hồng · mẫu đơn'), ('hau', 'hau', 'Hoàng hậu · vàng · phượng'), ('maid', 'maid', 'Hạ nhân · xám · liễu'),
       ('emp', 'emp', 'Hoàng thượng · rồng mây'), ('man', 'cong', 'Vương gia/công tử · thủy mặc')]
DIRS = [('A', 'A · Tranh lụa cuộn treo (trục cuộn, viền gấm) — mỗi bậc một màu + một hoa văn'),
        ('B', 'B · Cửa sổ trăng / quạt lụa tròn sau đầu nhân vật, phần dưới là giấy cũ'),
        ('C', 'C · Lụa nhuộm màu + mây dát vàng, viền tan dần vào giấy sách (không khung)')]
def fit(im, h=None, w=None):
    if h: return im.resize((round(im.width * h / im.height), h), Image.LANCZOS)
    return im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
colw = (W - 60) // 5
blocks = []
# header + baseline
hdr = Image.new('RGB', (W, 120), BG); d = ImageDraw.Draw(hdr)
d.text((30, 18), 'Nền sau nhân vật toàn thân — 3 hướng mẫu (Tuần lục + hộp sự kiện)', font=f1, fill=INK)
d.text((30, 76), 'Mỗi hướng: hàng trên = trang Tuần lục (ô nhỏ góc = nền riêng), hàng dưới = hộp sự kiện có người. Không có người/chữ trong nền.', font=f3, fill=(110, 80, 60))
blocks.append(hdr)
base = Image.new('RGB', (W, 470), BG); d = ImageDraw.Draw(base)
d.text((30, 8), 'Hiện tại (chưa có nền)', font=f2, fill=INK)
b0 = fit(Image.open(D + 'all/book-0-tan.jpg'), h=410); base.paste(b0, (30, 52))
g0 = fit(Image.open(D + 'all/dlg-0-tan.jpg'), h=410); base.paste(g0, (60 + b0.width, 52))
blocks.append(base)
for k, title in DIRS:
    sec = Image.new('RGB', (W, 60), BG); ImageDraw.Draw(sec).text((30, 12), title, font=f2, fill=INK); blocks.append(sec)
    lab = Image.new('RGB', (W, 36), BG); dl = ImageDraw.Draw(lab)
    for i, (_, _, t) in enumerate(WHO): dl.text((30 + i * colw, 4), t, font=f3, fill=(110, 80, 60))
    blocks.append(lab)
    books = [fit(Image.open(D + f'all/book-{k}-{w}.jpg'), w=colw - 16) for w, _, _ in WHO]
    hb = max(b.height for b in books); row = Image.new('RGB', (W, hb + 12), BG)
    for i, ((w, f, _), b) in enumerate(zip(WHO, books)):
        x = 30 + i * colw; row.paste(b, (x, 0))
        th = fit(Image.open(D + f'raw/{k}-{f}.png').convert('RGB'), h=170)
        ImageDraw.Draw(row).rectangle([x + b.width - th.width - 14, b.height - th.height - 14, x + b.width - 8, b.height - 8], fill=(255, 255, 255))
        row.paste(th, (x + b.width - th.width - 11, b.height - th.height - 11))
    blocks.append(row)
    dl = [fit(Image.open(D + f'all/dlg-{k}-{w}.jpg'), w=colw - 16) for w, _, _ in WHO]
    hd = max(x.height for x in dl); row = Image.new('RGB', (W, hd + 30), BG)
    for i, x in enumerate(dl): row.paste(x, (30 + i * colw, 0))
    blocks.append(row)
H = sum(b.height for b in blocks); out = Image.new('RGB', (W, H), BG); y = 0
for b in blocks: out.paste(b, (0, y)); y += b.height
out.save(sys.argv[1], quality=84, optimize=True, progressive=True)
print(out.size, os.path.getsize(sys.argv[1]))
