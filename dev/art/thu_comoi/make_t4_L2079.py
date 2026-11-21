import re,sys
FL={'63':'double peach blossoms','64':'double kerria pompons','65':'double daylilies'}
for s,fl in FL.items():
    t=open(f's{s}_t4_THU_NECK.txt').read()
    reps=[
     ("of embroidered silk, its lower edge cut into 5 or 6 LARGE round petal lobes (never small waves), each lobe gold-edged, its neck edge plain capelet silk",
      "of embroidered silk with a soft scalloped wavy (lượn sóng) lower edge, its neck edge plain capelet silk"),
     ("a pearl drop at each lobe tip","a short pearl fringe stitched along its scalloped lower edge"),
     ("neck bare), always fully visible,", f"neck bare), always fully visible, a medium cluster of {fl} embroidered in gold thread in the middle of the chest panel, centred between the neckline band and the sash, part of the robe's embroidery, never inside the neckline, never framed,"),
     (", never cross-eyed, never wall-eyed",""),
        ]
    LC='CAPTION: in LARGE bold letters, top-left corner, on the plain background, never over her body, write exactly this Vietnamese text WITH accents:'
    if LC in t: reps.append((LC,'CAPTION: bold, top-left, never over her, with accents:'))
    reps.append(('GRACE (pose variety, every rank its own):','GRACE:'))
    for o in (', never a stretched grin',):
        if o in t: reps.append((o,''))
    for a,b in reps:
        assert t.count(a)==1,(s,a[:40],t.count(a)); t=t.replace(a,b)
    extra=''
    if len(t)>9999:
        for a in (', youthful adult.',', clearly adult;'):
            t=t.replace(a,a[-1],1)
        extra='allow: youthful adult  # trim to fit 10 000 (s65 only): "about 22" + adult body proportions kept\nallow: clearly adult  # trim to fit 10 000 (s65 only)\n'
    open(f's{s}_t4_THU_L2079.txt','w').write(t)
    open(f's{s}_t4_THU_L2079.txt.keep','w').write(f"""base: dev/art/thu_comoi/s{s}_t4_THU_NECK.txt
allow: its lower edge cut into 5 or 6 LARGE round petal lobes  # owner L2070/L2072: back to L2041 edge words
allow: a pearl drop at each lobe tip  # owner L2070/L2072: back to L2041 pearl fringe
allow: each lobe gold-edged  # owner L2070/L2072: back to L2041 edge words
allow: (never small waves)  # owner L2070/L2072
allow: never cross-eyed  # trim to fit 10 000: same eye sentence keeps 'never looking in two directions'
allow: never wall-eyed  # trim to fit 10 000: same
allow: never a stretched grin  # trim to fit 10 000: the MOUTH sentence keeps 'never a grin'
allow: (pose variety, every rank its own)  # trim to fit 10 000: label text only
{extra}allow: in LARGE bold letters, top-left corner, on the plain background, never over her body, write exactly this Vietnamese text WITH accents:  # trim to fit 10 000: short caption form (as s65 NECK)
""".replace("{extra}",extra))
    print(s,len(t))
