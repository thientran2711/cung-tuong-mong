# ITEMFIX — item shape words (pellet drum, embroidery hoop, tú cầu, held hairpin) + one-item hairpin poses — DONE
depth 1 · START_CTX ≈ 4 % (context_usage read 0; own estimate) · worker for Foreman C ROOT (session_01D3E3NWtCdQC92tFLkd25H5) · 0 credits, NO gens, no redraw.

PRIORITY #1 CHECK: grep of dev/art for the four item words → only t8-prompt-B/build.py (ITEMS t8, ITEMS7 t7, L3F t1–t6, NUDE_LIST), item_age.py (ball/hoop/m_hoop/p_hoop templates), build_npc.py (Q14 hoop); check_store.py / APPROVED tables hold none of these words (no store-sentence update needed). Facts from T78-A..I reports.

Owner verbatim (20/11 ~15:05Z): "Còn trống lắc và khung thêu bị vẽ thành quạt và gương là do tất cả mọi người hay như thế nào? Nếu như mà tất cả mọi người đều bị như vậy thì cần phải sửa lại vào trong prompt. Người nào vẽ rồi thì thôi để lại."
Answer: yes, it is the shared builder wording (≈15/16 drums, ≥4/7 hoops drawn as fan/mirror across many people) → fixed in the store; drawn pictures stay.

## What changed (only the item phrases + 3 pose templates; added text appended to the existing phrase)
| family | text added | ranks | source phrases | prompts affected (a18–a65, 4 490 built) |
|---|---|---|---|---|
| pellet drum (trống lắc) | ", a short deep drum seen side-on so its round body shows, two knotted pellets on cords at its sides, a short stick handle, never a flat disc, never on a long pole" | t7, t8 | 2 | 19 (t7 10, t8 9) |
| pellet drum | ", a deep drum with two pellets, not flat" (short: length limit) | t2–t6 | 5 | 65 |
| embroidery hoop | ", two thin rings clamping the cloth stretched tight and flat, a needle and thread in the half-done stitching, never on a handle" | t7, t8 | 2 | 20 |
| embroidery hoop | ", cloth stretched flat in two thin rings, a needle in it, never on a handle" | t3–t6 + item_age hoop/m_hoop/p_hoop (kc / maid / poor states) | 4 + 3 | 42 |
| tú cầu | ", a round stuffed ball held in the palm or by its cord, no handle" | t7, t8, Nữ đế | 3 | 26 |
| tú cầu | ", a round stuffed ball, no handle, no stick" | t1–t6 + item_age ball (kc) | 6 + 1 | 75 |
| held hairpin | ", held in the hand" → ", slim and palm-length, held between her fingers, never a sceptre" | t8 phoenix, Nữ đế dragon | 2 | 20 |
| hairpin-adjusting pose (m20 two-item fault) | "adjusting a (gold) hairpin **set in her hair** with one raised **empty** hand" | all 3 spec5 hairpin templates (kieungao #4, dangi #4, thamvong #6) | 3 | 203 |
| NPC | "holding an embroidery hoop" → "holding an embroidery hoop flat, the cloth stretched tight in it, never on a handle" | build_npc Q14 | 1 | (NPC builder, not in the plan dump) |

Why not literally "never a fan, never a mirror": the word "fan"/"mirror" in an item would change its E6 item KIND (e6_kind regex: fan/mirror come before drum/hoop/ball) and the pose ban (`_banned`: "fan" in the prop allows the " open " poses) → the global seeded pose plan and E6/E12 item picks would shift for OTHER people. So the negatives say "never a flat disc / never on a handle / no stick / never a sceptre" instead. Verified: all 24 changed list items keep the same e6_kind, none gains fan/book/scroll/open/reading.
No item swapped (none needed). t7 butterfly hairpin / t1–t6 butterfly hairpins: no fault reported → untouched.
Two-item pose scan (family): 36 spec5 + SPEC5_ADAPT + 30 POSES_30 + hand templates. Only the 3 "adjusting a hairpin … {prop} in the other hand" templates could add a second held object (a hairpin in the raised hand). Others with a second thing are worn/creature/clothing (stole, skirt hem, belt pendant, necklace, petal, butterfly on finger, songbird = pet rule) → untouched. POSES_30 L5 "one hand touching her hairpin" already reads as worn (T78 notes "hand at hairpin OK") → untouched.

## Checks
- Whole plan diff, store-all/build_all.py build() for every drawn person × t1–t8 (+ Nữ đế + Thái hậu for c01–c32), ages a18 a26 a36 a51 a65 = 4 490 prompts: **462 changed, 4 028 byte-identical**; changed ones normalised back (remove the added text) = byte-identical to before → **0 extra diffs** (no pose / angle / item pick moved). Per age changed: a18 234, a26 72, a36 72, a51 42, a65 42.
- check_store gate, 31 samples (each changed family × every rank it appears, t1–t8 + Nữ đế): build_all gate (store + approved, same args as the mass) **31/31 PASS** and `check_store.py <f> --scope tpN|nude --age aNN` **31/31 PASS**; all ≤ 9 722 chars.
- LENGTH (open, foreman's call): 2 prompts go from 9 992 to just over 10 000 chars: **s31 t4 a18 (10 032, drum)** and **s33 t6 a18 (10 035, tú cầu)** — they were 8 chars under the gen limit, so no real item fix fits. Not trimmed (brief: touch no other sentence). Pre-existing: 59 other a18 prompts (mostly s-series t4/t6, Thái hậu) were already > 10 000 before this change, and many more at a51/a65 — not mine, untouched.
- rule.py: **F18** added (owner 20/11 ~15:05Z).

## Files
dev/art/t8-prompt-B/build.py, item_age.py, build_npc.py; dev/art/ART_RULES.md (F18 via rule.py); this report.

## ADD-ON (Foreman C 20/11 ~14:52Z, from CUT-SS): EYES sentence in every figure prompt
Problem: m18 t7 came out cross-eyed. The owner EYES sentence (face-common/make_nf4.py EYES_STRAIGHT: "Both eyes look straight at the viewer together: … never looking in two directions.") was only reaching the s-people through their face words.
Fix: store-all/build_all.py `build()` now calls `eyes()`. If a prompt doesn't already have the exact sentence, `eyes()` inserts it right after the "Her face: …" sentence. The text is read from make_nf4.py, so there is one source. Prompts that already have it stay byte-identical.
| age | had it before | has it after | changed (only this insert, 0 extra diffs) |
|---|---|---|---|
| a18 | 473 / 898 | 897 / 898 | 424 (m01–m52 × t1–t8 = 416, s16 × 8) |
| a26 | 473 / 898 | 897 / 898 | 424 |
| a36 | 474 / 898 | 898 / 898 | 424 |
| a51 | 474 / 898 | 898 / 898 | 424 |
| a65 | 474 / 898 | 898 / 898 | 424 |
Still without it: only c06 Thái hậu at a18/a26. That prompt does not build at all at those ages (pre-existing ERR "1811 section a18 AGE TEXT": Thái hậu is an elder state).
Gate: build_all CLI (store + approved check_store) PASS 10/10: m06 t1, m12 t2, m18 t3, m24 t4, m30 t5, m36 t6, m42 t7, m48 t8 (a18), s16 t7, m18 t7 a26.
LENGTH (open, foreman's call): the sentence is 193 chars. a18/a26: 0 prompts newly over 10 000. a36: 2 newly over (m23 t4 10 024, s16 t4 10 131). a51: 63 newly over, a65: 58 newly over (elder m-prompts, mostly t1/t5, which were already at 9 800–9 990 chars). Not trimmed: the brief says exact sentence, and other sentences are not mine to touch.
