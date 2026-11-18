#!/usr/bin/env python3
"""SHOWN-ODDS SCAN (review/shown-odds-one-path, ORDER ROOT-52 18/11; LUAT SUA CA NHOM).
Lists EVERY place in dev/build/j*.js that prints odds to the player and the roll path that decides the same outcome,
then classes each place by the parts that sit on ONE side only.

  usage: python3 dev/tools/shown-odds-scan.py [build_dir] [--table] [--all]
    build_dir  default dev/build (point it at another checkout's dev/build for the before table)
    --table    markdown table (place | shown fn | rolled fn | extra parts only on one side)
    --all      also list the 'inline' places (shown and rolled by the same expression in the same function)

A display place = a call of word( / kitOdds( / evChoice-ch70 p: / an option's o: / j78 odds( / sgOdds( that prints a
ladder word. Its shown fn is the expression inside. Classes:
  ACT-ONE    the act's odds through actOdds (j9): the same ACTX runAct rolls in (pen, lotB, spyKnowB) -> none
  ACT-RAW    an act's odds (ACT[k].o / A.o / a.o / o<Act>(S..)) read OUTSIDE runAct's ACTX while the roll is inside it
             -> pen (sent servant), lotB (her lá số on the act's domain), spyKnowB (spy knowledge) only on the rolled side
  OPT-ONE    a card option: card word and runOpt both read optOdds (j1) -> none
  OPT-RAW    a card option whose word adds lotB by hand (cardH) while runOpt adds it again -> two copies of one formula
  INLINE     shown and rolled by the same expression in the same function, outside ACTX on both sides -> none
  OTHER      no roll of the same expression found nearby (event text, side chances, preview of an NPC) -> listed for review
Exit 1 when an ACT-RAW or OPT-RAW place is left."""
import re, sys, glob, os

args = [a for a in sys.argv[1:] if not a.startswith('--')]
B = args[0] if args else os.path.join(os.path.dirname(__file__), '..', 'build')
TABLE, ALL = '--table' in sys.argv, '--all' in sys.argv
SKIP = {'all.js'}
src = {os.path.basename(f): open(f, encoding='utf-8').read() for f in sorted(glob.glob(os.path.join(B, 'j*.js'))) if os.path.basename(f) not in SKIP}

# the act odds helpers: functions an ACT's o: returns (oSpy, oFrame, ...), read from the A("k",…,{o:…}) definitions
ofn = set()
for t in src.values():
    for m in re.finditer(r'\bA\("(\w+)",', t):
        mm = re.search(r'\bo:\s*\(?[\w,]*\)?\s*=>\s*(o[A-Z]\w*|odT|loStealO|tsb\w+O)\(', t[m.end():m.end() + 1500])
        if mm: ofn.add(mm.group(1))

def arg_of(line, i):
    """balanced text of the call whose '(' is at line[i]"""
    d = 0
    for j in range(i, len(line)):
        if line[j] == '(': d += 1
        elif line[j] == ')':
            d -= 1
            if d == 0: return line[i + 1:j]
    return line[i + 1:i + 160]

def fn_at(lines, n):
    for k in range(n, max(-1, n - 40), -1):
        m = re.search(r'function\s+(\w+)\s*\(|(\w+)\s*=\s*(?:function|\([^)]*\)\s*=>)|PEND\.(\w+)\s*=|A\("(\w+)"', lines[k])
        if m: return next(g for g in m.groups() if g)
    return '?'

# act odds rolled OUTSIDE runAct (no ACTX on either side): the display may read the raw helper there
NOCTX = {('j2.js', 'deal'): 'runOpt (deck card, outside runAct)', ('j83.js', 'wkgive'): 'ACT.poison.f called directly by wkPoison (no runAct)',
         ('jtwoway.js', 'add'): 'twDo (TW two-way act, no runAct)', ('jagent.js', '?'): 'twDo (TW join, no runAct)'}
ACT_RAW = re.compile(r'(\bACT\[\w+\]\.o\(|\bACT\.\w+\.o\(|\b[Aa]\.o\(S|\bA2?\.o\(|\bD\.o\(|\b(' + '|'.join(sorted(ofn)) + r')\(S\b)')
rows = []
for f, t in src.items():
    L = t.split('\n')
    for n, line in enumerate(L):
        for m in re.finditer(r'\b(word|kitOdds|sgOdds|odds)\(|[{,]\s*(p|o):(?!\s*(?:\{|\[|"|`|null|100\b|a\b(?!\.)))', line):
            if m.group(1) in ('odds',) and f != 'j78.js': continue
            if m.group(1):
                if re.search(r'function\s+$', line[:m.start()]): continue
                expr = arg_of(line, m.end() - 1)
            else:
                if m.group(2) == 'p' and 'ch70(' not in line and 'evChoice' not in line: continue
                expr = re.split(r',\s*\w+:', line[m.end():m.end() + 200])[0]
                if m.group(2) == 'o' and not re.search(r'\bo[A-Z]\w*\(|odA\(|od\(|actOdds\(|\.o\(|oddsCl\(', expr): continue
            e = expr.strip()[:110]
            cls = None
            if 'actOdds(' in e or (m.group(1) == 'odds' and f == 'j78.js' and 'actOdds' in t): cls = 'ACT-ONE'
            elif m.group(1) == 'sgOdds': cls = 'ACT-ONE' if 'actOdds(' in src.get('jsgame.js', '') else 'ACT-RAW'
            elif (f, fn_at(L, n)) in NOCTX and ACT_RAW.search(e): cls = 'NOCTX'
            elif ACT_RAW.search(e) or (re.fullmatch(r'oddsCl\(o(\+lotB\(S,ACTDOM\[k\]\))?\)', e) and re.search(r'\bo=a\.o\?a\.o\(S,v\)', '\n'.join(L[max(0, n - 3):n + 1]))): cls = 'ACT-RAW'
            elif re.fullmatch(r'oddsCl\(o\)', e) and re.search(r'\bo=(a\.o\?)?actOdds\(', '\n'.join(L[max(0, n - 3):n + 1])): cls = 'ACT-ONE'
            elif 'optOdds(' in e: cls = 'OPT-ONE'
            elif f == 'j19.js' and 'lotB(S,a.dom)' in e: cls = 'OPT-RAW'
            else:
                core = re.sub(r'^oddsCl\(|\)$', '', e)
                win = '\n'.join(L[max(0, n - 6):n + 8])
                cls = 'INLINE' if core and (('roll(' + core) in win or re.search(r'roll\(\w+\)', win) and core in win) else 'OTHER'
            rows.append((f, n + 1, fn_at(L, n), e, cls))

def rolled(cls, e):
    return {'ACT-ONE': 'ACT[k].f inside runAct (actCtx)', 'ACT-RAW': 'ACT[k].f inside runAct (ACTX)', 'OPT-ONE': 'runOpt (optOdds)',
            'OPT-RAW': 'runOpt (o+lotB, own copy)', 'NOCTX': 'see note', 'INLINE': 'roll(same expr), same fn', 'OTHER': '— (no roll of it nearby)'}[cls]
def extra(cls):
    return {'ACT-RAW': 'pen · lotB · spyKnowB only on ROLLED', 'OPT-RAW': 'lotB copy on both (one formula twice)'}.get(cls, 'none')

from collections import Counter
C = Counter(r[4] for r in rows)
if TABLE:
    print('| place | shown fn | rolled fn | extra parts only on one side |\n|---|---|---|---|')
    for f, n, fn, e, cls in rows:
        if cls in ('INLINE', 'OTHER') and not ALL: continue
        print(f'| {f}:{n} {fn} | `{e.replace("|", "∣")}` | {NOCTX.get((f, fn)) if cls == "NOCTX" else rolled(cls, e)} | {extra(cls)} |')
else:
    for f, n, fn, e, cls in rows:
        if cls in ('INLINE', 'OTHER') and not ALL: continue
        print(f'{cls:8} {f}:{n} {fn}: {e}')
print(f'\nshown-odds places: {len(rows)} — ' + ', '.join(f'{k} {v}' for k, v in sorted(C.items())) + f'; act odds helpers {len(ofn)}')
bad = C.get('ACT-RAW', 0) + C.get('OPT-RAW', 0)
print('PASS: every act / option odds shown through the one function of its roll' if not bad else f'FAIL: {bad} place(s) show odds the roll does not use')

# ---------------- ROUND 2 (review/shown-odds-r2, ORDER ROOT-52 18/11 15:30Z): SPEND THEN ROLL ----------------
# Every do-path that pays time (spend( … ) and THEN rolls. What runs inside the spend (khắc, roster / weather resync, world
# events) can move the odds between the card and the roll, so the roll must use odds read BEFORE the spend:
#   FROZEN   the roll after the spend reads odds taken before it: fzRun(shown,…) (j9; the act's own roll is aRoll), or the odds
#            variable is set before spend( in the same body, or runOpt (an option's o is a number read when the card was dealt)
#   SIDE     the rolls after the spend are side chances whose odds are never printed as a ladder word (punish, news, roll(60),
#            roll(BAL.odds.hi) = the odds-cap soft fail …): nothing she saw can differ
#   AFTER    odds read after the spend -> FAIL (shown != rolled when the spend moves the world)
# The roll path after the spend: roll( / runAct( / doAct( / runOpt( / or a call of a function that itself rolls (found by
# reading every function body, two levels deep).
fn_body = {}
for fname, t2 in src.items():
    for m in re.finditer(r'function\s+(\w+)\s*\(', t2):
        i = t2.find('{', m.end())
        if i < 0: continue
        d = 0; j = i
        while j < len(t2):
            c = t2[j]
            if c == '{': d += 1
            elif c == '}':
                d -= 1
                if d == 0: break
            j += 1
        fn_body.setdefault(m.group(1), t2[i:j + 1])
ROLLS = re.compile(r'(?<![\w.])(?:a?[Rr]oll)\(')
rollers = {n for n, b in fn_body.items() if re.search(r'(?<![\w.])(roll|aRoll)\(', b)}
for _ in range(2):
    rollers |= {n for n, b in fn_body.items() if any(re.search(r'(?<![\w.])' + r + r'\(', b) for r in list(rollers)[:0]) }
calls_rx = re.compile(r'(?<![\w.])(\w+)\(')
SKIPFN = {'spend', 'can', 'log', 'render', 'apply', 'ap', 'roll', 'aRoll', 'fzRun', 'Q', 'if', 'for', 'while', 'return', 'function', 'catch', 'try', 'switch'}
def body_after(t2, i):
    """text from i to the end of the innermost block that holds i"""
    d = 0; j = i
    while j > 0:
        c = t2[j]
        if c == '}': d += 1
        elif c == '{':
            if d == 0: break
            d -= 1
        j -= 1
    start = j; d = 0; k = start
    while k < len(t2):
        c = t2[k]
        if c == '{': d += 1
        elif c == '}':
            d -= 1
            if d == 0: break
        k += 1
    return t2[start:i], t2[i:k + 1]
def roll_args(s):
    """the odds expression of every roll( / aRoll( call in s (balanced)"""
    out = []
    for m in re.finditer(r'(?<![\w.])a?[Rr]oll\(', s):
        i = m.end(); d = 1; j = i
        while j < len(s) and d:
            if s[j] == '(': d += 1
            elif s[j] == ')': d -= 1
            j += 1
        out.append(re.sub(r',a$', '', s[i:j - 1].strip()))
    return out
ALLSRC = '\n'.join(src.values())
# rolls on a spend path that are side chances by construction (their word, where printed, belongs to another line / act)
SIDE_EXPR = {'has("nongnay")?100:has("nhantu")?25:50': 'punish(): the punishment chance; depends only on items she holds, a spend never moves it',
             'oSee(r,true)': 'giveTo(): whether the receiver notices a tainted gift; the gift card prints no odds (oSee\'s word is the Soát rương act)'}
def is_shown(e):
    """a roll's odds are SHOWN when the same odds function (or the same expression) is printed as a ladder word somewhere"""
    e = e.strip()
    if re.fullmatch(r'(\d+|BAL\.[\w.\[\]]+|LO\.keepP|B\.\w+(\[\w+\])?|o|odds|r|p|ch|c)', e): return False
    m = re.match(r'(?:oddsCl\(|od\(|odA\(\w+,)?\s*(\w+)\(', e)
    keys = [e] + ([m.group(1)] if m and re.fullmatch(r'o[A-Z]\w*|\w+O|\w+Odds|\w+odds', m.group(1)) else [])  # an odds function by name (oSpy, askO, dbOdds)
    for k in keys:
        if re.search(r'(?:word|kitOdds|wordOf|oddsWord)\(\s*(?:oddsCl\()?\s*' + re.escape(k), ALLSRC): return True
    return False
srows = []
for fname, t2 in src.items():
    for m in re.finditer(r'(?<![\w.])spend\(', t2):
        pre = t2[max(0, m.start() - 12):m.start()]
        if re.search(r'(function\s*|=\s*|\.)$', pre): continue
        before, after = body_after(t2, m.start())
        after = after[after.find(')') + 1:]
        hits = []
        for c in calls_rx.finditer(after):
            n = c.group(1)
            if n in ('roll', 'aRoll', 'runAct', 'runOpt', 'doAct') or (n in rollers and n not in SKIPFN): hits.append(n)
        if not hits: continue
        ln = t2[:m.start()].count('\n') + 1
        L = t2.split('\n')[ln - 1]
        pre_vars = set(re.findall(r'(?:const|let)\s+(\w+)\s*=', before[-700:]))
        # the odds of every roll on the path: rolls in the body after the spend + rolls inside each rolling function it calls
        va = dict(re.findall(r'(?:const|let)\s+(\w+)\s*=\s*([^;]+);', after))  # a roll of a variable set AFTER the spend = its expression
        exprs = [va.get(e.strip(), e) for e in roll_args(after)] + [e for h in set(hits) if h in fn_body and h not in ('runAct', 'runOpt', 'doAct') for e in roll_args(fn_body[h])]
        shown = sorted({e for e in exprs if e.strip() not in SIDE_EXPR and is_shown(e) and e.strip() not in pre_vars})
        if 'fzRun(' in after: cls = 'FROZEN'
        elif set(hits) <= {'runOpt'}: cls = 'FROZEN'
        elif any(h in ('runAct', 'doAct') for h in hits): cls = 'AFTER'
        elif shown: cls = 'AFTER'
        elif any(e.strip() in pre_vars for e in roll_args(after)): cls = 'FROZEN'
        else: cls = 'SIDE'
        if cls == 'AFTER' and not shown: shown = ['runAct/doAct']
        srows.append((fname, ln, cls, sorted(set(hits)), ' ; '.join(shown)[:120] if cls == 'AFTER' else ''))
SR = Counter(r[2] for r in srows)
print(f'\nSPEND-THEN-ROLL paths: {len(srows)} — ' + ', '.join(f'{k} {v}' for k, v in sorted(SR.items())))
for f2, ln, cls, hits, L in srows:
    if cls in ('AFTER', 'FROZEN') or ALL: print(f'{cls:6} {f2}:{ln} rolls via {",".join(hits)}' + (f'  [shown: {L}]' if L else ''))
sbad = SR.get('AFTER', 0)
print('PASS: every spend-then-roll path rolls odds read before the spend' if not sbad else f'FAIL: {sbad} path(s) read the odds AFTER the spend')
sys.exit(1 if bad or sbad else 0)
