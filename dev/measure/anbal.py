# usage: python3 dev/measure/anbal.py <label> file1.json [file2.json ...]  (runbal.js outputs; shards of one config)
# prints: n, HH %, early death %, causes, night shares (hers overall / before HH; top NPC), Sủng histograms, time to HH (game + real)
import json,sys,os,collections,statistics as st
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from an7 import cls,q
lab=sys.argv[1];F=sys.argv[2:]
L=[];H={'npc':[0]*11,'me':[0]*11,'top':[0]*11}
for fn in F:
    try: L+= [x for x in json.load(open(fn)) if 'fate' in x]
    except Exception: pass
    try:
        e=json.load(open(fn.replace('.json','.ext.json')))
        for k in H: H[k]=[a+b for a,b in zip(H[k],e['hist'][k])]
    except Exception: pass
bad=[x for x in L if x['fate']=='TIMEOUT' or x['fate'].startswith('CRASH')]
L=[x for x in L if x not in bad];n=len(L)
if not n: print(lab,'no data');sys.exit()
HH=[x for x in L if x.get('maxRank',0)>=7]
died=[x for x in L if x.get('maxRank',0)<7 and cls(x['fate'])!='old/survived']
print(f"{lab}: n={n} (timeout/crash {len(bad)})  HH {100*len(HH)/n:.0f}%  early death {100*len(died)/n:.0f}%")
print('  early-death causes:',dict(collections.Counter(cls(x['fate']) for x in died).most_common()))
N=[x for x in L if x.get('nMe') is not None and (x['nMe']+x['nNpc'])>0]
if N:
    me=sum(x['nMe'] for x in N);tot=sum(x['nMe']+x['nNpc'] for x in N)
    per=[x['nMe']/(x['nMe']+x['nNpc']) for x in N]
    top=[x['nTopNpc']/(x['nMe']+x['nNpc']) for x in N]
    pre=[x for x in N if x.get('meHH')];preS=[x['meHH']['me']/max(1,x['meHH']['me']+x['meHH']['npc']) for x in pre]
    ncons=st.mean(x.get('consorts',0) for x in N)
    print(f"  nights: her share pooled {100*me/tot:.1f}% (per-life median {100*q(per,.5):.1f}%, p25/p75 {100*q(per,.25):.0f}/{100*q(per,.75):.0f}); before HH median {100*q(preS,.5) if preS else 0:.1f}%; fair 1/{ncons:.0f} = {100/ncons:.1f}%")
    print(f"  top NPC's share per life: median {100*q(top,.5):.1f}% max {100*max(top):.1f}%;  her share >35% in {sum(p>.35 for p in per)}/{len(per)} lives")
def pct(h): s=sum(h) or 1;return ' '.join(f"{100*v/s:.0f}" for v in h)
print('  Sủng hist (0-9,10-19,..,100) % NPC:',pct(H['npc']));print('                         top NPC:',pct(H['top']));print('                         her    :',pct(H['me']))
hw=[x for x in HH if x.get('hhWk') is not None]
if len(hw)>=2:
    wk=[x['hhWk'] for x in hw];bu=[x['hhB'] for x in hw if x.get('hhB')]
    yr=[w/36 for w in wk]
    print(f"  time to HH (n={len(hw)}): years p25/med/p75 {q(yr,.25):.1f}/{q(yr,.5):.1f}/{q(yr,.75):.1f}; tuần {q(wk,.25):.0f}/{q(wk,.5):.0f}/{q(wk,.75):.0f}; buổi {q(bu,.25):.0f}/{q(bu,.5):.0f}/{q(bu,.75):.0f}")
    for s in (25,40): print(f"     real hours @{s}s/buổi: {q(bu,.25)*s/3600:.1f}/{q(bu,.5)*s/3600:.1f}/{q(bu,.75)*s/3600:.1f}")
print('  life length years median', f"{q([x['years'] for x in L],.5):.1f}", ' Sủng at end median', q([x.get('sung',0) for x in L],.5))
