# usage: python3 dev/measure/anx.py <label> file1.json [file2.json ...]   (runb.js outputs, with INP2=inx.js for the extra counters)
# one summary for all files pooled: HH, early death, causes, childbirth per birth (births counted by inx), per-origin HH, accusations, time to HH
import json,sys,os,collections,statistics as st
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
_a=sys.argv;sys.argv=[_a[0]]
from an7 import cls,q
sys.argv=_a
lab=sys.argv[1];L=[]
for fn in sys.argv[2:]:
    try: L+=[x for x in json.load(open(fn)) if 'fate' in x]
    except Exception: pass
bad=[x for x in L if x['fate']=='TIMEOUT' or x['fate'].startswith('CRASH')]
L=[x for x in L if x not in bad];n=len(L)
if not n: print(lab,'no data');sys.exit()
H=[x for x in L if x.get('maxRank',0)>=7]
died=[x for x in L if x.get('maxRank',0)<7 and cls(x['fate'])!='old/survived' and x['fate']!='HH-STOP']
IX=[x['ix'] for x in L if x.get('ix')]
cb=sum(1 for x in L if cls(x['fate'])=='childbirth')
births=sum(i['births'] for i in IX) if IX else None
print(f"{lab}: n={n} (timeout/crash {len(bad)})  HH {100*len(H)/n:.0f}% ({len(H)})  early death {100*len(died)/n:.0f}% ({len(died)})  survived w/o HH {100*(n-len(H)-len(died))/n:.0f}%")
print('  early-death causes:',dict(collections.Counter(cls(x['fate']) for x in died).most_common()))
if IX:
    br=[r for i in IX for r in i['bRisk']]
    print(f"  births (labours) {births} in {len(IX)} lives = {births/len(IX):.2f}/life; childbirth deaths {cb} = {100*cb/max(1,births):.1f}% per labour; mean birthRisk shown {st.mean(br) if br else 0:.1f}")
    print(f"  accusations against her /life {st.mean(i['accAt'] for i in IX):.1f} (succeeded {st.mean(i['accOk'] for i in IX):.1f}); falls {st.mean(i['falls'] for i in IX):.1f}; cold palace {st.mean(i['cold'] for i in IX):.1f}")
    D=collections.Counter()
    for i in IX: D.update(i['dem'])
    print('  her demotions/confinements per life:',[(k,round(v/len(IX),1)) for k,v in D.most_common(6)])
    ON=collections.defaultdict(lambda:[0,0])
    for i in IX:
        for k,v in (i.get('on') or {}).items(): ON[k][0]+=v[0];ON[k][1]+=v[1]
    if ON: print('  NPC acts on her per life (tried/landed):',{k:f"{v[0]/len(IX):.1f}/{v[1]/len(IX):.1f}" for k,v in sorted(ON.items(),key=lambda x:-x[1][0])[:14]})
    W=collections.Counter()
    for i in IX: W.update({int(k):v for k,v in i['rkW'].items()})
    tw=sum(W.values()) or 1;print('  share of tuần at each rank:',{k:f"{100*v/tw:.0f}%" for k,v in sorted(W.items())})
O=collections.defaultdict(lambda:[0,0,0])
for x in L:
    o=O[x['origin']];o[0]+=1;o[1]+=x.get('maxRank',0)>=7;o[2]+=x in died
print('  per origin (n, HH, died):',{k:f"{v[0]}/{v[1]}/{v[2]}" for k,v in sorted(O.items())})
print('  maxRank hist:',dict(sorted(collections.Counter(x.get('maxRank',0) for x in L).items())))
hw=[x['hhWk'] for x in H if x.get('hhWk') is not None]
if len(hw)>=2:
    yr=[w/36 for w in hw]
    print(f"  time to HH (n={len(hw)}): years p25/med/p75 {q(yr,.25):.1f}/{q(yr,.5):.1f}/{q(yr,.75):.1f}; tuần {q(hw,.25):.0f}/{q(hw,.5):.0f}/{q(hw,.75):.0f}; real min @10s/tuần {q(hw,.25)/6:.0f}/{q(hw,.5)/6:.0f}/{q(hw,.75)/6:.0f}; @20s/tuần {q(hw,.25)/3:.0f}/{q(hw,.5)/3:.0f}/{q(hw,.75)/3:.0f}")
print('  died <2 tuần:',sum(1 for x in died if x.get('wk',99)<2),' life weeks median',q([x.get('wk',0) for x in L],.5))
