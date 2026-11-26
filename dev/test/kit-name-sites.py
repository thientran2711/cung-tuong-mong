#!/usr/bin/env python3
"""kit-name-sites.py (KK42, RV-KK41 law 11): every kitName( call site in dev/build (not all.js) and whether the chip can stand IN a sentence:
PROSE = a lowercase word follows the call in its template (then k61UnkChip rewrites a stranger to «một vị <tước>»), TAG = «:», a stat, an end of
element or nothing follows (keeps «<tước> ???»), DYN = the text around is data (kpPeopleIn / kitNameList: decided on the page by k61UnkChip).
usage: python3 dev/test/kit-name-sites.py   (prints a markdown table + counts)"""
import re,glob,os
rows=[]
for f in sorted(glob.glob(os.path.join(os.path.dirname(__file__),'..','build','*.js'))):
    b=os.path.basename(f)
    if b=='all.js':continue
    src=open(f,encoding='utf-8').read()
    for m in re.finditer(r'kitName\(',src):
        i=m.start();
        if src[i-9:i]=='function ':continue
        # end of the call: balance parens
        d=0;j=m.end()-1
        while j<len(src):
            c=src[j];d+=c=='(';d-=c==')'
            if d==0:break
            j+=1
        after=src[j+1:j+80]
        nxt=re.sub(r'^\}?`?\+?\s*"?','',after)
        nxt=re.sub(r'^(<[^>]+>)+','',nxt)
        line=src.count('\n',0,i)+1
        if b=='j79.js' and 150<=line<=152:kind='DYN (kpPeopleIn: event / news text)'
        elif re.match(r'\s+[a-zà-ỹđ]{2,}',nxt):kind='PROSE'
        elif re.match(r'\s*\}?\s+\$\{',after) or re.match(r'\} \$\{',after):kind='DYN (a sentence held in a variable follows)'
        elif re.search(r'(return\s*|[?:]\s*)$',src[max(0,i-12):i]) or re.search(r'(=\s*)$',src[max(0,i-6):i]):kind='DYN (chip returned / stored for a caller)'
        else:kind='TAG'
        rows.append((b,line,kind,re.sub(r'\s+',' ',after[:40]).replace('|','/')))
print('| file:line | context | text after the call |\n|---|---|---|')
for r in rows:print(f'| {r[0]}:{r[1]} | {r[2]} | `{r[3]}` |')
from collections import Counter
c=Counter(r[2].split(' ')[0] for r in rows);print('\n',dict(c),'total',len(rows))
