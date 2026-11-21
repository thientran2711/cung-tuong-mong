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

## JOB 2 — THU s62 t1–t3 swap (owner L1590 + L1592 G40 + L1595 G41, via Foreman C #14) — 0 gens
History: first brief (new non-Tang t2 body in TIER_LOW) was drafted in build.py and REVERTED unpushed after C #14's L1592/L1595 messages
(no invention; thu only, in the thu builder, not the common source). TIER_LOW / store / G17 untouched → G17 stays true for the store; no rule.py change.
Builder: dev/art/dapung4/make_thu_L1595.py (A39: base = each rank's current thu final; only outfit-design words + caption swapped; every new word copied):
- dev/art/dapung4/s62_t1_COMOI_v3.txt (9464) base t1_COMOI_v2d. Đáp ứng = mẫu C look: the layered-neckline words of thu t2 v2d (2-band border, motif → lilac sprays, label "(the Thường tại edge)" dropped) + mẫu C body words verbatim from dapung4/s62_t1_tu_thuongtai_C.txt ("plain {sec} cuff bands without embroidery, delicate embroidered {motif} only at the hem, and a plain narrow silk sash", colour/motif slots → blush/lilac sprays) + G40/picture: "tied in a bow at the natural waist OVER both layers, holding the outer robe in so it hugs the body (never a loose open coat), over a long full flowing skirt, never tied high at the chest". Removed: Tang ruqun, chest-high ribbon skirt, wide embroidered cuffs + undersleeve, hem band, upper-garment sprays, DENSE.
- dev/art/dapung4/s62_t2_COMOI_v3.txt (9963) base t2_COMOI_v2d. Thường tại = the thu t3 v2e Quý nhân garment (court robe + layered neckline with wide embroidered band + girdle + ONE apron panel + jade pendant sets + sheer shawl), motif → tiger lilies, "(the Quý nhân edge)" dropped, density = TIER_LOW t2 "delicate embroidered tiger lilies at the sleeves and hem" (instead of t3's wide bands), girdle + G40.
- dev/art/dapung4/s62_t3_COMOI_v3.txt (9840) base t3_COMOI_v2e. Same look with TWO apron panels: "from which hang down the front TWO embroidered blush APRON PANELS side by side (two long narrow ceremonial front panels, …) reaching to the ankles; on each outer side of the two panels hangs …", girdle + G40, DENSE removed (t3 keeps its G15B "wide embroidered … bands at the sleeve ends and the hem").
G40 girdle words (t2/t3): "a wide soft blush silk girdle tied OVER the outer robe at the natural waist, holding it in so it hugs the body (never a loose open coat), from which …".
Captions: t1 "Đáp ứng · Áo trong cổ vuông viền hoa 2 lớp + áo ngoài thắt đai nơ" · t2 "Thường tại · Áo trong cổ vuông + một dải vạt trước, thắt đai" · t3 "Quý nhân · Áo trong cổ vuông viền thêu rộng + hai dải vạt trước, thắt đai".
Gates: check_store --scope tpN --age a22 STORE CHECK PASS ×3; keep_check --sidecar PASS ×3 (new .keep, allow lines = exactly the outfit/density/caption phrases above); keep_check --all 241 PASS. No trims needed.
Notes / conflicts for the rule owner: (1) t2 and t3 now share the same neckline band (wide embroidered) — difference = panel count + density + hair/flower size; (2) store TIER_LOW t1 is still "Tang-style ruqun … tied high at the chest" (G21/G32 ladder, other seasons) — unchanged, flag; (3) H12 "richly embroidered" vs L1590 TIER_LOW density — L1590 applied; (4) mẫu C's own text has NO open outer robe (single robe + 2-band border): the outer-robe look of her picture comes from the COMOI layered-neckline words, kept.

## JOB 3 — THU t1–t3 v4 (owner L1597 corrects L1595: NO mẫu C) — SUPERSEDES JOB 2 (v3 files deleted) — 0 gens
Builder dev/art/dapung4/make_thu_L1595.py (rewritten), base = LADDER1 make_thu_L1590.py outputs (DENSE already out); G40 = master_common.OUTER_IN imported
("the outer robe HELD IN by the sash or girdle tied OVER it, hugging the body, never a loose open coat"), replacing LADDER1's long clause.
- dev/art/dapung4/s62_t1_COMOI_v4.txt (9372) base t1_COMOI_v2e: garment = current thu Thường tại (t2 v2e) verbatim, motif → lilac sprays, "(the Thường tại edge)" dropped,
  density t2 "delicate … at the sleeves and hem" → t1 TIER_LOW "a wide embroidered lilac sprays hem band, small sprays of embroidered lilac sprays on the upper garment" (+ "and a soft silk sash" kept). Tang ruqun / chest-high ribbon skirt / embroidered cuffs+undersleeve gone (they were the t1 garment).
- dev/art/dapung4/s62_t2_COMOI_v4.txt (9979) base t2_COMOI_v2e: garment = current thu Quý nhân (t3 v2f: court robe, girdle, ONE apron panel, jade sets, shawl), motif → tiger lilies, "(the Quý nhân edge)" dropped, density t3 "wide … bands at the sleeve ends and the hem" → t2 "delicate embroidered tiger lilies at the sleeves and hem".
- dev/art/dapung4/s62_t3_COMOI_v4.txt (9856) base t3_COMOI_v2f: TWO apron panels side by side ("…on each outer side of the two panels hangs…"), own t3 density kept.
Captions: t1 "Đáp ứng · Áo trong cổ vuông viền hoa 2 lớp + áo ngoài thắt đai" · t2 "Thường tại · Áo trong cổ vuông + một dải vạt trước, thắt đai" · t3 "Quý nhân · Áo trong cổ vuông viền thêu rộng + hai dải vạt trước, thắt đai".
Gates: check_store tpN a22 STORE CHECK PASS ×3 (no OUT1 warn); keep_check sidecar PASS ×3 (allow = only outfit/density/G40/caption phrases); keep_check --all 250 PASS.
Flags: t2 and t3 share the wide embroidered neckline band (diff = panel count, density, hair/flower); t1 lost the sleeve/cuff words of the old Tang garment (Thường tại garment has none; sleeves stay by the SLEEVE LENGTH law).

## JOB 4 — xuân Hán t1–t3 v4 (owner L1601: robe slipping off + no zhiju silhouette) — 0 gens
Builder dev/art/seasons4/make_han_xuan_t13.py (A39: only these two; base = v3 by LADDER1). Same length budget (t3 at the limit), no extra trims.
(1) slipping: HEAD "collar open OFF the neck to the shoulder points:" → "collar open OFF the neck, SECURE on the shoulders:";
    COLLAR "its two edges rest exactly ON the shoulder points, shoulders covered (never off the shoulder)," → "its two edges sit SECURELY on the shoulders, never slipping off,".
(2) zhiju: "a long floor-length straight-hem robe (zhiju) … the front edge falling straight down to an even hem (no wrap spiral, no curved wrap panel, never a short jacket)"
    → "a straight-cut floor-length robe (zhiju) … a straight vertical front edge to a WIDE straight hem band (no flare, no ruffled petticoat, no high waist, no wrap spiral, never a short jacket)".
Files: dev/art/seasons4/s62_t1_HAN_BAC_v4.txt (9455) · s62_t2_HAN_BAC_v4.txt (9661) · s62_t3_HAN_BAC_v4.txt (9954); .keep base = v3, allow = the 6 replaced phrases.
Gates: check_store tpN a22 STORE CHECK PASS ×3; keep_check sidecar PASS ×3; --all 253 PASS. Word diff v3→v4 = only the 3 clauses above.
Note: neck + collarbones stay bare (HEAD "bare neck and collarbones", inner robe straight top edge below the collarbones kept). Her own ChatGPT run of v3 may add points.

## JOB 5 — thu t1–t3 v5 (owner L1605, rule G42 ladder carries up) — 0 gens
Builder dev/art/dapung4/make_thu_L1595.py: v4 build + the asserted G42 delta list (A39 only these). Files dev/art/dapung4/s62_t{1,2,3}_COMOI_v5.txt (9591 / 9963 / 9984), .keep base = v4.
- t1: front edges "(a simple thin blush piping)" → "(a narrow blush band embroidered with small lilac sprays, from the shoulders down past the waist)"; density "a wide embroidered lilac sprays hem band, small sprays … on the upper garment and a soft silk sash" → "a wide embroidered lilac sprays hem band, embroidered lilac sprays cuff bands, many small sprays of embroidered lilac sprays over the upper garment and the skirt, and a soft silk sash with a small carved jade pendant (ngọc bội) on a silk cord with a silk tassel at each side".
- t2: front edges → "(a narrow blush band embroidered with small tiger lilies, from the shoulders down past the waist)"; neckline band "… embroidered with tiger lilies running straight ACROSS the chest, the inner top also embroidered with small tiger lilies"; "delicate embroidered tiger lilies at the sleeves and hem" → "wide embroidered tiger lilies cuff bands at the sleeve ends and the hem; many small sprays of embroidered tiger lilies over the robe and skirt". Length: A38 repeat trims (make_thu_L1574 TRIM order: full-body/skin, face-view, never a pair, no cluster, never back-turned, never in profile, Everyone beautiful) — allow lines in .keep.
- t3: front edges → "(an embroidered blush band down past the waist)"; "(the Quý nhân edge), the inner top also embroidered across the chest"; + "many small semi-double China roses over the robe and skirt" after its wide sleeve/hem bands. Jade sets, two panels, OUTER_IN kept.
Gates: check_store tpN a22 STORE CHECK PASS ×3; keep_check sidecar PASS ×3; --all 256 PASS.
Note: t3 is at 9984 (gate 10000) — any further t3 addition needs a trim decision.

## HANDOVER (DESIGN18, at/near the roll line)
depth 5 · START_CTX ≈ 3 % (estimate) · get_session used_tokens 142k at JOB 2 start (14 %); now ≈ 25 % → roll line 28 %. All jobs pushed; nothing open. Coordinator Foreman C #14 (session_01D3E3NauaLGHu8gXNd9siaj) opens the successor.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
NO HOURLY SCHEDULED TASKS.
Pointers: thu t1–t3 builder dapung4/make_thu_L1595.py (v5, G42 deltas); xuân Hán t1–t3 builder seasons4/make_han_xuan_t13.py (v4); G40 = master_common.OUTER_IN; t2/t3 thu ≈ at the 10 000 limit.
