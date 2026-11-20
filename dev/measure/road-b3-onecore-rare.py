import re,glob,json
out=[]
for f in sorted(glob.glob('dev/build/rdfrag/[tc]*.js')):
  t=open(f,encoding='utf-8').read()
  a=t.index('RD97L.push({');b=t.index('});',a)+3;blk=t[a:b]
  rid=re.search(r'a:"(\w+)"',blk).group(1);R={}
  for k,pat in [('p',r'(?<=[,{\s])p:(\.?\d+(?:\.\d+)?),'),('np',r'(?<=[,{\s])np:(\d+),'),('sc',r'(?<=[,{\s])sc:(\d+),'),('c',r'(?<=[,{\s])c:(\{[^{}]*\}),'),('fx',r'(?<=[,{\s])fx:(\{[^{}]*\}),')]:
    ms=list(re.finditer(pat,blk));assert len(ms)==1,(f,k,len(ms));R[k]=ms[0].group(1);blk=blk[:ms[0].start()]+blk[ms[0].end():]
  rr='RR("%s")'%rid
  m=re.search(r'x:\[\(\)=>S\.(\w+)>=(\d+),"([^"]*) từ (\d+)"\]',blk)
  if m:assert m.group(2)==m.group(4);R['bar']=m.group(2);note='x: %s ≥ bar'%m.group(1);blk=blk.replace(m.group(0),'x:[()=>S.%s>=%s.bar,"%s từ "+%s.bar]'%(m.group(1),rr,m.group(3),rr))
  elif 'S.duc>=35||S.mat>=2' in blk:R['bar']='35';R['bar2']='2';note='x: duc ≥ bar or mat ≥ bar2';blk=blk.replace('x:[()=>S.duc>=35||S.mat>=2,"Đức từ 35 hoặc Tai mắt từ 2"]','x:[()=>S.duc>=%s.bar||S.mat>=%s.bar2,"Đức từ "+%s.bar+" hoặc Tai mắt từ "+%s.bar2]'%(rr,rr,rr,rr))
  elif 'S.duc>=35&&LMMBOX()' in blk:R['bar']='35';note='x: duc ≥ bar and the wooden box';blk=blk.replace('x:[()=>S.duc>=35&&LMMBOX(),"Đức từ 35, chiếc hộp gỗ còn nguyên"]','x:[()=>S.duc>=%s.bar&&LMMBOX(),"Đức từ "+%s.bar+", chiếc hộp gỗ còn nguyên"]'%(rr,rr))
  elif '(m.rel||0)>=20' in blk:R['bar']='20';note='x: old mistress rel ≥ bar';blk=blk.replace('(m.rel||0)>=20)},"Chủ cũ thương ngươi (quan hệ từ 20)"]','(m.rel||0)>=%s.bar)},"Chủ cũ thương ngươi (quan hệ từ "+%s.bar+")"]'%(rr,rr))
  else: raise Exception(f)
  blk='RD97L.push(rdRare('+blk[len('RD97L.push('):-2]+'));'
  t=t[:a]+blk+t[b:];open(f,'w',encoding='utf-8').write(t)
  out.append(' %s:{%s}, /* %s */'%(rid,','.join(k+':'+R[k] for k in ['p','np','sc','c','fx','bar','bar2'] if k in R),note))
print('\n'.join(out))
