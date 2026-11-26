#!/usr/bin/env python3
"""endcard-top-scan (E98, law 11 whole family): list EVERY popup source in dev/build/*.js that can open over / before the life end card,
and which E98 rule now stops it for a dead life.
  kinds:  KMQ   = a kit motion scene (any function that calls kmPush)          -> j93 kmPush / kmPump drop (kmLifeOver), kitEndClear voids the running one
          GATE  = a popup function that draws its own layer (KES_GATE, jend)   -> returns null for a dead life
          CARD  = a Q insertion (Q.push / Q.unshift / Q.splice / Q=[…])         -> jend kesFront: only the end card stays while it is in Q
          BODY  = any other function that appends a layer to document.body      -> listed for review (not a popup over the card, or covered by a rule above)
usage: python3 dev/test/endcard-top-scan.py [build dir]       prints SOURCE | FILE:LINE | KIND | BEFORE | AFTER"""
import re, sys, os, glob
D = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', 'build')
FILES = sorted(f for f in glob.glob(os.path.join(D, 'j*.js')) if not f.endswith('all.js'))
src = {f: open(f, encoding='utf-8').read() for f in FILES}
end = src.get(os.path.join(D, 'jend.js'), '')
m = re.search(r'const KES_GATE=\[([^\]]*)\]', end)
GATE = set(re.findall(r'"(\w+)"', m.group(1))) if m else set()
FN = re.compile(r'function\s+(\w+)\s*\(')
rows = []
def owner(text, pos):
    best = None
    for mm in FN.finditer(text, 0, pos):
        best = mm.group(1)
    return best or '(top level)'
def line(text, pos): return text.count('\n', 0, pos) + 1
seen = set()
for f, t in src.items():
    b = os.path.basename(f)
    for mm in re.finditer(r'kmPush\(', t):
        o = owner(t, mm.start())
        if o in ('kmPush',) or (b, o, 'KMQ') in seen: continue
        seen.add((b, o, 'KMQ'))
        rows.append((o, f'{b}:{line(t, mm.start())}', 'KMQ', 'shown over the end card if queued before / running at the death (KK29 only checked kitReward at call time)', 'dropped (kmPump) / voided at death (kitEndClear); kitInk = the ending itself'))
    for mm in re.finditer(r'function\s+(\w+)\s*\(', t):
        n = mm.group(1)
        if n in GATE and (b, n, 'GATE') not in seen:
            seen.add((b, n, 'GATE'))
            rows.append((n, f'{b}:{line(t, mm.start())}', 'GATE', 'draws over / beside the end card of a dead life', 'no-op for a dead life (KES_GATE); toasts up at the death hidden (kitEndToasts)'))
    for mm in re.finditer(r'\bQ\.(push|unshift|splice)\(|\bQ=\[', t):
        o = owner(t, mm.start())
        if (b, o, 'CARD') in seen: continue
        seen.add((b, o, 'CARD'))
        rows.append((o, f'{b}:{line(t, mm.start())}', 'CARD', 'card queued behind (push) or IN FRONT of (unshift) the end card', 'dropped while the end card is in Q (kesFront, every draw / close)'))
    for mm in re.finditer(r'document\.body\.(appendChild|append|insertAdjacentHTML)\(', t):
        o = owner(t, mm.start())
        if o in GATE or (b, o, 'BODY') in seen: continue
        # a body layer made inside a KMQ scene (kmStage …) is covered by KMQ
        seen.add((b, o, 'BODY'))
        rows.append((o, f'{b}:{line(t, mm.start())}', 'BODY', 'layer on body (review: menus, panels, scene parts)', 'covered if called from a KMQ scene / GATE fn / player tap; not a life popup otherwise'))
kinds = {}
for r in rows: kinds[r[2]] = kinds.get(r[2], 0) + 1
print('SOURCE | FILE:LINE | KIND | BEFORE (dead life) | AFTER (E98)')
for r in sorted(rows, key=lambda r: ('KMQ', 'GATE', 'CARD', 'BODY').index(r[2])):
    print(' | '.join(r))
print(f'\n{len(rows)} sources: ' + ', '.join(f'{k} {v}' for k, v in kinds.items()) + f'; KES_GATE {len(GATE)} names' + ('' if GATE else ' (MISSING: jend KES_GATE not found = before E98)'))
missing = [n for n in GATE if not any(re.search(r'function\s+' + n + r'\s*\(', t) for t in src.values())]
if missing: print('KES_GATE names with no function in the build (stale):', ', '.join(missing))
