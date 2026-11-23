#!/usr/bin/env python3
"""RANKROOM (C8-RANKROOM, owner L2406): wire the 65 frontal rank rooms (img/_review/place-rank/pr13 on the CDN) into the game.

Table  : dev/art/place-rank/rank_rooms.json  (written by --table; 65 rows = rooms-page ph01..ph65, latest rN per room)
           id, base (game key), palace, rank (tan|phi|quyphi|phoi), kind (tiep-khach|ngu), side (chinh|dong|tay), src (CDN review key),
           slot ('live' = the game already has img/<base>-<mua>-<buoi>.webp for it; 'new' = no slot), drape (window-curtain triage)
Game   : dev/build/jres.js block  /*@RANK_ROOM*/ ... /*@END_RANK_ROOM*/  = the bases that are WIRED (only 'new' rooms; the 'live' rooms are a
         picture swap of the existing keys). Rank is read from the game's own state (rkOf + RANKS names) - no number is typed here.
Usage  :
  python3 rank_rooms_wire.py --table                      rebuild the table from the rooms page (needs network) -> rank_rooms.json
  python3 rank_rooms_wire.py --ok OKFILE                  DRY RUN: what would be done for the ok rooms (OKFILE: ids ph07 / bases, ',' or lines; '#' comments)
  python3 rank_rooms_wire.py --ok OKFILE --go [--all16]   build webp (decap + 1620 wide), back up every live key it overwrites to
                                                          img/_review/rankroom-backup/, upload via cdn_sync, rewrite the jres.js block
  python3 rank_rooms_wire.py --ok OKFILE --stage          LOCAL TEST ONLY: build the webps into img/ + write the jres.js block, NO backup, NO upload (serve img/ locally, then `git checkout dev/build/jres.js`)
  python3 rank_rooms_wire.py --revert                     restore the backed-up live keys from the backup, delete the new keys, empty the block
  python3 rank_rooms_wire.py --all-rooms ...              same as --ok with every room in the table (not for the owner's pick)
'live' rooms: img/<base>-ha-sang.webp only (like swap_L2370), or all 16 season x buoi files with --all16.
CDN uploads go to NEW keys (img/<base>-ha-sang.webp of a 'new' room); a live key is overwritten only after its copy is in the backup."""
import os, re, sys, json, subprocess, urllib.request
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..')); os.chdir(ROOT)
CDN = 'https://ctm-img.victoria-tntt.workers.dev/'
TABLE = 'dev/art/place-rank/rank_rooms.json'; JRES = 'dev/build/jres.js'; STAGE = 'img/_review/rankroom-stage'; BK = 'img/_review/rankroom-backup'
SEAS = ['xuan', 'ha', 'thu', 'dong']; TIMES = ['sang', 'trua', 'chieu', 'toi']
# window-curtain triage (rule L30, contact-sheet eye check by C8-RANKROOM, left+right 21 % strips of every picture): CLEAN = no fabric drape at a real window
# (bed canopy / arch hanging only); UNSURE = looks borderline, re-look; every other room = DRAPE (fabric curtain at a real window)
CLEAN = {'ph02', 'ph06', 'ph18', 'ph27', 'ph37'}; UNSURE = {'ph19', 'ph26', 'ph59'}
def get(u): return urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'ctm'}), timeout=60).read()
def parse_key(base):
    m = re.match(r'^(.*?-cung)-(dong-phoi|tay-phoi|tan|phi|quyphi)(-ngu)?$', base)
    pal, part, ngu = m.group(1), m.group(2), bool(m.group(3))
    return pal, ('phoi' if part.endswith('phoi') else part), ('dong' if part == 'dong-phoi' else 'tay' if part == 'tay-phoi' else 'chinh'), ('ngu' if ngu else 'tiep-khach')
def live_slots():
    s = open(JRES, encoding='utf-8').read(); m = re.search(r'const RES_VAR=\{(.*?)\};', s, re.S)
    return set(re.findall(r'"([a-z-]+)":"xuan-sang', m.group(1))) if m else set()
def build_table():
    s = get(CDN + 'img/_review/rooms-page/rooms.html').decode(); sec = re.search(r'SECS=(\[.*\])', s).group(1)
    for e in range(len(sec), 0, -1):
        try: d = json.loads(sec[:e]); break
        except Exception: pass
    live = {'canh-phuc-cung', 'canh-phuc-cung-dong-phoi', 'canh-phuc-cung-tay-phoi'}  # fallback; the real list is read from jres.js below
    live = live_slots() or live; rows = []
    for rid, label, src, rev, base, _ in d[0][1]:
        pal, rank, side, kind = parse_key(base)
        rows.append(dict(id=rid, base=base, palace=pal, rank=rank, side=side, kind=kind, label=label, rev=rev, src=src,
                         slot='live' if base in live else 'new', drape='clean' if rid in CLEAN else 'unsure' if rid in UNSURE else 'drape'))
    json.dump(rows, open(TABLE, 'w'), ensure_ascii=False, indent=1); print(len(rows), 'rows ->', TABLE,
        '| live', sum(r['slot'] == 'live' for r in rows), '| new', sum(r['slot'] == 'new' for r in rows)); return rows
def read_ok(f):
    toks = []
    for l in open(f, encoding='utf-8'): toks += [t for t in re.split(r'[\s,;]+', l.split('#')[0]) if t]
    return toks
def build_webp(src_key, out):
    from PIL import Image
    os.makedirs(STAGE, exist_ok=True); raw = f'{STAGE}/raw.webp'; open(raw, 'wb').write(get(CDN + src_key)); dec = f'{STAGE}/dec.webp'
    subprocess.run([sys.executable, 'dev/art/place-rank/decap.py', raw, dec], check=True, stdout=subprocess.DEVNULL)
    im = Image.open(dec).convert('RGB'); assert im.size == (2688, 1386), im.size
    im.resize((1620, round(1620 * 1386 / 2688)), Image.LANCZOS).save(out, 'WEBP', quality=80)
def write_block(bases):
    s = open(JRES, encoding='utf-8').read(); blk = '/*@RANK_ROOM*/const RANK_ROOM={' + ','.join(f'"{b}":1' for b in sorted(bases)) + '};/*@END_RANK_ROOM*/'
    s2 = re.sub(r'/\*@RANK_ROOM\*/.*?/\*@END_RANK_ROOM\*/', lambda m: blk, s, flags=re.S); assert s2 != s or blk in s, 'block marker missing in jres.js'
    open(JRES, 'w', encoding='utf-8').write(s2)
def main():
    a = sys.argv[1:]; go = '--go' in a; all16 = '--all16' in a
    if '--table' in a: build_table(); return
    rows = json.load(open(TABLE, encoding='utf-8')); by = {r['id']: r for r in rows}; byb = {r['base']: r for r in rows}
    if '--revert' in a:
        man = json.load(open(f'{STAGE}/manifest.json')) if os.path.exists(f'{STAGE}/manifest.json') else {'live': [], 'new': []}
        for k in man['live']:
            os.makedirs('img', exist_ok=True); open(f'img/{k}.webp', 'wb').write(get(f'{CDN}{BK}/{k}.webp'))
        if man['live']: subprocess.run([sys.executable, 'dev/site/cdn_sync.py', *[f'img/{k}.webp' for k in man['live']]], check=True)
        print('restored live keys:', len(man['live']), '| new keys left on the CDN (harmless, unreferenced):', len(man['new']))
        write_block([]); return
    if '--all-rooms' in a: pick = [r['id'] for r in rows]
    elif '--ok' in a: pick = read_ok(a[a.index('--ok') + 1])
    else: print(__doc__); return
    sel = []; unknown = []
    for t in pick:
        r = by.get(t) or byb.get(t)
        (sel.append(r) if r else unknown.append(t))
    print('ok rooms:', len(sel), '| unknown tokens:', unknown or 'none')
    new = [r for r in sel if r['slot'] == 'new']; live = [r for r in sel if r['slot'] == 'live']
    print('  new slot (wire):', len(new), '| live slot (swap):', len(live), '| not picked ->', len(rows) - len(sel), '(repaint list)')
    for r in sel: print(f"  {r['id']} {r['base']:<34} {r['slot']:<4} drape={r['drape']}")
    if '--stage' in a:
        os.makedirs('img', exist_ok=True)
        for r in sel: build_webp(r['src'], f'img/{r["base"]}-ha-sang.webp')
        write_block([r['base'] for r in new]); print('STAGED locally (no upload):', len(sel), 'files in img/'); return
    if not go: print('DRY RUN: nothing built, nothing uploaded'); return
    os.makedirs('img', exist_ok=True); os.makedirs(STAGE, exist_ok=True); os.makedirs(BK, exist_ok=True)
    man = {'live': [], 'new': []}; up = []
    for r in live:
        out = f'{STAGE}/{r["base"]}.webp'; build_webp(r['src'], out)
        keys = [f'{r["base"]}-{s}-{t}' for s in SEAS for t in TIMES] if all16 else [f'{r["base"]}-ha-sang']
        for k in keys:
            bk = f'{BK}/{k}.webp'
            try: open(bk, 'wb').write(get(f'{CDN}img/{k}.webp')); subprocess.run([sys.executable, 'dev/site/cdn_sync.py', bk], check=True)
            except Exception as e: print('  no old live', k, e); os.remove(bk); continue
            man['live'].append(k); open(f'img/{k}.webp', 'wb').write(open(out, 'rb').read()); up.append(f'img/{k}.webp')
    for r in new:
        k = f'{r["base"]}-ha-sang'; build_webp(r['src'], f'img/{k}.webp'); man['new'].append(k); up.append(f'img/{k}.webp')
    json.dump(man, open(f'{STAGE}/manifest.json', 'w'), indent=1)
    subprocess.run([sys.executable, 'dev/site/cdn_sync.py', *up], check=True)
    write_block([r['base'] for r in new]); print('uploaded', len(up), 'files; jres.js RANK_ROOM block =', len(new), 'bases')
main()
