import json
TAIL=("Plain light parchment background, nothing else, no text, no labels. Soft even light. Refined Chinese court illustration, gufeng watercolour style, soft ink lines, delicate washes, warm palette. "
 "Every figure: fair porcelain skin, slim and elegant, serene gentle neutral expression, soft calm eyes, lips closed, face clearly visible, clearly adult.")
ROW="drawn in one row as complete full-body standing figures, evenly spaced with clear empty space between them, each from top of head to feet with margin, three-quarter view."
J={}
def job(jid,prompt,figs,ref=None): J[jid]=dict(prompt=prompt+" "+TAIL,ref=ref,figs=figs)
TIERS={1:"a very plain simple silk robe with no embroidery and a plain narrow sash, hair in a simple low bun with a single plain wooden hairpin",
2:"a plain soft silk robe with a narrow plain border, neat bun with two simple silver hairpins",
3:"a patterned silk robe with small woven floral motifs, layered chignon with fresh flower hairpins and small silk flowers",
4:"a fine silk robe with delicate embroidered flowers on collar and sleeves, elegant chignon with a few small gold hairpins and a small gold comb",
5:"a rich brocade robe woven with gold-thread patterns and wide embroidered sleeves, high chignon with an ornate gold hairpiece and dangling gold tassels",
6:"a luxurious heavy brocade robe densely embroidered in gold with a pearl-trimmed collar and an outer cape, tall chignon crowned by a large gold floral headdress with pearl strands",
7:"a near-imperial apricot-yellow brocade robe embroidered with small phoenix motifs, gold collar plate and pearl strings, grand chignon with a gold headdress bearing small phoenixes",
8:"the empress's ceremonial robe in bright imperial yellow and crimson embroidered with large golden phoenixes and clouds, layered gold collar, jewelled phoenix crown with kingfisher-blue inlay and pearl strands"}
TCOL={"kieungao":"deep crimson and peacock blue","numi":"soft pastel pink and pale blue","hienlanh":"warm peach and cream","dangi":"rose and plum","thamvong":"red with gold accents","thanhnha":"cool celadon and ink blue"}
POSE={"kieungao":"standing tall with chin slightly raised, a round silk fan lowered at her side","numi":"hands folded demurely at her waist, gaze slightly lowered yet face visible",
"hienlanh":"gentle relaxed stance, holding a small embroidery hoop","dangi":"body half-turned gracefully, looking toward the viewer, a folding fan held close to her chest below the chin",
"thamvong":"standing upright and composed, holding a carved jade token","thanhnha":"neutral elegant stance, holding a thread-bound book"}
AGES4="Left to right: (1) about 22, youthful adult; (2) about 30, mature and poised; (3) about 42, dignified, subtle fine lines at the eyes; (4) about 55, graceful older lady with gentle lines and some silver in her hair."
def col(t,tr):
    if t<=2: return f"in muted simple {TCOL[tr]} tones"
    if t<=6: return f"in {TCOL[tr]}"
    return f"with {TCOL[tr]} only as small accents"
LOOKS=[("kieungao",6),("numi",6),("hienlanh",5),("dangi",5),("thamvong",5),("thanhnha",5)]
CONS=[]; n=1
for tr,k in LOOKS:
    for i in range(k): CONS.append((f"c{n:02d}",tr,i+1)); n+=1   # master tier = i+1
json.dump(CONS,open("consorts_ids.json","w"))
AG=["a18","a26","a36","a51"]
FS=["oval face","heart-shaped face","long slender face","softly round face","diamond face with high cheekbones","face with a petite pointed chin","gentle square-jawed face","wide soft cheeks"]
EY=["almond eyes","slightly upturned phoenix eyes","large round eyes","long narrow eyes","gentle downturned eyes","deep-set calm eyes"]
MK=["a tiny beauty mark under her left eye","a small beauty mark above the right corner of her lips","a small mole on her right cheekbone","thick straight brows","thin high-arched brows","a faint dimple in her left cheek","a small red huadian mark between her brows","softly rounded brows"]
IDF={}
for k,(cid,tr,mt) in enumerate(CONS): IDF[cid]=f"{FS[k%8]}, {EY[(k*5)%6]}, {MK[(k*3+(1 if k>=24 else 0))%8]}"
json.dump(IDF,open("consorts_feat.json","w"),indent=0)
for cid,tr,mt in CONS:
    for t in range(1,9):
        job(f"S-{cid}-t{t}",f"Age lineup of the SAME woman as in the reference image (keep her exact face and features: {IDF[cid]}), an imperial consort, drawn four times, {ROW} {AGES4} Outfit for all four: {TIERS[t]}, {col(t,tr)}. Pose for all four: {POSE[tr]}.",
            [dict(file=f"fig-consort-{cid}-t{t}-{a}",role="consort",identity=cid,tier=t,ageBand=a,look=tr) for a in AG], ref="MASTER:"+cid)
LCOL={"look1":"soft lavender","look2":"rose pink","look3":"pale celadon green","look4":"warm peach"}
for lk in LCOL:
    for t in list(range(1,9))+["lc"]:
        if t=="lc": out="a worn faded plain grey-blue cotton robe patched at the hem, hair in a simple low bun tied with a cloth strip, no ornaments"
        else: out=TIERS[t]+(f", in her signature colour {LCOL[lk]}" if t<=6 else "")
        job(f"S-{lk}-t{t}",f"Age lineup of the SAME woman as in the reference image (keep her exact face, features and marks), the heroine, a palace lady, drawn four times, {ROW} {AGES4} Outfit for all four: {out}. Pose for all four: graceful, hands lightly together at her waist.",
            [dict(file=f"fig-player-{lk}-t{t}-{a}",role="player",identity=lk,tier=t,ageBand=a,look=lk) for a in AG], ref="MASTER:"+lk)
# maids
MT={"trung":"steady upright stance holding a lacquer tray with a teapot","tham":"neutral standing pose, hands relaxed at her sides","nhat":"slightly shy posture, hands clasped before her","lanh":"alert attentive posture, head up","chuyen":"neutral pose, hands tucked into her sleeves"}
MCOL=["light green","peach","pale pink","pale blue","lilac","apricot","sky blue","jade green","soft rose","lavender","mint","cream and teal","coral","pale yellow","dusty blue","celadon"]
HAIR=["neat double buns with ribbons","a single low bun with a ribbon","double loops on top","a side bun with a small flower","a braided crown bun","two small buns low at the nape","a high bun with a ribbon","a low braided bun"]
FACE=["oval face","soft round face","heart-shaped face","slender face","delicate face with willow brows","face with phoenix eyes","face with large calm eyes","face with gently arched brows","face with a small beauty mark on the cheek","face with straight brows","face with soft almond eyes","face with a defined chin","face with high cheekbones"]
TRS=list(MT)
def mdesc(i,kind):
    tr=TRS[i%5]
    return tr, f"{FACE[(i*5)%len(FACE)]}, {HAIR[(i*3)%len(HAIR)]}, a simple {MCOL[(i*7)%len(MCOL)]} palace maid's robe and skirt with a plain sash, {MT[tr]}"
for p in range(26):
    a=2*p; b=2*p+1; ta,da=mdesc(a,0); tb,db=mdesc(b,0)
    job(f"S-maid-{p+1:02d}",f"Four palace maids {ROW} Figures 1 and 2 are the SAME woman A: (1) about 22, (2) about 30; A: {da}. Figures 3 and 4 are the SAME woman B, a different woman from A: (3) about 22, (4) about 30; B: {db}.",
        [dict(file=f"fig-maid-m{a+1:02d}-a18",role="maid",identity=f"m{a+1:02d}",ageBand="a18",look=ta),dict(file=f"fig-maid-m{a+1:02d}-a26",role="maid",identity=f"m{a+1:02d}",ageBand="a26",look=ta),
         dict(file=f"fig-maid-m{b+1:02d}-a18",role="maid",identity=f"m{b+1:02d}",ageBand="a18",look=tb),dict(file=f"fig-maid-m{b+1:02d}-a26",role="maid",identity=f"m{b+1:02d}",ageBand="a26",look=tb)])
MMC=["dark brown","deep olive green","indigo blue","muted plum","slate grey","dark teal","russet","charcoal blue"]
for p in range(4):
    a=2*p;b=2*p+1
    d=lambda i: f"{FACE[(i*3+1)%len(FACE)]}, a plain {MMC[i]} long robe with a simple dark sash, hair in a neat bun with one plain pin, hands folded at her waist"
    job(f"S-mama-{p+1}",f"Four senior palace matrons (mama), gentle and dignified, {ROW} Figures 1 and 2 are the SAME woman A: (1) about 45, (2) about 58 with greying hair and soft lines; A: {d(a)}. Figures 3 and 4 are the SAME woman B, a different woman: (3) about 45, (4) about 58 with greying hair and soft lines; B: {d(b)}.",
        [dict(file=f"fig-mama-mm{i+1}-{ag}",role="mama",identity=f"mm{i+1}",ageBand=ag) for i in (a,b) for ag in ("a36","a51")])
ET={"trung":"respectful steady stance, a horsetail whisk in the crook of his arm","tham":"neutral standing pose, hands relaxed at his sides","nhat":"slightly reserved posture, hands clasped before him","lanh":"alert attentive posture, head up","chuyen":"neutral pose, hands tucked into his sleeves"}
ECOL=["dark blue","dark green","slate grey-blue","deep teal","brown","navy","olive","dark plum","indigo","grey-green"]
MFACE=["oval face","square gentle face","slender face","round soft face","long face with fine brows","face with calm narrow eyes","face with a straight nose","face with soft features","face with high cheekbones","face with gentle round eyes","face with a defined jaw","face with thick brows"]
for i in range(30):
    tr=TRS[i%5]
    job(f"S-eunuch-u{i+1:02d}",f"Age lineup of the SAME dignified palace eunuch drawn four times, beardless, {ROW} Left to right: (1) about 22, (2) about 31, (3) about 43 with faint lines, (4) about 57 with fine lines and greying hair. All four: {MFACE[i%len(MFACE)]}, a {ECOL[(i*3)%len(ECOL)]} round-collar palace robe with a belt and a black gauze hat, black boots, {ET[tr]}. Dignified, not a caricature.",
        [dict(file=f"fig-eunuch-u{i+1:02d}-{a}",role="eunuch",identity=f"u{i+1:02d}",ageBand=a,look=tr) for a in AG])
OC=["crimson","deep blue","dark green","purple","red","dark teal"]
for p in range(3):
    a=2*p;b=2*p+1
    d=lambda i: f"{MFACE[(i*5)%len(MFACE)]}, a {OC[i]} official robe with an embroidered rank badge, black winged gauze hat, black boots, holding an ivory court tablet"
    job(f"S-official-{p+1}",f"Four imperial court officials {ROW} Figures 1 and 2 are the SAME man A: (1) about 42 with a short neat beard, (2) about 58 with a longer neat grey beard and fine lines; A: {d(a)}. Figures 3 and 4 are the SAME man B, a different man: (3) about 42 with a moustache, (4) about 58 with a grey beard and fine lines; B: {d(b)}.",
        [dict(file=f"fig-official-o{i+1}-{ag}",role="official",identity=f"o{i+1}",ageBand=ag) for i in (a,b) for ag in ("a36","a51")])
PC=["dark teal","indigo","grey-green"]
job("S-physician-1",f"Four imperial physicians {ROW} Figures 1 and 2 are the SAME man A: (1) about 30 clean-shaven, (2) about 58 with a neat greying beard; A: oval face, a plain {PC[0]} scholar's robe with a soft black cap, carrying a small wooden medicine box. Figures 3 and 4 are the SAME man B, a different man: (3) about 30 with a faint moustache, (4) about 58 with a grey beard; B: slender face, a plain {PC[1]} robe with a black cap, holding a rolled herbal scroll.",
    [dict(file=f"fig-physician-p{i}-{ag}",role="physician",identity=f"p{i}",ageBand=ag) for i in (1,2) for ag in ("a26","a51")])
MEN=[("thive","a palace guard in lacquered dark armour over a red robe, a sword at his hip"),("thive","a palace guard captain in steel lamellar armour with a dark blue robe, helmet under his arm"),
("thaiy","a young imperial physician in a pale blue scholar's robe and soft black cap, holding a small medicine box"),("vuonggia","a prince, the emperor's brother, in a white and silver brocade robe with a jade crown"),
("vuonggia","a prince in a deep purple brocade robe embroidered with a four-clawed python, a gold crown"),("nhacsu","a court musician in a soft white and pale blue robe, holding a bamboo flute"),
("hoasu","a court painter in a light beige scholar's robe, holding a brush and a rolled painting"),("suthan","a foreign envoy from a northern steppe kingdom in a fur-trimmed deep red robe and fur hat"),
("suthan","a foreign envoy from a western kingdom in a turquoise and gold embroidered caftan with a headwrap")]
for p in range(5):
    ids=[2*p,2*p+1] if 2*p+1<9 else [2*p]
    parts=[];figs=[]
    for k,i in enumerate(ids):
        L="AB"[k]; parts.append(f"Figures {2*k+1} and {2*k+2} are the SAME handsome man {L}{', a different man' if k else ''}: ({2*k+1}) about 23, ({2*k+2}) about 31; {L}: {MEN[i][1]}, {MFACE[(i*7)%len(MFACE)]}.")
        figs+= [dict(file=f"fig-romance-r{i+1}-{ag}",role="romance",identity=f"r{i+1}",ageBand=ag,look=MEN[i][0]) for ag in ("a18","a26")]
    job(f"S-men-{p+1}",f"{'Four' if len(ids)==2 else 'Two'} handsome men {ROW} "+" ".join(parts)+" Tall, slim, calm.",figs)
EMP=("the most handsome man in the palace, sharp refined jawline, clear bright eyes with a warm gentle gaze toward the viewer, flawless fair porcelain skin, tall with broad but elegant shoulders, serene composed expression, lips closed")
job("S-emperor-2",f"Age lineup of the SAME man as in the reference image, a handsome Chinese emperor (keep his exact face and features), drawn four times, {ROW} Same informal golden-yellow silk robe with round dragon medallions and dark red inner collar, ornate gold crown and pin, holding a closed folding fan, frontal view. Left to right: (1) about 21, clean-shaven; (2) about 30, a faint neatly trimmed thin moustache; (3) about 40, neat moustache and short refined chin beard; (4) about 52, neatly trimmed short full beard, faint lines, a few silver strands at the temples, still very handsome. All four: {EMP}.",
    [dict(file=f"fig-emperor-{a}-2",role="emperor",identity="e2",ageBand=a) for a in AG],ref="p8J10jsehw")
from collections import Counter
print(len(J), sum(len(j['figs']) for j in J.values()))
J['S-emperor-1']=dict(prompt='(lineup from a18 master MBwKW1vDCm, formal robe)',ref='MBwKW1vDCm',figs=[dict(file=f"fig-emperor-{a}-1",role="emperor",identity="e1",ageBand=a) for a in AG])
json.dump(J,open("jobs.json","w"),indent=0)

for k in ["S-emperor-1","S-emperor-2"]: J[k]["figs"][0]["file"]="_skip"
json.dump(J,open("jobs.json","w"),indent=0)
