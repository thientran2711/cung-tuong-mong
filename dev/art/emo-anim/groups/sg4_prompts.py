#!/usr/bin/env python3
"""SEAL4 group samples «giận» (owner Lượt 783): ht- Hoàng thượng trẻ, htg- Hoàng thượng già, tg- thái giám, tv- thị vệ.
Prompts = th-gian.md §1/§2/§3 copied word for word; ONLY who the person is changes (look words + colours, men's words he/his).
A ref = the women «giận» still (img/kit/emo-gian.webp, 640 px upload aFGNpiMfSh) like th-gian §1; B ref = that group's A.
Colour picks (SEAL4, owner may name others, A18): both emperors royal yellow #EFBD69 dragon robe (B21) + deep teal-blue #2E5E73 collar
(the blue-green of the emperor-B lishui hem); eunuch dark steel blue #3D5A80 robe (build_npc ECOL[0]) + pale blue #A9C4DE collar;
guard steel-grey lamellar armour + deep red #A8323A robe (build_npc man-thive). Young emperor clean-shaven (J5); old emperor beard (J5 a65).
usage: python3 sg4_prompts.py [ht htg tg tv] → JSON of A/B/out/loop/back"""
import json, sys
CROWN = "a small gold imperial crown with a short gold pin, a tiny gold dragon on the front and two short red silk tassels (clearly an emperor's crown, nothing like an official's or a eunuch's black hat)"
ROBE = "a royal yellow (#EFBD69) dragon robe with a deep teal-blue (#2E5E73) collar and a gold dragon embroidered on the chest and shoulders"
G = {  # key: (WHO for A, SAME for B, sleeves in B, face word in B, headgear motion in B, short name in clips, headgear motion in LOOP, BACK end face, "above his X")
 "ht": ("a YOUNG EMPEROR (Hoàng thượng) of the inner palace: a handsome young man about twenty-two, clean-shaven, smooth fair face, "
        f"neat black hair drawn up into a topknot under {CROWN}, {ROBE}",
        "Same young emperor, same soft hand-painted storybook style, same small gold imperial crown with the short gold pin and red tassels, "
        "same neat black hair, same clean-shaven young face, same royal yellow (#EFBD69) dragon robe with deep teal-blue (#2E5E73) collar",
        "wide royal yellow sleeves with teal-blue cuffs visible", "angry shouting young face", "crown tassels swinging",
        "young emperor in the small gold imperial crown", "the red tassels of his crown swing",
        "an angry young face with the small gold imperial crown", "crown"),
 "htg": ("an OLD EMPEROR (Hoàng thượng) of the inner palace: a dignified older man about sixty, a fuller mature face with soft wrinkles at the eyes and brow, "
         "silver-grey hair streaked with a little black drawn up into a topknot, a neatly trimmed silver-grey moustache and a short full silver-grey beard, "
         f"under {CROWN}, {ROBE}",
         "Same old emperor, same soft hand-painted storybook style, same small gold imperial crown with the short gold pin and red tassels, "
         "same silver-grey hair, moustache and short full beard, same royal yellow (#EFBD69) dragon robe with deep teal-blue (#2E5E73) collar",
         "wide royal yellow sleeves with teal-blue cuffs visible", "angry shouting old bearded face", "crown tassels swinging",
         "old bearded emperor in the small gold imperial crown", "the red tassels of his crown swing",
         "an angry old bearded face with the small gold imperial crown", "crown"),
 "tg": ("a PALACE EUNUCH (thái giám) of the inner palace: a man about forty, a round soft face, beardless with smooth clean cheeks "
        "(no beard, no moustache), a round black gauze palace hat (a eunuch's hat, nothing like an emperor's gold crown), "
        "a dark steel blue (#3D5A80) round-collar palace robe with a pale blue (#A9C4DE) collar and a plain belt",
        "Same palace eunuch, same soft hand-painted storybook style, same round black gauze palace hat, same beardless round face, "
        "same dark steel blue (#3D5A80) round-collar robe with pale blue (#A9C4DE) collar",
        "steel-blue sleeves with pale blue cuffs visible", "angry shouting beardless face", "hat wobbling",
        "beardless palace eunuch in the black gauze hat", "his black hat wobbles",
        "an angry beardless face with the black gauze hat", "hat"),
 "tv": ("a PALACE GUARD (thị vệ) of the inner palace: a strong young man about twenty-eight, clean-shaven, a firm handsome face with thick straight brows, "
        "a polished steel helmet with cheek guards and a red plume tassel on top (a soldier's helmet, nothing like an emperor's crown), "
        "steel-grey lamellar armour with gold edging and shoulder plates over a deep red (#A8323A) robe",
        "Same palace guard, same soft hand-painted storybook style, same steel helmet with cheek guards and red plume, same clean-shaven firm face, "
        "same steel-grey lamellar armour with gold edging over a deep red (#A8323A) robe",
        "armoured forearm guards and deep red sleeves visible", "angry shouting face", "the red plume of his helmet swinging",
        "palace guard in the steel helmet", "the red plume of his helmet swings",
        "an angry face with the steel helmet", "helmet"),
}
def prompts(k):
    who, same, sl, face, hg, short, lhg, endface, top = G[k]
    return {
     "A": f"Same soft hand-painted storybook style, same round gold-rimmed red medallion and same chibi proportions as the reference, but the person is now {who}. His face is ANGRY like the reference: furrowed brows, glaring eyes, tight frowning mouth, red flush on the cheeks, a small red anger mark by his temple. Both eyes looking together straight ahead. Everything kept INSIDE the round medallion, the medallion drawn a bit smaller and centred so there is empty space around it. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.",
     "B": f"{same}, same round gold-rimmed red medallion as the reference. NEW: he is FURIOUS and bursts OUT of the round medallion toward the viewer: his head, shoulders and both arms come forward through and over the gold rim, his head and hands overlap and cover parts of the gold ring; one hand grips the gold rim, the other is a raised clenched fist, {sl}; {face}, brows furrowed, puffed cheeks, {hg}; one small red anger mark and two small steam puffs above his head. The medallion stays round and centred, a bit smaller, with him popping out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.",
     "out": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The angry {short} inside the round gold medallion flares up in fury: he leans forward and bursts out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, one hand grips the gold rim and the other rises as a clenched fist, he shouts angrily, steam puffs appear above his {top}. Smooth, cartoon-like, same painted style, no camera move, no new objects.",
     "loop": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The furious {short} leaning out of the round gold medallion keeps scolding in a loop: he shakes his raised fist, huffs and puffs his cheeks, {lhg}, the steam puffs rise and fade; then he settles back to exactly the starting pose. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects.",
     "back": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The furious {short} leaning out of the round gold medallion gives one last angry huff, the steam fades away, he lowers his fist, lets go of the gold rim, pulls his arms back and slowly slides back inside the round medallion, shrinking back into it, until he is again only {endface} inside the round frame, exactly like the end frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects.",
    }
if __name__ == "__main__":
    import os as _os; sys.path.insert(0, _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "..")); import seal_gate as _SG  # A24 seal gate: FAIL = exit 1, no prompts printed = no gen
    ks = sys.argv[1:] or list(G)
    print(json.dumps(_SG.guard({k: prompts(k) for k in ks}, "sg4"), ensure_ascii=False, indent=1))
