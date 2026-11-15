# python3 rprompt.py KEY... : redraw prompts (audit 15/11, owner rule: NO visible face; hands/feet/back view/silhouette allowed;
# dark bg for scheming/negative acts, light for normal). Scenes in rscenes.txt "KEY|dark(0/1)|English scene".
# Prints "FKEY|styleRef|prompt"; FKEY is what hgo.sh/hfetch.py take (file img/act-FKEY-h.webp):
#   old key K (no -h)  -> FKEY K        -> new picture key K-h
#   old key B-h        -> FKEY B-r      -> new picture key B-r-h
import os,sys
H=os.path.dirname(os.path.abspath(__file__))
DAY,NIGHT='If6wqwdtvE','fHA471qCDY'
S={l.split('|')[0]:l.rstrip('\n').split('|',2) for l in open(os.path.join(H,'rscenes.txt')) if l.strip() and not l.startswith('#')}
HEAD="Portrait 3:4 game card illustration: {s}. One clear focal subject, softly blurred palace background, readable at thumbnail size. Gufeng watercolour court illustration like the reference: soft ink lines, delicate washes, "
BR="bright daylight, airy and light, warm vermilion, gold, jade and soft pink, gentle light."
DK="dark night or dim interior, deep indigo and plum shadows, low lantern or candle glow, ominous yet beautiful."
TAIL=(" ABSOLUTELY NO visible face of anyone: show only hands, feet, a figure seen from behind, a figure cropped above the shoulders, or a shadow/silhouette. Wide Han/Ming sleeves and robes, no Qing collars or hats. "
 "Hands correct with five fingers. Imperial yellow only on the Emperor's sleeve when the scene names him; otherwise nobody in yellow. Men never in pink or purple. "
 "No blood, no skulls. No text, letters, Chinese characters, seals, border or signature; papers are blank.")
fk=lambda k:k[:-2]+'-r' if k.endswith('-h') else k
for k in sys.argv[1:]:
    _,d,s=S[k]; print(fk(k)+'|'+(NIGHT if d=='1' else DAY)+'|'+HEAD.format(s=s)+(DK if d=='1' else BR)+TAIL)
