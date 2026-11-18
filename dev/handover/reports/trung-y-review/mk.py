import json,re,sys,os,urllib.request
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
import io
R="/home/user/wt/ty-review/"
CDN="https://ctm-img.victoria-tntt.workers.dev/"
L=json.load(open("/tmp/claude-0/FIGURES-ty.json"))
CW,CH=300,823
groups={}
for x in L:
    groups.setdefault((x["identity"],x["ageBand"]),{})[x["ty"]]=x
def get(u):
    for i in range(4):
        try: return urllib.request.urlopen(urllib.request.Request(CDN+u,headers={"User-Agent":"ctm-ty-review"}),timeout=60).read()
        except Exception as e: err=e
    raise err
def job(k):
    pid,age=k;g=groups[k]
    sheet=Image.new("RGBA",(CW*8,CH),(0,0,0,0));have=[]
    for t in range(1,9):
        if t not in g: continue
        im=Image.open(io.BytesIO(get(g[t]["file"]))).convert("RGBA").resize((CW,CH),Image.LANCZOS)
        sheet.paste(im,((t-1)*CW,0));have.append(t)
    os.makedirs(R+"s/"+age,exist_ok=True)
    sheet.save(R+"s/%s/%s.webp"%(age,pid),"WEBP",quality=72,method=4)
    return pid,age,have
with ThreadPoolExecutor(12) as ex: res=list(ex.map(job,sorted(groups)))
man=[]
for pid,age,have in res:
    for t in have: man.append({"id":"%s-%s-ty%d"%(pid,age,t),"person":pid,"age":age,"variant":"ty%d"%t,"url":CDN+groups[(pid,age)][t]["file"]})
json.dump(man,open(R+"manifest.json","w"),ensure_ascii=False)
print(len(man),len(res))
