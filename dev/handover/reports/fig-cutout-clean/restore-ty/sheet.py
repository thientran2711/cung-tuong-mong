import sys,csv,numpy as np
from PIL import Image,ImageDraw
def sheet(keys,out,labels=None,cols=8,cw=136,ch=300):
    rows=(len(keys)+cols-1)//cols
    sh=Image.new('RGB',(cols*cw,rows*(ch+12)),(125,125,130));d=ImageDraw.Draw(sh)
    for i,k in enumerate(keys):
        r,c=divmod(i,cols)
        im=Image.open(f'keep/fig-{k}.webp').convert('RGBA');im.thumbnail((cw-4,ch))
        sh.paste(im,(c*cw+(cw-im.width)//2,r*(ch+12)+12+ch-im.height),im)
        d.text((c*cw+2,r*(ch+12)),(labels[i] if labels else k[5:]),fill=(255,255,255))
    sh.save(out,quality=85);print(sh.size)
if __name__=='__main__':
    R=list(csv.DictReader(open('rich.tsv'),delimiter='\t'))
    z=lambda n:(lambda v:(v-v.mean())/v.std())(np.array([float(r[n]) for r in R]))
    sc=z('sat')+z('edge')+z('lumsd')
    for r,s in zip(R,sc): r['score']=round(float(s),2)
    R.sort(key=lambda r:r['score'])
    csv.DictWriter(open('rich2.tsv','w'),fieldnames=list(R[0]),delimiter='\t').writeheader()
    w=csv.DictWriter(open('rich2.tsv','a'),fieldnames=list(R[0]),delimiter='\t');w.writerows(R)
    n=len(R);pick=[R[int(n*q)] for q in np.linspace(0.01,0.99,16)]
    sheet([p['key'] for p in pick],'calib.jpg',[f"{p['key'][5:-4]} {p['score']}" for p in pick])
