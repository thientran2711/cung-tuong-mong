# review/hoang-tu test pages at the repo root (not committed): _ht.html = this build, _ht0.html = the same build WITHOUT jht.js ("before")
# usage: CTM_IMG_BASE= python3 dev/test/ht-mk.py   then serve the repo root (python3 -m http.server 8841) and run dev/test/hoang-tu.js
import re,os,subprocess
R=os.path.abspath(os.path.dirname(__file__)+"/../..")
subprocess.run(["python3",R+"/dev/build/assemble.py"],check=True,stdout=subprocess.DEVNULL)
H='<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover">'
open(R+"/_ht.html","w",encoding="utf-8").write(H+open(R+"/dev/index.html",encoding="utf-8").read())
L=open(R+"/dev/build/assemble.py",encoding="utf-8").read()
mods=eval(re.search(r"for f in (\[.*?\])\)",L).group(1));mods.remove("jht.js")
js="".join(open(R+"/dev/build/"+f,encoding="utf-8").read() for f in mods)
p1=open(R+"/dev/build/p1.html",encoding="utf-8").read().replace("__ICON__","").rstrip()[:-8]
av=open(R+"/dev/build/avatars.js",encoding="utf-8").read()
open(R+"/_ht0.html","w",encoding="utf-8").write(H+p1+"<script>\n"+av+"\n</script>\n<script>\n"+js+"\n</script>\n")
print("ok")
