# Count week-book lines that share one picture although they mean different things.
# usage: python3 dev/test/act-pics-count.py <result.json from dev/test/act-pics.js> [...]
# "meaning" = the line's head (text before the first . : · ( [), with names/numbers folded; a picture shared by >1 meaning counts every meaning.
import json,sys,re,collections
by=collections.defaultdict(set);pairs=collections.Counter();rows=0
def head(t):
    h=re.split(r'[.:·(\[]',t)[0].strip()
    h=re.sub(r'\d+','N',h)
    return h
for f in sys.argv[1:]:
    R=json.load(open(f,encoding='utf-8'))
    for w in R['weeks']:
        for pg in w.get('pages',[]):
            if pg['title'].startswith('Triều'):continue
            for t,a,_ in pg['facts']:
                rows+=1
                if a:by[a].add(head(t))
shared={a:s for a,s in by.items() if len(s)>1}
n=sum(len(s) for s in shared.values())
print(json.dumps({'rows':rows,'meanings':len(set().union(*by.values())) if by else 0,'pictures':len(by),'shared_pictures':len(shared),'meanings_sharing':n},ensure_ascii=False))
for a,s in sorted(shared.items(),key=lambda x:-len(x[1])):
    print(f'{a.replace("img/","")}\t{len(s)}\t'+' | '.join(sorted(s))[:600])
