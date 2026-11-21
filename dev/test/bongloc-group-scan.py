# review/bongloc-options (law 11): every MONTHLY / periodic card the game builds (title from the calendar: «… tháng …», econMonthName, WMON,
# S.month) — does it carry options, and is there a branch (a state: cấm túc / lãnh cung / low rank / nothing cut) that drops them silently?
# usage: python3 dev/test/bongloc-group-scan.py   → markdown table
import re,glob
rows=[]
for f in sorted(glob.glob('dev/build/j*.js')):
  t=open(f,encoding='utf-8').read()
  for m in re.finditer(r't:\s*(`[^`]*`|"[^"]*"|ttl)',t):
    title=m.group(1)
    near=t[max(0,m.start()-600):m.start()+200]
    if not (re.search(r'tháng \$\{|econMonthName|WMON\[',title) or (title=='ttl' and 'econMonthName' in near)):continue
    seg=t[m.start():m.start()+3500]
    opts=bool(re.search(r'opts\s*:|card\.opts\s*=',seg))
    gated=bool(re.search(r'if\s*\(d\|\|bt\)\s*\{.{0,700}?card\.opts\s*=',seg,re.S)) and not re.search(r'econNoOpt',seg)
    said='econNoOpt' in seg
    rows.append((f.split('/')[-1],title.strip('`"')[:70],'yes' if opts else 'no (notice only)','SILENT DROP' if gated else ('reason said' if said else '')))
print('| file | card title | options | state that drops them |\n|---|---|---|---|')
for r in rows:print('| %s | %s | %s | %s |'%r)
# the follow-up cut card: a separate «Bổng lộc bị cắt xén» card is moved by jspread to another buổi (its options leave the month frame)
for f in sorted(glob.glob('dev/build/j*.js')):
  t=open(f,encoding='utf-8').read()
  if re.search(r'if\(SK\)Q\.push\(stipEvent',t):print('| %s | Bổng lộc bị cắt xén (separate card, jspread slot 2 → another buổi) | yes, off the month frame | SPLIT FROM MONTH FRAME |'%f.split('/')[-1])
  if re.search(r'if\(SK&&!merged\)Q\.push\(stipEvent',t):print('| %s | Bổng lộc bị cắt xén | on the month frame (merged) | — |'%f.split('/')[-1])
