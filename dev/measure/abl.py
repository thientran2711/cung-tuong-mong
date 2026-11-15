import json,glob,collections,sys
print('| bản | đời | HH% | chết sớm% | con/đời | thai/đời | sảy do người | sảy tự nhiên | hặc nàng/đời | giá họa nàng/đời | chết khi sinh |')
print('|---|---|---|---|---|---|---|---|---|---|---|')
NAME={'A':'hiện tại','B':'tắt jpal','C':'tắt jwd92b','D':'tắt j96+j97','E':'tắt xạ hương'}
OLD=('Thái phi','Thái hậu','tiên đế','Tuẫn','Vương gia','Xuất gia','Lên ngôi','Xuất cung','Xuất giá','ban gả','HH-STOP','ma ma','Năm ')
for k in sys.argv[1:] or 'ABCDE':
  L=[]
  for f in glob.glob(f'out/abl_{k}_*.json'):
    try:L+=[x for x in json.load(open(f)) if isinstance(x,dict) and 'fate' in x]
    except Exception:pass
  n=len(L)
  if not n: print('|',NAME.get(k,k),'| 0 |');continue
  hh=sum(1 for x in L if x['maxRank']>=7);ed=sum(1 for x in L if x['maxRank']<7 and not any(o in x['fate'] for o in OLD))
  kids=sum(x['kids'] for x in L);conc=sum((x.get('pg') or {}).get('conc',0) for x in L)
  hum=0;nat=0
  for x in L:
    for a,b in (x.get('lz') or {}).items():
      if a.startswith('act:') or a=='taintHit': hum+=b
      if a=='pregMonth': nat+=b
  vp=sum((x.get('wd') or {}).get('vpS',0) for x in L);fr=sum((x.get('wd') or {}).get('frS',0) for x in L)
  cb=sum(1 for x in L if 'Khó sinh' in x['fate'])
  print(f"| {NAME.get(k,k)} | {n} | {100*hh/n:.0f}% | {100*ed/n:.0f}% | {kids/n:.1f} | {conc/n:.1f} | {hum} | {nat} | {vp/n:.1f} | {fr/n:.1f} | {cb}/{kids+cb} |")
