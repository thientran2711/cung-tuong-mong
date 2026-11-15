# python3 rmean.py KEY.. : Vietnamese meaning (meanings.R scene + regex) of each redraw key, for writing rscenes.txt
import sys,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import meanings
M={}
for k,rx,sc in meanings.R:
    b=k[:-2] if k.endswith('-h') else k
    M.setdefault(k,(rx,sc))
for k in sys.argv[1:]:
    rx,sc=M.get(k,M.get(k+'-h',('?','?')))
    print(k,'|',(sc or '')[:110],'|',rx[:70])
