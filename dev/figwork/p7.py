# p7.py JID... (art9): t1-t3 calm redraw prompt = pj.py prompt with the approved pilot wording (keep EXACTLY her face)
import json,sys
J=json.load(open('jobs.json')); ids=json.load(open('idfix.json'))
OLD="From the identity reference lineup keep ONLY her face, facial features, hairstyle colour and signature colour family; do NOT copy the reference's ages, poses, outfit, hair ornaments or accessories; use the NEW (younger) ages, the NEW outfit and the NEW poses below."
for k in sys.argv[1:]:
    j=J[k]; r=j['ref']; rid=ids.get(r[6:]) if r and r.startswith('SHEET:') else r
    p=j['prompt']; assert OLD in p,k
    if k.endswith('-t1'): new="From the identity reference lineup keep EXACTLY her face, facial features, hairstyle colour and signature colour family (the same woman); do NOT copy the reference's ages, poses or accessories; use the NEW ages and the NEW poses below."
    else: new="From the identity reference lineup keep EXACTLY her face, facial features, hairstyle colour and signature colour family (the same woman); do NOT copy the reference's ages, poses, outfit, hair ornaments or accessories; use the NEW ages, the NEW outfit and the NEW poses below."
    p=p.replace(OLD,new).replace("Poses (NEW, NOT the reference's poses; ","Poses (")
    print(k,j['style'],rid); print(p); print()
