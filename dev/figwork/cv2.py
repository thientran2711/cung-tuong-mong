# cv2.py tier cid... : compact variable parts for t5-t8 prompts: cid|style|ref|features|MOT (t4/t6 motif)|COLOUR clause|poses a || b || c || d
import json,sys,re
J=json.load(open('jobs.json')); ids=json.load(open('idfix.json')); t=sys.argv[1]
for c in sys.argv[2:]:
    p=J[f"N-{c}-t{t}"]['prompt']; j=J[f"N-{c}-t{t}"]
    f=p[p.index('Her own features: ')+18:p.index('. From the identity')]
    m=re.search(r'phoenixes and (.+?), an embroidered pearl',p) or re.search(r'embroidered borders of (.+?) at collar',p)
    col=p[p.index('; her signature colour family ')+30:p.index('. Poses (NEW')]
    po=p[p.index('a gently lively gesture: ')+25:p.index('; all four standing still')]
    po=re.sub(r'; about \d\d, [^:]+: ',' || ',po)
    print(f"{c}|{j['style']}|{ids[j['ref'][6:]]}|{f}|{m.group(1) if m else '-'}|{col}|{po}")
