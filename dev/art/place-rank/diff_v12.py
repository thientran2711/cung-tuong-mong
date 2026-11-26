"""PR12 (owner Lượt 692 (1b)): sentence-by-sentence diff of each góc xéo prompt vs the owner-praised model SyhTG51Ub8 (Phi v3).
python3 dev/art/place-rank/diff_v12.py > dev/handover/reports/place-rank-v12-prompt-diff.md"""
import json, re, difflib, os
D = os.path.dirname(os.path.abspath(__file__))
J = lambda f: json.load(open(os.path.join(D, f)))
src = open(os.path.join(D, 'prompts.py')).read()
SYH = re.search(r'^SYH = "(.*)"$', src, re.M).group(1)
def sents(p):
    p = p.replace(' — ', ' – ')
    return [s.strip() for s in re.split(r'(?<=[.;:])\s+(?=[A-Z(])', p) if s.strip()]
def diff(a, b):
    out = []
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, sents(a), sents(b), autojunk=False).get_opcodes():
        if op == 'equal': out.append(f'- = {i2 - i1} sentence(s) word for word')
        if op in ('delete', 'replace'):
            for s in sents(a)[i1:i2]: out.append(f'- DROPPED: {s}')
        if op in ('insert', 'replace'):
            for s in sents(b)[j1:j2]: out.append(f'- ADDED/REWORDED: {s}')
    return out
rooms = [('HQP bedroom', 'prompts_v11j.json', 'truong-xuan-cung-hqp-ngu-A-r5', "8aiwqQTIrU (model, mirrored Phi v9) + VX7x8c8MMU (frontal) as image 3/4", 'truong-xuan-cung-hqp-ngu-G12', '3zKCC2kREY'),
         ('HQP reception', 'prompts_v11f.json', 'truong-xuan-cung-hqp-A-r2', "O6EoWbJynm (FRONTAL) image 3 + 4RFIyNR9Aa image 4", 'truong-xuan-cung-hqp-G12', 'w4aXXie7EI'),
         ('HH bedroom', 'prompts_v11g.json', 'khon-ninh-cung-ngu-A-r4', "cpS5YIl0eP (FRONTAL) image 3 + SyhTG51Ub8 image 4", 'khon-ninh-cung-ngu-G12', 'SyheePgUb8'),
         ('HH reception', 'prompts_v11f.json', 'khon-ninh-cung-A-r2', "bxMA4ov5Y2 (FRONTAL) image 3 + 4RFIyNR9Aa image 4", 'khon-ninh-cung-G12', 'VX7xsQoMMU (seed 60161, r1)'),
         ('Quý phi bedroom', 'prompts_v11j.json', 'canh-phuc-cung-quyphi-ngu-A-r5', "eIPlheldqL (FRONTAL) image 3 + 8aiwqQTIrU image 4", 'canh-phuc-cung-quyphi-ngu-G12', 'SyheeywUb8')]
print('# PR12 — góc xéo prompt diff (owner Lượt 692 (1b)/(1c))\n')
print('MODEL = SyhTG51Ub8 Phi bedroom v3 (owner-praised góc xéo): Magnific creations_get metadata.prompt, gpt-2-6 2k 2688x1386, seed 97820, refs ONLY gOmYI7iSXO + EbYJzsMuuO (no image 3, no image 4). Other models: EbY494KuuO Tần v5 (seed 60161, refs + image 3 SyhTG51Ub8 as closeness guide), 4RFIyNR9Aa Phi v9 (seed 925576, refs + image 3 aFGyN6afSh = its own earlier picture). Full texts: prompts.py SYH; Magnific metadata.\n')
print('KEY FINDING: every v11f góc xéo used a C9 prompt (CAMERA AND SCALE: "the same camera distance … as image 3") + GOC11F ("this is the SAME room as image 3") with the room\'s FRONTAL as image 3 → the frontal pulls the view straight. The model has none of that: no image 3, its angle comes from "at the centre of the room, the large clear main subject, one larger canopy bed" + "carved lattice windows at the back" + the v3 redo sentence. v12 = the model text verbatim, only room parts swapped, SAME refs (2) and seed.\n')
for name, f, k, refs, k12, gen in rooms:
    old = J(f)[k]['prompt']; new = J('prompts_v12.json')[k12]['prompt']
    print(f'## {name}\n### (b) v11f góc xéo [{f} {k}; refs gOmYI7iSXO + EbYJzsMuuO + {refs}] vs MODEL SyhTG51Ub8')
    print('\n'.join(diff(SYH, old)))
    print(f'\n### (c) NEW v12 [{"prompts_v12.json"} {k12}; refs gOmYI7iSXO + EbYJzsMuuO only; seed 97820 → kept {gen}] vs MODEL SyhTG51Ub8 (only room parts)')
    print('\n'.join(diff(SYH, new)))
    print()
