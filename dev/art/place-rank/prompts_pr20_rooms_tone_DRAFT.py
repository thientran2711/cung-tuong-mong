# PR20 DRAFT — NOT LIVE. Waits for the owner's OK on ROOT-67's proposal (Lượt 1056). The live builder prompts_pr20_rooms.py is NOT changed.
# Owner 20/11 (on room32-s62-65 composite), verbatim: "Ok, phòng ốc màu sắc ổn … Cái màu của căn phòng nó cũng phải giống với cái màu của
#   cái bộ trang phục, tức là cùng một cái tông màu … mình có cách nào mình ghi trong cái prom để mình mô tả rằng là cái căn phòng nó sẽ có cái
#   tông màu giống như cái nhân vật không, đồng thời phải có ánh sáng trắng."
# A17 diff vs prompts_pr20_rooms.py (r3334 + batch2): ONE added sentence TONE, placed right after the RANK COLOUR sentence, + image 4 = the
#   tone swatch strip (room_tone_swatch.py). Nothing else changes (layouts, floor fix, white light END, refs 1–3).
import os, sys, json, contextlib, io
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
with contextlib.redirect_stdout(io.StringIO()):
    import prompts_pr20_rooms as R
A = R.A
SWATCH = 'SWATCH_ID_TBD'   # creations_upload_image of the strip (0 cr) once the owner says OK
TONE = (" COLOUR TONE (owner: the room has the same colour tone as the outfit of the woman who lives here): the whole room keeps the same "
        "lightness and softness as her clothes, like the colour strip in image 4: fresh but calm, medium saturation, never brighter, darker or "
        "more saturated than her outfit, never vivid or neon, never dusty or greyed; the wood, the silks, the curtains, the cushions and the "
        "ornaments all stay in that one mood, the pink of image 4 as the main colour with its ivory and soft jade-green partners; bright neutral "
        "white daylight over everything, no warm golden or amber cast.")
ANCH = "no purple, no orange, no red silks."   # last words of RC4 / RC4R (rank colour sentence) in every room prompt
def add_tone(p):
    assert p.count(ANCH) == 1, 'rank colour anchor'; return p.replace(ANCH, ANCH + TONE)
OUT = {}
for S in (R.R3334, R.BATCH2):
    for k, v in S.items():
        OUT[k] = dict(prompt=add_tone(v['prompt']), refs=[*v['refs'], SWATCH])
for k, v in OUT.items():
    assert v['prompt'].count('image 4') == 2 and len(v['refs']) == 4, k
import room_gate; room_gate.guard(OUT, 'pr20-tone-draft')
json.dump(OUT, open(os.path.join(D, 'prompts_pr20_rooms_tone_DRAFT.json'), 'w'), ensure_ascii=False, indent=1)
open(os.path.join(D, 'prompts_pr20_tone_DRAFT_sample_chung-tu-cung-tan.txt'), 'w').write(OUT['chung-tu-cung-tan']['prompt'])
print({k: len(v['prompt']) for k, v in OUT.items()}, 'GATE PASS (DRAFT)')
