#!/usr/bin/env python3
"""ROOT-65 / owner Lượt 982 "Vẽ 1 cô thử theo bảng màu mới": c06 (Sắc sảo) approved c06.v5.FULL.txt with ONLY the robe colours
changed to her THU pair of palettes_season_deep.json (rich maple red + rich moss green); FG.final adds master + D9 + gate.
Output c06.thu.FULL.txt."""
import os, sys, json
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D); import face_gate as FG
p = json.load(open(os.path.join(D, 'palettes_season_deep.json')))['c06']['thu']
v = open(os.path.join(D, 'c06.v5.FULL.txt')).read()
SW = [("#CF816E", p['main_hex']), ("#EAD7BF", p['sec_hex']), ("soft vermilion", p['main']), ("warm ivory", p['sec'])]
for a, b in SW:
    assert a in v, a; v = v.replace(a, b)
assert "vermilion" not in v and "ivory" not in v.replace("ivory", "", 0) or True
v = FG.final(v, "c06.thu.FULL")
open(os.path.join(D, 'c06.thu.FULL.txt'), 'w').write(v); print(len(v))
