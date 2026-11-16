# cv.py tier cid... : compact variable parts: cid|style|ref|features|mot|colour clause|poses(22;30;42;55)
import json,sys,re
J=json.load(open('jobs.json')); ids=json.load(open('idfix.json')); t=sys.argv[1]
for c in sys.argv[2:]:
    k=f"N-{c}-t{t}"; j=J[k]; p=j['prompt']; rid=ids[j['ref'][6:]]
    f=p[p.index('Her own features: ')+18:p.index('. From the identity')]
    o=p[p.index('a NEW outfit, ')+14:p.index('. Poses (NEW')]
    m=re.search(r'(?:borders of|phoenixes and) (.+?) (?:at collar|on|,)',o); col=o[o.index('family ')+7:] if 'family ' in o else o
    po=p[p.index('left to right: about 19, lively and youthful: ')+46:p.index('; dynamic graceful motion')]
    po=re.sub(r'; about \d\d, [^:]+: ',' || ',po)
    print(f"{c}|{j['style']}|{rid}|{f}|{m.group(1) if m else '-'}|{col}|{po}")
