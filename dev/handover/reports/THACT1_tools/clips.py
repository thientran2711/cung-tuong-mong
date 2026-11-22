import json,sys
OLD="old empress dowager in the large gold phoenix crown"
def out(a): return f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The {OLD} inside the round gold medallion {a}; she comes out of the round frame only a little toward the viewer. Small calm movements only, exactly two hands, no big arms, the medallion keeps exactly its same size and colour. Smooth, cartoon-like, same painted style, no camera move, no new objects."
def loop(a): return f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The {OLD} leaning slightly out of the round gold medallion {a}; then she settles back to exactly the starting pose. Small calm movements only, exactly two hands, the medallion keeps exactly its same size and colour. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects."
C=json.load(open(sys.argv[1]))
R={}
for k,(o,l) in C.items():
    R[k]={"out":out(o),"loop":loop(l)}
    for kind in ("out","loop"): open(f"{kind}_{k}.txt","w").write(R[k][kind])
json.dump(R,open('clips_'+sys.argv[1],'w'),ensure_ascii=False,indent=1)
