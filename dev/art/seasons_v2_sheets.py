import os
from PIL import Image, ImageDraw, ImageFont
R = "/home/user/cung-tuong-mong/.claude/worktrees/agent-a2b1acde95dd96eea"
S = os.path.dirname(os.path.abspath(__file__))
OUT = R + "/dev/shots/seasons/pilot"
ART = R + "/dev/art/seasons-v2"
os.makedirs(OUT, exist_ok=True); os.makedirs(ART, exist_ok=True)
F = lambda n: ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", n)
SLOTS = ["xuan-sang", "ha-sang", "thu-sang", "dong-sang", "xuan-trua", "xuan-chieu", "xuan-toi"]
L = dict(zip(SLOTS, ["UPmtFrTwny", "5jVTIb5Kxe", "rgepaLgxtc", "JNavk0oOq4", "s7oBQZBl8e", "8aN9YugIrU", "SytIH6sUb8"]))
P = dict(zip(SLOTS, ["rgephkLxtc", "5jVTm3iKxe", "1lpDaAEr4r", "p8J72xZehw", "eIOJAsjdqL", "1lpDaW1r4r", "Bh4Pn7CoQR"]))
FLOOR_OLD, FLOOR_L, FLOOR_P = .62, .74, .64
VN = {"xuan": "Xuân", "ha": "Hạ", "thu": "Thu", "dong": "Đông", "sang": "sáng", "trua": "trưa", "chieu": "chiều", "toi": "tối"}
lab = lambda s: VN[s.split("-")[0]] + " " + VN[s.split("-")[1]]

def raw(i): return Image.open(f"{S}/raw/{i}.png").convert("RGB")
def old(s): return Image.open(f"{R}/img/ngu-hoa-vien-{s}.webp").convert("RGB")

# save candidate art files (not wired into the game)
for s in (SLOTS if os.environ.get('ART') else []):
    raw(L[s]).resize((1920, 1080), Image.LANCZOS).save(f"{ART}/ngu-hoa-vien-{s}.webp", quality=80, method=6)
    raw(P[s]).resize((1200, 1600), Image.LANCZOS).save(f"{ART}/ngu-hoa-vien-{s}-p.webp", quality=80, method=6)

def tag(im, t, sz=40):
    d = ImageDraw.Draw(im); f = F(sz); b = d.textbbox((0, 0), t, font=f)
    d.rectangle([0, 0, b[2] + 24, b[3] + 16], fill=(30, 20, 15)); d.text((12, 6), t, fill="white", font=f)

def stagecrop(im, W, H, ft):
    """same rule as kitFloorFit (jk2b): cover, floorTop at ~40% of the stage when cropped vertically, centred horizontally"""
    s = max(W / im.width, H / im.height); dw, dh = im.width * s, im.height * s
    r = im.resize((round(dw), round(dh)), Image.LANCZOS)
    y0 = 0
    if dh > H + 1: y0 = min(0, max(H - dh, .40 * H - ft * dh))
    x0 = (dw - W) / 2
    return r.crop((round(x0), round(-y0), round(x0) + W, round(-y0) + H))

# 1. landscape sheet: old | new, one row per slot, full resolution 1280x720 cells
cw, ch, g = 1280, 720, 12
sh = Image.new("RGB", (2 * cw + 3 * g, 7 * (ch + g) + g), (250, 245, 236))
for k, s in enumerate(SLOTS):
    a = old(s).resize((cw, ch)); tag(a, "CŨ · " + lab(s))
    b = raw(L[s]).resize((cw, ch), Image.LANCZOS); tag(b, "MỚI · " + lab(s))
    sh.paste(a, (g, g + k * (ch + g))); sh.paste(b, (2 * g + cw, g + k * (ch + g)))
sh.save(f"{OUT}/ngu-hoa-vien-ngang-cu-moi.jpg", quality=88)

# 2. portrait sheet: top row = old picture as it appears in an iPad stage box (593x614, cropped from the 16:9), bottom row = new 3:4
pw, ph = 768, 1024
sh = Image.new("RGB", (7 * (pw + g) + g, 2 * (ph + g) + g), (250, 245, 236))
for k, s in enumerate(SLOTS):
    a = stagecrop(old(s), 593, 614, FLOOR_OLD).resize((pw, round(614 * pw / 593)), Image.LANCZOS)
    a2 = Image.new("RGB", (pw, ph), (250, 245, 236)); a2.paste(a, (0, (ph - a.height) // 2)); tag(a2, "CŨ (khung iPad) · " + lab(s), 30)
    b = raw(P[s]).resize((pw, ph), Image.LANCZOS); tag(b, "MỚI dọc · " + lab(s), 30)
    sh.paste(a2, (g + k * (pw + g), g)); sh.paste(b, (g + k * (pw + g), 2 * g + ph))
sh.save(f"{OUT}/ngu-hoa-vien-doc-cu-moi.jpg", quality=88)

# 3. what each device's stage box actually shows (measured on main): old vs new, xuân sáng + đông sáng
DEV = [("Fold 755x1000", 739, 400, "L"), ("iPad 1180x820", 593, 614, "P"), ("iPad 1366x1024", 688, 818, "P"),
       ("iPad 1024x768", 513, 562, "P"), ("412x1058", 396, 423, "P"), ("390x844", 374, 338, "P")]
SC = 1
rows = []
for s in ["xuan-sang", "dong-sang", "xuan-toi"]:
    for which in ["old", "new"]:
        cells = []
        for name, W, H, shp in DEV:
            if which == "old": c = stagecrop(old(s), W * SC, H * SC, FLOOR_OLD)
            else: c = stagecrop(raw(L[s]) if shp == "L" else raw(P[s]), W * SC, H * SC, FLOOR_L if shp == "L" else FLOOR_P)
            tag(c, f"{'CŨ' if which == 'old' else 'MỚI'} · {lab(s)} · {name}", 26); cells.append(c)
        rows.append(cells)
hmax = max(c.height for c in rows[0])
Wt = sum(c.width for c in rows[0]) + g * (len(DEV) + 1)
sh = Image.new("RGB", (Wt, len(rows) * (hmax + g) + g), (250, 245, 236))
for r, cells in enumerate(rows):
    x = g
    for c in cells: sh.paste(c, (x, g + r * (hmax + g))); x += c.width + g
sh.save(f"{OUT}/ngu-hoa-vien-khung-san-khau.jpg", quality=90)
print("ok")
