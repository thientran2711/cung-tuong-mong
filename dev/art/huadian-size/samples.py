import sys,json; sys.path.insert(0,'tools')
from shrink import shrink
from PIL import Image
R=json.load(open('ref.json')); Q=json.load(open('ratios.json')); T=float(sys.argv[1]) if len(sys.argv)>1 else 0.07
S=[("consort-c05","t5",[(177,154,210,182),(189,182,201,189)]),("consort-c05","t8",(177,145,202,176)),("consort-c03","t1",(186,167,205,190)),
   ("consort-c30","t4",[(177,164,207,185),(185,185,199,190)],dict(hl=55,hc=20)),("maid-m19","t2",(174,164,200,189)),("consort-c13","t7",(181,144,219,166))]
for it in S:
    p,t,b=it[:3]; kw=it[3] if len(it)>3 else {}
    fw=R[p][2]; im,r,s,_=shrink(f"dl/por-{p}-{t}-a18.webp",b,fw,T,cur=Q[p.split('-')[1]+'-'+t],**kw)
    im.save(f"out_{p}-{t}.png"); print(p,t,"before %.3f"%r,"scale %.2f"%s,"table %.3f"%Q[p.split("-")[1]+"-"+t])
