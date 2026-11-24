import os,json,subprocess,glob
from PIL import Image
out='up3'
for d in ['r2','r2v']: os.makedirs(f'{out}/{d}',exist_ok=True)
# statics: both devices together
names=set()
for f in glob.glob('shots3/*-fold-*.png'):
    base=os.path.basename(f)[:-4];m,_,s=base.split('-',2);names.add((m,s))
for m,s in sorted(names):
    pf=f'shots3/{m}-fold-{s}.png';pi=f'shots3/{m}-ipad-{s}.png'
    if not(os.path.exists(pf) and os.path.exists(pi)):print('missing',m,s);continue
    f=Image.open(pf).convert('RGB');i=Image.open(pi).convert('RGB')
    f.save(f'{out}/r2/{m}-fold-{s}.webp',quality=86);i.save(f'{out}/r2/{m}-ipad-{s}.webp',quality=86)
    H=1000;f1=f.resize((755,1000));i1=i.resize((1180,820))
    W=Image.new('RGB',(755+1180+30,1000),(40,28,20));W.paste(f1,(0,0));W.paste(i1,(785,90));W.save(f'{out}/r2/both-{m}-{s}.jpg',quality=88)
# videos
for dev in ['fold','ipad']:
    p=f'vid3/all-{dev}.json'
    if not os.path.exists(p):continue
    for j in json.load(open(p)):
        o=f"vid3/{j['mode']}-{j['seq']}-{dev}"
        subprocess.run(['ffmpeg','-loglevel','error','-y','-ss',str(max(0,j['t0']-0.3)),'-to',str(j['t1']+0.4),'-i',f'vid3/all-{dev}.webm','-an','-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-movflags','+faststart',o+'.mp4'])
        subprocess.run(['ffmpeg','-loglevel','error','-y','-i',o+'.mp4','-vf','setpts=0.5*PTS','-an','-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-movflags','+faststart',o+'-2x.mp4'])
        for sfx in ['','-2x']: os.replace(o+sfx+'.mp4',f"{out}/r2v/{os.path.basename(o)}{sfx}.mp4")
print('finished')
