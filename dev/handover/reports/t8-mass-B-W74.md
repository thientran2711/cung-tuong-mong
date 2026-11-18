# t8/t7 mass B — W74 (c12–c22), report
PRIORITY #1 CHECK: OD 0 new | claims W72 builder | main jobs.json | review/* 0 → reused FROZEN builder dev/art/t8-prompt-B (golden c06 v0 cmp OK).
Owner words (verbatim, binding): see dev/handover/briefs/t8-mass-B.md.

## Done
| person | item | gens | files (CDN img/_review/t8-reprompt/) |
|---|---|---|---|
| c12 | t8 v0, v1, v2 + t7 v0 | 1 each (all passed by eye: phoenix main, soft sleeves, yellow ok, face visible) | c12_a18_t8_v0/v1/v2.png, c12_a18_t7_v0.png, c12_sheet.png (old t8 v0/v1/v2 | new t8 v0/v1/v2 | t7 v0) |
Base https://ctm-img.victoria-tntt.workers.dev/ . md5[:12]: t8v0 95842e057c7c, t8v1 363c60bf023d, t8v2 f2bd43e242c1, t7v0 83e475625e1f. Output 1024x2304 RGBA (frozen size), cut with images_remove_background.

## ORIG1 additions (build.py, nothing else changed; measured from each t1, checked by eye)
c12 pale sage green #C9D2B4 / cream #E8DCC4 · c13 apricot #EBA98E / #F0C5B0 · c14 butter cream #EBDDB0 / #F0E6CC · c15 coral pink #E0A398 / #EBC4BA · c17 rose pink #E5A598 / #F0C6BB · c18 mauve rose #BF868F / #D9B5C5 · c19 dusty rose #B97E78 / #E3B9B0 · c21 rose red #C9746C / #E8B5AC · c22 lavender #CDB9DC / #EBC7D0 (c16/c20 already present).
## Question for Foreman C
build.py has only `--t7` = Hoàng quý phi v0. t7 v1/v2 have no frozen prompt; I did NOT invent one. Please decide.
## HANDOVER (worker rolls over; coordinator opens successor)
Remaining: c13 c14 c15 c17 c18 c19 c21 c22 (c16 c20 v0 t8 already done = keep; their v1/v2 + t7 still needed). Per person: upload t1 (https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png) via creations_upload_image under name face-<cNN>-t1.png, folder ba4aecfe…, refs [image(upload), style eIyOFEidqL], size 1024x2304 2k gpt-2-6, prompt = build.py output pasted unchanged; run 4 gens in parallel (t8 v0 v1 v2, t7 v0); look at each; images_remove_background; save as <cNN>_a18_t8_v<k>.png; sheet; cdn_sync (script from origin/main dev/site into a scratch root with img/); send READY.
Practical: pasting a ~4 KB prompt per gen costs ~1.2k tokens; ~25k tokens per person → split c13–c22 across 2–3 painters.
