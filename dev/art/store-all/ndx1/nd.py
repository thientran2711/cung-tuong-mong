#!/usr/bin/env python3
"""NDX1 Nữ đế mass helper (owner Lượt 479/482: one-ref = own t1 [+ swatch], no style image).
  nd.py prep cNN            -> writes $S/cNN_aNN.txt for a18..a65 via build_all.py cNN nude --age aNN and runs check_store (must PASS)
  nd.py log cNN aNN GEN FACE [credits]  -> appends a ledger line (store_check PASS re-verified) to dev/art/gen_ledger.jsonl"""
import sys,os,json,subprocess,datetime
R=os.path.abspath(os.path.join(os.path.dirname(__file__),"..","..","..",".."))
S=os.environ.get("S","/tmp/claude-0/-home-user-cung-tuong-mong/f1b54cf7-4c52-5d19-a246-ca440900bf9e/scratchpad")
AGES=["a18","a26","a36","a51","a65"]
def prompt(c,a):
    return subprocess.run([sys.executable,os.path.join(R,"dev/art/store-all/build_all.py"),c,"nude","--age",a],capture_output=True,text=True,check=True).stdout
def chk(c,a,fn):
    args=[c,"v0","--nostyle"]+([] if a=="a18" else ["--age",a])
    o=subprocess.run([sys.executable,os.path.join(R,"dev/art/check_store.py"),fn]+args,capture_output=True,text=True).stdout
    return "STORE CHECK PASS" in o
if sys.argv[1]=="prep":
    c=sys.argv[2]
    for a in AGES:
        fn=os.path.join(S,f"{c}_{a}.txt"); open(fn,"w").write(prompt(c,a)); print(a,"PASS" if chk(c,a,fn) else "FAIL")
elif sys.argv[1]=="log":
    c,a,gen,face=sys.argv[2:6]; cr=int(sys.argv[6]) if len(sys.argv)>6 else 135
    fn=os.path.join(S,f"{c}_{a}.txt"); p=open(fn).read(); assert p==prompt(c,a),"prompt file stale"; assert chk(c,a,fn),"STORE CHECK FAIL"
    d={"ts":datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),"kind":"NUDE-MASS","cmd":f"python3 dev/art/store-all/build_all.py {c} nude --age {a}","prompt":p,
       "refs":[{"image":1,"name":f"own t1 of {c} at {a if a!='a65' else 'a51 (no a65 t1)'} = face (one-ref, Lượt 479/482)","magnific_id":face,"url":f"https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-{c}-t1-{a if a!='a65' else 'a51'}.webp"},
               {"image":2,"name":"royal-yellow swatch = colour only","magnific_id":"TdwDfOyVNR"}],
       "gen_id":gen,"magnific_prompt":p,"store_check":"PASS","credits":cr,"settings":"gpt-2-6 1024x2304 2k transparentBackground","out":f"img/_review/nude-mass/ndx1/{c}_{a}_nude.png","who":"ROOT-48 art worker NDX1"}
    open(os.path.join(R,"dev/art/gen_ledger.jsonl"),"a").write(json.dumps(d,ensure_ascii=False)+"\n"); print("logged",c,a,gen)
elif sys.argv[1]=="dl":   # nd.py dl cNN aNN URL
    c,a,u=sys.argv[2:5]; os.makedirs(os.path.join(S,"out"),exist_ok=True); fn=os.path.join(S,"out",f"{c}_{a}_nude.png")
    subprocess.run(["curl","-s","-o",fn,u],check=True)
    from PIL import Image; im=Image.open(fn); print(c,a,im.size,im.mode,"corner",im.getpixel((3,3)))
elif sys.argv[1]=="look":  # nd.py look cNN [ages...] -> $S/out/look_cNN.jpg (bodies on grey) + head_cNN.jpg (heads + her t1 face)
    from PIL import Image; import urllib.request,io
    c=sys.argv[2]; ages=sys.argv[3:] or AGES; ims=[]
    for a in ages:
        im=Image.open(os.path.join(S,"out",f"{c}_{a}_nude.png")).convert("RGBA"); bg=Image.new("RGBA",im.size,(190,190,190,255)); bg.alpha_composite(im); ims.append(bg.convert("RGB"))
    W=300; H=int(W*2304/1024); sh=Image.new("RGB",(W*len(ims),H),"white")
    for i,im in enumerate(ims): sh.paste(im.resize((W,H)),(i*W,0))
    sh.save(os.path.join(S,"out",f"look_{c}.jpg"),quality=85)
    hs=Image.new("RGB",(260*(len(ims)+1),300),"white")
    f=Image.open(io.BytesIO(subprocess.run(["curl","-s",f"https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-{c}-t1-a18.webp"],capture_output=True).stdout)).convert("RGB"); fw,fh=f.size
    hs.paste(f.crop((fw//5,0,4*fw//5,int(fw*0.6*300/260))).resize((260,300)),(0,0))
    for i,im in enumerate(ims): w,h=im.size; hs.paste(im.crop((w//5,0,4*w//5,int(w*0.6*300/260))).resize((260,300)),(260*(i+1),0))
    hs.save(os.path.join(S,"out",f"head_{c}.jpg"),quality=85); print("ok")
elif sys.argv[1]=="sheet":  # nd.py sheet NAME cAA cBB ... -> $S/out/sheet_NAME.jpg (rows people, cols ages, labelled)
    from PIL import Image,ImageDraw,ImageFont
    name=sys.argv[2]; ppl=sys.argv[3:]; W=220; H=int(W*2304/1024); L=70; T=40
    sh=Image.new("RGB",(L+W*5,T+H*len(ppl)),(235,235,235)); d=ImageDraw.Draw(sh)
    try: F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",22)
    except Exception: F=None
    for j,a in enumerate(AGES): d.text((L+j*W+80,8),a,fill=(0,0,0),font=F)
    for i,c in enumerate(ppl):
        d.text((8,T+i*H+H//2),c,fill=(0,0,0),font=F)
        for j,a in enumerate(AGES):
            fn=os.path.join(S,"out",f"{c}_{a}_nude.png")
            if not os.path.exists(fn): continue
            im=Image.open(fn).convert("RGBA"); bg=Image.new("RGBA",im.size,(200,200,200,255)); bg.alpha_composite(im)
            sh.paste(bg.convert("RGB").resize((W,H)),(L+j*W,T+i*H))
    out=os.path.join(S,"out",f"sheet_{name}.jpg"); sh.save(out,quality=82); print(out,sh.size)
elif sys.argv[1]=="rows":  # nd.py rows OUTDIR cAA cBB ... -> OUTDIR/nude_row_cNN.jpg per person + OUTDIR/nude_all_<first>-<last>.jpg (owner sheet: cut figures on #efe9df, ~1400 px per row)
    from PIL import Image,ImageDraw,ImageFont
    od=sys.argv[2]; ppl=sys.argv[3:]; os.makedirs(od,exist_ok=True); W=280; H=630; T=44; BG=(0xef,0xe9,0xdf)
    try: F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",24)
    except Exception: F=ImageFont.load_default()
    rows=[]
    for c in ppl:
        r=Image.new("RGB",(W*5,T+H),BG); d=ImageDraw.Draw(r)
        for j,a in enumerate(AGES):
            d.text((j*W+10,10),f"{c} {a} Nữ đế",fill=(60,40,20),font=F)
            fn=os.path.join(S,"out",f"{c}_{a}_nude.png")
            if os.path.exists(fn):
                im=Image.open(fn).convert("RGBA").resize((W,H),Image.LANCZOS); t=Image.new("RGBA",(W,H),BG+(255,)); t.alpha_composite(im); r.paste(t.convert("RGB"),(j*W,T))
        r.save(os.path.join(od,f"nude_row_{c}.jpg"),quality=88); rows.append(r)
    al=Image.new("RGB",(W*5,(T+H)*len(rows)),BG)
    for i,r in enumerate(rows): al.paste(r,(0,i*(T+H)))
    fn=os.path.join(od,f"nude_all_{ppl[0]}-{ppl[-1]}.jpg"); al.save(fn,quality=85); print(fn,al.size)
