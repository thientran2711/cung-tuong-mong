# python3 bprompt.py ARC... : prompt for a single story cover (portrait 3:4, one scene, people allowed) from bia_scenes.txt -> "ARC|styleId|prompt"
import os,sys
H=os.path.dirname(os.path.abspath(__file__))
S={l.split('|')[0]:l.strip().split('|',2) for l in open(os.path.join(H,'bia_scenes.txt')) if l.strip()}
T=("Portrait 3:4 single story cover illustration for a Chinese imperial harem drama game, ONE single scene, not a grid, not split panels. Scene: {sc}. "
 "Women in flowing Han/Ming cross-collar hanfu with wide sleeves and long loose skirts (NOT fitted, NOT qipao, no Qing collars, no Qing hats, no fur hats); men in Ming-style robes. "
 "The Emperor, if present, wears imperial yellow with a small gold crown on his topknot, never a fur hat. "
 "Semi-realistic painterly guofeng court illustration, near-3D soft light, matching the reference style. Everyone beautiful or handsome at every age, fair rosy skin, serene faces (no sly look, glare, smirk, tears, open-mouth laugh), no moles. "
 "Hands anatomically correct with five fingers, no hands near faces or mouths. Small forehead flower mark only on consorts and the Empress. Men never in pink or purple. No modern clothing. No blood. "
 "No text, letters, Chinese characters, plaques, seals or signature anywhere.")
for a in sys.argv[1:]:
    _,n,sc=S[a]; t=T.format(sc=sc)
    if 'Emperor' not in sc: t=t.replace(sc+'. ',sc+'. NO Emperor, nobody in yellow. ').replace('The Emperor, if present, wears imperial yellow with a small gold crown on his topknot, never a fur hat. ','')
    print(a+'|'+('s7o88xTl8e' if n=='1' else 'cplQijT0eP')+'|'+t)
