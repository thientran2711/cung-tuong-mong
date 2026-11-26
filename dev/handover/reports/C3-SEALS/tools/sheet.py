import sys,subprocess,os
from PIL import Image
# sheet.py <dir> <emo>... -> <dir>/sheet_<emo>.png (rows: out, loop; 8 frames each)
d=sys.argv[1]
for e in sys.argv[2:]:
    rows=[]
    for p in ("out","loop"):
        t=f"{d}/_t_{e}_{p}"; os.makedirs(t,exist_ok=True)
        subprocess.run(["ffmpeg","-y","-loglevel","error","-i",f"{d}/{e}-{p}.mp4","-vf","fps=2,scale=240:240",f"{t}/%02d.png"],check=True)
        fs=sorted(os.listdir(t))[:8]; rows.append([Image.open(f"{t}/{f}") for f in fs])
    sh=Image.new("RGB",(240*8,480),(0,0,0))
    for r,row in enumerate(rows):
        for c,im in enumerate(row): sh.paste(im,(c*240,r*240))
    sh.save(f"{d}/sheet_{e}.png")
