# REJECTED by owner 21/11 ("không ra một chút gì gọi là Trung Hoa hết trơn, nhìn cứ như là phương Tây") — do NOT use; live = prompts_pr21_rooms_vivid.py
# PR21 COLOUR FIX (owner L1637 verbatim, on pr20/rooms-batch2-tan-tone-lbl.jpg: "Có cách nào cho mấy cái phòng này màu nó tươi tắn hơn không?
#   Game của mình mấy cái màu cũng tươi mà."; earlier: v1 too pale "nhạt hơn", rooms too brown "nâu nâu"). Foreman C #15: V3-B direction.
# A17 diff vs prompts_pr20_rooms_tone.py (TONE v2), A18 = only colour / wood / floor colour words (what the owner raised):
#   1. COLOUR LEVEL sentence: "soft ... gentle, light ... never saturated" -> fresh, bright, clear saturated like the game UI (no contradiction).
#   2. TONE v2 sentence -> TONE v3 = V3-B lacquer in the room palette (ivory + clear pink + jade green + gilt, light wood only as trims).
#   3. The palace card's dark wood names (sandalwood / huanghuali / elm / jichimu + brown words) -> ivory/pink lacquered wood (motifs, plaques kept).
#   4. TẦN level "polished wood" -> "lacquered wood".   5. FLOOR "warm polished" -> pale blond matt floorboards.
#   Layouts, floor-fraction fix, camera, name-tag strip, refs 1-3 unchanged; image 4 = strip v2 (pink:4 ivory:1 jade:1).
import os, sys, json, re, contextlib, io
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
with contextlib.redirect_stdout(io.StringIO()):
    import prompts_pr20_rooms_tone as T
SWATCH = '1lduM4wr4r'   # strip v2 tone-swatch-tan-t4-v2.png, uploaded 0 cr
CL_OLD = ("COLOUR LEVEL: soft, clear colours at the same level as the girl in image 2 and the room in image 1: gentle, light and pretty, "
          "every colour clearly readable, never saturated, never glaring, never neon, never pastel or washed out, never grey or dull.")
CL_NEW = ("COLOUR LEVEL (owner: fresh colours like our game): fresh, bright, clear saturated colours like the game UI and the girl in image 2, "
          "cheerful daylight, every colour clean and clearly readable; never dull, never muddy, never brownish, never washed-out, never pastel "
          "or grey, and never neon or glaring.")
TONE_NEW = (" COLOUR TONE (owner: the room has the same colour tone as the outfit of the woman who lives here, fresh and never brown): the "
            "room is dressed in the colours of the strip in image 4 at full strength: clear pink, ivory and fresh jade green, with thin gilt "
            "lines; the pillars, beams, wall panels, lattices and the big furniture are lacquered and painted in these colours: ivory and pale "
            "cream lacquer with clear pink and jade-green painted flowers and thin gilt lines, and the pink of image 4 is the main colour of the "
            "silks, curtains and cushions; only small trims show light natural wood; the room reads ivory, pink and jade with gilt, never a "
            "brown or dark-wood room; bright neutral white daylight, no warm golden or amber cast.")
WOOD_RX = re.compile(r"(?:dark red sandalwood|warm chestnut-brown huanghuali wood|light warm walnut-brown elm wood|"
                     r"light walnut-brown elm wood|warm reddish-brown jichimu wood)")
WOOD_NEW = "ivory lacquered wood painted with pink and jade-green flowers"
FL_OLD, FL_NEW = "FLOOR: warm polished wooden floorboards", "FLOOR: pale blond matt wooden floorboards, light and even, never dark, never glossy"
LV_OLD, LV_NEW = "polished wood with fine carving", "lacquered wood with fine carving"
def fix(p):
    for a in (CL_OLD, T.TONE, FL_OLD, LV_OLD): assert p.count(a) == 1, a[:40]
    p = p.replace(CL_OLD, CL_NEW).replace(T.TONE, TONE_NEW).replace(FL_OLD, FL_NEW).replace(LV_OLD, LV_NEW)
    p, n = WOOD_RX.subn(WOOD_NEW, p); assert n >= 2, n
    return p
OUT = {k: dict(prompt=fix(v['prompt']), refs=[*v['refs'][:3], SWATCH]) for k, v in T.OUT.items()}
for k, v in OUT.items():
    p = v['prompt']; assert 'never brownish' in p and 'image 4' in p and not WOOD_RX.search(p) and 'BRIGHT' not in p, k
import room_gate; room_gate.guard(OUT, 'pr21-bright')
json.dump(OUT, open(os.path.join(D, 'prompts_pr21_rooms_bright.json'), 'w'), ensure_ascii=False, indent=1)
for k, v in OUT.items():
    f = os.path.join(D, f'prompts_pr21_bright_{k}.txt'); open(f, 'w').write(v['prompt'])
    allow = [CL_OLD, T.TONE.strip(), FL_OLD, LV_OLD, *sorted(set(WOOD_RX.findall(T.OUT[k]['prompt'])))]
    open(f + '.keep', 'w').write(f"base: dev/art/place-rank/prompts_pr20_tone_{k}.txt\n" +
        ''.join(f"allow: {a}  # owner L1637 'tươi tắn hơn' + 'nâu nâu' (V3-B colour fix, PR21)\n" for a in allow))
print({k: len(v['prompt']) for k, v in OUT.items()}, 'GATE PASS')
