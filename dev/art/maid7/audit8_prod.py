import re,sys,glob,difflib
sys.path.insert(0,'dev/art'); import keep_check as kc
out=[]
for f in sorted(glob.glob('dev/art/maid7/prod/*_L1836.txt')):
    base,allows=kc.read_sidecar(f); b=open(base).read(); n=open(f).read()
    bw=re.findall(r"\S+",b); nw=re.findall(r"\S+",n)
    sm=difflib.SequenceMatcher(None,bw,nw,autojunk=False)
    rem=[];add=[]
    for op,i1,i2,j1,j2 in sm.get_opcodes():
        if op=='equal': continue
        r=' '.join(bw[i1:i2]); a=' '.join(nw[j1:j2])
        out_r=(r[:160]); out_a=(a[:160])
        rem.append((out_r,out_a))
    dropped,_,_,_=kc.check(base,f,allows)
    out.append((f.split('/')[-1],base.split('/')[-1],len(rem),dropped,rem))
for name,base,k,dropped,rem in out:
    print(f"### {name}  vs {base}: {k} word-diff hunks, keep unallowed drops={len(dropped)}")
    for r,a in rem: print(f"  - `{r}` → `{a}`")
