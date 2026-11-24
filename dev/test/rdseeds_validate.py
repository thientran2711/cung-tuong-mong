#!/usr/bin/env python3
"""ORDER THIN P8 validator: composed origin roads (API P8 in dev/handover/reports/thin.md «## API P8»).
usage: python3 dev/test/rdseeds_validate.py [files…] [--min] [--origins tt,dtq] [--quiet]
  no files = every dev/handover/content/thin/rdseeds_*.md (and dev/test/rdc-fixture.jsonl is NOT read unless named).
Checks every row: schema, laws 2/3 (every option Σgain steps == Σloss steps == BAL.road.c.st, gain ≥1, loss ≥1), climax 2 hi + 2 lo with ≥3 stats,
endings (win gain-only Σ3, lose loss-only Σ3, mid 1 + 1), speakers / needs / tokens per origin, VANPHONG words (no digits, no %, no odds words),
no copy of an old road hồi title, unique ids, premise ids not taken by the game. --min adds the per-origin pool minimums.
Errors (E) must be 0; warnings (W) are advice. The numbers below mirror BAL.road.c (jbalroad.js); rdc-play.js checks they match."""
import json, re, sys, glob, os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
ORIGINS = ['tt', 'dtq', 'muoi', 'thd', 'cn', 'cnv', 'td', 'ch', 'nc', 'bd', 'pf']
ST = 2                                   # BAL.road.c.st
EST = {'win': 3, 'lose': 3, 'mid': 1}    # BAL.road.c.Est
STATS = ['sung', 'danh', 'bac', 'suc', 'mat', 'th', 'hh', 'duc', 'tamco']
XSTATS = ['danh', 'sung', 'tamco', 'duc', 'mat', 'th', 'hh']   # BAL.road.c.xs
SPEAK = 'v v2 hh th emp maid me dad man eun doc kid dau mis foe'.split()
NEED = 'v v2 hh th srv nsrv kid dau man mis'.split()
TOK_ALL = 'v v2 hh me maid man manr eun k d emp sj N Nc tx Tx tg Tg tsv goi Goi xung Xung'.split()
TOK_O = {'tt': ['dad', 'dadr'], 'dtq': ['dad', 'dadr'], 'td': ['foe', 'foed'], 'cn': ['mis'], 'cnv': ['mis'],
         'nc': 'land pv mh quan pa pb canh laq nden kha dien huong'.split(), 'bd': 'land pv mh quan pa pb canh laq nden kha dien huong'.split(),
         'pf': 'land pv mh quan pa pb canh laq nden kha dien huong'.split()}
MIN = {'prem': 4, 'open': 14, 'openW': 7, 'openL': 7, 'comp': 16, 'turn': 8, 'a': 5, 'b': 5, 'f': 4}
ODDS = ['mong manh', 'khó lường', 'tùy duyên', 'rất vững', 'năm ăn năm thua', 'khá chắc', 'nắm chắc', 'chắc chắn', 'có cơ ', 'rất chắc']
MODERN = ['phần trăm', 'điểm số', 'level', 'ok ', 'oke', 'game', 'bonus', 'xác suất', 'tỉ lệ', 'tỷ lệ']

def words(s): return len(str(s or '').split())
def sentences(s): return len([x for x in re.split(r'(?<=[.!?…])\s+', str(s or '').strip()) if x.strip()])

def old_titles():
    T = set()
    for f in glob.glob(os.path.join(ROOT, 'dev/build/jrd_*.js')) + [os.path.join(ROOT, 'dev/build/j67.js'), os.path.join(ROOT, 'dev/build/jorigins.js')]:
        try: s = open(f, encoding='utf-8').read()
        except Exception: continue
        for m in re.finditer(r'\bh:"([^"]{3,})"', s): T.add(m.group(1).strip().lower())
    return T

def taken_ids():
    I = set()
    for f in glob.glob(os.path.join(ROOT, 'dev/build/*.js')):
        if f.endswith('jrdcsd.js'): continue
        try: s = open(f, encoding='utf-8').read()
        except Exception: continue
        for m in re.finditer(r'ARC67\.([a-z0-9_]+)\s*=', s): I.add(m.group(1))
        for m in re.finditer(r'ARC67\[["\']([a-z0-9_]+)["\']\]\s*=', s): I.add(m.group(1))
        for m in re.finditer(r'rdDef\("([a-z0-9_]+)",\s*(\d+)', s): I.add(m.group(1)); I.add(m.group(1) + '_' + m.group(2))
    return I

def read_rows(files):
    rows = []
    for f in files:
        for i, line in enumerate(open(f, encoding='utf-8'), 1):
            line = line.strip()
            if not line.startswith('{'): continue
            try: r = json.loads(line)
            except Exception as e: rows.append({'__bad': f'{os.path.basename(f)}:{i}: JSON {e}'}); continue
            r['__f'] = f'{os.path.basename(f)}:{i}'; rows.append(r)
    return rows

class V:
    def __init__(s): s.E = []; s.W = []
    def e(s, rid, m): s.E.append(f'E {rid}: {m}')
    def w(s, rid, m): s.W.append(f'W {rid}: {m}')

def text_scan(v, rid, o, label, t):
    t = str(t or '')
    if re.search(r'[0-9]', t): v.e(rid, f'{label}: digit in player text (law 7)')
    if '%' in t: v.e(rid, f'{label}: % in player text (law 7)')
    low = t.lower()
    for x in ODDS:
        if x in low: v.e(rid, f'{label}: odds word «{x.strip()}» (odds are shown by the engine only)')
    for x in MODERN:
        if re.search(r'(^|\W)' + re.escape(x.strip()) + r'(\W|$)', low): v.e(rid, f'{label}: modern word «{x.strip()}»')
    allowed = set(TOK_ALL + TOK_O.get(o, []))
    for m in re.finditer(r'\{([^}]*)\}', t):
        if m.group(1) not in allowed: v.e(rid, f'{label}: placeholder {{{m.group(1)}}} not allowed for origin {o}')
    if re.search(r'[{}]', re.sub(r'\{[A-Za-z0-9]+\}', '', t)): v.e(rid, f'{label}: stray brace')

def steps(v, rid, label, d, keys_ok, gain):
    tot = 0
    if not isinstance(d, dict) or not d: v.e(rid, f'{label}: empty'); return 0
    for k, n in d.items():
        if k not in keys_ok: v.e(rid, f'{label}: key «{k}» not allowed'); continue
        if k == 'sc' and not gain: v.e(rid, f'{label}: sc (Lợi thế) is gain only')
        if not isinstance(n, int) or n < 1: v.e(rid, f'{label}: {k} must be a whole step count ≥1'); continue
        tot += n
    return tot

def check_hoi(v, rid, o, h, clim, titles):
    texts = [h.get('h'), h.get('t')] + [x for op in (h.get('opts') or []) for x in (op.get('n'), op.get('rt'), op.get('rf'), op.get('wx'), op.get('lx'))]
    allt = ' '.join(str(x) for x in texts if x)
    roles = [k for k in ('v', 'v2') if '{' + k + '}' in allt]
    if not h.get('h'): v.e(rid, 'h (hồi title) missing')
    elif words(h['h']) > 10: v.e(rid, f'h longer than 10 words')
    elif words(h['h']) > 8: v.w(rid, 'h longer than 8 words')
    if str(h.get('h', '')).strip().lower() in titles: v.e(rid, f'h «{h.get("h")}» copies an old road hồi title')
    if h.get('w', 'me') not in SPEAK: v.e(rid, f'w «{h.get("w")}» not a speaker ({" ".join(SPEAK)})')
    for k in h.get('need') or []:
        if k not in NEED: v.e(rid, f'need «{k}» unknown')
    if not h.get('t'): v.e(rid, 't missing')
    elif sentences(h['t']) > 4: v.e(rid, 't longer than 4 sentences')
    elif sentences(h['t']) > 3: v.w(rid, 't longer than 3 sentences')
    for x in texts:
        if x: text_scan(v, rid, o, 'text', x)
    ok = STATS + ['sc'] + ['rel.' + r for r in roles] + (['tin'] if o == 'cnv' else [])
    oks = [k for k in ok if k != 'sc']
    O = h.get('opts')
    if not isinstance(O, list) or len(O) != 4: v.e(rid, 'opts must be exactly 4 options'); return roles
    for i, op in enumerate(O):
        lab = f'opt{i+1}'
        if not op.get('n'): v.e(rid, f'{lab}: n missing')
        elif words(op['n']) > 10: v.e(rid, f'{lab}: n longer than 10 words')
        elif words(op['n']) > 8: v.w(rid, f'{lab}: n longer than 8 words')
        if not op.get('rt'): v.e(rid, f'{lab}: rt missing')
        g = steps(v, rid, f'{lab} gain', op.get('gain'), ok, True)
        l = steps(v, rid, f'{lab} loss', op.get('loss'), oks, False)
        if g != ST or l != ST: v.e(rid, f'{lab}: Σgain {g} / Σloss {l} must both be {ST} (laws 2/3)')
        for k in set(op.get('gain') or {}) & set(op.get('loss') or {}):
            v.e(rid, f'{lab}: «{k}» is both gained and lost')
    if clim:
        R = [op.get('risk') for op in O]; S_ = [op.get('stat') for op in O]
        if sorted(R) != ['hi', 'hi', 'lo', 'lo']: v.e(rid, f'climax risks {R}: need exactly 2 hi + 2 lo')
        for i, s in enumerate(S_):
            if s not in XSTATS: v.e(rid, f'opt{i+1}: stat «{s}» not one of {" ".join(XSTATS)}')
        if len(set(S_)) < 3: v.e(rid, f'climax stats {S_}: need ≥3 different')
        for i, op in enumerate(O):
            if not op.get('rf'): v.e(rid, f'opt{i+1}: rf (what happens when it fails) missing')
    return roles

def check_E(v, rid, o, E, roles):
    if not isinstance(E, dict): v.e(rid, 'E missing'); return
    ok = [k for k in STATS] + ['rel.' + r for r in roles] + (['tin'] if o == 'cnv' else [])
    for k in ('win', 'mid', 'lose'):
        e = E.get(k)
        if not isinstance(e, dict): v.e(rid, f'E.{k} missing'); continue
        if not e.get('tag'): v.e(rid, f'E.{k}.tag missing')
        elif words(e['tag']) > 8: v.e(rid, f'E.{k}.tag longer than 8 words')
        elif words(e['tag']) > 6: v.w(rid, f'E.{k}.tag longer than 6 words')
        if not e.get('t'): v.e(rid, f'E.{k}.t missing')
        for x in (e.get('tag'), e.get('t')): text_scan(v, rid, o, f'E.{k}', x)
        fx = e.get('fx')
        if not isinstance(fx, dict) or not fx: v.e(rid, f'E.{k}.fx empty'); continue
        for s, n in fx.items():
            if s not in ok: v.e(rid, f'E.{k}.fx key «{s}» not allowed')
            if not isinstance(n, int) or n == 0: v.e(rid, f'E.{k}.fx {s} must be a whole step count')
        if k in ('win', 'lose'):
            if any(isinstance(n, int) and n < 0 for n in fx.values()): v.e(rid, f'E.{k}.fx: write positive step counts (the sign comes from the ending)')
            t = sum(abs(n) for n in fx.values() if isinstance(n, int))
            if t != EST[k]: v.e(rid, f'E.{k}.fx Σ {t} must be {EST[k]}')
        else:
            P = [n for n in fx.values() if isinstance(n, int) and n > 0]; N = [n for n in fx.values() if isinstance(n, int) and n < 0]
            if P != [1] or N != [-1]: v.e(rid, f'E.mid.fx must be exactly one +1 and one -1 step, got {fx}')

def validate(rows, origins=None, do_min=False):
    v = V(); titles = old_titles(); taken = taken_ids(); seen = {}
    C = {o: {'prem': [], 'open': 0, 'openW': 0, 'openL': 0, 'comp': 0, 'turn': 0, 'a': 0, 'b': 0, 'f': 0, 'frd': set(), 'need': 0, 'pool': 0} for o in ORIGINS}
    for r in rows:
        if '__bad' in r: v.e('?', r['__bad']); continue
        rid = r.get('id', '?'); o = r.get('o')
        if rid in seen: v.e(rid, f'duplicate id (also {seen[rid]})')
        seen[rid] = r.get('__f')
        if o not in ORIGINS: v.e(rid, f'o «{o}» not an origin ({" ".join(ORIGINS)})'); continue
        if origins and o not in origins: continue
        if r.get('tag') not in ('K', 'D'): v.e(rid, 'tag must be K or D')
        if not r.get('src'): v.e(rid, 'src (basis, law 8) missing')
        ty = r.get('type')
        if ty == 'prem':
            if not re.fullmatch(o + r'_[a-z]+', rid): v.e(rid, f'premise id must be «{o}_<letters>»')
            if rid in taken: v.e(rid, 'premise id already used by the game')
            for k in ('title', 'g', 'sj'):
                if not r.get(k): v.e(rid, f'{k} missing')
                else: text_scan(v, rid, o, k, r[k])
            if words(r.get('title')) > 8: v.e(rid, 'title longer than 8 words')
            if r.get('w', 'me') not in SPEAK: v.e(rid, f'w «{r.get("w")}» not a speaker')
            roles = []
            for s, n in (('s', 2), ('c', 3), ('t', 1), ('x', 1)):
                L = r.get(s)
                if not isinstance(L, list) or len(L) != n: v.e(rid, f'«{s}» must hold exactly {n} hồi'); continue
                for j, h in enumerate(L): roles += check_hoi(v, f'{rid}.{s}{j+1}', o, h, s == 'x', titles)
            cast = r.get('cast') or {}
            for k in cast:
                if k not in ('v', 'v2'): v.e(rid, f'cast key «{k}» must be v or v2')
            check_E(v, rid, o, r.get('E'), sorted(set(roles)))
            C[o]['prem'].append(rid)
        elif ty in ('open', 'comp', 'turn', 'clim'):
            if not re.fullmatch(r'rc-' + o + r'-[a-z0-9]+', rid): v.e(rid, f'part id must be «rc-{o}-<letters/digits>»')
            clim = ty == 'clim'
            roles = check_hoi(v, rid, o, r, clim, titles)
            C[o]['pool'] += 1
            if r.get('need'): C[o]['need'] += 1
            if ty == 'open':
                a = r.get('after')
                if a not in ('win', 'lose', '*'): v.e(rid, 'after must be win, lose or *')
                C[o]['open'] += 1; C[o]['openW'] += a in ('win', '*'); C[o]['openL'] += a in ('lose', '*')
            elif ty in ('comp', 'turn'): C[o][ty] += 1
            else:
                b = r.get('band')
                if b not in ('a', 'b', 'f'): v.e(rid, 'band must be a, b or f')
                for k in ('title', 'g', 'sj'):
                    if not r.get(k): v.e(rid, f'{k} missing')
                    else: text_scan(v, rid, o, k, r[k])
                if words(r.get('title')) > 8: v.e(rid, 'title longer than 8 words')
                rd = r.get('rd')
                if rd is not None and (not isinstance(rd, list) or not all(isinstance(x, str) and x.startswith(o + '_') for x in rd)):
                    v.e(rid, f'rd must be a list of {o}_ premise ids')
                if b == 'f':
                    if not rd: v.e(rid, 'band f needs rd = [the premise it closes]')
                    else: C[o]['frd'].update(rd)
                if b in ('a', 'b', 'f'): C[o][b] += 1
                for k in (r.get('need') or []):
                    if k not in ('v', 'v2'): v.e(rid, f'climax need «{k}»: only v / v2 (a chapter must always reach its climax)')
                check_E(v, rid, o, r.get('E'), roles)
        else: v.e(rid, f'type «{ty}» unknown (prem open comp turn clim)')
    for o in ORIGINS:
        c = C[o]
        if origins and o not in origins: continue
        if not (c['prem'] or c['pool']): continue
        for rd in sorted(c['frd']):
            if c['prem'] and rd not in c['prem']: v.w(o, f'band-f row names {rd}, not a premise in these files')
        if c['pool'] and c['need'] * 2 > c['pool']: v.w(o, f'{c["need"]} of {c["pool"]} parts have a need: keep at least half free so every life can compose')
        if do_min:
            for k in ('open', 'openW', 'openL', 'comp', 'turn', 'a', 'b', 'f'):
                if c[k] < MIN[k]: v.e(o, f'--min: {k} {c[k]} < {MIN[k]}')
            if len(c['prem']) < MIN['prem']: v.e(o, f'--min: premises {len(c["prem"])} < {MIN["prem"]}')
            for p in c['prem']:
                if p not in c['frd']: v.e(o, f'--min: premise {p} has no band-f finale (rd)')
    return v, C

def main(argv):
    do_min = '--min' in argv; quiet = '--quiet' in argv
    origins = None; files = []; skip = False
    for i, a in enumerate(argv):
        if skip: skip = False; continue
        if a.startswith('--origins'):
            if '=' in a: origins = a.split('=', 1)[1].split(',')
            else: origins = argv[i + 1].split(','); skip = True
        elif not a.startswith('--'): files.append(a)
    if not files: files = sorted(glob.glob(os.path.join(ROOT, 'dev/handover/content/thin/rdseeds_*.md')))
    rows = read_rows(files)
    v, C = validate(rows, origins, do_min)
    if not quiet:
        for x in v.W: print(x)
    for x in v.E: print(x)
    print('origin  prem  open(w/l)  comp  turn  clim a/b/f  roads-ready')
    for o in ORIGINS:
        c = C[o]
        if not (c['prem'] or c['pool']): continue
        ready = c['openW'] >= 7 and c['openL'] >= 7 and c['open'] >= 14 and c['comp'] >= 14 and c['turn'] >= 7 and c['a'] >= 3 and c['b'] >= 3 and c['f'] >= 1
        print(f'{o:6} {len(c["prem"]):4}  {c["open"]:3}({c["openW"]}/{c["openL"]})  {c["comp"]:4}  {c["turn"]:4}  {c["a"]}/{c["b"]}/{c["f"]}  {"yes" if ready else "no"}')
    print(f'RDSEEDS: {len(rows)} rows, {len(v.E)} errors, {len(v.W)} warnings')
    return 1 if v.E else 0

if __name__ == '__main__': sys.exit(main(sys.argv[1:]))
