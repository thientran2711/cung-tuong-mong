"""SCAN 4 — player-visible names of the time buttons (owner 15/11: "Sang buổi" / "Sang ngày mới"; no "Qua ngày", "Qua buổi",
"Qua đêm", "Đợi sáng"). Looks at string literals of every game module + p1.html + swreg.js, comments stripped.
usage: python3 dev/test/cb-words.py [git-ref]   (no ref = working tree)"""
import re,subprocess,sys,os
R=os.path.dirname(os.path.abspath(__file__))+'/../..';ref=sys.argv[1] if len(sys.argv)>1 else None
BAD=re.compile(r'(Qua ngày|Qua buổi|Qua đêm|Đợi sáng)')
def files():
  out=subprocess.run(['git','-C',R,'ls-files' if not ref else 'ls-tree','-r','--name-only',*( [ref] if ref else [])],capture_output=True,text=True).stdout.split()
  if not ref:out=subprocess.run(['git','-C',R,'ls-files'],capture_output=True,text=True).stdout.split()
  return [f for f in out if (re.match(r'dev/build/j[^/]*\.js$',f) or f in('dev/build/p1.html','dev/site/swreg.js'))]
def read(f):
  if ref:return subprocess.run(['git','-C',R,'show',f'{ref}:{f}'],capture_output=True,text=True).stdout
  return open(os.path.join(R,f),encoding='utf-8').read()
hits=[]
for f in files():
  t=re.sub(r'/\*[\s\S]*?\*/','',read(f));t=re.sub(r'(?m)^\s*//.*$','',t);t=re.sub(r'<!--[\s\S]*?-->','',t);t=re.sub(r'=/\^[^\n]*?/;','=0;',t)
  for m in re.finditer(r'"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`|\'(?:[^\'\\\n]|\\.)*\'|>[^<>{}]*<',t):
    s=m.group(0)
    if BAD.search(s) and not re.search(r'\^\(|\\\(|RegExp|test\(',t[max(0,m.start()-40):m.start()]):
      hits.append((f,BAD.search(s).group(0),s[:80].replace('\n',' ')))
print(f'{len(hits)} player-visible old names'+(f' at {ref}' if ref else ' (working tree)'))
for h in hits:print(' ',*h)
