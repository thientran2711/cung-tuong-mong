"""diff-remeasure: rank curve from inx.js ix.rkW (tuần spent at each rank). usage: python3 dev/measure/rankcurve.py label=file.json[,file2] ...
   prints per rank r: lives that reached r, median tuần from life start to first reach r (sum of tuần at lower ranks; demotions counted in)."""
import json,sys,statistics as st
def med(a):return st.median(a) if a else None
print('| arm | n | '+' | '.join(f'to r{r}' for r in range(1,8))+' |');print('|---|---|'+'---|'*7)
for arg in sys.argv[1:]:
  lab,fs=arg.split('=',1);L=[x for f in fs.split(',') for x in json.load(open(f))]
  cells=[]
  for r in range(1,8):
    ts=[sum(v for k,v in (x.get('ix') or {}).get('rkW',{}).items() if int(k)<r) for x in L if (x.get('maxRank') or 0)>=r and (x.get('ix') or {}).get('rkW')]
    m=med(ts);cells.append(f"{len(ts)} · {m:.0f}" if m is not None else "0 · –")
  print(f'| {lab} | {len(L)} | '+' | '.join(cells)+' |')
