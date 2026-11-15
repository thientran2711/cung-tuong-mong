# mk10.py (art10) -> _edits10.json [jid, src gen (current lineup in the worktree FIGURES.json), prompt]
# huadian at the right tier + remove moles + keep hair dark; per-lineup fix note
import json,re
src=open('spec6.py').read(); ns={}
exec(src[src.index('HD={'):src.index('def hdesc')],ns)
HD,HL,HS=ns['HD'],ns['HL'],ns['HS']
F=json.load(open('/home/user/cung-tuong-mong/.claude/worktrees/agent-a4a32ff575576735e/img/FIGURES.json'))
cur={r['sheet']:r['magnificUrl'].rstrip('/').split('/')[-1] for r in F if r.get('role')=='consort' and r.get('sheet')}
FAINT="The current marks are too faint or missing on some figures: make the mark clearly visible on EVERY one of the four figures (also on a figure looking down or with closed eyes). "
BIG="The current marks are TOO BIG: make them clearly SMALLER and more delicate, compact, sitting neatly between the brows, well clear of the brows and hairline. "
T8="The current Empress mark is wrong (too big, round, dark or not a phoenix): replace it completely. "
JOBS={
 'c01-t4':FAINT,'c01-t5':"The current mark is plain pink with no gold: it must clearly show the thin gold-leaf cut shape. ",
 'c03-t5':"The current mark is the wrong shape: it must be the plum blossom described below. ",
 'c04-t4':FAINT,'c04-t6':"The current mark is a raised violet gem drop: replace it with the flat painted mark below, no gem. ",
 'c05-t5':"The current crescent looks dark grey/black: it must be bright gold leaf with rose-red paint, never dark. ",
 'c06-t8':T8,'c09-t5':FAINT,'c09-t8':T8,'c10-t4':BIG,'c10-t5':BIG,'c11-t8':T8+FAINT,'c12-t8':T8,'c14-t8':T8+BIG,
 'c16-t1':FAINT,'c17-t3':"The current mark is a flower, the wrong shape: it must be the red-bean heart described below. ",
 'c19-t8':T8,'c20-t1':FAINT,'c20-t8':T8,'c21-t5':BIG,'c21-t8':T8,'c23-t8':T8,'c24-t5':BIG,'c24-t8':T8+BIG,
 'c25-t1':FAINT,'c25-t8':T8,'c26-t8':T8,'c27-t5':FAINT,'c28-t1':FAINT,'c29-t5':BIG,'c29-t8':T8+BIG,'c30-t5':BIG,'c32-t8':T8,
}
out=[]
for k,note in JOBS.items():
    c,t=k.split('-t'); t=int(t); mot,col=HD[c]; jid=f'N-{c}-t{t}'
    if t==8: mot=re.sub(r'^(a|an) ','',mot)
    hd=HL[t].format(mot=mot,col=col)+'; size: '+HS[t]
    p=("Edit this image. Keep everything exactly the same: the same four figures, same faces, same outfits, same headdresses, same poses, same props, same colours, same plain parchment background, same composition and framing. "
       "Change ONLY three things: (1) FOREHEAD: "+note+"Replace any existing forehead mark with the SAME small huadian on all four figures, centred between the brows, small and refined, painted on the skin like make-up (not a sticker): "+hd+"; never big, never touching the brows. "
       "(2) SKIN: remove every mole, beauty mark and small dark spot from all four faces, flawless clear skin. "
       "(3) HAIR: every woman's hair stays fully DARK black-brown, NO grey streaks or grey temples; the rightmost (oldest) lady at most two or three single fine silver hairs. No text, no labels.")
    out.append([jid,cur.get(jid),p])
json.dump(out,open('_edits10.json','w'),indent=0)
print(len(out),'missing src:',[o[0] for o in out if not o[1]])
print(out[0][2]); print(); print(out[6][2])
