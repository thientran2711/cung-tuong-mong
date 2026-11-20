import sys,os,json,io,contextlib
root=sys.argv[1]; out=os.path.abspath(sys.argv[2]); ages=sys.argv[3].split(",")
sys.path.insert(0,os.path.join(root,"dev/art/store-all")); sys.path.insert(0,os.path.join(root,"dev/art"))
os.chdir(root)
import build_all as ba
ba._kc_drawn=lambda p: True
R={}
for age in ages:
  for p in ba.PEOPLE:
    for r in list(range(1,9))+["nude"]:
      for se in (None,"dong"):
        if se and r=="nude": continue
        k=f"{p}|{r}|{age}|{se}"
        try:
          with contextlib.redirect_stderr(io.StringIO()): R[k]=ba.build_season(p,r,age,se)[1]
        except BaseException as e: R[k]="ERR:"+type(e).__name__+":"+str(e)[:200]
json.dump(R,open(out,"w"),ensure_ascii=False)
print(out,len(R))
