#!/usr/bin/env python3
"""D14 (owner Lượt 651/652): remove every colour/emphasis description of the FACE (cheeks, lips, eyes, lids) from the face texts in
dev/art/face-common — keep the SHAPE words and base skin tone (fair porcelain skin). Outfit colour names (e.g. 'blush pink' cloth) are NOT face
words and stay. Only the listed phrases are cut; everything else stays verbatim. Run from anywhere: python3 dev/art/face-common/d14_clean.py
Prints counts of face-colour hits before/after."""
import os,re,glob
D=os.path.dirname(os.path.abspath(__file__))
# ordered (pattern, replacement); longer phrases first
SUBS=[
 (r", softly blushed cheeks", ""),                                   # COMMON_v3 skin sentence
 (r", a soft pink flush along the lower lids and outer corners", ""),  # Quyến rũ
 (r", pink flush on lower lids/outer corners", ""),                  # TYPES_v4 table
 (r" and a crisp dark upper lash line", ""),                         # Kiêu kỳ
 (r", crisp dark upper lash line", ""),                              # TYPES_v4 table
 (r"FULL plump glossy lips with a (?:rich|soft) rose tint and", "FULL plump lips with"),
 (r"FULL plump lips with a (?:rich|soft) rose tint", "FULL plump lips"),
 (r"FULL plump rose lips", "FULL plump lips"),
 (r"cheeks blushing, ", ""),
 (r"softly flushed cheeks", "soft cheeks"),
 (r"rosy rounded cheeks", "rounded cheeks"),
 (r"(?<=, )flushed cheeks", "soft cheeks"),
 (r"(?<=, )rosy cheeks", "soft cheeks"),
 (r"(?<=\| )rosy cheeks", "soft cheeks"),
 (r"thin even pale-rose lips", "thin even lips"),
 (r"soft pale-pink lips", "soft lips"),
 (r"\brosy (lips|mouth|lower lip)", r"\1"),
 (r"small rosy(?= \|)", "small"),                                    # INDEX table lip column
 (r"(?<=\| )small rosy,", "small,"),
]
HIT=re.compile(r"blushed cheeks|pink flush|lash line|rose tint|rosy|flushed cheeks|cheeks blushing|pale-rose lips|pale-pink lips|rose lips|glossy lips")
def count():
    n={}
    for f in sorted(glob.glob(os.path.join(D,'*'))):
        if f.endswith('d14_clean.py') or not os.path.isfile(f): continue
        c=len(HIT.findall(open(f,encoding='utf-8').read()))
        if c: n[os.path.basename(f)]=c
    return n
if __name__=="__main__":
    before=count(); changed=[]
    for f in sorted(glob.glob(os.path.join(D,'*'))):
        if f.endswith('d14_clean.py') or not os.path.isfile(f) or not f.endswith(('.txt','.md','.py')): continue
        s=open(f,encoding='utf-8').read(); t=s
        for p,r in SUBS: t=re.sub(p,r,t)
        if t!=s: open(f,'w',encoding='utf-8').write(t); changed.append(os.path.basename(f))
    after=count()
    print("BEFORE hits:",sum(before.values()),"in",len(before),"files")
    print("AFTER  hits:",sum(after.values()),after)
    print("CHANGED",len(changed),"files:"," ".join(changed))
