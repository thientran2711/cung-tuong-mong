# spec.py: builds jobs.json (công tử các nhà quyền thần ct01–ct10: one lineup of 2 ages, a18 + a26) — Magnific gpt-2-6, 2:1, 4k, high
import json,os
W=os.path.dirname(os.path.abspath(__file__))
PRE=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering "
 "of the reference image; plain light parchment background, soft even light; fair porcelain skin; serene gentle neutral expression, soft warm "
 "round-almond eyes (never slanted, never narrow, never upturned), closed lips; very handsome refined looks; no moles or marks on the face; "
 "faces clearly visible, 3/4 or frontal view; rich clear colours and smooth soft near-3D shading, not a pencil sketch.")
PAL=["deep sapphire blue with silver-white","jade green with ivory","ivory white with sky blue","navy blue with gold","teal with pale grey",
 "emerald green with cream","slate grey-blue with white","warm brown with cream","midnight blue with jade","pale celadon green with white"]
FACE=["oval face with a straight nose","gentle long face with soft dark brows","slightly square jaw, clean-cut features","oval face with soft features",
 "refined narrow face with high cheekbones","soft round-oval face"]
KIND=["scholar","scholar","scholar","noble","noble","martial","scholar","noble","martial","scholar"]
ATT={"scholar":"an elegant layered silk scholar robe of a minister's son with embroidered borders, wide sleeves hanging straight, a jade belt with pendant, hair in a neat topknot with a small jade hair crown and hairpin",
     "noble":"a rich brocade robe of a great house's young lord with cloud embroidery and a gold-trimmed collar, a jade belt, hair in a topknot with a small silver hair crown",
     "martial":"a general's son in a fitted dark brocade robe with leather bracers and a broad belt, hair in a high topknot with a dark metal hair crown, upright military bearing"}
P18=["holding a closed folding fan","holding a thin book","holding a rolled scroll","holding a jade pendant on a cord","holding a bamboo flute",
     "holding a sheathed sword at his side","holding a writing brush","holding an open folding fan","holding a hunting bow at his side","holding a small go game box"]
P26=["hands clasped behind the back","holding an open book","holding a closed folding fan","holding a tea cup","holding a rolled scroll",
     "one hand on the hilt of a sheathed sword","holding a jade pendant","holding a folding fan at the chest","holding a riding whip","holding a bamboo flute"]
STY=["ksDAApm16B","vQZJy8Ja47","TdS5LurVNR","MBwklHsDCm"]  # men-pool lineups: vuonggia-1, hoasu-1, nhacsu-1, vuonggia-2
J={}
OLD={0,1}  # ct01, ct02 were drawn with "about 30 years old, the same man more mature"
for i in range(10):
    k=KIND[i]
    pr=(PRE+" A character lineup of TWO full-body standing figures, head to feet, side by side with wide clear empty space between them, both the SAME "
      f"young Chinese nobleman, the son of a high minister: the same face, same features ({FACE[i%len(FACE)]}) and the same signature colour family: {PAL[i]}. "
      f"All feet on one baseline. Left: about 20 years old, a handsome youthful young man, about seven and a half heads tall, {ATT[k]}, {P18[i]}. "
      f"Right: about 32 years old, the same man visibly more mature (fuller face, steadier adult bearing), calm and distinguished, {ATT[k]}, slightly richer fabric, {P26[i]}. "
      "Calm composed upright standing poses, still, no motion, robes and sleeves hanging straight, no flying sashes. Dignified, serene, wealthy. "
      "NOT pink, NOT purple. No text, no frames.")
    jid=f"ct{i+1:02d}"
    J[jid]={"prompt":pr,"style":STY[i%4],"figs":[{"file":f"fig-man-congtu-{i+1}-a{a}","role":"man","sub":"congtu","identity":f"congtu-{i+1}","ageBand":f"a{a}"} for a in (18,26)]}
json.dump(J,open(W+"/jobs.json","w"),indent=1,ensure_ascii=False)
