# mk_manual.py: manual_disp.txt (+ det18.json) -> manual_boxes.json  {name: [x0,y0,x1,y1] a18 por image px}
# display coords of a 2000-px wide view of a 2160-px sheet (k=1.08); tile 270x228 px, 8 tiers x 4 styles; crop origin (150,122), zoom 3
import sys,json,os
D=sys.argv[1]; K=2160/2000.; W,H,Z,OX,OY=270,228,3,150,122
styles={}
for si in range(21):
    pass
det=json.load(open(sys.argv[2])); names=sorted({n[4:].rsplit('-',2)[0] for n in det})
out={}
if os.path.exists(sys.argv[3]) and False: pass
for l in open(D):
    if l.startswith('#') or not l.strip(): continue
    s,*c=l.split(); s=int(s); x0,y0,x1,y1=[float(v)*K for v in c]
    xm,ym=(x0+x1)/2,(y0+y1)/2; col,row=int(xm//W),int(ym//H)
    n=f'por-{names[s*4+row]}-t{col+1}-a18'
    f=lambda x,y:(OX+(x-col*W)/Z,OY+(y-row*H)/Z)
    a=f(x0,y0); b=f(x1,y1)
    out[n]=[round(a[0],1),round(a[1],1),round(b[0],1),round(b[1],1)]
json.dump(out,open(sys.argv[3],'w'),indent=0)
print(len(out))
