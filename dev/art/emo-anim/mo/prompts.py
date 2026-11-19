#!/usr/bin/env python3
"""Emo-anim mass, MATURE MEN set (mo-): keyframe + clip prompts (giận pilot Xm9fz3fBfo recipe, 'she' -> 'he')."""
import json, sys
LOOK = ("same black hair in a topknot under a small black scholar cap with a gold hairpin, same thin moustache and small pointed goatee beard, "
        "same dark olive-black robe with gold trim and white inner collar")
S = {  # key: (ref id, medallion, still face, burst action, loop action, back mood)
 "vui": ("yiuAwrFPW9", "yellow", "happy face with a big open-mouth smile",
   "he is DELIGHTED and bursts OUT of the round medallion toward the viewer: his head, shoulders and both arms come forward through and over the gold rim, his head and hands overlap and cover parts of the gold ring; one hand waves cheerfully at the viewer, the other hand rests on the gold rim; eyes happily crinkled, laughing with an open-mouth grin; a few small gold sparkles around his head",
   "keeps laughing happily in a loop: he waves his raised hand cheerfully, bounces a little, his shoulders shake with laughter, the small sparkles twinkle", "happy smile"),
 "binh": ("DoOhTvxpcl", "mottled dark green", "calm gentle face with a soft closed-mouth smile",
   "he is CALM and content and leans OUT of the round medallion toward the viewer: his head, shoulders and both arms come forward through and over the gold rim, his head and hands overlap and cover parts of the gold ring; one hand calmly strokes his goatee beard, the other hand rests relaxed on the gold rim; a serene gentle closed-mouth smile, eyes softly half closed; one small drifting leaf beside him",
   "stays calm and content in a loop: he slowly strokes his goatee beard, nods gently, breathes slowly with a serene smile, the small leaf drifts", "calm gentle smile"),
 "buon": ("cpSonmQ0eP", "pale blue", "sad face with downcast eyes",
   "he is SAD and leans heavily OUT of the round medallion toward the viewer: his head, shoulders and both arms come forward over the gold rim, his head and arms overlap and cover parts of the gold ring; his chin rests sadly on one hand propped on the gold rim, the other arm hangs limply over the rim; droopy sad eyes, downturned mouth, one small tear on his cheek; a small grey rain cloud above his head",
   "keeps sighing sadly in a loop: he sighs with drooping shoulders, his head sinks on his hand, the small tear rolls, the little rain cloud drizzles", "sad downcast face"),
 "dau": ("lJt9jZpgv9", "deep blue", "crying face wailing with tears",
   "he is HEARTBROKEN and bursts OUT of the round medallion toward the viewer: his head, shoulders and both arms come forward through and over the gold rim, his head and arms overlap and cover parts of the gold ring; both hands wipe the streaming tears from his eyes with his sleeves; mouth wide open wailing, small streams of tears",
   "keeps crying in a loop: he sobs, his shoulders shake, he wipes his eyes with both sleeves again and again, the little tears stream", "crying face with tears"),
 "ghen": ("ov6udkT829", "yellow-green", "jealous sulky face with one cheek puffed out and a sideways glance",
   "he is JEALOUS and leans OUT of the round medallion toward the viewer: his head, shoulders and both arms come forward over the gold rim, his head and arms overlap and cover parts of the gold ring; his arms are crossed sulkily on top of the gold rim; one cheek puffed out, glaring sideways with narrowed eyes, lips pouting; a small zigzag jealousy mark near his head",
   "keeps sulking jealously in a loop: he huffs, puffs his cheek bigger, turns his head away and glares sideways again, taps his fingers on his crossed arm", "jealous sulky face"),
 "gian": ("rgXJKZSxtc", "red", "angry red face with a red anger mark",
   "he is FURIOUS and bursts OUT of the round medallion toward the viewer: his head, shoulders and both arms come forward through and over the gold rim, his head and hands overlap and cover parts of the gold ring; one hand grips the gold rim, the other is a clenched fist raised beside his cheek; face red, eyebrows sharply down, mouth open in an angry shout showing a little teeth; a small red anger mark near his temple and two small puffs of steam above his head",
   "keeps raging in a loop: he shakes his raised fist, stamps his other hand on the gold rim, huffs and shouts with a red face, his head shakes left and right, the steam puffs above his head puff and grow, the red anger mark pulses", "sulky angry frown and closed mouth"),
 "lo": ("s7I4xYwl8e", "orange", "worried face with raised eyebrows and a sweat drop",
   "he is WORRIED and leans anxiously OUT of the round medallion toward the viewer: his head, shoulders and both arms come forward over the gold rim, his head and hands overlap and cover parts of the gold ring; both hands clutch the gold rim nervously, fingers fidgeting; eyebrows raised and knitted, mouth a wobbly worried line, eyes darting; a small sweat drop on his temple",
   "keeps fretting in a loop: he glances nervously left and right, fidgets his fingers on the gold rim, bites his lip, the sweat drop trickles", "worried face"),
 "muu": ("lJt9j0Tgv9", "teal", "sly scheming face with a smirk and a hand on his chin",
   "he is SCHEMING and leans slyly OUT of the round medallion toward the viewer: his head, shoulders and both arms come forward over the gold rim, his head and hands overlap and cover parts of the gold ring; one finger taps his chin thoughtfully, the other hand's fingers drum on the gold rim; sly half-closed eyes, one eyebrow raised, a cunning smirk; a tiny glint sparkle in one eye",
   "keeps plotting in a loop: he taps his chin, drums his fingers on the gold rim, narrows his eyes and smirks wider, the tiny glint sparkles", "sly smirk"),
 "so": ("cpSon5s0eP", "purple", "frightened face with wide eyes, open mouth, blue fear lines and a sweat drop",
   "he is TERRIFIED and jerks OUT of the round medallion toward the viewer: his head, shoulders and both arms come forward over the gold rim, his head and hands overlap and cover parts of the gold ring; both hands raised up at his mouth in fright; eyes wide, mouth open in a gasp, trembling; small blue fear lines above his head and a sweat drop",
   "keeps trembling in fear in a loop: he shivers, his hands tremble at his mouth, he flinches and glances around, the blue fear lines wiggle", "frightened face"),
 "an": ("rgXJKcbxtc", "grey misty", "faceless dark grey shadow silhouette of the man (topknot and cap shape only, no face) and a grey question mark",
   "the faceless dark grey SHADOW silhouette of the man (only a soft shadow shape with topknot and cap, NO face, no features) leans mysteriously OUT of the misty grey medallion toward the viewer: his shadow head, shoulders and both shadow arms come over the gold rim, covering parts of the gold ring; one shadow hand raises a finger in front of where his lips would be in a secretive 'shh' gesture, the other shadow hand rests on the rim; wisps of grey fog spill over the rim; a grey question mark floats beside his head",
   "stays mysterious in a loop: the shadow figure sways slowly, keeps the secretive 'shh' finger, grey fog wisps curl over the rim, the question mark bobs and fades in and out", "faceless misty shadow with the question mark"),
}
def A(k):
    r, med, face, *_ = S[k]
    if k == "an":
        return ("Exactly the reference picture: same soft hand-painted storybook style, same round gold-rimmed grey misty medallion full of soft grey clouds, "
                "same faceless dark grey shadow silhouette of a man with topknot and small cap (no face, no features) and the same grey question mark, "
                "everything kept INSIDE the round medallion as in the reference, but the medallion drawn a bit smaller and centred so there is empty space around it. "
                "Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.")
    return (f"Exactly the reference picture: same mature man, same soft hand-painted storybook style, same {face}, {LOOK}, same round gold-rimmed {med} medallion, "
            "everything kept INSIDE the round medallion as in the reference, but the medallion drawn a bit smaller and centred so there is empty space around it. "
            "Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.")
def B(k):
    r, med, face, burst, *_ = S[k]
    if k == "an":
        return (f"Same soft hand-painted storybook style, same round gold-rimmed grey misty medallion full of soft grey clouds as the reference. NEW: {burst}. "
                "The medallion stays round and centred, a bit smaller, with the shadow popping out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.")
    return (f"Same mature man, same soft hand-painted storybook style, {LOOK}, same round gold-rimmed {med} medallion as the reference. NEW: {burst}. "
            "The medallion stays round and centred, a bit smaller, with him popping out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.")
H = "Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. "
def OUT(k):
    burst = S[k][3].split(": ", 1)[1]
    return H + f"The man inside the round gold medallion leans forward and bursts out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out and act the feeling: {burst}. Smooth, cartoon-like, playful, same painted style, no camera move, no new objects."
def LOOP(k):
    return H + f"The man leaning out of the round gold medallion {S[k][4]}; then he settles back to exactly the starting pose. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects."
def BACK(k):
    return H + f"The man leaning out of the round gold medallion calms, lowers his hands, lets go of the gold rim, pulls his arms back and slowly slides back inside the round medallion, shrinking back into it, until he is again only a face inside the round frame with a {S[k][5]}, exactly like the end frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects."
if __name__ == "__main__":
    out = {k: {"ref": S[k][0], "A": A(k), "B": B(k), "OUT": OUT(k), "LOOP": LOOP(k), "BACK": BACK(k)} for k in S}
    json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
