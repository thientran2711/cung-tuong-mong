import json,glob,sys
OLD=('Thái phi','Thái hậu','tiên đế','Tuẫn','Vương gia','Xuất gia','Lên ngôi','Xuất cung','Xuất giá','ban gả','HH-STOP','ma ma','Năm ')
print('| bản | đời | HH% | chết sớm% | sinh/đời | thai/đời | chết khi sinh | sảy do người | sảy tự nhiên | hặc nàng/đời | giá họa/đời | lệnh phòng bị/đời |')
for k in sys.argv[1:]:
  L=[]
  for f in glob.glob(f'out/{k}_*.json'):
    try:L+=[x for x in json.load(open(f)) if isinstance(x,dict) and 'fate' in x]
    except Exception:pass
  n=len(L)
  if not n: print(k,0);continue
  hh=sum(1 for x in L if x['maxRank']>=7);ed=sum(1 for x in L if x['maxRank']<7 and not any(o in x['fate'] for o in OLD))
  b=sum((x.get('bz') or {}).get('b',0) for x in L);d=sum((x.get('bz') or {}).get('d',0) for x in L);conc=sum((x.get('pg') or {}).get('conc',0) for x in L)
  hum=sum(v for x in L for a,v in (x.get('lz') or {}).items() if a.startswith('act:') or a=='taintHit');nat=sum((x.get('lz') or {}).get('pregMonth',0) for x in L)
  vp=sum((x.get('wd') or {}).get('vpS',0) for x in L);fr=sum((x.get('wd') or {}).get('frS',0) for x in L);g=sum(sum((x.get('guard') or {}).values()) for x in L)
  print(f"| {k} | {n} | {100*hh/n:.0f}% | {100*ed/n:.0f}% | {b/n:.1f} | {conc/n:.1f} | {d}/{b+d} | {hum} | {nat} | {vp/n:.1f} | {fr/n:.1f} | {g/n:.1f} |")
