# mergefig.py : union FIGURES-servants.json (ours order; main's record wins for shared files; main-only appended); check files exist
import json,os
H=os.path.dirname(os.path.abspath(__file__))
o=json.load(open(H+'/F_ours.json')); m=json.load(open(H+'/F_main.json'))
M={r['file']:r for r in m}; seen=set(); out=[]
for r in o: out.append(M.get(r['file'],r)); seen.add(r['file'])
for r in m:
    if r['file'] not in seen: out.append(r)
W='/home/user/cung-tuong-mong/.claude/worktrees/agent-a7a7268489937d5f2/'
json.dump(out,open(W+'img/FIGURES-servants.json','w'),indent=1,ensure_ascii=False); open(W+'img/FIGURES-servants.json','a').write("\n")
files=[r['file'] for r in out]; print(len(out),len(set(files)))
miss=[f for r in out for f in (r['file'],r.get('por')) if f and not os.path.exists(W+f)]; print("missing",len(miss),miss[:5])
