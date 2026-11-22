# emo-anim prompt templates (break-out mood seals)

> **DISC SCALE (rule A58, owner L2381):** every animated seal's medallion size per frame = `disc_scale_spec.py` (rest r 74 px @ (144,144); OUT → 112 % in 15 frames; LOOP 112 %; BACK → 100 % in its last 15). Apply with `dev/handover/reports/THACT5_tools/apply.py` after cutting; never choose your own %.

Recipe = dev/handover/briefs/emo-anim-mass.md (owner-approved giận pilot, Magnific creation Xm9fz3fBfo).
These templates made the women set (vui binh an buon dau ghen lo muu so) on 19/11; giận = main's pilot files.
Replace the `{…}` slots. Keep every other word: the wording about the rim, the chroma green and "no text" is what makes the cut work.

## 0. Reference
Still seal img/kit/emo-<set><k>.webp (160 px) → PNG, upscaled to 640 px lanczos → `creations_request_upload` + PUT +
`creations_finalize_upload` (folder ba4aecfe-…). Use it as the only `image` reference for both keyframes.

## 1. Keyframe A — still (gpt-2-6, 1:1, 2k, ref = seal, NO transparentBackground)
```
Exactly the reference picture: same {girl|young man|man}, same soft hand-painted storybook style, same {FACE OF THE SEAL,
e.g. "happy laughing face with bright open smile"}, same hair buns, gold hairpin with pearls, pink flower, same round
gold-rimmed {DISC COLOUR} medallion, everything kept INSIDE the round medallion as in the reference, but the medallion
drawn a bit smaller and centred so there is empty space around it. Whole picture on a flat pure chroma green (#00FF00)
background outside the medallion, nothing else, no text.
```
(Hair/ornament words: copy what the seal really shows. For a seal with a painted symbol, e.g. «ẩn» "?" in mist, say
"the same pale grey question mark painted in the mist" and end with "no letters or words" instead of "no text".)
Check: same face as the seal, eyes NOT cross-/wall-eyed (if they drift, add "both eyes looking together in the same
direction" and regenerate — happened once on lo), flat green, medallion ~60 % of the frame.

## 2. Keyframe B — burst (gpt-2-6, 1:1, 2k, same ref)
```
Same {girl}, same soft hand-painted storybook style, same hair buns, gold hairpin with pearls, pink flower, same round
gold-rimmed {DISC COLOUR} medallion as the reference. NEW: she is {FEELING IN CAPS, e.g. OVERJOYED} and bursts OUT of the
round medallion toward the viewer: her head, shoulders and both arms come forward through and over the gold rim, her head
and hands overlap and cover parts of the gold ring; {HANDS ACTING THE FEELING}, sleeves of a pale pink hanfu robe visible;
{FACE}; {ONE SMALL FEELING MARK or "no effects"}. The medallion stays round and centred, a bit smaller, with her popping
out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.
```
Hands / face / mark used (women set):
| key | hands | face | mark |
|---|---|---|---|
| vui | both hands raised waving happily, about to clap | sparkling eyes, big open laughing smile | three tiny gold sparkles |
| binh | one hand resting relaxed on the rim, other a small friendly wave | serene soft smile, slight head tilt | none |
| an | one hand parts the grey mist, other finger at lips "shh" | sly secret smile, one eye winking | mist wisps + one small "?" |
| buon | forearms folded on the rim, chin resting on the hands | droopy eyes looking down, pout, one tear | tiny pale-blue raincloud |
| dau | both fists rubbing the eyes, wiping tears | wailing sob, brows up | streaming tears, a few flying drops |
| ghen | both hands tug a pink silk handkerchief, biting its corner | narrowed side-glance, puffed cheek | tiny dark-green swirl |
| lo | hands clasped and wringing at the chin, one fingertip nibbled | anxious brows, eyes up, wavy mouth, sweat drop | two tiny worry swirls |
| muu | fingertip tapping chin, other hand drumming on the rim | sly side-glance, one brow up, smirk | tiny gold glint by the eye |
| so | both hands up at the mouth, trembling | wide eyes tiny pupils, pale purple tint, sweat drop | gloom lines + shiver marks |
| gian (pilot) | one hand grips the rim, raised clenched fist | angry shout, puffed cheeks | anger mark + two steam puffs |

## 3. Clips — Seedance 2.0 Fast
`video_generate` slug `bytedance-seedance-fast-2.0`, duration 4, aspectRatio 1:1, resolution 720p, withSoundEffects false,
keyframes {start, end} as creation ids, NO references (start/end frames only, like the pilot). 940 credits each.

OUT (start A → end B):
```
Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time.
The {feeling-adj} little girl inside the round gold medallion {trigger, e.g. "lights up with joy"}: she leans forward and
bursts out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out and
{HANDS ACTION}, {FACE ACTION}, {MARK appears}. Smooth, cartoon-like, playful, same painted style, no camera move, no new objects.
```
LOOP (start B → end B):
```
Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The {feeling-adj}
little girl leaning out of the round gold medallion keeps {feeling-verb, e.g. "celebrating"} in a loop: {2–4 small actions
of the hands, head and face, the mark moving}; then she settles back to exactly the starting pose. Slow enough to read,
cartoon-like, same painted style, no camera move, no new objects.
```
BACK (start B → end A):
```
Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time.
The {feeling-adj} little girl leaning out of the round gold medallion gives one last {wave|sigh|huff|sniffle}, {the mark
fades away}, she lowers her hands, {lets go of the gold rim,} pulls her arms back and slowly slides back inside the round
medallion, shrinking back into it, until she is again only a {SEAL FACE} inside the round frame, exactly like the end
frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects.
```
Check each clip with `video_view_frames` (6–8 frames): face stays the same person, hands not cut off at the frame edge,
green stays flat, BACK ends on keyframe A.

## 4. Download + cut
`creations_register_download` (≤ 8 ids per call) → curl the `url` (pikaso.cdnpk.net) → `mp4/<k>-{out,loop,back}.mp4` →
`dev/art/emo-anim/cut.sh {out|loop|back} in.mp4 out.webp` (auto-trim; see header). Names: `<set><k>-out.webp`,
`<set><k>.webp` (loop), `<set><k>-back.webp` → CDN img/_review/emo-anim-mass/ via `python3 dev/site/cdn_sync.py <paths>`
(copy into the checkout's gitignored img/_review/emo-anim-mass/ first).
Cost per seal ≈ 2 × 135 + 3 × 940 = 3 090 credits (+135 per redone keyframe).
