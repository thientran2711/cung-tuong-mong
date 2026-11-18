#!/usr/bin/env python3
"""Move finished entries (>24 h, not open) of one live coordination file into dev/archive/.
Usage: python3 dev/tools/archive_move.py <file under dev/handover> [--protect N] [--tail N] [--dry]
Rules (brief D11-handover-archive): keep header, first N protected lines (cited by [HO/..:Lnn] tags), open items,
lines of the last 24 h, last TAIL lines. Everything else is appended (original order) to dev/archive/<name>-<mm-dd-yyyy>.md.
Invariant checked: live_after + moved = lines_before (nothing lost)."""
import re, sys, os, datetime as dt
args = sys.argv[1:]
path = args[0]; dry = '--dry' in args
def opt(n, d):
    return int(args[args.index(n)+1]) if n in args else d
PROTECT = opt('--protect', 0); TAIL = opt('--tail', 150)
now = dt.datetime.now(dt.timezone.utc).replace(tzinfo=None); cutoff = now - dt.timedelta(hours=24)
YEAR = 2026
name = os.path.basename(path)[:-3]
lines = open(path, encoding='utf-8').read().split('\n')
trailing_nl = lines and lines[-1] == ''
if trailing_nl: lines = lines[:-1]
N = len(lines)
DATE = re.compile(r'(?<![\d/])(1[5-9]|2\d)/(11)(?![\d/])|\b11/(1[5-9])/2026')
TIME = re.compile(r'\b([01]?\d|2[0-3]):([0-5]\d)\s?Z')
def line_dt(s, carry):
    d = None
    m = re.search(r'2026-11-(1[5-9])T(\d\d):(\d\d)', s)
    if m: return dt.datetime(YEAR, 11, int(m.group(1)), int(m.group(2)), int(m.group(3))), int(m.group(1))
    m = re.search(r'\b11/(1[5-9])/2026', s)
    if m: d = int(m.group(1))
    else:
        m = re.search(r'(?<![\d/])(1[5-9])/11(?![\d/])', s)
        if m: d = int(m.group(1))
    t = TIME.search(s)
    if d is None: d = carry
    if d is None: return None, carry
    hh, mm = (int(t.group(1)), int(t.group(2))) if t else (23, 59)
    return dt.datetime(YEAR, 11, d, hh, mm), d
# OPEN = narrow: only lines that START as an unanswered ask / owner-wait. Old RUNNING/READY/PASS/ORDER lines are stale snapshots (the sessions and branches are tracked in CLAIMS.md / main), so they go.
OPEN = re.compile(r'^[-\s*]*(\(?[\d/~ ]*Z?\)?\s*)?(FOR MAIN|KIT REQUEST|KIT NOTE|QUESTION|OPEN OWNER QUESTIONS|WAITING FOR|Waiting on the owner|Still waiting owner)', re.I)
CLOSED = re.compile(r'ARCHIVED|\bDONE\b|\bLIVE\b|ROLLED OVER|STOPPED|\bENDED\b|SUPERSEDED|CLOSED|ANSWERED|RESOLVED|REMOVED|applied|handed|FINISHED|MERGED|landed', re.I)
SECT_OPEN = re.compile(r'^## .*(PASS \(for|QUESTIONS|PENDING CDN|Waiting on the owner)', re.I)
keep = [False]*N
if '--claims' in args:
    OPEN = re.compile(r'^\|[^|]*\|[^|]*\|[^|]*\|[^|]*\|\s*(RUNNING|READY|PASS|QUEUED|BLOCKED|SAMPLE READY|WAIT|HOLD)', re.I)
    CLOSED = re.compile(r'ENDED|\bLIVE\b|\bDONE\b|archived|BATCH|ARCHIVED|STOPPED|superseded|on main|landed', re.I)
# header block (up to first '## ' heading, max 8 lines) always stays
HDR = next((i for i, s in enumerate(lines) if s.startswith('## ')), 8); PROTECT = max(PROTECT, min(HDR, 8)) if '--claims' not in args else PROTECT
# first pass: dates with carry inside the file (carry resets at '## ' headings that carry their own date)
carry = None; sect_open = False; dts = [None]*N
for i, s in enumerate(lines):
    if s.startswith('## '):
        sect_open = bool(SECT_OPEN.search(s)); carry = None
    dd, carry = line_dt(s, carry)
    dts[i] = dd
    if i < PROTECT or i == 0: keep[i] = True; continue
    if dd is not None:
        keep[i] = dd >= cutoff
    else:
        keep[i] = None  # undated: decide below
    if not keep[i] and OPEN.search(s) and not CLOSED.search(s) and (dd is None or dd >= cutoff - dt.timedelta(hours=24) or re.match(r'^[-\s*]*(KIT REQUEST|QUESTION)', s)):
        keep[i] = True
# undated lines: keep if neighbours (prev dated, next dated) are kept, else move; blank/heading lines follow the next kept line
for i in range(N):
    if keep[i] is None:
        j = i-1
        while j >= 0 and keep[j] is None: j -= 1
        keep[i] = keep[j] if j >= 0 else True
isopen = lambda s: bool(OPEN.search(s)) and not CLOSED.search(s)
order = sorted(range(N), key=lambda i: (dts[i] or dt.datetime.min, i))
newest = set(order[-TAIL:])            # the TAIL newest-dated lines always stay (file order may be newest-first or oldest-first)
for i in newest: keep[i] = True
# pass 2 (owner target <= LIMIT KB): if still too big, also move finished (<24 h) lines, oldest first; never open items, header, protected, newest TAIL
LIMIT = opt('--limit', 100) * 1024
cur = sum(len(lines[i].encode()) + 1 for i in range(N) if keep[i])
pass2 = 0
for i in order:
    if cur <= LIMIT: break
    if keep[i] and i >= max(PROTECT, 1) and i not in newest and not isopen(lines[i]) and not SECT_OPEN.search(lines[i]):
        keep[i] = False; cur -= len(lines[i].encode()) + 1; pass2 += 1
# pass 3: still too big -> stale open rows (older than 24 h, oldest first) go too, oldest first
pass3 = 0
for i in order:
    if cur <= LIMIT: break
    if keep[i] and i >= max(PROTECT, 1) and i not in newest and dts[i] and dts[i] < cutoff:
        keep[i] = False; cur -= len(lines[i].encode()) + 1; pass3 += 1
print('pass3 moved (stale open >24h, oldest first):', pass3)
print('pass2 moved (finished, <24h, to reach limit):', pass2)
live = [lines[i] for i in range(N) if keep[i]]
moved = [lines[i] for i in range(N) if not keep[i]]
assert len(live) + len(moved) == N
sz = lambda L: sum(len(x.encode()) + 1 for x in L) / 1024
print(f'{name}: before {N} lines {sz(lines):.1f} KB -> live {len(live)} lines {sz(live):.1f} KB + archive {len(moved)} lines {sz(moved):.1f} KB')
if dry: sys.exit(0)
stamp = now.strftime('%m-%d-%Y')
ad = os.path.join(os.path.dirname(path), '..', 'archive'); os.makedirs(ad, exist_ok=True)
ap = os.path.join(ad, f'{name}-{stamp}.md')
new = not os.path.exists(ap)
with open(ap, 'a', encoding='utf-8') as f:
    if new:
        f.write(f'ARCHIVE of dev/handover/{name}.md — finished entries older than 24 h moved out of the live file on {now:%d/%m/%Y %H:%MZ}; lines in their original order, newest block last. To pull one back: grep here, paste into the live file.\n')
    f.write(f'\n<!-- moved {now:%d/%m/%Y %H:%MZ}: {len(moved)} lines from {name}.md -->\n')
    f.write('\n'.join(moved) + '\n')
open(path, 'w', encoding='utf-8').write('\n'.join(live) + ('\n' if trailing_nl else ''))
print('wrote', ap)
