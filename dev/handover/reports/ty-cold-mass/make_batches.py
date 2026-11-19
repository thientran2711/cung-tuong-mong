# ty-cold MASS batch list (TY0, 19/11). curl -sS -o /tmp/idx.json <IDX>; python3 make_batches.py /tmp/idx.json > batches.tsv
# Every (face x tier x age) still to paint, split into batches of 20 gens. Waves in this order: a51, a65, a36, a26, a18
# (a65 needs her NEW 2K a51 cut-out as image 2 so "deeper than at 51" has a base -> a51 wave first).
import json,urllib.request
IDX="https://ctm-img.victoria-tntt.workers.dev/img/_index.json"
CDN="https://ctm-img.victoria-tntt.workers.dev/"
import sys
files={f[0] for f in json.load(open(sys.argv[1]))["files"]}   # arg = a fresh copy of IDX (curl -sS -o idx.json IDX)
DONE={("c06","cold","a36"),("c06","ty4","a65"),("m37","ty1","a65"),("m37","cold","a18")}   # TY0 fix1 verify gens, kept (img/_review/ty-cold/fix1/)
faces=[("c%02d"%n,"consort") for n in range(1,33)]+[("m%02d"%n,"maid") for n in range(1,53)]
tiers=["ty%d"%i for i in range(1,9)]+["cold"]
rows=[]
for age in ["a51","a65","a36","a26","a18"]:
    for fid,grp in faces:
        for t in tiers:
            if (fid,t,age) in DONE: continue
            ft="tcold" if (t=="cold" and grp=="consort") else t
            if age=="a65": ref="NEW 2K a51 cut-out of this row (wave a51 ledger gen_id; img/_review/ty-cold/mass/%s-%s-a51.png)"%(fid,t)
            else:
                hd="img/hd/fig-%s-%s-%s-%s.webp"%(grp,fid,ft,age); lo="img/fig-%s-%s-%s-%s.webp"%(grp,fid,ft,age)
                ref=CDN+(hd if hd in files else lo) if (hd in files or lo in files) else "MISSING"
            rows.append((age,fid,t,ref,"img/fig-%s-%s-%s-%s.webp"%(grp,fid,ft,age)))
print("batch\twave\tface\tstate\tbuilder command (stdout = prompt, paste unchanged)\timage2 (face ref; image1 = style 6AbGv6EiJO)\tgame file it replaces/adds")
b=0;cur=None;n=0
for r in rows:
    if r[0]!=cur or n==20: b+=1; n=0; cur=r[0]
    n+=1
    print("B%03d\t%s\t%s\t%s\tpython3 dev/art/t8-prompt-B/build.py %s --state %s --age %s --spec5pose --log\t%s\t%s"%(b,r[0],r[1],r[2],r[1],r[2],r[0],r[3],r[4]))
