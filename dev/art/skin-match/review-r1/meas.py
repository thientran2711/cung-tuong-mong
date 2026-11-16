import sys,os,json
sys.path.insert(0,'/home/user/cung-tuong-mong/dev/art/skin-match')
import cv2,seg,measure
d=sys.argv[1]; out=open(sys.argv[2],'w')
for n in sys.argv[3:]:
    im=cv2.imread(os.path.join(d,n),cv2.IMREAD_UNCHANGED)
    r=measure.regions(im,seg.probs(im)) if im is not None else None
    out.write(json.dumps({"f":n,"st":measure.stats(r) if r else None})+"\n"); out.flush()
