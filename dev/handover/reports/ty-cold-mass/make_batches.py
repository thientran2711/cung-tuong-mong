# ty-cold MASS batch list (TY0, 19/11). python3 make_batches.py > batches.tsv
# Every (face x tier x age) still to paint, split into batches of 20 gens. Waves in this order: a51, a65, a36, a26, a18.
# BW4 (owner B8 Lượt 543/551 + K18 Lượt 591): ONE reference = her KC_REFS set-B cut id (dev/art/KC_REFS.json); NEVER the style image
# 6AbGv6EiJO and NEVER a live game file (img/fig-*, img/hd/*) as a reference. People without a KC cut are NOT drawn (HELD).
# The last column (the game file the picture will replace/add) is only a target name: live files are pushed in ONE go later (K18).
import json,os
ROOT=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),"../../../.."))
KC=json.load(open(os.path.join(ROOT,"dev/art/KC_REFS.json"),encoding="utf-8"))["people"]
DONE={("c06","cold","a36"),("c06","ty4","a65"),("m37","ty1","a65"),("m37","cold","a18")}   # TY0 fix1 verify gens, kept (img/_review/ty-cold/fix1/)
faces=[("c%02d"%n,"consort") for n in range(1,33)]+[("m%02d"%n,"maid") for n in range(1,53)]
tiers=["ty%d"%i for i in range(1,9)]+["cold"]
rows=[]
for age in ["a51","a65","a36","a26","a18"]:
    for fid,grp in faces:
        for t in tiers:
            if (fid,t,age) in DONE: continue
            ft="tcold" if (t=="cold" and grp=="consort") else t
            k=KC.get(fid,{})
            ref=k["ref_id"]+" (KC_REFS set-B cut, ONE ref)" if k.get("m09_ok")=="yes" else "HELD (B8: not drawn, no KC cut)"
            rows.append((age,fid,t,ref,"img/fig-%s-%s-%s-%s.webp"%(grp,fid,ft,age)))
print("batch\twave\tface\tstate\tbuilder command (stdout = prompt, paste unchanged)\timage1 = her ONE ref (KC_REFS cut id; never a live img/ file)\tgame file it replaces/adds")
b=0;cur=None;n=0
for r in rows:
    if r[0]!=cur or n==20: b+=1; n=0; cur=r[0]
    n+=1
    print("B%03d\t%s\t%s\t%s\tpython3 dev/art/t8-prompt-B/build.py %s --state %s --age %s --spec5pose --nostyle --log\t%s\t%s"%(b,r[0],r[1],r[2],r[1],r[2],r[0],r[3],r[4]))
