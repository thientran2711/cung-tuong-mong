# Mood-seal group (a) THÁI HẬU — sample seal «giận» (STEP 1, one sample only, A1)
Order: ROOT-56 19/11 21:41Z ← MAIN ROOT-70 art order 15:40Z + owner corrections 17:00Z / 17:10Z (OWNER_DECISIONS 19/11 ~15:35Z/~17:00Z/~17:10Z real).
Recipe = dev/handover/briefs/emo-anim-mass.md + dev/art/emo-anim/prompts.md (giận pilot, women set). Prefix proposal: `th-` → files `th-gian-out.webp`, `th-gian.webp`, `th-gian-back.webp` → img/_review/emo-anim-groups/.
Colour: Thái hậu is not in RCOL (ranks t1–t8). B21 (Lượt 616/619): Thái hậu wears royal yellow #EFBD69 together with her own colours → robe royal yellow #EFBD69 with deep plum #6E3A5E collar/trim (elder, J2 deeper tone). The disc stays the «giận» red like the women set (disc = feeling colour). NOTE for owner (A18): plum trim is my pick; she may name another.
Difference from the women set: there is NO Thái hậu still seal yet → keyframe A is painted NEW from the women «giận» still as style reference and also becomes the still (cut from A).

## 0. Reference
https://ctm-img.victoria-tntt.workers.dev/img/kit/emo-gian.webp (160 px) → PNG, upscale 640 px lanczos → creations_request_upload + PUT + creations_finalize_upload (folder ba4aecfe-efce-47e2-b53f-30d292091886).

## 1. Keyframe A — still (gpt-2-6, 1:1, 2k, image ref = the women giận seal, NO transparentBackground) ≈135 cr
```
Same soft hand-painted storybook style, same round gold-rimmed red medallion and same chibi proportions as the reference, but the person is now an ELDERLY EMPRESS DOWAGER of the Qing-style inner palace: an old woman about seventy, kind round face with soft wrinkles at the eyes and mouth, silver-grey hair streaked with a little black, swept up into a high formal bun under a LARGE ornate gold phoenix crown with spread phoenix wings, pearl strings and red jewels (clearly grander than any consort's hairpins, nothing like a maid's single hairpin and flower), small pearl earrings, a royal yellow (#EFBD69) brocade robe with a deep plum (#6E3A5E) collar and gold embroidery at the shoulders. Her face is ANGRY like the reference: furrowed brows, glaring eyes, tight frowning mouth, red flush on the cheeks, a small red anger mark by her temple. Both eyes looking together straight ahead. Everything kept INSIDE the round medallion, the medallion drawn a bit smaller and centred so there is empty space around it. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.
```
Check: reads as Thái hậu at a glance (old face + big phoenix crown + royal yellow), same style family as the women seals, eyes not crossed, flat green, medallion ~60 % of frame.

## 2. Keyframe B — burst (gpt-2-6, 1:1, 2k, image ref = keyframe A) ≈135 cr
```
Same elderly empress dowager, same soft hand-painted storybook style, same large gold phoenix crown with pearl strings, same silver-grey hair, same royal yellow (#EFBD69) brocade robe with deep plum (#6E3A5E) collar, same round gold-rimmed red medallion as the reference. NEW: she is FURIOUS and bursts OUT of the round medallion toward the viewer: her head, shoulders and both arms come forward through and over the gold rim, her head and hands overlap and cover parts of the gold ring; one hand grips the gold rim, the other is a raised clenched fist, wide royal yellow sleeves with plum cuffs visible; angry shouting old face, brows furrowed, puffed cheeks, crown jewels swinging; one small red anger mark and two small steam puffs above her head. The medallion stays round and centred, a bit smaller, with her popping out of it. Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.
```

## 3. Clips — Seedance 2.0 Fast (`bytedance-seedance-fast-2.0`), 4 s, 1:1, 720p, withSoundEffects false, keyframes only — 3 × 940 cr
OUT (start A → end B):
```
Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The angry old empress dowager in the large gold phoenix crown inside the round gold medallion flares up in fury: she leans forward and bursts out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out, one hand grips the gold rim and the other rises as a clenched fist, she shouts angrily, steam puffs appear above her crown. Smooth, cartoon-like, same painted style, no camera move, no new objects.
```
LOOP (start B → end B):
```
Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. The furious old empress dowager in the large gold phoenix crown leaning out of the round gold medallion keeps scolding in a loop: she shakes her raised fist, huffs and puffs her cheeks, the pearl strings of her crown swing, the steam puffs rise and fade; then she settles back to exactly the starting pose. Slow enough to read, cartoon-like, same painted style, no camera move, no new objects.
```
BACK (start B → end A):
```
Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. The furious old empress dowager leaning out of the round gold medallion gives one last angry huff, the steam fades away, she lowers her fist, lets go of the gold rim, pulls her arms back and slowly slides back inside the round medallion, shrinking back into it, until she is again only an angry old face with the large phoenix crown inside the round frame, exactly like the end frame. Smooth, slow, cartoon-like, same painted style, no camera move, no new objects.
```
Total ≈ 2 × 135 + 3 × 940 = 3 090 cr (+135 per redone keyframe). simulate_cost first.

## 4. Cut (after creations_register_download)
dev/art/emo-anim/mo/cut.py (edge-only despill) or cut.sh: 288 px, 15 fps, animated webp alpha, loop 0 for the LOOP file and loop 1 + ANIM bg 00000000 for -out/-back (per order). OUT trimmed to the burst, BACK from slide-in, last BACK frame = still. Still `th-gian` static = keyframe A cut to 160 px.
Output: img/_review/emo-anim-groups/th-gian-out.webp, th-gian.webp, th-gian-back.webp (+ still/th-gian.webp) + frame sheet img/_review/emo-anim-groups/th-gian-frames.jpg.

## RESULT (19/11 ~21:56Z) — gens run by ROOT-56 with the prompts above; cut + check by CP1
Ids: A eIPl4i6dqL · B s7IMhSkl8e (= u5W30sFQLD flattened on green) · OUT 8ai7ZqUIrU · LOOP jUoTtNALD0 · BACK UPvdCAuwny · 3 090 cr.
Cut: `python3 dev/art/emo-anim/groups/th_cut.py out|loop|back in.mp4 out.webp [start_s]` (OUT started at 1.07 s; LOOP/BACK auto).
The Seedance screen is ≈ #00E406, not #00FF00, and the steam puffs are semi-transparent: th_cut.py un-mixes against the real screen
colour, so puffs come out white/grey + transparent (the plain chromakey left them grey-green).
CDN img/_review/emo-anim-groups/: th-gian-out.webp (45 fr, loop 1), th-gian.webp (60 fr, loop 0), th-gian-back.webp (60 fr, loop 1),
all bg 00000000, 288 px 15 fps · still/th-gian.webp (160 px) · th-gian-frames.jpg (every frame, light/dark rows) · th-gian-preview.mp4
(OUT + LOOP×2 + BACK + hold, light bg).
Looked at every frame. Notes: OUT goes in two steps (hands on the rim, then fist out); BACK opens with a puff of steam that covers the
hands for ~1 s and leaves a few tiny dots while it fades; the last BACK frames brighten the disc to keyframe A's colour (= the still).
