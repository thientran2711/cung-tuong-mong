# ed.py JID... : forehead-only (huadian) edit prompt for an existing lineup (one image ref = current gen, no style ref)
import os,sys; js=sys.argv[1:]; sys.argv=["x"]; __file__=os.path.abspath("cjobs.py")
exec(open("cjobs.py").read().split('if __name__')[0])
g={l.split()[0]:l.split()[1] for l in open("gens.txt")}
for j in js:
    i=int(j.split("-")[1][1:])-1; t=int(j.split("-")[2][1:])
    m=hua(t,i).split("her signature motif ")[1].split("; the SAME")[0]
    print(j,g[j]); print(f"Edit this image. Keep everything exactly the same (all four figures, faces, expressions, hair, outfits, poses, props, ornaments, background, composition). Only replace the small red ornament (huadian) painted on the forehead between the brows of every figure with a new design: {m}; small and delicate (about the size of a fingertip), just above the bridge of the nose, exactly the same design on all four figures. No moles or beauty marks. No other changes. No text.")
