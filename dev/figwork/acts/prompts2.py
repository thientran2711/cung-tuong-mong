# python3 prompts2.py --todo [N]  -> next N keys still to draw (meanings.py order, new pictures only, not in gens2.txt)
# python3 prompts2.py KEY..        -> "KEY|styleRef|prompt" per key (gpt-2-6, 3:4, 1k; folder ba4aecfe)
# Coordinator 15/11: Emperor = small gold crown on topknot (never the Qing fur hat); Han-style cross-collar robes everywhere (no Qing
# high collars / qipao); face rules; huadian small, consorts only.
import sys,os,re
H=os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0,H)
from meanings import R
SC={}
for k,rx,sc in R:
    if sc and k not in SC and k!='-': SC[k]=sc
NIGHT='s7o88xTl8e'; DAY='P3EuuSz42C'
NRE=re.compile(r'đêm|khuya|trăng|tối|ngọn nến|giao thừa|dưới đèn|đèn lồng',re.I)
GLOSS0=("Glossary: phi tần = imperial consort; cung nữ = palace maid; thái giám = eunuch; Hoàng thượng = the Emperor; Hoàng hậu = the Empress; "
 "Thái hậu = the Empress Dowager (about 58, dignified, beautiful); ma ma = senior court lady; thái y = court physician; thị vệ = palace guard; "
 "phế phi / lãnh cung = deposed consort in the cold palace (plain undyed robes, no jewellery); tú nữ = candidate maidens; hoàng tử / công chúa = prince / princess; "
 "vạn phúc = women's standing greeting bow, hands clasped at the right side of the waist, knees slightly bent, never kneeling to greet.")
GL=[(t,e) for t,e in [x.split(' = ',1) for x in GLOSS0[len("Glossary: "):].rstrip('.').split('; ')]]
def gloss(sc):
    g=[f"{t} = {e}" for t,e in GL if any(w.strip().lower() in sc.lower() for w in t.split('/'))]
    return ("Glossary: "+"; ".join(g)+".") if g else ""
def P(k):
    sc=SC[k]; GLOSS=gloss(sc)
    return ("Portrait 3:4 game card illustration for a Chinese imperial harem drama, Han/Ming-style court costume: cross-collar hanfu robes with wide sleeves "
     "(no Qing high mandarin collars, no qipao cut, no fur hats). Scene (Vietnamese): «"+sc+"». "+GLOSS+
     " One clear story moment readable at thumbnail size. Semi-realistic painterly guofeng court illustration, near-3D realistic rendering with soft light and fine detail, "
     "matching the reference. If the Emperor appears: imperial yellow dragon robe and a small gold crown on his topknot. Everyone beautiful or handsome "
     "at every age, fair porcelain skin, serene gentle faces (no sly look, glare, smirk, tears or open-mouth laugh), soft round-almond eyes never slanted, no facial moles, "
     "clearly adult (children only where the scene says child); a small forehead flower mark only on consorts, never on maids, eunuchs, older ladies or cold-palace women; "
     "men never in pink or purple; everyone richly dressed except in the cold palace; calm natural poses, no flying sleeves or ribbons; no blood, no gore. "
     "No text, letters, Chinese characters, calligraphy, seals, signage, border or signature anywhere.")
def ref(k): return NIGHT if NRE.search(SC[k]) else DAY
def done():
    G=os.path.join(H,'gens2.txt'); return {l.split()[0] for l in open(G)} if os.path.exists(G) else set()
if sys.argv[1:2]==['--todo']:
    n=int(sys.argv[2]) if len(sys.argv)>2 else 8; d=done(); print(' '.join([k for k in SC if k not in d][:n]))
elif sys.argv[1:2]==['--count']:
    d=done(); print(len(SC),len([k for k in SC if k in d]))
else:
    for k in sys.argv[1:]: print(k+'|'+ref(k)+'|'+P(k))
