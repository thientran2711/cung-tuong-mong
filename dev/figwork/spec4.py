import json
exec(open('spec3.py').read().split("J=json.load(open('jobs.json'))")[0])
AGW=" Left to right: about 22, youthful adult; about 30, mature and poised; about 42, dignified and still beautiful, only subtle fine lines at the eyes; about 55, graceful beautiful older lady, only soft faint lines, silver-streaked hair, still lovely."
J=json.load(open("jobs.json")); AG=["a18","a26","a36","a51"]
PAL={"kieungao":["rose red and gold","sapphire blue and silver","emerald green and cream","royal purple and lavender","peacock teal and gold","vermilion and ivory"],
"numi":["lavender and pale pink","cherry-blossom pink and pale green","powder blue and white","peach and cream","lilac and silver","mint green and white"],
"hienlanh":["apricot and cream","soft butter yellow and white","coral pink and ivory","sage green and cream","blush pink and pale gold"],
"dangi":["magenta rose and lilac","plum and pink","lotus pink and celadon","ruby and blush pink","orchid purple and pink"],
"thamvong":["crimson and gold","scarlet and ivory","deep cherry red and black-gold","burgundy and gold","cinnabar and cream"],
"thanhnha":["celadon and white","ink blue and pale grey","moonlight blue and white","pale jade and silver","ivory and soft grey-blue"]}
PROP={"kieungao":["a round silk fan painted with peonies, lowered at her side","a jewelled round fan with a gold handle, lowered at her side","a white feather fan, lowered at her side","a round gauze fan with a long red tassel, lowered at her side","a round fan painted with a phoenix, lowered at her side","a round fan with a jade handle, lowered at her side"],
"numi":["hands folded at her waist holding a silk handkerchief","hands folded at her waist holding a small embroidered sachet","hands folded at her waist holding a single small flower","hands folded at her waist, a jade bracelet on her wrist","hands folded at her waist holding a folded letter","hands folded at her waist holding a small string of pearls"],
"hienlanh":["holding a small embroidery hoop","holding a small basket of flowers","holding a sprig of plum blossom","holding a pink lotus flower","holding a spool of silk thread and a needle case"],
"dangi":["a sandalwood folding fan held open near her chest below the chin","a painted silk folding fan held near her chest below the chin","a lace-like gauze folding fan held near her chest below the chin","an ivory folding fan held near her chest below the chin","a folding fan painted with butterflies held near her chest below the chin"],
"thamvong":["holding a carved jade token","holding a small jade ruyi sceptre","holding a small lacquered seal box","holding a jade pendant on a red cord","holding a gold hairpin box"],
"thanhnha":["holding a thread-bound book","cradling a small guqin","holding a rolled scroll","holding a jade flute","holding a brush and a sheet of paper"]}
MOT=["peonies","plum blossoms","lotus flowers","orchids","chrysanthemums","butterflies","cranes","auspicious clouds","bamboo leaves","magnolias","begonias","pomegranates","camellias","wisteria","swallows","osmanthus"]
FLW=["a pink peony","a white jasmine sprig","a red camellia","a small lotus","a plum blossom","an orchid","a pale magnolia","a begonia"]
TIERX={1:"a fine silk robe with delicate embroidered {mot} at the collar, sleeves and hem and a soft silk sash (elegant, never poor, little gold), hair in a neat bun with pretty silver hairpins and a fresh flower ({flw})",
2:"a fine silk robe with embroidered borders and a small woven {mot} pattern (elegant, a little more ornate than the lowest rank, little gold), neat chignon with silver and pearl hairpins and a fresh flower ({flw})",
3:"a patterned silk robe with small woven {mot}, layered chignon with fresh flower hairpins and small silk flowers",
4:"a fine silk robe with delicate embroidered {mot} on collar and sleeves, elegant chignon with a few small gold hairpins and a small gold comb",
5:"a rich brocade robe woven with gold-thread {mot} and wide embroidered sleeves, high chignon with an ornate gold hairpiece and dangling gold tassels",
6:"a luxurious heavy brocade robe densely embroidered in gold with {mot}, pearl-trimmed collar and an outer cape, tall chignon crowned by a large gold floral headdress with pearl strands",
7:"a near-imperial apricot-yellow brocade robe embroidered with small phoenixes and {mot}, gold collar plate and pearl strings, grand chignon with a gold headdress bearing small phoenixes",
8:"the empress's ceremonial robe in bright imperial yellow and crimson embroidered with large golden phoenixes and clouds, layered gold collar, jewelled phoenix crown with kingfisher-blue inlay and pearl strands"}
BEAU="a very beautiful woman: luminous porcelain skin, soft rosy blush, large soft bright eyes, delicate small nose, small rosy lips, gentle faint smile"
cnt={}
for k,(cid,tr,mt) in enumerate(CONS):
    i=cnt.get(tr,0); cnt[tr]=i+1
    pal=PAL[tr][i]; prop=PROP[tr][i]; mot=MOT[k%16]; flw=FLW[k%8]
    for t in range(1,9):
        out=TIERX[t].format(mot=mot,flw=flw)
        colr = f", clean bright colours: {pal}" if t<=6 else f", with {pal} only as small accents"
        first=t==1
        idp="" if first else " Keep her exact face, features, hairstyle colour and the same four ages as in the identity reference lineup."
        J[f"N-{cid}-t{t}"]=dict(prompt=PRE+LINE+f" An imperial consort, {BEAU}. Her own features: {IDF[cid]}.{idp}"+AGW+f" Outfit for all four: {out}{colr}. Pose for all four: facing the viewer in gentle three-quarter view, {prop}."+END,
            ref=None if first else f"SHEET:N-{cid}-t1", style=["8aNsy0CIrU","3zbtQNvREY","YMLuxraWeC","4RuXEXL9Aa"][k%4],
            figs=[dict(file=f"fig-consort-{cid}-t{t}-{a}",role="consort",identity=cid,tier=t,ageBand=a,look=tr,palette=pal) for a in AG])
json.dump(J,open('jobs.json','w'),indent=0)
print(J['N-c01-t1']['prompt']); print(); print(J['N-c02-t1']['prompt'][-700:])
# players
LOOKF={"look1":"elegant oval face with defined cheekbones, almond eyes, straight dark brows, small straight nose, a tiny beauty mark under her left eye",
"look2":"heart-shaped face, round gentle eyes, softly arched brows, full rosy lips, a soft side-swept fringe on the right",
"look3":"slender long face, large soft almond eyes, high cheekbones, fine thin brows, hair parted in the centre",
"look4":"graceful softly rounded oval face, clear bright eyes, gentle straight brows, a light wispy fringe, a small red huadian mark between her brows"}
LCOL={"look1":"soft lavender","look2":"rose pink","look3":"pale celadon green","look4":"warm peach"}
LMOT={"look1":"orchids","look2":"peonies","look3":"lotus flowers","look4":"plum blossoms"}
LFLW={"look1":"a small orchid","look2":"a pink peony","look3":"a white lotus bud","look4":"a plum blossom"}
for lk in LOOKF:
    for t in list(range(1,9))+["lc"]:
        if t=="lc": out="a faded simple grey-blue cotton robe, clean and neat, hair in a simple low bun tied with a cloth strip, no ornaments (the cold palace), still beautiful"
        else:
            out=TIERX[t].format(mot=LMOT[lk],flw=LFLW[lk])+(f", in her signature colour {LCOL[lk]}" if t<=6 else "")
        first=t==1
        idp="" if first else " Keep her exact face, features and the same four ages as in the identity reference lineup."
        J[f"N-{lk}-t{t}"]=dict(prompt=PRE+LINE+f" The heroine, a palace lady, {BEAU}. Her own features: {LOOKF[lk]}.{idp}"+AGW+f" Outfit for all four: {out}. Pose for all four: facing the viewer, graceful, hands lightly together at her waist."+END,
            ref=None if first else f"SHEET:N-{lk}-t1", style="8aNsy0CIrU",
            figs=[dict(file=f"fig-player-{lk}-t{t}-{a}",role="player",identity=lk,tier=t,ageBand=a,look=lk) for a in AG])
for k,j in J.items():
    if k.startswith("N-eunuch-"):
        j["prompt"]=j["prompt"].replace(" round-collar palace robe"," round-collar palace robe finely embroidered with subtle patterns (fine, never poor), masculine colour, never purple, violet, lavender or pink")
        j["style"]=["8aNsy0CIrU","3zbtQNvREY","YMLuxraWeC","4RuXEXL9Aa"][int(k[-2:])%4]
json.dump(J,open('jobs.json','w'),indent=0)
