#!/usr/bin/env python3
"""seal-blank-scan.py <dir> : frame-step the event takes of seal-lean-video.js (DOMLOG=1 run: dom-<WxH>.json + event-<WxH>.mp4) at 25 fps.
Per device: crop around the dialog seal, count red-seal pixels per frame; after the dialog has faded in, a frame with < 25 % of the median red = a BLANK frame;
a frame with a big patch of the beige (242,226,204) = the part-swap square. Prints both lists (both must be empty)."""
import json,sys,os,glob,numpy as np
from PIL import Image
base=sys.argv[1];dev=sys.argv[2:] or ['755x1000','1180x820']
for d in dev:
    dom=json.load(open(f'{base}/dom-{d}.json'));seal=None
    for t,els in dom:
        for e in els:
            if 'kfseal' in e[0] and 20<e[3]<60 and seal is None: seal=e[1:4]
    cx,cy=int(seal[0]+seal[2]/2),int(seal[1]+seal[2]/2)
    fr=f'/tmp/seal-scan-{d}';os.system(f'rm -rf {fr};mkdir -p {fr};ffmpeg -loglevel error -y -i {base}/event-{d}.mp4 -vf fps=25 {fr}/%04d.png')
    fs=sorted(glob.glob(fr+'/*.png'));R=80;red=[];be=[];pap=[];cor=[]
    for f in fs:
        a=np.array(Image.open(f).convert('RGB')).astype(int);c=a[max(0,cy-R):cy+R,max(0,cx-R):cx+R]
        red.append(int(((c[:,:,0]>170)&(c[:,:,1]<120)&(c[:,:,2]<130)).sum()))
        pap.append(float((np.abs(c[R-14:R+14,R-14:R+14]-np.array([255,249,240])).sum(axis=2)>45).mean()));cor.append(bool((np.abs(a[max(0,cy-60),cx]-np.array([254,248,239])).sum()<24)));be.append(int(((abs(c[:,:,0]-242)<6)&(abs(c[:,:,1]-226)<6)&(abs(c[:,:,2]-204)<8)).sum()))
    red=np.array(red);on=np.where(red>50)[0];last=on.max();i=last
    while i>0 and red[i-1]>50:i-=1
    # skip the dialog fade-in (first 12 frames of the run) and judge against the median of the rest
    run=red[i+12:last+1];med=np.median(red[i+12:i+22])  # the small still before the lean = the floor: no frame may fall under 15 % of it (the clone starts as a smaller, shadowed circle: ~30 %)
    blank=[int(i+12+k) for k,v in enumerate(run) if v<0.15*med]
    # mood-agnostic blank test: the middle 28 px of the seal box must always be painted (not the dialog paper) from the first frame the seal shows until the end
    on2=[k for k,v in enumerate(pap) if v>0.5 and cor[k]];st=on2[0]  # first painted seal with the dialog paper around it
    empty=[k for k in range(st,len(pap)) if pap[k]<0.2]
    print(d,'EMPTY (seal box shows paper) frames after first seal:',empty)
    print(d,'seal',seal,'frames',len(fs),'dialog run',i,last,'small-still red',int(med),'min',int(run.min()),'blank:',blank,'beige-square:',[k for k,v in enumerate(be) if v>1500])
