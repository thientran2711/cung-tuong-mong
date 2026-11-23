#!/usr/bin/env python3
"""ACTWIRE (N14): stage the 21 FINAL Thái hậu act seals (THACT5 -D112 = disc 100→112→100 %, OUT 60 / LOOP 61 / BACK 45 f, 288 px, 15 fps)
   at the game's kit paths, from the review copies on the CDN (no new art, 0 Magnific).
     img/_review/emo-anim-groups/tonedown/act/th-act-<k>-{out,loop,back}-D112.webp
       -> img/kit/emo-anim/th-act-<k>-out.webp, th-act-<k>.webp, th-act-<k>-back.webp   (jemoseal 3-part set, KIT_EMOSEAL.setThree["th-act-"])
       -> img/kit/emo-th-act-<k>.webp   still = OUT frame 0 (the rest disc, r 74 at (144,144)) cropped to the disc, 160 px like every seal still
   usage (from the worktree root):  python3 dev/art/actwire_stage.py [--stills-only]   then   python3 dev/site/cdn_sync.py <the printed paths>
   The clips are pushed at LAND time (with the assets.py ALWAYS exclusion live), so no main build makes 32 MB of clips core before the code is in."""
import io, os, sys, urllib.request
from PIL import Image
B = "https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/tonedown/act/"
KS = "vui lo an muu ghen buon so chan khochiu tinhtu binh dau hothen choang hon hanghai chuyentam hungkhoi gian tutin tinhnghich".split()
R0, C, PAD, STILL = 74, 144, 1, 160          # disc_scale_spec.py: R0 74 at (144,144); +1 px keeps the gold rim whole
def get(u):
    for i in range(4):
        try: return urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "ctm-build"}), timeout=60).read()
        except Exception as e:
            if i == 3: raise
os.makedirs("img/kit/emo-anim", exist_ok=True); out = []
for k in KS:
    o = get(f"{B}th-act-{k}-out-D112.webp")
    im = Image.open(io.BytesIO(o)); im.seek(0); f0 = im.convert("RGBA")
    r = R0 + PAD; st = f0.crop((C - r, C - r, C + r, C + r)).resize((STILL, STILL), Image.LANCZOS)
    p = f"img/kit/emo-th-act-{k}.webp"; st.save(p, "WEBP", quality=88, method=6); out.append(p)
    if "--stills-only" in sys.argv: continue
    for part, dst in (("out", f"th-act-{k}-out"), ("loop", f"th-act-{k}"), ("back", f"th-act-{k}-back")):
        b = o if part == "out" else get(f"{B}th-act-{k}-{part}-D112.webp")
        p = f"img/kit/emo-anim/{dst}.webp"; open(p, "wb").write(b); out.append(p)   # bytes as reviewed (no re-encode)
print(" ".join(out))
