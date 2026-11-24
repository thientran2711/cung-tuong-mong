#!/usr/bin/env python3
"""veil-apply: insert  await require('./lib/veil').guard(<page>);  after every `<page>=await <x>.newPage(...)` in the UNGUARDED tests (list on stdin).
Statement-safe: only when the match ends with ';' or a newline directly after the call; skips files where node --check fails afterwards (restored)."""
import re,sys,subprocess
done=skip=0
for f in [l.strip() for l in sys.stdin if l.strip()]:
    s=open(f,encoding='utf-8').read();o=s;out='';i=0
    for m in re.finditer(r'\b(\w+)\s*=\s*await\s+[\w.]+\.newPage\(',s):
        if m.start()<i:continue
        j=m.end();d=1
        while j<len(s) and d:
            d+=(s[j]=='(')-(s[j]==')');j+=1
        k=j
        if k<len(s) and s[k]==';':k+=1;ins=f"await require('./lib/veil').guard({m.group(1)});"
        else:continue
        out+=s[i:k]+ins;i=k
    if not out:skip+=1;print('SKIP(no safe site)',f);continue
    s=out+s[i:]
    open(f,'w',encoding='utf-8').write(s)
    if subprocess.run(['node','--check',f],capture_output=True).returncode:
        open(f,'w',encoding='utf-8').write(o);skip+=1;print('SKIP(syntax)',f)
    else:done+=1
print('applied',done,'skipped',skip)
