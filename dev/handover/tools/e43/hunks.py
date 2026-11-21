import re,sys
for p in sys.argv[1:]:
    s=open(p).read()
    for i,m in enumerate(re.finditer(r'<<<<<<< [^\n]*\n(.*?)(?:\|\|\|\|\|\|\| [^\n]*\n(.*?))?=======\n(.*?)>>>>>>> [^\n]*\n',s,re.S)):
        print(f"##### {p} hunk {i+1} line {s[:m.start()].count(chr(10))+1}\n--BRANCH--\n{m.group(1)[:1800]}\n--LIVE--\n{m.group(3)[:1800]}")
