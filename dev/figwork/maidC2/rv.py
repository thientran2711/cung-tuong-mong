# rv.py OUT.jpg JID... : per row: original maid a18 + raw lineup + heads of figs 1 and 4 (zoom)
import sys,json,subprocess,io,os
from PIL import Image,ImageDraw
H=os.path.dirname(os.path.abspath(__file__))
subprocess.run(["python3",H+"/urls.py"],capture_output=True)
db=json.load(open(H+"/urls.json")); g={}
for l in open(H+"/gens.txt"):
    a=l.split(); g[a[0]]=a[1]
out=sys.argv[1]; js=sys.argv[2:]; RH=int(os.environ.get("RH",420))
rows=[]
for j in js:
    u=db[g[j]]; u=u+("&" if "?" in u else "?")+"w=2048&preview=1"
    for t in range(6):
        b=subprocess.run(["curl","-s","--retry","4","--retry-all-errors",u],capture_output=True).stdout
        try: big=Image.open(io.BytesIO(b)).convert("RGB"); break
        except Exception: pass
    W,Hh=big.size; who=j.split("-")[1]
    t1=f"{H}/out/fig-maid-{who}-t1-a18.webp"
    o=Image.open(t1 if j.split("-")[2]!="t1" and os.path.exists(t1) else f"{H}/../wtc2/img/fig-maid-{who}-a18.webp").convert("RGBA"); o=o.resize((int(o.width*RH/o.height),RH))
    lin=big.resize((RH*2,RH))
    hs=[]
    for k in (0,3):
        x0=int(W*(k*0.25)); hs.append(big.crop((x0,0,x0+int(W*0.25),int(Hh*0.25))).resize((RH*1//2*2//2*2//2*2,RH//2*1) if False else (int(RH*0.5*2),RH//2)))
    row=Image.new("RGB",(o.width+RH*2+hs[0].width+10,RH),"white"); row.paste(o,(0,0),o); row.paste(lin,(o.width,0))
    row.paste(hs[0],(o.width+RH*2+10,0)); row.paste(hs[1],(o.width+RH*2+10,RH//2))
    ImageDraw.Draw(row).text((4,4),j,fill="black"); rows.append(row)
M=Image.new("RGB",(max(r.width for r in rows),len(rows)*(RH+6)),"white")
for i,r in enumerate(rows): M.paste(r,(0,i*(RH+6)))
M.save(out,quality=85); print(out,M.size)
