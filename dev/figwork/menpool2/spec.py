# spec.py: builds jobs.json, more "man" identities (coordinator 15/11): the princess suitors (j54 h54Face) and the Bắc Địch prince took faces
# from the same 11 men-pool identities as guards / physicians and fell back to initials when they ran out. 9 young noblemen (sub "quytu")
# + 1 Bắc Địch steppe prince (sub "bacdich"), each ONE lineup of the same man at the 4 age bands a18 a26 a36 a51. gpt-2-6, 2:1, 4k.
import json,os
W=os.path.dirname(os.path.abspath(__file__))
PRE=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering "
 "of the reference image; plain light parchment background, soft even light; fair porcelain skin; serene gentle neutral expression, soft warm "
 "round-almond eyes (never slanted, never narrow, never upturned), closed lips; very handsome refined looks; no moles or marks on the face; "
 "faces clearly visible, 3/4 or frontal view; rich clear colours and smooth soft near-3D shading, not a pencil sketch.")
ROW=("A character lineup of FOUR full-body standing figures in one row, head to feet with margin, evenly spaced with wide clear empty space between them, "
 "all the SAME man (same face, same features, same signature colours), all feet on one baseline. Left to right: (1) about 20, youthful, clean-shaven; "
 "(2) about 30, more mature, a faint neat moustache; (3) about 42, dignified, a neat moustache and short refined beard; (4) about 56, distinguished, "
 "a longer neat greying beard, some grey in the hair, gentle fine lines.")
TAIL=("Calm composed upright standing poses, still, robes and sleeves hanging straight, no flying sashes. Han/Ming cross-collar robes, no Qing hats or collars. "
 "Men never in pink or purple. No text, no frames.")
P=[("quytu","scholar","jade green with ivory","an elegant layered silk scholar robe with embroidered borders, a jade belt with pendant, a small jade hair crown","oval face with a straight nose","holding a closed folding fan"),
   ("quytu","noble","deep sapphire blue with silver-white","a rich brocade robe of a great house's young lord with cloud embroidery, a jade belt, a small silver hair crown","refined narrow face with high cheekbones","hands clasped behind the back"),
   ("quytu","martial","dark slate with bronze","a fitted dark brocade robe with leather bracers and a broad belt, a dark metal hair crown, upright military bearing","slightly square jaw, clean-cut features","one hand on a sheathed sword at his side"),
   ("quytu","scholar","ivory white with sky blue","a light layered scholar robe with a sky-blue sash and a jade pendant, a simple white jade hairpin","gentle long face with soft dark brows","holding a thin book"),
   ("quytu","noble","navy blue with gold","a navy brocade robe with gold-trimmed collar and a jade belt, a gold hair crown","soft round-oval face","holding a jade pendant on a cord"),
   ("quytu","merchant-noble","warm brown with cream","a fine brown silk robe with cream inner collar and a leather belt with a small purse, a wooden hairpin","oval face with soft features","holding an abacus-shaped jade token"),
   ("quytu","martial","emerald green with dark leather","a hunting robe in emerald brocade with leather bracers, a bow case on the back, a dark hair crown","strong straight brows, clean-cut jaw","holding a hunting bow at his side"),
   ("quytu","scholar","teal with pale grey","a teal scholar robe with pale grey layers and a black lacquer hair crown","slender face with a gentle smile line","holding a rolled scroll"),
   ("quytu","noble","midnight blue with jade","a midnight-blue robe with jade-green embroidered hems and a jade belt, a silver hair crown","refined oval face with calm eyes","holding a tea cup"),
   ("bacdich","steppe prince","deep crimson-brown with gold and dark fur","the son of the northern steppe khan: a fur-trimmed deep crimson-brown riding robe with gold embroidery, a broad belt with a curved dagger in its sheath, leather boots, hair braided with gold beads under a small fur-rimmed cap (not a Qing hat)","strong sun-kissed but fair handsome face, bold straight brows","one hand resting on his belt")]
STY="ksDAApm16B"   # men-pool lineup (vuonggia-1)
J={}
for i,(sub,kind,pal,att,face,pose) in enumerate(P):
    n=sum(1 for x in P[:i] if x[0]==sub)+1; ident=f"{sub}-{n}"
    pr=(PRE+" "+ROW+f" He is a {kind}, {face}, wearing {att}; signature colours {pal}; {pose}. The outfit stays the same in all four, slightly richer at older ages. "+TAIL)
    J[f"mp{i+1:02d}"]={"prompt":pr,"style":STY,"figs":[{"file":f"fig-man-{ident}-{a}","role":"man","sub":sub,"identity":ident,"ageBand":a} for a in ("a18","a26","a36","a51")]}
json.dump(J,open(W+"/jobs.json","w"),indent=1,ensure_ascii=False)
print(len(J),'jobs')
