# DESIGN18 — xuân Hán s62 t1–t3 v2: no crossed inner collar (owner L1577 via Foreman C #14)
depth 5 (child of C #14; get_session not called, est.) · START_CTX ≈ 3 % (estimate) · end ≈ 12 % · 0 gens.

## What changed (A39: old text kept, only the asked part replaced)
Builder dev/art/seasons4/make_han_xuan_t13.py, COLLAR string, INNER ROBE clause only:
- OLD: "INNER ROBE: opaque mint mist, its own neat crossed collar just inside, crossing higher; its collar edged by {inner} in ice blue and gold;"
- NEW: "INNER ROBE: opaque mint mist, NO crossed collar, its top edge straight across below the collarbones; that edge edged by {inner} in ice blue and gold;"
  (mint mist/ice blue -> ivory white/peach-blossom pink by D4 as before)
- Outer collar unchanged and identical for t1/t2/t3 (the same COLLAR string was already shared, so t1 and t3 already = t2 outer). HEAD "bare neck and collarbones" kept.
- LIMIT 9990 -> 10000 (= check_store PROMPT_MAX). Reason: t3 was 9983 with all trims; any extra boilerplate trim is blocked by the gate (tried: master hairpin sentence -> M13 FAIL; ", never a single flat colour all over" -> S01/X02 FAIL; GRACE = per-rank pose, not cut). So the new clause is kept short (+12 chars) and no other words move.
Rebuilt files (word diff vs previous v2 = only the clause above):
- dev/art/seasons4/s62_t1_HAN_BAC_v2.txt 9475 chars
- dev/art/seasons4/s62_t2_HAN_BAC_v2.txt 9723 chars
- dev/art/seasons4/s62_t3_HAN_BAC_v2.txt 9995 chars (5 chars margin)

## Gates
check_store --scope tpN --age a22: STORE CHECK PASS x3 · keep_check --all 238 PASS (.keep sidecars need no new allow line: the removed phrase is not in the base s62_tN_HAN_BAC.txt).

## Rules checked
rule.py find inner robe / neckline / cổ áo trong: no existing inner-layer neckline rule. G25 (xuân = open neck) consistent; G21 (crossed collar a36/a51/a65) is for those ages, not a22 — no conflict; G20 (embroidered inner layer) is t7/t8 only. No conflicts.

## Open note
"no diagonal at the throat" words were dropped for length (t3 budget); "NO crossed collar" + "straight across" + HEAD "bare neck and collarbones" carry it. Outer collar still "curve down to cross high above the sash" (the t2 outer the owner likes).

## Addendum for Foreman C #14 / LADDER1 (owner L1580 audit), xuân t1–t3 v2 as built now
Embroidery density sentence (all three = make_han_bac.DENSE, H6/H12 Tần density from t4 open5, NOT the common t1–t3 store density):
"the robe body densely embroidered ALL OVER (not only the borders) with many {size} spring flowers spread over the whole garment, clearly more embroidery than any palace maid ({motif} in gold and ivory white)"
size: t1 "small-size" · t2 "small-size (a little larger than at the lowest rank)" · t3 "small-to-medium-size"; plus the store G8 rank clause (t1 hem band + small sprays on upper garment; t2 at sleeves and hem; t3 wide bands at sleeve ends and hem).
Outer robe vs sash: TUCKED/CLOSED UNDER the sash in all three. The words: collar "curve down to cross high above the sash"; "the robe closes only by its wrap and sash"; the sash/girdle is tied at the waist over the robe (t1 soft narrow sash, ends hanging down the front; t2 sash + one jade disc; t3 wide stiff girdle + jade pendants). Nothing says the outer robe hangs open outside the sash. (Contradiction to note: "the front edge falling straight down to an even hem" + "no wrap" sits next to "closes only by its wrap".)
