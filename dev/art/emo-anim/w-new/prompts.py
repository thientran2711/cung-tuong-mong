#!/usr/bin/env python3
"""emo-anim women set, 11 new feelings: keyframe + clip prompts (recipe dev/handover/briefs/emo-anim-mass.md, giận pilot Xm9fz3fBfo wording)."""
import json
HAIR = "same dark hair in soft buns, same gold hairpin with dangling pearls, same pink flower, same pale cream robe collar"
S = {  # key: (disc, A face, B burst, OUT action, LOOP action, BACK start, BACK end face)
 "tutin": ("warm amber-gold", "same confident face: chin slightly raised, calm self-assured closed-mouth smile, half-lidded proud eyes, one small gold sparkle near her cheek",
   "she is CONFIDENT and proud: one hand rests elegantly on the gold rim, the other hand is placed proudly flat on her chest, chin raised, a calm self-assured closed-mouth smile, half-lidded proud eyes looking at the viewer, one small gold sparkle near her cheek",
   "she lifts her chin proudly: she leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out, one hand rests elegantly on the gold rim, the other is placed proudly on her chest, a self-assured smile, a small gold sparkle twinkles",
   "she keeps showing her confidence in a loop: she raises her chin a little higher, gives a proud little nod, pats her chest lightly, her eyes half-close with a pleased smile, the small gold sparkle twinkles",
   "she gives one last proud little nod, lowers the hand from her chest, lets go of the gold rim", "a calm confident smile"),
 "hanghai": ("bright spring green", "same energized face: wide bright eyes, big determined open smile, one small fist raised by her cheek, two tiny energy lines",
   "she is FULL OF ENERGY: both small fists pumped up in front of her shoulders with determination, one fist over the gold rim, wide bright eyes, big determined open smile, two tiny energy lines beside her head",
   "she fires up with energy: she leans forward and bursts out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out and pump both small fists up with determination, a big eager smile, tiny energy lines pop",
   "she keeps cheering herself on in a loop: she pumps both fists up and down, bounces her shoulders eagerly, nods with a big determined smile, the tiny energy lines flicker",
   "she gives one last eager fist pump, lowers both fists", "an energized open smile"),
 "tinhtu": ("soft rose pink", "same flirty face: shy coy smile, eyes glancing sweetly sideways (both eyes the same direction), deep blush, one tiny pink heart near her cheek",
   "she is FLIRTY and coy: one hand shyly touches her blushing cheek, the other hand rests on the gold rim with fingertips twirling a lock of her hair, a coy sweet smile, eyes glancing sweetly sideways (both eyes looking together the same way), deep pink blush, two tiny pink hearts floating",
   "she feels flirty: she leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out, one hand shyly touches her blushing cheek, the other twirls a lock of hair on the rim, a coy glance, tiny pink hearts float up",
   "she keeps flirting shyly in a loop: she twirls the lock of hair, tilts her head coyly side to side, glances sweetly sideways and back, her blush deepens, the tiny pink hearts float and bob",
   "she gives one last coy glance, the little hearts fade away, she lowers her hands", "a shy coy smile and blushing cheeks"),
 "chuyentam": ("warm cream-beige", "same focused face: calm concentrated look, eyes lowered and steady, lips pressed in a small serious line, brows slightly knitted",
   "she is deeply FOCUSED: both hands hold a small open book resting on the gold rim in front of her, she reads it intently, eyes lowered and steady on the page, lips pressed in a small serious line, brows slightly knitted with focus, no effects",
   "she concentrates: she leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out holding a small open book on the gold rim, her eyes lower to the page, a serious focused look",
   "she keeps reading with full focus in a loop: her eyes move slowly along the lines, she turns one page with a fingertip, nods slightly, her brows knit in concentration",
   "she closes the small book, lowers it away", "a calm focused face with lowered eyes"),
 "hungkhoi": ("warm orchid magenta-pink", "same inspired face: delighted bright eyes looking up, little open-mouthed 'ah!' smile, small gold sparkles and a tiny glowing star above her head",
   "she is INSPIRED, an idea strikes: one hand raised high with the index finger pointing up, the other hand clasped at her chest over the gold rim, delighted bright eyes looking up, little open-mouthed 'ah!' smile, a tiny glowing star and a few small gold sparkles above her head",
   "an idea strikes her: she leans forward and bursts out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out, one finger shoots up in the air, the other hand clasps at her chest, an 'ah!' smile, a tiny star glows above her",
   "she keeps glowing with inspiration in a loop: she wiggles her raised finger, her eyes sparkle looking up, she bounces happily, the tiny star glows brighter and the gold sparkles twinkle",
   "she lowers her raised finger, unclasps her hand", "a delighted inspired 'ah!' smile"),
 "tinhnghich": ("warm peach-apricot", "same playful face: mischievous grin, one eye winking, tip of tongue poking out, one finger near her cheek",
   "she is PLAYFUL and teasing: one fingertip pulls down her lower eyelid in a cheeky 'bleh' face with the tip of her tongue poking out, the other hand waves cheekily over the gold rim, one eye winking, mischievous grin",
   "she gets playful: she leans forward and bursts out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out, one fingertip pulls down her lower eyelid, she sticks out the tip of her tongue, her other hand waves cheekily",
   "she keeps teasing playfully in a loop: she wiggles her head side to side with her tongue out, waves her cheeky hand, winks, giggles with a mischievous grin",
   "she giggles one last time, pulls her tongue in, lowers her hands", "a mischievous winking grin"),
 "hothen": ("dusky mauve-pink", "same embarrassed face: looking down and away, strong red blush, small wobbly mouth, one sweat drop, shoulders hunched",
   "she is deeply EMBARRASSED: both hands cover her hot red cheeks, peeking shyly through her fingers, shoulders hunched over the gold rim, strong red blush across cheeks and nose, small wobbly mouth, one sweat drop, three tiny embarrassed lines",
   "she feels embarrassed: she leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out and both hands fly up to cover her blushing cheeks, she peeks through her fingers, a sweat drop appears",
   "she stays embarrassed in a loop: she hides her face behind her hands, peeks out through her fingers, hides again, shakes her head shyly, her blush glows red, the sweat drop wobbles",
   "she slowly lowers her hands from her blushing face", "an embarrassed face looking away with red cheeks"),
 "chan": ("dull grey-taupe", "same bored face: heavy half-closed droopy eyelids, flat bored mouth, cheek resting on one hand, a tiny sigh puff",
   "she is BORED: her forearms lie limp over the gold rim, her cheek sags on one hand, the other hand's fingers drum lazily on the rim, heavy half-closed droopy eyelids, flat bored mouth, a tiny sigh puff",
   "she grows bored: she slowly slumps forward and droops out of the round frame toward the viewer, her head and shoulders sag past the gold rim, her arms flop out over the rim, she rests her cheek on one hand, a tiny sigh puff",
   "she stays bored in a slow loop: she lets out a long sigh, her fingers drum lazily on the rim, her heavy eyelids droop, her head slides lower on her hand, the tiny sigh puff appears and fades",
   "she gives one last lazy sigh, lifts her cheek from her hand", "a bored face with droopy eyelids, cheek on her hand"),
 "khochiu": ("murky mustard-khaki", "same uncomfortable face: grimacing, one eye squinting, brows pinched, mouth crooked sideways, a small sweat drop, tugging her collar with one hand",
   "she is UNCOMFORTABLE: one hand tugs at her robe collar, the other hand fans her face, grimacing, one eye squinting, brows pinched, mouth crooked sideways in discomfort, a small sweat drop, a tiny wavy squiggle above her head",
   "she feels uncomfortable: she leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out, one hand tugs at her collar, the other fans her face, she grimaces, a sweat drop appears",
   "she stays uncomfortable in a loop: she tugs her collar, fans herself quickly, squirms her shoulders, grimaces and squints, the sweat drop slides down",
   "she gives one last uncomfortable squirm, lowers her fanning hand", "a grimacing uncomfortable face, hand at her collar"),
 "choang": ("dusky slate grey-blue", "same dazed face: dizzy spiral swirl eyes, wobbly open mouth, head slightly tilted, three tiny stars circling above her head",
   "she is DAZED and dizzy: one hand holds her forehead, the other hand grips the gold rim to steady herself, dizzy spiral swirl eyes, wobbly open mouth, head tilted, three tiny stars circling above her head",
   "she gets dizzy: she wobbles forward and leans out of the round frame toward the viewer, her head and shoulders sway past the gold rim, her arms come out, one hand grabs the gold rim, the other holds her forehead, spiral eyes, tiny stars circle",
   "she stays dazed in a loop: her head sways in a slow circle, she wobbles, holds her forehead, her spiral eyes swirl, the three tiny stars keep circling above her head",
   "she shakes her head once, lowers the hand from her forehead, lets go of the gold rim", "a dazed face with spiral eyes"),
 "hon": ("dusty plum-wine", "same sulking face: cheeks puffed, pouting lips, eyes closed, head turned slightly away with chin up, arms crossed at her chest",
   "she is SULKING: both arms crossed tightly on top of the gold rim, chin up, head turned away, eyes shut, cheeks puffed, pouting lips, a small grey huff puff by her mouth",
   "she starts to sulk: she leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out and cross tightly on top of the rim, she turns her chin up and away, puffs her cheeks, a small huff puff",
   "she keeps sulking in a loop: she huffs, turns her head further away with her chin up, peeks back with one eye, then turns away again, her crossed arms tighten, a small huff puff appears and fades",
   "she gives one last sulky huff, uncrosses her arms off the rim", "a sulking pouting face with arms crossed"),
}
def prompts(k):
    col, face, B, out, loop, back, endface = S[k]
    return {
     "A": f"Exactly the reference picture: same girl, same soft hand-painted storybook style, {face}, {HAIR}, same round gold-rimmed {col} medallion, everything kept INSIDE the round medallion as in the reference, but the medallion drawn a bit smaller and centred so there is empty space around it. Both eyes look together in the same direction. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.",
     "B": f"Same girl, same soft hand-painted storybook style, same face, {HAIR}, same round gold-rimmed {col} medallion as the reference. NEW: she bursts OUT of the round medallion toward the viewer: her head, shoulders and both arms come forward through and over the gold rim, her head and hands overlap and cover parts of the gold ring; {B}; sleeves of a pale pink hanfu robe visible; the face shows the feeling strongly; both eyes symmetrical, looking together. The medallion stays round and centred, a bit smaller, with her popping out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.",
     "out": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The little girl inside the round gold medallion: {out}. Smooth, cartoon-like, playful, same painted style, no camera move, no new objects.",
     "loop": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The little girl leaning out of the round gold medallion {loop}; then she settles back to exactly the starting pose. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects.",
     "back": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The little girl leaning out of the round gold medallion calms: {back}, pulls her arms back and slowly slides back inside the round medallion, shrinking back into it, until she is again only a face inside the round frame with {endface}, exactly like the end frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects.",
    }
ALL = {k: prompts(k) for k in S}
if __name__ == "__main__":
    import os as _os, sys; sys.path.insert(0, _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "..")); import seal_gate as _SG; import seal_ear as _SE  # F15 NOEAR (owner Lượt 1037): women seals = no earrings + bare-earlobes sentence  # A24 seal gate: FAIL = exit 1, no prompts printed = no gen
    print(json.dumps(_SG.guard(_SE.ear(ALL), "w-new"), ensure_ascii=False, indent=1))
