# merge.py WT : put my records (myrecs.json) into WT/img/FIGURES-servants.json, my HUADIAN section into WT/dev/figwork/HUADIAN_C.md
import json,sys,os,re
H=os.path.dirname(os.path.abspath(__file__)); W=sys.argv[1]
F=W+"/img/FIGURES-servants.json"; d=json.load(open(F)); mine=json.load(open(H+"/myrecs.json"))
was_sorted=[r["file"] for r in d]==sorted(r["file"] for r in d)
d=[r for r in d if r["file"] not in mine]+sorted(mine.values(),key=lambda r:r["file"])
if was_sorted: d.sort(key=lambda r:r["file"])
json.dump(d,open(F,"w"),indent=1,ensure_ascii=False); open(F,"a").write("\n")
P=open(H+"/HUADIAN_C2part.md").read(); hp=W+"/dev/figwork/HUADIAN_C.md"
sec=P[P.index("## m27"):]
if os.path.exists(hp):
    t=open(hp).read()
    t=re.sub(r"## m27–m52.*?(?=\n## |\Z)","",t,flags=re.S).rstrip()+"\n\n"+sec
else: t=P
open(hp,"w").write(t)
print(len(d),"records;",len(mine),"mine")
