# usage: python3 dev/measure/an8.py label file.json [...]   -> one markdown row + cause table + time-to-HH (game years, tuần, real hours at 10/20 s per tuần)
import json,sys,collections
OLD=('Thái phi','Thái hậu','tiên đế','Tuẫn','Vương gia','Xuất gia','Lên ngôi','Xuất cung','Xuất giá','ban gả','HH-STOP','ma ma')
def cls(f):
    if 'Khó sinh' in f: return 'sinh nở'
    if 'phá thai' in f: return 'phá thai'
    if 'lãnh cung' in f or 'Chết rét' in f or 'Phát điên' in f: return 'lãnh cung'
    if 'rượu độc' in f or 'tru di' in f or 'xét lại' in f: return 'bị xử tử'
    if 'độc' in f or 'yến sào' in f: return 'trúng độc'
    if 'nguy kịch' in f or 'Bệnh' in f or 'bệnh' in f: return 'bệnh'
    if any(w in f for w in ('đòn','trượng','tra khảo','giếng','dìm','Quỳ phạt')): return 'bị đánh/hại (cung nữ)'
    if any(o in f for o in OLD): return 'sống trọn/được an trí'
    return 'khác: '+f[:30]
def q(v,p):
    v=sorted(v);k=(len(v)-1)*p;i=int(k);return v[i]+(v[min(i+1,len(v)-1)]-v[i])*(k-i)
lab=sys.argv[1];L=[]
for fn in sys.argv[2:]:
    try:L+=[x for x in json.load(open(fn)) if 'fate' in x]
    except Exception:pass
bad=[x for x in L if x['fate']=='TIMEOUT' or x['fate'].startswith('CRASH')];L=[x for x in L if x not in bad]
n=len(L);H=[x for x in L if x.get('maxRank',0)>=7]
died=[x for x in L if x.get('maxRank',0)<7 and cls(x['fate'])!='sống trọn/được an trí']
births=sum(x.get('kids',0) for x in L);cb=sum(1 for x in L if cls(x['fate'])=='sinh nở')
d2=[x for x in L if x.get('wk',99)<2 and cls(x['fate'])!='sống trọn/được an trí']
OR={}
for x in L: OR.setdefault(x.get('origin'),[]).append(x)
print(f"| {lab} | {n} | {100*len(H)/n:.0f}% | {100*len(died)/n:.0f}% | {100*cb/max(1,births+cb):.1f}% | {births/n:.1f} | {len(d2)} | {len(bad)} |")
C=collections.Counter(cls(x['fate']) for x in died)
print('early-death causes (% of lives):',', '.join(f"{k} {100*v/n:.0f}%" for k,v in C.most_common()))
A=collections.Counter(cls(x['fate']) for x in L)
print('all endings:',', '.join(f"{k} {v}" for k,v in A.most_common()))
hw=[x['hhWk'] for x in H if x.get('hhWk') is not None]
if len(hw)>=3:
    print(f"time to HH n={len(hw)}: years {q(hw,.25)/36:.1f}/{q(hw,.5)/36:.1f}/{q(hw,.75)/36:.1f} | tuần {q(hw,.25):.0f}/{q(hw,.5):.0f}/{q(hw,.75):.0f} | hours@10s {q(hw,.25)*10/3600:.1f}/{q(hw,.5)*10/3600:.1f}/{q(hw,.75)*10/3600:.1f} | hours@20s {q(hw,.25)*20/3600:.1f}/{q(hw,.5)*20/3600:.1f}/{q(hw,.75)*20/3600:.1f} | 4 buổi (x4/3: 13-27 s/tuần) hours@13s {q(hw,.25)*13.3/3600:.1f}/{q(hw,.5)*13.3/3600:.1f}/{q(hw,.75)*13.3/3600:.1f} @27s {q(hw,.25)*26.7/3600:.1f}/{q(hw,.5)*26.7/3600:.1f}/{q(hw,.75)*26.7/3600:.1f}")
print('by origin (n, HH%, early death%):',', '.join(f"{k} {len(v)}/{100*sum(1 for x in v if x.get('maxRank',0)>=7)/len(v):.0f}/{100*sum(1 for x in v if x.get('maxRank',0)<7 and cls(x['fate'])!='sống trọn/được an trí')/len(v):.0f}" for k,v in sorted(OR.items(),key=lambda t:str(t[0]))))
# extras from the probe (dev/measure/probe_tail.js): kiếp dở dang, wardrobe moves by NPCs, cung nữ milestones
T=[x for x in L if x.get('tron') is not None]
if T: print(f"kiếp dở dang: {sum(1 for x in T if not x['tron'])}/{len(T)} = {100*sum(1 for x in T if not x['tron'])/len(T):.0f}%")
W=[x['wd'] for x in L if x.get('wd')]
if W: print('NPC hặc→nàng',sum(w['vpS'] for w in W),'NPC hặc→NPC',sum(w['vpN'] for w in W),'NPC giá họa→nàng',sum(w['frS'] for w in W),'giá họa→NPC',sum(w['frN'] for w in W),f"(trên {len(W)} đời, {sum(x.get('years',0) for x in L):.0f} năm game)")
C=[x for x in L if x.get('origin')=='cnv']
if C: print('cnv mốc:',collections.Counter(m for x in C for m in x.get('ms',[])).most_common(),' risen',sum(1 for x in C if x.get('risen')),'/',len(C))
