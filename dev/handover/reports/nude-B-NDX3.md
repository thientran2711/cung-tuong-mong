# NDX3 — Nữ đế set B (m01–m52) — STOPPED BEFORE ANY GEN (19/11)
depth 3 · START_CTX ≈ 6 % (est.; get_session used_tokens read 0) · 0 gens · 0 credits

## Done
- Builder test: `build.py m01 v0 --state nude --spec5pose --nudeopt auto --nostyle --age aXX` runs for m-people (exit 0), but the face slot is EMPTY ("Her face: .") — m-people have no DATA face.
- `dev/art/nude-B/mk.py mNN` = that output + ONLY (1) face slot ← her v3 face words verbatim (KC_REFS.json, asserted present in mNN.v3.FULL.txt), (2) "Image 3" → "Image 2" (one-ref renumber as store-all/build_all.py l.98). Refs: image 1 = set-B cut (m01 hu2qEwOvqL), image 2 = swatch TdwDfOyVNR.
- m01 prompts: dev/art/nude-B/prompts/m01_a18..a65.txt (opt A; items lantern / poetry book / incense box / sutra book / almanac — no repeat; forehead tail = approved D9 sentence verbatim; crowns r11 unchanged).
- kc_ref.py --check PASS (no banned ref).

## BLOCKER (why no gen)
`check_store.py <prompt> --scope nude` = **APPROVED CHECK FAIL** on the 18/11-approved Nữ đế prompt (all ages):
- S07 MISSING "FABRIC: thick gold-embroidered brocade with a graceful, flowing drape." (Lượt 364, B12)
- S17 MISSING hands tail "Her hands interact naturally with the item …" (D3d 18/11)
- X05 BANNED stole/sash in the Pose at Nữ đế (Lượt 486) — the 18/11 pose says "holding the edge of her long sheer silk stole"
- S04 REWRITTEN (96 %): "flowers, clouds and dragons" vs gate "flowers, birds and {motif}"
The gate's nude scope was built on `--nude3` (store HH t8 + Nữ đế sentences): `build.py m01 v0 --nude3 --nostyle` → PASS. But --nude3 is the NDX1/NDX2 prompt the owner REJECTED in K16 ("prompt differs from the 18/11 approved").
So brief (K16: use the 18/11 prompt) and gate (FAIL = do not generate) contradict. Not ours to choose (A18). Question for ROOT-50/owner:
  (a) 18/11 prompt as is, gate waived for Nữ đế set B; or
  (b) 18/11 prompt + the later owner sentences S07/S17, stole removed from pose (X05), S04 wording; or
  (c) something else.

## UPDATE — ROOT-50 ruling (b), m01 SAMPLE drawn, then HOLD (owner Lượt 573)
Exact diff vs the 18/11 approved prompt (`build.py mNN v0 --state nude --spec5pose --nudeopt A --nostyle`), applied in mk.py, nothing else:
1. face slot (empty for m-people) ← her v3 face words verbatim (KC_REFS.json / m01.v3.FULL.txt)
2. "Image 3" → "Image 2" (one-ref: no style image; swatch = image 2)
3. S04: "All flowers, clouds and dragons are fine …" → "All flowers, birds and the dragon are fine …" (approved sentence, motif slot as in store)
4. S07 added before "The silk has real weight:": "FABRIC: thick gold-embroidered brocade with a graceful, flowing drape."
5. X05 stole/sash out of the pose: the stole clause → ", the other hand gently touching it" (pose 0: "{item} in one hand, the other hand gently touching it"; pose 4: "her long sheer silk stole over both arms" dropped)
6. S17 added after "no flying, floating or windblown cloth.": "Her hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while her head stays up facing the viewer, eyes open, lips closed, never looking down."
Gates: check_store --scope nude PASS (5/5 ages), kc_ref.py --check PASS.

| age | item | gen | cut |
|---|---|---|---|
| a18 | lantern (3/4 right) | lJtTEpsgv9 | 1ldzhztr4r |
| a26 | poetry book | Lw8cEw5swO | JNCdk2ZOq4 |
| a36 | incense box (3/4 right) | eIPjAGOdqL | jUoWumoLD0 |
| a51 | sutra book | lJtTqydgv9 | xSBYuHpjfW |
| a65 | almanac | Cqn4BSNEEy | p8yxnovehw |
gpt-2-6 1024x2304 2k, no seed, refs hu2qEwOvqL + TdwDfOyVNR, 5 × (135 + 3 cut) = 690 credits. Sheet: dev/handover/review-sheets/nu-de-B/nudeB_row_m01.jpg
NOTES for the owner (LAW #0 — notes only, no change unless she asks): a18 lantern reads more like a pouch; a26/a51/a65 items are all crimson books (different items, same look); forehead clean on all 5; a51 silver streaks visible, a65 mostly silver.
STATUS: HOLD — no m02+ until owner GO.

## UPDATE 2 — owner verdict on m01 (Lượt 583, via ROOT-51): prompts fixed, NO gens (HOLD until owner GO)
New diff (on top of ruling (b)), mk.py + _build_item.py:
7. F11 hair — before " Outfit (the Female Emperor": "Hair: ALL of her hair is pinned UP in a neat high imperial bun (chignon) under the crown, at every age; NO loose hair: nothing hanging down her back, over her shoulders or in front of her chest."
8. E11 interim items (until IT1's 25-item list): approved Nữ đế item list (NUDE_LIST) minus the 2nd fan = 9 items; person n gets 5 consecutive from index n-1, one per age → never two alike in one person. `_build_item.py` runs build.py unchanged except age_item() for tier 'nude'.
   m01: a18 jade seal · a26 dragon sceptre · a36 edict scroll · a51 ruyi · a65 round fan.
9. D13 a51 only — before the hair sentence: "She looks younger than her age but is still clearly about 50: never like an 18-26-year-old, with soft fine lines and clearly visible silver at the temples."
(Builder BW3 now fills the face words itself; mk.py checks they appear once.) check_store --scope nude PASS 5/5.

## UPDATE 3 — BW4 identity sentence + IT1 item lists (no gens)
- BW4 b4b796a: identity sentence now "keep ONLY her face, facial features, hair COLOUR and signature colour family; do NOT copy poses, outfit, HAIRSTYLE, …".
- E11: items = IT1 build.py NUDE_LIST (25) / NUDE_AGE (5 per age), pick NUDE_LIST[NUDE_AGE[age][(n-1)%5]] (commit 438794d); interim 9-item list removed.
  m01: a18 dragon tú cầu · a26 pipa · a36 jade mountain carving · a51 table screen · a65 edict scroll. check_store --scope nude PASS 5/5.

## UPDATE 4 — person switched m01 → m05 (Sắc sảo; owner: only Sắc sảo/Tinh nghịch faces), rebuilt on 98fa7a3 (BW5 elder-copy, E6) + 877944c (F13). No gens.
m05: ref KLpSlnEkqp + swatch TdwDfOyVNR, outfit A. Items a18 white-jade flute · a26 dragon parasol · a36 jade calligraphy brush · a51 jade tiger tally · a65 gold dragon hand warmer.
a51/a65 colour rule now builder "DEEPER, DARKER" (no "never darker"); bun sentence 1/age; D14 wide grep 0 (face has "double lids" = shape only). check_store --scope nude PASS 5/5; kc_ref --check PASS.
m01 is STOPPED (Tươi tắn); its prompt files are left as they were, not rebuilt.

## UPDATE 5 — m05 sample drawn (GO ROOT-54, resumed by user): 5 gens + 5 cuts = 690 cr
a18 lJtM5RKgv9/xSBcFrNjfW · a26 If37DjEtvE/Lw8T5OwswO · a36 EbY6t3XuuO/BhNSM53oQR · a51 ksenFd616B/bxMAuPm5Y2 · a65 Lw8TktAswO/KLpnLBAkqp
Sheet: dev/handover/review-sheets/nu-de-B/nudeB_row_m05.jpg (516 KB, 3-line tags).
Notes (LAW #0, no change): face round/young (owner: reads "baby", face block being rewritten by NF3); a36 brush small; a51 tiger tally reads as a round jade plaque; hair in bun at all 5 ages; forehead clean; a51 silver temples, a65 mostly silver; elder colours deeper.

## HANDOVER (NDX3 → successor; ROOT-54 opens it) — 19/11 ~21:08Z
depth 3 · START_CTX ≈6 % · now 57 % (> START+25 % = 31 %, near 60 % ceiling) → rolled over, NEW JOB NOT STARTED.
NEW JOB from ROOT-54 (owner on m05 sheet: "sleeves don't reach the floor, sleeve fabric wrong, compare with Hoàng hậu"):
 1. Build the HH t8 prompt (`python3 dev/art/store-all/build_all.py m05 t8 --age aNN`, see TH1 example dev/handover/review-sheets/thai-hau-sample/v624/m05_thaihau_a36.B22.prompt.txt + DIFF_vs_1811_c04.md) and DIFF vs dev/art/nude-B/prompts/m05_aNN.txt for sleeve/fabric/drape/embroidery sentences. Known missing: "SLEEVE LENGTH (rank law): very long, very wide sleeves that hang down past her ankles until they touch the floor." and "ONE SINGLE SLEEVE LAYER: each sleeve begins at the shoulder and falls in one piece; NO shorter outer sleeve, NO half-sleeve or elbow-length layer, NO short jacket sleeve or cuff layer visible on top of it." Copy every HH sleeve/fabric sentence VERBATIM into dev/art/nude-B/mk.py (all ages; keep Nữ đế outfit/crown/colours) + an assert that each is present once; rerun check_store --scope nude + kc_ref --check.
 2. Redraw m05 Nữ đế a18–a65 (5 gens, gpt-2-6 1024x2304 2k, no seed, folder ba4aecfe-efce-47e2-b53f-30d292091886, refs KLpSlnEkqp + TdwDfOyVNR, prompt pasted verbatim from the file), look at each full size (sleeves to the floor, single layer, HH fabric look), redo failures (A21), remove_bg each, ledger with `python3 dev/art/nude-B/log.py m05 aNN GEN CUT 138 "note"`.
 3. Sheet: old row (current nudeB_row_m05.jpg cuts: xSBcFrNjfW Lw8T5OwswO BhNSM53oQR bxMAuPm5Y2 KLpnLBAkqp) above new row, ≤600 KB → push; report commit + path + diff table to ROOT-54 (session_01PEhRbwzgZmC7Bj99eCHvUz).
Tools/files: mk.py (prompt maker, reads IT1 NUDE_LIST/NUDE_AGE via _build_item.py; a51/a65 age+colour from dev/art/elder-copy/THAIHAU_1811_AGE_COLOUR.md), log.py (ledger). Sheet code: see git history of this report (PIL row, 3-line tags, quality loop to ≤600 KB).
State: m01 STOPPED (Tươi tắn); m05 old row 690 cr spent (5 gens) — sheet nudeB_row_m05.jpg (f9bcae8). Rules to keep: A18 LAW #0, B8 one ref + swatch, D9/D14, E11, F10, F11 bun, J6, K16. HOLD/STOP from owner wins at once; read notifications between every gen.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
