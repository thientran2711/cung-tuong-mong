import sys
f,line=sys.argv[1],sys.argv[2]; t=open(f).read().rstrip("\n")+"\n"
H="## C-B (thợ m27–m52): mẻ và tín dụng"
if H not in t: t+="\n"+H+"\n"
t+=line+"\n"; open(f,"w").write(t)
