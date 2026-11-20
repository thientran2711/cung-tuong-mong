#!/usr/bin/env python3
"""Thái hậu mood-seal set (prefix th-): prompts = th-gian.md copied exactly, only the feeling words + disc colour change.
Ref A = eIPl4i6dqL (th-gian A); B ref = that seal's own A. Seedance clips: keyframes only."""
import json, sys
WHO = ("an ELDERLY EMPRESS DOWAGER of the imperial inner palace: an old woman about seventy, kind round face with soft wrinkles at the eyes and mouth, "
       "silver-grey hair streaked with a little black, swept up into a high formal bun under a LARGE ornate gold phoenix crown with spread phoenix wings, "
       "pearl strings and red jewels (clearly grander than any consort's hairpins, nothing like a maid's single hairpin and flower), "
       "a royal yellow (#EFBD69) brocade robe with a deep plum (#6E3A5E) collar and gold embroidery at the shoulders")
SAME = ("Same elderly empress dowager, same soft hand-painted storybook style, same large gold phoenix crown with pearl strings, same silver-grey hair, "
        "same royal yellow (#EFBD69) brocade robe with deep plum (#6E3A5E) collar")
OLD = "old empress dowager in the large gold phoenix crown"
S = {  # key: (disc, A face sentence, B feeling caps, B hands+face+mark, OUT action, LOOP action, BACK start, BACK end face)
 "vui": ("warm sunny yellow",
   "Her face is HAPPY: sparkling eyes, a big open laughing smile, rosy round cheeks, three tiny gold sparkles by her crown",
   "OVERJOYED",
   "both hands raised waving happily, about to clap, wide royal yellow sleeves with plum cuffs visible; sparkling eyes, big open laughing old face, crown jewels swinging; three tiny gold sparkles above her head",
   "lights up with joy: she leans forward and bursts out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out and wave happily, she laughs with a big open smile, tiny gold sparkles appear above her crown",
   "keeps laughing happily in a loop: she waves both hands, claps them softly once, bobs her head with a big laughing smile, the pearl strings of her crown swing, the tiny gold sparkles twinkle",
   "gives one last happy wave, the sparkles fade away, she lowers her hands", "a happy laughing old face with the large phoenix crown"),
 "buon": ("pale blue",
   "Her face is SAD: droopy eyes looking down, a small trembling pout, brows tilted up in the middle, one tear on her cheek",
   "SAD and gloomy",
   "her forearms folded on the gold rim with her chin resting on her hands, wide royal yellow sleeves with plum cuffs visible; droopy eyes looking down, a pout, one tear on her wrinkled cheek, crown pearls hanging still; one tiny pale-blue raincloud above her head",
   "grows sad: she slowly leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out and fold on the rim, she rests her chin on her hands, a tear rolls down, a tiny raincloud appears above her crown",
   "stays sad in a slow loop: she sighs deeply, her droopy eyes blink slowly, a tear rolls down her cheek, her shoulders sink, the tiny raincloud drips a few drops",
   "gives one last sad sigh, the raincloud fades away, she lifts her chin off her hands", "a sad old face with droopy eyes and the large phoenix crown"),
 "so": ("lavender purple",
   "Her face is FRIGHTENED: wide eyes with tiny pupils, open trembling mouth, a pale purple tint on her face, one sweat drop, thin blue fear lines on her forehead",
   "TERRIFIED",
   "both hands up at her mouth, trembling, wide royal yellow sleeves with plum cuffs visible; wide eyes with tiny pupils, pale purple tint on the old face, one sweat drop, crown pearls shaking; gloom lines and small shiver marks around her",
   "takes a fright: she jolts forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out and both hands fly up to her mouth, her eyes go wide, a sweat drop and shiver marks appear",
   "keeps trembling in fear in a loop: she shivers, her hands quiver at her mouth, her wide eyes dart left and right together, the crown pearls shake, the shiver marks flicker",
   "gives one last shiver, the shiver marks fade away, she lowers her hands from her mouth", "a frightened old face with wide eyes and the large phoenix crown"),
}
def prompts(k):
    col, aface, caps, b, out, loop, back, endface = S[k]
    return {
     "A": f"Same soft hand-painted storybook style, same round gold-rimmed medallion and same chibi proportions as the reference, but the person is now {WHO}. The medallion disc is now {col} instead of red. {aface}. Both eyes looking together{"" if ("sideways" in aface or "wink" in aface) else " straight ahead"}. Everything kept INSIDE the round medallion, the medallion drawn a bit smaller and centred so there is empty space around it. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.",
     "B": f"{SAME}, same round gold-rimmed {col} medallion as the reference. NEW: she is {caps} and bursts OUT of the round medallion toward the viewer: her head, shoulders and both arms come forward through and over the gold rim, her head and hands overlap and cover parts of the gold ring; {b}. Both eyes looking together. The medallion stays round and centred, a bit smaller, with her popping out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.",
     "out": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The {OLD} inside the round gold medallion {out}. Smooth, cartoon-like, same painted style, no camera move, no new objects.",
     "loop": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The {OLD} leaning out of the round gold medallion {loop}; then she settles back to exactly the starting pose. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects.",
     "back": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The {OLD} leaning out of the round gold medallion {back}, pulls her arms back and slowly slides back inside the round medallion, shrinking back into it, until she is again only {endface} inside the round frame, exactly like the end frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects.",
    }

# ---- the other originals (prompts.md hands/face/mark table), same tuple shape as above ----
S.update({
 "binh": ("soft sage green",
   "Her face is CALM and serene: a soft gentle closed-mouth smile, relaxed eyes, head slightly tilted",
   "CALM and content",
   "one hand resting relaxed on the gold rim, the other giving a small friendly wave, wide royal yellow sleeves with plum cuffs visible; serene soft smile, slight head tilt; no effects",
   "feels at peace: she leans forward gently and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out, one hand rests on the rim, the other gives a small friendly wave, a serene smile",
   "stays calm in a slow loop: she waves gently, nods slowly with a serene smile, breathes calmly, the pearl strings of her crown sway softly",
   "gives one last gentle wave, lowers her hand, lifts the other off the rim", "a calm gently smiling old face with the large phoenix crown"),
 "an": ("misty grey",
   "Her face is SECRETIVE: a sly secret smile, one eye winking, one fingertip at her lips 'shh', soft grey mist wisps drifting across the medallion and one small grey question mark",
   "SECRETIVE and hiding something",
   "one hand parts a soft grey mist, the other holds one finger at her lips 'shh', wide royal yellow sleeves with plum cuffs visible; sly secret smile, one eye winking; grey mist wisps and one small grey question mark",
   "turns secretive: she leans forward and comes out of the round frame toward the viewer through soft grey mist, her head and shoulders push past the gold rim, her arms come out, one hand parts the mist, the other raises a finger to her lips 'shh', she winks, a small question mark appears",
   "keeps her secret in a loop: she holds her finger to her lips, winks with a sly smile, parts the drifting mist with her hand, the grey mist wisps swirl, the small question mark bobs",
   "gives one last 'shh', the mist and the question mark fade away, she lowers her hands", "a sly secretive old face with a finger at her lips and the large phoenix crown"),
 "dau": ("deep blue",  # owner Lượt 798/803: HEARTACHE held back, must NOT read as crying (no sobbing, no open mouth, no streams/flying tears)
   "Her face shows deep inner PAIN held back: brows knitted in pain, eyes half-lowered and glistening, ONE single tear at the corner of one eye, lips pressed tight, one hand pressed to her chest over her heart",
   "HEARTSICK, in deep pain held back",
   "one hand pressed flat to her chest over her heart, the other hand gripping the gold rim, wide royal yellow sleeves with plum cuffs visible; brows knitted in pain, eyes half-lowered and glistening, ONE single tear at the corner of one eye, lips pressed tight, mouth closed; no sobbing, no streams of tears, no flying drops",
   "feels a stab of heartache: she leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out, she presses one hand to her heart and grips the rim with the other, she winces with her lips pressed tight, one single tear forms at the corner of her eye; no sobbing, mouth stays closed",
   "keeps holding back the pain in a slow loop: she presses her hand to her heart, winces, her shoulders tense, she breathes slowly in pain with her lips pressed tight, the single tear glistens at her eye corner; no sobbing, no open mouth, no streams of tears, no flying drops",
   "gives one last slow pained breath, eases the hand from her heart, lets go of the rim", "a pained old face with knitted brows, lips pressed, one tear at the eye corner, and the large phoenix crown"),
 "ghen": ("yellow-green",
   "Her face is JEALOUS: narrowed eyes glancing sideways (both eyes looking the same way), one cheek puffed, a sour pout",
   "JEALOUS",
   "both hands tug at a pink silk handkerchief, biting its corner, wide royal yellow sleeves with plum cuffs visible; narrowed side-glance (both eyes looking the same way), puffed cheek; one tiny dark-green swirl",
   "turns jealous: she leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out and both hands tug a pink silk handkerchief, she bites its corner and glares sideways, a tiny dark-green swirl appears",
   "keeps sulking jealously in a loop: she tugs and twists the handkerchief, bites its corner, glares sideways and puffs her cheek, the tiny dark-green swirl turns",
   "gives one last jealous glare, the swirl fades away, she lets the handkerchief go, lowers her hands", "a jealous side-glancing old face with the large phoenix crown"),
 "lo": ("orange",
   "Her face is WORRIED: anxious raised brows, eyes looking up, a wavy uneasy mouth, one sweat drop",
   "WORRIED and anxious",
   "hands clasped and wringing at her chin, one fingertip nibbled, wide royal yellow sleeves with plum cuffs visible; anxious brows, eyes looking up, wavy mouth, a sweat drop; two tiny worry swirls",
   "starts to worry: she leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out, her hands clasp and wring at her chin, she nibbles a fingertip, a sweat drop and tiny worry swirls appear",
   "keeps fretting in a loop: she wrings her hands, nibbles a fingertip, glances up anxiously, the sweat drop slides, the worry swirls turn",
   "gives one last anxious sigh, the swirls fade away, she unclasps her hands", "a worried old face with a sweat drop and the large phoenix crown"),
 "muu": ("teal",
   "Her face is SCHEMING: a sly side-glance (both eyes looking the same way), one brow raised, a knowing smirk, one fingertip at her chin",
   "SCHEMING slyly",
   "one fingertip tapping her chin, the other hand drumming on the gold rim, wide royal yellow sleeves with plum cuffs visible; sly side-glance (both eyes the same way), one brow up, smirk; a tiny gold glint by her eye",
   "hatches a plan: she leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out, a fingertip taps her chin, the other hand drums on the rim, a sly smirk, a tiny glint flashes by her eye",
   "keeps scheming in a loop: she taps her chin, drums her fingers on the rim, narrows her eyes with a sly smirk, the tiny glint twinkles",
   "gives one last sly smirk, the glint fades away, she lifts her fingers off the rim and lowers her hand from her chin", "a sly scheming old face with the large phoenix crown"),
})
# ---- women-set families reused as-is (11 new feelings: w-new; 17 act faces: w-act), tuple (col, face, B, out, loop, back, endface) ----
import importlib.util as _u, os as _os
def _load(rel):
    sp = _u.spec_from_file_location(rel.replace("/", "_"), _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "..", rel, "prompts.py"))
    m = _u.module_from_spec(sp); sp.loader.exec_module(m); return m.S
W = {}
for _k, _v in _load("w-new").items(): W[_k] = _v
for _k, _v in _load("w-act").items(): W["act-" + _k] = _v
# Thái hậu is the emperor's mother: her act-tinhtu invites an honoured guest to tea, not the emperor
# owner/ROOT-57 23:46Z + ROOT-58 23:55Z: no disc colour near chroma green (the key eats it; th-hanghai disc came out semi-transparent)
for _k, _c in (("hanghai", "bright coral"), ("act-hanghai", "bright coral"), ("act-ghen", "deep jade-teal")):
    W[_k] = (_c,) + tuple(W[_k][1:])
W["act-tinhtu"] = tuple(x.replace("INVITING THE EMPEROR", "INVITING AN HONOURED GUEST TO HER TEA") for x in W["act-tinhtu"])
# SEAL6 20/11: th-act-ghen (unit 7) was MADE with disc "warm amber" (ROOT-58 first brief; his later word = deep jade-teal, read too late).
# SEAL6 20/11: the th-dau redraw sample was made as key "dau2" with hh_prompts.DAU wording (plum cuffs) and the OLD WHO line — kept for
# the record only (DAU2 below, not used by prompts()); S["dau"] above (SEAL5 wording) stays the store version.
DAU2 = ("deep blue",
  "Her face is HEARTACHED: brows tilted up in quiet sorrow, eyes glistening and looking down, lips pressed together trembling, exactly ONE single tear on one cheek, one hand pressed flat over her heart",
  "HEARTACHED in quiet pain",
  "one hand pressed flat over her heart, the other resting limp on the gold rim, wide royal yellow sleeves with plum cuffs visible; brows tilted up in quiet sorrow, glistening eyes looking down, lips pressed together, exactly one single tear on one cheek, no crying out, mouth closed; one small cracked pale-blue heart floating beside her",
  "feels a sharp ache in her heart: she slowly leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out, one hand presses flat over her heart, the other rests on the rim, her eyes glisten and one single tear rolls down, a small cracked pale-blue heart appears beside her; mouth stays closed, no wailing",
  "aches quietly in a slow loop: she presses her hand to her heart, closes her eyes for a moment and breathes in sadly, her lips tremble, the one tear glistens on her cheek, the small cracked heart pulses softly; mouth closed, no wailing",
  "gives one last quiet sigh, the cracked heart fades away, she lowers her hand from her heart", "a quietly hurt old face with one tear and the large phoenix crown")
def _strip(face): return face[5:] if face.startswith("same ") else face
def wprompts(k):
    col, face, B, out, loop, back, endface = W[k]
    return {
     "A": f"Same soft hand-painted storybook style, same round gold-rimmed medallion and same chibi proportions as the reference, but the person is now {WHO}. The medallion disc is now {col} instead of red. Her face and pose: {_strip(face)}. Both eyes looking together. Everything kept INSIDE the round medallion, the medallion drawn a bit smaller and centred so there is empty space around it. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.",
     "B": f"{SAME}, same round gold-rimmed {col} medallion as the reference. NEW: she bursts OUT of the round medallion toward the viewer: her head, shoulders and both arms come forward through and over the gold rim, her head and hands overlap and cover parts of the gold ring; {B}; wide royal yellow sleeves with plum cuffs visible; the old face shows the feeling strongly. Both eyes looking together. The medallion stays round and centred, a bit smaller, with her popping out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.",
     "out": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The {OLD} inside the round gold medallion: {out}. Smooth, cartoon-like, same painted style, no camera move, no new objects.",
     "loop": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The {OLD} leaning out of the round gold medallion {loop}; then she settles back to exactly the starting pose. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects.",
     "back": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The {OLD} leaning out of the round gold medallion calms: {back}, pulls her arms back and slowly slides back inside the round medallion, shrinking back into it, until she is again only {endface} with the large phoenix crown inside the round frame, exactly like the end frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects.",
    }
_prompts_s = prompts
def prompts(k): return _prompts_s(k) if k in S else wprompts(k)
ORDER = ["an", "binh", "dau", "ghen", "lo", "muu", "tutin", "hanghai", "tinhtu", "chuyentam", "hungkhoi", "tinhnghich", "hothen", "chan",
         "khochiu", "choang", "hon"] + ["act-" + k for k in ["buon", "chan", "choang", "chuyentam", "ghen", "gian", "hanghai", "hon", "hothen",
         "hungkhoi", "khochiu", "lo", "so", "tinhnghich", "tinhtu", "tutin", "vui"]]

if __name__ == "__main__":
    import os as _os; sys.path.insert(0, _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "..")); import seal_gate as _SG; import seal_ear as _SE  # F15 NOEAR (owner Lượt 1037): women seals = no earrings + bare-earlobes sentence  # A24 seal gate: FAIL = exit 1, no prompts printed = no gen
    ks = sys.argv[1:] or ORDER
    print(json.dumps(_SG.guard(_SE.ear({k: prompts(k) for k in ks}), "th"), ensure_ascii=False, indent=1))
