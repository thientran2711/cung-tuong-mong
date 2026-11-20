# DESIGN9 — Hán OPEN NECK (owner Lượt 1389) — Opus, prompt editing, 0 credits
STATUS: depth 7 (limit 8) · START_CTX ≈ 3 % of 1M window (get_session read 0; own estimate) · done, no rollover needed.

## Owner (verbatim, L1389)
"Toàn bộ cái prompt của hắn phục mới, không có một cái prompt nào mà cái cổ mở luôn, mặt cổ kính mít." → every Hán collar drawn CLOSED.
Looked at t4_tan (L1371) + t8_HH_circled (L1380): yes — tight high crossing at the throat, stacked bands + nested inner V collars fill the whole opening.

## What I made (gens: 0)
dev/art/seasons4/s62_t{4..8}_HAN_BAC_open.txt (+ .keep). Bases: t4 gon2, t5 gon, t6/t7/t8 gon3. Maker: dev/art/seasons4/make_han_open_L1389.py.
1. NEW first line of every prompt: `OPEN-NECK LOOK: collar wide OFF the neck: bare neck, collarbones and upper chest.`
2. The open-neck statement is now the FIRST thing in the Outfit block (right after "Outfit (rank…): "), positive + concrete:
   t4/t5: "the collar is worn OPEN, pulled wide OFF the neck: its two edges start at the OUTER shoulder points and run straight down to cross only LOW at the sash; between them BARE SKIN: the whole neck, both collarbones and the upper chest to mid-chest (modest, no cleavage, shoulders covered); the pink inner collar lies flat just inside those edges, never a straight horizontal inner top or band across the chest; all collar bands lie flat only along those edges, leaving the skin open"
   t6/t7/t8 (shorter, no room): "the collar is worn OPEN, wide OFF the neck: its edges run straight from the OUTER shoulder points to cross LOW at the sash, BARE SKIN between them: the whole neck, both collarbones and the upper chest to mid-chest (modest, no cleavage, shoulders covered); inner collars and FOUR/FIVE/SIX NARROW (gold) collar bands lie flat only along those edges, leaving the skin open, no horizontal inner top" (t8 prefixed "all collars soft and draping like the Hoàng quý phi's, never stiff, worn OPEN, …").
3. Removed what filled the V: the old "lapels sweep/reach … meet low in a broad V" text, "every inner robe is ALSO a crossed-collar robe whose collar is a V nested inside it …" (t6–t8), "nothing at the throat; her neck… never covered by…".
4. Bands: WIDE → NARROW, "along the two outer edges" (count = rank kept: 3/3/4/5/6; band colours kept). t6 RANK BLOCK now "the four collar bands (outermost a narrow royal golden yellow band)".
Everything else (fabrics, jewels, signature pieces, crowns, colours, F2BC61/EFBD69 swatch lines, Image-2 sentences, caption) untouched.

## Gates
Length: t4 9914 · t5 9993 · t6 9911 · t7 9995 · t8 9996 (≤ 10 000).
check_store --scope tpN --age a18 FAIL set = base: t4 M07 S12 S13 · t5 M07 S12 · t6 B12 M07 S07 S12 · t7 B12 S07 · t8 B12 S07.
Rejected trims (add E1): "her head turns together with her shoulders and body" inside the ANGLE sentence (t4–t8).
A38: keep_check --sidecar PASS ×5; --all: 58 sidecars PASS.

## Lost words (Counter base − new)
t4: BOTH SHOULDERS The V×3 WIDE×2 a×3 and×2 are as board-like broad but by collars creases crossed crossing edge×2 fold following fully×2 hang her×2 high in it lapels layered low meet modestly narrow natural naturally near neckline never×4 nothing of×2 or out×2 own plum robe robes showing×2 sleeves stiff sweep the×2 their throat tight toward under visible weight wide×2 with
t5: same as t4 minus following/it/or, plus in×2 (never×3, a×2, out×1, the×1)
t6: ALL ALSO Phi's SHOULDERS V×5 WIDE×2 a×4 are broad by cloud collar crossed crossed-collar deep down edge×2 every fully her in inside×2 is it lapels like lines meet near neckline nested×2 never nothing of×2 open pink reach robe×2 robes sash shows so stacked the×4 three throat very visible whose
t7: ALSO Phi's SHOULDERS V×5 WIDE×2 a×3 all are broad by collar crossed-collar deep down edge every fully her in inside is it lapels like lines meet near neckline nested×2 never nothing of reach robe×2 sash shows so stacked the×4 throat very visible whose
t8: as t7 but collar×2 is×2 the×5 (no "all")
Only non-collar words lost: t4/t5 boilerplate dup "The wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like." (dup of the FABRIC sentence; DESIGN8 t6 precedent; M07 master copy untouched). No outfit/jewel/embroidery word lost.

## Open questions for Foreman
- t4 still carries approved S13 "COLLAR CUT (flowing): the collar lines are soft CURVES, never flat; … opening gradually in a long soft V toward the hem" — "soft CURVES" may pull the collar back to a closed curve. Not cut (approved sentence, not in my brief); owner may want it changed.
- t7 keeps "a layered pearl-and-gold necklace" (HQP LUXURY) — it will now sit on bare skin; fine with "nothing at the throat" gone? Ask owner if needed.
- Not generated (A20/A21). Suggest one sample (t4 Tần) first if the owner says yes.
