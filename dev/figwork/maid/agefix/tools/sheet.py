# sheet.py OUT.jpg jid... : per jid  a36 | old a51 | new a51 portraits (readable)
import sys,os
from PIL import Image,ImageDraw
W=os.environ.get("WT","/home/user/cung-tuong-mong/.claude/worktrees/agent-a86f02629e43ed2fc"); H=os.path.dirname(os.path.abspath(__file__))
def L(p):
    im=Image.open(p).convert("RGBA"); b=Image.new("RGB",im.size,"white"); b.paste(im,mask=im.split()[3]); return b.resize((230,303))
js=sys.argv[2:]; cols=2
S=Image.new("RGB",(cols*3*230+(cols-1)*20,((len(js)+cols-1)//cols)*318),"white"); d=ImageDraw.Draw(S)
for i,j in enumerate(js):
    part,c,t=j.split("-"); role="maid" if part=="A" else "consort"; x=(i%cols)*(3*230+20); y=(i//cols)*318
    for k,p in enumerate([f"{W}/img/por-{role}-{c}-t{t}-a36.webp",f"{H}/old/por-{role}-{c}-t{t}-a51.webp",f"{W}/img/por-{role}-{c}-t{t}-a51.webp"]):
        if os.path.exists(p): S.paste(L(p),(x+k*230,y))
    d.text((x+3,y+304),j+"  a36 | old a51 | new a51",fill="red")
S.save(sys.argv[1],quality=88)
