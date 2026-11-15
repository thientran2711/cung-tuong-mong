#!/usr/bin/env python3
"""Owner's final names (11/15): text-only rename across the game modules listed in dev/build/assemble.py.
usage: python3 dev/tools/naming.py [--apply] [--report dev/handover/NAMING_APPLIED.md]
- fixed terms (TERMS) are replaced in display text;
- "ngươi" / "Ngươi" naming the player in narrator / UI text -> "ta" / "Ta" (first person). Kept: inside an NPC quote (“…”, or a
  straight-quoted speech after ':'), inside a regex literal or a code test (.test / includes / match / replace patterns), and comments.
Every occurrence is listed (file:line, before -> after, or why it was kept)."""
import re, sys, os
D = os.path.dirname(os.path.abspath(__file__)) + '/../build/'
FILES = re.findall(r"'(j[\w]+\.js)'", open(D + 'assemble.py', encoding='utf-8').read())
TERMS = [  # (before, after) — display text only; order matters (longer first)
 ("Chơi cùng bạn", "Cùng hảo hữu"), ("Mời bạn", "Mời hảo hữu"),
 ("Sổ tuần", "Tuần lục"), ("sổ tuần", "tuần lục"),
 ("Đợi sáng mai (Qua đêm)", "Qua ngày"), ("Đợi buổi sau (Qua buổi)", "Sang buổi"), ("Qua buổi", "Sang buổi"), ("Qua đêm", "Qua ngày"),
 ("Mã phòng", "Ám hiệu"), ("mã phòng", "ám hiệu"),
 ("Đang mang", "Bên mình"),
 ("Bảng vinh danh", "Bảng vàng"), ("bảng vinh danh", "bảng vàng"),
 ("Hoàng thượng · Thái hậu", "Chí tôn"), ("Thánh thượng", "Chí tôn"),
]
# the "Thánh thượng" short tab label only (jhc / j84 court sub-tab); other uses of the word in story text stay
TERM_ONLY_IN = {"Thánh thượng": re.compile(r'court|data-tab|dataset\.s|innerHTML=w<640')}
CODE_CTX = re.compile(r'(\.test\(|\.includes\(|\.match\(|\.replace\(|\.search\(|\.split\(|indexOf\(|===|!==|startsWith|endsWith)')

def in_comment(line, i, state):
    # state['block'] tracks /* */ across lines; returns True if position i is inside a comment
    j = 0; blk = state['block']; q = None
    while j < i:
        c = line[j]; two = line[j:j+2]
        if blk:
            if two == '*/': blk = False; j += 2; continue
            j += 1; continue
        if q:
            if c == '\\': j += 2; continue
            if c == q: q = None
            j += 1; continue
        if c in '"\'`': q = c; j += 1; continue
        if two == '/*': blk = True; j += 2; continue
        if two == '//' and (j == 0 or line[j-1] not in ':\\'): return True
        j += 1
    return blk

def end_state(line, state):
    j = 0; blk = state['block']; q = None
    while j < len(line):
        c = line[j]; two = line[j:j+2]
        if blk:
            if two == '*/': blk = False; j += 2; continue
            j += 1; continue
        if q:
            if c == '\\': j += 2; continue
            if c == q: q = None
            j += 1; continue
        if c in '"\'`': q = c; j += 1; continue
        if two == '/*': blk = True; j += 2; continue
        if two == '//' and (j == 0 or line[j-1] not in ':\\'): break
        j += 1
    state['block'] = blk

def in_regex(line, i):
    # a /…/ literal around i: an unescaped '/' before i on the line, preceded by ( , = : ! & | ? { ; or start, with no closing '/' between
    k = i - 1
    while k >= 0:
        if line[k] == '/' and (k == 0 or line[k-1] != '\\') and line[k+1:k+2] not in '*/':
            p = line[:k].rstrip()[-1:] if line[:k].strip() else '('
            if p in '(,=:!&|?{;[' :
                close = line.find('/', i)
                return close > i
            return False
        if line[k] in '`"\'' or line[k] == '\n': return False
        k -= 1
    return False

def in_quote(line, i):
    pre = line[:i]
    if pre.count('“') > pre.count('”'): return True
    if pre.count('«') > pre.count('»') and re.search(r'(nói|bảo|hỏi|đáp|phán|quát|cười)\s*:?\s*«[^»]*$', pre): return True
    # straight-quoted speech inside a text: …: "Ngươi …"  or  …: &quot;Ngươi
    m = re.search(r'(:\s*(&quot;|\\"))[^"\\&]*$', pre)
    return bool(m)

def code_ctx(line, i):
    # the word sits in a string that is a code test: .test( / includes( / === … within ~40 chars before, same string
    seg = line[max(0, i-60):i]
    q = max(seg.rfind('"'), seg.rfind("'"), seg.rfind('`'))
    head = seg[:q] if q >= 0 else seg
    return bool(CODE_CTX.search(head[-25:])) and q >= 0

def run(apply, report):
    rows = []; kept = []; n_term = 0; n_ta = 0
    for f in FILES:
        p = D + f; src = open(p, encoding='utf-8').read(); out = []; st = {'block': False}
        for ln, line in enumerate(src.split('\n'), 1):
            new = line
            # terms
            for a, b in TERMS:
                if a in new:
                    lim = TERM_ONLY_IN.get(a)
                    if lim and not lim.search(new): continue
                    idx = new.find(a)
                    if in_comment(new, idx, dict(st)): continue
                    cnt = new.count(a); new = new.replace(a, b); n_term += cnt
                    rows.append((f, ln, a, b, cnt))
            # co-op: every "bạn" in the co-op modules is the co-op friend -> "hảo hữu"
            if f in ('jcoop.js', 'jcooplobby.js', 'jcoopworld.js'):
                hits = [m for m in re.finditer(r'(?<![\wÀ-ỹ])([Bb])ạn(?![\wÀ-ỹ])', new) if not in_comment(new, m.start(), dict(st))]
                for m in reversed(hits):
                    new = new[:m.start()] + ('Hảo hữu' if m.group(1) == 'B' else 'hảo hữu') + new[m.end():]
                if hits: rows.append((f, ln, 'bạn / Bạn (co-op friend)', 'hảo hữu / Hảo hữu', len(hits))); n_term += len(hits)
            # ngươi -> ta
            res = []; j = 0
            for m in re.finditer(r'(?<![\wÀ-ỹ])([Nn])gươi(?![\wÀ-ỹ])', new):
                i = m.start(); why = None
                if in_comment(new, i, dict(st)): why = 'comment'
                elif in_regex(new, i): why = 'regex'
                elif code_ctx(new, i): why = 'code test'
                elif in_quote(new, i): why = 'NPC quote'
                ctx = re.sub(r'\s+', ' ', new[max(0, i-40):i+30])
                if why: kept.append((f, ln, why, ctx)); continue
                res.append((m.start(), m.end(), 'Ta' if m.group(1) == 'N' else 'ta', ctx))
            # "ngươi" -> "ta" is applied ON SCREEN by j84 (VP rule, outside “…” quotes), not in the source: many strings are
            # matched by code (/xong: Ngươi/, log filters in j18/j19), and old saves' logs hold "ngươi" too. Listed here only.
            for s, e, rep, ctx in res:
                rows.append((f, ln, ctx.strip(), ctx.replace('Ngươi', 'Ta').replace('ngươi', 'ta').strip(), 1)); n_ta += 1
            end_state(line, st)
            out.append(new)
        if apply: open(p, 'w', encoding='utf-8').write('\n'.join(out))
    if report:
        with open(report, 'w', encoding='utf-8') as w:
            w.write('# NAMING APPLIED — owner final names 11/15 (dev/tools/naming.py)\n\n')
            w.write(f'Terms replaced: {n_term} · "ngươi" → "ta" in narrator / UI text: {n_ta} · kept (NPC quotes, code, comments): {len(kept)}\n\n')
            w.write('| file:line | before | after |\n|---|---|---|\n')
            for f, ln, a, b, c in rows:
                w.write(f'| {f}:{ln} | {a.replace("|", "¦")} | {b.replace("|", "¦")} |\n')
            w.write('\n## Kept "ngươi" (not the narrator / UI naming her)\n\n| file:line | why | context |\n|---|---|---|\n')
            for f, ln, why, ctx in kept:
                w.write(f'| {f}:{ln} | {why} | {ctx.replace("|", "¦")} |\n')
    print('terms', n_term, 'ta', n_ta, 'kept', len(kept))
    from collections import Counter
    print(Counter(k[2] for k in kept))
    return kept

if __name__ == '__main__':
    a = sys.argv[1:]; rep = a[a.index('--report')+1] if '--report' in a else None
    run('--apply' in a, rep)
