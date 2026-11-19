#!/usr/bin/env python3
"""ROOT-54 (owner on Thái hậu m05 v624: 'Sắc sảo face looks baby'): SẮC SẢO face block + 2 test prompts from TH1's m05 a36 prompt.
A = TH1 v624 m05 a36 prompt verbatim, only (1) her face sentence -> SAC_SAO block, (2) yellow -> B22 #CE9C48. Refs as TH1 (KLpSlnEkqp + TdwDfOyVNR).
B = A without the identity reference (only the royal swatch): identity sentence removed, 'Image 2 is only' -> 'The reference image is only'.
Run: python3 dev/art/face-common/make_sacsao_test.py"""
import os
R=os.path.dirname(os.path.abspath(__file__))+'/../../..'
SRC=R+'/dev/handover/review-sheets/thai-hau-sample/v624/m05_thaihau_a36.prompt.txt'
OUT=R+'/dev/handover/review-sheets/thai-hau-sample/v624s/'
SAC_SAO=("a DEFINED OVAL face with visible high cheekbones, a slim clearly shaped jaw and a neat pointed chin, crisp almond eyes with slightly lifted outer corners, "
 "fully open and bright, with a clear intelligent gaze, straight defined brows, a slim straight nose with a fine bridge, well-defined lips with a clear cupid's bow; "
 "an adult young woman's face, never a baby face, never round or chubby")
OLD_FACE=("a broad ROUND-OVAL face with full apple cheeks and a firm little chin, large round doe eyes with clearly defined double lids, thick softly arched brows, "
 "a short straight nose, full plump lips")
OLD_Y="the royal golden yellow (honey-gold like #EFBD69)"; NEW_Y="the royal golden yellow (deep antique-gold royal yellow #CE9C48)"
IDS=("From the identity reference keep ONLY her face, facial features, hair COLOUR and signature colour family; do NOT copy poses, outfit, HAIRSTYLE, "
 "hair ornaments or accessories of the reference, dress her in the NEW outfit below. ")
s=open(SRC).read().strip()
for a,b in ((OLD_FACE,SAC_SAO),(OLD_Y,NEW_Y)):
    assert s.count(a)==1,a[:40]; s=s.replace(a,b)
open(OUT+'m05_thaihau_a36_A.prompt.txt','w').write(s)
assert s.count(IDS)==1 and s.count("Image 2 is only")==1
b=s.replace(IDS,"").replace("Image 2 is only","The reference image is only")
open(OUT+'m05_thaihau_a36_B.prompt.txt','w').write(b)
print("A",len(s),"B",len(b))
