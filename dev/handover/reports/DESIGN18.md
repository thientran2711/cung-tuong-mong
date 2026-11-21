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
