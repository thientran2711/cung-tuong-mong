# cv3.py tier cid... : compact variable parts of t6-t8 prompts (art4 colour rule): cid|style|ref|features|main(as in LAD)|colour-rule head|tail|poses a || b || c || d
import json,sys,re
J=json.load(open('jobs.json')); ids=json.load(open('idfix.json')); t=sys.argv[1]
for c in sys.argv[2:]:
    j=J[f"N-{c}-t{t}"]; p=j['prompt']
    f=p[p.index('Her own features: ')+18:p.index('. From the identity')]
    m=re.search(r'are all clearly (.+?) silk \(her signature colour family (.+?)\)',p)
    tail=p[p.index('silk visible; ')+14:p.index('. Poses (NEW')]
    po=p[p.index('a gently lively gesture: ')+25:p.index('; all four standing still')]
    po=re.sub(r'; about \d\d, [^:]+: ',' || ',po).replace(', with regal stately grace','').replace(', stately poised posture','')
    lm=re.search(r'robe of (SATURATED |)(.+?) silk',p[p.index('a NEW outfit'):])
    print(f"{c}|{j['style']}|{ids[j['ref'][6:]]}|{f}|{lm.group(1)}{lm.group(2)}|{m.group(1)}|{m.group(2)}|{tail}|{po}")
