# Rewrite the batch section of gens.txt from the working ledger (WORKDIR/ledger.txt: "tier:face gen idref style bg [note]").
# The last row of each tier:face is 'final' (if its bg is set and its fig exists); earlier rows become 'superseded'.
# Usage: python3 ledger2gens.py WORKDIR
import sys,os
W=sys.argv[1];H=os.path.dirname(os.path.abspath(__file__));G=os.path.join(H,'gens.txt')
rows=[l.split() for l in open(os.path.join(W,'ledger.txt')) if l.strip() and not l.startswith('#')]
last={}
for i,r in enumerate(rows):last[r[0]]=i
out=[]
for i,r in enumerate(rows):
    key,gen,idr,sty,bg=r[:5];note=' '.join(r[5:])
    T,c=key.split(':');role='maid' if c.startswith('m') else 'consort'
    fig=os.path.join(W,'img',f'fig-{role}-{c}-{T}-a18.webp')
    st='final' if (last[key]==i and bg!='-' and os.path.exists(fig)) else ('superseded' if last[key]!=i else 'pending')
    k=c if T=='kc' else key
    out.append(f'{k} {gen} {idr} {sty} {bg} {st}'+(f'  # {note}' if note else ''))
txt=open(G).read();M='# --- KHUÊ CÁC batch'
head=txt[:txt.index(M)] if M in txt else txt
body=(M+" + NGHÈO batch (79/80 faces; idref uploaded from CDN img/_kcwork/idref-<face>.jpg; every cut passed retouch.py "
      "(forehead/cheek dots), large-crop face check by eye; harden.py on cutcheck fails) ---\n")+'\n'.join(out)+'\n'
open(G,'w').write(head+body);print(sum(1 for o in out if o.split()[5]=='final'),'final of',len(out))
