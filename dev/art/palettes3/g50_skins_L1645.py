"""PAL3 — G50 (owner L1645): list the pictures already drawn in the OLD colours of the ★GỐC roots that G50 recolours
(the 29 off-season roots in palettes_season_L1583.json '_g50_released'). Source = gen_ledger.jsonl: a gen counts when it
belongs to that person (person field / file name) and its prompt (inline or prompt_file) carries a hex within ΔE2000 < 6
of the old root main (deep-file root hex, palettes_season.json root/root_drawn hex, L761 hex). FAILED gens skipped.
Output: dev/handover/review-sheets/thu_palette_L1582/g50_skins_L1645.json (+ printed table). Run AFTER four_season_L1583.py."""
import json, re, os, sys, collections
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, '..', '..', '..')
sys.path.insert(0, HERE)
import check_unique as CU
os.chdir(ROOT)
SV = {'Xuân': 'xuan', 'Hạ': 'ha', 'Thu': 'thu', 'Đông': 'dong'}
new = json.load(open('dev/art/face-common/palettes_season_L1583.json'))
deep = json.load(open('dev/art/face-common/palettes_season_deep.json'))
REL = {}
for t in new['_g50_released']:
    p, sv = t.split(); s = SV[sv]; REL[p] = (s, {deep[p][s]['main_hex'].upper()})
for f in ('dev/art/face-common/palettes_season.json', 'dev/art/palettes3/palettes_season_L761.json'):
    d = json.load(open(f))
    for p, (s, v) in REL.items():
        for ss in SV.values():                     # the drawn colour may sit in another season slot in older files
            e = d.get(p, {}).get(ss, {})
            if isinstance(e, dict) and e.get('root'):
                for h in (e.get('main_hex'), (e.get('root_drawn') or {}).get('main_hex')):
                    if h and CU.de2000(h, deep[p][s]['main_hex']) < 12: v.add(h.upper())
skins_txt = open('dev/art/SKINS.md').read()
cache = {}
def ftext(f):
    if not isinstance(f, str) or not f: return ''
    if f not in cache: cache[f] = open(f).read() if os.path.isfile(f) else ''
    return cache[f]
rows = []
for i, l in enumerate(open('dev/art/gen_ledger.jsonl')):
    if not l.strip(): continue
    e = json.loads(l)
    if 'FAIL' in str(e.get('kind', '')).upper() or not e.get('gen_id'): continue
    txt = (str(e.get('prompt', '')) + str(e.get('magnific_prompt', '')) + ftext(e.get('prompt_file'))).upper()
    hx = set(re.findall(r'#[0-9A-F]{6}', txt))
    if not hx: continue
    meta = ' '.join(str(e.get(k, '')) for k in ('person', 'prompt_file', 'key', 'out', 'file', 'cut_png', 'note', 'target', 'kind'))
    ids = {str(e['person']).lower()} if e.get('person') else set(re.findall(r'(?<![a-z0-9])([cms]\d\d)(?![0-9])', meta.lower()))
    for p, (s, var) in REL.items():
        if p not in ids: continue
        m = sorted(h for h in hx if min(CU.de2000(h, v) for v in var) < 6)
        if not m: continue
        f = e.get('prompt_file') or e.get('out') or ''
        tier = e.get('rank') or (re.search(r'_t(\d)', f) or re.search(r'\bt(\d)\b', str(e.get('note', ''))) or [None, None])[1]
        age = e.get('age') or (re.search(r'a(18|26|36|51|65)', f + str(e.get('note', ''))) or [None, None])[1]
        rows.append(dict(person=p, season=s, season_vi=[k for k, v in SV.items() if v == s][0], tier=str(tier) if tier else '?',
                         age=('a' + str(age).lstrip('a')) if age else '?', gen_id=e['gen_id'], cut_id=e.get('cut_id'),
                         kind=e.get('kind'), ts=e.get('ts'), prompt_file=f, drawn_hex=m, ledger_line=i + 1,
                         already_in_SKINS=e['gen_id'] in skins_txt))
out = dict(_note='G50 (owner L1645) PAL3: pictures drawn in the OLD ★GỐC colours that G50 recolours → kho skins. '
                 'Redraw later with the new palette (owner order needed per A20/A21). Source gen_ledger.jsonl, ΔE2000 < 6.',
           old_root={p: dict(season=s, old_main=deep[p][s]['main_hex'], old_sec=deep[p][s]['sec_hex'],
                             new_main=new[p][s]['main_hex'], new_sec=new[p][s]['sec_hex'], matched_hex=sorted(v))
                     for p, (s, v) in REL.items()},
           skins=rows)
json.dump(out, open('dev/handover/review-sheets/thu_palette_L1582/g50_skins_L1645.json', 'w'), ensure_ascii=False, indent=1)
c = collections.Counter(r['person'] for r in rows)
print('skins', len(rows), 'people', len(c), 'already in SKINS.md', sum(r['already_in_SKINS'] for r in rows)); print(dict(c))
print('no picture found:', [p for p in REL if p not in c])

# --- write the kho section into dev/art/SKINS.md (idempotent: replaces the block between the markers)
B0, B1 = '<!-- G50-L1645 BEGIN -->', '<!-- G50-L1645 END -->'
TN = {'1': 'Đáp ứng', '2': 'Thường tại', '3': 'Quý nhân', '4': 'Tần', '5': 'Phi', '6': 'Quý phi', '7': 'Hoàng quý phi', '8': 'Hoàng hậu'}
lines = [B0, '## 21/11 G50 off-season ★GỐC roots recoloured → old pictures = SKINS (owner L1645, verbatim: "29 cặp màu gốc mà màu chính '
         'không ra đúng mùa. Tất nhiên là phải đổi theo luật mùa rồi. ... những người nào mà đã có phải vẽ lại, tức là cái hình của họ đưa vô kho '
         'đúng không? Để làm skin")',
         'Old colours → new colours per person: dev/handover/review-sheets/thu_palette_L1582/g50_skins_L1645.json (old_root). Built by '
         'dev/art/palettes3/g50_skins_L1645.py from gen_ledger.jsonl (prompt hex within ΔE 6 of the old root main). Pictures are NOT redrawn here '
         '(redraw with the new palette later, owner order per A20/A21). Never delete. "(also above)" = the gen is already a skin in an older section.']
for p in sorted(out['old_root']):
    o = out['old_root'][p]; rs = [r for r in rows if r['person'] == p]
    lines.append(f'- **{p}** {[k for k, v in SV.items() if v == o["season"]][0]} ★GỐC {o["old_main"]}+{o["old_sec"]} → {o["new_main"]}+{o["new_sec"]} · {len(rs)} picture(s)'
                 + ('' if rs else ' — no drawn gen found in gen_ledger (picture may predate the ledger; check the live CDN figure)'))
    for r in sorted(rs, key=lambda r: (r['tier'], r['ts'] or '')):
        t = r['tier']; tn = TN.get(t, '')
        lines.append(f'  - {p} | t{t} {tn} {r["age"]} ({r["kind"]}, {str(r["ts"])[:10]}) | gen {r["gen_id"]} cut {r["cut_id"] or "—"} | '
                     f'{r["prompt_file"] or "—"} | drawn {"/".join(r["drawn_hex"])}; replaced by G50 new palette (redraw pending)'
                     + (' (also above)' if r['already_in_SKINS'] else ''))
lines.append(B1)
txt = open('dev/art/SKINS.md').read()
if B0 in txt: txt = txt[:txt.index(B0)] + txt[txt.index(B1) + len(B1):].lstrip('\n')
open('dev/art/SKINS.md', 'w').write(txt.rstrip('\n') + '\n\n' + '\n'.join(lines) + '\n')
print('SKINS.md section written:', len(lines), 'lines')
