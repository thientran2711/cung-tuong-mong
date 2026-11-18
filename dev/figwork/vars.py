# vars.py tier ids... : print style, ref, features, outfit, pose for compact prompt building
import json,sys
J=json.load(open('jobs.json')); ids={}
for l in open('sheets5.txt'):
    p=l.split()
    if len(p)>=2 and not l.startswith('#'): ids[p[0]]=p[1]
t=sys.argv[1]
for c in sys.argv[2:]:
    k=f"N-{c}-t{t}"; j=J[k]; p=j['prompt']; r=j['ref']; rid=ids.get(r[6:]) if r and r.startswith('SHEET:') else r
    f=p[p.find('Her own features: ')+18:p.find('. Keep her')]
    o=p[p.find('Outfit for all four: ')+21:p.find('. Pose for all four')]
    po=p[p.find('three-quarter view, ')+20:p.find('. Eyes soft')] if 'three-quarter view, ' in p else p[p.find('Pose for all four: ')+19:p.find('. Eyes soft')]
    print(f"{c}|{j['style']}|{rid}|{f}|{o}|{po}")
