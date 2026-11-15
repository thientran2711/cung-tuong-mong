# Download the live t1 a18 figure of each face (identity reference + "old" picture for the contact sheet).
# Usage: python3 getref.py OUTDIR c05 m05 ...
import sys,os,urllib.request
BASE='https://thientran2711.'+'github.io/cung-tuong-mong/img/'
out=sys.argv[1];os.makedirs(out,exist_ok=True)
for c in sys.argv[2:]:
    role='maid' if c.startswith('m') else 'consort'
    fn=f'fig-{role}-{c}-t1-a18.webp'
    urllib.request.urlretrieve(BASE+fn,os.path.join(out,c+'.webp'));print(fn)
