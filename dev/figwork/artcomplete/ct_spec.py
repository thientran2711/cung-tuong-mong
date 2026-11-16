# ct_spec.py: công tử congtu-1..10 older bands a36 + a51 (lineup of 2, edit from the same man's a18/a26 lineup) -> ct_jobs.json
import json,os,sys
W=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,W+"/../congtu")
PAL=["deep sapphire blue with silver-white","jade green with ivory","ivory white with sky blue","navy blue with gold","teal with pale grey",
 "emerald green with cream","slate grey-blue with white","warm brown with cream","midnight blue with jade","pale celadon green with white"]
KIND=["scholar","scholar","scholar","noble","noble","martial","scholar","noble","martial","scholar"]
REF=["lJ8IhuEgv9","s7o8mQil8e","iGqb1GE3uK","Do7J4IIpcl","jUXBtJpLD0","eIOyNaHdqL","vQZ2nKza47","Bh493QBoQR","SytmfZ9Ub8","CqGzcseEEy"]
DR={"scholar":"a richer layered silk robe of a high-ranking scholar-gentleman","noble":"a rich brocade robe of the head of a great house","martial":"a fitted dark brocade robe of a senior general's family with a broad belt, upright military bearing"}
P36=["hands clasped behind the back","holding a thin book","holding a rolled scroll","holding a tea cup","holding a jade pendant","one hand resting on a sheathed sword","holding a writing brush","holding a closed folding fan","holding a riding whip","holding a small go game box"]
P51=["holding a closed folding fan","holding a walking staff of dark wood","hands clasped in front","holding a string of prayer beads","holding a rolled scroll","holding a tea cup","holding an open book","holding a jade pendant","hands clasped behind the back","holding a bamboo flute"]
J={}
for i in range(10):
    k=KIND[i]
    J[f"cto{i+1:02d}"]={"ref":REF[i],"prompt":("Edit of the reference image: redraw the SAME man (exactly the same face, same features, same identity, same "
     f"{PAL[i]} colour family) at two OLDER ages. Semi-realistic painterly guofeng style, near-3D realistic rendering, soft natural light, exactly matching the rendering of the reference; "
     "plain light parchment background, soft even light; fair porcelain skin; serene gentle neutral expression, soft warm round-almond eyes (never slanted, never narrow), closed lips; "
     "very handsome refined looks at every age; no moles or marks on the face. A character lineup of TWO full-body standing figures, head to feet, side by side with wide clear empty space "
     "between them, all feet on one baseline. Left: the same man at about 43 years old, mature and distinguished, a neat short black beard and moustache, a few faint lines at the eyes, "
     f"{DR[k]} in the same colour family, hair in a topknot with a hair crown, {P36[i]}. Right: the same man at about 57 years old, an elegant elder, grey-streaked hair and a longer "
     f"grey-black beard, gentle wrinkles, still handsome and upright, {DR[k]} in deeper tones of the same colour family, {P51[i]}. Calm composed still standing poses, robes and sleeves "
     "hanging straight, no flying sashes. Wealthy. NOT pink, NOT purple. No text, no frames."),
     "figs":[{"file":f"fig-man-congtu-{i+1}-a{a}","role":"man","sub":"congtu","identity":f"congtu-{i+1}","ageBand":f"a{a}"} for a in (36,51)]}
json.dump(J,open(W+"/ct_jobs.json","w"),indent=1,ensure_ascii=False)
