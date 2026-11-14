# mk11.py tier [cids] -> prints "jid src | prompt" : a51 ageing (+ distinct t1-t3 huadian)
import json,sys
src=open('spec6.py').read(); ns={}
exec(src[src.index('HD={'):src.index('def hdesc')],ns); HD=ns['HD']
F=json.load(open('/home/user/cung-tuong-mong/.claude/worktrees/agent-a4a32ff575576735e/img/FIGURES.json'))
cur={r['sheet']:r['magnificUrl'].rstrip('/').split('/')[-1] for r in F if r.get('role')=='consort' and r.get('sheet')}
t=int(sys.argv[1]); cids=sys.argv[2:] or ['c%02d'%i for i in range(1,33)]
AGE=("Edit this image. Keep everything identical: the four figures, faces, outfits, headdresses, poses, props, colours, background, framing. "
     "Change only: (1) the RIGHTMOST woman must clearly look about 48 years old: the same face and identity, a dignified mature beauty, soft smile lines at the eyes, "
     "faint lines from nose to mouth, slightly fuller mature cheeks, her hair stays fully DARK black-brown like the others, NOT grey, NOT greying; still beautiful and serene.")
HU={1:"one tiny plain round {col} dot, about fingertip size, nothing else",
    2:"a small flat one-colour {col} silhouette of {mot}, no outline, a little larger than a dot",
    3:"{mot} painted in deep {col} with a fine darker outline and a pale contrasting centre, flanked by two tiny {col} dots; small"}
for c in cids:
    jid=f'N-{c}-t{t}'; mot,col=HD[c]
    p=AGE
    if t<=3: p+=" (2) ERASE the existing forehead mark on ALL FOUR women and paint instead, centred between the brows, painted flat on the skin: "+HU[t].format(mot=mot,col=col)+"."
    else: p+=" Keep every forehead mark exactly as it is."
    p+=" No moles. No text."
    print(jid,cur[jid],'|',p)
