# python3 prompt.py KEY..   -> full prompt per key (act key or cat-<category>)
# python3 prompt.py --todo  -> remaining keys (not in gens.txt) in priority order
# Batch 1 used the long template T1 (bright); from batch 2 the shorter T2 / dark TD (owner 11/14: mưu kế, hại người = night palette).
import json,sys,os
H=os.path.dirname(os.path.abspath(__file__)); D=json.load(open(os.path.join(H,'acts_list.json')))
HEAD="Portrait 3:4 game card illustration: {s}. One clear centred focal subject, softly blurred palace background, readable at thumbnail size. Gufeng watercolour court illustration like the reference: soft ink lines, delicate washes, "
BR="warm vermilion, gold, jade and soft pink, gentle light, rich luxurious detail."
DK="night scene with deep indigo and plum shadows, low warm lantern or candle glow, muted jewel tones, ominous yet beautiful, rich luxurious detail."
TAIL=" Only hands, sleeves or figures from behind, no faces. No skulls. No text, letters, seals, border or signature."
DARKCAT={'muu-ke','hai-nguoi'}; DARKKEY={'pha-thai','tra-khao'}
def P(k):
    if k.startswith('cat-'): c=k[4:]; s=D['categories'][c]['scene']; dark=c in DARKCAT
    else:
        a=[x for x in D['acts'] if x['key']==k][0]; s=a['scene']; dark=a['cat'] in DARKCAT or k in DARKKEY
    return HEAD.format(s=s)+(DK if dark else BR)+TAIL
if sys.argv[1:]==['--todo']:
    done={l.split()[0] for l in open(os.path.join(H,'gens.txt')) if l.strip() and not l.startswith('#')}
    print(' '.join(a['key'] for a in sorted(D['acts'],key=lambda a:a['pri']) if a['key'] not in done))
else:
    for k in sys.argv[1:]: print(k,'||',P(k))
