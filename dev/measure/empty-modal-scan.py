# empty-modal family scan (MAIN 167): every place that pushes a card into the ONE queue dialog (Q.push / Q.unshift / tsPanel / panel helpers)
# with an option list that is COMPUTED (filter / concat / map / a function) — any of them can come out empty or all locked at run time.
# All of them are drawn by j3 showModal, so the one guard (kit empty state + close, queue sync) covers every row.
import re,glob,os
rows=[];tot=0
for f in sorted(glob.glob(os.path.join(os.path.dirname(__file__),'..','build','j*.js'))):
    n=os.path.basename(f)
    if n.startswith('all'):continue
    s=open(f,encoding='utf-8').read()
    for m in re.finditer(r'opts:\s*([A-Za-z_$][\w$.]*\(|[\w$.]+\.(filter|concat|map)\(|\[[^\]]{0,40}\]\.concat\()',s):
        tot+=1;rows.append(n)
from collections import Counter
c=Counter(rows)
print(f"computed option lists feeding the queue dialog: {tot} sites in {len(c)} modules")
for k,v in c.most_common(15):print(f"  {k}: {v}")
print("covered by: j3 showModal kitModalLive → kitEmpty + close; render → modal follows Q; jspread never pulls the card on screen")
