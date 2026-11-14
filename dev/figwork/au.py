# au.py "id num hmac" lines on stdin -> urls.json
import sys,json
db=json.load(open('urls.json')); n=0
for l in sys.stdin:
    p=l.split()
    if len(p)==3: db[p[0]]=f"https://pikaso.cdnpk.net/private/production/{p[1]}/render.png?token=exp=1794960000~hmac={p[2]}"; n+=1
json.dump(db,open('urls.json','w'),indent=0); print('added',n)
