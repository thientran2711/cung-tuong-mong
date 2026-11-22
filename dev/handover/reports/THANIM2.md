# THANIM2 — Thái hậu tone-down seal ANIMATION worker (successor of THANIM1; Foreman C ROOT-C1 session_01D3E3NX4Gc3XCtkhsnipEAS)
depth 1 · START_CTX ≈ 0 % of 1M · finished far below the 25 % roll line (no handover needed) · 22/11
CDN folder: https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/tonedown/anim/ (files below). Balance before ≈ 2 962 249 cr (stop line 60 000).
Tool: dev/handover/reports/THANIM1_tools/sheet2.py <outbase> <S> '<json [[k,"VN","code"],…]>' [webp_q] → MP4 (H.264 yuv420p 15 fps faststart) + webp sheet (needs webp/<k>-{out,loop,back}.webp from cut.sh).

## 1. Owner heavy-fault redos (L2324/L2325 standing rule: heavy fault → redo at once, report)
| seal | new BACK id | (B → A) | why |
|---|---|---|---|
| hưng khởi M2301-12 | O6u4I6Hynm | UPaJD5Jwny → dt9oLNLXSL | old BACK ended in dark pink tunnel disc |
| đau lòng M2301-06 | vQGC9Fqa47 | bxDk3yf5Y2 → vQGCwBfa47 | old BACK disc dark/flat at end |
| chuyên tâm M2294-03 | Syv7XHRUb8 | Syv7YwtUb8 → 5jp19aBKxe | audit: face ghost-fades to a blank pale disc |
| vui M2301-01 | rgBLTa0xtc | 1lXj3LZr4r → ovit10V829 | audit: blank gold sunburst disc 5 frames, face gone |
| tình tứ M2301-11 | 4RH6vxS9Aa | Syv7MqnUb8 → Syv7MaiUb8 | audit: blank pink disc 6 frames, face gone |
Prompt diff vs the original BACK prompt: only added "disc keeps exactly its same colour / flat fill first to last frame, never darkens" (+ "face and crown stay solid in every frame" for chuyên tâm/vui/tình tứ, "never a sunburst or metal disc" for vui). 5×940 = 4 700 cr. All 5 looked at (last 14 frames contact sheets): face + disc colour OK to the end (small figure then snap to A in the last frames = same as accepted seals).
Audit of every other BACK (giận, hăng hái, buồn, sợ, ẩn, bình, ghen, lo, mưu, tự tin + batch 4/5): no dark/blank discs. Giận: tiny figure on flat red for ~3 frames, face present → accepted (mild).
Redo MP4 (hưng khởi + đau lòng): …/th-tonedown-redo-hungkhoi-daulong.mp4. Batches 1–3 sheets/MP4 rebuilt with the new BACKs: th-tonedown-batch{1,2,3}-anim.{mp4,webp}.

## 2. Batch 4 (M2301-13..17) — A flattened upload → B → OUT / LOOP / BACK, 15×940 = 14 100 cr (+0 B regen; B gens were THANIM1's 5×135)
| seal | code | A | B | OUT | LOOP | BACK |
|---|---|---|---|---|---|---|
| tinh nghịch | M2301-13 | gOhwpYASXO | iGKZfvv3uK | jU8lMSsLD0 | bxDknrW5Y2 | 4RH6vRn9Aa |
| hổ thẹn | M2301-14 | 4RH6mem9Aa | 6A5RahJiJO | YMg0kM1WeC | Td7Djd2VNR | 1lXj0gir4r |
| chán | M2301-15 | fHnuNw0CDY | ksdxcwa16B (flattened; gen UPaJdefwny came back RGBA) | yiQ9mcXPW9 | bxDknOo5Y2 | mE2a4xxhJQ |
| khó chịu | M2301-16 | cpUVku60eP | ksdxcwH16B (flattened; gen ovitwwx829 RGBA) | cpUVraO0eP | s7tSp2Zl8e | Bh6I7K6oQR |
| choáng | M2301-17 | nVlcbfZYQD | 9ZqihhsNYZ | O6u4tiHynm | ovitJad829 | xSosVw3jfW |
MP4 (1600x374, 3.9 MB): th-tonedown-batch4-anim.mp4 · webp 5.2 MB. Looked: same woman/crown/robe, small gestures, two hands, no earrings, discs keep colour.

## 3. Batch 5 = hờn M2301-18 (last seal) — A xSospXJjfW (flattened upload of th-hon-A-M2301.png; orig gen P3FN0K142C) · B gen 3zk2HKxREY (135) · OUT xSospE2jfW · LOOP mE2a6VchJQ · BACK lJmUBq2gv9 → 3 105 cr
B prompt: THANIM1 b.py wording + "SULKING, leans slightly out, crossed arms overlap the ring, cheeks puffed, pout, eyes closed, head turned away chin up; small calm gesture only, no big arms, no extra hands; dusty plum-wine medallion". MP4 (400x466, 1.1 MB): th-tonedown-batch5-hon-anim.mp4 (+ .webp). Looked: plum disc constant, arms crossed, small steam puff by the mouth in BACK (cosmetic).
Per-seal cuts th-<k>-{out,loop,back}.webp for batch 4 + hon (+ the 5 redone BACKs) on the CDN.
Total THANIM2 spend ≈ 4 700 + 14 100 + 3 105 = 21 905 cr.

## 4. Other Thái hậu seal keys with NO animation yet (from SEAL6/7/8 reports + th_names.py; not verified against the CDN, whose _index has no th-act entries in the format I could read)
Emotion set th-<k> (21 keys): all now animated (old set earlier; tone-down set = this task, 21/21 with hờn).
Action set th-act-<k>: DONE (units 6–10, SEAL6–8): buon chan choang chuyentam ghen gian hanghai hon hothen hungkhoi khochiu lo so tinhnghich tinhtu tutin vui (17).
→ NO th-act animation: **an (ẩn), binh (bình), dau (đau lòng), dau2 (đau lòng vẽ lại, "NOT made — waiting for ROOT-60's wording"), muu (mưu)**; plus **th-act-ghen needs a REDRAW** (still amber vs jade-teal disc; recolour failed per SEAL8). Also th-act seals were made with the OLD (strong) look — the tone-down brief (L2301) covered only the emotion set, so the owner may want tone-down versions of the 17 th-act seals too (≈ 3 090 cr each ≈ 52 500 cr).
Open: nothing blocking. Commit: see git log (this report).
