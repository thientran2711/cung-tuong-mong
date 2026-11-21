# usage: python3 dev/measure/kchhcmp.py <label>=<glob> ... : pool kchh.js output files ({res,info}) per arm -> HH % ± binomial SE + 95% CI,
# outside %, death-before-HH %, per-origin HH, entry rank/stats; the gap line compares the first two arms (difference ± combined SE, 95% CI).
import json,glob,sys,math,re
OUTS=re.compile(r"Chính thất|Vợ quan|thiếp|Gả xa|Xuất gia|Nữ phu tử|Bỏ trốn|Trạng nguyên|Vương phi|Nữ tướng|Hòa thân|Nữ thương")
def hh(r):return (r.get("maxRank") or 0)>=7 or r.get("hhTurn") is not None or r.get("fate")=="HH-STOP"
def out(r):return "Tiểu thư ngoài cung" in (r.get("text") or "")  # the life ended on the home road (title regex also hit palace Xuất gia endings)
A={}
for a in sys.argv[1:]:
    lab,g=a.split("=",1);R=[];I=[]
    for f in sorted(glob.glob(g)):
        try:d=json.load(open(f))
        except Exception:continue
        R+=d.get("res",[]);I+=d.get("info",[])
    n=len(R) or 1;p=sum(map(hh,R))/n;se=math.sqrt(max(p*(1-p),1e-9)/n);A[lab]=(p,se,len(R))
    o=sum(map(out,R))/n;dead=sum(1 for r in R if not hh(r) and not out(r))/n
    by={}
    for r in R:k=r.get("origin");b=by.setdefault(k,[0,0]);b[0]+=1;b[1]+=hh(r)
    ins=[x for x in I if x.get("inPal") or x.get("direct")];av=lambda k:round(sum(x.get(k) or 0 for x in ins)/max(1,len(ins)))
    print(f"{lab}: n={len(R)}  HH {100*p:.1f}% ±{100*se:.1f} (95% CI {100*(p-1.96*se):.0f}-{100*(p+1.96*se):.0f})  outside {100*o:.0f}%  in palace, no HH (death/old/other) {100*dead:.0f}%")
    E=[r for r in R if not out(r)];pe=sum(map(hh,E))/max(1,len(E));see=math.sqrt(max(pe*(1-pe),1e-9)/max(1,len(E)));A[lab]+=(pe,see)
    print(f"   HH among lives that reached the palace: {100*pe:.1f}% ±{100*see:.1f} (n={len(E)})")
    print("   by origin:",{k:f"{v[1]}/{v[0]}" for k,v in sorted(by.items())})
    print(f"   at palace entry n={len(ins)}: rank {[sum(1 for x in ins if x.get('r')==q) for q in range(4)]} sắc {av('sac')} tài {av('tai')} danh {av('danh')} bạc {av('bac')}")
L=list(A)
if len(L)>=2:
    (p1,s1,_),(p2,s2,_)=A[L[0]][:3],A[L[1]][:3];d=p2-p1;s=math.sqrt(s1*s1+s2*s2)
    print(f"gap {L[1]} - {L[0]} (all lives): {100*d:+.1f} points ±{100*s:.1f} (95% CI {100*(d-1.96*s):+.0f}..{100*(d+1.96*s):+.0f}); target |gap| ≤ 5")
    (q1,t1),(q2,t2)=A[L[0]][3:],A[L[1]][3:];d=q2-q1;s=math.sqrt(t1*t1+t2*t2)
    print(f"gap {L[1]} - {L[0]} (reached the palace): {100*d:+.1f} points ±{100*s:.1f} (95% CI {100*(d-1.96*s):+.0f}..{100*(d+1.96*s):+.0f})")
