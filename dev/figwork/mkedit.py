# mkedit.py (art9) -> _edits9.json [jid, src gen (current published lineup), prompt]: huadian at the right tier + remove moles + dark hair
import json,re,sys
sys.argv=[sys.argv[0]]
src=open('spec6.py').read(); ns={}
exec(src[src.index('HD={'):src.index('def hdesc')],ns)
HD,HL,HS=ns['HD'],ns['HL'],ns['HS']
F=json.load(open('/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad/wt-art8/img/FIGURES.json'))
cur={r['sheet']:r['magnificUrl'].rstrip('/').split('/')[-1] for r in F if r.get('role')=='consort' and r.get('sheet')}
T4=['c02','c03','c05','c06']+['c%02d'%i for i in range(8,19)]+['c25','c30']
jobs=[(c,4) for c in T4]+[('c%02d'%i,7) for i in range(1,33)]+[('c%02d'%i,8) for i in range(1,33)]
out=[]
for c,t in jobs:
    mot,col=HD[c]; jid=f'N-{c}-t{t}'
    if t==8: mot=re.sub(r'^(a|an) ','',mot)
    hd=HL[t].format(mot=mot,col=col)+'; size: '+HS[t]
    p=("Edit this image. Keep everything exactly the same: the same four figures, same faces, same outfits, same headdresses, same poses, same props, same colours, same plain parchment background, same composition and framing. "
       "Change ONLY three things: (1) FOREHEAD: replace any existing forehead mark with the SAME small huadian on all four figures, centred between the brows, small and refined, painted on the skin like make-up (not a sticker): "+hd+"; never big, never touching the brows. "
       "(2) SKIN: remove every mole, beauty mark and small dark spot from all four faces, flawless clear skin. "
       "(3) HAIR: every woman's hair stays fully DARK black-brown, NO grey streaks or grey temples; the rightmost (oldest) lady at most two or three single fine silver hairs. No text, no labels.")
    out.append([jid,cur.get(jid),p])
json.dump(out,open('_edits9.json','w'),indent=0)
print(len(out), sum(1 for o in out if not o[1]))
for o in out[:1]+out[17:18]+out[49:50]: print(o[0],o[1]); print(o[2]); print()
