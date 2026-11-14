import json
exec(open('spec2.py').read().split("J={}")[0])  # TAIL etc unused
PRE=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; serene gentle neutral expression, soft eyes, closed lips or faint smile; elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.")
LINE=" Age lineup: the SAME person drawn four times side by side in one row, evenly spaced with clear empty space between the figures, each complete from top of head to feet."
AGW=" Left to right: about 22, youthful adult; about 30, mature and poised; about 42, dignified and still beautiful, subtle fine lines at the eyes; about 55, graceful beautiful older lady, gentle lines, some silver in her hair."
END=" Eyes soft, warm and round-almond, never slanted or upturned, never teary. Everyone beautiful at every age. No text, no labels."
src=open('spec2.py').read()
ns={}; exec(src.split("for cid,tr,mt in CONS:\n    for t in range(1,9):")[0].replace("json.dump(CONS,open(\"consorts_ids.json\",\"w\"))",""),ns)
TIERS=ns['TIERS'];TCOL=ns['TCOL'];POSE=ns['POSE'];CONS=ns['CONS'];IDF={k:v.replace('slightly upturned phoenix eyes','warm round-almond eyes').replace('long narrow eyes','large soft eyes').replace('gentle downturned eyes','clear bright eyes') for k,v in ns['IDF'].items()};col=ns['col']
J=json.load(open('jobs.json'))
AG=["a18","a26","a36","a51"]
for cid,tr,mt in CONS:
    for t in range(1,9):
        first = t==1
        idp = "" if first else " Keep her exact face, features and the same four ages as in the identity reference lineup."
        J[f"N-{cid}-t{t}"]=dict(prompt=PRE+LINE+f" An imperial consort. Her face: {IDF[cid]}.{idp}"+AGW+f" Outfit for all four: {TIERS[t]}, {col(t,tr)}. Pose for all four: {POSE[tr]}."+END,
            ref=None if first else f"SHEET:N-{cid}-t1",
            figs=[dict(file=f"fig-consort-{cid}-t{t}-{a}",role="consort",identity=cid,tier=t,ageBand=a,look=tr) for a in AG])
LOOKF={"look1":"elegant oval face with defined cheekbones, almond eyes, straight dark brows, small straight nose, a tiny beauty mark under her left eye",
"look2":"heart-shaped face, round gentle eyes, softly arched brows, full rosy lips, a soft side-swept fringe on the right",
"look3":"slender long face, large soft almond eyes, high cheekbones, fine thin brows, hair parted in the centre",
"look4":"graceful softly rounded oval face, clear bright eyes, gentle straight brows, a light wispy fringe, a small red huadian mark between her brows"}
LCOL={"look1":"soft lavender","look2":"rose pink","look3":"pale celadon green","look4":"warm peach"}
for lk in LOOKF:
    for t in list(range(1,9))+["lc"]:
        out = "a worn faded plain grey-blue cotton robe patched at the hem, hair in a simple low bun tied with a cloth strip, no ornaments" if t=="lc" else TIERS[t]+(f", in her signature colour {LCOL[lk]}" if t<=6 else "")
        first = t==1
        idp = "" if first else " Keep her exact face, features and the same four ages as in the identity reference lineup."
        J[f"N-{lk}-t{t}"]=dict(prompt=PRE+LINE+f" The heroine, a palace lady. Her face: {LOOKF[lk]}.{idp}"+AGW+f" Outfit for all four: {out}. Pose for all four: graceful, hands lightly together at her waist."+END,
            ref=None if first else f"SHEET:N-{lk}-t1",
            figs=[dict(file=f"fig-player-{lk}-t{t}-{a}",role="player",identity=lk,tier=t,ageBand=a,look=lk) for a in AG])
ET=ns.get('ET') or {"trung":"respectful steady stance, a horsetail whisk in the crook of his arm","tham":"neutral standing pose, hands relaxed at his sides","nhat":"slightly reserved posture, hands clasped before him","lanh":"alert attentive posture, head up","chuyen":"neutral pose, hands tucked into his sleeves"}
TRS=["trung","tham","nhat","lanh","chuyen"]
ECOL=["dark steel blue","dark green","slate grey-blue","deep teal","brown","navy","olive","deep crimson","charcoal black","grey-green"]
MF=["oval face with fine features","refined slender face","gentle face with a defined jaw","soft handsome face with calm gentle eyes","long elegant face with fine brows","face with high cheekbones and a straight nose","youthful handsome face with gentle round eyes","noble face with thick straight brows","delicate face with warm almond eyes","handsome face with a slim pointed chin"]
for i in range(30):
    tr=TRS[i%5]
    J[f"N-eunuch-u{i+1:02d}"]=dict(prompt=PRE+LINE+f" A handsome, refined palace eunuch, beardless. His face: {MF[i%10]}{', a small mole on his cheek' if i>=20 else (', slightly wavy hair at the temples' if i>=10 else '')}. Left to right: about 22; about 31; about 43, faint lines, still handsome; about 57, distinguished, fine lines and greying hair, still handsome. All four: a {ECOL[(i*3)%10]} round-collar palace robe with a belt and a black gauze hat, black boots, {ET[tr]}."+" Eyes soft and warm, never slanted. Every man handsome at every age, no caricature. No text, no labels.",
        ref=None, figs=[dict(file=f"fig-eunuch-u{i+1:02d}-{a}",role="eunuch",identity=f"u{i+1:02d}",ageBand=a,look=tr) for a in AG])
json.dump(J,open('jobs.json','w'),indent=0)
print(len([k for k in J if k.startswith('N-')]))

EMPF="the most handsome man in the palace, a striking romantic-lead face: refined jawline, straight noble nose, clear bright warm eyes with a gentle gaze toward the viewer, flawless fair skin, tall with broad but elegant shoulders"
EAG=" Left to right: about 21, clean-shaven; about 30, a faint neatly trimmed thin moustache; about 40, neat moustache and short refined chin beard; about 52, neatly trimmed short full beard, faint lines, a few silver strands at the temples, still very handsome."
J["N-emperor-1"]=dict(prompt=PRE+LINE+" A Chinese emperor. His face: "+EMPF+"."+EAG+" All four: formal bright imperial yellow dragon robe finely embroidered with golden dragons, clouds and sea waves, jade and gold belt, small ornate gold crown, hands relaxed at his sides. Eyes soft and warm, never slanted. No text, no labels.",ref=None,figs=[dict(file=f"fig-emperor-{a}-1",role="emperor",identity="e1",ageBand=a) for a in AG])
J["N-emperor-2"]=dict(prompt=PRE+LINE+" A Chinese emperor, the same man as in the identity reference lineup (keep his exact face and ages)."+EAG+" All four: informal golden-yellow silk robe with round dragon medallions and dark red inner collar, ornate gold crown and pin, holding a closed folding fan, frontal view. Eyes soft and warm, never slanted. No text, no labels.",ref="SHEET:N-emperor-1",figs=[dict(file=f"fig-emperor-{a}-2",role="emperor",identity="e1",ageBand=a,variant=2) for a in AG])
json.dump(J,open('jobs.json','w'),indent=0)
