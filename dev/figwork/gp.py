# gp.py JID... : final prompt as sent (pj.py + art6 cold linen clause); prints "JID style ref" then prompt
import json,sys
J=json.load(open('jobs.json')); ids=json.load(open('idfix.json'))
A="robe and skirt hanging straight and calm, sleeves, sash and ribbons falling naturally with NO swirling and NO flying fabric; all fabrics opaque silk, NO sheer see-through gauze, NO floating stole"
B="robe hanging straight and calm, sleeves and sash falling naturally with NO swirling and NO flying fabric; all fabrics opaque"
for k in sys.argv[1:]:
    j=J[k]; r=j['ref']; rid=ids.get(r[6:]) if r and r.startswith('SHEET:') else r
    p=j['prompt']
    if k.endswith('tcold'): assert A in p; p=p.replace(A,B)
    print(k,j['style'],rid); print(p); print()
