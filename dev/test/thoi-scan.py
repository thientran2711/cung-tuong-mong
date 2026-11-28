#!/usr/bin/env python3
"""thoi-scan.py — owner 26/11 ~22:43Z «lá bài thôi thì dẹp, để đó chi vô ích»: every option card whose only job is to CLOSE the frame
(«Thôi», «Thôi, để sau», «Bỏ qua», «Để sau» …) — closing is the frame ✕. A «Thôi, …» line that is a real story choice (it has a gain / loss /
result: w, l, wx, lx, rt, e, fx with values, a go that does more than refund) is KEPT and listed apart.
usage: python3 dev/test/thoi-scan.py   → CLOSE-ONLY rows (to remove) + REAL rows (keep)"""
import re,glob,os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
pat=re.compile(r'\{\s*n\s*:\s*(["`])((?:Thôi|Bỏ qua|Để sau|Không cần|Đóng)[^"`]{0,40})\1([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}')
real=re.compile(r'\b(w|l|wx|lx|rt|e|o|lk|risk|hint)\s*:|fx\s*:\s*\{\s*\w')
close=[];keep=[]
for f in sorted(glob.glob(os.path.join(R,'j*.js'))):
    if f.endswith('all.js'):continue
    s=open(f,encoding='utf8').read();b=os.path.basename(f)
    for m in pat.finditer(s):
        body=m.group(3);ln=s.count('\n',0,m.start())+1
        go=re.search(r'go\s*:\s*\(\)\s*=>\s*\{(.*)',body,re.S);gobody=go.group(1) if go else ''
        refund_only=not gobody.strip() or re.fullmatch(r'\s*(if\(S\.payOnPick\)S\.payOnPick=0;else if\(refund\)used=Math\.max\(0,used-refund\)|)\s*\}?\s*',gobody.split('}}')[0]+'') is not None
        (keep if real.search(body) or (go and not refund_only) else close).append((b,ln,m.group(2)))
print(f'CLOSE-ONLY (remove; closing = the frame ✕): {len(close)}')
for r in close:print('  %s:%d «%s»'%r)
print(f'REAL CHOICES named «Thôi …» (keep): {len(keep)}')
for r in keep:print('  %s:%d «%s»'%r)
