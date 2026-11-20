import sys,os,re,subprocess
S=os.path.dirname(os.path.abspath(__file__)); exec(open(S+"/edit.py").read().split('if __name__')[0])
sys.path.insert(0,"/home/user/cung-tuong-mong/dev/art/store-all"); sys.argv=["build_all.py"]; import build_all as B
MK={"drum":(DRUM,DRUM_S),"hoop":(HOOP,HOOP_S),"ball":(BALL,BALL_S),"hairpin":(PIN,),"pose":(" set in her hair with one raised empty hand",)}
ranks=[str(i) for i in range(1,9)]+["nude"]; done=set(); rows=[]
for age in ("a18","a26","a36","a51","a65"):
    d=f"{S}/after/{age}"
    if not os.path.isdir(d): continue
    for f in sorted(os.listdir(d)):
        p,t=f[:-4].split("_",1)
        if t not in ranks: continue
        txt=open(f"{d}/{f}").read()
        for k,ms in MK.items():
            if (k,t) in done or not any(m in txt for m in ms): continue
            done.add((k,t)); rk=t if t=="nude" else int(t)
            ok,msg=B.gate(p,rk,age,txt)
            sc="nude" if t=="nude" else "tp"+t
            fn=f"{S}/s_{k}_{t}.txt"; open(fn,"w").write(txt)
            q=subprocess.run([sys.executable,"/home/user/cung-tuong-mong/dev/art/check_store.py",fn,"--scope",sc,"--age",age],capture_output=True,text=True)
            rows.append((k,t,p,age,len(txt.strip()),"PASS" if ok else "FAIL",("PASS" if q.returncode==0 else "FAIL"),"" if ok else msg[-300:],"" if q.returncode==0 else q.stdout[-300:]))
for r in sorted(rows): print(" | ".join(map(str,r)))
