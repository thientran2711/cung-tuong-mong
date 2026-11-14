# status.py PROGRESS NEWHEAD : replace the head of the "TRẠNG THÁI C-B" line (up to "Công cụ C-B:") with NEWHEAD
import sys
p,new=sys.argv[1],sys.argv[2]; L=open(p,encoding='utf-8').read().split('\n')
for i,l in enumerate(L):
    if l.startswith('TRẠNG THÁI C-B'):
        k=l.find('Công cụ C-B:'); L[i]=new.rstrip()+' '+(l[k:] if k>=0 else '')
open(p,'w',encoding='utf-8').write('\n'.join(L))
