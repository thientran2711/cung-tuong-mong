import sys,os,subprocess,io
from PIL import Image,ImageDraw
R='/home/user/cung-tuong-mong'; T=R+'/dev/handover/reports/fig-cutout-clean/tools'; O='/tmp/claude-0/w/out'
def proc(key,url):
    p=f'/tmp/claude-0/w/{key}.png'
    subprocess.run(['curl','-s','-o',p,url],check=True)
    env=dict(os.environ,FORCE_HD='1')
    r=subprocess.run(['python3','-I',T+'/finish_fig.py',p,key,O],capture_output=True,text=True,env=env)
    print(r.stdout[-160:],r.stderr[-300:])
    q=subprocess.run(['python3','-I',T+f'/qa_fig.py','--kind','fig','--old',f'{O}/_old/fig-{key}.webp',f'{O}/img/fig-{key}.webp'],capture_output=True,text=True,cwd=R)
    print(key,'QA:',(q.stdout+q.stderr).strip()[-400:])
def sheet(keys,out):
    ims=[Image.open(f'{O}/img/hd/fig-{k}.webp').convert('RGBA') for k in keys]
    h=1500; ims=[i.resize((round(i.width*h/i.height),h),Image.LANCZOS) for i in ims]
    W=sum(i.width for i in ims)+20*(len(ims)+1)
    c=Image.new('RGBA',(W,h+40),(25,25,30,255)); x=20
    d=ImageDraw.Draw(c)
    for k,i in zip(keys,ims):
        c.alpha_composite(i,(x,40)); d.text((x,10),k,fill=(255,255,255,255)); x+=i.width+20
    c=c.convert('RGB'); c.thumbnail((1800,1000)); c.save(out)
if __name__=='__main__':
    if sys.argv[1]=='sheet': sheet(sys.argv[3:],sys.argv[2])
    else: proc(sys.argv[1],sys.argv[2])
