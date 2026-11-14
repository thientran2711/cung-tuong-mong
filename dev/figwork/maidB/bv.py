# bv.py JID... : compact variable parts for part B (style ref, features, outfit+poses)
import sys; args=sys.argv[1:]; sys.argv=[sys.argv[0]]
exec(open(__file__.replace("bv.py","mjobs.py")).read().split('if __name__')[0])
for j in args:
    s,r,p=job(j); who=j.split("-")[1]
    print(j,s,r,"| F:",FEAT[who]); print("  ",p[p.index("a NEW outfit, ")+14:p.index(" All four stand")])
