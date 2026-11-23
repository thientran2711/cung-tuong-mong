# PR21 v2 LIVE (CL target = 'rất nhẹ', owner L1669, rule L28) (owner 21/11 via Foreman C #17, V3-B REJECTED: "không ra một chút gì gọi là Trung Hoa hết trơn, nhìn cứ như là phương Tây ...
# PR21 v2 LIVE (owner 21/11 via Foreman C #17, V3-B REJECTED: "không ra một chút gì gọi là Trung Hoa hết trơn, nhìn cứ như là phương Tây ...
#   hình cũ ... có một cái màu trầm nó phủ lên, nó cứ bạc bạc bạc cái hình ... tao muốn nó tươi tắn hơn, chứ không có nghĩa là đổi cả cái
#   tông màu ... đổi cái saturate chẳng hạn.")
# A17 diff vs prompts_pr20_rooms_tone.py (TONE v2, dark Chinese woods kept): ONLY the COLOUR LEVEL sentence (A18: saturation / grey veil).
#   Old: "soft, clear colours … gentle, light and pretty … never saturated …" -> new: rich clear saturated colours, no grey veil / haze.
#   Everything else (woods, TONE v2, layouts, floor fix, refs, image 4) unchanged.
import os, sys, json, contextlib, io
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
with contextlib.redirect_stdout(io.StringIO()):
    import prompts_pr20_rooms_tone as T
SWATCH = '1lduM4wr4r'   # strip v2 tone-swatch-tan-t4-v2.png (pink:4 ivory:1 jade:1), uploaded 0 cr by PR21
CL_OLD = ("COLOUR LEVEL: soft, clear colours at the same level as the girl in image 2 and the room in image 1: gentle, light and pretty, "
          "every colour clearly readable, never saturated, never glaring, never neon, never pastel or washed out, never grey or dull.")
CL_NEW = ("COLOUR LEVEL (owner L1669: the 'rất nhẹ' look, the same colours only a little fresher): clear, clean colours like the girl in "
          "image 2, the same colours as the room in image 1, only a little fresher and richer: every colour clearly readable, no grey veil, "
          "no dull haze and no muted wash over the picture; never faded, never washed out, never grey or dull, never over-saturated, never "
          "neon or glaring.")   # rule L28: after the gen, grade with room_vivid.py ratnhe (0 cr)
CL_NEW = ("COLOUR LEVEL (owner: fresh and vivid, same colours): rich, clear, saturated colours like the girl in image 2, the same colours as "
          "the room in image 1 but fresher: every colour clean, vivid and clearly readable, with crisp contrast; no grey veil, no dull haze "
          "and no muted wash over the picture; never faded, never washed out, never grey or dull, and never neon or glaring.")
def fix(p):
    assert p.count(CL_OLD) == 1; return p.replace(CL_OLD, CL_NEW)
OUT = {k: dict(prompt=fix(v['prompt']), refs=[*v['refs'][:3], SWATCH]) for k, v in T.OUT.items()}
for k, v in OUT.items():
    assert 'no grey veil' in v['prompt'] and T.TONE in v['prompt'] and 'BRIGHT' not in v['prompt'], k
import room_gate; room_gate.guard(OUT, 'pr21-vivid')
json.dump(OUT, open(os.path.join(D, 'prompts_pr21_rooms_vivid.json'), 'w'), ensure_ascii=False, indent=1)
for k, v in OUT.items():
    f = os.path.join(D, f'prompts_pr21_vivid_{k}.txt'); open(f, 'w').write(v['prompt'])
    open(f + '.keep', 'w').write(f"base: dev/art/place-rank/prompts_pr20_tone_{k}.txt\n"
        f"allow: {CL_OLD}  # owner 21/11 'bạc bạc ... tươi tắn hơn ... đổi cái saturate' (COLOUR LEVEL only, PR21)\n")
print({k: len(v['prompt']) for k, v in OUT.items()}, 'GATE PASS')
