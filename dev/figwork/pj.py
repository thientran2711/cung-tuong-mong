# pj.py JID... : print "JID style ref" then prompt (ref = frozen t1 identity lineup from idfix.json)
import json,sys
J=json.load(open('jobs.json')); ids=json.load(open('idfix.json'))
for k in sys.argv[1:]:
    j=J[k]; r=j['ref']; rid=ids.get(r[6:]) if r and r.startswith('SHEET:') else r
    print(k,j['style'],rid); print(j['prompt']); print()
