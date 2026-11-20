"""DESIGN15 job L1536 (rule G33, owner option A L1430): phoenix plumage = the person's own season colours.
Source: dev/art/face-common/palettes_season_deep.json (P6, owner 'Bản màu ổn rồi đó' L1042), 90 consorts (86 + s62-s65).
Per person x season: plumage = [main, secondary, deep main (feather tips/eye, main a little darker, soft not vivid (sat <= 0.50), so the phoenix reads on a main-colour robe)], outline gold #EFBD69 (store gold).
Run: python3 dev/handover/review-sheets/phoenix_L1536/make_phoenix_L1536.py  -> phoenix_L1536.json/.md + 8 swatch sheets."""
import json,os,colorsys
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__)); ART=os.path.join(H,"..","..","..","art")
D=json.load(open(os.path.join(ART,"face-common","palettes_season_deep.json"),encoding="utf-8"))
G=json.load(open(os.path.join(ART,"face-common","OWNER_GROUPS_L686.json"),encoding="utf-8"))
GOLD="#EFBD69"
SE=[("xuan","XUÂN"),("ha","HẠ"),("thu","THU"),("dong","ĐÔNG")]
def deep(h,f=0.72):
    r,g,b=(int(h[i:i+2],16)/255 for i in (1,3,5)); hh,ll,ss=colorsys.rgb_to_hls(r,g,b)
    r,g,b=colorsys.hls_to_rgb(hh,max(0.38,ll*0.80),min(ss,0.50)); return "#%02X%02X%02X"%tuple(round(x*255) for x in (r,g,b))
ppl=[k for k,v in D.items() if isinstance(v,dict) and all(s in v for s,_ in SE)]
order=lambda k:("mcs".index(k[0]) if k[0] in "mcs" else 9,int(k[1:]) if k[1:].isdigit() else 0)
ppl.sort(key=order)
T={}
for k in ppl:
    T[k]={"group":G.get(k,D[k].get("group","")) if isinstance(G.get(k,""),str) else "", "root_season":D[k].get("root_season")}
    for s,_ in SE:
        p=D[k][s]; T[k][s]={"plumage":[p["main_hex"],p["sec_hex"],deep(p["main_hex"])],"outline":GOLD,
            "words":f'{p["main"].split(" #")[0]} and {p["sec"].split(" #")[0]} plumage with deeper {p["main"].split(" #")[0]} feather tips, outlined in fine gold thread',
            "vi":f'{p.get("main_vi",p["main"])} + {p.get("sec_vi",p["sec"])} (+ đậm), viền vàng'}
json.dump({"_note":__doc__,"people":T},open(os.path.join(H,"phoenix_L1536.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=1)
with open(os.path.join(H,"phoenix_L1536.md"),"w",encoding="utf-8") as f:
    f.write("# Bảng màu lông phượng (G33, phương án A) — 90 phi tần × 4 mùa\nmàu lông = [chính, phụ, chính đậm] · viền vàng "+GOLD+"\n\n| Người | Nhóm | Xuân | Hạ | Thu | Đông |\n|---|---|---|---|---|---|\n")
    for k in ppl: f.write(f"| {k} | {T[k]['group']} | "+" | ".join(" ".join(T[k][s]['plumage']) for s,_ in SE)+" |\n")
F=lambda n,b=False:ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf"%("-Bold" if b else ""),n)
def feather(d,x,y,cols):
    # stylised tail feather: 3 nested teardrops (main outer, secondary middle, deep eye) + gold outline
    for i,(c,sc) in enumerate(zip(cols,(1.0,0.62,0.30))):
        w,h=int(70*sc),int(150*sc); cx,cy=x+70,y+95+int((1-sc)*40)
        d.ellipse((cx-w,cy-h//2-20,cx+w,cy+h//2+40),fill=c,outline=GOLD,width=4)
    d.line((x+70,y+10,x+70,y+190),fill=GOLD,width=3)
CW,CH=330,330
for s,sv in SE:
    for part in (0,1):
        sub=ppl[part*45:(part+1)*45]; cols=9; rows=(len(sub)+cols-1)//cols
        im=Image.new("RGB",(cols*CW+40,rows*CH+150),(250,246,238)); d=ImageDraw.Draw(im)
        d.text((20,15),f"MÀU LÔNG PHƯỢNG · MÙA {sv} · phần {part+1}/2",font=F(46,True),fill=(110,20,30))
        d.text((20,75),"Phượng thêu trên áo (HQP t7 / Hoàng hậu t8) VÀ phượng trên mũ = CÙNG bộ màu này · màu của chính người đó · viền chỉ vàng · ô nền = màu áo chính",font=F(24),fill=(60,60,60))
        for i,k in enumerate(sub):
            x=20+(i%cols)*CW; y=130+(i//cols)*CH; p=T[k][s]["plumage"]; m=D[k][s]
            d.rounded_rectangle((x,y,x+CW-14,y+CH-14),12,fill=p[0])
            d.rounded_rectangle((x+8,y+8,x+CW-22,y+56),8,fill="white")
            d.text((x+16,y+12),f"{k} · {T[k]['group']}",font=F(28,True),fill=(30,30,30))
            feather(d,x+20,y+64,p)
            for j,(h,lab) in enumerate(zip(p,("chính","phụ","đậm"))):
                yy=y+80+j*62; d.rectangle((x+170,yy,x+214,yy+44),fill=h,outline=GOLD,width=3)
                d.text((x+220,yy+2),lab,font=F(20,True),fill=(20,20,20)); d.text((x+220,yy+24),h,font=F(17),fill=(20,20,20))
            d.rounded_rectangle((x+8,y+CH-74,x+CW-22,y+CH-22),8,fill="white")
            d.text((x+14,y+CH-70),m.get("main_vi",m["main"])[:26],font=F(18),fill=(30,30,30)); d.text((x+14,y+CH-46),"+ "+m.get("sec_vi",m["sec"])[:24],font=F(18),fill=(30,30,30))
        im.save(os.path.join(H,f"phoenix_{s}_{part+1}.jpg"),quality=86)
print(len(ppl),"people")
