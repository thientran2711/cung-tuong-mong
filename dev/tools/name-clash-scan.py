#!/usr/bin/env python3
"""Global-name clash scan (presentation-wiring, owner LUẬT SỬA CẢ NHÓM): every top-level function / const / let / var / class name declared in the
assembled game (module list of dev/build/assemble.py, all modules share ONE global scope, so a second declaration silently replaces or breaks the first).
usage: python3 dev/tools/name-clash-scan.py [base-ref]   (default origin/main)
Prints every name declared in 2+ places; with a base ref, only the NEW clashes (a name that was not duplicated on the base). Exit 1 if any new clash."""
import re,subprocess,sys,os
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
base=sys.argv[1] if len(sys.argv)>1 else 'origin/main'
def mods(src):
    m=re.search(r"for f in \[(.*?)\]\)",src,re.S);return [x.strip().strip("'\"") for x in m.group(1).split(',') if x.strip()]
DECL=re.compile(r"^(?:async\s+)?(?:function\*?\s+([A-Za-z_$][\w$]*)|(?:const|let|var|class)\s+([A-Za-z_$][\w$]*))",re.M)
def scan(read,names):
    seen={}
    for f in names:
        try:t=read(f)
        except Exception:continue
        for m in DECL.finditer(t):
            n=m.group(1) or m.group(2);seen.setdefault(n,[]).append(f)
    return {n:v for n,v in seen.items() if len(v)>1}
WIN=re.compile(r"window\.([A-Za-z_$][\w$]*)\s*=(?!=)|Object\.assign\(window,\{([^}]*)\}")
def scan_win(read,names):
    """a name published on window by one module (window.X= / Object.assign(window,{X})) that ANOTHER module declares at top level (the two clobber each other)"""
    decl={};pub={}
    for f in names:
        try:t=read(f)
        except Exception:continue
        for m in DECL.finditer(t):decl.setdefault(m.group(1) or m.group(2),set()).add(f)
        for m in WIN.finditer(t):
            for n in ([m.group(1)] if m.group(1) else re.findall(r"([A-Za-z_$][\w$]*)\s*(?:[,:]|$)",m.group(2))):pub.setdefault(n,set()).add(f)
    return {n:sorted(pub[n]|decl[n]) for n in pub if n in decl and (decl[n]-pub[n] or len(pub[n]|decl[n])>1) and len(pub[n]|decl[n])>1 and not(decl[n]==pub[n])}
def head_read(f):return open(os.path.join(R,'dev/build',f),encoding='utf-8').read()
def git(*a):return subprocess.run(['git','-C',R]+list(a),capture_output=True,text=True).stdout
cur=scan(head_read,mods(open(os.path.join(R,'dev/build/assemble.py'),encoding='utf-8').read()))
b_src=git('show',base+':dev/build/assemble.py')
old=scan(lambda f:git('show',base+':dev/build/'+f),mods(b_src)) if b_src else {}
curw=scan_win(head_read,mods(open(os.path.join(R,'dev/build/assemble.py'),encoding='utf-8').read()))
print(f"declared in 2+ places: {len(cur)} now, {len(old)} on {base}")
oldw=scan_win(lambda f:git('show',base+':dev/build/'+f),mods(b_src)) if b_src else {}
new={n:v for n,v in cur.items() if n not in old}
new.update({n+" (window vs top-level)":v for n,v in curw.items() if n not in oldw})
for n,v in sorted(new.items()):print("NEW CLASH",n,v)
print("clashes new vs",base+":",len(new))
sys.exit(1 if new else 0)
