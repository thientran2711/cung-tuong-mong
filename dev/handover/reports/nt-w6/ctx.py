import sys,re
# usage: ctx.py file:line[:needle] ... -> print a window around needle(s) on that line
for a in sys.argv[1:]:
  f,l=a.split(':')[:2];needle=a.split(':',2)[2] if a.count(':')>=2 else None
  L=open('dev/build/'+f,encoding='utf-8').read().split('\n')[int(l)-1]
  print(f'== {f}:{l} ({len(L)}ch)')
  if len(L)<700 or not needle:print(L[:1500]);continue
  for m in re.finditer(re.escape(needle),L):print('  ..',L[max(0,m.start()-350):m.end()+250])
