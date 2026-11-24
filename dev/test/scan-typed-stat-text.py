# scan: player-visible text that TYPES a stat change number (law 4); prints file:line, the match, and whether the line also has ${...}
import re,glob,sys
STAT=r"(Danh|Sủng|Bạc|bạc|Đức|Tài|Sắc|Ghen|Sức|Thiện cảm|Uy|Trí|Mưu|Thanh danh|Oán|Tín)"
rx=re.compile(STAT+r"\s*([+\-−]\s?\d+)")
rows=[]
for f in sorted(glob.glob('dev/build/j*.js')):
  if f.endswith('all.js'):continue
  for i,l in enumerate(open(f,encoding='utf-8'),1):
    code=re.sub(r"/\*.*?\*/","",l)
    if code.lstrip().startswith('//'):continue
    for m in rx.finditer(code):
      # inside a string/template literal? crude: count quotes/backticks before
      pre=code[:m.start()]
      if pre.count('`')%2==0 and pre.count('"')%2==0 and pre.count("'")%2==0:continue
      rows.append((f,i,m.group(0)))
for r in rows:print(f"{r[0]}:{r[1]}\t{r[2]}")
print("TOTAL",len(rows),file=sys.stderr)
