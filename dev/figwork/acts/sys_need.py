import sys,os,re
H='/home/user/cung-tuong-mong/.claude/worktrees/agent-ab06ce27b6963775a/dev/figwork/acts'
sys.path.insert(0,H)
s=open(H+'/meanings.py').read();blk=s[s.index('Tổng lược system lines'):s.index('("tu-dung"')]
ks=[k for k in re.findall(r'^\("([^"]+)"',blk,re.M) if k!='-']
g1={l.split()[0] for l in open(H+'/gens.txt') if l.strip()}
need=[k for k in dict.fromkeys(ks) if not os.path.exists(H+'/../../../img/act-%s.webp'%k) and k not in g1]
print(len(need),' '.join(need))
