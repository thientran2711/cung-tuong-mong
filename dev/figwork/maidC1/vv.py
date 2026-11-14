# vv.py JID... : variable parts. Full prompt = PRE..."not elderly." + VAR + STILL-tail (constant) ; use cjobs.py for the full text
import os,sys; js=sys.argv[1:]; sys.argv=["x"]; __file__=os.path.abspath("cjobs.py")
exec(open("cjobs.py").read().split('if __name__')[0])
for j in js:
    s,r,p=job(j); a=p.index("not elderly.")+12; b=p.index("; all four standing still")
    print(j,s,r,"| IDK-mole" if "WITHOUT the small" in p else ""); print(p[a:b])
