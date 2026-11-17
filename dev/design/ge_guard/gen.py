import sys; import os; sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))); from cat import *
V={"T":"thiện","H":"giữa","A":"ác"}
D={"O":"Ở · giữ phận","Q":"Ở · nắm quyền","R":"Rời cung","T":"Theo người"}
M={"A":"Lấy ân","U":"Lấy uy","B":"Buông"}
out=[];cur=None
for rid,rn,L in R:
    o=rid.split("_")[0]
    if o!=cur:
        cur=o; out.append(f"\n#### {o} — {ID[o]}\n| Branch | # | Grand ending (node name) | Group | Natural | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever | Thiện title | Ác title |\n|---|---|---|---|---|---|---|---|---|---|")
    for i,x in enumerate(L):
        t,a=titles(x)
        out.append(f"| {'`'+rid+'` '+rn if i==0 else ''} | ge{i+1} | **{x[0]}** | {x[1]} {G[x[1]]} | {V[x[2]]} | {D[x[3]]} | {M[x[4]]} | {x[5]} · {x[6]} | {t} | {a} |")
open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'table.md'),'w').write("\n".join(out)+"\n")
