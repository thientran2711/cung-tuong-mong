import sys,json
for l in sys.stdin:
  l=l.rstrip()
  if l.startswith("== "):
    tag,who,js=l[3:].split(" ",2); d=json.loads(js); print(tag,who,"S=",d.get("S"),"CW=",d.get("CW"),"fz=",d.get("fz","")[:80].replace("\n"," | "),"btn=",[b for b in d.get("btn") if len(b)<60][-12:], "kscn",d.get("kscn"),"rtoast",d.get("rtoast"),"modal",d.get("modal")[:40])
  else: print(l[:300])
