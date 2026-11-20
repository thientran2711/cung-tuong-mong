# DESIGN10 — Hán t4–t8: horizontal inner top + collar from the SHOULDERS (owner Lượt 1398, Foreman C #7)
depth 7 · START_CTX ≈ 4 % (get_session used_tokens read 0; own estimate) · Opus, prompt editing, 0 credits, NO gens.

## What I did
New prompts dev/art/seasons4/s62_t{4..8}_HAN_BAC_vai.txt (+ .keep), built by dev/art/seasons4/make_han_vai_L1398.py from the PRE-open bases (A39): t4 _gon2, t5 _gon, t6/t7/t8 _gon3. Only collar words were swapped:
1. The old wide-V / nested-V / "never a horizontal inner top" / bare-neck collar text was replaced by one block: "COLLAR FROM THE SHOULDERS: a real opaque pink inner top with a straight HORIZONTAL neckline across the upper chest, edged by <band>, covers the whole chest; the (plum outer) crossed collar(s) START AT THE SHOULDERS / begin at the OUTER shoulder points, never at the neck, and cross LOW at the sash, framing it; neck and collarbones visible above it; no cleavage, no sheer chest layer".
   Band: t4/t5 a flat gold-embroidered plum band · t6 a flat royal golden yellow band (replaces the old "yellow inner collar nested in the V", so t6 keeps the same amount of yellow) · t7/t8 a broad flat royal yellow pearl-edged band (like the current-outfit HQP layered neckline the owner loves).
2. Rank bands / signature pieces now run "along the (outer) collar edges" instead of "along the V / wide V": t4 three bands + pearl net along the two outer collar edges, shoulders → sash ("never on the inner top's neckline" replaces "never a horizontal band across the chest"); t5 two collar bands; t6 four bands + small flat yunjian; t7 five / t8 six bands; t6–t8 cloud collar still ONLY on the shoulders/upper back, ends slope down along the collar edges, "no fringe across the chest" kept.
3. "her neck, collarbones and the wide V neckline are fully visible, never covered by …" removed (neck/collarbones are now stated in the block). "nothing at the throat" and t7/t8 pearl strands from the V point kept.
Everything else (fabrics, jewels, crowns, colours, swatch lines, Image-2 sentences, captions) is byte-identical to the base. No boilerplate trimmed.

## Gates
Length (chars): t4 9928 · t5 9993 · t6 9914 · t7 9997 · t8 10000 (≤ 10 000).
check_store --scope tpN --age a18 (run from repo root) FAIL set = base: t4 M07 S12 S13 · t5 M07 S12 · t6 B12 M07 S07 S12 · t7 B12 S07 · t8 B12 S07.
A38: keep_check --sidecar PASS ×5; --all: 65 sidecars PASS.
Pics looked at: t4_open, t7_open (bare chest / sheer layer confirmed); t5/t6/t8 skipped to save image reads — the brief's fault list was enough.

## Word diff (Counter, base vs new) — collar words only
t4 lost: BOTH V×4 WIDE a×2 across and are as band broad but chest collarbones collars covered crossing edge×2 following fully×2 her×2 high horizontal×2 in inside lapels layered low meet modestly narrow near neck never×3 of×2 open or out×2 robes showing×2 sloping sweep the×4 tight to toward wide×3
t4 added: AT COLLAR FROM HORIZONTAL LOW OUTER SHOULDERS STARTS THE×2 above along at×2 begin cleavage covers cross edged edges×2 flat framing from gold-embroidered it its layer neckline no×2 on opaque outer×2 plum points real sash×2 sheer shoulder top's two upper whole with
t5 lost: BOTH V×4 WIDE and are as bands broad but collarbones collars covered crossing edge×2 following fully×2 her×2 high in×2 inside lapels layered low meet modestly narrow near neck never×2 of×2 open out×2 robes showing×2 sweep the×5 tight to toward wide×4
t5 added: AT COLLAR FROM HORIZONTAL LOW OUTER SHOULDERS STARTS THE×2 above across along at×2 band begin chest×2 cleavage covers cross edged edges×3 flat framing from gold-embroidered it×2 its layer no×2 opaque outer×2 plum points real sash sheer shoulder straight top two upper whole with
t6 lost: ALL ALSO Phi's V×7 WIDE a×2 are broad cloud collar×3 covered crossed-collar deep down edge×2 every fully her in×2 inner inside×2 is×2 lapels like lines meet near nested×3 of×2 only open×2 reach robe×2 robes sash shows so the×4 three to very whose wide×2
t6 added: AT COLLAR FROM HORIZONTAL OUTER SHOULDERS START THE×2 above across at×3 band×2 begin chest×2 cleavage covers cross edged edges×2 edging flat framing golden it layer neck no×2 opaque points real royal sheer shoulder straight their top×2 upper whole with yellow
t7 lost: ALSO Phi's V×6 WIDE all are collar covered crossed-collar deep down edge every fully her in inside is×2 lapels like lines meet near nested×2 of only open reach robe×2 sash shoulders shows so the×4 to×2 very whose wide
t7 added: COLLAR FROM HORIZONTAL OUTER THE above across at×3 band begin chest×2 cleavage covers cross crossed edged edges flat framing it layer neck no×2 opaque pearl-edged pink points real royal sheer shoulder straight top upper whole with yellow
t8 lost: ALSO Phi's V×6 WIDE are collar×3 covered crossed-collar deep down edge every fully her in inside is×2 lapels like lines meet near nested×2 of only open reach robe×2 sash shoulders shows so the×4 to×2 very whose wide
t8 added: COLLAR FROM HORIZONTAL OUTER THE above across at×3 band begin chest×2 cleavage collars×2 covers cross crossed edged flat framing it layer neck no×2 opaque pearl-edged pink points real royal sheer shoulder straight top upper whole with yellow

## Open
- Ready for a 1-sample gen when the owner says yes (A20/A21). Suggested first sample: t4 Tần (worst in the _open run).
- If the model still makes the inner top look like bare skin, next lever = name the inner top's colour as "bright blush pink silk" (currently "pink").
