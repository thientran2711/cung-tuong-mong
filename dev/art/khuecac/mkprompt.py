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
if __name__=='__main__':
    for c in sys.argv[1:]: print(prompt(c))
