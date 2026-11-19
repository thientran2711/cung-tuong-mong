#!/usr/bin/env python3
"""SEAL2 group samples «giận» (hh- Hoàng hậu, pt- phi tần trẻ, ptl- phi tần lớn tuổi).
Prompts = th-gian.md §1–§3 copied exactly; ONLY who the person is (look words + colours) changes.
A ref = women giận still (img/kit/emo-gian.webp → 640 px, upload 1ldcfNpr4r); B ref = that group's A.
usage: python3 sg2_prompts.py hh|pt|ptl  → JSON {A,B,out,loop,back}"""
import json, sys
G = {
 "hh": dict(  # B21/B24 t8: royal yellow #EFBD69 + her red (crimson #A8323A = SEAL2 pick, A18)
  who="an EMPRESS (the Hoàng hậu, first lady of the palace) of the Qing-style inner palace: a dignified woman about thirty, graceful oval face, glossy black hair swept up into a high formal bun under a LARGE ornate gold phoenix crown with spread phoenix wings, pearl strings and red jewels (clearly grander than any consort's hairpins, nothing like a maid's single hairpin and flower), small pearl earrings, a royal yellow (#EFBD69) brocade robe with a deep crimson red (#A8323A) collar and gold embroidery at the shoulders",
  same="Same empress, same soft hand-painted storybook style, same large gold phoenix crown with pearl strings, same glossy black hair, same royal yellow (#EFBD69) brocade robe with deep crimson red (#A8323A) collar",
  sleeves="wide royal yellow sleeves with crimson red cuffs", face="angry shouting face", jewels="crown jewels swinging",
  short="empress in the large gold phoenix crown", above="above her crown", swing="the pearl strings of her crown swing",
  endface="an angry face with the large phoenix crown"),
 "pt": dict(  # young consort; B24 t4 Tần pink #E3A3B8 (SEAL2 pick of rank)
  who="a YOUNG IMPERIAL CONSORT of the Qing-style inner palace: a pretty young woman about eighteen, soft round youthful face, glossy black hair dressed in a formal flat-topped two-wing court headdress decorated with several gold phoenix hairpins, pearl tassels and pink silk flowers (clearly a consort's rich hair ornaments, nothing like a maid's single hairpin and flower, smaller than an empress's crown), small pearl earrings, a soft pink (#E3A3B8) brocade robe with a gold-embroidered collar and gold embroidery at the shoulders",
  same="Same young consort, same soft hand-painted storybook style, same flat-topped court headdress with gold phoenix hairpins and pearl tassels, same glossy black hair, same soft pink (#E3A3B8) brocade robe with gold-embroidered collar",
  sleeves="wide soft pink sleeves with gold-embroidered cuffs", face="angry shouting young face", jewels="pearl tassels swinging",
  short="young consort with the gold phoenix hairpins", above="above her head", swing="the pearl tassels of her headdress swing",
  endface="an angry young face with the gold-pinned court headdress"),
 "ptl": dict(  # senior consort ~50; B24 t5 Phi purple #A88BCB (SEAL2 pick of rank)
  who="a MIDDLE-AGED SENIOR IMPERIAL CONSORT of the Qing-style inner palace: a stately woman about fifty, fuller face with a few fine lines at the eyes and mouth, black hair with a few grey strands at the temples, dressed in a formal flat-topped two-wing court headdress decorated with gold phoenix hairpins, pearl tassels and purple jewels (clearly a high-ranking consort's rich hair ornaments, nothing like a maid's single hairpin and flower, smaller than an empress's crown), small pearl earrings, a soft purple (#A88BCB) brocade robe with a gold-embroidered collar and gold embroidery at the shoulders",
  same="Same middle-aged consort, same soft hand-painted storybook style, same flat-topped court headdress with gold phoenix hairpins and pearl tassels, same black hair with grey strands at the temples, same soft purple (#A88BCB) brocade robe with gold-embroidered collar",
  sleeves="wide soft purple sleeves with gold-embroidered cuffs", face="angry shouting middle-aged face", jewels="pearl tassels swinging",
  short="middle-aged consort in the gold-pinned court headdress", above="above her head", swing="the pearl tassels of her headdress swing",
  endface="an angry middle-aged face with the gold-pinned court headdress"),
}
def prompts(k):
    g = G[k]
    return {
     "A": f"Same soft hand-painted storybook style, same round gold-rimmed red medallion and same chibi proportions as the reference, but the person is now {g['who']}. Her face is ANGRY like the reference: furrowed brows, glaring eyes, tight frowning mouth, red flush on the cheeks, a small red anger mark by her temple. Both eyes looking together straight ahead. Everything kept INSIDE the round medallion, the medallion drawn a bit smaller and centred so there is empty space around it. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.",
     "B": f"{g['same']}, same round gold-rimmed red medallion as the reference. NEW: she is FURIOUS and bursts OUT of the round medallion toward the viewer: her head, shoulders and both arms come forward through and over the gold rim, her head and hands overlap and cover parts of the gold ring; one hand grips the gold rim, the other is a raised clenched fist, {g['sleeves']} visible; {g['face']}, brows furrowed, puffed cheeks, {g['jewels']}; one small red anger mark and two small steam puffs above her head. The medallion stays round and centred, a bit smaller, with her popping out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.",
     "out": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The angry {g['short']} inside the round gold medallion flares up in fury: she leans forward and bursts out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out, one hand grips the gold rim and the other rises as a clenched fist, she shouts angrily, steam puffs appear {g['above']}. Smooth, cartoon-like, same painted style, no camera move, no new objects.",
     "loop": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The furious {g['short']} leaning out of the round gold medallion keeps scolding in a loop: she shakes her raised fist, huffs and puffs her cheeks, {g['swing']}, the steam puffs rise and fade; then she settles back to exactly the starting pose. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects.",
     "back": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The furious {g['short']} leaning out of the round gold medallion gives one last angry huff, the steam fades away, she lowers her fist, lets go of the gold rim, pulls her arms back and slowly slides back inside the round medallion, shrinking back into it, until she is again only {g['endface']} inside the round frame, exactly like the end frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects.",
    }
if __name__ == "__main__":
    print(json.dumps(prompts(sys.argv[1]), ensure_ascii=False, indent=1))
