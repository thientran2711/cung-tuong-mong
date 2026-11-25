import re,subprocess,sys,os
os.chdir('/home/user/wt/ng')
out=subprocess.run(['python3','dev/test/relshow-scan.py','--list'],capture_output=True,text=True).stdout
rows=[l.split(' ',3) for l in out.split('\n') if ' RAW ' in l and not l.startswith('|')]
flt=sys.argv[1] if len(sys.argv)>1 else ''
seen=set()
for fl,kind,_,txt in rows:
  if flt and not re.search(flt,fl):continue
  f,l=fl.split(':');L=open('dev/build/'+f,encoding='utf-8').read().split('\n')[int(l)-1]
  i=L.find(txt[:40]);key=(fl,i)
  if key in seen:continue
  seen.add(key)
  print(f'== {fl} {kind} «{txt}»\n   '+L[max(0,i-int(os.environ.get("B","220"))):i+int(os.environ.get("A","160"))])
