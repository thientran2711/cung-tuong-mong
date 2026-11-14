# python3 manifest.py -> img/ACTS.json from acts_list.json + files present in img/
# Format: {"<key>": {"file":"img/act-<key>.webp","cat":"<cat>","names":[...],"ids":[...]},
#          "cat-<cat>": {"file":"img/act-cat-<cat>.webp","cat":"<cat>","names":[],"label":"..."}}
# Names ending in "*" are prefixes (dynamic card names). Look up exact name first, then prefixes, then ids, then cat-<cat>.
import json,os
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..'))
D=json.load(open(os.path.join(H,'acts_list.json'))); M={}
for c,v in D['categories'].items():
    f='img/act-cat-%s.webp'%c
    if os.path.exists(os.path.join(ROOT,f)): M['cat-'+c]={'file':f,'cat':c,'names':[],'label':v['label']}
for a in D['acts']:
    f='img/act-%s.webp'%a['key']
    if os.path.exists(os.path.join(ROOT,f)):
        e={'file':f,'cat':a['cat'],'names':a['names']}
        if a['ids']: e['ids']=a['ids']
        M[a['key']]=e
json.dump(M,open(os.path.join(ROOT,'img/ACTS.json'),'w'),ensure_ascii=False,indent=1)
n=sum(1 for k in M if not k.startswith('cat-')); print('ACTS.json:',n,'acts +',len(M)-n,'cats; of',len(D['acts']))
