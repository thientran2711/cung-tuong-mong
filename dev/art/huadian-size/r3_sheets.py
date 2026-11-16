import sys,os,json,re
from PIL import Image,ImageDraw
S=os.path.dirname(os.path.abspath(__file__)); pd=S+'/por'
dec=json.JSONDecoder(); L={}
txt=open(S+'/log_por.jsonl').read(); i=0
while i<len(txt):
    while i<len(txt) and txt[i] in ' \n': i+=1
    if i>=len(txt): break
    try: x,j=dec.raw_decode(txt,i)
    except Exception: i=txt.find('\n',i)+1; continue
    i=j
    if 'name' in x: L[x['name']]=x
json.dump(L,open(S+'/L.json','w'))
age=int(sys.argv[1]); per=int(sys.argv[2])
styles=sorted({re.match(r'por-(.*)-t(?:\d|cold)-a\d+\.webp',f).group(1) for f in os.listdir(pd)})
W,H=130,120; cols=['t1','t2','t3','t4','t5','t6','t7','t8','tcold']
def geo(st,a):
    for t in ['t1','t3','t5','t2','t4','t6','t7','t8']:
        x=L.get(f'por-{st}-{t}-a{a}')
        if x and 'cx' in x: return x
    for a2 in (18,26,36,51):
        for t in ['t1','t3','t5']:
            x=L.get(f'por-{st}-{t}-a{a2}')
            if x and 'cx' in x: return x
    return {}
def tile(st,t):
    p=f'{pd}/por-{st}-{t}-a{age}.webp'
    if not os.path.exists(p): return Image.new('RGB',(W,H),(200,200,200))
    x=geo(st,age)
    im=Image.open(p).convert('RGBA'); b=Image.new('RGBA',im.size,(236,231,224,255)); b.alpha_composite(im); im=b.convert('RGB')
    c=x.get('cx',193); e=x.get('ey',203); f=x.get('fw',133)
    box=(c-0.34*f,e-0.66*f,c+0.34*f,e-0.02*f)
    return im.crop(tuple(int(round(v)) for v in box)).resize((W,H),Image.LANCZOS)
for s in range(0,len(styles),per):
    sh=Image.new('RGB',(9*W,per*H),(255,255,255)); d=ImageDraw.Draw(sh)
    for r,st in enumerate(styles[s:s+per]):
        for ci,t in enumerate(cols):
            sh.paste(tile(st,t),(ci*W,r*H))
            d.text((ci*W+3,r*H+2),f"{st.replace('consort-','').replace('maid-','').replace('player-','p-')} {t}",fill=(0,0,255))
    sh.save(f'{S}/sh/a{age}_{s//per:02d}.png')
print(len(styles))
