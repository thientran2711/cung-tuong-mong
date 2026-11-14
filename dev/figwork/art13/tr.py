# tr.py FILE... : parse saved creations_get outputs (identifier:/url: lines) into urls.json
import sys,re,json
U=json.load(open('urls.json')); n=0
for f in sys.argv[1:]:
    s=open(f,errors='ignore').read()
    for m in re.finditer(r'identifier: (\w+)\n(?:.*\n){0,8}?\s*url: "([^"]+)"',s): U[m.group(1)]=m.group(2); n+=1
json.dump(U,open('urls.json','w'),indent=0); print('added',n)
