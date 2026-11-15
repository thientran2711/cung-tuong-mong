# Khue cac thuong phuc (tier 'kc', a18 only): prompt per identity. Usage: python3 mkprompt.py c05
import sys,json,re,os
J=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../figwork/jobs.json')))
PRE=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; serene gentle neutral expression, soft eyes, closed lips or faint smile; elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.")
# per identity: prop + embroidery motif (props vary across the 32)
EXTRA={'c05':('holding a small round silk fan painted with a single orchid in front of her waist with both hands','small sprays of orchids'),
 'c08':('holding a folded embroidered handkerchief lightly in one hand at her waist, the other hand resting over it','small cherry blossoms'),
 'c14':('holding a thin thread-bound book against her waist with both hands','small wisteria sprays'),
 'c29':('holding a short sprig of white plum blossom in one hand at chest height, the other hand relaxed at her side','small plum blossoms and ripples')}
EXTRA['m05']=('holding a small embroidered silk sachet pouch on a cord in both hands in front of her waist','small peonies')
MPAL={'m05':'coral red and gold'}  # maid signature colours (FIGURES-servants.json t1 a18 'palette')
_SV=os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../figwork/out/khuecac/servants.json')
if os.path.exists(_SV):
    for f in json.load(open(_SV)):
        if f.get('role')=='maid' and f.get('tier')=='t1' and f.get('ageBand')=='a18':MPAL.setdefault(f['identity'],f['palette'])
# rotation for every other face (owner: hands varied with props; calm, still)
PROPS=['holding a small round silk fan painted with a butterfly in front of her waist with both hands',
 'holding a closed folding fan in one hand at her waist, the other hand resting lightly on it',
 'holding a thin thread-bound book open against her waist with both hands',
 'holding a small embroidery hoop with unfinished embroidery in both hands at her waist',
 'holding a short branch of peach blossom in one hand at chest height, the other hand relaxed at her side',
 'holding a single lotus bud on a long stem in both hands in front of her',
 'holding a small rolled painting scroll tied with a ribbon in both hands at her waist',
 'holding a small celadon teacup on its saucer in both hands at chest height',
 'holding a bamboo flute horizontally in both hands at her waist',
 'holding a writing brush in one hand and a folded letter in the other at her waist',
 'holding a small woven basket of fresh flowers on her forearm',
 'holding a sprig of osmanthus in one hand near her shoulder, the other hand at her waist',
 'holding a small embroidered silk purse on a cord in one hand, the other hand resting at her waist',
 'holding a folded embroidered handkerchief in both hands at her waist',
 'holding a small round silk fan painted with lotus flowers lowered at her side with one hand',
 'holding a camellia flower in both hands in front of her chest',
 'holding a short willow branch in one hand at her side, the other hand at her waist',
 'holding a small lidded jade box in both hands at her waist',
 'holding a string of small jade beads (a tassel ornament) in one hand at her waist',
 'resting both hands lightly on a closed book held against her waist']
MOTIFS=['small butterflies and grasses','small peach blossoms','small orchids','small magnolias','small lotus flowers','small camellias',
 'small chrysanthemums','small plum blossoms','small osmanthus sprays','small peonies','small pear blossoms','small morning glories',
 'small daisies and vines','small cranes and clouds','small swallows and willows','small bamboo leaves','small begonias','small gardenias']
_ALL=['c%02d'%i for i in range(1,33)]+['m%02d'%i for i in range(1,53)]
for i,c in enumerate(_ALL):
    if c not in EXTRA:EXTRA[c]=(PROPS[(i*7)%len(PROPS)],MOTIFS[(i*5)%len(MOTIFS)])
def prompt(c):
    if c.startswith('m'):
        feat='as in the reference';col=MPAL[c]
    else:
        p=J['N-%s-t1'%c]['prompt']
        feat=re.search(r'Her own features: ([^.]*)\.',p).group(1)
        col=re.search(r'clean bright colours: ([^.]*)\.',p).group(1)
    prop,motif=EXTRA[c]
    return (PRE+" ONE single figure only. A young unmarried lady of a noble official's family at home (khue cac tieu thu), about 19 years old, fresh and youthful but clearly adult, a very beautiful woman: luminous porcelain skin, soft rosy blush, large soft bright eyes, delicate small nose, small rosy lips, gentle faint smile. "
     f"Keep EXACTLY the face, facial features and hair colour of the woman in the identity reference image, which shows her full figure and a close-up of her face (her own features: {feat}); she must be instantly recognisable as the same person; change ONLY her clothes, hairstyle and accessories. "
     "Her forehead is bare and clean: NO huadian, no forehead mark, no forehead flower, no dot between the brows; no moles, no beauty marks, clean even skin (if the reference face shows any dark spot, do not copy it). "
     f"Outfit (a simple elegant at-home dress of a well-to-do maiden, clearly simpler and lighter than any palace consort robe, never poor): a fitted cross-collar silk jacket with narrow, softly fitted sleeves ending at the wrists, over a high-waisted pleated silk skirt that falls straight to her feet, a short sleeveless embroidered silk vest, a narrow silk waist ribbon tied in a small neat bow that hangs straight down; fine delicate embroidery of {motif} on the collar band and hem; no wide ceremonial sleeves, no long stole, no layered court robe, little gold. Colours: {col} (her signature colours). "
     "Hair of an unmarried maiden: half-up style, two small neat loops on the crown tied with silk ribbons, the rest of her long black hair falling smoothly down her back; light jewellery only: one or two small pearl or jade hairpins and tiny pearl earrings; no crown, no tall phoenix ornaments, no bead veil, no heavy gold. "
     f"Pose: calm still standing pose, slightly turned at an angle, {prop}; sleeves, ribbons, skirt and hair hang still and straight, nothing flying or floating, no wind. "
     "Eyes soft, warm and round-almond, never narrow, slanted or upturned; face calm and kind, revealing no personality. Rendering as rich, luminous and detailed as the style reference portrait (near-3D, soft volumetric light on face and silk), not a pale sketch or a light watercolour wash. Plain light parchment background, the whole figure from top of head to feet inside the frame with margin around it.")
# tier 'ngheo' (owner 02:30Z): modest outfit of a poor scholar's / fallen family's daughter (origins thd, td) - neat and pretty, never ragged
NPROPS=['holding a small woven bamboo basket of herbs on her forearm','holding a piece of mending cloth with needle and thread in both hands at her waist',
 'holding a small bundle of books tied with a cloth strap in both hands','holding a wooden water ladle in one hand at her side, the other at her waist',
 'holding a small paper-covered lantern on a short stick, unlit, lowered at her side','holding a plain round bamboo fan lowered at her side',
 'holding a small clay teapot in both hands at her waist','holding a bundle of hemp thread skeins in both hands']
NEXTRA={'c05':NPROPS[0],'c08':NPROPS[1],'c29':NPROPS[2],'m05':NPROPS[3]}
for i,c in enumerate(_ALL):NEXTRA.setdefault(c,NPROPS[(i*3)%len(NPROPS)])
def prompt_ngheo(c):
    k=prompt(c);col=MPAL[c] if c.startswith('m') else re.search(r'clean bright colours: ([^.]*)\.',J['N-%s-t1'%c]['prompt']).group(1)
    a=k.index('A young unmarried lady');b=k.index('Keep EXACTLY');k=k[:a]+"A young unmarried woman of a modest family that has fallen on hard times (daughter of a poor village scholar), about 19 years old, fresh and youthful but clearly adult, a very beautiful woman: luminous porcelain skin, soft rosy blush, large soft bright eyes, delicate small nose, small rosy lips, gentle faint smile. "+k[b:]
    a=k.index('Outfit (');b=k.index('Pose: ')
    k=k[:a]+(f"Outfit (modest and plain but NEAT, clean, well-kept and pretty; NO patches, NO rags, NO dirt, NO tears, never pitiful): a simple cross-collar short jacket of plain cotton or linen with narrow sleeves ending at the wrists, over a plain long skirt of the same simple cloth, a plain cloth apron or a simple cloth sash tied neatly; no embroidery or only a thin plain border, no silk sheen, no vest, no brocade; soft muted, slightly faded tones of her own colours ({col}) mixed with undyed natural beige. "
     "Hair of an unmarried girl: simple and tidy, half-up with one small loop tied with a plain cloth ribbon, the rest of her long black hair falling smoothly down her back; at most ONE plain wooden or simple silver hairpin; no earrings or only tiny plain ones; no pearls, no jade, no gold, no flowers in her hair. ")+k[b:]
    k=k.replace(EXTRA[c][0],NEXTRA[c])
    k=k.replace('(near-3D, soft volumetric light on face and silk)','(near-3D, soft volumetric light on face and cloth)')
    return k
if __name__=='__main__':
    ng='--ngheo' in sys.argv
    for c in [a for a in sys.argv[1:] if not a.startswith('--')]: print(prompt_ngheo(c) if ng else prompt(c))
