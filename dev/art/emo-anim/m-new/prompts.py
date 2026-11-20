#!/usr/bin/env python3
"""emo-anim young men set (m-), new seals (feelings + acts). Template = dev/art/emo-anim/m/prompts.py.
  python3 prompts.py -> JSON {key:{A,B,out,loop,back}}"""
import json, sys
HAIR = "same dark hair in a high topknot with the small gold crown and gold hairpin, same pale robe collar"
S = {  # key: (disc colour, still face, B action, out action, loop action, back action, back end face)
 "tutin": ("warm orange-gold", "same confident calm smile with one small gold sparkle",
   "he is CONFIDENT and proud: one hand rests firmly on the gold rim, the other hand gives a proud thumbs-up beside his chest, chin lifted, a self-assured grin, bright steady eyes, one small gold sparkle by his head",
   "he fills with confidence: he leans forward and comes out of the round frame toward the viewer, his head and shoulders push past the gold rim, one hand rests firmly on the rim, the other gives a proud thumbs-up, chin lifts with a self-assured grin, a small sparkle twinkles",
   "he keeps showing off proudly in a loop: he lifts his chin, gives a little nod, his thumbs-up hand taps his chest once and points up again, a self-assured grin, the small sparkle twinkles",
   "he gives one last proud nod, the sparkle fades, he lowers his thumbs-up hand, lets go of the gold rim", "a confident calm smile"),
 "hanghai": ("lime green", "same eager open-mouthed excited smile with small energy lines",
   "he is ENERGIZED and eager: he rolls up one sleeve, both fists pumped up eagerly in front of his chest over the gold rim, big determined open grin, bright wide eyes, a few small energy lines around him",
   "he bursts with energy: he leans forward and bursts out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out and both fists pump up eagerly, a big determined grin, small energy lines pop",
   "he keeps pumping himself up in a loop: both fists pump up and down eagerly, his shoulders bounce, he nods with a big determined grin, the small energy lines flicker",
   "he gives one last eager fist pump, the energy lines fade, he lowers his fists", "an eager excited open smile"),
 "tinhtu": ("soft pink", "same flirty wink and soft smile with a tiny pink heart",
   "he is FLIRTY: one hand blows a kiss from his lips, the other hand rests lightly on the gold rim, a playful wink, soft charming smile, rosy cheeks, one tiny pink heart floating near his hand",
   "he turns flirty: he leans forward and comes out of the round frame toward the viewer, his head and shoulders push past the gold rim, one hand rests lightly on the rim, the other brings his fingers to his lips and blows a kiss with a wink, a tiny pink heart floats out",
   "he keeps flirting in a loop: he winks, blows another kiss from his fingertips, tilts his head with a charming smile, the tiny pink heart floats up gently and bobs",
   "he gives one last charming smile, the little heart fades, he lowers his hand, lets go of the gold rim", "a flirty wink and soft smile"),
 "chuyentam": ("pale yellow", "same focused serious face with steady eyes",
   "he is deeply FOCUSED: both forearms rest on the gold rim, he holds an open bamboo book scroll in both hands reading it intently, brows slightly knit, serious steady eyes on the scroll, closed mouth, no effects",
   "he becomes absorbed in work: he leans forward and comes out of the round frame toward the viewer, his head and shoulders past the gold rim, his arms come out and rest on the rim holding an open bamboo scroll, he reads it intently with knit brows",
   "he keeps reading with full focus in a loop: his eyes move along the scroll, he nods slightly, one finger follows the lines, he barely blinks, serious and calm",
   "he finishes reading, rolls up the bamboo scroll and lowers it, lifts his forearms off the gold rim", "a focused serious face"),
 "hungkhoi": ("magenta pink", "same inspired delighted open smile with gold sparkles",
   "he is INSPIRED: one hand raises a calligraphy brush high with a sudden idea, the other hand grips the gold rim, wide sparkling eyes, delighted open smile, three small gold sparkles around the brush",
   "he is struck by inspiration: he leans forward and bursts out of the round frame toward the viewer, his head and shoulders push past the gold rim, one hand grips the rim, the other raises a calligraphy brush high with a sudden idea, eyes sparkle, small gold sparkles pop",
   "he keeps creating with joy in a loop: he sweeps the calligraphy brush through the air in a flowing stroke, his eyes sparkle, he smiles delighted, the small gold sparkles twinkle around the brush",
   "he gives one last delighted flourish of the brush, the sparkles fade, he lowers the brush, lets go of the gold rim", "an inspired delighted open smile"),
 "tinhnghich": ("peach", "same playful wink with tongue out",
   "he is PLAYFUL and mischievous: both hands by his head with thumbs at his temples wiggling his fingers teasingly, cheeky wink, tongue poking out, grin, no effects",
   "he turns playful: he leans forward and bursts out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, he puts his thumbs at his temples and wiggles his fingers teasingly, winks and pokes out his tongue",
   "he keeps teasing in a loop: he wiggles his fingers by his head, sways his head side to side, winks and sticks out his tongue, cheeky grin",
   "he gives one last cheeky grin, lowers his teasing hands", "a playful wink with tongue out"),
 "hothen": ("dusty rose", "same embarrassed blushing face with wavy mouth and sweat drop",
   "he is EMBARRASSED: both hands come up and half cover his blushing face, peeking through his fingers, deep red blush, wavy embarrassed mouth, eyes looking away, one small sweat drop",
   "he grows embarrassed: he leans forward and comes out of the round frame toward the viewer, his head and shoulders past the gold rim, his arms come out and both hands rise to half cover his deeply blushing face, he peeks through his fingers, a small sweat drop appears",
   "he stays embarrassed in a loop: he hides his blushing face behind his hands, peeks out through his fingers, hides again, shakes his head a little, the blush glows, the sweat drop wobbles",
   "he slowly lowers his hands from his blushing face, the sweat drop fades", "an embarrassed blushing face"),
 "chan": ("taupe grey", "same bored half-lidded face with a sigh puff",
   "he is BORED: both forearms slump over the gold rim, his cheek squished lazily on one palm, the other hand dangles limply over the rim, half-lidded bored eyes, flat mouth, a small sigh puff",
   "he grows bored: he slowly slumps forward out of the round frame toward the viewer, his head and shoulders sag past the gold rim, his arms flop over the rim, he squishes his cheek lazily on one palm, half-lidded eyes, a sigh puff",
   "he stays bored in a slow loop: he lets out a long sigh, his fingers drum slowly on the rim, his head slides lower on his palm, he yawns once, the sigh puff drifts and fades",
   "he gives one last bored sigh, lifts his head off his palm, lets go of the gold rim", "a bored half-lidded face"),
 "khochiu": ("olive", "same uncomfortable grimace with one eye squeezed and a sweat drop",
   "he is UNCOMFORTABLE and irritated: one hand tugs at his tight robe collar, the other fans his face, grimace with gritted teeth, one eye squeezed shut, a sweat drop and two small wavy discomfort lines",
   "he grows uncomfortable: he leans forward and comes out of the round frame toward the viewer, his head and shoulders past the gold rim, his arms come out, one hand tugs at his robe collar, the other fans his face, he grimaces with gritted teeth",
   "he stays uncomfortable in a loop: he tugs his collar, fans his face quickly, squirms his shoulders, grimaces, the sweat drop slides down",
   "he gives one last uncomfortable squirm, stops fanning and lowers his hands, the sweat drop fades", "an uncomfortable grimace"),
 "choang": ("slate blue", "same dazed face with swirly spiral eyes and little stars circling his head",
   "he is DAZED and dizzy: one hand clutches his forehead, the other hand grips the gold rim to steady himself, swirly spiral eyes, small open mouth, wobbly head, small yellow stars circling his head",
   "he gets dizzy: he wobbles forward out of the round frame toward the viewer, his head and shoulders past the gold rim, one hand grabs the rim to steady himself, the other clutches his forehead, spiral eyes, little stars circle his head",
   "he stays dazed in a loop: his head wobbles in slow circles, the little stars circle around his head, he sways and holds his forehead, his spiral eyes spin",
   "he shakes his head, lowers his hand from his forehead, lets go of the gold rim, the little stars slow down", "a dazed face with spiral eyes and stars circling"),
 "hon": ("deep crimson red", "same sulky pouting face with puffed cheeks and side-glance",
   "he is SULKING: both arms crossed tightly on top of the gold rim, his head turned away with his nose up, cheeks puffed in a pout, a grumpy side-glance, a tiny dark scribble huff mark",
   "he starts sulking: he leans forward and comes out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out and cross tightly on the rim, he turns his head away with nose up, cheeks puff into a pout",
   "he keeps sulking in a loop: he turns his head away with a huff, peeks back with a grumpy side-glance, turns away again, puffs his cheeks, the small huff mark puffs",
   "he gives one last huff, the huff mark fades, he uncrosses his arms", "a sulky pouting face"),
}

def prompts(k):
    col, face, B, out, loop, back, endf = S[k]
    return {
     "A": f"Exactly the reference picture: same young man, same soft hand-painted storybook style, {face}, {HAIR}, same round gold-rimmed {col} medallion, everything kept INSIDE the round medallion as in the reference, but the medallion drawn a bit smaller and centred so there is empty space around it. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.",
     "B": f"Same young man, same soft hand-painted storybook style, {HAIR}, same round gold-rimmed {col} medallion as the reference. NEW: he bursts OUT of the round medallion toward the viewer: his head, shoulders and both arms come forward through and over the gold rim, his head and hands overlap and cover parts of the gold ring; {B}; sleeves of his pale robe visible; the face shows the feeling strongly; both eyes looking together in the same direction. The medallion stays round and centred, a bit smaller, with him popping out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.",
     "out": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The young man inside the round gold medallion: {out}. Smooth, cartoon-like, playful, same painted style, no camera move, no new objects.",
     "loop": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The young man leaning out of the round gold medallion: {loop}; then he settles back to exactly the starting pose. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects.",
     "back": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The young man leaning out of the round gold medallion: {back}, pulls his arms back and slowly slides back inside the round medallion, shrinking back into it, until he is again only {endf} inside the round frame, exactly like the end frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects.",
    }
ALL = {k: prompts(k) for k in S}
if __name__ == "__main__":
    import os as _os; sys.path.insert(0, _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "..")); import seal_gate as _SG  # A24 seal gate: FAIL = exit 1, no prompts printed = no gen
    print(json.dumps(_SG.guard(ALL if len(sys.argv) < 2 else ALL[sys.argv[1]], "m-new"), ensure_ascii=False, indent=1))
