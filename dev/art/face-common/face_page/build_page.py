#!/usr/bin/env python3
"""build_page.py -> face_tick.html (owner Lượt 703 face-tick page, NDX5).
Data: FACE_MAP_L703.json (run face_map_L703.py first; 'Kho' = hidden) + ASSETS_L703.json
({cut_id: asset_url}, written after uploading face crops to the artifact; keyed by CUT so a redrawn face needs a new upload).
Publish face_tick.html to the same artifact URL (see dev/handover/reports/NDX5.md)."""
import json, os
D = os.path.dirname(os.path.abspath(__file__)); FC = os.path.dirname(D)
G = ["Tươi tắn","Dịu dàng","Đoan trang","Sắc sảo","Tinh nghịch","Kiêu kỳ","Lạnh lùng","Quyến rũ"]
m = json.load(open(os.path.join(FC, "FACE_MAP_L703.json"), encoding="utf-8"))
ap = os.path.join(D, "ASSETS_L703.json")
A = json.load(open(ap, encoding="utf-8")) if os.path.exists(ap) else {}
F = [{"id": k, "group": v["group"], "ver": v.get("ver") or "", "cut": v["cut"]}
     for k, v in sorted(m.items(), key=lambda kv: (G.index(kv[1]["group"]) if kv[1]["group"] in G else 99, kv[0]))
     if not v["hidden"]]
bad = [f["id"] for f in F if f["group"] not in G]; assert not bad, ("unknown group", bad)
img = {f["id"]: A[f["cut"]] for f in F if f["cut"] in A}
miss = [f["id"] for f in F if f["id"] not in img]
s = open(os.path.join(D, "page.src.html"), encoding="utf-8").read()
s = s.replace("/*FACES*/[]", json.dumps(F, ensure_ascii=False), 1).replace("/*IMG*/{}", json.dumps(img), 1)
open(os.path.join(D, "face_tick.html"), "w", encoding="utf-8").write(s)
print(len(F), "faces;", len(img), "with picture; missing picture:", miss)
