# python3 corpus.py INV.json OUT.txt : first sentences of every log/ret/option sample of inv_ast.js (tags stripped) -> one per line
import json,re,sys
I=json.load(open(sys.argv[1]));L=set()
for sec in ('logs','rets','opts'):
    for e in I[sec]:
        for t in e.get('alts',[]):
            t=re.sub(r'<[^>]+>','',t).strip(); s=re.split(r'(?<=[.!?])\s+(?=["“(]?[A-ZÀ-ỸĐ0-9])',t)[0].strip()
            if s and '\n' not in s: L.add(s)
open(sys.argv[2],'w').write('\n'.join(sorted(L))+'\n'); print(len(L))
