# fixmeta.py NAME... : recompute eyeF in g/NAME.json with figface (topmost confident face); print changed tiles
import sys,json,os
sys.argv=[sys.argv[0],'x','x']+sys.argv[1:]
exec(open('hdg.py').read().split("cmd,name=sys.argv")[0])
for name in sys.argv[3:]:
    M=json.load(open(f'g/{name}.json')); ch=[]
    for k,m in enumerate(M):
        fr=flat(Image.open(bak(m['spec'])).convert('RGBA')); e=list(eyes(figface(fr)))
        if abs(e[0]-m['eyeF'][0])+abs(e[1]-m['eyeF'][1])>3: ch.append((k,m['spec'])); m['eyeF']=e
    json.dump(M,open(f'g/{name}.json','w'))
    if ch: print(name,ch)
