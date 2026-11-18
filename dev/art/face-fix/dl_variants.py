import subprocess,os
from concurrent.futures import ThreadPoolExecutor
B='https://ctm-img.victoria-tntt.workers.dev/img/'
jobs=[]
for c in ('c01','c16'):
  os.makedirs(f'/tmp/w51/all/{c}',exist_ok=True)
  for a in ('a18','a26','a36','a51'):
    for t in range(1,9):
      for pre in ('por-','fig-','hd/fig-'):
        k=f'{pre}consort-{c}-t{t}-{a}'
        jobs.append((k,f'/tmp/w51/all/{c}/'+k.replace('/','_')+'.webp'))
def g(j): subprocess.run(['curl','-s','-f','-o',j[1],B+j[0]+'.webp'])
with ThreadPoolExecutor(8) as ex: list(ex.map(g,jobs))
