# merge.py WT : put my records (myrecs.json, ONLY m27–m52) into WT/img/FIGURES-servants.json (replace same "file")
import json,sys,os
H=os.path.dirname(os.path.abspath(__file__)); W=sys.argv[1]
F=W+"/img/FIGURES-servants.json"; d=json.load(open(F)); mine=json.load(open(H+"/myrecs.json"))
mine={k:v for k,v in mine.items() if v.get("role")=="maid" and 27<=int(v["identity"][1:])<=52 and os.path.exists(W+"/"+k)}
was_sorted=[r["file"] for r in d]==sorted(r["file"] for r in d)
d=[r for r in d if r["file"] not in mine]+sorted(mine.values(),key=lambda r:r["file"])
if was_sorted: d.sort(key=lambda r:r["file"])
json.dump(d,open(F,"w"),indent=1,ensure_ascii=False); open(F,"a").write("\n")
print(len(d),"records;",len(mine),"mine")
