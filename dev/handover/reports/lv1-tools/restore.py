import sys,json,hashlib,urllib.request,time,concurrent.futures as cf
sys.path.insert(0,"/home/user/wt/lv/dev/site"); import cdn_sync as C
B={l.split()[0]:l.split()[1] for l in open("bk_md5.txt")}
K=[k for k in B if "-consort-c" in k]
def get(k):
    for i in range(6):
        try: return urllib.request.urlopen(urllib.request.Request(C.PUBLIC+k,headers={"Cache-Control":"no-cache","User-Agent":"x"}),timeout=120).read()
        except Exception: time.sleep(2*(i+1))
def one(k):
    b=get("img/_rejected/live-old/"+k[4:]); m=hashlib.md5(b).hexdigest()
    if m!=B[k]: return "MD5 "+k
    return "ok" if C.put(k,b)==m else "ETAG "+k
print(len(K))
with cf.ThreadPoolExecutor(6) as ex: R=list(ex.map(one,K))
print({r for r in R if r!="ok"}, sum(r=="ok" for r in R))
