# python3 harvest2.py IDS.txt [TRX.jsonl]  : for each "key id" line, find the finished URL in the session transcript
# (creations_wait output) and run fetch2.py key id url. Missing/failed ids are printed.
import re,sys,os,subprocess,glob
H=os.path.dirname(os.path.abspath(__file__))
trx=sys.argv[2] if len(sys.argv)>2 else os.path.expanduser('~/.claude/projects/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/subagents/agent-af9dcf5caaf740b47.jsonl')
U={}
for f in glob.glob(trx):
    s=open(f,errors='ignore').read().replace('\\"','"')
    for m in re.finditer(r'"identifier":"(\w+)","status":"completed","results":\{"url":"([^"]+)"',s): U[m.group(1)]=m.group(2)
for l in open(sys.argv[1]):
    p=l.split()
    if len(p)<2 or p[0].startswith('#'): continue
    k,gid=p[:2]
    if gid not in U: print('NOURL',k,gid); continue
    subprocess.run(['python3',os.path.join(H,'fetch2.py'),k,gid,U[gid]]+p[2:3])
