# REDRAW3 — 8 ranks in the new tone: m19 DONE · c06 BLOCKED · m39 dropped
depth 3 · START_CTX ≈ 4 % (context_usage read 0; my estimate) · worker for Foreman C ROOT-68 (session_01PEhRbv5MJBsBwzuyDQxpDD)
Owner order 07:45Z 20/11: redraw the 10 people in the new tone. ROOT-68 changed it: do NOT draw m39 (it stays in Kho); draw only m19 and c06.

## m19 (Dịu dàng) — t1–t8 drawn, 1 try each
- Builder `python3 dev/art/store-all/build_all.py m19 N` at baaf55f, which includes the ANG14 angle fix 64b798f. Prompts are in dev/art/rank8-m19/m19_tN.txt. I typed no words by hand and changed no wording (A17: no diff).
- Gate `check_store.py dev/art/rank8-m19/m19_tN.txt m19 [--low N|--t7] v0 --spec5pose`: STORE CHECK PASS + approved_check PASS for all 8.
- Settings: gpt-2-6, 1024x2304, 2k, seed 7172, folder ba4aecfe. Ref image 1 = m19 v3 cut tCRQ0thmZJ. For t6–t8, image 2 = royal swatch TdwDfOyVNR.
- Gens: t1 EbYGtmwuuO · t2 P3QCUdD42C · t3 hu23Be4vqL · t4 nVsxZfWYQD · t5 BhNPDY5oQR · t6 O6EaUWJynm · t7 s7IBrfql8e · t8 xSBekJWjfW. Ledger kind REDRAW3-M19.
- Cuts (3 cr each): yiufJaxPW9 8ai9BNiIrU yiufJEsPW9 9ZHuPq6NYZ 0eUlW7dTfW nVsxGShYQD 1ldDK81r4r vQARmcea47. Ledger kind REDRAW3-M19-CUT.
- Credits: 8 × 135 + 8 × 3 = **1 104 cr**. Balance before: 80 070.
- Sheet: dev/art/rank8-m19/m19_8bac_sheet.jpg (each figure labelled tN · rank / m19 · Dịu dàng / place).
- Cut-outs: dev/art/rank8-m19/cut/m19_tN_cut.png, RGBA 1024×2524 (native figure + 220 px label band). Checked on a dark background: clean, and the gauze shawl keeps its partial transparency. Script: dev/art/rank8-m19/make_sheet_cut.py.
- Colours = what the builder outputs: caramel apricot #CE9F7E + teal #499597 (the root_drawn pair). palettes_season.json has a toned secondary, #55A1A3, but I did not use it (A18). Royal yellow grows from t6 to t8 and is dominant at t8.

## Looked at full size — notes only, NO redraw (A20/A21)
- OK: the same face at all 8 ranks. Mouth closed, no teeth, eyes level. Hair loose t1–t3 and up t4–t8. One hair flower t1–t6, growing in size; none at t7/t8. No pet at t7/t8. No fruit. Angles follow ANG14.
- (n1) F15? At t2, a pearl dangle from the hairpin hangs right by the ear. At t5 and t6 there is a small gold drop at the earlobe that may read as an earring. Owner to judge.
- (n2) t3: the "pellet drum" item came out looking like a round hand mirror or fan with a silver handle.
- (n3) t1: one silver hairpin with dangles points a little sideways.
- (n4) t6: a songbird perches on her finger. Pets are allowed at t1–t6 (F17); the builder chose this pose.
- (n5) t5: a tiny bird is embroidered on the skirt (allowed motif).
- (n6) The place labels go by rank (t1–t3 phòng phối chung, t4–t6 chính điện riêng, t7 cung HQP, t8 Khôn Ninh). m19's own palace name is not known to me.

## c06 — BLOCKED (not drawn)
`build_all.py c06 N` → "REFUSED c06: NOT drawn (ART_RULES B8)". In KC_REFS.json, people.c06 has m09_ok NO, ref_id null and no face_words. FACE_MAP_L703 has c06 v5 (Sắc sảo, cut hu24KgZvqL / gen p8ylaCXehw). A KC_REFS row is needed first, done the same way RANK8-C did it for s62/s64/s65. I asked ROOT-68 for a GO.
