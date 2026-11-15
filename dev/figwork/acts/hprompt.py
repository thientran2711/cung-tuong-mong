# python3 hprompt.py [N] : next N hands-only act scenes from hscenes.txt not yet in hgens.txt / hpending.txt -> "KEY|styleRef|prompt"
# owner 15/11 16:50Z: action pictures = as few people as possible (hands, a corner, objects), like the existing Hành sự pictures.
import os,sys
H=os.path.dirname(os.path.abspath(__file__))
def ks(f):
    p=os.path.join(H,f);return {l.split()[0] for l in open(p) if l.strip()} if os.path.exists(p) else set()
done=ks('hgens.txt')|ks('hpending.txt')
DAY,NIGHT='If6wqwdtvE','fHA471qCDY'   # act-dang-tra (day), act-cai-do (night): existing hands-only Hành sự pictures
HEAD="Portrait 3:4 game card illustration: {s}. One clear centred focal subject, softly blurred palace background, readable at thumbnail size. Gufeng watercolour court illustration like the reference: soft ink lines, delicate washes, "
BR="warm vermilion, gold, jade and soft pink, gentle light, rich luxurious detail."
DK="night scene with deep indigo and plum shadows, low warm lantern or candle glow, muted jewel tones, ominous yet beautiful, rich luxurious detail."
TAIL=(" Show as few people as possible: only hands, forearms and wide Han/Ming sleeves, or a corner of a robe hem; NO faces, no heads, no full figures. "
 "Hands graceful and anatomically correct with five fingers, no fused or extra fingers. Men's sleeves never pink or purple; imperial yellow appears ONLY when the scene names the Emperor's yellow sleeve; otherwise ladies' sleeves are pink, jade green, red, ivory or blue, never yellow or gold-yellow. "
 "No skulls, no blood. No text, letters, Chinese characters, seals, border or signature; papers and books are blank or show only abstract lines.")
n=int(sys.argv[1]) if len(sys.argv)>1 else 8
c=0
for l in open(os.path.join(H,'hscenes.txt')):
    if not l.strip() or l.startswith('#'):continue
    k,d,s=l.rstrip('\n').split('|',2)
    if k in done:continue
    print(k+'|'+(NIGHT if d=='1' else DAY)+'|'+HEAD.format(s=s)+(DK if d=='1' else BR)+TAIL);c+=1
    if c>=n:break
