# BW4 — ROOT-51 jobs (BW3 "Part 2 / NOT done" items 1–8)

depth 4 · START_CTX ≈ 6 % (get_session used_tokens read 0; my own estimate) · builders only, NO generations

## Done
**(a) B18 tone (Lượt 586/590/592, model = foreign princesses nc1–nc3)** — `t8-prompt-B/build.py` `LOW_TONE` (used by t1–t6, and swapped in at t7/t8/Nữ đế a18–a36) is now:
"all colours clear, soft and gentle at a medium-light tone, like fine silk in soft daylight: medium-soft saturation, pretty and clean, the secondary colour a real pretty colour (it may be a little deeper or a soft ivory, never heavy, never black, never grey), never rực, never glaring, never neon, never pastel-washed or faded, never dusty, grey, muddy or black; "
(the old "same as the soft coral-red and brick-red robes of the game" benchmark is gone). Gate S02 + S03 carry the same words (S03 = t7/t8/Nữ đế, was prompt-B "fresh, clear and luminous").
- Maids (held back): `TM_TONE` + the young maid COLOUR RULE now say soft / held-back / clear but quiet, NOT fresh or bright, NOT grey.
- Ma ma a36 ("slightly too fresh"): "a soft, gentle, held-back medium tone (clear but quiet, never fresh or bright, never pale or pastel-washed, never dark, never grey, never brown)".

**J2 elder (calmer / less saturated, NOT deeper/darker)**
- `AGE_TXT` a51: "…every colour is a calmer, less saturated mature shade of the same hue at about the same lightness, quieter, never darker or heavier (e.g. pink becomes a soft muted rose, blue … a calm muted blue, green … a quiet muted jade, purple … a soft muted mauve, red … a muted rose-red; the royal yellow becomes a soft muted antique gold); dignified and calm, never bright, never grey." a65: "an even calmer, more muted, less saturated shade … never darker or heavier".
- `__main__` a51/a65 swap (gate S33): "all colours in calmer, softer mature shades of her own colours (the same hue at about the same lightness, only less saturated and quieter: elegant and dignified, never darker or heavier, never bright or rực, never pastel-washed, never grey, dusty, black or brown); … quieten them as described above;" (+ a65 "a little more muted than at 51 but never darker").
- Royal yellow elder image-3 sentence + N4b strings: "calmer, muted antique-gold".
- Ma ma `step` a51/a65 (green "turning grey-toned / green-grey" removed too — B19). Maid elder clause: "calmer, more muted, less saturated … never darker or heavier … never grey".
- NOT touched: ty-cold trung y a51/a65 ("deeper, more muted" / "DEEPER than her 51-year-old trung y"); `_A51EX` frozen to the old example list so that state is byte-identical. **Question for ROOT-51: rework it too (J2 says everyone)?**

**(b) K18** — `build.py gen_refs`: any live game ref (url with `img/` outside `img/_review`/`img/_keep`, or a "live …" entry) → `REFUSED K18 …`, exit 2 (`--golden` exempt). So the old 2-image ma ma path (MAMA_REF = img/fig-mama-k01-a36.webp) now refuses; the one-ref path is unchanged (ref = KC cut). `check_store.py`: FAIL "K18 LIVE GAME FILE" for any `img/…` (not _review/_keep) or `fig-*.webp/png/jpg` in the prompt text or `--refs` (tested: `--refs KLpSlnEkqp,img/fig-mama-k01-a36.webp` → FAIL).

**(c) B19** — `check_store.py` `grey_hits()`: grey colour words (silvery/silver/pale grey, grey-blue/-sage/-lilac/…, greyish, ash…) not negated and not about hair → printed as `FLAG B19 GREY` (WARN, not FAIL, so gates stay 0 FAIL; set `B19_FAIL=True` once the data is clean).
People whose data has grey (drawn = KC ok):
- name word grey: **m06** main "pale blue-grey" (#DDCFC8); TM_FADED[0] "grey-blue" (tm0 cung nữ thô sử, people with n%3==0).
- **main hex is measured grey (HLS S < 0.15) although the name is a colour**: m03 slate blue #B7AFAB (S .08), m11 sky blue #B6B6B8 (.01), m18 powder blue #BFB5AE (.12), m20 slate blue #A79E9C (.06), m21 aqua celadon #C4BFB2 (.13), m25 lavender violet #B49EAD (.13), m33 lavender blue #AC9CAE (.10), m39 sky blue #BDB6BD (.05), m43 periwinkle #ACA0A5 (.07), m45 pale sky blue #C7C2C1 (.05), m49 powder blue #CBC1C2 (.09), m51 pale mint #C0BDAB (.14).
- listed secondary "silver" (m02 m03 m06 m11 m13 m21 m25 m29 m30 m33 m37 m39 m43 m49 m51): NOT used — `secondary()` replaces silver with a contrast colour, so prompts do not say it.
- **nc1–nc3 DATA = placeholder "dusty teal-blue and silver"**, not their owner colours (nc1 indigo #5E6694 + ivory #EAD7BF; nc2 jade #9EB28F + rose #CF7E83; nc3 wisteria #CCA7C8 + rose-red #D18A92). Their ma ma prompts use the placeholder. Need ROOT-51 GO to put the owner's nc colours into DATA.
- held (not drawn): c02 c05 c09 c11 c29 c30 c32 (grey secondaries), c31 silver.
→ ROOT-51: replacement colours for the list above (LAW #0: not changed by me).

**(d) G16** — nữ quan tm4: "round collar" → "a crossed collar (jiaoling) closing to the right". Static unused files left alone.

**(e) F11 maids** — at a36/a51/a65 every maid (tm0–tm4) and ma ma: the identity line "her own hairstyle (the same at every rank) and hair colour" → "her own hair colour (her hair ALL pinned UP in a neat bun, as described below)"; tm3: "ALL her hair swept UP into a neat bun (chignon), nothing loose down her back, with one gold hairpin and a small gold comb in the bun"; tm4: "…worn over her hair, which is ALL pinned UP in a neat bun under the cap (nothing loose down her back)". a18/a26 unchanged.

**(f) nude-B/mk.py** (ran on m13, outputs deleted again): B18 tone + J2 elder come through build.py ✓; F11 hair UP at every age ✓; D13 ✓ but now said twice at a51 (AGE_TXT D13 sentence + mk.py's own D13) — harmless, flag only; B17 not applicable (Nữ đế has no TWO/THREE-COLOUR rule). No change made.

**(g) build_npc.py** — STYLE_REF 6AbGv6EiJO (l.52) + `img/hd/fig-<id>-a18.webp` own live figure (l.279–280) are still the refs for men / eunuchs / officials / physicians / Thái hậu. They break B8 + K18, but these NPCs have NO set-B ref. **Question for ROOT-51 (owner): what replaces their refs?** Not invented, not changed.

**(h)** `ty-cold-mass/make_batches.py`: header + columns now = ONE ref = KC_REFS cut id (not drawn → HELD), command gets `--nostyle`, no IDX/CDN live-file lookup, no 6AbGv6EiJO. `owner-copy/mk_hqp_hh.py`: templates drop the retired style-image sentence and use the B18 LOW_TONE (verbatim copy, checked equal); tpl_hqp/hh/hh_orig.txt rewritten. Flag: those templates still say "with {SEC} like {HEX2} in the linings" (B17 stale-lining wording) — not changed (not asked).

## Notes (LAW #0: flagged only)
- `build_all.py --check aNN` ignores the positional age: the age needs `--check --age aNN`. Earlier "0 FAIL ×5" runs written as `--check a51` were really a18 five times.
- tm1 outfit still says "a fine fresh {main} silk" (word "fresh").

## Gates
- `check_store.py --self`: 35 sentences, 14 banned, 0 problems (S02/S03/S33 proofs = `dev/art/approved/proof/bw4_*.txt`).
- `build_all.py --check --age a18/a26/a36/a51/a65`: **0 FAIL ×5** (416 drawn prompts each, 312 HELD)
- Samples (STORE CHECK PASS): `dev/handover/reports/bw4-samples/` m13_t2_a36, m13_t7_a51, m05_mama_a51 (`--nostyle --twocol "deep teal" --noflower`, refs KLpSlnEkqp), m13_tm3_a36, m13_tm4_a36.

## HANDOVER line
BW4 done (push + report). Open questions for ROOT-51: grey replacements (B19 list), nc1–nc3 DATA colours, build_npc refs, ty-cold J2.

---
# Part 2: ROOT-51 add (from MMX4) — identity sentence = owner reference law
- `build.py` `__main__` (every mode: t1–t8, Nữ đế, triều, maids tm0–tm4, ma ma, states; `--golden` exempt) rewrites every identity-sentence variant (the "hairstyle colour" ones, maid "her own hairstyle (the same at every rank)", Nữ đế "the reference's poses, outfit…") to the owner's words:
  "From the identity reference keep ONLY her face, facial features, hair COLOUR and signature colour family; do NOT copy poses, outfit, HAIRSTYLE, hair ornaments or accessories of the reference, dress her in the NEW outfit below."
  An assert stops the build if any old variant is left. My Part-1 maid/ma ma ident swap was removed (this replaces it).
- The rank hair lines no longer say "her own hairstyle (exactly as in her first reference)", which would contradict "do NOT copy HAIRSTYLE". `store-all/build_all.py` (Hair: is a gate SLOT):
  - t1–t3 at a18/a26: "Hair: her own hair colour, LOOSE and flowing (at most the top half gathered up, most of her hair hanging down her back), with …" (F11 + HAIR_LOW).
  - t1–t3 at a36+: unchanged (bun).
  - t4–t6: "Hair: her own hair colour, ALL her hair swept UP into a high bun / chignon, decorated with …" (HAIR_HIGH).
- Not touched (men, flagged): emperor-B and build_npc IDENT_M still say "his face, facial features and hairstyle colour".
- Flag: `build.py mNN --state ty1..ty8|cold --nostyle` crashes ("style sentence not found"). It crashed the same way before my edits.
- Gates after Part 2: check_store --self 0 problems; build_all --check --age a18..a65 **0 FAIL ×5**; maid tm0–tm4 + ma ma samples STORE CHECK PASS.
