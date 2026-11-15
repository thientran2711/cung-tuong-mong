# python3 dprompt.py [N] : next N dialog-banner keys (dlg_scenes.txt order) not yet drawn/pending -> "KEY|styleRef|prompt"
import os,sys
H=os.path.dirname(os.path.abspath(__file__))
def ks(f):
    p=os.path.join(H,f);return {l.split()[0] for l in open(p) if l.strip()} if os.path.exists(p) else set()
done=ks('gens_dlg.txt')|ks('pending_dlg.txt')
n=int(sys.argv[1]) if len(sys.argv)>1 else 8
T=("Landscape 4:3 banner illustration for a Chinese imperial harem drama game dialog. Scene: {sc}. Composition: wide landscape, key action and all faces "
 "in the central horizontal band, nothing important at the top or bottom edges, figures at medium distance. Women in flowing Han/Ming cross-collar hanfu "
 "with wide sleeves and long loose skirts (NOT fitted, NOT qipao, no Qing collars); women greet only with the upright wanfu curtsy, never a forward waist bow. "
 "The Emperor, if present, wears imperial yellow with a small gold crown on his topknot, never a fur hat. Semi-realistic painterly guofeng court illustration, "
 "near-3D soft light, matching the reference style. Everyone beautiful or handsome at every age, fair rosy skin, serene faces (no sly look, glare, smirk, tears, "
 "open-mouth laugh), no moles. Hands anatomically correct with five fingers, no fused hands, no hands near faces or mouths. Small forehead flower mark only on "
 "consorts and the Empress, never on maids, eunuchs, court ladies, children or the Empress Dowager. Men never in pink or purple. No blood. No text, letters, "
 "Chinese characters, plaques, seals or signature anywhere.")
c=0
for l in open(os.path.join(H,'dlg_scenes.txt')):
    if not l.strip():continue
    k,sc,nt=l.strip().split('|')
    if k in done:continue
    t=T.format(sc=sc)
    if 'Emperor' not in sc: t=t.replace(sc,sc+'. NO Emperor, nobody in yellow').replace('The Emperor, if present, wears imperial yellow with a small gold crown on his topknot, never a fur hat. ','')
    print(k+'|'+('s7o88xTl8e' if nt=='1' else 'cplQijT0eP')+'|'+t);c+=1
    if c>=n:break
