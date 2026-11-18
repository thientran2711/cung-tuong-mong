import json
J=json.load(open('jobs.json')); M=json.load(open('masters.json'))
for k,j in J.items():
    if j['ref'] and j['ref'].startswith('MASTER:'): j['ref']=M[j['ref'][7:]]
json.dump(J,open('jobs.json','w'),indent=0)
