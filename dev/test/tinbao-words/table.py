"""tinbao-words: before/after table from two bot.js outputs. usage: python3 table.py before.json after.json  (markdown to stdout)
NEWS = lines she reads in the Tin báo (notice / notice-item / tinbao-render / tinbao-card / force-*); LOG = Sổ ghi lines (reported, wider family)."""
import json,sys,collections
B,A=[json.load(open(f)) for f in sys.argv[1:3]]
def grp(d,news):
  c=collections.Counter();n=0;ex={}
  for x in d['lines']:
    isn=x['src']!='log'
    if isn!=news:continue
    n+=1
    for b in x['bad']:
      c[b]+=1;ex.setdefault(b,x['t'][:150])
  return n,c,ex
for news,title in [(True,'NEWS (Tin báo: notices, rendered rows, cards, forced family runs)'),(False,'LOG (Sổ ghi lines, same bot lives)')]:
  nb,cb,eb=grp(B,news);na,ca,ea=grp(A,news)
  print(f'\n### {title}\nlines collected: before {nb} · after {na}\n\n| pattern | before | after | example before | example after |\n|---|---|---|---|---|')
  for k in sorted(set(cb)|set(ca),key=lambda k:-cb.get(k,0)):
    print(f"| {k} | {cb.get(k,0)} | {ca.get(k,0)} | {eb.get(k,'').replace('|','/')} | {ea.get(k,'').replace('|','/')} |")
