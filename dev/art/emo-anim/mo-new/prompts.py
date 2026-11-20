#!/usr/bin/env python3
"""emo-anim MATURE MEN set (mo-), 11 new feelings: keyframe + clip prompts (recipe dev/handover/briefs/emo-anim-mass.md, giận pilot wording)."""
import json
LOOK = ("same dark brown hair in a topknot under a small black scholar cap with a gold band and a gold hairpin, same thin moustache and small pointed black goatee beard, "
        "same dark olive-black robe with gold trim and white inner collar")
S = {  # key: (disc, A face, B burst, OUT action, LOOP action, BACK start, BACK end face)
 "tutin": ("warm amber-gold", "same confident face: calm self-assured closed-mouth smile, proud eyes, one small white sparkle near his cheek",
   "he is CONFIDENT and proud: one hand rests firmly on the gold rim, the other hand proudly strokes his goatee beard, chin raised, a calm self-assured closed-mouth smile, proud half-lidded eyes looking at the viewer, one small gold sparkle near his cheek",
   "he lifts his chin proudly: he leans forward and comes out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, one hand rests firmly on the gold rim, the other proudly strokes his goatee, a self-assured smile, a small gold sparkle twinkles",
   "keeps showing his confidence in a loop: he strokes his goatee slowly, raises his chin a little higher, gives a proud little nod, his eyes half-close with a pleased smile, the small gold sparkle twinkles",
   "he gives one last proud nod, lowers the hand from his beard, lets go of the gold rim", "a calm confident smile"),
 "hanghai": ("bright spring green", "same energized face: wide bright eyes, big eager open smile, two tiny energy lines beside his head",
   "he is FULL OF ENERGY: both fists pumped up in front of his shoulders with determination, one fist over the gold rim, wide bright eyes, big eager open smile, two tiny energy lines beside his head",
   "he fires up with energy: he leans forward and bursts out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out and pump both fists up with determination, a big eager smile, tiny energy lines pop",
   "keeps cheering himself on in a loop: he pumps both fists up and down, bounces his shoulders eagerly, nods with a big determined smile, the tiny energy lines flicker",
   "he gives one last eager fist pump, lowers both fists", "an energized open smile"),
 "tinhtu": ("soft rose pink", "same flirty face: one eye winking, charming sly smile, light blush, one tiny pink heart near his cheek",
   "he is FLIRTY and charming: one hand twirls the tip of his moustache, the other hand rests on the gold rim with a little beckoning gesture, one eye winking, a charming smile, light pink blush, two tiny pink hearts floating",
   "he feels flirty: he leans forward and comes out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, one hand twirls his moustache, the other beckons on the rim, he winks, tiny pink hearts float up",
   "keeps flirting in a loop: he twirls the tip of his moustache, winks, tilts his head charmingly side to side, beckons with his fingers, the tiny pink hearts float and bob",
   "he gives one last wink, the little hearts fade away, he lowers his hands", "a winking charming smile"),
 "chuyentam": ("warm cream-yellow", "same focused face: calm concentrated look, brows knitted, eyes steady, lips pressed in a small serious line",
   "he is deeply FOCUSED: both hands hold a small open book resting on the gold rim in front of him, he reads it intently, eyes lowered and steady on the page, lips pressed in a serious line, brows knitted with focus, no effects",
   "he concentrates: he leans forward and comes out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out holding a small open book on the gold rim, his eyes lower to the page, a serious focused look",
   "keeps reading with full focus in a loop: his eyes move slowly along the lines, he turns one page with a fingertip, nods slightly, his brows knit in concentration",
   "he closes the small book, lowers it away", "a calm focused face with knitted brows"),
 "hungkhoi": ("warm orchid magenta-pink", "same inspired face: delighted bright eyes looking up, big open-mouthed smile, small gold sparkles around his head",
   "he is INSPIRED, an idea strikes: one hand raised high with the index finger pointing up, the other hand on his chest over the gold rim, delighted bright eyes looking up, big open-mouthed 'ah!' smile, a tiny glowing star and a few small gold sparkles above his head",
   "an idea strikes him: he leans forward and bursts out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, one finger shoots up in the air, the other hand on his chest, an 'ah!' smile, a tiny star glows above him",
   "keeps glowing with inspiration in a loop: he wiggles his raised finger, his eyes sparkle looking up, he bounces happily, the tiny star glows brighter and the gold sparkles twinkle",
   "he lowers his raised finger and his other hand", "a delighted inspired open smile"),
 "tinhnghich": ("warm peach-apricot", "same playful face: one eye winking, cheeky grin with the tip of the tongue poking out",
   "he is PLAYFUL and teasing: both thumbs at his temples with fingers wiggling like antlers in a cheeky 'bleh' face, tip of his tongue poking out, one eye winking, mischievous grin",
   "he gets playful: he leans forward and bursts out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, he puts both thumbs at his temples and wiggles his fingers, sticks out the tip of his tongue and winks",
   "keeps teasing playfully in a loop: he wiggles his fingers at his temples, wobbles his head side to side with his tongue out, winks, giggles with a mischievous grin",
   "he giggles one last time, pulls his tongue in, lowers his hands", "a mischievous winking grin with the tongue tip out"),
 "hothen": ("dusky mauve-pink", "same embarrassed face: eyes looking down and away, strong red blush, small wobbly mouth, one sweat drop",
   "he is deeply EMBARRASSED: one hand covers half his blushing face, the other hand scratches the back of his head awkwardly, peeking shyly through his fingers, strong red blush across his cheeks, small wobbly mouth, one sweat drop, three tiny embarrassed lines",
   "he feels embarrassed: he leans forward and comes out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, one hand flies up to cover his blushing face, the other scratches the back of his head, a sweat drop appears",
   "stays embarrassed in a loop: he hides his face behind his hand, peeks out through his fingers, hides again, scratches the back of his head awkwardly, his blush glows red, the sweat drop wobbles",
   "he slowly lowers his hands from his blushing face", "an embarrassed face looking away with red cheeks"),
 "chan": ("dull grey-taupe", "same bored face: heavy half-closed droopy eyelids, flat bored mouth, a tiny sigh puff beside his mouth",
   "he is BORED: his forearms lie limp over the gold rim, his cheek sags on one hand, the other hand's fingers drum lazily on the rim, heavy half-closed droopy eyelids, flat bored mouth, a tiny sigh puff",
   "he grows bored: he slowly slumps forward and droops out of the round frame toward the viewer, his head and shoulders sag past the gold rim, his arms flop out over the rim, he rests his cheek on one hand, a tiny sigh puff",
   "stays bored in a slow loop: he lets out a long sigh, his fingers drum lazily on the rim, his heavy eyelids droop, his head slides lower on his hand, the tiny sigh puff appears and fades",
   "he gives one last lazy sigh, lifts his cheek from his hand", "a bored face with droopy eyelids"),
 "khochiu": ("murky mustard-khaki", "same uncomfortable face: grimacing, one eye squinting, brows pinched, mouth crooked sideways, small sweat drops",
   "he is UNCOMFORTABLE: one hand tugs at his robe collar, the other hand fans his face, grimacing, one eye squinting, brows pinched, mouth crooked sideways in discomfort, a small sweat drop, a tiny wavy squiggle above his head",
   "he feels uncomfortable: he leans forward and comes out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out, one hand tugs at his collar, the other fans his face, he grimaces, a sweat drop appears",
   "stays uncomfortable in a loop: he tugs his collar, fans himself quickly, squirms his shoulders, grimaces and squints, the sweat drop slides down",
   "he gives one last uncomfortable squirm, lowers his fanning hand", "a grimacing uncomfortable face"),
 "choang": ("dusky slate grey-blue", "same dazed face: dizzy spiral swirl eyes, wobbly open mouth, three tiny gold stars circling above his head",
   "he is DAZED and dizzy: one hand holds his forehead, the other hand grips the gold rim to steady himself, dizzy spiral swirl eyes, wobbly open mouth, head tilted, three tiny gold stars circling above his head",
   "he gets dizzy: he wobbles forward and leans out of the round frame toward the viewer, his head and shoulders sway past the gold rim, his arms come out, one hand grabs the gold rim, the other holds his forehead, spiral eyes, tiny stars circle",
   "stays dazed in a loop: his head sways in a slow circle, he wobbles, holds his forehead, his spiral eyes swirl, the three tiny stars keep circling above his head",
   "he shakes his head once, lowers the hand from his forehead, lets go of the gold rim", "a dazed face with spiral eyes"),
 "hon": ("deep plum-wine red", "same sulking face: narrowed eyes glancing sideways, pouting mouth, cheeks slightly puffed",
   "he is SULKING: both arms crossed tightly on top of the gold rim, chin up, head turned away, narrowed eyes glancing sideways, cheeks puffed, pouting mouth, a small grey huff puff by his mouth",
   "he starts to sulk: he leans forward and comes out of the round frame toward the viewer, his head and shoulders push past the gold rim, his arms come out and cross tightly on top of the rim, he turns his chin up and away, puffs his cheeks, a small huff puff",
   "keeps sulking in a loop: he huffs, turns his head further away with his chin up, peeks back with a narrowed sideways glance, then turns away again, his crossed arms tighten, a small huff puff appears and fades",
   "he gives one last sulky huff, uncrosses his arms off the rim", "a sulking face with a narrowed sideways glance"),
}
def prompts(k):
    col, face, B, out, loop, back, endface = S[k]
    return {
     "A": f"Exactly the reference picture: same mature man, same soft hand-painted storybook style, {face}, {LOOK}, same round gold-rimmed {col} medallion, everything kept INSIDE the round medallion as in the reference, but the medallion drawn a bit smaller and centred so there is empty space around it. Both eyes look together in the same direction. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.",
     "B": f"Same mature man, same soft hand-painted storybook style, same face, {LOOK}, same round gold-rimmed {col} medallion as the reference. NEW: he bursts OUT of the round medallion toward the viewer: his head, shoulders and both arms come forward through and over the gold rim, his head and hands overlap and cover parts of the gold ring; {B}; sleeves of his dark olive-black robe with gold trim visible; the face shows the feeling strongly; both eyes symmetrical, looking together. The medallion stays round and centred, a bit smaller, with him popping out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.",
     "out": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The man inside the round gold medallion: {out}. Smooth, cartoon-like, playful, same painted style, no camera move, no new objects.",
     "loop": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The man leaning out of the round gold medallion {loop}; then he settles back to exactly the starting pose. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects.",
     "back": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The man leaning out of the round gold medallion calms: {back}, pulls his arms back and slowly slides back inside the round medallion, shrinking back into it, until he is again only a face inside the round frame with {endface}, exactly like the end frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects.",
    }
ALL = {k: prompts(k) for k in S}
if __name__ == "__main__":
    import os as _os, sys; sys.path.insert(0, _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "..")); import seal_gate as _SG; import seal_ear as _SE  # F15 NOEAR (owner Lượt 1037): women seals = no earrings + bare-earlobes sentence  # A24 seal gate: FAIL = exit 1, no prompts printed = no gen
    print(json.dumps(_SG.guard(_SE.ear(ALL), "mo-new"), ensure_ascii=False, indent=1))
