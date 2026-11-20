#!/usr/bin/env python3
"""SEAL3 samples: the «giận» seal for groups (j) bg- bé gái, (k) bt- bé trai, (e) mm- ma ma.
Text = dev/art/emo-anim/groups/th-gian.md §1–§3 COPIED; only WHO the person is (look words + colours) and the pronouns change.
A ref = women giận still YMl5gLCWeC (emo-gian-women-640, the ref th-gian A used); B ref = that group's own A.
usage: python3 grp_gian_prompts.py bg|bt|mm  → JSON of A/B/out/loop/back
Colours: bg/bt = royal children of our court → royal yellow #EFBD69 (B21) + own colour (picks, note for owner A18);
mm = the approved ma ma two-colour pair coral red #D4897D + teal #499597 (D16 frozen recipe m05 r54/r55)."""
import json, sys
G = {
 "bg": dict(
  who="a LITTLE PRINCESS of the inner palace: a small girl about seven years old, clearly a young CHILD (not a teenager, not a woman), "
      "round chubby baby face with big round eyes, a tiny button nose and small mouth, short soft black hair in two small round buns on top of her head "
      "with a tiny gold hairpin and one small pink flower (no crown, no long hair), a royal yellow (#EFBD69) silk robe with a soft peach-pink (#F2A7A0) collar "
      "and a little gold embroidery at the shoulders",
  same="Same little princess, a small girl about seven, same soft hand-painted storybook style, same chubby child face, same two small round hair buns with the tiny gold hairpin and small pink flower, "
       "same royal yellow (#EFBD69) silk robe with peach-pink (#F2A7A0) collar",
  short="little princess with two small hair buns", sl="royal yellow sleeves with peach-pink cuffs", head="her hair buns",
  shake="the small pink flower and the hairpin tassel bounce", jewels="hair buns bobbing", old="little child face",
  P=("she", "her", "her")),
 "bt": dict(
  who="a LITTLE PRINCE of the inner palace: a small boy about seven years old, clearly a young CHILD (not a teenager, not a man), "
      "round chubby baby face with big round eyes, a tiny button nose and small mouth, short black hair gathered into one small topknot on top of his head "
      "held by a small gold crown ring (no big crown, no long hair, no beard), a royal yellow (#EFBD69) silk robe with a deep blue (#3F6E9A) collar "
      "and a little gold dragon embroidery at the chest",
  same="Same little prince, a small boy about seven, same soft hand-painted storybook style, same chubby child face, same small topknot with the small gold crown ring, "
       "same royal yellow (#EFBD69) silk robe with deep blue (#3F6E9A) collar",
  short="little prince with the small topknot", sl="royal yellow sleeves with deep blue cuffs", head="his topknot",
  shake="his topknot bobs", jewels="topknot bobbing", old="little child face",
  P=("he", "his", "him")),
 "mm": dict(
  who="a senior palace MA MA (head maid, an older lady-in-waiting) of the inner palace: a woman about fifty-five, firm round face with a few soft lines "
      "at the eyes and mouth, dark hair with silver streaks pinned UP in a neat bun with two plain silver hairpins (no crown, no phoenix, no flowers, no loose hair), "
      "small earrings, a coral red (#D4897D) brocade over-vest with a teal (#499597) stand collar and teal inner robe, thin gold trim",
  same="Same palace ma ma, same soft hand-painted storybook style, same neat silver-streaked bun with two plain silver hairpins, "
       "same coral red (#D4897D) brocade over-vest with teal (#499597) collar",
  short="ma ma with the neat bun", sl="teal sleeves with coral red cuffs", head="her bun",
  shake="her silver hairpins wobble", jewels="hairpins wobbling", old="face",
  P=("she", "her", "her")),
 # --- CANCELLED (ROOT-57, owner Lượt 800 misread): cn/nt/nl were a mistaken order (Lượt 796); kept only so the ledger prompt refs resolve. DO NOT USE. ---
 "cn": dict(
  who="a YOUNG PALACE MAID (cung nữ) of the inner palace: a girl about eighteen, sweet round face with big round eyes, "
      "black hair pinned UP in a simple neat bun with ONE plain silver hairpin with a tiny tassel (no flowers, no crown, no phoenix, nothing grand, no loose hair), "
      "a plain maid's pale blue-green (#A9CFC4) silk jacket with a narrow ivory (#EAD7BF) collar, simple and modest, clearly a servant, not a consort",
  same="Same young palace maid, same soft hand-painted storybook style, same simple neat bun with one plain silver hairpin, "
       "same pale blue-green (#A9CFC4) maid's silk jacket with ivory (#EAD7BF) collar",
  short="young palace maid with the neat bun", sl="pale blue-green sleeves with ivory cuffs", head="her bun",
  shake="her little hairpin tassel swings", jewels="hairpin tassel swinging", old="young face",
  P=("she", "her", "her")),
 "nt": dict(
  who="a YOUNG PRINCE of the palace: a young man about twenty, handsome smooth face with no beard and no moustache, clear bright eyes, "
      "black hair gathered into a neat topknot on top of his head held by a small gold crown ring (no big crown), "
      "a scholar-prince's deep teal-blue (#4A7C8C) silk robe with a royal yellow (#EFBD69) collar and a little gold embroidery",
  same="Same young prince, a young man about twenty with no beard, same soft hand-painted storybook style, same neat topknot with the small gold crown ring, "
       "same deep teal-blue (#4A7C8C) silk robe with royal yellow (#EFBD69) collar",
  short="young prince with the topknot", sl="deep teal-blue sleeves with royal yellow cuffs", head="his topknot",
  shake="his topknot bobs", jewels="topknot bobbing", old="young face",
  P=("he", "his", "him")),
 "nl": dict(
  who="an OLDER COURT OFFICIAL of the palace: a man about fifty, firm face with a few lines at the eyes and brow, a short neat greying beard and moustache, "
      "a round official's hat with a red silk tassel fringe and a small round button on top, "
      "a dark navy (#2F3E5C) official's robe with a square embroidered rank badge on the chest and a string of court beads",
  same="Same older court official, same soft hand-painted storybook style, same short greying beard and moustache, same round official's hat with red tassel fringe and top button, "
       "same dark navy (#2F3E5C) official's robe with the square rank badge",
  short="older official in the round official's hat", sl="dark navy sleeves", head="his official's hat",
  shake="the red tassel fringe of his hat and his beard shake", jewels="hat tassel shaking", old="bearded face",
  P=("he", "his", "him")),
}
def prompts(k):
    g = G[k]; s, p, o = g["P"]; S = s.capitalize(); sh = g["short"]
    return {
     "A": f"Same soft hand-painted storybook style, same round gold-rimmed red medallion and same chibi proportions as the reference, but the person is now {g['who']}. {p.capitalize()} face is ANGRY like the reference: furrowed brows, glaring eyes, tight frowning mouth, red flush on the cheeks, a small red anger mark by {p} temple. Both eyes looking together straight ahead. Everything kept INSIDE the round medallion, the medallion drawn a bit smaller and centred so there is empty space around it. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.",
     "B": f"{g['same']}, same round gold-rimmed red medallion as the reference. NEW: {s} is FURIOUS and bursts OUT of the round medallion toward the viewer: {p} head, shoulders and both arms come forward through and over the gold rim, {p} head and hands overlap and cover parts of the gold ring; one hand grips the gold rim, the other is a raised clenched fist, wide {g['sl']} visible; angry shouting {g['old']}, brows furrowed, puffed cheeks, {g['jewels']}; one small red anger mark and two small steam puffs above {p} head. The medallion stays round and centred, a bit smaller, with {o} popping out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.",
     "out": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The angry {sh} inside the round gold medallion flares up in fury: {s} leans forward and bursts out of the round frame toward the viewer, {p} head and shoulders push past the gold rim, {p} arms come out, one hand grips the gold rim and the other rises as a clenched fist, {s} shouts angrily, steam puffs appear above {g['head']}. Smooth, cartoon-like, same painted style, no camera move, no new objects.",
     "loop": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The furious {sh} leaning out of the round gold medallion keeps scolding in a loop: {s} shakes {p} raised fist, huffs and puffs {p} cheeks, {g['shake']}, the steam puffs rise and fade; then {s} settles back to exactly the starting pose. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects.",
     "back": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The furious {sh} leaning out of the round gold medallion gives one last angry huff, the steam fades away, {s} lowers {p} fist, lets go of the gold rim, pulls {p} arms back and slowly slides back inside the round medallion, shrinking back into it, until {s} is again only an angry {g["old"]} with {g['head']} inside the round frame, exactly like the end frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects.",
    }
if __name__ == "__main__":
    print(json.dumps({k: prompts(k) for k in (sys.argv[1:] or list(G))}, ensure_ascii=False, indent=1))
