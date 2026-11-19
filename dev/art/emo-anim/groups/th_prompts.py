#!/usr/bin/env python3
"""Thái hậu mood-seal set (prefix th-): prompts = th-gian.md copied exactly, only the feeling words + disc colour change.
Ref A = eIPl4i6dqL (th-gian A); B ref = that seal's own A. Seedance clips: keyframes only."""
import json, sys
WHO = ("an ELDERLY EMPRESS DOWAGER of the Qing-style inner palace: an old woman about seventy, kind round face with soft wrinkles at the eyes and mouth, "
       "silver-grey hair streaked with a little black, swept up into a high formal bun under a LARGE ornate gold phoenix crown with spread phoenix wings, "
       "pearl strings and red jewels (clearly grander than any consort's hairpins, nothing like a maid's single hairpin and flower), small pearl earrings, "
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
     "A": f"Same soft hand-painted storybook style, same round gold-rimmed medallion and same chibi proportions as the reference, but the person is now {WHO}. The medallion disc is now {col} instead of red. {aface}. Both eyes looking together straight ahead. Everything kept INSIDE the round medallion, the medallion drawn a bit smaller and centred so there is empty space around it. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.",
     "B": f"{SAME}, same round gold-rimmed {col} medallion as the reference. NEW: she is {caps} and bursts OUT of the round medallion toward the viewer: her head, shoulders and both arms come forward through and over the gold rim, her head and hands overlap and cover parts of the gold ring; {b}. Both eyes looking together. The medallion stays round and centred, a bit smaller, with her popping out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.",
     "out": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The {OLD} inside the round gold medallion {out}. Smooth, cartoon-like, same painted style, no camera move, no new objects.",
     "loop": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The {OLD} leaning out of the round gold medallion {loop}; then she settles back to exactly the starting pose. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects.",
     "back": f"Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The {OLD} leaning out of the round gold medallion {back}, pulls her arms back and slowly slides back inside the round medallion, shrinking back into it, until she is again only {endface} inside the round frame, exactly like the end frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects.",
    }
if __name__ == "__main__":
    ks = sys.argv[1:] or list(S)
    print(json.dumps({k: prompts(k) for k in ks}, ensure_ascii=False, indent=1))
