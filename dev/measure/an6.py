import json,glob,collections,statistics as st,sys
d=sys.argv[1]
OLD=('Thái phi','Thái hậu','tiên đế','Tuẫn','Vương gia','Xuất gia','Lên ngôi')
def cls(f):
    if 'Khó sinh' in f: return 'childbirth'
    if 'lãnh cung' in f or 'Chết rét' in f or 'Phát điên' in f: return 'cold palace'
    if 'ban' in f.lower() and ('rượu độc' in f or 'chết' in f): return 'executed'
    if 'độc' in f: return 'poisoned'
    if 'nguy kịch' in f or 'bệnh' in f: return 'illness'
    if any(o in f for o in OLD): return 'old/survived'
    return 'other:'+f[:30]
for pat in sorted(set(f.split('/')[-1].rsplit('_',1)[0] for f in glob.glob(d+'/res_*.json'))):
    L=[]
    for f in glob.glob(d+'/'+pat+'_*.json'):
        try:L+=[x for x in json.load(open(f)) if 'fate' in x]
        except Exception as e:pass
    L=[x for x in L if x['fate']!='TIMEOUT' and not x['fate'].startswith('CRASH')]
    if not L: continue
    n=len(L);hh=sum(1 for x in L if x.get('maxRank',0)>=7)
    died=[x for x in L if x.get('maxRank',0)<7 and cls(x['fate'])!='old/survived']
    births=sum(x.get('kids',0) for x in L)
    cb=sum(1 for x in L if cls(x['fate'])=='childbirth')
    early=[x for x in L if x['turns']<1 and cls(x['fate'])!='old/survived']
    print(f"{pat}: n={n} HH {100*hh/n:.0f}%  died-before-HH/old {100*len(died)/n:.0f}%  childbirth deaths {100*cb/n:.0f}% of lives, {100*cb/max(1,births+cb):.1f}% per birth (births/life {births/n:.2f})  median yrs {st.median(x['years'] for x in L):.1f}  died<1mo {len(early)} fired/life {st.mean(x.get('fired',0) for x in L):.1f}")
    print('   causes:',dict(collections.Counter(cls(x['fate']) for x in L).most_common()))
    print('   top fates:',collections.Counter(x['fate'][:40] for x in L).most_common(5))
