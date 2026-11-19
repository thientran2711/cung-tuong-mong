START_CTX ≈ 4.5 % of 1M (get_session used_tokens read 0 → own estimate) · depth 1 · roll line ≈ 29.5 %, ceiling 60 %
# SEAL1 — Thái hậu (th-) mood-seal set, ONE UNIT AT A TIME (A23, Lượt 724; Lượt 721 = only Thái hậu gets the full set)
Worker of Foreman C ROOT-57 (session_01PEhRbuFkLEFvsv8jdPo9vC), successor of CP1. Recipe = dev/art/emo-anim/groups/th-gian.md, copied exactly;
only feeling words + disc colour change. Prompts: dev/art/emo-anim/groups/th_prompts.py (python3 … th_prompts.py vui → JSON of A/B/out/loop/back).
Tools added: th_sheet.py (frame sheet, every frame, light/dark rows) · th_preview.py (OUT + LOOP×2 + BACK + 1 s hold per seal, light bg).
A19 store gate: check_store.py has no scope for mood seals (tpN|prN|trieuN|mama|nude); th-gian ran without it → not run here either (tell me if wanted).

## UNIT 1 (19/11 ~23:15Z) — th-vui, th-buon, th-so — SENT to ROOT-57, WAITING for GO
| seal | A (used) | B | OUT | LOOP | BACK | frames out/loop/back |
|---|---|---|---|---|---|---|
| vui (warm sunny yellow) | 1ldcVdJr4r (= VX7jsz4MMU flattened) | If3O4TotvE | jUoVeqwLD0 (start 1.00 s) | Xm9UO0VBfo | u5WRGmBQLD | 46/60/58 |
| buon (pale blue) | kseWTea16B (= fHz63tcCDY flattened) | vQA9idsa47 | EbY3AmAuuO | p8ylw0Kehw | 3zKEH9fREY | 56/60/45 |
| so (lavender purple) | 1ldcVXNr4r (= ov67Odq829 flattened) | mEZPNdLhJQ | KLpYTqOkqp | hu24iIevqL | xSBTp1pjfW | 56/60/43 |
CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/ : th-<k>-out.webp, th-<k>.webp (LOOP), th-<k>-back.webp,
still/th-<k>.webp (160 px, A cut to the medallion), th-<k>-frames.jpg (k = vui buon so), th-u1-preview.mp4 (47 s, all three).
Credits: 6 keyframes × 135 + 10 clips × 940 = 10 210 (balance 533 472 → 523 127). Ledger: 16 lines (SEAL1).
Looked at every frame (sheets) + edge check by script:
- All three A keyframes came back RGBA transparent → flattened on #00FF00 and uploaded (as ROOT-56 did for th-gian B). B keyframes were opaque green.
- so OUT: arms fly out wide before the hands go to the mouth; sleeve tips touch the bottom edge for 4 frames (~0.3 s). Redid once
  (tCRy39EmZJ, 940 cr, "arms close") → worse (she leaps up, crown off the top edge 6 frames) → NOT used, v1 kept.
- vui OUT: first 1 s almost still → cut from 1.00 s (like th-gian OUT 1.07 s). LOOP: she claps / holds her hands together, sparkles twinkle.
- buon: calm, small motion (sad = slow); raincloud stays small above the crown.
Remaining after unit 1: 34 seals (21 feelings − gian vui buon so = 17; 17 act faces). Next unit proposal: an binh dau ghen (needs
their hands/face rows from prompts.md + women-set disc colours), then lo muu + the 11 new feelings, then the act faces.
- 23:10Z ROOT-57 relayed owner Lượt 777 (credits): no gens beyond what she OKs; NO redo gens without asking. Unit 1 sent to her → SEAL1 WAITS,
  does nothing until ROOT-57 forwards her answer. (The so-OUT redo above was made before this rule.)

## 23:21Z ROOT-57 relayed OWNER Lượt 781: Thái hậu set APPROVED (unit 1 too) → GO all 34 remaining, units of ~4 sent as I go, NO redo gens (777);
then ONE «giận» sample for (b) Hoàng hậu → STOP; then (c) phi tần trẻ the same way.
- th_prompts.py now holds ALL 34 remaining keys (python3 th_prompts.py → ORDER): an binh dau ghen lo muu (own rows from prompts.md table) +
  11 new feelings (w-new/prompts.py) + 17 act faces (w-act/prompts.py), only person words changed. act-tinhtu: "INVITING THE EMPEROR" →
  "INVITING AN HONOURED GUEST TO HER TEA" (she is the emperor's mother). Eyes: "straight ahead" dropped when the face looks sideways/winks.
## UNIT 2 (an binh dau ghen) — STOPPED at keyframe A (23:30Z)
- PERMISSION CHECK REFUSED the «an» keyframe-A gen (images_generate, auto-mode classifier "Destructive or Unwanted Actions"). Per orders: STOP,
  exact call sent to ROOT-57 to run (prompt = `python3 dev/art/emo-anim/groups/th_prompts.py an` → "A"; mode gpt-2-6, 1:1, 2k,
  references [{type:image, identifier:eIPl4i6dqL}], folderReference ba4aecfe-efce-47e2-b53f-30d292091886).
- Done before the stop: A binh Lw8Muc3swO → green 1ldcfUnr4r · A dau xSBTCcNjfW → green gOmeq9RSXO · A ghen EbY3dihuuO → green 6AbfgYjiJO
  (all looked at: OK; again RGBA transparent, flattened). Stills still/th-binh|dau|ghen.webp made (not yet on CDN). 3 × 135 = 405 cr.
- NEXT (when ROOT-57 says go on): B for binh/dau/ghen with ref = the green A id; then 3 clips each (th_prompts.py <k> → B/out/loop/back),
  cut th_cut.py, th_sheet.py, th_preview.py th-u2-preview.mp4, cdn_sync. Credits so far SEAL1: 10 210 + 405 = 10 615.
