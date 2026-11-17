# review/residence-seats: summarise run_rs.js outputs (sens bots, inresseat.js add-on).
# usage: python3 dev/measure/an_rs.py old*.json -- new*.json      (prints markdown tables: before = first group, after = second)
# rank keys in rs.first: 3 Tần, 4 Phi, 5 Quý phi, 6 Hoàng quý phi, 7 Hoàng hậu (months from the life's start to first reach)
import json,sys,statistics as st
a=sys.argv[1:];i=a.index('--');sides={'before':a[:i],'after':a[i+1:]}
def load(fs):
  L=[]
  for f in fs:
    try:L+=json.load(open(f))
    except Exception:pass
  return [r for r in L if r.get('rs')]
def med(x):return st.median(x) if x else None
def q(x,p):
  if not x:return None
  x=sorted(x);return x[min(len(x)-1,int(p*len(x)))]
def f1(v):return '-' if v is None else (str(int(v)) if float(v).is_integer() else f'{v:.1f}')
D={k:load(fs) for k,fs in sides.items()}
def fate(r):
  t=r.get('title') or ''
  return 'cap' if t=='CAP' else 'timeout' if t=='TIMEOUT' else 'crash' if t=='CRASH' else 'ended'
print('### Lives\n')
print('| | lives | ended in game (death/ending) | reached 10 years (cap) | TIMEOUT | CRASH | months played (sum) | months per life (median) |')
print('|---|---|---|---|---|---|---|---|')
for k,L in D.items():
  n=len(L);F=[fate(r) for r in L];mon=[r['turns'] for r in L]
  print(f"| {k} | {n} | {F.count('ended')} | {F.count('cap')} | {F.count('timeout')} | {F.count('crash')} | {sum(mon)} | {f1(med(mon))} |")
print('\n### Promotion pace (months from start; median [p25–p75]; reach = lives that got there, per 100 lives)\n')
print('| | Tần reach | to Tần | Phi reach | to Phi | Quý phi reach | to QP | HQP reach | Hoàng hậu reach | to HH |')
print('|---|---|---|---|---|---|---|---|---|---|')
for k,L in D.items():
  n=len(L) or 1
  T=lambda rk:[r['rs']['first'][str(rk)] for r in L if str(rk) in r['rs']['first']]
  c=lambda rk:f"{len(T(rk))} ({round(100*len(T(rk))/n)}/100)"
  m=lambda rk:f"{f1(med(T(rk)))} [{f1(q(T(rk),.25))}–{f1(q(T(rk),.75))}]"
  print(f"| {k} | {c(3)} | {m(3)} | {c(4)} | {m(4)} | {c(5)} | {m(5)} | {c(6)} | {c(7)} | {m(7)} |")
print('\n### Harem size (living consorts + her), per game year: max over lives / mean of each life\'s yearly max (lives still playing that year)\n')
print('| | start (y1 mean) | max ever | '+' | '.join(f'y{y+1}' for y in range(10))+' |')
print('|---|---|---|'+'---|'*10)
for k,L in D.items():
  cells=[]
  for y in range(10):
    v=[r['rs']['hy'][y] for r in L if len(r['rs']['hy'])>y and r['rs']['hy'][y]]
    cells.append(f"{max(v)} / {sum(v)/len(v):.1f} ({len(v)})" if v else '-')
  y1=[r['rs']['hy'][0] for r in L if r['rs']['hy'] and r['rs']['hy'][0]]
  print(f"| {k} | {sum(y1)/len(y1):.1f} | {max(r['rs']['hmax'] for r in L)} | "+' | '.join(cells)+' |')
print('\n### Co-residents per chủ vị (monthly samples) and where she lives while below Tần\n')
print('| | samples | 0 | 1 | 2 | 3+ | over cap (>2) | her months below Tần | in a side hall (Đông/Tây phối điện) | Ngọc Thanh các | other |')
print('|---|---|---|---|---|---|---|---|---|---|---|')
for k,L in D.items():
  co=[sum(r['rs']['co'][j] for r in L) for j in range(4)];cn=sum(co) or 1
  side=sum(r['rs']['meSide'] for r in L);nt=sum(r['rs']['meNT'] for r in L);low=sum(r['rs']['meN'] for r in L) or 1
  print(f"| {k} | {sum(co)} | "+' | '.join(f'{c} ({round(100*c/cn)}/100)' for c in co)+f" | {sum(r['rs']['over'] for r in L)} | {low} | {side} ({round(100*side/low)}/100) | {nt} ({round(100*nt/low)}/100) | {low-side-nt} |")
print('\n### Perf (ms per buổi = nextBuoi wall time, both builds run at the same time, one browser each)\n')
print('| | buổi timed | ms per buổi (mean) | per-life mean: median [p25–p75] |')
print('|---|---|---|---|')
P={}
for k,L in D.items():
  bms=sum(r['rs']['bms'] for r in L);bn=sum(r['rs']['bn'] for r in L) or 1;pl=[r['rs']['bms']/r['rs']['bn'] for r in L if r['rs']['bn']>=20]
  P[k]=bms/bn
  print(f"| {k} | {bn} | {bms/bn:.1f} | {f1(round(med(pl),1)) if pl else '-'} [{f1(round(q(pl,.25),1)) if pl else '-'}–{f1(round(q(pl,.75),1)) if pl else '-'}] |")
if P.get('before'):print(f"\nafter vs before: {100*(P['after']/P['before']-1):+.1f} % (gate ≤ +5 %)")
