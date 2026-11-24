import json,sys
# add_done.py <batch> key=gen[:note] ...
D=json.load(open('done.json')); b=sys.argv[1]
for a in sys.argv[2:]:
    k,r=a.split('=',1); g,_,n=r.partition(':'); D[k]={"gen":g,"batch":b,"note":n}
json.dump(D,open('done.json','w'),ensure_ascii=False,indent=1); print(len(D),'done')
