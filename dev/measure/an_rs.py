# review/residence-seats: summarise run_rs.js outputs.  usage: python3 dev/measure/an_rs.py old*.json -- new*.json
import json,sys,statistics as st
a=sys.argv[1:];i=a.index('--');sides={'before':a[:i],'after':a[i+1:]}
def load(fs):
  L=[]
  for f in fs:
    try:L+=json.load(open(f))
    except Exception:pass
  return [r for r in L if r.get('rs')]
def med(x):return round(st.median(x),1) if x else '-'
print('| | lives | months played (sum) | reach Tần | months to Tần (median) | reach Phi | to Phi | reach Quý phi | to QP | reach Hoàng hậu | max harem | co-resident hist 0/1/2/3+ | over cap | she in side hall / NTC (months below Tần) | ms per buổi |')
print('|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|')
for k,fs in sides.items():
  L=load(fs);n=len(L)
  if not n:print('|',k,'| 0 |');continue
  mon=sum((r['rs'].get('t0') is not None) and max([0]+[v for v in r['rs']['first'].values()]) or 0 for r in L)
  T=lambda rk:[r['rs']['first'][str(rk)] for r in L if str(rk) in r['rs']['first']]
  turns=sum(r.get('turns',0) for r in L)
  co=[sum(r['rs']['co'][j] for r in L) for j in range(4)];cn=sum(co) or 1
  side=sum(r['rs']['meSide'] for r in L);nt=sum(r['rs']['meNT'] for r in L);low=sum(r['rs']['meN'] for r in L)
  bms=sum(r['rs']['bms'] for r in L);bn=sum(r['rs']['bn'] for r in L) or 1
  print(f"| {k} | {n} | {turns} | {len(T(3))} ({round(100*len(T(3))/n)}/100) | {med(T(3))} | {len(T(4))} | {med(T(4))} | {len(T(5))} | {med(T(5))} | {len(T(7))} | {max(r['rs']['hmax'] for r in L)} | "+'/'.join(f'{round(100*c/cn)}' for c in co)+f" (per 100 samples) | {sum(r['rs']['over'] for r in L)} | {side} / {nt} of {low} | {round(bms/bn,1)} |")
