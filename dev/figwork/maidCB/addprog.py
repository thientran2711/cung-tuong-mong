import sys
f,line=sys.argv[1],sys.argv[2]; t=open(f).read().rstrip("\n")+"\n"
H="## C-B (thợ m27–m52): mẻ và tín dụng"
if H not in t: t+="\n"+H+"\n"
L=t.rstrip("\n").split("\n")
k=[i for i,x in enumerate(L) if x.startswith("TRẠNG THÁI C-B")]
if k: L.insert(k[-1],line)
else: L.append(line)
open(f,"w").write("\n".join(L)+"\n")
