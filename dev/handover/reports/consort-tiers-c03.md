# consort-tiers c03 (a18, t1–t8 + Nữ đế) — W31, Foreman C ROOT-17, 18/11

PRIORITY #1 CHECK: OD 5 | ledger 0 | claims 4 (none RUNNING) | main 5 | review/* 0 | archive 0 — reused: live img/hd/fig-consort-c03-t1..t8-a18.webp, original prompts (jobs.json N-c03-tK via spec5.py/lad3.py), Round 38/40/42 method, overlay_m09.py.

Method: measured all 8 live originals first (overlay_m09.py, MediaPipe). Original prompt text (outfit/headdress/pose) reused unchanged in new gens, with the live image as ref 1, m09 (eIyOFEidqL) ref 2, c03 face master ref 3; only the head-size sentence, the brighter closed-lip smile and bare forehead added. Passing ranks got a local mouth retouch (Round 40 method), no regen.

| figure | live face % | what changed | gens (+retouch) | final face % | pass |
|---|---|---|---|---|---|
| t1 Đáp ứng | −6.6 | head ~8 % larger, brighter smile; same robe/hairpins/pose | 2 | +0.8 | PASS |
| t2 Thường tại | +0.4 | live held a TEACUP (D3 forbids) → pose from original prompt (white feather fan + lifted sleeve); brighter smile | 2 | +0.1 | PASS |
| t3 Quý nhân | −4.6 | mouth retouch only | 1 retouch | −4.3 | PASS |
| t4 Tần | −4.9 | mouth retouch only | 1 retouch | −4.4 | PASS |
| t5 Phi | −4.5 | mouth retouch only | 1 retouch | −4.8 | PASS (tight) |
| t6 Quý phi | −7.5 | head ~9 % larger, brighter smile; same crown, cape, lantern | 2 | −2.7 | PASS |
| t7 Hoàng quý phi | −6.1 | head larger, brighter smile; same one-phoenix crown, handkerchief | 6 (picked gen 4) | +2.2 | PASS |
| t8 Hoàng hậu | −2.7 | mouth retouch only (two phoenixes kept, t7 ≠ t8) | 1 retouch | −3.3 | PASS |
| Nữ đế | none live | NEW: imperial yellow + emerald borders, dragon roundels + phoenix/peony embroidery, phoenix+dragon crown, 5 front lưu to the brow, stiff short pointed cầu vai, white-jade ruyi; ≠ her green t8 | 3 | −1.1 | PASS |

Design not changed on any live rank (no pair looked too alike except as noted below). Forehead bare on all 9 (looked at faces sheet). Smile: closed lips, brighter, no teeth, all 9. Mouth-retouch outside-mask diff ≤3/255; alpha untouched.
Credits: 15 gens × 135 = 2025; 15 bg removals × 3 = 45; 4 retouches × 175 = 700 → ≈2770 cr.

Weak points / for the foreman:
1. MEASUREMENT SENSITIVITY: overlay_m09.py reads very different numbers on the SAME gen depending on image size/crop (t7 gen f: +3.5 % on the half-size raw 2k, −6.4 % on the 768x2000 canvas; the 3 canvas readings at 1.0/0.8/0.6 scale agree ±1). I used the 768x2000 canvas as official (as R38/R40). Raw-2k pre-screens misled me and cost t7 its 6 gens; the chosen t7 passes on the canvas only.
2. t5 −4.8 and t3/t4 −4.3/−4.4 are close to the ±5 % edge (live-original sizes kept).
3. t4 (pale celadon/cream, fan) and t5 (pale green/cream, scroll) still read fairly alike; all ranks share her emerald+cream family as in the live originals. Not changed (brief: copy unchanged); a colour split of t4/t5 would be a separate order.
4. Live originals are 787x1800; t3/t4/t5/t8 were placed on 768x2000 at ×1.05 (slightly soft). Smile is brighter but still gentle at game size.
5. Nothing live, no fig-ht.json rows made.

CDN (md5-verified) https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c03/ : c03_a18_t1..t8.png, c03_a18_nude.png (768x2000 transparent), c03_a18_row8.jpg, c03_a18_overlay_m09.jpg, c03_a18_live_vs_new.jpg, c03_a18_faces.jpg.
