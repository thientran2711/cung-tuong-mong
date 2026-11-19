#!/usr/bin/env python3
"""NDX1 Nữ đế mass helper (owner Lượt 479/482: one-ref = own t1 [+ swatch], no style image).
  nd.py prep cNN            -> writes $S/cNN_aNN.txt for a18..a65 via build_all.py cNN nude --age aNN and runs check_store (must PASS)
  nd.py log cNN aNN GEN FACE [credits]  -> appends a ledger line (store_check PASS re-verified) to dev/art/gen_ledger.jsonl"""
import sys,os,json,subprocess,datetime
R=os.path.abspath(os.path.join(os.path.dirname(__file__),"..","..","..",".."))
S=os.environ.get("S","/tmp/claude-0/-home-user-cung-tuong-mong/f1b54cf7-4c52-5d19-a246-ca440900bf9e/scratchpad")
AGES=["a18","a26","a36","a51","a65"]
def prompt(c,a):
    return subprocess.run([sys.executable,os.path.join(R,"dev/art/store-all/build_all.py"),c,"nude","--age",a],capture_output=True,text=True,check=True).stdout
def chk(c,a,fn):
    args=[c,"v0","--nostyle"]+([] if a=="a18" else ["--age",a])
    o=subprocess.run([sys.executable,os.path.join(R,"dev/art/check_store.py"),fn]+args,capture_output=True,text=True).stdout
    return "STORE CHECK PASS" in o
if sys.argv[1]=="prep":
    c=sys.argv[2]
    for a in AGES:
        fn=os.path.join(S,f"{c}_{a}.txt"); open(fn,"w").write(prompt(c,a)); print(a,"PASS" if chk(c,a,fn) else "FAIL")
elif sys.argv[1]=="log":
    c,a,gen,face=sys.argv[2:6]; cr=int(sys.argv[6]) if len(sys.argv)>6 else 135
    fn=os.path.join(S,f"{c}_{a}.txt"); p=open(fn).read(); assert p==prompt(c,a),"prompt file stale"; assert chk(c,a,fn),"STORE CHECK FAIL"
    d={"ts":datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),"kind":"NUDE-MASS","cmd":f"python3 dev/art/store-all/build_all.py {c} nude --age {a}","prompt":p,
       "refs":[{"image":1,"name":f"own t1 of {c} at {a if a!='a65' else 'a51 (no a65 t1)'} = face (one-ref, Lượt 479/482)","magnific_id":face,"url":f"https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-{c}-t1-{a if a!='a65' else 'a51'}.webp"},
               {"image":2,"name":"royal-yellow swatch = colour only","magnific_id":"TdwDfOyVNR"}],
       "gen_id":gen,"magnific_prompt":p,"store_check":"PASS","credits":cr,"settings":"gpt-2-6 1024x2304 2k transparentBackground","out":f"img/_review/nude-mass/ndx1/{c}_{a}_nude.png","who":"ROOT-48 art worker NDX1"}
    open(os.path.join(R,"dev/art/gen_ledger.jsonl"),"a").write(json.dumps(d,ensure_ascii=False)+"\n"); print("logged",c,a,gen)
