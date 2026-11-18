import json,re,io,urllib.request,concurrent.futures as cf,numpy as np
from PIL import Image
B='https://ctm-img.victoria-tntt.workers.dev/'
ht=json.load(open('/home/user/wt/fbf/dev/art/headtop/fig-ht.json'))
idx=json.load(open('idx.json'));names=[f[0] for f in idx['files'] if re.match(r'^img/fig-[a-z]+-[^/]*\.webp$',f[0])]
pick=[]
for n in names:
  k=re.match(r'img/fig-([a-z]+)-',n).group(1)
  if k in('maid','consort'):
    if hash(n)%12==0:pick.append(n)
  elif k!='bg':pick.append(n)
print(len(pick))
def job(n):
  try:
    d=urllib.request.urlopen(urllib.request.Request(B+n,headers={'User-Agent':'curl/8'}),timeout=60).read()
    im=Image.open(io.BytesIO(d)).convert('RGBA');W,H=im.size;h=500;w=max(1,round(W*h/H));a=np.asarray(im.resize((w,h)))[...,3]>40
    ys=np.where(a.any(1))[0];xs=np.where(a.any(0))[0]
    t,b,l,r=ys[0]/h,(ys[-1]+1)/h,xs[0]/w,(xs[-1]+1)/w
    h0=ht.get(n.split('/')[-1]);
    if h0 is None:return n,None
    h0=max(t,h0/4000);ar=W/H
    return n,dict(t=t,b=b,l=l,r=r,ht=h0,ar=ar,c=(h0-t)/(b-h0),w=(r-l)*ar/(b-h0))
  except Exception as e:return n,None
with cf.ThreadPoolExecutor(16) as ex:res=dict(ex.map(job,pick))
json.dump(res,open('scan.json','w'))
ok={k:v for k,v in res.items() if v}
print('ok',len(ok))
for key in('c','w'):
  s=sorted(ok.items(),key=lambda kv:-kv[1][key])[:8];print(key,[(k.split('/')[-1],round(v[key],3)) for k,v in s])
