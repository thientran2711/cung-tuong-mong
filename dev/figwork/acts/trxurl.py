# python3 trxurl.py KEY=ID ... : find each Magnific creation's full-size url in the session transcript(s) (TRX env = .jsonl path or dir;
# default: newest *.jsonl under ~/.claude/projects) -> prints "KEY ID URL" for fetchd.py / hfetch.py. Missing ids go to stderr.
import os,sys,re,glob
T=os.environ.get('TRX') or max(glob.glob('/root/.claude/projects/**/*.jsonl',recursive=True),key=os.path.getmtime)
fs=glob.glob(os.path.join(T,'**/*.jsonl'),recursive=True) if os.path.isdir(T) else [T]
txt=''.join(open(f,errors='ignore').read() for f in fs).replace('\\"','"')
for a in sys.argv[1:]:
    k,i=a.split('=')
    m=re.search(r'"identifier":"'+re.escape(i)+r'","status":"completed","results":\{"url":"([^"]+)"',txt)
    if m: print(k,i,m.group(1))
    else: print('missing',k,i,file=sys.stderr)
