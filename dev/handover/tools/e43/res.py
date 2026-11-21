import re,ast
P=re.compile(r'<<<<<<< [^\n]*\n(.*?)=======\n(.*?)>>>>>>> [^\n]*\n',re.S)
def fix(p,fn,n=1):
    s=open(p).read();ms=list(P.finditer(s));assert len(ms)==n,(p,len(ms))
    for m in reversed(ms): s=s[:m.start()]+fn(m.group(1),m.group(2))+s[m.end():]
    assert '<<<<<<<' not in s and '>>>>>>>' not in s;open(p,'w').write(s);print("ok",p)
def asm(b,l):
    gb=ast.literal_eval(re.search(r"for f in (\[.*?\])",b).group(1));gl=ast.literal_eval(re.search(r"for f in (\[.*?\])",l).group(1))
    assert re.sub(r"\[.*?\]","",b)==re.sub(r"\[.*?\]","",l)
    out=list(gl);add=[]
    for i,x in enumerate(gb):
        if x not in out: out.insert(out.index(gb[i-1])+1,x);add.append((x,gb[i-1]))
    print("assemble: branch-only inserted",add,"live-only",[x for x in gl if x not in gb]);assert len(out)==len(set(out))
    assert repr(gl) in l;return l.replace(repr(gl),repr(out))
