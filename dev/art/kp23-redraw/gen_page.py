#!/usr/bin/env python3
"""Build img/_review/kp23-redraw.html: old (live act-<key>-h) | new (_review/kp23-redraw/<key>.webp), whole pictures (owner L2417: no cover crop, tap = full original).
Rows = keys in done.json (in unticked.json order). Each row: tick «Giữ» or «Vẽ lại». Button copies 'KP23RD PICK: giu=… ve-lai=…'."""
import json, os
H = os.path.dirname(os.path.abspath(__file__)); R = os.path.abspath(os.path.join(H, "..", "..", ".."))
U = json.load(open(os.path.join(H, "unticked.json"))); D = json.load(open(os.path.join(H, "done.json")))
L = dict(json.load(open(os.path.join(H, "labels.json")))); P = json.load(open(os.path.join(H, "prompts.json")))["prompts"]
VER = int(open(os.path.join(H, "page_ver.txt")).read()) + 1 if os.path.exists(os.path.join(H, "page_ver.txt")) else 1
open(os.path.join(H, "page_ver.txt"), "w").write(str(VER))
rows = [[k, L.get(k, k), D[k].get("note", ""), P[k]["old"]] for k in P if k in D]
html = open(os.path.join(H, "page.tpl.html")).read().replace("/*ROWS*/[]", json.dumps(rows, ensure_ascii=False)).replace("{N}", str(len(rows))).replace("{V}", str(VER))
open(os.path.join(R, "img", "_review", "kp23-redraw.html"), "w").write(html)
print(len(rows), "rows", "v=%d" % VER)
