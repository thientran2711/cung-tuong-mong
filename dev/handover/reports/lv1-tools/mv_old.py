import sys,json,hashlib,urllib.request,concurrent.futures as cf
sys.path.insert(0,"/home/user/wt/lv/dev/site"); import cdn_sync as C
K=json.load(open("kc_live_keys.json")); idx={k:m for k,m,*_ in json.load(open("/home/user/wt/lv/img/_index.json"))["files"]}
mode=sys.argv[1]
def dst(k): return "img/_rejected/live-old/"+k[4:]
import os,time
DONE={l.split()[0] for l in open("bk_md5.txt")} if os.path.exists("bk_md5.txt") else set()
def get(k):
    for i in range(6):
        try: return urllib.request.urlopen(urllib.request.Request(C.PUBLIC+k,headers={"Cache-Control":"no-cache","User-Agent":"x"}),timeout=120).read()
        except Exception as e: time.sleep(2*(i+1))
    raise SystemExit("GETFAIL "+k)
def cp(k):
    if k in DONE: return "ok"
    b=get(k)
    m=hashlib.md5(b).hexdigest()
    if m[:16]!=idx[k]: return f"MD5MISMATCH {k} {m[:16]} {idx[k]}"
    open("bk_md5.txt","a").write(f"{k} {m}\n")
    e=C.put(dst(k),b); return "ok" if e==m else f"ETAG {k}"
def rm(k):
    C.req("DELETE",C.API+"/objects/"+C.keyurl(k)); return "ok"
f={"copy":cp,"del":rm}[mode]
L=K if mode=="copy" else [k for k in K if not (("maid-m" in k) and k.endswith("-kc-a18.webp"))]
print(mode,len(L))
with cf.ThreadPoolExecutor(6) as ex: R=list(ex.map(f,L))
print({r for r in R}, sum(r=="ok" for r in R))
