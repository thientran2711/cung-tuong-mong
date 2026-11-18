# python3 prompt.py KEY..  -> prompt per event art key (cat or cat-N); --keys lists all keys
import sys,os; sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))); import ev_data as D
HEAD="Portrait 3:4 game card illustration of a palace event: {s}. One clear focal subject, readable at thumbnail size. Gufeng watercolour court illustration like the reference: soft ink lines, delicate washes, "
BR="warm vermilion, gold, jade and soft pink, gentle light, rich luxurious detail."
DK="deep night, low-key lighting: over 70% of the frame in deep indigo-black and plum shadow, the only light is one candle, a dim lantern or moonlight, muted jewel tones, ominous yet beautiful, rich luxurious detail."
TAIL=" People only tiny in the distance, as silhouettes, or seen from behind; no visible faces, no hands in close-up. No skulls, no blood, no gore. No text, letters, characters, seals, border or signature."
def P(k):
    c,s=D.scene(k); return HEAD.format(s=s)+(DK if c['dark'] else BR)+TAIL
def dark(k): return D.scene(k)[0]['dark']
if __name__=='__main__':
    if sys.argv[1:]==['--keys']: print(' '.join(D.keys()))
    else:
        for k in sys.argv[1:]: print(k,'|',('DARK' if dark(k) else 'BRIGHT'),'|',P(k))
