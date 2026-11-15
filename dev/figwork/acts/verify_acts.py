# python3 verify.py BEFORE.json AFTER.json INDEX.json : counts + every referenced picture key must exist on the CDN
import json,sys
B,A,I=[json.load(open(p)) for p in sys.argv[1:4]]
idx={f[0] for f in I['files']}
def keys(M): return {k for k in list(M['acts'].values())+list(M['prefix'].values())+[r[1] for r in M['log']] if k!='-'}
def cnt(M): return 'acts %d prefix %d log %d distinct keys %d'%(len(M['acts']),len(M['prefix']),len(M['log']),len(keys(M)))
print('before',cnt(B));print('after ',cnt(A))
miss=sorted(k for k in keys(A) if 'img/act-%s.webp'%k not in idx)
print('missing on CDN:',len(miss),miss[:20])
ch=sum(1 for a,b in zip(B['log'],A['log']) if a!=b)+sum(1 for s in('acts','prefix') for k in A[s] if B[s].get(k)!=A[s][k])
print('changed entries',ch)
