# python3 prompt.py KEY... : act-picture prompts in review/act-pics2's rprompt.py style (no visible faces; dark = gloomy mood, not night sky)
import os,sys
H=os.path.dirname(os.path.abspath(__file__))
DAY,NIGHT='If6wqwdtvE','fHA471qCDY'
S={l.split('|')[0]:l.rstrip('\n').split('|',2) for l in open(os.path.join(H,'scenes.txt')) if l.strip() and not l.startswith('#')}
HEAD="Portrait 3:4 game card illustration: {s}. One clear focal subject, softly blurred palace background, readable at thumbnail size. Gufeng watercolour court illustration like the reference: soft ink lines, delicate washes, "
BR="bright daylight, airy and light, warm vermilion, gold, jade and soft pink, gentle light."
DK="gloomy, shadowy, ominous brooding mood, may be daytime: murky overcast gloom or a shadowed interior, heavy deep shadows, ink-black, deep indigo and plum tones, one low muted glow, secretive and oppressive yet beautiful; no moon, no stars, no night sky."
TAIL=(" ABSOLUTELY NO visible face of anyone: show only hands, feet, a figure seen from behind, a figure cropped above the shoulders, or a shadow/silhouette. Wide Han/Ming sleeves and robes, no Qing collars or hats. "
 "Hands correct with five fingers. Imperial yellow only on the Emperor's sleeve when the scene names him; otherwise nobody in yellow. Men never in pink or purple. "
 "No blood, no skulls. No text, letters, Chinese characters, seals, border or signature; papers are blank.")
for k in (sys.argv[1:] or list(S)):
    _,d,s=S[k]; print(k+'|'+(NIGHT if d=='1' else DAY)+'|'+HEAD.format(s=s)+(DK if d=='1' else BR)+TAIL)
