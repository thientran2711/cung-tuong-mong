# addurl.py  < text containing "identifier":"X" ... "url":"Y" pairs (json from creations_get)
import sys,json,re,os
W=os.path.dirname(os.path.abspath(__file__)); db=json.load(open(W+"/urls.json"))
t=sys.stdin.read(); n=0
for m in re.finditer(r'"identifier":\s*"(\w+)".*?"url":\s*"([^"]+)"',t,re.S):
    db[m.group(1)]=m.group(2); n+=1
json.dump(db,open(W+"/urls.json","w"),indent=0); print("added",n)
