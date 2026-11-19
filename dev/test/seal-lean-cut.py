#!/usr/bin/env python3
"""Cut the seal-lean-2 proof videos from seal-lean-video.js output. usage: python3 dev/test/seal-lean-cut.py <outdir> <W>x<H>
Writes full-<WxH>.mp4 (natural take, whole screen) and close-<key>-<WxH>.mp4 (crop around the big seal, 720x720) via ffmpeg (H.264)."""
import json,subprocess,sys
out,sz=sys.argv[1],sys.argv[2];d=json.load(open(f'{out}/log-{sz}.json'));raw=f'{out}/raw-{sz}.webm';OFF=float(sys.argv[3]) if len(sys.argv)>3 else 0.0
def run(a):subprocess.run(['ffmpeg','-y','-loglevel','error']+a,check=True)
S=lambda ms:max(0,ms/1000+OFF)
run(['-ss',f'{S(d["naturalStart"]):.2f}','-t',f'{(d["naturalEnd"]-d["naturalStart"])/1000:.2f}','-i',raw,'-an','-c:v','libx264','-pix_fmt','yuv420p','-crf','24','-preset','fast',f'{out}/full-{sz}.mp4'])
for f in d['forced']:
    b=f['big'];r=b['rect'];cx=(r['x']+r['w']/2)*2;cy=(r['y']+r['h']/2)*2;side=int(max(r['w'],r['h'])*2*1.45)//2*2;x=max(0,int(cx-side/2));y=max(0,int(cy-side/2))
    run(['-ss',f'{S(f["ts"])-0.5:.2f}','-t',f'{(f["te"]-f["ts"])/1000+1.3:.2f}','-i',raw,'-an','-vf',f'crop={side}:{side}:{x}:{y},scale=720:720:flags=lanczos','-c:v','libx264','-pix_fmt','yuv420p','-crf','22','-preset','fast',f'{out}/close-{f["key"]}-{sz}.mp4'])
