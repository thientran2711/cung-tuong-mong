#!/usr/bin/env python3
"""it-key-guard family scan (two forms: direct IT[x].p and alias v=IT[x]; v.p) (review/it-key-guard).
Counts, per game file dev/build/j*.js, reads of the item table that throw when the key is not an IT item:
  IT[x].p / IT[x][p]   (direct property read on a raw lookup)
Writes (IT[x]=, IT[x].p=, delete IT[x].p), existence checks (IT[x]&&, if(IT[x])) and safe forms ((IT[x]||{}).p, itm(x).p) are not counted.
Part 2: piece-vs-map field clashes (S.vl veil vs jvoice memory).
usage: python3 dev/test/it-key-scan.py [--git <ref>] [--list]     exit 1 when any unguarded read is left."""
import re,sys,subprocess,glob,os
args=sys.argv[1:];ref=None;lst='--list' in args
if '--git' in args: ref=args[args.index('--git')+1]
root=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
def files():
    if ref:
        out=subprocess.run(['git','ls-tree','--name-only',ref,'dev/build/'],capture_output=True,text=True,cwd=os.path.join(root,'..','..')).stdout.split()
        for f in out:
            b=os.path.basename(f)
            if re.fullmatch(r'j[^/]*\.js',b): yield b,subprocess.run(['git','show',f'{ref}:{f}'],capture_output=True,text=True,cwd=os.path.join(root,'..','..')).stdout
    else:
        for f in sorted(glob.glob(os.path.join(root,'j*.js'))): yield os.path.basename(f),open(f,encoding='utf-8').read()
def bal(s,i):  # s[i]=='[' -> index after matching ']'
    d=0
    for j in range(i,len(s)):
        c=s[j]
        if c=='[': d+=1
        elif c==']':
            d-=1
            if d==0: return j+1
    return -1
tot=0;rows=[]
for name,src in files():
    n=0;hits=[]
    for m in re.finditer(r'(?<![\w.$])IT\[',src):
        e=bal(src,m.end()-1)
        if e<0: continue
        nxt=src[e:e+2]
        if not (nxt[:1]=='.' or nxt[:1]=='['): continue
        # property write IT[x].p= (not ==)
        mm=re.match(r'(\.[\w$]+|\[[^\]]*\])\s*(=(?!=)|\+=|-=)',src[e:e+80])
        if mm: continue
        if re.search(r'delete\s*$',src[max(0,m.start()-8):m.start()]): continue
        n+=1;hits.append(src.count('\n',0,m.start())+1)
    # alias reads: v=IT[x] then v.p with no existence guard (!v, v&&, v?, if(v), v||) in the next 300 chars
    for m in re.finditer(r'(?<![\w$.])([a-zA-Z_$][\w$]*)=IT\[',src):
        v=m.group(1);e=bal(src,m.end()-1)
        if e<0 or src[e:e+2] in ('||','&&') or src[e:e+1]=='?': continue
        tail=src[e:e+300]
        if not re.search(r'\b%s\.'%re.escape(v),tail): continue
        if re.search(r'(!%s\b|\b%s&&|\b%s\?|if\(%s\)|%s\|\|)'%((re.escape(v),)*5),tail): continue
        n+=1;hits.append(src.count('\n',0,m.start())+1)
    if n: rows.append((name,n,hits));tot+=n
print(f"unguarded item-table reads: {tot} in {len(rows)} files"+(f" ({ref})" if ref else ""))
for name,n,h in sorted(rows,key=lambda r:-r[1]): print(f"  {name:14s} {n:4d}"+(f"  lines {h[:12]}" if lst else ""))
# part 2: field-name clash (the S.vl case): a person field read as an item piece (x.f.k) in one module and used as a memory map
# (x.f=x.f||{} or x.f[key]=) in another -> the map ends up worn / put in the chest as a piece with no key
piece={};mapf={}
for name,src in files():
    for m in re.finditer(r'\b(?:S|p|v|t|a|f|r|o)\.([a-zA-Z_$][\w$]*)\.k\b',src): piece.setdefault(m.group(1),set()).add(name)
    for m in re.finditer(r'\b(S|p|v|t)\.([a-zA-Z_$][\w$]*)=\1\.\2\|\|\{\}',src): mapf.setdefault(m.group(2),set()).add(name)
    for m in re.finditer(r'\b(?:S|p|v|t)\.([a-zA-Z_$][\w$]*)\[(?!["\d])[a-zA-Z_$][\w$]*\]\s*=',src): mapf.setdefault(m.group(1),set()).add(name)
cl=[(k,sorted(piece[k]),sorted(mapf[k])) for k in piece if k in mapf and k not in ('inv','wd')]
print(f"piece-vs-map field clashes: {len(cl)}")
for k,a,b in cl: print(f"  {k}: piece in {a[:6]} / map in {b[:6]}")
sys.exit(1 if tot or cl else 0)
