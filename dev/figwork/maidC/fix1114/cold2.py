# cold2.py JID : lãnh cung redraw prompt (11/14 fix: no jewellery/earrings, plain cloth, ages look their age) -> "JID STY MREF" + prompt
import sys,re,subprocess,os
H=os.path.dirname(os.path.abspath(__file__))
AGE=("Left to right: about 19, fresh and youthful; about 24, young and lively; "
 "about 32, a mature woman in her early thirties, poised and composed, a slightly fuller, more womanly face, no longer girlish, smooth skin, no grey hair; "
 "about 48, an elegant beautiful lady in her late forties who clearly LOOKS her age: mature face shape with slightly fuller cheeks and a softer jawline, "
 "faint fine lines at the outer corners of the eyes and soft smile lines beside the mouth, slightly heavier eyelids, a dignified matronly bearing; "
 "her hair still fully dark like the younger figures (no grey streaks, no grey temples); still clearly beautiful, fair-skinned and serene, NOT elderly, not deeply wrinkled.")
def prompt(j):
    o=subprocess.run(["python3",H+"/mjobs.py",j],capture_output=True,text=True).stdout.splitlines()
    head,p=o[0],o[1]
    p=re.sub(r"Left to right: about 19.*?not elderly\.",AGE,p,count=1)
    p=p.replace("NOT its ages, poses, maid's outfit or ornaments","NOT its ages, poses, maid's outfit, ornaments or earrings")
    p=re.sub(r"a simple but well-made ([^,;]*?)plain robe in","a simple but well-made \\1plain robe of completely plain undecorated cloth (NO embroidery, NO pattern, NO decorated collar trim) in",p,count=1)
    p=p.replace("no gold, no jewellery;","no gold and NO jewellery of any kind: both ears completely BARE (NO earrings at all, no ear hooks or wires, no studs, no pearls), no necklace, no bracelet, no ring;")
    p=p.replace(" linen,"," thick opaque cotton,")
    p=p.replace("hair in a tidy low bun with one plain wooden hairpin,","hair smoothed softly down over both ears so the ears are hidden under the hair, gathered into a tidy low bun with one plain wooden hairpin,")
    assert AGE in p and "ears completely BARE" in p and "NO embroidery" in p, j
    return head,p
if __name__=="__main__":
    for j in sys.argv[1:]:
        h,p=prompt(j); print(h); print(p)
