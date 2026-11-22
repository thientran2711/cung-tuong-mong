import json,os,sys
R='/home/user/cung-tuong-mong/'
sys.path.insert(0,R+'dev/art/emo-anim/groups'); import th_prompts as T
A=json.load(open('/tmp/claude-0/actA.json'))
WHO=T.WHO
END=" Both eyes looking together. Everything kept INSIDE the round medallion, the medallion drawn a bit smaller and centred so there is empty space around it. Bare earlobes, no earrings. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text."
def head(col): return f"Same soft hand-painted storybook style, same round gold-rimmed medallion and same chibi proportions as the reference, but the person is now {WHO}. The medallion disc is now {col} instead of red."
LP=" just inside the gold rim"
# key: (old face sentence or None for new, new face sentence, light posture clause, [allow phrases], disc for new)
D={
"an":(None,"sly secretive face, a small secret closed-mouth smile, one eye softly winking, tucking a small folded letter into her wide sleeve with one hand, soft grey mist wisps drifting across the medallion","the other hand resting still at the bottom of the medallion"+LP+"; exactly two hands, no big gesture",[],"misty grey"),
"binh":(None,"serene calm face, eyes gently closed, a soft closed-mouth smile, holding a small pale celadon teacup in both hands at chest height, one thin wisp of tea steam","shoulders relaxed, head tilted a little; exactly two hands, no big gesture",[],"soft sage green"),
"dau":(None,"quiet heartache: brows tilted up in sorrow, eyes lowered and glistening, lips pressed together, mouth closed, exactly ONE single tear on one cheek, holding a small old jade pendant pressed to her chest with both hands","shoulders slightly sunk; no sobbing, no open mouth, no streams of tears, no flying drops, exactly two hands, no big gesture",[],"deep blue"),
"muu":(None,"scheming face, a sly side-glance (both eyes looking the same way), one brow raised, a knowing closed-mouth smirk, holding one small black go stone between two fingers near her chin","the other hand resting still at the bottom of the medallion"+LP+"; exactly two hands, no big gesture",[],"teal"),
"ghen":("sly sarcastic sneer, one eyebrow raised, side-glancing eyes, a round silk fan half covering her mouth","sly sarcastic sneer, one eyebrow raised, side-glancing eyes, a round silk fan half covering her mouth","the fan held in one hand, the other hand resting still at the bottom of the medallion"+LP+"; no pointing, no big gesture. The disc is deep jade-teal, NOT amber, NOT orange",[],None),
"buon":("crying face with eyes squeezed shut, tears running down, a white handkerchief at one eye","sad face, eyes lowered and glistening, one single tear on her cheek, a folded white handkerchief held lightly in one hand near her chest","shoulders slightly sunk, the other hand resting at the bottom of the medallion"+LP+"; mouth closed, no sobbing, no wiping tears, no big gesture",["crying face with eyes squeezed shut","tears running down","at one eye"],None),
"gian":("furious red face, gritted teeth, holding up a cracking porcelain teacup","cross face, knitted brows, lips pressed tight, both hands holding a small porcelain teacup with one thin crack at chest height","shoulders drawn up stiffly; no raised cup, no smashing, no flying shards, no big gesture",["furious red face","gritted teeth","holding up a cracking porcelain teacup"],None),
"khochiu":("irritated scolding face, mouth open, one finger pointing sharply to the side","irritated face, brows angled, mouth in a small tight frown, one finger pointing a little to the side at chest height","the other hand resting at the bottom of the medallion"+LP+"; mouth closed, no shouting, no outstretched arm, no big gesture",["irritated scolding face","mouth open","pointing sharply to the side"],None),
"so":("frightened wide eyes peeking over a purple flowered quilt pulled up to her nose","frightened wide eyes peeking over a purple flowered quilt held up to her chin with both hands","shoulders drawn in; no trembling arms, no big gesture",["pulled up to her nose"],None),
"hothen":("pale sickly face, folded white cloth on her forehead, hand at her temple, eyes half closed","pale sickly face, folded white cloth on her forehead, hand at her temple, eyes half closed","the other hand still at the bottom of the medallion"+LP+"; no wrist pressed dramatically to the forehead, no big gesture",[],None),
"lo":("exhausted face with dark rings under tired eyes, loose messy strands of hair","exhausted face with dark rings under tired eyes, loose messy strands of hair","both hands resting at the bottom of the medallion"+LP+"; no yawning, no eye rubbing, no big gesture",[],None),
"chan":("bored eye-rolling face, tossing a half-finished embroidery hoop over her shoulder","bored eye-rolling face, a half-finished embroidery hoop resting loosely in one hand","her cheek propped lightly on the other hand; no tossing, no flinging, no flying thread, no big gesture",["tossing a half-finished embroidery hoop over her shoulder"],None),
"choang":("blank stunned stare with no shine in the eyes, slightly open mouth, a small grey cloud above","blank stunned stare with no shine in the eyes, slightly open mouth, a small grey cloud above","both hands resting limp at the bottom of the medallion"+LP+"; no big gesture",[],None),
"hon":("cold 'hmph' face turned away, chin up, eyes closed, one hand raised palm out","cold 'hmph' face turned away, chin up, eyes closed, one hand raised palm out small at chest height","the other hand resting at the bottom of the medallion"+LP+"; no outstretched arm, no big gesture",[],None),
"vui":("big generous happy smile, holding out a gold ingot and a red coin pouch","warm happy smile, holding a small gold ingot and a little red coin pouch together in both hands at chest height","shoulders relaxed; not holding them out toward the viewer, no big gesture",["big generous happy smile","holding out a gold ingot and a red coin pouch"],None),
"tutin":("proud confident smile, chin up, holding up a painted scroll","proud confident smile, chin up, holding a small rolled painted scroll in both hands at chest height","shoulders back; no scroll held high, no big gesture",["holding up a painted scroll"],None),
"tinhtu":("sweet inviting smile, winking, one hand beckoning, a red-and-gold invitation card","sweet inviting smile, winking, one hand beckoning, a red-and-gold invitation card","the card held in the other hand at chest height; exactly two hands, small gentle beckon only, no big gesture",[],None),
"tinhnghich":("giggling mischievous face, hand over her mouth, eyes curved with laughter, a small paper toy snake","giggling mischievous face, hand over her mouth, eyes curved with laughter, a small paper toy snake","the toy snake held still in the other hand at chest height; exactly two hands, no dangling it toward the viewer, no big gesture",[],None),
"hanghai":("determined face with a sweat drop, sleeves rolled up, writing fast with a brush","determined face with a sweat drop, sleeves rolled up, writing with a brush on a small sheet of paper","the other hand holding the paper still; no speed lines, no flying sheets, no big gesture",["writing fast with a brush"],None),
"chuyentam":("deeply absorbed face, eyes fixed down on a book held close, a burnt-down candle and hourglass","deeply absorbed face, eyes fixed down on a book held close, a burnt-down candle and hourglass","both hands holding the book still; no big gesture",[],None),
"hungkhoi":("inspired glowing face, writing in the air with a calligraphy brush, flowing ink swirls","inspired glowing face, holding a calligraphy brush up near her shoulder, one small flowing ink swirl","the other hand resting at the bottom of the medallion"+LP+"; no sweeping arm, no big gesture",["writing in the air with a calligraphy brush","flowing ink swirls"],None),
}
ORDER=["an","binh","dau","muu","ghen","gian","buon","vui","so","lo","hothen","chan","choang","hon","khochiu","tutin","tinhtu","tinhnghich","hanghai","chuyentam","hungkhoi"]
P=R+'dev/handover/prompts_L2095/'; SB=R+'dev/art/emo-anim/groups/still_base/'
ma=json.load(open(P+'MA_HINH.json')); out={}
for i,k in enumerate(ORDER,1):
    code=f"M2342-{i:02d}"; old,new,lp,allow,col=D[k]
    if old is None:
        body=head(col)+f" Her face and pose: {new}. Light posture only: {lp}."+END
    else:
        base=A['act-'+k]['A']; assert old in base,k
        open(SB+f'th-act-{k}-A.txt','w').write(base+'\n')
        body=base.replace(f"{old}.",f"{new}. Light posture only: {lp}.")
        assert body!=base
    fn=f"{code}_th_act-{k}_A_still_TONEDOWN.txt"
    open(P+fn,'w').write(body+f'\n\nCAPTION: write ONLY this code, small, bold, in the top-left corner, outside the medallion, never over her: "{code}"\n')
    if old is not None:
        open(P+fn+'.keep','w').write(f"base: dev/art/emo-anim/groups/still_base/th-act-{k}-A.txt\n"+"".join(f"allow: {a}  # owner L2342 'Ok làm đi' (act tone-down: small gesture, calm face strength)\n" for a in allow))
    ma[code]=fn+" (ấn Thái hậu HĐ dịu, THACT1)"; out[k]=(code,fn,body)
json.dump(ma,open(P+'MA_HINH.json','w'),ensure_ascii=False,indent=1)
json.dump(out,open('/tmp/claude-0/thact/prompts.json','w'),ensure_ascii=False,indent=1)
print(len(out))
