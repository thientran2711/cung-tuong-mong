#!/usr/bin/env python3
"""emo-anim young men set (m-): keyframe + clip prompts (recipe dev/handover/briefs/emo-anim-mass.md, copied from the giận pilot
Xm9fz3fBfo: still 8aiu4N6IrU, burst DoOmUsIpcl, clips KLpSVYAkqp / aFG5Z3YfSh / Lw8yCA7swO, 'she' -> 'he', HIS seal's look).
  python3 prompts.py            -> JSON {key: {A, B, out, loop, back}}"""
import json
HAIR = "same dark hair in a high topknot with the small gold crown and gold hairpin, same pale robe collar"
S = {  # key: (disc colour, face in the still, B: burst action, out action, loop action, back action, back end face)
 "vui": ("warm yellow", "same happy open smile",
   "he is overjoyed: one hand waves happily high beside his head, the other hand rests on the gold rim, big bright open smile, sparkling eyes, two or three small gold sparkles around him",
   "he lights up with joy: he leans forward and bursts out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, one hand rests on the gold rim, the other waves happily beside his head, a big open laugh, small sparkles pop",
   "he keeps waving happily in a loop: his raised hand waves left and right, his head bobs with laughter, his shoulders bounce, the small sparkles twinkle",
   "his laughter softens into a warm smile, he lowers his waving hand, lets go of the gold rim", "a happy open smile"),
 "binh": ("soft sage green", "same calm gentle smile",
   "he is calm and content: both forearms rest relaxed and crossed on top of the gold rim, his chin lightly near his hands, a soft peaceful smile, eyes gently half-closed, a small floating leaf beside him",
   "he leans forward calmly and comes out of the round frame toward the viewer, his head and shoulders past the gold rim, he rests both forearms relaxed on top of the gold rim, a soft peaceful smile",
   "he stays calm and content in a gentle loop: a slow peaceful breath, he tilts his head softly side to side, his fingers tap lightly on the rim once, his eyes close and open slowly, the small leaf drifts",
   "he gives a slow content breath, lifts his forearms off the gold rim", "a calm gentle smile"),
 "buon": ("pale blue", "same sad drooping eyes and small frown",
   "he is sad: both arms come forward over the gold rim, his cheek rests sadly on one hand, the other hand hangs limply over the rim, eyes downcast, small frown, a tiny sigh puff",
   "he grows sad: he slowly leans forward and droops out of the round frame toward the viewer, his head and shoulders past the gold rim, his arms come out over the rim, he rests his cheek sadly on one hand, eyes downcast",
   "he stays sad in a slow loop: he sighs heavily, his shoulders rise and fall, his head sinks a little on his hand, his free hand slowly traces the gold rim, a small sigh puff appears and fades",
   "he gives one last sigh, lifts his cheek from his hand, lets go of the gold rim", "a sad droopy face"),
 "dau": ("deep blue", "same crying face with streaming tears",
   "he is heartbroken and bawling: his head and shoulders lean out over the gold rim, both hands are loose fists rubbing tears from his eyes, mouth open in a wail, small blue tears flying",
   "he breaks down crying: he leans forward and bursts out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, he rubs his eyes with both fists, mouth open in a wail, small tears fly",
   "he keeps bawling in a loop: he rubs his eyes with both fists, his shoulders shake with sobs, his head tilts back and forward with each wail, small tears spring out and fall",
   "his sobs slow down, he lowers his fists from his eyes, lets go of the gold rim", "a crying face with tears"),
 "ghen": ("green", "same jealous sideways glare and puffed cheek",
   "he is jealous and sulking: his arms come forward and cross tightly on top of the gold rim, his cheeks puffed in a pout, a jealous sideways glare, one hand tugging his sleeve, a small dark scribble sulk mark beside his head",
   "he grows jealous: he leans forward and bursts out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out and cross tightly on top of the rim, cheeks puff into a pout, sideways glare",
   "he keeps sulking jealously in a loop: he pouts and puffs his cheeks, glares sideways and turns his head away with a huff, then glances back again, his crossed arms tighten on the rim",
   "he gives one last jealous huff, uncrosses his arms, lets go of the gold rim", "a jealous sideways glare with a puffed cheek"),
 "gian": ("red", "same angry red face and red anger mark",
   "he is FURIOUS: his head, shoulders and both arms come forward over the gold rim; one hand grips the gold rim, the other is a clenched fist raised beside his cheek; eyebrows sharply down, mouth open in an angry shout showing a little teeth; a small red anger mark near his temple and two small puffs of steam above his head",
   "he grows furious: he leans forward and bursts out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, one hand grabs the gold rim, the other clenches into a fist beside his cheek, he opens his mouth in an angry shout, two small steam puffs pop above his head",
   "he keeps raging in a loop: he shakes his raised fist, stamps his other hand on the gold rim, huffs and shouts with red cheeks, his head shakes left and right, the steam puffs above his head puff and grow, the red anger mark pulses",
   "he calms down a little but stays sulky: he gives one last huff, the steam puffs fade away, he lowers his fist, lets go of the gold rim", "a sulky angry frown and closed mouth"),
 "lo": ("orange", "same worried face with a sweat drop",
   "he is anxious and fretting: his head and shoulders lean out over the gold rim, both hands clasped nervously together up at his chin, fingertips fidgeting, worried raised eyebrows, wobbly mouth, one sweat drop on his temple",
   "he grows anxious: he leans forward and comes out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, he clasps both hands nervously at his chin, worried raised eyebrows, a sweat drop appears",
   "he keeps fretting in a loop: he wrings his clasped hands, glances nervously left and right, bites his lip, his shoulders hunch, the sweat drop slides down and a new one appears",
   "he takes a nervous breath, lowers his clasped hands, lets go of the gold rim", "a worried face with a sweat drop"),
 "muu": ("teal", "same sly smirk with a finger at the chin",
   "he is scheming: his head and shoulders lean out over the gold rim, one finger taps his chin thoughtfully, the other hand rubs against his fingers on the rim, a sly half-smile, narrowed side-glancing eyes, one small sparkle at his eye",
   "he hatches a plan: he leans forward and comes out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, one finger taps his chin, the other hand rests on the rim, a sly smirk and narrowed eyes",
   "he keeps scheming in a loop: he taps his finger on his chin, his eyes slide sideways slyly, his smirk widens, his other hand's fingers drum on the gold rim, a small sparkle glints at his eye",
   "he gives a last sly smirk, lowers his tapping hand to his chin, lets go of the gold rim", "a sly smirk with a finger at the chin"),
 "so": ("lavender purple", "same frightened face, pale purple cheeks and blue fear lines",
   "he is frightened: his head and shoulders lean out over the gold rim, both hands up at his open mouth, trembling, wide scared eyes, pale purple shade on his face, small blue fear lines above his head, one sweat drop",
   "he gets scared: he leans forward and bursts out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, both hands fly up to his open mouth, eyes wide with fright, blue fear lines appear",
   "he keeps trembling with fear in a loop: his hands shake at his mouth, his shoulders shiver, he flinches and glances around, the blue fear lines quiver, the sweat drop wobbles",
   "he shivers one last time, lowers his hands from his mouth, lets go of the gold rim", "a frightened face with pale purple cheeks"),
}
def prompts(k):
    col, face, B, out, loop, back, endface = S[k]
    return {
     "A": f"Exactly the reference picture: same young man, same soft hand-painted storybook style, {face}, {HAIR}, same round gold-rimmed {col} medallion, everything kept INSIDE the round medallion as in the reference, but the medallion drawn a bit smaller and centred so there is empty space around it. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.",
     "B": f"Same young man, same soft hand-painted storybook style, {HAIR}, same round gold-rimmed {col} medallion as the reference. NEW: he bursts OUT of the round medallion toward the viewer: his head, shoulders and both arms come forward through and over the gold rim, his head and hands overlap and cover parts of the gold ring; {B}; sleeves of his pale robe visible; the face shows the feeling strongly; eyes looking straight and symmetrical. The medallion stays round and centred, a bit smaller, with him popping out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.",
     "out": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The young man inside the round gold medallion: {out}. Smooth, cartoon-like, playful, same painted style, no camera move, no new objects.",
     "loop": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The young man leaning out of the round gold medallion {loop}; then he settles back to exactly the starting pose. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects.",
     "back": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The young man leaning out of the round gold medallion calms: {back}, pulls his arms back and slowly slides back inside the round medallion, shrinking back into it, until he is again only a face inside the round frame with {endface}, exactly like the end frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects.",
    }
AN = {  # hidden feeling: the still is grey smoke + '?' (no face); B: he peeks out of the smoke (face ref = his binh still)
 "A": "Exactly the first reference picture: the same round gold-rimmed medallion filled with soft swirling grey smoke and a grey question mark, same soft hand-painted storybook style, everything kept INSIDE the round medallion as in the reference, but the medallion drawn a bit smaller and centred so there is empty space around it. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.",
 "B": "Same round gold-rimmed medallion of soft swirling grey smoke as the first reference, same soft hand-painted storybook style. NEW: the young man of the second reference (same face, same dark hair in a high topknot with the small gold crown and gold hairpin, same pale robe) secretly peeks OUT of the smoke toward the viewer: his head, one shoulder and both arms come forward over the gold rim, partly covering the ring, wisps of grey smoke still curling around him; one finger raised to his lips in a playful 'shh, secret' gesture, the other hand lifting a curl of smoke like a curtain; a mysterious sly little smile, one eye winking; a small grey question mark floats beside him; eyes symmetrical. The medallion stays round and centred, a bit smaller. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.",
 "out": "Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The round gold medallion full of swirling grey smoke stirs: the smoke parts and a young man secretly leans forward and peeks out of the round frame toward the viewer, his head and shoulder push past the gold rim, his arms come out, one hand lifts the smoke like a curtain, the other raises a finger to his lips, shh, he winks with a sly smile, the question mark floats aside. Smooth, cartoon-like, playful, same painted style, no camera move, no new objects.",
 "loop": "Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The young man peeking out of the smoky round gold medallion keeps his secret in a loop: finger at his lips, he glances left and right mysteriously, winks, the grey smoke curls and swirls around him, the small question mark bobs; then he settles back to exactly the starting pose. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects.",
 "back": "Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The young man peeking out of the smoky round gold medallion gives a last sly wink, lowers his finger from his lips, lets the smoke curtain fall, pulls his arms back and slowly slides back inside the round medallion, disappearing into the swirling grey smoke, until only grey smoke and the grey question mark remain inside the round frame, exactly like the end frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects.",
}
ALL = {k: prompts(k) for k in S}
ALL["an"] = AN
if __name__ == "__main__":
    print(json.dumps(ALL, ensure_ascii=False, indent=1))
