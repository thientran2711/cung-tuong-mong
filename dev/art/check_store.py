#!/usr/bin/env python3
"""STORE CHECK (owner Lượt 371/373/375): a prompt may only ADD sentences to the store text, never drop or rewrite one.
Usage: python3 dev/art/check_store.py <prompt_file> <store_args...>
  store_args = the build.py arguments of the store prompt for that person/rank, e.g.  c20 v0 --low 1   |  c20 v0 --t7  |  c20 v0
  Slot words (face, colours, motif, item, flower, hair-ref) are allowed to differ: a store sentence passes if it is present verbatim,
  or (for a slot sentence) if >=90 % of its words are present in one prompt sentence. Exit 1 = FAIL -> do NOT generate.
  Since Lượt 500 it also runs dev/art/check_approved.py (approved sentences verbatim + banned phrases) on the same prompt; both must PASS."""
import subprocess,sys,re,os
pf=sys.argv[1]; args=sys.argv[2:]
B=os.path.join(os.path.dirname(os.path.abspath(__file__)),'t8-prompt-B')
store=subprocess.run(['python3','build.py']+args,cwd=B,capture_output=True,text=True).stdout
prompt=open(pf).read()
sp=lambda s:[x.strip() for x in re.split(r'(?<=[.;])\s+',s) if len(x.strip())>12]
P=sp(prompt); Pset=set(P); bad=[]
# SLOT sentences: per-person / per-pose / ref-order / background lines that the builder itself swaps (allowed to differ)
SLOT=('Her face:','Pose:','she holds','Her hands','pretty silver hairpins','silver and pearl hairpins','pearl-tipped hairpins','her signature colour','her ORIGINAL robe colour','Hair:','face clearly visible','From the identity reference','From image 1','do NOT copy','The style reference','Image 2 is','The first reference image','the background is completely transparent','Image 3 is','the royal yellow in the robe','Her eyes','Eyes soft','the robe itself is clearly')
for s in sp(store):
    if s in prompt or s.startswith(SLOT): continue
    w=set(re.findall(r"[a-zA-Z']+",s.lower()))
    best=max((len(w & set(re.findall(r"[a-zA-Z']+",p.lower())))/max(1,len(w)) for p in P),default=0)
    if best<0.9: bad.append((round(best,2),s[:160]))
if bad:
    print('STORE CHECK FAIL',pf,'—',len(bad),'store sentence(s) missing or rewritten:')
    for b,s in bad: print(f'  [{b}] {s}')
    sys.exit(1)
# APPROVED CHECK (owner Lượt 500): the owner-approved sentences of this scope must be present verbatim, banned phrases absent.
import importlib.util as _iu
_sp=_iu.spec_from_file_location('check_approved',os.path.join(os.path.dirname(os.path.abspath(__file__)),'check_approved.py')); _ca=_iu.module_from_spec(_sp); _sp.loader.exec_module(_ca)
_scope=('nude' if 'NỮ ĐẾ:' in prompt else 'mama' if 'A palace ma ma' in prompt else _ca.scope_from_store_args(args))
_age=args[args.index('--age')+1] if '--age' in args else 'a18'
_f,_w,_=_ca.check_text(prompt,_scope,age=_age)
_ca.report(pf,_scope,_f,_w)
if _f:
    print('STORE CHECK FAIL',pf,'— APPROVED CHECK FAIL (dev/art/APPROVED_SENTENCES.md): do NOT generate')
    sys.exit(1)
print('STORE CHECK PASS',pf,'(approved_check PASS)')
