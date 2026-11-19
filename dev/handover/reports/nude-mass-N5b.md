# nude-mass — painter N5b (successor of N5), coordinator Foreman C ROOT-35 (session_01PEhRbwGPqHkqe1BAxK4nA2)
START_CTX ~5 % of window (get_session used_tokens read 0; own estimate). Rollover line ~30 %, ceiling 60 %.
PRIORITY #1 CHECK: brief nude-mass.md (+UPDATE) + reports nude-mass-N4/N5 + START_CORE/WORKER/ART + FIGURE_GATE (A0, REFERENCES, rule 3 incl. GAME COLOUR BENCHMARK = SHEET5, Nữ đế lines, AGE 51, ELDER COLOURS, H Nữ đế) + consort-B10 read; builder build.py a7727f4 (incl. 8f34cb5 a65 yellow fix); claims: N4b patching --state nude calm pose.
SCOPE: c09 a65 redo · c10 a26 + a36 + a65 redo (reuse N4 c10 a18/a51) · c11–c16 × a18/a26/a36/a51/a65.

## Prep (waiting for N4b calm-pose commit before any gen)
- Live t1 faces: c10–c16 a18/a26/a36/a51 all 200; a65 404 everywhere → a65 uses her a51 t1.
- Uploaded face refs: c10 a26 gOmORMfSXO, c10 a36 rgXg4WVxtc, c10 a51 bxMx7Gy5Y2, c09 a51 VX7XajhMMU.
- Prompt = builder output unchanged + K3 no-background sentence (N4 method). Balance 143,509 before start.

## Builder (ROOT-36 order, N4b held) — 79e60ff
build.py spec5pose: `--state nude` → ONE calm Pose sentence for every person/age (calm composed standing, item at chest height below the chin and clear of the face, elbows close, small restrained gesture, sleeves/mantle/sashes/ribbons/tassels hang straight down, no flying/floating/windblown cloth, no movement). Guard: 12 other builder commands byte-identical; only nude+spec5pose outputs change, only in the Pose sentence; all 32×5 nude builds OK. GO sent to N6b + N7.

## DONE (calm-pose builder 79e60ff; gpt-2-6 1024x2304 2k transparentBackground; refs own t1 face [a65 → a51 face] + style3 Xm9tPkMBfo + swatch TdwDfOyVNR; images_remove_background on every gen; corners alpha 0)
- c09 a65 redo (censer): eIPIjMZdqL. Looked: silver hair + wrinkles, censer at chest, calm, soft honey-gold (no mustard), crown no flowers, beads above brows.
- c10 a26 3zKzaXFREY · a36 If3fwLHtvE · a65 0eUektJTfW (pendant, option B black; elder navy). Looked: closed smile, pendant at chest below chin, calm, a65 silver + soft gold + navy (no mustard). a18/a51 = N4's sample (reused).
- c11 (option C, jade seal, pink-grey 2nd colour) a18 yiuiI3DPW9 · a26 DoOoLIRpcl · a36 xSBS07QjfW · a51 EbYbiiBuuO · a65 VX7Xxj0MMU. Looked: seal at chest below chin, calm, closed lips, crown no flowers, a51 silver streaks + fine lines, a65 silver + wrinkles.
  FAULT FIXED: a51 + a65 had a small red forehead dot (copied from her live a51 t1 ref, which has the dot). Removed with a tiny local skin patch (dev/art/t8-prompt-B/tools/dedot.py, r=6 px), checked at full size: clean, invisible. Young ages checked: no dot. WHOLE GROUP note: any person whose a51 t1 ref has a forehead dot will get it at a51/a65 → painters must check the forehead at full size.
- Gens 9, regens 0, credits 9×135 + 9×3 = 1,242.
Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/nude-mass/sheet_c09-c11.jpg
TODO: c12–c16 × 5 ages (25 gens).

## STOP ORDER (ROOT-36, ~01:00Z): no more gens. Owner rules FIGURE_GATE 3f (item per AGE × RANK) + 3d2 (FRONTAL only) change every Nữ đế image; c09–c11 will be redone. c12 a18 call errored (nothing queued). Face refs uploaded for c12: a18 xSBSVuljfW, a26 gOmOd5PSXO, a36 p8y8gzTehw, a51 Tdwdj2OVNR; c11: a18 bxMxARb5Y2, a26 yiui8BqPW9, a36 vQAQPyRa47, a51 If3f771tvE; c10: a26 gOmORMfSXO, a36 rgXg4WVxtc, a51 bxMx7Gy5Y2; c09 a51 VX7XajhMMU.

## ITEM TABLE — DONE (b6b8233)
- dev/art/t8-prompt-B/item_age.py = single source: KIND (20 kinds × 14 statuses, luxury rising), AGE_KINDS (per-age pools), cell(age,status) → 10 items, pick_item(cNN, age, status) (rotates by person, never the same KIND at two of her ages), `python3 item_age.py check` (0 short cells, 0 repeats), `python3 item_age.py md > ../item-rank-age.md`.
- dev/art/item-rank-age.md = generated table (edit the .py, never the .md). Summary sent to ROOT-36. Assumption: khuê các / nhà nghèo only a18/a26, Thái hậu a36/a51/a65.

## HANDOVER N5b → successor (rolling over at ~25 % context, line ~30 %)
TODO (wait for ROOT-36 / owner OK on the table first):
1. build.py frontal rewrite (3d2): every pose sentence with "three-quarter" / "slight turn" → frontal (body and face facing the viewer); the nude calm sentence in spec5pose (my 79e60ff block, `if globals().get("STATE")=="nude"`) says "frontal or a slight three-quarter turn" → change to "standing frontal, body and face facing the viewer". Also the header "face clearly visible, 3/4 or frontal view" is in the shared preamble → frontal. Guard every other output; check what N3b/7d49028 (--bdq) and 0376bfc (trieu) already changed so you don't double-edit.
2. Wire pick_item into build.py: Nữ đế item = item_age.pick_item(c, AGE, "nude") replacing NUDE_ITEM[c]; same for other statuses when ROOT says (kc/ngheo/thaihau/low ranks/t7/t8). Add a "Nữ đế item ≠ her own t8 item" check.
3. Then regen c09–c16 Nữ đế (all 5 ages) with the new builder. Method = section DONE above (refs own t1 face [a65 → a51] + style3 Xm9tPkMBfo + swatch TdwDfOyVNR; gpt-2-6 1024x2304 2k transparentBackground; images_remove_background; nude_mass_sheet.py fetch/sheet; cdn_sync). CHECK FOREHEADS AT FULL SIZE: c11 a51 t1 ref has a red dot → use tools/dedot.py (`dedot.py in out x0 y0 x1 y1 6`, box around the dot, verify the crop).
