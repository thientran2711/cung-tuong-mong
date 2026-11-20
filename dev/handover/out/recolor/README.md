# Robe recolour samples (ROOT-79, 20/11)
- recolor_v1_flat.py — v1 (owner: "gớm"): every robe pixel set to ONE hue (HSV), only lightness kept → layers merge.
- v2 (Lab offset, layers kept): same robe mask; in Lab, each pixel keeps its own lightness and its colour DIFFERENCE from the robe's average; only the average moves to the target family (new_ab = ab + (target_ab − mean_ab); L moves half-way). Same idea as Foreman C's dev/art/emo-anim/discs/disc_recolour.py (A26, 0 cr: new = official + (pixel − measured)).
- Mask: SAM 3.1 (Magnific images_segment, 35 cr each) 'head' + 'hand'; robe = alpha − everything above the chin − hands − skin colour near head/hands. Code-only mask (0 cr) works when robe colour is far from skin.
- Foreman C's CONSORT robe recolours (consort-tiers-c12.md, c03-v1-t678.md) were NOT code: Magnific gpt-2-6 image edit ("exact copy" then "recolour" with style ref + skin clause), 135 cr per figure → the model repaints layer by layer.
