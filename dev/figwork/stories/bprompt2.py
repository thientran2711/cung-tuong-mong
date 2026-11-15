# python3 bprompt2.py arc:beat ... : compact single-picture story prompt from beat_scenes.txt -> "arc:beat|styleId|prompt"
import os,sys
H=os.path.dirname(os.path.abspath(__file__))
S={l.split('|')[0]:l.strip().split('|',2) for l in open(os.path.join(H,'beat_scenes.txt')) if l.strip()}
T=("Portrait 3:4 single story illustration for a Chinese imperial harem drama game, ONE single scene, not a grid, not split panels. Scene: {sc}. {emp}"
 "Women in flowing Han/Ming cross-collar hanfu, wide sleeves, long loose skirts (no qipao, no Qing collars, no Qing or fur hats); men in Ming-style robes. "
 "Semi-realistic painterly guofeng court illustration, near-3D soft light, matching the reference style. Everyone beautiful or handsome, fair rosy skin, serene faces (no glare, smirk, tears, open-mouth laugh), no moles. "
 "Correct hands with five fingers, no hands near faces. Forehead flower mark only on consorts and the Empress. Men never in pink or purple. No modern clothing, no blood. No text, letters, Chinese characters, plaques, seals or signature.")
for a in sys.argv[1:]:
    _,n,sc=S[a]; e='The Emperor wears imperial yellow with a small gold crown on his topknot, never a fur hat. ' if 'Emperor' in sc else 'NO Emperor, nobody in yellow. '
    print(a+'|'+('s7o88xTl8e' if n=='1' else 'cplQijT0eP')+'|'+T.format(sc=sc,emp=e))
