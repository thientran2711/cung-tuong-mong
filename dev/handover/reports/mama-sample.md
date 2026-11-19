PRIORITY #1 CHECK ('ma ma'): OD 26 | ledger 0 | claims 8 | main 15 | review/* 0 | archive 48

# MM1 mama-sample: STOPPED after STEP 1 (wording NOT recoverable; nothing invented, 0 gens, build.py untouched)

## What I searched
- git (handover branch HEAD + origin/main depth 30): `mama`/`ma ma`/`fig-mama-k01` in dev/figwork, dev/archive, dev/handover, dev/art, dev/site. Only hits: FIGURE_GATE line 496 (rule: ma ma = NPC outfit, a51/a65 brown), build.py `MAMA_PENDING=None`, coverage notes, batch-w1-hero-misc.md (says the k01 pilot 2k master is Magnific `bxVSNT35Y2`). No outfit wording anywhere.
- Magnific folder ba4aecfe (all 23 hits for "mama" + history since 17/11 12:00Z + "brown" search): stored prompts read in full.

## What exists in Magnific (all 17/11, gpt-2-6 752x1344)
1. `bxVSNT35Y2` = pilot master of fig-mama-k01 = the **pink** a18 picture (peach-pink hanfu, flowers, pink hairpiece, handkerchief). Magnific read returned the image only, no stored prompt.
2. 8 "palace maid-mama" recolour gens (orange-apricot ksp3gsV16B, 4RQeZ4l9Aa; peach w4v04Nu7EI, Bh9rhtCoQR; saffron huZgfr6vqL, JNfVPZxOq4; gold-yellow yiEMyT0PW9, huZlh1ivqL). Wording = "servant-rank embroidered fine silk hanfu in the same cut as image 1 ... recoloured to ...". **None is brown**, none matches the live a36/a51 look.
3. 3 "Four senior palace matrons" sheets (bxTRl8b5Y2 has a plain dark-brown robe for woman A) = plain robe, not the rich embroidered outfit.
4. Catalogue icon VXURBZ5MMU: head matron robe = dark olive-green brocade, brown trim (not the live brown).

## What the live picture is (looked at fig-mama-k01 a18/a36/a51 on CDN; a65 = 404, does not exist yet)
- a18 = pink maid hanfu (the pilot master).
- a36 and a51 = rich **brown** (russet-mauve brocade) outfit: sleeveless embroidered over-vest with stand collar, cream-pink flower embroidery, wide layered sleeves, long front panel, olive-gold bow sash, jade pendant with orange tassel, layered pleated skirt with flower hem band, small gold hairpin. The prompt that made the brown a36/a51 is NOT stored anywhere I can reach (probably an 18/11 gen outside folder search terms or from a different tool/session).

## Decision needed from ROOT-39 / owner
(a) Name the gen id / session that produced the brown a36/a51 (I will read its stored prompt and use it verbatim), or
(b) approve me writing the MAMA wording from the picture above (that is invented wording = RULE 0 says no; needs owner OK), or
(c) owner picks another reference sheet.
No credits spent. build.py MAMA_PENDING unchanged.


---
# UPDATE 19/11 ~03:30Z: STEP 1 + STEP 2 DONE after owner GO (via ROOT-39, 03:15Z)
PRIORITY #1 CHECK ('ma ma'): OD 26 | ledger 0 | claims 8 | main 15 | review/* 0 | archive 48

## STEP 1: MAMA wording = **worded from live a36/a51 picture, owner GO 03:15Z** (not copied: no earlier prompt exists)
build.py `build_mama()` / `--state mama` (commit 541fd38). Cut/layers read off the live brown picture: sleeveless embroidered over-vest with stand collar + knot button, crossed inner robe, wide layered sleeves with cuff band, long front panel, pleated skirt with flower hem band, olive-gold bow sash, jade pendant with tassel, cream-blush peony/plum embroidery. Colour: a51/a65 = the NPC brown (a65 deeper); a36 = her palette colour (FIGURE_GATE l.496, "younger ages = normal colours"). Image 3 = live fig-mama-k01-a36 (costume only). `--refs` order: 1 style 6AbGv6EiJO, 2 her own live maid picture (face), 3 live k01 a36. Pink a18 ignored (a maid outfit).

## STEP 2: 3 gens (gpt-2-6 1024x2304 2k transparent, 405 credits), m01, builder stdout, ledger lines 12-14, --verify 3 lines 0 FAIL
(Caveat: the prompt I sent was copied from builder stdout; `--log-fill` used the builder text, I did NOT re-read the stored prompt back from Magnific.)
| age | gen | face ref (image 2) | item |
|---|---|---|---|
| a36 | DoO8cQlpcl | live m01 a36 | feather duster |
| a51 | p8yI0gCehw | live m01 a51 | abacus |
| a65 | yiu3UhDPW9 | live m01 **a51** (m01 has no a65 picture on the CDN, 404) | walking cane |

SHEET (one row, full size): live k01 a36 | live k01 a51 | new a36 | new a51 | new a65 -> https://ctm-img.victoria-tntt.workers.dev/img/_review/mama/sheet1.jpg  (also img/_review/mama/live.jpg earlier)

## Honest faults (I looked at each + a face close-up vs the live m01)
1. **a36 face/hair drift**: new a36 is younger-looking with double-loop buns + a pink peony and tassel pins; live m01 a36 has ONE dark bun and a single gold pin. Identity NOT matched at a36 (looks like her a18). a51 and a65 keep her face/hair family well (grey bun, same pins), a65 plausible.
2. a36 green is the normal-colour reading of the rule; if the owner wants a36 brown like the live NPC a36 that is a one-line change (elder -> all ages).
3. a51/a65 brown reads a touch redder/smoother than the live (live is a muted, slightly mottled mauve-brown). Cut, vest, sash, tassel, hem band all match.
4. Hands: five fingers, held items gripped, lively enough; a65 hands rest on the cane head (more static). Feet/hem inside canvas.
5. FIGURE_GATE OD:L12 says mamas wear a thin pink silk veil; the live NPC and these have none (builder has no veil sentence for ma ma) - owner decision needed.
6. Not tried: a18/a26 ma ma (owner: 18 is a maid, not a ma ma); no regen spent (max 6, used 3).
