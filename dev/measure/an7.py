# usage: python3 dev/measure/an7.py file.json [...]  -> balance summary per file (+ time-to-Hoàng-hậu stats)
import json,sys,collections,statistics as st
OLD=('Thái phi','Thái hậu','tiên đế','Tuẫn','Vương gia','Xuất gia','Lên ngôi')
def cls(f):
    if 'Khó sinh' in f: return 'childbirth'
    if 'lãnh cung' in f or 'Chết rét' in f or 'Phát điên' in f: return 'cold palace'
    if 'ban' in f.lower() and ('rượu độc' in f or 'chết' in f): return 'executed'
    if 'độc' in f: return 'poisoned'
    if 'nguy kịch' in f or 'bệnh' in f.lower(): return 'illness'
    if any(o in f for o in OLD): return 'old/survived'
    return 'other:'+f[:30]
def q(v,p):
    v=sorted(v);k=(len(v)-1)*p;i=int(k);return v[i]+(v[min(i+1,len(v)-1)]-v[i])*(k-i)
for fn in sys.argv[1:]:
    try: L=[x for x in json.load(open(fn)) if 'fate' in x]
    except Exception: continue
    bad=[x for x in L if x['fate']=='TIMEOUT' or x['fate'].startswith('CRASH')]
    L=[x for x in L if x not in bad]
    if not L: continue
    n=len(L);H=[x for x in L if x.get('maxRank',0)>=7]
    died=[x for x in L if x.get('maxRank',0)<7 and cls(x['fate'])!='old/survived']
    births=sum(x.get('kids',0) for x in L);cb=sum(1 for x in L if cls(x['fate'])=='childbirth')
    d2=[x for x in L if x.get('wk',99)<2 and cls(x['fate'])!='old/survived']
    d1m=[x for x in L if x['turns']<1 and cls(x['fate'])!='old/survived']
    print(f"{fn.split('/')[-1]}: n={n} (bad {len(bad)}) HH {100*len(H)/n:.0f}%  early death {100*len(died)/n:.0f}%  childbirth {100*cb/max(1,births+cb):.1f}%/birth ({births/n:.2f} births/life)  died<2wk {len(d2)} <1mo {len(d1m)}  fired/life {st.mean(x.get('fired',0) for x in L):.1f}  trysts/life {st.mean(x.get('trysts',0) for x in L):.1f}")
    print('   causes all:',dict(collections.Counter(cls(x['fate']) for x in L).most_common()))
    print('   early-death causes:',dict(collections.Counter(cls(x['fate']) for x in died).most_common()))
    hw=[x['hhWk'] for x in H if x.get('hhWk') is not None]
    if len(hw)>=3:
        yr=[w/36 for w in hw]
        print(f"   time to HH (n={len(hw)}): years p25/med/p75 {q(yr,.25):.1f}/{q(yr,.5):.1f}/{q(yr,.75):.1f}; turns(tuần) {q(hw,.25):.0f}/{q(hw,.5):.0f}/{q(hw,.75):.0f}; min@10s {q(hw,.25)/6:.0f}/{q(hw,.5)/6:.0f}/{q(hw,.75)/6:.0f}; min@20s {q(hw,.25)/3:.0f}/{q(hw,.5)/3:.0f}/{q(hw,.75)/3:.0f}")
