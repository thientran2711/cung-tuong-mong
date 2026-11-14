# pub.py "commit msg" JID... : copy fig/por/sheet of JIDs from cw into the worktree, merge their records, copy tools/logs, commit (no push)
import sys,os,json,shutil,glob,subprocess
S="/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad"; C=S+"/cw"
W="/home/user/cung-tuong-mong/.claude/worktrees/agent-ade4e7b6002d975ea"
msg=sys.argv[1]; js=sys.argv[2:]
recs=json.load(open(C+"/myrecs.json")); F=W+"/img/FIGURES-servants.json"; d=json.load(open(F))
byf={r["file"]:i for i,r in enumerate(d)}; n=0
for j in js:
    _,who,tt=j.split("-"); t=tt[1:] if tt=="tcold" else tt
    for a in ["a18","a26","a36","a51"]:
        for k in ("fig","por"):
            f=f"{k}-maid-{who}-{t}-{a}.webp"; shutil.copy(f"{C}/out/{f}",f"{W}/img/{f}")
        key=f"img/fig-maid-{who}-{t}-{a}.webp"; r=recs[key]
        if key in byf: d[byf[key]]=r
        else: d.append(r)
        n+=1
    shutil.copy(f"{C}/sheets/C_{who}_{t}.jpg",f"{W}/dev/figwork/sheets/C_{who}_{t}.jpg")
json.dump(d,open(F,"w"),indent=1,ensure_ascii=False); open(F,"a").write("\n")
T=W+"/dev/figwork/maidC/fix1114"; os.makedirs(T,exist_ok=True)
for f in ["p.py","hg.py","dl.py","put.py","rawfaces.py","faces.py","heads.py","grv.py","bodies.py","thumbs.py","PA.txt","st.txt","pub.py"]:
    if os.path.exists(f"{S}/{f}"): shutil.copy(f"{S}/{f}",T)
for f in ["proc.sh","cold2.py","gens.txt","bg.txt","myrecs.json","cur.sh"]:
    if os.path.exists(f"{C}/{f}"): shutil.copy(f"{C}/{f}",T)
if os.path.exists(S+"/cwB/t6new.py"): shutil.copy(S+"/cwB/t6new.py",T)
print(n,"records updated")
subprocess.run(["git","-C",W,"add","img","dev/figwork"],check=True)
subprocess.run(["git","-C",W,"commit","-q","-m",msg+"\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01V1ZZH4TC8cGXxdYrwHpFqQ"],check=True)
print(subprocess.run(["git","-C",W,"log","--oneline","-1"],capture_output=True,text=True).stdout)
