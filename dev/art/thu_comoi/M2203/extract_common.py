#!/usr/bin/env python3
"""Extract rank-ladder wordings from M2203-01..08 for COMMON_LIST.md (THUROOT7, report only)."""
import re, pathlib
P = pathlib.Path(__file__).resolve().parents[4] / "dev/handover/prompts_L2095"
F = {n: f"M2203-0{n}_s62_t{n}_thu.txt" for n in range(1, 9)}
T = {n: (P / F[n]).read_text() for n in F}
TOP = [
 ("Đai + 2 dây (sash + ties)", r"NO bow[^;]*;|[^,;]*(?:sash|girdle)[^;]*?two LONG[^;]*"),
 ("Tua (tassel)", r"(?:each|and) ending in[^;(]*"),
 ("Khuy cổ (clasp)", r"joined at the throat by[^;]*?never on the chest"),
 ("Vân kiên: hình/tầng (shape, tier)", r"vân kiên \((?:shoulder|soft shoulder|small shoulder|cầu vai)[^;]*"),
 ("Vân kiên: độ dài (length)", r"its lobes [^;]*?\)\)|its lobes [^;]*|its lower edge ending[^;]*"),
 ("Vân kiên: viền tua/ngọc (fringe)", r"[^;,]*fringe[^;]*"),
 ("Vân kiên: lưới ngọc (pearl net)", r"[^;]*\bnet (?:of|EMBROIDERED)[^;]*"),
 ("Mật độ thêu thân áo (body embroidery density)", r"[^;]*(?:scattered|more than at|clearly more than the)[^;]*"),
 ("Chỉ thêu (thread words)", r"EMBROIDERY THREAD \(rank law\)[^.]*\."),
 ("Phượng (phoenix)", r"No phoenix anywhere[^.]*\.|[^;.]*phoenix(?:es)? in flight[^;]*|The phoenix is the main[^.]*\."),
 ("Trang sức thang (jewels ladder)", r"[^;.(]*pearls and jewels[^;.]*|JEWELLERY:[^.]*\."),
 ("Cổ áo chuẩn (neckline standard)", r"(?:ONE straight SQUARE collar|a straight SQUARE collar \(|a straight SQUARE NECKLINE)[^;]*"),
 ("Áo trong (inner robe)", r"The INNER robe[^.]*\."),
 ("Ngực (chest motif)", r"a [^;]*embroidered on the front of the (?:bodice|robe) below the collar"),
 ("Thân áo / gấu (robe/hem length)", r"floor-length robe, (?:the hem|only slipper)[^.]*\.|an ankle-length[^,]*"),
 ("Tay áo (sleeve length)", r"SLEEVE LENGTH \(rank law\)[^.]*\."),
 ("Tóc (hair rank law)", r"HAIR \(rank law\)[^.]*\."),
 ("Mũ/trâm (headdress)", r"[^;.]*(?:crown|headdress|bu yao|hairpins)[^;.]*"),
 ("Dáng (GRACE block)", r"GRACE \(pose variety[^.]*\."),
 ("Góc (ANGLE block — never touch, A54)", r"ANGLE:[^.]*\."),
 ("Tư thế (Pose block — never touch, A54)", r"Pose:[^.]*\."),
]
def cell(x): return x.replace("|", "/").strip()
out = []
for name, rx in TOP:
    out.append(f"\n### {name}\n| t | wording (exact, M2203) |\n|---|---|")
    for n in F:
        m = re.findall(rx, T[n])
        out.append(f"| t{n} | " + (" ‖ ".join(cell(x) for x in m) if m else "— (none)") + " |")
print("\n".join(out))
